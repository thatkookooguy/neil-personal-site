# Motion System: Neil's City Site

**Date Created**: December 26, 2025  
**Last Updated**: December 26, 2025  
**Purpose**: Define the core motion language, easing functions, duration scale, and animation principles

---

## Motion Philosophy

### The Ghibli-Pixel Fusion

Neil's City exists at the intersection of two animation traditions:

| Tradition | Characteristics | When to Use |
|-----------|-----------------|-------------|
| **Studio Ghibli** | Organic, weighted, breathing, follow-through | View transitions, train movement, character idle states |
| **Pixel Art** | Snappy, frame-limited (4-8 frames), deliberate | Character actions, UI feedback, loading states |

> **The Golden Rule**: Every animation must feel **crafted by hand**, never generated. Motion should add warmth, not technical impressiveness.

### Motion Personality: "Cozy Confident"

Neil's City motion is:
- **Confident**: Direct and purposeful, not hesitant
- **Warm**: Gentle ease-outs that feel welcoming
- **Organic**: Physics-influenced without being simulation-heavy
- **Restrained**: Quiet most of the time, magical when it matters

---

## Easing Functions

### Primary Easing Palette

```css
:root {
  /* ================================================
     NEIL'S CITY — EASING TOKENS
     ================================================ */
  
  /* --- Core Motion Curves --- */
  
  /* Standard: The workhorse easing for most transitions
     Inspired by Material Design 3, tuned for warmth */
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  
  /* Decelerate: Elements entering the viewport
     Things "arriving" at their destination */
  --ease-enter: cubic-bezier(0, 0, 0.2, 1);
  
  /* Accelerate: Elements leaving the viewport
     Things "departing" from view */
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
  
  /* --- Ghibli-Inspired Curves --- */
  
  /* Organic: Natural, weighted motion with subtle overshoot
     For train arrival, character settling, building reveals */
  --ease-organic: cubic-bezier(0.34, 1.15, 0.64, 1);
  
  /* Gentle: Slow, peaceful transitions
     For ambient animations, idle breathing, cloud drift */
  --ease-gentle: cubic-bezier(0.25, 0.1, 0.25, 1);
  
  /* Anticipation: Slight pullback before action
     For button press, train departure, character jump */
  --ease-anticipate: cubic-bezier(0.68, -0.15, 0.265, 1.35);
  
  /* --- Pixel-Inspired Curves --- */
  
  /* Snap: Quick, decisive motion
     For hover states, toggle switches, pixel character actions */
  --ease-snap: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Bounce: Playful endpoint overshoot
     For Leela's movements, achievement unlocks, easter eggs */
  --ease-bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  /* Step: Frame-limited feel (use with steps() timing)
     For pixel art animations, retro effects */
  --ease-step: steps(4, end);
  --ease-step-smooth: steps(8, end);
  
  /* --- Utility Curves --- */
  
  /* Linear: Constant speed (rare, use intentionally)
     For progress bars, continuous train movement on tracks */
  --ease-linear: linear;
  
  /* Emphasized: For important, attention-worthy transitions
     Modal opening, error shake, success celebration */
  --ease-emphasized: cubic-bezier(0.2, 0, 0, 1);
}
```

### Spring Animation Parameters

For JavaScript animation libraries (Framer Motion, React Spring):

```javascript
// Spring configurations for Neil's City

export const springs = {
  // Standard: Most UI transitions
  standard: {
    tension: 300,
    friction: 30,
    mass: 1
  },
  
  // Gentle: Ambient, dreamy motion (Ghibli-style)
  gentle: {
    tension: 120,
    friction: 20,
    mass: 1.5
  },
  
  // Snappy: Quick UI feedback (pixel-style)
  snappy: {
    tension: 400,
    friction: 35,
    mass: 0.8
  },
  
  // Bouncy: Playful moments (Leela, achievements)
  bouncy: {
    tension: 200,
    friction: 15,
    mass: 1
  },
  
  // Heavy: Train, large elements
  heavy: {
    tension: 180,
    friction: 25,
    mass: 2
  },
  
  // Wobbly: Error states, attention-getters
  wobbly: {
    tension: 180,
    friction: 12,
    mass: 1
  }
};

// Framer Motion variants
export const motionConfig = {
  standard: { type: "spring", stiffness: 300, damping: 30 },
  gentle: { type: "spring", stiffness: 120, damping: 20, mass: 1.5 },
  snappy: { type: "spring", stiffness: 400, damping: 35 },
  tween: { type: "tween", duration: 0.3, ease: [0.2, 0, 0, 1] }
};
```

---

## Duration Scale

### Timing Tokens

