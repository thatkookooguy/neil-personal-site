# Character Animation: Neil's City Site

**Date Created**: December 26, 2025  
**Last Updated**: December 26, 2025  
**Purpose**: Define animation specifications for Neil and Leela characters including states, transitions, and pixel art approach

---

## Character Animation Philosophy

### The Ghibli-Pixel Fusion for Characters

Neil and Leela embody the site's dual animation traditions:

| Tradition | Application to Characters |
|-----------|--------------------------|
| **Studio Ghibli** | Subtle breathing, weighted movement, natural follow-through |
| **Pixel Art** | Frame-limited animations (4-8 frames), snappy state changes |

> **The Golden Rule**: Characters should feel alive but not distracting. They add warmth and personality, never compete with content.

### When Characters Animate

| Scenario | Animation Level | Purpose |
|----------|----------------|---------|
| Background idle | Subtle (breathing, blinking) | Ambient life |
| User interaction nearby | Reactive (look, perk up) | Feedback |
| Navigation transition | Active (walking, pointing) | Guidance |
| Loading state | Supportive (waiting animation) | Engagement |
| Easter egg discovery | Expressive (celebrate) | Delight |

---

## Neil: The City Architect

### Character Reference

```
┌─────────────────────────────────────────────────────────────────────┐
│                      NEIL VISUAL REFERENCE                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                  ┌───────┐                                          │
│                  │  CAP  │  ← Signature cap (can vary by district)  │
│                  └───┬───┘                                          │
│                    ┌─┴─┐                                            │
│                    │ 👤 │  ← Bearded, focused expression            │
│                    └─┬─┘                                            │
│                 ┌────┴────┐                                         │
│                 │  TEAL   │  ← Teal/dark clothing                   │
│                 │  SHIRT  │                                         │
│                 └────┬────┘                                         │
│                    ╱   ╲                                             │
│                   ╱     ╲   ← Standing pose, slight lean             │
│                  ╱       ╲                                           │
│                                                                      │
│   Pixel dimensions: 32×48px (standard), 64×96px (detailed)          │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Neil State Definitions

#### 1. Idle State

```
┌─────────────────────────────────────────────────────────────────────┐
│ STATE: NEIL IDLE                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DESCRIPTION: Neil stands in a relaxed, thoughtful pose             │
│                                                                      │
│  ANIMATION:                                                         │
│  • Subtle breathing (scale Y: 1.0 ↔ 1.01)                           │
│  • Occasional blink (every 4-7 seconds, randomized)                 │
│  • Micro weight shift (every 10-15 seconds)                         │
│                                                                      │
│  SPRITE FRAMES: 2 frames (breathing cycle)                          │
│                                                                      │
│  Frame 1 (400ms):     Frame 2 (400ms):                              │
│       ┌─┐                  ┌─┐                                       │
│       │ │                  │ │                                       │
│       ├─┤                  ├─┤                                       │
│       │ │                  │ │  ← Subtle height difference           │
│       └┬┘                  └┬┘                                       │
│       ╱ ╲                  ╱ ╲                                        │
│                                                                      │
│  TIMING:                                                            │
│  • Breathing cycle: var(--idle-cycle) = 800ms                       │
│  • Easing: steps(2, end)                                            │
│                                                                      │
│  TRIGGERS TO OTHER STATES:                                          │
│  • User hovers nearby → Look state                                  │
│  • Navigation starts → Walking state                                │
│  • Click on Neil → Pointing state                                   │
│  • Content loading → Working state                                  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.neil-idle {
  animation: neil-breathe var(--idle-cycle) steps(2) infinite;
}

@keyframes neil-breathe {
  0%, 100% { 
    transform: scaleY(1) translateY(0); 
    background-position: 0 0; /* Frame 1 */
  }
  50% { 
    transform: scaleY(1.01) translateY(-1px); 
    background-position: -32px 0; /* Frame 2 */
  }
}

/* Blink overlay (separate element) */
.neil-blink {
  animation: neil-blink-random 5s step-end infinite;
}

