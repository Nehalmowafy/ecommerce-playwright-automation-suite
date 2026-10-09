const { BasePage } = require('./base.page');

class CatalogPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.productCards = page.locator('.single-products');
    this.addToCartButtons = page.locator('.productinfo .add-to-cart');
    this.modalViewCartLink = page.locator('#cartModal a[href="/view_cart"], u:has-text("View Cart")');
  }

  async navigate() {
    await super.navigate('products');
  }

  async addItemToCartByIndex(index = 0) {
    await this.navigate();

    const productBtn = this.addToCartButtons.nth(index);
    await productBtn.scrollIntoViewIfNeeded();
    await productBtn.click({ force: true });

    // Await the modal confirmation and click View Cart
    await this.modalViewCartLink.first().waitFor({ state: 'visible', timeout: 10000 });
    await this.modalViewCartLink.first().click();
  }
}

module.exports = { CatalogPage };