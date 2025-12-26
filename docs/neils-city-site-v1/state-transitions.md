# State & Transitions: Neil's City Site

**Date Created**: December 26, 2025  
**Last Updated**: December 26, 2025  
**Purpose**: Define view states, transition triggers, animation handoff points, and loading states

---

## State Machine Overview

Neil's City Site has a hierarchical state machine with four primary view states and multiple sub-states for loading, error handling, and transitions.

```
┌─────────────────────────────────────────────────────────────────┐
│                    CITY SITE STATE MACHINE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [Initial] ──── Load ────→ [City View]                          │
│                               ↓ ↑                                │
│                    ← ─ ─ ─ ─ ─ ─ ─ ─ ─ →                        │
│                   ↓                     ↓                        │
│             [District View] ← ─ ─ → [District View]              │
│                   ↓ ↑                                            │
│             [Building View]                                      │
│                   ↓ ↑                                            │
│             [Floor View]                                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Primary View States

### State Definitions

| State | URL Pattern | Description | Visual |
|-------|-------------|-------------|--------|
| `city` | `/` | Bird's-eye view of all districts | Full isometric city |
| `district` | `/[district]` | Focused view of single district | Zoomed district with buildings |
| `building` | `/[district]/[building]` | Cutaway view of building | Side-view with floors |
| `floor` | `/[district]/[building]/[floor]` | Full content view | Article/content layout |

### State Hierarchy

```
city
├── district.ai
│   ├── building.ai.workflows
│   │   ├── floor.ai.workflows.prompt-engineering
│   │   ├── floor.ai.workflows.chain-of-thought
│   │   └── floor.ai.workflows.context-windows
│   └── building.ai.agents
│       └── floor.ai.agents.tool-calling
├── district.architecture
│   └── ...
└── ...
```

---

## State Transition Table

### Complete Transition Matrix

| From State | Event | To State | Condition | Side Effects |
|------------|-------|----------|-----------|--------------|
| `initial` | App loads | `city` | None | Fetch city data, initialize train |
| `initial` | Deep link `/ai` | `district.ai` | URL match | Skip city, load district |
| `initial` | Deep link `/ai/workflows` | `building.ai.workflows` | URL match | Skip city/district, load building |
| `initial` | Deep link `/ai/workflows/prompt-engineering` | `floor.ai.workflows.prompt-engineering` | URL match | Load full hierarchy |
| `city` | Click district | `district.*` | Valid district | Animate train, zoom to district |
| `city` | Click train station | `district.*` | Valid station | Train travels, zoom follows |
| `city` | Search select floor | `floor.*` | Search result | Direct navigation |
| `city` | Keyboard `1-6` | `district.*` | Key matches district | Animate transition |
| `district` | Click building | `building.*` | Valid building | Zoom into building cutaway |
| `district` | Click different district | `district.*` | Valid district | Train animation between |
| `district` | Breadcrumb "City" | `city` | Always | Zoom out animation |
| `district` | Browser back | `city` | History exists | Restore city state |
| `district` | Browser back | `district.*` | Came from district | Restore previous district |
| `building` | Click floor | `floor.*` | Valid floor | Scroll/expand to floor |
| `building` | Breadcrumb "District" | `district.*` | Always | Zoom out to district |
| `building` | Breadcrumb "City" | `city` | Always | Zoom out to city |
| `building` | Browser back | `district.*` | History exists | Restore district state |
| `building` | Scroll to floor | `floor.*` | Scroll triggers floor | URL updates, content loads |
| `floor` | Click next/prev | `floor.*` | Adjacent floor exists | Slide transition |
| `floor` | Click related floor | `floor.*` | Valid link | Direct navigation |
| `floor` | Breadcrumb "Building" | `building.*` | Always | Return to building view |
| `floor` | Swipe left/right | `floor.*` | Mobile, adjacent exists | Slide transition |
| `any` | Search open | `search.overlay` | `Cmd+K` or click | Open search overlay |
| `search.overlay` | Select result | `floor.*` | Valid result | Close search, navigate |
| `search.overlay` | Escape | Previous state | Always | Close overlay |

---

## Sub-States

### Loading States

Each primary state has associated loading sub-states:

```
State: city
├── city.loading       → Skeleton, train placeholder
├── city.loaded        → Full interactive city
└── city.error         → Error message, retry option

