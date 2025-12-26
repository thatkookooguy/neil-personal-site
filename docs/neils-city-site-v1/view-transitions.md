# View Transitions: Neil's City Site

**Date Created**: December 26, 2025  
**Last Updated**: December 26, 2025  
**Purpose**: Define detailed transition specifications for all view changes in the city navigation

---

## Transition Overview

Neil's City has four primary view states with six core transition paths:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    VIEW TRANSITION MAP                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│         ┌──────────┐                                                │
│         │   CITY   │                                                │
│         │   VIEW   │                                                │
│         └────┬─────┘                                                │
│              │                                                       │
│         ① ↓ ↑ ②                                                     │
│              │                                                       │
│         ┌────┴─────┐                                                │
│         │ DISTRICT │ ←──────── ⑥ ──────→ │ DISTRICT │               │
│         │   VIEW   │    (train travel)    │   VIEW   │               │
│         └────┬─────┘                      └──────────┘               │
│              │                                                       │
│         ③ ↓ ↑ ④                                                     │
│              │                                                       │
│         ┌────┴─────┐                                                │
│         │ BUILDING │                                                │
│         │   VIEW   │                                                │
│         └────┬─────┘                                                │
│              │                                                       │
│         ⑤ ↓ ↑ (scroll-based)                                        │
│              │                                                       │
│         ┌────┴─────┐                                                │
│         │  FLOOR   │                                                │
│         │   VIEW   │                                                │
│         └──────────┘                                                │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

① City → District     ④ Building → District
② District → City     ⑤ Building → Floor (scroll)
③ District → Building ⑥ District → District (train)
```

---

## Transition 1: City → District

### Overview

| Property | Value |
|----------|-------|
| **Type** | Container Transform + Camera Zoom |
| **Duration** | 800-1200ms (varies by distance) |
| **Trigger** | Click district, click train station, keyboard 1-6 |
| **Easing** | `--ease-organic` (primary), `--ease-gentle` (train) |

### Storyboard Frames

```
┌─────────────────────────────────────────────────────────────────────┐
│ FRAME 1: t=0ms — TRIGGER                                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   [City View - Full]                                                │
│   ┌─────────────────────────────────────────┐                       │
│   │    🏛️     🤖     🏗️     📱     ⚙️     🎮    │                       │
│   │   Central  AI   Arch   DX   Infra  OSS  │                       │
│   │           ↑                              │                       │
│   │         click                            │                       │
│   │      🚂━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │                       │
│   └─────────────────────────────────────────┘                       │
│                                                                      │
│   • Clicked district receives immediate highlight (pulse glow)      │
│   • Train begins departure animation                                │
│   • Data fetch starts in parallel                                   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ FRAME 2: t=200ms — CAMERA BEGINS                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   [Camera starts zooming toward target]                             │
│   ┌─────────────────────────────────────────┐                       │
│   │           🤖✨                           │                       │
│   │           AI                             │                       │
│   │          ↗                               │                       │
│   │    🚂━━━━╱                               │                       │
│   │                                          │                       │
│   │   (Other districts begin fading)         │                       │
│   └─────────────────────────────────────────┘                       │
│                                                                      │
│   • Camera eases toward target district (isometric pan + zoom)      │
│   • Non-target districts fade to 30% opacity                        │
│   • Train moving along tracks toward destination                    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ FRAME 3: t=500ms — MID-JOURNEY                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   [Zoomed to ~60%, focused on target]                               │
│   ┌─────────────────────────────────────────┐                       │
│   │                                          │                       │
│   │          ┌─────────────┐                │                       │
│   │          │   🤖 AI     │                │                       │
│   │          │  District   │                │                       │
│   │          │  ┌───┐┌───┐ │                │                       │
│   │          │  │ 🏢││ 🏢│ │                │                       │
│   │          └──┴───┴┴───┴─┘                │                       │
│   │              🚂                          │                       │
│   └─────────────────────────────────────────┘                       │
│                                                                      │
│   • Buildings within target district become visible                 │
│   • Train approaching station (decelerating)                        │
│   • District name/metadata fading in                                │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ FRAME 4: t=800ms — ARRIVAL                                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   [District View - Full]                                            │
│   ┌─────────────────────────────────────────┐                       │
│   │  ← City    🤖 AI District               │                       │
│   ├─────────────────────────────────────────┤                       │
│   │                                          │                       │
│   │     ┌─────────────┐ ┌─────────────┐     │                       │
│   │     │   Workflows │ │   Agents    │     │                       │
│   │     │   🏢🏢🏢    │ │   🏢🏢      │     │                       │
│   │     └─────────────┘ └─────────────┘     │                       │
│   │                                          │                       │
│   │     🚂 ═══════════════════════════      │                       │
│   │     ↑ Train at station                  │                       │
│   └─────────────────────────────────────────┘                       │
│                                                                      │
│   • Full district view loaded                                       │
│   • Buildings interactive (hover enabled)                           │
│   • Train stationary at station                                     │
│   • Breadcrumb updated                                              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Animation Specification

