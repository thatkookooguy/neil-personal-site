# Micro-Interactions: Neil's City Site

**Date Created**: December 26, 2025  
**Last Updated**: December 26, 2025  
**Purpose**: Define hover states, click feedback, loading states, and moment-to-moment interactions

---

## Micro-Interaction Philosophy

### Dan Saffer's Four Parts

Every micro-interaction in Neil's City follows this structure:

| Part | Description | Our Approach |
|------|-------------|--------------|
| **Trigger** | What initiates the interaction | User action (click, hover) or system event (load, error) |
| **Rules** | What happens when triggered | Consistent, predictable behavior |
| **Feedback** | How we show what's happening | Visual + optional audio, never just one |
| **Loops & Modes** | Repeated or contextual behavior | Subtle loops for loading, mode switches for states |

### Design Principles

1. **Immediate**: Response within 100ms of trigger
2. **Proportional**: Feedback intensity matches action importance
3. **Informative**: Motion communicates state, not decorates
4. **Consistent**: Same interaction = same response everywhere
5. **Delightful (sparingly)**: Reserve "wow" for key moments

---

## Hover States

### District Hover (City View)

```
┌─────────────────────────────────────────────────────────────────────┐
│ INTERACTION: District Hover                                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  TRIGGER: Mouse enters district hitbox                              │
│                                                                      │
│  DEFAULT STATE:                    HOVER STATE:                      │
│  ┌───────────┐                    ┌───────────┐                     │
│  │           │                    │  ✨glow✨  │                     │
│  │   🤖 AI   │          →        │   🤖 AI   │  ← scale 1.02       │
│  │           │                    │ "Explore" │  ← tooltip          │
│  └───────────┘                    └───────────┘                     │
│                                                                      │
│  FEEDBACK:                                                          │
│  • Scale up to 1.02                                                 │
│  • District glow effect (box-shadow pulse)                          │
│  • Tooltip appears with district name + building count             │
│  • Cursor changes to pointer                                        │
│                                                                      │
│  TIMING: 150ms ease-standard                                        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.district {
  transition: 
    transform var(--duration-fast) var(--ease-standard),
    filter var(--duration-fast) var(--ease-standard);
  cursor: default;
}

.district:hover {
  transform: scale(1.02);
  filter: brightness(1.1);
  cursor: pointer;
}

/* District glow effect */
.district::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: inherit;
  opacity: 0;
  box-shadow: 0 0 20px var(--district-glow-color);
  transition: opacity var(--duration-fast) var(--ease-standard);
  pointer-events: none;
}

.district:hover::after {
  opacity: 0.6;
  animation: glowPulse 2s var(--ease-gentle) infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.8; }
}

/* Tooltip */
.district-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  opacity: 0;
  pointer-events: none;
  transition: 
    opacity var(--duration-fast) var(--ease-enter),
    transform var(--duration-fast) var(--ease-enter);
}

.district:hover .district-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
```

### Building Hover (District View)

```
┌─────────────────────────────────────────────────────────────────────┐
│ INTERACTION: Building Hover                                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  TRIGGER: Mouse enters building hitbox                              │
│                                                                      │
│  DEFAULT STATE:                    HOVER STATE:                      │
│  ┌─────────────┐                  ┌─────────────┐                   │
│  │    🏢🏢🏢   │                  │    🏢🏢🏢   │                   │
│  │  Workflows  │         →       │  Workflows  │  ← lift up 4px    │
│  │             │                  │   3 floors  │  ← info card      │
│  └─────────────┘                  └─────────────┘                   │
│        ░░░░░░                          ▓▓▓▓▓▓   ← shadow deepens    │
│                                                                      │
│  FEEDBACK:                                                          │
│  • Lift up (translateY -4px)                                        │
│  • Shadow deepens and spreads                                       │
│  • Info card appears with floor count                               │
│  • Windows may "light up"                                           │
│                                                                      │
│  TIMING: 200ms ease-organic                                         │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.building {
  transition: 
    transform var(--duration-quick) var(--ease-organic),
    box-shadow var(--duration-quick) var(--ease-standard);
  cursor: pointer;
}

.building:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.15),
    0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Window light-up effect */
.building-windows {
  transition: filter var(--duration-quick) var(--ease-standard);
}

.building:hover .building-windows {
  filter: brightness(1.3);
}

/* Info card */
.building-info {
  position: absolute;
  top: 0;
  right: -120px;
  opacity: 0;
  transform: translateX(-10px);
  transition: 
    opacity var(--duration-quick) var(--ease-enter),
    transform var(--duration-quick) var(--ease-enter);
}

.building:hover .building-info {
  opacity: 1;
  transform: translateX(0);
}
```

