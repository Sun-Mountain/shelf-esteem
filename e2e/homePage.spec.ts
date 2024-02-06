import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Home Page',() => {
  test('should display the title', async ({ page }) => {
    const title = page.locator('h1');
    await expect(title).toHaveText('Welcome to Shelf Esteem!');
  });
  // test('should display the sign up and sign in buttons', async ({ page }) => {
  //   const signUpButton = page.getByTestId('sign-up')
  //   await expect(signUpButton).toHaveText('Sign Up Here');
  //   const signInButton = page.getByTestId('sign-in');
  //   await expect(signInButton).toHaveText('Sign In Here');
  // });
});