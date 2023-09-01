---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1
---

Order of precedence refers to the priority of individual policies within the $1 policy builder (lowest value first, or from top to bottom as shown in the dashboard). You can modify the order of precedence by dragging and dropping individual policies in the dashboard.

In Gateway, the order of precedence follows the first match principle — once a site matches an Allow or Block policy, evaluation stops and no subsequent policies can override the decision. Therefore, we recommend putting the most specific policies and exceptions at the top of the list and the most general policies at the bottom.
