# Requirements Document

## Introduction

A complete production-quality multi-page personal portfolio website built exclusively with HTML5, CSS3, and Vanilla JavaScript. The website showcases a developer's professional profile, projects, skills, and contact information across seven pages: Home, About, Projects, Skills, Resume/CV, Contact, and a custom 404 Error page. The site must achieve near-perfect Lighthouse scores for Accessibility, SEO, Best Practices, and Performance, while fully conforming to WCAG 2.1 AA accessibility guidelines and modern semantic HTML5 standards.

## Glossary

- **Website**: The complete multi-page personal portfolio site
- **Page**: An individual HTML document within the Website
- **Navigation**: The primary site-wide nav element present on every Page
- **Hero**: The prominent introductory section at the top of the Home Page
- **Project_Card**: A semantic article element representing a single portfolio project
- **Modal**: A dialog overlay used to display expanded project details
- **Contact_Form**: The accessible form on the Contact Page for visitor messages
- **Skill_Bar**: An accessible progress bar element representing proficiency in a skill
- **Toast**: A transient ARIA live region notification displayed after user actions
- **Dark_Mode_Toggle**: A button control that switches between light and dark color schemes
- **Skip_Link**: A visually hidden anchor at the top of each Page that moves focus to the main content area
- **Screen_Reader**: Assistive technology that reads page content aloud for visually impaired users
- **Lighthouse**: Google's automated tool for measuring web page quality across Performance, Accessibility, Best Practices, and SEO
- **WCAG**: Web Content Accessibility Guidelines version 2.1 at conformance level AA
- **EARS**: Easy Approach to Requirements Syntax — the pattern system used for all acceptance criteria
- **JSON-LD**: JavaScript Object Notation for Linked Data, used for structured schema markup
- **Open_Graph**: A protocol for controlling how URLs are displayed when shared on social media
- **Hamburger_Menu**: A mobile navigation toggle button that expands or collapses the Navigation on small screens
- **Reduced_Motion**: A user operating system preference indicating animations should be minimized
- **Focus_Trap**: A keyboard interaction pattern that constrains Tab focus within an active Modal
- **Lazy_Loading**: Deferring the loading of off-screen images until they approach the viewport
- **Sitemap**: An XML file listing all Page URLs to assist search engine crawlers
- **Robots_File**: A robots.txt file that instructs search engine crawlers which paths to index

---

## Requirements

### Requirement 1: Semantic HTML5 Structure

**User Story:** As a developer reviewing the codebase, I want every page to use proper semantic HTML5 elements, so that the document structure is meaningful, maintainable, and machine-readable.

#### Acceptance Criteria

