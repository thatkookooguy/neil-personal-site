# Mobile Strategy: Neil's City Site

**Date Created**: December 26, 2025  
**Last Updated**: December 26, 2025  
**Purpose**: Define how each view adapts to mobile, touch interactions, and small-screen navigation priorities

---

## Mobile-First Philosophy

Neil's City Site must be **fully functional on mobile**—not a degraded experience. The city metaphor should enhance mobile rather than fight against it.

### Core Principles

1. **Content is primary**: Beautiful visuals serve the content, not the reverse
2. **Touch-optimized**: Every interaction designed for fingers, not mouse pointers
3. **Progressive enhancement**: Base experience is mobile, desktop adds enhancements
4. **Performance first**: Mobile users often have slower connections

### Breakpoint Strategy

```
Mobile:     320px - 767px   (phone portrait, phone landscape)
Tablet:     768px - 1023px  (tablet portrait)
Desktop:    1024px+         (tablet landscape, desktop)
```

---

## View Adaptations

### 1. City View (Mobile)

#### Desktop Experience
Full isometric city with all 6 districts visible, train tracks, animated train, hover states on buildings.

#### Mobile Adaptation

```
┌────────────────────────────────┐
│  ☰  Neil's City        🔍     │ ← Header
├────────────────────────────────┤
│                                │
│   ┌────────────────────────┐   │
│   │                        │   │
│   │    [Simplified City    │   │ ← Hero visual
│   │     Isometric View]    │   │    (static or subtle animation)
│   │                        │   │
│   └────────────────────────┘   │
│                                │
│  Welcome to Neil's City        │ ← Intro text
│  A portfolio of work across    │
│  6 domains...                  │
│                                │
├────────────────────────────────┤
│                                │
│  🏛️ Central Station           │ ← District cards
│  Start here · 3 topics         │    (scrollable list)
│                                │
│  🤖 AI District                │
│  Workflows & Agents · 7 topics │
│                                │
│  🏗️ Architecture District      │
│  System Design · 7 topics      │
│                                │
│  [... more districts ...]      │
│                                │
└────────────────────────────────┘
```

#### Key Mobile Decisions

| Element | Desktop | Mobile |
|---------|---------|--------|
| City visual | Large, interactive | Smaller, decorative |
| District access | Click buildings | Tap district cards |
| Train | Animated, interactive | Static or hidden |
| Hover states | Show district info | N/A (use card details) |
| Navigation | Spatial | List-based |

#### Mobile-Specific Features
- **Swipe horizontal** on hero to rotate city view (optional delight)
- **District cards** show name, icon, topic count
- **Pull to refresh** returns to clean state
- **Sticky header** with search access

---

### 2. District View (Mobile)

#### Desktop Experience
Zoomed isometric view showing 2 buildings, train station visible, can click buildings directly.

#### Mobile Adaptation

```
┌────────────────────────────────┐
│  ←  AI District         🔍    │ ← Back to city + search
├────────────────────────────────┤
│                                │
│   ┌────────────────────────┐   │
│   │                        │   │
│   │   [District Visual]    │   │ ← Smaller visual
│   │    2 buildings shown   │   │    (optional, can hide)
│   │                        │   │
│   └────────────────────────┘   │
│                                │
│  AI District                   │ ← District intro
│  Exploring AI workflows and    │
│  agent architectures           │
│                                │
├────────────────────────────────┤
│                                │
│  ┌────────────────────────┐   │
│  │ 🏢 AI Workflows        │   │ ← Building cards
│  │ 4 floors               │   │
│  │ Prompt engineering,    │   │
│  │ chain of thought...    │   │
│  └────────────────────────┘   │
│                                │
│  ┌────────────────────────┐   │
│  │ 🏢 AI Agents           │   │
│  │ 3 floors               │   │
│  │ Agent patterns,        │   │
│  │ tool calling...        │   │
│  └────────────────────────┘   │
│                                │
├────────────────────────────────┤
│  🚂 Travel to...              │ ← Train navigation
│  Architecture → DX → Infra    │    (horizontal scroll)
└────────────────────────────────┘
```

