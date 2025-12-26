# Data Model: Neil's City Site

**Version:** 1.0  
**Date:** December 2024  
**Project:** Personal Portfolio as Futuristic Isometric City

---

## Data Model Overview

The data model represents the hierarchical structure of the city: **City → Districts → Buildings → Floors**. All data is derived from content files (MDX) and JSON metadata files.

---

## Core Type Definitions

### City

```typescript
interface City {
  id: 'city';
  name: string;
  description: string;
  districts: District[];
  metadata: {
    totalBuildings: number;
    totalFloors: number;
    lastUpdated: string;
  };
}
```

### District

```typescript
interface District {
  id: string; // 'ai', 'architecture', 'dx', etc.
  name: string; // 'AI District'
  slug: string; // URL slug
  description: string;
  icon?: string; // Emoji or icon identifier
  colorTheme: DistrictColorTheme;
  position: IsometricPosition; // For city view
  buildings: Building[];
  metadata: {
    buildingCount: number;
    floorCount: number;
    order: number; // Display order
  };
}
```

### Building

```typescript
interface Building {
  id: string; // 'workflows', 'agents', etc.
  name: string; // 'AI Workflows'
  slug: string; // URL slug
  description: string;
  district: District; // Reference to parent
  floors: Floor[];
  metadata: {
    floorCount: number;
    order: number; // Order within district
    featured?: boolean;
  };
}
```

### Floor

```typescript
interface Floor {
  id: string; // 'prompt-engineering', 'chain-of-thought', etc.
  title: string;
  slug: string; // URL slug
  summary: string; // Short description
  content: string; // MDX content (rendered HTML)
  building: Building; // Reference to parent
  district: District; // Reference to parent district
  order: number; // Floor number (1-based)
  metadata: {
    readingTime: number; // Minutes
    wordCount: number;
    publishedDate?: string;
    updatedDate?: string;
    tags?: string[];
    relatedFloors?: string[]; // IDs of related floors
  };
}
```

---

## Supporting Types

### IsometricPosition

```typescript
interface IsometricPosition {
  x: number; // X coordinate in isometric space
  y: number; // Y coordinate in isometric space
  z: number; // Z coordinate (depth)
}
```

### DistrictColorTheme

```typescript
interface DistrictColorTheme {
  primary: string; // CSS custom property name
  secondary: string;
  surface: string;
  accent: string;
  glow?: string; // For AI District
  grid?: string; // For Architecture District
}
```

### NavigationState

```typescript
interface NavigationState {
  view: 'city' | 'district' | 'building' | 'floor';
  districtId?: string;
  buildingId?: string;
  floorId?: string;
  scrollPosition?: number; // For building/floor views
}
```

### CharacterState

```typescript
interface CharacterState {
  character: 'neil' | 'leela';
  position: 'ground' | 'floor' | 'floating';
  expression: 'default' | 'curious' | 'focused' | 'playful';
  visible: boolean;
  animation?: string; // Animation name if animating
}
```

### AudioState

```typescript
interface AudioState {
  enabled: boolean;
  ambientVolume: number; // 0-1
  trainVolume: number;
  uiVolume: number;
  currentTrack?: string;
}
```

---

## Content Schema (MDX Frontmatter)

### Floor Frontmatter Schema

```typescript
interface FloorFrontmatter {
  title: string;
  order: number;
  summary: string;
  publishedDate?: string;
  updatedDate?: string;
  tags?: string[];
  relatedFloors?: string[]; // Floor IDs
  featured?: boolean;
  readingTime?: number; // Auto-calculated if not provided
}
```

**Example MDX file**:
```markdown
---
title: "Prompt Engineering"
order: 1
summary: "The art of crafting effective prompts for LLMs"
publishedDate: "2024-01-15"
tags: ["ai", "llms", "prompting"]
relatedFloors: ["chain-of-thought", "context-windows"]
---

# Prompt Engineering

Content here...
```

### Building Metadata Schema

```typescript
interface BuildingMetadata {
  name: string;
  description: string;
  order: number;
  featured?: boolean;
}
```

**Example `building.json`**:
```json
{
  "name": "AI Workflows",
  "description": "Exploring AI workflow patterns and techniques",
  "order": 1,
  "featured": true
}
```

### District Metadata Schema

```typescript
interface DistrictMetadata {
  name: string;
  description: string;
  icon: string;
  order: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
  colorTheme: {
    primary: string;
    secondary: string;
    surface: string;
    accent: string;
  };
}
```

