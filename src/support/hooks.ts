import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  Status,
  setDefaultTimeout,
} from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { CustomWorld } from './world';
import { env } from '../config/env';
import * as fs from 'fs';
import * as path from 'path';

setDefaultTimeout(env.defaultTimeout * 4);

let browser: Browser;

BeforeAll(async () => {
  browser = await chromium.launch({ headless: !env.headed });
});

AfterAll(async () => {
  await browser.close();
});

Before(async function (this: CustomWorld) {
  this.browser = browser;
  this.context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
  });
  await this.context.tracing.start({ screenshots: true, snapshots: true });
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(env.defaultTimeout);
});

After(async function (this: CustomWorld, { pickle, result }) {
  const scenarioName = pickle.name.replace(/\s+/g, '-').toLowerCase();

  if (result?.status === Status.FAILED) {
    const screenshotDir = path.join('reports', 'screenshots');
    fs.mkdirSync(screenshotDir, { recursive: true });
    const screenshotPath = path.join(screenshotDir, `${scenarioName}.png`);
    const buffer = await this.page.screenshot({ path: screenshotPath, fullPage: true });
    this.attach(buffer, 'image/png');

    const traceDir = path.join('reports', 'traces');
    fs.mkdirSync(traceDir, { recursive: true });
    await this.context.tracing.stop({ path: path.join(traceDir, `${scenarioName}.zip`) });
  } else {
    await this.context.tracing.stop();
  }

  await this.page.close();
  await this.context.close();
});
