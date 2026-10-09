const { BasePage } = require('./base.page');

class AuthPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loggedInUserText = page.locator('li:has-text("Logged in as")');
  }

  async login(email, password) {
    await this.navigate('login');
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { AuthPage };