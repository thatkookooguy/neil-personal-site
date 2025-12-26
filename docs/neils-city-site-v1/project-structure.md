# Project Structure: Neil's City Site

**Version:** 1.0  
**Date:** December 2024  
**Project:** Personal Portfolio as Futuristic Isometric City

---

## Directory Structure

```
neils-city-site/
├── .github/
│   └── workflows/
│       ├── ci.yml              # CI/CD pipeline
│       └── lighthouse.yml      # Performance monitoring
│
├── .vscode/
│   ├── settings.json           # Editor settings
│   └── extensions.json         # Recommended extensions
│
├── public/
│   ├── api/                    # Generated JSON APIs
│   │   ├── city.json
│   │   ├── districts/
│   │   │   └── [district].json
│   │   └── buildings/
│   │       └── [district]/
│   │           └── [building].json
│   │
│   ├── assets/
│   │   ├── images/             # Optimized images
│   │   │   ├── city/
│   │   │   ├── districts/
│   │   │   └── characters/
│   │   │
│   │   ├── audio/              # Audio files
│   │   │   ├── ambient/
│   │   │   ├── train/
│   │   │   └── ui/
│   │   │
│   │   └── svg/                # SVG assets
│   │       ├── characters/
│   │       ├── icons/
│   │       └── graphics/
│   │
│   ├── fonts/                  # Web fonts
│   │   ├── space-grotesk.woff2
│   │   └── inter.woff2
│   │
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml             # Generated sitemap
│
├── src/
│   ├── components/
│   │   ├── Layout/             # Layout components
│   │   │   ├── SiteLayout.astro
│   │   │   ├── CityLayout.astro
│   │   │   ├── DistrictLayout.astro
│   │   │   ├── BuildingLayout.astro
│   │   │   ├── FloorLayout.astro
│   │   │   ├── SiteHeader.astro
│   │   │   └── SiteFooter.astro
│   │   │
│   │   ├── Views/              # View components
│   │   │   ├── CityView.astro
│   │   │   ├── DistrictView.astro
│   │   │   ├── BuildingView.astro
│   │   │   └── FloorView.astro
│   │   │
│   │   ├── City/               # City-specific components
│   │   │   ├── IsometricCity.astro
│   │   │   ├── DistrictMarkers.astro
│   │   │   ├── TrainTracks.astro
│   │   │   ├── Train.astro
│   │   │   └── DistrictCards.astro
│   │   │
│   │   ├── District/           # District components
│   │   │   ├── DistrictVisual.astro
│   │   │   ├── BuildingCards.astro
│   │   │   └── BuildingCard.astro
│   │   │
│   │   ├── Building/           # Building components
│   │   │   ├── BuildingCutaway.astro
│   │   │   ├── FloorList.astro
│   │   │   └── FloorItem.astro
│   │   │
│   │   ├── Floor/              # Floor components
│   │   │   ├── FloorContent.astro
│   │   │   ├── FloorHeader.astro
│   │   │   ├── RelatedFloors.astro
│   │   │   └── FloorCard.astro
│   │   │
│   │   ├── Navigation/        # Navigation components
│   │   │   ├── Breadcrumb.astro
│   │   │   ├── TrainNavigation.astro
│   │   │   ├── FloorNavigation.astro
│   │   │   └── DistrictPicker.astro
│   │   │
│   │   ├── Characters/        # Character components
│   │   │   ├── Neil.astro
│   │   │   └── Leela.astro
│   │   │
│   │   ├── Content/           # Content components
│   │   │   ├── MDXContent.astro
│   │   │   ├── CodeBlock.astro
│   │   │   ├── Diagram.astro
│   │   │   └── Image.astro
│   │   │
│   │   ├── Audio/            # Audio components
│   │   │   └── AudioController.astro
│   │   │
│   │   └── UI/               # UI components
│   │       ├── Button.astro
│   │       ├── Card.astro
│   │       ├── Modal.astro
│   │       └── SearchOverlay.astro
│   │
│   ├── layouts/               # Page layouts (Astro)
│   │   └── (layouts are in components/Layout/)
│   │
│   ├── pages/                # Astro pages (file-based routing)
│   │   ├── index.astro       # City view (/)
│   │   ├── [district]/
│   │   │   └── index.astro   # District view (/[district])
│   │   ├── [district]/
│   │   │   └── [building]/
│   │   │       └── index.astro # Building view (/[district]/[building])
│   │   └── [district]/
│   │       └── [building]/
│   │           └── [floor]/
│   │               └── index.astro # Floor view (/[district]/[building]/[floor])
│   │
│   ├── lib/                   # Utility functions
│   │   ├── content.ts         # Content loading functions
│   │   ├── navigation.ts      # Navigation utilities
│   │   ├── search.ts          # Search functionality
│   │   ├── audio.ts           # Audio utilities
│   │   ├── images.ts           # Image optimization
│   │   ├── mermaid.ts         # Diagram rendering
│   │   └── utils.ts           # General utilities
│   │
│   ├── styles/                # Global styles
│   │   ├── base.css           # Base styles, reset
│   │   ├── tokens.css         # CSS custom properties
│   │   ├── typography.css      # Typography styles
│   │   ├── layout.css         # Layout utilities
│   │   ├── components.css     # Component styles
│   │   └── utilities.css      # Utility classes
│   │
│   ├── scripts/               # Client-side scripts
│   │   ├── navigation.ts      # SPA navigation
│   │   ├── search.ts          # Search functionality
│   │   ├── audio.ts           # Audio controls
│   │   └── analytics.ts       # Analytics (optional)
│   │
│   ├── types/                 # TypeScript type definitions
│   │   ├── content.ts         # Content types
│   │   ├── navigation.ts      # Navigation types
│   │   └── global.d.ts        # Global types
│   │
│   └── env.d.ts               # Astro environment types
│
├── content/                    # Content files (MDX + JSON)
│   ├── city.json              # City metadata
│   │
│   └── districts/
│       ├── ai/
│       │   ├── district.json  # District metadata
│       │   └── buildings/
│       │       ├── workflows/
│       │       │   ├── building.json
│       │       │   └── floors/
│       │       │       ├── 01-prompt-engineering.mdx
│       │       │       ├── 02-chain-of-thought.mdx
│       │       │       ├── 03-context-windows.mdx
│       │       │       └── 04-tool-calling.mdx
│       │       └── agents/
│       │           ├── building.json
│       │           └── floors/
│       │               └── ...
│       │
│       ├── architecture/
│       │   └── ...
│       │
│       └── ... (other districts)
│
├── tests/                      # Test files
│   ├── unit/
│   │   └── lib/
│   ├── integration/
│   │   └── navigation.test.ts
│   └── e2e/
│       └── user-journeys.test.ts
│
├── docs/                       # Documentation
│   └── neils-city-site-v1/
│       ├── technical-architecture.md
│       ├── component-architecture.md
│       ├── data-model.md
│       ├── performance-strategy.md
│       ├── project-structure.md (this file)
│       └── ... (other docs)
│
├── .gitignore
├── .prettierrc                # Prettier configuration
├── .eslintrc.cjs              # ESLint configuration
├── astro.config.ts            # Astro configuration
├── package.json
├── pnpm-lock.yaml             # or package-lock.json
├── tsconfig.json              # TypeScript configuration
└── README.md
```

