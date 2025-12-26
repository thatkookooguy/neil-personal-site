# Navigation Patterns: Neil's City Site

**Date Created**: December 26, 2025  
**Last Updated**: December 26, 2025  
**Purpose**: Define URL structure, navigation patterns, and interaction models for the futuristic isometric city portfolio

---

## Navigation Overview

Neil's City Site uses a **spatial metaphor** where navigation follows the physical logic of exploring a city. Users move from macro (city view) to micro (floor content) through intuitive zoom-and-explore patterns.

### Core Principle: Navigation Should Feel Like Exploration

- Moving "into" content = zooming in (city → district → building → floor)
- Moving "out" = zooming out (floor → building → district → city)
- Moving "across" = horizontal navigation (district ↔ district, floor ↔ floor)
- The **train** connects districts horizontally, reinforcing the city metaphor

---

## URL Structure

### Recommended URL Schema

```
/                                    # City view (home)
/[district]                          # District view
/[district]/[building]               # Building cutaway view
/[district]/[building]/[floor]       # Floor content (scrolled into view)
/[district]/[building]#[floor-id]    # Alternative: anchor-based floor navigation
```

### URL Examples

```
/                                    # City overview
/ai                                  # AI District
/ai/workflows                        # AI Workflows building
/ai/workflows/prompt-engineering     # Prompt Engineering floor
/ai/agents                           # AI Agents building
/architecture                        # Architecture District
/architecture/system-design          # System Design building
/architecture/system-design/patterns # Design Patterns floor
```

### URL Design Rationale

| Decision | Rationale |
|----------|-----------|
| Lowercase, hyphenated slugs | Clean, readable, SEO-friendly |
| Hierarchical paths | Reflects spatial hierarchy, supports breadcrumbs |
| No `/district/` prefix | Keeps URLs short; districts are top-level |
| Floor as path segment (not anchor) | Enables floor-specific metadata, sharing, analytics |
| 3-level max depth | Balances specificity with cognitive load |

### Reserved Routes

```
/about           # About Neil (could be Central Station content)
/search          # Search results page
/sitemap         # Full content sitemap (accessibility fallback)
/api/*           # API routes (if needed)
```

---

## View Hierarchy & Transitions

### The Four Views

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CITY VIEW                                    │
│  Bird's-eye isometric view showing all 6 districts                  │
│  Entry point • Mental map • "Where am I in Neil's world?"           │
└────────────────────────────┬────────────────────────────────────────┘
                             │ Click district / Train arrives
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       DISTRICT VIEW                                  │
│  Zoomed isometric view of single district with 2 buildings          │
│  Shows building names • Train station visible                       │
└────────────────────────────┬────────────────────────────────────────┘
                             │ Click building
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      BUILDING VIEW (Cutaway)                         │
│  Side-view skyscraper showing all floors                            │
│  Scrollable • Shows floor previews/titles                           │
└────────────────────────────┬────────────────────────────────────────┘
                             │ Click floor / Scroll to floor
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        FLOOR VIEW                                    │
│  Full content view for that floor                                   │
│  Reading mode • Text, images, demos                                 │
└─────────────────────────────────────────────────────────────────────┘
```

### Transition Triggers

| From | To | Trigger | URL Change |
|------|-----|---------|------------|
| City | District | Click district, Train animation completes | `/` → `/[district]` |
| District | City | Click "city" in breadcrumb, Zoom out gesture, Back button | `/[district]` → `/` |
| District | District | Click Train destination, District picker | `/[district-a]` → `/[district-b]` |
| District | Building | Click building | `/[district]` → `/[district]/[building]` |
| Building | District | Breadcrumb, Close button, Back button | `/[district]/[building]` → `/[district]` |
| Building | Floor | Click floor, Scroll to floor | `/[district]/[building]` → `/[district]/[building]/[floor]` |
| Floor | Floor | Next/Prev navigation, Scroll | URL updates to new floor |
| Floor | Building | Breadcrumb, "All Floors" link | `/[district]/[building]/[floor]` → `/[district]/[building]` |

---

## Train Interaction Model

### Train as Navigation Element

The train is a **visual navigation aid**, not a content container. It:

1. **Appears in City View**: Shows route connecting all districts
2. **Animates between districts**: Visual continuity when changing districts
3. **Has stations**: Each district has a train station (entry point)
4. **Provides wayfinding**: Always visible in district view showing connections

### Train Interactions

```
┌─────────────────────────────────────────────────────────────────────┐
│                    TRAIN INTERACTION STATES                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  IDLE (City View)                                                   │
│  ├─ Train visible on tracks                                         │
│  ├─ Hover station → Highlight station, show district name           │
│  └─ Click station → Train animates to station, zoom to district     │
│                                                                      │
│  MOVING (Transition)                                                │
│  ├─ Train animates along tracks                                     │
│  ├─ Camera follows/anticipates destination                          │
│  └─ Arrival triggers district view load                             │
│                                                                      │
│  STATIONED (District View)                                          │
│  ├─ Train visible at district station                               │
│  ├─ Other stations visible as "connections"                         │
│  └─ Click different station → Train departs, travels, arrives       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Train Route

