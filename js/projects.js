// Projects Page Management
class ProjectsManager {
  constructor() {
    this.projectsGrid = document.getElementById('projects-grid');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.searchInput = document.getElementById('project-search');
    this.searchResults = document.getElementById('search-results');
    this.noResults = document.getElementById('no-results');
    this.allProjects = [];
    
    this.init();
  }
  
  init() {
    this.loadProjects();
    this.setupEventListeners();
    this.setupSearch();
  }
  
  loadProjects() {
    // Get all project cards
    this.allProjects = Array.from(document.querySelectorAll('.project-card'));
  }
  
  setupEventListeners() {
    // Filter buttons
    this.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.handleFilterClick(e.target);
      });
    });
    
    // View details buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.view-details-btn')) {
        const projectCard = e.target.closest('.project-card');
        this.openProjectModal(projectCard);
      }
    });
  }
  
  setupSearch() {
    let searchTimeout;
    
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.performSearch(e.target.value);
      }, 300);
    });
    
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.performSearch(e.target.value);
      }
    });
  }
  
  handleFilterClick(button) {
    // Update active state
    this.filterButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });
    
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
    
    // Get filter value
    const filter = button.getAttribute('data-filter');
    
    // Apply filter
    this.filterProjects(filter);
    
    // Clear search when filtering
    this.searchInput.value = '';
    this.updateSearchResults('');
  }
  
  filterProjects(filter) {
    let visibleCount = 0;
    
    this.allProjects.forEach(project => {
      const categories = project.getAttribute('data-category').split(' ');
      const shouldShow = filter === 'all' || categories.includes(filter);
      
      if (shouldShow) {
        project.style.display = 'block';
        project.classList.add('animate-in');
        visibleCount++;
      } else {
        project.style.display = 'none';
        project.classList.remove('animate-in');
      }
    });
    
    // Show/hide no results message
    this.toggleNoResults(visibleCount === 0);
    
    // Announce filter results to screen readers
    this.announceFilterResults(filter, visibleCount);
  }
  
  performSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    let visibleCount = 0;
    
    if (searchTerm === '') {
      // Show all projects if search is empty
      this.allProjects.forEach(project => {
        project.style.display = 'block';
        project.classList.add('animate-in');
        visibleCount++;
      });
    } else {
      // Filter projects based on search term
      this.allProjects.forEach(project => {
        const title = project.querySelector('h3').textContent.toLowerCase();
        const description = project.querySelector('p').textContent.toLowerCase();
        const tags = project.getAttribute('data-tags').toLowerCase();
        
        const matches = title.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       tags.includes(searchTerm);
        
        if (matches) {
          project.style.display = 'block';
          project.classList.add('animate-in');
          visibleCount++;
        } else {
          project.style.display = 'none';
          project.classList.remove('animate-in');
        }
      });
    }
    
    // Update search results
    this.updateSearchResults(searchTerm, visibleCount);
    
    // Show/hide no results message
    this.toggleNoResults(visibleCount === 0);
    
    // Reset filter buttons when searching
    if (searchTerm !== '') {
      this.filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
    }
  }
  
  updateSearchResults(query, count = null) {
    if (query === '') {
      this.searchResults.textContent = '';
      return;
    }
    
    if (count !== null) {
      const resultText = count === 1 ? 'project' : 'projects';
      this.searchResults.textContent = `Found ${count} ${resultText} matching "${query}"`;
    }
  }
  
  toggleNoResults(show) {
    if (show) {
      this.noResults.style.display = 'block';
      this.projectsGrid.style.display = 'none';
    } else {
      this.noResults.style.display = 'none';
      this.projectsGrid.style.display = 'grid';
    }
  }
  
  announceFilterResults(filter, count) {
    const filterName = filter === 'all' ? 'All Projects' : 
                      filter.charAt(0).toUpperCase() + filter.slice(1);
    const resultText = count === 1 ? 'project' : 'projects';
    
    const announcement = `Showing ${count} ${resultText} in ${filterName} category`;
    
    // Create temporary announcement element
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = announcement;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }
  
  openProjectModal(projectCard) {
    const projectData = this.extractProjectData(projectCard);
    const modalContent = this.createProjectModalContent(projectData);
    
    if (window.modalManager) {
      window.modalManager.open(modalContent, 'project-modal');
    }
  }
  
  extractProjectData(projectCard) {
    const title = projectCard.querySelector('h3')?.textContent || 'Project';
    const description = projectCard.querySelector('p')?.textContent || '';
    const image = projectCard.querySelector('img');
    const techTags = Array.from(projectCard.querySelectorAll('.tech-tag')).map(tag => tag.textContent);
    const links = Array.from(projectCard.querySelectorAll('.project-links a'));
    
    // Project-specific details based on title
    let extendedData = {};
    
    if (title.includes('Restaurant')) {
      extendedData = {
        fullDescription: 'Advanced restaurant website featuring modern UI design with interactive menu system, responsive layout, and user-friendly navigation. Built entirely with frontend technologies focusing on clean code and optimal user experience.',
        features: [
          'Responsive design for all devices',
          'Interactive menu system',
          'Modern UI/UX design',
          'Cross-browser compatibility',
          'Optimized performance'
        ],
        challenges: 'Creating an intuitive user interface that works seamlessly across different devices while maintaining fast loading times and accessibility standards.',
        outcome: 'Successfully delivered a modern restaurant website with excellent user experience and responsive design that works perfectly on all devices.',
        category: 'Frontend Development'
      };
    } else if (title.includes('Library')) {
      extendedData = {
        fullDescription: 'Academic library management system designed specifically for student needs. Features book search, catalog management, and user-friendly interface tailored for academic year requirements.',
        features: [
          'Book search and catalog system',
          'Student-friendly interface',
          'Academic year-based organization',
          'Responsive web design',
          'Database integration'
        ],
        challenges: 'Designing a system that caters specifically to academic requirements while maintaining simplicity and ease of use for students.',
        outcome: 'Created an efficient library management system that significantly improves student access to library resources and streamlines book management.',
        category: 'Full-Stack Development'
      };
    } else if (title.includes('Counselling')) {
      extendedData = {
        fullDescription: 'Comprehensive student counselling platform built with Django framework. Features appointment booking, resource management, and communication tools designed to save students time and improve access to counselling services.',
        features: [
          'Appointment booking system',
          'Student resource management',
          'Communication tools',
          'Admin dashboard',
          'Database management',
          'User authentication'
        ],
        challenges: 'Building a full-stack application that handles both frontend user experience and backend data management while ensuring security and scalability.',
        outcome: 'Developed a complete counselling platform that streamlines student services and significantly reduces time spent on administrative tasks.',
        category: 'Full-Stack Development'
      };
    }
    
    return {
      title,
      description,
      image: {
        src: image?.src || '',
        alt: image?.alt || title
      },
      technologies: techTags,
      links: links.map(link => ({
        text: link.textContent.trim(),
        url: link.href,
        target: link.target
      })),
      ...extendedData
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
            <div class="project-category">${project.category}</div>
          </div>
          
          <div class="project-modal-content">
            <div class="project-section">
              <h3>Project Overview</h3>
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
              <h3>Project Outcome</h3>
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.projectsManager = new ProjectsManager();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProjectsManager;
}