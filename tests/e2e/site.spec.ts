import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = ['/', '/work/', '/services/', '/training/', '/about/', '/contact/', '/privacy/', '/404/'];
const viewports = [{ width: 375, height: 667 }, { width: 1280, height: 800 }];

for (const route of routes) {
  for (const viewport of viewports) {
    test(`${route} renders without overflow or serious axe findings at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize(viewport);
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator('main h1')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      expect(errors).toEqual([]);
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      expect(axe.violations.filter(({ impact }) => impact === 'critical' || impact === 'serious')).toEqual([]);
    });
  }
}

test('unknown routes render the custom 404 response', async ({ page }) => {
  const response = await page.goto('/path-that-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('This page isn’t here.');
});

test('mobile navigation opens, traps focus, and returns focus after Escape', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  const trigger = page.getByRole('button', { name: 'Open menu' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Site menu' });
  await expect(dialog).toBeVisible();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const menuLinks = dialog.getByRole('link');
  await page.keyboard.press('Tab');
  await expect(menuLinks.first()).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: 'Close menu' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(menuLinks.last()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe('hidden');
});

test('work filters honor a deep link and update the URL when approved work exists', async ({ page }) => {
  await page.goto('/work/');
  const cards = page.locator('.project-card:not([data-draft="true"])');
  const count = await cards.count();
  test.skip(count === 0, 'No approved projects have been supplied yet.');
  const firstCategory = (await cards.first().getAttribute('data-categories'))?.split(' ')[0];
  expect(firstCategory).toBeTruthy();
  await page.goto(`/work/?category=${firstCategory}`);
  await expect(page.locator('.project-card:visible')).not.toHaveCount(0);
  await page.locator(`[data-filter="${firstCategory}"]`).click();
  await expect(page).toHaveURL(new RegExp(`category=${firstCategory}`));
});

test('video facade starts without an iframe and closes back to its poster when approved video exists', async ({ page }) => {
  await page.goto('/work/');
  const playableCard = page.locator('.project-card:not([data-draft="true"])').filter({ has: page.locator('a[href^="/work/"]') });
  const count = await playableCard.count();
  test.skip(count === 0, 'No approved project video has been supplied yet.');
  await playableCard.first().locator('a').click();
  const poster = page.getByRole('button', { name: /^Play / });
  if (await poster.count() === 0) test.skip(true, 'No real video provider and id have been supplied yet.');
  await expect(page.locator('.video-embed iframe')).toHaveCount(0);
  await poster.click();
  await expect(page.locator('.video-dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.video-dialog')).toBeHidden();
  await expect(poster).toBeFocused();
});

test('enquiry errors are announced and valid WhatsApp URLs are built without opening an external page', async ({ page }) => {
  await page.addInitScript(() => {
    window.open = ((url) => { document.body.dataset.openedUrl = String(url); return null; }) as typeof window.open;
  });
  await page.goto('/contact/');
  await page.getByRole('button', { name: 'Continue to WhatsApp' }).click();
  await expect(page.locator('#error-summary')).toBeFocused();
  await expect(page.locator('#name-error')).toContainText('required');
  await page.getByLabel('Your name').fill('Test Person');
  await page.getByLabel('What is your enquiry about?').selectOption({ label: 'Film' });
  await page.getByLabel('Message').fill('Film & edit? 👋\nSecond line');
  await page.getByRole('button', { name: 'Continue to WhatsApp' }).click();
  const openedUrl = await page.locator('body').getAttribute('data-opened-url');
  expect(openedUrl).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
  expect(new URL(openedUrl!).searchParams.get('text')).toContain('Film & edit? 👋\nSecond line');
});

test('published production pages contain no visible draft placeholders', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.getByText('DRAFT PLACEHOLDER: replace before launch')).toHaveCount(0);
  }
});

test('reduced-motion preference disables animated movement', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const motion = await page.locator('a, button').first().evaluate((element) => {
    const style = getComputedStyle(element);
    return { duration: style.transitionDuration, behavior: getComputedStyle(document.documentElement).scrollBehavior };
  });
  expect(motion.duration.split(',').every((duration) => parseFloat(duration) <= 0.001)).toBe(true);
  expect(motion.behavior).toBe('auto');
});
