/* ── Typed text effect ── */
const roles = ['Software Engineer', 'QA Automation Engineer', 'Full Stack Developer'];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typedEl');

function type() {
  const word = roles[ri];
  typedEl.textContent = deleting ? word.slice(0, ci - 1) : word.slice(0, ci + 1);
  deleting ? ci-- : ci++;
  if (!deleting && ci === word.length) {
    setTimeout(() => { deleting = true; type(); }, 2200);
    return;
  }
  if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  setTimeout(type, deleting ? 55 : 95);
}
type();

/* ── Sticky nav shadow ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Burger / mobile menu ── */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── Scroll reveal ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Active nav link ── */
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) cur = s.id; });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}, { passive: true });

/* ── Contact form — Formspree ── */
const FORMSPREE_ID = 'mbgjjdzy';
document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const form = e.target;
  btn.textContent = 'Enviando...';
  btn.disabled = true;
  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });
    if (res.ok) {
      btn.textContent = '✓ ¡Mensaje enviado!';
      btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Enviar mensaje →';
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    } else {
      throw new Error();
    }
  } catch {
    btn.textContent = '✗ Error al enviar. Inténtalo de nuevo.';
    btn.style.background = 'linear-gradient(135deg,#ef4444,#dc2626)';
    setTimeout(() => {
      btn.textContent = 'Enviar mensaje →';
      btn.style.background = '';
      btn.disabled = false;
    }, 3500);
  }
});
