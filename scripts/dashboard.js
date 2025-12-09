/**
 * ============================================
 * CERTIFIO - Dashboard Interactions
 * Mobile-first dashboard with animations
 * Enhanced with user type differentiation
 * ============================================
 */

// ============================================
// User Profile Configurations
// ============================================

const USER_PROFILES = {
  new: {
    name: 'Alex',
    displayName: 'Alex',
    xp: 0,
    level: 1,
    streak: 0,
    studyTime: 0,
    achievementsUnlocked: 0,
    totalAchievements: 24,
    enrolledCourses: [],
    completedLessons: 0,
    xpToNextLevel: 0,
    xpNextLevelTarget: 100,
    leaderboardRank: null,
    welcomeMessage: 'Welcome, Alex! 👋',
    welcomeSubtitle: 'Ready to start your learning journey?',
    showEmptyState: true,
    showOnboarding: true,
    streakDays: [false, false, false, false, false, false, false],
    checklistProgress: [false, false, false, false]
  },
  returning: {
    name: 'Alex',
    displayName: 'Alex',
    xp: 450,
    level: 5,
    streak: 7,
    studyTime: 12.5,
    achievementsUnlocked: 6,
    totalAchievements: 24,
    enrolledCourses: ['Oracle Java SE 21'],
    completedLessons: 15,
    xpToNextLevel: 50,
    xpNextLevelTarget: 100,
    leaderboardRank: 42,
    welcomeMessage: 'Welcome back, Alex! 👋',
    welcomeSubtitle: 'Let\'s continue where you left off',
    showEmptyState: false,
    showOnboarding: false,
    streakDays: [true, true, true, true, true, true, true],
    checklistProgress: [true, true, false, false]
  }
};

// ============================================
// Initialize on DOM load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initializeDashboard();
});

function initializeDashboard() {
  // Check authentication and load user profile
  const userProfile = loadUserProfile();

  // Apply user-specific data to dashboard
  if (userProfile) {
    applyUserProfile(userProfile);
  }

  // Initialize all dashboard features
  initializeHeaderScroll();
  initializeDailyChallenge();
  initializeProgressBars();
  initializeProTipCard();
  initializeAIAssistant();
  initializeChecklistItems();
  initializeNotifications();
  initializeStatsAnimation();
  initializeFadeInAnimations();
  initializeLogout();
}

// ============================================
// User Profile Management
// ============================================

function loadUserProfile() {
  // Check if user is logged in
  const isLoggedIn = sessionStorage.getItem('certifio_logged_in');
  const userType = sessionStorage.getItem('certifio_user_type');

  if (!isLoggedIn) {
    console.log('🎨 MOCKUP MODE: User not logged in, using default new user profile');
    return USER_PROFILES.new;
  }

  // Get user profile based on type
  const profile = USER_PROFILES[userType] || USER_PROFILES.new;
  console.log(`🎨 MOCKUP MODE: Loaded ${userType} user profile`);
  console.log('Profile data:', profile);

  return profile;
}

function applyUserProfile(profile) {
  console.log('🎨 Applying user profile to dashboard...');

  // Update welcome section
  updateWelcomeSection(profile);

  // Update stats
  updateStats(profile);

  // Update progress sections
  updateProgressSections(profile);

  // Update continue studying section
  updateContinueStudying(profile);

  // Update checklist
  updateChecklist(profile);

  console.log('✓ User profile applied successfully');
}

function updateWelcomeSection(profile) {
  const welcomeTitle = document.querySelector('.welcome-title');
  const welcomeSubtitle = document.querySelector('.welcome-subtitle');

  if (welcomeTitle) {
    welcomeTitle.textContent = profile.welcomeMessage;
  }

  if (welcomeSubtitle) {
    welcomeSubtitle.textContent = profile.welcomeSubtitle;
  }
}

