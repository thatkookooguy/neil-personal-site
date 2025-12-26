# Accessibility Strategy: Neil's City Site

**Date Created**: December 26, 2025  
**Last Updated**: December 26, 2025  
**Purpose**: Define screen reader strategy, focus management, reduced motion support, and comprehensive accessibility for the city metaphor navigation

---

## Accessibility Philosophy

Neil's City Site must be **fully accessible** without compromising the creative city metaphor. The visual experience is a layer of delight; the underlying content and navigation must work perfectly for all users regardless of ability.

### Core Principles

1. **Content First**: All content accessible without visuals
2. **Multiple Modalities**: Visual, auditory, and keyboard access to all features
3. **No Barriers**: No functionality locked behind mouse-only or animation-only interactions
4. **Progressive Enhancement**: Base accessibility is the foundation, visual enhancement is additive
5. **WCAG 2.1 AA Compliance**: Minimum standard; aim for AAA where practical

---

## Screen Reader Strategy

### Semantic Structure

#### Page Hierarchy

Every page must have clear semantic structure:

```html
<!-- City View -->
<main id="main-content" role="main" aria-label="Neil's City - Portfolio">
  <header role="banner">
    <h1>Welcome to Neil's City</h1>
    <nav aria-label="Primary navigation">
      <!-- District links -->
    </nav>
  </header>
  
  <section aria-label="Districts">
    <h2 class="sr-only">Explore Districts</h2>
    <!-- District list -->
  </section>
</main>

<!-- District View -->
<main id="main-content" aria-label="AI District">
  <nav aria-label="Breadcrumb">
    <ol>
      <li><a href="/">City</a></li>
      <li aria-current="page">AI District</li>
    </ol>
  </nav>
  
  <h1>AI District</h1>
  
  <section aria-label="Buildings in AI District">
    <h2 class="sr-only">Buildings</h2>
    <!-- Building list -->
  </section>
</main>

<!-- Building View -->
<main id="main-content" aria-label="AI Workflows Building">
  <nav aria-label="Breadcrumb">...</nav>
  
  <h1>AI Workflows</h1>
  
  <nav aria-label="Floors in this building">
    <h2 class="sr-only">Floors</h2>
    <ol>
      <li><a href="/ai/workflows/prompt-engineering">Floor 1: Prompt Engineering</a></li>
      <!-- More floors -->
    </ol>
  </nav>
</main>

<!-- Floor View -->
<main id="main-content" aria-label="Prompt Engineering">
  <nav aria-label="Breadcrumb">...</nav>
  
  <article>
    <h1>Prompt Engineering</h1>
    <!-- Article content -->
  </article>
  
  <nav aria-label="Floor navigation">
    <a href="/ai/workflows/chain-of-thought">Next: Chain of Thought</a>
  </nav>
</main>
```

### Landmark Regions

| Landmark | Purpose | Implementation |
|----------|---------|----------------|
| `<header role="banner">` | Site header | Logo, search, primary nav |
| `<nav aria-label="...">` | Navigation regions | Breadcrumb, district nav, floor nav |
| `<main role="main">` | Primary content | One per page |
| `<section aria-label="...">` | Content sections | Districts, buildings, floors |
| `<footer role="contentinfo">` | Site footer | Links, copyright |

### ARIA Attributes

#### Live Regions

For dynamic content updates:

```html
<!-- Train status announcements -->
<div aria-live="polite" aria-atomic="true" class="sr-only" id="train-status">
  <!-- Updated dynamically -->
  Train arriving at AI District
</div>

<!-- Navigation state changes -->
<div aria-live="polite" class="sr-only" id="nav-status">
  <!-- Updated on navigation -->
  Now viewing AI Workflows building with 4 floors
</div>

<!-- Loading state -->
<div aria-live="assertive" aria-busy="true" class="sr-only" id="loading-status">
  Loading content...
</div>
```

