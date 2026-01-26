# Cloudflare Zaraz Skill

Expert guidance for Cloudflare Zaraz - server-side tag manager for loading third-party tools at the edge.

## What is Zaraz?

Zaraz offloads third-party scripts (analytics, ads, chat, marketing) to Cloudflare's edge, improving site speed, privacy, and security. Zero client-side performance impact.

## Core Concepts

- **Server-side execution** - Scripts run on Cloudflare, not user's browser
- **Single HTTP request** - All tools loaded via one endpoint
- **Privacy-first** - Control data sent to third parties
- **No client-side JS** - Minimal browser overhead

## Zaraz Dashboard Setup

1. Navigate to domain > Zaraz
2. Click "Start setup"
3. Add tools (Google Analytics, Facebook Pixel, etc.)
4. Configure triggers and actions

## Web API

Zaraz provides `zaraz` object in browser:

### Track Events

```javascript
// Basic event
zaraz.track('button_click');

// Event with properties
zaraz.track('purchase', {
  value: 99.99,
  currency: 'USD',
  item_id: '12345'
});

// E-commerce events
zaraz.track('add_to_cart', {
  product_name: 'Widget',
  price: 29.99,
  quantity: 1
});
```

### Set User Properties

```javascript
zaraz.set('userId', 'user_12345');
zaraz.set('plan', 'premium');
zaraz.set({
  email: '[email protected]',
  country: 'US',
  age: 30
});
```

### E-commerce Tracking

```javascript
// Product view
zaraz.ecommerce('Product Viewed', {
  product_id: 'SKU123',
  name: 'Blue Widget',
  price: 49.99,
  currency: 'USD'
});

// Add to cart
zaraz.ecommerce('Product Added', {
  product_id: 'SKU123',
  quantity: 2,
  price: 49.99
});

// Purchase
zaraz.ecommerce('Order Completed', {
  order_id: 'ORD-789',
  total: 149.98,
  revenue: 149.98,
  shipping: 10.00,
  tax: 12.50,
  currency: 'USD',
  products: [
    { product_id: 'SKU123', quantity: 2, price: 49.99 }
  ]
});
```

## Consent Management

```javascript
// Check consent status
if (zaraz.consent.getAll().analytics) {
  zaraz.track('page_view');
}

// Request consent
zaraz.consent.modal = true; // Show consent modal

// Set consent programmatically
zaraz.consent.setAll({
  analytics: true,
  marketing: false,
  preferences: true
});

// Listen for consent changes
zaraz.consent.addEventListener('consentChanged', () => {
  console.log('Consent updated:', zaraz.consent.getAll());
});
```

## Workers Integration

Access Zaraz data in Workers:

```typescript
export default {
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    
    // Inject Zaraz tracking
    if (url.pathname === '/checkout') {
      const response = await fetch(req);
      const html = await response.text();
      
      const tracking = `
        <script>
          zaraz.track('checkout_started', {
            cart_value: 99.99
          });
        </script>
      `;
      
      const modified = html.replace('</body>', tracking + '</body>');
      return new Response(modified, response);
    }
    
    return fetch(req);
  }
};
```

## Triggers

Configure when tools fire:

### Page Rules

- **Pageview** - On every page load
- **DOM Ready** - When DOM is ready
- **Click** - Element clicks (CSS selector)
- **Form submission** - Form submits
- **Scroll depth** - User scrolls percentage
- **Timer** - After time elapsed
- **Variable match** - Custom conditions

### Example Trigger

```
Trigger: Button Click
Match rule: CSS Selector = .buy-button
Action: Track event "purchase_intent"
```

## Common Tools

### Google Analytics 4

```javascript
// Track page view (automatic)
zaraz.track('pageview');

// Custom event
zaraz.track('sign_up', {
  method: 'email'
});
```

### Facebook Pixel

```javascript
zaraz.track('PageView');
zaraz.track('Purchase', {
  value: 99.99,
  currency: 'USD'
});
```

### Google Ads Conversion

```javascript
zaraz.track('conversion', {
  send_to: 'AW-XXXXXXXXX/YYYYYY',
  value: 1.00,
  currency: 'USD'
});
```

## Custom Managed Components

Build custom tools:

```javascript
// Example: Custom analytics tool
export default class CustomAnalytics {
  async handleEvent(event) {
    const { type, payload } = event;
    
    await fetch('https://analytics.example.com/track', {
      method: 'POST',
      body: JSON.stringify({
        event: type,
        properties: payload,
        timestamp: Date.now()
      })
    });
  }
}
```

## Data Layer

Use `zaraz.dataLayer` for structured data:

```javascript
// Set data layer
window.zaraz.dataLayer = {
  user_id: '12345',
  page_type: 'product',
  category: 'electronics'
};

// Access in triggers
// Variable: {{client.__zarazTrack.page_type}}
```

## Server-Side Configuration

### zaraz.toml

```toml
[settings]
auto_inject = true
debug_mode = false

[[tools]]
type = "google-analytics"
id = "G-XXXXXXXXXX"

[[tools.triggers]]
match_rule = "Pageview"
```

## Privacy Features

1. **IP anonymization** - Automatic
2. **Cookie control** - Consent-based
3. **Data minimization** - Send only necessary data
4. **Regional compliance** - GDPR, CCPA support

## Performance

```javascript
// Zaraz automatically:
// - Batches requests
// - Defers non-critical scripts
// - Proxies third-party requests
// - Caches tool configurations

// Result: ~0ms client-side overhead
```

## Debugging

```javascript
// Enable debug mode in dashboard, then:
zaraz.debug = true;

// View events in console
zaraz.track('test_event', { debug: true });

// Check loaded tools
console.log(zaraz.tools);
```

## Best Practices

1. **Use triggers** instead of inline `zaraz.track()` when possible
2. **Batch events** for related actions
3. **Test with debug mode** before production
4. **Implement consent** for GDPR compliance
5. **Monitor performance** in dashboard analytics
6. **Use data layer** for structured data

## Common Patterns

### SPA Tracking

```javascript
// On route change
router.afterEach((to, from) => {
  zaraz.track('pageview', {
    page_path: to.path,
    page_title: to.meta.title
  });
});
```

### User Identification

```javascript
// On login
zaraz.set('user_id', user.id);
zaraz.set('user_email', user.email);
zaraz.track('login', { method: 'password' });
```

### A/B Testing

```javascript
const variant = Math.random() < 0.5 ? 'A' : 'B';
zaraz.set('ab_test_variant', variant);
zaraz.track('ab_test_view', { variant });
```

## Limits

- **Tools**: Unlimited
- **Events**: Unlimited
- **Data retention**: Per tool's policy
- **Request size**: 100KB per request

## Troubleshooting

### Events not firing

- Check trigger conditions in dashboard
- Verify tool is enabled
- Enable debug mode
- Check browser console for errors

### Consent issues

- Verify consent modal configuration
- Check `zaraz.consent.getAll()` status
- Ensure tools respect consent settings

## Reference

- [Zaraz Docs](https://developers.cloudflare.com/zaraz/)
- [Web API](https://developers.cloudflare.com/zaraz/web-api/)
- [Managed Components](https://developers.cloudflare.com/zaraz/advanced/load-custom-managed-component/)

---

This skill focuses exclusively on Zaraz. For Workers development, see `cloudflare-workers` skill.
