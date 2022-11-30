---
pcx_content_type: get-started
title: Get started
weight: 2
layout: single
---

# Get started

---

## Before you begin

Before you start this tutorial, make sure you have:

- Completed the [prerequisites](/waiting-room/#prerequisites).
- Reviewed your [rate limiting rules](/waf/rate-limiting-rules/) to make sure they allow at least one request every 20 seconds (required for automatic page refreshes).

---

## Step 1 — Plan out your waiting room

Before you create your waiting room, think about how you want it to appear and operate.

### Location

Which page will you cover with a waiting room? You can only have one waiting room per page, so you need to identify the high-traffic areas of your website.

Specify the URL for your page by setting the `hostname` and `path` in your [configuration settings](/waiting-room/reference/configuration-settings/).

### Access method

You can direct visitors to your high-traffic page:

- Directly (via URL)
- Indirectly (via [a redirect](/rules/url-forwarding/bulk-redirects/))

### Queue activation

When you [activate your waiting room](#step-3--activate-your-waiting-room), choose whether:

- [**All visitors**](#queue-all-visitors) to be queued, in preparation for a product release or other time-based event
- Only [**some visitors**](#queue-some-visitors) to be queued, as traffic reaches the thresholds defined in `Total active users` and `New users per minute`

## Step 2 — Create your waiting room

Create your waiting room by:

- Using the [dashboard](/waiting-room/how-to/create-waiting-room/#create-a-waiting-room-from-the-dashboard/).
- Using the [API](/waiting-room/how-to/create-waiting-room/#create-a-waiting-room-via-the-api/).

### Appearance (optional)

Some customers can [customize the design](/waiting-room/how-to/customize-waiting-room/) of their waiting room by editing the page's HTML and CSS.

If you have this ability, think about how you want the page to appear.

### Prepare your waiting room for mobile application traffic

If you need to manage traffic in a non-browser environment such as a mobile app or web app, use a [JSON-friendly waiting room](/waiting-room/how-to/json-response/) that can be consumed via your API endpoints. Please note that if you have a mobile app or web app that depends on resources that would be protected by a waiting room, you will need to update those clients to handle Waiting Room appropriately.

## Step 3 — Activate your waiting room

Depending on your [queue activation](#queue-activation), you may deploy your waiting room differently.

### Queue some visitors

{{<render file="_queue-some.md">}}

### Queue all visitors

{{<render file="_queue-all.md">}}

## Step 4 — Next steps

After you have created and deployed your first waiting room, you might also want to:

- [Test your waiting room](/waiting-room/additional-options/test-waiting-room/) before it goes live.
- [Monitor your traffic](/waiting-room/how-to/monitor-waiting-room/) in real time.
- [Troubleshoot](https://support.cloudflare.com/hc/articles/360061431012) potential issues.
