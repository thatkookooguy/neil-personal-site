# Neil's City Site — Accessibility Strategy

## Accessibility Standards

**Target:** WCAG 2.1 AA compliance

**Core principle:** The site is content-first. All visual metaphors are progressive enhancement. Every user must be able to access all content.

---

## Screen Reader Strategy

### Semantic Structure

```html
<!-- City View -->
<main aria-label="City Overview">
  <h1>Neil's City</h1>
  <nav aria-label="Districts">
    <ul>
      <li><a href="/central">Central Station – Start here</a></li>
      <li><a href="/ai">AI District – AI-first workflows</a></li>
      <!-- ... -->
    </ul>
  </nav>
</main>

<!-- District View -->
<main aria-label="DX District">
  <nav aria-label="Breadcrumb">
    <a href="/">City</a> → <span>DX District</span>
  </nav>
  <h1>DX District</h1>
  <p>Build systems developers actually enjoy using.</p>
  <nav aria-label="Buildings">
    <ul>
      <li><a href="/dx/dx-tower">DX Tower – 5 floors</a></li>
      <!-- ... -->
    </ul>
  </nav>
</main>

<!-- Building View -->
<main aria-label="DX Tower">
  <nav aria-label="Breadcrumb">
    <a href="/">City</a> → <a href="/dx">DX</a> → <span>DX Tower</span>
  </nav>
  <h1>DX Tower</h1>
  <nav aria-label="Floor navigation">
    <ol>
      <li><a href="#floor-1" aria-current="true">DX Definition</a></li>
      <li><a href="#floor-2">Workflows</a></li>
      <!-- ... -->
    </ol>
  </nav>
  <article id="floor-1">
    <h2>DX is a Design Discipline</h2>
    <!-- Content -->
  </article>
</main>
```

### ARIA Labels

| Element | ARIA | Purpose |
|---------|------|---------|
| City map | `role="navigation" aria-label="Districts"` | Announce as navigation |
| District view | `role="navigation" aria-label="Buildings"` | Announce building list |
| Floor content | `role="article"` | Semantic content region |
| Floor nav | `aria-label="Floor navigation"` | Distinguish from main nav |
| Current floor | `aria-current="true"` | Indicate active state |
| Train | `aria-hidden="true"` | Decorative, no content |

### Live Regions

```html
<!-- Announce view changes -->
<div role="status" aria-live="polite" class="sr-only">
  <!-- JS updates this on navigation -->
  Now viewing: DX District
</div>

<!-- Announce floor changes -->
<div role="status" aria-live="polite" class="sr-only">
  Floor 3 of 5: Small PRs
</div>
```

---

## Focus Management

### Focus Order

```
City View:
1. Skip link
2. Site logo/home
3. District links (in logical order)
4. Footer links

District View:
1. Skip link
2. Back to city link
3. District title
4. Building links
5. Footer links

Building View:
1. Skip link
2. Breadcrumb
3. Floor navigation
4. Current floor content
5. Next/previous floor controls
6. Footer links
```

### Focus Trap Prevention

- No focus traps in modals
- Always provide escape route
- Tab wraps to browser chrome naturally

### Focus Restoration

When navigating back:
- Restore focus to previously focused element
- If element gone, focus nearest logical element

---

## Skip Links

```html
<body>
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>
  <a href="#floor-nav" class="skip-link">
    Skip to floor navigation
  </a>
  <!-- ... -->
  <main id="main-content">
```

**CSS:**
```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  padding: 1rem;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  z-index: 9999;
}

.skip-link:focus {
  top: 0;
}
```

---

## Keyboard Navigation

### Global Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move to next focusable element |
| `Shift+Tab` | Move to previous focusable element |
| `Enter` | Activate focused element |
| `Escape` | Close modal / go up one level |
| `Home` | Go to city view |
| `?` | Show keyboard shortcut help |

### View-Specific

**City View:**
| Key | Action |
|-----|--------|
| `Arrow keys` | Move between district links |
| `Enter` | Enter focused district |

**Building View:**
| Key | Action |
|-----|--------|
| `↑` / `↓` | Previous / next floor |
| `Page Up/Down` | Previous / next floor |
| `Home` | First floor |
| `End` | Last floor |
| `1-9` | Jump to floor N |

---

## Reduced Motion

### CSS Implementation