#### State Indicators

```html
<!-- Current page in navigation -->
<a href="/ai" aria-current="page">AI District</a>

<!-- Expanded/collapsed states -->
<button 
  aria-expanded="false" 
  aria-controls="train-menu"
  aria-label="Open train station menu"
>
  🚂 Train
</button>

<!-- Selected item -->
<li role="option" aria-selected="true">Prompt Engineering</li>

<!-- Disabled state -->
<button aria-disabled="true">Previous Floor (none)</button>
```

### Screen Reader Announcements

| Event | Announcement | Priority |
|-------|--------------|----------|
| Page load | "Neil's City, [page title]" | Immediate |
| Navigation | "Now viewing [location]" | Polite |
| Train departing | "Train departing for [district]" | Polite |
| Train arriving | "Arrived at [district]" | Polite |
| Content loading | "Loading content" | Assertive |
| Content loaded | "Content loaded" | Polite |
| Error | "[Error message]" | Assertive |
| Search results | "[N] results for [query]" | Polite |

### Alternative Text Strategy

#### City Visual

```html
<div 
  role="img" 
  aria-label="Isometric view of Neil's City with 6 districts: Central Station, AI, Architecture, DX, Infrastructure, and Open Source, connected by train tracks"
>
  <!-- Visual elements (decorative) -->
</div>
```

#### Building Visuals

```html
<div 
  role="img" 
  aria-label="Cutaway view of AI Workflows building showing 4 floors: Prompt Engineering, Chain of Thought, Context Windows, and Tool Calling"
>
  <!-- Visual elements -->
</div>
```

#### Decorative Elements

```html
<!-- Train animation - decorative -->
<div aria-hidden="true" class="train-animation">
  <!-- Animation elements -->
</div>
```

---

## Focus Management

### Focus Order

Follow logical reading order, not visual layout:

```
City View Focus Order:
1. Skip link (to main content)
2. Logo/Home link
3. Search button
4. Menu button (mobile)
5. Primary navigation (districts)
6. Main content area (district cards)
7. Train navigation (if interactive)
8. Footer

District View Focus Order:
1. Skip link
2. Breadcrumb navigation
3. Page title (h1)
4. Building cards
5. Train station menu
6. Footer

Building View Focus Order:
1. Skip link
2. Breadcrumb navigation
3. Building title (h1)
4. Floor list (navigable)
5. Footer

Floor View Focus Order:
1. Skip link
2. Breadcrumb (back to building)
3. Article title (h1)
4. Article content
5. Related floors
6. Prev/Next navigation
7. Footer
```

### Skip Links

```html
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <a href="#navigation" class="skip-link">Skip to navigation</a>
  <a href="#search" class="skip-link">Skip to search</a>
  
  <!-- Rest of page -->
</body>

<style>
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 0.5rem 1rem;
  z-index: 1000;
}

.skip-link:focus {
  top: 0;
}
</style>
```

### Focus Indicators

All interactive elements must have visible focus indicators:

```css
/* Base focus style */
:focus {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

/* Enhanced focus for key navigation */
.district-card:focus,
.building-card:focus,
.floor-link:focus {
  outline: 3px solid var(--color-focus);
  outline-offset: 4px;
  box-shadow: 0 0 0 6px rgba(var(--color-focus-rgb), 0.3);
}

/* Focus-visible for keyboard only */
:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}
```

### Focus Management on Navigation

```javascript
// Focus management for SPA navigation
function handleNavigation(targetElement, announcement) {
  // 1. Move focus to new content
  const mainContent = document.getElementById('main-content');
  mainContent.setAttribute('tabindex', '-1');
  mainContent.focus();
  
  // 2. Announce change
  announceToScreenReader(announcement);
  
  // 3. Update document title
  document.title = getPageTitle(targetElement);
}

// Focus trap for modals
function trapFocus(modal) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
  
  firstElement.focus();
}
```