---

## Key Configuration Files

### `astro.config.ts`

```typescript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    react(), // For interactive islands
    mdx(), // For MDX content
    sitemap(), // Generate sitemap
  ],
  
  output: 'static', // Static site generation
  
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto', // Inline small CSS
  },
  
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-mdx': ['@mdx-js/react'],
          }
        }
      }
    }
  },
  
  // Content collections
  content: {
    collections: {
      floors: {
        schema: z.object({
          title: z.string(),
          order: z.number(),
          summary: z.string(),
          // ... other frontmatter fields
        })
      }
    }
  }
});
```

### `package.json`

```json
{
  "name": "neils-city-site",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "lint": "eslint . --ext .ts,.tsx,.astro",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lighthouse": "lighthouse-ci"
  },
  "dependencies": {
    "astro": "^4.0.0",
    "@astrojs/react": "^3.0.0",
    "@astrojs/mdx": "^2.0.0",
    "@astrojs/sitemap": "^2.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@mdx-js/react": "^3.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "eslint-plugin-astro": "^0.29.0",
    "prettier": "^3.0.0",
    "prettier-plugin-astro": "^0.12.0",
    "typescript": "^5.3.0",
    "vitest": "^1.0.0",
    "playwright": "^1.40.0",
    "@playwright/test": "^1.40.0"
  }
}
```

