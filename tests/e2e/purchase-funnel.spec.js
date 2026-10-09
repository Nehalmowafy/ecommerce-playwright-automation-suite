const { test, expect } = require('@playwright/test');
const { CatalogPage } = require('../../pages/catalog.page');
const { CartPage } = require('../../pages/cart.page');
const { CheckoutPage } = require('../../pages/checkout.page');
const { PaymentPage } = require('../../pages/payment.page');
const { BasePage } = require('../../pages/base.page');

test.describe('E-Commerce Purchasing Funnel & Payment Settlement', () => {
  let basePage;
  let catalogPage;
  let cartPage;
  let checkoutPage;
  let paymentPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    catalogPage = new CatalogPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    paymentPage = new PaymentPage(page);

    // 1. Block Google ads and tracking scripts at the network layer
    await basePage.blockAdsAndTracking();

    // 2. Automatically dismiss cookie/consent overlays
    await basePage.setupGlobalHandlers();
  });

  test('TC-E2E-01: Full user journey from SKU discovery to card settlement confirmation', async ({ page }) => {
    // 1. Authenticate first to establish session
    await page.goto('/login');
    const timestamp = Date.now();
    await page.locator('input[data-qa="signup-name"]').fill('QA Tester');
    await page.locator('input[data-qa="signup-email"]').fill(`tester_${timestamp}@mailinator.com`);
    await page.locator('button[data-qa="signup-button"]').click();

    // Fill mandatory account registration fields
    await page.locator('#id_gender1').check();
    await page.locator('#password').fill('TestPassword123!');
    await page.locator('#first_name').fill('John');
    await page.locator('#last_name').fill('Doe');
    await page.locator('#address1').fill('123 QA Lane');
    await page.locator('#country').selectOption('United States');
    await page.locator('#state').fill('California');
    await page.locator('#city').fill('San Jose');
    await page.locator('#zipcode').fill('95101');
    await page.locator('#mobile_number').fill('1234567890');
    await page.locator('button[data-qa="create-account"]').click();
    await page.locator('a[data-qa="continue-button"]').click();

    // 2. Add product to cart
    await catalogPage.addItemToCartByIndex(0);
    await expect(page).toHaveURL(/.*view_cart/);
    await expect(cartPage.cartItems).toHaveCount(1);

    // 3. Checkout review (session is active, proceeds directly)
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout/);
    await expect(checkoutPage.addressDeliveryBox).toBeVisible();

    // 4. Order notes & proceed to payment
    await checkoutPage.addOrderCommentAndPlaceOrder('Automated regression order verification');
    await expect(page).toHaveURL(/.*payment/);

    // 5. Submit card details
    await paymentPage.submitPayment({
      name: 'John Doe',
      number: '4111111111111111',
      cvc: '314',
      expiryMonth: '12',
      expiryYear: '2028',
    });

    // 6. Confirm order placement ledger
    await expect(paymentPage.orderPlacedHeader).toBeVisible();
    await expect(paymentPage.orderPlacedHeader).toHaveText(/ORDER PLACED!/i);
  });
});