---
title: Cache by device type
pcx_content_type: reference
weight: 13
---

# Cache by device type

APO cache by device type provides all of the same benefits of Cloudflare's cache while targeting visitors with content appropriate to their device. Cloudflare evaluates the `User-Agent` header in the HTTP request to identify the device type. Cloudflare then identifies each device type with a case insensitive match to the regex below:

- **Mobile**: `(?:phone|windows\s+phone|ipod|blackberry|(?:android|bb\d+|meego|silk|googlebot) .+? mobile|palm|windows\s+ce|opera\ mini|avantgo|mobilesafari|docomo)`
- **Tablet**: `(?:ipad|playbook|(?:android|bb\d+|meego|silk)(?! .+? mobile))`
- **Desktop**: Everything else not matched above.

To enable caching by device type, enable the setting from the Cloudflare dashboard's APO card or from the WordPress plugin version 4.4.0 or later.

Once enabled, Cloudflare sends a `CF-Device-Type` HTTP header to your origin with a value of either `mobile`, `tablet`, `desktop` for every request to specify the visitor’s device type. If your origin responds with the appropriate content for that device type, Cloudflare only caches the resource for that specific device type.

{{<Aside>}}

Changing Cache By Device Type setting will invalidate Cache.

{{</Aside>}}

The Cloudflare for WordPress plugin automatically purges all cache variations for updated pages. If you use any of the plugins listed below, enable cache by device type.

- [WP Touch (Free Version)](https://wordpress.org/plugins/wptouch/)
- [Wp Mobile Detect](https://wordpress.org/plugins/wp-mobile-detect/)
- [WordPress Mobile Pack](https://wordpress.org/plugins/wordpress-mobile-pack/)
- [WP-Mobilizer](https://wordpress.org/plugins/wp-mobilizer/)
- [Device Theme Switcher](https://wordpress.org/plugins/device-theme-switcher/)
- [Easy Social Share Buttons for WordPress](https://codecanyon.net/item/easy-social-share-buttons-for-wordpress/6394476)
- [Jetpack (when mobile theme is activated)](https://jetpack.com/support/mobile-theme/)
