import { Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly header: Locator;
  readonly userDropdown: Locator;
  readonly sideMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('.oxd-topbar-header-title');
    this.userDropdown = page.locator('.oxd-userdropdown');
    this.sideMenu = page.locator('.oxd-sidepanel');
  }

  async waitUntilLoaded(): Promise<void> {
    await this.sideMenu.waitFor({ state: 'visible' });
    await this.userDropdown.waitFor({ state: 'visible' });
  }

  async openLeaveModule(): Promise<void> {
    await this.page.getByRole('link', { name: 'Leave' }).click();
  }
}
