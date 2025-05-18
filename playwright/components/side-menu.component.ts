import { Page } from '@playwright/test';

export class SideMenuComponent {
  constructor(private page: Page) {}

  async gotoPayments(page: Page) {
    await page.getByRole('link', { name: 'płatności' }).click();
  }
}
