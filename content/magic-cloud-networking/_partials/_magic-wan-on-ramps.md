---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: productName;;productPath
---

# Cloud on-ramps

Magic Cloud Networking allows you to create on-ramps from your cloud networks to Magic WAN. Cloudflare will create virtual private network (VPN) tunnels between Magic WAN and your virtual private cloud (VPC), configuring both sides of the connection on your behalf. Cloudflare orchestrates the cloud provider’s native VPN functionality, without requiring deployment of any additional compute VMs.

To connect your cloud networks to Magic WAN you need to have a Magic WAN account. Contact your account team to learn more.

{{<Aside type="note">}} Make sure you have configured a Magic Cloud Networking Cloud Integration before adding a Magic WAN Cloud on-ramp.{{</Aside>}}

## Create a Magic WAN cloud on-ramp

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account.
2. Select **Magic WAN** > **Cloud on-ramps**.
3. Select **Add new on-ramp**.
4. Give your new on-ramp a descriptive name.
5. Select the network you want to connect to, and select **Continue**.
6. **Configure route propagation** shows where Cloudflare will install the new routes. Installing these routes is required to correctly configure both Magic WAN and your cloud provider, to ensure successful communication between them:
    - **Add routes for your Magic WAN address space to your cloud network**: This installs routes for reaching Magic WAN in your cloud network’s route tables  (see [Magic WAN Address Space](#link) to learn what routes are installed and how to customize them). If you prefer to do this manually, unselect this option.

    {{<Aside type="warning">}}Cloudflare recommends that you leave this option selected. If you unselect this option, you will need to manually create all the required configurations to allow Magic WAN to connect to your cloud, like routing tables, transit gateways, and VPNs. Refer to the [Magic WAN How to](/magic-wan/configuration/manually/how-to/) section, or consult the documentation for your cloud provider.

    - **Add routes for your cloud network to Magic WAN**: This option creates routes for reaching your cloud network in Magic WAN.
7. Select **Continue**. Applying your settings might take a few seconds to complete.
8. Review the changes in your cloud environment, and select **Approve changes**.

You have successfully created your Magic WAN on-ramp. However, on-ramp creation can take up to an hour before you can use it.

## Edit a Magic WAN cloud on-ramp

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account.
2 .Select **Magic WAN** > **Cloud on-ramps**.
3. Select the on-ramp you want to edit.
4. Select **Edit** in the side panel.
5. In **Basic information**, you can change the name and description of your on-ramp.
    1. Select **Save** when you are finished.
6. In **Configurations**, you can modify where the required routes are installed. Select **Continue**.
    {{<Aside type="warning">}}If you uncheck any of the Propagation settings, you will have to manually configure Magic WAN or your cloud provider to ensure successful communication between them. Refer to the [Magic WAN How to](/magic-wan/configuration/manually/how-to/) section, or consult the documentation for your cloud provider.
    1. Select **Save and review** after making changes.
    2. Review your settings, and select **Approve changes**.

## Delete a Magic WAN cloud on-ramp

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account.
2 .Select **Magic WAN** > **Cloud on-ramps**.
3. Select the on-ramp you want to edit.
4. Select **Edit** in the side panel.
5. Choose **Detach** or **Destroy** to proceed.
    - **Detach**: Cloudflare will stop managing the cloud resources that were created to build this on-ramp, but will leave them in place. On-ramp connectivity will not be impacted.
    - **Destroy**: Cloudflare will delete the resources that were created to build this on-ramp in the cloud provider, if possible. Resources cannot be deleted if they are depended upon by other resources. For example, if an AWS Customer Gateway was created for this on-ramp, but was subsequently used in a second on-ramp, destroying this on-ramp will not destroy the AWS Customer Gateway.

## Magic WAN Address Space

By default, Cloudflare installs the following summarized routes in your cloud route tables to direct traffic to Magic WAN:

```txt
10.0.0.0/8
172.16.0.0./12
192.168.0.0/16
100.64.0.0./10
```

To override the defaults with custom prefixes:

1. Log in to the Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account.
2. Select **Magic WAN** > **Cloud on-ramps**.
3. Select **Magic WAN Address Space**.
4. Delete the prefixes, and enter your custom ones.
5. When you are finished, select **Save changes**.

To install a default route to send all traffic to Magic WAN, enter `0.0.0.0/0` (on Azure, enter `0.0.0.0/1` and `128.0.0.0/1`).