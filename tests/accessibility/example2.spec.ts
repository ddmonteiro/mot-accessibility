import { AxeHelper } from '../../support/axe-helper';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dequeuniversity.com/demo/dream');
});

test('should not have any automatically detectable accessibility issues', async ({ page }) => {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

test('generate html report with a11y violations', async ({ page }) => {
  //const disabledRules = ['landmark-unique', 'landmark-no-duplicate-banner', 'heading-order', 'region'];

  const accessibilityScanResults = await new AxeHelper(page).generateHtmlReport();

  expect(accessibilityScanResults.violations.length).toEqual(0);
});
