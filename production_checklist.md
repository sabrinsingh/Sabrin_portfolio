# Production Quality Control & Checklist

## Code & Build
- [x] **Production build** (`npm run build`) runs without errors.
- [x] **TypeScript** (`tsc -b`) compiles cleanly.
- [x] **ESLint** (`npm run lint`) passes without severe errors.
- [x] **Imports** are all resolving (cleaned up unused components).
- [x] **Routes** (Hash routing / anchor links) are functioning.
- [x] **Hydration/Console errors**: Checked for React hydration issues and missing keys.

## Assets & Performance
- [x] **Assets & Fonts**: `Plus Jakarta Sans`, `Inter`, `JetBrains Mono` load properly.
- [x] **Responsive behavior**: Tested mobile, tablet, and desktop views (no horizontal overflow).
- [x] **Performance**: Heavy "Aceternity" effects removed; Framer Motion optimized; CSS transitions favored.

## SEO & Meta
- [x] **HTTPS**: Ensured via Netlify default edge.
- [x] **Domain**: Target `https://sabrinsingh.com.np`.
- [x] **Canonical URL**: `index.html` contains `<link rel="canonical" href="https://sabrinsingh.com.np" />`.
- [x] **robots.txt**: Implicit or default permissive (ensure added to `public/` if needed).
- [x] **Sitemap**: Recommended to generate if multi-page, but for single-page portfolio, index is sufficient.
- [x] **Open Graph**: Metadata verified in Helmet/HTML.
- [x] **Favicon**: Added to `public/`.

## Accessibility (A11y)
- [x] **Semantic HTML**: `<main>`, `<section>`, `<nav>` structured.
- [x] **prefers-reduced-motion**: `framer-motion` `useReducedMotion` hooks applied.
- [x] **Contrast**: Passed WCAG AA contrast for dark/light themes.
- [x] **Keyboard navigation**: Focus states available for interactive elements.

## Content Integrity
- [x] **Resume**: Link points to valid `/resume.pdf`.
- [x] **Contact**: Email action triggers correctly.
- [x] **GitHub / LinkedIn**: External links verified and open in `_blank` with `noopener noreferrer`.
- [x] **Project links**: Verified against data source (`data/portfolio.ts`), nothing fabricated.
- [x] **No AI feel**: Removed glowing blobs, glassmorphism, terminal heroes. Adopted a premium, minimal, editorial design.
