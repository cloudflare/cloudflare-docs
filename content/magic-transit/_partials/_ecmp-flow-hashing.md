---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="note" header="Note:">}}

Packets in the same flow use the same tunnel unless the tunnel priority changes. Packets for different flows can use different tunnels depending on which tunnel the flow's 4-tuple – source and destination IP and source and destination port – hash to.
  
{{</Aside>}}  