State: district
├── district.loading   → Buildings skeleton, train arriving
├── district.loaded    → Buildings interactive
└── district.error     → Error message, fallback to city

State: building
├── building.loading   → Cutaway skeleton, floors loading
├── building.loaded    → All floors visible
└── building.error     → Error message, fallback to district

State: floor
├── floor.loading      → Content skeleton
├── floor.loaded       → Full content rendered
└── floor.error        → Error message, retry option
```

### Transition States

Intermediate states during animations:

```
State: city_to_district
├── Duration: 800-1200ms
├── Train starts moving
├── Camera begins zoom
├── District data loading in parallel
└── Completes → district.loading or district.loaded

State: district_to_building
├── Duration: 600-800ms
├── Buildings recede
├── Target building expands
├── Cutaway reveals
└── Completes → building.loading or building.loaded

State: building_to_floor
├── Duration: 400-600ms
├── Building context stays
├── Floor content expands
└── Completes → floor.loading or floor.loaded
```

### Error States

```
State: error.network
├── Trigger: Network failure
├── Message: "Connection lost. Please check your network."
├── Actions: Retry, Show cached content (if available)
└── Recovery: Auto-retry on network restore

State: error.not_found
├── Trigger: Invalid URL, deleted content
├── Message: "This floor doesn't exist in the city."
├── Actions: Go to building, Go to city, Search
└── Recovery: Navigate away

State: error.server
├── Trigger: 500 error
├── Message: "Something went wrong. Please try again."
├── Actions: Retry, Go to city
└── Recovery: Wait and retry
```

---

## State Transition Diagram

### City ↔ District Transitions

```
┌──────────────────────────────────────────────────────────────────┐
│                    CITY ↔ DISTRICT TRANSITION                     │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  [CITY VIEW]                                                      │
│      │                                                            │
│      │ Trigger: Click district / Train station / Key 1-6         │
│      ▼                                                            │
│  [TRANSITION: city_to_district]                                  │
│      │                                                            │
│      ├─ t=0ms: Train starts at current position                  │
│      ├─ t=200ms: Camera begins easing toward district            │
│      ├─ t=400ms: District data fetch (parallel)                  │
│      ├─ t=600ms: Train arrives at station                        │
│      ├─ t=800ms: Camera zoom completes                           │
│      └─ t=1000ms: Transition complete                            │
│      │                                                            │
│      ▼                                                            │
│  [DISTRICT VIEW]                                                  │
│                                                                   │
│      │                                                            │
│      │ Trigger: Breadcrumb "City" / Back button / Escape         │
│      ▼                                                            │
│  [TRANSITION: district_to_city]                                  │
│      │                                                            │
│      ├─ t=0ms: Zoom out begins                                   │
│      ├─ t=400ms: City view visible                               │
│      ├─ t=600ms: Train visible on tracks                         │
│      └─ t=800ms: Transition complete                             │
│      │                                                            │
│      ▼                                                            │
│  [CITY VIEW]                                                      │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### District ↔ Building Transitions

```
┌──────────────────────────────────────────────────────────────────┐
│                  DISTRICT ↔ BUILDING TRANSITION                   │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  [DISTRICT VIEW]                                                  │
│      │                                                            │
│      │ Trigger: Click building                                    │
│      ▼                                                            │
│  [TRANSITION: district_to_building]                              │
│      │                                                            │
│      ├─ t=0ms: Building highlight                                │
│      ├─ t=200ms: Other building fades back                       │
│      ├─ t=400ms: Target building zooms/rotates                   │
│      ├─ t=600ms: Cutaway begins revealing floors                 │
│      └─ t=800ms: Full cutaway view, floors visible               │
│      │                                                            │
│      ▼                                                            │
│  [BUILDING VIEW]                                                  │
│                                                                   │
│      │                                                            │
│      │ Trigger: Breadcrumb / Back button                         │
│      ▼                                                            │
│  [TRANSITION: building_to_district]                              │
│      │                                                            │
│      ├─ t=0ms: Cutaway closes                                    │
│      ├─ t=400ms: Building returns to isometric                   │
│      └─ t=600ms: District view restored                          │
│      │                                                            │
│      ▼                                                            │
│  [DISTRICT VIEW]                                                  │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### Building ↔ Floor Transitions

```
┌──────────────────────────────────────────────────────────────────┐
│                    BUILDING ↔ FLOOR TRANSITION                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  [BUILDING VIEW]                                                  │
│      │                                                            │
│      │ Trigger: Click floor / Scroll to floor                    │
│      ▼                                                            │
│  [TRANSITION: building_to_floor]                                 │
│      │                                                            │
│      ├─ t=0ms: Floor highlighted in building                     │
│      ├─ t=200ms: Building shrinks to sidebar/context             │
│      ├─ t=400ms: Floor content area expands                      │
│      └─ t=600ms: Full content view                               │
│      │                                                            │
│      ▼                                                            │
│  [FLOOR VIEW]                                                     │
│                                                                   │
│      │                                                            │
│      │ Trigger: Back to building                                  │
│      ▼                                                            │
│  [TRANSITION: floor_to_building]                                 │
│      │                                                            │
│      ├─ t=0ms: Content contracts                                 │
│      ├─ t=300ms: Building cutaway expands                        │
│      └─ t=500ms: Floor highlighted in building                   │
│      │                                                            │
│      ▼                                                            │
│  [BUILDING VIEW]                                                  │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Transition Triggers Reference

