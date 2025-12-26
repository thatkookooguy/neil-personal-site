# Neil's City Site — Mobile Strategy

## Core Philosophy

**Mobile is not a degraded desktop experience.**

The city metaphor adapts to touch and small screens while preserving:
- Content accessibility
- Navigation clarity
- Visual delight (adjusted)
- Full functionality

---

## View Adaptations

### City View (Mobile)

**Desktop:** Full isometric city, all districts visible, train animation

**Mobile adaptation:**

```
┌─────────────────────────┐
│     NEIL'S CITY         │
│    [Simplified Map]     │
│                         │
│  ┌─────┐  ┌─────┐       │
│  │ AI  │  │ DX  │       │
│  └─────┘  └─────┘       │
│                         │
│  ┌─────┐  ┌─────┐       │
│  │ARCH │  │INFRA│       │
│  └─────┘  └─────┘       │
│                         │
│     [Central Station]   │
│     [Open Source]       │
│                         │
│    🚂 Train Route       │
└─────────────────────────┘
```

**Changes:**
- Simplified top-down view (not full isometric)
- Districts as tappable cards
- Train shown as route indicator, not animated
- District icons/colors prominent
- Swipe horizontally to see more districts (if needed)

**Why:**
- Isometric is hard to interact with on touch
- Reduces cognitive load
- Faster loading
- Clearer tap targets

### District View (Mobile)

**Desktop:** Focused mini-map with buildings

**Mobile adaptation:**

```
┌─────────────────────────┐
│ ← City    DX District   │
├─────────────────────────┤
│                         │
│  ╔═══════════════════╗  │
│  ║    DX Tower       ║  │
│  ║    ───────────    ║  │
│  ║    [Building      ║  │
│  ║     Illustration] ║  │
│  ║    5 floors       ║  │
│  ╚═══════════════════╝  │
│                         │
│  ╔═══════════════════╗  │
│  ║  Confidence Lab   ║  │
│  ║    ───────────    ║  │
│  ║    [Illustration] ║  │
│  ║    3 floors       ║  │
│  ╚═══════════════════╝  │
│                         │
└─────────────────────────┘
```

**Changes:**
- Buildings as vertical list/cards
- Building illustrations simplified
- Tap to enter building
- Clear back navigation

### Building View (Mobile)

**Desktop:** Side-view cutaway with floors, characters

**Mobile adaptation:**

```
┌─────────────────────────┐
│ ← DX      DX Tower      │
├─────────────────────────┤
│  Floor 1 of 5   [▼]     │
│                         │
│  ┌───────────────────┐  │
│  │                   │  │
│  │  [Neil + Leela    │  │
│  │   illustration]   │  │
│  │                   │  │
│  └───────────────────┘  │
│                         │
│  # DX is a Design       │
│    Discipline           │
│                         │
│  Developer experience   │
│  isn't "nice-to-have    │
│  polish." It's the...   │
│                         │
│  [Continue reading ↓]   │
│                         │
│─────────────────────────│
│  ● ○ ○ ○ ○  [Floor nav] │
└─────────────────────────┘
```

**Changes:**
- No cutaway visualization (too complex)
- Character illustration above content
- Floor indicator at top + bottom
- Swipe or scroll to next floor
- Floor dots as progress indicator

### Floor Navigation (Mobile)

**Options (choose based on testing):**

**Option A: Continuous Scroll**
- Floors as sections in one long page
- Sticky floor indicator updates on scroll
- Natural mobile reading pattern

**Option B: Swipe Between Floors**
- Each floor is a "card"
- Swipe left/right to change floors
- More "app-like" experience

**Recommendation:** Option A (continuous scroll) for content-heavy floors, with floor-jump menu accessible.

---

## Touch Gestures

### Gesture Reference

| Gesture | Action | View |
|---------|--------|------|
| Tap | Select item, navigate | All |
| Swipe right | Go back | All |
| Swipe down | Pull to refresh | All |
| Long press | Preview (building/floor) | City, District |
| Pinch | None (disabled) | All |
| Swipe between floors | Next/prev floor | Building |

### Gesture Conflict Prevention

- No horizontal swipe conflicts (carousel vs. back)
- Vertical scroll is always content scroll
- Edge swipe (from screen edge) = back
- Center swipe = content interaction

---

## Simplified Navigation

### Mobile Navigation Hierarchy

