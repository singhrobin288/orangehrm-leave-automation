Feature: Leave List search
  As an HR administrator
  I want to search for scheduled leave within a date range
  So that I can review upcoming time off across the organisation

  Background:
    Given Alice is logged into OrangeHRM as an administrator

  Scenario: Alice searches for scheduled leave within a date range
    When Alice navigates to the Leave List
    And Alice sets the date range from "2024-01-01" to "2024-31-12"
    And Alice searches for scheduled leave
    Then the leave results grid is displayed

  Scenario: Alice sees a validation error when entering an invalid date range
    When Alice navigates to the Leave List
    And Alice sets the date range from "2025-31-12" to "2024-01-01"
    And Alice searches for scheduled leave
    Then the date range error message is displayed
