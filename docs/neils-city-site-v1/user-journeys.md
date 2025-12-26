# Neil's City Site — User Journeys

## Primary Personas

### 1. Curious Developer
**"I heard about this cool site, let me explore"**

- Arrives via social link or word-of-mouth
- Open to discovery
- Moderate time to spend
- Might not know what they're looking for

### 2. Purposeful Researcher
**"I need to understand Neil's take on DX/AI/Architecture"**

- Arrives via search or direct link
- Has specific topic in mind
- Wants to go deep quickly
- May bookmark for later

### 3. Recruiter / Decision-Maker
**"Evaluating Neil for a role/project"**

- Needs quick credibility signals
- Limited time
- Wants: expertise areas, communication style, personality
- May share with others

---

## First-Time Visitor Journey

### Stage 1: Landing

**Entry point:** `/` (City View)

**User sees:**
- Isometric city overview
- Districts with visual identity
- Train moving between areas
- Subtle prompt: "Explore the city"

**User thinks:**
- "Oh, this is different"
- "What are these areas?"
- "Where do I start?"

**Success criteria:**
- Understands this is navigable
- Notices district names
- Feels invited, not confused

### Stage 2: Orientation

**Action:** Hovers over districts, reads names/taglines

**User learns:**
- Central = "Start here"
- Other districts = topic areas
- Train connects them

**Success criteria:**
- Can identify 2-3 topic areas
- Knows where to start
- Curiosity engaged

### Stage 3: First District

**Action:** Clicks Central Station (most likely) or topic of interest

**User sees:**
- Zoom into district
- Buildings become prominent
- Can see building names/summaries

**User thinks:**
- "Okay, buildings are sub-topics"
- "Which one interests me?"

**Success criteria:**
- Understands building = topic
- Can choose next step
- Doesn't feel lost

### Stage 4: First Building

**Action:** Clicks a building

**User sees:**
- Cutaway view
- Floors stacked vertically
- Content visible for current floor
- Neil and Leela present

**User thinks:**
- "Ah, floors are sections"
- "I can scroll through this"
- "These characters are charming"

**Success criteria:**
- Starts reading content
- Understands scroll = progress
- Characters add warmth without distraction

### Stage 5: Content Consumption

**Action:** Scrolls through floors, reads content

**User experiences:**
- Normal reading flow
- Floor transitions (visual feedback)
- Character state changes (subtle)
- Quality content

**Success criteria:**
- Actually reads content
- Wants to continue
- May explore related floors

### Stage 6: Exploration Loop

**Action:** Navigates to another building/district

**User behavior:**
- Uses breadcrumbs or back navigation
- Tries another district
- Returns to city view
- May bookmark interesting content

**Success criteria:**
- Comfortable navigating
- Explores multiple areas
- Returns later

---

## Returning Visitor Shortcuts

### Direct Content Access

**Scenario:** User bookmarked `/ai/agent-orchard/guardrails`

**Expectation:**
- Opens directly to that floor
- Minimal loading time
- Context visible (which building, which district)
- Easy to continue exploring

### City Memory

**For frequent visitors:**
- Remember last viewed district/building
- Offer "Continue reading" prompt
- Train could show "last stop"

### Quick Navigation

**Shortcuts for repeat users:**
- Keyboard shortcuts (`/` for search)
- Command palette for power users
- District quick-jump from any view

---

## Recruiter/Evaluator Journey

### Goal: Assess in 2-3 minutes

**Stage 1: Quick Scan (30 seconds)**
- Land on city view
- Get immediate impression: "This person builds interesting things"
- Notice: professional but creative, technical depth indicated

**Stage 2: Credibility Check (60 seconds)**
- Central Station → "Who is Neil?" content
- Quick scan of district topics
- Validates: "Yes, this matches what I'm looking for"

**Stage 3: Sample Deep-Dive (60-90 seconds)**
- Pick one relevant district (e.g., DX if hiring for DX role)
- Read 1-2 floors
- Assess: communication style, depth, practical vs. theoretical

**Stage 4: Decision**
- Bookmark for sharing
- Note contact/LinkedIn/GitHub links
- May return for deeper read

---

## Journey Pain Points to Avoid

### Confusion Points

| Problem | Mitigation |
|---------|------------|
| "Where am I?" | Always show context breadcrumb |
| "How do I go back?" | Obvious back/up navigation |
| "What is this site?" | Central Station explains clearly |
| "Is this it?" | Indicate more content exists |

### Friction Points

| Problem | Mitigation |
|---------|------------|
| Slow initial load | Skeleton + progressive loading |
| Animation blocks content | Skip animation option |
| Can't find specific topic | Search functionality |
| Mobile is confusing | Simplified mobile nav |

### Exit Points (Prevent)

| Risk | Prevention |
|------|------------|
| Bounces immediately | Compelling first impression |
| Leaves after one floor | "Related" suggestions |
| Gets lost, gives up | Clear wayfinding |
| Content isn't relevant | Good information scent |

---

## Emotional Journey Map

```
Delight    ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ●──●  ·  ·  ·  ●
           ·  ·  ·  ·  ·  ·  ●  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·
           ·  ·  ·  ·  ●──●  ·  ·  ●  ·  ·  ·  ·  ·  ·  ·  ·
Neutral    ·  ·  ●──●  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ●  ·  ·
           ●──●  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·
Confused   ─────────────────────────────────────────────────
           Land  Orient  District  Building  Content  Explore
```

### Delight Peaks
- First city view reveal
- Discovering character animations
- Finding relevant, quality content
- "Aha" moment in content
- Sharing with others

### Risk Valleys
- Initial load (if slow)
- First navigation (if unclear)
- Transitioning between views (if jarring)

---

## Journey Metrics

### Engagement Signals

| Metric | Good Sign | Concern |
|--------|-----------|---------|
| Time on first view | > 10 seconds | < 3 seconds |
| Districts visited | ≥ 2 | 0 (bounce) |
| Floors read | ≥ 3 | 0-1 |
| Return visits | Any | None in 30 days |
| Scroll depth | > 50% | < 20% |

### Navigation Health

| Metric | Target |
|--------|--------|
| Back button usage | Normal (not excessive) |
| 404 errors | Near zero |
| Search usage | Available, not mandatory |
| Mobile completion | Comparable to desktop |

---

## Entry Points Analysis

### Expected Traffic Sources

| Source | Entry Point | Journey Type |
|--------|-------------|--------------|
| Social share | Deep link to floor | Direct to content |
| Search (name) | Home | Full exploration |
| Search (topic) | Specific building/floor | Topic-focused |
| Direct | Home | Returning or intentional |
| Referral | Varies | Discovery mode |

### Entry Point Optimization

**Home page (`/`):**
- Optimize for wonder and orientation
- Clear "start here" signal
- Fast initial paint

**Deep links:**
- Context provided (breadcrumbs)
- Related content visible
- Easy to explore more

---

## File Changed
- Created: `docs/neils-city-site-v1/user-journeys.md`

