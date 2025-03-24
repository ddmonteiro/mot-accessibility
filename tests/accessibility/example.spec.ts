import { test, expect } from '@playwright/test';
import { checkA11y, getViolations, injectAxe } from 'axe-playwright';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dequeuniversity.com/demo/dream');
  await injectAxe(page);
});

test('Simple a11y full analyze', async ({ page }) => {
  await checkA11y(page);
});

test('Check a11y detailed report for the whole page against a WCAG tag version', async ({
  page,
}) => {
  await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: { html: true },
    axeOptions: {
      runOnly: {
        type: 'tag',
        values: ['wcag2a'],
      },
    },
  });
});

test('Check a11y for specific component', async ({ page }) => {
  await checkA11y(page, '.cards', {
    axeOptions: {
      runOnly: {
        type: 'tag',
        values: ['wcag21aa', 'best-practice'],
      },
    },
  });
});

test('Should not have any automatically detectable accessibility issues', async ({ page }) => {
  const violations = await getViolations(page, {
    axeOptions: {
      runOnly: {
        type: 'tag',
        values: ['wcag2a'],
      },
    },
  });

  expect(violations.length, `${violations.length} accessibility violations detected`).toBe(0);
});
