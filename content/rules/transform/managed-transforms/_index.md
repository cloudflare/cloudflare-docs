---
title: Managed Transforms
pcx-content-type: concept
weight: 1
layout: single
---

# Managed Transforms

Managed Transforms allow you to perform common adjustments to HTTP request and response headers with the click of a button. The available adjustments include:

* Add bot protection request headers
* Add visitor location request headers
* Remove visitor IP headers
* Add security response headers
* Remove "X-Powered-By" response headers

For a complete list, refer to [Available Managed Transforms](/rules/transform/managed-transforms/reference/).

When you enable a Managed Transform, Cloudflare internally deploys one or more Transform Rules to handle the common configuration you selected. These generated rules will not count against the maximum number of Transform Rules available in your Cloudflare plan.

{{<Aside type="note">}}
The generated internal Transform Rules will not appear in the Transform Rules list in the Cloudflare dashboard.
{{</Aside>}}

## Next steps

For dashboard and API instructions, refer to [Configure Managed Transforms](/rules/transform/managed-transforms/configure/).
