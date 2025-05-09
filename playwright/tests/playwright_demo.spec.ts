import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('Login with correct credentials', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/index.html');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('tester12');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('12345678');
    await page.getByTestId('login-button').click();
    await page.getByTestId('user-name').click();

    await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
  });

  test('Login with too short username', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/index.html');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('tester');
    await page.getByTestId('password-input').click();
    await page.getByTestId('error-login-id').click();

    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
  });

  test('Login with too short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/index.html');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('tester12');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('123456');
    await page.locator('div').filter({ hasText: 'Wersja demonstracyjna serwisu' }).nth(3).click();
    await page.getByTestId('error-login-password').click();

    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
  });
});