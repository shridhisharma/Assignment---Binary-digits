import { test, expect } from '@playwright/test';

test('Login script - shridhi', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: { username: 'qatester', password: 'qatester' },
  });

  const page = await context.newPage();

  // Navigate to home page
  await page.goto('https://staging-lms-qa.bdpl.com.np/');

  // Click Login
  await page.getByRole('link', { name: 'Login' }).click();

  // Fill login form
  await page.getByRole('textbox', { name: 'Enter your email or username' }).fill('shridhisharma111@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password here...' }).fill('tester');

  // Click Login button
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for dashboard/user menu
  await page.locator('div').filter({ hasText: 'tesster' }).nth(2).waitFor({ state: 'visible', timeout: 15000 });

  console.log('✅ Login successful');

  // Optional: verify Courses link is visible
  const coursesLink = page.getByRole('link', { name: 'Courses' });
  await expect(coursesLink).toBeVisible({ timeout: 10000 });

  await context.close();
});
