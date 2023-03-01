---
source: https://support.cloudflare.com/hc/en-us/articles/206776727-Understanding-the-True-Client-IP-Header
title: Understanding the True-Client-IP Header
                  6 months ago
---

# Understanding the True-Client-IP Header



## Overview

Connections from Cloudflare to origin servers come from Cloudflare IPs. True-Client-IP is a solution that allows Cloudflare users to see the end user’s IP address, even when the traffic to the origin is sent directly from Cloudflare.

For more details on _what_ True-Client-IP is, refer to our [product documentation](https://developers.cloudflare.com/fundamentals/get-started/reference/http-request-headers/#true-client-ip-enterprise-plan-only).

___

To add the `True-Client-IP` header to incoming requests, [enable the **Add “True-Client-IP” header** Managed Transform](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/).

For more information, refer to [Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/) in the developers documentation.