### User Actions

| Trigger | State Change | Animation |
|---------|--------------|-----------|
| Click district | city → district | Train + zoom |
| Click train station | city → district | Full train journey |
| Click building | district → building | Building cutaway reveal |
| Click floor | building → floor | Floor content expand |
| Click breadcrumb | Any → target level | Reverse animation |
| Browser back | Current → previous | Reverse animation |
| Keyboard nav | Varies | Quick transition |
| Search select | Any → floor | Direct, minimal animation |
| Swipe (mobile) | floor → adjacent floor | Slide transition |

### System Events

| Trigger | State Change | Behavior |
|---------|--------------|----------|
| Page load (home) | initial → city | Load animation |
| Page load (deep link) | initial → target | Load target directly |
| Network error | loaded → error | Show error state |
| Network restore | error → loading | Auto-retry |
| Route change | Current → new | Standard transition |

### Keyboard Shortcuts

| Key | From State | Trigger |
|-----|------------|---------|
| `1-6` | city | → district (numbered) |
| `Enter` | city (focused district) | → district |
| `Enter` | district (focused building) | → building |
| `Enter` | building (focused floor) | → floor |
| `Backspace` | district | → city |
| `Backspace` | building | → district |
| `Backspace` | floor | → building |
| `←` `→` | floor | → adjacent floor |
| `Escape` | Any modal/overlay | Close |

---

## Animation Handoff Points

### For Interaction Designer

These specifications define **what** should animate and **when**. The interaction designer will define **how** (easing, style, feel).

#### Train Animation (City View)

```yaml
Animation: train-journey
Trigger: Click district or train station
Duration: 800-1200ms (varies by distance)

Phases:
  1. Departure (0-200ms):
     - Train doors close (if visible)
     - Train begins movement
     - Camera begins anticipating destination
  
  2. Transit (200-800ms):
     - Train follows track path
     - Speed: eased (slow start, faster middle, slow end)
     - Camera follows or leads train
     - Passing districts may have subtle reactions
  
  3. Arrival (800-1000ms):
     - Train slows at destination station
     - Train doors open (if visible)
     - Camera settles on district view

Handoff Points:
  - H1: Train departure → Begin data fetch for destination
  - H2: Train at 80% journey → Fade in district UI elements
  - H3: Train arrival → Enable district interactions

Notes for Interaction Designer:
  - Train should feel "real" with momentum
  - Consider adding subtle sound cues
  - Handle "skip" action (user clicks destination before arrival)
```

#### Building Cutaway Animation

```yaml
Animation: building-reveal
Trigger: Click building
Duration: 600-800ms

Phases:
  1. Focus (0-200ms):
     - Clicked building highlights
     - Other building dims/recedes
     - District context shrinks
  
  2. Transform (200-500ms):
     - Building rotates to side view
     - External walls become transparent
     - Floors become visible
  
  3. Reveal (500-800ms):
     - Floor contents fade in
     - Floor labels appear
     - Interactive state enabled

Handoff Points:
  - H1: Click registered → Start building data fetch
  - H2: Transform begins → Show floor loading skeletons
  - H3: Reveal complete → Floors interactive

Notes for Interaction Designer:
  - Cutaway should feel like "opening" or "slicing"
  - Consider camera movement (pulling back slightly)
  - Floor reveal should cascade (bottom to top or spotlight)
```