@keyframes neil-blink-random {
  0%, 95%, 100% { opacity: 0; } /* Eyes open */
  96%, 99% { opacity: 1; }       /* Eyes closed (blink frame) */
}
```

#### 2. Walking State

```
┌─────────────────────────────────────────────────────────────────────┐
│ STATE: NEIL WALKING                                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DESCRIPTION: Neil walks across the screen during transitions       │
│                                                                      │
│  ANIMATION:                                                         │
│  • 4-frame walk cycle (classic pixel art)                           │
│  • Body bob with each step                                          │
│  • Arms swing opposite to legs                                      │
│                                                                      │
│  SPRITE FRAMES: 4 frames                                            │
│                                                                      │
│  Frame 1:    Frame 2:    Frame 3:    Frame 4:                       │
│    ┌─┐         ┌─┐         ┌─┐         ┌─┐                          │
│    │ │         │ │         │ │         │ │                          │
│    ├─┤         ├─┤         ├─┤         ├─┤                          │
│   ╱│ │╲       ╲│ │        ╲│ │╱        │ │╱                         │
│   ╱ │ ╲       ╱ │ ╲       ╲ │ ╱       ╲ │ ╱                         │
│  ╱   ╲       │   │         ╲ ╱         │   │                        │
│               Contact      Pass       Contact                        │
│                                                                      │
│  TIMING:                                                            │
│  • Walk cycle: var(--walk-cycle) = 400ms (100ms per frame)          │
│  • Easing: steps(4, end)                                            │
│  • Move speed: ~60px per cycle                                      │
│                                                                      │
│  DIRECTION:                                                         │
│  • Right: Default sprite                                            │
│  • Left: transform: scaleX(-1)                                      │
│                                                                      │
│  TRIGGERS TO OTHER STATES:                                          │
│  • Destination reached → Idle state                                 │
│  • User clicks away → Stop, return to Idle                          │
│  • Floor transition → Continue walking to new position              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.neil-walking {
  animation: neil-walk var(--walk-cycle) steps(4) infinite;
}

@keyframes neil-walk {
  from { background-position: 0 -48px; }     /* Walk row in spritesheet */
  to { background-position: -128px -48px; }  /* 4 frames × 32px */
}

/* Walking with movement */
.neil-walking-right {
  animation: 
    neil-walk var(--walk-cycle) steps(4) infinite,
    neil-move-right 2s linear forwards;
}

@keyframes neil-move-right {
  from { transform: translateX(0); }
  to { transform: translateX(200px); }
}

/* Walking left (mirrored) */
.neil-walking-left {
  transform: scaleX(-1);
  animation: 
    neil-walk var(--walk-cycle) steps(4) infinite,
    neil-move-left 2s linear forwards;
}
```

#### 3. Working State

```
┌─────────────────────────────────────────────────────────────────────┐
│ STATE: NEIL WORKING                                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DESCRIPTION: Neil is focused on a task (loading, processing)       │
│                                                                      │
│  ANIMATION:                                                         │
│  • Seated or standing at workstation                                │
│  • Typing motion (2-frame hand movement)                            │
│  • Occasional head nod                                              │
│                                                                      │
│  SPRITE FRAMES: 4 frames                                            │
│                                                                      │
│  Frame 1-2:   Frame 3-4:                                            │
│    ┌─┐          ┌─┐                                                 │
│    │ │          │ │   ← Head slightly different angle               │
│    ├─┤          ├─┤                                                 │
│    │▄│          │▄│   ← Hands on keyboard (position varies)         │
│   ═════        ═════  ← Desk/workstation                            │
│                                                                      │
│  TIMING:                                                            │
│  • Typing cycle: 200ms                                              │
│  • Head nod: every 2-3 seconds                                      │
│  • Easing: steps(2, end) for typing                                 │
│                                                                      │
│  USE CASES:                                                         │
│  • Content loading (skeleton visible)                               │
│  • Search processing                                                │
│  • Data fetching                                                    │
│                                                                      │
│  TRIGGERS TO OTHER STATES:                                          │
│  • Loading complete → Success gesture → Idle                        │
│  • Error → Working stops, looks up                                  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.neil-working {
  animation: neil-type 200ms steps(2) infinite;
}

@keyframes neil-type {
  from { background-position: 0 -96px; }    /* Working row frame 1 */
  to { background-position: -64px -96px; }  /* Working row frame 2 */
}

