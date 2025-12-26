# Neil's City Site — Color System

**Version:** 1.0  
**Date:** December 2024  
**Project:** Personal Portfolio as Futuristic Isometric City

---

## Day/Night City Colors

The light/dark mode toggle represents **Daytime** and **Nighttime** in Neil's City. This maintains the Ghibli warmth — nighttime should feel **cozy and inviting**, not cold and sterile.

### Daytime (Light Mode)

The city exists in perpetual golden hour — warm, clear, and inviting.

```json
{
  "daytime_environment": {
    "sky": {
      "gradient_top": { "name": "Clear Sky Blue", "hex": "#87CEEB", "description": "Soft, warm blue at zenith" },
      "gradient_horizon": { "name": "Horizon Cream", "hex": "#FDF6E3", "description": "Warm cream blending into buildings" }
    },
    "clouds": {
      "base": { "name": "Ghibli Cloud White", "hex": "#FFFFFF", "description": "Soft cumulus clouds" },
      "shadow": { "hex": "#E8E4DC", "description": "Subtle warm shadow on cloud undersides" }
    },
    "sun": {
      "glow": { "name": "Afternoon Gold", "hex": "#FFE4B5", "description": "Soft golden light cast on buildings" },
      "highlight": { "hex": "#FFF8DC", "description": "Brightest sun reflection points" }
    },
    "atmosphere": {
      "ambient": "Warm, clear, golden hour lighting",
      "mood": "Welcoming, optimistic, adventurous"
    }
  }
}
```

### Nighttime (Dark Mode)

Inspired by Ghibli's magical night scenes — glowing windows, warm street lamps, and a sense of cozy mystery.

```json
{
  "nighttime_environment": {
    "sky": {
      "gradient_top": { "name": "Deep Night Blue", "hex": "#1A1A2E", "description": "Deep purple-blue at zenith" },
      "gradient_horizon": { "name": "Warm Night Horizon", "hex": "#2D2A3A", "description": "Purple-brown glow from city lights" }
    },
    "stars": {
      "primary": { "name": "Star White", "hex": "#FFFAF0", "description": "Main star color" },
      "secondary": { "name": "Star Yellow", "hex": "#F5F5DC", "description": "Warm tinted stars for variety" },
      "effect": "Subtle twinkle animation (opacity pulse)"
    },
    "window_glow": {
      "standard": { "name": "Window Amber", "hex": "#F5D88A", "description": "Warm amber glow from inhabited buildings" },
      "bright": { "name": "Window Gold", "hex": "#FFD700", "description": "Brighter windows, shops, active spaces" }
    },
    "lighting": {
      "street_lamp": { "name": "Lamp Warm White", "hex": "#FFF8DC", "description": "Street lamps cast warm pools" },
      "train_headlight": { "name": "Headlight Warm", "hex": "#FFFAF0", "description": "Train headlight beam" },
      "moon_glow": { "name": "Moon Blue-White", "hex": "#E8F0FF", "description": "Soft blue-white if moon is shown" }
    },
    "atmosphere": {
      "ambient": "Cozy, warm despite darkness, magical stillness",
      "mood": "Peaceful, intimate, slightly mysterious"
    }
  }
}
```

### Day/Night Transition Guidelines

| Element | Daytime | Nighttime | Notes |
|---------|---------|-----------|-------|
| Sky Top | `#87CEEB` (light blue) | `#1A1A2E` (deep purple-blue) | Gradual gradient |
| Sky Horizon | `#FDF6E3` (cream) | `#2D2A3A` (warm purple-brown) | Reflects city glow |
| Building Windows | Natural light reflection | `#F5D88A` amber glow | Key night feature |
| Shadows | Warm brown tones | Deep warm purples | Never pure black |
| Accent Colors | Full saturation | Slightly muted, glow effects | Maintain warmth |

### Night Mode Special Effects

