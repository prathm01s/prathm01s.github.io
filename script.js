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
        display: 'none'
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