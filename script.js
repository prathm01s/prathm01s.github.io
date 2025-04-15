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
  
  // Progress bar animation for preloader
  const progressBar = document.querySelector('.progress');
  if (progressBar) {
      gsap.to(progressBar, {
          width: '100%',
          duration: 2.5,
          ease: 'power1.inOut'
      });
  }

  // Initialize typewriter effect
  initTypewriter();
  
  // Setup scroll to top button
  setupScrollToTop();
  
  // Fix cursor visibility issue by applying proper z-index and ensuring initial position
  fixCursorVisibility();
});

// Fix for cursor visibility
function fixCursorVisibility() {
  const cursorInner = document.querySelector('.cursor-inner');
  const cursorOuter = document.querySelector('.cursor-outer');
  
  if (cursorInner && cursorOuter) {
      // Set initial position to prevent cursor from being in the top-left corner
      cursorInner.style.top = '50%';
      cursorInner.style.left = '50%';
      cursorOuter.style.top = '50%';
      cursorOuter.style.left = '50%';
      
      // Ensure high z-index
      cursorInner.style.zIndex = '9999';
      cursorOuter.style.zIndex = '9998';
      
      // Make cursor visible
      cursorInner.style.opacity = '1';
      cursorOuter.style.opacity = '1';
      
      // Add event listener for mouse movement
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
              cursorOuter.classList.add('cursor-hover');
              cursorInner.classList.add('cursor-inner-hover');
          });
          element.addEventListener('mouseleave', () => {
              cursorOuter.classList.remove('cursor-hover');
              cursorInner.classList.remove('cursor-inner-hover');
          });
      });
  }
}

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

// Initialize Typewriter effect
function initTypewriter() {
  const typewriterText = document.getElementById('typewriter-text');
  if (!typewriterText) return;
  
  const texts = [
      "AI Language Specialist",
      "Full-Stack Developer",
      "Problem Solver",
      "Creative Thinker"
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
          typewriterText.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
      } else {
          typewriterText.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
      }
      
      // Speed for typing and deleting
      let typeSpeed = isDeleting ? 50 : 150;
      
      // If complete word, pause then start deleting
      if (!isDeleting && charIndex === currentText.length) {
          typeSpeed = 1500; // Pause at end of word
          isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          typeSpeed = 500; // Pause before typing next word
      }
      
      setTimeout(type, typeSpeed);
  }
  
  // Start the typewriter effect
  setTimeout(type, 1000);
}

// Setup scroll to top button
function setupScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if (!scrollToTopBtn) return;
  
  window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
          scrollToTopBtn.style.display = 'block';
          scrollToTopBtn.style.opacity = '1';
      } else {
          scrollToTopBtn.style.opacity = '0';
          setTimeout(() => {
              if (document.body.scrollTop <= 500 && document.documentElement.scrollTop <= 500) {
                  scrollToTopBtn.style.display = 'none';
              }
          }, 300);
      }
  });
  
  scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
}

// Set up smooth scrolling for navigation links without locomotive scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
          window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
          });
      }
  });
});

// Initialize Vanilla Tilt
document.addEventListener('DOMContentLoaded', () => {
  if (typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
          max: 15,
          speed: 400,
          glare: true,
          "max-glare": 0.3
      });
  }
});