1. THE Website SHALL use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`, `<address>`, `<form>`, `<fieldset>`, and `<legend>` elements in contextually appropriate locations throughout every Page.
2. THE Website SHALL contain exactly one `<main>` element per Page.
3. THE Website SHALL maintain a heading hierarchy on every Page that begins at `<h1>` and does not skip levels when descending (e.g., `<h1>` → `<h2>` → `<h3>` → `<h4>`).
4. THE Website SHALL use `<button>` elements exclusively for interactive actions and `<a>` elements exclusively for navigation between URLs.
5. THE Website SHALL wrap every image that requires a caption inside a `<figure>` element with an associated `<figcaption>`.
6. THE Website SHALL use `<div>` and `<span>` elements only when no semantically appropriate HTML5 element exists for the given context.

---

### Requirement 2: WCAG 2.1 AA Accessibility

**User Story:** As a user who relies on assistive technology, I want the entire website to conform to WCAG 2.1 AA, so that I can access all content and functionality regardless of my disability.

#### Acceptance Criteria

1. THE Website SHALL provide a Skip_Link as the first focusable element on every Page, with visible focus styling, that moves keyboard focus to the `<main>` element when activated.
2. THE Website SHALL ensure every interactive element is reachable and operable using only a keyboard in a logical tab order.
3. THE Website SHALL display a clearly visible focus indicator on every focusable element that meets WCAG 2.1 AA focus visibility requirements.
4. THE Website SHALL apply ARIA attributes — including `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-hidden`, `aria-live`, `aria-invalid`, `aria-expanded`, and `aria-required` — wherever native HTML semantics are insufficient to convey role, state, or property to a Screen_Reader.
5. THE Website SHALL ensure all text and interactive UI elements meet a minimum color contrast ratio of 4.5:1 for normal text and 3:1 for large text and UI components, as defined by WCAG 2.1 AA Success Criterion 1.4.3 and 1.4.11.
6. THE Website SHALL provide meaningful, descriptive `alt` text for every informative image and set `alt=""` with `aria-hidden="true"` for every decorative image.
7. THE Website SHALL associate every form input with a visible `<label>` element using matching `for` and `id` attributes.
8. WHEN a Modal is open, THE Website SHALL trap keyboard focus within the Modal and restore focus to the triggering element when the Modal is closed.
9. WHEN the Escape key is pressed while a Modal is open, THE Website SHALL close the Modal.
10. THE Website SHALL provide a screen-reader-only utility CSS class (e.g., `.sr-only`) that visually hides content while keeping it accessible to Screen_Readers.
11. THE Website SHALL not communicate information using color as the only visual means of distinction.

---

### Requirement 3: Responsive Mobile-First Design

**User Story:** As a visitor using any device, I want the website to display correctly and be fully usable on mobile phones, tablets, laptops, desktops, and ultra-wide screens, so that I have a consistent experience regardless of screen size.

#### Acceptance Criteria

1. THE Website SHALL implement a mobile-first CSS architecture where base styles target small screens and media queries progressively enhance layouts for larger breakpoints.
2. THE Website SHALL use CSS Grid and CSS Flexbox for all multi-column and multi-row layouts.
3. THE Website SHALL use relative font units (`rem` and `em`) for all typography and spacing values to support browser-level text scaling.
4. THE Website SHALL ensure all touch targets (buttons, links, form controls) have a minimum size of 44×44 CSS pixels on mobile viewports.
5. THE Website SHALL use responsive images with appropriate `srcset` and `sizes` attributes or CSS `max-width: 100%` to prevent images from overflowing their containers.
6. THE Website SHALL implement fluid typography that scales proportionally across breakpoints.
7. THE Website SHALL support viewport breakpoints for at minimum: mobile (up to 767px), tablet (768px–1023px), desktop (1024px–1439px), and ultra-wide (1440px and above).

---

### Requirement 4: Navigation System

**User Story:** As a visitor, I want a consistent, accessible navigation system on every page, so that I can move between sections and pages efficiently using both mouse and keyboard.

#### Acceptance Criteria

1. THE Navigation SHALL be present on every Page inside a `<nav>` element with an `aria-label` attribute that uniquely identifies it.
2. THE Navigation SHALL display an active page indicator (e.g., `aria-current="page"`) on the link corresponding to the currently viewed Page.
3. THE Navigation SHALL include a Hamburger_Menu button on mobile viewports that toggles the visibility of navigation links, with `aria-expanded` reflecting the open or closed state.
4. WHEN the Hamburger_Menu is open, THE Navigation SHALL be keyboard navigable and closable using the Escape key.
5. THE Navigation SHALL use sticky positioning so it remains visible as the user scrolls down a Page.
6. THE Navigation SHALL support smooth scrolling to in-page anchor targets when anchor links are activated.
7. THE Website SHALL include the Skip_Link before the Navigation on every Page.

---

### Requirement 5: Home Page

**User Story:** As a first-time visitor, I want a compelling home page that introduces the developer and highlights key content, so that I can quickly understand who they are and navigate to areas of interest.

#### Acceptance Criteria

1. THE Home_Page SHALL contain a Hero section with a professional introduction, a profile image with descriptive `alt` text, and at least two accessible call-to-action `<button>` or `<a>` elements.
2. THE Home_Page SHALL contain a featured projects preview section displaying at least three Project_Cards using `<article>` elements.
3. THE Home_Page SHALL contain a skills preview section summarizing key technology categories.
4. THE Home_Page SHALL contain a testimonials section with at least two testimonial entries using semantic `<blockquote>` and `<cite>` elements.
5. THE Home_Page SHALL contain a social media links section where each link opens in a new tab with `rel="noopener noreferrer"` and includes an accessible label describing the destination.
6. THE Home_Page SHALL contain a newsletter signup section with an accessible email input and submit button inside a `<form>` element.
7. WHEN the newsletter form is submitted with a valid email address, THE Home_Page SHALL display a Toast notification confirming the subscription using an `aria-live` region.
8. WHEN the newsletter form is submitted with an invalid or empty email address, THE Home_Page SHALL display an inline validation error message associated with the input via `aria-describedby`.

---

### Requirement 6: About Page

**User Story:** As a recruiter or collaborator, I want a detailed about page, so that I can learn about the developer's background, experience, and personality.

#### Acceptance Criteria

1. THE About_Page SHALL contain a personal biography section with a professional profile image and descriptive text.
2. THE About_Page SHALL contain a career timeline section using semantic list or definition list elements to present milestones in chronological order.
3. THE About_Page SHALL contain an education section listing degrees, institutions, and graduation years.
4. THE About_Page SHALL contain a work experience section listing roles, employers, dates, and responsibilities.
5. THE About_Page SHALL contain a certifications section listing professional certifications with issuing organizations and dates.
6. THE About_Page SHALL contain a hobbies and interests section.
7. THE About_Page SHALL contain a downloadable CV button implemented as an `<a>` element with `download` attribute pointing to a PDF file, with an accessible label indicating the file type and action.

---

### Requirement 7: Projects Page

**User Story:** As a potential employer, I want to browse and filter portfolio projects, so that I can evaluate the developer's technical capabilities and work quality.

#### Acceptance Criteria

1. THE Projects_Page SHALL display each project as a Project_Card implemented as an `<article>` element containing: project title (`<h2>` or `<h3>`), description, technologies used, a GitHub repository link, a live demo link, and a project screenshot inside a `<figure>` with `<figcaption>`.
2. THE Projects_Page SHALL implement project filtering by category using accessible filter buttons with `aria-pressed` reflecting the active filter state.
3. THE Projects_Page SHALL implement a search input that filters visible Project_Cards in real time as the user types, with results announced to Screen_Readers via an `aria-live` region.
4. WHEN a project screenshot or "View Details" control is activated, THE Projects_Page SHALL open a Modal displaying expanded project information.
5. THE Projects_Page SHALL Lazy_Load all project screenshot images.
6. WHEN no projects match the active filter or search query, THE Projects_Page SHALL display an accessible empty-state message within the `aria-live` region.

---

### Requirement 8: Skills Page

**User Story:** As a visitor, I want to see the developer's technical skills organized by category with visual proficiency indicators, so that I can quickly assess their expertise.

#### Acceptance Criteria

1. THE Skills_Page SHALL organize skills into clearly labeled categories including at minimum: Frontend, Backend, Tools, and Technologies.
2. THE Skills_Page SHALL represent each skill's proficiency using a Skill_Bar implemented as a `<progress>` element or a `<div role="progressbar">` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` attributes.
3. THE Skills_Page SHALL include a certifications section listing professional certifications.
4. WHEN the Skills_Page is loaded, THE Skills_Page SHALL animate Skill_Bars from zero to their target value, respecting the Reduced_Motion preference by skipping animation when `prefers-reduced-motion: reduce` is active.

