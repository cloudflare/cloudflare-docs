---
title: Managed Transforms
pcx-content-type: concept
weight: 1
layout: single
---

# Managed Transforms

Managed Transforms allow you to perform common adjustments to HTTP request and response headers with the click of a button. The available adjustments include:

* Add Bot Protection headers
* Remove headers with the visitor IP address
* Remove the "X-Powered-By" header

For complete list, refer to [Available Managed Transforms](/rules/transform/managed-transforms/reference/).

When you enable a Managed Transform, Cloudflare internally deploys one or more Transform Rules to handle the common configuration you selected. 

{{<Aside type="note">}}
The generated internal Transform Rules will not appear in the Transform Rules list in the Cloudflare dashboard.
{{</Aside>}}

## Next steps

For dashboard and API instructions, refer to [Configure Managed Transforms](/rules/transform/managed-transforms/configure/).
