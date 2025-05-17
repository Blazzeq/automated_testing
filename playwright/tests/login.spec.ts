import { test, expect } from '@playwright/test';
import {
  userData,
  wrongUserData,
  wrongLoginErrorMessage,
  wrongPasswordErrorMessage,
} from '../test-data/login.data';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Login with correct credentials', async ({ page }) => {
    //Act
    await page.getByTestId('login-input').fill(userData.login);
    await page.getByTestId('password-input').fill(userData.password);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(userData.name);
  });

  test('Login with too short username', async ({ page }) => {
    await page.getByTestId('login-input').fill(wrongUserData.login);
    await page.getByTestId('login-input').blur();

    await expect(page.getByTestId('error-login-id')).toHaveText(
      `${wrongLoginErrorMessage}`,
    );
  });

  test('Login with too short password', async ({ page }) => {
    await page.getByTestId('login-input').fill(userData.login);
    await page.getByTestId('password-input').fill(wrongUserData.password);
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText(
      `${wrongPasswordErrorMessage}`,
    );
  });
});
