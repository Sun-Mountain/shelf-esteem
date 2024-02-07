import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Home Page',() => {
  test('should display the sign up and sign in buttons', async ({ page }) => {
    await page.route('**/api/user', (route) => {
      const request = route.request();
      const url = request.url();
      console.log(request);
      console.log(url);

      route.abort();
    });

    const signUpButton = page.getByTestId('sign-up')
    await expect(signUpButton).toHaveText('Sign Up Here');
    signUpButton.click();
    const title = page.locator('h1');
    await expect(title).toHaveText('Register');

    const usernameField = page.getByTestId('username-field');
    usernameField.fill('CaptainHook');
    const emailField = page.getByTestId('email-field');
    emailField.fill('hook@gmail.com');
    const passwordField = page.getByTestId('password-field');
    passwordField.fill('password');
    const confirmPasswordField = page.getByTestId('confirm-password-field');
    confirmPasswordField.fill('password');
    const submitButton = page.getByTestId('submit-button');
  });
});