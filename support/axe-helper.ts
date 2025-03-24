import AxeBuilder from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';
import { Page } from '@playwright/test';

export class AxeHelper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async generateHtmlReport(disableRules: string[] = [], excludeLocator: string = '') {
    const accessibilityScanResults = await new AxeBuilder({ page: this.page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .options({ iframes: false })
      .disableRules(disableRules)
      .exclude(excludeLocator)
      .analyze();

    const url = this.page.url();
    const domainUrl = url.split('/')[2];
    const unixTimestamp = Math.round(+new Date() / 1000);
    const customSummary = `Test Case: Full Page a11y analysis`;

    createHtmlReport({
      results: accessibilityScanResults,
      options: {
        projectKey: 'MOT 1.0',
        customSummary,
        outputDir: 'axe-core-reports',
        reportFileName: `${domainUrl}-accessibility-report_${unixTimestamp}.html`,
      },
    });

    return accessibilityScanResults;
  }
}
