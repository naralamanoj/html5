# Implementation Plan: Personal Portfolio Website

## Overview

Build a complete, production-quality multi-page personal portfolio website using only HTML5, CSS3, and Vanilla JavaScript. The implementation follows a mobile-first approach, organized into a clean directory structure, and achieves WCAG 2.1 AA accessibility compliance with near-perfect Lighthouse scores.

## Tasks

- [ ] 1. Set up project structure and shared design tokens
  - Create the directory structure: `pages/`, `css/`, `js/`, `assets/`, `images/`
  - Create `css/variables.css` defining CSS custom properties for colors (light/dark/high-contrast themes), spacing scale, typography scale, and border radii
  - Create `css/base.css` with CSS reset, `rem`/`em`-based typography, and the `.sr-only` utility class
  - Create placeholder files for all seven pages: `index.html`, `pages/about.html`, `pages/projects.html`, `pages/skills.html`, `pages/resume.html`, `pages/contact.html`, `pages/404.html`
  - Create `robots.txt` and `sitemap.xml` with all page URLs, `<lastmod>`, `<changefreq>`, and `<priority>` elements
  - _Requirements: 16.1, 16.2, 16.4, 13.10, 13.11_

- [ ] 2. Implement shared HTML shell and navigation
  - [ ] 2.1 Build the reusable `<head>` template with `<title>`, `<meta name="description">`, `<meta name="keywords">`, `<link rel="canonical">`, Open Graph tags, Twitter Card tags, `<link rel="preload">` for critical assets, and the `defer`-loaded JS bundle reference
    - Apply the `[Page Name] | [Developer Name]` title pattern to every page
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 14.2, 14.3_
  - [ ] 2.2 Build the shared `<header>` and `<nav>` with Skip_Link, logo, and navigation links
    - Skip_Link must be the first focusable element and target `<main id="main-content">`
    - Nav uses `<nav aria-label="Primary navigation">` with sticky positioning
    - Each link gets `aria-current="page"` on the active page
    - Include Hamburger_Menu button with `aria-expanded` and `aria-controls` for mobile viewports
    - _Requirements: 2.1, 4.1, 4.2, 4.3, 4.5, 4.7_
  - [ ] 2.3 Build the shared `<footer>` with copyright, social links, quick nav, `<address>`, and policy links
    - Social links use `target="_blank" rel="noopener noreferrer"` with `aria-label`
    - Copyright year is dynamically set via JavaScript
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_
  - [ ] 2.4 Apply shared footer and header to all seven page files
    - Ensure exactly one `<main>` per page and correct heading hierarchy starting at `<h1>`
    - _Requirements: 1.1, 1.2, 1.3_

- [ ] 3. Implement navigation JavaScript module
  - [ ] 3.1 Create `js/navigation.js` handling Hamburger_Menu toggle, Escape-key close, and smooth-scroll for anchor links
    - Toggle `aria-expanded` on open/close; close on Escape key press
    - _Requirements: 4.3, 4.4, 4.6_
  - [ ] 3.2 Write unit tests for navigation module
    - Test hamburger toggle sets `aria-expanded` correctly
    - Test Escape key closes the menu
    - Test smooth-scroll is triggered on anchor link activation
    - _Requirements: 4.3, 4.4, 4.6_

- [ ] 4. Implement theme and accessibility controls
  - [ ] 4.1 Create `js/theme.js` with Dark_Mode_Toggle logic
    - Read `prefers-color-scheme` as default; persist choice in `localStorage`; apply `data-theme` attribute on `<html>` on load and on toggle
    - _Requirements: 15.1, 15.2, 15.3_
  - [ ] 4.2 Add font-size adjustment control (at least two steps) persisted in `localStorage`
    - Adjust `--base-font-size` CSS variable; apply stored value on page load
    - _Requirements: 15.4_
  - [ ] 4.3 Add high-contrast mode toggle applying a WCAG AAA contrast palette
    - Persist preference in `localStorage`; apply on page load
    - _Requirements: 15.5_
  - [ ] 4.4 Add global `prefers-reduced-motion` CSS rule suppressing all animations/transitions when active
    - _Requirements: 15.6, 8.4_
  - [ ] 4.5 Create accessible keyboard shortcuts reference (e.g., a `<dialog>` or dedicated section) reachable from every page
    - _Requirements: 15.8_
  - [ ] 4.6 Write unit tests for theme.js
    - Test `localStorage` read/write for dark mode, font size, and high contrast
    - Test `prefers-color-scheme` fallback when no stored preference exists
    - _Requirements: 15.2, 15.3_

