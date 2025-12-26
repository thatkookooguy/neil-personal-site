# Train Animation: Neil's City Site

**Date Created**: December 26, 2025  
**Last Updated**: December 26, 2025  
**Purpose**: Define animation specifications for the train system including continuous motion, station behaviors, and interaction patterns

---

## Train Animation Philosophy

### The Train's Role

The train is both a **navigation element** and a **character** of the city. It:

1. **Connects districts** visually and functionally
2. **Shows journey** between locations (not just teleportation)
3. **Adds life** to the city even when idle
4. **Reinforces the city metaphor** as the primary wayfinding element

### Animation Principles for the Train

| Principle | Application |
|-----------|-------------|
| **Weight** | Train has mass—accelerates slowly, decelerates slowly |
| **Momentum** | Follows through on stops, subtle bounce at stations |
| **Rhythm** | Consistent travel speed, predictable timing |
| **Life** | Steam/smoke, window lights, subtle vibration when idle |

---

## Train Visual Reference

```
┌─────────────────────────────────────────────────────────────────────┐
│                      TRAIN VISUAL REFERENCE                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                    ╭───────────────────────────╮                    │
│                   ╱  ▓▓▓  ▓▓▓  ▓▓▓  ▓▓▓  ▓▓▓  ╲  ← Windows (lit)   │
│                  │══════════════════════════════│                   │
│      ☁️ ← Steam  │  🚂  N E I L ' S   C I T Y  │  ← Train body      │
│                  │══════════════════════════════│                   │
│                  └──○────────○────────○────────○┘  ← Wheels         │
│                     ═════════════════════════════  ← Track          │
│                                                                      │
│   Isometric view (30° angle):                                       │
│                                                                      │
│                    ╱▓▓▓╱▓▓▓╱▓▓▓╲                                    │
│                   ╱══════════════╲                                   │
│                  │  🚂 CITY LINE │                                   │
│                  │══════════════│                                    │
│                 ╱ ○───○───○───○ ╲                                    │
│                ═══════════════════                                   │
│                                                                      │
│   Dimensions: 120×48px (standard), 240×96px (detailed)              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Continuous Track Motion

### Idle Motion (City View)

When the train is not actively traveling between stations, it exhibits subtle ambient motion.

```
┌─────────────────────────────────────────────────────────────────────┐
│ STATE: TRAIN IDLE (AT STATION)                                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DESCRIPTION: Train rests at station, exhibiting life signs         │
│                                                                      │
│  AMBIENT ANIMATIONS:                                                │
│                                                                      │
│  1. BREATHING (subtle vertical oscillation)                         │
│     • Train body rises/falls 1-2px                                  │
│     • Timing: 3000ms cycle                                          │
│     • Easing: ease-gentle                                           │
│                                                                      │
│  2. STEAM PUFFS (intermittent)                                      │
│     • Smoke particles rise from chimney                             │
│     • Timing: Every 4-6 seconds (randomized)                        │
│     • Duration: 1500ms per puff                                     │
│                                                                      │
│  3. WINDOW GLOW (subtle pulse)                                      │
│     • Windows brightness varies slightly                            │
│     • Timing: 4000ms cycle                                          │
│     • Range: opacity 0.8 → 1.0                                      │
│                                                                      │
│  4. WHEEL MICRO-ROTATION (pixel-style)                              │
│     • 2-frame animation, very slow                                  │
│     • Timing: 2000ms cycle                                          │
│     • Suggests readiness to move                                    │
│                                                                      │
│  SOUND SYNC (if audio enabled):                                     │
│     • Low idle hum                                                  │
│     • Occasional steam hiss with puffs                              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
/* Train idle breathing */
.train-idle {
  animation: train-breathe 3000ms var(--ease-gentle) infinite;
}

@keyframes train-breathe {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1px); }
}

/* Window glow pulse */
.train-windows {
  animation: window-glow 4000ms var(--ease-gentle) infinite;
}

@keyframes window-glow {
  0%, 100% { opacity: 0.85; }
  50% { opacity: 1; }
}

/* Wheel micro-rotation (pixel style) */
.train-wheels {
  animation: wheel-idle 2000ms steps(2) infinite;
}

@keyframes wheel-idle {
  0%, 50% { background-position: 0 0; }
  51%, 100% { background-position: -16px 0; }
}
```

### Steam Particle System

```
┌─────────────────────────────────────────────────────────────────────┐
│                     STEAM PUFF ANIMATION                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  PARTICLE BEHAVIOR:                                                 │
│                                                                      │
│  t=0ms        t=500ms       t=1000ms      t=1500ms                  │
│                                                                      │
│                              ○ (fade)                               │
│                  ○            ○                                      │
│      ☁️         ○  ○          ○                                      │
│      │          │   ○                                                │
│    ──┼──      ──┼──         ──┼──         ──┼──                      │
│      │          │             │             │                        │
│                                                                      │
│  PROPERTIES:                                                        │
│  • Spawn: Above chimney (offset: -10px, -5px)                       │
│  • Movement: Up + slight drift (random -5px to +5px X)              │
│  • Scale: Start 0.5, grow to 1.2                                    │
│  • Opacity: Start 0.8, fade to 0                                    │
│  • Particles per puff: 2-4                                          │
│  • Stagger: 150ms between particles                                 │
│                                                                      │
│  TIMING:                                                            │
│  • Single particle lifetime: 1500ms                                 │
│  • Puff interval: 4-6 seconds (randomized)                          │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.steam-puff {
  position: absolute;
  top: -10px;
  left: 15px;
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: steam-rise 1500ms var(--ease-gentle) forwards;
}

