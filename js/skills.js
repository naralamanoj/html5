// Skills Page Management
class SkillsManager {
  constructor() {
    this.skillBars = document.querySelectorAll('.skill-progress');
    this.skillItems = document.querySelectorAll('.skill-item');
    this.isAnimated = false;
    
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
    this.setupSkillBarAnimations();
  }
  
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isAnimated) {
          this.animateSkillBars();
          this.isAnimated = true;
        }
      });
    }, observerOptions);
    
    // Observe the first skill category
    const firstCategory = document.querySelector('.skill-category-card');
    if (firstCategory) {
      observer.observe(firstCategory);
    }
  }
  
  setupSkillBarAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // If user prefers reduced motion, show final state immediately
      this.skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
      });
      return;
    }
    
    // Initially set all skill bars to 0 width
    this.skillBars.forEach(bar => {
      bar.style.width = '0%';
      bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  }
  
  animateSkillBars() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return;
    }
    
    this.skillBars.forEach((bar, index) => {
      setTimeout(() => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
        
        // Add a subtle pulse effect when animation completes
        setTimeout(() => {
          bar.classList.add('skill-complete');
        }, 1500);
        
        // Update aria-valuenow for screen readers
        const skillBar = bar.closest('.skill-bar');
        if (skillBar) {
          skillBar.setAttribute('aria-valuenow', width);
        }
        
        // Announce completion to screen readers
        this.announceSkillProgress(bar, width);
        
      }, index * 200); // Stagger animations
    });
  }
  
  announceSkillProgress(bar, width) {
    const skillItem = bar.closest('.skill-item');
    const skillName = skillItem?.querySelector('.skill-name')?.textContent;
    
    if (skillName) {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `${skillName}: ${width}% proficiency`;
      
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 2000);
    }
  }
  
  // Method to get skill statistics
  getSkillStatistics() {
    const skills = [];
    
    this.skillItems.forEach(item => {
      const name = item.querySelector('.skill-name')?.textContent;
      const level = item.querySelector('.skill-level')?.textContent;
      const progress = item.querySelector('.skill-progress')?.getAttribute('data-width');
      
      if (name && level && progress) {
        skills.push({
          name,
          level,
          progress: parseInt(progress)
        });
      }
    });
    
    return {
      totalSkills: skills.length,
      averageProgress: Math.round(skills.reduce((sum, skill) => sum + skill.progress, 0) / skills.length),
      advancedSkills: skills.filter(skill => skill.level === 'Advanced').length,
      intermediateSkills: skills.filter(skill => skill.level === 'Intermediate').length,
      beginnerSkills: skills.filter(skill => skill.level === 'Beginner').length,
      skills
    };
  }
  
  // Method to highlight skills by category
  highlightCategory(categoryName) {
    const categories = document.querySelectorAll('.skill-category-card');
    
    categories.forEach(category => {
      const header = category.querySelector('.category-header h3');
      if (header && header.textContent.toLowerCase().includes(categoryName.toLowerCase())) {
        category.classList.add('highlighted');
        category.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        setTimeout(() => {
          category.classList.remove('highlighted');
        }, 3000);
      }
    });
  }
  
  // Method to filter skills by proficiency level
  filterByLevel(level) {
    this.skillItems.forEach(item => {
      const skillLevel = item.querySelector('.skill-level')?.textContent;
      
      if (level === 'all' || skillLevel === level) {
        item.style.display = 'block';
        item.classList.add('fade-in');
      } else {
        item.style.display = 'none';
        item.classList.remove('fade-in');
      }
    });
  }
  
  // Method to search skills
  searchSkills(query) {
    const searchTerm = query.toLowerCase().trim();
    let visibleCount = 0;
    
    this.skillItems.forEach(item => {
      const skillName = item.querySelector('.skill-name')?.textContent.toLowerCase();
      const skillLevel = item.querySelector('.skill-level')?.textContent.toLowerCase();
      
      const matches = skillName?.includes(searchTerm) || skillLevel?.includes(searchTerm);
      
      if (searchTerm === '' || matches) {
        item.style.display = 'block';
        item.classList.add('fade-in');
        visibleCount++;
      } else {
        item.style.display = 'none';
        item.classList.remove('fade-in');
      }
    });
    
    return visibleCount;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.skillsManager = new SkillsManager();
  
  // Log skill statistics for debugging
  setTimeout(() => {
    const stats = window.skillsManager.getSkillStatistics();
    console.log('Skill Statistics:', stats);
  }, 2000);
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SkillsManager;
}