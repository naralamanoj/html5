// Navigation Management System
class NavigationManager {
  constructor() {
    this.hamburgerMenu = document.querySelector('.hamburger-menu');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-menu a');
    this.header = document.querySelector('.site-header');
    this.isMenuOpen = false;
    this.lastScrollY = 0;
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.setupSmoothScrolling();
    this.setupScrollEffects();
    this.updateCurrentYear();
  }
  
  setupEventListeners() {
    // Hamburger menu toggle
    if (this.hamburgerMenu) {
      this.hamburgerMenu.addEventListener('click', () => this.toggleMenu());
    }
    
    // Close menu when clicking nav links on mobile
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (this.isMenuOpen) {
          this.closeMenu();
        }
      });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
        this.hamburgerMenu?.focus();
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && 
          !this.navMenu?.contains(e.target) && 
          !this.hamburgerMenu?.contains(e.target)) {
        this.closeMenu();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && this.isMenuOpen) {
        this.closeMenu();
      }
    });
  }
  
  setupScrollEffects() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  
  handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Add scrolled class for styling
    if (currentScrollY > 50) {
      this.header?.classList.add('scrolled');
    } else {
      this.header?.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll (optional)
    if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
      // Scrolling down
      this.header?.classList.add('header-hidden');
    } else {
      // Scrolling up
      this.header?.classList.remove('header-hidden');
    }
    
    this.lastScrollY = currentScrollY;
    
    // Update active section in navigation
    this.updateActiveSection();
  }
  
  updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100; // Offset for header
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Update navigation if there's a corresponding link
        this.navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${sectionId}`) {
            this.navLinks.forEach(l => l.classList.remove('active-section'));
            link.classList.add('active-section');
          }
        });
      }
    });
  }
  
  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
  
  openMenu() {
    this.isMenuOpen = true;
    this.navMenu?.classList.add('show');
    this.hamburgerMenu?.setAttribute('aria-expanded', 'true');
    
    // Add animation class
    this.navMenu?.classList.add('menu-opening');
    
    // Focus first nav link for keyboard users
    const firstLink = this.navMenu?.querySelector('a');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
    
    // Prevent body scroll on mobile
    document.body.style.overflow = 'hidden';
    
    // Remove animation class after animation
    setTimeout(() => {
      this.navMenu?.classList.remove('menu-opening');
    }, 300);
  }
  
  closeMenu() {
    this.isMenuOpen = false;
    this.navMenu?.classList.add('menu-closing');
    this.hamburgerMenu?.setAttribute('aria-expanded', 'false');
    
    // Remove show class after animation starts
    setTimeout(() => {
      this.navMenu?.classList.remove('show', 'menu-closing');
    }, 300);
    
    // Restore body scroll
    document.body.style.overflow = '';
  }
  
  setupSmoothScrolling() {
    // Handle anchor links for smooth scrolling
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      // Close mobile menu if open
      if (this.isMenuOpen) {
        this.closeMenu();
      }
      
      // Smooth scroll to target
      this.scrollToElement(target);
      
      // Update URL without triggering navigation
      if (history.pushState) {
        history.pushState(null, null, href);
      }
    });
  }
  
  scrollToElement(element) {
    const headerHeight = this.header?.offsetHeight || 0;
    const targetPosition = element.offsetTop - headerHeight - 20; // 20px extra padding
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      window.scrollTo(0, targetPosition);
    } else {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    
    // Focus the target element for screen readers
    element.setAttribute('tabindex', '-1');
    element.focus();
    
    // Remove tabindex after focus
    element.addEventListener('blur', () => {
      element.removeAttribute('tabindex');
    }, { once: true });
  }
  
  updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear().toString();
    }
  }
  
  // Method to highlight current page in navigation
  highlightCurrentPage() {
    const currentPath = window.location.pathname;
    
    this.navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      
      if (linkPath === currentPath || 
          (currentPath === '/' && linkPath === '/') ||
          (currentPath !== '/' && linkPath !== '/' && currentPath.includes(linkPath))) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }
  
  // Method to handle keyboard navigation within menu
  handleMenuKeyNavigation(e) {
    if (!this.isMenuOpen) return;
    
    const focusableElements = this.navMenu?.querySelectorAll('a, button');
    if (!focusableElements || focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  }
}

// Initialize navigation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.navigationManager = new NavigationManager();
  
  // Highlight current page
  window.navigationManager.highlightCurrentPage();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavigationManager;
}