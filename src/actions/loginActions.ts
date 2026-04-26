import { Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { env } from '../config/env';

export interface Credentials {
  username: string;
  password: string;
}

export class LoginActions {
  private readonly loginPage: LoginPage;
  private readonly dashboardPage: DashboardPage;

  constructor(private readonly page: Page) {
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
  }

  async loginAs(credentials: Credentials): Promise<void> {
    await this.loginPage.goto(env.baseUrl);
    await this.loginPage.fillUsername(credentials.username);
    await this.loginPage.fillPassword(credentials.password);
    await this.loginPage.clickSubmit();
    await this.dashboardPage.waitUntilLoaded();
    await expect(this.page).toHaveURL(/dashboard/);
  }

  async loginAsAdmin(): Promise<void> {
    await this.loginAs({
      username: env.adminUsername,
      password: env.adminPassword,
    });
  }
}
