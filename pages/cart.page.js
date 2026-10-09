const { BasePage } = require('./base.page');

class CartPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.proceedToCheckoutBtn = page.locator('.check_out');
    this.cartItems = page.locator('#cart_info_table tbody tr');
    // Checkout modal elements (if unauthenticated)
    this.checkoutModal = page.locator('#checkoutModal');
    this.modalRegisterLoginLink = page.locator('#checkoutModal a[href="/login"]');
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutBtn.click();
  }

  async proceedToLoginFromModal() {
    await this.modalRegisterLoginLink.click();
  }
}

module.exports = { CartPage };