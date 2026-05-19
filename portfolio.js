// ===== TYPING ANIMATION =====
const roles = ["Full Stack Developer", "Backend Developer", "MERN Stack Dev", "Cloud Enthusiast"];
let rIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById("typed");
function type() {
  if (!typedEl) return;
  const word = roles[rIdx];
  typedEl.textContent = word.slice(0, cIdx);
  if (!deleting && cIdx < word.length) { cIdx++; setTimeout(type, 90); }
  else if (deleting && cIdx > 0) { cIdx--; setTimeout(type, 45); }
  else {
    deleting = !deleting;
    if (!deleting) rIdx = (rIdx + 1) % roles.length;
    setTimeout(type, deleting ? 1400 : 300);
  }
}
type();

// ===== NAVBAR SCROLL + MENU =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
  const sp = document.getElementById("scrollProgress");
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  sp.style.width = pct + "%";
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

// ===== SCROLL REVEAL =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// ===== CURSOR GLOW =====
const cursor = document.getElementById("cursorGlow");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// ===== PARTICLES =====
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
resize(); addEventListener("resize", resize);

function initParticles() {
  const count = Math.min(80, Math.floor((innerWidth * innerHeight) / 18000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.6 + 0.4,
    c: Math.random() > 0.5 ? "0,255,163" : "0,229,255",
  }));
}
initParticles(); addEventListener("resize", initParticles);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.c},0.7)`;
    ctx.shadowColor = `rgba(${p.c},0.9)`;
    ctx.shadowBlur = 10;
    ctx.fill();
  });
  // connecting lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,255,163,${0.12 * (1 - d / 120)})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
  }
  ctx.shadowBlur = 0;
  requestAnimationFrame(animate);
}
animate();