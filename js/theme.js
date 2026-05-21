// Theme Management System
class ThemeManager {
  constructor() {
    this.html = document.documentElement;
    this.themeToggle = document.querySelector('.theme-toggle');
    this.fontSizeToggle = document.querySelector('.font-size-toggle');
    this.contrastToggle = document.querySelector('.contrast-toggle');
    
    this.themes = ['light', 'dark'];
    this.fontSizes = ['normal', 'large', 'extra-large'];
    this.contrastModes = ['normal', 'high-contrast'];
    
    this.currentTheme = this.getStoredTheme() || this.getPreferredTheme();
    this.currentFontSize = this.getStoredFontSize() || 'normal';
    this.currentContrast = this.getStoredContrast() || 'normal';
    
    this.init();
  }
  
  init() {
    // Apply stored preferences
    this.applyTheme(this.currentTheme);
    this.applyFontSize(this.currentFontSize);
    this.applyContrast(this.currentContrast);
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Update button states
    this.updateButtonStates();
    
    // Listen for system theme changes
    this.watchSystemTheme();
  }
  
  setupEventListeners() {
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    
    if (this.fontSizeToggle) {
      this.fontSizeToggle.addEventListener('click', () => this.toggleFontSize());
    }
    
    if (this.contrastToggle) {
      this.contrastToggle.addEventListener('click', () => this.toggleContrast());
    }
  }
  
  getPreferredTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
  
  getStoredTheme() {
    try {
      return localStorage.getItem('theme');
    } catch (e) {
      console.warn('Unable to access localStorage for theme preference');
      return null;
    }
  }
  
  getStoredFontSize() {
    try {
      return localStorage.getItem('fontSize');
    } catch (e) {
      console.warn('Unable to access localStorage for font size preference');
      return null;
    }
  }
  
  getStoredContrast() {
    try {
      return localStorage.getItem('contrast');
    } catch (e) {
      console.warn('Unable to access localStorage for contrast preference');
      return null;
    }
  }
  
  storeTheme(theme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.warn('Unable to store theme preference in localStorage');
    }
  }
  
  storeFontSize(fontSize) {
    try {
      localStorage.setItem('fontSize', fontSize);
    } catch (e) {
      console.warn('Unable to store font size preference in localStorage');
    }
  }
  
  storeContrast(contrast) {
    try {
      localStorage.setItem('contrast', contrast);
    } catch (e) {
      console.warn('Unable to store contrast preference in localStorage');
    }
  }
  
  applyTheme(theme) {
    this.html.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    this.storeTheme(theme);
  }
  
  applyFontSize(fontSize) {
    // Remove existing font size classes
    this.fontSizes.forEach(size => {
      this.html.removeAttribute(`data-font-size`);
    });
    
    if (fontSize !== 'normal') {
      this.html.setAttribute('data-font-size', fontSize);
    }
    
    this.currentFontSize = fontSize;
    this.storeFontSize(fontSize);
  }
  
  applyContrast(contrast) {
    if (contrast === 'high-contrast') {
      this.html.setAttribute('data-theme', 'high-contrast');
      if (this.currentTheme === 'dark') {
        this.html.setAttribute('data-dark', 'true');
      }
    } else {
      this.html.removeAttribute('data-dark');
      this.html.setAttribute('data-theme', this.currentTheme);
    }
    
    this.currentContrast = contrast;
    this.storeContrast(contrast);
  }
  
  toggleTheme() {
    const currentIndex = this.themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    const nextTheme = this.themes[nextIndex];
    
    this.applyTheme(nextTheme);
    
    // If high contrast is active, reapply it
    if (this.currentContrast === 'high-contrast') {
      this.applyContrast('high-contrast');
    }
    
    this.updateButtonStates();
    this.announceThemeChange(nextTheme);
  }
  
  toggleFontSize() {
    const currentIndex = this.fontSizes.indexOf(this.currentFontSize);
    const nextIndex = (currentIndex + 1) % this.fontSizes.length;
    const nextFontSize = this.fontSizes[nextIndex];
    
    this.applyFontSize(nextFontSize);
    this.updateButtonStates();
    this.announceFontSizeChange(nextFontSize);
  }
  
  toggleContrast() {
    const currentIndex = this.contrastModes.indexOf(this.currentContrast);
    const nextIndex = (currentIndex + 1) % this.contrastModes.length;
    const nextContrast = this.contrastModes[nextIndex];
    
    this.applyContrast(nextContrast);
    this.updateButtonStates();
    this.announceContrastChange(nextContrast);
  }
  
  updateButtonStates() {
    if (this.themeToggle) {
      const icon = this.currentTheme === 'dark' ? '☀️' : '🌙';
      this.themeToggle.textContent = icon;
      this.themeToggle.setAttribute('aria-label', 
        `Switch to ${this.currentTheme === 'dark' ? 'light' : 'dark'} mode`
      );
    }
    
    if (this.fontSizeToggle) {
      const sizeMap = {
        'normal': 'A+',
        'large': 'A++',
        'extra-large': 'A'
      };
      this.fontSizeToggle.textContent = sizeMap[this.currentFontSize];
      this.fontSizeToggle.setAttribute('aria-label', 
        `Current font size: ${this.currentFontSize}. Click to change.`
      );
    }
    
    if (this.contrastToggle) {
      const icon = this.currentContrast === 'high-contrast' ? '◑' : '◐';
      this.contrastToggle.textContent = icon;
      this.contrastToggle.setAttribute('aria-label', 
        `${this.currentContrast === 'high-contrast' ? 'Disable' : 'Enable'} high contrast mode`
      );
    }
  }
  
  announceThemeChange(theme) {
    this.announceToScreenReader(`Switched to ${theme} mode`);
  }
  
  announceFontSizeChange(fontSize) {
    const sizeText = fontSize === 'normal' ? 'normal' : 
                    fontSize === 'large' ? 'large' : 'extra large';
    this.announceToScreenReader(`Font size changed to ${sizeText}`);
  }
  
  announceContrastChange(contrast) {
    const contrastText = contrast === 'high-contrast' ? 'enabled' : 'disabled';
    this.announceToScreenReader(`High contrast mode ${contrastText}`);
  }
  
  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
  
  watchSystemTheme() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      mediaQuery.addEventListener('change', (e) => {
        // Only update if user hasn't set a manual preference
        if (!this.getStoredTheme()) {
          const newTheme = e.matches ? 'dark' : 'light';
          this.applyTheme(newTheme);
          this.updateButtonStates();
        }
      });
    }
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}