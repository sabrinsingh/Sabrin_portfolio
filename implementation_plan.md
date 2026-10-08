# Implementation Plan: Sabrin Singh Portfolio Redesign

## 1. Overview
The goal is to transform the existing AI/vibe-coded portfolio into a premium, human-designed, and highly technical personal portfolio. The site will reflect the profile of a Senior Data Engineer / Data Quality Engineer by prioritizing typography, content layout, and purposeful technical interactions over decorative animations.

## 2. What Will Be Retained
- **Core Framework**: React (Vite), Tailwind CSS, TypeScript.
- **Content**: Data sources defined in `src/data/portfolio.ts` (employers, projects, metrics, certifications, etc.). No information will be fabricated.
- **Useful Packages**: `framer-motion` (for purposeful UI transitions), `lucide-react` / `react-icons`.
- **Hosting/Deployment Configuration**: Netlify (`netlify.toml` and Vite config will be preserved).

## 3. What Will Be Removed
- **Generic AI/Vibe Components**:
  - `terminal-hero.tsx` (Replace with an editorial typography-led hero).
  - `floating-icons.tsx`, `system-pulse.tsx`, `animated-text.tsx`, `tilt-card.tsx`, `performance-battle.tsx` (Eliminate "Aceternity demo" or heavy decorative elements).
- **Excessive Visuals**: Remove large glowing blobs, purple/blue AI gradients, fake parallax, repetitive card grids, and excessive glassmorphism.
- **Unused Dependencies**: Any heavy 3D or animation libraries not strictly serving the new motion strategy (e.g., if Three.js was installed but we opt for SVG).

## 4. What Will Be Redesigned
- **Loader**: Implement a premium, short technical loader (e.g., `SLS | INITIALIZING DATA / QUALITY / ENGINEERING`) taking 400-800ms.
- **Hero Section**: Editorial layout communicating role and expertise within 5 seconds. Minimalist design relying on grid and typography.
- **Typography & Styling**: 
  - Enhance the existing type system (`Plus Jakarta Sans` for headers, `Inter` for body, `JetBrains Mono` for tech labels). 
  - Implement a refined color palette avoiding generic defaults; use sophisticated dark/light modes.
- **Projects (Technical Case Studies)**: Redesign project displays to emphasize technical rigor. Implement views for *Overview*, *Architecture* (with SVG CSS-animated data flow diagrams), and *Quality/Impact*.
- **Interactive Technical Features**:
  - **Data Quality Gate**: Refine `data-pipeline-sandbox.tsx` into a clear, client-side interactive simulation for data checks (NULL, Duplicate, Schema validation) yielding PASS/FAIL results.
  - **Command Palette (Cmd+K)**: Ensure it works perfectly for site navigation and features a small local terminal aesthetic with standard commands (`help`, `about`, `projects`, etc.).
- **Mobile Experience**: Redesign navigation and interactions to avoid relying on hover states. Ensure 100% responsive layout with no horizontal overflow.

## 5. Motion Strategy
- **Framework**: `framer-motion` + raw CSS.
- **Approach**: Premium, purposeful motion. 
- **Effects**:
  - Subtle entrance reveals for the hero and sections.
  - Smooth tab transitions for the Project cards.
  - Micro-interactions (button press/hover, link active indicators).
  - SVG data-flow animations for architecture diagrams (only triggered on view).
- **Accessibility**: Wrap animations in `useReducedMotion` hooks. Disable parallax, 3D (if any), and scaling transforms for users preferring reduced motion.

## 6. Performance & Accessibility Considerations
- **Performance**: 
  - Prefer CSS transitions for hovers. 
  - Ensure zero layout shifts (CLS).
  - Avoid heavy JavaScript bundles; lazy-load complex interactives if they grow large.
- **Accessibility (a11y)**:
  - Strict semantic HTML (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`).
  - Correct heading hierarchy (`h1` -> `h2` -> `h3`).
  - Visible focus rings for keyboard navigation.
  - Sufficient color contrast.

## 7. SEO Strategy
- Refine `<head>` metadata in `index.html` and via `react-helmet-async`.
- Ensure correct `<title>`, `<meta name="description">`, `<link rel="canonical" href="https://sabrinsingh.com.np" />`.
- Add Open Graph tags and ensure `robots.txt` / `sitemap.xml` are properly configured in `public/`.

## 8. Deployment Strategy
- **Platform**: Netlify (existing).
- **Checklist**: A `production_checklist.md` and `DEPLOYMENT.md` will be created before finalizing.
- **Verification**: Will run `npm run build` and `eslint` locally to ensure a zero-error production build. 

## Next Steps (Execution)
1. Delete/archive unwanted "vibe" components.
2. Build the premium Loader and Hero.
3. Implement the new Projects case-study design + SVG Data Flow.
4. Refine the Command Palette and Data Quality Simulation.
5. Finalize responsive CSS, a11y, and SEO.
6. Build, test, and perform QA audit against the Master Specification.