function updateStats(profile) {
  // Update stat cards
  const statCards = document.querySelectorAll('.stat-card');

  if (statCards[0]) {
    const xpValue = statCards[0].querySelector('.stat-value');
    if (xpValue) {
      animateCountUp(xpValue, 0, profile.xp, 1000);
    }
  }

  if (statCards[1]) {
    const streakValue = statCards[1].querySelector('.stat-value');
    if (streakValue) {
      animateCountUp(streakValue, 0, profile.streak, 1000);
    }
  }

  if (statCards[2]) {
    const levelValue = statCards[2].querySelector('.stat-value');
    if (levelValue) {
      levelValue.textContent = profile.level;
    }
  }
}

function updateProgressSections(profile) {
  // Update XP progress
  const xpProgressValue = document.querySelector('.progress-card .progress-value');
  const xpProgressBar = document.querySelector('.progress-card .progress-bar');
  const xpProgressHint = document.querySelector('.progress-card .progress-hint');

  if (xpProgressValue) {
    xpProgressValue.textContent = `${profile.xpToNextLevel}/${profile.xpNextLevelTarget}`;
  }

  if (xpProgressBar) {
    const percentage = (profile.xpToNextLevel / profile.xpNextLevelTarget) * 100;
    xpProgressBar.dataset.target = percentage;
  }

  if (xpProgressHint) {
    if (profile.xpToNextLevel > 0) {
      xpProgressHint.textContent = `${profile.xpNextLevelTarget - profile.xpToNextLevel} XP to Level ${profile.level + 1}!`;
    } else {
      xpProgressHint.textContent = 'Start learning to earn XP!';
    }
  }

  // Update streak days
  const streakDaysValue = document.querySelector('.progress-card:nth-child(2) .progress-value');
  if (streakDaysValue) {
    streakDaysValue.textContent = `${profile.streak} days 🔥`;
  }

  const streakDayElements = document.querySelectorAll('.streak-day');
  streakDayElements.forEach((day, index) => {
    if (profile.streakDays[index]) {
      day.classList.remove('empty');
      day.classList.add('active');
    } else {
      day.classList.add('empty');
      day.classList.remove('active');
    }
  });

  const streakHint = document.querySelector('.progress-card:nth-child(2) .progress-hint');
  if (streakHint) {
    if (profile.streak > 0) {
      streakHint.textContent = `Amazing! Keep your ${profile.streak}-day streak going!`;
    } else {
      streakHint.textContent = 'Come back daily to build streaks!';
    }
  }

  // Update study time
  const studyTimeValue = document.querySelector('.progress-card:nth-child(3) .progress-value');
  if (studyTimeValue) {
    studyTimeValue.textContent = `${profile.studyTime} hours`;
  }
}

function updateContinueStudying(profile) {
  const continueSection = document.querySelector('.empty-state-card');

  if (!continueSection) return;

  if (profile.showEmptyState) {
    // Show empty state for new users
    continueSection.style.display = 'block';
  } else {
    // For returning users, show in-progress content
    const emptyStateIcon = continueSection.querySelector('.empty-state-icon');
    const emptyStateTitle = continueSection.querySelector('.empty-state-title');
    const emptyStateText = continueSection.querySelector('.empty-state-text');
    const emptyStateArrow = continueSection.querySelector('.empty-state-arrow');

    if (emptyStateIcon) emptyStateIcon.textContent = '📖';
    if (emptyStateTitle) emptyStateTitle.textContent = 'Continue your journey';
    if (emptyStateText) {
      emptyStateText.textContent = `You've completed ${profile.completedLessons} lessons. Keep up the great work!`;
    }
    if (emptyStateArrow) emptyStateArrow.style.display = 'none';

    continueSection.style.background = 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 160, 122, 0.1))';
    continueSection.style.borderColor = 'rgba(255, 107, 107, 0.3)';
  }
}

function updateChecklist(profile) {
  const checkboxes = document.querySelectorAll('.checklist-checkbox');

  checkboxes.forEach((checkbox, index) => {
    if (profile.checklistProgress[index]) {
      checkbox.checked = true;
      const item = checkbox.closest('.checklist-item');
      if (item) {
        item.classList.remove('incomplete');
        item.classList.add('complete');
      }
    }
  });
}

function animateCountUp(element, start, end, duration) {
  if (!element) return;

  const startTime = performance.now();
  const difference = end - start;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const current = Math.floor(start + difference * easeOutQuad(progress));
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = end;
    }
  }

  requestAnimationFrame(update);
}

