# Neil’s City Site — Squad Leader Handoff Document

## Purpose

This document describes the **concept, structure, and content model** for a personal site that is:

* visually distinctive (isometric futuristic city + train)
* content-first and readable as a normal site
* easy to extend over time (add floors, buildings, districts)
* safe to implement incrementally

The goal is **not** to lock into a specific framework or rendering tech, but to define a **clear mental model and data shape** you can build against.

---

## High-level Concept

### What the site *is*

* A **futuristic isometric city**, viewed from above
* The city is divided into **districts**
* Each district contains **buildings**
* Each building is a **skyscraper**
* Each skyscraper contains **floors**
* The user navigates by:

  * overview city → district focus → building cutaway → scrolling floors

A **train** travels on elevated tracks between districts and acts as visual continuity and navigation glue.

---

### What the metaphor means (internally)

| Concept  | Meaning                                           |
| -------- | ------------------------------------------------- |
| City     | Entire body of work & thinking                    |
| District | Major domain (DX, AI, Architecture, Infra, OSS…)  |
| Building | Specific topic / project / deep dive              |
| Floor    | One scrollable content section                    |
| Train    | Traversal between domains (not content container) |

⚠️ The metaphor is **never explained to the user**.
It should feel intuitive, not narrative.

---

## Core Invariant (non-negotiable)

> **The site must fully work as a normal, readable website without visuals or animation.**

* Text is the source of truth
* Visuals are a projection layer
* Animations are ambient, never required

If JavaScript or animation is disabled:

* users can still read all content
* navigation still works

---

## Layered Architecture (Conceptual)

### 1️⃣ Content Layer (Source of Truth)

* Written as structured content (MDX / Markdown / JSON)
* Easy to edit
* Version controlled
* No rendering logic
* No canvas / animation knowledge required

### 2️⃣ World Model Layer

* Declarative structure:

  * city → districts → buildings → floors
* Maps content to world objects
* Drives navigation & layout
* Knows nothing about pixels or animation

### 3️⃣ Presentation Layer

* Isometric city
* Train movement
* Building cutaways
* Character animation (Neil + Leela)
* Fully driven by the world model + metadata

---

## Content Model (Canonical)

### Hierarchy

```
City
 └─ District
     └─ Building
         └─ Floor
```

### Atomic unit: **Floor**

A floor is:

* one scrollable section
* one conceptual chunk
* readable top-down, left-to-right
* safe to add / remove / reorder

Think:

> *“Adding a floor = adding a section to a page”*

---

## Authoring Model (How content is edited)

### Folder Shape (conceptual)

```
/content
  city.json

  /districts/{districtId}
    district.json
    /buildings/{buildingId}
      building.json
      /floors
        01-title.mdx
        02-title.mdx
```

Exact tooling is flexible — the **shape is not**.

---

### District metadata (`district.json`)

Defines:

* name
* description
* visual theme
* which buildings exist

Used for:

* city overview
* district focus view
* train routing

---

### Building metadata (`building.json`)

Defines:

* building name
* short summary
* floor ordering
* visual silhouette hints

Used for:

* building selection
* skyscraper rendering
* cutaway height

---

### Floor content (`*.mdx`)

Each floor file contains:

1. **Frontmatter (metadata)**

   * visual hints
   * character states
   * mood

2. **Content**

   * prose
   * diagrams
   * charts
   * examples

Example (simplified):

```mdx
---
title: "Strong Defaults"
scene:
  characters:
    - neil: architect
    - leela: wandering
  background:
    type: "default-paths"
---

# Strong defaults

Defaults shape behavior more than documentation ever will…
```

---

## Characters (Neil + Leela)

### Purpose

* Add warmth and memorability
* Convey different “modes” of work visually
* Never distract from reading

### Rules

* Characters are **ambient**
* They do not explain content
* They do not block text
* Controlled declaratively via metadata

### Neil states (examples)

* architect
* builder
* mentor
* observer
* guide

### Leela

* always present
* calm / playful / wandering
* emotional anchor

---

## Navigation Behavior

### City View

* Shows all districts
* Train moves between them
* Hover = name + tagline
* Click = zoom to district

### District View

* Focused mini-map
* Buildings become clickable
* Click building = enter cutaway mode

### Building View (Cutaway)

* Side-view skyscraper
* Floors stacked vertically
* Scroll = move between floors
* Behaves like a normal webpage

---

## Editing & Extension Scenarios (Very Important)

### Add a new floor

* Add a new `NN-title.mdx`
* Write content
* Optional scene metadata
* Appears automatically

### Edit content

* Edit MDX
* No visual code touched

### Add a new building

* Add building folder
* Register in district metadata
* City updates automatically

### Add a new district (future)

* Add district folder
* Define theme
* Extend train route

No refactors required.

---

## Diagrams & Charts

### Rule

> **Content owns diagrams. Visuals may enhance them, never replace them.**

* Diagrams live in MDX:

  * Mermaid
  * SVG
  * Images
* Must be readable statically
* Visual layer may animate / highlight lightly

---

## Implementation Guidance (Non-Prescriptive)

You are free to choose:

* framework
* renderer
* animation system
* CMS later on (optional)

As long as you preserve:

* content → world → visuals separation
* floor as atomic unit
* graceful degradation

---

## Current Status

* ✅ City structure finalized
* ✅ All districts defined
* ✅ All buildings defined
* ✅ All floors written (v1)
* ✅ Scene metadata present
* ❌ No visual / tech decisions locked

This is ready to implement.

---

## One-sentence summary (for internal alignment)

> “This is a content-first site where text defines a city, and visuals render that city — not the other way around.”
