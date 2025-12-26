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

## Night Mode Hover Effects

### Overview

When the site is in dark/night mode, hover effects need adjustments to remain visible against the darker background while enhancing the magical, cozy evening atmosphere. Effects should feel more prominent through glow rather than brightness changes.

### Design Philosophy for Night Mode Interactions

| Principle | Day Mode | Night Mode |
|-----------|----------|------------|
| **Primary feedback** | Brightness increase | Glow increase |
| **Secondary feedback** | Shadow deepening | Shadow + glow halo |
| **Accent color** | Teal highlights | Warm amber/gold highlights |
| **Overall feel** | Crisp, clear | Warm, magical |

### District Hover (Night Mode)

```
┌─────────────────────────────────────────────────────────────────────┐
│ INTERACTION: District Hover (Night Mode)                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DEFAULT (Night):                    HOVER (Night):                  │
│  ┌───────────┐                      ┌───────────┐                   │
│  │  🌙       │                      │  ✨✨✨✨  │                   │
│  │   🤖 AI   │          →          │   🤖 AI   │  ← enhanced glow  │
│  │    ░░░    │                      │  ▓▓▓▓▓▓▓  │  ← windows pulse │
│  └───────────┘                      └───────────┘                   │
│                                                                      │
│  NIGHT MODE DIFFERENCES:                                            │
│  • Glow effect more prominent (opacity 0.6 → 0.9)                   │
│  • Glow color shifts warmer (district color + gold)                 │
│  • Windows inside district pulse brighter                           │
│  • Tooltip has subtle backdrop glow                                 │
│                                                                      │
│  TIMING: 200ms ease-gentle (slightly slower for dreamy feel)        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
/* Night mode district hover - enhanced glow */
[data-theme="dark"] .district:hover {
  transform: scale(1.02);
  filter: brightness(1.15);
}

[data-theme="dark"] .district::after {
  box-shadow: 
    0 0 30px var(--district-glow-color),
    0 0 60px rgba(245, 216, 138, 0.2);
}

[data-theme="dark"] .district:hover::after {
  opacity: 0.9;
  animation: nightGlowPulse 2s var(--ease-gentle) infinite;
}

@keyframes nightGlowPulse {
  0%, 100% { 
    opacity: 0.9;
    box-shadow: 
      0 0 30px var(--district-glow-color),
      0 0 60px rgba(245, 216, 138, 0.2);
  }
  50% { 
    opacity: 1;
    box-shadow: 
      0 0 40px var(--district-glow-color),
      0 0 80px rgba(245, 216, 138, 0.3);
  }
}

/* District windows pulse on hover at night */
[data-theme="dark"] .district:hover .building-window.lit {
  animation: windowHoverPulse 0.6s var(--ease-gentle);
}

@keyframes windowHoverPulse {
  0% { filter: brightness(1); }
  50% { filter: brightness(1.4); }
  100% { filter: brightness(1); }
}

/* Night mode tooltip glow */
[data-theme="dark"] .district-tooltip {
  background: var(--surface-raised);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(245, 216, 138, 0.15);
}
```

### Building Hover (Night Mode)