```css
:root {
  /* ================================================
     NEIL'S CITY — DURATION TOKENS
     ================================================ */
  
  /* --- Micro Interactions (Instant Feedback) --- */
  --duration-instant: 0ms;      /* State change, no animation */
  --duration-micro: 100ms;      /* Button press feedback */
  --duration-fast: 150ms;       /* Hover states, toggles */
  
  /* --- Standard Interactions --- */
  --duration-quick: 200ms;      /* Tooltips, dropdowns */
  --duration-normal: 300ms;     /* Modals, cards, most UI */
  --duration-moderate: 400ms;   /* Complex layouts */
  
  /* --- Major Transitions --- */
  --duration-slow: 500ms;       /* Page transitions */
  --duration-slower: 600ms;     /* Building reveals */
  --duration-deliberate: 800ms; /* City-to-district zoom */
  
  /* --- Dramatic / Ambient --- */
  --duration-dramatic: 1000ms;  /* Full train journey */
  --duration-ambient: 2000ms;   /* Idle breathing loops */
  --duration-atmospheric: 4000ms; /* Cloud drift, smoke */
  
  /* --- Pixel Animation Frames --- */
  --frame-duration: 100ms;      /* Single pixel frame */
  --walk-cycle: 400ms;          /* 4-frame walk (100ms each) */
  --idle-cycle: 800ms;          /* 2-frame idle (400ms each) */
}
```

### Duration Decision Matrix

| Interaction Type | Duration | Easing | Examples |
|------------------|----------|--------|----------|
| **Micro-feedback** | 100-150ms | `--ease-snap` | Button press, checkbox, hover |
| **Reveal/Hide** | 200-300ms | `--ease-enter` / `--ease-exit` | Tooltip, dropdown, toast |
| **Layout Shift** | 300-400ms | `--ease-standard` | Accordion, tab switch, modal |
| **View Transition** | 400-800ms | `--ease-organic` | City→District, Building reveal |
| **Train Journey** | 800-1200ms | `--ease-gentle` | District-to-district travel |
| **Ambient Loops** | 2000ms+ | `--ease-linear` or `--ease-gentle` | Breathing, floating, clouds |

### The 300ms Sweet Spot

> **Rule of Thumb**: When in doubt, use 300ms with `--ease-standard`. It's perceivable but not sluggish.

- **Faster than 100ms**: Feels instant (good for feedback, not for transitions)
- **100-200ms**: Snappy, responsive (hover, focus, micro-interactions)
- **200-400ms**: Comfortable, readable (standard transitions)
- **400-600ms**: Deliberate, significant (major view changes)
- **600ms+**: Dramatic, should be interruptible (full animations)

---

## Motion Principles

### 1. Purpose-Driven Animation

Every animation in Neil's City must serve at least one purpose:

| Purpose | Description | Examples |
|---------|-------------|----------|
| **Feedback** | Confirm user action, show system response | Button press ripple, form success |
| **Orientation** | Help users understand where they are | Train travel, breadcrumb update |
| **Focus** | Direct attention to important elements | Error shake, new content pulse |
| **Hierarchy** | Communicate relationships | Building floors stacking, district glow |
| **Continuity** | Maintain context during transitions | Shared element transitions |
| **Delight** | Add warmth and personality (sparingly!) | Leela's tail wag, train whistle |

### 2. Ghibli Motion Principles

#### Breathing World
Everything has subtle life, even "static" elements:

```css
/* Ambient breathing on buildings */
.building-ambient {
  animation: breathe var(--duration-ambient) var(--ease-gentle) infinite;
}

@keyframes breathe {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-2px) scale(1.005); }
}

/* Gentle sway on foliage/flags */
.sway {
  animation: sway 3s var(--ease-gentle) infinite;
  transform-origin: bottom center;
}

@keyframes sway {
  0%, 100% { transform: rotate(-1deg); }
  50% { transform: rotate(1deg); }
}
```

#### Weight and Follow-Through
Movement should feel physical, not digital:

- **Anticipation**: Slight movement opposite before action
- **Follow-through**: Settling/overshoot after action
- **Secondary motion**: Elements react to primary motion

```css
/* Train departure with anticipation */
.train-depart {
  animation: trainDepart var(--duration-dramatic) var(--ease-anticipate);
}

@keyframes trainDepart {
  0% { transform: translateX(0); }
  8% { transform: translateX(-5px); } /* Anticipation */
  100% { transform: translateX(100vw); }
}
```

#### Overlapping Action
Stagger related elements to create organic feel:

```css
/* Building floors reveal with overlap */
.floor {
  opacity: 0;
  transform: translateX(-20px);
  animation: floorReveal var(--duration-moderate) var(--ease-enter) forwards;
}

.floor:nth-child(1) { animation-delay: 0ms; }
.floor:nth-child(2) { animation-delay: 50ms; }
.floor:nth-child(3) { animation-delay: 100ms; }
.floor:nth-child(4) { animation-delay: 150ms; }
/* Cap at 250ms total stagger */
```

