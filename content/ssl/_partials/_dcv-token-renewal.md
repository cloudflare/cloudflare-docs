---
_build:
  publishResources: false
  render: never
  list: never
---

If possible, DCV tokens for proxied hostnames are always renewed [via HTTP](/ssl/edge-certificates/changing-dcv-method/methods/http/).

However, some certificates — for example, if you are using wildcard certificates or certificates with multiple SANs or your hostname is not proxied — are not eligible for HTTP validation.

If your certificate is not eligible for HTTP validation, you will need to repeat the DCV process with your chosen method.