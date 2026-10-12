const { chromium } = require('C:/Users/nadim/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core')

;(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Users/nadim/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe',
  })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle' })
  await page.getByLabel('Email').fill(process.env.CREDITTEAM_CAPTURE_EMAIL)
  await page.locator('#login-password').fill(process.env.CREDITTEAM_CAPTURE_PASSWORD)
  await page.getByRole('button', { name: 'Sign In' }).click()
  await page.waitForURL(/tenant-admin\/home/)
  await page.goto('http://localhost:5173/tenant-admin/deals', { waitUntil: 'networkidle' })
  const privateAccount = page.getByRole('button', { name: /Uday Shimpi/ })
  await page.getByText('7 deals across the portfolio').waitFor()
  await page.screenshot({ path: 'public/product/deals-portfolio-current.png', mask: [privateAccount], maskColor: '#0b1c31' })
  await page.getByText('HYPERION TECH', { exact: true }).click()
  await page.waitForURL(/deals\/deal_/)
  await page.getByText('Needs a Decision').first().waitFor()
  await page.screenshot({ path: 'public/product/deal-documents-current.png', mask: [privateAccount], maskColor: '#0b1c31' })
  await page.getByRole('button', { name: 'Overview' }).click()
  await page.waitForTimeout(1800)
  await page.screenshot({ path: 'public/product/deal-overview-current.png', mask: [privateAccount], maskColor: '#0b1c31' })
  await browser.close()
})().catch((error) => { console.error(error.message); process.exit(1) })
