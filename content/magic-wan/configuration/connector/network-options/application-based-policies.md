---
pcx_content_type: how-to
title: Application-aware policies
---

# Application-aware policies

In addition to traffic policies based on network-layer attributes like IP and port ranges, the Magic WAN Connector supports the ability to classify traffic based on well-known applications. Application-aware policies provide easier management and more granularity over traffic flows. 

Cloudflare’s implementation of application awareness leverages the intelligence of our global network, using the same categorization/classification already shared across security tools like our [Secure Web Gateway](/cloudflare-one/policies/gateway/), so IT and security teams can expect consistent behavior across routing and inspection decisions.

For more information, refer to [Applications and app types](/cloudflare-one/policies/gateway/application-app-types/).

## Traffic steering

To define how your Magic WAN Connector should steer traffic based on known applications, choose a site and select **Traffic Steering**. Here you can specify how to handle traffic for specific applications and override default network-layer steering decisions.

![Application selector box](/images/magic-wan/connector/application-selector.png)

{{<Aside type="note">}}

Cloudflare’s best practice recommendation is to route all traffic through our global network for comprehensive security filtering and access controls, but there may be specific cases where you want a subset of traffic to bypass Cloudflare’s security filtering and route directly to the Internet. You can scope this breakout traffic to specific applications from the Cloudflare dashboard.

For more information, refer to [Traffic steering](/magic-wan/reference/traffic-steering/).
{{</Aside>}}