#### Key Mobile Decisions

| Element | Desktop | Mobile |
|---------|---------|--------|
| Buildings | Isometric, clickable | Card list |
| District visual | Large | Small or hidden (can toggle) |
| Train station | Click station | Bottom bar / horizontal scroll |
| Building preview | Hover | Card shows floor count + preview |

#### Mobile-Specific Features
- **Building cards** expand inline or navigate directly
- **Train bar** at bottom for quick district switching
- **Swipe left/right** on train bar for adjacent districts

---

### 3. Building View - Cutaway (Mobile)

#### Desktop Experience
Side-view skyscraper with all floors visible, scrollable, floors can be clicked.

#### Mobile Adaptation Option A: Vertical Scroll

```
┌────────────────────────────────┐
│  ←  AI Workflows        🔍    │
├────────────────────────────────┤
│  AI District > Workflows       │ ← Breadcrumb (truncated)
├────────────────────────────────┤
│                                │
│  ┌────────────────────────┐   │
│  │ Floor 4                │   │ ← Floor as card
│  │ Tool Calling           │   │
│  │ How to give LLMs the   │   │
│  │ ability to use tools   │   │
│  └────────────────────────┘   │
│                                │
│  ┌────────────────────────┐   │
│  │ Floor 3                │   │
│  │ Context Windows        │   │
│  │ Managing context in    │   │
│  │ long conversations     │   │
│  └────────────────────────┘   │
│                                │
│  ┌────────────────────────┐   │
│  │ Floor 2                │   │
│  │ Chain of Thought       │   │
│  │ Breaking down complex  │   │
│  │ reasoning...           │   │
│  └────────────────────────┘   │
│                                │
│  ┌────────────────────────────┐
│  │ Floor 1 (Ground Floor)  │  │
│  │ Prompt Engineering      │  │
│  │ The art of crafting...  │  │
│  └────────────────────────────┘
│                                │
└────────────────────────────────┘
```

#### Mobile Adaptation Option B: Building Cutaway Visual

```
┌────────────────────────────────┐
│  ←  AI Workflows        🔍    │
├────────────────────────────────┤
│                                │
│   ┌────────────────────────┐   │
│   │     ┌──────────────┐   │   │ ← Visual cutaway
│   │     │   Floor 4    │   │   │    (simplified)
│   │     ├──────────────┤   │   │
│   │     │   Floor 3    │◄──│   │ ← Current floor
│   │     ├──────────────┤   │   │    highlighted
│   │     │   Floor 2    │   │   │
│   │     ├──────────────┤   │   │
│   │     │   Floor 1    │   │   │
│   │     └──────────────┘   │   │
│   └────────────────────────┘   │
│                                │
├────────────────────────────────┤
│  Context Windows               │ ← Selected floor
│  Managing context in long      │    content preview
│  conversations with LLMs       │
│                                │
│  [ Read Full Content →]        │
│                                │
└────────────────────────────────┘
```

#### Recommendation: Hybrid Approach
- Show simplified building cutaway visual (Option B)
- Allow direct floor tap on visual
- Below visual, show floor list (Option A) for accessibility
- Visual can be collapsed/hidden by user preference

---

### 4. Floor View - Content (Mobile)

#### Desktop Experience
Full content view with sidebar navigation, related links, rich media.

#### Mobile Adaptation

