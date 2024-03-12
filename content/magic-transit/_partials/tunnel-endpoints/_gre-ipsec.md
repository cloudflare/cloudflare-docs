---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: productName;;tunnelsPath
---

You can use GRE or IPsec tunnels to onboard your traffic to $1, and set them up via the Cloudflare dashboard or the API. However, if you want to use the API, be sure to have your [account ID](/fundamentals/setup/find-account-and-zone-ids/) and [API key](/fundamentals/api/get-started/keys/#view-your-global-api-key) ready before you begin.

{{<Aside type="note" header="Note">}}IPsec tunnels only support Internet Key Exchange version 2 (IKEv2).{{</Aside>}}

Refer to [Tunnels and encapsulation]($2) to learn more about the technical requirements for GRE and IPsec tunnels used in $1.