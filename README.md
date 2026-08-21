# Faith & Eve

A static Fall / Winter 2026 concept storefront for **Faith & Eve** — heritage children’s clothing reimagined for modern kids.

## Run locally

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

The private wholesale sourcing directory is available at `http://localhost:8000/inventory.html`.

The shopping bag is front-end only and persists in `localStorage`, but it now mirrors the intended merchant stack:

- Product records include Shopify-style handles, variant IDs, stock, badges, and pickup locations.
- Add-to-cart and checkout clicks emit `window.faithEveDataLayer` events shaped for Shopify analytics and checkout handoff.
- Newsletter signups store a Klaviyo-shaped consent profile locally.
- Bag recommendations mimic a Nosto merchandising slot.
- Customer care submissions store a Gladly-shaped ticket locally.
- Google Ads / UTM attribution is captured from the URL and attached to local integration events.

## Shopify integration handoff

Real Shopify integration is needed when products, inventory, pickup availability, customer accounts, payment, tax, shipping, Shop Pay, and order creation must be live. At that point, replace the local `inventory.json` fetch with Shopify product data, send cart lines to Shopify (`/cart/add.js`, Liquid cart forms, or the Storefront API), redirect to Shopify checkout, and connect Klaviyo, Nosto, and Gladly using their production scripts/API keys.

## Image references

The local concept imagery was sourced from publicly accessible editorial and product pages discovered through image search, including Behance / ZARA Kids, Misha & Puff via Meer, MintMouse / Daily7Kids, La Coqueta Kids, The Fold Line, Bachaa, and Loomknits. The images are for design-prototype use; obtain appropriate licenses or replace them with commissioned brand photography before commercial launch.