```
┌────────────────────────────────┐
│  ←  ▲ ▼              🔗  ≡   │ ← Minimal header
├────────────────────────────────┤ ← Back, prev/next floor
│                                │    share, menu
│  Context Windows               │
│  ━━━━━━━━━━━━━━━━━━━━         │
│                                │
│  Managing context in long      │ ← Full content
│  conversations with LLMs       │    (article format)
│  requires understanding...     │
│                                │
│  ## The Problem                │
│                                │
│  When conversations grow       │
│  beyond the context window...  │
│                                │
│  ┌────────────────────────┐   │
│  │                        │   │
│  │     [Code Example]     │   │ ← Code blocks
│  │                        │   │    (horizontal scroll)
│  └────────────────────────┘   │
│                                │
│  ## Solutions                  │
│                                │
│  [Content continues...]        │
│                                │
├────────────────────────────────┤
│                                │
│  Related Floors                │ ← Related content
│  ┌─────────┐ ┌─────────┐      │
│  │ Prompt  │ │ Tool    │      │
│  │ Eng.    │ │ Calling │      │
│  └─────────┘ └─────────┘      │
│                                │
├────────────────────────────────┤
│  ← Chain of Thought  | Tool →  │ ← Prev/Next footer nav
└────────────────────────────────┘
```

#### Key Mobile Decisions

| Element | Desktop | Mobile |
|---------|---------|--------|
| Sidebar nav | Always visible | Hidden in header menu |
| Breadcrumb | Full path | Collapsed, back arrow |
| Code blocks | Full width | Horizontal scroll |
| Images | Full size | Responsive, tap to expand |
| Related content | Sidebar | Bottom cards |
| Floor nav | Sidebar | Header arrows + footer |

#### Mobile-Specific Features
- **Swipe left/right** for prev/next floor (optional gesture)
- **Tap code block** to expand full screen
- **Sticky reading progress** indicator (optional)
- **Share button** easily accessible

---

## Touch Gestures

### Gesture Reference

| Gesture | Action | Context |
|---------|--------|---------|
| **Tap** | Primary interaction | Select district, building, floor |
| **Long press** | Show preview/context | Building → show floor list |
| **Swipe left/right** | Navigate prev/next | Between floors in reading mode |
| **Swipe left/right** | Switch districts | On train navigation bar |
| **Swipe down** | Close overlay/modal | Floor content from building |
| **Pull down** | Refresh | Any view |
| **Pinch** | Zoom in/out | City view visual (optional) |
| **Swipe up** | Scroll content | Standard scroll behavior |

### Gesture Implementation Guidelines

1. **Gestures are shortcuts, not requirements**: All gestures must have tap alternatives
2. **Clear feedback**: Visual feedback for gesture recognition
3. **Edge avoidance**: Don't use edge swipes (conflicts with browser/OS)
4. **Swipe thresholds**: Require sufficient velocity/distance to trigger
5. **Cancel ability**: Gestures can be cancelled mid-motion

### Gesture Conflicts to Avoid

| Conflict | Issue | Solution |
|----------|-------|----------|
| Horizontal scroll vs swipe nav | Code blocks need horizontal scroll | Disable swipe nav on code blocks |
| Pull refresh vs scroll up | Can trigger unintentionally | Require overscroll to trigger |
| Swipe back (iOS) vs swipe nav | iOS edge swipe for back | Don't use left edge swipe |

---

## Simplified Navigation (Small Screens)

### Mobile Header

```
┌────────────────────────────────────────────────────┐
│  [←]  [Page Title...]                    [🔍] [≡]  │
└────────────────────────────────────────────────────┘
     ↑         ↑                            ↑    ↑
   Back    Truncated title              Search  Menu
```

### Mobile Menu (Hamburger)

```
┌────────────────────────────────┐
│  ≡ Menu                    ✕   │
├────────────────────────────────┤
│                                │
│  🏛️ Central Station           │
│  🤖 AI District              ← │ ← Current (highlighted)
│  🏗️ Architecture District     │
│  💻 DX District                │
│  🔧 Infrastructure District    │
│  📦 Open Source District       │
│                                │
├────────────────────────────────┤
│  🔍 Search                     │
│  📄 About Neil                 │
│  📧 Contact                    │
│                                │
└────────────────────────────────┘
```

### Bottom Navigation Option

For frequent navigation, consider bottom nav bar:

```
┌────────────────────────────────────────────────────┐
│  🏠      🚂      🔍      📑      ≡                │
│ City   Train  Search  Index   Menu                │
└────────────────────────────────────────────────────┘
```

**Recommendation**: Use bottom nav only if analytics show high district-switching on mobile. Otherwise, keep header simple.

