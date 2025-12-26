# Performance Strategy: Neil's City Site

**Version:** 1.0  
**Date:** December 2024  
**Project:** Personal Portfolio as Futuristic Isometric City

---

## Performance Philosophy

**Content-first performance**: The site must be fast and usable even on slow connections. Visual enhancements should never block content access.

### Core Principles

1. **HTML First**: Content visible without JavaScript
2. **Progressive Enhancement**: Add interactivity only where needed
3. **Critical Path Optimization**: Minimize render-blocking resources
4. **Lazy Loading**: Load non-critical assets on demand
5. **Bundle Budgets**: Enforce strict size limits

---

## Performance Budgets

### Initial Load Budget

| Metric | Target | Budget | Rationale |
|--------|--------|--------|-----------|
| **First Contentful Paint (FCP)** | < 1.5s | 1.2s | Content visible quickly |
| **Largest Contentful Paint (LCP)** | < 2.5s | 2.0s | Main content visible |
| **Time to Interactive (TTI)** | < 3.5s | 3.0s | User can interact |
| **Total Blocking Time (TBT)** | < 200ms | 150ms | Smooth interaction |
| **Cumulative Layout Shift (CLS)** | < 0.1 | 0.05 | Stable layout |

### Bundle Size Budget

| Asset Type | Budget | Gzipped | Notes |
|------------|--------|---------|-------|
| **HTML** | < 20KB | < 5KB | Inline critical CSS |
| **Critical CSS** | < 10KB | < 3KB | Above-fold styles only |
| **JavaScript (islands)** | < 50KB | < 15KB | Code split by route |
| **Total Initial Load** | < 80KB | < 23KB | Before lazy loading |
| **Total Page Weight** | < 500KB | < 150KB | All assets loaded |

### Per-View Budgets

| View | HTML | CSS | JS | Images | Total |
|------|------|-----|-----|---------|-------|
| **City** | 15KB | 8KB | 20KB | 50KB | 93KB |
| **District** | 12KB | 6KB | 15KB | 40KB | 73KB |
| **Building** | 10KB | 5KB | 10KB | 30KB | 55KB |
| **Floor** | 8KB | 4KB | 5KB | 100KB | 117KB |

---

## Critical Rendering Path

### Optimized Load Sequence

```
┌─────────────────────────────────────────────────────────────┐
│              CRITICAL RENDERING PATH                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  t=0ms: HTML starts downloading                            │
│  t=100ms: HTML received, parsing begins                    │
│  t=200ms: Critical CSS inline (no external request)         │
│  t=300ms: First paint (FCP)                                │
│  t=500ms: Main content visible (LCP)                        │
│  t=800ms: Interactive islands hydrate (TTI)                 │
│  t=1000ms: Non-critical assets lazy load                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Critical CSS Strategy

```html
<!-- Inline critical CSS in <head> -->
<head>
  <style>
    /* Critical above-fold styles */
    :root { /* CSS custom properties */ }
    body { /* Base styles */ }
    .header { /* Header styles */ }
    .main-content { /* Main content area */ }
  </style>
  
  <!-- Defer non-critical CSS -->
  <link rel="preload" href="/styles/main.css" as="style" />
  <link rel="stylesheet" href="/styles/main.css" media="print" onload="this.media='all'" />
</head>
```

**Critical CSS includes**:
- CSS custom properties (design tokens)
- Base typography
- Layout structure (header, main, footer)
- Above-fold content styles

**Non-critical CSS** (deferred):
- Below-fold content styles
- Animation styles
- Print styles
- Dark mode styles (loaded on demand)

---

## Bundle Optimization

### Code Splitting Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    CODE SPLITTING                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Entry Point: main.js (5KB)                                │
│  ├── Core utilities (2KB)                                  │
│  └── Router (3KB)                                           │
│                                                              │
│  Route Chunks:                                              │
│  ├── city.js (10KB)                                         │
│  │   └── IsometricCity component                            │
│  ├── district.js (8KB)                                      │
│  │   └── DistrictVisual component                           │
│  ├── building.js (6KB)                                      │
│  │   └── BuildingCutaway component                          │
│  └── floor.js (4KB)                                         │
│      └── FloorContent component                            │
│                                                              │
│  Shared Chunks:                                             │
│  ├── vendors.js (15KB)                                      │
│  │   └── React, MDX renderer                               │
│  └── common.js (5KB)                                        │
│      └── Shared utilities                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Tree Shaking

**Configuration**:
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-mdx': ['@mdx-js/react'],
        }
      }
    },
    minify: 'esbuild',
    target: 'es2020',
  }
});
```