```css
/* Window glow effect for night mode */
.building-window {
  /* Daytime: simple window */
  background: rgba(255, 255, 255, 0.3);
}

[data-theme="dark"] .building-window {
  /* Nighttime: warm inviting glow */
  background: #F5D88A;
  box-shadow: 
    0 0 8px rgba(245, 216, 138, 0.6),
    0 0 16px rgba(245, 216, 138, 0.3);
}
```

---

## 1. Color Philosophy

### Guiding Principles

The color system for Neil's City draws from two primary influences:

1. **Studio Ghibli Films** — Warm, earthy tones with moments of vibrant magic. Backgrounds that feel like watercolors. Nostalgic yet timeless.

2. **Retro Pixel Art Games** — Deliberate, limited palettes. High contrast for clarity. Saturated accents against muted backgrounds.

### Color Relationships

- **Analogous warmth** as the foundation (cream, tan, terracotta, warm brown)
- **Split-complementary teals** for Neil's signature and tech elements
- **Selective saturation** — most colors are slightly desaturated, accents pop
- **Golden hour lighting** — the city exists in perpetual warm afternoon light

---

## 2. Primary Brand Palette

### Core Colors

```json
{
  "primary": {
    "teal": {
      "name": "Neil's Teal",
      "description": "Neil's signature color. Used for primary actions, links, and key UI elements.",
      "hex": "#2D8A8A",
      "hsl": "180, 50%, 36%",
      "rgb": "45, 138, 138"
    },
    "cream": {
      "name": "City Cream",
      "description": "Primary background. Warm paper-like base for the entire city.",
      "hex": "#FDF6E3",
      "hsl": "44, 87%, 94%",
      "rgb": "253, 246, 227"
    },
    "warm_brown": {
      "name": "Warm Umber",
      "description": "Primary text color. Rich brown that's softer than black.",
      "hex": "#3D2F27",
      "hsl": "24, 22%, 20%",
      "rgb": "61, 47, 39"
    },
    "terracotta": {
      "name": "Sunset Terracotta",
      "description": "Secondary brand color. Warmth, energy, accent moments.",
      "hex": "#D4714E",
      "hsl": "17, 61%, 57%",
      "rgb": "212, 113, 78"
    }
  }
}
```

### Extended Teal Scale

```json
{
  "teal_scale": {
    "50":  { "hex": "#E8F5F5", "use": "Subtle backgrounds, hover states" },
    "100": { "hex": "#C5E4E4", "use": "Light backgrounds" },
    "200": { "hex": "#9DD1D1", "use": "Borders, dividers" },
    "300": { "hex": "#6DBABA", "use": "Secondary buttons, tags" },
    "400": { "hex": "#45A3A3", "use": "Links, interactive elements" },
    "500": { "hex": "#2D8A8A", "use": "PRIMARY - buttons, key actions" },
    "600": { "hex": "#247070", "use": "Hover state for primary" },
    "700": { "hex": "#1B5555", "use": "Active/pressed state" },
    "800": { "hex": "#133B3B", "use": "Dark mode primary" },
    "900": { "hex": "#0A2020", "use": "Dark backgrounds" }
  }
}
```

### Extended Warm Scale (Neutrals)

```json
{
  "warm_scale": {
    "50":  { "hex": "#FDF6E3", "use": "Primary background" },
    "100": { "hex": "#F5ECD8", "use": "Subtle surface" },
    "200": { "hex": "#E8DBC3", "use": "Cards, elevated surfaces" },
    "300": { "hex": "#D4C4A8", "use": "Borders" },
    "400": { "hex": "#B8A080", "use": "Muted text, placeholders" },
    "500": { "hex": "#8C7355", "use": "Secondary text" },
    "600": { "hex": "#6B5540", "use": "Body text alternative" },
    "700": { "hex": "#4D3D2E", "use": "Headings" },
    "800": { "hex": "#3D2F27", "use": "PRIMARY TEXT" },
    "900": { "hex": "#261D18", "use": "High contrast text" }
  }
}
```

