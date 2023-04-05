---
pcx_content_type: concept
title: Browser Isolation
weight: 5
---

# Browser Isolation

Cloudflare Browser Isolation complements the [Secure Web Gateway](/cloudflare-one/policies/filtering/) and [Zero Trust Network Access](/cloudflare-one/connections/connect-apps/) solutions by executing active webpage content in a secure isolated browser. Executing active content remotely from the endpoint protects users from zero-day attacks and malware. In addition to protecting endpoints, Browser Isolation also protects users from phishing attacks by preventing user input on risky websites and controlling data transmission to sensitive web applications.

Remote browsing is invisible to the user who continues to use their browser normally without changing their preferred browser and habits. Every open tab and window is automatically isolated.

## Feature availability

Browser Isolation is available as an add-on to Zero Trust Pay-as-you-go and Enterprise plans.

## Privacy

Cloudflare Browser Isolation is a security product. In order to serve transparent isolated browsing and block web based threats our network decrypts Internet traffic using the [Cloudflare Root CA](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/). Traffic logs are retained as per the [Zero Trust](/cloudflare-one/analytics/) documentation.
