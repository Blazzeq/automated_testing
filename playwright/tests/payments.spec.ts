import { expect, test } from '@playwright/test';
import { transferData, userData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentsPage } from '../pages/payments.page';

test.describe('Payments tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const paymentsPage = new PaymentsPage(page);
    await loginPage.goto(page);
    await loginPage.login(userData);
    await paymentsPage.goto(page);
  });
  test('Simple payment test', async ({ page }) => {
    const paymentsPage = new PaymentsPage(page);
    await paymentsPage.payment(transferData);

    await expect(paymentsPage.message).toHaveText(
      transferData.expectedMessage(),
    );
  });
});