function easeOutQuad(t) {
  return t * (2 - t);
}

// ============================================
// Logout Functionality
// ============================================

function initializeLogout() {
  // Add logout button click handler
  const profileBtn = document.querySelector('.profile-btn');

  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      const shouldLogout = confirm('Do you want to logout?');
      if (shouldLogout) {
        performLogout();
      }
    });
  }
}

function performLogout() {
  // Clear session data
  sessionStorage.removeItem('certifio_logged_in');
  sessionStorage.removeItem('certifio_user_type');
  sessionStorage.removeItem('certifio_user_name');

  console.log('🎨 MOCKUP MODE: User logged out');

  // Redirect to login page
  window.location.href = 'login.html';
}

// ============================================
// Header Scroll Effects
// ============================================

function initializeHeaderScroll() {
  const header = document.querySelector('.dashboard-header');
  if (!header) return;

  let lastScroll = 0;
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for visual effects
    if (currentScroll > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
}

// ============================================
// Daily Challenge Interactions
// ============================================

function initializeDailyChallenge() {
  const challengeOptions = document.querySelectorAll('.option-item input[type="radio"]');
  const submitButton = document.querySelector('.challenge-submit');

  if (!challengeOptions.length || !submitButton) return;

  // Enable submit button when option selected
  challengeOptions.forEach(option => {
    option.addEventListener('change', () => {
      submitButton.disabled = false;
      submitButton.querySelector('span').textContent = 'Submit Answer';
    });
  });

  // Handle submit
  submitButton.addEventListener('click', () => {
    const selectedOption = document.querySelector('.option-item input[type="radio"]:checked');

    if (!selectedOption) return;

    // Disable further changes
    challengeOptions.forEach(opt => opt.disabled = true);
    submitButton.disabled = true;

    // Show result (B is correct answer)
    const isCorrect = selectedOption.value === 'b';

    // Visual feedback
    const selectedLabel = selectedOption.closest('.option-item');

    if (isCorrect) {
      selectedLabel.style.borderColor = '#4CAF50';
      selectedLabel.style.background = 'rgba(76, 175, 80, 0.15)';
      submitButton.querySelector('span').textContent = '✓ Correct! +10 XP';
      submitButton.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';

      // Show confetti effect
      createConfetti(submitButton);

      // Update XP stat
      updateStatValue('.stat-value', 0, 10);
    } else {
      selectedLabel.style.borderColor = '#f44336';
      selectedLabel.style.background = 'rgba(244, 67, 54, 0.15)';
      submitButton.querySelector('span').textContent = '✗ Try again tomorrow';

      // Show correct answer
      const correctOption = document.querySelector('.option-item input[value="b"]').closest('.option-item');
      correctOption.style.borderColor = '#4CAF50';
      correctOption.style.background = 'rgba(76, 175, 80, 0.15)';
    }
  });
}

// ============================================
// Progress Bar Animations
// ============================================

function initializeProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar[data-target]');

  // Animate progress bars when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const target = parseInt(bar.dataset.target) || 0;
        animateProgressBar(bar, target);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => observer.observe(bar));
}

function animateProgressBar(bar, targetWidth) {
  // For new users, bars start at 0
  let currentWidth = 0;
  const increment = targetWidth / 60; // 60 frames

  const animate = () => {
    if (currentWidth < targetWidth) {
      currentWidth += increment;
      bar.style.width = `${Math.min(currentWidth, targetWidth)}%`;
      requestAnimationFrame(animate);
    } else {
      bar.style.width = `${targetWidth}%`;
    }
  };

  // Delay animation slightly for stagger effect
  setTimeout(() => animate(), 200);
}

// ============================================
// Stats Counter Animation
// ============================================

function initializeStatsAnimation() {
  const statValues = document.querySelectorAll('.stat-value');

  // For new users, we want to show that stats are at 0
  // But we can add a subtle pulse animation to draw attention
  statValues.forEach(stat => {
    stat.addEventListener('mouseenter', () => {
      stat.style.transform = 'scale(1.1)';
      stat.style.transition = 'transform 0.2s ease';
    });

    stat.addEventListener('mouseleave', () => {
      stat.style.transform = 'scale(1)';
    });
  });
}

