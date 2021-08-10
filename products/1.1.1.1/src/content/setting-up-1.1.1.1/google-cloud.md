---
order: 10
pcx-content: tutorial
---

# Google Cloud

Google Cloud supports configuring [outbound server policy](https://cloud.google.com/dns/docs/server-policies-overview#dns-server-policy-out) within Cloud DNS. Policies are applied per-VPC network, and will apply to all resources within that VPC network, including any existing virtual machines.

<Aside type="note">

If you're using [Cloudflare for Teams](https://developers.cloudflare.com/cloudflare-one/), you can use the assigned [locations](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/locations) to apply custom [DNS policies](https://developers.cloudflare.com/cloudflare-one/policies/filtering/dns-policies-builder) via Gateway.

</Aside>

To configure 1.1.1.1 for your Google Cloud VPC network(s):

1. Open the [Google Cloud Console](https://console.cloud.google.com)

1. Head to Network Services > Cloud DNS and click on [**DNS Server Policies**](https://console.cloud.google.com/net-services/dns/policies).

1. Click **Create Policy**

1. Provide a name for your Policy (such as "cloudflare-1-1-1-1"), and 

1. Select the VPC network or networks that this policy applies to.

1. Under **Alternate DNS servers**, click **Add Item** to add an entry
   for each of 

    ```txt
    1.1.1.1
    1.0.0.1
    ```

1. Click **Create**.

DNS requests within the configured VPC network(s) will now use 1.1.1.1.
