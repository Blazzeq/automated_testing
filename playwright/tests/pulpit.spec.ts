import {expect, test} from "@playwright/test";

const url = 'https://demo-bank.vercel.app/index.html';
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
test.describe('Pulpit tests', () => {
    test('Quick payment with correct data', async ({page}) => {
        await page.goto(url);
        await page.getByTestId('login-input').fill(userId);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_transfer_receiver').selectOption(selectedTransferOption);
        await page.locator('#widget_1_transfer_amount').fill(transferAmount);
        await page.locator('#widget_1_transfer_title').fill(transferTitle);

        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText(`${transferSuccessMessage} ${transferReceiver} - ${transferAmount}PLN - ${transferTitle}`);
    });

    test('Mobile top up with correct data', async ({page}) => {
        await page.goto(url);
        await page.getByTestId('login-input').fill(userId);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_topup_receiver').selectOption(phoneNumber);
        await page.locator('#widget_1_topup_amount').selectOption(topUpAmount);
        await page.locator('#widget_1_topup_agreement').check();

        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText(`${topUpSuccessMessage} ${topUpAmount},00PLN na numer ${phoneNumber}`);
    })
});