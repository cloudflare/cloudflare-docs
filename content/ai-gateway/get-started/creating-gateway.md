---
title: Creating an AI Gateway
pcx_content_type: get-started
weight: 1
---

# Creating your first AI Gateway

In this guide, you will learn how to create your first AI Gateway. You can create multiple gateways to control different applications.

## Prerequisites

Before you get started, make sure you have a [Cloudflare account](https://dash.cloudflare.com/).

## Setup

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To set up an AI Gateway in the dashboard:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **AI** > **AI Gateway**.
3. Select **Create Gateway**.
  ![AI Gateway onboarding](images/ai-gateway/AIG-onboarding.png)
4. Enter your **Gateway name** and **URL slug**.
5. Select **Create**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To set up an AI Gateway using the API:

1. [Create an API token](/fundamentals/api/get-started/create-token/) with the following permissions:
  - `AI Gateway - Read`
  - `AI Gateway - Edit`

2. Get your [Account ID](/fundamentals/setup/find-account-and-zone-ids/).
3. Using that API token and Account ID, send a [`POST` request](/api/operations/aig-config-create-gateway) to the Cloudflare API.

{{</tab>}}
{{</tabs>}}



## Next Steps

{{<resource-group>}}

{{<resource header="Connecting your application" href="/ai-gateway/get-started/connecting-applications" icon="learning-center-book">}} Connect your AI Gateway to your application{{</resource>}}

{{</resource-group>}}