/* Head nod overlay */
.neil-working-nod {
  animation: neil-nod 3s ease-in-out infinite;
}

@keyframes neil-nod {
  0%, 80%, 100% { transform: translateY(0); }
  85%, 95% { transform: translateY(1px); }
}
```

#### 4. Pointing State

```
┌─────────────────────────────────────────────────────────────────────┐
│ STATE: NEIL POINTING                                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DESCRIPTION: Neil gestures toward content or UI element            │
│                                                                      │
│  ANIMATION:                                                         │
│  • Arm raises and extends                                           │
│  • Head turns toward target                                         │
│  • Brief hold, then return to idle                                  │
│                                                                      │
│  SPRITE FRAMES: 3 frames (raise → hold → lower)                     │
│                                                                      │
│  Frame 1:     Frame 2:     Frame 3:                                 │
│    ┌─┐          ┌─┐          ┌─┐                                    │
│    │ │          │→│          │ │    ← Head turns                    │
│    ├─┤          ├─╲          ├─┤                                    │
│    │ │          │  ╲──→      │ │    ← Arm extends then retracts     │
│    ╱ ╲          ╱ ╲          ╱ ╲                                     │
│   Idle       Pointing       Idle                                     │
│                                                                      │
│  TIMING:                                                            │
│  • Raise: 150ms ease-out                                            │
│  • Hold: 800ms                                                      │
│  • Lower: 200ms ease-in                                             │
│  • Total: ~1150ms                                                   │
│                                                                      │
│  USE CASES:                                                         │
│  • Drawing attention to new content                                 │
│  • Highlighting recommended floor                                   │
│  • Tutorial guidance                                                │
│                                                                      │
│  DIRECTION VARIANTS:                                                │
│  • Point right (default)                                            │
│  • Point left (mirrored)                                            │
│  • Point up (building view)                                         │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.neil-pointing {
  animation: neil-point 1150ms var(--ease-organic) forwards;
}

@keyframes neil-point {
  0% { background-position: 0 0; }           /* Idle */
  13% { background-position: -32px -144px; } /* Arm raising */
  20%, 80% { background-position: -64px -144px; } /* Pointing (hold) */
  100% { background-position: 0 0; }         /* Return to idle */
}

/* Point direction variants */
.neil-point-left {
  transform: scaleX(-1);
}

.neil-point-up {
  animation: neil-point-up 1150ms var(--ease-organic) forwards;
}

@keyframes neil-point-up {
  0%, 100% { background-position: 0 0; }
  20%, 80% { background-position: -96px -144px; } /* Pointing up frame */
}
```

#### 5. Looking State

```
┌─────────────────────────────────────────────────────────────────────┐
│ STATE: NEIL LOOKING                                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DESCRIPTION: Neil's attention is drawn by user cursor/interaction  │
│                                                                      │
│  ANIMATION:                                                         │
│  • Head turns toward point of interest                              │
│  • Eyes track cursor (subtle, not creepy)                           │
│  • Returns to forward when cursor leaves                            │
│                                                                      │
│  SPRITE FRAMES: 3 frames (left, center, right)                      │
│                                                                      │
│  Look Left:   Center:    Look Right:                                │
│    ┌─┐          ┌─┐          ┌─┐                                    │
│    │←│          │ │          │→│                                    │
│    ├─┤          ├─┤          ├─┤                                    │
│    │ │          │ │          │ │                                    │
│    ╱ ╲          ╱ ╲          ╱ ╲                                     │
│                                                                      │
│  TIMING:                                                            │
│  • Turn: 150ms ease-out                                             │
│  • Return delay: 1s after cursor leaves                             │
│  • Return: 200ms ease-in                                            │
│                                                                      │
│  TRIGGER ZONE:                                                      │
│  • Activates when cursor within 150px radius of Neil                │
│  • Direction based on cursor position relative to Neil              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**JavaScript + CSS Implementation:**

```javascript
// Look direction based on cursor position
const neilElement = document.querySelector('.neil');
const lookThreshold = 150; // px

document.addEventListener('mousemove', (e) => {
  const neilRect = neilElement.getBoundingClientRect();
  const neilCenter = {
    x: neilRect.left + neilRect.width / 2,
    y: neilRect.top + neilRect.height / 2
  };
  
  const distance = Math.hypot(e.clientX - neilCenter.x, e.clientY - neilCenter.y);
  
  if (distance < lookThreshold) {
    const direction = e.clientX < neilCenter.x ? 'left' : 'right';
    neilElement.dataset.look = direction;
  } else {
    neilElement.dataset.look = 'center';
  }
});
```

