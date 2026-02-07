/* =====================
   WIND SYSTEM
===================== */
let lastScroll = window.scrollY;
let wind = 0;

window.addEventListener("scroll", () => {
  const current = window.scrollY;
  wind = (current - lastScroll) * 0.02;
  wind = Math.max(-2, Math.min(2, wind));
  lastScroll = current;
});

/* =====================
   SAKURA CANVAS
===================== */
const canvas = document.getElementById("sakura");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* === PETAL IMAGES === */
const whitePetalImg = new Image();
whitePetalImg.src = "assets/textures/sakura-petal-white.png";

const redPetalImg = new Image();
redPetalImg.src = "assets/textures/sakura-petal-red.png";

/* === STATE === */
function isBloodStance() {
  return document.body.classList.contains("blood-stance");
}

class Petal {

  constructor() {
    this.reset();
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 18 + 12; // realistic petal size
    this.speed = Math.random() * 0.6 + 0.3;
  }

  update() {
    this.y += this.speed;
    this.x += wind;
    this.rotation += this.rotationSpeed;

    if (
      this.y > canvas.height + 40 ||
      this.x < -40 ||
      this.x > canvas.width + 40
    ) {
      this.reset();
      this.y = -20;
    }
  }

  draw() {
    const img = isBloodStance() ? redPetalImg : whitePetalImg;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(img, -this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

const petals = Array.from({ length: 80 }, () => new Petal());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(petal => {
    petal.update();
    petal.draw();
  });
  requestAnimationFrame(animate);
}
animate();

/* =====================
   STANCE TOGGLE
===================== */
const stanceBtn = document.getElementById("stanceToggle");
if (stanceBtn) {
  stanceBtn.addEventListener("click", () => {
    document.body.classList.toggle("blood-stance");
  });
}

/* =====================
   AMBIENT AUDIO CONTROL
===================== */
const ambientAudio = document.getElementById("ambientAudio");
const muteToggle = document.getElementById("muteToggle");

let audioStarted = false;

if (muteToggle && ambientAudio) {
  muteToggle.addEventListener("click", () => {
    if (!audioStarted) {
      ambientAudio.volume = 0.3;
      ambientAudio.play().then(() => {
        audioStarted = true;
        muteToggle.textContent = "🔊";
      }).catch(err => {
        console.warn("Audio play blocked:", err);
      });
    } else {
      if (ambientAudio.paused) {
        ambientAudio.play();
        muteToggle.textContent = "🔊";
      } else {
        ambientAudio.pause();
        muteToggle.textContent = "🔇";
      }
    }
  });
}
