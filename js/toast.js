// Toast Notification System
class ToastManager {
  constructor() {
    this.container = this.getOrCreateContainer();
    this.toasts = new Map();
    this.defaultDuration = 5000; // 5 seconds
    this.maxToasts = 5;
  }
  
  getOrCreateContainer() {
    let container = document.getElementById('toast-container');
    
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(container);
    }
    
    return container;
  }
  
  show(message, type = 'info', options = {}) {
    const toastId = this.generateId();
    const duration = options.duration ?? this.defaultDuration;
    const persistent = options.persistent ?? false;
    
    // Remove oldest toast if we're at the limit
    if (this.toasts.size >= this.maxToasts) {
      const oldestId = this.toasts.keys().next().value;
      this.remove(oldestId);
    }
    
    const toast = this.createToastElement(toastId, message, type, persistent);
    this.container.appendChild(toast);
    
    // Store toast reference
    this.toasts.set(toastId, {
      element: toast,
      type: type,
      timeout: null
    });
    
    // Set up auto-dismiss if not persistent
    if (!persistent && duration > 0) {
      const timeout = setTimeout(() => {
        this.remove(toastId);
      }, duration);
      
      this.toasts.get(toastId).timeout = timeout;
    }
    
    // Trigger entrance animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
    
    return toastId;
  }
  
  createToastElement(id, message, type, persistent) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
    toast.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
    toast.setAttribute('data-toast-id', id);
    
    const icon = this.getIconForType(type);
    
    toast.innerHTML = `
      <span class="toast-icon" aria-hidden="true">${icon}</span>
      <div class="toast-message">${this.escapeHtml(message)}</div>
      ${persistent ? '' : `
        <button class="toast-close" aria-label="Close notification" type="button">
          ×
        </button>
      `}
    `;
    
    // Set up close button if not persistent
    if (!persistent) {
      const closeButton = toast.querySelector('.toast-close');
      closeButton?.addEventListener('click', () => {
        this.remove(id);
      });
    }
    
    return toast;
  }
  
  getIconForType(type) {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    
    return icons[type] || icons.info;
  }
  
  remove(toastId) {
    const toastData = this.toasts.get(toastId);
    if (!toastData) return;
    
    const { element, timeout } = toastData;
    
    // Clear timeout if it exists
    if (timeout) {
      clearTimeout(timeout);
    }
    
    // Add exit animation class
    element.classList.add('removing');
    
    // Remove after animation
    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
      this.toasts.delete(toastId);
    }, 300);
  }
  
  removeAll() {
    this.toasts.forEach((_, toastId) => {
      this.remove(toastId);
    });
  }
  
  generateId() {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  // Convenience methods
  success(message, options = {}) {
    return this.show(message, 'success', options);
  }
  
  error(message, options = {}) {
    return this.show(message, 'error', options);
  }
  
  warning(message, options = {}) {
    return this.show(message, 'warning', options);
  }
  
  info(message, options = {}) {
    return this.show(message, 'info', options);
  }
}

// Create global toast manager instance
window.toastManager = new ToastManager();

// Global convenience function
window.showToast = (message, type = 'info', options = {}) => {
  return window.toastManager.show(message, type, options);
};

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ToastManager;
}