@keyframes steam-rise {
  0% {
    opacity: 0.8;
    transform: translateY(0) translateX(0) scale(0.5);
  }
  100% {
    opacity: 0;
    transform: translateY(-30px) translateX(var(--drift-x, 5px)) scale(1.2);
  }
}

/* Staggered particles */
.steam-puff:nth-child(1) { animation-delay: 0ms; --drift-x: -3px; }
.steam-puff:nth-child(2) { animation-delay: 150ms; --drift-x: 5px; }
.steam-puff:nth-child(3) { animation-delay: 300ms; --drift-x: -5px; }
```

**JavaScript for Random Puffs:**

```javascript
function createSteamPuff() {
  const train = document.querySelector('.train');
  const puff = document.createElement('div');
  puff.className = 'steam-puff';
  puff.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 10}px`);
  train.appendChild(puff);
  
  // Remove after animation
  setTimeout(() => puff.remove(), 1500);
}

// Random interval between puffs
function schedulePuff() {
  const interval = 4000 + Math.random() * 2000; // 4-6 seconds
  setTimeout(() => {
    if (document.querySelector('.train-idle')) {
      createSteamPuff();
    }
    schedulePuff();
  }, interval);
}

schedulePuff();
```

---

## Station Arrivals & Departures

### Departure Sequence

```
┌─────────────────────────────────────────────────────────────────────┐
│               TRAIN DEPARTURE SEQUENCE                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  t=0ms: DEPARTURE TRIGGER                                           │
│  ├─ User clicks district or train station menu                      │
│  ├─ Train state: idle → departing                                   │
│  └─ Destination locked in                                           │
│                                                                      │
│  t=0-100ms: ANTICIPATION                                            │
│  ├─ Train pulls back slightly (anticipate: -5px)                    │
│  ├─ Steam burst (larger puff)                                       │
│  └─ Easing: ease-anticipate                                         │
│                                                                      │
│  ┌────────────────────────────────────────────┐                     │
│  │   ☁️ ☁️                                    │                     │
│  │  ←🚂═══════════════════════════           │  Train pulls back    │
│  │  ════════════════════════════════         │                     │
│  └────────────────────────────────────────────┘                     │
│                                                                      │
│  t=100-300ms: ACCELERATION                                          │
│  ├─ Train begins forward motion                                     │
│  ├─ Speed increases (ease-out curve)                                │
│  ├─ Wheels spin faster (4-frame cycle, 150ms)                       │
│  └─ More frequent steam puffs                                       │
│                                                                      │
│  t=300ms+: CRUISING                                                 │
│  ├─ Constant velocity achieved                                      │
│  ├─ Wheels at full speed (100ms cycle)                              │
│  ├─ Steady steam                                                    │
│  └─ Parallax elements move at different speeds                      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
/* Departure sequence */
.train-departing {
  animation: train-depart var(--duration-dramatic) var(--ease-anticipate) forwards;
}

@keyframes train-depart {
  0% {
    transform: translateX(0);
  }
  8% {
    transform: translateX(-5px); /* Anticipation pullback */
  }
  15% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(var(--destination-offset));
  }
}

/* Wheel acceleration */
.train-departing .train-wheels {
  animation: wheel-accelerate var(--duration-dramatic) linear forwards;
}

@keyframes wheel-accelerate {
  0% {
    animation-duration: 400ms; /* Slow start */
  }
  30% {
    animation-duration: 150ms; /* Accelerating */
  }
  100% {
    animation-duration: 100ms; /* Cruising speed */
  }
}

/* Steam burst on departure */
.train-departing .steam-burst {
  animation: steam-burst 300ms var(--ease-standard);
}

@keyframes steam-burst {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(2) translateY(-20px);
    opacity: 0;
  }
}
```

### Arrival Sequence

