---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: mwanAccount
---

# Cloud on-ramps

Magic Cloud Networking (beta) allows you to create on-ramps from your cloud networks to Magic WAN. Cloudflare will create virtual private network (VPN) tunnels between Magic WAN and your virtual private cloud (VPC), configuring both sides of the connection on your behalf. Cloudflare orchestrates the cloud provider's native VPN functionality, without requiring deployment of any additional compute virtual machines (VMs).

$1

{{<Aside type="note">}} Make sure you have configured a [Cloud Integration](/magic-cloud-networking/get-started/) before adding a Magic WAN Cloud on-ramp.{{</Aside>}}

## Available on-ramps

Magic Cloud Networking has the following cloud on-ramps integrations:
- AWS
- Azure
- GCP

Refer to [Reference](/magic-cloud-networking/reference/) to learn more about how Cloudflare orchestrates VPN connectivity to your cloud networks.

## Create a Magic WAN cloud on-ramp

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account.
2. Select **Magic WAN** > **Cloud on-ramps**.
3. Select **Add new on-ramp**.
4. Give your new on-ramp a descriptive name.
5. Select the network you want to connect to, and select **Continue**.
6. **Configure on-ramp** shows where Cloudflare will install the new routes. Installing these routes is required to correctly configure both Magic WAN and your cloud provider, and ensure successful communication between them:
    - **Add routes for your Magic WAN address space to your cloud network**: Select this option to install routes for reaching Magic WAN in your cloud network's route tables (refer to [Magic WAN Address Space](#magic-wan-address-space) to learn what routes are installed and how to customize them). If you prefer to do this manually, unselect this option.
    {{<Aside type="warning">}}Cloudflare recommends that you leave this option selected. If you unselect **Add routes for your Magic WAN address space to your cloud network**, you will need to manually create all the required configurations to allow Magic WAN to connect to your cloud, like routing tables, transit gateways, and VPNs. Refer to the [Magic WAN How to](/magic-wan/configuration/manually/how-to/) section, or consult the documentation for your cloud provider for more information.{{</Aside>}}

    - **Add routes for your cloud network to Magic WAN**: Select this option to create routes for reaching your cloud network in Magic WAN.
7. Select **Continue**. Applying your settings might take a few seconds to complete.
8. Review the changes in your cloud environment, and select **Approve changes**.

You have successfully created your Magic WAN on-ramp. However, on-ramp creation can take up to an hour before you can use it.

## Edit a Magic WAN cloud on-ramp

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account.
2. Select **Magic WAN** > **Cloud on-ramps**.
3. Select the on-ramp you want to edit.
4. Select **Edit** in the side panel.
5. In **Basic information**, you can change the name and description of your on-ramp. Select **Save** when you are finished.
6. In **Configurations**, you can modify where the required routes are installed. Select **Continue**.
    1. Select **Save and review** after making changes.
    2. Review your settings, and select **Approve changes**.
    {{<Aside type="warning">}}If you uncheck any of the Propagation settings, you will have to manually configure Magic WAN or your cloud provider to ensure successful communication between them. Refer to the [How to](/magic-wan/configuration/manually/how-to/) section of Magic WAN, or consult the documentation for your cloud provider for more information.{{</Aside>}}

## Delete a Magic WAN cloud on-ramp

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account.
2. Select **Magic WAN** > **Cloud on-ramps**.
3. Select the on-ramp you want to delete.
4. Select **Edit** in the side panel.
5. Choose **Detach** or **Destroy** to proceed:
    - **Detach**: Cloudflare will stop managing the cloud resources that were created to build this on-ramp, but will leave them in place. On-ramp connectivity will not be impacted.
    - **Destroy**: Cloudflare will delete the resources that were created to build this on-ramp in the cloud provider, if possible. Resources cannot be deleted if other resources depend upon them. For example, if an AWS Customer Gateway was created for this on-ramp, but was subsequently used in a second on-ramp, destroying this on-ramp will not destroy the AWS Customer Gateway.

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
2. Select **Magic WAN** > **Configuration**.
3. Select **Magic WAN Address Space**.
4. Delete the prefixes, and enter your custom ones.
5. When you are finished, select **Save changes**.

To install a default route to send all traffic to Magic WAN, enter `0.0.0.0/0` (on Azure, enter `0.0.0.0/1` and `128.0.0.0/1`).