### 3. Pixel Motion Principles

#### Frame-Limited Feel
Classic 4-8 frame animations feel authentic:

```css
/* Pixel character walk - 4 frames */
.character-walk {
  animation: walk var(--walk-cycle) steps(4) infinite;
}

@keyframes walk {
  from { background-position: 0 0; }
  to { background-position: -128px 0; } /* 4 frames × 32px */
}

/* Pixel idle - 2 frames */
.character-idle {
  animation: idle var(--idle-cycle) steps(2) infinite;
}

@keyframes idle {
  from { background-position: 0 0; }
  to { background-position: -64px 0; } /* 2 frames × 32px */
}
```

#### Snappy Decisiveness
Pixel-style interactions should be instant and deliberate:

```css
/* Pixel button press - snappy scale */
.pixel-button:active {
  transform: scale(0.95);
  transition: transform var(--duration-micro) var(--ease-snap);
}

/* Instant state changes */
.toggle-active {
  transition: background-color var(--duration-instant);
}
```

### 4. Motion Restraint

> **Less is more.** The city should feel alive, not anxious.

#### When to Animate
- User interactions (hover, click, focus)
- State changes (loading → loaded, error → success)
- View transitions (navigation between views)
- Key moments (first load, easter eggs, achievements)

#### When NOT to Animate
- Reading content (don't distract from text)
- Multiple simultaneous actions (prioritize primary)
- Repeat visits (reduce after first impression)
- Any time user has `prefers-reduced-motion`

---

## Stagger Patterns

### Standard Stagger

```css
/* Stagger configuration */
:root {
  --stagger-delay: 50ms;      /* Delay between items */
  --stagger-max: 250ms;       /* Maximum total stagger */
  --stagger-limit: 5;         /* Max items to stagger */
}
```

### Stagger Directions

| Pattern | Use Case | Direction |
|---------|----------|-----------|
| **Top-to-bottom** | Floor lists, content sections | Natural reading flow |
| **Left-to-right** | District cards, horizontal nav | Western reading order |
| **Center-out** | Modal content, featured items | Focus on center first |
| **Cascade** | Building reveal, victory effects | Dramatic sequential |

```css
/* Floor list stagger (top-to-bottom) */
.floor-list .floor {
  animation: fadeSlideIn var(--duration-normal) var(--ease-enter) forwards;
  animation-delay: calc(var(--floor-index) * var(--stagger-delay));
}

/* District cards stagger (left-to-right) */
.district-grid .district {
  animation-delay: calc(var(--district-index) * var(--stagger-delay));
}

/* Center-out stagger for modal */
.modal-content > * {
  --distance-from-center: abs(var(--item-index) - var(--center-index));
  animation-delay: calc(var(--distance-from-center) * var(--stagger-delay));
}
```

### Stagger Limits

```javascript
// JavaScript stagger calculation with limits
const staggerDelay = 50; // ms
const maxTotalStagger = 250; // ms
const maxItems = 5;

function getStaggerDelay(index) {
  const cappedIndex = Math.min(index, maxItems - 1);
  return Math.min(cappedIndex * staggerDelay, maxTotalStagger);
}
```

---

## Spatial Motion Language

### Direction Meanings

| Direction | Meaning | Use For |
|-----------|---------|---------|
| **→ Right** | Forward, progress, next | Floor navigation, train travel |
| **← Left** | Back, previous, return | Back button, undo |
| **↓ Down** | Expanding, revealing, drilling in | Dropdowns, building cutaway |
| **↑ Up** | Collapsing, closing, zooming out | Close modal, return to city |
| **→↙ Diagonal (down-left)** | Isometric depth entry | Entering district, building focus |
| **←↗ Diagonal (up-right)** | Isometric depth exit | Leaving district, zooming out |

### Entry/Exit Pairing

> **Rule**: Elements exit in the opposite direction they entered.

| Entry Animation | Exit Animation |
|-----------------|----------------|
| Slide from right | Slide to left |
| Slide from bottom | Slide to top |
| Scale up (Z+) | Scale down (Z-) |
| Fade + translate up | Fade + translate down |

```css
/* Paired enter/exit animations */
.page-enter { 
  animation: slideInRight var(--duration-slow) var(--ease-enter); 
}
.page-exit { 
  animation: slideOutLeft var(--duration-slow) var(--ease-exit); 
}

@keyframes slideInRight {
  from { transform: translateX(30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutLeft {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(-30px); opacity: 0; }
}
```

---

## Performance Guidelines

### GPU-Optimized Properties

**Always animate these (GPU-accelerated):**
- `transform` (translate, scale, rotate)
- `opacity`

**Never animate these (cause reflow/repaint):**
- `width`, `height`
- `top`, `right`, `bottom`, `left`
- `margin`, `padding`
- `border-width`

### will-change Management

```css
/* Apply will-change before animation */
.will-animate {
  will-change: transform, opacity;
}

/* Remove after animation completes */
.animation-done {
  will-change: auto;
}
```

```javascript
// JavaScript will-change management
element.style.willChange = 'transform, opacity';
element.addEventListener('animationend', () => {
  element.style.willChange = 'auto';
});
```

### Performance Checklist

- [ ] Uses only `transform` and `opacity`
- [ ] Maintains 60fps (16.67ms/frame budget)
- [ ] Doesn't block main thread
- [ ] Tested on low-end devices
- [ ] `will-change` applied and cleaned up
- [ ] Animations can be interrupted

---

## Motion Design Tokens (Complete)

```css
:root {
  /* ================================================
     NEIL'S CITY — COMPLETE MOTION TOKEN SYSTEM
     ================================================ */
  
  /* === DURATIONS === */
  --duration-instant: 0ms;
  --duration-micro: 100ms;
  --duration-fast: 150ms;
  --duration-quick: 200ms;
  --duration-normal: 300ms;
  --duration-moderate: 400ms;
  --duration-slow: 500ms;
  --duration-slower: 600ms;
  --duration-deliberate: 800ms;
  --duration-dramatic: 1000ms;
  --duration-ambient: 2000ms;
  --duration-atmospheric: 4000ms;
  
  /* === EASINGS === */
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-enter: cubic-bezier(0, 0, 0.2, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
  --ease-organic: cubic-bezier(0.34, 1.15, 0.64, 1);
  --ease-gentle: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-anticipate: cubic-bezier(0.68, -0.15, 0.265, 1.35);
  --ease-snap: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-step: steps(4, end);
  --ease-step-smooth: steps(8, end);
  --ease-linear: linear;
  --ease-emphasized: cubic-bezier(0.2, 0, 0, 1);
  
  /* === STAGGER === */
  --stagger-delay: 50ms;
  --stagger-max: 250ms;
  
  /* === MOVEMENT DISTANCES === */
  --motion-distance-xs: 4px;
  --motion-distance-sm: 8px;
  --motion-distance-md: 16px;
  --motion-distance-lg: 32px;
  --motion-distance-xl: 64px;
  
  /* === SCALE FACTORS === */
  --scale-press: 0.95;
  --scale-hover: 1.02;
  --scale-focus: 1.05;
  --scale-enter: 0.9;
  
  /* === PIXEL ANIMATION === */
  --frame-duration: 100ms;
  --walk-cycle: 400ms;
  --idle-cycle: 800ms;
  
  /* === Z-INDEX FOR ANIMATED LAYERS === */
  --z-background: 0;
  --z-buildings: 10;
  --z-train: 20;
  --z-characters: 30;
  --z-ui: 40;
  --z-overlay: 50;
  --z-modal: 60;
}

/* === REDUCED MOTION === */
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-micro: 0ms;
    --duration-fast: 0ms;
    --duration-quick: 0ms;
    --duration-normal: 0ms;
    --duration-moderate: 0ms;
    --duration-slow: 0ms;
    --duration-slower: 0ms;
    --duration-deliberate: 0ms;
    --duration-dramatic: 0ms;
    --duration-ambient: 0ms;
    --duration-atmospheric: 0ms;
  }
  
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Quick Reference Card

### When to Use Which Easing

```
User clicks something?     → --ease-snap (fast, decisive)
Something appears?         → --ease-enter (decelerate in)
Something disappears?      → --ease-exit (accelerate out)
View transition?           → --ease-organic (natural, weighted)
Ambient motion?            → --ease-gentle (slow, peaceful)
Playful moment?            → --ease-bounce (overshoot)
Pixel animation?           → --ease-step (frame-limited)
```

### When to Use Which Duration

```
Button press?              → --duration-micro (100ms)
Hover state?               → --duration-fast (150ms)
Tooltip/dropdown?          → --duration-quick (200ms)
Modal/card?                → --duration-normal (300ms)
Page transition?           → --duration-slow (500ms)
Building reveal?           → --duration-slower (600ms)
Train journey?             → --duration-dramatic (1000ms)
Idle animation?            → --duration-ambient (2000ms)
```

---

## Integration Notes

### For Frontend Developer
- Import motion tokens in global CSS
- Use CSS custom properties for consistency
- Implement `prefers-reduced-motion` support
- Consider Framer Motion or GSAP for complex sequences

### For QA Specialist
- Test all animations at 60fps
- Verify reduced motion mode
- Check animation interruption behavior
- Test on low-end devices (throttled CPU)

### For Visual Designer
- Review easing curves in motion tools
- Validate Ghibli/pixel balance
- Ensure motion personality consistency

---

*Motion system designed for Neil's City Site. The goal is motion that feels handcrafted, warm, and purposeful.*
