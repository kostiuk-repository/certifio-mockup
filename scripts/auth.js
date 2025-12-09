/**
 * CERTIFIO - Authentication Page Interactions
 *
 * IMPORTANT: This is a UI mockup for designer review only.
 * No real validation, authentication, or backend integration.
 * Minimal interactions for visual demonstration purposes.
 */

// ============================================
// Fade-in Animation on Page Load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Trigger fade-in animation for auth card
  const authCard = document.querySelector('.auth-card');
  if (authCard) {
    // Add visible class after a short delay for smoother appearance
    setTimeout(() => {
      authCard.classList.add('visible');
    }, 100);
  }
});

// ============================================
// Password Toggle Functionality (Visual Only)
// ============================================

const passwordToggles = document.querySelectorAll('.password-toggle');

passwordToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const wrapper = toggle.closest('.password-input-wrapper');
    const input = wrapper.querySelector('input');
    const eyeIcon = toggle.querySelector('.eye-icon');

    // Toggle password visibility
    if (input.type === 'password') {
      input.type = 'text';
      // Change icon to "eye-off" (just change opacity for mockup)
      eyeIcon.style.opacity = '0.6';
    } else {
      input.type = 'password';
      eyeIcon.style.opacity = '1';
    }
  });
});

// ============================================
// Form Submit with User Type Validation (Mockup Only)
// ============================================

const authForms = document.querySelectorAll('.auth-form');

authForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form inputs
    const emailInput = form.querySelector('input[type="email"]');
    const emailValue = emailInput ? emailInput.value.toLowerCase().trim() : '';

    // Visual feedback only - no actual submission
    const submitBtn = form.querySelector('.auth-submit-btn');
    const originalText = submitBtn.querySelector('span').textContent;

    // Show loading state (visual only)
    submitBtn.querySelector('span').textContent = 'Please wait...';
    submitBtn.style.opacity = '0.7';
    submitBtn.style.cursor = 'not-allowed';

    // Check for specific usernames for mockup demo
    setTimeout(() => {
      let userType = null;
      let userName = '';

      if (emailValue === 'newuser' || emailValue.startsWith('newuser@')) {
        userType = 'new';
        userName = 'Alex';
        console.log('🎨 MOCKUP MODE: New user login detected');
      } else if (emailValue === 'olduser' || emailValue.startsWith('olduser@')) {
        userType = 'returning';
        userName = 'Alex';
        console.log('🎨 MOCKUP MODE: Returning user login detected');
      } else {
        // Show error for invalid username
        submitBtn.querySelector('span').textContent = 'Invalid credentials';
        submitBtn.style.background = 'linear-gradient(135deg, #f44336, #e91e63)';

        setTimeout(() => {
          submitBtn.querySelector('span').textContent = originalText;
          submitBtn.style.opacity = '1';
          submitBtn.style.cursor = 'pointer';
          submitBtn.style.background = '';
        }, 2000);

        console.log('🎨 MOCKUP MODE: Please use "newuser" or "olduser" as email/username');
        showLoginError('Please use "newuser" or "olduser" for demo purposes');
        return;
      }

      // Store user data in sessionStorage
      sessionStorage.setItem('certifio_user_type', userType);
      sessionStorage.setItem('certifio_user_name', userName);
      sessionStorage.setItem('certifio_logged_in', 'true');

      // Reset button state
      submitBtn.querySelector('span').textContent = originalText;
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';

      // Show success message
      console.log(`🎨 User type: ${userType}`);
      console.log('🎨 Redirecting to dashboard...');

      // Redirect to dashboard (mockup flow)
      window.location.href = 'dashboard.html';
    }, 1500);
  });
});

// Show login error notification
function showLoginError(message) {
  const notification = document.createElement('div');
  notification.className = 'login-error-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(-100px);
    background: rgba(244, 67, 54, 0.95);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 14px;
    box-shadow: 0 8px 24px rgba(244, 67, 54, 0.4);
    z-index: 10000;
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
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 400);
  }, 3000);
}

// ============================================
// OAuth Button Click Handlers (Visual Only)
// ============================================

const oauthButtons = document.querySelectorAll('.oauth-btn');

oauthButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Visual feedback only - no actual OAuth flow
    console.log('🎨 MOCKUP MODE: OAuth flow not implemented for demo');

    // Add a subtle visual feedback
    btn.style.transform = 'scale(0.98)';
    setTimeout(() => {
      btn.style.transform = '';
    }, 150);
  });
});

// ============================================
// Input Focus Enhancement
// ============================================

const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(input => {
  // Add focus class to parent for additional styling if needed
  input.addEventListener('focus', () => {
    input.closest('.form-group')?.classList.add('focused');
  });

  input.addEventListener('blur', () => {
    input.closest('.form-group')?.classList.remove('focused');
  });
});

// ============================================
// Password Strength Indicator (Static Visual)
// ============================================

// NOTE: In a real application, this would dynamically calculate password strength.
// For this mockup, we're showing a static "medium" strength indicator.
// Future implementation would use libraries like zxcvbn for real password strength.

const passwordInputs = document.querySelectorAll('input[type="password"]#password');

passwordInputs.forEach(input => {
  input.addEventListener('input', () => {
    const strengthIndicator = input.closest('.form-group')?.querySelector('.password-strength');

    if (strengthIndicator) {
      // Just show the indicator when user starts typing (mockup behavior)
      if (input.value.length > 0) {
        strengthIndicator.style.opacity = '1';
      } else {
        strengthIndicator.style.opacity = '0.5';
      }
    }
  });
});

// ============================================
// Smooth Scroll for Back Link
// ============================================

const backLink = document.querySelector('.back-link');
if (backLink) {
  backLink.addEventListener('click', (e) => {
    // Let the default navigation happen, but add smooth transition
    // In a real SPA, you'd handle this with router transitions
  });
}

// ============================================
// Accessibility: Trap Focus in Modal
// ============================================

// When auth card is displayed, ensure keyboard navigation stays within the card
// This is good practice for modal-like experiences

document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    const authCard = document.querySelector('.auth-card');
    if (!authCard) return;

    const focusableElements = authCard.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Wrap focus within auth card
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
});

// ============================================
// Console Message for Developers
// ============================================

console.log(`
%c🎨 CERTIFIO Authentication Mockup
%cThis is a visual demonstration only.
No real authentication or backend integration.

Features demonstrated:
✓ Premium dark UI design
✓ OAuth provider buttons (GitHub, Google)
✓ Form layouts and styling
✓ Responsive design
✓ Accessibility features

Future integration:
→ Keycloak authentication
→ Real form validation
→ OAuth flows
→ Backend API calls
`,
'font-size: 16px; font-weight: bold; color: #FF6B6B;',
'font-size: 12px; color: #9898AC;'
);
