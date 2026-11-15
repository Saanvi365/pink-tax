# Pink Tax

An interactive data visualization of the "pink tax" - how much more the women's version of a product costs than the near-identical men's version. Open `index.html` in a browser; no build step, no dependencies.

Live demo: https://saanvi365.github.io/pink-tax/ (once GitHub Pages is enabled on this repo)

## What it does

- **Category explorer** - personal care, adult clothing, kids' toys & gear, kids' clothing, senior & home health. Each category shows paired animated bars (men's vs women's price) with the premium called out per product.
- **Annual cost calculator** - check the products you buy, set how often, and see what the gap costs per year and per decade.

## The data (read this)

- The category premium percentages (13% personal care, 8% adult clothing, 7% kids' toys, 4% kids' clothing, 8% senior/home health) come from the NYC Department of Consumer Affairs study **"From Cradle to Cane: The Cost of Being a Female Consumer" (2015)**, which compared 794 gendered products across 24 NYC retailers and found women's versions cost more 42% of the time, vs 18% for men's.
- The specific product prices in `data.js` are **illustrative example pairs** chosen to sit near those category averages. They are not quotes from specific stores. The point of the app is to make the study's pattern tangible, not to accuse any particular retailer.

## Layout

- `index.html` / `styles.css` / `app.js` - the site (vanilla JS, works offline)
- `data.js` - the product-pair dataset with its sourcing note
- `calc.js` - the pure calculation core (premium %, annual gap, cart totals), shared by the browser and the tests
- `tests/calc.test.js` - node tests for the math and dataset integrity

## Tests

```bash
node tests/calc.test.js
```

Covers the premium math, edge cases (negative premium, zero price), cart totals, decade projection, and two dataset invariants: every example pair shows a real premium, and each category's example average stays within 6 points of the DCA study figure it illustrates.
