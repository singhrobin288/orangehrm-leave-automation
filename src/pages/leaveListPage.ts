import { Locator, Page } from '@playwright/test';

export class LeaveListPage {
  readonly page: Page;
  readonly pageHeading: Locator;
  readonly fromDateInput: Locator;
  readonly toDateInput: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly resultsTable: Locator;
  readonly resultsHeader: Locator;
  readonly recordCount: Locator;
  readonly loader: Locator;
  readonly errorValidationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.getByRole('heading', { name: 'Leave List' });

    const dateInputs = page.locator('.oxd-date-input input');
    this.fromDateInput = dateInputs.nth(0);
    this.toDateInput = dateInputs.nth(1);

    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });

    this.resultsTable = page.locator('.oxd-table');
    this.resultsHeader = page.locator('.oxd-table-header');
    this.recordCount = page.locator('.orangehrm-horizontal-padding .oxd-text--span');
    this.loader = page.locator('.oxd-loading-spinner');

    this.errorValidationMessage = page.getByText('To date should be after from date');
  }

  async goto(baseUrl: string): Promise<void> {
    await this.page.goto(`${baseUrl}/web/index.php/leave/viewLeaveList`);
    await this.pageHeading.waitFor({ state: 'visible' });
  }

  async setFromDate(date: string): Promise<void> {
    await this.fromDateInput.click();
    await this.fromDateInput.fill('');
    await this.fromDateInput.fill(date);
    await this.fromDateInput.press('Escape');
  }

  async setToDate(date: string): Promise<void> {
    await this.toDateInput.click();
    await this.toDateInput.fill('');
    await this.toDateInput.fill(date);
    await this.toDateInput.press('Escape');
  }

  async clickSearch(): Promise<void> {
    await this.searchButton.click();
  }

  async waitForSearchToComplete(): Promise<void> {
    await this.loader.waitFor({ state: 'hidden' }).catch(() => undefined);
    await this.resultsHeader.waitFor({ state: 'visible' });
  }

  async isResultsGridVisible(): Promise<boolean> {
    return this.resultsHeader.isVisible();
  }

  async waitForErrorValidationMessage(): Promise<void> {
    await this.errorValidationMessage.waitFor({state: 'visible'});
  }
}
