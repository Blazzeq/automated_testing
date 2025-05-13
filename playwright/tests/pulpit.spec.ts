import {expect, test} from "@playwright/test";

test.describe('Pulpit tests', () => {
    test('Quick payment with correct data', async ({page}) => {
        await page.goto('https://demo-bank.vercel.app/index.html');
        await page.getByTestId('login-input').fill('tester12');
        await page.getByTestId('password-input').fill('password');
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_transfer_receiver').selectOption('2');
        await page.locator('#widget_1_transfer_amount').fill('150,00');
        await page.locator('#widget_1_transfer_title').fill('Pizza');

        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();
        //await page.getByRole('link', { name: 'Przelew wykonany! Chuck Demobankowy - 150,00PLN - Zwrot środków}).click();

        await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - Pizza');
        //await expect(page.getByRole('link')).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - Zwrot środków');
    });

    test('Mobile payment with correct data', async ({page}) => {
        await page.goto('https://demo-bank.vercel.app/index.html');
        await page.getByTestId('login-input').fill('tester12');
        await page.getByTestId('password-input').fill('password');
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_topup_receiver').selectOption('504 xxx xxx');
        await page.locator('#widget_1_topup_amount').selectOption('40');
        await page.locator('#widget_1_topup_agreement').check();

        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 40,00PLN na numer 504 xxx xxx');
    })
});