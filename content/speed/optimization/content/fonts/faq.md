---
pcx_content_type: faq
title: FAQ
---

# FAQ

In the following sections, you can find frequently asked questions about Performance, Privacy and Security, Implementation and Integration, and Troubleshooting issues.

## Performance

### How does Cloudflare Fonts improve website performance?

By serving fonts from your own domain through Cloudflare's optimized infrastructure, Cloudflare Fonts reduces DNS lookups, TLS connection setups and latency. This leads to faster page load times, enhancing the overall performance of your website.

## Privacy and Security

### Does Cloudflare Fonts collect or log user data?

No, Cloudflare Fonts does not collect or log user data during the font delivery process. Cloudflare is committed to a [privacy-first](https://www.cloudflare.com/privacypolicy/) approach, ensuring that your users' data remains confidential.

## Implementation and Integration

### Do I need to host my font files separately when using Cloudflare Fonts?

No, Cloudflare Fonts simplifies the font delivery process. You do not need to host font files separately. The service works by rewriting webpage’s HTML. It removes Google Fonts links and replaces them with inline CSS.

### Are there any code changes required to use Cloudflare Fonts?

Cloudflare Fonts is designed for a hassle-free integration. Enable Cloudflare Fonts and let Cloudflare take care of the rest.

### Can I see analytics of font files served via Cloudflare Fonts?
Yes, as Cloudflare will be serving these fonts via your zone, analytics will appear within your Cloudflare dashboard. This allows you to analyze requests for font files that you would not have otherwise seen without Cloudflare Fonts.

### What path are Cloudflare Fonts requests made to?
Font requests will be made to your origin with the `/cf-fonts/` path prefix.

### What other transformations are made?

Preconnect headers for Google Fonts domains will be stripped from the HTML response body. This will improve performance by removing unnecessary connections.
