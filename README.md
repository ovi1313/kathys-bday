# Her Birthday Site 🎀

A little pink, Hello-Kitty-and-Demon-Slayer-flavored birthday site: a home page,
your story timeline, a photo gallery, a letter, and three small games.

## 1. Personalize it (do this first)

Open **`js/config.js`** and edit:
- `herName` / `myName` — used everywhere on the site
- `galleryImages` — list of photo filenames (see below)
- `tracks` — list of song filenames (see below)
- `timeline` — the story cards on the "Our Story" page (already pre-filled
  with your Roblox → Discord → best friends → June 2026 story — tweak the
  wording however you like)

The love letter text lives directly in **`letter.html`** if you want to rewrite it.

## 2. Add photos

Copy her photos into `assets/images/`, then list the filenames in
`js/config.js` under `galleryImages`. They'll appear in the Gallery grid
and line up with the Our Story timeline in the order you list them.

## 3. Add music

Copy mp3s into `assets/music/`, then list them in `js/config.js` under
`tracks`. A small pink music bar appears bottom-right on every page to
play/pause and skip. Leave the list empty and the bar just won't show up.

⚠️ If you're using real copyrighted songs, keep the GitHub repo **private**
(see step 5) rather than fully public — see `assets/music/README.txt`.

## 4. Preview it locally

Just double-click `index.html` to open it in a browser — no build step,
no server needed. Click through every page once before sending it to her.

## 5. Put it on GitHub and launch it

**A. Create the repo**
1. Go to github.com → New repository → name it something like `for-her-birthday`.
2. Choose **Public** if you're only using original/royalty-free music, or
   **Private** if you used real copyrighted songs (see note above — a
   private repo can still be published with GitHub Pages).

**B. Upload the files**
- Easiest: on the new repo's page, click "uploading an existing file" and
  drag in the whole `birthday-site` folder contents (keep the folder
  structure: `assets/`, `css/`, `js/`, and the `.html` files at the root).
- Or with git in a terminal:
  ```bash
  cd birthday-site
  git init
  git add .
  git commit -m "birthday site"
  git branch -M main
  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
  git push -u origin main
  ```

**C. Turn on GitHub Pages**
1. In the repo, go to **Settings → Pages**.
2. Under "Build and deployment", set Source to **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`. Save.
4. Wait a minute, then your site is live at:
   `https://YOUR_USERNAME.github.io/YOUR_REPO/`

If the repo is private, GitHub Pages from a private repo requires a
GitHub Pro/Team/Enterprise account (or Free for org-owned repos in some
plans) — check current GitHub docs if the Pages option is greyed out.
The simplest guaranteed-free path is a public repo with only
original/royalty-free music.

**D. Send her the link** 🎀

## File map
```
index.html      - landing / hero page
memories.html   - "Our Story" timeline
gallery.html    - photo grid + lightbox
letter.html     - the letter + "reasons" cards
games.html      - memory match, catch-the-hearts, relationship quiz
css/style.css   - all styling (pink theme + Demon Slayer accents)
js/config.js    - <<< EDIT THIS FIRST: names, photos, songs, timeline text
js/main.js      - shared behavior: floating hearts, music player, nav
js/games.js     - the three minigames
assets/images/  - put her photos here
assets/music/   - put songs here
```
