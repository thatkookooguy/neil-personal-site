# Technical Architecture: Neil's City Site

**Version:** 1.0  
**Date:** December 2024  
**Project:** Personal Portfolio as Futuristic Isometric City

---

## Executive Summary

This document defines the technical architecture for Neil's City Site—a content-first, performance-optimized portfolio site that presents content as an explorable isometric city. The architecture prioritizes accessibility, progressive enhancement, and maintainability while supporting rich visual interactions.

### Key Architectural Decisions

1. **Framework: Astro** — Content-first SSG with island architecture
2. **Rendering: Hybrid CSS/SVG** — CSS transforms for isometric visuals, SVG for complex graphics
3. **State Management: URL-driven** — Minimal client-side state, URL as source of truth
4. **Content: MDX** — Markdown with React components for rich content
5. **Styling: CSS Custom Properties** — Design tokens for easy theming

---

## Framework Recommendation: Astro

### Evaluation Matrix

| Framework | SSG | MDX | Bundle Size | DX | Animation | Score |
|-----------|-----|-----|-------------|----|-----------|-------|
| **Astro** | ✅ Excellent | ✅ Native | ⭐⭐⭐⭐⭐ Minimal | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐ Good | **9/10** |
| Next.js | ✅ Excellent | ✅ Via plugin | ⭐⭐⭐ Medium | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐⭐⭐ Excellent | 8/10 |
| SvelteKit | ✅ Excellent | ⚠️ Via plugin | ⭐⭐⭐⭐⭐ Minimal | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Excellent | 7/10 |

### Why Astro?

#### 1. Content-First Philosophy
- **Zero JS by default**: Perfect for content-first requirement
- **Island architecture**: Ship JavaScript only where needed (train animation, interactive building)
- **Static generation**: All content pre-rendered at build time

#### 2. Performance Characteristics
- **Minimal bundle**: Only interactive components ship JS
- **Fast FCP**: HTML-first approach ensures rapid first paint
- **Small runtime**: No React/Vue runtime overhead for static content

#### 3. MDX Support
- **Native MDX**: Built-in support without configuration
- **Component islands**: MDX can use React/Vue/Svelte components seamlessly
- **Frontmatter**: Easy content metadata management

#### 4. Developer Experience
- **Familiar**: Uses Vite, supports React/Vue/Svelte components
- **TypeScript**: First-class TypeScript support
- **Hot reload**: Fast development experience

#### 5. Animation Ecosystem
- **Framework agnostic**: Can use Framer Motion, GSAP, or CSS animations
- **Island hydration**: Animations only load when needed
- **CSS-first**: Encourages CSS animations for performance

### Trade-offs

| Advantage | Trade-off |
|-----------|-----------|
| Minimal JS bundle | Less interactive by default (requires explicit hydration) |
| Content-first | More setup for complex interactivity |
| Island architecture | Need to think about hydration boundaries |

**Verdict**: Astro aligns perfectly with content-first, performance-first requirements while maintaining flexibility for interactive elements.

---

## Rendering Approach: Hybrid CSS/SVG

### Evaluation: CSS vs Canvas vs WebGL

| Approach | Performance | Accessibility | Complexity | Mobile | Score |
|----------|-------------|--------------|-----------|--------|-------|
| **CSS/SVG** | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐⭐ Manageable | ⭐⭐⭐⭐⭐ Excellent | **9/10** |
| Canvas | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐ Poor | ⭐⭐⭐ Complex | ⭐⭐⭐ Good | 6/10 |
| WebGL | ⭐⭐⭐⭐⭐ Excellent | ⭐ Poor | ⭐ Very Complex | ⭐⭐ Limited | 4/10 |

### Recommended Approach: CSS Transforms + SVG

#### City View (Isometric)
```css
/* CSS transforms for isometric perspective */
.city-container {
  transform-style: preserve-3d;
  perspective: 1000px;
  transform: rotateX(60deg) rotateZ(-45deg);
}

.district {
  transform: translate3d(x, y, z);
  transition: transform 300ms ease-out;
}

/* SVG for train tracks and complex paths */
.train-track {
  /* SVG path for curved tracks */
}
```

**Rationale:**
- **Accessible**: Screen readers can navigate CSS/SVG structure
- **Performant**: GPU-accelerated transforms
- **Maintainable**: Standard CSS, easy to debug
- **Responsive**: Scales with viewport

