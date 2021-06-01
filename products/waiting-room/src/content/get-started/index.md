---
title: Get started
order: 2
pcx-content-type: tutorial
---

# Get started with Cloudflare Waiting Room

---

## Before you begin

Before you start this tutorial, make sure you have:
- Completed the [prerequisites](/about#prerequisites).
- Reviewed your [rate limiting rules](https://developers.cloudflare.com/firewall/cf-rulesets/custom-rules/rate-limiting) to make sure they allow at least one request every ten seconds (required for automatic page refreshes).

---

## 1. Plan out your waiting room

Before you create your waiting room, think about how you want it to appear and operate.

### Location

Which page will you cover with a waiting room? You can only have one waiting room per page, so you need to identify the high-traffic areas of your website.

Specify the URL for your page by setting the `hostname` and `path` in your [configuration settings](/how-to/configuration-settings).

### Access

Do you want visitors to reach your high-traffic page:
- Directly (via URL)
- Indirectly (via a [Page Rule redirect](https://support.cloudflare.com/hc/articles/200172286))

### Appearance (optional)

Some customers can [customize the design](/how-to/customize-waiting-room) of their waiting room by editing the page HTML and CSS.

If you have this ability, think about how you want the page to appear.

## 2. Create your waiting room

Create your waiting room by:
- Using the [dashboard](/how-to/create-via-dashboard).
- Using the [API](/how-to/create-via-api).

## 3. Deploy your waiting room

After you have created your waiting room, you might also want to:
- [Test your waiting room](/how-to/test-waiting-room) before it goes live.
- [Monitor your traffic](/how-to/monitor-waiting-room) in real time.
- [Suspend or force all traffic](/how-to/control-waiting-room) to waiting rooms.
- [Troubleshoot](/troubleshooting) potential issues.