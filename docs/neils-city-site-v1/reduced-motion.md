# Reduced Motion Support: Neil's City Site

**Date Created**: December 26, 2025  
**Last Updated**: December 26, 2025  
**Purpose**: Define comprehensive accessibility alternatives, `prefers-reduced-motion` implementation, and static alternatives for all animated elements

---

## Philosophy

Animation is a **layer of enhancement**, not a requirement. Neil's City Site must be fully functional and delightful for users who:

- Have vestibular disorders or motion sensitivity
- Experience migraines triggered by animation
- Prefer reduced cognitive load
- Use devices with limited performance
- Simply prefer a calmer experience

### Core Principles

1. **Respect User Choice**: Honor system preferences by default
2. **Functional Equivalence**: Every animated interaction has an equally effective static alternative
3. **No Information Loss**: Motion should never be the only way to convey information
4. **Graceful Degradation**: The site works first, animates second
5. **User Control**: Provide manual override options

---

## Detection Methods

### CSS Media Query

The primary detection method for reduced motion preference:

```css
/* Full motion (default) */
.element {
  animation: my-animation 500ms ease-out;
  transition: transform 300ms var(--ease-standard);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .element {
    animation: none;
    transition: none;
  }
}
```

### JavaScript Detection

For programmatic animation control:

```javascript
// Create persistent reference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
);

// Check current preference
function shouldAnimate() {
  return !prefersReducedMotion.matches;
}

// React to preference changes (user might change mid-session)
prefersReducedMotion.addEventListener('change', (event) => {
  if (event.matches) {
    // User enabled reduced motion
    cancelAllAnimations();
    applyStaticStates();
  } else {
    // User disabled reduced motion
    enableAnimations();
  }
});
```

### CSS Custom Property Approach

For fine-grained control using CSS variables:

```css
:root {
  /* Full motion defaults */
  --animation-duration: 1;
  --transition-duration: 1;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    /* Scale down to instant or minimal */
    --animation-duration: 0;
    --transition-duration: 0.1;
  }
}

/* Usage */
.train {
  transition: transform calc(800ms * var(--transition-duration)) ease;
}

.character {
  animation: breathe calc(800ms * var(--animation-duration)) infinite;
}
```

---

## Global CSS Implementation

### Base Reduced Motion Styles

```css
/*===========================================
  REDUCED MOTION GLOBAL OVERRIDES
===========================================*/

@media (prefers-reduced-motion: reduce) {
  
  /*-----------------------------------------
    Universal Animation Disable
  -----------------------------------------*/
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /*-----------------------------------------
    Essential State Transitions (keep minimal)
  -----------------------------------------*/
  .state-transition {
    transition: opacity 100ms ease !important;
  }
  
  .focus-indicator {
    transition: outline-offset 50ms ease !important;
  }
  
  /*-----------------------------------------
    Hide Decorative Animations
  -----------------------------------------*/
  .train-smoke,
  .ambient-particles,
  .floating-clouds,
  .background-parallax,
  .window-glow-pulse,
  .track-shimmer {
    display: none !important;
  }
  
  /*-----------------------------------------
    Disable Scroll Effects
  -----------------------------------------*/
  .parallax-layer {
    transform: none !important;
  }
  
  .scroll-reveal {
    opacity: 1 !important;
    transform: none !important;
  }
  
}
```

---

## Element-by-Element Alternatives

### Train System

#### Full Motion Experience