#### Building Cutaway
```css
/* Side-view building with CSS */
.building-cutaway {
  display: flex;
  flex-direction: column;
  transform: perspective(500px) rotateY(-15deg);
}

.floor {
  height: var(--floor-height);
  border-bottom: 2px solid var(--border-default);
  transition: transform 200ms;
}

.floor:hover {
  transform: translateX(10px);
}
```

**Rationale:**
- **Simple**: Standard CSS layout
- **Accessible**: Semantic HTML structure
- **Performant**: No canvas overhead

#### Complex Graphics (SVG)
```svg
<!-- SVG for train, characters, decorative elements -->
<svg viewBox="0 0 100 100" aria-hidden="true">
  <g class="train">
    <rect x="10" y="20" width="60" height="30" fill="var(--color-teal-500)"/>
    <!-- Train details -->
  </g>
</svg>
```

**Rationale:**
- **Scalable**: Vector graphics scale perfectly
- **Stylable**: CSS can control colors via custom properties
- **Accessible**: Can be hidden or described appropriately

### When to Use Each

| Element | Technology | Rationale |
|---------|-----------|-----------|
| City layout | CSS transforms | Simple, performant, accessible |
| District markers | CSS + SVG icons | Scalable icons, CSS positioning |
| Train | SVG + CSS animation | Complex shape, smooth animation |
| Building cutaway | CSS flexbox | Simple layout, semantic HTML |
| Floor content | HTML + CSS | Content-first, fully accessible |
| Characters (Neil/Leela) | SVG sprites | Scalable, animatable |
| Backgrounds | CSS gradients + SVG patterns | Lightweight, themeable |

### Performance Considerations

1. **GPU Acceleration**: Use `transform` and `opacity` for animations
2. **Will-change**: Hint browser for animated elements
3. **Reduce Motion**: Respect `prefers-reduced-motion`
4. **Lazy Loading**: Load complex SVGs only when visible

---

## Data Flow Architecture

### Content Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTENT PIPELINE                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  MDX Files                                                  │
│  ┌────────────────────────────────────────────────────┐    │
│  │ /content/districts/ai/buildings/workflows/        │    │
│  │   floors/01-prompt-engineering.mdx                 │    │
│  │                                                     │    │
│  │   ---                                              │    │
│  │   title: "Prompt Engineering"                      │    │
│  │   order: 1                                         │    │
│  │   summary: "The art of crafting..."                │    │
│  │   ---                                              │    │
│  │                                                     │    │
│  │   # Prompt Engineering                             │    │
│  │   Content here...                                  │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                  │
│                          ▼                                  │
│  Astro Content Collections                                 │
│  ┌────────────────────────────────────────────────────┐    │
│  │ defineCollection({                                 │    │
│  │   type: 'content',                                 │    │
│  │   schema: z.object({                               │    │
│  │     title: z.string(),                             │    │
│  │     order: z.number(),                             │    │
│  │     summary: z.string(),                          │    │
│  │   })                                               │    │
│  │ })                                                 │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                  │
│                          ▼                                  │
│  TypeScript Types                                          │
│  ┌────────────────────────────────────────────────────┐    │
│  │ type Floor = {                                     │    │
│  │   id: string;                                      │    │
│  │   title: string;                                  │    │
│  │   order: number;                                  │    │
│  │   content: string;                                │    │
│  │   building: Building;                             │    │
│  │   district: District;                             │    │
│  │ }                                                  │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                  │
│                          ▼                                  │
│  Build-Time Processing                                     │
│  ┌────────────────────────────────────────────────────┐    │
│  │ - Generate city.json                               │    │
│  │ - Create navigation structure                      │    │
│  │ - Build search index                               │    │
│  │ - Optimize images                                  │    │
│  │ - Generate sitemap                                │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                  │
│                          ▼                                  │
│  Static HTML + JSON                                        │
│  ┌────────────────────────────────────────────────────┐    │
│  │ /index.html                                        │    │
│  │ /ai/index.html                                     │    │
│  │ /ai/workflows/index.html                           │    │
│  │ /ai/workflows/prompt-engineering/index.html        │    │
│  │ /api/city.json                                     │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Runtime Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  RUNTIME DATA FLOW                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Page Load                                                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │ 1. HTML loads (immediate)                          │    │
│  │ 2. CSS loads (critical path)                        │    │
│  │ 3. city.json fetched (if needed)                    │    │
│  │ 4. Interactive components hydrate (islands)         │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                  │
│                          ▼                                  │
│  Navigation (SPA-like)                                      │
│  ┌────────────────────────────────────────────────────┐    │
│  │ User clicks district                               │    │
│  │   ↓                                                │    │
│  │ History API: pushState('/ai')                    │    │
│  │   ↓                                                │    │
│  │ Fetch: GET /ai/index.html (or JSON)              │    │
│  │   ↓                                                │    │
│  │ Update DOM (minimal diff)                          │    │
│  │   ↓                                                │    │
│  │ Animate transition                                  │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  State Management                                           │
│  ┌────────────────────────────────────────────────────┐    │
│  │ URL = Source of Truth                              │    │
│  │   /ai/workflows/prompt-engineering                  │    │
│  │                                                     │    │
│  │ Client State (minimal):                            │    │
│  │   - Scroll position (sessionStorage)               │    │
│  │   - Visited floors (localStorage)                  │    │
│  │   - Theme preference (localStorage)                 │    │
│  │   - Reduced motion (localStorage)                   │    │
│  │                                                     │    │
│  │ No global state management library needed           │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Content Loading Strategy

