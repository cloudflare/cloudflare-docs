---
title: Usage
order: 1
---

# Usage

Cloudflare Browser Isolation integrates with your existing web browser. Once connected to Cloudflare WARP, open your browser and navigate to any websites you normally use.

Every tab is automatically connected to an Isolated browser running in a nearby Cloudflare data center.

## How to check if a webpage is isolated

The easiest way to check if a webpage is proxied through Cloudflare is by checking for the presence of a Cloudflare Root CA.

In Chrome, click the padlock to the left of your address bar and select "Certificate".

### Normal Browsing

** Non-Cloudflare Root CA **

Non-Cloudflare for Teams root certificate indicates that Cloudflare did not proxy this webpage.
![Non-Cloudflare for Teams Root CA](../static/non-cloudflare-root-ca.png)

** Normal context menu **

Right-click context menu will have all normal options.
![Normal right click menu](../static/non-isolated-browser.png)

### Isolated Browsing

** Cloudflare Root CA **

Cloudflare for Teams + Gateway Intermediate indicates traffic was proxied through Cloudflare Gateway.

![Cloudflare for Teams Root CA](../static/cloudflare-gateway-root-ca.png)

** Simplified context menu **

Right-click context menu be simplified. 

![Simplified right click menu](../static/isolated-browser.png)
