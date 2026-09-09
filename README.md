# Kaelō Atelier

Premium fashion e-commerce frontend for Uganda, built with React, Vite, Tailwind CSS and React Router. Mock JSON data only; no backend required.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Routes

Customer: `/`, `/products`, `/product/:id`, `/cart`, `/checkout`, `/wishlist`, `/account`, `/order-confirmation`

Admin: `/admin`, `/admin/inventory`, `/admin/returns`

## Notes
- Cart and wishlist persist in `localStorage`.
- Coupon `WELCOME10` applies 10% off.
- Free shipping unlocks at UGX 200,000 after discount.
- MTN MoMo, Airtel Money and Card are mock payment flows.
- Product imagery includes crops derived from the supplied design references.
