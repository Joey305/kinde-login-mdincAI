
"use server";

import React from "react";
import { renderToString } from "react-dom/server.browser";
import {
  getKindeCSRF,
  getKindeNonce,
  getKindeRequiredCSS,
  getKindeRequiredJS,
  getKindeWidget,
  getKindeLoginUrl,
  getKindeRegisterUrl,
  getSVGFaviconUrl,
  setKindeDesignerCustomProperties,
  type KindePageEvent,
} from "@kinde/infrastructure";

import { LVQ_LOGO_DATA_URI, MDI_LOGO_DATA_URI } from "./brand-assets";

type PageVariant = "default" | "login" | "register" | "error";

type CopyConfig = {
  eyebrow: string;
  title: string;
  description: string;
  panelTitle: string;
  panelDescription: string;
  badge: string;
};

const APP_URL = "https://mindfuldiabetes.ai";

function getCopy(variant: PageVariant, context: KindePageEvent["context"]): CopyConfig {
  if (variant === "register") {
    return {
      eyebrow: "Create your account",
      title: "Start learning with JEIR.",
      description:
        "Create your Mindful Diabetes AI account to explore blood sugar, insulin resistance, Alzheimer’s research, and metabolic brain health in plain language.",
      panelTitle: context.widget?.content?.heading || "Create your account",
      panelDescription:
        context.widget?.content?.description ||
        "Create your account to continue to Mindful Diabetes AI.",
      badge: "Mindful Diabetes Inc. × LVQ Labs",
    };
  }

  if (variant === "login") {
    return {
      eyebrow: "Welcome back",
      title: "Return to JEIR.",
      description:
        "Continue learning with your AI guide to blood sugar, insulin resistance, Type 3 diabetes research, and brain health.",
      panelTitle: context.widget?.content?.heading || "Welcome back",
      panelDescription:
        context.widget?.content?.description ||
        "Sign in to continue to Mindful Diabetes AI.",
      badge: "Secure access powered by Kinde",
    };
  }

  if (variant === "error") {
    return {
      eyebrow: "Something needs attention",
      title: "We can help you get back in.",
      description:
        "This authentication page is protected by Kinde and styled for Mindful Diabetes AI. Review the message and try again.",
      panelTitle: context.widget?.content?.heading || "Authentication issue",
      panelDescription: context.widget?.content?.description || "Please review the message below.",
      badge: "Mindful Diabetes AI support",
    };
  }

  return {
    eyebrow: "Mindful Diabetes AI",
    title: "Understand blood sugar. Protect the brain.",
    description:
      "JEIR helps make complex metabolic brain health concepts easier to understand, remember, and share.",
    panelTitle: context.widget?.content?.heading || "Continue securely",
    panelDescription: context.widget?.content?.description || "Use the secure form below to continue.",
    badge: "Powered by LVQ Labs",
  };
}

