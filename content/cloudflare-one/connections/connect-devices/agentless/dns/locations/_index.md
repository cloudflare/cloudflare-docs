---
pcx_content_type: how-to
title: Add locations
layout: single
weight: 1
---

# Add locations

{{<render file="gateway/_add-locations.md">}}

7. Change the DNS resolvers on your router, browser, or OS by following the setup instructions in the UI.

   ![DNS resolver setup instructions in Zero Trust](/images/cloudflare-one/policies/location-setup-instructions.png)

8. Select **Done**. Your location will appear under **Gateway** > **DNS Locations**.

You can now apply [DNS policies](/cloudflare-one/policies/gateway/dns-policies/) to your location using the [DNS Location](/cloudflare-one/policies/gateway/dns-policies/#dns-location) selector.

{{<render file="gateway/_add-locations-static-ip-warning.md">}}
