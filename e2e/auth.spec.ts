import { test, expect, type Page } from '@playwright/test';
import { NextResponse } from 'next/server';
import exp from 'constants';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('User Registration',() => {
  test.describe('successful', () => {
    test('should redirect to sign in page after registration', async ({ page }) => {
      await page.route('**/api/user', (route) => {
        console.log('Intercepted request:', route.request().url());
    
        // Replace the response with the modified data
        route.fulfill(
          { status: 200, ok: true }
        );
      });
  
      const signUpButton = page.getByTestId('sign-up')
      await expect(signUpButton).toHaveText('Sign Up Here');
      signUpButton.click();
      const title = page.locator('h1');
      await expect(title).toHaveText('Register');
  
      await page.getByTestId('username-field').fill('hook');
      await page.getByTestId('email-field').fill('hook@gmail.com');
      await page.getByTestId('password-field').fill('password');
      await page.getByTestId('confirm-password-field').fill('password');
      await page.getByTestId('submit-button').click();
  
      await page.waitForLoadState('networkidle')
      await page.waitForURL('**/sign-in');
  
      const signInTitle = page.locator('h1');
      await expect(signInTitle).toHaveText('Sign In');
    });
  })

  test.describe('unsuccessful', () => {
    test('should not redirect to sign in page after registration', async ({ page }) => {
      await page.route('**/api/user', (route) => {
        console.log('Intercepted request:', route.request().url());
    
        // Replace the response with the modified data
        route.fulfill(
          { status: 409 }
        );
      });
  
      const signUpButton = page.getByTestId('sign-up')
      await expect(signUpButton).toHaveText('Sign Up Here');
      signUpButton.click();
      const title1 = page.locator('h1');
      await expect(title1).toHaveText('Register');
  
      await page.getByTestId('username-field').fill('hook');
      await page.getByTestId('email-field').fill('hook@gmail.com');
      await page.getByTestId('password-field').fill('password');
      await page.getByTestId('confirm-password-field').fill('password');
      await page.getByTestId('submit-button').click();
      await page.waitForLoadState('networkidle')
      const title2 = page.locator('h1');
      await expect(title2).toHaveText('Register');
    });
  });
});