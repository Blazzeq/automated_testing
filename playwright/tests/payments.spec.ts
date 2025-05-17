import { expect, test } from '@playwright/test';
import { login } from '../helpers/functions.helper';
import { userData } from '../test-data/login.data';

const transferReceiver = 'Jan Nowak';
const transferAccount = '12 3456 7890 1234 5678 9012 3456';
const transferAmount = '222';
const transferMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;
test.describe('Payments tests', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, userData);
    await page.getByRole('link', { name: 'płatności' }).click();
  });
  test('Simple payment test', async ({ page }) => {
    await page.getByTestId('transfer_receiver').fill(transferReceiver);
    await page
      .getByTestId('form_account_to')
      .fill(transferAccount);
    await page.getByTestId('form_amount').fill(transferAmount);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(transferMessage);
  });
});
