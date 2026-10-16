# BaobabAI — Landing Page Design Specification

> **Brand essence:** Deep roots. Global impact.  
> AI Agents & Automations — helping businesses operate smarter and grow faster.

---

## Color Tokens

| Token | Hex | Usage |
|---|---|---|
| Forest (Primary) | `#083D2E` | Hero BG, dark sections, step circles |
| Ink (Dark) | `#0F172A` | Body text, nav links, dark borders |
| Gold (Accent) | `#D4A017` | CTA buttons, accent text, step 2 circle |
| Mist (Light BG) | `#F2F4F7` | Alternate light sections |
| White | `#FFFFFF` | Cards, light section BG |

### CSS Custom Properties

```css
:root {
  --color-brand-forest: #083D2E;
  --color-brand-ink:    #0F172A;
  --color-brand-gold:   #D4A017;
  --color-brand-mist:   #F2F4F7;
  --font-brand:         'Sora', 'Inter', system-ui, sans-serif;
  --radius-btn:         6px;
  --radius-card:        8px;
}
```

### Color Usage Rules

- **Hero / dark section BG** → `#083D2E`, full-width
- **Primary CTA button** → `#D4A017` fill, `#0F172A` text, no border-radius > 6px
- **Secondary CTA button** → white fill, `#0F172A` text, 1px `#0F172A` border
- **Accent / emphasis text** → `#D4A017` inline (e.g. "Real" in headline, "execution")
- **Dark section BG** → `#083D2E` ("What We Deliver" strip, CTA banner)
- **Light section BG** → `#FFFFFF` or `#F2F4F7` alternating
- **Nav bar** → white bg, `#0F172A` links, gold CTA button
- **Step circles** → `#083D2E` fill + white number (steps 1 & 3), `#D4A017` fill + `#0F172A` number (step 2)

---

## Typography

### Font Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap" rel="stylesheet">
```

### Font Stack

```css
font-family: 'Sora', 'Inter', system-ui, sans-serif;
```

### Type Scale

```css
/* Hero headline */
font-size: clamp(2.5rem, 5vw, 3.5rem);
font-weight: 700;

/* Section H2 */
font-size: clamp(1.5rem, 3vw, 2rem);
font-weight: 700;

/* Card title H3 */
font-size: 1.125rem;
font-weight: 600;

/* Body */
font-size: 1rem;
font-weight: 400;
line-height: 1.7;

/* Small / descriptor */
font-size: 0.875rem;
font-weight: 400;

/* Section label (eyebrow) */
font-size: 0.75rem;
font-weight: 600;
letter-spacing: 0.08em;
text-transform: uppercase;
color: #083D2E; /* or muted on dark BG */
```

---

## Spacing & Layout

| Property | Value |
|---|---|
| Max content width | `1200px`, centered |
| Horizontal gutters | `24px` mobile, `48px` desktop |
| Section padding | `80px` top/bottom desktop · `48px` mobile |
| Card gap | `24px` |
| Icon size (feature cards) | `40–48px`, stroke `1.5px` |
| Border radius — buttons | `6px` |
| Border radius — cards | `8px` |
| Border radius — pill badges | `999px` |
| Step connector arrow | SVG `→`, `#0F172A`, `1.5px` stroke |

---

## Components

### Primary Button

```css
background-color: #D4A017;
color: #0F172A;
font-family: 'Sora', sans-serif;
font-weight: 600;
font-size: 1rem;
padding: 12px 24px;
border: none;
border-radius: 6px;
cursor: pointer;
transition: filter 0.2s;
}
button:hover {
  filter: brightness(1.1);
}
```

### Secondary Button

```css
background-color: transparent;
color: #0F172A;
font-family: 'Sora', sans-serif;
font-weight: 600;
font-size: 1rem;
padding: 12px 24px;
border: 1.5px solid #0F172A;
border-radius: 6px;
cursor: pointer;
}
button:hover {
  background-color: #F2F4F7;
}
```

### Feature Icon Card (on dark section)

```css
background: rgba(255, 255, 255, 0.08);
border: 1px solid rgba(255, 255, 255, 0.12);
border-radius: 8px;
padding: 24px 20px;
text-align: center;

/* Icon */
width: 40px;
height: 40px;
color: #FFFFFF;

/* Title */
color: #FFFFFF;
font-weight: 600;

/* Body text */
color: rgba(255, 255, 255, 0.7);
font-size: 0.875rem;
```

### Process Step Circle