**Best Practices**:
- Use ES modules (not CommonJS)
- Import only what you need
- Avoid default imports from large libraries
- Use dynamic imports for code splitting

### Minification

```typescript
// Production build
{
  minify: 'esbuild', // Fast, good compression
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ['console.log'],
    }
  }
}
```

---

## Asset Optimization

### Image Optimization

#### Strategy

```typescript
// Image optimization pipeline
const imageConfig = {
  formats: ['webp', 'avif', 'jpg'], // Modern formats first
  sizes: {
    thumbnail: { width: 200, quality: 80 },
    medium: { width: 800, quality: 85 },
    large: { width: 1200, quality: 90 },
  },
  lazy: true, // Lazy load by default
  placeholder: 'blur', // Blur placeholder
};
```

#### Responsive Images

```html
<picture>
  <source 
    srcset="/images/city.avif" 
    type="image/avif" 
  />
  <source 
    srcset="/images/city.webp" 
    type="image/webp" 
  />
  <img 
    src="/images/city.jpg" 
    alt="Neil's City"
    loading="lazy"
    decoding="async"
  />
</picture>
```

#### Image Loading Strategy

| Image Type | Loading Strategy | Priority |
|------------|------------------|----------|
| **Hero images** | Eager (above fold) | High |
| **Content images** | Lazy (below fold) | Medium |
| **Decorative images** | Lazy, low priority | Low |
| **Thumbnails** | Lazy, low quality | Low |

### SVG Optimization

```typescript
// SVG optimization
const svgConfig = {
  inline: true, // Inline small SVGs (< 2KB)
  sprite: true, // Use sprite for repeated SVGs
  minify: true, // Remove comments, whitespace
  optimize: true, // SVGO optimization
};
```

**SVG Sprite Strategy**:
- Characters (Neil, Leela): Sprite
- Icons: Sprite
- Complex graphics: Inline or lazy load

### Audio Optimization

```typescript
// Audio optimization
const audioConfig = {
  formats: ['mp3', 'ogg'], // Fallback formats
  compression: 'high', // Smaller file size
  lazy: true, // Load on demand
  preload: 'none', // Don't preload
};
```

**Audio Loading**:
- Ambient soundscape: Load after page interactive
- Train sound: Load on train interaction
- UI sounds: Load on first UI interaction

---

## Loading Strategies

### Progressive Loading

```
┌─────────────────────────────────────────────────────────────┐
│              PROGRESSIVE LOADING STRATEGY                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Phase 1: Critical (0-1s)                                    │
│  ├── HTML                                                    │
│  ├── Critical CSS                                            │
│  └── City data (if city view)                               │
│                                                              │
│  Phase 2: Important (1-2s)                                  │
│  ├── Non-critical CSS                                       │
│  ├── Interactive islands (train, navigation)               │
│  └── Above-fold images                                       │
│                                                              │
│  Phase 3: Enhancement (2-3s)                                │
│  ├── Below-fold images                                       │
│  ├── Audio assets                                            │
│  └── Complex SVGs                                            │
│                                                              │
│  Phase 4: Background (3s+)                                  │
│  ├── Analytics                                               │
│  ├── Prefetch adjacent content                              │
│  └── Service worker cache                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Prefetching Strategy

```typescript
// Prefetch adjacent content
function prefetchAdjacentContent(currentView: NavigationState) {
  switch (currentView.view) {
    case 'city':
      // Prefetch all district metadata
      prefetch('/api/districts/ai.json');
      prefetch('/api/districts/architecture.json');
      // ...
      break;
    
    case 'district':
      // Prefetch building metadata
      prefetch(`/api/buildings/${currentView.districtId}/workflows.json`);
      // Prefetch adjacent districts
      prefetchAdjacentDistricts(currentView.districtId);
      break;
    
    case 'building':
      // Prefetch first floor content
      prefetch(`/${currentView.districtId}/${currentView.buildingId}/first-floor`);
      break;
    
    case 'floor':
      // Prefetch next/prev floors
      prefetchNextFloor(currentView);
      prefetchPrevFloor(currentView);
      break;
  }
}
```

### Lazy Loading Boundaries

```astro
---
// Lazy load components based on visibility
---

<!-- Load immediately -->
<SiteHeader />

<!-- Load when scrolled into view -->
<IsometricCity client:visible />

<!-- Load after page idle -->
<Train client:idle />