---

### Requirement 9: Resume/CV Page

**User Story:** As a recruiter, I want to view and download the developer's resume, so that I can share it with hiring teams and review qualifications offline.

#### Acceptance Criteria

1. THE Resume_Page SHALL display a structured resume layout using semantic HTML elements including sections for: education, technical skills, certifications, work experience, and achievements.
2. THE Resume_Page SHALL provide a download button implemented as an `<a>` element with the `download` attribute pointing to a PDF resume file, with an accessible label indicating the file format.
3. THE Resume_Page SHALL use `<time>` elements with `datetime` attributes for all date ranges in the work experience and education sections.
4. THE Resume_Page SHALL use `<address>` for contact information displayed within the resume layout.

---

### Requirement 10: Contact Page

**User Story:** As a visitor, I want to send a message to the developer through an accessible contact form, so that I can inquire about collaboration or employment opportunities.

#### Acceptance Criteria

1. THE Contact_Form SHALL be wrapped in a `<form>` element containing a `<fieldset>` with a `<legend>` that describes the form's purpose.
2. THE Contact_Form SHALL include the following required fields: Full Name (`<input type="text">`), Email Address (`<input type="email">`), Subject (`<input type="text">`), and Message (`<textarea>`).
3. THE Contact_Form SHALL associate every input with a visible `<label>` using matching `for` and `id` attributes.
4. THE Contact_Form SHALL include `autocomplete` attributes on all applicable inputs (e.g., `autocomplete="name"`, `autocomplete="email"`).
5. THE Contact_Form SHALL mark all required fields with `aria-required="true"` and a visible required indicator.
6. WHEN a required field is submitted empty or with invalid content, THE Contact_Form SHALL set `aria-invalid="true"` on the affected input and display an inline error message associated via `aria-describedby`.
7. WHEN the Contact_Form is successfully submitted, THE Contact_Form SHALL display a success Toast notification using an `aria-live="polite"` region and reset the form fields.
8. WHEN the Contact_Form encounters a submission error, THE Contact_Form SHALL display an error Toast notification using an `aria-live="assertive"` region.
9. THE Contact_Page SHALL also display contact details (email, location) using the `<address>` element alongside the Contact_Form.

