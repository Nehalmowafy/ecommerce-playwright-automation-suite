exports.BasePage = class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Aborts requests to common ad networks and tracking scripts before they reach the DOM.
   * This permanently eliminates Google vignette overlays and ad popups.
   */
  async blockAdsAndTracking() {
    await this.page.route(
      /(googleads|googlesyndication|doubleclick|adservice|adnxs|carbonads)/,
      (route) => route.abort()
    );
  }

  /**
   * Registers background listeners for any remaining consent dialogs or close buttons.
   */
  async setupGlobalHandlers() {
    // 1. Consent dialog handler
    const consentBtn = this.page.locator(
      'button[aria-label="Consent"], button:has-text("Consent"), .fc-cta-consent, button:has-text("Accept All")'
    ).first();

    await this.page.addLocatorHandler(consentBtn, async () => {
      await consentBtn.click();
    });

    // 2. Ad vignette 'Close' or 'Dismiss' button handler (if an ad ever slips through)
    const adCloseBtn = this.page.locator(
      '#dismiss-button, div[aria-label="Close ad"], span:has-text("Close")'
    ).first();

    await this.page.addLocatorHandler(adCloseBtn, async () => {
      await adCloseBtn.click();
    });
  }

  async navigate(path = '') {
    await this.page.goto(`/${path}`);
  }
};