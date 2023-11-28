---
title: Overview
pcx_content_type: overview
weight: 1
meta:
  title: Client IP Geolocation
---

# Client IP Geolocation

{{<Aside type="note">}}

Client IP Geolocation is currently in closed Beta testing.

{{</Aside>}}

Cloudflare designed [Cloudflare WARP](/warp-client/) and [1.1.1.1](/1.1.1.1/) to make Internet browsing more private and secure. These applications encrypt last-mile connections and make it more difficult for others to use client IP addresses in user fingerprinting.

However, unlike legacy VPN applications, we never designed WARP or 1.1.1.1 to hide user locations or allow users to misrepresent their true geographic location. As a web property operator, you can use **Client IP Geolocation** to map Cloudflare egress IP addresses to specific geolocations.

{{<button-group>}}
  {{<button type="primary" href="/client-ip-geolocation/get-started/">}}Get started{{</button>}}
  {{<button type="secondary" href="/client-ip-geolocation/about/">}}Learn more{{</button>}}
{{</button-group>}}

{{<Aside type="note">}}

Client IP Geolocation is different from the [Cloudflare IP Geolocation setting](/network/ip-geolocation/), which helps you capture country codes for visitors.

{{</Aside>}}