```
Central Station ──── AI ──── Architecture ──── DX ──── Infrastructure ──── Open Source
      │                                                                          │
      └──────────────────────────── Loop Back ───────────────────────────────────┘
```

The train follows a circular route, allowing travel in either direction (shortest path).

### Train UX Guidelines

| Principle | Implementation |
|-----------|----------------|
| Train is optional | Users can navigate without using train (click districts directly) |
| Train adds delight | Animation shows journey, reinforces city metaphor |
| Train is not blocking | Navigation should not wait for full animation |
| Train is skippable | Quick click/tap can skip animation and go directly |

---

## Keyboard Navigation

### Global Shortcuts

| Key | Action | Context |
|-----|--------|---------|
| `/` or `Cmd+K` | Open search/command palette | Global |
| `Esc` | Close modal, zoom out one level | Global |
| `?` | Show keyboard shortcuts help | Global |
| `Tab` | Move focus to next interactive element | Global |
| `Shift+Tab` | Move focus to previous element | Global |

### View-Specific Shortcuts

#### City View
| Key | Action |
|-----|--------|
| `1-6` | Jump to district (numbered) |
| `Arrow keys` | Move focus between districts |
| `Enter` | Enter focused district |
| `t` | Focus train controls |

#### District View
| Key | Action |
|-----|--------|
| `←` / `→` | Previous/Next district |
| `↑` / `↓` | Focus buildings |
| `Enter` | Enter focused building |
| `Backspace` | Return to city view |
| `t` | Open train station menu |

#### Building View
| Key | Action |
|-----|--------|
| `↑` / `↓` | Previous/Next floor |
| `Home` | First floor |
| `End` | Last floor |
| `Enter` | Open focused floor |
| `Backspace` | Return to district view |
| `j` / `k` | Vim-style down/up navigation |

#### Floor View (Reading Mode)
| Key | Action |
|-----|--------|
| `←` / `→` or `j` / `k` | Previous/Next floor |
| `Backspace` | Return to building view |
| `Space` | Scroll down |
| `Shift+Space` | Scroll up |

### Focus Management

```
Focus Order (Tab sequence):
1. Skip link (to main content)
2. Primary navigation (breadcrumb)
3. Train controls (if visible)
4. Main content area
5. Secondary navigation (floor list, district picker)
6. Footer
```

---

## Browser Back/Forward Behavior

### History State Management

Each navigation action pushes a history entry:

```javascript
// Pseudocode for history management
navigateTo('/ai/workflows') {
  history.pushState({ view: 'building', district: 'ai', building: 'workflows' }, '', '/ai/workflows');
}
```

### Expected Back Button Behavior

| Current View | Back Button Result |
|--------------|-------------------|
| Floor | → Building (same building, no floor selected) |
| Building | → District |
| District | → City OR previous district (if navigated via train) |
| City | → Browser previous page (external) |

### Forward Button