#### Floor Content Transition

```yaml
Animation: floor-expand
Trigger: Click floor in building view
Duration: 400-600ms

Phases:
  1. Highlight (0-150ms):
     - Floor glows/highlights in building
     - Other floors dim slightly
  
  2. Expand (150-400ms):
     - Building view shrinks to left sidebar (or disappears on mobile)
     - Content area expands from floor position
     - Floor content skeleton visible
  
  3. Load (400-600ms):
     - Content fades in
     - Reading mode engaged

Handoff Points:
  - H1: Floor clicked → Fetch floor content
  - H2: Expand begins → Show content skeleton
  - H3: Animation complete → Content visible, scrollable

Notes for Interaction Designer:
  - Should feel like "entering" the floor
  - Building context should remain visible on desktop
  - Mobile: more dramatic switch to content view
```

#### Floor-to-Floor Navigation

```yaml
Animation: floor-slide
Trigger: Prev/Next navigation or swipe
Duration: 300-400ms

Type: Horizontal slide (like reading pages)

Phases:
  1. Exit (0-150ms):
     - Current floor slides out (left or right)
     - New floor content loading (if not cached)
  
  2. Enter (150-300ms):
     - New floor slides in from opposite side
     - Content becomes scrollable
  
  3. Settle (300-400ms):
     - Reading position at top
     - Building sidebar updates highlight

Notes for Interaction Designer:
  - Match reading direction conventions (LTR: next = right)
  - Consider subtle depth (exiting floor goes "back")
  - Preload adjacent floors for instant feel
```

#### District-to-District via Train

```yaml
Animation: train-district-switch
Trigger: Click different district or train destination
Duration: 1000-1500ms

Phases:
  1. Departure (0-300ms):
     - Current district zooms out
     - Train visible at station
     - Train departs
  
  2. Journey (300-1000ms):
     - Brief city overview visible
     - Train traveling (can be abbreviated)
     - Destination district loading
  
  3. Arrival (1000-1500ms):
     - Train arrives at new station
     - New district zooms in
     - Interactive state enabled

Notes for Interaction Designer:
  - Can abbreviate train journey for impatient users
  - "Skip" should show train instantly at destination
  - Consider different animations for adjacent vs distant districts
```

---

## Loading States

### Loading State Design

#### City View Loading

```
┌────────────────────────────────────────┐
│                                        │
│   ┌──────────────────────────────┐    │
│   │                              │    │
│   │   ░░░░░░░░░░░░░░░░░░░░░░   │    │  ← City visual skeleton
│   │   ░░░  ░░░  ░░░  ░░░  ░░   │    │    (district shapes)
│   │   ░░░░░░░░░░░░░░░░░░░░░░   │    │
│   │                              │    │
│   └──────────────────────────────┘    │
│                                        │
│   Loading Neil's City...               │  ← Optional loading text
│   ████████░░░░░░░░░░ 45%              │    (or progress bar)
│                                        │
└────────────────────────────────────────┘
```

#### District View Loading

```
┌────────────────────────────────────────┐
│  ←  AI District                        │
├────────────────────────────────────────┤
│                                        │
│   ┌─────────────┐ ┌─────────────┐     │
│   │ ░░░░░░░░░░ │ │ ░░░░░░░░░░ │     │  ← Building skeletons
│   │ ░░░░░░░░░░ │ │ ░░░░░░░░░░ │     │
│   └─────────────┘ └─────────────┘     │
│                                        │
│   🚂 ━━━━━━━━━━━━━━━━━━━━━━          │  ← Train arriving
│                                        │
└────────────────────────────────────────┘
```

#### Building View Loading

```
┌────────────────────────────────────────┐
│  ←  AI Workflows                       │
├────────────────────────────────────────┤
│                                        │
│   ┌────────────────────────────────┐  │
│   │ ┌──────────────────────────┐   │  │
│   │ │ ░░░░░░░░░░░░░░░░░░░░░░ │   │  │  ← Floor skeletons
│   │ ├──────────────────────────┤   │  │    pulsing
│   │ │ ░░░░░░░░░░░░░░░░░░░░░░ │   │  │
│   │ ├──────────────────────────┤   │  │
│   │ │ ░░░░░░░░░░░░░░░░░░░░░░ │   │  │
│   │ └──────────────────────────┘   │  │
│   └────────────────────────────────┘  │
│                                        │
└────────────────────────────────────────┘
```

