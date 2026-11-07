# Design System — Sagar Deshpande Portfolio

Warm humanist take on the Power Platform tools: the site is styled as a Power Apps
studio (home + Canvas), a Power Automate run (Flow), a Power BI report (number cards)
and a Copilot Studio test pane (chat). Cream paper and ink, one earthy accent per tool,
serif display type, no glass, no gradients.

- **Source of truth:** the `:root { … }` (light) and `[data-theme="dark"] { … }` blocks
  at the top of [`css/app.css`](css/app.css). Change a value in **both** blocks.
- **Files:** `css/app.css` = tokens, base, header, sidebar, hero, studio, BI cards.
  `css/sections.css` = everything below the hero, modal, consent, toast.
  `css/extras.css` = facts strip, hiring report, flow extras (action labels, Apply to each loop, email step), DLP cookie banner.
  `js/motion.js` = hero build, count-ups, flow run, card tilt.
  `js/report.js` = hiring decision report: role slicer (the five CV tracks), requirement rows with drillthrough to projects, EN/DE text. Rows are strengths only and every row must point to a real project (`data-modal`) or section.
- No build step. After editing CSS/JS, bump the `?v=…` query on its tag in `index.html`.

---

## 1. Colors

### Paper + ink
| Token | Light | Dark | Used for |
|---|---|---|---|
| `--bg-primary` | `#F5EFE4` | `#1B1714` | Page background (cream / espresso) |
| `--bg-secondary` | `#EDE5D6` | `#221D19` | Sidebar |
| `--surface` | `#FBF8F1` | `#27211C` | Cards, panels |
| `--surface-2` | `#F1EADD` | `#2F2822` | Card headers, title bars |
| `--text-primary` | `#2A231E` | `#F0E8DC` | Headings, body ink |
| `--text-secondary` | `#5E5248` | `#C4B7A6` | Body copy |
| `--text-muted` | `#8A7D70` | `#8F8272` | Captions, mono labels |
| `--line` / `--line-strong` | `#E2D8C7` / `#CDBFA9` | `#3A322B` / `#4D4238` | Hairlines, borders |

### One accent per tool
| Token | Light | Dark | Tool |
|---|---|---|---|
| `--accent-apps` | `#8E3B5F` plum | `#D88AA9` | Power Apps (also Power Fx keywords) |
| `--accent-automate` | `#1F6A73` teal | `#6FB6BE` | Power Automate |
| `--accent-bi` / `--accent-bi-text` | `#B7832A` / `#8C6216` ochre | `#E0B062` | Power BI |
| `--accent-copilot` | `#C2532D` rust | `#E9825A` | Copilot, **primary CTA**, italic emphasis |
| `--success` | `#4D7A3A` | `#8DB872` | "Succeeded", available, checks |

Components pick a tool colour with `data-tone="apps|automate|bi|copilot|success"`, which
sets `--tone` (see `sections.css`). Older token names (`--card-bg`, `--btn-primary-bg`, …)
still exist and map onto these.

### Elevation
`--shadow-1` (resting) · `--shadow-2` (hover) · `--shadow-3` (lifted / modal). Warm brown
shadows in light mode, black in dark.

---

## 2. Typography
- **Display:** `Instrument Serif` (+ italic) — headings, numbers, quotes. Italic + rust =
  emphasis (`<em>`).
- **Body/UI:** `Figtree` 400–700.
- **Mono:** `JetBrains Mono` — Power Fx, labels, tags, kickers.
- Loaded from Google Fonts in `index.html`. Tokens: `--font-display`, `--font-sans`,
  `--font-mono`.
- Section titles use `.display` (`clamp(48px, 7vw, 96px)`); hero `.hero-title` up to 108px.

## 3. Shape + texture
- Radius: cards 14–20px, controls 9–12px, chips/pills 999px.
- Paper grain: SVG noise on `body::before` (`--grain-opacity`).
- Canvas dot grid (`--canvas-dot`) on the studio canvas, chat, project card headers.

