# Narala Manoj - Portfolio Website

A modern, responsive portfolio website for Narala Manoj, a B.Tech student in Artificial Intelligence and Data Science at NBKR Institute of Science & Technology.

## 🚀 Features

- **Responsive Design**: Works perfectly on all devices (mobile, tablet, desktop)
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **Dark Mode**: Toggle between light and dark themes
- **Interactive Animations**: Smooth animations and hover effects
- **Dynamic Content**: Interactive project modals and form validation
- **SEO Optimized**: Structured data and meta tags for better search visibility
- **Performance**: Optimized images and lazy loading

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: CSS Grid, Flexbox, CSS Custom Properties
- **Animations**: CSS Animations, Intersection Observer API
- **Accessibility**: ARIA attributes, semantic HTML
- **SEO**: JSON-LD structured data, Open Graph tags

## 📁 Project Structure

```
portfolio/
├── index.html              # Main homepage
├── css/
│   ├── variables.css       # CSS custom properties and design tokens
│   ├── base.css           # Base styles and typography
│   └── layout.css         # Layout and component styles
├── js/
│   ├── theme.js           # Theme management (dark/light mode)
│   ├── navigation.js      # Navigation and scroll effects
│   ├── modal.js           # Project modal functionality
│   ├── animations.js      # Animation and interaction effects
│   ├── toast.js           # Toast notification system
│   └── newsletter.js      # Newsletter form handling
├── assets/
│   ├── profile-hero.jpg   # Profile image
│   └── project-*.jpg      # Project screenshots
├── server.py              # Development server
├── package.json           # Project metadata
└── README.md             # This file
```

## 🚀 Getting Started

### Option 1: Python Server (Recommended)

1. **Clone or download the project**
2. **Navigate to the project directory**
3. **Run the development server**:
   ```bash
   python server.py
   ```
   or
   ```bash
   npm start
   ```

4. **Open your browser** to `http://localhost:8000`

### Option 2: Simple HTTP Server

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
npx http-server -p 8000
```

### Option 3: Live Server (VS Code)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎨 Customization

### Colors and Themes

Edit `css/variables.css` to customize:
- Color schemes (light/dark/high-contrast)
- Typography scale
- Spacing system
- Border radius values

### Content

Update the following in `index.html`:
- Personal information in the hero section
- Project details and links
- Skills and technologies
- Contact information

### Projects

To add new projects:
1. Add project data in the projects section
2. Create project images in the `assets/` folder
3. Update the modal content in `js/modal.js`

## 📱 Responsive Breakpoints

- **Mobile**: up to 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px - 1439px
- **Ultra-wide**: 1440px and above

## ♿ Accessibility Features

- Semantic HTML5 structure
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode
- Focus indicators
- Skip links

## 🔧 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 About

**Narala Manoj**
- 📧 Email: manojnarala245@gmail.com
- 📱 Phone: +91 8106905004
- 🌍 Location: Vidyanagar, Nellore, Andhra Pradesh, India
- 💼 LinkedIn: [narala-manoj-215849302](https://linkedin.com/in/narala-manoj-215849302)
- 🐙 GitHub: [manojnarala](https://github.com/manojnarala)

## 🎓 Education

**B.Tech in Artificial Intelligence and Data Science**  
NBKR Institute of Science & Technology, Vidyanagar, Andhra Pradesh

## 💡 Skills

- **Frontend**: HTML5, CSS3, JavaScript, Responsive Design
- **Backend**: Python, Django, Flask, Java
- **AI/ML**: Artificial Intelligence, Data Science, Machine Learning
- **Tools**: Git, GitHub, Linux, Advanced Data Structures

---

*Built with ❤️ by Narala Manoj*