import { Locator, Page } from '@playwright/test';
import { getElementType } from '../helpers/functions.helper';

export class DashboardPage {
  private _quickTransferReceiver: Locator;
  private _quickTransferAmount: Locator;
  private _quickTransferTitle: Locator;
  private _quickTransferButton: Locator;
  private _quickTransferCloseButton: Locator;
  private _mobileTopUpReceiver: Locator;
  private _mobileTopUpAmount: Locator;
  private _mobileTopUpAgreement: Locator;
  private _mobileTopUpButton: Locator;
  private _mobileTopUpCloseButton: Locator;

  constructor(private page: Page) {
    this._quickTransferReceiver = this.page.locator(
      '#widget_1_transfer_receiver',
    );
    this._quickTransferAmount = this.page.locator('#widget_1_transfer_amount');
    this._quickTransferTitle = this.page.locator('#widget_1_transfer_title');
    this._quickTransferButton = this.page.getByRole('button', {
      name: 'wykonaj',
    });
    this._quickTransferCloseButton = this.page.getByTestId('close-button');
    this._mobileTopUpReceiver = this.page.locator('#widget_1_topup_receiver');
    this._mobileTopUpAmount = this.page.locator('#widget_1_topup_amount');
    this._mobileTopUpAgreement = this.page.locator('#widget_1_topup_agreement');
    this._mobileTopUpButton = this.page.getByRole('button', {
      name: 'doładuj telefon',
    });
    this._mobileTopUpCloseButton = this.page.getByTestId('close-button');
  }

  async quickTransfer(quickTransferData) {
    await this._quickTransferReceiver.selectOption(quickTransferData.receiver);
    await this._quickTransferAmount.fill(quickTransferData.amount);
    await this._quickTransferTitle.fill(quickTransferData.title);
    await this._quickTransferButton.click();
    await this._quickTransferCloseButton.click();
  }

  async mobileTopUp(topUpData) {
    await this._mobileTopUpReceiver.selectOption(topUpData.phoneNumber);
    const type = await getElementType(this._mobileTopUpAmount);
    if (type == 'text') {
      await this._mobileTopUpAmount.fill(topUpData.amount);
    } else if (type == 'select') {
      await this._mobileTopUpAmount.selectOption(topUpData.amount);
    }
    await this._mobileTopUpAgreement.check();
    await this._mobileTopUpButton.click();
    await this._mobileTopUpCloseButton.click();
  }

  get quickTransferReceiver(): Locator {
    return this._quickTransferReceiver;
  }

  get quickTransferAmount(): Locator {
    return this._quickTransferAmount;
  }

  get quickTransferTitle(): Locator {
    return this._quickTransferTitle;
  }

  get quickTransferButton(): Locator {
    return this._quickTransferButton;
  }

  get quickTransferCloseButton(): Locator {
    return this._quickTransferCloseButton;
  }
}
