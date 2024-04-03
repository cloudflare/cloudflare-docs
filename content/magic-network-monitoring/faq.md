---
pcx_content_type: faq
title: FAQ
structured_data: true
weight: 11
---

# FAQ

{{<faq-item>}}
{{<faq-question level=2 text="I have Auto-Advertisement enabled and it was triggered by an attack. Do I have to turn Magic Transit off manually?" >}}

{{<faq-answer>}}

Once Auto-Advertisement is activated for an IP prefix that is under attack, the IP prefix will continue to be advertised by Cloudflare even if the attack ends. You will then need to manually disable advertisement for that IP prefix. Refer to [Configure dynamic advertisement](/byoip/concepts/dynamic-advertisement/best-practices/#configure-dynamic-advertisement) to learn how to withdraw your prefixes, and stop using Magic Transit.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="If Auto-Advertisement is enabled, and the threshold has been triggered, will the IP prefix show as advertised in the dashboard?" >}}

{{<faq-answer>}}

Yes, the IP prefix will show as advertised under the [IP Prefixes tab](/byoip/concepts/dynamic-advertisement/best-practices/#configure-dynamic-advertisement).

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Does Auto-advertisement also work with BGP-controlled advertisements?" >}}

{{<faq-answer>}}

No. Auto-advertisement only works with API-controlled advertisement, not BGP-controlled advertisement.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="In the API, Magic Network Monitoring rules have a `bandwidth_threshold` data field. Does the value for this field refer to bytes transferred or current throughput?" >}}

{{<faq-answer>}}

The threshold for a [Magic Network Monitoring (MNM) rule](/api/operations/magic-network-monitoring-rules-list-rules) has two values. The first value is `bandwidth_threshold`. This value is a measure of the total ingress throughput on a network at any given moment. The second value is `duration`. The `duration`value refers to the amount of time that `bandwidth_threshold` must be exceeded before an alert is sent to the customer.

For example, you create a MNM rule with the following parameters:

```txt
"bandwidth_threshold": 50000000
"duration": "1m0s"
```

With this rule, your network needs to receive a throughput greater than 50,000,000 bits per second (50 Gigabits per second or Gbps) for 60 seconds. If both of these conditions are met, then MNM will send you an alert.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="My router's public IP address is different from the IP address of my network flow `agent-ip`. I cannot change my network flow `agent-ip`, and I am not seeing my router's traffic in MNM analytics." >}}

{{<faq-answer>}}

It is recommended that you set your router's public IP address and network flow `agent-ip` to the same value. However, if you are unable to do this, you can register both your router's public IP and your network flow `agent-ip` in the Magic Network Monitoring (MNM) [router configuration](/magic-network-monitoring/get-started/). This will prevent MNM from blocking network traffic received from any unknown IP addresses, and will show your router's network flow data underneath the router's `agent-ip`.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="What is Magic Network Monitoring's data retention policy for Netflow/sFlow received from customer's routers?" >}}

{{<faq-answer>}}

Currently, all data received from a customer's router goes to our servers in the US. If you enable data sovereignty in Europe, you cannot currently use Magic Network Monitoring.

GraphQL analytics is retained for 90 days for enterprise customers. For non-enterprise customers, data retention is seven days. Cloudflare also retains data for six hours in the US, for threshold crossing detection.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Can I send NetFlow/sFlow data to Cloudflare in a secure, encrypted way?" >}}

{{<faq-answer>}}

Yes. Enterprise customers with Magic Transit or Magic WAN are able to send encrypted network flow data via an IPsec tunnel to Cloudflare's network. You can achieve this by:

1. Configuring your [NetFlow](/magic-network-monitoring/routers/netflow-ipfix-config/) or [sFlow](/magic-network-monitoring/routers/sflow-config/) data to be sent to Cloudflare’s network for parsing.
2. Directing that network flow data to be sent over a [Magic Transit IPsec tunnels](/magic-transit/how-to/configure-tunnels/) or [Magic WAN IPsec tunnels](/magic-wan/configuration/manually/how-to/configure-tunnels/) to Cloudflare's network.

Cloudflare's network will then identify this traffic via the destination IP address/port, and direct the network flow traffic to Magic Network Monitoring for parsing.

This feature is not available to Magic Network Monitoring free customers.


{{</faq-answer>}}
{{</faq-item>}}