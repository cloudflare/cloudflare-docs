---
pcx_content_type: concept
title: Detection IDs
---

# Detection IDs

{{<render file="_detection-ids">}}
<br/>

With customer configurable heuristics, you can choose unique actions for different bots, detected through Cloudflare’s heuristics engine. You can block, allow, or serve alternate content to specific bots to meet the unique needs of your site's traffic.
	
{{<Aside type="note">}}

You can use `cf.bot_management.detection_ids` fields in tools such as Custom Rules, Advanced Rate Limiting, Transform Rules, Legacy Firewall Rules, and Workers (as `request.cf.botManagement.detectionIds`).

{{</Aside>}}

## Bot Detection IDs via Logpush

You can create or edit their existing Logpush jobs to include the new Bot Detection IDs field which will provide an array of IDs for each request that has heuristics match on it. The `BotDetectionIDs` field is available as part of the HTTP Requests dataset and you can add it to new or existing jobs via the Logpush API or on the Cloudflare dashboard. This is the primary method to discover Detection IDs.

### Via the Cloudflare dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Navigate to **Analytics & Logs** > **Logs**.
3. Select **Add Logpush Job**.
4. Select **HTTP Requests** as the dataset.
5. Select **BotDetectionIDs** under the General data field category.
6. Select and enter the destination information.
7. Prove the ownership.
8. Select **Save**. 

### Via the API

[Update your logpush job](/logs/reference/log-output-options/) by adding `BotDetectionIDs` to the  `logpull_options:`  parameters.

## Create or edit an expression

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Navigate to **Security** > **Bots**.
3. [Create a firewall rule](/firewall/cf-dashboard/create-edit-delete-rules/) or select **Edit** on an existing firewall rule.
4. Select **Edit expression**. 
5. Add or edit the expression with the new field.
6. Select **Save**.

## Use cases

### Block requests that match a specific detection ID

```js
any(cf.bot_management.detection_ids[*] eq 3355446) 
and not cf.bot_management.verified_bot 
and http.request.uri.path eq "/login" 
and http.request.method eq "POST"
```

### Run Bot Management without specific detection IDs

```js
cf.bot_management.score lt 30 
and not cf.bot_management.verified_bot 
and http.request.uri.path eq "/login" 
and http.request.method eq "POST"
and not any(cf.bot_management.detection_ids[*] in {3355446 12577893})
```