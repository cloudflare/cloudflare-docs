---
order: 3
pcx-content-type: faq
---

# FAQ

<Aside type="note">

Client IP Geolocation is currently in closed Beta testing.

</Aside>

## Website operators

### What does this functionality mean for me as a website operator? 

If you operate a website or ISP that needs to use IP address geolocation information for geographic content restriction, consider allowing IP addresses associated with a VPN. 

You can now restrict content delivery to Cloudflare VPN users using the same client IP geolocation mechanisms used for non-VPN users. 

### How does the above scenario change if I use Cloudflare to secure my infrastructure?
There is significant cross pollination between Cloudflare forward- and reverse-proxy services. When a user connects through Cloudflare proxies to origin infrastructure protected by Cloudflare security tools, our origin-facing tools automatically consume information from our user-facing systems about client geography, IP reputation, and other client metadata. This process happens in a privacy-preserving manner that reduces unnecessary collection of personally identifiable information while ensuring customers can maintain their desired security posture.

Cloudflare firewall rules specifying country- or region-level match criteria will match correctly on users passing through our VPN and forward-proxy systems with no action needed from you.

### In the example, what happens when Cloudflare’s Minneapolis data center is removed from service for maintenance?

The [example scenario](/about#example-scenario) still provides accurate geolocation data.

Geography-specific egress IPs are not tightly coupled to physical Cloudflare network locations. We continue using geography-specific egress IPs even if the geographically closest network location or locations are rerouted.

### What happens when a user nests or chains VPNs and connects to Cloudflare through a downstream proxy service?
Cloudflare will make best efforts to identify such circumstances and communicate this information upstream to origins. Client IPs will geolocate as `unknown` when the entity that made the initial connection to Cloudflare appears to have originated from an open-proxy service or we are unsure of the location of the user.

### I want greater geographic detail on egress locations. Can you provide it?

Yes! We can provide much finer granularity for origins reachable over IPv6. We encourage adoption of IPv6 for the good of the Internet, as well as for providing much finer detail on user locations to origin operators.

### What incentives does Cloudflare have to ensure location information is accurate?

Cloudflare wants those using our consumer VPN and corporate forward-proxy services to have as smooth an experience as possible. We want our users to have uninterrupted browsing experiences. At the same time, we also want to give origin operators the information they need to distribute the right content to the right users at the right times.

## Cloudflare VPN users

### What does this mean for me as a Cloudflare VPN user?

If you use [Cloudflare WARP](https://developers.cloudflare.com/warp-client/) or [1.1.1.1](https://developers.cloudflare.com/1.1.1.1/), geolocation improves your user experience. Because we communicate your geographic location accurately (but still in a non-identifiable way), you should have accurate, geography-specific experiences and uninterrupted access to the content you are licensed to consume in your local geography.

We also maintain all of our [privacy commitments](https://www.cloudflare.com/trust-hub/privacy-and-data-protection/) regarding your use of our consumer application and will keep your Internet browsing private and secure. 

### What if I am a user and want to spoof my location?

Cloudflare does not permit or support the spoofing of location and will never offer such functionality in the future.