### Focus Restoration

When returning from a sub-view, restore focus to the triggering element:

```javascript
// Track focus source
let focusSource = null;

function openBuilding(buildingElement) {
  focusSource = buildingElement;
  navigateToBuilding(buildingElement.dataset.building);
}

function closeBuilding() {
  navigateToDistrict();
  
  // Restore focus after navigation completes
  requestAnimationFrame(() => {
    if (focusSource) {
      focusSource.focus();
      focusSource = null;
    }
  });
}
```

---

## Keyboard Navigation

### Global Shortcuts Reference

| Key | Action | Context |
|-----|--------|---------|
| `Tab` | Next focusable element | Global |
| `Shift+Tab` | Previous focusable element | Global |
| `Enter` / `Space` | Activate element | On focusable |
| `Escape` | Close modal/menu, go back | Modal open, any view |
| `/` or `Cmd+K` | Open search | Global |
| `?` | Show shortcuts help | Global |
| `Backspace` | Navigate up one level | District, Building, Floor |

### View-Specific Keys

#### City View
| Key | Action |
|-----|--------|
| `1` - `6` | Jump to district by number |
| `Arrow keys` | Navigate between district cards |
| `Enter` | Enter selected district |
| `t` | Focus train controls |

#### District View
| Key | Action |
|-----|--------|
| `←` / `→` | Adjacent district |
| `↑` / `↓` | Navigate between buildings |
| `Enter` | Enter selected building |
| `Backspace` | Return to city |
| `t` | Open train menu |

#### Building View
| Key | Action |
|-----|--------|
| `↑` / `↓` | Navigate floors |
| `Home` | First floor |
| `End` | Last floor |
| `Enter` | Open selected floor |
| `Backspace` | Return to district |
| `j` / `k` | Vim-style navigation |

#### Floor View
| Key | Action |
|-----|--------|
| `←` or `k` | Previous floor |
| `→` or `j` | Next floor |
| `Space` | Scroll down |
| `Shift+Space` | Scroll up |
| `Backspace` | Return to building |

### Keyboard Accessibility Requirements

1. **All interactive elements must be keyboard accessible**
2. **Focus must be visible** at all times
3. **Tab order must be logical** (follows reading order)
4. **No keyboard traps** (can always escape)
5. **Custom shortcuts don't conflict** with browser/AT shortcuts
6. **Shortcuts are discoverable** (help modal)

### Keyboard Shortcut Disclosure

```html
<!-- Accessible shortcut help modal -->
<dialog id="shortcuts-help" aria-labelledby="shortcuts-title">
  <h2 id="shortcuts-title">Keyboard Shortcuts</h2>
  
  <section aria-labelledby="shortcuts-global">
    <h3 id="shortcuts-global">Global</h3>
    <dl>
      <dt><kbd>/</kbd> or <kbd>⌘</kbd><kbd>K</kbd></dt>
      <dd>Open search</dd>
      <dt><kbd>?</kbd></dt>
      <dd>Show this help</dd>
      <dt><kbd>Esc</kbd></dt>
      <dd>Close modal or go back</dd>
    </dl>
  </section>
  
  <!-- More sections... -->
  
  <button onclick="this.closest('dialog').close()">Close</button>
</dialog>
```

---

## Reduced Motion Support

### Detecting User Preference

```css
/* Default: animations enabled */
.train {
  transition: transform 1000ms ease-in-out;
}

/* Reduced motion: minimal/no animations */
@media (prefers-reduced-motion: reduce) {
  .train,
  .building-cutaway,
  .floor-transition,
  .page-transition {
    animation: none;
    transition: none;
  }
  
  /* Essential state changes only */
  .transition-state {
    transition: opacity 100ms ease;
  }
}
```

### JavaScript Implementation

