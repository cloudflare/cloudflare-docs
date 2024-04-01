---
title: Create your first HTTP policy
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

Now that you've considered which devices and applications TLS inspection should and should not apply to, it's time to create your first HTTP policy.

## Create your first policy

Use a standard naming convention when building all policies. Policy names should be unique across the Cloudflare account, follow the same structure, and be as descriptive as possible.

To create a new HTTP policy:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Gateway** > **Firewall Policies**.
2. In the **HTTP** tab, select **Add a policy**.
3. Name the policy.
4. Under **Traffic**, build a logical expression that defines the traffic you want to allow or block.
5. Choose an **Action** to take when traffic matches the logical expression. For example, if you have enabled TLS inspection, some applications that use [embedded certificates](/cloudflare-one/policies/gateway/http-policies/tls-decryption/#limitations) may not support HTTP inspection, such as some Google products. You can create a policy to bypass inspection for these applications:

   {{<render file="gateway/policies/_do-not-inspect-applications.md" productFolder="cloudflare-one">}}

6. Select **Create policy**.

For more information, refer to [HTTP policies](/cloudflare-one/policies/gateway/http-policies/).

## Order your policies

In most scenarios, Gateway evaluates HTTP policies in [top-down order](/learning-paths/secure-internet-traffic/build-dns-policies/order-of-precedence/) (like DNS policies). Because Do Not Inspect action policies are terminal actions, we recommend grouping them in logical order above all of your other policies because they will always functionally fire first regardless of where they are placed.

Once the Do Not Inspect policies are ordered correctly, Allow policies should follow, and the Allow policy descriptions should include any special considerations for Allow actions (such as header IDs, certificate mismatch handling, and non-isolate traffic).

Next, list your isolate and block policies. There may be scenarios in which you want to intermingle your block policies within your other policy outcomes. That's an acceptable approach, but you'll need to ensure that you don't have overly permissive allows or overly restrictive block policies within your greater structure that will cause unintended effects.

## Test your policies

Before instituting blocks or other actions that would impact your users, first measure impact by setting the policy as an Allow action. Monitor your users' actions and look in your logs, sorting by that explicit policy, to see what traffic actions matched against it. If the activity is exactly what you would expect for the policy, you are probably safe to implement it as its intended action.

If unexpected traffic flows matched against it (like user or device groups) or traffic destinations that are unexpected, review the design of your policy to ensure it's not overly permissive or restrictive. If the policy design looks correct, determine whether other policies that should fire before the TLS inspection policy may be impacting its ability to operate correctly, and review the order of operations for Gateway policies to ensure everything is firing as designed.
