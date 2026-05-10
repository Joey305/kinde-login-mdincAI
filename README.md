# Mindful Diabetes AI — Kinde Custom Auth UI

<p align="center">
  <img src="./docs/mdi-logo.png" alt="Mindful Diabetes Inc. logo" width="140" />
</p>

<h1 align="center">Mindful Diabetes AI</h1>

<p align="center">
  A custom Kinde authentication experience for <strong>Mindful Diabetes AI</strong>, powered by <strong>LVQ Labs</strong> and created in partnership with <strong>Mindful Diabetes Inc.</strong>
</p>

<p align="center">
  <a href="https://mindfuldiabetes.ai">
    <img src="https://img.shields.io/badge/Mindful%20Diabetes%20AI-mindfuldiabetes.ai-0f766e?style=for-the-badge&logo=vercel&logoColor=white" alt="Mindful Diabetes AI website" />
  </a>
  <a href="https://mindfuldiabetes.org">
    <img src="https://img.shields.io/badge/Mindful%20Diabetes%20Inc.-mindfuldiabetes.org-064e3b?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Mindful Diabetes Inc. website" />
  </a>
</p>

<p align="center">
  <a href="https://lvqlabs.com">
    <img src="https://img.shields.io/badge/Powered%20by-LVQ%20Labs-111827?style=for-the-badge&logo=react&logoColor=61dafb" alt="LVQ Labs" />
  </a>
  <a href="https://jsmcoop.com">
    <img src="https://img.shields.io/badge/Partner-JSM%20Cooperative-7c2d12?style=for-the-badge&logo=bookstack&logoColor=white" alt="JSM Cooperative" />
  </a>
</p>

---

## Overview

This repository contains the custom hosted authentication UI for **Mindful Diabetes AI**, the JEIR-powered educational assistant focused on blood sugar, insulin resistance, Type 3 diabetes research concepts, Alzheimer’s disease education, and metabolic brain health.

The goal of this repo is to replace the plain default Kinde auth experience with a branded, trustworthy, polished sign-in/sign-up interface that matches the main product at:

**https://mindfuldiabetes.ai**

This custom UI keeps Kinde as the secure authentication provider while giving the hosted login/register pages a Mindful Diabetes AI × LVQ Labs visual identity.

---

## Brand Positioning

### Product

**Mindful Diabetes AI**

### Assistant

**JEIR**

### Core Message

> Understand blood sugar. Protect the brain.

### Co-branding

- **Mindful Diabetes Inc.** — public health education, diabetes awareness, brain-health mission.
- **LVQ Labs** — AI product development, scientific web tooling, product infrastructure.
- **JSM Cooperative** — creative, publishing, and mission-aligned partner ecosystem.

---

## Connected Web Properties

| Brand / Project | URL | Role |
|---|---:|---|
| Mindful Diabetes AI | https://mindfuldiabetes.ai | Main AI product |
| Mindful Diabetes Inc. | https://mindfuldiabetes.org | Nonprofit/public health mission |
| LVQ Labs | https://lvqlabs.com | Technology and AI product partner |
| JSM Cooperative | https://jsmcoop.com | Partner ecosystem and publishing mission |

---

## What This Repo Controls

This repo controls the custom UI for Kinde-hosted pages, including:

- Sign-in page
- Sign-up page
- Default auth page fallback
- Error page
- Shared auth shell
- Custom branding and theme styling
- Light/dark mode presentation around the Kinde widget
- Email update disclosure copy

Kinde still controls the secure authentication mechanics, including:

- OAuth
- Email-code authentication
- Session handling
- Callback flow
- Account creation
- Verification
- Security-sensitive auth logic

---

## Repository Structure

```txt
kinde-login-mdincAI/
├── kinde.json
├── package.json
├── tsconfig.json
├── README.md
├── docs/
│   ├── setup.md
│   ├── mdi-logo.png
│   └── lvq-logo.png
└── kindeSrc/
    └── environment/
        └── pages/
            └── (kinde)/
                ├── shared/
                │   ├── auth-shell.tsx
                │   └── brand-assets.ts
                ├── (default)/page.tsx
                ├── (login)/page.tsx
                ├── (register)/page.tsx
                └── (error)/page.tsx
```

---

## Page Templates

### `(login)/page.tsx`

Custom sign-in page for returning users.

Suggested experience:

- “Welcome back to Mindful Diabetes AI”
- LVQ Labs co-branding
- JEIR educational positioning
- Kinde sign-in widget
- Link to create an account

### `(register)/page.tsx`

Custom sign-up page for new users.

Suggested experience:

- “Create your Mindful Diabetes AI account”
- Benefits of using JEIR
- Email updates disclosure
- Kinde sign-up widget
- Link back to sign in

### `(default)/page.tsx`

Fallback for Kinde auth routes that do not have a route-specific template.

### `(error)/page.tsx`

Branded error state if the auth flow encounters a problem.

---

## Register Page Consent

The sign-up page should not show a marketing or offers opt-in during account creation. Keep the register and login pages consistent with the educational medical-information disclaimer:

> Mindful Diabetes AI provides educational information only and is not a substitute for professional medical advice.

---

## Visual Direction

This custom UI is designed to combine:

### Mindful Diabetes Inc.

- Trust
- Health education
- Warmth
- Prevention
- Community
- Brain-health awareness

### LVQ Labs

- Premium AI product design
- Dark-mode polish
- Scientific tooling
- Glassmorphism
- Cyan/teal glow accents
- Modern technical credibility

### Design Principles

- Clear
- Calm
- Trustworthy
- Premium
- Responsive
- Accessible
- Not overly clinical
- Not generic
- Not cluttered

---

## Local Development

Install dependencies:

```bash
yarn install
```

Run checks if configured:

```bash
yarn lint
npx tsc --noEmit
```

This repo is intended to be connected to Kinde’s custom UI system, not run as a standalone production app.

---

---

## Related Main App

The main Mindful Diabetes AI application lives separately and handles:

- Next.js application shell
- JEIR assistant interface
- OpenAI chat route
- Kinde authentication routes
- Mailchimp signup webhook
- Production deployment on Vercel

Production app:

```txt
https://mindfuldiabetes.ai
```

---

## Partner Links

- **Mindful Diabetes AI:** https://mindfuldiabetes.ai
- **Mindful Diabetes Inc.:** https://mindfuldiabetes.org
- **LVQ Labs:** https://lvqlabs.com
- **JSM Cooperative:** https://jsmcoop.com

---

## Notes for Future Improvements

Potential next upgrades:

- Fully customized Kinde email templates
- Better dark-mode illustration system
- A dedicated JEIR avatar animation
- Branded error recovery flows
- More detailed onboarding copy
- A/B testing for sign-up copy
- Stronger consent segmentation for Mailchimp tags
- Additional language support

---

## License / Usage

This repository is intended for the Mindful Diabetes AI / LVQ Labs / Mindful Diabetes Inc. authentication experience.

Do not reuse brand assets, logos, or copy without permission from the respective organizations.
