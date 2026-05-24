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

    // Project Card Click - Direct GitHub Redirection
    document.addEventListener('click', (e) => {
      const projectCard = e.target.closest('.project-card');

      if (projectCard) {
        const githubLink = projectCard.querySelector('a[href*="github.com"]');

        if (githubLink) {
          // If they clicked the link itself, let it happen naturally
          if (e.target.closest('a') === githubLink) return;

          e.preventDefault();
          e.stopPropagation();
          window.open(githubLink.href, '_blank');
        }
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
      const categories = (project.getAttribute('data-category') || '').split(' ');
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

    this.toggleNoResults(visibleCount === 0);
    this.announceFilterResults(filter, visibleCount);
  }

  performSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    let visibleCount = 0;

    if (searchTerm === '') {
      this.allProjects.forEach(project => {
        project.style.display = 'block';
        project.classList.add('animate-in');
        visibleCount++;
      });
    } else {
      this.allProjects.forEach(project => {
        const title = project.querySelector('h3')?.textContent.toLowerCase() || '';
        const description = project.querySelector('p')?.textContent.toLowerCase() || '';
        const tags = (project.getAttribute('data-tags') || '').toLowerCase();

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

    this.updateSearchResults(searchTerm, visibleCount);
    this.toggleNoResults(visibleCount === 0);

    if (searchTerm !== '') {
      this.filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
    }
  }

  updateSearchResults(query, count = null) {
    if (query === '' || !this.searchResults) {
      if (this.searchResults) this.searchResults.textContent = '';
      return;
    }

    if (count !== null) {
      const resultText = count === 1 ? 'project' : 'projects';
      this.searchResults.textContent = `Found ${count} ${resultText} matching "${query}"`;
    }
  }

  toggleNoResults(show) {
    if (!this.noResults || !this.projectsGrid) return;
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

    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = announcement;

    document.body.appendChild(announcer);

    setTimeout(() => {
      if (document.body.contains(announcer)) {
        document.body.removeChild(announcer);
      }
    }, 1000);
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