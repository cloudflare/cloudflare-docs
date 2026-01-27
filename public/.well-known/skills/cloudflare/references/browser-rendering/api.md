## API Quick Reference

### Puppeteer
```typescript
// Browser
puppeteer.launch(env.MYBROWSER, opts?)
puppeteer.connect(env.MYBROWSER, sessionId)
puppeteer.sessions() // List open
puppeteer.history()  // View closed
puppeteer.limits()   // Check quotas

browser.newPage()
browser.close()
browser.createIncognitoBrowserContext()

// Page
page.goto(url)
page.content()
page.screenshot()
page.pdf()
page.evaluate(fn)
page.metrics()
page.setUserAgent(ua)
page.type(selector, text)
page.click(selector)
page.select(selector, value)
```

### Playwright
```typescript
// Browser
launch(env.MYBROWSER, opts?)
connect(env.MYBROWSER, sessionId)
acquire(env.MYBROWSER) // Get new sessionId
playwright.sessions()
playwright.history()
playwright.limits()

browser.newPage()
browser.newContext(opts?)
browser.close()

// Page
page.goto(url)
page.content()
page.screenshot()
page.getByTestId(id)
page.getByPlaceholder(text)
page.locator(selector)
page.fill(selector, value)
page.press(selector, key)

// Context
con