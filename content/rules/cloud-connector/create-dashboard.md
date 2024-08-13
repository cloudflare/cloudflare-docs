---
title: Configure in the dashboard
pcx_content_type: how-to
weight: 2
meta:
  title: Configure a Cloud Connector rule in the dashboard
---

# Configure a rule in the dashboard

To configure a Cloud Connector rule in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.

2. Go to **Rules** > **Cloud Connector**.

3. Select your [cloud provider](/rules/cloud-connector/providers/).

4. Enter the bucket URL and select **Next**.

    {{<Aside type="warning">}}
The bucket URL must follow a [specific format](/rules/cloud-connector/providers/) according to your provider.
    {{</Aside>}}

5. Enter a descriptive name for the rule in **Cloud Connector name**.

6. Under **If**, select **Custom filter expression** and [enter an expression](/ruleset-engine/rules-language/expressions/edit-expressions/) to define the traffic that will be redirected to the bucket. For example:

    - To route all requests under `https://example.com/images/*` you could enter the following expression:<br/>
    `http.request.full_uri wildcard "https://example.com/images/*"`
    - To route all requests under `https://images.example.com/*` you could enter the following expression:<br/>
    `http.request.full_uri wildcard "https://images.example.com/*"`

    Alternatively, select **All incoming requests** to redirect all incoming traffic for your zone to the storage bucket you selected.

To save and deploy your rule, select **Deploy**. If you are not ready to deploy the rule, select **Save as Draft**.