- [ ] 5. Implement Toast notification system
  - [ ] 5.1 Create `js/toast.js` with `showToast(message, type)` function
    - Render a `<div role="status" aria-live="polite">` for success and `<div role="alert" aria-live="assertive">` for errors
    - Auto-dismiss after a configurable timeout; ensure Screen_Readers announce without focus change
    - _Requirements: 15.7, 5.7, 10.7, 10.8_
  - [ ] 5.2 Write unit tests for toast.js
    - Test correct `aria-live` value for polite vs assertive toasts
    - Test auto-dismiss timing
    - _Requirements: 15.7_

- [ ] 6. Implement Modal component
  - [ ] 6.1 Create `js/modal.js` with open/close logic, Focus_Trap, and Escape-key handling
    - On open: set `aria-modal="true"`, move focus to first focusable element inside modal, trap Tab/Shift+Tab within modal
    - On close: restore focus to the triggering element; remove modal from tab order
    - _Requirements: 2.8, 2.9, 7.4_
  - [ ] 6.2 Write unit tests for modal.js
    - Test focus moves into modal on open
    - Test focus is trapped (Tab wraps within modal)
    - Test Escape key closes modal and restores focus to trigger
    - _Requirements: 2.8, 2.9_

- [ ] 7. Checkpoint — Ensure shared infrastructure tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Build the Home Page (`index.html`)
  - [ ] 8.1 Implement Hero section with profile image (`<figure>`/`<figcaption>`), professional introduction, and two CTA links/buttons
    - Profile image has descriptive `alt` text; hero image uses `<link rel="preload">`
    - _Requirements: 5.1, 14.2_
  - [ ] 8.2 Implement featured projects preview section with at least three Project_Cards as `<article>` elements
    - Each card includes title, description, tech stack, and a "View Details" link
    - _Requirements: 5.2_
  - [ ] 8.3 Implement skills preview section summarizing key technology categories
    - _Requirements: 5.3_
  - [ ] 8.4 Implement testimonials section with `<blockquote>` and `<cite>` elements (at least two entries)
    - _Requirements: 5.4_
  - [ ] 8.5 Implement social media links section with `target="_blank" rel="noopener noreferrer"` and `aria-label` on each link
    - _Requirements: 5.5_
  - [ ] 8.6 Implement newsletter signup `<form>` with accessible email input, submit button, inline validation error via `aria-describedby`, and success Toast on valid submission
    - Set `aria-invalid="true"` on invalid input; display error message linked via `aria-describedby`
    - On valid submission call `showToast()` with polite live region
    - _Requirements: 5.6, 5.7, 5.8_
  - [ ] 8.7 Add JSON-LD Person schema `<script type="application/ld+json">` in `<head>`
    - _Requirements: 13.7_
  - [ ] 8.8 Write unit tests for newsletter form validation
    - Test empty submission shows inline error with `aria-invalid="true"`
    - Test valid email triggers success toast
    - _Requirements: 5.7, 5.8_

- [ ] 9. Build the About Page (`pages/about.html`)
  - [ ] 9.1 Implement personal biography section with profile image and descriptive text
    - _Requirements: 6.1_
  - [ ] 9.2 Implement career timeline using semantic `<ol>` or `<dl>` elements in chronological order
    - _Requirements: 6.2_
  - [ ] 9.3 Implement education section listing degrees, institutions, and graduation years using `<time datetime="">` elements
    - _Requirements: 6.3_
  - [ ] 9.4 Implement work experience section with roles, employers, dates (`<time>`), and responsibilities
    - _Requirements: 6.4_
  - [ ] 9.5 Implement certifications section with issuing organizations and dates
    - _Requirements: 6.5_
  - [ ] 9.6 Implement hobbies and interests section
    - _Requirements: 6.6_
  - [ ] 9.7 Add downloadable CV `<a download>` button with accessible label indicating file type
    - _Requirements: 6.7_
  - [ ] 9.8 Add JSON-LD Person schema in `<head>` and BreadcrumbList schema
    - _Requirements: 13.7, 13.8_

