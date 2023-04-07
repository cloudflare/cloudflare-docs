---
pcx_content_type: content
title: Managed Rulesets
weight: 4
meta:
    title: Managed Rulesets per Custom Hostname
---

# Managed Rulesets per Custom Hostname

If you are interested in [WAF for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/security/waf-for-saas/) but unsure of where to start, Cloudflare recommends using WAF Managed Rules. The Cloudflare security team creates and manages a variety of rules designed to detect common attack vectors and protect applications from vulnerabilities. These rules are offered in [managed rulesets](/waf/managed-rules/), like Cloudflare Managed and OWASP, which can be deployed with different settings and sensitivity levels.

---

## Prerequisites

WAF for SaaS is available for customers on an Enterprise plan.

If you would like to deploy a managed ruleset at the account level, refer to the [Ruleset Engine documentation](/ruleset-engine/managed-rulesets/deploy-managed-ruleset/).

Ensure you have reviewed [Get Started with Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/) and familiarize yourself with [WAF for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/security/waf-for-saas/).

Customers can automate the [custom metadata](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/) tagging by adding it to the custom hostnames at creation. For more information on tagging a custom hostname with custom metadata, refer to the [API documentation](/api/operations/custom-hostname-for-a-zone-edit-custom-hostname).

---

## Step 1 - Choose security tagging system

1. Outline `security_tag` buckets. These are fully customizable with no strict limit on quantity. For example, you can set `security_tag` to `low`,`medium`, and `high` as a default, with one tag per custom hostname.

2. If you have not already done so, [associate your custom metadata to custom hostnames](/cloudflare-for-platforms/cloudflare-for-saas/security/waf-for-saas#step-1---associate-custom-metadata-to-a-custom-hostname) by including the `security_tag`in the custom metadata associated with the custom hostname. The JSON blob associated with the custom hostname is fully customizable.

{{<Aside type="note">}}

After the association is complete, the JSON blob is added to the defined custom hostname. This blob is then associated to every incoming request and exposed in the WAF through the new field `cf.hostname.metadata`. In the rule, you can access `cf.hostname.metadata` and get whatever data you need from that blob.

{{</Aside>}}

---

## Step 2 - Deploy Rulesets

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and navigate to your account.

2. Select Account Home > **WAF**.

{{<Aside type="note">}}

**WAF** at the account level will only be visible on Enterprise plans. If you do not see this option, contact your account manager.

{{</Aside>}}

3. Select **Deploy a managed ruleset**.

4. Under **Field**, Select *Hostname*. Set the operator as *equals*. The complete expression should look like this, plus any logic you would like to add:

![Rule expression](/cloudflare-for-platforms/static/rule-expression.png)

5. Beneath **Value**, add the custom hostname.

6. Select **Next**.

7. Find the **Cloudflare Managed Ruleset** card and select **Use this Ruleset**.

8. Click the checkbox next to each rule you want to deploy.

9. Toggle the **Status** button next to each rule to enable or disable it. Then select **Next**.

10. On the review page, give your rule a descriptive name. You can modify the ruleset configuration by changing, for example, what rules are enabled or what action should be the default.

11. Select **Deploy**.

{{<Aside type = "note">}}

While this tutorial uses Cloudflare Managed Rulesets, you can also create a custom ruleset and deploy on your custom hostnames. To do this, select **Browse Rulesets** > **Create new ruleset**. For examples of a low/medium/high ruleset, refer to [WAF for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/security/waf-for-saas/).

{{</Aside>}}
