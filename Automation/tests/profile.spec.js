import { test, expect } from '@playwright/test';

// Reusable login function
async function login(page) {
  await page.goto('https://staging-lms-qa.bdpl.com.np/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Enter your email or username' }).fill('shridhisharma111@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password here...' }).fill('tester');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: 'tesster' }).nth(2).waitFor({ state: 'visible', timeout: 15000 });
}

test('LMS Profile Update', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: { username: 'qatester', password: 'qatester' },
  });

  const page = await context.newPage();

  // Step 1: Login
  await login(page);

  // Step 2: Navigate to Profile page
  await page.locator('div').filter({ hasText: 'tesster' }).nth(2).click();
  await page.getByRole('link', { name: 'Profile' }).click();

  // Step 3: Update profile
  await page.getByRole('textbox', { name: 'Your Full Name' }).fill('Tester1');
  await page.getByRole('spinbutton', { name: 'Your Age' }).fill('16');
  await page.getByRole('textbox', { name: 'Your District' }).fill('Banke');
  await page.getByRole('combobox', { name: 'Your Gender' }).selectOption('Female');

  // Step 4: Click Update Changes
  await page.getByRole('button', { name: 'Update Changes' }).click();

  // Step 5: Verify success
  const successMessage = page.locator('text=Profile updated successfully');
  await expect(successMessage).toBeVisible({ timeout: 10000 });

  console.log(' Profile updated successfully');

  await context.close();
});
