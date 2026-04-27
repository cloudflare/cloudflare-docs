---
pcx_content_type: troubleshooting
title: Issues with mp4 videos on iOS and Safari
---

When traffic is proxied through Cloudflare, Safari on macOS and iOS devices may fail to load MP4 video files. This issue occurs because Safari handles HTTP range requests differently than other browsers, particularly in how it processes ETags during video streaming. Safari and iOS devices rely on HTTP range requests to support essential video features such as seeking to specific timestamps, adaptive bitrate streaming, and resuming interrupted downloads. When Cloudflare's caching layer processes these range requests with weak ETags, Safari may reject the cached response entirely, resulting in videos that fail to load or display as black screens.

To resolve this issue, two cache rules must be configured in Cloudflare and applied in the exact following order:
First, create a cache rule that applies to all files with the MP4 extension, marks them as eligible for cache, and enables the Respect Strong ETags setting.
Second, create another cache rule that applies to all MP4 files and configures them to bypass cache entirely. 

The order of these rules is critical because the first rule ensures that strong ETags are preserved for MP4 files, which satisfies Safari's requirements for proper range request handling. The second rule then ensures that Cloudflare's cache is bypassed entirely, allowing Safari to communicate directly with the origin server for correct range request negotiation. Together these rules address the root cause while maintaining proper video delivery functionality.
