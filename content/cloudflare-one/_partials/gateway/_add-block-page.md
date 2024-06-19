---
_build:
  publishResources: false
  render: never
  list: never
---

For DNS policies, you will need to enable the block page on a per-policy basis.

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Gateway** > **Firewall Policies** > **DNS**.
2. Find the policy you want to customize and select **Edit**. You can only edit the block page for policies with a Block action.
3. Under **Configure policy settings**, go to **Display block page**. Choose _Show a custom message_.
4. In **Custom message**, enter a block message to show users.
5. Select **Save policy**.

Gateway will display a custom message when your users are blocked by this DNS policy.
