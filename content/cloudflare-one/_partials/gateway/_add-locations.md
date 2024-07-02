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

4. Choose at least one [DNS endpoint](/cloudflare-one/connections/connect-devices/agentless/dns/locations/#dns-endpoints) to resolve your organization's DNS queries.

5. (Optional) Toggle the following settings:

   - **Enable EDNS client subnet** sends a user's IP geolocation to authoritative DNS nameservers. [EDNS client subnet (ECS)](https://en.wikipedia.org/wiki/EDNS_Client_Subnet) helps reduce latency by routing the user to the closest origin server. Cloudflare enables EDNS in a privacy preserving way by not sending the user's exact IP address but rather a `/24` range which contains their IP address.

   - **Set as Default DNS Location** sets this location as the default DoH endpoint for DNS queries.

6. Select **Add location**.
