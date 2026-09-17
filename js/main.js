/* ---------- Floating hearts / sakura background ---------- */
(function floatBg(){
  const layer = document.getElementById('float-layer');
  if(!layer) return;
  const symbols = ['💗','🌸','🎀','💕','🩷'];
  const count = window.innerWidth < 640 ? 10 : 18;
  for(let i=0;i<count;i++){
    const el = document.createElement('span');
    el.className = 'floaty';
    el.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    el.style.left = Math.random()*100 + 'vw';
    el.style.animationDuration = (8 + Math.random()*10) + 's';
    el.style.animationDelay = (Math.random()*10) + 's';
    el.style.fontSize = (1 + Math.random()*1.4) + 'rem';
    layer.appendChild(el);
  }
})();

/* ---------- Music player ---------- */
(function musicPlayer(){
  const bar = document.getElementById('music-bar');
  if(!bar || typeof SITE_CONFIG === 'undefined') return;
  const tracks = SITE_CONFIG.tracks || [];
  if(tracks.length === 0){ bar.classList.add('hidden'); return; }

  // Pick a track based on the page name so each page can feel different,
  // but it still works fine with just one song in the list.
  const pageKey = document.body.dataset.page || 'index';
  const hash = [...pageKey].reduce((a,c)=>a + c.charCodeAt(0), 0);
  let idx = hash % tracks.length;

  const audio = new Audio();
  audio.loop = true;
  audio.volume = 0.5;
  const nameEl = bar.querySelector('.track-name');
  const btn = bar.querySelector('.play-toggle');

  function load(i){
    idx = (i + tracks.length) % tracks.length;
    audio.src = tracks[idx];
    const label = tracks[idx].split('/').pop().replace(/\.[^/.]+$/, '');
    if(nameEl) nameEl.textContent = label;
  }
  load(idx);

  let playing = false;
  function setPlaying(p){
    playing = p;
    if(btn) btn.textContent = playing ? '⏸' : '▶';
    if(playing){ audio.play().catch(()=>{}); } else { audio.pause(); }
  }

  if(btn) btn.addEventListener('click', ()=> setPlaying(!playing));
  const nextBtn = bar.querySelector('.next-track');
  if(nextBtn) nextBtn.addEventListener('click', ()=>{
    load(idx+1);
    if(playing) audio.play().catch(()=>{});
  });

  // Autoplay is usually blocked until a user gesture — start on first click anywhere.
  const tryStart = () => {
    if(!playing){ setPlaying(true); }
    document.removeEventListener('click', tryStart);
  };
  document.addEventListener('click', tryStart);
})();

/* ---------- Nav active-link highlight ---------- */
(function navActive(){
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a=>{
    if(a.getAttribute('href') === here) a.classList.add('active');
  });
})();

/* ---------- Gallery + timeline population from config ---------- */
(function populateFromConfig(){
  if(typeof SITE_CONFIG === 'undefined') return;

  // Hero name fill-ins
  document.querySelectorAll('[data-her-name]').forEach(el=> el.textContent = SITE_CONFIG.herName);
  document.querySelectorAll('[data-my-name]').forEach(el=> el.textContent = SITE_CONFIG.myName);
  document.querySelectorAll('[data-bday-label]').forEach(el=> el.textContent = SITE_CONFIG.birthdayDateLabel);

  // Gallery
  const grid = document.getElementById('gallery-grid');
  if(grid){
    const total = Math.max(SITE_CONFIG.galleryImages.length, 12);
    for(let i=0;i<total;i++){
      const slot = document.createElement('div');
      slot.className = 'photo-slot';
      const src = SITE_CONFIG.galleryImages[i];
      if(src){
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Our memory ' + (i+1);
        img.loading = 'lazy';
        slot.appendChild(img);
      } else {
        slot.textContent = '📷 add a photo\n(slot ' + (i+1) + ')';
      }
      grid.appendChild(slot);
    }
  }

  // "All these are dying to date me" page
  const celebGrid = document.getElementById('celeb-grid');
  if(celebGrid){
    for(let i=0;i<4;i++){
      const slot = document.createElement('div');
      slot.className = 'photo-slot';
      const src = SITE_CONFIG.celebImages && SITE_CONFIG.celebImages[i];
      if(src){
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Admirer ' + (i+1);
        slot.appendChild(img);
      } else {
        slot.textContent = '📷 add a photo';
      }
      celebGrid.appendChild(slot);
    }
  }
  const herSlot = document.getElementById('her-photo');
  if(herSlot){
    if(SITE_CONFIG.herSoloImage){
      const img = document.createElement('img');
      img.src = SITE_CONFIG.herSoloImage;
      img.alt = SITE_CONFIG.herName;
      herSlot.appendChild(img);
    } else {
      herSlot.textContent = '📷 add her photo here';
    }
  }
  const oldWomanSlot = document.getElementById('old-woman-photo');
  if(oldWomanSlot){
    if(SITE_CONFIG.oldWomanImage){
      const img = document.createElement('img');
      img.src = SITE_CONFIG.oldWomanImage;
      img.alt = 'Many years from now';
      oldWomanSlot.appendChild(img);
    } else {
      oldWomanSlot.textContent = '📷 add the old woman photo here';
    }
  }

  // Timeline
  const tl = document.getElementById('timeline');
  if(tl && SITE_CONFIG.timeline){
    SITE_CONFIG.timeline.forEach((item, i)=>{
      const div = document.createElement('div');
      div.className = 'timeline-item';
      div.setAttribute('data-icon', item.icon || '💗');
      div.innerHTML = `
        <div class="year">${item.year}</div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        <div class="photo-slot" style="max-width:220px; margin-top:10px;">
          ${ SITE_CONFIG.galleryImages[i] ? `<img src="${SITE_CONFIG.galleryImages[i]}" alt="${item.title}">` : '📷 add a photo for this memory'}
        </div>
      `;
      tl.appendChild(div);
    });
  }
})();
