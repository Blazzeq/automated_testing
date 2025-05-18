import { test, expect } from '@playwright/test';
import {
  userData,
  wrongUserData,
  wrongLoginErrorMessage,
  wrongPasswordErrorMessage,
} from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Login with correct credentials', async ({ page }) => {
    //Act
    const loginPage = new LoginPage(page);
    await loginPage.login(userData);

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(userData.name);
  });

  test('Login with too short username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.getByTestId('login-input').fill(wrongUserData.login);
    await page.getByTestId('login-input').blur();

    await expect(loginPage.errorLoginId).toHaveText(
      `${wrongLoginErrorMessage}`,
    );
  });

  test('Login with too short password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.getByTestId('login-input').fill(userData.login);
    await page.getByTestId('password-input').fill(wrongUserData.password);
    await page.getByTestId('password-input').blur();

    await expect(loginPage.errorLoginPassword).toHaveText(
      `${wrongPasswordErrorMessage}`,
    );
  });
});
