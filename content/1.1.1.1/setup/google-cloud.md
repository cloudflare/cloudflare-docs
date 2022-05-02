---
weight: 6
pcx-content-type: how-to
title: Google Cloud
meta:
    title: Set up 1.1.1.1 on Google Cloud
---

# Set up 1.1.1.1 - Google Cloud

Google Cloud supports configuring [outbound server policy](https://cloud.google.com/dns/docs/server-policies-overview#dns-server-policy-out) within Cloud DNS. Policies are applied per Virtual Private Cloud (VPC) network, and will affect all resources within that VPC network, including any existing virtual machines.

{{<Aside type="note">}}

If you are using [Cloudflare Zero Trust](/cloudflare-one/), you can choose assigned [locations](/cloudflare-one/connections/connect-networks/locations/) to apply custom [DNS policies](/cloudflare-one/policies/filtering/dns-policies/) via Gateway.

{{</Aside>}}

To configure 1.1.1.1 for your Google Cloud VPC network(s):

1. Open the [Google Cloud Console](https://console.cloud.google.com).
2. Navigate to **Network Services** > **Cloud DNS** and click [**DNS Server Policies**](https://console.cloud.google.com/net-services/dns/policies).
3. Click **Create Policy**.
4. Provide a name for your Policy (such as `cloudflare-1-1-1-1`) and select associated VPC network or networks.
5. Under **Alternate DNS servers**, click **Add Item** and type:
    {{<render file="_ipv4.md">}}
6. Click **Create**.

DNS requests within the configured VPC network(s) will now use 1.1.1.1.