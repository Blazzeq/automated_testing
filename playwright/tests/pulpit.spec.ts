import { expect, test } from '@playwright/test';
import {
  topUpData,
  quickTransferData,
  userData,
} from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(page);
    await loginPage.login(userData);
  });
  test.describe('Quick payment tests', () => {
    test('Quick payment with correct data', async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      await dashboardPage.quickTransfer(quickTransferData);

      await expect(page.locator('#show_messages')).toHaveText(
        quickTransferData.message(),
      );
    });
  });

  test.describe('Mobile top up tests', () => {
    test('Mobile top up with correct data', async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      await dashboardPage.mobileTopUp(topUpData);

      await expect(page.locator('#show_messages')).toHaveText(
        topUpData.message(),
      );
    });

    test('Check balance after correct mobile top up', async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      const initialBalance = await page.locator('#money_value').innerText();
      const expectedBalance = Number(initialBalance) - Number(topUpData.amount);
      await dashboardPage.mobileTopUp(topUpData);

      await expect(page.locator('#money_value')).toHaveText(
        expectedBalance.toString(),
      );
    });
  });
});
