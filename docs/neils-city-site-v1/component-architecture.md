# Component Architecture: Neil's City Site

**Version:** 1.0  
**Date:** December 2024  
**Project:** Personal Portfolio as Futuristic Isometric City

---

## Component Philosophy

Components follow a **progressive enhancement** approach:
1. **Base**: Semantic HTML (works without JS)
2. **Enhanced**: CSS styling and layout
3. **Interactive**: JavaScript islands (Astro) for animations and interactions

---

## Component Hierarchy

```
App (Root)
├── Layout
│   ├── SiteHeader
│   │   ├── Logo
│   │   ├── Search (client:idle)
│   │   └── ThemeToggle (client:load)
│   │
│   ├── SiteFooter
│   │   ├── Copyright
│   │   └── SocialLinks
│   │
│   └── SkipLinks
│
├── Views
│   ├── CityView
│   │   ├── IsometricCity (client:visible)
│   │   │   ├── DistrictMarkers
│   │   │   └── TrainTracks (SVG)
│   │   │
│   │   ├── Train (client:idle)
│   │   │   └── TrainAnimation
│   │   │
│   │   └── DistrictCards (fallback)
│   │
│   ├── DistrictView
│   │   ├── DistrictHeader
│   │   │   ├── Breadcrumb
│   │   │   └── DistrictTitle
│   │   │
│   │   ├── DistrictVisual (client:visible)
│   │   │   ├── BuildingMarkers
│   │   │   └── TrainStation
│   │   │
│   │   ├── BuildingCards
│   │   │   └── BuildingCard[]
│   │   │
│   │   └── TrainNavigation (client:idle)
│   │
│   ├── BuildingView
│   │   ├── BuildingHeader
│   │   │   ├── Breadcrumb
│   │   │   └── BuildingTitle
│   │   │
│   │   ├── BuildingCutaway (client:visible)
│   │   │   ├── FloorList
│   │   │   │   └── FloorItem[]
│   │   │   │
│   │   │   └── Characters (Neil/Leela)
│   │   │
│   │   └── FloorNavigation
│   │
│   └── FloorView
│       ├── FloorHeader
│       │   ├── Breadcrumb
│       │   ├── FloorTitle
│       │   └── FloorMeta (reading time, date)
│       │
│       ├── FloorContent
│       │   ├── MDXContent
│       │   ├── CodeBlock (client:load)
│       │   ├── Diagram (client:visible)
│       │   └── Image (lazy)
│       │
│       ├── RelatedFloors
│       │   └── FloorCard[]
│       │
│       └── FloorNavigation
│           ├── PrevFloor
│           └── NextFloor
│
└── Shared
    ├── Navigation
    │   ├── Breadcrumb
    │   ├── DistrictPicker
    │   └── FloorNav
    │
    ├── Characters
    │   ├── Neil (SVG)
    │   └── Leela (SVG)
    │
    ├── Audio
    │   └── AudioController (client:load)
    │       ├── AmbientSoundscape
    │       ├── TrainSound
    │       └── UISounds
    │
    └── UI
        ├── Button
        ├── Card
        ├── Modal (client:load)
        └── SearchOverlay (client:load)
```

---

## Core Components

### Layout Components

#### `SiteLayout.astro`
**Purpose**: Root layout wrapper for all pages

**Props**:
```typescript
interface SiteLayoutProps {
  title: string;
  description?: string;
  currentView: 'city' | 'district' | 'building' | 'floor';
  district?: string;
  building?: string;
  floor?: string;
}
```

**Structure**:
```astro
---
// src/layouts/SiteLayout.astro
import SiteHeader from '@/components/Layout/SiteHeader.astro';
import SiteFooter from '@/components/Layout/SiteFooter.astro';
import SkipLinks from '@/components/Layout/SkipLinks.astro';

const { title, description, currentView, district, building, floor } = Astro.props;
---

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <SkipLinks />
    <SiteHeader currentView={currentView} />
    
    <main id="main-content">
      <slot />
    </main>
    
    <SiteFooter />
  </body>
</html>
```

#### `CityLayout.astro`
**Purpose**: Layout for city view

**Features**:
- Full-width city visual
- District cards (mobile fallback)
- Train navigation

#### `DistrictLayout.astro`
**Purpose**: Layout for district view

**Features**:
- District header with breadcrumb
- Building cards
- Train station navigation

#### `BuildingLayout.astro`
**Purpose**: Layout for building cutaway view

**Features**:
- Building header
- Side-view cutaway
- Floor list navigation

#### `FloorLayout.astro`
**Purpose**: Layout for floor content view

