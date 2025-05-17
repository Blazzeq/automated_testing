import { test, expect } from '@playwright/test';

//Arrange
const url = 'https://demo-bank.vercel.app/index.html';
const userLogin = 'tester12';
const userPassword = 'password';
const userWrongLogin = 'tester';
const userWrongPassword = '123456';
const expectedUserName = 'Jan Demobankowy';
const errorString = 'ma min. 8 znaków';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('Login with correct credentials', async ({ page }) => {
    //Act
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('Login with too short username', async ({ page }) => {
    await page.getByTestId('login-input').fill(userWrongLogin);
    await page.getByTestId('login-input').blur();

    await expect(page.getByTestId('error-login-id')).toHaveText(
      `identyfikator ${errorString}`,
    );
  });

  test('Login with too short password', async ({ page }) => {
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').fill(userWrongPassword);
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText(
      `hasło ${errorString}`,
    );
  });
});
