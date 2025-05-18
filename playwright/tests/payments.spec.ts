import { expect, test } from '@playwright/test';
import { transferData, userData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentsPage } from '../pages/payments.page';

test.describe('Payments tests', () => {
  let loginPage: LoginPage;
  let paymentsPage: PaymentsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    paymentsPage = new PaymentsPage(page);
    await loginPage.goto(page);
    await loginPage.login(userData);
    await paymentsPage.sideMenu.gotoPayments(page);
  });
  test('Simple payment test', async ({ page }) => {
    await paymentsPage.payment(transferData);

    await expect(paymentsPage.message).toHaveText(
      transferData.expectedMessage(),
    );
  });
});