```css
.neil[data-look="center"] {
  background-position: 0 0;
  transition: background-position 150ms var(--ease-standard);
}

.neil[data-look="left"] {
  background-position: -32px 0;
}

.neil[data-look="right"] {
  background-position: -64px 0;
}
```

### Neil State Transition Matrix

| From State | Event | To State | Transition Duration |
|------------|-------|----------|---------------------|
| Idle | Cursor nearby | Looking | 150ms |
| Idle | Navigation trigger | Walking | Immediate |
| Idle | Content loading | Working | 200ms |
| Idle | Click on Neil | Pointing | 150ms |
| Looking | Cursor leaves | Idle | 200ms (after 1s delay) |
| Walking | Destination reached | Idle | 200ms |
| Walking | User cancels | Idle | 150ms (stop in place) |
| Working | Load complete | Idle (via success) | 300ms |
| Working | Load error | Looking up | 200ms |
| Pointing | Animation complete | Idle | 200ms |

---

## Leela: The Corgi Companion

### Character Reference

```
┌─────────────────────────────────────────────────────────────────────┐
│                      LEELA VISUAL REFERENCE                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                  ╱╲  ╱╲                                              │
│                 │  ▼  │  ← Expressive ears (up, down, perked)       │
│                 └──┬──┘                                              │
│                 ┌──┴──┐                                              │
│                 │ ●.● │  ← Brown/white face, alert eyes             │
│                 └──┬──┘                                              │
│             ┌──────┴──────┐                                         │
│             │  ★ BANDANA ★│  ← Star-patterned bandana (signature)   │
│             └──────┬──────┘                                         │
│         ┌──────────┴──────────┐                                     │
│         │      FLUFFY BODY    │  ← Corgi proportions (long, low)    │
│         └────┬─────────┬──────┘                                     │
│             ╱╲         ╱╲    ～～～ ← Expressive tail                │
│            Stubby corgi legs                                        │
│                                                                      │
│   Pixel dimensions: 40×24px (standard), 80×48px (detailed)          │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Leela State Definitions

#### 1. Idle State

```
┌─────────────────────────────────────────────────────────────────────┐
│ STATE: LEELA IDLE                                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DESCRIPTION: Leela rests contentedly, occasional ear flicks        │
│                                                                      │
│  ANIMATION:                                                         │
│  • Gentle breathing (body rise/fall)                                │
│  • Occasional ear twitch (every 5-8 seconds)                        │
│  • Slow tail wag (every 10-15 seconds, 2-3 wags)                    │
│                                                                      │
│  SPRITE FRAMES: 2 frames                                            │
│                                                                      │
│  Frame 1:          Frame 2:                                         │
│    ╱╲  ╱╲           ╱╲  ╱╲                                           │
│   │  ▼  │          │  ▼  │                                           │
│   │ ●.● │          │ ●.● │                                           │
│   └─────┘          └─────┘                                           │
│   │░░░░░│          │░░░░░│   ← Body slightly raised                 │
│   ╱╲   ╱╲  ～      ╱╲   ╱╲  ～～  ← Tail position varies             │
│                                                                      │
│  TIMING:                                                            │
│  • Breathing cycle: 1200ms                                          │
│  • Ear twitch: 150ms (randomized interval)                          │
│  • Tail wag: 300ms per wag                                          │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.leela-idle {
  animation: leela-breathe 1200ms steps(2) infinite;
}

@keyframes leela-breathe {
  0%, 100% { background-position: 0 0; }
  50% { background-position: -40px 0; }
}

/* Ear twitch overlay */
.leela-ear {
  animation: leela-ear-twitch 6s step-end infinite;
}

@keyframes leela-ear-twitch {
  0%, 90%, 100% { background-position: 0 -24px; }
  92%, 94% { background-position: -40px -24px; }
}

/* Tail wag (triggered occasionally) */
.leela-tail-wag {
  animation: leela-wag 300ms ease-in-out 3;
}