- [ ] 10. Build the Projects Page (`pages/projects.html`)
  - [ ] 10.1 Implement Project_Card grid where each card is an `<article>` with title (`<h2>`/`<h3>`), description, tech tags, GitHub link, live demo link, and screenshot inside `<figure>`/`<figcaption>`
    - All project images use `loading="lazy"` and explicit `width`/`height` attributes
    - _Requirements: 7.1, 7.5, 14.1, 14.6_
  - [ ] 10.2 Implement category filter buttons with `aria-pressed` reflecting active state
    - Filtering updates visible cards; result count announced via `aria-live` region
    - _Requirements: 7.2, 7.3, 7.6_
  - [ ] 10.3 Implement real-time search input that filters Project_Cards as the user types
    - Results count announced via `aria-live="polite"` region; empty-state message shown when no results
    - _Requirements: 7.3, 7.6_
  - [ ] 10.4 Wire "View Details" controls to open the Modal with expanded project information
    - _Requirements: 7.4_
  - [ ] 10.5 Add JSON-LD CreativeWork schema for each featured project and BreadcrumbList schema
    - _Requirements: 13.8, 13.9_
  - [ ] 10.6 Write unit tests for filter and search logic
    - Test `aria-pressed` toggles correctly on filter buttons
    - Test search filters cards and updates `aria-live` region
    - Test empty-state message appears when no results match
    - _Requirements: 7.2, 7.3, 7.6_

- [ ] 11. Build the Skills Page (`pages/skills.html`)
  - [ ] 11.1 Implement skill categories (Frontend, Backend, Tools, Technologies) with labeled `<section>` elements
    - _Requirements: 8.1_
  - [ ] 11.2 Implement Skill_Bars as `<div role="progressbar" aria-valuenow aria-valuemin aria-valuemax>` or `<progress>` elements with visible labels
    - _Requirements: 8.2_
  - [ ] 11.3 Implement Skill_Bar entrance animation (zero → target value) in `js/skills.js`
    - Respect `prefers-reduced-motion`: skip animation when `reduce` is active
    - _Requirements: 8.4, 15.6_
  - [ ] 11.4 Implement certifications section listing professional certifications
    - _Requirements: 8.3_
  - [ ] 11.5 Add BreadcrumbList JSON-LD schema
    - _Requirements: 13.8_
  - [ ] 11.6 Write unit tests for skill bar animation logic
    - Test animation is skipped when `prefers-reduced-motion: reduce` is active
    - Test `aria-valuenow` is set to target value after animation completes
    - _Requirements: 8.4_

- [ ] 12. Build the Resume/CV Page (`pages/resume.html`)
  - [ ] 12.1 Implement structured resume layout with semantic sections: education, technical skills, certifications, work experience, and achievements
    - Use `<time datetime="">` for all date ranges; use `<address>` for contact info
    - _Requirements: 9.1, 9.3, 9.4_
  - [ ] 12.2 Add downloadable PDF resume `<a download>` button with accessible label indicating file format
    - _Requirements: 9.2_
  - [ ] 12.3 Add BreadcrumbList JSON-LD schema
    - _Requirements: 13.8_

- [ ] 13. Build the Contact Page (`pages/contact.html`)
  - [ ] 13.1 Implement Contact_Form inside `<form>` > `<fieldset>` > `<legend>` with Full Name, Email, Subject, and Message fields
    - Every input has a visible `<label>` with matching `for`/`id`; all fields have `autocomplete` attributes; required fields have `aria-required="true"` and a visible indicator
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  - [ ] 13.2 Implement client-side validation in `js/contact.js`
    - On invalid submission: set `aria-invalid="true"` and display inline error message linked via `aria-describedby`
    - On success: call `showToast()` with `aria-live="polite"` and reset form fields
    - On error: call `showToast()` with `aria-live="assertive"`
    - _Requirements: 10.6, 10.7, 10.8_
  - [ ] 13.3 Add contact details (`<address>` with email and location) alongside the form
    - _Requirements: 10.9_
  - [ ] 13.4 Add BreadcrumbList JSON-LD schema
    - _Requirements: 13.8_
  - [ ] 13.5 Write unit tests for contact form validation
    - Test each required field shows `aria-invalid="true"` and error message when empty
    - Test valid submission triggers polite success toast and resets fields
    - Test submission error triggers assertive error toast
    - _Requirements: 10.6, 10.7, 10.8_

