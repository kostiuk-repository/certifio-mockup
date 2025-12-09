/**
 * CERTIFIO - Interactions & Micro-animations
 * Apple-quality hover effects and user interactions
 */

// ============================================
// Card Hover Tilt Effect
// ============================================

function initCardTilt() {
  const cards = document.querySelectorAll('.glass-card, .feature-card, .path-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', handleCardTilt);
    card.addEventListener('mouseleave', resetCardTilt);
  });
}

function handleCardTilt(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();

  // Calculate mouse position relative to card center
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // Calculate tilt angles (subtle for Apple-like feel)
  const rotateX = ((y - centerY) / centerY) * -3;
  const rotateY = ((x - centerX) / centerX) * 3;

  // Apply transform
  requestAnimationFrame(() => {
    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(10px)
    `;
  });
}

function resetCardTilt(e) {
  const card = e.currentTarget;
  requestAnimationFrame(() => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });
}

// ============================================
// Button Ripple Effect
// ============================================

function initRippleEffect() {
  const buttons = document.querySelectorAll('.cta, .btn-secondary, .join-btn');

  buttons.forEach(button => {
    button.addEventListener('click', createRipple);
  });
}

function createRipple(e) {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();

  // Create ripple element
  const ripple = document.createElement('span');
  const diameter = Math.max(rect.width, rect.height);
  const radius = diameter / 2;

  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${e.clientX - rect.left - radius}px`;
  ripple.style.top = `${e.clientY - rect.top - radius}px`;
  ripple.classList.add('ripple');

  // Remove existing ripples
  const existingRipple = button.querySelector('.ripple');
  if (existingRipple) {
    existingRipple.remove();
  }

  button.appendChild(ripple);

  // Remove ripple after animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add ripple CSS dynamically
function addRippleStyles() {
  if (document.getElementById('ripple-styles')) return;

  const style = document.createElement('style');
  style.id = 'ripple-styles';
  style.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: rippleAnimation 0.6s ease-out;
      pointer-events: none;
    }

    @keyframes rippleAnimation {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }

    .cta, .btn-secondary, .join-btn {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// Cursor Follow Effect (Desktop only)
// ============================================

function initCursorFollow() {
  // Only on devices with hover capability
  if (!window.matchMedia('(hover: hover)').matches) return;

  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  let cursorX = 0;
  let cursorY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  function animateCursor() {
    // Smooth lerp
    currentX += (cursorX - currentX) * 0.15;
    currentY += (cursorY - currentY) * 0.15;

    cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Scale cursor on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .glass-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform += ' scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
    });
  });
}

function addCursorStyles() {
  if (document.getElementById('cursor-styles')) return;

  const style = document.createElement('style');
  style.id = 'cursor-styles';
  style.textContent = `
    .custom-cursor {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--accent-primary);
      position: fixed;
      top: -6px;
      left: -6px;
      pointer-events: none;
      z-index: 10000;
      mix-blend-mode: difference;
      transition: transform 0.15s ease;
      opacity: 0.6;
    }

    @media (hover: none) {
      .custom-cursor {
        display: none;
      }
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// Magnetic Button Effect
// ============================================

function initMagneticButtons() {
  const buttons = document.querySelectorAll('.cta, .join-btn');

  buttons.forEach(button => {
    button.addEventListener('mousemove', handleMagneticMove);
    button.addEventListener('mouseleave', handleMagneticLeave);
  });
}

function handleMagneticMove(e) {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  // Magnetic pull strength
  const strength = 0.3;

  requestAnimationFrame(() => {
    button.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  });
}

function handleMagneticLeave(e) {
  const button = e.currentTarget;
  requestAnimationFrame(() => {
    button.style.transform = 'translate(0, 0)';
  });
}

// ============================================
// Number Counter Animation
// ============================================

function animateNumbers() {
  const numbers = document.querySelectorAll('[data-count]');

  numbers.forEach(element => {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateNumber = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = target;
      }
    };

    // Observe and animate when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateNumber();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(element);
  });
}

// ============================================
// Keyboard Navigation Enhancement
// ============================================

function initKeyboardNav() {
  // Add visual feedback for keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });
}

function addKeyboardNavStyles() {
  if (document.getElementById('keyboard-nav-styles')) return;

  const style = document.createElement('style');
  style.id = 'keyboard-nav-styles';
  style.textContent = `
    body:not(.keyboard-nav) *:focus {
      outline: none;
    }

    .keyboard-nav *:focus-visible {
      outline: 2px solid var(--accent-primary);
      outline-offset: 4px;
      border-radius: 4px;
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// Scroll Progress Indicator
// ============================================

function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.classList.add('scroll-progress');
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;

    requestAnimationFrame(() => {
      progressBar.style.width = `${scrolled}%`;
    });
  }, { passive: true });
}

function addScrollProgressStyles() {
  if (document.getElementById('scroll-progress-styles')) return;

  const style = document.createElement('style');
  style.id = 'scroll-progress-styles';
  style.textContent = `
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--accent-primary), #FFA07A);
      z-index: 10000;
      transition: width 0.1s ease-out;
      box-shadow: 0 0 10px var(--accent-primary-glow);
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// Image Lazy Loading Enhancement
// ============================================

function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ============================================
// Initialize All Interactions
// ============================================

function initInteractions() {
  // Add required styles
  addRippleStyles();
  addKeyboardNavStyles();
  addScrollProgressStyles();

  // Initialize effects
  initCardTilt();
  initRippleEffect();
  initMagneticButtons();
  initKeyboardNav();
  initScrollProgress();
  animateNumbers();
  initLazyLoading();

  // Desktop-only effects
  if (window.matchMedia('(hover: hover)').matches) {
    addCursorStyles();
    initCursorFollow();
  }

  console.log('✨ Interactions initialized');
}

// ============================================
// Run on DOM Content Loaded
// ============================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInteractions);
} else {
  initInteractions();
}