Restores previous forward state with appropriate view and scroll position.

### State Preservation

When navigating back:
- **Scroll position**: Restore scroll position in building view
- **Selected floor**: Highlight previously viewed floor
- **Train position**: Show train at appropriate station
- **Animation state**: Skip animation, show final state

---

## Deep Linking Requirements

### Every URL Must Be Shareable

| URL | Expected Behavior |
|-----|-------------------|
| `/` | Load city view, train at Central Station |
| `/ai` | Load AI District view, buildings visible |
| `/ai/workflows` | Load Workflows building cutaway, all floors visible |
| `/ai/workflows/prompt-engineering` | Load building cutaway, scroll to Prompt Engineering floor, expand content |

### Deep Link Loading States

```
User lands on: /ai/workflows/prompt-engineering

Loading sequence:
1. Show skeleton of building view (immediate)
2. Load building structure (floors list)
3. Scroll to target floor
4. Load floor content
5. Update page title: "Prompt Engineering | AI Workflows | Neil's City"
```

### Social Sharing Metadata

Each floor URL should have:
- `og:title`: Floor name | Building | District
- `og:description`: Floor summary/excerpt
- `og:image`: Floor-specific or building-specific image
- `twitter:card`: summary_large_image

---

## Graceful Degradation (No JavaScript)

### Progressive Enhancement Strategy

```
Layer 1: HTML (No JS)
├── All content accessible via standard links
├── City view = list of districts with links
├── District view = list of buildings with links
├── Building view = list of floors with links
├── Floor view = full content, next/prev links
└── Train = static image, non-interactive

Layer 2: CSS (Enhanced)
├── Isometric visuals rendered
├── Hover states visible
├── Transitions smooth
└── Train visible on tracks

Layer 3: JavaScript (Full Experience)
├── Animated train
├── Smooth view transitions
├── Keyboard navigation
├── Search functionality
└── Interactive building cutaway
```

### No-JS Fallback Structure

```html
<!-- City View without JS -->
<nav aria-label="Districts">
  <ul>
    <li><a href="/central-station">Central Station</a></li>
    <li><a href="/ai">AI District</a></li>
    <li><a href="/architecture">Architecture District</a></li>
    <!-- ... -->
  </ul>
</nav>

<!-- Building View without JS -->
<article>
  <h1>AI Workflows</h1>
  <nav aria-label="Floors">
    <ol>
      <li><a href="/ai/workflows/prompt-engineering">Prompt Engineering</a></li>
      <li><a href="/ai/workflows/chain-of-thought">Chain of Thought</a></li>
      <!-- ... -->
    </ol>
  </nav>
</article>
```

---

## Navigation Component Specifications

### 1. Breadcrumb

```
City → AI District → Workflows → Prompt Engineering
  ↓        ↓            ↓              ↓
  /      /ai    /ai/workflows   /ai/workflows/prompt-engineering
```

Always visible. Each segment is clickable except current page.

### 2. District Picker (Persistent)

```
┌─────────────────────────────────────┐
│  🏛️ Central   🤖 AI   🏗️ Arch   ... │
└─────────────────────────────────────┘
```

Compact horizontal nav showing all districts. Current district highlighted.

### 3. Floor Navigator (Building View)

```
┌─────────────────────┐
│ Prompt Engineering  │ ← Current floor (highlighted)
│ Chain of Thought    │
│ Context Windows     │
│ Tool Calling        │
└─────────────────────┘
```

Vertical list of floors. Scrollable if many floors. Sticky on desktop.

### 4. Train Station Menu

```
┌─────────────────────────────────────┐
│  🚂 Travel to...                    │
├─────────────────────────────────────┤
│  ○ Central Station                  │
│  ● AI District (current)            │
│  ○ Architecture District            │
│  ○ DX District                      │
│  ○ Infrastructure District          │
│  ○ Open Source District             │
└─────────────────────────────────────┘
```

Dropdown/popover from train icon. Allows direct district jumps.

---

