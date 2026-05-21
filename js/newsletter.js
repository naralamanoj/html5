// Newsletter Form Management
class NewsletterManager {
  constructor() {
    this.form = document.querySelector('.newsletter-form');
    this.emailInput = document.querySelector('#newsletter-email');
    this.errorContainer = document.querySelector('#newsletter-error');
    this.submitButton = this.form?.querySelector('button[type="submit"]');
    
    this.init();
  }
  
  init() {
    if (!this.form) return;
    
    this.setupEventListeners();
    this.setupRealTimeValidation();
  }
  
  setupEventListeners() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time validation
    this.emailInput?.addEventListener('input', () => this.validateEmail());
    this.emailInput?.addEventListener('blur', () => this.validateEmail());
  }
  
  setupRealTimeValidation() {
    if (!this.emailInput) return;
    
    // Add visual feedback on input
    this.emailInput.addEventListener('input', () => {
      this.clearError();
      
      if (this.emailInput.value.length > 0) {
        this.emailInput.classList.add('has-content');
      } else {
        this.emailInput.classList.remove('has-content');
      }
    });
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validateEmail()) {
      return;
    }
    
    const email = this.emailInput.value.trim();
    
    // Show loading state
    this.setLoadingState(true);
    
    try {
      // Simulate API call
      await this.subscribeEmail(email);
      
      // Show success message
      window.showToast('Successfully subscribed to newsletter!', 'success');
      
      // Reset form
      this.form.reset();
      this.emailInput.classList.remove('has-content');
      this.clearError();
      
    } catch (error) {
      // Show error message
      this.showError('Failed to subscribe. Please try again.');
      window.showToast('Subscription failed. Please try again.', 'error');
    } finally {
      this.setLoadingState(false);
    }
  }
  
  async subscribeEmail(email) {
    // Simulate API call with delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        if (Math.random() > 0.1) { // 90% success rate
          resolve({ success: true });
        } else {
          reject(new Error('Subscription failed'));
        }
      }, 1500);
    });
  }
  
  validateEmail() {
    const email = this.emailInput?.value.trim();
    
    if (!email) {
      this.showError('Email address is required.');
      this.emailInput?.setAttribute('aria-invalid', 'true');
      return false;
    }
    
    if (!this.isValidEmail(email)) {
      this.showError('Please enter a valid email address.');
      this.emailInput?.setAttribute('aria-invalid', 'true');
      return false;
    }
    
    this.clearError();
    this.emailInput?.setAttribute('aria-invalid', 'false');
    return true;
  }
  
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  showError(message) {
    if (this.errorContainer) {
      this.errorContainer.textContent = message;
      this.errorContainer.classList.add('show');
      this.errorContainer.setAttribute('aria-live', 'polite');
    }
  }
  
  clearError() {
    if (this.errorContainer) {
      this.errorContainer.textContent = '';
      this.errorContainer.classList.remove('show');
    }
  }
  
  setLoadingState(loading) {
    if (this.submitButton) {
      this.submitButton.disabled = loading;
      this.submitButton.textContent = loading ? 'Subscribing...' : 'Subscribe';
      
      if (loading) {
        this.submitButton.classList.add('loading');
      } else {
        this.submitButton.classList.remove('loading');
      }
    }
    
    if (this.emailInput) {
      this.emailInput.disabled = loading;
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.newsletterManager = new NewsletterManager();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NewsletterManager;
}