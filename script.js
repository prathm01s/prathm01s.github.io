document.addEventListener('DOMContentLoaded', () => {
    // Locomotive Scroll for smooth scrolling
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });

    // GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Preloader Animation
    const preloader = document.getElementById('preloader');
    gsap.to(preloader, {
      opacity: 0,
      duration: 1,
      delay: 3,
      onComplete: () => {
          preloader.style.display = 'none';
      }
    });
  

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
    function glitch() {
        glitchText.style.textShadow = `
            ${Math.random() * 10}px ${Math.random() * 10}px rgba(0, 255, 255, 0.5),
            -${Math.random() * 10}px -${Math.random() * 5}px rgba(255, 0, 255, 0.5)
        `;
    }
    setInterval(glitch, 100);

    // Nav Scroll Effects
    const nav = document.querySelector('.parallax-nav');
    gsap.to(nav, {
        backgroundColor: 'rgba(26, 26, 46, 0.9)',
        backdropFilter: 'blur(15px)',
        scrollTrigger: {
            start: 'top top',
            toggleActions: 'play none none reverse'
        }
    });
});

// Enhanced Preloader Animation
function createParticles() {
    const particles = 50;
    for(let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.width = particle.style.height = Math.random() * 3 + 'px';
      particle.style.animation = `particleFloat ${Math.random() * 3 + 2}s linear infinite`;
      document.getElementById('preloader').appendChild(particle);
    }
  }
  
  // Holographic Header Effect
  function createHeaderEffect() {
    const header = document.querySelector('.parallax-nav');
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      header.style.background = `linear-gradient(${x * 360}deg, rgba(26,26,46,0.9) 0%, rgba(43,192,228,${y * 0.2}) 100%)`;
    });
  }
  
  // Initialize Enhanced Effects
  document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createHeaderEffect();
    
    // Matrix-like Loading Text
    const loadingText = document.querySelector('.loading-text');
    Array.from(loadingText.children).forEach((span, i) => {
      gsap.to(span, {
        delay: i * 0.1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power4.out'
      });
    });
  
    // Interactive Cursor Effects
    document.addEventListener('mousemove', (e) => {
      const cursorInner = document.querySelector('.cursor-inner');
      const cursorOuter = document.querySelector('.cursor-outer');
      
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
        document.querySelector('.cursor-outer').classList.add('cursor-hover');
        document.querySelector('.cursor-inner').classList.add('cursor-inner-hover');
      });
      element.addEventListener('mouseleave', () => {
        document.querySelector('.cursor-outer').classList.remove('cursor-hover');
        document.querySelector('.cursor-inner').classList.remove('cursor-inner-hover');
      });
    });
  });

  