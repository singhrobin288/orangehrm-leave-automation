import { Page, expect } from '@playwright/test';
import { LeaveListPage } from '../pages/leaveListPage';
import { env } from '../config/env';

export interface DateRange {
  from: string;
  to: string;
}

export class LeaveSearchActions {
  private readonly leaveListPage: LeaveListPage;

  constructor(private readonly page: Page) {
    this.leaveListPage = new LeaveListPage(page);
  }

  async navigateToLeaveList(): Promise<void> {
    await this.leaveListPage.goto(env.baseUrl);
  }

  async applyDateRange(range: DateRange): Promise<void> {
    await this.leaveListPage.setFromDate(range.from);
    await this.leaveListPage.setToDate(range.to);
  }

  async submitSearch(): Promise<void> {
    await this.leaveListPage.clickSearch();
    await this.leaveListPage.waitForSearchToComplete();
  }

  async searchLeaveBetween(range: DateRange): Promise<void> {
    await this.applyDateRange(range);
    await this.submitSearch();
  }

  async verifyResultsGridIsDisplayed(): Promise<void> {
    await expect(this.leaveListPage.resultsHeader).toBeVisible();
  }

  async verifyDateRangeErrorIsShown(): Promise<void>{
    await expect(this.leaveListPage.errorValidationMessage).toBeVisible();
  }
}
