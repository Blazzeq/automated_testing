import { expect, test } from '@playwright/test';

const userId = 'tester12';
const userPassword = 'password';
const selectedTransferOption = '2';
const transferAmount = '150,00';
const transferTitle = 'Pizza';
const transferReceiver = `Chuck Demobankowy`;
const transferSuccessMessage = `Przelew wykonany!`;
const phoneNumber = '504 xxx xxx';
const topUpAmount = '40';
const topUpSuccessMessage = `Doładowanie wykonane!`;

async function getElementType(locator) {
  const tagName = await locator.evaluate((el) => el.tagName.toLowerCase());
  if (tagName === 'input' || tagName === 'textarea') {
    return 'text';
  }
  if (tagName === 'select') {
    return 'select';
  }
  return 'other';
}

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
  });
  test('Quick payment with correct data', async ({ page }) => {
    await page
      .locator('#widget_1_transfer_receiver')
      .selectOption(selectedTransferOption);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      `${transferSuccessMessage} ${transferReceiver} - ${transferAmount}PLN - ${transferTitle}`,
    );
  });

  test('Mobile top up with correct data', async ({ page }) => {
    await page.locator('#widget_1_topup_receiver').selectOption(phoneNumber);
    const type = await getElementType(page.locator('#widget_1_topup_amount'));
    if (type == 'text') {
      await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    } else if (type == 'select') {
      await page.locator('#widget_1_topup_amount').selectOption(topUpAmount);
    }
    await page.locator('#widget_1_topup_agreement').check();

    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      `${topUpSuccessMessage} ${topUpAmount},00PLN na numer ${phoneNumber}`,
    );
  });
});
