---
pcx_content_type: concept
title: Application-aware policies
---

# Application-aware policies

In addition to traffic policies based on network-layer attributes like IP and port ranges, the Magic WAN Connector supports the ability to classify traffic based on well-known applications. Application-aware policies provide easier management and more granularity over traffic flows.

Cloudflare’s implementation of application awareness leverages the intelligence of our global network, using the same categorization/classification already shared across security tools like our [Secure Web Gateway](/cloudflare-one/policies/gateway/), so IT and security teams can expect consistent behavior across routing and inspection decisions.

For more information, refer to [Applications and app types](/cloudflare-one/policies/gateway/application-app-types/).

Magic WAN Connector's ability to classify traffic allows you to define which applications should bypass Cloudflare’s security filtering, and go directly to the Internet. You can also give some applications a higher priority, and Connector will process them first. This is useful when your network is at capacity, for example.

Refer to the following pages for more information.

{{<directory-listing showDescriptions="true">}}