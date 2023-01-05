---
updated: 2021-03-09
category: 🛡️ Web Gateway
difficulty: Beginner
pcx_content_type: tutorial
title: Skip inspection for groups of applications
---

# Skip inspection for groups of applications

You can configure Cloudflare Zero Trust to skip inspection for certain groups of applications.

By default, Cloudflare Gateway creates a rule that includes the hostnames used by certain client applications, like Zoom or Apple's services, that rely on certificate pinning. The TLS inspection performed by a service like Cloudflare Gateway will cause errors when users visit those applications.

This tutorial skips inspection for additional applications beyond those in the list curated by Cloudflare.

**This walkthrough covers how to:**

- Build a `Do not inspect` policy using Cloudflare's list of certificate pinned resources
- Configure that policies precedence in your Gateway configuration

**Time to complete:**

5 minutes

## Before you start

[Enable HTTP filtering](/cloudflare-one/policies/filtering/initial-setup/http/).

## Build the policy

1.  Navigate to the **HTTP** tab of the `Policies` page in Cloudflare Gateway. Click **Add a rule**.

1.  Name the policy and, optionally, provide a description.

1.  Under **Selector** choose **Application**. Select **in** in the **Operator field**. In the **Value** field, select the applications you wish to include.

1.  Scroll to the bottom of the page and select **Do Not Inspect** in the `Select an action` section, then click **Create rule**.

## Change rule precedence

New rules are saved at the bottom of the rule list in Gateway. Gateway evaluates rules from top-to-bottom, except for do-not-inspect rules. Those are always evaluated first.

We do recommend dragging the **Do Not Inspect** rule to the top of the list to reduce confusion.

![Gateway rules displayed in recommended order.](/cloudflare-one/static/secure-web-gateway/exempt-cert-pinning/rules-last.png)