```javascript
// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
);

function shouldAnimate() {
  return !prefersReducedMotion.matches;
}

// Navigation with animation consideration
function navigateToDistrict(districtId) {
  if (shouldAnimate()) {
    animateTrainTo(districtId).then(() => {
      loadDistrict(districtId);
    });
  } else {
    // Instant navigation, no animation
    loadDistrict(districtId);
  }
}

// Listen for changes
prefersReducedMotion.addEventListener('change', (e) => {
  if (e.matches) {
    stopAllAnimations();
  }
});
```

### What Changes with Reduced Motion

| Element | With Animation | Reduced Motion |
|---------|---------------|----------------|
| Train movement | Animated travel | Instant position change |
| View transitions | Smooth zoom/fade | Instant swap |
| Building cutaway | Animated reveal | Instant show |
| Floor navigation | Slide transition | Instant swap |
| Loading spinners | Spinning animation | Static or progress bar |
| Hover effects | Animated | Static state change |
| Scroll animations | Parallax, reveals | No scroll effects |

### Manual Override Option

Allow users to control animation independent of system preference:

```html
<fieldset>
  <legend>Animation Preferences</legend>
  <label>
    <input type="radio" name="motion" value="system" checked>
    Use system preference
  </label>
  <label>
    <input type="radio" name="motion" value="reduced">
    Reduce motion
  </label>
  <label>
    <input type="radio" name="motion" value="full">
    Full animations
  </label>
</fieldset>
```

---

## Color and Contrast

### Contrast Requirements

| Element Type | Minimum Contrast | Target |
|--------------|------------------|--------|
| Body text | 4.5:1 | 7:1 |
| Large text (18pt+) | 3:1 | 4.5:1 |
| UI components | 3:1 | 4.5:1 |
| Focus indicators | 3:1 | 4.5:1 |
| Decorative | N/A | N/A |

### Color Not Sole Indicator

Never use color alone to convey information:

```html
<!-- Bad: Color only -->
<span class="status-green">Active</span>
<span class="status-red">Error</span>

<!-- Good: Color + text/icon -->
<span class="status-active">✓ Active</span>
<span class="status-error">⚠ Error</span>

<!-- Good: Color + pattern for charts -->
<div class="chart-bar active" aria-label="Active: 75%">
  <!-- Striped pattern + green color -->
</div>
```

### District Color Coding

Each district has a color, but never rely on color alone:

| District | Color | Icon | Label |
|----------|-------|------|-------|
| Central Station | Gold | 🏛️ | "Central Station" |
| AI | Purple | 🤖 | "AI District" |
| Architecture | Blue | 🏗️ | "Architecture" |
| DX | Green | 💻 | "DX District" |
| Infrastructure | Orange | 🔧 | "Infrastructure" |
| Open Source | Teal | 📦 | "Open Source" |

### High Contrast Mode Support

```css
@media (forced-colors: active) {
  /* Ensure elements are visible in high contrast */
  .district-card {
    border: 2px solid ButtonText;
  }
  
  .focus-indicator {
    outline: 3px solid Highlight;
  }
  
  /* Preserve important visual distinctions */
  .current-floor {
    background: Highlight;
    color: HighlightText;
  }
}
```

---

## Content Accessibility

### Headings

Proper heading hierarchy on every page:

```html
<!-- Floor page example -->
<h1>Prompt Engineering</h1>

<h2>Introduction</h2>
<p>...</p>

<h2>The Art of Prompting</h2>

<h3>System Prompts</h3>
<p>...</p>

<h3>User Prompts</h3>
<p>...</p>

<h2>Advanced Techniques</h2>
<p>...</p>
```

### Links

Meaningful link text:

```html
<!-- Bad -->
<a href="/ai/workflows">Click here</a>
<a href="/ai/agents">Read more</a>

<!-- Good -->
<a href="/ai/workflows">AI Workflows building</a>
<a href="/ai/agents">Learn about AI Agents</a>

<!-- Links that open new windows -->
<a href="https://example.com" target="_blank" rel="noopener">
  External Resource
  <span class="sr-only">(opens in new tab)</span>
</a>
```

