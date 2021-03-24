---
title: JavaScript detections
order: 4
type: overview
---
# JavaScript detections for bots

## Overview

Cloudflare's bot products include JavaScript detections via a lightweight, invisible code injection that honors Cloudflare’s [strict privacy standards](https://www.cloudflare.com/privacypolicy/). A small amount of JavaScript is injected into client devices using [Google’s Picasso fingerprinting technique](https://research.google/pubs/pub45581/). Picasso results are factored into bot scores and help Cloudflare classify traffic as automated or human. No personally-identifiable information is gathered in this process.

This detection technique gathers general data about the machines reaching Cloudflare. For example, Cloudflare might learn that a particular user is accessing Cloudflare via Google Chrome on a MacBook Pro. Because there are millions of people using Google Chrome on a MacBook Pro, we cannot identify specific individuals.

JavaScript is only injected in response to requests for HTML pages or page views, excluding AJAX calls. API & mobile app traffic is unaffected.  Additionally, code is not injected again until its 30-minute session life expires. The Picasso script is about 70KB and execution time varies per device from 90ms to around 500ms in old devices.

## Enable JavaScript detections

To enable JavaScript detections, go to **Firewall** > **Bots**. 

For more details on how to set up bot protection, see [Get started](../get-started).

## Considerations

### If you enabled Bot Management before June 2020

Customers who enabled Enterprise Bot Management before June 2020, do not have JavaScript detections enabled by default (unless this was specifically requested during the initial trial period). These customers can still enable the feature in the Cloudflare dashboard.

### Optional for some plans

For Free customers (Bot Fight Mode), JavaScript detections are automatically enabled and cannot be disabled.

For all other customers (Super Bot Fight Mode and Bot Management for Enterprise), JavaScript detections are optional. To adjust your settings, go to **Firewall** > **Bots**.

### If you have a Content Security Policy (CSP)

If you have a Content Security Policy (CSP):
- Ensure that it does not block scripts served from `/cdn-cgi/bm/` or requests made to `/cdn-cgi/bm/results`. Your CSP should allow scripts served from your origin domain (`script-src self`).
- If your CSP uses a `nonce` for script tags, Cloudflare will add these nonces to the scripts it injects by parsing your CSP response header.