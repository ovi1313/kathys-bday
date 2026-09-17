/* ============================================================
   Hub navigation
   ============================================================ */
document.querySelectorAll('.game-card').forEach(card=>{
  card.addEventListener('click', ()=> openPanel(card.dataset.open));
});
document.querySelectorAll('[data-back]').forEach(btn=>{
  btn.addEventListener('click', closeAllPanels);
});

function closeAllPanels(){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('hub').style.display = 'grid';
  stopCatchGame();
}
function openPanel(name){
  document.getElementById('hub').style.display = 'none';
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('panel-' + name).classList.add('active');
  if(name === 'memory') startMemoryGame();
  if(name === 'quiz') startQuiz();
}

/* ============================================================
   MEMORY MATCH
   ============================================================ */
const MEMORY_SYMBOLS = ['🎀','🌸','💗','🦋','🗡️','🔥','🐉','⛩️'];
let memState = { first:null, second:null, lock:false, moves:0, matched:0 };

function startMemoryGame(){
  memState = { first:null, second:null, lock:false, moves:0, matched:0 };
  document.getElementById('mem-moves').textContent = 'Moves: 0';
  document.getElementById('memory-result').textContent = '';
  const deck = [...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS]
    .map(s => ({ s, k: Math.random() }))
    .sort((a,b)=>a.k-b.k)
    .map(x=>x.s);

  const grid = document.getElementById('memory-grid');
  grid.innerHTML = '';
  deck.forEach((symbol, i)=>{
    const card = document.createElement('div');
    card.className = 'mem-card';
    card.dataset.symbol = symbol;
    card.dataset.index = i;
    card.textContent = symbol;
    card.addEventListener('click', ()=> flipMemCard(card));
    grid.appendChild(card);
  });
}
document.getElementById('mem-restart').addEventListener('click', startMemoryGame);

function flipMemCard(card){
  if(memState.lock) return;
  if(card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');

  if(!memState.first){
    memState.first = card;
    return;
  }
  memState.second = card;
  memState.lock = true;
  memState.moves++;
  document.getElementById('mem-moves').textContent = 'Moves: ' + memState.moves;

  const isMatch = memState.first.dataset.symbol === memState.second.dataset.symbol;
  setTimeout(()=>{
    if(isMatch){
      memState.first.classList.add('matched');
      memState.second.classList.add('matched');
      memState.matched++;
      if(memState.matched === MEMORY_SYMBOLS.length){
        document.getElementById('memory-result').textContent =
          `You cleared it in ${memState.moves} moves 🎀 (of course you did)`;
      }
    } else {
      memState.first.classList.remove('flipped');
      memState.second.classList.remove('flipped');
    }
    memState.first = null;
    memState.second = null;
    memState.lock = false;
  }, 600);
}

/* ============================================================
   CATCH THE HEARTS
   ============================================================ */
let catchTimer = null, catchSpawn = null, catchScore = 0, catchTimeLeft = 30;

document.getElementById('catch-start').addEventListener('click', startCatchGame);

function startCatchGame(){
  stopCatchGame();
  catchScore = 0;
  catchTimeLeft = 30;
  document.getElementById('catch-score').textContent = 'Score: 0';
  document.getElementById('catch-time').textContent = 'Time: 30';
  document.getElementById('catch-result').textContent = '';
  const area = document.getElementById('catch-area');
  area.innerHTML = '';

  catchSpawn = setInterval(spawnHeart, 650);
  catchTimer = setInterval(()=>{
    catchTimeLeft--;
    document.getElementById('catch-time').textContent = 'Time: ' + catchTimeLeft;
    if(catchTimeLeft <= 0) endCatchGame();
  }, 1000);
}
function stopCatchGame(){
  clearInterval(catchTimer);
  clearInterval(catchSpawn);
  catchTimer = null; catchSpawn = null;
}
function endCatchGame(){
  stopCatchGame();
  document.getElementById('catch-result').textContent =
    `Final score: ${catchScore} 💗 ${catchScore > 15 ? "okay show-off" : "not bad!"}`;
}
function spawnHeart(){
  const area = document.getElementById('catch-area');
  if(!area) return;
  const heart = document.createElement('button');
  heart.className = 'falling-heart';
  heart.textContent = ['💗','💕','🩷','💖'][Math.floor(Math.random()*4)];
  heart.style.left = Math.random() * 88 + '%';
  const duration = 2.4 + Math.random()*1.6;
  heart.style.transition = `top ${duration}s linear`;
  area.appendChild(heart);
  requestAnimationFrame(()=>{ heart.style.top = '100%'; });

  heart.addEventListener('click', ()=>{
    catchScore++;
    document.getElementById('catch-score').textContent = 'Score: ' + catchScore;
    heart.remove();
  });
  setTimeout(()=> heart.remove(), duration*1000 + 50);
}

/* ============================================================
   RELATIONSHIP QUIZ
   ============================================================ */
const QUIZ_QUESTIONS = [
  {
    q: "Where did we actually meet?",
    options: ["A Roblox game", "A group chat", "A mutual friend's stream", "School"],
    correct: 0
  },
  {
    q: "What happened the very first time I got your Discord?",
    options: ["We texted for a week first", "We called immediately", "You added someone else too", "Nothing, we forgot"],
    correct: 1
  },
  {
    q: "What year did we first meet?",
    options: ["2023", "2024", "Early 2025", "2026"],
    correct: 2
  },
  {
    q: "When did we officially start dating?",
    options: ["June 2026", "Early 2025", "December 2025", "We're not"],
    correct: 0
  },
  {
    q: "What was I doing while you dated someone else for a while?",
    options: ["Disappearing", "Competing for your attention", "Supporting you anyway", "Pretending not to care and being distant"],
    correct: 2
  }
];
let quizIndex = 0, quizScore = 0;

function startQuiz(){
  quizIndex = 0; quizScore = 0;
  document.getElementById('quiz-result').textContent = '';
  renderQuizQuestion();
}
function renderQuizQuestion(){
  const box = document.getElementById('quiz-box');
  const progress = document.getElementById('quiz-progress');
  if(quizIndex >= QUIZ_QUESTIONS.length){
    progress.textContent = 'Done!';
    box.innerHTML = '';
    document.getElementById('quiz-result').textContent =
      `${quizScore} / ${QUIZ_QUESTIONS.length} — ${quizScore === QUIZ_QUESTIONS.length ? "you know us perfectly 💗" : "close enough, I still love you"}`;
    return;
  }
  progress.textContent = `Question ${quizIndex+1} of ${QUIZ_QUESTIONS.length}`;
  const item = QUIZ_QUESTIONS[quizIndex];
  box.innerHTML = `<p style="font-weight:700; font-size:1.1rem;">${item.q}</p>`;
  item.options.forEach((opt, i)=>{
    const b = document.createElement('button');
    b.className = 'quiz-option';
    b.textContent = opt;
    b.addEventListener('click', ()=> answerQuiz(i, b));
    box.appendChild(b);
  });
}
function answerQuiz(i, btn){
  const item = QUIZ_QUESTIONS[quizIndex];
  const allBtns = document.querySelectorAll('.quiz-option');
  allBtns.forEach(b=> b.disabled = true);
  if(i === item.correct){
    btn.classList.add('correct');
    quizScore++;
  } else {
    btn.classList.add('wrong');
    allBtns[item.correct].classList.add('correct');
  }
  setTimeout(()=>{
    quizIndex++;
    renderQuizQuestion();
  }, 900);
}