```
┌─────────────────────────────────────────────────────────────────────┐
│                TRAIN ARRIVAL SEQUENCE                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  t=journey-200ms: DECELERATION                                      │
│  ├─ Train begins slowing                                            │
│  ├─ Speed decreases (ease-in curve into stop)                       │
│  ├─ Wheels slow down (100ms → 200ms → 400ms cycle)                  │
│  └─ Easing: ease-organic                                            │
│                                                                      │
│  t=journey-50ms: BRAKING                                            │
│  ├─ Train almost stopped                                            │
│  ├─ Subtle forward lean (inertia)                                   │
│  └─ Steam release (pressure release)                                │
│                                                                      │
│  ┌────────────────────────────────────────────┐                     │
│  │                           ☁️ ☁️            │                     │
│  │           ═══════════════🚂→               │  Train arrives      │
│  │  ════════════════════════════════          │                     │
│  │  ●●●●●●●●●●● PLATFORM ●●●●●●●●●●          │                     │
│  └────────────────────────────────────────────┘                     │
│                                                                      │
│  t=journey: STOP                                                    │
│  ├─ Train at exact station position                                 │
│  ├─ Subtle bounce/settle (overshoot then correct)                   │
│  ├─ Easing: ease-bounce                                             │
│  └─ State: departing → arrived → idle                               │
│                                                                      │
│  t=journey+100ms: SETTLE                                            │
│  ├─ Train settles into idle animation                               │
│  ├─ Doors open (if visible at this zoom)                            │
│  └─ Sound: Bell chime (optional)                                    │
│                                                                      │
│  t=journey+200ms: READY                                             │
│  ├─ District view fully interactive                                 │
│  ├─ Train returns to idle state                                     │
│  └─ User can navigate or travel again                               │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
/* Arrival with settle */
.train-arriving {
  animation: train-arrive var(--duration-slow) var(--ease-organic) forwards;
}

@keyframes train-arrive {
  0% {
    transform: translateX(var(--approach-offset));
  }
  80% {
    transform: translateX(5px); /* Overshoot */
  }
  90% {
    transform: translateX(-2px); /* Bounce back */
  }
  100% {
    transform: translateX(0); /* Settle */
  }
}

/* Wheel deceleration */
.train-arriving .train-wheels {
  animation: wheel-decelerate var(--duration-slow) linear forwards;
}

@keyframes wheel-decelerate {
  0% {
    animation-duration: 100ms;
  }
  50% {
    animation-duration: 200ms;
  }
  100% {
    animation-duration: 400ms;
  }
}
```

---

## Speed, Rhythm & Timing

### Journey Duration Calculation

```javascript
// Station positions on the circular track
const STATIONS = {
  'central':       { position: 0, name: 'Central Station' },
  'ai':            { position: 1, name: 'AI District' },
  'architecture':  { position: 2, name: 'Architecture District' },
  'dx':            { position: 3, name: 'DX District' },
  'infrastructure': { position: 4, name: 'Infrastructure District' },
  'opensource':    { position: 5, name: 'Open Source District' }
};

const TOTAL_STATIONS = 6;
const BASE_DURATION = 800;  // ms for 1 station
const PER_STATION = 150;    // ms added per station traveled
const MAX_DURATION = 1500;  // Cap for very long journeys

function calculateJourneyDuration(from, to) {
  const fromPos = STATIONS[from].position;
  const toPos = STATIONS[to].position;
  
  // Calculate shortest path (circular track)
  const clockwise = (toPos - fromPos + TOTAL_STATIONS) % TOTAL_STATIONS;
  const counterclockwise = (fromPos - toPos + TOTAL_STATIONS) % TOTAL_STATIONS;
  const distance = Math.min(clockwise, counterclockwise);
  
  const duration = BASE_DURATION + (distance * PER_STATION);
  return Math.min(duration, MAX_DURATION);
}

// Examples:
// central → ai: 950ms (1 station)
// central → architecture: 1100ms (2 stations)
// central → opensource: 950ms (1 station, going backwards)
// ai → infrastructure: 1250ms (3 stations)
```

### Speed Profile

```
┌─────────────────────────────────────────────────────────────────────┐
│                   TRAIN SPEED PROFILE                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Speed                                                              │
│    │                                                                │
│    │         ┌─────────────────────────┐                            │
│    │        ╱                           ╲                           │
│    │       ╱ Cruising speed              ╲                          │
│    │      ╱                               ╲                         │
│    │     ╱                                 ╲                        │
│    │    ╱                                   ╲                       │
│    │   ╱                                     ╲                      │
│    │  ╱ Acceleration                Deceleration                    │
│    │ ╱                                         ╲                    │
│    └─────────────────────────────────────────────────── Time        │
│      │   │                                   │   │                  │
│      │   Cruising begins                     │   Arrive             │
│      Depart                          Braking begins                 │
│                                                                      │
│  TIMING BREAKDOWN (1000ms journey example):                         │
│  • Acceleration: 0-200ms (20%)                                      │
│  • Cruising: 200-800ms (60%)                                        │
│  • Deceleration: 800-1000ms (20%)                                   │
│                                                                      │
│  EASING BREAKDOWN:                                                  │
│  • Acceleration: cubic-bezier(0.4, 0, 1, 1) — ease-in               │
│  • Cruising: linear                                                 │
│  • Deceleration: cubic-bezier(0, 0, 0.2, 1) — ease-out              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Pixel Distance & Movement

```css
/* Track dimensions (city view) */
:root {
  --track-total-length: 1200px;  /* Full circular track */
  --station-spacing: 200px;      /* Distance between stations */
  --train-cruise-speed: 300px/s; /* Pixels per second at cruise */
}

