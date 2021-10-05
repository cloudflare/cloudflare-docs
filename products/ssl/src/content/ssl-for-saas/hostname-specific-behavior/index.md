---
order: 3
pcx-content-type: navigation
---

import CustomOriginDefinition from "../../_partials/_custom-origin-server-definition.md"

# Hostname specific behavior

When you want to customize the behavior for specific custom hostnames, explore the following options:

- For less than 125 hostnames:

     - [**Page Rules**](https://support.cloudflare.com/hc/articles/218411427): Set custom behavior per hostname or path, such as modiying cache behavior or setting higher security levels.
     - [**Rate Limiting**](https://support.cloudflare.com/hc/articles/115001635128): Set up rate limiting rules to match custom hostnames on a per-path or per-hostname basis.

- For more than 125 hostnames:

     - [**Custom metadata**](custom-metadata): Configure additional settings for custom hostnames using Cloudflare Workers to define per-hostname behavior.
     - **Enforce specific protocols**: Using a [PATCH request](https://api.cloudflare.com/#custom-hostname-for-a-zone-edit-custom-hostname), you can enforce a minimum TLS version and enable TLS 1.3 and HTTP/2.
     - [**Custom origin servers**](custom-origin): <CustomOriginDefinition/>