# Neil's City Site — Brand Identity Document

**Version:** 1.0  
**Date:** December 2024  
**Project:** Personal Portfolio as Futuristic Isometric City

---

## 1. Brand Overview

### The Concept
Neil's City Site transforms a personal portfolio into an explorable **futuristic isometric city**. Each professional domain becomes a district, each topic a building, and each content section a floor. A train system connects districts, creating a cohesive navigation metaphor that turns browsing into urban exploration.

### The Metaphor
- **Districts** = Professional domains (AI, Architecture, DX, Infrastructure, Open Source)
- **Buildings** = Topics within each domain
- **Floors** = Content sections/articles
- **Train** = Navigation system connecting districts
- **Central Station** = Home/landing page

### The Characters
- **Neil** — Bearded developer with cap, teal/dark clothing. Focused, thoughtful, the city's architect and guide.
- **Leela** — Brown and white corgi with a star-patterned bandana. Playful companion, adds warmth and approachability.

---

## 2. Core Brand Values

### Primary Values

1. **Craftsmanship** — Every detail matters. Like Ghibli's hand-drawn worlds, this site values quality over quantity.

2. **Approachability** — Technical expertise presented with warmth. Complex topics made inviting, not intimidating.

3. **Exploration** — Discovery is the journey. The city invites wandering, finding unexpected connections.

4. **Timelessness** — Retro aesthetics that feel fresh, not dated. Classic principles with modern execution.

5. **Authenticity** — Personal voice, genuine perspective. Neil's unique worldview shapes every district.

### Brand Personality Spectrum

```
Serious ●───────○─────── Playful
         (slightly playful)

Technical ●─────────○───── Whimsical
           (grounded whimsy)

Corporate ───────────●──── Personal
                    (distinctly personal)

Minimal ────○───────────── Detailed
        (rich but curated)

Cold ─────────────●────── Warm
                 (predominantly warm)
```

---

## 3. Typography Recommendations

### Primary Font — Display & Headlines

**Recommended:** `Space Grotesk` or `DM Sans`

**Rationale:**
- Geometric sans-serif with enough character to feel crafted
- Clean enough for technical content
- Subtle retro DNA without feeling dated
- Excellent screen legibility at all sizes

**Alternatives:**
- `Outfit` — More rounded, friendlier
- `General Sans` — Classic proportions with warmth
- `Satoshi` — Contemporary with vintage undertones

### Secondary Font — Body Text

**Recommended:** `Inter` or `Source Sans 3`

**Rationale:**
- Optimized for screen reading
- Large x-height for legibility
- Extensive weight range for hierarchy
- Pairs naturally with geometric display fonts

**Alternative:**
- `IBM Plex Sans` — Slightly more technical feel

### Accent Font — Special Elements (Optional)

**Recommended:** `VT323` or `Press Start 2P` (used sparingly)

**Use Cases:**
- Error messages with personality
- Loading states
- Easter eggs
- Terminal/code snippets with character

**Rules:**
- Never for body text
- Maximum 1-2 words at a time
- Adds pixel-art flavor without overwhelming

### Typography Scale

```css
/* Base: 16px */
--text-xs:    0.75rem;   /* 12px - captions, labels */
--text-sm:    0.875rem;  /* 14px - secondary text */
--text-base:  1rem;      /* 16px - body text */
--text-lg:    1.125rem;  /* 18px - lead paragraphs */
--text-xl:    1.25rem;   /* 20px - small headings */
--text-2xl:   1.5rem;    /* 24px - H4 */
--text-3xl:   1.875rem;  /* 30px - H3 */
--text-4xl:   2.25rem;   /* 36px - H2 */
--text-5xl:   3rem;      /* 48px - H1 */
--text-6xl:   3.75rem;   /* 60px - Display */
```

### Line Heights & Spacing

```css
--leading-tight:  1.25;  /* Headlines */
--leading-normal: 1.5;   /* Body copy */
--leading-loose:  1.75;  /* Long-form reading */
```

---

## 4. Logo & Wordmark Direction

### Primary Mark Concept

**"The City Sigil"** — An isometric building shape that doubles as the letter "N"

**Elements:**
- Isometric perspective (30° angle)
- Simple geometric form
- Window details suggesting floors/content
- Subtle train track or platform element at base

### Wordmark Treatment

**Style:** Custom geometric sans with isometric flourishes

```
NEIL'S CITY
```

**Characteristics:**
- Clean, modern letterforms
- Subtle 3D/isometric shadow on key letters
- "N" can incorporate the building sigil
- Works without the sigil for compact uses

### Logo Variations

1. **Full Mark** — Sigil + Wordmark (primary use)
2. **Wordmark Only** — Text lockup for horizontal spaces
3. **Sigil Only** — Favicon, social icons, loading states
4. **Animated Sigil** — Train passes through/around for loading

### Logo Clear Space

Minimum clear space = height of one "floor" in the sigil (approximately 1/4 of logo height)

### Logo Don'ts

- ❌ Rotate the isometric angle
- ❌ Apply gradients (use flat colors only)
- ❌ Stretch or distort proportions
- ❌ Place on busy backgrounds without container
- ❌ Use drop shadows (contradicts flat isometric style)

---

## 5. Voice & Tone Guidelines

### Core Voice Attributes

1. **Knowledgeable but Never Condescending**
   - Explains complex topics clearly
   - Assumes intelligence, not prior knowledge
   - Uses analogies from the city metaphor