```
┌─────────────────────────────────────────────────────────────────────┐
│  TRAIN ANIMATION (FULL MOTION)                                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Click "AI District"                                                 │
│         │                                                            │
│         ▼                                                            │
│  ┌───────────────┐                                                   │
│  │ Train departure │ (800ms anticipation bounce)                     │
│  └───────────────┘                                                   │
│         │                                                            │
│         ▼                                                            │
│  ┌───────────────┐                                                   │
│  │ Travel along   │ (1000-3000ms depending on distance)              │
│  │ track with     │                                                  │
│  │ parallax       │                                                  │
│  └───────────────┘                                                   │
│         │                                                            │
│         ▼                                                            │
│  ┌───────────────┐                                                   │
│  │ Arrival with   │ (600ms deceleration + bounce)                    │
│  │ station glow   │                                                  │
│  └───────────────┘                                                   │
│         │                                                            │
│         ▼                                                            │
│  District content loads                                              │
│                                                                      │
│  TOTAL TIME: 2400-5400ms                                             │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

#### Reduced Motion Alternative

```
┌─────────────────────────────────────────────────────────────────────┐
│  TRAIN NAVIGATION (REDUCED MOTION)                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Click "AI District"                                                 │
│         │                                                            │
│         ▼                                                            │
│  ┌───────────────┐                                                   │
│  │ Current view   │ (100ms)                                          │
│  │ fades out      │                                                  │
│  └───────────────┘                                                   │
│         │                                                            │
│         ▼                                                            │
│  ┌───────────────┐                                                   │
│  │ Train position │ (instant)                                        │
│  │ updates        │                                                  │
│  └───────────────┘                                                   │
│         │                                                            │
│         ▼                                                            │
│  ┌───────────────┐                                                   │
│  │ New view       │ (100ms)                                          │
│  │ fades in       │                                                  │
│  └───────────────┘                                                   │
│         │                                                            │
│         ▼                                                            │
│  District content loaded                                             │
│                                                                      │
│  TOTAL TIME: ~200ms                                                  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

#### CSS Implementation

```css
/* Full motion: Animated train travel */
.train {
  transition: transform 800ms var(--ease-anticipate);
}

.train.traveling {
  animation: train-travel var(--journey-duration) var(--ease-standard);
}

.train-smoke {
  animation: smoke-rise 1500ms ease-out infinite;
}

/* Reduced motion: Instant position changes */
@media (prefers-reduced-motion: reduce) {
  .train {
    transition: none !important;
  }
  
  .train.traveling {
    animation: none !important;
    /* Train instantly appears at destination */
  }
  
  .train-smoke {
    display: none !important;
  }
  
  /* Show static smoke indicator instead */
  .train::after {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    width: 6px;
    height: 6px;
    background: var(--color-smoke);
    border-radius: 50%;
    opacity: 0.6;
  }
}
```

#### JavaScript Implementation

```javascript
async function navigateViaTrainTo(districtId) {
  const destination = getDistrictPosition(districtId);
  
  if (shouldAnimate()) {
    // Full animation sequence
    announceToScreenReader(`Train departing for ${districtId}`);
    
    await animateTrainDeparture();
    await animateTrainJourney(destination);
    await animateTrainArrival();
    
    announceToScreenReader(`Arrived at ${districtId}`);
  } else {
    // Instant navigation with fade
    announceToScreenReader(`Navigating to ${districtId}`);
    
    await fadeOut(currentView, 100);
    setTrainPosition(destination);
    await loadDistrict(districtId);
    await fadeIn(newView, 100);
    
    announceToScreenReader(`Now viewing ${districtId}`);
  }
}
```

---

### View Transitions

#### City → District Transition

| Aspect | Full Motion | Reduced Motion |
|--------|-------------|----------------|
| Camera | Animated zoom (800ms) | Instant view change |
| Districts | Fade/blur except target | All fade out, target fades in |
| Train | Travels to station | Position updates instantly |
| Content | Staggered reveal | Immediate display |
| Duration | 1200-2000ms | 200ms |

```css
/* Full motion: Animated zoom and focus */
.city-to-district-transition {
  animation: camera-zoom 800ms var(--ease-organic);
}

.district:not(.target) {
  animation: fade-recede 600ms var(--ease-standard) forwards;
}

.district.target {
  animation: district-pulse 400ms var(--ease-bounce);
}

/* Reduced motion: Simple crossfade */
@media (prefers-reduced-motion: reduce) {
  .city-to-district-transition {
    animation: none;
  }
  
  .city-view {
    transition: opacity 100ms ease;
  }
  
  .district-view {
    transition: opacity 100ms ease;
  }
  
  /* Skip all zoom, pulse, and recede animations */
  .district:not(.target),
  .district.target {
    animation: none;
  }
}
```

#### District → Building Transition

| Aspect | Full Motion | Reduced Motion |
|--------|-------------|----------------|
| Other Buildings | Blur and fade (400ms) | Fade out (100ms) |
| Target Building | Grows and lifts (500ms) | Immediate display |
| Cutaway | Animated reveal (600ms) | Instant cutaway shown |
| Floors | Staggered slide-in | All visible immediately |
| Duration | 1200-1500ms | 200ms |

