import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { LoginActions } from '../actions/loginActions';
import { LeaveSearchActions } from '../actions/leaveSearchActions';

Given('Alice is logged into OrangeHRM as an administrator', async function (this: CustomWorld) {
  const loginActions = new LoginActions(this.page);
  await loginActions.loginAsAdmin();
});

When('Alice navigates to the Leave List', async function (this: CustomWorld) {
  const leaveSearch = new LeaveSearchActions(this.page);
  await leaveSearch.navigateToLeaveList();
});

When(
  'Alice sets the date range from {string} to {string}',
  async function (this: CustomWorld, fromDate: string, toDate: string) {
    const leaveSearch = new LeaveSearchActions(this.page);
    await leaveSearch.applyDateRange({ from: fromDate, to: toDate });
  },
);

When('Alice searches for scheduled leave', async function (this: CustomWorld) {
  const leaveSearch = new LeaveSearchActions(this.page);
  await leaveSearch.submitSearch();
});

Then('the leave results grid is displayed', async function (this: CustomWorld) {
  const leaveSearch = new LeaveSearchActions(this.page);
  await leaveSearch.verifyResultsGridIsDisplayed();
});

Then('the date range error message is displayed', async function (this: CustomWorld) {
  const leaveSearch = new LeaveSearchActions(this.page);
  await leaveSearch.verifyDateRangeErrorIsShown();
});
