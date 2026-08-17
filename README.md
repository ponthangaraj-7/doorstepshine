# Doorstep Shine — Website

Premium, responsive, single-page website for **Doorstep Shine**, a doorstep car & bike foam-wash service in Thiruverumbur & Trichy, Tamil Nadu.

Pure **HTML + CSS + vanilla JavaScript** — no build step, no framework, no backend. Open `index.html` and it works.

## Files

```
doorstep-shine/
├── index.html      → all page content & structure
├── style.css        → design system (colors, type, layout, animations)
├── script.js         → all interactivity + WhatsApp/call config
├── images/            → drop real vehicle/hero photos here (optional)
└── README.md
```

## Before you launch — 5 things to update

| # | What | Where |
|---|------|-------|
| 1 | **WhatsApp number** | `script.js` → `const WHATSAPP_NUMBER = "91XXXXXXXXXX";` (digits only, country code, no `+`) |
| 2 | **Phone number** | `script.js` → `const PHONE_NUMBER = "+91XXXXXXXXXX";` |
| 3 | **Vehicle / hero images** | `index.html` has inline SVG placeholders for the hero scene and vehicle showcase cards (search for `REPLACE 3`). Swap them for real photos by adding an `<img src="images/your-file.jpg" alt="...">` in their place, or add photos to `images/` and reference them. |
| 4 | **Instagram link** | `index.html` → footer, search for `REPLACE 4` |
| 5 | **Facebook link** | `index.html` → footer, search for `REPLACE 5` |

All WhatsApp and Call buttons across the whole site (hero, service cards, service area, booking form, final CTA, footer) automatically use the two values from step 1–2 — you only need to change them once.

## Run it locally

Just double-click `index.html`, or serve it with any static server, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `doorstep-shine`).
2. From inside this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — Doorstep Shine website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/doorstep-shine.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from branch → `main` / root**.
4. Your site will be live at `https://YOUR_USERNAME.github.io/doorstep-shine/`.

## Notes

- No database, login, or backend — the booking form builds a WhatsApp message client-side and opens `wa.me` with it pre-filled.
- All animations respect `prefers-reduced-motion`.
- Fully responsive: mobile, tablet, laptop, desktop.