### Floor Hover (Building View)

```
┌─────────────────────────────────────────────────────────────────────┐
│ INTERACTION: Floor Hover                                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  TRIGGER: Mouse enters floor row                                    │
│                                                                      │
│  DEFAULT STATE:                    HOVER STATE:                      │
│  ╔══════════════════════╗         ╔══════════════════════╗          │
│  ║ Prompt Engineering   ║         ║ Prompt Engineering ▶ ║          │
│  ╠══════════════════════╣   →    ╠══════════════════════╣          │
│  ║ Chain of Thought     ║         ║ Chain of Thought     ║          │
│  ╚══════════════════════╝         ╚══════════════════════╝          │
│                                   ↑ background highlight             │
│                                   ↑ arrow appears                    │
│                                                                      │
│  FEEDBACK:                                                          │
│  • Background color shifts to hover state                           │
│  • Arrow/chevron appears on right                                   │
│  • Slight left padding increase (content shifts 4px right)          │
│  • Preview text may expand                                          │
│                                                                      │
│  TIMING: 150ms ease-snap                                            │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.floor-row {
  display: flex;
  align-items: center;
  padding: var(--space-4);
  background: var(--surface-default);
  border-bottom: 1px solid var(--border-subtle);
  transition: 
    background-color var(--duration-fast) var(--ease-snap),
    padding-left var(--duration-fast) var(--ease-snap);
  cursor: pointer;
}

.floor-row:hover {
  background: var(--bg-subtle);
  padding-left: calc(var(--space-4) + 4px);
}

.floor-row::after {
  content: '→';
  opacity: 0;
  transform: translateX(-8px);
  transition: 
    opacity var(--duration-fast) var(--ease-enter),
    transform var(--duration-fast) var(--ease-enter);
}

.floor-row:hover::after {
  opacity: 1;
  transform: translateX(0);
}
```

### Link Hover

```
┌─────────────────────────────────────────────────────────────────────┐
│ INTERACTION: Text Link Hover                                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DEFAULT:     Learn more about AI                                   │
│               ─────────────────                                     │
│                                  ↑ underline (dashed)               │
│                                                                      │
│  HOVER:       Learn more about AI                                   │
│               ═════════════════                                     │
│                                  ↑ underline animates to solid      │
│                                  ↑ color slightly darker            │
│                                                                      │
│  FEEDBACK:                                                          │
│  • Underline transitions from dashed to solid                       │
│  • Underline offset decreases (closer to text)                      │
│  • Color shifts to hover variant                                    │
│                                                                      │
│  TIMING: 150ms ease-standard                                        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
a {
  color: var(--text-link);
  text-decoration: underline;
  text-decoration-style: dashed;
  text-underline-offset: 4px;
  text-decoration-color: var(--text-link);
  text-decoration-thickness: 1px;
  transition: 
    color var(--duration-fast) var(--ease-standard),
    text-decoration-style var(--duration-fast) var(--ease-standard),
    text-underline-offset var(--duration-fast) var(--ease-standard),
    text-decoration-thickness var(--duration-fast) var(--ease-standard);
}

a:hover {
  color: var(--text-link-hover);
  text-decoration-style: solid;
  text-underline-offset: 2px;
  text-decoration-thickness: 2px;
}

a:active {
  text-underline-offset: 1px;
}
```

---

## Click/Tap Feedback

### Button Press

