# Day/Night Transitions: Neil's City Site

**Date Created**: December 26, 2025  
**Last Updated**: December 26, 2025  
**Purpose**: Define the animation system for transitioning between light mode (day) and dark mode (night), creating a magical Ghibli-inspired atmospheric shift

---

## Transition Philosophy

### The Ghibli Evening Magic

The day-to-night transition in Neil's City should evoke the feeling of **Spirited Away's bathhouse at dusk**—not a cold, scary darkness, but a warm, inviting evening atmosphere where windows glow with life and the city takes on a new magical character.

> **Key Reference**: The moment in Spirited Away when Chihiro first sees the bathhouse lights turn on as evening falls. Warm amber glows from windows, lanterns flicker to life, and the world transforms from ordinary to enchanted.

### Day vs. Night Personality

| Time | Mood | Color Temperature | Key Elements |
|------|------|-------------------|--------------|
| **Day (Light Mode)** | Productive, clear, optimistic | Warm cream (`#FDF6E3`) | Golden hour light, clear skies, bright windows |
| **Night (Dark Mode)** | Cozy, magical, contemplative | Deep warm brown (`#1A1512`) | Glowing windows, stars, warm interior lights |

### Motion Principles for Theme Transition

1. **Organic Transformation**: The city doesn't "switch"—it transitions like a real sunset
2. **Layered Timing**: Different elements transition at different speeds
3. **Warmth First**: Night is cozy, not cold—warm colors dominate
4. **Life Indicators**: Lights "turn on" with intention, not all at once
5. **Respect User Intent**: Transition should feel intentional but not slow

---

## Transition Overview

### Transition Sequence (Day → Night)

```
┌─────────────────────────────────────────────────────────────────────┐
│                DAY → NIGHT TRANSITION SEQUENCE                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  t=0ms: TRIGGER                                                     │
│  ├─ User toggles theme or system preference changes                 │
│  └─ Transition state: idle → transitioning                          │
│                                                                      │
│  t=0-200ms: SKY BEGINS SHIFT                                        │
│  ├─ Background gradient starts transition                           │
│  ├─ Warm cream → deep warm brown                                    │
│  └─ Subtle: maintains warm undertone throughout                     │
│                                                                      │
│  t=100-400ms: BUILDING SURFACES DARKEN                              │
│  ├─ Building exteriors shift to night palette                       │
│  ├─ Shadows deepen                                                  │
│  └─ Staggered by district (50ms between districts)                  │
│                                                                      │
│  t=200-600ms: WINDOWS ILLUMINATE                                    │
│  ├─ Window lights fade in with warm glow                            │
│  ├─ Staggered randomly (not uniform) for organic feel               │
│  └─ Some windows stay dark (realistic variation)                    │
│                                                                      │
│  t=300-800ms: STARS APPEAR                                          │
│  ├─ Stars fade in with subtle twinkle                               │
│  ├─ Staggered across sky region                                     │
│  └─ Density increases from horizon to zenith                        │
│                                                                      │
│  t=400-700ms: TRAIN LIGHTS ACTIVATE                                 │
│  ├─ Headlights turn on (if train visible)                           │
│  ├─ Interior cabin glow increases                                   │
│  └─ Light beam appears on tracks                                    │
│                                                                      │
│  t=500-800ms: AMBIENT EFFECTS                                       │
│  ├─ District neon/glow effects activate                             │
│  ├─ Streetlamps (if any) turn on                                    │
│  └─ Character elements adjust (Leela's eyes, etc.)                  │
│                                                                      │
│  t=800ms: TRANSITION COMPLETE                                       │
│  └─ State: transitioning → idle (night mode)                        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Transition Sequence (Night → Day)

The reverse sequence uses similar timing but with these differences:
- Windows dim before sky lightens (lights turn off as sun rises)
- Stars fade out early (t=0-300ms)
- Building surfaces brighten after sky begins shift
- Train lights turn off last

---

## Sky Transition

### Day Sky

```json
{
  "day_sky": {
    "gradient": {
      "top": "#87CEEB",
      "mid": "#FDF6E3",
      "bottom": "#FDF6E3"
    },
    "clouds": {
      "opacity": 0.6,
      "color": "#FFFFFF"
    },
    "sun_position": "upper-right",
    "atmosphere": "golden hour warmth"
  }
}
```

### Night Sky

```json
{
  "night_sky": {
    "gradient": {
      "top": "#0A1628",
      "mid": "#1A1512",
      "bottom": "#261D18"
    },
    "stars": {
      "density": "medium",
      "twinkle": true,
      "color": "#F5ECD8"
    },
    "moon": {
      "visible": true,
      "phase": "crescent",
      "glow_color": "#F5ECD8",
      "glow_opacity": 0.3
    },
    "atmosphere": "warm evening glow"
  }
}
```

### Sky Transition Animation

```css
/* Sky gradient transition */
.sky-layer {
  transition: 
    background var(--duration-deliberate) var(--ease-gentle),
    filter var(--duration-deliberate) var(--ease-gentle);
}

