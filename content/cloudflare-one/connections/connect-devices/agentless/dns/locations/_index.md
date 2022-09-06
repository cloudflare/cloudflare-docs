---
pcx_content_type: how-to
title: Add locations
layout: single
weight: 1
---

# Add locations

Locations are usually physical entities like offices, homes, retail stores, movie theatres, or data centers. The fastest way to start filtering DNS queries from a location is by changing the DNS resolvers at the router.

To add a location to Gateway:

1. On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Gateway** > **Locations**.

2. Select **Add a location**.

3. Choose a name for your location.

4. Enterprise customers can manually enter a **Source IPv4 Address**. You do not need the IPv4 address field if:

    - Your location only uses IPv6.
    - Users will be sending all DNS requests from this location using DNS over HTTPS via a browser.
    - You will be deploying the [WARP client](/cloudflare-one/connections/connect-devices/warp/).

    If any of the above apply to your case, select **Delete**.

{{<Aside type="note" header="Your IPv4 address is taken">}}

When trying to configure a location over IPv4, you may run into a **Your source IPv4 address is taken** error.

This may mean someone else in the same network signed up for Cloudflare Gateway before you did. If your network supports IPv6, you can still use Cloudflare Gateway's DNS filtering by sending DNS queries over IPv6. You can also use the DNS over HTTPS hostname to send queries using a DNS over HTTPS client.

If you think someone else is wrongfully using this IPv4 address, [let us know](https://forms.gle/o9dLMjmCg6QtaDJ88).

{{</Aside>}}

5. (Optional) Toggle the following settings:
    - **Set as Default Location** sets this location as the default in your DNS policy builder.
    - **Enable EDNS client subnet** sends a user's IP geolocation to authoritative DNS name servers.
    
        [EDNS client subnet (ECS)](https://en.wikipedia.org/wiki/EDNS_Client_Subnet) helps reduce latency by routing the user to the closest origin server. Cloudflare has enabled EDNS in a privacy preserving way by not sending the user's exact IP address but rather a /24 range which contains their IP address.

6. Select **Add location**.

7. Change the DNS resolvers on your router, browser, or OS by following the setup instructions in the UI.

    ![DNS resolver setup instructions on the Zero Trust dashboard](/cloudflare-one/static/documentation/policies/location-setup-instructions.png)

8. Select **Done**. Your location will appear under **Gateway** > **Locations**.

You can now apply [DNS policies](/cloudflare-one/policies/filtering/dns-policies/) to your location using the [Location](/cloudflare-one/policies/filtering/dns-policies/#location) selector.

{{<Aside type="warning" header="Warning">}}

Deploying Gateway DNS filtering using static IP addresses may prevent users from connecting to public Wi-Fi networks through captive portals. To avoid this issue, use the [WARP client](/cloudflare-one/connections/connect-devices/warp/) to connect your devices to Cloudflare Zero Trust.

{{</Aside>}}