/* Calculate movement for journey */
.train-journey {
  /* 
   * CSS custom properties set by JavaScript:
   * --journey-distance: total pixels to travel
   * --journey-duration: calculated duration
   * --journey-direction: 1 or -1 (clockwise/counter)
   */
  animation: train-journey var(--journey-duration) linear forwards;
}

@keyframes train-journey {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(var(--journey-distance) * var(--journey-direction)));
  }
}
```

---

## Parallax Layers

### Multi-Layer Track System

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PARALLAX LAYER SYSTEM                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Layer 4 (Foreground):  Train + Steam                               │
│  ═══════════════════════════════════════════════                    │
│  Speed: 1.0x (base movement)                                        │
│                                                                      │
│  Layer 3 (Track):       Track + Stations                            │
│  ──────────────────────────────────────────────                     │
│  Speed: 1.0x (moves with train, stationary relative to train)       │
│                                                                      │
│  Layer 2 (Buildings):   District buildings                          │
│  ▓▓▓    ▓▓▓▓    ▓▓▓    ▓▓▓▓▓                                        │
│  Speed: 0.7x (slower, creates depth)                                │
│                                                                      │
│  Layer 1 (Background):  Sky, clouds, distant elements               │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                          │
│  Speed: 0.3x (slowest, furthest away)                               │
│                                                                      │
│  Layer 0 (Fixed):       UI elements, navigation                     │
│  Speed: 0x (no movement)                                            │
│                                                                      │
│  PARALLAX EFFECT:                                                   │
│  When train moves 100px:                                            │
│  • Layer 4 (Train): 100px                                           │
│  • Layer 3 (Track): 100px                                           │
│  • Layer 2 (Buildings): 70px                                        │
│  • Layer 1 (Background): 30px                                       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
/* Parallax container */
.city-view {
  perspective: 1000px;
  overflow: hidden;
}

/* Background layer (slowest) */
.parallax-background {
  transform: translateZ(-300px) scale(1.3);
  will-change: transform;
}

/* Buildings layer (medium) */
.parallax-buildings {
  transform: translateZ(-100px) scale(1.1);
  will-change: transform;
}

/* Track layer (with train) */
.parallax-track {
  transform: translateZ(0);
}

/* Train (foreground) */
.train {
  transform: translateZ(50px);
  will-change: transform;
}

/* During train journey, apply parallax */
.train-traveling ~ .parallax-background {
  animation: parallax-bg var(--journey-duration) linear forwards;
}

.train-traveling ~ .parallax-buildings {
  animation: parallax-buildings var(--journey-duration) linear forwards;
}

@keyframes parallax-bg {
  to {
    transform: translateZ(-300px) scale(1.3) 
               translateX(calc(var(--journey-distance) * 0.3 * var(--journey-direction)));
  }
}

@keyframes parallax-buildings {
  to {
    transform: translateZ(-100px) scale(1.1) 
               translateX(calc(var(--journey-distance) * 0.7 * var(--journey-direction)));
  }
}
```

### JavaScript Parallax (Scroll-Based Alternative)

```javascript
// For scroll-driven parallax effect
function updateParallax(trainPosition) {
  const layers = [
    { element: '.parallax-background', speed: 0.3 },
    { element: '.parallax-buildings', speed: 0.7 },
    { element: '.parallax-track', speed: 1.0 }
  ];
  
  layers.forEach(({ element, speed }) => {
    const el = document.querySelector(element);
    if (el) {
      el.style.transform = `translateX(${-trainPosition * speed}px)`;
    }
  });
}
```

---

## Click Interactions

### Clickable Areas

```
┌─────────────────────────────────────────────────────────────────────┐
│                 TRAIN CLICK INTERACTIONS                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  HITBOX AREAS:                                                      │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────┐        │
│  │                    TRAIN BODY                            │        │
│  │  ┌─────────────────────────────────────────────────────┐│        │
│  │  │           Click → Open station menu                 ││        │
│  │  │         (shows all destinations)                    ││        │
│  │  └─────────────────────────────────────────────────────┘│        │
│  └─────────────────────────────────────────────────────────┘        │
│                                                                      │
│  ════○══════════════════════════════════════════════════════        │
│      │                                                              │
│  STATION MARKERS:                                                   │
│  Click individual station → Travel directly there                   │
│                                                                      │
│  HOVER STATES:                                                      │
│  • Train body: Subtle glow, cursor: pointer                         │
│  • Station: Highlight, name tooltip                                 │
│  • Track (non-station): cursor: default (not clickable)             │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Hover State

```css
/* Train hover glow */
.train {
  transition: filter var(--duration-fast) var(--ease-standard);
  cursor: pointer;
}

