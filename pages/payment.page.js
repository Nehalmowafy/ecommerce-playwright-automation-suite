const { BasePage } = require('./base.page');

exports.PaymentPage = class PaymentPage extends BasePage {
  constructor(page) {
    super(page);
    this.nameOnCardInput = page.locator('input[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('input[data-qa="card-number"]');
    this.cvcInput = page.locator('input[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');
    this.payAndConfirmOrderBtn = page.locator('button[data-qa="pay-button"]');
    this.orderPlacedHeader = page.locator('h2[data-qa="order-placed"]');
  }

  async submitPayment(cardDetails) {
    await this.nameOnCardInput.fill(cardDetails.name);
    await this.cardNumberInput.fill(cardDetails.number);
    await this.cvcInput.fill(cardDetails.cvc);
    await this.expiryMonthInput.fill(cardDetails.expiryMonth);
    await this.expiryYearInput.fill(cardDetails.expiryYear);
    await this.payAndConfirmOrderBtn.click();
  }
};