```
┌─────────────────────────────────────────────────────────────────────┐
│ INTERACTION: Primary Button Click                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  STATE PROGRESSION:                                                 │
│                                                                      │
│  DEFAULT:      ┌──────────────┐                                     │
│                │  Explore AI  │   scale: 1.0                        │
│                └──────────────┘   bg: teal-500                      │
│                                                                      │
│  HOVER:        ┌──────────────┐                                     │
│                │  Explore AI  │   scale: 1.0                        │
│                └──────────────┘   bg: teal-600 (darker)             │
│                                                                      │
│  ACTIVE:       ┌────────────┐                                       │
│                │ Explore AI │     scale: 0.97 (pressed)             │
│                └────────────┘     bg: teal-700                      │
│                                                                      │
│  RELEASE:      (returns to hover if still hovering, else default)   │
│                                                                      │
│  TIMING:                                                            │
│  • Hover: 150ms ease-standard                                       │
│  • Active: 100ms ease-snap (immediate feel)                         │
│  • Release: 150ms ease-bounce (satisfying return)                   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.btn-primary {
  background: var(--action-primary-bg);
  color: var(--action-primary-fg);
  padding: var(--space-3) var(--space-6);
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transform: scale(1);
  transition: 
    background-color var(--duration-fast) var(--ease-standard),
    transform var(--duration-fast) var(--ease-bounce);
}

.btn-primary:hover {
  background: var(--action-primary-bg-hover);
}

.btn-primary:active {
  background: var(--action-primary-bg-active);
  transform: scale(0.97);
  transition-duration: var(--duration-micro);
}

/* Focus state (accessibility) */
.btn-primary:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 2px;
}
```

### Icon Button Press

```css
.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: transparent;
  transition: 
    background-color var(--duration-fast) var(--ease-standard),
    transform var(--duration-fast) var(--ease-bounce);
}

.btn-icon:hover {
  background: var(--bg-subtle);
}

.btn-icon:active {
  background: var(--bg-muted);
  transform: scale(0.92);
}

/* Icon inside rotates slightly on hover */
.btn-icon svg {
  transition: transform var(--duration-fast) var(--ease-standard);
}

.btn-icon:hover svg {
  transform: rotate(5deg);
}
```

### Selection Feedback

```
┌─────────────────────────────────────────────────────────────────────┐
│ INTERACTION: Item Selection (e.g., district picker, floor list)     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  TRIGGER: Click on selectable item                                  │
│                                                                      │
│  FEEDBACK:                                                          │
│  1. Immediate ripple effect from click point (100ms)                │
│  2. Background color transition (150ms)                             │
│  3. Check mark or selected indicator appears (200ms)                │
│                                                                      │
│  ┌─────────────────────────────────────────┐                        │
│  │ ○ AI District                           │                        │
│  ├─────────────────────────────────────────┤                        │
│  │ ● Architecture District  ← selected     │ ← bg: teal-50         │
│  ├─────────────────────────────────────────┤   indicator visible    │
│  │ ○ DX District                           │                        │
│  └─────────────────────────────────────────┘                        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.selectable-item {
  position: relative;
  overflow: hidden;
  padding: var(--space-4);
  cursor: pointer;
  transition: background-color var(--duration-fast) var(--ease-standard);
}

.selectable-item.selected {
  background: var(--selection-bg);
}

/* Ripple effect */
.selectable-item::after {
  content: '';
  position: absolute;
  top: var(--ripple-y, 50%);
  left: var(--ripple-x, 50%);
  width: 100%;
  padding-top: 100%;
  border-radius: 50%;
  background: var(--action-primary-bg);
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
  pointer-events: none;
}

.selectable-item.rippling::after {
  animation: ripple 400ms var(--ease-standard) forwards;
}

@keyframes ripple {
  0% {
    opacity: 0.15;
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(2);
  }
}
```

```javascript
// Ripple effect JavaScript
function handleRipple(event) {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  
  button.style.setProperty('--ripple-x', `${x}%`);
  button.style.setProperty('--ripple-y', `${y}%`);
  button.classList.add('rippling');
  
  setTimeout(() => button.classList.remove('rippling'), 400);
}
```

---

## Loading States

### Skeleton Loading

```
┌─────────────────────────────────────────────────────────────────────┐
│ PATTERN: Skeleton Pulse Animation                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  USE: When content structure is known, loading content              │
│                                                                      │
│  APPEARANCE:                                                        │
│  ┌─────────────────────────────────────────┐                        │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  ← title skeleton       │
│  │ ════════════════════════════════════════│  ← shimmer passes     │
│  │                                          │                        │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  ← paragraph            │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│                          │
│  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░         │                          │
│  └─────────────────────────────────────────┘                        │
│                                                                      │
│  ANIMATION: Shimmer effect (gradient slides left to right)         │
│  TIMING: 1.5s linear infinite                                       │
│  DELAY: Stagger skeleton elements by 100ms                          │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-subtle) 0%,
    var(--bg-muted) 50%,
    var(--bg-subtle) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s linear infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Skeleton variants */
.skeleton-title {
  height: 32px;
  width: 60%;
  margin-bottom: var(--space-4);
}

.skeleton-text {
  height: 16px;
  width: 100%;
  margin-bottom: var(--space-2);
}

.skeleton-text:last-child {
  width: 80%;
}

/* Stagger appearance */
.skeleton:nth-child(1) { animation-delay: 0ms; }
.skeleton:nth-child(2) { animation-delay: 100ms; }
.skeleton:nth-child(3) { animation-delay: 200ms; }
```