@keyframes leela-wag {
  0%, 100% { background-position: 0 -48px; }
  50% { background-position: -40px -48px; }
}
```

#### 2. Walking State

```
┌─────────────────────────────────────────────────────────────────────┐
│ STATE: LEELA WALKING                                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DESCRIPTION: Leela trots alongside Neil or independently           │
│                                                                      │
│  ANIMATION:                                                         │
│  • 4-frame trot cycle (corgi waddle)                                │
│  • Ears bounce with each step                                       │
│  • Tail maintains happy position                                    │
│                                                                      │
│  SPRITE FRAMES: 4 frames                                            │
│                                                                      │
│  Frame 1-4: Classic corgi trot with signature wobble                │
│                                                                      │
│  TIMING:                                                            │
│  • Walk cycle: 350ms (slightly faster than Neil - eager!)           │
│  • Easing: steps(4, end)                                            │
│                                                                      │
│  BEHAVIOR:                                                          │
│  • Usually follows 20-30px behind Neil                              │
│  • May run ahead occasionally (playful variant)                     │
│  • Stops when Neil stops (with slight overshoot)                    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.leela-walking {
  animation: leela-trot 350ms steps(4) infinite;
}

@keyframes leela-trot {
  from { background-position: 0 -72px; }
  to { background-position: -160px -72px; }
}

/* Following Neil */
.leela-following {
  animation: 
    leela-trot 350ms steps(4) infinite,
    leela-follow 2s linear forwards;
}

@keyframes leela-follow {
  from { transform: translateX(0); }
  to { transform: translateX(170px); } /* 30px behind Neil's 200px */
}
```

#### 3. Sleeping State

```
┌─────────────────────────────────────────────────────────────────────┐
│ STATE: LEELA SLEEPING                                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DESCRIPTION: Leela curled up, peacefully asleep                    │
│                                                                      │
│  ANIMATION:                                                         │
│  • Gentle breathing (rise/fall)                                     │
│  • Occasional sleep twitch (dreaming)                               │
│  • "Zzz" particles (optional, pixel-style)                          │
│                                                                      │
│  SPRITE FRAMES: 2 frames                                            │
│                                                                      │
│  Frame 1:          Frame 2:                                         │
│   ┌─────────┐      ┌─────────┐                                      │
│   │  ～～   │      │  ～～   │   ← Curled tail                       │
│   │ ∪ ●-● ∪│      │ ∪ ●-● ∪│   ← Eyes closed                       │
│   │ ░░░░░░ │      │ ░░░░░░ │   ← Body slightly rises                │
│   └─────────┘      └─────────┘                                      │
│           z             z z   ← Zzz particles                        │
│                                                                      │
│  TIMING:                                                            │
│  • Breathing cycle: 2000ms (slower than awake)                      │
│  • Dream twitch: every 8-12 seconds                                 │
│                                                                      │
│  USE CASES:                                                         │
│  • User idle for extended period (3+ minutes)                       │
│  • Late night hours (if time-aware)                                 │
│  • 404/empty states                                                 │
│                                                                      │
│  TRIGGERS TO OTHER STATES:                                          │
│  • User interaction → Alert state (wake up)                         │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.leela-sleeping {
  animation: leela-sleep-breathe 2000ms steps(2) infinite;
}

@keyframes leela-sleep-breathe {
  0%, 100% { background-position: 0 -96px; }
  50% { background-position: -40px -96px; }
}

/* Zzz particles */
.leela-zzz {
  position: absolute;
  animation: zzz-float 2s ease-out infinite;
}