.train:hover {
  filter: brightness(1.1) drop-shadow(0 0 10px rgba(var(--teal-500-rgb), 0.5));
}

/* Station marker hover */
.station-marker {
  transition: 
    transform var(--duration-fast) var(--ease-standard),
    filter var(--duration-fast) var(--ease-standard);
  cursor: pointer;
}

.station-marker:hover {
  transform: scale(1.2);
  filter: brightness(1.2);
}

/* Station tooltip */
.station-marker::after {
  content: attr(data-station-name);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  opacity: 0;
  background: var(--surface-raised);
  padding: var(--space-2) var(--space-3);
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  transition: 
    opacity var(--duration-fast) var(--ease-enter),
    transform var(--duration-fast) var(--ease-enter);
}

.station-marker:hover::after {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
```

### Station Menu

```
┌─────────────────────────────────────────────────────────────────────┐
│                    STATION MENU (DROPDOWN)                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  TRIGGER: Click on train body                                       │
│                                                                      │
│  ┌─────────────────────────────────────┐                            │
│  │  🚂 Travel to...                    │                            │
│  ├─────────────────────────────────────┤                            │
│  │  ○ Central Station                  │  ← Stations listed         │
│  │  ● AI District (current)            │  ← Current highlighted     │
│  │  ○ Architecture District            │                            │
│  │  ○ DX District                      │                            │
│  │  ○ Infrastructure District          │                            │
│  │  ○ Open Source District             │                            │
│  └─────────────────────────────────────┘                            │
│                                                                      │
│  ENTRY ANIMATION:                                                   │
│  • Menu scales from train position                                  │
│  • Timing: 200ms ease-bounce                                        │
│  • Items stagger: 50ms each                                         │
│                                                                      │
│  EXIT ANIMATION:                                                    │
│  • Menu scales down + fades                                         │
│  • Timing: 150ms ease-exit                                          │
│                                                                      │
│  SELECTION:                                                         │
│  • Click station → Close menu → Train departs                       │
│  • Hover: Background highlight                                      │
│  • Keyboard: Arrow keys to navigate, Enter to select                │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
/* Station menu */
.train-menu {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) scale(0.9);
  transform-origin: bottom center;
  opacity: 0;
  background: var(--surface-raised);
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  min-width: 200px;
  pointer-events: none;
  transition: 
    opacity var(--duration-quick) var(--ease-exit),
    transform var(--duration-quick) var(--ease-exit);
}

.train-menu.open {
  opacity: 1;
  transform: translateX(-50%) scale(1);
  pointer-events: auto;
  transition: 
    opacity var(--duration-quick) var(--ease-bounce),
    transform var(--duration-quick) var(--ease-bounce);
}

/* Menu items stagger */
.train-menu.open .menu-item {
  animation: menu-item-enter var(--duration-quick) var(--ease-enter) forwards;
  opacity: 0;
}

.train-menu.open .menu-item:nth-child(1) { animation-delay: 0ms; }
.train-menu.open .menu-item:nth-child(2) { animation-delay: 50ms; }
.train-menu.open .menu-item:nth-child(3) { animation-delay: 100ms; }
.train-menu.open .menu-item:nth-child(4) { animation-delay: 150ms; }
.train-menu.open .menu-item:nth-child(5) { animation-delay: 200ms; }
.train-menu.open .menu-item:nth-child(6) { animation-delay: 250ms; }