function updateStatValue(selector, from, to) {
  const element = document.querySelector(selector);
  if (!element) return;

  let current = from;
  const increment = (to - from) / 30; // 30 frames

  const animate = () => {
    if (current < to) {
      current += increment;
      element.textContent = Math.round(current);
      requestAnimationFrame(animate);
    } else {
      element.textContent = to;

      // Pulse animation
      element.style.color = 'var(--accent-primary)';
      element.style.transform = 'scale(1.2)';
      setTimeout(() => {
        element.style.transform = 'scale(1)';
      }, 300);
    }
  };

  animate();
}

// ============================================
// Pro Tip Card
// ============================================

function initializeProTipCard() {
  const proTipCard = document.querySelector('.pro-tip-card');
  const closeButton = document.querySelector('.pro-tip-close');

  if (!proTipCard || !closeButton) return;

  closeButton.addEventListener('click', () => {
    proTipCard.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => {
      proTipCard.style.display = 'none';
    }, 300);
  });
}

// ============================================
// AI Assistant
// ============================================

function initializeAIAssistant() {
  const aiInput = document.querySelector('.ai-input');
  const aiSendBtn = document.querySelector('.ai-send-btn');
  const promptSuggestions = document.querySelectorAll('.prompt-suggestion');

  if (!aiInput || !aiSendBtn) return;

  // Handle send button click
  aiSendBtn.addEventListener('click', () => {
    handleAIMessage(aiInput.value);
  });

  // Handle enter key
  aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleAIMessage(aiInput.value);
    }
  });

  // Handle prompt suggestions
  promptSuggestions.forEach(suggestion => {
    suggestion.addEventListener('click', () => {
      const promptText = suggestion.querySelector('.prompt-text').textContent;
      aiInput.value = promptText;
      aiInput.focus();
    });
  });
}

function handleAIMessage(message) {
  if (!message.trim()) return;

  const aiInput = document.querySelector('.ai-input');

  // Visual feedback
  aiInput.value = '';
  aiInput.placeholder = 'AI is thinking...';

  // Simulate AI response (in real app, this would call API)
  setTimeout(() => {
    aiInput.placeholder = 'Ask your AI study assistant...';
    showNotification('💬 AI feature coming soon! This is a mockup demo.');
  }, 1000);
}

// ============================================
// Checklist Items
// ============================================

function initializeChecklistItems() {
  const checkboxes = document.querySelectorAll('.checklist-checkbox');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const item = e.target.closest('.checklist-item');

      if (e.target.checked) {
        item.classList.remove('incomplete');
        item.classList.add('complete');

        // Show celebration for first completed item
        if (document.querySelectorAll('.checklist-checkbox:checked').length === 1) {
          showNotification('🎉 Great start! Keep going!');
        }
      } else {
        item.classList.add('incomplete');
        item.classList.remove('complete');
      }

      // Update progress
      updateChecklistProgress();
    });
  });
}

function updateChecklistProgress() {
  const total = document.querySelectorAll('.checklist-checkbox').length;
  const checked = document.querySelectorAll('.checklist-checkbox:checked').length;

  // Could update a progress indicator here
  console.log(`Checklist progress: ${checked}/${total}`);
}

// ============================================
// Notifications
// ============================================

function initializeNotifications() {
  const notificationBtn = document.querySelector('.notification-btn');

  if (!notificationBtn) return;

  // Pulse animation for new user tips
  setInterval(() => {
    const dot = notificationBtn.querySelector('.notification-dot');
    if (dot) {
      dot.style.animation = 'pulse 2s ease-in-out';
      setTimeout(() => {
        dot.style.animation = '';
      }, 2000);
    }
  }, 5000);

  notificationBtn.addEventListener('click', () => {
    showNotification('👋 Welcome! Complete your first challenge to start earning XP!');
  });
}

function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'toast-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%) translateY(-100px);
    background: rgba(255, 107, 107, 0.95);
    color: var(--bg-darkest);
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 14px;
    box-shadow: 0 8px 24px rgba(255, 107, 107, 0.4);
    z-index: 1000;
    backdrop-filter: blur(10px);
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    max-width: 90%;
    text-align: center;
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(-50%) translateY(0)';
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(-50%) translateY(-100px)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 400);
  }, 3000);
}

