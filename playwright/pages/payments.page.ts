import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentsPage {
  private _transferReceiver: Locator;
  private _transferAccount: Locator;
  private _transferAmount: Locator;
  private _transferButton: Locator;
  private _closeButton: Locator;
  private _message: Locator;
  private _sideMenu = new SideMenuComponent(this.page);

  constructor(private page: Page) {
    this._transferReceiver = this.page.getByTestId('transfer_receiver');
    this._transferAccount = this.page.getByTestId('form_account_to');
    this._transferAmount = this.page.getByTestId('form_amount');
    this._transferButton = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    this._closeButton = this.page.getByTestId('close-button');
    this._message = this.page.locator('#show_messages');
  }

  async payment(transferData) {
    await this._transferReceiver.fill(transferData.receiver);
    await this._transferAccount.fill(transferData.account);
    await this._transferAmount.fill(transferData.amount);
    await this._transferButton.click();
    await this._closeButton.click();
  }

  get transferReceiver(): Locator {
    return this._transferReceiver;
  }

  get transferAccount(): Locator {
    return this._transferAccount;
  }

  get transferAmount(): Locator {
    return this._transferAmount;
  }

  get transferButton(): Locator {
    return this._transferButton;
  }

  get closeButton(): Locator {
    return this._closeButton;
  }

  get message(): Locator {
    return this._message;
  }

  get sideMenu(): SideMenuComponent {
    return this._sideMenu;
  }

  // await page.getByTestId('transfer_receiver').fill(transferData.receiver);
  // await page.getByTestId('form_account_to').fill(transferData.account);
  // await page.getByTestId('form_amount').fill(transferData.amount);
  // await page.getByRole('button', { name: 'wykonaj przelew' }).click();
  // await page.getByTestId('close-button').click();
}
