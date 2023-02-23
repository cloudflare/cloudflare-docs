---
_build:
  publishResources: false
  render: never
  list: never
---

The Terraform configurations provided in this page need the zone ID (or account ID) of the zone/account where you will deploy the managed rulesets.

* To retrieve the list of accounts you have access to, including their IDs, use the [List accounts](https://developers.cloudflare.com/api/operations/accounts-list-accounts) API operation.
* To retrieve the list of zones you have access to, including their IDs, use the [List zones](https://developers.cloudflare.com/api/operations/zone-list-zones) API operation.

The deployment of managed rulesets via Terraform requires that you use the ruleset IDs. To find the IDs of managed rulesets, use the [List account rulesets](https://developers.cloudflare.com/api/operations/account-rulesets-list-account-rulesets) API operation. The response will include the description and IDs of existing managed rulesets.