/* Day sky */
[data-theme="light"] .sky-layer {
  background: linear-gradient(
    180deg,
    #87CEEB 0%,
    #FDF6E3 60%,
    #FDF6E3 100%
  );
}

/* Night sky */
[data-theme="dark"] .sky-layer {
  background: linear-gradient(
    180deg,
    #0A1628 0%,
    #1A1512 50%,
    #261D18 100%
  );
}

/* Transition timing */
:root {
  --sky-transition-duration: 800ms;
  --sky-transition-easing: var(--ease-gentle);
}

.sky-layer {
  transition: background var(--sky-transition-duration) var(--sky-transition-easing);
}
```

---

## Window Lights Animation

### The Bathhouse Effect

Windows should illuminate with the warmth and life of the Spirited Away bathhouse—each window a small beacon of activity and warmth.

```
┌─────────────────────────────────────────────────────────────────────┐
│                    WINDOW ILLUMINATION PATTERN                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  BUILDING CROSS-SECTION (Night):                                    │
│                                                                      │
│  ┌─────────────────────────────────┐                                │
│  │  ▓▓▓  ░░░  ▓▓▓  ░░░  ▓▓▓  ▓▓▓  │  ← Floor 4 (most windows lit)  │
│  │  ░░░  ▓▓▓  ░░░  ▓▓▓  ░░░  ▓▓▓  │  ← Floor 3                     │
│  │  ▓▓▓  ▓▓▓  ░░░  ▓▓▓  ▓▓▓  ░░░  │  ← Floor 2                     │
│  │  ▓▓▓  ░░░  ▓▓▓  ▓▓▓  ░░░  ▓▓▓  │  ← Floor 1                     │
│  └─────────────────────────────────┘                                │
│                                                                      │
│  ▓▓▓ = Lit window (warm amber glow)                                 │
│  ░░░ = Dark window (subtle interior hint)                           │
│                                                                      │
│  ILLUMINATION SEQUENCE:                                             │
│  • Windows light up in semi-random clusters                         │
│  • Not perfectly uniform—some stay dark                             │
│  • Higher floors may light slightly before lower (working late)     │
│  • ~70-80% of windows illuminate                                    │
│                                                                      │
│  GLOW EFFECT:                                                       │
│  • Warm amber color: #F5D88A (golden) or #E8B44C (amber)           │
│  • Soft outer glow (box-shadow or filter)                           │
│  • Subtle pulse animation (breathing, 4-6s cycle)                   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Window Light CSS

