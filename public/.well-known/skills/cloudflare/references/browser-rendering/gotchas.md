## Best Practices

### Always Close Browsers
```typescript
// ❌ BAD - Session stays open until timeout
const browser = await puppeteer.launch(env.MYBROWSER);
const page = await browser.newPage();
await page.goto("https://example.com");
return new Response(await page.content());

// ✅ GOOD - Always use try/finally
const browser = await puppeteer.launch(env.MYBROWSER);
try {
  const page = await browser.newPage();
  await page.goto("https://example.com");
  return new Response(await page.content());
} finally {
  await browser.close(); // Ensures cleanup even on errors
}
```

### Optimize Concurrency
Instead of launching multiple browsers:
- Use multiple tabs in single browser
- Reuse sessions with session IDs
- Use incognito contexts for isolation without new browsers

```typescript
// ❌ BA