import { expect, test } from '@playwright/test';
import { transferData, userData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Payments tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userData);
    await page.getByRole('link', { name: 'płatności' }).click();
  });
  test('Simple payment test', async ({ page }) => {
    await page.getByTestId('transfer_receiver').fill(transferData.receiver);
    await page.getByTestId('form_account_to').fill(transferData.account);
    await page.getByTestId('form_amount').fill(transferData.amount);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      transferData.message(),
    );
  });
});