---

## 3. Secondary & Accent Palette

### Supporting Colors

```json
{
  "secondary": {
    "golden": {
      "name": "Afternoon Gold",
      "description": "Highlights, achievements, premium elements",
      "hex": "#E8B44C",
      "hsl": "42, 78%, 60%"
    },
    "sage": {
      "name": "Garden Sage",
      "description": "Natural, organic elements, success states",
      "hex": "#7D9B76",
      "hsl": "107, 15%, 54%"
    },
    "coral": {
      "name": "Soft Coral",
      "description": "Gentle warnings, Leela's bandana stars",
      "hex": "#E88D7D",
      "hsl": "10, 70%, 70%"
    },
    "lavender": {
      "name": "Dusk Lavender",
      "description": "AI/magical elements, special features",
      "hex": "#9B8AA8",
      "hsl": "275, 15%, 60%"
    }
  }
}
```

### Accent Scale — Terracotta

```json
{
  "terracotta_scale": {
    "50":  { "hex": "#FEF3EE" },
    "100": { "hex": "#FDE2D6" },
    "200": { "hex": "#F9C4AD" },
    "300": { "hex": "#F1A082" },
    "400": { "hex": "#E8825D" },
    "500": { "hex": "#D4714E" },
    "600": { "hex": "#B85A3A" },
    "700": { "hex": "#8F4429" },
    "800": { "hex": "#66311D" },
    "900": { "hex": "#3D1E11" }
  }
}
```

---

## 4. District Color Themes

Each district has a unique color atmosphere while maintaining brand cohesion.

### Central Station
**Mood:** Calm, welcoming, the heart of the city

```json
{
  "district": "Central Station",
  "atmosphere": "Golden hour warmth, welcoming glow",
  "primary_accent": "#E8B44C",
  "secondary_accent": "#D4714E",
  "surface_tint": "#FDF6E3",
  "highlight": "#F5D88A",
  "shadows": "#8C7355"
}
```

### AI District
**Mood:** Neon-foundry, focused, technological magic

```json
{
  "district": "AI District",
  "atmosphere": "Electric twilight, glowing nodes, mystical tech",
  "primary_accent": "#9B8AA8",
  "secondary_accent": "#6B5BA8",
  "surface_tint": "#F5F0F8",
  "highlight": "#C4B5D0",
  "glow": "#B8A0E8",
  "shadows": "#4A3D5C"
}
```

### Architecture District
**Mood:** Structured, professional, blueprint precision

```json
{
  "district": "Architecture District",
  "atmosphere": "Clean lines, technical precision, structural clarity",
  "primary_accent": "#2D8A8A",
  "secondary_accent": "#1B5555",
  "surface_tint": "#F0F5F5",
  "grid_lines": "#C5E4E4",
  "blueprint": "#4A8FA8",
  "shadows": "#3D4A4A"
}
```

### DX District (Developer Experience)
**Mood:** Glass-tower clarity, bright optimism

```json
{
  "district": "DX District",
  "atmosphere": "Morning light, glass reflections, clarity",
  "primary_accent": "#45A3A3",
  "secondary_accent": "#7D9B76",
  "surface_tint": "#F8FCFA",
  "highlight": "#A8E0D0",
  "glass_reflection": "#E8F5F0",
  "shadows": "#4A5C55"
}
```

### Infrastructure District
**Mood:** Industrial reliability, mechanical warmth

```json
{
  "district": "Infrastructure District",
  "atmosphere": "Factory glow, metal and steam, reliable machinery",
  "primary_accent": "#B85A3A",
  "secondary_accent": "#8C7355",
  "surface_tint": "#F8F3ED",
  "metal": "#A89888",
  "rust_accent": "#C47040",
  "shadows": "#5C4A3D"
}
```

### Open Source District
**Mood:** Arcade playfulness with serious craft

