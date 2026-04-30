---
title: Issues with mp4 videos on iOS and Safari
pcx_content_type: troubleshooting
products:
  - cache
description: Resolving mp4 videos not playing on iOS and Safari by creating 2 cache rules
tags:
  - video
  - mp4
  - ios
  - safari
sidebar:
  order: 2
---

import { Render, DashButton } from "~/components";

When traffic is proxied through Cloudflare, Safari on macOS and iOS devices may fail to load MP4 video files. 
This issue occurs because Safari handles HTTP range requests differently than other browsers, particularly in how it processes ETags during video streaming. 
Safari and iOS devices rely on HTTP range requests to support essential video features such as seeking to specific timestamps, adaptive bitrate streaming, and resuming interrupted downloads. 
When Cloudflare's caching layer processes these range requests with weak ETags, Safari may reject the cached response entirely, resulting in videos that fail to load or display as black screens.

To resolve this issue, two cache rules must be configured in Cloudflare and applied in the exact following order:
 - First, create a [cache rule](/cache/how-to/cache-rules/create-dashboard/) that applies to all files with the MP4 extension, marks them as eligible for cache, and enables the Respect Strong ETags setting:
1. In the Cloudflare dashboard, go to the **Cache Rules** page.

   <DashButton url="/?to=/:account/:zone/caching/cache-rules" />

2.  Select **Create rule** > **Cache rules** 
3.  Enter a descriptive name for the rule in **Rule name**.
4.  In the `When incoming requests match…` section create a filter that will apply to all MP4 files, like `URI Full` `Widcard` `*.mp4`.
5.  Then select **Eligible for cache** in the `Cache eligibility` section.
6.  Click **+ Add Setting** for `Respect strong ETags` enable the toggle.
7.  Select **Last** as `Place at`.

 - Second, create another cache rule that applies to all MP4 files and configures them to bypass cache entirely.
1. In the Cloudflare dashboard, go to the **Cache Rules** page.

   <DashButton url="/?to=/:account/:zone/caching/cache-rules" />

2.  Select **Create rule** > **Cache rules** 
3.  Enter a descriptive name for the rule in **Rule name**.
4.  In the `When incoming requests match…` section create the exact same filter, that will apply to all MP4 files, like `URI Full` `Widcard` `*.mp4`.
5.  Then select **Bypass cache** in the `Cache eligibility` section.
7.  Select **Last** as `Place at`.

The order of these rules is critical because the first rule ensures that strong ETags are preserved for MP4 files, which satisfies Safari's requirements for proper range request handling.
The second rule then ensures that Cloudflare's cache is bypassed entirely, allowing Safari to communicate directly with the origin server for correct range request negotiation.
The first rule created here needs to be above the second one in the Cache Rules overview.

Together these rules address the root cause while maintaining proper video delivery functionality.