```css
/* Full motion: Building cutaway reveal */
.building-cutaway {
  animation: cutaway-reveal 600ms var(--ease-organic);
  clip-path: polygon(0 0, 100% 0, 100% 0%, 0 0%);
}

@keyframes cutaway-reveal {
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}

.floor {
  opacity: 0;
  transform: translateX(-20px);
  animation: floor-reveal 300ms var(--ease-standard) forwards;
  animation-delay: calc(var(--floor-index) * 100ms);
}

/* Reduced motion: Instant reveal */
@media (prefers-reduced-motion: reduce) {
  .building-cutaway {
    animation: none;
    clip-path: none;
    /* Building interior immediately visible */
  }
  
  .floor {
    animation: none;
    opacity: 1;
    transform: none;
  }
  
  /* Transition container uses simple fade */
  .building-transition-container {
    transition: opacity 100ms ease;
  }
}
```

#### Floor Navigation

| Aspect | Full Motion | Reduced Motion |
|--------|-------------|----------------|
| Current Floor | Slide out (300ms) | Fade out (100ms) |
| New Floor | Slide in (300ms) | Fade in (100ms) |
| Scroll | Smooth scroll | Instant scroll |
| Duration | 400-600ms | 200ms |

```css
/* Full motion: Floor slide transitions */
.floor-content {
  transition: transform 300ms var(--ease-standard),
              opacity 200ms var(--ease-standard);
}

.floor-content.exiting {
  transform: translateX(-100%);
  opacity: 0;
}

.floor-content.entering {
  transform: translateX(100%);
  opacity: 0;
}

.floor-content.active {
  transform: translateX(0);
  opacity: 1;
}

/* Reduced motion: Simple fade */
@media (prefers-reduced-motion: reduce) {
  .floor-content {
    transition: opacity 100ms ease;
    transform: none !important;
  }
  
  .floor-content.exiting {
    opacity: 0;
  }
  
  .floor-content.entering {
    opacity: 0;
  }
  
  .floor-content.active {
    opacity: 1;
  }
  
  /* Disable smooth scrolling */
  html {
    scroll-behavior: auto;
  }
}
```

---

### Character Animations

#### Neil

| Animation | Full Motion | Reduced Motion |
|-----------|-------------|----------------|
| Idle breathing | Subtle scale (800ms cycle) | Static pose |
| Blinking | Random blinks (4-7s interval) | Open eyes static |
| Walking | 4-frame walk cycle (400ms) | Static walking pose |
| Working (typing) | Keyboard animation | Static at desk |
| Pointing | Arm raise animation | Static pointing pose |
| Looking | Head turn animation | Direction via CSS class |

```css
/* Full motion: Neil animations */
.neil-idle {
  animation: neil-breathe 800ms steps(2) infinite;
}

.neil-walking {
  animation: neil-walk 400ms steps(4) infinite;
}

.neil-working {
  animation: neil-type 300ms steps(3) infinite;
}

/* Reduced motion: Static poses */
@media (prefers-reduced-motion: reduce) {
  .neil,
  .neil-idle,
  .neil-walking,
  .neil-working,
  .neil-pointing,
  .neil-looking {
    animation: none !important;
  }
  
  /* Use static sprite frames */
  .neil-idle {
    background-position: 0 0; /* Default standing frame */
  }
  
  .neil-walking {
    background-position: -32px 0; /* Mid-walk frame */
  }
  
  .neil-working {
    background-position: -64px 0; /* Typing frame */
  }
  
  .neil-pointing {
    background-position: -96px 0; /* Pointing frame */
  }
  
  /* Direction via data attribute */
  .neil[data-direction="left"] {
    transform: scaleX(-1);
  }
}
```

#### Leela (Corgi)

| Animation | Full Motion | Reduced Motion |
|-----------|-------------|----------------|
| Idle breathing | Subtle breathing (900ms) | Static pose |
| Tail wagging | Continuous wag (300ms cycle) | Static (tail visible) |
| Ear twitching | Random twitch (3-5s) | Static ears up |
| Walking/trotting | 4-frame trot (350ms) | Static walking pose |
| Sleeping | Breathing + Zzz (2000ms) | Static sleeping pose |
| Alert | Ears up, still | Static alert pose |
| Playful | Bouncing animation | Static playful pose |