### Building Loading (Isometric Skeleton)

```
┌─────────────────────────────────────────────────────────────────────┐
│ PATTERN: Building Skeleton                                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  USE: When loading building/floor data in district view             │
│                                                                      │
│  APPEARANCE:                                                        │
│  ┌───────────────┐                                                  │
│  │ ┌───────────┐ │  ← roof outline pulses                          │
│  │ │░░░░░░░░░░░│ │  ← floor blocks pulse sequentially              │
│  │ │░░░░░░░░░░░│ │                                                  │
│  │ │░░░░░░░░░░░│ │                                                  │
│  │ └───────────┘ │                                                  │
│  └───────────────┘                                                  │
│                                                                      │
│  ANIMATION:                                                         │
│  • Outline pulses with soft glow                                    │
│  • Floor blocks shimmer from bottom to top                          │
│  • "Construction" feel                                              │
│                                                                      │
│  TIMING: 2s ease-gentle, stagger 150ms per floor                    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.building-skeleton {
  position: relative;
}

.building-skeleton-outline {
  stroke: var(--border-default);
  stroke-dasharray: 4 2;
  animation: outlinePulse 2s var(--ease-gentle) infinite;
}

@keyframes outlinePulse {
  0%, 100% { stroke-opacity: 0.3; }
  50% { stroke-opacity: 0.7; }
}

.building-skeleton-floor {
  fill: var(--bg-muted);
  animation: floorBuild 2s var(--ease-gentle) infinite;
}

.building-skeleton-floor:nth-child(1) { animation-delay: 0ms; }
.building-skeleton-floor:nth-child(2) { animation-delay: 150ms; }
.building-skeleton-floor:nth-child(3) { animation-delay: 300ms; }
.building-skeleton-floor:nth-child(4) { animation-delay: 450ms; }

@keyframes floorBuild {
  0%, 100% { opacity: 0.3; transform: scaleY(0.95); }
  50% { opacity: 0.6; transform: scaleY(1); }
}
```

### Train "Waiting" Animation

```
┌─────────────────────────────────────────────────────────────────────┐
│ PATTERN: Train Waiting at Station                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  USE: When district is loading after train arrives                  │
│                                                                      │
│  APPEARANCE:                                                        │
│       🚂═══╗                                                        │
│            ║  ← steam puffs rise                                    │
│     ~~~~~~ ║  ← subtle side-to-side sway                            │
│  ═══════╝                                                           │
│                                                                      │
│  ANIMATION:                                                         │
│  • Train has subtle idle "breathing" (scale 1.0 ↔ 1.005)            │
│  • Steam particles rise intermittently                              │
│  • Wheels have micro-rotation (pixel-style, 2 frames)               │
│                                                                      │
│  TIMING: Breathing 3s, steam 2s staggered, wheels 500ms             │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Content Fade-In (After Load)

```
┌─────────────────────────────────────────────────────────────────────┐
│ PATTERN: Content Reveal After Loading                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  TRIGGER: Content data received, skeleton needs to transition       │
│                                                                      │
│  SEQUENCE:                                                          │
│  1. Skeleton shimmer stops (animation-play-state: paused)           │
│  2. Skeleton fades out (150ms)                                      │
│  3. Real content fades in (200ms, staggered)                        │
│                                                                      │
│  TIMING: Total 350ms, feels instant but smooth                      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.content-loaded .skeleton {
  animation: skeletonOut 150ms var(--ease-exit) forwards;
}

@keyframes skeletonOut {
  to { opacity: 0; }
}

.content-loaded .real-content {
  animation: contentIn 200ms var(--ease-enter) forwards;
  animation-delay: 150ms;
}

.content-loaded .real-content:nth-child(1) { animation-delay: 150ms; }
.content-loaded .real-content:nth-child(2) { animation-delay: 180ms; }
.content-loaded .real-content:nth-child(3) { animation-delay: 210ms; }