#### Initial Load
1. **HTML**: Immediate (from static files)
2. **CSS**: Critical CSS inline, rest deferred
3. **JS**: Only interactive islands (train, building cutaway)
4. **Images**: Lazy loaded below fold

#### Navigation Load
1. **Prefetch**: Adjacent districts/buildings on hover
2. **Fetch**: Target page HTML or JSON
3. **Update**: DOM diff (minimal changes)
4. **Animate**: Transition (if motion enabled)

#### Asset Loading
```typescript
// Asset loading strategy
const assetLoader = {
  // Critical: Load immediately
  critical: ['city.json', 'districts.json'],
  
  // Prefetch: Load on hover/focus
  prefetch: ['adjacent-districts', 'building-metadata'],
  
  // Lazy: Load when visible
  lazy: ['images', 'audio', 'complex-svgs'],
  
  // Deferred: Load after interaction
  deferred: ['analytics', 'non-critical-islands']
};
```

---

## State Management Approach

### Philosophy: URL-Driven State

**Principle**: The URL is the single source of truth for navigation state.

```typescript
// URL structure maps directly to state
type AppState = {
  view: 'city' | 'district' | 'building' | 'floor';
  district?: string;
  building?: string;
  floor?: string;
};

// URL → State mapping
function urlToState(url: string): AppState {
  const parts = url.split('/').filter(Boolean);
  
  if (parts.length === 0) return { view: 'city' };
  if (parts.length === 1) return { view: 'district', district: parts[0] };
  if (parts.length === 2) return { view: 'building', district: parts[0], building: parts[1] };
  if (parts.length === 3) return { view: 'floor', district: parts[0], building: parts[1], floor: parts[2] };
  
  return { view: 'city' };
}
```

### Client-Side State (Minimal)

Only store what cannot be derived from URL:

```typescript
type ClientState = {
  // UI state (not in URL)
  ui: {
    searchOpen: boolean;
    menuOpen: boolean;
    trainAnimating: boolean;
  };
  
  // Preferences (localStorage)
  preferences: {
    theme: 'light' | 'dark' | 'system';
    reducedMotion: boolean;
    audioEnabled: boolean;
  };
  
  // Session state (sessionStorage)
  session: {
    scrollPositions: Record<string, number>;
    visitedFloors: Set<string>;
  };
};
```

### No Global State Library Needed

- **URL**: Navigation state
- **DOM**: UI state (modals, menus)
- **localStorage**: User preferences
- **sessionStorage**: Session data

**Rationale**: Reduces bundle size, simplifies architecture, aligns with content-first approach.

---

## API Design

### Static JSON Endpoints

```typescript
// /api/city.json
{
  districts: [
    {
      id: 'ai',
      name: 'AI District',
      slug: 'ai',
      buildings: [
        {
          id: 'workflows',
          name: 'AI Workflows',
          slug: 'workflows',
          floorCount: 4
        }
      ]
    }
  ]
}

// /api/districts/[district].json
{
  id: 'ai',
  name: 'AI District',
  buildings: [...],
  metadata: {...}
}

// /api/buildings/[district]/[building].json
{
  id: 'workflows',
  name: 'AI Workflows',
  floors: [
    {
      id: 'prompt-engineering',
      title: 'Prompt Engineering',
      order: 1,
      summary: '...'
    }
  ]
}
```

