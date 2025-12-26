# Neil's City Site — Future Enhancements

## Captured Ideas for Post-V1

### 1. Isometric Building View with City Life

**From:** Phase 1 review discussion

**Idea:** Instead of a pure side-view cutaway, make the building view isometric as well. This would allow:
- Showing (possibly blurred) people/characters moving in city streets below
- Maintaining visual consistency with the city overview
- Adding ambient life and depth to the building experience
- More immersive feeling of "being in the city"

**V1 Decision:** Start with side-view cutaway for simplicity
**V2 Consideration:** Upgrade to isometric with street-level activity

---

### 2. Neil Blog Writer Integration

**Idea:** Use the `neil-blog-writer` agent for tone consistency
- Could review/refine floor content to match Neil's voice
- Ensures consistent tone across all written content
- Potential automated tone checking

---

### 3. Design Token Flexibility

**Requirement:** All design decisions (colors, typography, spacing) must be:
- Stored as CSS custom properties
- Easy to modify post-launch
- Potentially theme-able
- Documented for future updates

---

### 4. Day/Night City Mode (Theme Integration) ⭐ APPROVED

**From:** Phase 2 review discussion

**Idea:** Connect light/dark mode directly to the city's time of day:
- **Light Mode = Daytime City**: Blue sky, sun, natural lighting
- **Dark Mode = Nighttime City**: Starry sky, lit windows, ambient glow

**Visual Elements Affected:**

| Element | Day Mode | Night Mode |
|---------|----------|------------|
| **Sky** | Blue gradient, clouds | Dark blue/purple, stars |
| **Building windows** | Subtle reflections | Warm yellow glow (lit rooms) |
| **Train** | Normal colors | Headlights on, interior lit |
| **Street level** | Bright, clear | Street lamps, ambient lighting |
| **District accents** | Normal palette | Neon/glow effects more prominent |
| **Characters** | Full color | Slightly silhouetted with warm highlights |

**Ghibli References:**
- Spirited Away: The bathhouse at night with all windows glowing
- Howl's Moving Castle: Warm interior light spilling out
- Kiki's Delivery Service: Town at dusk with lights coming on

**Implementation Notes:**
- Need TWO versions of sky backgrounds (or gradient overlays)
- Building SVGs should have separate "window" layers for night glow
- CSS can handle most color shifts via variables
- Stars can be CSS/SVG animation layer
- Train headlight can be toggled via CSS class

**V1 Decision:** YES - Plan assets for both modes during Phase 3
**Priority:** High - This makes dark mode feel magical instead of just inverted

---

*Add more ideas here as they come up during development*