### `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noEmit": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### `.eslintrc.cjs`

```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'astro/no-unused-define-vars-in-style': 'error',
  },
};
```

### `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-astro"],
  "overrides": [
    {
      "files": "*.astro",
      "options": {
        "parser": "astro"
      }
    }
  ]
}
```

### `.gitignore`

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Build outputs
dist/
.astro/

# Environment variables
.env
.env.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
.idea
.DS_Store

# Testing
coverage/
.nyc_output/

# Misc
*.log
.cache
```

---

## Content File Structure

### `content/city.json`

```json
{
  "name": "Neil's City",
  "description": "A portfolio of work across AI, Architecture, DX, Infrastructure, and Open Source",
  "districts": [
    "central-station",
    "ai",
    "architecture",
    "dx",
    "infrastructure",
    "open-source"
  ],
  "lastUpdated": "2024-12-26"
}
```

### `content/districts/[district]/district.json`

```json
{
  "name": "AI District",
  "description": "Exploring AI workflows and agent architectures",
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

### `content/districts/[district]/buildings/[building]/building.json`

```json
{
  "name": "AI Workflows",
  "description": "Exploring AI workflow patterns and techniques",
  "order": 1,
  "featured": true
}
```

### `content/districts/[district]/buildings/[building]/floors/[floor].mdx`

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

---

## Style File Structure

### `src/styles/tokens.css`

```css
:root {
  /* Color tokens */
  --color-teal-500: #2D8A8A;
  /* ... other color tokens */
  
  /* Typography tokens */
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* Spacing tokens */
  --space-1: 0.25rem;
  /* ... other spacing tokens */
  
  /* Animation tokens */
  --duration-fast: 150ms;
  /* ... other animation tokens */
}
```

### `src/styles/base.css`

```css
/* Reset, base styles */
* {
  box-sizing: border-box;
}

