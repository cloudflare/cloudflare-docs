---
_build:
  publishResources: false
  render: never
  list: never
---

On this table, you have information about which protocols are available per plan.

|                               | Free | Pro | Business | Enterprise |
| :---------------------------- | :--: | :-: | :------: | :--------: |
| TCP                           |  No  |  No |     No   |     Yes      |
| UDP[^1]                       |  No  |  No |     No   |     Yes      |
| Minecraft[^2]                 |  No  |  Yes |    Yes  |     Yes      |
| SSH                           |  No  | Yes |    Yes   |     Yes      |
| RDP                           |  No  |  No |    Yes   |     Yes      |

[^1]: At the moment, Cloudflare does not support packet fragmentation for UDP packets. If packets are fragmented, they will be dropped at Cloudflare's edge.

[^2]: Minecraft Java Edition is supported but Minecraft Bedrock Edition is not supported.

{{<Aside type="note">}}

Pro and Business customers have access to all protocols, except for TCP and UDP. For Minecraft, SSH and RDP, there is a limit of one app per protocol.

{{</Aside>}}