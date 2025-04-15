document.addEventListener('DOMContentLoaded', () => {
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

  // Initialize Typewriter
  initTypewriter();

  // Initialize Event Tracking
  initEventTracking();

  // Initialize Text Analysis
  initTextAnalysis();

  // Smooth Scroll for Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
      });
  });

  // Animate Loading Text
  const loadingText = document.querySelector('.digital-loading');
  if (loadingText) {
      Array.from(loadingText.children).forEach((span, i) => {
          gsap.to(span, {
              delay: i * 0.1,
              opacity: 1,
              y: 0,
              duration: 0.5
          });
      });
  }
});

// Typewriter Effect
function initTypewriter() {
  const typewriterText = document.getElementById('typewriter-text');
  if (!typewriterText) return;
  const texts = ["AI Language Specialist", "Full-Stack Developer", "Problem Solver"];
  let textIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
      const currentText = texts[textIndex];
      typewriterText.textContent = isDeleting
          ? currentText.substring(0, charIndex - 1)
          : currentText.substring(0, charIndex + 1);
      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

      let typeSpeed = isDeleting ? 50 : 150;
      if (!isDeleting && charIndex === currentText.length) {
          typeSpeed = 1500;
          isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
  }

  setTimeout(type, 1000);
}

// Event Tracking (Q2)
function initEventTracking() {
  // Page View
  logEvent('view', 'page', document.title);

  // Click Events
  document.addEventListener('click', (e) => {
      const target = e.target;
      let elementType = getElementType(target);
      let elementContent = getElementContent(target);
      logEvent('click', elementType, elementContent);
  });

  // Section Views
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              logEvent('view', 'section', entry.target.id || 'unknown-section');
          }
      });
  }, { threshold: 0.5 });

  sections.forEach(section => observer.observe(section));

  // Specific Elements
  trackSpecificElements();
}

function trackSpecificElements() {
  // Profile Picture
  const profilePic = document.querySelector('.profile-pic');
  if (profilePic) trackElementView(profilePic, 'image', 'Profile Picture');

  // Birthplace Images
  document.querySelectorAll('#gallery img').forEach((img, index) => {
      trackElementView(img, 'image', `Birthplace Image ${index + 1}`);
  });

  // About Paragraphs
  document.querySelectorAll('#about p').forEach((p, index) => {
      trackElementView(p, 'text', `About Paragraph ${index + 1}`);
  });

  // Education Items
  document.querySelectorAll('#education .timeline-item').forEach((item, index) => {
      trackElementView(item, 'text', `Education Item ${index + 1}`);
  });

  // Skills
  document.querySelectorAll('#skills .skill-card').forEach((card, index) => {
      trackElementView(card, 'text', `Skill Card ${index + 1}`);
  });

  // CV Download
  const cvLink = document.querySelector('a[href*="Claude_Resume.pdf"]');
  if (cvLink) {
      cvLink.addEventListener('click', () => {
          logEvent('click', 'hyperlink', 'CV Download');
      });
  }
}

function trackElementView(element, type, content) {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              logEvent('view', type, content);
              observer.unobserve(element);
          }
      });
  }, { threshold: 0.7 });
  observer.observe(element);
}

function getElementType(element) {
  if (!element) return 'unknown';
  const tagName = element.tagName.toLowerCase();
  if (tagName === 'a') return 'hyperlink';
  if (tagName === 'button') return 'button';
  if (tagName === 'img') return 'image';
  if (tagName === 'input') {
      const type = element.getAttribute('type');
      if (type === 'submit') return 'button';
      return 'input-field';
  }
  if (tagName === 'textarea') return 'text-area';
  if (element.closest('p')) return 'text';
  if (element.classList.contains('skill-card')) return 'skill-card';
  if (element.closest('.timeline-item')) return 'education-item';
  return tagName;
}

function getElementContent(element) {
  let content = element.textContent?.trim();
  if (!content && element.tagName.toLowerCase() === 'img') content = element.alt;
  if (!content && element.tagName.toLowerCase() === 'input') content = element.placeholder || element.id;
  if (!content && element.tagName.toLowerCase() === 'a') content = element.href;
  if (!content) content = `${getElementType(element)} element`;
  return content.length > 50 ? content.substring(0, 47) + '...' : content;
}

function logEvent(eventType, objectType, objectContent) {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}, ${eventType}, ${objectType}: ${objectContent}`);
}

// Text Analysis (Q3)
function initTextAnalysis() {
  const analyzeBtn = document.getElementById('analyze-text');
  const textInput = document.getElementById('text-input');
  const resultsDiv = document.getElementById('analysis-results');

  if (!analyzeBtn || !textInput || !resultsDiv) return;

  analyzeBtn.addEventListener('click', () => {
      const text = textInput.value;
      if (!text) {
          resultsDiv.innerHTML = '<p>Please enter some text to analyze.</p>';
          return;
      }

      // Basic Stats
      const stats = calculateTextStats(text);
      const pronounCounts = countPronouns(text);
      const prepositionCounts = countPrepositions(text);
      const articleCounts = countArticles(text);

      // Display Results
      resultsDiv.innerHTML = `
          <h3>Text Statistics</h3>
          <p>Letters: ${stats.letters}</p>
          <p>Words: ${stats.words}</p>
          <p>Spaces: ${stats.spaces}</p>
          <p>Newlines: ${stats.newlines}</p>
          <p>Special Symbols: ${stats.specialSymbols}</p>
          <h3>Pronouns</h3>
          <pre>${JSON.stringify(pronounCounts, null, 2)}</pre>
          <h3>Prepositions</h3>
          <pre>${JSON.stringify(prepositionCounts, null, 2)}</pre>
          <h3>Indefinite Articles</h3>
          <pre>${JSON.stringify(articleCounts, null, 2)}</pre>
      `;
  });
}

function calculateTextStats(text) {
  const letters = text.match(/[a-zA-Z]/g)?.length || 0;
  const words = text.split(/\s+/).filter(word => word).length;
  const spaces = text.match(/\s/g)?.length || 0;
  const newlines = text.match(/\n/g)?.length || 0;
  const specialSymbols = text.match(/[^a-zA-Z0-9\s]/g)?.length || 0;

  return { letters, words, spaces, newlines, specialSymbols };
}

function countPronouns(text) {
  const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'];
  const words = text.toLowerCase().split(/\s+/).filter(word => word);
  const counts = {};

  pronouns.forEach(pronoun => {
      counts[pronoun] = words.filter(word => word === pronoun).length;
  });

  return counts;
}

function countPrepositions(text) {
  const prepositions = ['of', 'in', 'to', 'for', 'with', 'on', 'at', 'from', 'by', 'about', 'as', 'into', 'like'];
  const words = text.toLowerCase().split(/\s+/).filter(word => word);
  const counts = {};

  prepositions.forEach(prep => {
      counts[prep] = words.filter(word => word === prep).length;
  });

  return counts;
}

function countArticles(text) {
  const articles = ['a', 'an'];
  const words = text.toLowerCase().split(/\s+/).filter(word => word);
  const counts = {};

  articles.forEach(article => {
      counts[article] = words.filter(word => word === article).length;
  });

  return counts;
}