### Breadcrumb Behavior (Mobile)

| Depth | Desktop | Mobile |
|-------|---------|--------|
| City | Home | [hidden] |
| District | City > District | ← District |
| Building | City > District > Building | ← Building |
| Floor | City > District > Building > Floor | ← Back + Floor title |

Mobile uses back arrow + current title instead of full breadcrumb.

---

## Priority Content (Mobile)

### What to Prioritize

| Priority | Element | Rationale |
|----------|---------|-----------|
| **P0** | Floor content | Primary value proposition |
| **P0** | Navigation (back, search) | Users must never feel trapped |
| **P0** | Floor titles/summaries | Content discovery |
| **P1** | District list | Primary navigation |
| **P1** | Building previews | Understand content structure |
| **P1** | Related content | Encourage exploration |
| **P2** | City visual | Delightful but not essential |
| **P2** | Train animation | Fun but non-blocking |
| **P3** | Fancy transitions | Nice-to-have, cut on low-end |

### What to Hide/Simplify on Mobile

| Element | Desktop | Mobile |
|---------|---------|--------|
| City visual | Hero, interactive | Smaller, decorative |
| Train animation | Full animation | Static or subtle |
| Sidebar navigation | Always visible | In menu |
| Full breadcrumb | Always visible | Collapsed |
| Building cutaway | Large, detailed | Simplified or card list |
| Hover previews | Show on hover | Show inline/on tap |
| Keyboard shortcuts | Prominent | Hidden (not useful) |

---

## Performance Considerations

### Mobile Performance Budget

| Metric | Target | Rationale |
|--------|--------|-----------|
| First Contentful Paint | < 1.5s | User sees content fast |
| Largest Contentful Paint | < 2.5s | Main content visible |
| Time to Interactive | < 3.5s | Can interact quickly |
| Total Bundle Size | < 200KB | Fast on 3G |
| Image per view | < 100KB | After lazy loading |

### Mobile Optimization Strategies

1. **Lazy load city visual**: Don't block content for fancy graphics
2. **Lazy load building visuals**: Load when district entered
3. **Preload next floor**: Anticipate swipe/tap
4. **Static fallback for animations**: Reduced motion or low-end devices
5. **Service worker caching**: Instant loads on return visit
6. **Image optimization**: WebP, responsive sizes, lazy loading

### Network-Aware Loading

```javascript
// Pseudocode
if (navigator.connection.effectiveType === '2g' || 
    navigator.connection.saveData) {
  // Skip fancy visuals
  showSimplifiedView();
} else {
  // Full experience
  showFullExperience();
}
```

---

## Mobile-Specific Interactions

### Pull to Refresh
- **City View**: Returns to clean state
- **District View**: Refreshes buildings (if dynamic)
- **Floor View**: Reloads content

### Tap Targets
- Minimum touch target: **44x44 points**
- Spacing between targets: **8px minimum**
- Cards should be fully tappable (not just title)

### Scroll Behavior
- **Smooth scrolling**: Native momentum
- **Overscroll effects**: Rubber-band (native)
- **Scroll anchoring**: Maintain position on dynamic content
- **Scroll-linked animations**: Minimal, performance-conscious

### Orientation Changes
- **Portrait**: Primary design target
- **Landscape**: Content reflows gracefully
- **City View landscape**: Can show more of city
- **Floor View landscape**: Better for code examples

---

## Tablet Considerations

### Tablet Portrait (768-1023px)
- Hybrid between mobile and desktop
- City visual: Medium size, somewhat interactive
- Building cards: 2-column grid
- Floor content: More breathing room
- Sidebar: Consider split view

### Tablet Landscape (1024px+)
- Treat as desktop experience
- Full interactive city
- Building cutaway visible
- Sidebar navigation possible

---

## Mobile Testing Checklist

### Functionality
- [ ] All content accessible without hover
- [ ] All navigation works with tap only
- [ ] Deep links load correctly on mobile
- [ ] Search works and is accessible
- [ ] Code blocks scroll horizontally
- [ ] Images are responsive and load
- [ ] Forms (if any) work on mobile keyboards

