---
pcx_content_type: concept
title: Manage resources
weight: 4
---

# Manage resources

## Cloud resource catalog

Your cloud environment is built from individual cloud resources, like Virtual Private Clouds (VPCs), subnets, Virtual Machines (VMs), route tables, and routes. Magic Cloud Networking discovers all of your cloud resources and stores their configuration and status in the Cloud resource catalog, a read-only snapshot of your cloud environment. Discovery runs regularly in the background, keeping your catalog up to date as your environment changes.

When Magic Cloud Networking creates or modifies configurations in the cloud provider — for example, to deploy a managed IPsec on-ramp for Magic WAN — the created resources will be labeled as **Managed** in the resource catalog.

To browse the resources in your catalog:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account.
2. Select **Manage Account** > **Cloud integrations**.
3. Go to **Resource catalog**.
4. Select a resource to inspect its details.

## Edit Cloud integrations

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account.
2. Select **Manage Account** > **Cloud integrations**.
3. Select the integration you want to edit > **Edit**.
4. In **Credentials**, select **I would like to update my credentials**, and make the required changes to your credentials.
5. Select **Save** when you are finished.
6. (Optional) You can also select **Delete** to delete your cloud integration.