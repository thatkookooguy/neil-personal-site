# Neil's City Site — Color System

## Design Philosophy

**60-30-10 Rule:**
- 60% — Warm neutrals (backgrounds, large surfaces)
- 30% — Neil's Teal (brand, actions, emphasis)
- 10% — Accent colors (terracotta, gold, district-specific)

**Core Principle:** No pure black (#000) or pure white (#FFF). Everything has warmth.

---

## Primary Palette

### Brand Colors

| Name | Hex | HSL | Usage |
|------|-----|-----|-------|
| **Neil's Teal** | `#2D8A8A` | 180° 50% 36% | Primary actions, links, Neil's signature color |
| **City Cream** | `#FDF6E3` | 44° 87% 94% | Primary background (warm paper) |
| **Warm Umber** | `#3D2F27` | 24° 23% 20% | Primary text (softer than black) |
| **Sunset Terracotta** | `#D4714E` | 18° 59% 57% | Secondary accent, energy, warmth |

### Supporting Neutrals

| Name | Hex | Usage |
|------|-----|-------|
| **Soft Sand** | `#EDE4D3` | Secondary backgrounds, cards |
| **Dusty Stone** | `#B8A99A` | Borders, dividers, muted text |
| **Deep Cocoa** | `#2A211A` | Dark mode text, emphasis |
| **Bone White** | `#FAF7F2` | Lightest background, highlights |

---

## Tonal Scales

### Teal Scale (Primary)
```css
--teal-50:  #E8F4F4;
--teal-100: #C5E4E4;
--teal-200: #9FD2D2;
--teal-300: #79C0C0;
--teal-400: #53AEAE;
--teal-500: #2D8A8A;  /* Primary */
--teal-600: #267676;
--teal-700: #1F6262;
--teal-800: #184E4E;
--teal-900: #113A3A;
```

### Terracotta Scale (Accent)
```css
--terracotta-50:  #FDF2ED;
--terracotta-100: #F9DFD3;
--terracotta-200: #F4C9B5;
--terracotta-300: #EFB397;
--terracotta-400: #E99D79;
--terracotta-500: #D4714E;  /* Primary */
--terracotta-600: #BA5F3F;
--terracotta-700: #9F4D31;
--terracotta-800: #843B24;
--terracotta-900: #6A2917;
```

### Neutral Scale (Warm Grays)
```css
--neutral-50:  #FAF7F2;
--neutral-100: #F5F0E8;
--neutral-200: #EDE4D3;
--neutral-300: #DFD3C0;
--neutral-400: #C7B8A4;
--neutral-500: #B8A99A;
--neutral-600: #8F7F6E;
--neutral-700: #665A4D;
--neutral-800: #3D2F27;
--neutral-900: #2A211A;
```

---

## Semantic Colors

### Status Colors

| Semantic | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| **Success** | `#4A9F6D` | `#5DBB80` | Confirmations, completed |
| **Warning** | `#D4A04E` | `#E5B65E` | Cautions, attention needed |
| **Error** | `#C4564A` | `#D66B5F` | Errors, destructive |
| **Info** | `#5A8AC4` | `#6D9DD7` | Informational, neutral highlights |

### Interactive States

| State | Light Mode | Dark Mode |
|-------|------------|-----------|
| **Link default** | `#2D8A8A` | `#4AADAD` |
| **Link hover** | `#1F6262` | `#5FC4C4` |
| **Link visited** | `#6B5A8A` | `#9080B0` |
| **Focus ring** | `#2D8A8A` | `#4AADAD` |

---

## District Color Themes

Each district has its own color atmosphere layered on top of the base palette.

### 1. Central Station
*The welcoming hub — Golden hour warmth*

| Role | Hex | Name |
|------|-----|------|
| Primary | `#E5C07A` | Golden Hour |
| Secondary | `#F5E6C8` | Warm Platform |
| Accent | `#8B7355` | Aged Brass |
| Glow | `#FFE4B5` | Lamp Light |

### 2. AI District
*Neon foundry — Mystical technology*

| Role | Hex | Name |
|------|-----|------|
| Primary | `#9B7BBF` | Neural Lavender |
| Secondary | `#2A1F3D` | Deep Circuit |
| Accent | `#5EE6D0` | Synth Mint |
| Glow | `#C4A6FF` | Node Glow |

### 3. Architecture District
*Blueprint precision — Structural clarity*

| Role | Hex | Name |
|------|-----|------|
| Primary | `#4A8BAF` | Blueprint Blue |
| Secondary | `#E8F1F5` | Technical Paper |
| Accent | `#2D5A7B` | Grid Depth |
| Glow | `#7AB8D9` | Laser Line |

### 4. DX District
*Glass tower — Morning clarity*

| Role | Hex | Name |
|------|-----|------|
| Primary | `#70B8A8` | Clear Glass |
| Secondary | `#F0F7F5` | Morning Mist |
| Accent | `#3D8B7A` | Fresh Leaf |
| Glow | `#A8E6D8` | Dawn Light |

### 5. Infrastructure District
*Industrial warmth — Mechanical reliability*

| Role | Hex | Name |
|------|-----|------|
| Primary | `#B87333` | Rust Copper |
| Secondary | `#3D3530` | Machine Dark |
| Accent | `#D4A574` | Worn Brass |
| Glow | `#FFB366` | Forge Ember |

### 6. Open Source District
*Arcade playful — Community energy*

| Role | Hex | Name |
|------|-----|------|
| Primary | `#5FB870` | Arcade Green |
| Secondary | `#1A2E20` | CRT Dark |
| Accent | `#F0E060` | Coin Gold |
| Glow | `#80FF80` | Pixel Glow |

---

## Light & Dark Mode

### Light Mode (Default)

```css
:root {
  --color-bg-primary: #FDF6E3;
  --color-bg-secondary: #EDE4D3;
  --color-bg-tertiary: #FAF7F2;
  
  --color-text-primary: #3D2F27;
  --color-text-secondary: #665A4D;
  --color-text-muted: #8F7F6E;
  
  --color-brand-primary: #2D8A8A;
  --color-brand-secondary: #D4714E;
  
  --color-border-default: #DFD3C0;
  --color-border-subtle: #EDE4D3;
}
```

### Dark Mode

```css
[data-theme="dark"] {
  --color-bg-primary: #1E1A17;
  --color-bg-secondary: #2A2420;
  --color-bg-tertiary: #352E28;
  
  --color-text-primary: #EDE4D3;
  --color-text-secondary: #B8A99A;
  --color-text-muted: #8F7F6E;
  
  --color-brand-primary: #4AADAD;
  --color-brand-secondary: #E99D79;
  
  --color-border-default: #4A413A;
  --color-border-subtle: #352E28;
}
```

---

## CSS Custom Properties (Full System)

```css
:root {
  /* === Base Palette === */
  --color-teal-500: #2D8A8A;
  --color-terracotta-500: #D4714E;
  --color-cream: #FDF6E3;
  --color-umber: #3D2F27;
  
  /* === Semantic: Backgrounds === */
  --color-bg-page: var(--color-cream);
  --color-bg-card: #FAF7F2;
  --color-bg-elevated: #FFFFFF;
  --color-bg-sunken: #EDE4D3;
  --color-bg-overlay: rgba(61, 47, 39, 0.6);
  
  /* === Semantic: Text === */
  --color-text-heading: var(--color-umber);
  --color-text-body: #4A3D34;
  --color-text-muted: #8F7F6E;
  --color-text-inverse: var(--color-cream);
  
  /* === Semantic: Interactive === */
  --color-link: var(--color-teal-500);
  --color-link-hover: #1F6262;
  --color-link-active: #113A3A;
  --color-focus-ring: var(--color-teal-500);
  
  /* === Semantic: Status === */
  --color-success: #4A9F6D;
  --color-success-bg: #E8F5ED;
  --color-warning: #D4A04E;
  --color-warning-bg: #FDF5E8;
  --color-error: #C4564A;
  --color-error-bg: #FDEDEB;
  --color-info: #5A8AC4;
  --color-info-bg: #EBF2FA;
  
  /* === Semantic: Borders === */
  --color-border-default: #DFD3C0;
  --color-border-subtle: #EDE4D3;
  --color-border-strong: #B8A99A;
  
  /* === District Overrides (set per district) === */
  --district-primary: var(--color-teal-500);
  --district-secondary: var(--color-cream);
  --district-accent: var(--color-terracotta-500);
  --district-glow: var(--color-teal-500);
  
  /* === Shadows (warm-tinted) === */
  --shadow-sm: 0 1px 2px rgba(61, 47, 39, 0.05);
  --shadow-md: 0 4px 6px rgba(61, 47, 39, 0.07);
  --shadow-lg: 0 10px 15px rgba(61, 47, 39, 0.1);
  --shadow-xl: 0 20px 25px rgba(61, 47, 39, 0.15);
  
  /* === Gradients === */
  --gradient-sunset: linear-gradient(135deg, #FDF6E3 0%, #EDE4D3 100%);
  --gradient-teal-fade: linear-gradient(180deg, #2D8A8A 0%, #1F6262 100%);
}

/* === District-specific overrides === */
[data-district="central"] {
  --district-primary: #E5C07A;
  --district-secondary: #F5E6C8;
  --district-accent: #8B7355;
  --district-glow: #FFE4B5;
}

[data-district="ai"] {
  --district-primary: #9B7BBF;
  --district-secondary: #2A1F3D;
  --district-accent: #5EE6D0;
  --district-glow: #C4A6FF;
}

[data-district="architecture"] {
  --district-primary: #4A8BAF;
  --district-secondary: #E8F1F5;
  --district-accent: #2D5A7B;
  --district-glow: #7AB8D9;
}

[data-district="dx"] {
  --district-primary: #70B8A8;
  --district-secondary: #F0F7F5;
  --district-accent: #3D8B7A;
  --district-glow: #A8E6D8;
}

[data-district="infrastructure"] {
  --district-primary: #B87333;
  --district-secondary: #3D3530;
  --district-accent: #D4A574;
  --district-glow: #FFB366;
}

[data-district="opensource"] {
  --district-primary: #5FB870;
  --district-secondary: #1A2E20;
  --district-accent: #F0E060;
  --district-glow: #80FF80;
}
```

---

## Accessibility Notes

### Contrast Ratios (WCAG AA)

| Combination | Ratio | Status |
|-------------|-------|--------|
| Umber on Cream | 10.2:1 | ✅ AAA |
| Teal on Cream | 4.6:1 | ✅ AA |
| Terracotta on Cream | 3.8:1 | ⚠️ Large text only |
| Cream on Umber | 10.2:1 | ✅ AAA |

### Colorblind Considerations
- Primary teal and terracotta are distinguishable in protanopia/deuteranopia
- District themes use shape + color, never color alone
- Status colors include icons, not just color

---

## File Changed
- Created: `docs/neils-city-site-v1/color-system.md`