// ============================================
// Confetti Effect
// ============================================

function createConfetti(targetElement) {
  const colors = ['#FF6B6B', '#FFA07A', '#FFD700', '#4CAF50', '#66BB6A'];
  const confettiCount = 30;

  const rect = targetElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < confettiCount; i++) {
    createConfettiPiece(centerX, centerY, colors[i % colors.length]);
  }
}

function createConfettiPiece(x, y, color) {
  const confetti = document.createElement('div');
  confetti.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 10px;
    height: 10px;
    background: ${color};
    pointer-events: none;
    z-index: 9999;
    border-radius: 50%;
  `;

  document.body.appendChild(confetti);

  // Random animation values
  const angle = Math.random() * Math.PI * 2;
  const velocity = 3 + Math.random() * 5;
  const vx = Math.cos(angle) * velocity;
  const vy = Math.sin(angle) * velocity - 5; // Initial upward velocity

  let posX = 0;
  let posY = 0;
  let velocityY = vy;
  const gravity = 0.3;
  let opacity = 1;

  const animate = () => {
    posX += vx;
    posY += velocityY;
    velocityY += gravity;
    opacity -= 0.02;

    confetti.style.transform = `translate(${posX}px, ${posY}px) rotate(${posX * 2}deg)`;
    confetti.style.opacity = opacity;

    if (opacity > 0) {
      requestAnimationFrame(animate);
    } else {
      document.body.removeChild(confetti);
    }
  };

  animate();
}

// ============================================
// Fade-in Animations (Intersection Observer)
// ============================================

function initializeFadeInAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
  });
}

// ============================================
// Additional Interaction Enhancements
// ============================================

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Add touch feedback for mobile
if ('ontouchstart' in window) {
  document.querySelectorAll('.cta, .btn-secondary, .nav-item, .icon-btn').forEach(button => {
    button.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.97)';
    });

    button.addEventListener('touchend', function() {
      this.style.transform = '';
    });
  });
}

// Keyboard navigation for bottom nav
document.querySelectorAll('.nav-item').forEach((item, index) => {
  item.addEventListener('keydown', (e) => {
    const items = document.querySelectorAll('.nav-item');

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % items.length;
      items[nextIndex].focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + items.length) % items.length;
      items[prevIndex].focus();
    }
  });
});

// ============================================
// Feature Demo Functions (for mockup purposes)
// ============================================

// Certification path enrollment
document.querySelectorAll('.btn-enroll').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const pathCard = button.closest('.certification-path-card');
    const pathTitle = pathCard.querySelector('.path-title').textContent;

    showNotification(`📚 Enrollment feature coming soon! Path: ${pathTitle.substring(0, 30)}...`);
  });
});

// Community topics
document.querySelectorAll('.topic-item').forEach(topic => {
  topic.addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('💬 Community features coming soon in the full version!');
  });
});

// Leaderboard link
const leaderboardLink = document.querySelector('.view-full-link');
if (leaderboardLink) {
  leaderboardLink.addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('🏆 Full leaderboard coming soon!');
  });
}

// Premium upgrade
document.querySelectorAll('.premium-card .cta').forEach(button => {
  button.addEventListener('click', () => {
    showNotification('👑 Premium features will be available in the full release!');
  });
});

// ============================================
// Console welcome message
// ============================================

console.log(
  '%c🎯 CERTIFIO Dashboard ',
  'background: linear-gradient(135deg, #FF6B6B, #FFA07A); color: #0B0B15; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 8px;'
);

console.log(
  '%cWelcome to your learning dashboard! This is a design mockup showcasing the new user experience.',
  'color: #FF6B6B; font-size: 14px; padding: 5px 0;'
);

console.log(
  '%cKey Features:\n• AI-powered daily challenges\n• Progress tracking & achievements\n• Gamified learning with XP & streaks\n• Community discussions\n• Premium analytics (coming soon)',
  'color: #9898AC; font-size: 12px; line-height: 1.6;'
);
