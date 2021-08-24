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
- Reviewed your [rate limiting rules](https://developers.cloudflare.com/firewall/cf-rulesets/custom-rules/rate-limiting) to make sure they allow at least one request every 20 seconds (required for automatic page refreshes).

---

## Step 1 — Plan out your waiting room

Before you create your waiting room, think about how you want it to appear and operate.

### Location

Which page will you cover with a waiting room? You can only have one waiting room per page, so you need to identify the high-traffic areas of your website.

Specify the URL for your page by setting the `hostname` and `path` in your [configuration settings](/reference/configuration-settings).

### Access method

You can direct visitors to your high-traffic page:
- Directly (via URL)
- Indirectly (via a [Page Rule redirect](https://support.cloudflare.com/hc/articles/200172286))

### Queue method

When you [activate your waiting room](#step-3--activate-your-waiting-room), choose whether:
- [**All visitors**](#queue-all-visitors) to be queued, in preparation for a product release or other time-based event
- Only [**some visitors**](#queue-some-visitors) to be queued, as traffic reaches the thresholds defined in `Total active users` and `New users per minute`

### Appearance (optional)

Some customers can [customize the design](/how-to/customize-waiting-room) of their waiting room by editing the page HTML and CSS.

If you have this ability, think about how you want the page to appear.

## Step 2 — Create your waiting room

Create your waiting room by:
- Using the [dashboard](/how-to/create-via-dashboard).
- Using the [API](/how-to/create-via-api).

## Step 3 — Activate your waiting room

Depending on your [queue method](#queue-method), you may deploy your waiting room differently.

### Queue some visitors

To queue visitors only when necessary:

1. Go to **Traffic** > **Waiting Rooms**.
1. On a waiting room, set **Enabled** to **On**. 
1. Your waiting room will begin queueing visitors once it reaches the traffic thresholds defined in [`Total active users`](/reference/configuration-settings) and [`New users per minute`](/reference/configuration-settings).

### Queue all visitors

To queue all visitors prior to a time-based offering:

1. Go to **Traffic** > **Waiting Rooms**.
1. On a waiting room:
    1. Set **Enabled** to **On**.
    1. Set **Queue All** to **On**. 
1. Your waiting room will begin queueing all visitors and will not allow any visitors to the path protected by your waiting room. On hover, the waiting room will show the estimated number of users in the queue.
1. To begin allowing visitors to the path protected by your waiting room, set **Queue All** to **Off**.

For more details on waiting room activation (including API parameters), see [Control waiting room traffic](/how-to/control-waiting-room).

## Step 4 — Next steps

After you have created and deployed your first waiting room, you might also want to:
- [Test your waiting room](/how-to/test-waiting-room) before it goes live.
- [Monitor your traffic](/how-to/monitor-waiting-room) in real time.
- [Troubleshoot](/troubleshooting) potential issues.