**Features**:
- Floor header with metadata
- Article content area
- Related floors
- Prev/Next navigation

---

### View Components

#### `CityView.astro`
**Purpose**: City overview with all districts

**Structure**:
```astro
---
// src/components/Views/CityView.astro
import IsometricCity from '@/components/City/IsometricCity.astro';
import Train from '@/components/City/Train.astro';
import DistrictCards from '@/components/City/DistrictCards.astro';
import { getDistricts } from '@/lib/content';

const districts = await getDistricts();
---

<section aria-label="Neil's City - All Districts">
  <h1 class="sr-only">Welcome to Neil's City</h1>
  
  <!-- Isometric city visual (desktop) -->
  <IsometricCity districts={districts} client:visible />
  
  <!-- Train animation -->
  <Train client:idle />
  
  <!-- District cards (mobile fallback, always accessible) -->
  <DistrictCards districts={districts} />
</section>
```

**Hydration Strategy**:
- `IsometricCity`: `client:visible` (only when scrolled into view)
- `Train`: `client:idle` (after page load)
- `DistrictCards`: Static (no hydration needed)

#### `IsometricCity.astro`
**Purpose**: Isometric city visual

**Implementation**:
```astro
---
// src/components/City/IsometricCity.astro
interface Props {
  districts: District[];
}

const { districts } = Astro.props;
---

<div class="isometric-city" role="img" aria-label="Isometric view of Neil's City">
  <div class="city-container">
    {districts.map(district => (
      <DistrictMarker 
        district={district}
        x={district.position.x}
        y={district.position.y}
        z={district.position.z}
      />
    ))}
    
    <!-- Train tracks (SVG) -->
    <svg class="train-tracks" aria-hidden="true">
      <path d="M0,0 L100,100" class="track-path" />
    </svg>
  </div>
</div>

<style>
  .isometric-city {
    transform-style: preserve-3d;
    perspective: 1000px;
  }
  
  .city-container {
    transform: rotateX(60deg) rotateZ(-45deg);
  }
  
  .district-marker {
    transform: translate3d(var(--x), var(--y), var(--z));
  }
</style>
```

#### `DistrictView.astro`
**Purpose**: Single district view with buildings

**Structure**:
```astro
---
// src/components/Views/DistrictView.astro
import DistrictVisual from '@/components/District/DistrictVisual.astro';
import BuildingCards from '@/components/District/BuildingCards.astro';
import TrainNavigation from '@/components/Navigation/TrainNavigation.astro';
import { getDistrict, getBuildings } from '@/lib/content';

const district = await getDistrict(params.district);
const buildings = await getBuildings(params.district);
---

<section aria-label={`${district.name} District`}>
  <DistrictVisual district={district} buildings={buildings} client:visible />
  <BuildingCards buildings={buildings} />
  <TrainNavigation currentDistrict={district.id} />
</section>
```

#### `BuildingView.astro`
**Purpose**: Building cutaway with floors

**Structure**:
```astro
---
// src/components/Views/BuildingView.astro
import BuildingCutaway from '@/components/Building/BuildingCutaway.astro';
import FloorList from '@/components/Building/FloorList.astro';
import { getBuilding, getFloors } from '@/lib/content';

const building = await getBuilding(params.building);
const floors = await getFloors(params.building);
---

<section aria-label={`${building.name} Building`}>
  <BuildingCutaway building={building} floors={floors} client:visible />
  <FloorList floors={floors} />
</section>
```

#### `BuildingCutaway.astro`
**Purpose**: Side-view building visualization

**Implementation**:
```astro
---
// src/components/Building/BuildingCutaway.astro
interface Props {
  building: Building;
  floors: Floor[];
}

const { building, floors } = Astro.props;
---

<div class="building-cutaway" role="img" aria-label={`Cutaway view of ${building.name} showing ${floors.length} floors`}>
  <div class="building-structure">
    {floors.map((floor, index) => (
      <div 
        class="floor"
        data-floor-id={floor.id}
        style={`--floor-index: ${index}`}
      >
        <div class="floor-number">{index + 1}</div>
        <div class="floor-title">{floor.title}</div>
      </div>
    ))}
  </div>
  
  <!-- Characters -->
  <Neil position="ground" />
  <Leela position="ground" />
</div>

<style>
  .building-cutaway {
    display: flex;
    flex-direction: column;
    transform: perspective(500px) rotateY(-15deg);
  }
  
  .floor {
    height: var(--floor-height, 120px);
    border-bottom: 2px solid var(--border-default);
    padding: var(--space-4);
    transition: transform 200ms ease-out;
  }
  
  .floor:hover {
    transform: translateX(10px);
  }
</style>
```