---

### Requirement 11: Footer

**User Story:** As a visitor at the bottom of any page, I want a consistent footer with useful links and information, so that I can navigate to important resources without scrolling back to the top.

#### Acceptance Criteria

1. THE Footer SHALL be present on every Page inside a `<footer>` element.
2. THE Footer SHALL include copyright information with the current year.
3. THE Footer SHALL include social media links where each link opens in a new tab with `rel="noopener noreferrer"` and an accessible label.
4. THE Footer SHALL include a quick navigation links section with links to all primary Pages.
5. THE Footer SHALL include contact details using the `<address>` element.
6. THE Footer SHALL include links to an Accessibility Statement page or section and a Privacy Policy page or section.

---

### Requirement 12: Custom 404 Error Page

**User Story:** As a visitor who navigates to a non-existent URL, I want a helpful 404 error page, so that I can understand what happened and find my way back to valid content.

#### Acceptance Criteria

1. THE Error_Page SHALL display a clear, human-readable message indicating the requested page was not found.
2. THE Error_Page SHALL include a link back to the Home Page.
3. THE Error_Page SHALL include the Navigation and Footer consistent with all other Pages.
4. THE Error_Page SHALL use a descriptive `<title>` tag indicating the 404 status.

---

### Requirement 13: SEO Optimization

**User Story:** As the website owner, I want every page to be fully optimized for search engines, so that the portfolio ranks well and is discoverable by recruiters and collaborators.

#### Acceptance Criteria

