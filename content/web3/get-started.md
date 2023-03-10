---
pcx_content_type: get-started
title: Get started
weight: 3
---

# Get started

Use this tutorial to start using Cloudflare's Web3 Gateways to the IPFS and Ethereum networks.

## Before you begin

Before you start, make sure the you have [set up an account](/fundamentals/account-and-billing/account-setup/) and [added your website](/fundamentals/get-started/setup/add-site/) to Cloudflare.

## Step 1 - Subscribe to a gateway

To get access to Web3 gateways for your account, you need to first [subscribe to a gateway](/web3/how-to/enable-gateways/).

## Step 2 - Create a gateway

After purchasing a gateway subscription, create a gateway.

<details>
<summary>Create via dashboard</summary>
<div>

{{<render file="_create-gateway-dashboard.md">}}

</div>
</details>

<details>
<summary>Create via API</summary>
<div>

{{<render file="_create-gateway-api.md">}}

</div>
</details>

{{<render file="_post-creation-steps.md">}}

## Step 3 - Customize Cloudflare settings

{{<render file="_cloudflare-settings.md">}}

## Step 4 - Restrict gateway access (optional)

If you are using your gateway for backend services, you may want to use Cloudflare Zero Trust to [restrict gateway access](/web3/how-to/restrict-gateway-access/).

## Step 5 - Set up usage notifications

{{<render file="_ubb-recommendation.md" productFolder="fundamentals">}}

## Step 6 - Use the gateway

Once you have created a gateway and updated your Cloudflare settings, you can start using your [IPFS](/web3/how-to/use-ipfs-gateway/), [Ethereum](/web3/how-to/use-ethereum-gateway/), or [Polygon](/web3/how-to/use-polygon-gateway/) gateway.