```css
/* City → District Transition */

/* Step 1: District highlight on click */
.district-highlight {
  animation: districtPulse 200ms var(--ease-snap);
}

@keyframes districtPulse {
  0% { filter: brightness(1); transform: scale(1); }
  50% { filter: brightness(1.2); transform: scale(1.02); }
  100% { filter: brightness(1.1); transform: scale(1.01); }
}

/* Step 2: Camera zoom */
.city-to-district-camera {
  animation: cameraZoom 800ms var(--ease-organic);
}

@keyframes cameraZoom {
  0% { 
    transform: scale(1) translate(0, 0); 
  }
  100% { 
    transform: scale(2.5) translate(var(--target-x), var(--target-y)); 
  }
}

/* Step 3: Non-target districts fade */
.district-fade-out {
  animation: fadeRecede 400ms var(--ease-exit) forwards;
  animation-delay: 100ms;
}

@keyframes fadeRecede {
  to { 
    opacity: 0; 
    transform: scale(0.95); 
  }
}

/* Step 4: District view fade in */
.district-view-enter {
  animation: districtEnter 400ms var(--ease-enter);
  animation-delay: 400ms;
}

@keyframes districtEnter {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}
```

### Choreography Timeline

| Time | Element | Animation | Easing |
|------|---------|-----------|--------|
| 0ms | Target district | Pulse glow | `--ease-snap` |
| 0ms | Train | Begin departure | `--ease-anticipate` |
| 100ms | Other districts | Fade to 30% | `--ease-exit` |
| 200ms | Camera | Begin zoom | `--ease-organic` |
| 400ms | District buildings | Begin fade in | `--ease-enter` |
| 600ms | Train | Arrive at station | `--ease-gentle` |
| 800ms | District UI | Fully interactive | — |

---

## Transition 2: District → City

### Overview

| Property | Value |
|----------|-------|
| **Type** | Reverse Container Transform |
| **Duration** | 600ms (faster than entry) |
| **Trigger** | Breadcrumb "City", back button, Escape key |
| **Easing** | `--ease-standard` |

### Storyboard Frames

```
┌─────────────────────────────────────────────────────────────────────┐
│ FRAME 1: t=0ms — TRIGGER                                            │
├─────────────────────────────────────────────────────────────────────┤
│   • User clicks "City" in breadcrumb or presses Back               │
│   • Current district begins zoom-out                                │
│   • Train stays at current station                                  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ FRAME 2: t=300ms — MID-ZOOM                                         │
├─────────────────────────────────────────────────────────────────────┤
│   • Camera pulling back to bird's-eye                               │
│   • Other districts fading in from edges                            │
│   • Current district shrinking but still visible                    │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ FRAME 3: t=600ms — COMPLETE                                         │
├─────────────────────────────────────────────────────────────────────┤
│   • Full city view restored                                         │
│   • All districts visible and interactive                           │
│   • Train visible on tracks                                         │
│   • Previously viewed district has subtle highlight                 │
└─────────────────────────────────────────────────────────────────────┘
```

### Animation Specification

```css
/* District → City Transition */

.district-to-city-camera {
  animation: cameraZoomOut 600ms var(--ease-standard);
}

@keyframes cameraZoomOut {
  0% { 
    transform: scale(2.5) translate(var(--current-x), var(--current-y)); 
  }
  100% { 
    transform: scale(1) translate(0, 0); 
  }
}

/* Other districts fade back in */
.district-fade-in {
  animation: fadeReturn 400ms var(--ease-enter);
  animation-delay: 200ms;
}

@keyframes fadeReturn {
  from { 
    opacity: 0; 
    transform: scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: scale(1); 
  }
}

/* Visited district highlight */
.district-visited {
  animation: visitedPulse 300ms var(--ease-gentle);
  animation-delay: 500ms;
}

@keyframes visitedPulse {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.1); }
}
```