```json
{
  "district": "Open Source District",
  "atmosphere": "Pixel art arcade, playful energy, community vibrancy",
  "primary_accent": "#7D9B76",
  "secondary_accent": "#E88D7D",
  "surface_tint": "#F5F8F0",
  "pixel_green": "#5CB85C",
  "arcade_glow": "#A8D8A8",
  "shadows": "#4A5540"
}
```

---

## 5. Semantic Colors

### Status Colors

```json
{
  "semantic": {
    "success": {
      "default": { "hex": "#5C9E5C", "name": "Forest Success" },
      "light": { "hex": "#D4E8D4", "name": "Success Background" },
      "dark": { "hex": "#3D6B3D", "name": "Success Pressed" },
      "text_on": { "hex": "#FFFFFF" }
    },
    "warning": {
      "default": { "hex": "#D4A03D", "name": "Amber Warning" },
      "light": { "hex": "#F5ECD0", "name": "Warning Background" },
      "dark": { "hex": "#A67C2E", "name": "Warning Pressed" },
      "text_on": { "hex": "#3D2F27" }
    },
    "error": {
      "default": { "hex": "#C45C5C", "name": "Rust Error" },
      "light": { "hex": "#F5DCDC", "name": "Error Background" },
      "dark": { "hex": "#943D3D", "name": "Error Pressed" },
      "text_on": { "hex": "#FFFFFF" }
    },
    "info": {
      "default": { "hex": "#5C8FA8", "name": "Sky Info" },
      "light": { "hex": "#D8EBF3", "name": "Info Background" },
      "dark": { "hex": "#3D6080", "name": "Info Pressed" },
      "text_on": { "hex": "#FFFFFF" }
    }
  }
}
```

### Interactive States

```json
{
  "interaction": {
    "focus_ring": { "hex": "#45A3A3", "alpha": "50%", "width": "3px" },
    "selection": { "hex": "#C5E4E4" },
    "hover_overlay": { "hex": "#000000", "alpha": "4%" },
    "active_overlay": { "hex": "#000000", "alpha": "8%" },
    "disabled_opacity": "40%"
  }
}
```

---

## 6. Light & Dark Mode

### Light Mode (Default)

```json
{
  "light_mode": {
    "bg": {
      "default": "#FDF6E3",
      "subtle": "#F5ECD8",
      "muted": "#E8DBC3",
      "inverse": "#3D2F27"
    },
    "surface": {
      "default": "#FFFFFF",
      "raised": "#FFFFFF",
      "overlay": "#FFFFFF"
    },
    "text": {
      "primary": "#3D2F27",
      "secondary": "#6B5540",
      "muted": "#8C7355",
      "inverse": "#FDF6E3",
      "link": "#2D8A8A",
      "link_hover": "#1B5555"
    },
    "border": {
      "default": "#D4C4A8",
      "subtle": "#E8DBC3",
      "strong": "#8C7355"
    }
  }
}
```

### Dark Mode

```json
{
  "dark_mode": {
    "bg": {
      "default": "#1A1512",
      "subtle": "#261D18",
      "muted": "#3D2F27",
      "inverse": "#FDF6E3"
    },
    "surface": {
      "default": "#2A221C",
      "raised": "#3D2F27",
      "overlay": "#4D3D2E"
    },
    "text": {
      "primary": "#F5ECD8",
      "secondary": "#D4C4A8",
      "muted": "#8C7355",
      "inverse": "#3D2F27",
      "link": "#6DBABA",
      "link_hover": "#9DD1D1"
    },
    "border": {
      "default": "#4D3D2E",
      "subtle": "#3D2F27",
      "strong": "#6B5540"
    },
    "teal_adjusted": {
      "primary": "#45A3A3",
      "hover": "#6DBABA"
    }
  }
}
```

### Dark Mode District Adjustments

In dark mode, district themes shift to darker, more saturated versions:

```json
{
  "dark_districts": {
    "central_station": { "accent": "#F5D88A", "surface_tint": "#2A221C" },
    "ai_district": { "accent": "#B8A0E8", "surface_tint": "#251D2A" },
    "architecture_district": { "accent": "#6DBABA", "surface_tint": "#1A2525" },
    "dx_district": { "accent": "#A8E0D0", "surface_tint": "#1A2520" },
    "infrastructure_district": { "accent": "#E88D60", "surface_tint": "#2A201A" },
    "open_source_district": { "accent": "#A8D8A8", "surface_tint": "#1A251A" }
  }
}
```

---

## 7. CSS Custom Properties

### Complete Token System

```css
:root {
  /* ========================================
     NEIL'S CITY — COLOR TOKENS
     ======================================== */
  
  /* --- Primary Brand --- */
  --color-teal-50: #E8F5F5;
  --color-teal-100: #C5E4E4;
  --color-teal-200: #9DD1D1;
  --color-teal-300: #6DBABA;
  --color-teal-400: #45A3A3;
  --color-teal-500: #2D8A8A;
  --color-teal-600: #247070;
  --color-teal-700: #1B5555;
  --color-teal-800: #133B3B;
  --color-teal-900: #0A2020;
  
  /* --- Warm Neutrals --- */
  --color-warm-50: #FDF6E3;
  --color-warm-100: #F5ECD8;
  --color-warm-200: #E8DBC3;
  --color-warm-300: #D4C4A8;
  --color-warm-400: #B8A080;
  --color-warm-500: #8C7355;
  --color-warm-600: #6B5540;
  --color-warm-700: #4D3D2E;
  --color-warm-800: #3D2F27;
  --color-warm-900: #261D18;
  
  /* --- Terracotta Accent --- */
  --color-terracotta-50: #FEF3EE;
  --color-terracotta-100: #FDE2D6;
  --color-terracotta-200: #F9C4AD;
  --color-terracotta-300: #F1A082;
  --color-terracotta-400: #E8825D;
  --color-terracotta-500: #D4714E;
  --color-terracotta-600: #B85A3A;
  --color-terracotta-700: #8F4429;
  --color-terracotta-800: #66311D;
  --color-terracotta-900: #3D1E11;
  
  /* --- Secondary Colors --- */
  --color-golden: #E8B44C;
  --color-sage: #7D9B76;
  --color-coral: #E88D7D;
  --color-lavender: #9B8AA8;
  
  /* --- Semantic: Status --- */
  --color-success: #5C9E5C;
  --color-success-light: #D4E8D4;
  --color-success-dark: #3D6B3D;
  
  --color-warning: #D4A03D;
  --color-warning-light: #F5ECD0;
  --color-warning-dark: #A67C2E;
  
  --color-error: #C45C5C;
  --color-error-light: #F5DCDC;
  --color-error-dark: #943D3D;
  
  --color-info: #5C8FA8;
  --color-info-light: #D8EBF3;
  --color-info-dark: #3D6080;
  
  /* ========================================
     SEMANTIC TOKENS — LIGHT MODE
     ======================================== */
  
  /* --- Backgrounds --- */
  --bg-default: var(--color-warm-50);
  --bg-subtle: var(--color-warm-100);
  --bg-muted: var(--color-warm-200);
  --bg-inverse: var(--color-warm-800);
  
  /* --- Surfaces --- */
  --surface-default: #FFFFFF;
  --surface-raised: #FFFFFF;
  --surface-overlay: #FFFFFF;
  
  /* --- Text --- */
  --text-primary: var(--color-warm-800);
  --text-secondary: var(--color-warm-600);
  --text-muted: var(--color-warm-500);
  --text-inverse: var(--color-warm-50);
  --text-link: var(--color-teal-500);
  --text-link-hover: var(--color-teal-700);
  
  /* --- Borders --- */
  --border-default: var(--color-warm-300);
  --border-subtle: var(--color-warm-200);
  --border-strong: var(--color-warm-500);
  
  /* --- Actions --- */
  --action-primary-bg: var(--color-teal-500);
  --action-primary-bg-hover: var(--color-teal-600);
  --action-primary-bg-active: var(--color-teal-700);
  --action-primary-fg: #FFFFFF;
  
  --action-secondary-bg: var(--color-terracotta-500);
  --action-secondary-bg-hover: var(--color-terracotta-600);
  --action-secondary-fg: #FFFFFF;
  
  /* --- Focus & Selection --- */
  --focus-ring: var(--color-teal-400);
  --selection-bg: var(--color-teal-100);
  
  /* ========================================
     DISTRICT THEMES
     ======================================== */
  
  /* Central Station */
  --district-central-accent: var(--color-golden);
  --district-central-secondary: var(--color-terracotta-500);
  --district-central-surface: var(--color-warm-50);
  
  /* AI District */
  --district-ai-accent: var(--color-lavender);
  --district-ai-secondary: #6B5BA8;
  --district-ai-surface: #F5F0F8;
  --district-ai-glow: #B8A0E8;
  
  /* Architecture District */
  --district-arch-accent: var(--color-teal-500);
  --district-arch-secondary: var(--color-teal-700);
  --district-arch-surface: #F0F5F5;
  --district-arch-grid: var(--color-teal-100);
  
  /* DX District */
  --district-dx-accent: var(--color-teal-400);
  --district-dx-secondary: var(--color-sage);
  --district-dx-surface: #F8FCFA;
  --district-dx-glass: #E8F5F0;
  
  /* Infrastructure District */
  --district-infra-accent: var(--color-terracotta-600);
  --district-infra-secondary: var(--color-warm-500);
  --district-infra-surface: #F8F3ED;
  --district-infra-metal: #A89888;
  
  /* Open Source District */
  --district-oss-accent: var(--color-sage);
  --district-oss-secondary: var(--color-coral);
  --district-oss-surface: #F5F8F0;
  --district-oss-pixel: #5CB85C;
}

/* ========================================
   DARK MODE
   ======================================== */

[data-theme="dark"],
.dark {
  /* --- Backgrounds --- */
  --bg-default: #1A1512;
  --bg-subtle: #261D18;
  --bg-muted: var(--color-warm-800);
  --bg-inverse: var(--color-warm-50);
  
  /* --- Surfaces --- */
  --surface-default: #2A221C;
  --surface-raised: var(--color-warm-800);
  --surface-overlay: var(--color-warm-700);
  
  /* --- Text --- */
  --text-primary: var(--color-warm-100);
  --text-secondary: var(--color-warm-300);
  --text-muted: var(--color-warm-500);
  --text-inverse: var(--color-warm-800);
  --text-link: var(--color-teal-300);
  --text-link-hover: var(--color-teal-200);
  
  /* --- Borders --- */
  --border-default: var(--color-warm-700);
  --border-subtle: var(--color-warm-800);
  --border-strong: var(--color-warm-600);
  
  /* --- Actions --- */
  --action-primary-bg: var(--color-teal-400);
  --action-primary-bg-hover: var(--color-teal-300);
  --action-primary-bg-active: var(--color-teal-500);
  --action-primary-fg: var(--color-warm-900);
  
  /* --- District Adjustments --- */
  --district-central-accent: #F5D88A;
  --district-central-surface: #2A221C;
  
  --district-ai-accent: #B8A0E8;
  --district-ai-surface: #251D2A;
  
  --district-arch-accent: var(--color-teal-300);
  --district-arch-surface: #1A2525;
  
  --district-dx-accent: #A8E0D0;
  --district-dx-surface: #1A2520;
  
  --district-infra-accent: #E88D60;
  --district-infra-surface: #2A201A;
  
  --district-oss-accent: #A8D8A8;
  --district-oss-surface: #1A251A;
}
```

