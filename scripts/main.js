/**
 * CERTIFIO - Main JavaScript
 * Intersection observers, progress bars, and core functionality
 */

// ============================================
// Intersection Observer for Fade-in Animations
// ============================================

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add visible class with slight delay for stagger effect
      requestAnimationFrame(() => {
        entry.target.classList.add('visible');
      });

      // Animate progress bars if present
      if (entry.target.classList.contains('progress') ||
          entry.target.querySelector('.progress')) {
        animateProgressBars(entry.target);
      }

      // Unobserve after animation to improve performance
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// ============================================
// Progress Bar Animation
// ============================================

function animateProgressBars(element) {
  const progressElements = element.classList.contains('progress')
    ? [element]
    : element.querySelectorAll('.progress');

  progressElements.forEach(progress => {
    const bar = progress.querySelector('.progress-bar');
    if (!bar) return;

    const targetWidth = progress.dataset.target || 0;

    // Use requestAnimationFrame for smooth animation
    requestAnimationFrame(() => {
      setTimeout(() => {
        bar.style.width = `${targetWidth}%`;
      }, 100); // Slight delay for better visual effect
    });
  });
}

// ============================================
// Smooth Scroll for Navigation
// ============================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ============================================
// Header Scroll Effect
// ============================================

function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  let lastScroll = 0;
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

// ============================================
// Parallax Effect for Hero Visual
// ============================================

function initParallax() {
  const heroVisual = document.querySelector('.hero-visual');
  if (!heroVisual) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.3;

    requestAnimationFrame(() => {
      heroVisual.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
  }, { passive: true });
}

// ============================================
// Dynamic Background Gradient
// ============================================

function initDynamicBackground() {
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
  });

  function animate() {
    // Smooth lerp for fluid motion
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    // Update CSS custom property for dynamic gradient
    document.documentElement.style.setProperty('--mouse-x', `${currentX * 100}%`);
    document.documentElement.style.setProperty('--mouse-y', `${currentY * 100}%`);

    requestAnimationFrame(animate);
  }

  animate();
}

// ============================================
// Performance Monitoring
// ============================================

function logPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const perfData = performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    });
  }
}

// ============================================
// Initialize All Features
// ============================================

function init() {
  // Observe all fade-in elements
  document.querySelectorAll('.fade-in').forEach(el => {
    fadeInObserver.observe(el);
  });

  // Observe progress bars separately
  document.querySelectorAll('.progress').forEach(el => {
    fadeInObserver.observe(el);
  });

  // Initialize smooth scroll
  initSmoothScroll();

  // Initialize header scroll effect
  initHeaderScroll();

  // Initialize parallax (only on desktop)
  if (window.innerWidth > 768) {
    initParallax();
  }

  // Initialize dynamic background
  if (window.matchMedia('(hover: hover)').matches) {
    initDynamicBackground();
  }

  // Log performance in development
  if (window.location.hostname === 'localhost') {
    logPerformance();
  }

  console.log('🚀 CERTIFIO initialized');
}

// ============================================
// Run on DOM Content Loaded
// ============================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ============================================
// Handle Visibility Change (Performance)
// ============================================

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when tab is not visible
    console.log('⏸️ Page hidden - pausing animations');
  } else {
    // Resume animations when tab becomes visible
    console.log('▶️ Page visible - resuming animations');
  }
});

// ============================================
// Resize Handler with Debounce
// ============================================

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Re-initialize parallax on resize
    if (window.innerWidth > 768) {
      initParallax();
    }
  }, 250);
}, { passive: true });
