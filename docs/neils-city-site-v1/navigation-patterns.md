# Neil's City Site — Navigation Patterns

## URL Structure

### Hierarchy

```
/                           → City view (home)
/{district}                 → District view
/{district}/{building}      → Building view (cutaway)
/{district}/{building}/{floor}  → Deep link to specific floor
```

### Examples

```
/                           → City overview
/dx                         → DX District view
/dx/dx-tower                → DX Tower building (cutaway)
/dx/dx-tower/small-prs      → Direct link to "Small PRs" floor
/ai/agent-orchard           → Agent Orchard building
/central/central-station    → Central Station (entry point)
```

### URL Conventions

- All lowercase
- Hyphens for multi-word slugs
- No trailing slashes
- Floor slugs derived from MDX filenames (without number prefix)

---

## View Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                      CITY VIEW                              │
│  Bird's-eye isometric view of all districts                 │
│  Train visible on tracks between districts                  │
│                                                             │
│  Actions:                                                   │
│  • Hover district → Show name + tagline                     │
│  • Click district → Zoom to district view                   │
│  • Click train → ? (optional: schedule/route view)          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    DISTRICT VIEW                            │
│  Focused mini-map of single district                        │
│  Buildings prominent and clickable                          │
│  Train station visible at district edge                     │
│                                                             │
│  Actions:                                                   │
│  • Click building → Enter building (cutaway)                │
│  • Click train/back → Return to city view                   │
│  • Hover building → Show name + summary                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   BUILDING VIEW (Cutaway)                   │
│  Side-view skyscraper with floors visible                   │
│  Current floor highlighted                                  │
│  Neil + Leela positioned per scene metadata                 │
│                                                             │
│  Actions:                                                   │
│  • Scroll → Move between floors                             │
│  • Click floor indicator → Jump to floor                    │
│  • Click district name → Return to district                 │
│  • Read content → Normal scrolling behavior                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      FLOOR VIEW                             │
│  (Part of building view - scrolled into focus)              │
│  Content area with MDX-rendered content                     │
│  Character states update per floor metadata                 │
│  Background may change per floor                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Train Interaction Model

### Purpose
The train is **visual navigation glue**, not a content container.

### Behavior

| State | Train Position | User Action Available |
|-------|---------------|----------------------|
| City view | Animating on tracks | Watch, click to follow |
| District view | At district station | Click to "board" → city view |
| Building view | Not visible | N/A |

### Train as Mental Model

- "Taking the train" = going to city overview
- Train animation hints at other districts to explore
- Train schedule could show "route" = site structure

### NOT

- ❌ Train as carousel between districts
- ❌ Content inside train cars
- ❌ Mandatory train interaction to navigate

---

## Keyboard Navigation

### Global Shortcuts

| Key | Action |
|-----|--------|
| `Esc` | Go up one level (floor → building → district → city) |
| `Home` | Go to city view |
| `/` | Open search/command palette (future) |
| `?` | Show keyboard shortcuts overlay |

### City View

| Key | Action |
|-----|--------|
| `Tab` | Cycle through districts |
| `Enter` | Enter focused district |
| `Arrow keys` | Move focus between districts |

### District View

| Key | Action |
|-----|--------|
| `Tab` | Cycle through buildings |
| `Enter` | Enter focused building |
| `Backspace` / `Esc` | Return to city view |

### Building View

| Key | Action |
|-----|--------|
| `↑` / `↓` | Previous/next floor |
| `Home` | First floor |
| `End` | Last floor |
| `1-9` | Jump to floor N (if exists) |
| `Backspace` / `Esc` | Return to district view |

---

## Browser Navigation

### Back/Forward Behavior

| From | Back | Forward |
|------|------|---------|
| City view | Browser default (leave site) | Last viewed state |
| District view | City view | Building if previously viewed |
| Building view | District view | Last floor position |
| Deep link floor | District view | — |

### History State Management

```javascript
// Each navigation pushes to history
history.pushState({
  view: 'building',
  district: 'dx',
  building: 'dx-tower',
  floor: 'small-prs',
  scrollPosition: 1250
}, '', '/dx/dx-tower/small-prs');
```

### Scroll Restoration

- Building view: Restore exact scroll position
- District view: Restore last focused building
- City view: Restore last focused district

---

## Deep Linking Requirements

### Shareable URLs

Every meaningful state must have a URL:
- ✅ `/dx/dx-tower/small-prs` → Opens directly to floor
- ✅ `/ai` → Opens AI district view
- ✅ `/` → City view

### Deep Link Behavior

When user arrives via deep link:

1. **Floor link** (`/dx/dx-tower/small-prs`)
   - Skip city/district animation
   - Open directly to building cutaway
   - Scroll to target floor
   - Show subtle "context breadcrumb" for orientation

2. **Building link** (`/dx/dx-tower`)
   - Open directly to building cutaway
   - Start at first floor

3. **District link** (`/dx`)
   - Brief district view (no animation from city)
   - Or: Show city → animate to district (preference)

### Social Preview Cards

Each level generates appropriate meta tags:
- Floor: Floor title + excerpt
- Building: Building name + summary
- District: District name + tagline
- City: Site-level branding

---

## Graceful Degradation

### No JavaScript

The site MUST work as a normal readable website:

```
/                    → List of districts (links)
/{district}          → List of buildings in district
/{district}/{building}  → All floors rendered as one page
```

### No CSS (extreme)

- Semantic HTML structure remains navigable
- Skip links work
- Content is readable top-to-bottom

### Reduced Motion

- Disable all animations
- Instant view transitions
- Static character positions
- No parallax effects

---

## Navigation State Machine

```
┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│   CITY   │─────▶│ DISTRICT │─────▶│ BUILDING │─────▶│  FLOOR   │
│   VIEW   │      │   VIEW   │      │   VIEW   │      │  SCROLL  │
└──────────┘      └──────────┘      └──────────┘      └──────────┘
     ▲                  │                 │                 │
     │                  ▼                 ▼                 ▼
     └──────────────────┴─────────────────┴─────────────────┘
                    (Back / Escape)
```

### State Definitions

| State | Entry Conditions | Exit Conditions |
|-------|------------------|-----------------|
| `city` | Initial load at `/`, back from district | Click district, keyboard enter |
| `district` | Click district, URL direct | Click building, back to city |
| `building` | Click building, URL direct | Back to district, scroll within |
| `floor-focus` | Scroll to floor, URL direct | Scroll away, navigate out |

---

## Loading States

### City View Load

1. Show skeleton city (buildings as simple shapes)
2. Load district metadata
3. Animate buildings "rising" into place
4. Train begins animation

### District View Load

1. Zoom/pan animation to district
2. Buildings fade in with slight delay
3. District name/tagline appears

### Building View Load

1. Building "opens" (cutaway animation)
2. Floor indicators appear
3. Content for first visible floors loads
4. Lazy load remaining floors as user scrolls

### Content Load (Floor)

1. Show skeleton for text areas
2. Load MDX content
3. Render markdown
4. Character states update

---

## Error States

### 404 - Page Not Found

- Show "lost in the city" illustration
- Neil looking at map, confused
- Suggest: Return to city view, search
- Provide: List of valid districts

### Network Error

- Show "train delayed" metaphor
- Offer: Retry button
- If available: Show cached content
- Provide: Return to last working state

---

## File Changed
- Created: `docs/neils-city-site-v1/navigation-patterns.md`

