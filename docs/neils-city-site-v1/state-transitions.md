# Neil's City Site — State & Transitions

## Primary View States

```
┌────────────────────────────────────────────────────────────────┐
│                        VIEW STATES                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐ │
│  │   CITY   │───▶│ DISTRICT │───▶│ BUILDING │───▶│  FLOOR   │ │
│  │   VIEW   │    │   VIEW   │    │   VIEW   │    │  FOCUS   │ │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘ │
│       │               │               │               │        │
│       ▼               ▼               ▼               ▼        │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐ │
│  │ Loading  │    │ Loading  │    │ Loading  │    │ Loading  │ │
│  │ Error    │    │ Error    │    │ Error    │    │ Error    │ │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘ │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## State Definitions

### City View

| Sub-state | Description |
|-----------|-------------|
| `city.idle` | Default state, fully loaded, interactive |
| `city.loading` | Initial load, showing skeleton |
| `city.animating` | Train moving, ambient animations |
| `city.focused` | User hovering/focusing on a district |
| `city.transitioning` | Zooming into a district |

### District View

| Sub-state | Description |
|-----------|-------------|
| `district.idle` | Fully loaded, buildings visible |
| `district.loading` | Loading building metadata |
| `district.focused` | User hovering/focusing on building |
| `district.transitioning` | Opening into building view |

### Building View

| Sub-state | Description |
|-----------|-------------|
| `building.idle` | Cutaway visible, content loaded |
| `building.loading` | Loading floor content |
| `building.scrolling` | User actively scrolling |
| `building.floor-snap` | Snapping to floor boundary |

### Floor Focus

| Sub-state | Description |
|-----------|-------------|
| `floor.active` | Floor is in viewport, characters positioned |
| `floor.entering` | Scrolling into this floor |
| `floor.leaving` | Scrolling out of this floor |

---

## Transition Triggers

### User-Initiated Transitions

| From | To | Trigger | Animation |
|------|-----|---------|-----------|
| City | District | Click district | Zoom + pan |
| District | Building | Click building | Cutaway reveal |
| Building | Floor | Scroll | Smooth scroll |
| Any | City | Click home / Esc | Zoom out |
| Building | District | Click back / Esc | Close cutaway |
| District | City | Click back / Esc | Pan out |

### System-Initiated Transitions

| Trigger | Transition | Animation |
|---------|------------|-----------|
| Initial load | → City | Fade in + train arrival |
| Deep link to floor | → Building.Floor | Direct (skip city/district anim) |
| Network error | → Error overlay | Fade in |
| Content update | Re-render | None (seamless) |

### Browser-Initiated Transitions

| Trigger | Transition | Animation |
|---------|------------|-----------|
| Back button | → Previous state | Reverse animation |
| Forward button | → Next state | Forward animation |
| URL change | → Target state | Appropriate animation |

---

## Transition Timing

### Duration Guidelines

| Transition Type | Duration | Easing |
|-----------------|----------|--------|
| View change (city ↔ district) | 600ms | ease-out |
| Building open/close | 800ms | ease-in-out |
| Floor scroll snap | 300ms | ease-out |
| Hover states | 150ms | ease |
| Character state change | 400ms | ease |
| Train movement | continuous | linear |

### Stagger Patterns

**City load (sequential reveal):**
```
t=0ms:    Background fade in
t=200ms:  Districts start appearing (staggered 100ms each)
t=800ms:  Train begins animation
t=1000ms: UI elements fade in
```

**Building open:**
```
t=0ms:    Building shell zooms/pans into view
t=300ms:  Cutaway "opens" (sides slide away)
t=500ms:  Floors fade in (staggered)
t=700ms:  Characters appear
t=800ms:  Content ready for scroll
```

---

## Animation Handoff Points

These are the moments where visual designers/animators need to define the exact motion.

### City → District Transition

```
┌─────────────────────────────────────────────────────────────┐
│ ANIMATION HANDOFF: City → District Zoom                     │
├─────────────────────────────────────────────────────────────┤
│ Start state:                                                │
│   - Full city visible                                       │
│   - Selected district highlighted                           │
│   - Camera at city overview position                        │
│                                                             │
│ End state:                                                  │
│   - Single district fills view                              │
│   - Buildings clearly visible and interactive               │
│   - Other districts not visible                             │
│                                                             │
│ Key frames to define:                                       │
│   1. Initial highlight of selected district                 │
│   2. Mid-zoom (city elements shrinking)                     │
│   3. Final position (district centered)                     │
│                                                             │
│ Easing: ease-out (fast start, gentle landing)               │
│ Duration: 600ms                                             │
│ Interruptible: Yes (user clicks elsewhere)                  │
└─────────────────────────────────────────────────────────────┘
```

### Building Cutaway Open

```
┌─────────────────────────────────────────────────────────────┐
│ ANIMATION HANDOFF: Building Cutaway                         │
├─────────────────────────────────────────────────────────────┤
│ Start state:                                                │
│   - Building exterior visible in district                   │
│   - Building selected/highlighted                           │
│                                                             │
│ End state:                                                  │
│   - Side-view cutaway visible                               │
│   - Floors visible with content                             │
│   - Characters in position                                  │
│   - Scroll enabled                                          │
│                                                             │
│ Key frames to define:                                       │
│   1. Building begins to "zoom in" / isolate                 │
│   2. Front wall "peels away" or fades                       │
│   3. Interior floors revealed (staggered)                   │
│   4. Characters fade/walk in                                │
│   5. UI (floor indicator) appears                           │
│                                                             │
│ Easing: ease-in-out (smooth both ends)                      │
│ Duration: 800ms total                                       │
│ Interruptible: Yes                                          │
└─────────────────────────────────────────────────────────────┘
```

### Floor Transition (Scroll)

```
┌─────────────────────────────────────────────────────────────┐
│ ANIMATION HANDOFF: Floor Scroll Transition                  │
├─────────────────────────────────────────────────────────────┤
│ Trigger: User scrolls past floor boundary                   │
│                                                             │
│ During scroll:                                              │
│   - Floor indicator updates smoothly                        │
│   - Character opacity may shift                             │
│   - Previous floor fades/dims slightly                      │
│   - Next floor becomes prominent                            │
│                                                             │
│ At floor snap:                                              │
│   - Smooth snap to floor top (if snap enabled)              │
│   - Character state updates per floor metadata              │
│   - Background may shift per floor metadata                 │
│   - URL updates (if deep linking floors)                    │
│                                                             │
│ Character transition:                                       │
│   - Cross-fade between states (400ms)                       │
│   - Or: Character "walks" to new position                   │
│                                                             │
│ Easing: ease-out for snap                                   │
│ Duration: 300ms for snap, continuous for scroll             │
└─────────────────────────────────────────────────────────────┘
```

---

## Loading States

### Skeleton Design

**City View Skeleton:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│     ╔═══╗     ╔═══╗     ╔═══╗                              │
│     ║   ║     ║   ║     ║   ║   ← Placeholder districts    │
│     ╚═══╝     ╚═══╝     ╚═══╝     (gray shapes)            │
│                                                             │
│     ╔═══╗     ╔═══╗                                        │
│     ║   ║     ║   ║                                        │
│     ╚═══╝     ╚═══╝                                        │
│                                                             │
│     ─────────────────    ← Track placeholder               │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Pulse animation on placeholder shapes
Train track: animated dashed line
```