#### Floor Content Loading

```
┌────────────────────────────────────────┐
│  ←  Prompt Engineering         🔗  ≡   │
├────────────────────────────────────────┤
│                                        │
│  ░░░░░░░░░░░░░░░░░░░░                │  ← Title skeleton
│  ━━━━━━━━━━━━━━━━━━━━━━               │
│                                        │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  ← Paragraph skeletons
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░               │
│                                        │
│  ┌────────────────────────────────┐  │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  │  ← Code block skeleton
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  │
│  └────────────────────────────────┘  │
│                                        │
└────────────────────────────────────────┘
```

### Loading State Behavior

| State | Loading Indicator | Duration Expectation | Fallback |
|-------|------------------|----------------------|----------|
| City initial | Full page skeleton | < 2s | Show districts as list |
| District | Buildings skeleton + train | < 1s | Show building cards |
| Building | Floors skeleton | < 1s | Show floor list |
| Floor content | Content skeleton | < 500ms | Show cached if available |
| Search | Results skeleton | < 300ms | Show "Searching..." |

### Progressive Loading

```javascript
// Pseudocode for progressive content loading
async function loadFloorContent(floorId) {
  // 1. Show skeleton immediately (0ms)
  showSkeleton();
  
  // 2. Load metadata first (title, reading time) (~100ms)
  const meta = await fetchFloorMeta(floorId);
  showTitle(meta.title);
  
  // 3. Load above-the-fold content (~300ms)
  const intro = await fetchFloorIntro(floorId);
  showIntro(intro);
  
  // 4. Load remaining content (~500ms)
  const fullContent = await fetchFloorContent(floorId);
  showFullContent(fullContent);
  
  // 5. Load images lazily
  lazyLoadImages();
}
```

---

## Error States

### Error State Designs

#### Network Error

```
┌────────────────────────────────────────┐
│                                        │
│              ⚠️                         │
│                                        │
│     Connection Lost                    │
│                                        │
│     We couldn't load this content.     │
│     Please check your connection.      │
│                                        │
│     [ Try Again ]  [ Go to City ]      │
│                                        │
└────────────────────────────────────────┘
```

#### Content Not Found

```
┌────────────────────────────────────────┐
│                                        │
│              🏚️                         │
│                                        │
│     Floor Not Found                    │
│                                        │
│     This floor doesn't exist in        │
│     the city (anymore).                │
│                                        │
│     [ Back to Building ]               │
│     [ Search for Content ]             │
│     [ Go to City ]                     │
│                                        │
└────────────────────────────────────────┘
```

### Error Recovery Paths

| Error | Primary Recovery | Secondary Recovery |
|-------|-----------------|-------------------|
| Network | Retry button | Cached content if available |
| 404 Floor | Back to building | Search / Go to city |
| 404 Building | Back to district | Go to city |
| 404 District | Go to city | Home |
| Server error | Retry with delay | Go to city |
| Timeout | Auto-retry (3x) | Show error, retry button |

---

## State Persistence

### What Gets Persisted

| Data | Storage | Duration | Purpose |
|------|---------|----------|---------|
| Visited floors | LocalStorage | 30 days | Show "visited" indicators |
| Scroll positions | SessionStorage | Session | Restore on back navigation |
| Search history | LocalStorage | 14 days | Show recent searches |
| View preferences | LocalStorage | Indefinite | Reduced motion, theme |
| Train position | State only | Session | Visual continuity |

### URL State

Every meaningful state change updates the URL:

```
State: floor.ai.workflows.prompt-engineering
URL: /ai/workflows/prompt-engineering

State: floor.ai.workflows.prompt-engineering (scrolled to section)
URL: /ai/workflows/prompt-engineering#advanced-techniques
```

### Restoring State from URL

```javascript
// Pseudocode
function handleDeepLink(url) {
  const parsed = parseUrl(url);
  
  if (parsed.floor) {
    // Direct to floor
    loadFloorWithContext(parsed);
  } else if (parsed.building) {
    // Show building cutaway
    loadBuildingWithContext(parsed);
  } else if (parsed.district) {
    // Show district view
    loadDistrictView(parsed);
  } else {
    // City view
    loadCityView();
  }
}
```

