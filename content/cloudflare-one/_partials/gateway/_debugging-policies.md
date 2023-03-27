---
_build:
  publishResources: false
  render: never
  list: never
---

1. In the Zero Trust dashboard, go to **Gateway** > **Firewall policies**.
2. Disable all DNS, Network, and HTTP policies and see if the issue persists. It may take up to two minutes for the change to take effect. Note that all policy enforcement happens on the Cloudflare global network, not on your local device.
3. Slowly re-enable your policies. Once you have narrowed down the issue, modify the policies or their [order of enforcement](/cloudflare-one/policies/filtering/order-of-enforcement/).
