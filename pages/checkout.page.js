const { BasePage } = require('./base.page');

exports.CheckoutPage = class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.addressDeliveryBox = page.locator('#address_delivery');
    this.commentTextarea = page.locator('textarea[name="message"]');
    this.placeOrderBtn = page.locator('a[href="/payment"]');
  }

  async addOrderCommentAndPlaceOrder(comment) {
    await this.commentTextarea.fill(comment);
    await this.placeOrderBtn.click();
  }
};