### Search API (Client-Side)

```typescript
// Build-time: Generate search index
// Runtime: Client-side search

type SearchIndex = {
  floors: Array<{
    id: string;
    title: string;
    summary: string;
    content: string; // Excerpt
    district: string;
    building: string;
    url: string;
  }>;
};

// Search function
function search(query: string, index: SearchIndex): SearchResult[] {
  // Simple text matching (can enhance with fuzzy search)
  return index.floors.filter(floor => 
    floor.title.toLowerCase().includes(query.toLowerCase()) ||
    floor.content.toLowerCase().includes(query.toLowerCase())
  );
}
```

---

## Integration Patterns

### Content + Components

```astro
---
// src/pages/[district]/[building]/[floor].astro
import FloorLayout from '@/layouts/FloorLayout.astro';
import { getFloor, getBuilding, getDistrict } from '@/lib/content';

const floor = await getFloor(params.floor);
const building = await getBuilding(params.building);
const district = await getDistrict(params.district);
---

<FloorLayout 
  floor={floor} 
  building={building} 
  district={district}
>
  <article>
    <FloorContent client:load>
      {@html floor.content}
    </FloorContent>
  </article>
</FloorLayout>
```

### Island Hydration

```astro
---
// Train component - only hydrates when needed
---

<div class="train-container">
  <!-- Static SVG train (works without JS) -->
  <svg class="train-static" aria-hidden="true">
    <!-- Train SVG -->
  </svg>
  
  <!-- Interactive train (hydrates on interaction) -->
  <TrainAnimation client:idle />
</div>
```

**Hydration Strategies:**
- `client:load` — Immediate (critical interactions)
- `client:idle` — After page load (train animation)
- `client:visible` — When scrolled into view (building cutaway)
- `client:media` — Based on media query (desktop-only features)

---

## Security Architecture

### Content Security Policy

```typescript
// astro.config.ts
export default defineConfig({
  security: {
    checkOrigin: true,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"], // Only for islands
        styleSrc: ["'self'", "'unsafe-inline'"], // CSS custom properties
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"], // For API calls
      }
    }
  }
});
```

### Input Sanitization

- **MDX**: Sanitized at build time
- **Search**: Client-side only, no server input
- **URLs**: Validated against known routes

---

## Deployment Architecture

### Static Site Generation

```
Build Process:
1. Read MDX files from /content
2. Process through Astro content collections
3. Generate static HTML for all routes
4. Optimize images
5. Generate JSON APIs
6. Output to /dist
```

### Hosting Options

| Option | Pros | Cons | Recommendation |
|--------|------|------|---------------|
| **Vercel** | Excellent DX, edge functions | Vendor lock-in | ⭐⭐⭐⭐⭐ |
| Netlify | Good DX, edge functions | Slightly slower | ⭐⭐⭐⭐ |
| Cloudflare Pages | Fast, edge functions | Less DX polish | ⭐⭐⭐⭐ |
| GitHub Pages | Free, simple | No edge functions | ⭐⭐⭐ |

**Recommendation**: Vercel for best developer experience and performance.

### CDN Strategy

- **Static assets**: CDN cached (1 year)
- **HTML**: CDN cached (1 hour, revalidate)
- **JSON APIs**: CDN cached (1 hour, revalidate)
- **Images**: CDN cached (1 year), optimized formats

---

## Performance Architecture

### Bundle Size Budget

| Asset Type | Budget | Strategy |
|------------|--------|----------|
| **Initial HTML** | < 20KB | Inline critical CSS |
| **Critical CSS** | < 10KB | Extract above-fold styles |
| **JavaScript (islands)** | < 50KB | Code split by route |
| **Total Initial Load** | < 80KB | Lazy load non-critical |
| **Total Page Weight** | < 500KB | Optimize images, lazy load |

### Loading Strategy

```
Critical Path:
1. HTML (immediate)
2. Critical CSS (inline)
3. City data (if city view)
4. Interactive islands (deferred)

Non-Critical:
- Images (lazy load)
- Audio (on demand)
- Complex SVGs (lazy load)
- Analytics (deferred)
```

### Caching Strategy

