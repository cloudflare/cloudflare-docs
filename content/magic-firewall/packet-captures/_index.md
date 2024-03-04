---
title: Packet captures
pcx_content_type: navigation
weight: 5
---

# Packet captures

Cloudflare supports two types of packet captures: full, and sampled. Full packet captures is the default behavior.

## Sampled packet capture

Sampled packet captures collects historical data on network traffic that has already passed through Cloudflare's network. It will not collect any new traffic sent to Cloudflare's network after the packet capture has started. All sampled packet captures will complete immediately after they are started because they query historical traffic data.

Sampled packet captures can be viewed in the Cloudflare dashboard. They only inlcude the first 160 bytes of data. This is useful for capturing packet headers, but will not provide detailed packet data. The sampled data is collected across all Cloudflare's data centers to build a PCAP file. This allows you to get a global picture of traffic across all data centers.

Customers should use full packet captures if they need to collect data on packets that pass through their network  less frequently.


## Full packet captures

Full packet captures will actively monitor Cloudflare's network for packets that match the selected filters, and will capture the matching packet data. The matching packet data is saved to a cloud storage bucket that is owned and configured by the customer.

Full packet captures will collect new traffic sent to Cloudflare's network after the packet capture has started, and include the full packet data. This type of capture cannot be viewed in the Cloudflare dashboard. Customers can download them from a cloud storage bucket and analyze them in Wireshark or another packet capture tool.

Refer to the articles in this section to learn how to use packet captures.

{{<directory-listing>}}