---

## Transition 3: District → Building

### Overview

| Property | Value |
|----------|-------|
| **Type** | Building Cutaway Reveal |
| **Duration** | 600-800ms |
| **Trigger** | Click building |
| **Easing** | `--ease-organic` (primary), `--ease-bounce` (floors) |

### The Cutaway Effect

The building "opens up" to reveal its interior floors. This is the signature transition of Neil's City.

### Storyboard Frames

```
┌─────────────────────────────────────────────────────────────────────┐
│ FRAME 1: t=0ms — CLICK BUILDING                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   [District View]                                                   │
│   ┌─────────────────────────────────────────┐                       │
│   │                                          │                       │
│   │     ┌─────────────┐ ┌─────────────┐     │                       │
│   │     │   Workflows │ │   Agents    │     │                       │
│   │     │   🏢🏢🏢    │ │   🏢🏢      │     │                       │
│   │     │     ↑       │ │             │     │                       │
│   │     │   click     │ │             │     │                       │
│   │     └─────────────┘ └─────────────┘     │                       │
│   │                                          │                       │
│   └─────────────────────────────────────────┘                       │
│                                                                      │
│   • Clicked building receives highlight                             │
│   • Other building begins fading                                    │
│   • Floor data fetch starts                                         │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ FRAME 2: t=200ms — FOCUS & EXPAND                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   [Building taking focus]                                           │
│   ┌─────────────────────────────────────────┐                       │
│   │                                          │                       │
│   │     ┌───────────────────┐ ┌───┐         │                       │
│   │     │                   │ │░░░│         │                       │
│   │     │    Workflows      │ │░░░│ ← fading│                       │
│   │     │    🏢🏢🏢         │ │░░░│         │                       │
│   │     │                   │ └───┘         │                       │
│   │     └───────────────────┘               │                       │
│   │                                          │                       │
│   └─────────────────────────────────────────┘                       │
│                                                                      │
│   • Target building scales up and moves to focus position           │
│   • Non-target building fades to 20% and recedes                    │
│   • Building starts rotating to cutaway angle                       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ FRAME 3: t=400ms — CUTAWAY BEGINS                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   [Building wall opening]                                           │
│   ┌─────────────────────────────────────────┐                       │
│   │                                          │                       │
│   │     ┌─────────────────────────────┐     │                       │
│   │     │  ╔═══════════════════════╗  │     │                       │
│   │     │  ║░░░░░░░░░░░░░░░░░░░░░░║  │     │                       │
│   │     │  ╠═══════════════════════╣  │     │                       │
│   │     │  ║░░░░░░░░░░░░░░░░░░░░░░║  │     │                       │
│   │     │  ╠═══════════════════════╣  │     │                       │
│   │     │  ║░░░░░░░░░░░░░░░░░░░░░░║  │     │                       │
│   │     │  ╚═══════════════════════╝  │     │                       │
│   │     └─────────────────────────────┘     │                       │
│   │                                          │                       │
│   └─────────────────────────────────────────┘                       │
│                                                                      │
│   • Front wall of building "slides away" or becomes transparent     │
│   • Floor dividers become visible                                   │
│   • Floor content skeletons appear                                  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ FRAME 4: t=600ms — FLOORS REVEAL (STAGGERED)                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   [Floor content appearing]                                         │
│   ┌─────────────────────────────────────────┐                       │
│   │  ← AI District    AI Workflows          │                       │
│   ├─────────────────────────────────────────┤                       │
│   │     ┌─────────────────────────────┐     │                       │
│   │     │  ╔═══════════════════════╗  │     │                       │
│   │     │  ║ 4. Evaluation         ║  │ ← appears last (t+150ms)   │
│   │     │  ╠═══════════════════════╣  │     │                       │
│   │     │  ║ 3. Guardrails    ★    ║  │ ← appears (t+100ms)        │
│   │     │  ╠═══════════════════════╣  │     │                       │
│   │     │  ║ 2. Agents in Teams    ║  │ ← appears (t+50ms)         │
│   │     │  ╠═══════════════════════╣  │     │                       │
│   │     │  ║ 1. AI-First DX   ✨   ║  │ ← appears first (t+0ms)    │
│   │     │  ╚═══════════════════════╝  │     │                       │
│   │     └─────────────────────────────┘     │                       │
│   │                                          │                       │
│   └─────────────────────────────────────────┘                       │
│                                                                      │
│   • Floors reveal from bottom to top (ground floor first)           │
│   • 50ms stagger between each floor                                 │
│   • Each floor slides in from left + fades                          │
│   • Neil character may appear on a floor                            │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ FRAME 5: t=800ms — COMPLETE                                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   • All floors visible and interactive                              │
│   • Floor hover states enabled                                      │
│   • Character idle animation begins                                 │
│   • Scroll enabled (if content overflows)                           │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Animation Specification

```css
/* District → Building Transition */