@keyframes zzz-float {
  0% { 
    opacity: 1; 
    transform: translateY(0) translateX(0); 
  }
  100% { 
    opacity: 0; 
    transform: translateY(-20px) translateX(10px); 
  }
}
```

#### 4. Alert State

```
┌─────────────────────────────────────────────────────────────────────┐
│ STATE: LEELA ALERT                                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DESCRIPTION: Leela's attention is caught by something              │
│                                                                      │
│  ANIMATION:                                                         │
│  • Ears perk up instantly                                           │
│  • Head tilts (curious)                                             │
│  • Tail goes up and stiff                                           │
│  • May bark (visual only: "!" bubble)                               │
│                                                                      │
│  SPRITE FRAMES: 2 frames                                            │
│                                                                      │
│  Frame 1 (perk):   Frame 2 (tilt):                                  │
│     ╱╲  ╱╲           ╱╲  ╱╲                                          │
│    │  ▲  │          │  ▲  │  ← Ears fully up                        │
│    │ ●.● │          │ ●.●│   ← Head tilted                          │
│    └─────┘          └────╱                                           │
│    │░░░░░│          │░░░░░│                                          │
│    ╱╲   ╱╲  ！      ╱╲   ╱╲  ！  ← Tail up, "!" indicator            │
│                                                                      │
│  TIMING:                                                            │
│  • Perk up: 100ms (instant)                                         │
│  • Head tilt: 150ms ease-out                                        │
│  • Hold: 500-1000ms                                                 │
│  • Return to idle: 300ms                                            │
│                                                                      │
│  USE CASES:                                                         │
│  • New content loaded                                               │
│  • Error occurred (worried alert)                                   │
│  • Easter egg discovered                                            │
│  • User returns after idle                                          │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.leela-alert {
  animation: leela-perk 100ms var(--ease-snap) forwards;
}

@keyframes leela-perk {
  from { background-position: 0 0; }
  to { background-position: 0 -120px; } /* Alert row */
}

.leela-alert-tilt {
  animation: 
    leela-perk 100ms var(--ease-snap) forwards,
    leela-tilt 150ms var(--ease-bounce) 100ms forwards;
}

@keyframes leela-tilt {
  from { background-position: 0 -120px; }
  to { background-position: -40px -120px; }
}

/* "!" indicator */
.leela-alert::after {
  content: '!';
  position: absolute;
  top: -10px;
  right: -5px;
  font-family: 'VT323', monospace;
  font-size: 12px;
  animation: alert-pop 200ms var(--ease-bounce);
}