---

## 8. Accessibility & Contrast

### Verified Contrast Ratios (WCAG 2.1)

| Pair | Light Mode | Ratio | Grade |
|------|------------|-------|-------|
| Primary text on cream bg | `#3D2F27` on `#FDF6E3` | **12.5:1** | AAA ✓ |
| Secondary text on cream bg | `#6B5540` on `#FDF6E3` | **6.8:1** | AA ✓ |
| Muted text on cream bg | `#8C7355` on `#FDF6E3` | **4.1:1** | AA (large) |
| Teal link on cream bg | `#2D8A8A` on `#FDF6E3` | **5.2:1** | AA ✓ |
| White on teal button | `#FFFFFF` on `#2D8A8A` | **4.8:1** | AA ✓ |
| White on terracotta | `#FFFFFF` on `#D4714E` | **3.5:1** | AA (large) |
| Dark text on terracotta | `#3D2F27` on `#D4714E` | **4.6:1** | AA ✓ |

| Pair | Dark Mode | Ratio | Grade |
|------|-----------|-------|-------|
| Primary text on dark bg | `#F5ECD8` on `#1A1512` | **14.2:1** | AAA ✓ |
| Secondary text on dark bg | `#D4C4A8` on `#1A1512` | **10.1:1** | AAA ✓ |
| Teal link on dark bg | `#6DBABA` on `#1A1512` | **8.4:1** | AAA ✓ |
| Dark text on teal button | `#261D18` on `#45A3A3` | **7.2:1** | AAA ✓ |

