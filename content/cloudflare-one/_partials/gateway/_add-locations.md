---
_build:
  publishResources: false
  render: never
  list: never
---

{{<glossary-definition term_id="DNS location">}}

The fastest way to start filtering DNS queries from a location is by changing the DNS resolvers at the router.

To add a DNS location to Gateway:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Gateway** > **DNS Locations**.

2. Select **Add a location**.

3. Choose a name for your DNS location.

4. Choose at least one DNS endpoint to resolve your organization's DNS queries.

   If you choose **IPv4 DNS**, Cloudflare will prefill the [**Source IPv4 Address**](/cloudflare-one/connections/connect-devices/agentless/dns/locations/dns-resolver-ips/#source-ip) based on the network you are on. Enterprise users have the option of using [dedicated DNS resolver IP addresses](/cloudflare-one/connections/connect-devices/agentless/dns/locations/dns-resolver-ips/#dns-resolver-ip) assigned to their account.

   You do not need to turn on IPv4 resolution if:

   - Your DNS location only uses IPv6.
   - Your users will send all DNS requests from this location using DNS over HTTPS via a browser.
   - You will deploy the [WARP client](/cloudflare-one/connections/connect-devices/warp/).

{{<Aside type="note" header="Your IPv4 address is taken">}}

When trying to configure a DNS location over IPv4, you may run into a **Your source IPv4 address is taken** error.

This may mean someone else in the same network signed up for Cloudflare Gateway before you did. If your network supports IPv6, you can still use Cloudflare Gateway's DNS filtering by sending DNS queries over IPv6. You can also use the DNS over HTTPS hostname to send queries using a DNS over HTTPS client.

If you think someone else is wrongfully using this IPv4 address, [contact Cloudflare support](/support/contacting-cloudflare-support/#getting-help-with-an-issue).

{{</Aside>}}

1. (Optional) Toggle the following settings:

   - **Enable EDNS client subnet** sends a user's IP geolocation to authoritative DNS nameservers. [EDNS client subnet (ECS)](https://en.wikipedia.org/wiki/EDNS_Client_Subnet) helps reduce latency by routing the user to the closest origin server. Cloudflare enables EDNS in a privacy preserving way by not sending the user's exact IP address but rather a `/24` range which contains their IP address.

   - **Set as Default DNS Location** sets this location as the default DoH endpoint for DNS queries.

2. Select **Add location**.