@keyframes menu-item-enter {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Current station indicator */
.menu-item[aria-current="location"] {
  background: var(--bg-subtle);
  font-weight: 600;
}

.menu-item[aria-current="location"]::before {
  content: '●';
  margin-right: var(--space-2);
  color: var(--color-primary);
}
```

---

## Train States Summary

### State Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                    TRAIN STATE MACHINE                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                    ┌─────────────┐                                   │
│                    │    IDLE     │                                   │
│                    │  (at station)│                                   │
│                    └──────┬──────┘                                   │
│                           │                                          │
│               User selects destination                               │
│                           │                                          │
│                    ┌──────▼──────┐                                   │
│                    │  DEPARTING  │                                   │
│                    │(anticipation)│                                   │
│                    └──────┬──────┘                                   │
│                           │                                          │
│                   Anticipation complete                              │
│                           │                                          │
│                    ┌──────▼──────┐                                   │
│                    │  TRAVELING  │                                   │
│                    │  (cruising) │                                   │
│                    └──────┬──────┘                                   │
│                           │                                          │
│                   Approaching station                                │
│                           │                                          │
│                    ┌──────▼──────┐                                   │
│                    │  ARRIVING   │                                   │
│                    │ (braking)   │                                   │
│                    └──────┬──────┘                                   │
│                           │                                          │
│                    Arrived + settled                                 │
│                           │                                          │
│                    ┌──────▼──────┐                                   │
│                    │    IDLE     │                                   │
│                    └─────────────┘                                   │
│                                                                      │
│  SPECIAL STATES:                                                    │
│  • MENU_OPEN: Train idle but menu displayed                         │
│  • INTERRUPTED: User clicked new destination mid-journey            │
│  • SKIP: User requested instant travel (no animation)               │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### State Properties

| State | Animation | Interruptible | Audio Cue |
|-------|-----------|---------------|-----------|
| Idle | Breathing, steam, wheel micro-rotation | Yes | Low hum |
| Departing | Anticipation pullback, steam burst | Yes | Whistle |
| Traveling | Full speed, wheel spin, parallax | Yes | Chug rhythm |
| Arriving | Deceleration, brake steam | No (too short) | Bell |
| Menu Open | Idle + menu visible | Yes | Click |

---

## Sound Design Guidelines (Optional)

If audio is enabled (user opt-in):

| Event | Sound | Duration | Volume |
|-------|-------|----------|--------|
| Idle hum | Low ambient loop | Continuous | 20% |
| Steam puff | Soft hiss | 500ms | 30% |
| Departure whistle | Classic train whistle | 800ms | 50% |
| Chugging | Rhythmic chug | Loop during travel | 40% |
| Bell (arrival) | Station bell | 600ms | 40% |
| Menu open | Soft click | 100ms | 25% |

**Sound Accessibility:**
- All sounds paired with visual feedback
- Sounds disabled when `prefers-reduced-motion`
- User toggle to enable/disable
- Never auto-play on first visit

---

## Performance Optimization

### Animation Budget

| Animation | Target FPS | Priority |
|-----------|-----------|----------|
| Train movement | 60fps | Critical |
| Wheel rotation | 30fps acceptable | Medium |
| Steam particles | 30fps acceptable | Low |
| Parallax layers | 60fps | High |

### Optimization Strategies

```css
/* Promote layers for GPU acceleration */
.train,
.parallax-background,
.parallax-buildings {
  will-change: transform;
  transform: translateZ(0);
}

/* Remove will-change after animation */
.train:not(.train-traveling) {
  will-change: auto;
}

/* Reduce particle count on low-end devices */
@media (prefers-reduced-motion: reduce), 
       (update: slow) {
  .steam-puff:nth-child(n+2) {
    display: none;
  }
}
```

```javascript
// Pause animations when off-screen
const trainObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const train = entry.target;
    if (entry.isIntersecting) {
      train.style.animationPlayState = 'running';
    } else {
      train.style.animationPlayState = 'paused';
    }
  });
});

trainObserver.observe(document.querySelector('.train'));
```

---

## Reduced Motion Support

| Full Animation | Reduced Motion Alternative |
|----------------|---------------------------|
| Train journey animation | Instant position change with fade |
| Steam particles | Static steam cloud or none |
| Wheel rotation | Static wheels |
| Parallax movement | Static layers |
| Menu animation | Instant show/hide |
| Departure anticipation | Instant departure |
| Arrival bounce | Instant stop |

```css
@media (prefers-reduced-motion: reduce) {
  .train,
  .train-wheels,
  .steam-puff,
  .parallax-background,
  .parallax-buildings {
    animation: none !important;
    transition: opacity 150ms ease !important;
  }
  
  /* Instant position changes */
  .train-traveling {
    transform: translateX(var(--destination-offset));
  }
  
  /* Simple fade for menu */
  .train-menu {
    transition: opacity 100ms ease;
  }
  
  .train-menu.open {
    opacity: 1;
  }
}
```

---

## Night Mode Train Lighting

### Overview

When the site transitions to dark mode (night), the train transforms from a daytime vehicle to a beacon of warmth traversing the nighttime city. This section defines all lighting effects that activate in night mode.

### Night Mode Visual Reference

```
┌─────────────────────────────────────────────────────────────────────┐
│                    TRAIN NIGHT MODE REFERENCE                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DAYTIME (Light Mode):                                              │
│                    ╭───────────────────────────╮                    │
│                   ╱  ░░░  ░░░  ░░░  ░░░  ░░░  ╲  ← Windows (dim)   │
│      ☁️ ← Steam  │══════════════════════════════│                   │
│                  │  🚂  N E I L ' S   C I T Y  │                    │
│                  │══════════════════════════════│                   │
│                  └──○────────○────────○────────○┘                   │
│                     ═════════════════════════════                   │
│                                                                      │
│  NIGHTTIME (Dark Mode):                                             │
│                                                                      │
│         Headlight beam        Cabin glow                            │
│              ╲                    ↓                                  │
│       ▒▒▒▒▒▒▒╲╭───────────────────────────╮                        │
│      ▒▒▒▒▒▒▒▒╱  ▓▓▓  ▓▓▓  ▓▓▓  ▓▓▓  ▓▓▓  ╲  ← Windows (glowing)   │
│       ▒▒▒▒▒╱ │══════════════════════════════│                       │
│        ▒▒╱   │  🚂  N E I L ' S   C I T Y  │                        │
│              │══════════════════════════════│                       │
│              └──○────────○────────○────────○┘                       │
│                 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ← Track illumination  │
│                                                                      │
│  LIGHTING ELEMENTS:                                                 │
│  1. Headlights (front cone of light)                                │
│  2. Cabin interior glow (warm amber windows)                        │
│  3. Track illumination (soft glow beneath/ahead)                    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Headlights

