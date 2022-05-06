---
_build:
  publishResources: false
  render: never
  list: never
---

## Block content categories

Block content categories which go against your organization’s acceptable use policy.

| Selector            | Operator  | Value              | Action |
| ------------------- | ----------| -------------------| ------ |
| Content categories | in        | Adult Themes, Gambling  | Block  |

## Block applications

Block content categories which go against your organization’s acceptable use policy.

| Selector            | Operator  | Value              | Action |
| ------------------- | ----------| -------------------| ------ |
| Application         | in        | Netflix            | Block  |

{{<Aside type="note">}}
After 7 days, view your [Shadow IT analytics](/cloudflare-one/analytics/access/) and block additional applications based on what your users are accessing.
{{</Aside>}}

## Check user identity

Configure access on a per user or group basis by adding [identity-based conditions](/cloudflare-one/policies/filtering/identity-selectors/) to your policies.

| Selector            | Operator  | Value              | Action |
| ------------------- | ----------| -------------------| ------ |
| Application         | in        | Salesforce         | Block  |
| User Group Names    | in        | `Contractors`      |        |