#### `FloorView.astro`
**Purpose**: Full floor content view

**Structure**:
```astro
---
// src/components/Views/FloorView.astro
import FloorContent from '@/components/Floor/FloorContent.astro';
import RelatedFloors from '@/components/Floor/RelatedFloors.astro';
import FloorNavigation from '@/components/Navigation/FloorNavigation.astro';
import { getFloor, getRelatedFloors } from '@/lib/content';

const floor = await getFloor(params.floor);
const related = await getRelatedFloors(floor);
const prevFloor = await getPrevFloor(floor);
const nextFloor = await getNextFloor(floor);
---

<article>
  <FloorContent content={floor.content} />
  <RelatedFloors floors={related} />
  <FloorNavigation prev={prevFloor} next={nextFloor} />
</article>
```

---

### Navigation Components

#### `Breadcrumb.astro`
**Purpose**: Hierarchical navigation breadcrumb

**Props**:
```typescript
interface BreadcrumbProps {
  items: Array<{
    label: string;
    href: string;
    current?: boolean;
  }>;
}
```

**Implementation**:
```astro
---
// src/components/Navigation/Breadcrumb.astro
interface Props {
  items: BreadcrumbItem[];
}

const { items } = Astro.props;
---

<nav aria-label="Breadcrumb">
  <ol>
    {items.map((item, index) => (
      <li>
        {item.current ? (
          <span aria-current="page">{item.label}</span>
        ) : (
          <a href={item.href}>{item.label}</a>
        )}
        {index < items.length - 1 && <span aria-hidden="true"> → </span>}
      </li>
    ))}
  </ol>
</nav>
```

#### `TrainNavigation.astro`
**Purpose**: Train-based district navigation

**Implementation**:
```astro
---
// src/components/Navigation/TrainNavigation.astro
import TrainButton from '@/components/Navigation/TrainButton.astro';
import { getAllDistricts } from '@/lib/content';

const districts = await getAllDistricts();
const { currentDistrict } = Astro.props;
---

<div class="train-navigation">
  <TrainButton currentDistrict={currentDistrict} />
  
  <ul class="train-stations" role="listbox">
    {districts.map(district => (
      <li>
        <a 
          href={`/${district.slug}`}
          aria-selected={district.id === currentDistrict}
        >
          {district.name}
        </a>
      </li>
    ))}
  </ul>
</div>
```

#### `FloorNavigation.astro`
**Purpose**: Previous/Next floor navigation

**Props**:
```typescript
interface FloorNavigationProps {
  prev?: Floor;
  next?: Floor;
  current: Floor;
}
```

---

### Character Components

#### `Neil.astro`
**Purpose**: Neil character SVG sprite

**Props**:
```typescript
interface NeilProps {
  position?: 'ground' | 'floor' | 'floating';
  expression?: 'default' | 'curious' | 'focused';
  size?: 'small' | 'medium' | 'large';
}
```

**Implementation**:
```astro
---
// src/components/Characters/Neil.astro
interface Props {
  position?: string;
  expression?: string;
  size?: string;
}

const { position = 'ground', expression = 'default', size = 'medium' } = Astro.props;
---

<svg 
  class={`neil neil--${position} neil--${expression} neil--${size}`}
  role="img"
  aria-label="Neil, the city architect"
  viewBox="0 0 100 100"
>
  <!-- Neil SVG paths -->
  <g class="neil-body">
    <!-- Body, cap, beard, clothing -->
  </g>
</svg>

<style>
  .neil {
    width: var(--neil-size, 60px);
    height: var(--neil-size, 60px);
  }
  
  .neil--ground {
    position: absolute;
    bottom: 0;
  }
</style>
```

#### `Leela.astro`
**Purpose**: Leela (corgi) character SVG sprite

**Props**: Similar to Neil, with corgi-specific expressions

---

### Content Components

#### `MDXContent.astro`
**Purpose**: Renders MDX content with custom components

**Implementation**:
```astro
---
// src/components/Content/MDXContent.astro
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from '@/components/Content/CodeBlock.astro';
import Diagram from '@/components/Content/Diagram.astro';
import Image from '@/components/Content/Image.astro';

const components = {
  pre: CodeBlock,
  img: Image,
  Diagram: Diagram,
  // ... other MDX components
};
---

<div class="mdx-content">
  <slot />
</div>
```

#### `CodeBlock.astro`
**Purpose**: Syntax-highlighted code blocks

**Features**:
- Syntax highlighting (via Shiki or Prism)
- Copy button
- Line numbers (optional)
- Horizontal scroll on mobile