**Example `district.json`**:
```json
{
  "name": "AI District",
  "description": "Exploring artificial intelligence workflows and agent architectures",
  "icon": "🤖",
  "order": 1,
  "position": {
    "x": 100,
    "y": 50,
    "z": 0
  },
  "colorTheme": {
    "primary": "--district-ai-accent",
    "secondary": "--district-ai-secondary",
    "surface": "--district-ai-surface",
    "accent": "--district-ai-glow"
  }
}
```

---

## Content File Structure

```
content/
├── city.json                    # City metadata
│
├── districts/
│   ├── ai/
│   │   ├── district.json        # District metadata
│   │   └── buildings/
│   │       ├── workflows/
│   │       │   ├── building.json # Building metadata
│   │       │   └── floors/
│   │       │       ├── 01-prompt-engineering.mdx
│   │       │       ├── 02-chain-of-thought.mdx
│   │       │       ├── 03-context-windows.mdx
│   │       │       └── 04-tool-calling.mdx
│   │       └── agents/
│   │           ├── building.json
│   │           └── floors/
│   │               └── ...
│   │
│   ├── architecture/
│   │   └── ...
│   │
│   └── ... (other districts)
│
└── assets/
    ├── images/
    ├── audio/
    └── svg/
```

---

## Content Loading Functions

### Get City

```typescript
// src/lib/content.ts
export async function getCity(): Promise<City> {
  const cityData = await import('../../content/city.json');
  const districts = await Promise.all(
    cityData.districts.map(id => getDistrict(id))
  );
  
  return {
    id: 'city',
    name: cityData.name,
    description: cityData.description,
    districts,
    metadata: {
      totalBuildings: districts.reduce((sum, d) => sum + d.metadata.buildingCount, 0),
      totalFloors: districts.reduce((sum, d) => sum + d.metadata.floorCount, 0),
      lastUpdated: cityData.lastUpdated
    }
  };
}
```

### Get District

```typescript
export async function getDistrict(districtId: string): Promise<District> {
  const districtData = await import(`../../content/districts/${districtId}/district.json`);
  const buildings = await getBuildings(districtId);
  
  return {
    id: districtId,
    name: districtData.name,
    slug: districtId,
    description: districtData.description,
    icon: districtData.icon,
    colorTheme: districtData.colorTheme,
    position: districtData.position,
    buildings,
    metadata: {
      buildingCount: buildings.length,
      floorCount: buildings.reduce((sum, b) => sum + b.metadata.floorCount, 0),
      order: districtData.order
    }
  };
}
```

### Get Building

```typescript
export async function getBuilding(
  districtId: string,
  buildingId: string
): Promise<Building> {
  const buildingData = await import(
    `../../content/districts/${districtId}/buildings/${buildingId}/building.json`
  );
  const floors = await getFloors(districtId, buildingId);
  const district = await getDistrict(districtId);
  
  return {
    id: buildingId,
    name: buildingData.name,
    slug: buildingId,
    description: buildingData.description,
    district,
    floors,
    metadata: {
      floorCount: floors.length,
      order: buildingData.order,
      featured: buildingData.featured
    }
  };
}
```

### Get Floor

```typescript
export async function getFloor(
  districtId: string,
  buildingId: string,
  floorId: string
): Promise<Floor> {
  const floorModule = await import(
    `../../content/districts/${districtId}/buildings/${buildingId}/floors/${floorId}.mdx`
  );
  const building = await getBuilding(districtId, buildingId);
  const district = await getDistrict(districtId);
  
  // Process MDX content
  const content = await renderMDX(floorModule.default);
  
  return {
    id: floorId,
    title: floorModule.frontmatter.title,
    slug: floorId,
    summary: floorModule.frontmatter.summary,
    content,
    building,
    district,
    order: floorModule.frontmatter.order,
    metadata: {
      readingTime: calculateReadingTime(content),
      wordCount: countWords(content),
      publishedDate: floorModule.frontmatter.publishedDate,
      updatedDate: floorModule.frontmatter.updatedDate,
      tags: floorModule.frontmatter.tags,
      relatedFloors: floorModule.frontmatter.relatedFloors
    }
  };
}
```

### Get All Floors (for search)

```typescript
export async function getAllFloors(): Promise<Floor[]> {
  const city = await getCity();
  const allFloors: Floor[] = [];
  
  for (const district of city.districts) {
    for (const building of district.buildings) {
      for (const floor of building.floors) {
        allFloors.push(floor);
      }
    }
  }
  
  return allFloors;
}
```

