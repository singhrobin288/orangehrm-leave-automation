# OrangeHRM Leave Automation

Test automation framework for the Leave module of the OrangeHRM open-source demo, built with Playwright, Cucumber, and TypeScript.

## Prerequisites

- Node.js 18 or later
- npm

## Setup

git clone <repo-url>
cd orangehrm-leave-automation
npm install
npx playwright install chromium
cp .env.example .env

## Running the tests

npm test                 # headless
npm run test:headed      # headed

## Reports

After a run:
- HTML report: reports/cucumber-report.html
- JSON report: reports/cucumber-report.json
- On failure: reports/screenshots/ and reports/traces/

To open a failed trace:
npx playwright show-trace reports/traces/<scenario-name>.zip

## Configuration

All config lives in .env (see .env.example for the template).