```css
/* Full motion: Leela animations */
.leela-idle {
  animation: leela-breathe 900ms steps(2) infinite;
}

.leela-tail {
  animation: leela-wag 300ms steps(3) infinite;
}

.leela-sleeping {
  animation: leela-sleep 2000ms ease-in-out infinite;
}

/* Reduced motion: Static poses */
@media (prefers-reduced-motion: reduce) {
  .leela,
  .leela-idle,
  .leela-walking,
  .leela-sleeping,
  .leela-alert,
  .leela-playful {
    animation: none !important;
  }
  
  .leela-tail {
    animation: none !important;
    /* Show tail in neutral position */
    transform: rotate(20deg);
  }
  
  .leela-sleeping {
    background-position: -64px 0; /* Sleeping frame */
  }
  
  /* Hide decorative Zzz */
  .leela-zzz {
    display: none;
  }
}
```

---

### Micro-Interactions

#### Hover Effects

| Element | Full Motion | Reduced Motion |
|---------|-------------|----------------|
| District cards | Scale up + glow pulse | Background color change |
| Building cards | Lift + shadow | Border highlight |
| Buttons | Scale + color transition | Instant color change |
| Links | Underline slide | Instant underline |
| Floor rows | Slide + arrow appear | Background change |

```css
/* Full motion: Animated hovers */
.district-card {
  transition: transform 200ms var(--ease-standard),
              filter 200ms var(--ease-standard);
}

.district-card:hover {
  transform: scale(1.03);
  filter: brightness(1.1) drop-shadow(0 0 8px var(--color-glow));
}

.btn {
  transition: transform 150ms var(--ease-standard),
              background-color 150ms var(--ease-standard);
}

.btn:hover {
  transform: scale(1.02);
}

/* Reduced motion: Instant state changes */
@media (prefers-reduced-motion: reduce) {
  .district-card,
  .building-card,
  .btn,
  .floor-row,
  a {
    transition: none !important;
  }
  
  .district-card:hover,
  .building-card:hover {
    transform: none;
    filter: none;
    /* Use background color change instead */
    background-color: var(--color-hover-bg);
    outline: 2px solid var(--color-focus);
  }
  
  .btn:hover {
    transform: none;
    background-color: var(--color-btn-hover);
  }
  
  a:hover {
    /* Instant underline */
    text-decoration: underline;
  }
}
```

#### Click Feedback

| Element | Full Motion | Reduced Motion |
|---------|-------------|----------------|
| Buttons | Scale down + ripple | Instant color change |
| Cards | Press effect | Border pulse (instant) |
| Train | Bounce | Flash/highlight |

```css
/* Full motion: Press animation */
.btn:active {
  transform: scale(0.96);
  transition-duration: 50ms;
}

.btn .ripple {
  animation: ripple-expand 400ms ease-out forwards;
}

/* Reduced motion: Instant feedback */
@media (prefers-reduced-motion: reduce) {
  .btn:active {
    transform: none;
    background-color: var(--color-btn-active);
  }
  
  .btn .ripple {
    display: none;
  }
  
  /* Alternative: instant highlight */
  .btn:active::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.2);
  }
}
```

#### Focus States

```css
/* Focus transitions remain minimal in both modes */
:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

/* Full motion: Subtle focus animation */
:focus-visible {
  transition: outline-offset 150ms ease;
  outline-offset: 4px;
}

/* Reduced motion: Instant focus */
@media (prefers-reduced-motion: reduce) {
  :focus-visible {
    transition: none !important;
    outline-offset: 2px; /* No transition, immediate visible */
  }
}
```

---

### Loading States

#### Skeleton Loaders

| Aspect | Full Motion | Reduced Motion |
|--------|-------------|----------------|
| Shimmer | Animated gradient wave | Static gray placeholder |
| Pulse | Opacity pulse | No pulse |
| Duration | Until content loads | Same |

```css
/* Full motion: Shimmer effect */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-skeleton) 25%,
    var(--color-skeleton-highlight) 50%,
    var(--color-skeleton) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1500ms ease-in-out infinite;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Reduced motion: Static placeholder */
@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
    background: var(--color-skeleton);
    /* Solid gray, no movement */
  }
}
```

#### Progress Indicators

```css
/* Full motion: Spinning loader */
.spinner {
  animation: spin 800ms linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Reduced motion: Progress bar or static */
@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
    /* Show static loading icon instead */
  }
  
  /* Alternative: Use progress bar */
  .loading-indicator {
    display: none;
  }
  
  .loading-indicator-reduced {
    display: block;
    /* Static or progress bar */
  }
}
```

---

### Ambient/Decorative Animations

These are purely decorative and should be completely disabled:

