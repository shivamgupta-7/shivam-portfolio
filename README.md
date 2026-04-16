# Shivam Gupta — Portfolio Website

A personal portfolio and resume website built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools — just clean, hand-crafted code.

🔗 **Live:** *(add your deployed URL here)*

---

## Preview

![Dark Mode](assets/profile.jpeg)

---

## Features

### Design
- **Dark / Light mode** toggle with localStorage persistence
- **Animated hero** with gradient background and staggered fade-in
- **Scroll-reveal animations** on all sections
- **Timeline spine animation** for experience and education
- **Project image tiles** with hover-to-expand details
- **Interest tiles** with hover subtitles and medal badges
- **Gradient section headings** with accent underlines
- **Custom scrollbar** matching the theme
- **Profile photo glow ring** with pulsing animation

### Sections
| Section | Description |
|---------|-------------|
| **Hero** | Name, role, contact info, social links, resume link |
| **About Me** | Brief professional bio |
| **Work Experience** | Timeline with company logos, collapsible details, show-more toggle |
| **Skills** | 3×2 grid of categorized skill tags with official logos |
| **Education** | Timeline with school logos, test scores (GRE/TOEFL) |
| **Projects** | 3×3 image tile grid with hover overlay showing details + GitHub links |
| **Publications** | Expandable research publication card |
| **Achievements** | UF Scholarship + Georgetown iGEM honor |
| **Student Leadership & Volunteering** | Collapsible cards with org logos, show-more toggle |
| **Certifications** | 3-column grid with credential IDs, show-more toggle |
| **Beyond the Code** | Shimla banner + interest tiles (guitar, cricket, soccer, hiking, driving, running) |
| **Let's Connect** | Contact CTA with email and LinkedIn buttons |

### UX & Accessibility
- **Hamburger menu** on mobile (< 768px)
- **Floating back-to-top** button (appears after 500px scroll)
- **Smooth scroll** navigation with anchor offset for sticky nav
- **Hover-to-open** on leadership/volunteering cards
- **Show more / Show less** toggles for long sections
- **Mobile tap fallback** — project tiles and interest tiles show content by default on touch devices
- **Print stylesheet** — clean printable version without animations or nav
- **ARIA labels** on interactive elements
- **Lazy loading** on all below-fold images

### SEO & Performance
- Open Graph + Twitter Card meta tags
- Inline SVG favicon (SG initials)
- Image preloading for hero
- Compressed images (resized to 600–800px width)
- `robots.txt` and `sitemap.xml`

---

## File Structure

```
shivam-portfolio/
├── index.html          # Main HTML — all sections, heavily commented with templates
├── style.css           # All styles — CSS variables, responsive, print, light mode
├── script.js           # All interactivity — scroll, theme, hamburger, toggles
├── robots.txt          # SEO — crawler permissions
├── sitemap.xml         # SEO — page listing (update URL before deploying)
├── README.md           # This file
└── assets/             # All images
    ├── profile.jpeg        # Hero profile photo
    ├── shimla.jpeg         # Personal section banner
    ├── aws.jpeg            # Company logos (experience)
    ├── barclays.jpeg
    ├── ufmedicine.jpeg
    ├── uf.jpeg
    ├── nic.jpeg
    ├── iitmandi.jpeg
    ├── srm.jpeg            # Education logos
    ├── stedwards.jpeg
    ├── georgetown.jpeg     # Achievement logo
    ├── privacypreserving.jpeg  # Project tile images
    ├── unet.jpeg
    ├── twitter.jpeg
    ├── sahayak.jpeg
    ├── stay.jpeg
    ├── firstlineofdefense.jpeg
    ├── bitcoin.jpeg
    ├── chordpeertopeer.jpeg
    ├── gossip.jpeg
    ├── srm_salesforce.jpeg     # Leadership/volunteering logos
    ├── srm_hackerearth.jpeg
    ├── srm_acm.jpeg
    ├── tech_a_mania.jpeg
    ├── nss.jpeg
    ├── indiansciencecongree.jpeg
    ├── nationalchildrensciencecongree.jpeg
    ├── guitar.jpeg         # Interest tile images
    ├── cricket.jpeg
    ├── soccer.jpeg
    ├── hiking.jpeg
    ├── driving.jpeg
    └── running.jpeg
```

---

## How to Add Content

Every section in `index.html` has a `<!-- TEMPLATE: ... -->` comment block showing exactly how to add a new item. The CSS and JS files also have template blocks at the bottom.

### Quick examples:

**Add a new work experience:**
Search for `TEMPLATE: NEW WORK EXPERIENCE` in `index.html` and copy the template.

**Add a new skill:**
```html
<span class="skill">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ICON_NAME/ICON_NAME-original.svg" alt="Skill Name">
  Skill Name
</span>
```

**Add a new project tile:**
```html
<div class="project-tile">
  <img src="assets/YOUR_IMAGE.jpeg" alt="Project Name" loading="lazy">
  <div class="tile-overlay">
    <h4>Project Title</h4>
    <div class="tech-stack"><span>Tech1</span><span>Tech2</span></div>
    <div class="tile-details">
      <ul>
        <li>Description point 1.</li>
        <li>Description point 2.</li>
      </ul>
      <a class="tile-link" href="https://github.com/..." target="_blank" rel="noopener noreferrer">GitHub →</a>
    </div>
  </div>
</div>
```

**Add a new certification:**
```html
<div class="cert-card">
  <h4>Certification Name</h4>
  <div class="cert-meta"><span>Issuer</span><span>Month Year</span></div>
  <div class="cert-id">ID: CREDENTIAL_ID</div>
</div>
```

**Add a new interest tile:**
```html
<div class="interest-tile">
  <img src="assets/YOUR_IMAGE.jpeg" alt="Interest" loading="lazy">
  <div class="interest-label">🎯 Interest Name</div>
  <div class="interest-sub">Short tagline</div>
</div>
```

---

## Customization

### Theme Colors
Edit CSS variables in `:root` (dark) and `body.light` (light) at the top of `style.css`:
```css
:root {
  --accent: #60a5fa;       /* Primary accent (blue) */
  --accent-deep: #2563eb;  /* Deeper accent */
  --accent-light: #93c5fd; /* Light accent */
  --bg: #0b0f19;           /* Background */
  --text: #e5e7eb;         /* Text color */
}
```

### Fonts
The site uses [Inter](https://fonts.google.com/specimen/Inter) from Google Fonts. Change the `<link>` in `<head>` and `font-family` in `body` to swap fonts.

### Favicon
The favicon is an inline SVG in `<head>`. Edit the initials or colors directly in the `data:image/svg+xml` string.

---

## Deployment

This is a static site — deploy anywhere:

- **GitHub Pages:** Push to a repo, enable Pages in Settings
- **Netlify:** Drag and drop the folder
- **Vercel:** Import the repo
- **S3 + CloudFront:** Upload to an S3 bucket with static hosting

Before deploying:
1. Update the `href=""` on the 1-Page Resume link in the hero
2. Update `sitemap.xml` with your actual domain URL
3. Update `og:image` meta tag with the full URL to your profile photo

---

## Tech Stack

- **HTML5** — semantic markup, accessibility attributes
- **CSS3** — custom properties, grid, flexbox, animations, media queries
- **JavaScript** — vanilla ES6, no dependencies
- **Google Fonts** — Inter (300–700)
- **Devicon CDN** — skill logos
- **Simple Icons CDN** — additional tool logos

---

## License

© 2026 Shivam Gupta. All rights reserved.
