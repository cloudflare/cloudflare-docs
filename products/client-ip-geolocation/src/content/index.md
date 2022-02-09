---
order: 0
title: Overview
pcx-content-type: overview
---

# Client IP Geolocation

<Aside type="note">

Client IP Geolocation is currently in closed Beta testing.

</Aside>

Cloudflare designed [Cloudflare WARP](https://developers.cloudflare.com/warp-client/) and [1.1.1.1](https://developers.cloudflare.com/1.1.1.1/) to make Internet browsing more private and secure. These applications encrypt last-mile connections and make it more difficult for others to use client IP addresses in user fingerprinting. 

However, unlike legacy VPN applications, we never designed WARP or 1.1.1.1 to hide user locations or allow users to misrepresent their true geographic location. As a web property operator, you can use **Client IP Geolocation** to map Cloudflare egress IP addresses to specific geolocations.

<ButtonGroup>
  <Button type="primary" href="/get-started">Get started</Button>
  <Button type="secondary" href="/about">Learn more</Button>
</ButtonGroup>


<Aside type="note">

Client IP Geolocation is different from the <strong>Cloudflare IP Geolocation</strong> setting in the <strong>Network</strong> app. For more details about Cloudflare IP Geolocation — which helps you capture country codes for visitors — see <a href="https://support.cloudflare.com/hc/articles/200168236">our Support documentation</a>.

</Aside>