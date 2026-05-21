// Contact Form Management
class ContactFormManager {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.fields = {
      name: document.querySelector('#contact-name'),
      email: document.querySelector('#contact-email'),
      subject: document.querySelector('#contact-subject'),
      message: document.querySelector('#contact-message')
    };
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
    
    // Real-time validation for all fields
    Object.keys(this.fields).forEach(fieldName => {
      const field = this.fields[fieldName];
      if (field) {
        field.addEventListener('input', () => this.validateField(fieldName));
        field.addEventListener('blur', () => this.validateField(fieldName));
      }
    });
  }
  
  setupRealTimeValidation() {
    Object.keys(this.fields).forEach(fieldName => {
      const field = this.fields[fieldName];
      if (field) {
        field.addEventListener('input', () => {
          this.clearFieldError(fieldName);
          
          if (field.value.length > 0) {
            field.classList.add('has-content');
          } else {
            field.classList.remove('has-content');
          }
        });
      }
    });
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validateForm()) {
      return;
    }
    
    const formData = this.getFormData();
    
    // Show loading state
    this.setLoadingState(true);
    
    try {
      // Simulate form submission
      await this.submitForm(formData);
      
      // Show success message
      window.showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
      
      // Reset form
      this.resetForm();
      
    } catch (error) {
      // Show error message
      window.showToast('Failed to send message. Please try again or contact me directly.', 'error');
      console.error('Form submission error:', error);
    } finally {
      this.setLoadingState(false);
    }
  }
  
  async submitForm(formData) {
    // Simulate API call with delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        if (Math.random() > 0.1) { // 90% success rate
          resolve({ success: true });
        } else {
          reject(new Error('Submission failed'));
        }
      }, 2000);
    });
  }
  
  validateForm() {
    let isValid = true;
    
    Object.keys(this.fields).forEach(fieldName => {
      if (!this.validateField(fieldName)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  validateField(fieldName) {
    const field = this.fields[fieldName];
    if (!field) return true;
    
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (!value) {
      errorMessage = `${this.getFieldLabel(fieldName)} is required.`;
      isValid = false;
    } else {
      // Field-specific validation
      switch (fieldName) {
        case 'name':
          if (value.length < 2) {
            errorMessage = 'Name must be at least 2 characters long.';
            isValid = false;
          }
          break;
          
        case 'email':
          if (!this.isValidEmail(value)) {
            errorMessage = 'Please enter a valid email address.';
            isValid = false;
          }
          break;
          
        case 'subject':
          if (value.length < 5) {
            errorMessage = 'Subject must be at least 5 characters long.';
            isValid = false;
          }
          break;
          
        case 'message':
          if (value.length < 10) {
            errorMessage = 'Message must be at least 10 characters long.';
            isValid = false;
          }
          break;
      }
    }
    
    if (isValid) {
      this.clearFieldError(fieldName);
      field.setAttribute('aria-invalid', 'false');
    } else {
      this.showFieldError(fieldName, errorMessage);
      field.setAttribute('aria-invalid', 'true');
    }
    
    return isValid;
  }
  
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  getFieldLabel(fieldName) {
    const labels = {
      name: 'Full Name',
      email: 'Email Address',
      subject: 'Subject',
      message: 'Message'
    };
    return labels[fieldName] || fieldName;
  }
  
  showFieldError(fieldName, message) {
    const errorContainer = document.querySelector(`#${fieldName}-error`);
    if (errorContainer) {
      errorContainer.textContent = message;
      errorContainer.classList.add('show');
      errorContainer.setAttribute('aria-live', 'polite');
    }
  }
  
  clearFieldError(fieldName) {
    const errorContainer = document.querySelector(`#${fieldName}-error`);
    if (errorContainer) {
      errorContainer.textContent = '';
      errorContainer.classList.remove('show');
    }
  }
  
  getFormData() {
    const data = {};
    Object.keys(this.fields).forEach(fieldName => {
      const field = this.fields[fieldName];
      if (field) {
        data[fieldName] = field.value.trim();
      }
    });
    return data;
  }
  
  resetForm() {
    this.form.reset();
    
    // Clear all field states
    Object.keys(this.fields).forEach(fieldName => {
      const field = this.fields[fieldName];
      if (field) {
        field.classList.remove('has-content');
        field.setAttribute('aria-invalid', 'false');
        this.clearFieldError(fieldName);
      }
    });
  }
  
  setLoadingState(loading) {
    if (this.submitButton) {
      this.submitButton.disabled = loading;
      this.submitButton.textContent = loading ? 'Sending...' : 'Send Message';
      
      if (loading) {
        this.submitButton.classList.add('loading');
      } else {
        this.submitButton.classList.remove('loading');
      }
    }
    
    // Disable all form fields during submission
    Object.keys(this.fields).forEach(fieldName => {
      const field = this.fields[fieldName];
      if (field) {
        field.disabled = loading;
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.contactFormManager = new ContactFormManager();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContactFormManager;
}