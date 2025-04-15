document.addEventListener('DOMContentLoaded', () => {
  // Preloader Animation - Make sure this runs regardless of other errors
  const preloader = document.getElementById('preloader');
  gsap.to(preloader, {
    opacity: 0,
    duration: 1,
    delay: 3,
    onComplete: () => {
        preloader.style.display = 'none';
    }
  });

  // Check if LocomotiveScroll is available
  let scroll;
  try {
      if (typeof LocomotiveScroll !== 'undefined') {
          // Locomotive Scroll for smooth scrolling
          scroll = new LocomotiveScroll({
              el: document.querySelector('[data-scroll-container]'),
              smooth: true
          });
      } else {
          console.warn('LocomotiveScroll not found. Using default scrolling.');
      }
  } catch (e) {
      console.error('Error initializing smooth scroll:', e);
  }

  // GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Parallax Effects
  gsap.utils.toArray('.parallax-section').forEach((section, i) => {
      const bg = section.querySelector('img');
      if (bg) {
          gsap.fromTo(bg, {
              y: '-20%',
              scale: 1.2
          }, {
              y: '20%',
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true
              }
          });
      }
  });

  // Glitch Text Effect
  const glitchText = document.querySelector('.glitch');
  if (glitchText) {
      function glitch() {
          glitchText.style.textShadow = `
              ${Math.random() * 10}px ${Math.random() * 10}px rgba(0, 255, 255, 0.5),
              -${Math.random() * 10}px -${Math.random() * 5}px rgba(255, 0, 255, 0.5)
          `;
      }
      setInterval(glitch, 100);
  }

  // Nav Scroll Effects
  const nav = document.querySelector('.parallax-nav');
  if (nav) {
      gsap.to(nav, {
          backgroundColor: 'rgba(26, 26, 46, 0.9)',
          backdropFilter: 'blur(15px)',
          scrollTrigger: {
              start: 'top top',
              toggleActions: 'play none none reverse'
          }
      });
  }
  
  // Initialize other effects
  createParticles();
  createHeaderEffect();
  initLoadingText();
  initCursorEffects();
});

// Enhanced Preloader Animation
function createParticles() {
  const particles = 50;
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  
  for(let i = 0; i < particles; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.width = particle.style.height = Math.random() * 3 + 'px';
    particle.style.animation = `particleFloat ${Math.random() * 3 + 2}s linear infinite`;
    preloader.appendChild(particle);
  }
}

// Holographic Header Effect
function createHeaderEffect() {
  const header = document.querySelector('.parallax-nav');
  if (!header) return;
  
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    header.style.background = `linear-gradient(${x * 360}deg, rgba(26,26,46,0.9) 0%, rgba(43,192,228,${y * 0.2}) 100%)`;
  });
}

// Matrix-like Loading Text
function initLoadingText() {
  const loadingText = document.querySelector('.loading-text');
  if (!loadingText) return;
  
  Array.from(loadingText.children).forEach((span, i) => {
    gsap.to(span, {
      delay: i * 0.1,
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power4.out'
    });
  });
}

// Interactive Cursor Effects
function initCursorEffects() {
  const cursorInner = document.querySelector('.cursor-inner');
  const cursorOuter = document.querySelector('.cursor-outer');
  if (!cursorInner || !cursorOuter) return;
  
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursorInner, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1
    });
    
    gsap.to(cursorOuter, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3
    });
  });

  // Hover Effects
  document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
      if (cursorOuter) cursorOuter.classList.add('cursor-hover');
      if (cursorInner) cursorInner.classList.add('cursor-inner-hover');
    });
    element.addEventListener('mouseleave', () => {
      if (cursorOuter) cursorOuter.classList.remove('cursor-hover');
      if (cursorInner) cursorInner.classList.remove('cursor-inner-hover');
    });
  });
}