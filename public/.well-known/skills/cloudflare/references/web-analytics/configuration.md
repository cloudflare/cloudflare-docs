## Setup Methods

### 1. Sites Proxied Through Cloudflare (Automatic)

For sites already on Cloudflare's proxy:

1. **Dashboard setup:**
   - Navigate to Web Analytics in Cloudflare dashboard
   - Click "Add a site"
   - Select hostname from dropdown → "Done"
   - Analytics enabled by default (beacon auto-injected)

2. **Configuration options:**
   - **Enable** - Full auto-injection for all visitors
   - **Enable, excluding visitor data in the EU** - No injection for EU visitors
   - **Enable with JS Snippet installation** - Manual snippet required
   - **Disable** - Turn off analytics

**Important:** If `Cache-Control: public, no-transform` header is set, auto-injection fails. Beacon must be added manually.

### 2. Sites Not Proxied Through Cloudflare (Manual)

For non-proxied sites (limit: 10 sites):

1. Dashboard: Web Analytics → "Add a site"
2. Enter hostname manually → "Done"
3. Copy JS snippet from "Manage site"
4. Add snippet before closing `</body>` tag:

```html
<!-- Cloudflar