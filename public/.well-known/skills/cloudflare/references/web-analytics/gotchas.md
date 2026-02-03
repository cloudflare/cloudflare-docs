## Troubleshooting

### Beacon Not Loading

**Issue:** Script not appearing on page

**Solutions:**
1. Check `Cache-Control` header - remove `no-transform` if present
2. Verify beacon placement before `</body>`
3. Check CSP (Content Security Policy) allows `static.cloudflareinsights.com`
4. For proxied sites: Ensure auto-injection enabled in dashboard

**CSP Fix:**
```html
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com;">
```

### No Data Appearing

**Issue:** Dashboard shows no analytics

**Solutions:**
1. Wait 5-10 minutes after setup (data ingestion delay)
2. Verify token is correct in `data-cf-beacon`
3. Check browser console for beacon errors
4. Confirm site has real traffic (test by visiting pages)
5.