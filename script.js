/* A LITTLE LOVE STORY — edit the SETTINGS below before sharing */
const SETTINGS = {
  recipientName: "Ananya", // Change this to your loved one's name.
  secretPassword: "sunshine", // Change this to your own secret word.
  specialDate: "2027-02-14T00:00:00", // Change to YYYY-MM-DDTHH:MM:SS
  musicFile: "assets/music/romantic.mp3", // Add your own licensed/original MP3 here.
  musicStartsAutomatically: false
};

const page = document.body.dataset.page;
const $ = (selector) => document.querySelector(selector);

// A gentle transition between pages.
document.querySelectorAll("a.page-link").forEach(link => {
  link.addEventListener("click", event => {
    const destination = link.getAttribute("href");
    if (!destination || destination.startsWith("#")) return;
    event.preventDefault();
    document.body.classList.add("page-exit");
    setTimeout(() => { window.location.href = destination; }, 280);
  });
});

// Floating hearts and tiny sparkles.
const floatingLayer = $(".floating-layer");
if (floatingLayer) {
  const symbols = ["♡", "♥", "✧", "✿"];
  for (let i = 0; i < 13; i++) {
    const heart = document.createElement("span");
    heart.className = "float-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heart.style.animationDuration = `${9 + Math.random() * 10}s`;
    heart.style.animationDelay = `${Math.random() * 10}s`;
    floatingLayer.appendChild(heart);
  }
}

// Background music: browsers require a user gesture before audio can play.
// Keep your own permitted MP3 at assets/music/romantic.mp3.
let audio = null;
let musicOn = false;
const musicButtons = document.querySelectorAll(".music-toggle");
function updateMusicButtons() {
  musicButtons.forEach(button => {
    const label = button.querySelector("span");
    if (label) label.textContent = musicOn ? "Music on" : "Music off";
    button.setAttribute("aria-pressed", String(musicOn));
  });
}
musicButtons.forEach(button => button.addEventListener("click", async () => {
  if (!audio) {
    audio = new Audio(SETTINGS.musicFile);
    audio.loop = true;
    audio.volume = 0.35;
  }
  try {
    if (musicOn) { audio.pause(); musicOn = false; }
    else { await audio.play(); musicOn = true; }
    updateMusicButtons();
  } catch (error) {
    alert("Add your MP3 file to assets/music/romantic.mp3, then try again.");
  }
}));
updateMusicButtons();

// Secret page. This is a playful front-end gate, not secure authentication.
if (page === "secret") {
  $("#password-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const entered = $("#secret-password").value.trim().toLowerCase();
    const message = $("#password-message");
    if (entered === SETTINGS.secretPassword.toLowerCase()) {
      localStorage.setItem("loveStoryUnlocked", "yes");
      message.textContent = "You got it! Opening your surprise... 💗";
      message.classList.remove("error");
      setTimeout(() => { window.location.href = "letter.html"; }, 700);
    } else {
      message.textContent = "Not quite! Try again, lovely. 💕";
      message.classList.add("error");
      $("#secret-password").classList.add("shake");
      setTimeout(() => $("#secret-password").classList.remove("shake"), 450);
    }
  });
}

// Envelope opening interaction.
if (page === "letter") {
  $("#open-envelope")?.addEventListener("click", () => {
    $("#open-envelope").classList.add("open");
    $("#envelope-hint").textContent = "A little love, folded just for you ♡";
    setTimeout(() => $("#letter-next").classList.remove("hidden"), 850);
  });
}

// Gallery lightbox.
if (page === "memories") {
  const lightbox = $("#lightbox");
  document.querySelectorAll(".photo-card").forEach(card => card.addEventListener("click", () => {
    lightbox.querySelector("img").src = card.dataset.photo;
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
  }));
  const closeLightbox = () => {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
  };
  $(".lightbox-close")?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeLightbox(); });
}

// Live countdown. Update SETTINGS.specialDate above.
if (page === "countdown") {
  const target = new Date(SETTINGS.specialDate).getTime();
  const updateCountdown = () => {
    const remaining = target - Date.now();
    if (Number.isNaN(target)) {
      $("#countdown-caption").textContent = "Please set a valid specialDate in script.js.";
      return;
    }
    if (remaining <= 0) {
      ["days","hours","minutes","seconds"].forEach(id => $("#"+id).textContent = "00");
      $("#countdown-caption").textContent = "Your special moment is here! ♡";
      return;
    }
    const values = {
      days: Math.floor(remaining / 86400000),
      hours: Math.floor((remaining % 86400000) / 3600000),
      minutes: Math.floor((remaining % 3600000) / 60000),
      seconds: Math.floor((remaining % 60000) / 1000)
    };
    Object.entries(values).forEach(([id, value]) => $("#"+id).textContent = String(value).padStart(2,"0"));
  };
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Proposal buttons and confetti.
if (page === "proposal") {
  const noButton = $("#no-button");
  const noMessages = ["Are you sure? 🥺", "One tiny maybe? 💗", "I'll keep hoping... 🌷", "Take your time, lovely ♡"];
  let noCount = 0;
  noButton?.addEventListener("click", () => {
    noButton.textContent = noMessages[noCount % noMessages.length];
    noCount++;
    // Keep the button playful, but never make it impossible to say no.
    $("#answer-note").textContent = "It's okay to take your time. Your answer is always yours. ♡";
  });
  $("#yes-button")?.addEventListener("click", () => {
    $("#celebration").classList.remove("hidden");
    $(".answer-area").classList.add("hidden");
    $("#answer-note").classList.add("hidden");
    launchConfetti();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });
  $("#replay-button")?.addEventListener("click", () => {
    localStorage.removeItem("loveStoryUnlocked");
    window.location.href = "index.html";
  });
}
function launchConfetti() {
  const colors = ["#ef8fb4","#c9a9e8","#f7c6d9","#f5d48e","#b5d9c7"];
  for (let i = 0; i < 100; i++) {
    const piece = document.createElement("i");
    piece.style.cssText = `position:fixed;z-index:99;top:-15px;left:${Math.random()*100}vw;width:${6+Math.random()*7}px;height:${9+Math.random()*9}px;background:${colors[i%colors.length]};border-radius:3px;pointer-events:none;`;
    document.body.appendChild(piece);
    const drift = (Math.random() - .5) * 280;
    const duration = 1800 + Math.random() * 2200;
    const animation = piece.animate([
      { transform: "translate3d(0,0,0) rotate(0)", opacity: 1 },
      { transform: `translate3d(${drift}px,110vh,0) rotate(${Math.random()*900}deg)`, opacity: .8 }
    ], { duration, easing: "cubic-bezier(.2,.7,.4,1)" });
    animation.onfinish = () => piece.remove();
  }
}

// Set recipient name in the browser title where helpful; edit page text in HTML for copy.
document.title = document.title.replace("my favourite person", SETTINGS.recipientName);
