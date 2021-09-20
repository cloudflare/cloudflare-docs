---
order:
pcx-content-type: how-to
---

# Google Cloud

Google Cloud supports configuring [outbound server policy](https://cloud.google.com/dns/docs/server-policies-overview#dns-server-policy-out) within Cloud DNS. Policies are applied per Virtual Private Cloud (VPC) network, and will affect all resources within that VPC network, including any existing virtual machines.

<Aside type="note">

If you are using [Cloudflare for Teams](https://developers.cloudflare.com/cloudflare-one/), you can choose assigned [locations](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/locations) to apply custom [DNS policies](https://developers.cloudflare.com/cloudflare-one/policies/filtering/dns-policies-builder) via Gateway.

</Aside>

To configure 1.1.1.1 for your Google Cloud VPC network(s):

1. Open the [Google Cloud Console](https://console.cloud.google.com).

1. Navigate to **Network Services** > **Cloud DNS** and click [**DNS Server Policies**](https://console.cloud.google.com/net-services/dns/policies).

1. Click **Create Policy**.

1. Provide a name for your Policy (such as `cloudflare-1-1-1-1`) and select associated VPC network or networks.

1. Under **Alternate DNS servers**, click **Add Item** and type:

    ```txt
    1.1.1.1
    1.0.0.1
    ```

1. Click **Create**.

DNS requests within the configured VPC network(s) will now use 1.1.1.1.