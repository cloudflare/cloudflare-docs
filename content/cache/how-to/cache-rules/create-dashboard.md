---
pcx_content_type: how-to
title: Create a rule in the dashboard
weight: 3
meta:
  title: Create a cache rule in the dashboard
---

# Create a cache rule in the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Caching** > **Cache Rules**.
3. To create a new empty rule, select **Create rule**. To duplicate an existing rule, select the three dots next to it > **Duplicate**.
4. Enter a descriptive name for the rule in **Rule name**.
5. Under **When incoming requests match**, select **All incoming requests** if you want the rule to apply to all traffic or **Custom filter expression** if you want the rule to only apply to traffic matching the custom expression.
6. If you selected **Custom filter expression**, under **When incoming requests match**, define the [rule expression](/ruleset-engine/rules-language/expressions/edit-expressions/#expression-builder). Use the **Field** drop-down list to choose an HTTP property and select an **Operator**. Refer to [Available settings](/cache/how-to/cache-rules/settings/) for the list of available fields and operators.

<div class="medium-img">

![Select fields in the Expression Builder.](/images/cache/select-fields.png)

</div>

6. Following the selection of the field and operator, enter the corresponding value that will trigger the Cache Rule. For example, if the selected field is `Hostname` and the operator is `equals`, a value of `cloudflare.com` would mean the rule matches any request to that hostname.

<div class="medium-img">

![Example rule](/images/cache/example-rule.png)

</div>

{{<Aside type="note">}}
Rules can be further customized by using the **Edit expression** option. You can find more information in [Edit expressions in the dashboard](/ruleset-engine/rules-language/expressions/edit-expressions/).
{{</Aside>}}

7. Under **Then**, in the **Cache eligibility** section, select [**Bypass cache**](/cache/how-to/cache-rules/settings/#bypass-cache) if you want matching requests to not be cacheable, or **Eligible for cache** if you want Cloudflare to attempt to cache them. Note that [cache-control headers](/cache/concepts/cache-control/) can also impact cache eligibility.

8. If you selected **Eligible for cache** in the previous step, you can customize the options described in the [Available settings](/cache/how-to/cache-rules/settings/) section.

9. Under **Place at**, from the dropdown, you can select the order of your rule. From the main page, you can also change the order of the rules you have created.

10. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.