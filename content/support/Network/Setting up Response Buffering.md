---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/206049798-Setting-up-Response-Buffering
title: Setting up Response Buffering
---

# Setting up Response Buffering



## What is response buffering?

By default, Cloudflare **streams** data. This means that each packet is sent as it becomes available. Streaming can improve the delivery of large files.

If your domain sends many small packets, however, it might be faster to **buffer** the file. This approach waits to send the full file until all packets are ready, preventing a client browser from having to re-assemble packets.

___

## Enable Response Buffering (Enterprise only)

To set up response buffering for a domain:

1\. Go to **Network.**

2\. For **Response Buffering**, select **On**.

{{<Aside type="note">}}
Response Buffering is available for all Enterprise customers. To upgrade
to Enterprise, contact the [Cloudflare
team](https://www.cloudflare.com/enterprise-service-request).
{{</Aside>}}