### Images

All images must have appropriate alt text:

```html
<!-- Informative image -->
<img 
  src="architecture-diagram.png" 
  alt="System architecture showing microservices connected through an API gateway"
>

<!-- Decorative image -->
<img src="decorative-pattern.png" alt="" role="presentation">

<!-- Complex diagram -->
<figure>
  <img 
    src="complex-diagram.png" 
    alt="Workflow diagram (see description below)"
  >
  <figcaption>
    <details>
      <summary>Detailed description of workflow</summary>
      <p>The workflow begins with user input, which is processed by...</p>
    </details>
  </figcaption>
</figure>
```

### Code Blocks

Accessible code examples:

```html
<figure>
  <figcaption id="code-example-1">Example: Basic prompt structure</figcaption>
  <pre><code aria-describedby="code-example-1" tabindex="0">
const prompt = `
  System: You are a helpful assistant.
  User: ${userInput}
`;
  </code></pre>
</figure>
```

### Tables

Accessible data tables:

```html
<table>
  <caption>Navigation Shortcuts by View</caption>
  <thead>
    <tr>
      <th scope="col">Key</th>
      <th scope="col">City View</th>
      <th scope="col">District View</th>
      <th scope="col">Building View</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Enter</th>
      <td>Open district</td>
      <td>Open building</td>
      <td>Open floor</td>
    </tr>
    <!-- More rows -->
  </tbody>
</table>
```

---

## Forms and Interactive Elements

### Search

```html
<search>
  <form role="search" action="/search">
    <label for="search-input" class="sr-only">Search Neil's City</label>
    <input 
      type="search" 
      id="search-input"
      name="q"
      placeholder="Search content..."
      autocomplete="off"
      aria-describedby="search-hint"
    >
    <span id="search-hint" class="sr-only">
      Press Enter to search, or use arrow keys to navigate suggestions
    </span>
    <button type="submit" aria-label="Submit search">
      <span aria-hidden="true">🔍</span>
    </button>
  </form>
  
  <!-- Search results -->
  <div 
    id="search-results" 
    role="listbox" 
    aria-label="Search suggestions"
    aria-live="polite"
  >
    <!-- Results populated dynamically -->
  </div>
</search>
```

### Train Station Menu

```html
<div class="train-controls">
  <button 
    id="train-button"
    aria-haspopup="listbox"
    aria-expanded="false"
    aria-controls="train-menu"
  >
    <span aria-hidden="true">🚂</span>
    Travel to...
  </button>
  
  <ul 
    id="train-menu" 
    role="listbox" 
    aria-labelledby="train-button"
    hidden
  >
    <li role="option" aria-selected="false">
      <a href="/central-station">Central Station</a>
    </li>
    <li role="option" aria-selected="true" aria-current="location">
      <a href="/ai">AI District (current)</a>
    </li>
    <li role="option" aria-selected="false">
      <a href="/architecture">Architecture District</a>
    </li>
    <!-- More options -->
  </ul>
</div>
```

### Floor Navigation

```html
<nav aria-label="Floor navigation">
  <button 
    aria-label="Previous floor: Introduction"
    aria-keyshortcuts="ArrowLeft"
  >
    ← Previous
  </button>
  
  <span aria-current="page">Prompt Engineering (2 of 4)</span>
  
  <button 
    aria-label="Next floor: Chain of Thought"
    aria-keyshortcuts="ArrowRight"
  >
    Next →
  </button>
</nav>
```

---

## Error Handling

### Accessible Error Messages