---

## Search Index Model

### SearchIndex

```typescript
interface SearchIndex {
  floors: SearchFloor[];
  lastIndexed: string;
}

interface SearchFloor {
  id: string;
  title: string;
  summary: string;
  content: string; // Excerpt or full text
  district: string;
  building: string;
  url: string;
  tags: string[];
  keywords: string[]; // Extracted keywords
}
```

### Search Result

```typescript
interface SearchResult {
  floor: Floor;
  relevance: number; // 0-1
  matchedFields: ('title' | 'summary' | 'content' | 'tags')[];
  excerpt: string; // Highlighted excerpt
}
```

---

## Client-Side State Models

### User Preferences

```typescript
interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  reducedMotion: boolean;
  audioEnabled: boolean;
  audioVolume: {
    ambient: number;
    train: number;
    ui: number;
  };
}
```

**Storage**: `localStorage` with key `neils-city-preferences`

### Session State

```typescript
interface SessionState {
  scrollPositions: Record<string, number>; // URL -> scroll position
  visitedFloors: Set<string>; // Floor IDs
  lastViewedFloor?: string;
  navigationHistory: string[]; // URLs visited in session
}
```

**Storage**: `sessionStorage` with key `neils-city-session`

### UI State (In-Memory)

```typescript
interface UIState {
  searchOpen: boolean;
  menuOpen: boolean;
  trainAnimating: boolean;
  currentAnimation?: string;
  focusedElement?: string; // For keyboard navigation
}
```

**Storage**: Component state (not persisted)

---

## URL to State Mapping

### URL Parsing

```typescript
function parseUrl(url: string): NavigationState {
  const parts = url.split('/').filter(Boolean);
  
  if (parts.length === 0) {
    return { view: 'city' };
  }
  
  if (parts.length === 1) {
    return { view: 'district', districtId: parts[0] };
  }
  
  if (parts.length === 2) {
    return { 
      view: 'building', 
      districtId: parts[0], 
      buildingId: parts[1] 
    };
  }
  
  if (parts.length === 3) {
    return { 
      view: 'floor', 
      districtId: parts[0], 
      buildingId: parts[1], 
      floorId: parts[2] 
    };
  }
  
  return { view: 'city' };
}
```

### State to URL

```typescript
function stateToUrl(state: NavigationState): string {
  if (state.view === 'city') return '/';
  if (state.view === 'district') return `/${state.districtId}`;
  if (state.view === 'building') return `/${state.districtId}/${state.buildingId}`;
  if (state.view === 'floor') {
    return `/${state.districtId}/${state.buildingId}/${state.floorId}`;
  }
  return '/';
}
```

---

## Data Validation

### Zod Schemas

```typescript
import { z } from 'zod';

const FloorFrontmatterSchema = z.object({
  title: z.string().min(1),
  order: z.number().int().positive(),
  summary: z.string().min(10).max(200),
  publishedDate: z.string().optional(),
  updatedDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
  relatedFloors: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

const DistrictMetadataSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(10),
  icon: z.string(),
  order: z.number().int().positive(),
  position: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }),
  colorTheme: z.object({
    primary: z.string(),
    secondary: z.string(),
    surface: z.string(),
    accent: z.string(),
  }),
});
```

### Validation Functions

```typescript
export function validateFloorFrontmatter(data: unknown): FloorFrontmatter {
  return FloorFrontmatterSchema.parse(data);
}

export function validateDistrictMetadata(data: unknown): DistrictMetadata {
  return DistrictMetadataSchema.parse(data);
}
```

---

## Content Processing Pipeline

### Build-Time Processing

```typescript
// Build-time: Process all content
async function processContent() {
  // 1. Load all districts
  const districts = await loadDistricts();
  
  // 2. Load all buildings
  const buildings = await Promise.all(
    districts.map(d => loadBuildings(d.id))
  );
  
  // 3. Load all floors
  const floors = await Promise.all(
    buildings.flat().map(b => loadFloors(b.district.id, b.id))
  );
  
  // 4. Generate city.json
  await generateCityJson(districts, buildings, floors);
  
  // 5. Generate search index
  await generateSearchIndex(floors);
  
  // 6. Validate all content
  await validateAllContent(districts, buildings, floors);
}
```

### Runtime Processing

