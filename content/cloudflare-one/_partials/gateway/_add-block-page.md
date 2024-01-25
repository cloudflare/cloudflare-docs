---
_build:
  publishResources: false
  render: never
  list: never
---

For DNS policies, you will need to enable the block page on a per-policy basis.

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Gateway** > **Firewall Policies** > **DNS**.
2. Find the policy for which you would like to display a block page and select **Configure**. You can only enable the block page for policies with a Block action.
3. Scroll down to the **Configure policy settings** step.
4. Enable **Display block page**.
5. Select **Save policy**.

Visitors will now get a block page when they are blocked by this DNS policy.
