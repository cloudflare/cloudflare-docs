---
_build:
  publishResources: false
  render: never
  list: never
---

The inferred application protocol based on our [detection mechanism](/cloudflare-one/policies/gateway/network-policies/protocol-detection/).

| UI name           | API example                       |
| ----------------- | --------------------------------- |
| Detected Protocol | `net.protocol.detection == "ssh"` |

{{<Aside>}}This selector is only available in early access for Enterprise users. For more information, contact your Cloudflare Customer Success Manager.{{</Aside>}}