```typescript
// Service Worker caching
const cacheStrategy = {
  // Static assets: Cache first
  static: 'CacheFirst',
  
  // HTML: Network first, fallback to cache
  html: 'NetworkFirst',
  
  // JSON APIs: Stale-while-revalidate
  api: 'StaleWhileRevalidate',
  
  // Images: Cache first, optimize
  images: 'CacheFirst'
};
```

---

## Technology Stack Summary

### Core
- **Framework**: Astro 4.x
- **Language**: TypeScript 5.x
- **Styling**: CSS Custom Properties + PostCSS
- **Content**: MDX

### Build Tools
- **Bundler**: Vite (via Astro)
- **CSS**: PostCSS + Autoprefixer
- **Type Checking**: TypeScript
- **Linting**: ESLint + Prettier

### Runtime
- **Islands**: React (for interactive components)
- **Animations**: CSS + Framer Motion (islands)
- **State**: URL + localStorage/sessionStorage

### Content
- **Markdown**: MDX
- **Images**: Sharp (optimization)
- **Audio**: Web Audio API (for soundscape)

### Deployment
- **Hosting**: Vercel
- **CDN**: Vercel Edge Network
- **Analytics**: (Optional) Plausible or Vercel Analytics

---

## Architecture Decision Records

### ADR-001: Astro over Next.js

**Decision**: Use Astro instead of Next.js for content-first architecture.

**Rationale**:
- Zero JS by default aligns with content-first requirement
- Smaller bundle size meets performance targets
- Island architecture allows selective interactivity
- Native MDX support simplifies content pipeline

**Trade-offs**:
- Less ecosystem maturity than Next.js
- Requires explicit hydration decisions
- Less built-in routing features (but sufficient for our needs)

### ADR-002: CSS/SVG over Canvas

**Decision**: Use CSS transforms and SVG instead of Canvas for isometric visuals.

**Rationale**:
- Accessibility: Screen readers can navigate CSS/SVG structure
- Performance: GPU-accelerated CSS transforms
- Maintainability: Standard web technologies
- Responsive: Scales naturally with viewport

**Trade-offs**:
- Less control over rendering pipeline
- CSS transforms can be complex for 3D
- SVG can be verbose for complex graphics

### ADR-003: URL-Driven State

**Decision**: Use URL as source of truth, minimal client-side state.

**Rationale**:
- Simplicity: No state management library needed
- Shareability: Every state has a URL
- SEO: All content accessible via URL
- Performance: Reduces JavaScript bundle

**Trade-offs**:
- URL can become long for deep navigation
- Browser history stack management needed
- Less flexibility for complex UI state

---

## Scalability Considerations

### Content Scalability

- **Current**: ~37 floors across 6 districts
- **Future**: Can scale to 100+ floors without architecture changes
- **Strategy**: Content collections handle growth automatically

### Performance Scalability

- **Current**: Static generation handles all content
- **Future**: If content grows significantly, consider:
  - Incremental Static Regeneration (ISR)
  - Edge functions for dynamic content
  - Database for content (if needed)

### Feature Scalability

- **Current**: Basic portfolio site
- **Future**: Can add:
  - Comments (via third-party service)
  - Search (enhance client-side or add serverless function)
  - Analytics (edge function or third-party)
  - Forms (serverless function)

**Architecture supports growth without major refactoring.**

---

## Risk Assessment

### Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Astro ecosystem gaps | Medium | Low | Astro is mature, can use React/Vue components |
| CSS transform complexity | Low | Medium | Prototype early, simplify if needed |
| Bundle size creep | High | Medium | Enforce bundle budgets, code splitting |
| Accessibility gaps | High | Low | Test early, follow WCAG guidelines |

### Mitigation Strategies

1. **Prototype early**: Build proof-of-concept for isometric visuals
2. **Bundle monitoring**: Set up bundle size CI checks
3. **Accessibility testing**: Automated + manual testing
4. **Performance budgets**: Enforce Lighthouse scores in CI

---

## Next Steps

1. **Set up Astro project** with TypeScript
2. **Create content collection schema** for districts/buildings/floors
3. **Build isometric CSS prototype** for city view
4. **Implement content pipeline** (MDX → HTML)
5. **Set up performance monitoring** (Lighthouse CI)
6. **Create component library** foundation

---

*Technical architecture designed for Neil's City Site. Last updated December 2024.*
