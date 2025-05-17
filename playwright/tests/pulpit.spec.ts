import { expect, test } from '@playwright/test';
import {
  topUpData,
  quickTransferData,
  userData,
} from '../test-data/login.data';
import { getElementType, login } from '../helpers/functions.helper';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, userData);
  });
  test.describe('Quick payment tests', () => {
    test('Quick payment with correct data', async ({ page }) => {
      await page
        .locator('#widget_1_transfer_receiver')
        .selectOption(quickTransferData.receiver);
      await page
        .locator('#widget_1_transfer_amount')
        .fill(quickTransferData.amount);
      await page
        .locator('#widget_1_transfer_title')
        .fill(quickTransferData.title);

      await page.getByRole('button', { name: 'wykonaj' }).click();
      await page.getByTestId('close-button').click();

      await expect(page.locator('#show_messages')).toHaveText(
        quickTransferData.message(),
      );
    });
  });

  test.describe('Mobile top up tests', () => {
    test('Mobile top up with correct data', async ({ page }) => {
      await page
        .locator('#widget_1_topup_receiver')
        .selectOption(topUpData.phoneNumber);

      const type = await getElementType(page.locator('#widget_1_topup_amount'));
      if (type == 'text') {
        await page.locator('#widget_1_topup_amount').fill(topUpData.amount);
      } else if (type == 'select') {
        await page
          .locator('#widget_1_topup_amount')
          .selectOption(topUpData.amount);
      }
      await page.locator('#widget_1_topup_agreement').check();

      await page.getByRole('button', { name: 'doładuj telefon' }).click();
      await page.getByTestId('close-button').click();

      await expect(page.locator('#show_messages')).toHaveText(
        topUpData.message(),
      );
    });

    test('Check balance after correct mobile top up', async ({ page }) => {
      const initialBalance = await page.locator('#money_value').innerText();
      const expectedBalance = Number(initialBalance) - Number(topUpData.amount);

      await page
        .locator('#widget_1_topup_receiver')
        .selectOption(topUpData.phoneNumber);
      const type = await getElementType(page.locator('#widget_1_topup_amount'));
      if (type == 'text') {
        await page.locator('#widget_1_topup_amount').fill(topUpData.amount);
      } else if (type == 'select') {
        await page
          .locator('#widget_1_topup_amount')
          .selectOption(topUpData.amount);
      }
      await page.locator('#widget_1_topup_agreement').check();

      await page.getByRole('button', { name: 'doładuj telefon' }).click();
      await page.getByTestId('close-button').click();

      await expect(page.locator('#money_value')).toHaveText(
        expectedBalance.toString(),
      );
    });
  });
});
