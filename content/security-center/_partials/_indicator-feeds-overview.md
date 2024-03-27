---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: getInvolved
---

In the simplest terms, there are providers and subscribers of our threat intelligence data.

A provider is an organization that has a set of data that they are interested in sharing with other Cloudflare organizations. Any organization can be a provider. Examples of current providers are Government Cyber Defense groups.

Subscribers can be any Cloudflare customer that wants to secure their environment further by creating rules based on provider datasets. Subscribers must be authorized by a provider. Authorization is granted using the [Indicator Feeds permissions endpoint](/api/operations/custom-indicator-feeds-add-permission).

$1
