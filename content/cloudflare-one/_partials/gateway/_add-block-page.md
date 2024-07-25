---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: firewallPolicyPath
---

1. In [Zero Trust](https://one.dash.cloudflare.com), go to $1.
2. Find the policy you want to customize and select **Edit**. You can only edit the block page for policies with a Block action.
3. Under **Configure policy settings**, go to **Display block page**. Choose _Show a custom message_.
4. In **Custom message**, enter a block message to show users.
5. Select **Save policy**.

Gateway will display a custom message in your users' browsers when they are blocked by this policy.