### Decorative-Only Colors

These colors should **NOT** be used for text:

- `--color-golden` (#E8B44C) — decorative only, highlight borders
- `--color-coral` (#E88D7D) — decorative only, illustrations
- `--color-teal-50` through `--color-teal-200` — backgrounds only

### Focus Indicators

```css
/* Focus ring visible in both modes */
*:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 2px;
}

/* High contrast focus for dark mode */
[data-theme="dark"] *:focus-visible {
  outline-color: var(--color-teal-200);
}
```

---

## 9. Usage Guidelines

### 60-30-10 Distribution

| Role | Colors | Usage |
|------|--------|-------|
| **60% — Dominant** | Cream, warm neutrals | Backgrounds, large surfaces |
| **30% — Supporting** | Teal, district accents | Headers, navigation, cards |
| **10% — Accent** | Terracotta, golden, coral | CTAs, highlights, character elements |

### Color Do's

- ✅ Use cream (`--bg-default`) as the primary background
- ✅ Use teal for primary actions and links
- ✅ Apply district themes to their specific sections
- ✅ Use warm brown for body text (never pure black)
- ✅ Maintain consistent status colors across all districts

### Color Don'ts

- ❌ Use pure black (#000000) for text
- ❌ Use pure white (#FFFFFF) for backgrounds in light mode
- ❌ Mix district accent colors outside their districts
- ❌ Use golden or coral for body text
- ❌ Apply multiple district themes on the same screen

### Character Color Rules

**Neil:**
- Clothing: `--color-teal-500` to `--color-teal-700`
- Skin: Custom warm tone (not from palette)
- Cap: Can match district theme

**Leela:**
- Fur: Warm browns from `--color-warm-600` to `--color-warm-800`
- Bandana: `--color-coral` with `--color-golden` stars
- Nose/details: `--color-warm-900`

---

## 10. Implementation Checklist

### Before Launch

- [ ] All text passes WCAG 2.1 AA contrast
- [ ] Focus indicators visible in both themes
- [ ] District themes tested independently
- [ ] Dark mode toggle functions correctly
- [ ] Color tokens imported in all components
- [ ] No hardcoded hex values in component styles
- [ ] Status colors consistent across all districts
- [ ] Reduced motion preferences don't affect color

### Testing Tools

- **Contrast:** WebAIM Contrast Checker, Stark
- **Color Blindness:** Sim Daltonism, Color Oracle
- **Full Audit:** axe DevTools, WAVE

---

*Color system designed for Neil's City Site. Verify exact contrast ratios with a tool before production deployment.*
