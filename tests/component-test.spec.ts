import { test, expect } from '@playwright/test';

test('component test page loads with no console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('/component-test');

  await expect(page.getByRole('heading', { name: 'Component Playground' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('fluid typography scales down at a narrow viewport', async ({ page }) => {
  await page.goto('/component-test');
  const sample = page.locator('p.text-3xl', { hasText: 'The quick brown fox' });

  await page.setViewportSize({ width: 1400, height: 1200 });
  const wideSize = await sample.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));

  await page.setViewportSize({ width: 400, height: 1200 });
  const narrowSize = await sample.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));

  expect(narrowSize).toBeLessThan(wideSize);
});