### Touch
- [ ] Touch targets are 44x44pt minimum
- [ ] Gestures have tap alternatives
- [ ] No gesture conflicts with browser
- [ ] Swipe navigation feels natural
- [ ] Pull to refresh works appropriately

### Performance
- [ ] Page loads in < 3s on 3G
- [ ] No layout shift during load
- [ ] Images lazy load correctly
- [ ] Animations don't cause jank
- [ ] Memory usage is reasonable

### Orientation
- [ ] Portrait is fully functional
- [ ] Landscape doesn't break layout
- [ ] Rotation preserves scroll position

### Accessibility
- [ ] Zoom works up to 200%
- [ ] Text is readable without zoom
- [ ] Focus indicators visible
- [ ] Screen reader navigable

---

## Implementation Recommendations

### High Priority
1. **Mobile-first CSS**: Start from mobile, enhance up
2. **Touch-optimized floor cards**: Large, easy to tap
3. **Simplified city visual**: Don't block content
4. **Working search on mobile**: Easy access, good results
5. **Prev/next floor navigation**: Swipe or buttons

### Medium Priority
1. **Bottom train bar**: Quick district switching
2. **Long-press previews**: Show floor content without navigating
3. **Offline support**: Service worker for return visits
4. **Image lazy loading**: Performance optimization

### Low Priority
1. **Gesture tutorials**: Only if analytics show confusion
2. **Pinch-zoom city**: Fun but not essential
3. **Haptic feedback**: iOS only, subtle enhancement
4. **AR view**: Future enhancement (city in your space)

---

## Summary: Mobile View Matrix

| View | Visual | Navigation | Content Focus |
|------|--------|------------|---------------|
| City | Small decorative | District cards | Welcome + 6 districts |
| District | Optional | Building cards + Train bar | 2 buildings |
| Building | Simplified cutaway or cards | Floor list | 4-8 floors |
| Floor | None (content only) | Header + footer nav | Full article |

The mobile experience is **complete and usable**, just visually simpler than desktop. Content remains the star.

---

## Mobile User Journey Considerations

### Mobile-Specific Journey Differences

| Stage | Desktop Behavior | Mobile Adaptation | Rationale |
|-------|------------------|-------------------|-----------|
| **Arrival** | Full city visual, hover districts | Smaller visual + district cards | Touch-first, vertical scroll |
| **Orientation** | Spatial exploration | Linear list browsing | Easier thumb navigation |
| **Exploration** | Click buildings in isometric view | Tap building cards | Clear tap targets |
| **Consumption** | Content with sidebar nav | Full-width content, bottom nav | Maximize reading space |
| **Discovery** | Sidebar related content | Related cards below content | Vertical flow |
| **Navigation** | Breadcrumb trail | Back arrow + title | Space efficiency |

### Mobile Entry Point Behavior

| Entry Point | Desktop | Mobile | Notes |
|-------------|---------|--------|-------|
| Home `/` | City visual prominent | District cards prominent | Visual secondary on mobile |
| Deep link `/ai/workflows/prompt` | Sidebar building context | Header back nav only | Context via breadcrumb |
| Search result | Instant navigation | Same | Search UX identical |

### Mobile-Specific Metrics

| Metric | Desktop Target | Mobile Target | Difference Rationale |
|--------|---------------|---------------|---------------------|
| Bounce rate (City) | < 40% | < 45% | Mobile users more likely to quick-judge |
| Floors per session | > 2.5 | > 2.0 | Slightly harder navigation |
| Time to first floor | < 30s | < 45s | More taps required |
| Search usage | > 20% | > 30% | Search is faster than tapping |

---

## Cognitive Load: Mobile Optimizations

### Miller's Law on Mobile

Mobile screens show less at once, requiring extra attention to information density:

