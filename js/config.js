/* ============================================================
   EDIT ME FIRST — everything personal lives in this one file.
   ============================================================ */
const SITE_CONFIG = {
  herName: "Kathy",              // <-- change to her real name
  myName: "Ovi",                    // signs the letters/messages
  birthdayDateLabel: "Her Birthday", // shown on the hero if you want a specific date, e.g. "October 4th"

  // "All These Are Dying To Date Me" page — 4 celebrity photo slots,
  // then one photo of her, then one photo of an old Filipino woman.
  // Same drop-the-file-then-list-it pattern as everything else.
  celebImages: [
    // "assets/images/actress1.jpg",
    // "assets/images/actress2.jpg",
    // "assets/images/actress3.jpg",
    // "assets/images/actress4.jpg",
  ],
  herSoloImage: "", // e.g. "assets/images/kathy.jpg"
  oldWomanImage: "", // e.g. "assets/images/lola.jpg"

  // Put image files inside assets/images/ and list the filenames here.
  // They will fill the gallery + the memory timeline in order.
  galleryImages: [
    // "assets/images/photo1.jpg",
    // "assets/images/photo2.jpg",
  ],

  // Put mp3 files inside assets/music/ and list them here.
  // Each page picks the next track in the list so you get variety;
  // if the list is empty, the music player just stays hidden.
  tracks: [
    // "assets/music/song1.mp3",
    // "assets/music/song2.mp3",
  ],

  // The story timeline shown on memories.html — edit freely.
  timeline: [
    {
      year: "Early 2025",
      title: "A random Roblox server",
      text: "Two strangers, one game, zero idea what was coming. I had no clue that a random lobby was about to hand me my best friend.",
      icon: "🎮"
    },
    {
      year: "Early 2025",
      title: "The first call",
      text: "The night I finally got your Discord and we called for the first time. I remember being nervous before it even connected — and then it was so easy it wasn't fair.",
      icon: "🎧"
    },
    {
      year: "2025",
      title: "Best friends, fast",
      text: "It didn't take long before you were telling me everything — the good days, the bad days, all of it. I never took that for granted.",
      icon: "💬"
    },
    {
      year: "2025",
      title: "The hard part",
      text: "You started seeing someone else. I won't pretend it didn't sting — but you deserved someone in your corner regardless, so I stayed exactly that. Unconditionally.",
      icon: "🩹"
    },
    {
      year: "June 2026",
      title: "Us",
      text: "And then, finally — us. Everything before this was just the long way of getting here.",
      icon: "💖"
    },
    {
      year: "Today",
      title: "Still here",
      text: "Every day since has just been more proof I'd choose that random Roblox lobby again in a heartbeat.",
      icon: "🌸"
    }
  ]
};