```css
/* Window base state (day) */
.building-window {
  background: var(--window-day-color, rgba(135, 206, 235, 0.3));
  transition: 
    background-color var(--duration-moderate) var(--ease-gentle),
    box-shadow var(--duration-moderate) var(--ease-gentle);
}

/* Window lit state (night) */
[data-theme="dark"] .building-window.lit {
  background: var(--window-glow-color, #F5D88A);
  box-shadow: 
    0 0 8px 2px rgba(245, 216, 138, 0.4),
    0 0 16px 4px rgba(245, 216, 138, 0.2),
    inset 0 0 4px rgba(255, 255, 255, 0.3);
}

/* Window dark state (night - unlit) */
[data-theme="dark"] .building-window:not(.lit) {
  background: rgba(30, 25, 20, 0.8);
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.5);
}

/* Window glow breathing animation */
[data-theme="dark"] .building-window.lit {
  animation: windowBreathe 5s var(--ease-gentle) infinite;
}

@keyframes windowBreathe {
  0%, 100% {
    box-shadow: 
      0 0 8px 2px rgba(245, 216, 138, 0.4),
      0 0 16px 4px rgba(245, 216, 138, 0.2);
  }
  50% {
    box-shadow: 
      0 0 10px 3px rgba(245, 216, 138, 0.5),
      0 0 20px 6px rgba(245, 216, 138, 0.25);
  }
}

/* Staggered window illumination */
.building-window.lit {
  animation: windowFadeIn var(--duration-moderate) var(--ease-enter) forwards;
  animation-delay: var(--window-delay, 0ms);
}

@keyframes windowFadeIn {
  from {
    background: transparent;
    box-shadow: none;
  }
  to {
    background: var(--window-glow-color, #F5D88A);
    box-shadow: 
      0 0 8px 2px rgba(245, 216, 138, 0.4),
      0 0 16px 4px rgba(245, 216, 138, 0.2);
  }
}
```

### Window Illumination JavaScript

```javascript
// Staggered window illumination during theme transition
function illuminateWindows(building) {
  const windows = building.querySelectorAll('.building-window');
  const litPercentage = 0.75; // 75% of windows will be lit
  
  windows.forEach((window, index) => {
    // Randomly determine if this window should be lit
    const shouldLight = Math.random() < litPercentage;
    
    if (shouldLight) {
      // Semi-random delay (200-600ms range, clustered)
      const baseDelay = 200;
      const randomDelay = Math.random() * 400;
      const clusterDelay = Math.floor(index / 3) * 50; // Cluster nearby windows
      
      window.style.setProperty('--window-delay', `${baseDelay + randomDelay + clusterDelay}ms`);
      window.classList.add('lit');
    }
  });
}

// Listen for theme changes
document.addEventListener('themeChange', (e) => {
  const buildings = document.querySelectorAll('.building');
  
  if (e.detail.theme === 'dark') {
    buildings.forEach((building, index) => {
      // Stagger building illumination
      setTimeout(() => illuminateWindows(building), index * 50);
    });
  } else {
    // Extinguish windows (day mode)
    document.querySelectorAll('.building-window.lit').forEach(window => {
      window.classList.remove('lit');
    });
  }
});
```

---

## Stars Animation

### Star Field Design

```
┌─────────────────────────────────────────────────────────────────────┐
│                        STAR FIELD DESIGN                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  STAR DISTRIBUTION:                                                 │
│  ✦    ·   ✦        ·    ✦   ·        ✦                              │
│     ·       ✦   ·          ·    ✦         ·     ← Dense at top     │
│  ·      ✦       ·    ✦  ·      ·   ✦                                │
│     ·       ·          ·   ·      ·                                  │
│        ·         ·              ·        ← Sparse near horizon       │
│  ──────────────────────────────────────── Horizon line              │
│                                                                      │
│  STAR TYPES:                                                        │
│  ✦ = Bright star (larger, prominent twinkle)                        │
│  · = Dim star (smaller, subtle twinkle)                             │
│                                                                      │
│  TWINKLE PATTERNS:                                                  │
│  • Bright stars: 3-5 second cycle, opacity 0.7 → 1.0                │
│  • Dim stars: 4-8 second cycle, opacity 0.4 → 0.7                   │
│  • Randomized phase offsets for organic feel                        │
│                                                                      │
│  PIXEL-STYLE OPTION:                                                │
│  • Stars as 1-2px squares                                           │
│  • 2-frame twinkle animation (on/slightly-dim)                      │
│  • Matches pixel art aesthetic                                      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Star CSS Implementation

```css
/* Star container (only visible in dark mode) */
.star-field {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--duration-slow) var(--ease-gentle);
}