```typescript
// Runtime: Load content on demand
async function loadContentForRoute(url: string): Promise<ContentData> {
  const state = parseUrl(url);
  
  switch (state.view) {
    case 'city':
      return { city: await getCity() };
    
    case 'district':
      return { 
        district: await getDistrict(state.districtId!),
        city: await getCity() // For navigation
      };
    
    case 'building':
      return {
        building: await getBuilding(state.districtId!, state.buildingId!),
        district: await getDistrict(state.districtId!),
        city: await getCity()
      };
    
    case 'floor':
      return {
        floor: await getFloor(state.districtId!, state.buildingId!, state.floorId!),
        building: await getBuilding(state.districtId!, state.buildingId!),
        district: await getDistrict(state.districtId!),
        city: await getCity()
      };
  }
}
```

---

## Asset References

### Image Asset

```typescript
interface ImageAsset {
  src: string; // Path relative to /public
  alt: string;
  width?: number;
  height?: number;
  lazy?: boolean;
}
```

### Audio Asset

```typescript
interface AudioAsset {
  src: string; // Path relative to /public/audio
  type: 'ambient' | 'train' | 'ui';
  loop?: boolean;
  volume?: number;
}
```

### SVG Asset

```typescript
interface SVGAsset {
  src: string; // Path relative to /public/svg
  id: string; // For sprite usage
  viewBox: string;
}
```

---

## Type Utilities

### Type Guards

```typescript
export function isDistrict(obj: unknown): obj is District {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'buildings' in obj
  );
}

export function isBuilding(obj: unknown): obj is Building {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'floors' in obj &&
    'district' in obj
  );
}

export function isFloor(obj: unknown): obj is Floor {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'content' in obj &&
    'building' in obj
  );
}
```

### Helper Functions

```typescript
export function getFloorUrl(floor: Floor): string {
  return `/${floor.district.slug}/${floor.building.slug}/${floor.slug}`;
}

export function getBuildingUrl(building: Building): string {
  return `/${building.district.slug}/${building.slug}`;
}

export function getDistrictUrl(district: District): string {
  return `/${district.slug}`;
}

export function getRelatedFloors(floor: Floor, allFloors: Floor[]): Floor[] {
  if (!floor.metadata.relatedFloors) return [];
  
  return floor.metadata.relatedFloors
    .map(id => allFloors.find(f => f.id === id))
    .filter((f): f is Floor => f !== undefined);
}

export function getNextFloor(floor: Floor): Floor | null {
  const floors = floor.building.floors;
  const currentIndex = floors.findIndex(f => f.id === floor.id);
  
  if (currentIndex < floors.length - 1) {
    return floors[currentIndex + 1];
  }
  
  return null;
}

export function getPrevFloor(floor: Floor): Floor | null {
  const floors = floor.building.floors;
  const currentIndex = floors.findIndex(f => f.id === floor.id);
  
  if (currentIndex > 0) {
    return floors[currentIndex - 1];
  }
  
  return null;
}
```

---

## Data Export/Import

### Export for Static Generation

```typescript
// Generate static JSON files for client-side use
export async function exportStaticData() {
  const city = await getCity();
  
  // Export city.json
  await writeFile(
    'public/api/city.json',
    JSON.stringify(city, null, 2)
  );
  
  // Export district JSONs
  for (const district of city.districts) {
    await writeFile(
      `public/api/districts/${district.id}.json`,
      JSON.stringify(district, null, 2)
    );
  }
  
  // Export building JSONs
  for (const district of city.districts) {
    for (const building of district.buildings) {
      await writeFile(
        `public/api/buildings/${district.id}/${building.id}.json`,
        JSON.stringify(building, null, 2)
      );
    }
  }
}
```

---

## Data Model Summary

### Core Entities
- **City**: Top-level container
- **District**: Domain grouping (6 districts)
- **Building**: Topic grouping (~12 buildings)
- **Floor**: Content section (~37 floors)

### Relationships
- City → Districts (1:many)
- District → Buildings (1:many)
- Building → Floors (1:many)
- Floor → Related Floors (many:many)

### Data Sources
- **MDX files**: Floor content with frontmatter
- **JSON files**: District and building metadata
- **Generated**: City structure, search index

### Storage
- **Build-time**: Processed into static files
- **Runtime**: Loaded from static files or generated on-demand
- **Client**: Preferences and session state in browser storage

---

*Data model designed for Neil's City Site. Last updated December 2024.*