1. THE Website SHALL include a unique `<title>` tag on every Page following the pattern: `[Page Name] | [Developer Name]`.
2. THE Website SHALL include a unique `<meta name="description">` tag on every Page with a concise, keyword-rich description between 50 and 160 characters.
3. THE Website SHALL include `<meta name="keywords">` tags on every Page.
4. THE Website SHALL include a `<link rel="canonical">` tag on every Page pointing to the Page's canonical URL.
5. THE Website SHALL include Open_Graph meta tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) on every Page.
6. THE Website SHALL include Twitter Card meta tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) on every Page.
7. THE Website SHALL include JSON-LD structured data using Person schema on the Home Page and About Page.
8. THE Website SHALL include JSON-LD structured data using BreadcrumbList schema on every Page except the Home Page.
9. THE Projects_Page SHALL include JSON-LD structured data using CreativeWork schema for each featured project.
10. THE Website SHALL include a `sitemap.xml` file listing all Page URLs with `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>` elements.
11. THE Website SHALL include a `robots.txt` file that allows all crawlers to index all Pages and references the `sitemap.xml` URL.

---

### Requirement 14: Performance Optimization

**User Story:** As a visitor on any network speed, I want the website to load quickly, so that I am not frustrated by slow page loads and can access content immediately.

#### Acceptance Criteria

1. THE Website SHALL Lazy_Load all images that are not in the initial viewport using the `loading="lazy"` attribute.
2. THE Website SHALL preload critical above-the-fold assets (primary font, hero image, main CSS) using `<link rel="preload">` tags in the `<head>`.
3. THE Website SHALL minimize render-blocking resources by placing non-critical JavaScript at the end of `<body>` or using `defer` or `async` attributes.
4. THE Website SHALL use a single external CSS file per Page (or a shared stylesheet) to minimize HTTP requests.
5. THE Website SHALL use a single external JavaScript file per Page (or a shared script) to minimize HTTP requests.
6. THE Website SHALL specify explicit `width` and `height` attributes on all `<img>` elements to prevent Cumulative Layout Shift.

---

### Requirement 15: Dark Mode and Accessibility Enhancements

**User Story:** As a visitor with visual preferences or accessibility needs, I want controls to adjust the visual presentation of the website, so that I can read and interact with content comfortably.

#### Acceptance Criteria

1. THE Website SHALL include a Dark_Mode_Toggle button on every Page that switches between light and dark color schemes.
2. WHEN the Dark_Mode_Toggle is activated, THE Website SHALL persist the user's preference in `localStorage` and apply it on subsequent page loads.
3. THE Website SHALL respect the `prefers-color-scheme` media query as the default color scheme when no stored preference exists.
4. THE Website SHALL include a font size adjustment control that increases or decreases the base font size in at least two steps, persisting the preference in `localStorage`.
5. THE Website SHALL include a high contrast mode toggle that applies a high-contrast color palette meeting WCAG AAA contrast ratios.
6. THE Website SHALL ensure all CSS animations and transitions are suppressed or reduced when `prefers-reduced-motion: reduce` is active.
7. THE Website SHALL display Toast notifications using an `aria-live` region so that Screen_Readers announce them without requiring focus change.
8. WHEN a keyboard shortcut is implemented, THE Website SHALL document it in an accessible keyboard shortcuts reference accessible from every Page.

---

### Requirement 16: Project Architecture and Code Quality

**User Story:** As a developer maintaining the codebase, I want a clean, modular, and well-documented project structure, so that the code is easy to understand, extend, and maintain.

#### Acceptance Criteria

1. THE Website SHALL organize files into a professional directory structure with separate folders for: `pages/`, `css/`, `js/`, `assets/`, and `images/`.
2. THE Website SHALL use only HTML5, CSS3, and Vanilla JavaScript without any external CSS frameworks (e.g., Bootstrap), JavaScript libraries (e.g., jQuery), or frontend frameworks (e.g., React, Vue).
3. THE Website SHALL include meaningful inline comments in HTML, CSS, and JavaScript files explaining non-obvious logic and structural decisions.
4. THE Website SHALL use CSS custom properties (variables) for the design token system including colors, spacing, typography, and border radii to enable consistent theming.
5. THE Website SHALL use modular JavaScript with clearly separated concerns (e.g., navigation logic, modal logic, form validation logic, theme logic in separate files or clearly delineated modules).
6. THE Website SHALL pass HTML validation with zero errors when checked against the W3C HTML validator.