[data-theme="dark"] .star-field {
  opacity: 1;
}

/* Individual star */
.star {
  position: absolute;
  width: var(--star-size, 2px);
  height: var(--star-size, 2px);
  background: var(--color-warm-100);
  border-radius: 50%;
  opacity: 0;
  animation: starAppear var(--duration-moderate) var(--ease-enter) forwards;
  animation-delay: var(--star-delay, 0ms);
}

@keyframes starAppear {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: var(--star-opacity, 0.8);
    transform: scale(1);
  }
}

/* Star twinkle animation */
.star.twinkle {
  animation: 
    starAppear var(--duration-moderate) var(--ease-enter) forwards,
    starTwinkle var(--twinkle-duration, 4s) var(--ease-gentle) infinite;
  animation-delay: var(--star-delay, 0ms), calc(var(--star-delay, 0ms) + var(--duration-moderate));
}

@keyframes starTwinkle {
  0%, 100% {
    opacity: var(--star-opacity, 0.8);
    transform: scale(1);
  }
  50% {
    opacity: calc(var(--star-opacity, 0.8) * 0.6);
    transform: scale(0.9);
  }
}

/* Pixel-style star (2-frame twinkle) */
.star.pixel-style {
  border-radius: 0;
  animation: 
    starAppear var(--duration-moderate) var(--ease-enter) forwards,
    pixelTwinkle var(--twinkle-duration, 3s) steps(2) infinite;
}

@keyframes pixelTwinkle {
  0%, 50% { opacity: var(--star-opacity, 0.8); }
  51%, 100% { opacity: calc(var(--star-opacity, 0.8) * 0.5); }
}

/* Bright star variant */
.star.bright {
  --star-size: 3px;
  --star-opacity: 1;
  --twinkle-duration: 3s;
  box-shadow: 0 0 4px 1px rgba(245, 236, 216, 0.5);
}

/* Dim star variant */
.star.dim {
  --star-size: 1px;
  --star-opacity: 0.5;
  --twinkle-duration: 6s;
}
```

### Star Field JavaScript

```javascript
// Generate star field
function generateStars(container, count = 50) {
  const containerRect = container.getBoundingClientRect();
  
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Determine star type (20% bright, 80% dim)
    const isBright = Math.random() < 0.2;
    star.classList.add(isBright ? 'bright' : 'dim');
    star.classList.add('twinkle');
    
    // Position: denser at top, sparser near horizon
    const heightBias = Math.pow(Math.random(), 1.5); // Bias toward top
    const top = heightBias * containerRect.height * 0.6; // Only in top 60%
    const left = Math.random() * containerRect.width;
    
    star.style.top = `${top}px`;
    star.style.left = `${left}px`;
    
    // Staggered appearance delay
    const delay = 300 + Math.random() * 500; // 300-800ms
    star.style.setProperty('--star-delay', `${delay}ms`);
    
    // Randomized twinkle phase
    const twinkleDuration = 3 + Math.random() * 4; // 3-7 seconds
    star.style.setProperty('--twinkle-duration', `${twinkleDuration}s`);
    
    container.appendChild(star);
  }
}