| View | Desktop Items | Mobile Items | Strategy |
|------|---------------|--------------|----------|
| City | 6 districts visible | 3-4 visible (scroll) | Prioritize top districts, indicate more below |
| District | 2 buildings side-by-side | 2 buildings stacked | Clear visual separation |
| Building | 4-8 floors in cutaway | 4-8 floors as list | Numbered, scrollable |
| Floor | Content + sidebar | Content only | Hide navigation until needed |

### Progressive Disclosure: Mobile

1. **City View**: Show district names only, counts on tap
2. **District View**: Show building names + floor count
3. **Building View**: Show floor titles, tap for preview
4. **Floor View**: Full content, related floors at bottom

### Touch Target Sizing

| Element | Minimum Size | Recommended | Spacing |
|---------|--------------|-------------|---------|
| District card | 44×44 pt | 64×80 pt | 8pt |
| Building card | 44×44 pt | Full width × 80pt | 8pt |
| Floor item | 44×44 pt | Full width × 60pt | 4pt |
| Navigation button | 44×44 pt | 48×48 pt | 8pt |
| Breadcrumb | N/A | Back arrow 44×44 | N/A |

---

## Mobile Flow Diagrams

### Mobile Happy Path

```
[External Link]
      │
      ▼
[City View: District Cards]
      │
      │ Tap district card
      ▼
[District View: Building Cards]
      │
      │ Tap building card
      ▼
[Building View: Floor List]
      │
      │ Tap floor
      ▼
[Floor View: Full Content]
      │
      ├── Swipe left ──→ [Next Floor]
      ├── Swipe right ──→ [Previous Floor]
      ├── Tap back ──→ [Building View]
      └── Scroll to bottom ──→ [Related Floors]
```

### Mobile Navigation State

```
┌────────────────────────────────────────────────────┐
│                 MOBILE HEADER STATE                 │
├────────────────────────────────────────────────────┤
│                                                     │
│  City View:      [☰]  Neil's City         [🔍]     │
│  District View:  [←]  AI District         [🔍]     │
│  Building View:  [←]  AI Workflows        [🔍]     │
│  Floor View:     [←]  [▲][▼]    [🔗] [≡]          │
│                                                     │
│  Legend:                                            │
│  ← = Back (context-aware)                          │
│  ▲▼ = Prev/Next floor (floor view only)           │
│  🔗 = Share                                        │
│  ≡ = Menu (districts, about, etc.)                │
│  🔍 = Search                                       │
│                                                     │
└────────────────────────────────────────────────────┘
```

---

## Mobile Accessibility Considerations

### Touch Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Touch targets 44×44 pt minimum | All interactive elements sized appropriately |
| No hover-dependent interactions | All info available via tap or visible |
| Gesture alternatives | All gestures have button alternatives |
| One-hand operation | Key actions reachable by thumb |

### Mobile Screen Reader

| VoiceOver Consideration | Implementation |
|-------------------------|----------------|
| Swipe navigation | All content reachable via swipe |
| Rotor navigation | Headings, links, and landmarks properly marked |
| Focus order | Logical top-to-bottom, important content first |
| Announcements | State changes announced (loading, navigation) |

### Mobile Reduced Motion

| Animation | Default | Reduced Motion |
|-----------|---------|----------------|
| Page transitions | Slide | Instant |
| Floor swipe | Follow finger | Instant |
| Loading indicators | Spinner | Progress bar |
| Pull to refresh | Animated | Static indicator |

---

## Mobile-Specific Edge Cases

| Edge Case | Scenario | Handling |
|-----------|----------|----------|
| Accidental swipe | User swipes while reading | Require sufficient velocity/distance |
| Orientation change mid-scroll | User rotates device | Preserve scroll position |
| Small screen (< 360px) | Very small devices | Stack all elements, larger text |
| Notch/safe areas | iPhone notch, Android cutout | Respect safe-area-inset |
| Keyboard covers content | Search input focused | Scroll input into view |
| Slow network (2G/3G) | Rural or developing regions | Show loading state immediately, skeleton UI |
| Battery saver mode | Animations may be disabled | Respect reduced motion |
| Large text/accessibility zoom | User increases text size | Layout adapts, no overflow |