```
┌─────────────────────────────────────────────────────────────────────┐
│ INTERACTION: Building Hover (Night Mode)                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DEFAULT (Night):                   HOVER (Night):                   │
│  ┌─────────────┐                   ┌─────────────┐                  │
│  │  ▓░▓░▓░▓░  │                   │  ▓▓▓▓▓▓▓▓  │  ← all windows   │
│  │  ░▓░▓░▓░▓  │        →         │  ▓▓▓▓▓▓▓▓  │    light up      │
│  │  Workflows  │                   │  Workflows  │                  │
│  └─────────────┘                   └─────────────┘                  │
│       ▒▒▒▒▒▒▒                          ✨▓▓▓▓▓✨ ← glow halo      │
│                                                                      │
│  NIGHT MODE DIFFERENCES:                                            │
│  • Lift still applies (-4px)                                        │
│  • Shadow replaced with warm glow halo                              │
│  • All/most building windows light up on hover                      │
│  • Building outline gains subtle golden highlight                    │
│                                                                      │
│  TIMING: 200ms ease-organic                                         │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
/* Night mode building hover */
[data-theme="dark"] .building {
  transition: 
    transform var(--duration-quick) var(--ease-organic),
    filter var(--duration-quick) var(--ease-gentle);
}

[data-theme="dark"] .building:hover {
  transform: translateY(-4px);
  filter: brightness(1.1);
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(245, 216, 138, 0.25),
    0 0 60px rgba(245, 216, 138, 0.1);
}

/* All windows light up on building hover at night */
[data-theme="dark"] .building:hover .building-window {
  background: var(--window-glow-color, #F5D88A);
  box-shadow: 
    0 0 6px 2px rgba(245, 216, 138, 0.4),
    0 0 12px 3px rgba(245, 216, 138, 0.2);
  transition: 
    background var(--duration-fast) var(--ease-enter),
    box-shadow var(--duration-fast) var(--ease-enter);
}

/* Building outline glow on hover */
[data-theme="dark"] .building:hover::before {
  content: '';
  position: absolute;
  inset: -2px;
  border: 1px solid rgba(245, 216, 138, 0.3);
  border-radius: inherit;
  pointer-events: none;
}
```

### Window Flicker Effects

For added atmosphere, some building windows can have a subtle flicker effect on hover, suggesting activity inside.

```
┌─────────────────────────────────────────────────────────────────────┐
│ INTERACTION: Window Flicker (Night Mode Hover)                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  TRIGGER: Hover over building in night mode                         │
│                                                                      │
│  EFFECT: Random 1-2 windows briefly flicker                         │
│                                                                      │
│  ▓▓▓  →  ▓░▓  →  ▓▓▓  (quick dim and return)                       │
│                                                                      │
│  PURPOSE: Suggests life inside, adds magical realism                │
│                                                                      │
│  TIMING:                                                            │
│  • Flicker duration: 100-200ms                                      │
│  • Random delay: 200-800ms after hover starts                       │
│  • Probability: ~20% chance on hover                                │
│  • Max flickers: 2 windows per hover                                │
│                                                                      │
│  CONSTRAINTS:                                                       │
│  • Only on buildings with 4+ windows                                │
│  • Not on currently loading buildings                               │
│  • Disabled in reduced motion mode                                  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**CSS Implementation:**

```css
/* Window flicker animation */
@keyframes windowFlicker {
  0%, 100% { opacity: 1; filter: brightness(1); }
  50% { opacity: 0.6; filter: brightness(0.7); }
}

