import { test, expect } from '@playwright/test';
import {
  userData,
  wrongUserData,
  wrongLoginErrorMessage,
  wrongPasswordErrorMessage,
} from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto(page);
  });

  test('Login with correct credentials', async ({ page }) => {
    //Act
    await loginPage.login(userData);

    //Assert
    await expect(loginPage.userName).toHaveText(userData.name);
  });

  test('Login with too short username', async ({ page }) => {
    await loginPage.loginInput.fill(wrongUserData.login);
    await loginPage.loginInput.blur();

    await expect(loginPage.errorLoginId).toHaveText(
      `${wrongLoginErrorMessage}`,
    );
  });

  test('Login with too short password', async ({ page }) => {
    await loginPage.loginInput.fill(userData.login);
    await loginPage.passwordInput.fill(wrongUserData.password);
    await loginPage.passwordInput.blur();

    await expect(loginPage.errorLoginPassword).toHaveText(
      `${wrongPasswordErrorMessage}`,
    );
  });
});