@keyframes alert-pop {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
```

#### 5. Playful State

```
┌─────────────────────────────────────────────────────────────────────┐
│ STATE: LEELA PLAYFUL                                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DESCRIPTION: Leela is excited and wants to play                    │
│                                                                      │
│  ANIMATION:                                                         │
│  • Play bow (front down, butt up)                                   │
│  • Rapid tail wag                                                   │
│  • May include small hop                                            │
│                                                                      │
│  SPRITE FRAMES: 4 frames                                            │
│                                                                      │
│  Frame 1:     Frame 2:     Frame 3:     Frame 4:                    │
│    ╱╲  ╱╲      ╱╲  ╱╲      ╱╲  ╱╲      ╱╲  ╱╲                       │
│   │  ▼  │    │  ▼  │    │  ▼  │    │  ▼  │                          │
│   │ ●.● │    │ ●.● │    │ ●.● │    │ ●.● │                          │
│   └─╲   │    └─╲   │    └─╲   │    └─╲   │                          │
│      ╲──┘       ╲──┘       ╲──┘       ╲──┘    ← Play bow             │
│    ╱╲   ～～   ╱╲  ～～～  ╱╲   ～～  ╱╲  ～～～                      │
│                          ↑ Rapid tail wagging                        │
│                                                                      │
│  TIMING:                                                            │
│  • Play bow: 200ms ease-out                                         │
│  • Tail wag: 100ms per wag (fast!)                                  │
│  • Full cycle: 600ms                                                │
│                                                                      │
│  USE CASES:                                                         │
│  • Easter egg found                                                 │
│  • Achievement unlocked                                             │
│  • User completes all floors in building                            │
│  • Click on Leela directly                                          │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.leela-playful {
  animation: leela-playbow 600ms var(--ease-bounce);
}

@keyframes leela-playbow {
  0% { background-position: 0 0; }
  15% { background-position: 0 -144px; }      /* Bow start */
  30%, 80% { background-position: -40px -144px; } /* Bow hold */
  100% { background-position: 0 0; }           /* Return */
}

/* Fast tail wag during play */
.leela-playful .leela-tail {
  animation: leela-wag-fast 100ms ease-in-out infinite;
}

@keyframes leela-wag-fast {
  0%, 100% { transform: rotate(-15deg); }
  50% { transform: rotate(15deg); }
}
```

### Leela State Transition Matrix

| From State | Event | To State | Transition Duration |
|------------|-------|----------|---------------------|
| Idle | Neil walks | Walking | Immediate |
| Idle | User idle 3min | Sleeping | 500ms |
| Idle | User interaction nearby | Alert | 100ms |
| Idle | Easter egg found | Playful | 100ms |
| Idle | Click on Leela | Playful | 100ms |
| Walking | Neil stops | Idle | 200ms (overshoot) |
| Sleeping | Any user interaction | Alert | 150ms |
| Alert | No further event | Idle | 300ms (after 1s) |
| Alert | Positive event | Playful | 100ms |
| Playful | Animation complete | Idle | 200ms |

---

## Character Interaction Patterns

### Neil + Leela Together

```
┌─────────────────────────────────────────────────────────────────────┐
│                   TOGETHER CHOREOGRAPHY                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  STANDING TOGETHER:                                                 │
│  • Leela at Neil's feet, facing same direction                      │
│  • Idle animations offset (not synchronized)                        │
│  • Leela looks up at Neil occasionally                              │
│                                                                      │
│       ┌─┐                                                           │
│       │ │                                                           │
│       ├─┤                                                           │
│       │ │                                                           │
│       ╱ ╲                                                            │
│    ╱╲  ╱╲                                                            │
│   │  ▼  │  ← Leela at Neil's feet                                   │
│   └─────┘                                                            │
│                                                                      │
│  WALKING TOGETHER:                                                  │
│  • Neil leads, Leela follows 20-30px behind                         │
│  • Leela's walk is slightly faster (catches up)                     │
│  • Leela may run ahead briefly, then wait                           │
│                                                                      │
│  ARRIVAL:                                                           │
│  • Neil stops first                                                 │
│  • Leela overshoots slightly, turns around                          │
│  • Both settle into idle                                            │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Placement Guidelines

| View | Neil Position | Leela Position |
|------|---------------|----------------|
| City View | Near Central Station | At Neil's feet |
| District View | By train station | At Neil's feet or exploring |
| Building View | On current floor (highlighted) | On random floor or with Neil |
| Floor View | Reading corner (if space) | Curled up nearby or exploring page |
| Loading | Working at desk | Sleeping or watching Neil |
| Error | Looking confused | Alert, concerned |
| 404 | Searching | Helping search (sniffing) |

---

## Sprite Sheet Specifications

### Neil Sprite Sheet

```
┌─────────────────────────────────────────────────────────────────────┐
│                    NEIL SPRITE SHEET LAYOUT                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Dimensions: 32px × 48px per frame                                  │
│  Total sheet: 192px × 192px (6 columns × 4 rows)                    │
│                                                                      │
│  ┌────┬────┬────┬────┬────┬────┐                                    │
│  │Idle│Idle│Look│Look│Look│Blink│  Row 0: Idle + Look states        │
│  │ 1  │ 2  │ L  │ C  │ R  │    │                                    │
│  ├────┼────┼────┼────┼────┼────┤                                    │
│  │Walk│Walk│Walk│Walk│    │    │  Row 1: Walk cycle                 │
│  │ 1  │ 2  │ 3  │ 4  │    │    │                                    │
│  ├────┼────┼────┼────┼────┼────┤                                    │
│  │Work│Work│Work│Work│    │    │  Row 2: Working states             │
│  │ 1  │ 2  │ 3  │ 4  │    │    │                                    │
│  ├────┼────┼────┼────┼────┼────┤                                    │
│  │Pnt │Pnt │Pnt │PntU│    │    │  Row 3: Pointing variants          │
│  │Rse │Hold│Lwr │ p  │    │    │                                    │
│  └────┴────┴────┴────┴────┴────┘                                    │
│                                                                      │
│  Additional rows for: Success, Error, Special                       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Leela Sprite Sheet

```
┌─────────────────────────────────────────────────────────────────────┐
│                   LEELA SPRITE SHEET LAYOUT                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Dimensions: 40px × 24px per frame                                  │
│  Total sheet: 160px × 168px (4 columns × 7 rows)                    │
│                                                                      │
│  ┌─────┬─────┬─────┬─────┐                                          │
│  │Idle │Idle │ Ear │ Ear │  Row 0: Idle states                      │
│  │  1  │  2  │Twch1│Twch2│                                          │
│  ├─────┼─────┼─────┼─────┤                                          │
│  │Walk │Walk │Walk │Walk │  Row 1: Walk/Trot cycle                  │
│  │  1  │  2  │  3  │  4  │                                          │
│  ├─────┼─────┼─────┼─────┤                                          │
│  │Sleep│Sleep│Dream│Dream│  Row 2: Sleeping states                  │
│  │  1  │  2  │  1  │  2  │                                          │
│  ├─────┼─────┼─────┼─────┤                                          │
│  │Alert│Alert│Alert│    │  Row 3: Alert states                      │
│  │Perk │Tilt │Bark │    │                                          │
│  ├─────┼─────┼─────┼─────┤                                          │
│  │Play │Play │Play │Play │  Row 4: Playful states                   │
│  │Bow1 │Bow2 │Hop1 │Hop2 │                                          │
│  ├─────┼─────┼─────┼─────┤                                          │
│  │Tail │Tail │Tail │Tail │  Row 5: Tail positions (overlay)         │
│  │Down │Mid  │ Up  │Wag  │                                          │
│  ├─────┼─────┼─────┼─────┤                                          │
│  │Spec │Spec │Spec │Spec │  Row 6: Special/Easter eggs              │
│  │  1  │  2  │  3  │  4  │                                          │
│  └─────┴─────┴─────┴─────┘                                          │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Notes

### CSS Animation Approach (Recommended)

Use CSS sprite sheet animations with `steps()` timing for pixel-perfect frame control:

```css
.character {
  width: 32px;
  height: 48px;
  background-image: url('neil-spritesheet.png');
  background-repeat: no-repeat;
  image-rendering: pixelated; /* Crisp pixel scaling */
  image-rendering: crisp-edges;
}
```

### Scaling for Different Views

```css
/* Standard size */
.character { transform: scale(1); }

/* City view (smaller, zoomed out) */
.city-view .character { transform: scale(0.75); }

/* Building view (standard) */
.building-view .character { transform: scale(1); }

/* Floor view (larger if featured) */
.floor-view .character { transform: scale(1.5); }
```

### Performance Considerations

1. **Use `will-change` sparingly**: Only on actively animating elements
2. **Pause animations when off-screen**: Use Intersection Observer
3. **Single sprite sheet per character**: Minimize HTTP requests
4. **GPU-accelerated transforms**: Use `transform`, not `background-position` for movement

```javascript
// Pause character animations when off-screen
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    } else {
      entry.target.style.animationPlayState = 'paused';
    }
  });
});

observer.observe(document.querySelector('.neil'));
observer.observe(document.querySelector('.leela'));
```

---

## Reduced Motion Support

All character animations have simplified alternatives:

| Animation | Full Motion | Reduced Motion |
|-----------|------------|----------------|
| Idle breathing | 2-frame cycle | Static frame |
| Walking | 4-frame cycle + movement | Instant position change |
| Looking | Head turn animation | Instant direction change |
| Alert | Ear perk + tilt | Static alert pose |
| Playful | Play bow + tail wag | Static happy pose |
| Sleeping | Breathing + Zzz | Static sleep pose |

```css
@media (prefers-reduced-motion: reduce) {
  .neil,
  .leela {
    animation: none !important;
  }
  
  .neil.walking,
  .leela.walking {
    transition: transform 0ms;
  }
  
  /* Show appropriate static frame based on state */
  .neil.idle { background-position: 0 0; }
  .leela.alert { background-position: 0 -120px; }
}
```

---

## Integration Notes

### For Frontend Developer
- Implement sprite sheet loading strategy
- Handle state transitions with JavaScript
- Ensure characters are keyboard-accessible (not interactive, but not blocking)
- Use CSS containment for performance

### For Visual Designer
- Create sprite sheets at 2x for retina displays
- Ensure consistent pixel grid alignment
- Document color palette for district variations
- Provide shadow/glow variations for different contexts

### For QA Specialist
- Test all state transitions
- Verify reduced motion mode
- Test character positions across breakpoints
- Verify no layout shifts from character animations

---

*Character animations designed for Neil's City Site. Neil and Leela bring warmth and personality without stealing focus from content.*
