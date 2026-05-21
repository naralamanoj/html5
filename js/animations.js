// Animation and Interaction Manager
class AnimationManager {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
    this.setupParallaxEffects();
    this.setupHoverEffects();
    this.setupScrollAnimations();
    this.setupTypingEffect();
    this.setupCounterAnimations();
  }
  
  setupIntersectionObserver() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Trigger specific animations based on element type
          this.triggerElementAnimation(entry.target);
        }
      });
    }, this.observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll(
      '.project-card, .skill-category, .testimonial, .social-grid a, .hero-content, .hero-image'
    );
    
    animateElements.forEach(el => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  }
  
  triggerElementAnimation(element) {
    // Add staggered animation delays for grid items
    if (element.parentElement?.classList.contains('projects-grid') ||
        element.parentElement?.classList.contains('skills-categories') ||
        element.parentElement?.classList.contains('social-grid')) {
      
      const siblings = Array.from(element.parentElement.children);
      const index = siblings.indexOf(element);
      element.style.animationDelay = `${index * 0.1}s`;
    }
    
    // Trigger counter animations for skill bars or stats
    if (element.classList.contains('skill-bar') || element.classList.contains('stat-number')) {
      this.animateCounter(element);
    }
  }
  
  setupParallaxEffects() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    const parallaxElements = document.querySelectorAll('.hero-image img');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const rate = scrolled * -0.5;
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }
  
  setupHoverEffects() {
    // Enhanced hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(
      '.project-card, .social-grid a, .btn, .testimonial'
    );
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        this.addHoverEffect(e.target);
      });
      
      element.addEventListener('mouseleave', (e) => {
        this.removeHoverEffect(e.target);
      });
    });
  }
  
  addHoverEffect(element) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    element.style.transform = 'translateY(-8px) scale(1.02)';
    element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Add glow effect for buttons
    if (element.classList.contains('btn')) {
      element.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.3)';
    }
  }
  
  removeHoverEffect(element) {
    element.style.transform = '';
    element.style.boxShadow = '';
  }
  
  setupScrollAnimations() {
    // Smooth reveal animations for sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
      section.style.setProperty('--section-index', index);
    });
  }
  
  setupTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.borderRight = '2px solid var(--color-primary)';
      
      this.typeText(element, text, 50);
    });
  }
  
  typeText(element, text, speed) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      element.textContent = text;
      return;
    }
    
    let i = 0;
    const timer = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      
      if (i >= text.length) {
        clearInterval(timer);
        // Remove cursor after typing is complete
        setTimeout(() => {
          element.style.borderRight = 'none';
        }, 1000);
      }
    }, speed);
  }
  
  setupCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(counter, 0, target, duration);
            observer.unobserve(counter);
          }
        });
      });
      
      observer.observe(counter);
    });
  }
  
  animateCounter(element, start = 0, end, duration = 2000) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      element.textContent = end;
      return;
    }
    
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);
      
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  }
  
  // Method to trigger animations programmatically
  triggerAnimation(element, animationType) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    element.classList.add(`animate-${animationType}`);
    
    // Remove animation class after completion
    element.addEventListener('animationend', () => {
      element.classList.remove(`animate-${animationType}`);
    }, { once: true });
  }
  
  // Pulse animation for notifications or highlights
  pulse(element) {
    this.triggerAnimation(element, 'pulse');
  }
  
  // Shake animation for errors
  shake(element) {
    this.triggerAnimation(element, 'shake');
  }
  
  // Bounce animation for success states
  bounce(element) {
    this.triggerAnimation(element, 'bounce');
  }
}

// Initialize animation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.animationManager = new AnimationManager();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationManager;
}