**Building View Skeleton:**
```
┌─────────────────────────────────────────────────────────────┐
│  Floor 1 of ?                                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────┐                                   │
│  │ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │ ← Heading placeholder              │
│  └─────────────────────┘                                   │
│                                                             │
│  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒               │
│  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                        │
│  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                   │
│                                        ← Text placeholders │
│  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                    │
│  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Subtle shimmer animation on placeholders
```

---

## Error States

### Network Error

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              🚂 ─ ─ ─ ✕                                     │
│                                                             │
│         Train Delayed                                       │
│                                                             │
│    We couldn't load that content.                          │
│    The train might be running slow today.                   │
│                                                             │
│         [Try Again]  [Go Home]                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘

- Show Neil looking at watch (illustration)
- Leela sitting patiently
- Warm, not alarming
```

### 404 Error

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              🗺️ ❓                                           │
│                                                             │
│         Lost in the City                                    │
│                                                             │
│    This building doesn't seem to exist.                    │
│    Maybe it moved to a different district?                  │
│                                                             │
│    Try:                                                     │
│    • [Go to City Overview]                                  │
│    • [Central Station]                                      │
│    • [Search for something]                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘

- Show Neil with map, looking confused
- Leela sniffing ground
```

---

## State Persistence

### What to Persist (Session)

| Data | Storage | Lifetime |
|------|---------|----------|
| Current view state | URL | Permanent |
| Scroll position | sessionStorage | Session |
| Last viewed district | sessionStorage | Session |
| Sound preference | localStorage | Permanent |
| Theme preference | localStorage | Permanent |
| Reduced motion | System preference | N/A |

### What NOT to Persist

- Animation states (always reset)
- Loading states (transient)
- Error states (transient)
- Hover/focus states (transient)

---

## Complete State Table

| From | To | Trigger | Animation | Duration | URL Change |
|------|-----|---------|-----------|----------|------------|
| — | city.loading | Initial load | Fade in | 300ms | / |
| city.loading | city.idle | Load complete | None | — | — |
| city.idle | city.focused | Hover district | Highlight | 150ms | — |
| city.focused | city.idle | Hover out | Unhighlight | 150ms | — |
| city.idle | city.transitioning | Click district | Zoom start | — | — |
| city.transitioning | district.loading | Animation complete | — | 600ms | /{district} |
| district.loading | district.idle | Load complete | Fade in | 300ms | — |
| district.idle | district.focused | Hover building | Highlight | 150ms | — |
| district.idle | district.transitioning | Click building | Cutaway start | — | — |
| district.transitioning | building.loading | Animation complete | — | 800ms | /{district}/{building} |
| building.loading | building.idle | Load complete | Content fade in | 300ms | — |
| building.idle | building.scrolling | Scroll start | None | — | — |
| building.scrolling | building.floor-snap | Scroll pause | Snap | 300ms | /{d}/{b}/{f} |
| building.floor-snap | floor.active | Snap complete | Character update | 400ms | — |
| Any | city.idle | Click home | Zoom out | 600ms | / |
| building.idle | district.idle | Click back | Close cutaway | 600ms | /{district} |
| district.idle | city.idle | Click back | Zoom out | 600ms | / |
| Any | error | Network fail | Fade overlay | 300ms | — |
| error | previous | Retry success | Fade out | 300ms | — |

---

## File Changed
- Created: `docs/neils-city-site-v1/state-transitions.md`