@keyframes contentIn {
  from { 
    opacity: 0; 
    transform: translateY(8px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}
```

### Progress Indicators

```
┌─────────────────────────────────────────────────────────────────────┐
│ PATTERN: Determinate Progress (when % known)                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ████████████░░░░░░░░░░░░░░░░░░  45%                                │
│  ↑ filled portion animates                                          │
│                                                                      │
│  ANIMATION:                                                         │
│  • Progress fill uses ease-out for satisfying growth                │
│  • Percentage number counts up smoothly                             │
│                                                                      │
│  TIMING: 300ms per 10% increment                                    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ PATTERN: Indeterminate Progress (when % unknown)                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ░░░░████████░░░░░░░░░░░░░░░░░░                                     │
│       ↑ sliding bar moves left to right, loops                      │
│                                                                      │
│  ANIMATION:                                                         │
│  • Bar slides across track                                          │
│  • Slight scale pulse on the bar                                    │
│                                                                      │
│  TIMING: 1.5s ease-in-out infinite                                  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
/* Determinate progress */
.progress-bar {
  height: 8px;
  background: var(--bg-muted);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--action-primary-bg);
  border-radius: 4px;
  transition: width 300ms var(--ease-enter);
}

/* Indeterminate progress */
.progress-indeterminate .progress-fill {
  width: 30%;
  animation: indeterminateSlide 1.5s ease-in-out infinite;
}

@keyframes indeterminateSlide {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
```

---

## Focus States

### Focus Ring Standard

```css
/* Global focus ring */
:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 2px;
}

/* Remove default focus for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}

/* High contrast mode support */
@media (forced-colors: active) {
  :focus-visible {
    outline: 3px solid CanvasText;
  }
}
```

### Interactive Element Focus

```css
/* Buttons */
.btn:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(var(--focus-ring-rgb), 0.15);
}

/* Cards/Districts */
.district:focus-visible,
.building:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 4px;
}

