## Common Use Cases

### 1. Performance Monitoring

Track Core Web Vitals to identify slow-loading elements:

```typescript
// Debug poor LCP scores
// 1. Enable Web Analytics
// 2. Dashboard → Core Web Vitals → LCP section
// 3. Debug View shows top 5 problematic elements
// 4. Use element CSS selector in browser console:
document.querySelector('.hero-image') // Example element
// 5. Optimize identified elements (lazy loading, compression, etc.)
```

### 2. Bot Traffic Filtering

Exclude bots to see real user metrics:

```
Dashboard filters:
- Exclude Bots: Yes
→ Shows human traffic only
```

### 3. Multi-Site Analytics

Track multiple properties under one account:

```
Proxied sites: Unlimited
Non-proxied: Up to 10 sites

View by dimension:
- Site: example.com
- Site: blog.example.com
→ Compare traffic across properties
```

### 4. Geographic Analysis

Understand visitor distribution:

```
Filter by:
- Country: United States
- Device type: Mobile
→ Mobile traffic from US
```

### 5. 