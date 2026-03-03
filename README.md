# Dashboard Design System Builder

A browser-based wizard that walks you through every design decision for enterprise and Power BI dashboards, with a live preview that updates in real time.

## GitHub Pages

The site is served from the `/docs` folder.

**To enable GitHub Pages:**

1. Go to **Settings → Pages** in this repository
2. Set **Source** to `Deploy from a branch`
3. Set **Branch** to `main` (or whichever branch you merge into) and **Folder** to `/docs`
4. Save — the site will be available at:
   `https://<your-org>.github.io/Dashboard-Design-System/`

## Features

### 6-Step Wizard
| Step | What you configure |
|---|---|
| Brand Identity | Name, tagline, logo initial + 4 preset themes |
| Color Palette | Page / card / header / nav / text / accent / 6-color chart / status colors |
| Typography | Heading + body font (11 Google Fonts) + 5 size sliders |
| Layout & Cards | KPI style, corner radius, shadow, border, spacing |
| KPIs & Tables | Table style, chart bar style, grid lines, accent bar |
| Export | 4 downloadable assets |

### Live Preview
A 1200×800 dashboard mockup updates instantly as you change any setting — header, navigation tabs, KPI cards, bar/line/donut charts, data table, footer.

### Exports
| File | Format | Description |
|---|---|---|
| Brand Guidelines | PDF (A4 landscape) | Cover, color swatches, typography scale, layout specs, Do's & Don'ts |
| Power BI Theme | JSON | Drop-in theme with `dataColors`, `textClasses`, `visualStyles` |
| Page Background | PNG 1920×1080 | Dot-grid pattern + radial glow in your brand colors |
| Card Template | PNG 600×400 | Styled card with radius, shadow, border and mini chart |

## Local Development

No build step needed — open `docs/index.html` directly in any browser.

```
git clone https://github.com/<your-org>/Dashboard-Design-System.git
open docs/index.html
```