/* Form inputs */
input:focus-visible,
textarea:focus-visible {
  outline: none;
  border-color: var(--focus-ring);
  box-shadow: 0 0 0 3px rgba(var(--focus-ring-rgb), 0.2);
}
```

---

## Error & Success States

### Error Shake

```
┌─────────────────────────────────────────────────────────────────────┐
│ INTERACTION: Error Feedback                                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  TRIGGER: Validation error, failed action                           │
│                                                                      │
│  FEEDBACK:                                                          │
│  1. Element shakes horizontally (3 oscillations)                    │
│  2. Border turns error red                                          │
│  3. Error message fades in below                                    │
│  4. Screen reader announces error                                   │
│                                                                      │
│  TIMING: Shake 400ms, color 150ms, message 200ms                    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.input-error {
  border-color: var(--color-error);
  animation: shake 400ms cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

@keyframes shake {
  10%, 90% { transform: translateX(-1px); }
  20%, 80% { transform: translateX(2px); }
  30%, 50%, 70% { transform: translateX(-4px); }
  40%, 60% { transform: translateX(4px); }
}

.error-message {
  color: var(--color-error);
  animation: slideDown 200ms var(--ease-enter);
}

@keyframes slideDown {
  from { 
    opacity: 0; 
    transform: translateY(-8px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}
```

### Success Confirmation

```
┌─────────────────────────────────────────────────────────────────────┐
│ INTERACTION: Success Feedback                                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  TRIGGER: Successful action completion                              │
│                                                                      │
│  FEEDBACK:                                                          │
│  1. Checkmark draws in (stroke animation)                           │
│  2. Brief scale pulse (1 → 1.1 → 1)                                 │
│  3. Green color wash                                                │
│  4. Optional: confetti for major achievements                       │
│                                                                      │
│  TIMING: Checkmark 300ms, pulse 200ms                               │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.success-icon {
  animation: successPop 300ms var(--ease-bounce);
}

@keyframes successPop {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}

/* Checkmark stroke draw */
.checkmark-path {
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
  animation: drawCheck 300ms var(--ease-standard) forwards;
  animation-delay: 100ms;
}

@keyframes drawCheck {
  to { stroke-dashoffset: 0; }
}
```

---

## Toast Notifications

```
┌─────────────────────────────────────────────────────────────────────┐
│ INTERACTION: Toast Notification                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ENTRY:                                                             │
│  • Slides in from bottom-right (or top-right on mobile)             │
│  • Slight overshoot (ease-bounce)                                   │
│                                                                      │
│  STAY:                                                              │
│  • Auto-dismiss after 4 seconds (configurable)                      │
│  • Progress bar at bottom shows time remaining                      │
│  • Hover pauses countdown                                           │
│                                                                      │
│  EXIT:                                                              │
│  • Slides out to right + fade                                       │
│  • Faster than entry (200ms vs 300ms)                               │
│                                                                      │
│  ┌────────────────────────────────────┐                             │
│  │ ✓  Content saved successfully     ✕│                             │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░│  ← progress bar              │
│  └────────────────────────────────────┘                             │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
.toast {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  min-width: 300px;
  background: var(--surface-raised);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: toastIn 300ms var(--ease-bounce);
}

@keyframes toastIn {
  from {
    transform: translateX(100%) translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0) translateY(0);
    opacity: 1;
  }
}

.toast.exiting {
  animation: toastOut 200ms var(--ease-exit) forwards;
}

@keyframes toastOut {
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* Progress bar */
.toast-progress {
  height: 3px;
  background: var(--action-primary-bg);
  animation: progressShrink var(--toast-duration, 4s) linear forwards;
}

.toast:hover .toast-progress {
  animation-play-state: paused;
}

@keyframes progressShrink {
  from { width: 100%; }
  to { width: 0%; }
}
```

---

## Audio Sync Suggestions

### When to Trigger Sounds

| Interaction | Sound | Notes |
|-------------|-------|-------|
| Train departure | Whistle (soft) | Once per journey |
| Train arrival | Bell chime | Subtle, short |
| Building enter | Door/elevator | Very subtle |
| Floor navigation | Page turn | Optional, soft |
| Button click | Soft click | Very short, low volume |
| Error | Low thud | Distinct but not harsh |
| Success | Gentle chime | Celebratory but brief |
| Achievement | Pixel "level up" | Easter egg moments only |

### Audio Guidelines

1. **Always optional**: Sounds off by default, toggle to enable
2. **Never jarring**: Soft, ambient, background-appropriate
3. **Paired with visual**: Every sound has visual feedback equivalent
4. **Reduced motion = reduced audio**: Respect accessibility preferences
5. **One at a time**: No overlapping sounds

---

## State Summary Table

| Element | Default | Hover | Focus | Active | Disabled | Loading | Error | Success |
|---------|---------|-------|-------|--------|----------|---------|-------|---------|
| **Button** | bg-500 | bg-600 | ring | scale 0.97, bg-700 | opacity 0.4 | spinner | shake, red | checkmark |
| **District** | scale 1 | scale 1.02, glow | ring | brightness 1.15 | grayscale | skeleton | — | — |
| **Building** | shadow-sm | lift -4px, shadow-lg | ring | press down | — | outline pulse | — | — |
| **Floor** | bg-surface | bg-subtle, arrow | ring | bg-muted | — | shimmer | red border | green border |
| **Link** | underline dashed | underline solid | ring | offset 1px | strikethrough | — | — | — |
| **Input** | border-default | — | border-focus, shadow | — | opacity 0.4 | — | shake, red | green border |

---

## Reduced Motion Considerations

All micro-interactions degrade gracefully:

| Full Animation | Reduced Motion Alternative |
|----------------|---------------------------|
| Scale on hover | Instant color change |
| Shake on error | Red border + icon only |
| Slide-in toast | Instant appear |
| Skeleton shimmer | Static gray |
| Ripple effect | Instant background change |
| Progress animation | Static filled bar |

```css
@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
    background: var(--bg-muted);
  }
  
  .toast {
    animation: none;
  }
  
  .input-error {
    animation: none;
  }
}
```

---

## Integration Notes

### For Frontend Developer
- Use CSS transitions for simple state changes
- Use CSS animations for loading/ambient states
- Use JavaScript for ripple positioning and sequence control
- Implement sound toggle in user preferences

### For QA Specialist
- Test all hover states on touch devices (should not require hover)
- Verify focus rings are visible in all themes
- Test loading state → content transitions
- Verify error states are announced to screen readers

### For Sound Designer (Future)
- Provide assets in multiple formats (mp3, ogg, wav)
- Keep file sizes under 10KB per sound
- Match audio tone to Ghibli/pixel aesthetic (warm, organic)

---

*Micro-interactions designed for Neil's City Site. Small moments, big impact on feel.*