function globalStyles() {
  return `
    :root {
      color-scheme: light;
      --mdi-bg: #f7fbff;
      --mdi-bg-soft: rgba(255,255,255,0.78);
      --mdi-text: #07111f;
      --mdi-muted: #5c6b7a;
      --mdi-border: rgba(15, 23, 42, 0.11);
      --mdi-card: rgba(255,255,255,0.82);
      --mdi-card-strong: #ffffff;
      --mdi-blue: #38bdf8;
      --mdi-cyan: #60f0e6;
      --mdi-coral: #ff7a66;
      --mdi-green: #0f4a3d;
      --mdi-shadow: 0 24px 90px rgba(15, 23, 42, 0.12);
    }

    html[data-md-theme="dark"] {
      color-scheme: dark;
      --mdi-bg: #050914;
      --mdi-bg-soft: rgba(8, 15, 30, 0.76);
      --mdi-text: #f8fbff;
      --mdi-muted: #a9b8c8;
      --mdi-border: rgba(255,255,255,0.13);
      --mdi-card: rgba(12, 20, 36, 0.74);
      --mdi-card-strong: rgba(13, 24, 44, 0.94);
      --mdi-shadow: 0 24px 120px rgba(0,0,0,0.46);
    }

    @media (prefers-color-scheme: dark) {
      html:not([data-md-theme="light"]) {
        color-scheme: dark;
        --mdi-bg: #050914;
        --mdi-bg-soft: rgba(8, 15, 30, 0.76);
        --mdi-text: #f8fbff;
        --mdi-muted: #a9b8c8;
        --mdi-border: rgba(255,255,255,0.13);
        --mdi-card: rgba(12, 20, 36, 0.74);
        --mdi-card-strong: rgba(13, 24, 44, 0.94);
        --mdi-shadow: 0 24px 120px rgba(0,0,0,0.46);
      }
    }

    * { box-sizing: border-box; }

    html, body { min-height: 100%; margin: 0; }

    body {
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--mdi-text);
      background:
        radial-gradient(circle at 18% 14%, rgba(96, 240, 230, 0.22), transparent 31rem),
        radial-gradient(circle at 88% 8%, rgba(255, 122, 102, 0.18), transparent 34rem),
        linear-gradient(135deg, var(--mdi-bg), #eefaff 48%, var(--mdi-bg));
    }

    html[data-md-theme="dark"] body {
      background:
        radial-gradient(circle at 18% 14%, rgba(96, 240, 230, 0.18), transparent 32rem),
        radial-gradient(circle at 86% 12%, rgba(255, 122, 102, 0.14), transparent 34rem),
        linear-gradient(135deg, #02050d, #071120 46%, #050914);
    }

    .md-page {
      min-height: 100vh;
      position: relative;
      overflow: hidden;
      padding: 28px;
    }

    .md-grid-overlay {
      position: fixed;
      inset: 0;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px);
      background-size: 42px 42px;
      mask-image: linear-gradient(to bottom, black, transparent 78%);
      opacity: 0.9;
    }

    html[data-md-theme="dark"] .md-grid-overlay {
      background-image:
        linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px);
    }

    .md-shell {
      width: min(1180px, 100%);
      min-height: calc(100vh - 56px);
      margin: 0 auto;
      display: grid;
      grid-template-rows: auto 1fr auto;
      position: relative;
      z-index: 1;
    }

    .md-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 18px;
      padding: 12px;
      border: 1px solid var(--mdi-border);
      background: var(--mdi-bg-soft);
      backdrop-filter: blur(22px);
      border-radius: 28px;
      box-shadow: 0 14px 52px rgba(15, 23, 42, 0.08);
    }

    .brand-lockup {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: var(--mdi-text);
    }

    .brand-mark {
      width: 42px;
      height: 42px;
      border-radius: 14px;
      object-fit: cover;
      border: 1px solid var(--mdi-border);
      background: rgba(255,255,255,0.8);
      padding: 3px;
    }

    .brand-title { font-weight: 800; letter-spacing: -0.03em; line-height: 1; }
    .brand-subtitle { color: var(--mdi-muted); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 800; margin-top: 4px; }

    .theme-toggle {
      appearance: none;
      border: 1px solid var(--mdi-border);
      background: var(--mdi-card);
      color: var(--mdi-text);
      border-radius: 999px;
      padding: 9px 12px;
      font-weight: 800;
      cursor: pointer;
      min-width: 44px;
      box-shadow: 0 8px 25px rgba(15,23,42,0.08);
    }

    .theme-toggle:hover { transform: translateY(-1px); }

    .md-main {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 460px;
      align-items: center;
      gap: 42px;
      padding: 52px 8px;
    }

    .hero-panel {
      padding: 24px;
    }

    .co-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 13px;
      border: 1px solid var(--mdi-border);
      border-radius: 999px;
      background: var(--mdi-card);
      color: var(--mdi-muted);
      font-size: 13px;
      font-weight: 800;
      box-shadow: 0 10px 34px rgba(15,23,42,0.08);
    }

    .co-dot {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: linear-gradient(135deg, var(--mdi-cyan), var(--mdi-coral));
      box-shadow: 0 0 22px rgba(96, 240, 230, 0.75);
    }

    h1 {
      font-size: clamp(46px, 6.2vw, 84px);
      line-height: 0.92;
      letter-spacing: -0.08em;
      margin: 24px 0 18px;
      max-width: 780px;
    }

    .hero-copy {
      color: var(--mdi-muted);
      font-size: clamp(17px, 1.8vw, 21px);
      line-height: 1.65;
      max-width: 680px;
      margin: 0;
    }

    .micro-grid {
      margin-top: 28px;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      max-width: 760px;
    }

    .micro-card {
      border: 1px solid var(--mdi-border);
      background: var(--mdi-card);
      border-radius: 22px;
      padding: 16px;
      min-height: 116px;
      box-shadow: 0 12px 36px rgba(15,23,42,0.07);
    }

    .micro-card strong { display: block; font-size: 14px; margin-bottom: 8px; }
    .micro-card span { display: block; color: var(--mdi-muted); font-size: 13px; line-height: 1.5; }

    .auth-card {
      border: 1px solid var(--mdi-border);
      background: var(--mdi-card-strong);
      border-radius: 34px;
      box-shadow: var(--mdi-shadow);
      overflow: hidden;
      position: relative;
    }

    .auth-card::before {
      content: "";
      position: absolute;
      inset: -1px;
      background: linear-gradient(135deg, rgba(96,240,230,0.33), transparent 38%, rgba(255,122,102,0.29));
      pointer-events: none;
      opacity: 0.8;
      mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      padding: 1px;
      border-radius: 34px;
    }

    .auth-inner { position: relative; padding: 28px; }

    .auth-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 18px;
      margin-bottom: 24px;
    }

    .logo-pair { display: flex; align-items: center; gap: 10px; }
    .logo-tile {
      width: 48px;
      height: 48px;
      border-radius: 18px;
      border: 1px solid var(--mdi-border);
      background: rgba(255,255,255,0.75);
      display: grid;
      place-items: center;
      overflow: hidden;
      padding: 6px;
    }
    .logo-tile img { width: 100%; height: 100%; object-fit: contain; }

    .secure-pill {
      color: var(--mdi-muted);
      border: 1px solid var(--mdi-border);
      padding: 8px 10px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 800;
      white-space: nowrap;
    }

    .panel-kicker { color: var(--mdi-muted); text-transform: uppercase; letter-spacing: 0.18em; font-size: 12px; font-weight: 900; }
    .panel-title { font-size: 30px; line-height: 1.06; letter-spacing: -0.05em; margin: 10px 0 8px; }
    .panel-description { color: var(--mdi-muted); line-height: 1.55; margin: 0 0 22px; }

    .kinde-widget-wrap {
      border: 1px solid var(--mdi-border);
      background: rgba(255,255,255,0.52);
      border-radius: 24px;
      padding: 18px;
    }

    html[data-md-theme="dark"] .kinde-widget-wrap { background: rgba(2,6,23,0.28); }

    .auth-note {
      margin-top: 16px;
      color: var(--mdi-muted);
      font-size: 12px;
      line-height: 1.55;
      border: 1px solid var(--mdi-border);
      background: var(--mdi-card);
      border-radius: 18px;
      padding: 14px;
    }

    .switch-link {
      margin-top: 16px;
      text-align: center;
      color: var(--mdi-muted);
      font-size: 14px;
    }

    a { color: #0ea5e9; font-weight: 800; }
    html[data-md-theme="dark"] a { color: #67e8f9; }

    .md-footer {
      display: flex;
      justify-content: space-between;
      gap: 18px;
      align-items: center;
      color: var(--mdi-muted);
      font-size: 12px;
      padding: 14px 4px 0;
    }

    .md-footer-links { display: flex; gap: 16px; flex-wrap: wrap; }
    .md-footer-links a { color: var(--mdi-muted); text-decoration: none; }

    /* Kinde widget polish */
    [data-kinde-widget] { font-family: inherit !important; }
    [data-kinde-control-input], input, select {
      border-radius: 16px !important;
      border-color: var(--mdi-border) !important;
    }
    button, [data-kinde-control-button] {
      border-radius: 999px !important;
      font-weight: 800 !important;
    }

    @media (max-width: 940px) {
      .md-page { padding: 14px; }
      .md-main { grid-template-columns: 1fr; padding: 26px 0; }
      .hero-panel { padding: 10px; }
      .micro-grid { grid-template-columns: 1fr; }
      .auth-inner { padding: 20px; }
      .md-footer { flex-direction: column; align-items: flex-start; }
      .md-nav { border-radius: 22px; }
      .brand-subtitle { display: none; }
    }
  `;
}