---

## Performance Considerations

### Transition Performance

| Transition | Target FPS | Max Duration | Bailout |
|------------|-----------|--------------|---------|
| Train animation | 60fps | 1.5s | Show final state |
| Building reveal | 60fps | 800ms | Show cutaway |
| Floor expand | 60fps | 600ms | Show content |
| Floor slide | 60fps | 400ms | Instant swap |

### Animation Bailout Conditions

- Device low on memory
- User has `prefers-reduced-motion`
- Animation already in progress
- Network is slow (prioritize content over animation)

### Preloading Strategy

```
Current: City View
Preload: All district metadata (names, building counts)

Current: District View
Preload: Building metadata for this district, adjacent districts

Current: Building View
Preload: All floor metadata, first floor content

Current: Floor View
Preload: Adjacent floor content, related floor content
```

---

## Integration Notes

### For Interaction Designer
- All animation durations, easing, and styles to be defined
- Consider adding micro-interactions within states
- Define exact handoff moments for sound design
- Consider ambient animations (city life, train idle)

### For Frontend Developer
- Implement state machine (XState recommended)
- Handle all edge cases in transition table
- Ensure URL updates are synchronous with state
- Implement preloading based on navigation patterns

### For QA Specialist
- Test all transitions in table
- Test interrupting transitions (click during animation)
- Test back/forward across all transitions
- Test deep links to every state level
- Test reduced motion mode

---

## Complete State Table

### Primary State Definitions

| State ID | Description | Entry Conditions | UI Elements | Available Actions |
|----------|-------------|------------------|-------------|-------------------|
| `city.idle` | City view, interactive | App load at `/`, back nav from district | Full city visual, all districts visible, train at last position | Click district, click train station, search, keyboard nav |
| `city.loading` | City assets loading | Initial page load | Skeleton districts, loading indicator | Wait, search (if available) |
| `district.idle` | District view, interactive | Navigate to `/[district]` | District visual, 2 buildings, train at station | Click building, train to other district, back to city |
| `district.loading` | District assets loading | Click district, URL change | Building skeletons, train arriving | Wait, cancel (back) |
| `building.idle` | Building cutaway visible | Navigate to `/[district]/[building]` | Cutaway visual, all floors listed | Click floor, scroll floors, back to district |
| `building.loading` | Building/floors loading | Click building | Floor skeletons, cutaway forming | Wait, cancel (back) |
| `floor.idle` | Floor content readable | Navigate to `/[district]/[building]/[floor]` | Full article content, nav arrows | Read, scroll, prev/next floor, related links, back |
| `floor.loading` | Floor content loading | Click floor, prev/next | Content skeleton | Wait, cancel (back) |
| `search.open` | Search overlay active | Cmd+K or click search | Search input, results list | Type, select result, close |
| `error.404` | Content not found | Invalid URL | Error message, recovery links | Go to building/district/city, search |
| `error.network` | Network failure | Fetch failed | Error message, retry button | Retry, go to city |

### Transition Matrix

