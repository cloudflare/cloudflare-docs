---
pcx_content_type: how-to
title: Create custom hostnames
weight: 1
meta:
    description: Learn how to create custom hostnames.
---

# Create custom hostnames

There are several required steps before a custom hostname can become active. For more details, refer to our [Get started guide](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/).

To create a custom hostname:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

{{<render file="_create-custom-hostname.md">}}

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="_create-custom-hostname-api.md">}}

{{</tab>}}
{{</tabs>}}

{{<Aside type="note">}}

{{<render file="_issue-certs-preamble.md">}}

{{</Aside>}}

{{<Aside type="note">}}

The Minimum TLS Version for a Custom Hostnames defaults to 1.0, not to the zone Minimum TLS Version!
You can set a higher Minimum TLS Version when creating the Custom Hostname, or you can edit it afterward.

{{</Aside>}}