function themeScript() {
  return `
    (function(){
      try {
        var key = 'mdi-kinde-theme';
        var root = document.documentElement;
        var saved = localStorage.getItem(key);
        if (saved === 'dark' || saved === 'light') root.setAttribute('data-md-theme', saved);
        window.__toggleMdiKindeTheme = function(){
          var current = root.getAttribute('data-md-theme');
          var next = current === 'dark' ? 'light' : 'dark';
          root.setAttribute('data-md-theme', next);
          localStorage.setItem(key, next);
          var btn = document.querySelector('[data-theme-toggle]');
          if (btn) btn.textContent = next === 'dark' ? '☀︎' : '☾';
        };
      } catch(e) {}
    })();
  `;
}

function widgetCleanupScript() {
  return `
    (function(){
      function hideMarketingConsent(){
        var root = document.querySelector('.kinde-widget-wrap');
        if (!root) return;
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        var nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(function(node){
          var text = (node.nodeValue || '').replace(/\\s+/g, ' ').trim().toLowerCase();
          if (!text || text.indexOf('send me offers') === -1) return;
          var parent = node.parentElement;
          if (!parent) return;
          var row = parent.closest('label, fieldset, [data-kinde-control], [data-kinde-field], [class*="checkbox"], [class*="consent"]') || parent;
          row.setAttribute('hidden', 'true');
          row.setAttribute('aria-hidden', 'true');
          row.style.display = 'none';
        });
      }

      try {
        function startMarketingConsentCleanup(){
          hideMarketingConsent();
          var observer = new MutationObserver(hideMarketingConsent);
          observer.observe(document.body, { childList: true, subtree: true });
          window.setTimeout(hideMarketingConsent, 300);
          window.setTimeout(hideMarketingConsent, 1000);
        }

        if (document.body) {
          startMarketingConsentCleanup();
        } else {
          document.addEventListener('DOMContentLoaded', startMarketingConsentCleanup, { once: true });
        }
      } catch(e) {}
    })();
  `;
}

