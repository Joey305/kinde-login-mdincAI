# Setup guide

## Kinde app settings

For `mindfuldiabetes.ai`, your Kinde application should include:

```txt
Application homepage URI:
https://mindfuldiabetes.ai

Application login URI:
https://mindfuldiabetes.ai/login

Allowed callback URLs:
http://localhost:3000/api/auth/kinde_callback
https://mindfuldiabetes.ai/api/auth/kinde_callback

Allowed logout redirect URLs:
http://localhost:3000
https://mindfuldiabetes.ai
```

## Page content copy

In Kinde, update **Design → Page content → Sign up page**.

Recommended marketing consent label:

> Send me Mindful Diabetes AI educational updates, Alzheimer’s research explainers, product news, and community resources. I can unsubscribe at any time.

## Custom UI connection

Kinde custom UI code expects this repo shape:

```txt
kindeSrc/environment/pages/(kinde)/(default)/page.tsx
```

This repo also provides `(login)`, `(register)`, and `(error)` route templates.

## Design notes

- Light mode: clean health education design.
- Dark mode: premium LVQ Labs AI product feel.
- Embedded logos are intentionally optimized and base64 encoded in `brand-assets.ts` so Kinde does not need external asset hosting.