## Navigation Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad | Our Approach |
|--------------|--------------|--------------|
| Mystery meat navigation | Users don't know where links go | Clear labels, tooltips on buildings |
| Forced train animation | Slows down power users | Train is skippable, direct nav available |
| Deep linking breaks layout | User lands confused | Every URL loads complete, sensible state |
| Browser back doesn't work | Destroys trust | Proper history management |
| Lost scroll position | Frustrating on return | Restore position on back nav |
| No way to see all content | Users miss things | City view + sitemap always available |

---

## Validation Checklist

- [x] URL structure is hierarchical and readable
- [x] Every view is accessible via URL (deep linkable)
- [x] Back/forward buttons work predictably
- [x] Train enhances but doesn't block navigation
- [x] Keyboard navigation covers all views
- [x] No-JS fallback provides full content access
- [x] Breadcrumbs available at all levels
- [x] Multiple navigation paths to same content
- [x] No dead ends in navigation
- [x] State preserved across navigation

---

## Information Architecture Validation

### Mental Model Alignment

The city metaphor aligns with user mental models in the following ways:

| User Mental Model | City Metaphor Mapping | Validation Method |
|-------------------|----------------------|-------------------|
| "I want to explore topics" | Explore districts | Card sort: Do users group content by these categories? |
| "I want to drill into details" | Enter buildings, view floors | Tree test: Can users find specific content? |
| "I want to move between topics" | Train connects districts | First-click test: Do users understand train navigation? |
| "I want to know where I am" | Breadcrumbs show location | User testing: Do users feel oriented? |
| "I want to find something specific" | Search + sitemap | Search usability test |

### LATCH Framework Application

Content is organized using **Category** (primary) and **Hierarchy** (secondary):

- **Category**: Districts group content by domain (AI, Architecture, DX, etc.)
- **Hierarchy**: Buildings/Floors create depth within each domain
- **Alternative Access**: Search, sitemap, and train provide non-hierarchical access

### Findability Validation Method

**Recommended Testing Protocol:**

1. **Tree Test** (pre-visual):
   - Present text-based structure: City → Districts → Buildings → Floors
   - Tasks: "Find content about prompt engineering" / "Find system design patterns"
   - Success criteria: 80%+ find correct location within 3 clicks

2. **First-Click Test** (with visuals):
   - Show City View
   - Task: "Where would you click to learn about AI workflows?"
   - Success criteria: 80%+ click AI District first

3. **Card Sort** (validation):
   - Present all 37 floor topics
   - Ask users to group and name categories
   - Compare to district structure

---

## Cognitive Load Assessment

### Miller's Law Compliance (7±2)

| Level | Items | Compliance | Notes |
|-------|-------|------------|-------|
| City → Districts | 6 districts | ✅ Within 7±2 | Central Station as 7th is orientation, not category |
| District → Buildings | 2 buildings each | ✅ Well below limit | Easy choice |
| Building → Floors | 3-8 floors | ✅ Within 7±2 | Largest building has 8 floors (upper limit) |
| Navigation | 5-7 nav items | ✅ Within 7±2 | Breadcrumb + district picker + search |

### Hick's Law Application

| Decision Point | # Choices | Risk Level | Mitigation |
|----------------|-----------|------------|------------|
| Which district? | 6 | Low | Clear labels, visual hierarchy, Central Station as suggested start |
| Which building? | 2 | Very Low | Only 2 options per district |
| Which floor? | 3-8 | Low-Medium | Floor previews, clear hierarchy, numbered floors |
| Train destination | 5 (other districts) | Low | Current highlighted, visual route map |

### Progressive Disclosure Strategy

1. **City View**: Shows only district names and building counts
2. **District View**: Reveals building names and floor counts
3. **Building View**: Shows floor titles and summaries
4. **Floor View**: Full content revealed

User never sees more than one level of detail at a time.

---

## Edge Case Inventory

### Navigation Edge Cases

