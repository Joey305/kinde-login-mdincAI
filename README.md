# Kinde Login — Mindful Diabetes AI

Custom Kinde hosted authentication UI for **Mindful Diabetes AI**, powered by **LVQ Labs** and created with **Mindful Diabetes Inc.**

This repository is designed to be connected in Kinde under **Design → Custom code**. It customizes the Kinde-hosted auth pages around the secure Kinde widget while keeping Kinde responsible for OAuth, OTP, session security, callbacks, and all authentication mechanics.

## What this includes

- A polished co-branded auth shell for Kinde hosted pages
- Dedicated templates for:
  - `(login)` sign-in page
  - `(register)` sign-up page
  - `(default)` fallback for all other Kinde pages
  - `(error)` fallback error styling
- Built-in light/dark theme toggle using localStorage
- Embedded optimized MDI and LVQ logos so no asset hosting is required
- Clear Mailchimp/email update consent copy on sign-up
- Kinde widget styling via Kinde design custom properties

## Project structure

```txt
kinde-login-mdincAI/
├── kinde.json
├── package.json
├── tsconfig.json
├── kindeSrc/
│   └── environment/
│       └── pages/
│           └── (kinde)/
│               ├── shared/
│               │   ├── auth-shell.tsx
│               │   └── brand-assets.ts
│               ├── (default)/page.tsx
│               ├── (login)/page.tsx
│               ├── (register)/page.tsx
│               └── (error)/page.tsx
└── docs/
    ├── setup.md
    ├── mdi-logo.png
    └── lvq-logo.png
```

## Push to GitHub

```bash
echo "# kinde-login-mdincAI" >> README.md
git init
git add .
git commit -m "Initial Mindful Diabetes AI Kinde custom UI"
git branch -M main
git remote add origin https://github.com/Joey305/kinde-login-mdincAI.git
git push -u origin main
```

## Connect in Kinde

1. Open Kinde.
2. Go to **Design → Custom code**.
3. Connect this GitHub repository.
4. Select the `main` branch.
5. Make sure the root config is found through `kinde.json`.
6. Preview in a non-production environment first.
7. Deploy/apply to production after preview looks correct.

## Notes

- Kinde custom UI pages are server-rendered; do not use React client hooks like `useEffect`.
- The actual auth form is still the secure Kinde widget. This repo controls the page around it.
- The sign-up page includes email update disclosure copy. Your Kinde page content can also set the marketing consent checkbox label.
