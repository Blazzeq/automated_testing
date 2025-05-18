import { Locator, Page } from '@playwright/test';
import { userData } from '../test-data/login.data';

export class LoginPage {
  private _loginInput: Locator;
  private _passwordInput: Locator;
  private _loginButton: Locator;
  private _errorLoginId: Locator;
  private _errorLoginPassword: Locator;

  constructor(private page: Page) {
    this._loginInput = this.page.getByTestId('login-input');
    this._passwordInput = this.page.getByTestId('password-input');
    this._loginButton = this.page.getByTestId('login-button');
    this._errorLoginId = this.page.getByTestId('error-login-id');
    this._errorLoginPassword = this.page.getByTestId('error-login-password');
  }

  async login(userData) {
    await this._loginInput.fill(userData.login);
    await this._passwordInput.fill(userData.password);
    await this._loginButton.click();
  }

  get loginInput(): Locator {
    return this._loginInput;
  }

  get passwordInput(): Locator {
    return this._passwordInput;
  }

  get loginButton(): Locator {
    return this._loginButton;
  }

  get errorLoginId(): Locator {
    return this._errorLoginId;
  }

  get errorLoginPassword(): Locator {
    return this._errorLoginPassword;
  }
}
