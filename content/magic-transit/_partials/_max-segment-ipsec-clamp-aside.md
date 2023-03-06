---
_build:
  publishResources: false
  render: never
  list: never
---
{{<Aside type="warning" header="Important">}}

If you are using IPsec inside GRE, set the MSS clamp at the IPsec tunnel interface and subtract 24 bytes from your current MSS value, which may be 1360 bytes or lower. This is because the physical interface will see IPsec-encrypted packets, not TCP packets, and MSS clamping will not apply to those.

{{</Aside>}}