<!-- Load on interaction -->
<SearchOverlay client:load />
```

---

## Caching Strategy

### Browser Caching

```typescript
// Cache headers (via Vercel/Netlify)
const cacheHeaders = {
  // Static assets: Long cache
  '/assets/*': {
    'Cache-Control': 'public, max-age=31536000, immutable'
  },
  
  // HTML: Short cache, revalidate
  '/*.html': {
    'Cache-Control': 'public, max-age=3600, must-revalidate'
  },
  
  // JSON APIs: Medium cache, revalidate
  '/api/*': {
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
  },
  
  // Images: Long cache
  '/images/*': {
    'Cache-Control': 'public, max-age=31536000, immutable'
  }
};
```

### Service Worker Caching

```typescript
// Service worker cache strategy
const cacheStrategy = {
  // Static assets: Cache first
  '/assets/': 'CacheFirst',
  
  // HTML: Network first, fallback to cache
  '/': 'NetworkFirst',
  
  // JSON APIs: Stale-while-revalidate
  '/api/': 'StaleWhileRevalidate',
  
  // Images: Cache first
  '/images/': 'CacheFirst',
  
  // Audio: Cache first (large files)
  '/audio/': 'CacheFirst'
};
```

### CDN Caching

- **Static assets**: Edge cached (1 year)
- **HTML**: Edge cached (1 hour, revalidate)
- **JSON**: Edge cached (1 hour, stale-while-revalidate)
- **Images**: Edge cached (1 year)

---

## Network Optimization

### HTTP/2 and HTTP/3

- **HTTP/2**: Server push for critical assets (if supported)
- **HTTP/3**: Use QUIC for faster connections
- **Compression**: Brotli or Gzip for all text assets

### Resource Hints

```html
<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.googleapis.com" />

<!-- DNS prefetch -->
<link rel="dns-prefetch" href="https://fonts.gstatic.com" />

<!-- Prefetch critical resources -->
<link rel="prefetch" href="/api/city.json" as="fetch" />

<!-- Preload critical assets -->
<link rel="preload" href="/fonts/space-grotesk.woff2" as="font" type="font/woff2" crossorigin />
```

---

## Performance Monitoring

### Core Web Vitals Tracking

```typescript
// Track Core Web Vitals
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to analytics service
  // Plausible, Vercel Analytics, or custom endpoint
}

onCLS(sendToAnalytics);
onFID(sendToAnalytics);
onLCP(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);
```

### Performance Budget Monitoring

```typescript
// CI/CD performance budget check
const budgets = {
  FCP: 1500,
  LCP: 2500,
  TTI: 3500,
  bundleSize: 80000,
};

// Run Lighthouse CI in CI/CD
// Fail build if budgets exceeded
```

### Real User Monitoring (RUM)

- Track Core Web Vitals for real users
- Monitor slow pages
- Identify performance regressions
- Set up alerts for budget violations

---

## Mobile Performance

### Mobile-Specific Optimizations

1. **Smaller images**: Serve smaller images on mobile
2. **Reduced animations**: Respect `prefers-reduced-motion`
3. **Simplified visuals**: Hide complex graphics on mobile
4. **Touch optimization**: Larger tap targets, faster response

### Network-Aware Loading

```typescript
// Network-aware loading
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

if (connection) {
  if (connection.effectiveType === '2g' || connection.saveData) {
    // Skip non-critical assets
    disableAnimations();
    skipComplexVisuals();
    useLowQualityImages();
  }
}
```

---

## Performance Checklist

### Build-Time Optimizations

- [ ] Code splitting configured
- [ ] Tree shaking enabled
- [ ] Minification enabled
- [ ] Images optimized (WebP, AVIF)
- [ ] SVGs optimized
- [ ] CSS purged (remove unused)
- [ ] Bundle size budgets enforced

### Runtime Optimizations

- [ ] Critical CSS inlined
- [ ] Non-critical CSS deferred
- [ ] JavaScript islands hydrated appropriately
- [ ] Images lazy loaded
- [ ] Prefetching configured
- [ ] Service worker caching
- [ ] CDN caching headers

### Monitoring

- [ ] Core Web Vitals tracked
- [ ] Performance budgets monitored
- [ ] Lighthouse CI in place
- [ ] Real user monitoring configured

---

## Performance Targets Summary

| Metric | Target | Measurement |
|--------|--------|-------------|
| **FCP** | < 1.5s | Lighthouse, RUM |
| **LCP** | < 2.5s | Lighthouse, RUM |
| **TTI** | < 3.5s | Lighthouse |
| **TBT** | < 200ms | Lighthouse |
| **CLS** | < 0.1 | Lighthouse, RUM |
| **Bundle Size** | < 80KB | Build tool |
| **Total Page Weight** | < 500KB | Network tab |

---

*Performance strategy designed for Neil's City Site. Last updated December 2024.*
