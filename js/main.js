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

class Petal {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 2;
    this.speed = Math.random() * 0.6 + 0.3;
  }

  update() {
    this.y += this.speed;
    this.x += wind;

    if (
      this.y > canvas.height ||
      this.x < -20 ||
      this.x > canvas.width + 20
    ) {
      this.reset();
    }
  }

  draw() {
    ctx.fillStyle = "rgba(255,200,200,0.8)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
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