| From State | Event | To State | Conditions | Side Effects |
|------------|-------|----------|------------|--------------|
| `city.loading` | Assets loaded | `city.idle` | All critical assets ready | Initialize train, enable interactions |
| `city.loading` | Load failed | `error.network` | Fetch error | Show error, offer retry |
| `city.idle` | Click district | `city_to_district` | Valid district clicked | Start train animation, begin fetch |
| `city.idle` | Click train station | `city_to_district` | Valid station clicked | Full train journey animation |
| `city.idle` | Keyboard 1-6 | `city_to_district` | Key maps to district | Quick train animation |
| `city.idle` | Open search | `search.open` | Always | Focus search input |
| `city_to_district` | Animation complete | `district.loading` | Animation done | Focus district |
| `city_to_district` | Skip requested | `district.loading` | User clicks again | Cancel animation, jump to end |
| `district.loading` | Assets loaded | `district.idle` | Buildings ready | Enable building clicks |
| `district.loading` | Load failed | `error.network` | Fetch error | Show error with context |
| `district.idle` | Click building | `district_to_building` | Valid building | Start cutaway animation |
| `district.idle` | Click other district | `district_to_district` | Valid district | Train animation between |
| `district.idle` | Back/breadcrumb city | `district_to_city` | Always | Zoom out animation |
| `district_to_building` | Animation complete | `building.loading` | Animation done | Show floor list |
| `building.loading` | Floors loaded | `building.idle` | All floors ready | Enable floor navigation |
| `building.idle` | Click floor | `building_to_floor` | Valid floor | Expand floor content |
| `building.idle` | Scroll to floor | `building_to_floor` | Scroll threshold | URL update, content load |
| `building.idle` | Back to district | `building_to_district` | Always | Collapse cutaway |
| `building_to_floor` | Content loaded | `floor.idle` | Content ready | Enable reading mode |
| `floor.idle` | Click prev | `floor_to_floor` | Previous exists | Slide left |
| `floor.idle` | Click next | `floor_to_floor` | Next exists | Slide right |
| `floor.idle` | Swipe left (mobile) | `floor_to_floor` | Next exists | Slide right |
| `floor.idle` | Swipe right (mobile) | `floor_to_floor` | Previous exists | Slide left |
| `floor.idle` | Click related | `floor_to_floor` | Valid link | Direct load |
| `floor.idle` | Back to building | `floor_to_building` | Always | Contract content |
| `floor_to_floor` | Content loaded | `floor.idle` | New content ready | Update URL, reset scroll |
| `search.open` | Select result | `floor.loading` | Valid result | Close search, navigate |
| `search.open` | Escape | Previous state | Always | Close overlay |
| `error.404` | Click suggestion | Target state | Valid suggestion | Navigate to suggestion |
| `error.404` | Search | `search.open` | Always | Open search |
| `error.network` | Retry | Previous loading state | Always | Re-attempt fetch |
| `error.network` | Go to city | `city.loading` | Always | Reset to city |

---

## State Persistence Rules

### What Persists Across Sessions

| Data | Storage | Lifetime | Purpose |
|------|---------|----------|---------|
| Visited floors | LocalStorage | 30 days | Show visited indicators |
| User preferences | LocalStorage | Indefinite | Reduced motion, theme |
| Recent searches | LocalStorage | 14 days | Show search history |

### What Persists Within Session

| Data | Storage | Lifetime | Purpose |
|------|---------|----------|---------|
| Scroll positions | SessionStorage | Session | Restore on back nav |
| Train position | Memory | Session | Visual continuity |
| Navigation history | Browser History | Session | Back/forward support |
| Focus source | Memory | Navigation | Focus restoration |

### URL State Mapping

Every meaningful state has a URL representation:

| State | URL Pattern | Restored Data |
|-------|-------------|---------------|
| `city.idle` | `/` | Train position (from session) |
| `district.idle` | `/[district]` | Which district |
| `building.idle` | `/[district]/[building]` | District + building |
| `floor.idle` | `/[district]/[building]/[floor]` | Full hierarchy |
| `floor.idle` (section) | `/[district]/[building]/[floor]#[section]` | Hierarchy + scroll |

---

## Edge Case State Handling

### Interruption Handling

| Scenario | Current State | Action | Result |
|----------|---------------|--------|--------|
| Click during train animation | `city_to_district` | Click destination district | Complete immediately |
| Click during train animation | `city_to_district` | Click different district | Cancel, start new |
| Back during loading | `*.loading` | Browser back | Cancel fetch, restore previous |
| Refresh during transition | `*_to_*` | Page refresh | Load from URL state |
| Tab hidden during animation | `*_to_*` | Tab becomes hidden | Complete animation (skip to end) |
| Network drops during load | `*.loading` | Connection lost | Transition to `error.network` |

### Browser Navigation Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Back from deep-linked floor | If no history: go to building view |
| Forward after back | Restore forward state exactly |
| Back through multiple floors | Each floor is history entry |
| Refresh on any state | Reload from URL, skip animations |
| History replace (same page scroll) | Don't add history entry for sections |

---

## Validation Checklist

- [x] All view states defined
- [x] All transitions documented with triggers
- [x] Loading states for all views
- [x] Error states with recovery paths
- [x] Animation handoff points specified
- [x] State persistence documented
- [x] URL state synchronization defined
- [x] Performance targets set
- [x] Preloading strategy defined
- [x] No dead end states (all have exit)
- [x] Interruption handling defined
- [x] Browser navigation edge cases covered
- [x] Complete state table with all transitions