2. **Warm and Inviting**
   - Uses "you" and "we" naturally
   - Welcomes exploration and questions
   - Acknowledges difficulty without dwelling

3. **Subtly Playful**
   - Occasional city metaphor jokes
   - Leela might "interrupt" with asides
   - Technical accuracy with personality

4. **Confident but Humble**
   - States opinions clearly
   - Acknowledges limitations
   - Celebrates others' work generously

### Tone Modulation by District

| District | Tone Adjustment |
|----------|-----------------|
| Central Station | Welcoming, orientation-focused |
| AI District | Thoughtful, slightly mystical |
| Architecture District | Precise, structured |
| DX District | Clear, helpful, optimistic |
| Infrastructure District | Reliable, grounded, practical |
| Open Source District | Collaborative, enthusiastic |

### Writing Patterns

**Do:**
- "Let's explore how..." (invitational)
- "You might notice..." (observational)
- "Here's what I've learned..." (personal)
- "The interesting part is..." (engaging)

**Don't:**
- "Obviously..." (condescending)
- "Simply do..." (dismissive of complexity)
- "You should know..." (presumptuous)
- "As everyone knows..." (exclusionary)

### City Metaphor Usage

**Appropriate:**
- "This district focuses on..."
- "On the upper floors of this building..."
- "The train to DX District runs through..."
- "Leela found something interesting here..."

**Overuse (Avoid):**
- Every sentence referencing the metaphor
- Forced city puns
- Breaking immersion with meta-commentary

### Error Messages & Empty States

**Pattern:** Warm + Helpful + Character

```
"The train seems to have taken a detour. 
 [Return to Central Station] or [Try again]"

"This building is still under construction. 
 Leela is keeping an eye on progress. 🐕"

"No results in this district. 
 Maybe try exploring a neighboring area?"
```

---

## 6. Brand Application Guidelines

### Photography & Illustration

**No photography.** This is a fully illustrated world.

**Illustration Style:**
- Isometric perspective for city elements
- Warm, hand-crafted line quality
- Limited color palette per illustration
- Characters drawn in profile or 3/4 view
- Subtle pixel-art textures on surfaces

### Iconography

**Style:** Simplified isometric objects

**Characteristics:**
- 30° isometric grid
- 2px stroke weight (scaled proportionally)
- Rounded corners (2px radius at base size)
- Use brand colors, not full spectrum
- Optional: 1px highlight on top surfaces

### Motion Principles

1. **Trains Move Horizontally** — Navigation transitions flow left-right
2. **Buildings Grow Up** — Content expansion animates vertically
3. **Ease-Out Dominant** — Movement feels physical, decelerating naturally
4. **Subtle Parallax** — Isometric depth reinforced with layer movement
5. **Loading = Construction** — Building animations for load states

**Timing:**
```css
--duration-fast:   150ms;  /* Micro-interactions */
--duration-normal: 300ms;  /* Standard transitions */
--duration-slow:   500ms;  /* Page transitions */
--easing-default:  cubic-bezier(0.4, 0, 0.2, 1);
--easing-bounce:   cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Spacing System

Based on 4px grid with 8px base unit:

```css
--space-1:   0.25rem;  /* 4px */
--space-2:   0.5rem;   /* 8px */
--space-3:   0.75rem;  /* 12px */
--space-4:   1rem;     /* 16px */
--space-5:   1.25rem;  /* 20px */
--space-6:   1.5rem;   /* 24px */
--space-8:   2rem;     /* 32px */
--space-10:  2.5rem;   /* 40px */
--space-12:  3rem;     /* 48px */
--space-16:  4rem;     /* 64px */
```

---

## 7. Character Guidelines

### Neil

**Visual Consistency:**
- Always wears cap (can vary color by district)
- Beard shape consistent
- Teal as signature color
- Focused, thoughtful expression default
- Can show range: curious, pleased, concentrating

**Personality in UI:**
- Appears in explanatory moments
- "Architect's notes" for technical asides
- Profile picture for author attribution

### Leela

**Visual Consistency:**
- Star bandana always present
- Proportions stay consistent (corgi body type)
- Brown/white coloring
- Expressive ears and tail

**Personality in UI:**
- Appears in lighter moments
- Guides through errors/empty states
- Easter eggs and surprises
- "Leela's discoveries" for fun finds

### Together

- Leela at Neil's feet or nearby
- Never positioned where one obscures the other
- Leela can be independent for playful moments
- Neil + Leela = complete brand expression

---

## 8. Accessibility Commitments

### Core Principles

1. **Perceivable** — All content available to all senses
2. **Operable** — Full keyboard and assistive tech support
3. **Understandable** — Clear language, predictable behavior
4. **Robust** — Works across technologies

### Specific Commitments

- WCAG 2.1 AA minimum for all text
- AAA contrast for body text where possible
- Focus indicators visible in all themes
- Reduced motion option honored
- Alt text for all illustrations
- Semantic HTML throughout
- Skip navigation links
- Logical heading hierarchy

### Testing Cadence

- Automated accessibility testing in CI
- Manual screen reader testing quarterly
- Keyboard-only navigation testing monthly
- Color blindness simulation review for new palettes

---

## 9. Brand Evolution

### What Can Change

- District-specific color variations
- New buildings and topics
- Seasonal decorations (snow, lights)
- Character outfits by context
- New train routes

### What Stays Fixed

- Core color palette ratios
- Typography families
- Isometric angle (30°)
- Character proportions
- Voice fundamentals
- Accessibility standards

---

*Document maintained by Neil Kalman. Last updated December 2024.*
