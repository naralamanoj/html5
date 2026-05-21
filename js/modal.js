// Modal Management System
class ModalManager {
  constructor() {
    this.activeModal = null;
    this.focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    this.init();
  }
  
  init() {
    this.createModalContainer();
    this.setupEventListeners();
  }
  
  createModalContainer() {
    if (!document.getElementById('modal-container')) {
      const container = document.createElement('div');
      container.id = 'modal-container';
      document.body.appendChild(container);
    }
  }
  
  setupEventListeners() {
    // Global escape key handler
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.close();
      }
    });
    
    // Setup project card click handlers
    document.addEventListener('click', (e) => {
      const projectCard = e.target.closest('.project-card');
      if (projectCard) {
        e.preventDefault();
        this.openProjectModal(projectCard);
      }
    });
  }
  
  openProjectModal(projectCard) {
    const projectData = this.extractProjectData(projectCard);
    const modalContent = this.createProjectModalContent(projectData);
    this.open(modalContent, 'project-modal');
  }
  
  extractProjectData(projectCard) {
    const title = projectCard.querySelector('h3')?.textContent || 'Project';
    const description = projectCard.querySelector('p')?.textContent || '';
    const image = projectCard.querySelector('img');
    const techTags = Array.from(projectCard.querySelectorAll('.tech-tag')).map(tag => tag.textContent);
    const links = Array.from(projectCard.querySelectorAll('.project-links a'));
    
    return {
      title,
      description,
      image: {
        src: image?.src || '',
        alt: image?.alt || title
      },
      technologies: techTags,
      links: links.map(link => ({
        text: link.textContent,
        url: link.href,
        target: link.target
      })),
      // Extended project details for modal
      fullDescription: `${description} This project showcases modern web development practices with a focus on user experience, performance, and accessibility. Built with industry-standard tools and following best practices for scalable, maintainable code.`,
      features: [
        'Responsive design for all devices',
        'Optimized performance and loading times',
        'Accessible user interface',
        'Modern development practices',
        'Comprehensive testing coverage'
      ],
      challenges: 'The main challenges involved creating a seamless user experience while maintaining high performance standards and ensuring cross-browser compatibility.',
      outcome: 'Successfully delivered a robust application that exceeded client expectations and received positive user feedback.'
    };
  }
  
  createProjectModalContent(project) {
    return `
      <div class="modal-header">
        <h2>${project.title}</h2>
        <button class="modal-close" aria-label="Close modal">&times;</button>
      </div>
      
      <div class="modal-body">
        <div class="project-modal-grid">
          <div class="project-modal-image">
            <img src="${project.image.src}" alt="${project.image.alt}" />
          </div>
          
          <div class="project-modal-content">
            <div class="project-section">
              <h3>Overview</h3>
              <p>${project.fullDescription}</p>
            </div>
            
            <div class="project-section">
              <h3>Technologies Used</h3>
              <div class="tech-tags-modal">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
              </div>
            </div>
            
            <div class="project-section">
              <h3>Key Features</h3>
              <ul class="feature-list">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
              </ul>
            </div>
            
            <div class="project-section">
              <h3>Challenges & Solutions</h3>
              <p>${project.challenges}</p>
            </div>
            
            <div class="project-section">
              <h3>Outcome</h3>
              <p>${project.outcome}</p>
            </div>
            
            <div class="project-links-modal">
              ${project.links.map(link => `
                <a href="${link.url}" ${link.target ? `target="${link.target}" rel="noopener noreferrer"` : ''} class="btn btn-primary">
                  ${link.text}
                </a>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  open(content, className = '') {
    // Close any existing modal
    if (this.activeModal) {
      this.close();
    }
    
    // Store the currently focused element
    this.previousFocus = document.activeElement;
    
    // Create modal elements
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    
    const modal = document.createElement('div');
    modal.className = `modal ${className}`;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-title');
    
    modal.innerHTML = content;
    
    // Add to container
    const container = document.getElementById('modal-container');
    container.appendChild(backdrop);
    container.appendChild(modal);
    
    this.activeModal = { backdrop, modal };
    
    // Setup modal-specific event listeners
    this.setupModalEventListeners(modal, backdrop);
    
    // Show modal with animation
    requestAnimationFrame(() => {
      backdrop.classList.add('show');
      modal.classList.add('show');
    });
    
    // Focus management
    this.trapFocus(modal);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Announce to screen readers
    this.announceModalOpen();
  }
  
  close() {
    if (!this.activeModal) return;
    
    const { backdrop, modal } = this.activeModal;
    
    // Hide modal with animation
    backdrop.classList.remove('show');
    modal.classList.remove('show');
    
    // Remove after animation
    setTimeout(() => {
      backdrop.remove();
      modal.remove();
    }, 300);
    
    // Restore focus
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    this.activeModal = null;
    
    // Announce to screen readers
    this.announceModalClose();
  }
  
  setupModalEventListeners(modal, backdrop) {
    // Close button
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.close());
    }
    
    // Backdrop click
    backdrop.addEventListener('click', () => this.close());
    
    // Prevent modal content clicks from closing
    modal.addEventListener('click', (e) => e.stopPropagation());
    
    // Keyboard navigation
    modal.addEventListener('keydown', (e) => this.handleModalKeydown(e, modal));
  }
  
  trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(this.focusableElements);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    // Focus first element
    if (firstFocusable) {
      firstFocusable.focus();
    }
    
    // Store for tab trapping
    this.firstFocusable = firstFocusable;
    this.lastFocusable = lastFocusable;
  }
  
  handleModalKeydown(e, modal) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === this.firstFocusable) {
          e.preventDefault();
          this.lastFocusable?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === this.lastFocusable) {
          e.preventDefault();
          this.firstFocusable?.focus();
        }
      }
    }
  }
  
  announceModalOpen() {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = 'Modal dialog opened';
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
  
  announceModalClose() {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = 'Modal dialog closed';
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

// Initialize modal manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.modalManager = new ModalManager();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ModalManager;
}