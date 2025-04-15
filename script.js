// Pronouns and Prepositions from readme.txt
const pronouns = [
  'all', 'another', 'any', 'anybody', 'anyone', 'anything', 'as', 'aught', 'both', 'each',
  'each other', 'either', 'everybody', 'everyone', 'everything', 'few', 'he', 'her', 'hers',
  'herself', 'him', 'himself', 'his', 'i', 'it', 'its', 'itself', 'many', 'me', 'mine',
  'most', 'my', 'myself', 'naught', 'neither', 'no one', 'nobody', 'none', 'nothing',
  'one', 'one another', 'other', 'others', 'ought', 'our', 'ours', 'ourselves', 'several',
  'she', 'some', 'somebody', 'someone', 'something', 'such', 'that', 'their', 'theirs',
  'them', 'themselves', 'these', 'they', 'this', 'those', 'thou', 'thee', 'thy', 'thine',
  'us', 'we', 'what', 'whatever', 'which', 'whichever', 'who', 'whoever', 'whom',
  'whomever', 'whose', 'ye', 'you', 'your', 'yours', 'yourself', 'yourselves'
];

const prepositions = [
  'aboard', 'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among',
  'around', 'as', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between',
  'beyond', 'but', 'by', 'concerning', 'considering', 'despite', 'down', 'during',
  'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'minus', 'near', 'of',
  'off', 'on', 'onto', 'opposite', 'outside', 'over', 'past', 'per', 'plus', 'regarding',
  'round', 'since', 'than', 'through', 'to', 'toward', 'towards', 'under', 'underneath',
  'unlike', 'until', 'up', 'upon', 'versus', 'via', 'with', 'within', 'without',
  'according to', 'ahead of', 'apart from', 'as for', 'as of', 'as per', 'as regards',
  'aside from', 'back to', 'because of', 'close to', 'due to', 'except for', 'far from',
  'in addition to', 'in front of', 'in lieu of', 'in place of', 'in spite of', 'instead of',
  'near to', 'next to', 'on behalf of', 'on top of', 'out of', 'outside of', 'owing to',
  'prior to', 'pursuant to', 'regardless of', 'subsequent to', 'thanks to', 'up to',
  'with regard to', 'a la', 'as far as', 'as well as', 'by means of', 'in accordance with',
  'in case of', 'in favour of', 'in favor of', 'in light of', 'in terms of', 'on account of',
  'vis-a-vis', 'with respect to', 'along with', 'away from', 'but for', 'contrary to',
  'depending on', 'further to', 'irrespective of', 'other than', 'preparatory to',
  'together with', 'up against', 'with reference to'
];

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

// Event Tracking
function initEventTracking() {
  // Page View
  logEvent('view', 'page', document.title);

  // Click Events
  document.addEventListener('click', (e) => {
      const target = e.target;
      // Check if the clicked element is an image
      if (target.tagName.toLowerCase() === 'img') {
          logEvent('click', 'image', 'picture');
      } else {
          let elementType = getElementType(target);
          let elementContent = getElementContent(target);
          logEvent('click', elementType, elementContent);
      }
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

  // Track All Interactive Elements
  trackAllElements();
}

function trackAllElements() {
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
      trackElementView(item, 'education-item', `Education Item ${index + 1}`);
  });

  // Skills
  document.querySelectorAll('#skills .skill-card').forEach((card, index) => {
      trackElementView(card, 'skill-card', `Skill Card ${index + 1}`);
  });

  // Navigation Links
  document.querySelectorAll('.nav-link').forEach((link, index) => {
      trackElementView(link, 'hyperlink', `Nav Link ${index + 1}`);
  });

  // Contact Cards
  document.querySelectorAll('.contact-card').forEach((card, index) => {
      trackElementView(card, 'contact-card', `Contact Card ${index + 1}`);
  });

  // Social Links
  document.querySelectorAll('.social-icon').forEach((link, index) => {
      trackElementView(link, 'hyperlink', `Social Link ${index + 1}`);
  });

  // CV Download
  const cvLink = document.querySelector('a[href*="resume.pdf"]');
  if (cvLink) {
      cvLink.addEventListener('click', () => {
          logEvent('click', 'hyperlink', 'CV Download');
      });
  }

  // Text Analysis Button
  const analyzeBtn = document.getElementById('analyze-text');
  if (analyzeBtn) {
      trackElementView(analyzeBtn, 'button', 'Analyze Text Button');
  }

  // Text Input
  const textInput = document.getElementById('text-input');
  if (textInput) {
      trackElementView(textInput, 'text-area', 'Text Analysis Input');
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
  if (element.closest('.skill-card')) return 'skill-card';
  if (element.closest('.timeline-item')) return 'education-item';
  if (element.closest('.contact-card')) return 'contact-card';
  if (element.closest('p') && element.tagName !== 'A') return 'text';
  return tagName;
}

function getElementContent(element) {
  let content = element.textContent?.trim();
  if (!content && element.tagName.toLowerCase() === 'img') content = element.alt;
  if (!content && element.tagName.toLowerCase() === 'input') content = element.placeholder || element.id;
  if (!content && element.tagName.toLowerCase() === 'a') content = element.href;
  if (!content && element.tagName.toLowerCase() === 'textarea') content = element.placeholder || element.id;
  if (!content) content = `${getElementType(element)} element`;
  return content.length > 50 ? content.substring(0, 47) + '...' : content;
}

function logEvent(eventType, objectType, objectContent) {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}, ${eventType}, ${objectType}: ${objectContent}`);
}

// Text Analysis
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

      // Calculate Stats
      const stats = calculateTextStats(text);
      const pronounCounts = countPronouns(text);
      const prepositionCounts = countPrepositions(text);
      const articleCounts = countArticles(text);

      // Filter non-zero counts
      const nonZeroPronouns = Object.fromEntries(
          Object.entries(pronounCounts).filter(([_, count]) => count > 0)
      );
      const nonZeroPrepositions = Object.fromEntries(
          Object.entries(prepositionCounts).filter(([_, count]) => count > 0)
      );
      const nonZeroArticles = Object.fromEntries(
          Object.entries(articleCounts).filter(([_, count]) => count > 0)
      );

      // Display Results
      resultsDiv.innerHTML = `
          <h3>Text Statistics</h3>
          <p>Letters: ${stats.letters}</p>
          <p>Words: ${stats.words}</p>
          <p>Spaces: ${stats.spaces}</p>
          <p>Newlines: ${stats.newlines}</p>
          <p>Special Symbols: ${stats.specialSymbols}</p>
          <h3>Pronouns (Non-Zero Counts)</h3>
          <pre>${
              Object.keys(nonZeroPronouns).length > 0
                  ? JSON.stringify(nonZeroPronouns, null, 2)
                  : 'No pronouns found.'
          }</pre>
          <h3>Prepositions (Non-Zero Counts)</h3>
          <pre>${
              Object.keys(nonZeroPrepositions).length > 0
                  ? JSON.stringify(nonZeroPrepositions, null, 2)
                  : 'No prepositions found.'
          }</pre>
          <h3>Indefinite Articles (Non-Zero Counts)</h3>
          <pre>${
              Object.keys(nonZeroArticles).length > 0
                  ? JSON.stringify(nonZeroArticles, null, 2)
                  : 'No indefinite articles found.'
          }</pre>
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
  const words = text.toLowerCase().split(/\s+/).filter(word => word);
  const counts = {};

  pronouns.forEach(pronoun => {
      counts[pronoun] = words.filter(word => word === pronoun).length;
  });

  return counts;
}

function countPrepositions(text) {
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