import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';

export interface CustomWorldOptions extends IWorldOptions {
  parameters: { [key: string]: string };
}

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: CustomWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