- [ ] 14. Build the 404 Error Page (`pages/404.html`)
  - Implement human-readable "Page Not Found" message with descriptive `<title>` tag indicating 404 status
  - Include a link back to the Home Page
  - Include shared Navigation and Footer
  - _Requirements: 12.1, 12.2, 12.3, 12.4_

- [ ] 15. Checkpoint — Ensure all page builds and tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 16. Implement global CSS layout and responsive design
  - [ ] 16.1 Create `css/layout.css` with mobile-first CSS Grid and Flexbox layouts for all multi-column sections
    - Define breakpoints: mobile (≤767px), tablet (768–1023px), desktop (1024–1439px), ultra-wide (≥1440px)
    - _Requirements: 3.1, 3.2, 3.7_
  - [ ] 16.2 Implement fluid typography using `clamp()` or viewport-relative units scaling across breakpoints
    - All font sizes and spacing use `rem`/`em`
    - _Requirements: 3.3, 3.6_
  - [ ] 16.3 Ensure all touch targets are at minimum 44×44 CSS pixels on mobile viewports
    - _Requirements: 3.4_
  - [ ] 16.4 Add responsive image handling: `srcset`/`sizes` attributes or `max-width: 100%` CSS on all `<img>` elements; add explicit `width` and `height` to prevent CLS
    - _Requirements: 3.5, 14.6_

- [ ] 17. Implement global accessibility polish
  - [ ] 17.1 Audit every interactive element for visible focus indicators meeting WCAG 2.1 AA focus visibility requirements
    - Add `:focus-visible` styles in `css/base.css`
    - _Requirements: 2.3_
  - [ ] 17.2 Verify all text and UI elements meet minimum contrast ratios (4.5:1 normal text, 3:1 large text/UI)
    - Update CSS custom properties in `css/variables.css` as needed
    - _Requirements: 2.5_
  - [ ] 17.3 Audit all images: informative images have descriptive `alt` text; decorative images have `alt=""` and `aria-hidden="true"`
    - _Requirements: 2.6_
  - [ ] 17.4 Verify all `<div>` and `<span>` usages are replaced with semantic elements where applicable; confirm no `<div>` or `<span>` is used for interactive actions
    - _Requirements: 1.4, 1.6_
  - [ ] 17.5 Verify information is never conveyed by color alone (add icons, patterns, or text labels as needed)
    - _Requirements: 2.11_

- [ ] 18. Performance and SEO final wiring
  - [ ] 18.1 Audit all pages: move non-critical `<script>` tags to end of `<body>` or add `defer`/`async`; confirm single shared CSS and JS files per page
    - _Requirements: 14.3, 14.4, 14.5_
  - [ ] 18.2 Confirm `loading="lazy"` on all non-viewport images and `<link rel="preload">` for critical above-the-fold assets on every page
    - _Requirements: 14.1, 14.2_
  - [ ] 18.3 Validate all seven HTML files against the W3C HTML validator with zero errors
    - Fix any validation errors found
    - _Requirements: 16.6_
  - [ ] 18.4 Confirm `sitemap.xml` and `robots.txt` are complete and correctly reference all page URLs
    - _Requirements: 13.10, 13.11_

- [ ] 19. Final checkpoint — Ensure all tests pass and site is complete
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for full traceability
- The site uses zero external CSS frameworks or JS libraries — only HTML5, CSS3, and Vanilla JavaScript
- Checkpoints at tasks 7, 15, and 19 ensure incremental validation throughout the build
- Unit tests use whichever test runner is set up in the project (e.g., Vitest or Jest with jsdom)