```html
<!-- Form validation error -->
<div role="alert" aria-live="assertive">
  <p>Please correct the following errors:</p>
  <ul>
    <li><a href="#email">Email address is required</a></li>
  </ul>
</div>

<!-- Page-level error -->
<main role="main" aria-label="Error page">
  <h1>Content Not Found</h1>
  <p>The floor you're looking for doesn't exist in the city.</p>
  <nav aria-label="Recovery options">
    <ul>
      <li><a href="/ai/workflows">Return to AI Workflows building</a></li>
      <li><a href="/">Go to City overview</a></li>
      <li><a href="/search">Search for content</a></li>
    </ul>
  </nav>
</main>

<!-- Network error -->
<div role="alert" aria-live="assertive" class="error-banner">
  <p>
    <strong>Connection lost.</strong> 
    We're having trouble loading this content.
    <button onclick="retryLoad()">Try again</button>
  </p>
</div>
```

---

## Testing Checklist

### Automated Testing

- [ ] Run axe-core on all page templates
- [ ] Run Lighthouse accessibility audit
- [ ] Validate HTML (W3C validator)
- [ ] Check color contrast (automated tools)
- [ ] Run pa11y on all routes

### Manual Testing

#### Screen Reader Testing
- [ ] Test with VoiceOver (macOS/iOS)
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Verify all content is announced
- [ ] Verify navigation is logical
- [ ] Verify dynamic updates are announced
- [ ] Test search with screen reader

#### Keyboard Testing
- [ ] Tab through all pages
- [ ] Verify focus is always visible
- [ ] Verify all actions work with keyboard
- [ ] Test all keyboard shortcuts
- [ ] Verify no keyboard traps
- [ ] Test skip links
- [ ] Test modals (focus trap, escape)

#### Visual Testing
- [ ] Test at 200% zoom
- [ ] Test in high contrast mode
- [ ] Test with reduced motion enabled
- [ ] Test with browser dark mode
- [ ] Verify color is not sole indicator

### User Testing

- [ ] Test with screen reader users
- [ ] Test with keyboard-only users
- [ ] Test with users with motor impairments
- [ ] Test with users with cognitive disabilities
- [ ] Gather feedback and iterate

---

## Implementation Priority

### Phase 1: Foundation (Must Have)

1. **Semantic HTML structure** for all views
2. **Skip links** to main content
3. **Keyboard navigation** for all interactions
4. **Focus management** on navigation
5. **Alt text** for all meaningful images
6. **Proper heading hierarchy**
7. **ARIA labels** for interactive elements
8. **Error announcements** for dynamic changes

### Phase 2: Enhanced (Should Have)

1. **Screen reader announcements** for train/transitions
2. **Reduced motion support**
3. **High contrast mode** support
4. **Keyboard shortcuts** (full set)
5. **Search accessibility**
6. **Focus restoration** on back navigation

### Phase 3: Polish (Nice to Have)

1. **Voice control** optimization
2. **Custom motion preferences**
3. **Reading progress** announcements
4. **Accessibility preferences** panel
5. **Audio descriptions** for visual elements

---

## Resources

### Standards
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [HTML Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Tools
- [axe DevTools](https://www.deque.com/axe/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [pa11y](https://pa11y.org/)
- [WAVE](https://wave.webaim.org/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Testing
- [VoiceOver Guide](https://www.apple.com/voiceover/info/guide/)
- [NVDA](https://www.nvaccess.org/)
- [Screen Reader Testing Methodology](https://www.powermapper.com/tests/screen-readers/)

---

## Integration Notes

### For Frontend Developer
- Use semantic HTML as foundation
- Implement focus management in router
- Add ARIA attributes during component development
- Test with keyboard during development

### For Interaction Designer
- Ensure all animations have reduced motion alternatives
- Design visible focus states
- Consider screen reader user flows

### For Content Creator
- Write descriptive alt text
- Use proper heading hierarchy
- Write meaningful link text
- Avoid relying on color alone

### For QA Specialist
- Include accessibility in test plans
- Test with multiple screen readers
- Test keyboard navigation flows
- Validate WCAG compliance
