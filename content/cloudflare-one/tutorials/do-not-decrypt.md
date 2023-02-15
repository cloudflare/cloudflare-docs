---
updated: 2021-03-09
category: 🛡️ Web Gateway
difficulty: Beginner
pcx_content_type: tutorial
title: Skip inspection for groups of applications
---

# Skip inspection for groups of applications

You can configure Cloudflare Zero Trust to skip inspection for certain groups of applications.

Certain client applications, such as Zoom or Apple services, rely on certificate pinning. The [TLS inspection](/cloudflare-one/policies/filtering/http-policies/tls-decryption/) performed by Cloudflare Gateway will cause errors when users visit those applications. To avoid this behavior, you must add a Do Not Inspect HTTP policy.

**This walkthrough covers how to:**

- Build a Do Not Inspect policy using Cloudflare's list of certificate pinned resources
- Configure that policy's precedence in your Gateway configuration

**Time to complete:**

5 minutes

## Prerequisites

- [Enable HTTP filtering](/cloudflare-one/policies/filtering/initial-setup/http/)

## Build the policy

1. In the [Zero Trust dashboard](https://one.dash.cloudflare.com), go to **Gateway** > **Firewall Policies** > **HTTP**. Select **Add a policy**.

2. Name the policy and, optionally, provide a description.

3. Under **Selector**, choose **Application**. In the **Operator** field, select **in**. In the **Value** field, search for `Do Not Inspect`. You may select the entire set, which will update as new applications are added, or select individual applications.

4. In **Select an action**, select **Do Not Inspect**. Select **Create policy**.

## Change rule precedence

New rules are saved at the bottom of the rule list in Gateway. Gateway evaluates rules from top-to-bottom, except for Do Not Inspect rules. Those are always evaluated first. We recommend moving the Do Not Inspect rule to the top of the list to reduce confusion.

For more information, go to [Order of enforcement](/cloudflare-one/policies/filtering/order-of-enforcement/).

![Gateway rules displayed in recommended order.](/cloudflare-one/static/secure-web-gateway/exempt-cert-pinning/rules-last.png)
