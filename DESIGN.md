# Design System — Sagar Deshpande Portfolio

A single reference for the site's design tokens and conventions. **Almost everything
visual is driven by CSS custom properties (variables) defined once at the top of
[`css/style.css`](css/style.css).** Change a value there and it updates everywhere.

- **Source of truth:** the `:root { … }` block (light theme) and the
  `[data-theme="dark"] { … }` block (dark theme) at the top of `css/style.css`.
- **Golden rule:** when you change a color, change it in **both** blocks so light and
  dark stay in sync.
- No build step — edit the file, refresh the browser. After editing CSS or JS, bump the
  `?v=…` query on the matching `<link>`/`<script>` tag in `index.html` so visitors get
  the new version instead of a cached one.

---

## 1. Colors

All colors are CSS variables. The table lists the **light** value (`:root`) and the
**dark** value (`[data-theme="dark"]`). Edit them in `css/style.css`.

### Surfaces & text
| Variable | Light | Dark | Controls |
|---|---|---|---|
| `--bg-primary` | `#FFFFFF` | `#131313` | Page background |
| `--bg-secondary` | `#EAEAEA` | `#1c1b1b` | Sidebar / secondary panels |
| `--bg-card` | `rgba(255,255,255,.85)` | `rgba(34,34,34,.6)` | Card fill |
| `--bg-glass` | `rgba(234,234,234,.7)` | `rgba(34,34,34,.6)` | Glass/blur panels |
| `--border-color` | `rgba(116,39,116,.15)` | `rgba(255,255,255,.08)` | Standard borders |
| `--border-subtle` | `rgba(25,25,25,.08)` | `rgba(80,67,77,.4)` | Hairline dividers |
| `--text-primary` | `#191919` | `#e5e2e1` | Headings / primary text |
| `--text-secondary` | `#4a4a4a` | `#d4c1ce` | Body / secondary text |
| `--text-muted` | `#717171` | `rgba(212,193,206,.5)` | Captions / muted text |

### Accents (the four "Power Platform pillar" colors)
| Variable | Light | Dark | Controls |
|---|---|---|---|
| `--accent-apps` | `#742774` | `#ffaaf7` | Power Apps / primary purple accent |
| `--accent-automate` | `#0066FF` | `#a3c9ff` | Power Automate / blue accent |
| `--accent-bi` | `#D4A900` | `#bfce77` | Power BI / gold-green accent |
| `--accent-copilot` | `#0B556A` | `#50E6FF` | Copilot / teal accent |
| `--grad-text-start` → `--grad-text-end` | `#742774`→`#0066FF` | `#ffaaf7`→`#a3c9ff` | Gradient hero text (`.grad-text`) |

### Buttons
| Variable | Light | Dark | Controls |
|---|---|---|---|
| `--btn-primary-bg` | `linear-gradient(135deg,#742774,#9a3a9a)` | same | Primary button fill (`.btn-p`) |
| `--btn-primary-text` | `#ffffff` | `#ffd6f7` | Primary button text |
| `--btn-secondary-bg` | `transparent` | `transparent` | Secondary button fill (`.btn-g`) |
| `--btn-secondary-border` | `rgba(116,39,116,.35)` | `rgba(255,255,255,.18)` | Secondary button border |
| `--btn-secondary-text` | `#742774` | `#e5e2e1` | Secondary button text |

### Chrome (nav, sidebar, skill tags, formula bar, scrollbar, orbs)
Key ones — see `css/style.css` for the full list: `--nav-bg`, `--nav-border`,
`--sidebar-bg`, `--sidebar-active-text`, `--card-bg`, `--card-border`,
`--card-hover-shadow`, `--skill-tag-bg/-border/-text`, `--formula-bar-bg/-border/-text`,
`--scrollbar-thumb/-track`, `--orb-1/-2/-3`, `--available-text/-dot`, `--glass-shadow`,
`--pulse-primary/-secondary`.

### Company brand colors (logo chips)
| Variable | Light | Dark | Used by |
|---|---|---|---|
| `--adastra-primary` | `#f9423a` | `#ff6b5b` | `.cl-adastra` logo-chip background |
| `--tsystems-primary` | `#E20074` | `#ff66cc` | `.cl-tsystems` logo-chip background |
| `--concentrix-primary` | `#003D5B` | `#4da6d6` | Concentrix accent (icon shown directly) |

---

## 2. Theming

- The active theme is stored in `localStorage` under `portfolio-theme` and applied as
  `<html data-theme="light|dark">`.
- It's set in three places: an inline script in **`index.html`** (line ~24) that applies
  the saved/OS preference before paint (prevents flash); **`js/theme.js`**; and the
  **"ƒx Set( varTheme, … )" formula-bar toggle** in the header, which flips the theme.
- **To change a color:** edit its variable in **both** `:root` and `[data-theme="dark"]`.
- **To add a token:** add it to both blocks, then reference it as `var(--my-token)`.

---

## 3. Typography

- **Sans (UI/body):** `Inter` — weights 300, 400, 500, 600, 700.
- **Mono (code/Power Fx accents):** `Space Grotesk` — weights 400, 500, 600.
- Both load from Google Fonts in `index.html` `<head>`.
- **Fluid headings:** the hero `<h1>` uses `font-size: clamp(32px, 5vw, 52px)` (class
  `.u-0043`) so it scales smoothly between phone and desktop — never set a fixed `px`
  font-size inline on it or you'll override the responsive scaling.
