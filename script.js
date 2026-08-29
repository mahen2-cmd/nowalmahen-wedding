document.addEventListener('DOMContentLoaded', () => {
  // Navigation & UI Elements
  const langToggle = document.getElementById('langToggle');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');
  const navLinks = document.querySelectorAll('.nav-links a');
  const petalContainer = document.querySelector('.floral-bg-petals');

  let currentLang = 'en';

  // Helper function to convert English digits (0-9) to Urdu digits (۰-۹)
  function toUrduDigits(str) {
    const urduDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str.replace(/[0-9]/g, (w) => urduDigits[parseInt(w, 10)]);
  }

  // 1. Dynamic Falling Violet Flowers Generator (Fewer & Slower)
  const violetFlowers = ['🍀', '🪷', '🌸', '🌺', '🍀', '🪷', '🌸'];

  function createFlower() {
    if (!petalContainer) return;

    const flower = document.createElement('div');
    flower.className = 'petal';
    flower.textContent = violetFlowers[Math.floor(Math.random() * violetFlowers.length)];

    flower.style.left = Math.random() * 95 + 'vw';
    flower.style.top = '-5vh';

    const duration = Math.random() * 10 + 14; 
    const size = Math.random() * 0.6 + 1.1; 

    flower.style.animationDuration = `${duration}s`;
    flower.style.fontSize = `${size}rem`;

    flower.addEventListener('animationend', () => {
      flower.remove();
    });

    petalContainer.appendChild(flower);
  }

  setInterval(createFlower, 3500);

  // 2. Language Toggle Logic (English <-> Urdu with Number Translation)
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'ur' : 'en';
      document.body.classList.toggle('lang-ur', currentLang === 'ur');
      langToggle.textContent = currentLang === 'en' ? 'اردو' : 'English';

      const translatableElements = document.querySelectorAll('[data-en][data-ur]');
      translatableElements.forEach((el) => {
        let text = el.getAttribute(`data-${currentLang}`);
        if (currentLang === 'ur') {
          text = toUrduDigits(text);
        }
        el.textContent = text;
      });
    });
  }

  // 3. Mobile Sidebar Navigation Controls
  function toggleMenu() {
    if (navToggle) navToggle.classList.toggle('active');
    if (navMenu) navMenu.classList.toggle('active');
    if (navBackdrop) navBackdrop.classList.toggle('active');
  }

  function closeMenu() {
    if (navToggle) navToggle.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
    if (navBackdrop) navBackdrop.classList.remove('active');
  }

  if (navToggle) navToggle.addEventListener('click', toggleMenu);
  if (navBackdrop) navBackdrop.addEventListener('click', closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // 4. Scroll Animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-in').forEach((el) => {
    observer.observe(el);
  });
});