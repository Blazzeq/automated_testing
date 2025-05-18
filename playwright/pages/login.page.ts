import { Locator, Page } from '@playwright/test';

export class LoginPage {
  private loginInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(private page: Page) {
    this.loginInput = this.page.getByTestId('login-input');
    this.passwordInput = this.page.getByTestId('password-input');
    this.loginButton = this.page.getByTestId('login-button');
  }

  async login(userData) {
    await this.loginInput.fill(userData.login);
    await this.passwordInput.fill(userData.password);
    await this.loginButton.click();
  }
}