/* Applied via JavaScript for random selection */
[data-theme="dark"] .building-window.flickering {
  animation: windowFlicker 150ms var(--ease-snap);
}
```

**JavaScript Implementation:**

```javascript
// Window flicker effect on building hover (night mode only)
function initWindowFlicker() {
  const isDarkMode = () => document.documentElement.getAttribute('data-theme') === 'dark';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) return;
  
  document.querySelectorAll('.building').forEach(building => {
    building.addEventListener('mouseenter', () => {
      if (!isDarkMode()) return;
      
      const windows = building.querySelectorAll('.building-window.lit');
      if (windows.length < 4) return;
      
      // 20% chance of flicker
      if (Math.random() > 0.2) return;
      
      // Random delay before flicker
      const delay = 200 + Math.random() * 600;
      
      setTimeout(() => {
        // Select 1-2 random windows
        const flickerCount = Math.random() > 0.5 ? 2 : 1;
        const shuffled = Array.from(windows).sort(() => Math.random() - 0.5);
        
        shuffled.slice(0, flickerCount).forEach(window => {
          window.classList.add('flickering');
          setTimeout(() => window.classList.remove('flickering'), 150);
        });
      }, delay);
    });
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', initWindowFlicker);
```

### District Neon Effects (Night Mode)

Each district can have characteristic neon/glow effects that become more prominent on hover at night.

#### AI District — Mystical Node Glow

```css
/* AI District night hover - enhanced mystical glow */
[data-theme="dark"] .district-ai:hover .ai-node {
  animation: aiNodeHoverPulse 1s var(--ease-gentle) infinite;
}

[data-theme="dark"] .district-ai:hover {
  --district-glow-color: rgba(184, 160, 232, 0.6);
}

@keyframes aiNodeHoverPulse {
  0%, 100% {
    box-shadow: 
      0 0 10px rgba(184, 160, 232, 0.6),
      0 0 20px rgba(184, 160, 232, 0.3);
    transform: scale(1);
  }
  50% {
    box-shadow: 
      0 0 20px rgba(184, 160, 232, 0.9),
      0 0 40px rgba(184, 160, 232, 0.5);
    transform: scale(1.05);
  }
}
```

#### Open Source District — Arcade Neon

```css
/* Open Source District night hover - arcade neon effect */
[data-theme="dark"] .district-oss:hover .pixel-sign {
  animation: neonFlickerIntense 2s steps(4) infinite;
}

[data-theme="dark"] .district-oss:hover {
  --district-glow-color: rgba(92, 184, 92, 0.5);
}

@keyframes neonFlickerIntense {
  0%, 45% { 
    opacity: 1; 
    filter: brightness(1.2);
    text-shadow: 0 0 10px rgba(92, 184, 92, 0.8);
  }
  46%, 48% { 
    opacity: 0.7; 
    filter: brightness(0.9);
  }
  49%, 90% { 
    opacity: 1; 
    filter: brightness(1.2);
  }
  91%, 93% { 
    opacity: 0.8; 
    filter: brightness(1);
  }
  94%, 100% { 
    opacity: 1; 
    filter: brightness(1.3);
    text-shadow: 0 0 15px rgba(92, 184, 92, 1);
  }
}
```

#### Infrastructure District — Industrial Glow

```css
/* Infrastructure District night hover - forge/industrial glow */
[data-theme="dark"] .district-infra:hover .forge-element {
  animation: forgeGlowHover 1.5s var(--ease-gentle) infinite;
}

[data-theme="dark"] .district-infra:hover {
  --district-glow-color: rgba(232, 141, 96, 0.5);
}

@keyframes forgeGlowHover {
  0%, 100% {
    background: rgba(232, 141, 96, 0.6);
    box-shadow: 0 0 20px rgba(232, 141, 96, 0.4);
  }
  30% {
    background: rgba(232, 141, 96, 0.9);
    box-shadow: 0 0 40px rgba(232, 141, 96, 0.7);
  }
  70% {
    background: rgba(232, 141, 96, 0.5);
    box-shadow: 0 0 15px rgba(232, 141, 96, 0.3);
  }
}
```

### Floor Hover (Night Mode)

```css
/* Night mode floor row hover */
[data-theme="dark"] .floor-row {
  background: var(--surface-default);
  border-bottom: 1px solid var(--border-subtle);
}

[data-theme="dark"] .floor-row:hover {
  background: rgba(245, 216, 138, 0.08);
  border-left: 3px solid rgba(245, 216, 138, 0.5);
  padding-left: calc(var(--space-4) + 1px);
}

/* Arrow with glow in night mode */
[data-theme="dark"] .floor-row:hover::after {
  color: var(--color-golden);
  text-shadow: 0 0 8px rgba(245, 216, 138, 0.5);
}
```

### Button Hover (Night Mode)

```css
/* Night mode primary button */
[data-theme="dark"] .btn-primary:hover {
  background: var(--action-primary-bg-hover);
  box-shadow: 
    0 0 15px rgba(109, 186, 186, 0.4),
    0 0 30px rgba(109, 186, 186, 0.2);
}

/* Night mode secondary/ghost button */
[data-theme="dark"] .btn-ghost:hover {
  background: rgba(245, 216, 138, 0.1);
  border-color: rgba(245, 216, 138, 0.3);
}
```

### Link Hover (Night Mode)

```css
/* Night mode links - warmer glow */
[data-theme="dark"] a:hover {
  color: var(--text-link-hover);
  text-shadow: 0 0 8px rgba(109, 186, 186, 0.3);
}
```

### Night Mode Interaction Summary Table

| Element | Day Hover | Night Hover | Key Difference |
|---------|-----------|-------------|----------------|
| **District** | Scale + glow | Scale + warm glow halo + window pulse | More prominent, warmer glow |
| **Building** | Lift + shadow | Lift + glow halo + all windows light | Shadow → glow, windows activate |
| **Floor Row** | Background + arrow | Gold-tinted background + glowing arrow | Warmer tint, subtle glow |
| **Button** | Darker background | Background + glow halo | Added glow effect |
| **Link** | Solid underline | Solid underline + text glow | Subtle text shadow |

---

## State Summary Table

| Element | Default | Hover | Focus | Active | Disabled | Loading | Error | Success |
|---------|---------|-------|-------|--------|----------|---------|-------|---------|
| **Button** | bg-500 | bg-600 (+glow night) | ring | scale 0.97, bg-700 | opacity 0.4 | spinner | shake, red | checkmark |
| **District** | scale 1 | scale 1.02, glow (+warm night) | ring | brightness 1.15 | grayscale | skeleton | — | — |
| **Building** | shadow-sm | lift -4px, shadow-lg (+glow night) | ring | press down | — | outline pulse | — | — |
| **Floor** | bg-surface | bg-subtle, arrow (+gold night) | ring | bg-muted | — | shimmer | red border | green border |
| **Link** | underline dashed | underline solid (+glow night) | ring | offset 1px | strikethrough | — | — | — |
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
  
  /* Night mode reduced motion */
  [data-theme="dark"] .district:hover::after,
  [data-theme="dark"] .building:hover .building-window,
  [data-theme="dark"] .ai-node,
  [data-theme="dark"] .pixel-sign,
  [data-theme="dark"] .forge-element {
    animation: none !important;
  }
  
  /* Static glow instead of animated */
  [data-theme="dark"] .district:hover::after {
    opacity: 0.8;
  }
  
  /* No window flicker */
  .building-window.flickering {
    animation: none !important;
  }
}
```

### Night Mode Reduced Motion Specifics

| Full Animation | Reduced Motion Alternative |
|----------------|---------------------------|
| District glow pulse | Static glow at 80% opacity |
| Building window flicker | No flicker, instant light |
| AI node pulse | Static glow |
| Neon flicker | Static bright state |
| Forge glow animation | Static orange glow |

---

## Integration Notes

### For Frontend Developer
- Use CSS transitions for simple state changes
- Use CSS animations for loading/ambient states
- Use JavaScript for ripple positioning and sequence control
- Implement sound toggle in user preferences
- **Use `data-theme` attribute to toggle between day/night mode styles**
- **Coordinate night mode hover effects with theme transition timing**
- **Implement window flicker via JavaScript with reduced motion check**

### For QA Specialist
- Test all hover states on touch devices (should not require hover)
- Verify focus rings are visible in all themes
- Test loading state → content transitions
- Verify error states are announced to screen readers
- **Test night mode hover effects are visible and not too subtle**
- **Verify window flicker respects reduced motion preference**
- **Test district-specific neon effects in night mode**
- **Ensure glow effects don't cause performance issues**

### For Visual Designer
- **Define warm glow colors for each district's night mode**
- **Create reference for window flicker intensity**
- **Specify neon effect variations per district**

### For Sound Designer (Future)
- Provide assets in multiple formats (mp3, ogg, wav)
- Keep file sizes under 10KB per sound
- Match audio tone to Ghibli/pixel aesthetic (warm, organic)
- **Consider softer, more ambient hover sounds for night mode**

---

*Micro-interactions designed for Neil's City Site. Small moments, big impact on feel—and at night, the city glows with warmth and life.*
