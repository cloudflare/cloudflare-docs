---
updated: 2020-11-28
category: 🛡️ Web Gateway
difficulty: Beginner
pcx-content-type: tutorial
title: Review Gateway blocks
---

# Review Gateway blocks

You can use Cloudflare Gateway to filter and log DNS queries from devices on any network. You can also use Cloudflare Radar to review why a site has been blocked.

**🗺️ This tutorial covers how to:**

- Review DNS filtering logs in Cloudflare Gateway
- Review the reason a domain was blocked in Cloudflare Radar
- Submit categorization feedback

**⏲️Time to complete:**

5 minutes

## Before you start

1.  [Add Gateway to your account](/cloudflare-one/setup/)
1.  Deploy Gateway policies to a network or group of [devices](/cloudflare-one/policies/filtering/dns-policies/)

---

## Review Gateway events

In this example, a Cloudflare Gateway DNS filtering rule has been applied to all locations to block social media.

![Policies](/cloudflare-one/static/secure-web-gateway/review-gateway-block/block-social.png)

Once deployed, Cloudflare Gateway will begin to block DNS queries to sites categorized by Cloudflare as social media networks. You can review each block in the Zero Trust dashboard.

Navigate to the `Logs` section of the sidebar and choose `Gateway`.

![Logs](/cloudflare-one/static/secure-web-gateway/review-gateway-block/logs-page.png)

Click the **Filter** action to filter by date range, user, action, and policy. In this example, choose `Blocked` as the action taken.

![Blocked](/cloudflare-one/static/secure-web-gateway/review-gateway-block/blocked.png)

You can expand the record to identify more information about the event, including user identity if you have deployed the [Zero Trust agent](/cloudflare-one/connections/connect-devices/).

![Blocked Expand](/cloudflare-one/static/secure-web-gateway/review-gateway-block/blocked-expand.png)

## Review block reason

Review details about the domain blocked by Cloudflare by clicking **View domain details in Radar**. Cloudflare Radar provides information like site ranking, certificate history, and WHOIS information. If you believe the site was not categorized appropriately, click `Submit Categorization Feedback` beneath the `Content Categories` section.

![Facebook Radar](/cloudflare-one/static/secure-web-gateway/review-gateway-block/facebook-radar.png)

## Override a rule

If you need to allow a specific hostname that was blocked as part of a larger group, you can create an exception in Cloudflare Gateway.

Return to the `Policies` page in the `Gateway` section. Add a new policy by clicking **Create a policy**.

Choose `DNS Domain` and input the domain to be allowed as the value. Select `Allow` as the action and create the policy.

![Facebook Allow](/cloudflare-one/static/secure-web-gateway/review-gateway-block/allow-rule.png)

Cloudflare Gateway enforces policies in an order from top-to-bottom. Drag the new policy to the top of the list.

![Initial Order](/cloudflare-one/static/secure-web-gateway/review-gateway-block/before-order.png)

Once added to the top of the list, DNS queries to this host will be allowed based on the first matching rule before DNS queries to other social media sites are blocked with the subsequent rules.

![Saved Order](/cloudflare-one/static/secure-web-gateway/review-gateway-block/after-order.png)