function Shell({ event, variant }: { event: KindePageEvent; variant: PageVariant }) {
  const { context, request } = event;
  const copy = getCopy(variant, context);
  const isRegister = variant === "register";
  const pageTitle = context.widget?.content?.page_title || context.widget?.content?.pageTitle || "Mindful Diabetes AI";

  return (
    <html lang={request.locale.lang} dir={request.locale.isRtl ? "rtl" : "ltr"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <meta name="csrf-token" content={getKindeCSRF()} />
        <title>{pageTitle} | Mindful Diabetes AI</title>
        <link rel="icon" href={getSVGFaviconUrl()} type="image/svg+xml" />
        {getKindeRequiredCSS()}
        {getKindeRequiredJS()}
        <style nonce={getKindeNonce()}>
          {`:root {${setKindeDesignerCustomProperties({
            baseBackgroundColor: "#f7fbff",
            baseLinkColor: "#0284c7",
            buttonBorderRadius: "999px",
            primaryButtonBackgroundColor: "#07111f",
            primaryButtonColor: "#ffffff",
            inputBorderRadius: "16px",
          })}}`}
        </style>
        <style nonce={getKindeNonce()}>{globalStyles()}</style>
        <script nonce={getKindeNonce()} dangerouslySetInnerHTML={{ __html: themeScript() }} />
        <script nonce={getKindeNonce()} dangerouslySetInnerHTML={{ __html: widgetCleanupScript() }} />
      </head>
      <body>
        <div className="md-grid-overlay" />
        <div className="md-page" data-kinde-root="/auth">
          <div className="md-shell">
            <nav className="md-nav" aria-label="Authentication page navigation">
              <a className="brand-lockup" href={APP_URL}>
                <img className="brand-mark" src={MDI_LOGO_DATA_URI} alt="Mindful Diabetes AI" />
                <span>
                  <span className="brand-title">Mindful Diabetes AI</span>
                  <span className="brand-subtitle">Powered by LVQ Labs</span>
                </span>
              </a>
              <button
                type="button"
                className="theme-toggle"
                data-theme-toggle="true"
                onClick="window.__toggleMdiKindeTheme && window.__toggleMdiKindeTheme()"
                aria-label="Toggle light and dark mode"
              >
                ☾
              </button>
            </nav>

            <main className="md-main">
              <section className="hero-panel" aria-label="Mindful Diabetes AI introduction">
                <div className="co-badge"><span className="co-dot" />{copy.badge}</div>
                <h1>{copy.title}</h1>
                <p className="hero-copy">{copy.description}</p>
                <div className="micro-grid">
                  <div className="micro-card">
                    <strong>Brain-aware education</strong>
                    <span>Explore insulin resistance, brain energy, Alzheimer’s research, and Type 3 diabetes concepts carefully.</span>
                  </div>
                  <div className="micro-card">
                    <strong>Science made usable</strong>
                    <span>JEIR turns complex biomedical ideas into clear explanations you can remember and share.</span>
                  </div>
                  <div className="micro-card">
                    <strong>Always educational</strong>
                    <span>Mindful Diabetes AI does not diagnose, prescribe, or replace qualified medical care.</span>
                  </div>
                </div>
              </section>

              <section className="auth-card" aria-label="Secure Kinde authentication form">
                <div className="auth-inner">
                  <div className="auth-top">
                    <div className="logo-pair">
                      <span className="logo-tile"><img src={MDI_LOGO_DATA_URI} alt="Mindful Diabetes Inc." /></span>
                      <span className="logo-tile"><img src={LVQ_LOGO_DATA_URI} alt="LVQ Labs" /></span>
                    </div>
                    <span className="secure-pill">Secure by Kinde</span>
                  </div>

                  <div className="panel-kicker">{copy.eyebrow}</div>
                  <h2 className="panel-title">{copy.panelTitle}</h2>
                  <p className="panel-description">{copy.panelDescription}</p>

                  <div className="kinde-widget-wrap">{getKindeWidget()}</div>

                  <p className="auth-note">
                    Mindful Diabetes AI provides educational information only and is not a substitute for professional medical advice.
                  </p>

                  <p className="switch-link">
                    {isRegister ? (
                      <>Already have an account? <a href={getKindeLoginUrl()}>Sign in</a></>
                    ) : (
                      <>New here? <a href={getKindeRegisterUrl()}>Create an account</a></>
                    )}
                  </p>
                </div>
              </section>
            </main>

            <footer className="md-footer">
              <span>© Mindful Diabetes AI. Powered by LVQ Labs.</span>
              <span className="md-footer-links">
                <a href="https://mindfuldiabetes.ai/privacy">Privacy</a>
                <a href="https://mindfuldiabetes.ai/terms">Terms</a>
                <a href="https://mindfuldiabetes.ai/disclaimer">Disclaimer</a>
              </span>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}

export async function renderAuthPage(event: KindePageEvent, variant: PageVariant = "default"): Promise<string> {
  return renderToString(<Shell event={event} variant={variant} />);
}
