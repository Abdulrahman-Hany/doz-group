// Enhanced DOZ Group JavaScript with Advanced Animations

// Mobile nav toggle with smooth animations
const toggle = document.querySelector('.nav__toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    
    if (open) {
      nav.style.opacity = '0';
      nav.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        nav.style.display = 'none';
      }, 300);
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '80px';
      nav.style.right = '24px';
      nav.style.padding = '16px';
      nav.style.border = '1px solid rgba(212, 165, 116, .25)';
      nav.style.borderRadius = '20px';
      nav.style.background = 'rgba(10, 14, 21, .95)';
      nav.style.backdropFilter = 'blur(20px)';
      nav.style.gap = '8px';
      nav.style.minWidth = '240px';
      nav.style.boxShadow = '0 20px 70px rgba(0, 0, 0, .6)';
      nav.style.zIndex = '100';
      
      setTimeout(() => {
        nav.style.opacity = '1';
        nav.style.transform = 'translateY(0)';
      }, 10);
    }
  });
}

// Topbar scroll effect
const topbar = document.querySelector('.topbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    topbar.classList.add('scrolled');
  } else {
    topbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
}, { passive: true });

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Enhanced reveal on scroll with stagger
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = el.getAttribute('data-delay');
    if (delay) {
      el.style.transitionDelay = `${delay}ms`;
    }
    el.classList.add('is-visible');
    io.unobserve(el);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(el => io.observe(el));

// Smooth parallax
const parallaxEls = document.querySelectorAll('[data-parallax]');
let rafId = null;

function parallaxTick(){
  rafId = null;
  const y = window.scrollY || 0;
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.getAttribute('data-speed') || '0.2');
    const transform = `translate3d(0, ${y * speed}px, 0)`;
    el.style.transform = transform;
  });
}

window.addEventListener('scroll', () => {
  if (rafId) return;
  rafId = requestAnimationFrame(parallaxTick);
}, { passive: true });

// Animated counters with easing
const counters = document.querySelectorAll('.count');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.getAttribute('data-count'), 10);
    animateCount(el, target, 1200);
    counterIO.unobserve(el);
  });
}, { threshold: 0.4 });

counters.forEach(el => counterIO.observe(el));

function animateCount(el, target, duration){
  const start = performance.now();
  const from = 0;

  function frame(t){
    const progress = Math.min(1, (t - start) / duration);
    // easeOutCubic for smooth deceleration
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = String(Math.round(from + (target - from) * eased));
    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }
  requestAnimationFrame(frame);
}

// Premium animated background canvas with gold particles
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let dpr = window.devicePixelRatio || 1;

function resize(){
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  ctx.scale(dpr, dpr);
}

window.addEventListener('resize', resize);
resize();

// Create particles with gold theme
const particles = Array.from({length: 45}, (_, i) => ({
  x: Math.random(),
  y: Math.random(),
  r: 0.6 + Math.random() * 2.5,
  vx: (Math.random() - 0.5) * 0.0004,
  vy: (Math.random() - 0.5) * 0.0004,
  a: 0.08 + Math.random() * 0.14,
  color: i % 3 === 0 ? 'rgba(212, 165, 116, ' : 
         i % 3 === 1 ? 'rgba(184, 136, 78, ' : 
         'rgba(255, 140, 66, ',
  pulseSpeed: 0.001 + Math.random() * 0.002,
  pulseOffset: Math.random() * Math.PI * 2
}));

let time = 0;

function draw(){
  const w = canvas.width / dpr;
  const h = canvas.height / dpr;
  
  ctx.clearRect(0, 0, w, h);
  
  // Gradient wash with gold tones
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, 'rgba(212, 165, 116, 0.06)');
  g.addColorStop(0.5, 'rgba(0, 0, 0, 0.00)');
  g.addColorStop(1, 'rgba(255, 140, 66, 0.05)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  
  // Draw and update particles
  time += 0.01;
  for (const p of particles){
    p.x += p.vx;
    p.y += p.vy;
    
    // Wrap around edges
    if (p.x < -0.05) p.x = 1.05;
    if (p.x > 1.05) p.x = -0.05;
    if (p.y < -0.05) p.y = 1.05;
    if (p.y > 1.05) p.y = -0.05;
    
    const x = p.x * w;
    const y = p.y * h;
    
    // Pulsing effect
    const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.3 + 0.7;
    const radius = p.r * pulse;
    const alpha = p.a * pulse;
    
    // Draw particle with glow
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color + alpha + ')';
    ctx.fill();
    
    // Subtle glow
    if (p.r > 1.5) {
      ctx.beginPath();
      ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
      ctx.fillStyle = p.color + (alpha * 0.15) + ')';
      ctx.fill();
    }
  }
  
  requestAnimationFrame(draw);
}

draw();

// Feature cards interactive enhancements
const features = document.querySelectorAll('.feature');
features.forEach(feature => {
  feature.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
  });
  
  feature.addEventListener('mouseleave', function() {
    this.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
  });
});

// Add interactive hover to cards
const cards = document.querySelectorAll('.card, .bullet, .stage, .stat');
cards.forEach(card => {
  card.addEventListener('mouseenter', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.style.setProperty('--mouse-x', `${x}px`);
    this.style.setProperty('--mouse-y', `${y}px`);
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#top') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Add loading animation on page load
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.6s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Performance optimization: Pause animations when page is hidden
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause canvas animation
    cancelAnimationFrame(rafId);
  } else {
    // Resume
    draw();
  }
});

// Enhanced button interactions
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px) scale(1.02)';
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
  
  btn.addEventListener('mousedown', function() {
    this.style.transform = 'translateY(-1px) scale(0.98)';
  });
  
  btn.addEventListener('mouseup', function() {
    this.style.transform = 'translateY(-3px) scale(1.02)';
  });
});

// Add cursor trail effect for premium feel (optional)
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
  cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
  
  if (cursorTrail.length > maxTrailLength) {
    cursorTrail.shift();
  }
});

// Table row hover effect
const tableRows = document.querySelectorAll('.table__row:not(.table__head)');
tableRows.forEach(row => {
  row.addEventListener('mouseenter', function() {
    this.style.transform = 'translateX(-5px)';
  });
  
  row.addEventListener('mouseleave', function() {
    this.style.transform = 'translateX(0)';
  });
});

console.log('%c DOZ Group %c Enhanced Premium Theme Loaded ', 
  'background: linear-gradient(135deg, #D4A574, #B8884E); color: #0A0E15; padding: 8px 12px; font-weight: bold; font-size: 14px;',
  'background: #0A0E15; color: #D4A574; padding: 8px 12px; font-size: 14px;'
);