```css
/* Full motion: Ambient effects */
.city-clouds {
  animation: float-clouds 60000ms linear infinite;
}

.window-lights {
  animation: twinkle 4000ms ease-in-out infinite;
}

.tree-sway {
  animation: gentle-sway 5000ms ease-in-out infinite;
}

.track-glow {
  animation: pulse-glow 3000ms ease-in-out infinite;
}

.parallax-background {
  animation: parallax-scroll 1000ms ease-out;
}

/* Reduced motion: Hide or disable all ambient */
@media (prefers-reduced-motion: reduce) {
  .city-clouds,
  .floating-particles,
  .ambient-animation,
  .window-lights,
  .tree-sway,
  .track-glow {
    animation: none !important;
  }
  
  /* Optionally hide purely decorative elements */
  .city-clouds,
  .floating-particles {
    display: none;
  }
  
  /* Keep static versions of important decorative elements */
  .window-lights {
    opacity: 0.8; /* Static glow */
  }
  
  .tree-sway {
    transform: none; /* Static tree */
  }
  
  .parallax-background {
    animation: none;
    transform: none !important;
  }
}
```

---

## Manual Override System

Allow users to override system preferences:

### Settings UI

```html
<fieldset class="motion-preferences">
  <legend>Animation Preferences</legend>
  
  <label class="motion-option">
    <input 
      type="radio" 
      name="motion-preference" 
      value="system" 
      checked
    >
    <span class="option-label">Use system preference</span>
    <span class="option-description">
      Currently: <span id="system-motion-status">Full animations</span>
    </span>
  </label>
  
  <label class="motion-option">
    <input 
      type="radio" 
      name="motion-preference" 
      value="reduced"
    >
    <span class="option-label">Reduce motion</span>
    <span class="option-description">
      Minimal animations, instant transitions
    </span>
  </label>
  
  <label class="motion-option">
    <input 
      type="radio" 
      name="motion-preference" 
      value="full"
    >
    <span class="option-label">Full animations</span>
    <span class="option-description">
      All visual effects enabled
    </span>
  </label>
</fieldset>
```

### JavaScript Implementation

```javascript
const STORAGE_KEY = 'motion-preference';

// Priority: User override > System preference
function getMotionPreference() {
  const userPref = localStorage.getItem(STORAGE_KEY);
  
  if (userPref === 'reduced') return 'reduced';
  if (userPref === 'full') return 'full';
  
  // Default to system preference
  return prefersReducedMotion.matches ? 'reduced' : 'full';
}

function setMotionPreference(value) {
  if (value === 'system') {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, value);
  }
  
  applyMotionPreference();
}

function applyMotionPreference() {
  const pref = getMotionPreference();
  
  // Apply via data attribute for CSS hooks
  document.documentElement.dataset.motion = pref;
  
  // Update any running animations
  if (pref === 'reduced') {
    cancelAllAnimations();
  }
}

// CSS can hook into the data attribute
// html[data-motion="reduced"] .animated { animation: none; }

// Initialize on page load
applyMotionPreference();

// Listen for system preference changes
prefersReducedMotion.addEventListener('change', () => {
  // Re-evaluate if user is using system preference
  if (!localStorage.getItem(STORAGE_KEY)) {
    applyMotionPreference();
  }
  
  // Update UI to reflect system status
  updateSystemMotionStatus();
});
```

### CSS Hooks

```css
/* Support both media query and data attribute */

/* Media query (system preference) */
@media (prefers-reduced-motion: reduce) {
  .animated { animation: none; }
}

/* Data attribute (user override) */
html[data-motion="reduced"] .animated {
  animation: none !important;
}

html[data-motion="full"] .animated {
  /* Force animations even if system prefers reduced */
  animation-play-state: running !important;
}
```

---

## Comprehensive Element Matrix