## 4. Motion
Easing tokens: `--ease-out` `cubic-bezier(.2,.7,.2,1)`, `--ease-spring`
`cubic-bezier(.34,1.4,.5,1)`. Everything has a `prefers-reduced-motion` fallback that
shows the final state.

| Moment | Where | How |
|---|---|---|
| Hero name rises in | `.hero-title .line` | CSS keyframe |
| Profile card builds itself | `#studio`, `js/motion.js` | Controls selected one by one, Power Fx typed into the formula bar, toggle flips, "App published". "Preview" replays. |
| BI cards count up + draw | `.bi-card` | IntersectionObserver → `.seen`, numbers from `data-count` |
| Scroll reveal | `.reveal` → `.vis` | `js/main.js` |
| Gallery filter | `filterP()` in `js/main.js` | FLIP animation, `CountRows: n` label |
| Card tilt | `.pcard` | pointer-driven 3D tilt (fine pointers only) |
| Flow test run | `#flow-run .step` | Each step: pending → running spinner → green check + duration (`data-dur`). Header flips Running → Succeeded at the end. |
| Copilot streaming | `addMsg()` in `js/main.js` | Word-by-word stream, follow-up chips, contact answer as an Adaptive Card |

## 4a. Page order (a story, not a brochure)
Home (hero, facts strip, About) → Flow (career) → Canvas (work) → Proof (certs, languages, testimonials) → Report (decision) → Copilot (questions) → Footer.
The report comes after the evidence on purpose: its rows drill through to projects the reader has already seen.

## 4b. Power Platform metaphors (keep them honest)
| Tool | Where | What it does |
|---|---|---|
| Power Apps | Hero studio, Canvas gallery | builds the profile card, Filter() gallery |
| Power Automate | Flow | one action per job: Trigger, Initialize variable, Condition, Scope, Switch, Apply to each + Post adaptive card, Send an email (V2) |
| Power BI | Hiring decision report | role slicer, coverage table, drillthrough, recommended action |
| Governance | Cookie banner + Copilot answer | GA consent styled as a DLP connector choice (equal-weight buttons); governance details live in the chat answer |

## 5. Breakpoints
| Width | Change |
|---|---|
| `≤1180px` | Formula toggle label hidden, BI cards 2-up, Dataverse view drops Stack column, testimonials 2-up |
| `≤1040px` | Hero stacks |
| `≤980px` | Doorways + About + Switch cases stack, chat prompts become a horizontal scroller |
| `≤900px` | Header search hidden |
| `≤767px` | Sidebar off-canvas (hamburger), single-column certs/quotes, try/catch stacks |
| `≤560px` / `≤480px` | Tighter header + section padding |

## 6. Conventions
- **Language (EN/DE):** `DE_TEXT` in `js/lang.js` is keyed by the exact English text of
  each text node (whitespace collapsed). A `<strong>`, `<em>` or `<br>` splits a node.
  For headings or paragraphs with inline markup, put the full German HTML in a
  `data-de="…"` attribute on the element instead — lang.js swaps `innerHTML`.
  Runtime strings (toasts, chat, flow states) go through `t()` / `translate()`.
- **Project modal copy:** `PM` in `js/main.js`, German in `PROJECTS_DE` (same index as
  `data-modal="N"`).
- **Chat answers:** `RESP` in `js/main.js`, German `RESP_DE` in `js/lang.js`. No emoji —
  `addMsg` strips them.
- **Icons:** Material Symbols, subset via `icon_names=` in `index.html` (alphabetical).
  Add new names there or they render as text.
- **Numbers:** every figure on the page comes from the CV. Don't add stats that aren't.
- **Testimonials:** verbatim LinkedIn quotes — don't edit.
- **Cookie consent:** GA loads only from `js/consent.js` after Accept.
- Never hard-code colours in markup; use tokens or `data-tone`.

## 7. Assets
| Asset | Path |
|---|---|
| Avatar / favicon | `images/avatar/sagar.png` |
| Logos | `images/logos/adastra.png`, `tsystems.svg`, `concentrix.png` |
| Resume | `Sagar-Deshpande-Resume.pdf` |
