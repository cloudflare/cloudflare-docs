---
pcx_content_type: configuration
title: Protocols per plan
weight: 2
---

# Protocols per plan

On this table, you have information about which protocols are available per plan.

|                               | Free | Pro | Business | Enterprise |
| :---------------------------- | :--: | :-: | :------: | :--------: |
| TCP                           |      |     |          |     ✔      |
| UDP[^1]                       |      |     |          |     ✔      |
| Minecraft[^2]                 |      |  ✔  |    ✔     |     ✔      |
| SSH                           |      |  ✔  |    ✔     |     ✔      |
| RDP                           |      |     |    ✔     |     ✔      |

[^1]: At the moment, Cloudflare does not support packet fragmentation for UDP packets. If packets are too large, they will be dropped.

[^2]: Minecraft Java Edition is supported but Minecraft Bedrock Edition is not supported.

{{<Aside type="note">}}

PAYGO customers have access to all protocols, except for TCP and UDP. There is a limit of one app per protocol.

{{</Aside>}}