| Element | Full Motion | Reduced Motion Alternative |
|---------|-------------|---------------------------|
| **Navigation** | | |
| Train journey | Animated travel along tracks | Instant position + crossfade |
| City → District | Camera zoom + focus | Crossfade (200ms) |
| District → Building | Building grow + cutaway | Crossfade (200ms) |
| Building → Floor | Slide transition | Crossfade (100ms) |
| Floor → Floor | Slide left/right | Crossfade (100ms) |
| Browser back/forward | Reverse animations | Crossfade (200ms) |
| **Train** | | |
| Idle breathing | Subtle oscillation | Static |
| Steam puffs | Animated particles | Static puff or hidden |
| Window glow | Pulse animation | Static glow |
| Departure bounce | Anticipation animation | Instant move |
| Track shimmer | Glow pulse | Static or hidden |
| **Characters** | | |
| Neil idle | Breathing + blink | Static standing |
| Neil walking | 4-frame cycle | Static mid-walk |
| Neil working | Typing animation | Static at desk |
| Neil pointing | Arm animation | Static pointing |
| Leela idle | Breathing + tail wag | Static with tail |
| Leela walking | Trot cycle | Static trotting |
| Leela sleeping | Breathing + Zzz | Static sleeping |
| **Micro-Interactions** | | |
| Button hover | Scale + glow | Background color |
| Button press | Scale down + ripple | Instant color change |
| Card hover | Lift + shadow | Border highlight |
| Link hover | Underline slide | Instant underline |
| Focus | Outline grow | Instant outline |
| Form validation | Shake on error | Instant highlight |
| Toast appear | Slide in | Instant appear |
| Toast dismiss | Slide out | Instant disappear |
| **Loading** | | |
| Skeleton shimmer | Animated gradient | Static gray |
| Spinner | Rotation | Progress bar or static |
| Content reveal | Staggered fade-in | Instant appear |
| **Ambient/Decorative** | | |
| Floating clouds | Drift animation | Hidden or static |
| Window twinkle | Light pulse | Static glow |
| Tree sway | Gentle movement | Static |
| Track glow | Pulse | Static or hidden |
| Parallax layers | Movement on scroll | No parallax |

---

## Implementation Checklist

### CSS Requirements

- [ ] Global reduced motion media query in `global.css`
- [ ] All `animation` properties have reduced-motion override
- [ ] All `transition` properties have reduced-motion override
- [ ] Scroll behavior set to `auto` in reduced motion
- [ ] Decorative animations hidden or static
- [ ] Essential state changes use 100ms max transition
- [ ] Data attribute hooks for manual override

### JavaScript Requirements

- [ ] `prefersReducedMotion` media query listener
- [ ] `shouldAnimate()` helper function
- [ ] All programmatic animations check preference
- [ ] Preference change listener implemented
- [ ] Manual override system with localStorage
- [ ] Animation cancellation utility

### Testing Requirements

- [ ] Test with macOS "Reduce motion" enabled
- [ ] Test with Windows "Show animations" disabled
- [ ] Test manual override (force reduced)
- [ ] Test manual override (force full)
- [ ] Test preference change mid-session
- [ ] Verify no information loss with reduced motion
- [ ] Verify all interactions remain functional
- [ ] Screen reader announces all state changes

### Performance Considerations

```css
/* Ensure reduced motion actually reduces work */
@media (prefers-reduced-motion: reduce) {
  /* Remove will-change hints (no longer needed) */
  .train,
  .character,
  .building {
    will-change: auto;
  }
  
  /* Simplify transforms */
  .parallax-layer {
    transform: none;
  }
  
  /* Remove GPU-intensive effects */
  .glow-effect,
  .blur-effect {
    filter: none;
  }
}
```

---

## Screen Reader Considerations

Ensure announcements work regardless of motion preference:

```javascript
function navigateToDistrict(districtId) {
  // Always announce, regardless of animation
  announceToScreenReader(`Navigating to ${districtId}`);
  
  if (shouldAnimate()) {
    await animatedNavigation(districtId);
  } else {
    await instantNavigation(districtId);
  }
  
  // Always announce completion
  announceToScreenReader(`Now viewing ${districtId}`);
}
```

---

## Integration Notes

### For Frontend Developer
- Import reduced motion styles early in cascade
- Use `shouldAnimate()` before any programmatic animation
- Test all features with both motion preferences

### For Interaction Designer
- Design static alternatives for every animated element
- Ensure static states convey the same information
- Document the alternative in spec files

### For QA Specialist
- Include reduced motion in test matrix
- Test on real devices with system preference
- Verify functional equivalence

---

## Related Documents

- [Motion System](./motion-system.md) - Core animation principles and timing
- [Character Animation](./character-animation.md) - Neil and Leela animation specs
- [Train Animation](./train-animation.md) - Train system animation specs
- [View Transitions](./view-transitions.md) - Page transition specifications
- [Micro-Interactions](./micro-interactions.md) - Hover, click, loading patterns
- [Accessibility](./accessibility.md) - Full accessibility strategy