```css
/* Steps 1 & 3 */
width: 48px;
height: 48px;
border-radius: 50%;
background-color: #083D2E;
color: #FFFFFF;
font-size: 1.25rem;
font-weight: 700;
display: flex;
align-items: center;
justify-content: center;

/* Step 2 — override */
background-color: #D4A017;
color: #0F172A;
```

### Metric Stat

```css
/* Number */
font-size: clamp(1.75rem, 3vw, 2.25rem);
font-weight: 700;
color: #0F172A;

/* Descriptor */
font-size: 0.875rem;
font-weight: 400;
color: #6B7280;
margin-top: 4px;
```

---

## Headline Copy Patterns

Wrap accent words in a gold `<span>`:

```html
<!-- Hero H1 -->
<h1>
  AI Agents.<br>
  <span style="color: #D4A017;">Real</span> Operations.
</h1>

<!-- Challenge H2 -->
<h2>
  Most companies aren't lacking tools.<br>
  They're lacking <span style="color: #D4A017;">execution.</span>
</h2>

<!-- Section eyebrow label -->
<p class="eyebrow">THE CHALLENGE</p>
<h2>...</h2>
```

---

## Page Section Order

| # | Section | BG color | Notes |
|---|---|---|---|
| 1 | **Nav** | `#FFFFFF` | Logo left · links center · gold CTA right |
| 2 | **Hero** | `#083D2E` | Globe image right · headline + 2 CTAs left |
| 3 | **Challenge** | `#FFFFFF` | Left copy · right 2×2 icon grid of pain points |
| 4 | **How It Works** | `#FFFFFF` | 3 numbered steps: Discover → Build → Deploy |
| 5 | **What We Deliver** | `#083D2E` | 5 icon cards in a row · white text |
| 6 | **Metrics Bar** | `#F2F4F7` | 4 stats: 30–70% / Lower / Faster / Increased |
| 7 | **CTA Banner** | `#083D2E` | Centered text + gold "Book a Demo" button |

---

## How It Works — Step Content

| Step | Circle | Title | Description |
|---|---|---|---|
| 1 | Forest `#083D2E` | Discover | We identify high-impact automation opportunities within your operations. |
| 2 | Gold `#D4A017` | Build | We design AI agents and automative systems tailored to your workflows. |
| 3 | Forest `#083D2E` | Deploy | We integrate, test, and scale—ensuring measurable impact from day one. |

---

## What We Deliver — Icon Cards

| Icon | Title | Description |
|---|---|---|
| 🤖 | AI Agents | Intelligent agents that think, decide, and act on your behalf. |
| 🔀 | Workflow Automation | End-to-end automation of repetitive and complex processes. |
| 💬 | Communication Automation | Automate interactions across WhatsApp, email, SMS and more. |
| 💳 | Payment Integrations | Seamless integration with MOMO, Orange Money, APIs and more. |
| 📊 | Real-time Insights | Dashboards and reports that help you make better decisions, faster. |

---

## Metrics Bar — Stats

| Stat | Label |
|---|---|
| 30–70% | Time Saved |
| Lower | Operational Costs |
| Faster | Execution |
| Increased | Revenue Efficiency |

---

## CLI Prompt Template

Copy-paste this when sharing your code with Claude CLI:

```
Adapt my landing page to match the BaobabAI brand identity:

COLORS:
- Primary BG (dark sections): #083D2E
- Text / dark: #0F172A
- Accent / CTA: #D4A017
- Light BG: #F2F4F7
- Cards: #FFFFFF

FONT: Sora (Google Fonts), weights 400/600/700. Add the <link> import in <head>.

BUTTONS:
- Primary: bg #D4A017, text #0F172A, border-radius 6px, font-weight 600
- Secondary: transparent bg, border 1.5px solid #0F172A, same radius

SECTIONS (in order):
Nav → Hero (dark green) → Challenge → How It Works (3 steps) →
What We Deliver (dark green) → Metrics bar → CTA banner (dark green)

HEADLINE PATTERN:
Wrap accent words in <span style="color:#D4A017">
e.g. "Real Operations." and "execution."

STEP CIRCLES:
48px diameter, bg #083D2E for steps 1 & 3, bg #D4A017 for step 2.

DARK SECTION CARDS:
bg rgba(255,255,255,0.08), border 1px rgba(255,255,255,0.12), border-radius 8px.
```

---

*Spec extracted from BaobabAI brand identity sheet — logo, website mockup, and pitch deck.*