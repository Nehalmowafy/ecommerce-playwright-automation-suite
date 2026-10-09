# Enterprise E-Commerce E2E Test Suite & Payment Automation

[![E-Commerce Web & Payment Regression](https://github.com/Nehalmowafy/ecommerce-playwright-automation-suite/actions/workflows/web-ui.yml/badge.svg)](https://github.com/Nehalmowafy/ecommerce-playwright-automation-suite/actions/workflows/web-ui.yml)

A production-grade test automation framework engineered with **Playwright** and modern **JavaScript (ES6+)**. Implements the **Page Object Model (POM)** pattern to automate mission-critical transactional purchase funnels: product discovery, dynamic customer session creation, line-item cart calculations, shipping address gating, and card payment authorization.

---

## 🏗️ Architecture & Technical Highlights

- **Core Engine:** Playwright Test Runner (Chromium engine)
- **Language / Runtime:** JavaScript (ES6+ / Node.js LTS)
- **Design Pattern:** Modular Page Object Model (POM) separating locators, domain actions, and assertions
- **Consent & Interstitial Handling:** 
  - Global `addLocatorHandler` listeners for asynchronous Google / GDPR CMP modals
  - Network-layer route aborting (`page.route`) against tracking/ad networks (`googleads`, `googlesyndication`) to eliminate intrusive vignette overlays in headless environments
- **Dynamic Session Management:** Generates isolated, timestamped user credentials per test execution to prevent cross-test state pollution
- **CI/CD Pipeline:** Automated GitHub Actions runner triggering on push and pull request events, with 30-day artifact retention for interactive Playwright HTML reports

---

## 📂 Repository Layout

```text
ecommerce-playwright-automation-suite/
├── .github/
│   └── workflows/
│       └── web-ui.yml              # CI/CD regression pipeline
├── pages/                          # Page Object Model layer
│   ├── base.page.js                # Core navigation, ad blocking & global handlers
│   ├── auth.page.js                # Dynamic customer authentication
│   ├── catalog.page.js             # SKU discovery & modal-driven cart dispatch
│   ├── cart.page.js                # Cart table reconciliation & checkout gating
│   ├── checkout.page.js            # Address review blocks & order comment payloads
│   └── payment.page.js             # Simulated payment gateway authorization
├── tests/
│   └── e2e/
│       └── purchase-funnel.spec.js # E2E purchase-to-payment lifecycle test
├── playwright.config.js            # Test runner configuration & artifact reporters
├── package.json                    # Dependencies & execution scripts
├── .gitignore
└── README.md