```css
/* Define animations normally */
.animate-zoom {
  transition: transform 600ms ease-out;
}

.train {
  animation: train-move 10s linear infinite;
}

/* Disable for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### JavaScript Check

```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // Skip animations
  // Use instant transitions
  // Show static character positions
}
```

### What Changes with Reduced Motion

| Feature | Normal | Reduced Motion |
|---------|--------|----------------|
| View transitions | Animated zoom/pan | Instant cut |
| Train | Moving continuously | Static position |
| Character states | Animated transition | Instant change |
| Floor scroll | Smooth snap | Immediate |
| Parallax | Active | Disabled |
| Hover effects | Animated | Instant |

---

## Color and Contrast

### Contrast Requirements

| Element | Ratio Required | Our Ratio |
|---------|---------------|-----------|
| Normal text | 4.5:1 | 10.2:1 ✓ |
| Large text (18px+) | 3:1 | 10.2:1 ✓ |
| UI components | 3:1 | 4.6:1 ✓ |
| Focus indicators | 3:1 | 4.6:1 ✓ |

### Color Independence

- Never use color alone to convey information
- Icons + color for status
- Text labels + color for navigation
- Patterns + color for chart elements

### Focus Indicators

```css
/* High-contrast focus ring */
:focus-visible {
  outline: 3px solid var(--color-focus-ring);
  outline-offset: 2px;
}

/* Never remove focus styles */
:focus {
  outline: 2px solid var(--color-focus-ring);
}
```

---

## Content Accessibility

### Headings

```html
<!-- Proper heading hierarchy -->
<h1>DX Tower</h1>
  <h2>Floor 1: DX is a Design Discipline</h2>
    <h3>My working definition</h3>
  <h2>Floor 2: Workflows</h2>
    <h3>The review loop</h3>
```

- Never skip heading levels
- One `<h1>` per page
- Headings describe content below them

### Links

```html
<!-- Descriptive link text -->
<a href="/ai/agent-orchard">
  Agent Orchard – AI-first developer workflows
</a>

<!-- Avoid -->
<a href="/ai/agent-orchard">Click here</a>
<a href="/ai/agent-orchard">Read more</a>
```

### Images

```html
<!-- Decorative (no alt) -->
<img src="train.png" alt="" aria-hidden="true">

<!-- Informative -->
<img src="architecture-diagram.png"
     alt="System architecture showing three microservices
          connected via message queue">

<!-- Complex (link to description) -->
<figure>
  <img src="complex-diagram.png"
       alt="Detailed event flow diagram"
       aria-describedby="diagram-desc">
  <figcaption id="diagram-desc">
    Full description of the event flow...
  </figcaption>
</figure>
```

### Code Blocks

```html
<pre>
  <code class="language-javascript" tabindex="0">
    const x = 1;
  </code>
</pre>
```

- `tabindex="0"` for keyboard scrolling
- Language announced via class or aria-label
- Syntax highlighting has sufficient contrast

---

## Testing Checklist

### Automated Testing

- [ ] Run axe-core on all pages
- [ ] Lighthouse accessibility audit > 90
- [ ] Pa11y CI in pipeline
- [ ] Color contrast checker

### Manual Testing

- [ ] Keyboard-only navigation (no mouse)
- [ ] Screen reader testing (VoiceOver, NVDA)
- [ ] Zoom to 200% - content still usable
- [ ] High contrast mode
- [ ] Reduced motion enabled
- [ ] Tab order makes sense
- [ ] Focus visible at all times
- [ ] Forms have labels
- [ ] Error messages accessible

### User Testing

- [ ] Test with actual screen reader users
- [ ] Test with keyboard-only users
- [ ] Test with users with motor impairments
- [ ] Gather feedback, iterate

---

## Implementation Priority

### Phase 1 (Launch Blockers)

- [ ] Semantic HTML structure
- [ ] Skip links
- [ ] Keyboard navigation
- [ ] Focus management
- [ ] Alt text for all images
- [ ] Color contrast compliance
- [ ] Reduced motion support

### Phase 2 (Post-Launch)

- [ ] Enhanced screen reader announcements
- [ ] ARIA live regions for dynamic content
- [ ] Full keyboard shortcut system
- [ ] High contrast theme option
- [ ] Accessibility statement page

### Phase 3 (Ongoing)

- [ ] Regular automated testing
- [ ] User feedback integration
- [ ] WCAG 2.2 updates
- [ ] Accessibility training for content authors

---

## File Changed
- Created: `docs/neils-city-site-v1/accessibility.md`