body {
  font-family: var(--font-body);
  color: var(--text-primary);
  background: var(--bg-default);
}
```

### `src/styles/layout.css`

```css
/* Layout utilities */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.grid {
  display: grid;
  gap: var(--space-4);
}
```

---

## Library File Structure

### `src/lib/content.ts`

```typescript
// Content loading functions
export async function getCity(): Promise<City> { ... }
export async function getDistrict(id: string): Promise<District> { ... }
export async function getBuilding(districtId: string, buildingId: string): Promise<Building> { ... }
export async function getFloor(districtId: string, buildingId: string, floorId: string): Promise<Floor> { ... }
export async function getAllFloors(): Promise<Floor[]> { ... }
```

### `src/lib/navigation.ts`

```typescript
// Navigation utilities
export function parseUrl(url: string): NavigationState { ... }
export function stateToUrl(state: NavigationState): string { ... }
export function navigateTo(url: string): void { ... }
export function getBreadcrumb(state: NavigationState): BreadcrumbItem[] { ... }
```

### `src/lib/search.ts`

```typescript
// Search functionality
export function buildSearchIndex(floors: Floor[]): SearchIndex { ... }
export function search(query: string, index: SearchIndex): SearchResult[] { ... }
export function highlightMatches(text: string, query: string): string { ... }
```

---

## Build Output Structure

```
dist/
├── index.html                 # City view
├── ai/
│   ├── index.html             # AI District view
│   └── workflows/
│       ├── index.html         # AI Workflows building view
│       └── prompt-engineering/
│           └── index.html   # Prompt Engineering floor view
│
├── assets/
│   ├── index-[hash].js        # JavaScript bundles
│   ├── index-[hash].css       # CSS bundles
│   └── images/               # Optimized images
│
├── api/
│   ├── city.json
│   ├── districts/
│   └── buildings/
│
└── _astro/                    # Astro internal files
```

---

## Development Workflow

### Local Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Content Workflow

1. **Create new floor**: Add MDX file in `content/districts/[district]/buildings/[building]/floors/`
2. **Update metadata**: Update `building.json` if needed
3. **Build**: Run `pnpm build` to generate static files
4. **Preview**: Run `pnpm preview` to test locally

### Deployment Workflow

1. **Push to main**: Triggers CI/CD
2. **CI runs**: Tests, linting, type checking
3. **Build**: Astro generates static files
4. **Deploy**: Vercel deploys to edge network
5. **Verify**: Lighthouse CI checks performance

---

## File Naming Conventions

### Components
- **PascalCase**: `IsometricCity.astro`, `BuildingCutaway.astro`
- **Descriptive**: Component name reflects purpose

### Content Files
- **Kebab-case**: `prompt-engineering.mdx`, `district.json`
- **Numbered floors**: `01-prompt-engineering.mdx` (for ordering)

### Utility Files
- **camelCase**: `content.ts`, `navigation.ts`
- **Descriptive**: File name reflects functionality

### Styles
- **kebab-case**: `base.css`, `tokens.css`
- **Grouped by purpose**: `typography.css`, `layout.css`

---

## Import Path Aliases

```typescript
// Configured in tsconfig.json
import { getCity } from '@/lib/content';
import IsometricCity from '@/components/City/IsometricCity.astro';
import { Button } from '@/components/UI/Button.astro';
import '@/styles/base.css';
```

---

## Environment Variables

### `.env.example`

```env
# Public variables (available in client)
PUBLIC_SITE_URL=https://neils-city.com

# Build-time variables
CONTENT_DIR=./content
```

### Usage

```typescript
// Access in code
const siteUrl = import.meta.env.PUBLIC_SITE_URL;
```

---

## Testing Structure

```
tests/
├── unit/
│   ├── lib/
│   │   ├── content.test.ts
│   │   ├── navigation.test.ts
│   │   └── search.test.ts
│   └── components/
│       └── Button.test.tsx
│
├── integration/
│   ├── navigation.test.ts
│   └── content-loading.test.ts
│
└── e2e/
    ├── city-journey.test.ts
    ├── district-journey.test.ts
    └── floor-journey.test.ts
```

---

## Documentation Structure

```
docs/
└── neils-city-site-v1/
    ├── technical-architecture.md
    ├── component-architecture.md
    ├── data-model.md
    ├── performance-strategy.md
    ├── project-structure.md
    ├── brand-identity.md
    ├── color-system.md
    ├── navigation-patterns.md
    ├── state-transitions.md
    ├── mobile-strategy.md
    └── accessibility.md
```

---

## Summary

### Key Directories

- **`src/components/`**: All component code
- **`src/pages/`**: Astro pages (file-based routing)
- **`src/lib/`**: Utility functions
- **`src/styles/`**: Global styles
- **`content/`**: MDX content and metadata
- **`public/`**: Static assets

### Key Files

- **`astro.config.ts`**: Astro configuration
- **`package.json`**: Dependencies and scripts
- **`tsconfig.json`**: TypeScript configuration
- **`.eslintrc.cjs`**: Linting rules
- **`.prettierrc`**: Code formatting

### Conventions

- **Components**: PascalCase, descriptive names
- **Content**: Kebab-case, numbered floors
- **Utilities**: camelCase, descriptive names
- **Styles**: Kebab-case, grouped by purpose

---

*Project structure designed for Neil's City Site. Last updated December 2024.*