- Section headings ≈ 32px; card titles ≈ 20px; body ≈ 14–15px; captions ≈ 9–12px.

---

## 4. Spacing, radius, shadow, glass

- **Spacing:** common gaps/padding are 6 / 8 / 10 / 14 / 16 / 20 / 24 / 32 px.
- **Radius:** chips/pills `9999px`; cards `14–20px`; logo chips `10px` (small `8px`);
  small controls `6–8px`.
- **Glass effect:** `.glass`, `.pcard`, `.stats-card` use `var(--card-bg)`,
  `var(--card-border)` and `var(--glass-shadow)` for the frosted look.
- **Hover lift:** cards translate up a few px with `var(--card-hover-shadow)`.

---

## 5. Breakpoints (responsive)

Min-width 768px = "desktop" (fixed sidebar visible). Everything else is max-width.

| Breakpoint | What it governs |
|---|---|
| `≤480px` | Hide "Connect" button + wordmark crowding; tighter section padding (16px) |
| `≤640px` | Hide header wordmark; Flow "Try/Catch" stacks to 1 column |
| `≤767px` | Mobile: sidebar slides off-canvas (hamburger), search hidden, testimonials & two/three-column grids collapse to 1, chat sidebar hidden |
| `≥768px` | Sidebar fixed & always visible; main content offset by 260px |
| `≤900px` | Hero stacks (stats-card full width); project grid → 2 columns; Switch roles → 1 column |
| `≤980px` | Formula-bar label hidden; testimonials → 2 columns |
| `≤1300px` | Project grid → 3 columns (4 columns only above this) |

The project grid tiers live together in one ordered block near `.u-0153` in
`css/style.css` (4 → 3 → 2 → 1 columns). Mobile heights use `100dvh` (with a `100vh`
fallback) to avoid mobile address-bar jump.

---

## 6. Components & conventions

- **`u-####` utility classes** (e.g. `.u-0043`, `.u-0153`): machine-generated, one class
  per unique style bundle. Treat each as "the styles for this element." To restyle an
  element, find its `u-####` class in `css/style.css`. (Some elements still use inline
  `style="…"` — those override the stylesheet.)
- **Scroll reveal:** elements with class `.reveal` start hidden and fade/slide in when
  scrolled into view (the `.vis` class is added by an IntersectionObserver in
  `js/main.js`). Stagger helpers: `.d1`–`.d4` add delay.
- **Logo chips:** `.company-logo-wrapper` + a company modifier
  (`.cl-adastra` / `.cl-tsystems` / `.cl-concentrix`) holding an `<img.company-logo>`.
  White logos sit on a brand-colored chip; Concentrix's self-contained icon sits on a
  transparent chip. `.company-logo-sm` is the smaller Flow-timeline variant.
- **Project modal:** `#proj-modal`; content is generated in `js/main.js` from the `PM`
  array (edit project copy there). The German modal copy lives in the `PROJECTS_DE` array
  in `js/lang.js` and is indexed by the same `data-modal="N"` value — keep the two arrays
  the same length and order, or German modals will show the wrong project.
- **Chatbot answers:** canned responses live in the `RESP` map in `js/main.js`.
- **Language (EN/DE):** translations in `js/lang.js`, toggled by the header `EN`/`DE`
  buttons.

---

## 7. Assets

| Asset | Path | Notes |
|---|---|---|
| Avatar / favicon | `images/avatar/sagar.png` | 256×256, optimized (~32KB). Displayed ≤96px. |
| Adastra logo | `images/logos/adastra.png` | White art → shown on red `.cl-adastra` chip |
| T-Systems logo | `images/logos/tsystems.svg` | White vector → shown on magenta `.cl-tsystems` chip |
| Concentrix logo | `images/logos/concentrix.png` | Self-contained color icon (~2KB, 128px) |
| Resume | `Sagar-Deshpande-Resume.pdf` | Linked from the "Download CV" button (`js/main.js`) |

Keep asset filenames stable when replacing — the HTML/JS reference them by path. Export
new logos as transparent PNG/SVG (white art works best on the brand-colored chips) and
keep images small (avatar ≤256px, logos ≤128px).

---

## 8. "How do I change …?" cookbook

| I want to… | Do this |
|---|---|
| Change the main purple accent | Edit `--accent-apps` in **both** `:root` and `[data-theme="dark"]` in `css/style.css` |
| Change the hero gradient | Edit `--grad-text-start` / `--grad-text-end` (both themes) |
| Recolor a company logo chip | Edit `--adastra-primary` / `--tsystems-primary` (both themes) |
| Adjust where the layout switches to mobile | Edit the `@media` breakpoints in `css/style.css` (see §5) |
| Change the page font | Update the Google Fonts `<link>` in `index.html` and the `font-family` on `body` |
| Edit a project's details | Edit the `PM` array in `js/main.js` (and the matching index in `PROJECTS_DE` in `js/lang.js` for German) |
| Edit chatbot answers | Edit the `RESP` map in `js/main.js` |
| Add/adjust a German translation | Edit `js/lang.js` |
| Swap the avatar or a logo | Replace the file in `images/…` keeping the same filename and small size |
