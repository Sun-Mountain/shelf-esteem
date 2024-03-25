import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4000');
});

test.describe('Home Page',() => {
  test('should display the title', async ({ page }) => {
    const title = page.locator('h1');
    await expect(title).toHaveText('Shelf Esteem');
  });
});