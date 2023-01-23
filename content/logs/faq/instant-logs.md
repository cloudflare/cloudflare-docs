---
pcx_content_type: faq
title: Instant Logs
weight: 5
meta:
    description: Review frequently asked questions about Instant Logs.
---

[❮ Back to FAQ](/logs/faq/)

# Instant Logs

## I am getting an HTTP 301 when attempting to connect to my WebSocket. What can I do?

Make sure you are using the `wss://` protocol when connecting to your WebSocket.

## I am getting an HTTP 429. What can I do?

Connection requests are rate limited. Try your request again after waiting a few minutes.

## Why am I not receiving data?

First, double-check if you have a filter defined. If you do, it may be too strict (or incorrect) which ends up dropping all your data.

If you are confident in your filter, check the sample rate you used when creating the session. For example, a sample of 100 means you will receive one log for every 100 requests to your zone.

Finally, make sure the destination is proxied through Cloudflare (also known as orange clouded). We cannot log your request if it does not go through our edge network.

## I am getting an error fetching my data. How can I solve this?

Make sure you have the correct permissions. To use Instant Logs you need Super Administrator, Administrator, Log Share, or Log Share Reader permissions.