| Edge Case | Scenario | Expected Behavior | Priority |
|-----------|----------|-------------------|----------|
| Direct floor deep link | User lands on `/ai/workflows/prompt-engineering` from search | Show floor content with full context (breadcrumb, building sidebar on desktop) | P0 |
| Invalid URL | `/ai/nonexistent/floor` | Show 404 with suggestions to building/district/city | P0 |
| Browser back from floor | User clicks back button | Return to building view, highlight previously viewed floor | P0 |
| Rapid navigation | User clicks multiple districts quickly | Cancel pending navigations, complete final one | P1 |
| Train + direct click conflict | User clicks district while train is animating | Skip to destination immediately | P1 |
| Hash link in floor | `/ai/workflows/prompt#section-3` | Load floor, scroll to section | P1 |
| Mobile rotation during transition | Device rotates mid-animation | Complete animation, reflow layout | P2 |
| History stack overflow | User navigates through many views | Browser handles; ensure no memory leaks | P2 |
| Refresh during loading | User refreshes while content loading | Restart load from URL state | P1 |
| Shared link with outdated slug | Floor renamed, old URL shared | Redirect to new URL or show 404 with suggestion | P2 |

### Content Edge Cases

| Edge Case | Scenario | Expected Behavior | Priority |
|-----------|----------|-------------------|----------|
| Empty building | Building with 0 floors (future content) | Show "Coming soon" message, back to district | P2 |
| Very long floor title | 100+ character title | Truncate with ellipsis, full title in tooltip/accessible | P2 |
| Floor with no content | Placeholder floor | Show "Content coming soon" with navigation intact | P2 |
| External link in content | Link opens external site | Open in new tab, indicate with icon | P1 |
| Code block overflow | Very wide code | Horizontal scroll within block | P1 |

### User State Edge Cases

| Edge Case | Scenario | Expected Behavior | Priority |
|-----------|----------|-------------------|----------|
| First visit vs return | Different needs | First visit: suggest Central Station; Return: enable search | P1 |
| Visited floor indicator | User returns to building | Previously viewed floors marked | P2 |
| Session timeout | User leaves tab open overnight | Content remains, may need refresh for updates | P3 |
| LocalStorage disabled | Privacy browser | Graceful degradation, no visited indicators | P3 |

---

## "No Jumps" Validation

### State Reachability Matrix

Every state must be reachable from at least one logical previous state:

| Target State | Reachable From | Entry Trigger |
|--------------|----------------|---------------|
| City View | Initial load, any view (breadcrumb), deep link `/` | Page load, click "City" |
| District View | City (click district), Building (back), deep link | Click, back nav, URL |
| Building View | District (click building), Floor (back), deep link | Click, back nav, URL |
| Floor View | Building (click floor), Floor (prev/next), search, deep link | Click, nav, URL |
| Search Overlay | Any view (Cmd+K) | Keyboard shortcut, click search |
| Error View | Any failed navigation | Network error, 404 |

### Dead End Check

| State | Exit Options | Verified |
|-------|--------------|----------|
| City View | Click district, search, external links | ✅ |
| District View | Click building, back to city, train to other district | ✅ |
| Building View | Click floor, back to district, breadcrumb to city | ✅ |
| Floor View | Prev/next floor, back to building, breadcrumb, related floors | ✅ |
| Error View | Retry, back to city, search | ✅ |
| Search Overlay | Select result, escape to close | ✅ |

**Result: No dead ends identified.** All states have at least one exit path.

---

## Integration Notes

### For Interaction Designer
- Train animation timing and easing to be defined in state-transitions.md
- Building cutaway reveal animation TBD
- View transition effects TBD

### For Frontend Developer
- Use History API for SPA navigation
- Implement route guards for view transitions
- Consider view transition API for smooth animations
- Preload adjacent districts/buildings for fast navigation

### For Systems Architect
- URL structure supports static generation
- Each route can be pre-rendered
- Consider ISR for dynamic content

### For UX Researcher
- Validate mental model alignment through card sort
- Conduct tree testing before visual implementation
- Test first-click with city view mockups

### For QA Specialist
- Test all edge cases documented above
- Verify "no jumps" by testing deep links
- Validate back/forward navigation through all flows