/* Building highlight */
.building-focus {
  animation: buildingFocus 200ms var(--ease-snap);
}

@keyframes buildingFocus {
  0% { filter: brightness(1); }
  100% { filter: brightness(1.15); box-shadow: 0 0 20px var(--district-glow); }
}

/* Building expansion and repositioning */
.building-expand {
  animation: buildingExpand 400ms var(--ease-organic);
}

@keyframes buildingExpand {
  0% {
    transform: scale(1) translate(0, 0) rotateY(0deg);
  }
  100% {
    transform: scale(1.5) translate(var(--center-offset-x), 0) rotateY(-15deg);
  }
}

/* Other building fade */
.building-recede {
  animation: buildingRecede 300ms var(--ease-exit) forwards;
}

@keyframes buildingRecede {
  to {
    opacity: 0.2;
    transform: scale(0.9) translateX(-50px);
    filter: blur(2px);
  }
}

/* Cutaway wall slide */
.cutaway-reveal {
  animation: cutawayReveal 300ms var(--ease-standard);
  animation-delay: 300ms;
}

@keyframes cutawayReveal {
  0% {
    clip-path: inset(0 100% 0 0);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
}

/* Floor staggered reveal */
.floor-reveal {
  opacity: 0;
  transform: translateX(-20px);
  animation: floorSlideIn 300ms var(--ease-bounce) forwards;
}

.floor-reveal:nth-child(1) { animation-delay: 500ms; }
.floor-reveal:nth-child(2) { animation-delay: 550ms; }
.floor-reveal:nth-child(3) { animation-delay: 600ms; }
.floor-reveal:nth-child(4) { animation-delay: 650ms; }
/* Max 5 floors staggered, rest appear with floor 5 */

@keyframes floorSlideIn {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### Choreography Timeline

| Time | Element | Animation | Easing |
|------|---------|-----------|--------|
| 0ms | Target building | Highlight/glow | `--ease-snap` |
| 0ms | Data fetch | Start loading | — |
| 100ms | Other building | Fade + recede | `--ease-exit` |
| 200ms | Target building | Scale + reposition | `--ease-organic` |
| 300ms | Building wall | Cutaway slide | `--ease-standard` |
| 500ms | Floor 1 | Slide in | `--ease-bounce` |
| 550ms | Floor 2 | Slide in | `--ease-bounce` |
| 600ms | Floor 3 | Slide in | `--ease-bounce` |
| 650ms | Floor 4+ | Slide in | `--ease-bounce` |
| 800ms | Full view | Interactive | — |

---

## Transition 4: Building → District

### Overview

| Property | Value |
|----------|-------|
| **Type** | Reverse Cutaway |
| **Duration** | 500ms (faster than entry) |
| **Trigger** | Breadcrumb "District", back button |
| **Easing** | `--ease-standard` |

### Animation Specification

```css
/* Building → District Transition */

/* Floors collapse (reverse order) */
.floor-collapse {
  animation: floorCollapseOut 200ms var(--ease-exit) forwards;
}

.floor-collapse:nth-child(4) { animation-delay: 0ms; }
.floor-collapse:nth-child(3) { animation-delay: 30ms; }
.floor-collapse:nth-child(2) { animation-delay: 60ms; }
.floor-collapse:nth-child(1) { animation-delay: 90ms; }

@keyframes floorCollapseOut {
  to {
    opacity: 0;
    transform: translateX(-15px);
  }
}

/* Building returns to isometric position */
.building-collapse {
  animation: buildingCollapse 300ms var(--ease-standard);
  animation-delay: 150ms;
}

@keyframes buildingCollapse {
  0% {
    transform: scale(1.5) translate(var(--center-offset-x), 0) rotateY(-15deg);
  }
  100% {
    transform: scale(1) translate(0, 0) rotateY(0deg);
  }
}

/* Other building returns */
.building-return {
  animation: buildingReturn 300ms var(--ease-enter);
  animation-delay: 200ms;
}

@keyframes buildingReturn {
  from {
    opacity: 0.2;
    transform: scale(0.9) translateX(-50px);
    filter: blur(2px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateX(0);
    filter: blur(0);
  }
}
```

---

## Transition 5: Building ↔ Floor (Scroll-Based)

### Overview

| Property | Value |
|----------|-------|
| **Type** | Scroll-Driven Expansion |
| **Duration** | Continuous (scroll-linked) |
| **Trigger** | Click floor, scroll to floor, prev/next buttons |
| **Easing** | `--ease-standard` for click, immediate for scroll |

### Two Modes

1. **Click Floor**: Smooth scroll to floor + expand content
2. **Manual Scroll**: Progressive reveal as user scrolls

### Click-to-Floor Animation

```css
/* Click floor → Expand content */

/* Floor expansion */
.floor-expand {
  animation: floorExpand 400ms var(--ease-organic);
}

@keyframes floorExpand {
  0% {
    height: var(--floor-preview-height);
    background: var(--floor-bg);
  }
  100% {
    height: var(--floor-expanded-height);
    background: var(--floor-active-bg);
  }
}

/* Content fade in */
.floor-content-reveal {
  animation: contentReveal 300ms var(--ease-enter);
  animation-delay: 200ms;
}

@keyframes contentReveal {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Other floors dim */
.floor-inactive {
  transition: opacity 200ms var(--ease-standard);
  opacity: 0.6;
}
```

### Scroll-Based Progressive Reveal

```javascript
// Pseudocode for scroll-driven floor activation
const floorObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0.5) {
      // Floor is majority visible
      entry.target.classList.add('floor-active');
      updateURLToFloor(entry.target.id);
    } else {
      entry.target.classList.remove('floor-active');
    }
  });
}, { threshold: [0.5] });
```

### Floor-to-Floor Navigation (Prev/Next)

```css
/* Horizontal slide between floors */
.floor-slide-enter-next {
  animation: slideFromRight 300ms var(--ease-standard);
}

.floor-slide-exit-prev {
  animation: slideToLeft 300ms var(--ease-standard);
}

@keyframes slideFromRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideToLeft {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(-100%); opacity: 0; }
}

/* Reverse for going backward */
.floor-slide-enter-prev {
  animation: slideFromLeft 300ms var(--ease-standard);
}

.floor-slide-exit-next {
  animation: slideToRight 300ms var(--ease-standard);
}

@keyframes slideFromLeft {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideToRight {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
}
```

---

## Transition 6: District → District (Train Travel)

### Overview

| Property | Value |
|----------|-------|
| **Type** | Train Journey + Camera Pan |
| **Duration** | 1000-1500ms (varies by distance) |
| **Trigger** | Train station menu, click different district |
| **Easing** | `--ease-gentle` (train), `--ease-organic` (camera) |

### Journey Calculation

```javascript
// Calculate journey duration based on station distance
const STATION_ORDER = ['central', 'ai', 'architecture', 'dx', 'infrastructure', 'opensource'];

function getJourneyDuration(fromStation, toStation) {
  const fromIndex = STATION_ORDER.indexOf(fromStation);
  const toIndex = STATION_ORDER.indexOf(toStation);
  const distance = Math.abs(toIndex - fromIndex);
  
  // Minimum 800ms, add 150ms per station passed
  return Math.min(800 + (distance * 150), 1500);
}
```

### Storyboard Frames

```
┌─────────────────────────────────────────────────────────────────────┐
│ FRAME 1: t=0ms — DEPARTURE                                          │
├─────────────────────────────────────────────────────────────────────┤
│   • Current district begins zooming out                             │
│   • Train at current station, doors close (if visible)              │
│   • Train whistle sound cue (optional)                              │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ FRAME 2: t=200ms — IN TRANSIT                                       │
├─────────────────────────────────────────────────────────────────────┤
│   • Brief city overview visible (all districts)                     │
│   • Train moving along tracks with momentum                         │
│   • Passing districts have subtle reactions (lights flicker)        │
│   • Destination loading in background                               │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ FRAME 3: t=800ms — APPROACHING                                      │
├─────────────────────────────────────────────────────────────────────┤
│   • Camera begins zooming toward destination                        │
│   • Train decelerating                                              │
│   • Destination district becoming focused                           │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ FRAME 4: t=1200ms — ARRIVAL                                         │
├─────────────────────────────────────────────────────────────────────┤
│   • Train at new station                                            │
│   • Full district view loaded                                       │
│   • Buildings interactive                                           │
└─────────────────────────────────────────────────────────────────────┘
```

### Animation Specification

```css
/* District → District (Train Travel) */

/* Current district zoom out */
.district-depart {
  animation: districtDepart 400ms var(--ease-exit);
}

@keyframes districtDepart {
  to {
    transform: scale(0.4);
    opacity: 0.3;
  }
}

/* City overview visible briefly */
.city-glimpse {
  animation: cityGlimpse 600ms var(--ease-gentle);
  animation-delay: 200ms;
}

@keyframes cityGlimpse {
  0% { opacity: 0; }
  30% { opacity: 1; }
  70% { opacity: 1; }
  100% { opacity: 0; }
}

/* Destination zoom in */
.district-arrive {
  animation: districtArrive 400ms var(--ease-enter);
  animation-delay: 800ms;
}

@keyframes districtArrive {
  from {
    transform: scale(0.4);
    opacity: 0.3;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
```

---

## Interruption Handling

### Skip Animation on Rapid Navigation

```javascript
// When user triggers new navigation during transition
function handleNavigationInterrupt(newDestination) {
  // 1. Cancel current animations
  document.querySelectorAll('.animating').forEach(el => {
    el.style.animation = 'none';
    el.getAnimations().forEach(anim => anim.cancel());
  });
  
  // 2. Jump to end state of current transition
  jumpToEndState();
  
  // 3. Begin new transition immediately
  startTransition(newDestination);
}
```

### Transition State Machine

```javascript
const transitionStates = {
  IDLE: 'idle',
  TRANSITIONING: 'transitioning',
  INTERRUPTED: 'interrupted'
};

let currentState = transitionStates.IDLE;

function startTransition(target) {
  if (currentState === transitionStates.TRANSITIONING) {
    currentState = transitionStates.INTERRUPTED;
    // Fast-forward current, start new
  }
  currentState = transitionStates.TRANSITIONING;
  // ... animation logic
}

function onTransitionComplete() {
  currentState = transitionStates.IDLE;
}
```

---

## Reduced Motion Alternatives

All view transitions have simplified alternatives for `prefers-reduced-motion`:

| Transition | Full Animation | Reduced Motion |
|------------|----------------|----------------|
| City → District | Zoom + train + stagger | Instant fade |
| District → City | Zoom out | Instant fade |
| District → Building | Cutaway + floor stagger | Cross-fade |
| Building → District | Collapse + return | Cross-fade |
| Building ↔ Floor | Expand/collapse | Instant switch |
| District ↔ District | Train journey | Instant swap |

```css
@media (prefers-reduced-motion: reduce) {
  .city-to-district-camera,
  .district-to-city-camera,
  .building-expand,
  .building-collapse,
  .floor-reveal,
  .train-journey {
    animation: simpleFade 150ms var(--ease-standard) !important;
    animation-delay: 0ms !important;
  }
  
  @keyframes simpleFade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}
```

---

## Performance Notes

### Critical Path Optimization

1. **Preload next view**: Start data fetch at t=0ms, not after animation
2. **Use transforms only**: All animations use `transform` and `opacity`
3. **will-change management**: Apply before animation, remove after
4. **Layer promotion**: Animated elements get `will-change: transform`

### Animation Budget

| View Transition | Target FPS | Max CPU Time/Frame |
|-----------------|------------|-------------------|
| City → District | 60fps | 8ms |
| District → Building | 60fps | 8ms |
| Building ↔ Floor | 60fps | 8ms |
| Train Journey | 60fps | 8ms |

---

## Integration Notes

### For Frontend Developer
- Implement View Transitions API where supported
- Use Framer Motion or GSAP for complex sequences
- Preload adjacent views for instant-feel navigation
- Implement transition state machine to handle interruptions

### For QA Specialist
- Test interruption during every transition type
- Verify 60fps on mid-range devices
- Test rapid navigation (spam clicking)
- Verify reduced motion alternatives work

### For Visual Designer
- Validate timing feels "Ghibli-warm, not sluggish"
- Ensure cutaway effect reads clearly
- Verify floor stagger is perceivable but not slow

---

*View transitions designed for Neil's City Site. Motion should feel like exploring a hand-crafted world, not clicking through a website.*