#### `Diagram.astro`
**Purpose**: Mermaid or custom diagram renderer

**Implementation**:
```astro
---
// src/components/Content/Diagram.astro
import { renderMermaid } from '@/lib/mermaid';

interface Props {
  type: 'mermaid' | 'custom';
  content: string;
}

const { type, content } = Astro.props;
---

<figure class="diagram">
  {type === 'mermaid' ? (
    <div class="mermaid" set:html={await renderMermaid(content)} />
  ) : (
    <div class="custom-diagram" set:html={content} />
  )}
</figure>
```

---

### Audio Components

#### `AudioController.astro`
**Purpose**: Manages site-wide audio (soundscape, train sounds, UI)

**Implementation**:
```astro
---
// src/components/Audio/AudioController.astro
---

<div class="audio-controller" client:load>
  <button 
    aria-label="Toggle audio"
    class="audio-toggle"
    data-audio-enabled="false"
  >
    <span class="audio-icon">🔊</span>
  </button>
  
  <!-- Audio elements -->
  <audio id="ambient-soundscape" loop>
    <source src="/audio/ambient.mp3" type="audio/mpeg" />
  </audio>
  
  <audio id="train-sound">
    <source src="/audio/train.mp3" type="audio/mpeg" />
  </audio>
</div>

<script>
  // Audio control logic
  const toggle = document.querySelector('.audio-toggle');
  const ambient = document.getElementById('ambient-soundscape');
  
  toggle.addEventListener('click', () => {
    const enabled = toggle.dataset.audioEnabled === 'true';
    toggle.dataset.audioEnabled = !enabled;
    
    if (!enabled) {
      ambient.play();
    } else {
      ambient.pause();
    }
  });
</script>
```

---

### UI Components

#### `Button.astro`
**Purpose**: Reusable button component

**Props**:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  href?: string;
  disabled?: boolean;
  ariaLabel?: string;
}
```

#### `Card.astro`
**Purpose**: Card container component

**Usage**:
```astro
<Card>
  <CardHeader>
    <CardTitle>Building Name</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Building description...</p>
  </CardContent>
</Card>
```

#### `SearchOverlay.astro`
**Purpose**: Search modal/overlay

**Features**:
- Keyboard shortcut (Cmd+K)
- Search input
- Results list
- Keyboard navigation
- Focus trap

**Implementation**:
```astro
---
// src/components/UI/SearchOverlay.astro
---

<dialog id="search-overlay" class="search-overlay" client:load>
  <form role="search">
    <label for="search-input" class="sr-only">Search Neil's City</label>
    <input 
      type="search"
      id="search-input"
      placeholder="Search content..."
      autocomplete="off"
    />
  </form>
  
  <div id="search-results" role="listbox" aria-label="Search results">
    <!-- Results populated dynamically -->
  </div>
</dialog>

<script>
  // Search logic
  // Keyboard shortcut handling
  // Focus management
</script>
```

---

## Component Communication

### Props Flow

```
Layout → View → Sub-components
```

**Example**:
```
SiteLayout
  └── CityView
      ├── IsometricCity (districts prop)
      ├── Train (districts prop)
      └── DistrictCards (districts prop)
```

### Event Flow

**Minimal events**: Most navigation handled via URL changes

```typescript
// Navigation events
type NavigationEvent = 
  | { type: 'navigate', url: string }
  | { type: 'back' }
  | { type: 'search', query: string };

// UI events (local to components)
type UIEvent =
  | { type: 'toggle-menu' }
  | { type: 'toggle-audio' }
  | { type: 'toggle-theme' };
```

### State Sharing

**URL State**: Shared via URL (source of truth)
**Preferences**: Shared via localStorage
**Session**: Shared via sessionStorage

**No global state management needed.**

---

## Component Patterns

### Progressive Enhancement Pattern

```astro
---
// Pattern: Base HTML + Enhanced JS
---

<!-- Base: Works without JS -->
<a href="/ai" class="district-link">
  AI District
</a>

<!-- Enhanced: Interactive (hydrates) -->
<DistrictLink 
  href="/ai"
  client:idle
  data-district="ai"
>
  AI District
</DistrictLink>
```

### Island Hydration Pattern

```astro
---
// Pattern: Static + Interactive islands
---

<!-- Static SVG train (always visible) -->
<svg class="train-static" aria-hidden="true">
  <!-- Train SVG -->
</svg>

<!-- Interactive train animation (hydrates) -->
<TrainAnimation client:idle />
```

### Accessibility Pattern

```astro
---
// Pattern: Semantic HTML + ARIA
---

<div 
  role="img"
  aria-label="Isometric view of AI District with 2 buildings"
  class="district-visual"