// Initialize on page load
const starField = document.querySelector('.star-field');
if (starField) {
  generateStars(starField);
}
```

---

## Train Night Mode

### Train Lighting Elements

```
┌─────────────────────────────────────────────────────────────────────┐
│                    TRAIN NIGHT MODE LIGHTING                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DAYTIME TRAIN:                                                     │
│                    ╭───────────────────────────╮                    │
│                   ╱  ▓▓▓  ▓▓▓  ▓▓▓  ▓▓▓  ▓▓▓  ╲  ← Windows (dim)   │
│                  │══════════════════════════════│                   │
│                  │  🚂  N E I L ' S   C I T Y  │                    │
│                  │══════════════════════════════│                   │
│                  └──○────────○────────○────────○┘                   │
│                     ═════════════════════════════                   │
│                                                                      │
│  NIGHTTIME TRAIN:                                                   │
│                                                                      │
│         Headlight beam                                              │
│              ╲                                                       │
│       ▒▒▒▒▒▒▒╲╭───────────────────────────╮                        │
│      ▒▒▒▒▒▒▒▒╱  ▓▓▓  ▓▓▓  ▓▓▓  ▓▓▓  ▓▓▓  ╲  ← Windows (glowing)   │
│       ▒▒▒▒▒╱ │══════════════════════════════│                       │
│        ▒▒╱   │  🚂  N E I L ' S   C I T Y  │                        │
│              │══════════════════════════════│                       │
│              └──○────────○────────○────────○┘                       │
│                 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ← Track illumination  │
│                                                                      │
│  LIGHTING ELEMENTS:                                                 │
│  1. HEADLIGHTS: Bright cone of light ahead                         │
│     • Color: warm white (#FFF8E0)                                   │
│     • Gradient falloff with soft edges                              │
│     • Moves with train direction                                    │
│                                                                      │
│  2. CABIN INTERIOR GLOW:                                            │
│     • Windows emit warm amber light                                 │
│     • Visible passengers/activity silhouettes (optional)            │
│     • Subtle breathing pulse                                        │
│                                                                      │
│  3. TRACK ILLUMINATION:                                             │
│     • Soft glow on tracks beneath and ahead of train                │
│     • Reflects headlight color                                      │
│     • Only visible portion near train                               │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Train Night Mode CSS

```css
/* Train base (works in both modes) */
.train {
  position: relative;
  transition: filter var(--duration-moderate) var(--ease-gentle);
}

/* === HEADLIGHTS === */
.train-headlights {
  position: absolute;
  left: -40px;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 40px;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--duration-moderate) var(--ease-gentle);
}

[data-theme="dark"] .train-headlights {
  opacity: 1;
  animation: headlightPulse 3s var(--ease-gentle) infinite;
}

.train-headlights::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse 100% 80% at 100% 50%,
    rgba(255, 248, 224, 0.8) 0%,
    rgba(255, 248, 224, 0.4) 30%,
    rgba(255, 248, 224, 0.1) 60%,
    transparent 100%
  );
}

/* Headlight beam extending further */
.train-headlights::after {
  content: '';
  position: absolute;
  left: -100px;
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

@keyframes headlightPulse {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 1; }
}

/* === CABIN INTERIOR GLOW === */
.train-windows {
  transition: 
    filter var(--duration-moderate) var(--ease-gentle),
    box-shadow var(--duration-moderate) var(--ease-gentle);
}

[data-theme="dark"] .train-windows {
  filter: brightness(1.4);
  box-shadow: 
    0 0 8px 2px rgba(245, 216, 138, 0.5),
    inset 0 0 6px rgba(255, 220, 150, 0.4);
  animation: cabinGlow 4s var(--ease-gentle) infinite;
}

@keyframes cabinGlow {
  0%, 100% {
    box-shadow: 
      0 0 8px 2px rgba(245, 216, 138, 0.5),
      inset 0 0 6px rgba(255, 220, 150, 0.4);
  }
  50% {
    box-shadow: 
      0 0 12px 4px rgba(245, 216, 138, 0.6),
      inset 0 0 8px rgba(255, 220, 150, 0.5);
  }
}

/* === TRACK ILLUMINATION === */
.track-glow {
  position: absolute;
  bottom: -4px;
  left: -20px;
  right: -60px;
  height: 12px;
  opacity: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 248, 224, 0.1) 0%,
    rgba(255, 248, 224, 0.3) 30%,
    rgba(255, 248, 224, 0.2) 70%,
    rgba(255, 248, 224, 0.05) 100%
  );
  filter: blur(4px);
  transition: opacity var(--duration-moderate) var(--ease-gentle);
}

[data-theme="dark"] .track-glow {
  opacity: 1;
}

/* === TRAIN DIRECTION HANDLING === */
/* When train faces right (default) */
.train[data-direction="right"] .train-headlights {
  left: auto;
  right: -40px;
  transform: translateY(-50%) scaleX(-1);
}

.train[data-direction="right"] .track-glow {
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
```

---

## Overall Transition Timing

### CSS Custom Properties for Transition

```css
:root {
  /* === DAY/NIGHT TRANSITION TOKENS === */
  
  /* Master transition duration */
  --theme-transition-duration: 800ms;
  
  /* Layer-specific timings */
  --sky-transition-delay: 0ms;
  --sky-transition-duration: 800ms;
  
  --building-transition-delay: 100ms;
  --building-transition-duration: 400ms;
  
  --window-transition-delay: 200ms;
  --window-transition-duration: 400ms;
  --window-stagger-base: 200ms;
  --window-stagger-range: 400ms;
  
  --star-transition-delay: 300ms;
  --star-stagger-base: 300ms;
  --star-stagger-range: 500ms;
  
  --train-lights-delay: 400ms;
  --train-lights-duration: 300ms;
  
  --ambient-effects-delay: 500ms;
  --ambient-effects-duration: 300ms;
  
  /* Easing for theme transitions */
  --theme-transition-easing: var(--ease-gentle);
}
```

### Master Transition Controller

```javascript
// Theme transition orchestrator
class ThemeTransition {
  constructor() {
    this.isTransitioning = false;
    this.currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  }
  
  async transition(newTheme) {
    if (this.isTransitioning || newTheme === this.currentTheme) return;
    
    this.isTransitioning = true;
    document.documentElement.classList.add('theme-transitioning');
    
    const isDarkening = newTheme === 'dark';
    
    // Sequence of transitions
    if (isDarkening) {
      await this.transitionToDark();
    } else {
      await this.transitionToLight();
    }
    
    this.currentTheme = newTheme;
    this.isTransitioning = false;
    document.documentElement.classList.remove('theme-transitioning');
  }
  
  async transitionToDark() {
    // 1. Start sky transition immediately
    document.documentElement.setAttribute('data-theme', 'dark');
    
    // 2. Building surfaces (100ms delay)
    await this.delay(100);
    document.querySelectorAll('.building').forEach((b, i) => {
      setTimeout(() => b.classList.add('night-mode'), i * 50);
    });
    
    // 3. Windows illuminate (200ms delay)
    await this.delay(100);
    this.illuminateWindows();
    
    // 4. Stars appear (300ms delay)
    await this.delay(100);
    document.querySelector('.star-field')?.classList.add('visible');
    
    // 5. Train lights (400ms delay)
    await this.delay(100);
    document.querySelector('.train')?.classList.add('night-lights');
    
    // 6. Ambient effects (500ms delay)
    await this.delay(100);
    document.querySelectorAll('.district-glow').forEach(g => g.classList.add('active'));
    
    // 7. Wait for all transitions to complete
    await this.delay(300);
  }
  
  async transitionToLight() {
    // Reverse order for day transition
    
    // 1. Turn off ambient effects first
    document.querySelectorAll('.district-glow').forEach(g => g.classList.remove('active'));
    
    // 2. Train lights off
    await this.delay(100);
    document.querySelector('.train')?.classList.remove('night-lights');
    
    // 3. Fade stars
    await this.delay(100);
    document.querySelector('.star-field')?.classList.remove('visible');
    
    // 4. Dim windows
    await this.delay(100);
    document.querySelectorAll('.building-window.lit').forEach(w => w.classList.remove('lit'));
    
    // 5. Building surfaces lighten
    await this.delay(100);
    document.querySelectorAll('.building.night-mode').forEach(b => b.classList.remove('night-mode'));
    
    // 6. Sky transition
    await this.delay(100);
    document.documentElement.setAttribute('data-theme', 'light');
    
    // 7. Wait for completion
    await this.delay(400);
  }
  
  illuminateWindows() {
    document.querySelectorAll('.building').forEach(building => {
      const windows = building.querySelectorAll('.building-window');
      windows.forEach((window, i) => {
        if (Math.random() < 0.75) { // 75% of windows light up
          const delay = 200 + Math.random() * 400;
          setTimeout(() => window.classList.add('lit'), delay);
        }
      });
    });
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize
const themeTransition = new ThemeTransition();

// Toggle handler
document.querySelector('.theme-toggle')?.addEventListener('click', () => {
  const newTheme = themeTransition.currentTheme === 'light' ? 'dark' : 'light';
  themeTransition.transition(newTheme);
});

// System preference listener
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  themeTransition.transition(e.matches ? 'dark' : 'light');
});
```

---

## District-Specific Night Effects

### AI District — Mystical Glow

```css
[data-theme="dark"] .district-ai {
  /* Enhanced purple/lavender glow at night */
  --district-glow: rgba(184, 160, 232, 0.3);
}

[data-theme="dark"] .district-ai .building {
  box-shadow: 0 0 20px var(--district-glow);
}

[data-theme="dark"] .district-ai .ai-node {
  animation: aiNodePulse 3s var(--ease-gentle) infinite;
}

@keyframes aiNodePulse {
  0%, 100% { 
    box-shadow: 0 0 8px rgba(184, 160, 232, 0.6);
    opacity: 0.8;
  }
  50% { 
    box-shadow: 0 0 16px rgba(184, 160, 232, 0.9);
    opacity: 1;
  }
}
```

### Open Source District — Arcade Neon

```css
[data-theme="dark"] .district-oss {
  /* Pixel arcade glow */
  --district-glow: rgba(92, 184, 92, 0.4);
}

[data-theme="dark"] .district-oss .pixel-sign {
  animation: neonFlicker 0.1s steps(2) infinite;
}

@keyframes neonFlicker {
  0%, 90% { opacity: 1; }
  91%, 100% { opacity: 0.8; }
}
```

### Infrastructure District — Industrial Warmth

```css
[data-theme="dark"] .district-infra {
  /* Warm industrial glow */
  --district-glow: rgba(232, 141, 96, 0.3);
}

[data-theme="dark"] .district-infra .forge-glow {
  animation: forgeFlicker 2s var(--ease-gentle) infinite;
}

@keyframes forgeFlicker {
  0%, 100% { 
    background: rgba(232, 141, 96, 0.6);
    box-shadow: 0 0 20px rgba(232, 141, 96, 0.4);
  }
  25% { 
    background: rgba(232, 141, 96, 0.8);
    box-shadow: 0 0 30px rgba(232, 141, 96, 0.6);
  }
  75% { 
    background: rgba(232, 141, 96, 0.5);
    box-shadow: 0 0 15px rgba(232, 141, 96, 0.3);
  }
}
```

---

## Reduced Motion Support

### Simplified Transitions

```css
@media (prefers-reduced-motion: reduce) {
  /* Instant theme switch, no animations */
  .sky-layer,
  .building,
  .building-window,
  .train-headlights,
  .train-windows,
  .star,
  .district-glow {
    transition-duration: 0.01ms !important;
    animation: none !important;
  }
  
  /* Stars appear instantly without twinkle */
  .star {
    opacity: var(--star-opacity, 0.8) !important;
    animation: none !important;
  }
  
  /* Windows light instantly */
  [data-theme="dark"] .building-window.lit {
    animation: none !important;
    background: var(--window-glow-color, #F5D88A) !important;
  }
  
  /* Train lights instant */
  [data-theme="dark"] .train-headlights {
    opacity: 1 !important;
    animation: none !important;
  }
  
  /* Static glow, no breathing */
  [data-theme="dark"] .train-windows {
    animation: none !important;
  }
}

/* JavaScript check */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Instant theme switch
  document.documentElement.classList.add('reduced-motion');
}
```

---

## Acceptance Criteria (BDD Format)

### Sky Transition

```gherkin
Feature: Sky Gradient Day/Night Transition

Scenario: User toggles from day to night mode
  Given I am viewing the city in day mode
  When I toggle the theme to night mode
  Then the sky gradient should transition smoothly
  And the transition should complete within 800ms
  And the final colors should be warm dark tones (#1A1512)
  And screen readers should announce "Night mode enabled"

Scenario: System prefers dark mode
  Given the user's system is set to dark mode preference
  When the page loads
  Then the city should display in night mode immediately
  And no transition animation should play
```

### Window Illumination

```gherkin
Feature: Window Light Animation

Scenario: Windows illuminate on night transition
  Given I am viewing the city in day mode
  When the theme transitions to night mode
  Then building windows should begin illuminating after 200ms
  And windows should light up in a staggered, semi-random pattern
  And approximately 70-80% of windows should be lit
  And lit windows should have a warm amber glow (#F5D88A)
  And lit windows should have a subtle breathing animation

Scenario: Windows dim on day transition  
  Given I am viewing the city in night mode
  When the theme transitions to day mode
  Then lit windows should fade out within 300ms
  And the transition should occur before the sky fully brightens
```

### Stars

```gherkin
Feature: Star Field Animation

Scenario: Stars appear on night transition
  Given I am viewing the city in day mode
  When the theme transitions to night mode
  Then stars should begin appearing after 300ms
  And stars should fade in with staggered timing (300-800ms range)
  And stars should be denser at the top of the sky
  And bright stars should have a subtle twinkle animation
  And dim stars should have a slower, subtler twinkle

Scenario: Stars fade on day transition
  Given I am viewing the city in night mode with visible stars
  When the theme transitions to day mode
  Then stars should fade out within the first 300ms
  And the fade should complete before sky fully brightens
```

### Train Lights

```gherkin
Feature: Train Night Lighting

Scenario: Train lights activate on night transition
  Given the train is visible in the city view
  When the theme transitions to night mode
  Then train headlights should turn on after 400ms
  And headlights should emit a warm white cone (#FFF8E0)
  And train windows should glow with warm amber light
  And a soft glow should appear on the tracks beneath the train

Scenario: Train lights during movement at night
  Given the theme is in night mode
  And the train is traveling between stations
  Then the headlight beam should illuminate the track ahead
  And the headlight direction should match train travel direction
  And window glow should remain consistent during travel
```

---

## Performance Checklist

- [ ] All transitions use `transform` and `opacity` only
- [ ] `will-change` applied before transitions, removed after
- [ ] Star generation is throttled (max 50-100 stars)
- [ ] Window illumination staggered to prevent frame drops
- [ ] Maintains 60fps during full transition sequence
- [ ] Tested on low-end devices (throttled CPU)
- [ ] Reduced motion mode bypasses all animations
- [ ] Theme state persisted (no flash on reload)

---

## Integration Notes

### For Frontend Developer
- Implement theme toggle with `data-theme` attribute on `<html>`
- Use CSS custom properties for all color values
- Consider Framer Motion for complex orchestration
- Persist theme preference in localStorage
- Listen for `prefers-color-scheme` system changes

### For Visual Designer
- Create sprite variations for day/night train
- Design window patterns (which windows light up)
- Provide star field reference image
- Define district-specific glow colors

### For QA Specialist
- Test transition in both directions
- Verify reduced motion mode
- Test system preference detection
- Check transition interruption (toggle during transition)
- Verify accessibility announcements

---

*Day/Night transitions designed for Neil's City Site. The goal is a magical, Ghibli-inspired transformation that makes night mode feel like a cozy evening in a living city.*
