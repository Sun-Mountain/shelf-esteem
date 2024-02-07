import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Home Page',() => {
  test('should display the sign up and sign in buttons', async ({ page }) => {
    const signUpButton = page.getByTestId('sign-up')
    await expect(signUpButton).toHaveText('Sign Up Here');
    signUpButton.click();
    await page.route('**/*', (route) => {
      const request = route.request();
      const url = request.url();

      // Check if the request URL matches image types
      // if (url.match(/\.(png|jpg|jpeg|svg)$/i)) {
      //   console.log(`Aborting request for ${url}`);
      //   route.abort(); // Abort the request if the URL matches image types
      //   console.log(`Request aborted for ${url}`);
      // } else {
      //   route.continue();
      // }
    });
  });
});