>
  <!-- Visual content -->
</div>

<!-- Screen reader alternative -->
<div class="sr-only">
  <h2>AI District</h2>
  <p>Contains 2 buildings: AI Workflows and AI Agents</p>
</div>
```

---

## Component File Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── SiteLayout.astro
│   │   ├── CityLayout.astro
│   │   ├── DistrictLayout.astro
│   │   ├── BuildingLayout.astro
│   │   ├── FloorLayout.astro
│   │   ├── SiteHeader.astro
│   │   └── SiteFooter.astro
│   │
│   ├── Views/
│   │   ├── CityView.astro
│   │   ├── DistrictView.astro
│   │   ├── BuildingView.astro
│   │   └── FloorView.astro
│   │
│   ├── City/
│   │   ├── IsometricCity.astro
│   │   ├── DistrictMarkers.astro
│   │   ├── TrainTracks.astro
│   │   ├── Train.astro
│   │   └── DistrictCards.astro
│   │
│   ├── District/
│   │   ├── DistrictVisual.astro
│   │   ├── BuildingCards.astro
│   │   └── BuildingCard.astro
│   │
│   ├── Building/
│   │   ├── BuildingCutaway.astro
│   │   ├── FloorList.astro
│   │   └── FloorItem.astro
│   │
│   ├── Floor/
│   │   ├── FloorContent.astro
│   │   ├── FloorHeader.astro
│   │   ├── RelatedFloors.astro
│   │   └── FloorCard.astro
│   │
│   ├── Navigation/
│   │   ├── Breadcrumb.astro
│   │   ├── TrainNavigation.astro
│   │   ├── FloorNavigation.astro
│   │   └── DistrictPicker.astro
│   │
│   ├── Characters/
│   │   ├── Neil.astro
│   │   └── Leela.astro
│   │
│   ├── Content/
│   │   ├── MDXContent.astro
│   │   ├── CodeBlock.astro
│   │   ├── Diagram.astro
│   │   └── Image.astro
│   │
│   ├── Audio/
│   │   └── AudioController.astro
│   │
│   └── UI/
│       ├── Button.astro
│       ├── Card.astro
│       ├── Modal.astro
│       └── SearchOverlay.astro
│
└── lib/
    └── components.ts  // Component utilities
```

---

## Component Testing Strategy

### Unit Testing

**Components to test**:
- Navigation components (Breadcrumb, FloorNavigation)
- Content components (CodeBlock, Diagram)
- UI components (Button, Card)

**Tools**: Vitest + @testing-library/astro

### Integration Testing

**Flows to test**:
- City → District → Building → Floor navigation
- Search functionality
- Theme toggle
- Audio toggle

**Tools**: Playwright

### Visual Regression Testing

**Components to test**:
- IsometricCity
- BuildingCutaway
- Character components

**Tools**: Percy or Chromatic

---

## Component Performance

### Hydration Strategy

| Component | Hydration | Rationale |
|-----------|-----------|------------|
| `IsometricCity` | `client:visible` | Only needed when scrolled into view |
| `Train` | `client:idle` | Animation can wait until page idle |
| `SearchOverlay` | `client:load` | Critical interaction, load immediately |
| `AudioController` | `client:load` | User preference, load early |
| `CodeBlock` | `client:visible` | Syntax highlighting only when visible |
| `BuildingCutaway` | `client:visible` | Interactive only when in view |

### Code Splitting

- **Route-based**: Each view loads only its components
- **Island-based**: Each island loads independently
- **Lazy loading**: Non-critical components loaded on demand

---

## Component Accessibility

### Required ARIA Attributes

| Component | ARIA Requirements |
|-----------|-------------------|
| `IsometricCity` | `role="img"`, `aria-label` |
| `BuildingCutaway` | `role="img"`, `aria-label` |
| `TrainNavigation` | `role="listbox"`, `aria-selected` |
| `SearchOverlay` | `role="dialog"`, `aria-labelledby` |
| `FloorNavigation` | `aria-label`, `aria-keyshortcuts` |

### Keyboard Support

All interactive components must support:
- `Tab` / `Shift+Tab`: Focus navigation
- `Enter` / `Space`: Activate
- `Escape`: Close/dismiss
- Arrow keys: Navigate lists

---

## Component Documentation

### Component Props Documentation

Each component should document:
- Props interface (TypeScript)
- Default values
- Usage examples
- Accessibility notes

### Storybook (Optional)

Consider Storybook for component documentation:
- Visual component library
- Interactive props testing
- Accessibility testing integration

---

*Component architecture designed for Neil's City Site. Last updated December 2024.*