The train headlights create a warm, inviting cone of light that illuminates the track ahead.

**Properties:**
- **Color**: Warm white (`#FFF8E0`)
- **Shape**: Cone/ellipse extending 60-100px ahead of train
- **Falloff**: Soft gradient from bright center to transparent edges
- **Animation**: Subtle pulse (3s cycle, 0.9 → 1.0 opacity)

```css
/* Headlight container */
.train-headlights {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 40px;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--duration-moderate) var(--ease-gentle);
}

/* Position based on train direction */
.train[data-direction="left"] .train-headlights {
  left: -40px;
}

.train[data-direction="right"] .train-headlights {
  right: -40px;
  transform: translateY(-50%) scaleX(-1);
}

/* Night mode activation */
[data-theme="dark"] .train-headlights {
  opacity: 1;
  animation: headlightPulse 3s var(--ease-gentle) infinite;
}

/* Primary headlight glow */
.train-headlights::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 100% 80% at 100% 50%,
    rgba(255, 248, 224, 0.8) 0%,
    rgba(255, 248, 224, 0.4) 30%,
    rgba(255, 248, 224, 0.1) 60%,
    transparent 100%
  );
}

/* Extended light beam */
.train-headlights::after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 150px;
  height: 60px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 248, 224, 0.15) 50%,
    rgba(255, 248, 224, 0.05) 100%
  );
  clip-path: polygon(100% 30%, 0% 0%, 0% 100%, 100% 70%);
}

/* Left-facing beam */
.train[data-direction="left"] .train-headlights::after {
  left: -100px;
}

/* Right-facing beam */
.train[data-direction="right"] .train-headlights::after {
  right: -100px;
}

@keyframes headlightPulse {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 1; }
}
```

### Cabin Interior Glow

Train windows emit a warm, inviting glow that suggests passengers and activity inside—like the warm lights of the Spirited Away bathhouse.

**Properties:**
- **Color**: Warm amber (`#F5D88A`)
- **Glow**: Box-shadow with soft spread (8-12px)
- **Animation**: Gentle breathing pulse (4s cycle)
- **Inner highlight**: Subtle white inner glow for depth

```css
/* Window base (shared between modes) */
.train-windows {
  transition: 
    filter var(--duration-moderate) var(--ease-gentle),
    box-shadow var(--duration-moderate) var(--ease-gentle);
}

/* Day mode windows */
[data-theme="light"] .train-windows {
  background: rgba(135, 206, 235, 0.3);
  filter: brightness(1);
}

/* Night mode windows - warm glow */
[data-theme="dark"] .train-windows {
  background: #F5D88A;
  filter: brightness(1.4);
  box-shadow: 
    0 0 8px 2px rgba(245, 216, 138, 0.5),
    0 0 16px 4px rgba(245, 216, 138, 0.3),
    inset 0 0 6px rgba(255, 220, 150, 0.4);
  animation: cabinGlow 4s var(--ease-gentle) infinite;
}

@keyframes cabinGlow {
  0%, 100% {
    box-shadow: 
      0 0 8px 2px rgba(245, 216, 138, 0.5),
      0 0 16px 4px rgba(245, 216, 138, 0.3),
      inset 0 0 6px rgba(255, 220, 150, 0.4);
  }
  50% {
    box-shadow: 
      0 0 12px 4px rgba(245, 216, 138, 0.6),
      0 0 20px 6px rgba(245, 216, 138, 0.35),
      inset 0 0 8px rgba(255, 220, 150, 0.5);
  }
}
```

### Track Illumination

A soft glow appears on the tracks beneath and ahead of the train, reflecting the headlight's warm color.

**Properties:**
- **Color**: Matches headlight (`#FFF8E0` at low opacity)
- **Position**: Beneath train body, extending in direction of travel
- **Effect**: Soft blur (4px) for natural light spread
- **Intensity**: Stronger beneath train, fading ahead