```
┌─────────────────────────┐
│ [≡]  Page Title   [🔍]  │  ← Sticky header
├─────────────────────────┤
│                         │
│      Content Area       │
│                         │
└─────────────────────────┘
│ Home | District | Floor │  ← Optional bottom nav
└─────────────────────────┘
```

### Mobile Menu (Hamburger)

```
┌─────────────────────────┐
│ ✕                       │
├─────────────────────────┤
│ 🏠 City Overview        │
│                         │
│ Districts               │
│ ├─ Central Station      │
│ ├─ AI District          │
│ ├─ Architecture         │
│ ├─ DX District          │
│ ├─ Infrastructure       │
│ └─ Open Source          │
│                         │
│ ───────────────────     │
│ 🔊 Sound: Off           │
│ 🌙 Dark Mode: Auto      │
│ ⌨️ Keyboard Shortcuts   │
└─────────────────────────┘
```

### Breadcrumb (Mobile)

Instead of full breadcrumb, show:
- Current location as page title
- Back button labeled with parent
- Example: `← DX District` when in a building

---

## Mobile Performance Budget

| Metric | Target | Max |
|--------|--------|-----|
| First Contentful Paint | < 1.5s | 2s |
| Largest Contentful Paint | < 2.5s | 3s |
| Time to Interactive | < 3s | 4s |
| Total Page Weight | < 500KB | 750KB |
| JavaScript | < 150KB | 200KB |

### Performance Strategies

**Asset optimization:**
- WebP images with JPEG fallback
- Responsive images (srcset)
- SVG for icons
- Lazy load below-fold images

**Code optimization:**
- Route-based code splitting
- Defer non-critical JS
- Critical CSS inline
- Service worker for repeat visits

---

## Mobile-Specific Considerations

### Content Prioritization

**Show on mobile:**
- All text content (unchanged)
- Key illustrations
- Floor navigation
- Character (simplified or static)

**Reduce on mobile:**
- Complex animations
- Parallax effects
- Train animation (show route instead)
- Full isometric city (simplified view)

**Hide on mobile:**
- Decorative-only elements
- Desktop-specific visualizations
- Hover states (convert to tap)

### Touch Target Sizes

- Minimum: 44×44 pixels
- Comfortable: 48×48 pixels
- Spacing between targets: ≥ 8px

### Thumb Zones

```
┌─────────────────────────┐
│      Hard to reach      │
│                         │
│   ┌─────────────────┐   │
│   │                 │   │
│   │  Natural reach  │   │
│   │                 │   │
│   └─────────────────┘   │
│                         │
│      Easy reach         │
└─────────────────────────┘
```

**Primary actions (navigation, floor change):** Bottom of screen
**Secondary actions (menu, search):** Top, but accessible via gesture

---

## Responsive Breakpoints

```css
/* Mobile first */
:root {
  --breakpoint-sm: 640px;   /* Large phones */
  --breakpoint-md: 768px;   /* Tablets */
  --breakpoint-lg: 1024px;  /* Small laptops */
  --breakpoint-xl: 1280px;  /* Desktops */
}

/* Mobile: 0 - 639px */
/* Tablet: 640px - 1023px */
/* Desktop: 1024px+ */
```

### Layout Shifts by Breakpoint

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| City view | Card grid | Simplified iso | Full isometric |
| District view | List | Grid | Mini-map |
| Building view | Scroll + indicator | Scroll + mini-cutaway | Full cutaway |
| Character | Static or hidden | Simplified | Animated |
| Train | Route indicator | Animated (simple) | Full animation |

---

## Offline Support

### Service Worker Strategy

**Cache first:**
- Static assets (CSS, JS, fonts)
- Building illustrations
- Previously visited floors

**Network first:**
- Floor content (MDX)
- Dynamic data

### Offline Experience

When offline:
- Show cached content
- Clear offline indicator
- Prevent navigation to uncached content
- Queue any interactions for sync

---

## Mobile Accessibility

### Touch Accessibility

- Large tap targets
- No gesture-only actions (always have tap alternative)
- Haptic feedback on key actions
- Clear focus indicators for keyboard users (external keyboard)

### Screen Reader (Mobile)

- VoiceOver (iOS) and TalkBack (Android) tested
- Semantic headings
- ARIA labels on custom components
- Announce view changes

### Reduced Motion

Respect `prefers-reduced-motion`:
- Disable all animations
- Instant view transitions
- Static character positions

---

## File Changed
- Created: `docs/neils-city-site-v1/mobile-strategy.md`

