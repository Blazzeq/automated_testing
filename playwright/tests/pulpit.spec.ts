import { expect, test } from '@playwright/test';
import {
  topUpData,
  quickTransferData,
  userData,
} from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

test.describe('Pulpit tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto(page);
    await loginPage.login(userData);
    dashboardPage = new DashboardPage(page);
  });
  test.describe('Quick payment tests', () => {
    test(
      'Quick payment with correct data',
      { tag: ['@dashboard', '@quick_transfer'] },
      async ({ page }) => {
        await dashboardPage.quickTransfer(quickTransferData);

        await expect(dashboardPage.message).toHaveText(
          quickTransferData.expectedMessage(),
        );
      },
    );
  });

  test.describe('Mobile top up tests', () => {
    test(
      'Mobile top up with correct data',
      { tag: ['@dashboard', '@mobile_top_up'] },
      async ({ page }) => {
        await dashboardPage.mobileTopUp(topUpData);

        await expect(dashboardPage.message).toHaveText(
          topUpData.expectedMessage(),
        );
      },
    );

    test(
      'Check balance after correct mobile top up',
      { tag: ['@dashboard', '@mobile_top_up', '@integration'] },
      async ({ page }) => {
        const initialBalance = await dashboardPage.balance.innerText();
        const expectedBalance =
          Number(initialBalance) - Number(topUpData.amount);

        await dashboardPage.mobileTopUp(topUpData);

        await expect(dashboardPage.balance).toHaveText(
          expectedBalance.toString(),
        );
      },
    );
  });
});