```css
/* Track glow element */
.train-track-glow {
  position: absolute;
  bottom: -4px;
  height: 12px;
  opacity: 0;
  filter: blur(4px);
  pointer-events: none;
  transition: opacity var(--duration-moderate) var(--ease-gentle);
}

/* Left-facing train */
.train[data-direction="left"] .train-track-glow {
  left: -60px;
  right: -20px;
  background: linear-gradient(
    90deg,
    rgba(255, 248, 224, 0.05) 0%,
    rgba(255, 248, 224, 0.2) 30%,
    rgba(255, 248, 224, 0.3) 70%,
    rgba(255, 248, 224, 0.1) 100%
  );
}

/* Right-facing train */
.train[data-direction="right"] .train-track-glow {
  left: -20px;
  right: -60px;
  background: linear-gradient(
    90deg,
    rgba(255, 248, 224, 0.1) 0%,
    rgba(255, 248, 224, 0.3) 30%,
    rgba(255, 248, 224, 0.2) 70%,
    rgba(255, 248, 224, 0.05) 100%
  );
}

/* Night mode activation */
[data-theme="dark"] .train-track-glow {
  opacity: 1;
}
```

### Night Mode While Traveling

When the train is in motion during night mode, the lighting effects must coordinate with movement.

```css
/* Traveling at night - enhanced effects */
[data-theme="dark"] .train-traveling .train-headlights {
  /* Slightly brighter during travel */
  opacity: 1;
}

[data-theme="dark"] .train-traveling .train-track-glow {
  /* Track glow extends further during travel */
  opacity: 1;
}

/* Headlight beam animation during travel */
[data-theme="dark"] .train-traveling .train-headlights::after {
  animation: beamSweep 2s var(--ease-gentle) infinite;
}

@keyframes beamSweep {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}
```

### Night Mode State Summary

| State | Headlights | Cabin Glow | Track Glow | Notes |
|-------|------------|------------|------------|-------|
| **Day - Idle** | Off | Dim windows | None | Standard daytime appearance |
| **Day - Traveling** | Off | Dim windows | None | Standard daytime travel |
| **Night - Idle** | On (pulse) | Warm glow (breathe) | Soft glow | Cozy station waiting |
| **Night - Traveling** | On (bright) | Warm glow (steady) | Extended | Illuminates track ahead |
| **Night - Departing** | On + flash | Warm glow | Expands | Dramatic departure |
| **Night - Arriving** | On | Warm glow | Contracts | Settling into station |

### Night Steam Particles

Steam particles at night should be lit by the warm cabin glow:

```css
/* Night steam - warm lit appearance */
[data-theme="dark"] .steam-puff {
  background: rgba(255, 248, 224, 0.7);
  box-shadow: 0 0 4px rgba(255, 248, 224, 0.4);
}

@keyframes steam-rise-night {
  0% {
    opacity: 0.7;
    transform: translateY(0) translateX(0) scale(0.5);
    filter: brightness(1.2);
  }
  100% {
    opacity: 0;
    transform: translateY(-30px) translateX(var(--drift-x, 5px)) scale(1.2);
    filter: brightness(1);
  }
}

[data-theme="dark"] .steam-puff {
  animation: steam-rise-night 1500ms var(--ease-gentle) forwards;
}
```

### Reduced Motion Night Mode

```css
@media (prefers-reduced-motion: reduce) {
  /* Static night lighting */
  [data-theme="dark"] .train-headlights {
    opacity: 1;
    animation: none;
  }
  
  [data-theme="dark"] .train-windows {
    animation: none;
    box-shadow: 
      0 0 8px 2px rgba(245, 216, 138, 0.5),
      0 0 16px 4px rgba(245, 216, 138, 0.3);
  }
  
  [data-theme="dark"] .train-track-glow {
    opacity: 1;
  }
}
```

### Integration with Day/Night Transitions

See [day-night-transitions.md](./day-night-transitions.md) for full details on how train lighting coordinates with the overall theme transition sequence.

**Timing in transition sequence:**
- Train lights activate at t=400ms (after windows illuminate)
- Duration: 300ms fade-in
- Easing: `--ease-gentle`

---

## Integration Notes

### For Frontend Developer
- Use CSS animations for simple states
- Use JavaScript for journey calculation and state management
- Implement intersection observer for performance
- Handle interruption gracefully (cancel current animation, start new)
- Coordinate train night lighting with theme transition orchestrator
- Use `data-theme` attribute to toggle night mode styles
- Ensure headlight direction updates with train direction

### For Visual Designer
- Create sprite sheets for train variants (day and night versions)
- Design station markers for each district
- Create steam particle sprites (day and night variants)
- Provide window lighting variations
- Design headlight beam sprite/gradient
- Create warm glow effect references

### For Sound Designer (Future)
- Keep sounds short and ambient
- Provide multiple format options (mp3, ogg)
- Create loopable chugging rhythm
- Match audio tone to Ghibli warmth
- Consider softer, more atmospheric sounds for night mode
- Train whistle could be slightly mellower at night

### For QA Specialist
- Test all state transitions
- Verify journey calculations for all routes
- Test interruption scenarios
- Verify reduced motion mode
- Test on low-end devices
- **Test night mode lighting in all train states**
- **Verify headlight direction follows train direction**
- **Test theme transition while train is in motion**

---

*Train animation designed for Neil's City Site. The train brings life and continuity to navigation, making exploration feel like a journey—and at night, it becomes a warm beacon traversing the sleeping city.*
