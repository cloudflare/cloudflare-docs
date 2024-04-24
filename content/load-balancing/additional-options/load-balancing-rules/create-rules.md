---
pcx_content_type: how-to
title: Create custom rules
weight: 16
---

# Create custom rules

Create and manage [Load Balancing rules](/load-balancing/additional-options/load-balancing-rules/) in the **Custom Rules** page, which is part of the Create/Edit Load Balancer workflow found in **Traffic** in the dashboard.

---

## Prerequisites

- **Understand whether Cloudflare proxies your traffic**: Depending on the [proxy status](/load-balancing/understand-basics/proxy-modes/) of your traffic, you may have access to different fields for your load balancing rules. For more details, refer to [Supported fields and expressions](/load-balancing/additional-options/load-balancing-rules/reference/).

---

## Workflow

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select an account and application.
2. Go to **Traffic** > **Load Balancing**.
3. Edit an existing load balancer or [create a new load balancer](/load-balancing/load-balancers/create-load-balancer/).
4. From the Load Balancer workflow, select **Custom Rules**.
5. Select **Create Custom Rule**.
6. In the **Field** drop-down list, choose an HTTP property. For more details, refer to [Supported fields](/load-balancing/additional-options/load-balancing-rules/reference/).
7. In the **Operator** drop-down list, choose an operator. For more details, refer to [Operators](/load-balancing/additional-options/load-balancing-rules/reference/#operators-and-grouping-symbols).
8. Enter the value to match. When the field is an ordered list, **Value** is a drop-down list. Otherwise, **Value** is a text input.
9. (Optional) To create a compound expression using logical operators, select **And** or **Or**.
10. For an action, choose **Respond with fixed response** or **Override** and enter additional details. For a full list of actions, refer to [Actions](/load-balancing/additional-options/load-balancing-rules/actions/).
11. (Optional) Select **Add another override**.
12. After you create your rule, select **Save and Deploy** or **Save as Draft**.
13. Select **Next** and review your changes.
14. Select **Save** to confirm.

{{<Aside type="warning" header="Warning">}}

To save a new load balancer rule, make sure to save both the rule **and** the overall load balancer configuration.

{{</Aside>}}

## Example use case

### URL-based routing

If you want to host `example.com/blog` separately from your main website, for example, use the following custom rule.

{{<example>}}

<strong>When incoming requests match</strong>:

| Field    | Operator | Value   |
|----------|----------|---------|
| URI Path | contains | `/blog` |

<strong>Then</strong>:

| Action    | Options      | Value           |
|-----------|--------------|-----------------|
| Overrides | Origin pools | `<BLOG_SERVER>` |

{{</example>}}