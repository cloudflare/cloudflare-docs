---
title: 2023-02-01 - Updates to security fields
pcx_content_type: overview
weight: 300
---

# 2023-02-01 - Updates to security fields in Cloudflare Logs

Cloudflare will deploy some updates to security-related fields in Cloudflare Logs. These updates will affect the following datasets:

* [HTTP Requests](/logs/reference/log-fields/zone/http_requests/)
* [Firewall Events](/logs/reference/log-fields/zone/firewall_events/)

## Timeline

To minimize possible impacts on our customers' existing Security Information and Event Management (SIEM) configurations, these updates will happen in two phases according to the following timeline:

### Phase 1 (February 1, 2023)

For the log fields being added, Cloudflare will gradually start adding them to logs datasets.

For the log fields being renamed, Cloudflare will:

- **Add new fields** with the same data as the fields that will be removed on phase 2 (described in this document as old fields). These new fields will become gradually available. Refer to the next sections for details.
- **Announce the deprecation of the old fields.** Cloudflare will remove these fields from logs datasets on August 1, 2023.

For the log fields being removed, Cloudflare is announcing them as deprecated. Their removal from logs datasets will occur on August 1, 2023.

In addition to these Cloudflare Logs changes, Cloudflare will also add new security-related fields to the following [GraphQL datasets](/analytics/graphql-api/features/data-sets/):
  - `httpRequestsAdaptive `
  - `httpRequestsAdaptiveGroups`
  - `firewallEventsAdaptive`
  - `firewallEventsAdaptiveGroups`
  - `firewallEventsAdaptiveByTimeGroups`

### Phase 2 (August 1, 2023)

For the log fields being renamed, Cloudflare will remove the old fields from the Cloudflare logs datasets. From August 1, 2023 onwards, only the new fields will be available.

For the log fields being removed, Cloudflare will also remove them from the Cloudflare logs datasets. From August 1, 2023 onwards, these fields will no longer be available.

## Concepts

The following concepts are used below in the reviewed field descriptions:

* **Terminating action:** One of the following actions:

  * `block`
  * `js_challenge`
  * `managed_challenge`
  * `challenge` (_Interactive Challenge_)

For more information on these actions, refer to the [Actions](/ruleset-engine/rules-language/actions/) reference in the Rules language documentation.

* **Security rule:** One of the following rule types:

  * [WAF managed rule](/waf/managed-rules/)
  * [WAF custom rule](/waf/custom-rules/)
  * [WAF rate limiting rule](/waf/rate-limiting-rules/)

## HTTP Requests dataset changes

The following fields will be renamed in the [HTTP Requests](/logs/reference/log-fields/zone/firewall_events/) dataset according to the two-phase strategy outlined in the [timeline](#timeline):

{{<table-wrap>}}

New field name | Type | Description | Old field name<br>(removed on Aug 1, 2023)
---|---|---|---
`SecurityRuleID` | String | Rule ID of the security rule that triggered a terminating action, if any. | `WAFRuleID`
`SecurityRuleDescription`	| String | Rule description of the security rule that triggered a terminating action, if any. | `WAFRuleMessage`
`SecurityAction` | String | Rule action of the security rule that triggered a terminating action, if any. | `WAFAction`
`SecurityRuleIDs` | String Array | Array of security rule IDs that matched the request. | `FirewallMatchesRuleIDs`
`SecurityActions` | String Array | Array of actions that Cloudflare security products performed on the request. | `FirewallMatchesActions`
`SecuritySources` | String Array | Array of Cloudflare security products that matched the request. | `FirewallMatchesSources`

{{</table-wrap>}}

The following fields are now deprecated and they will be removed from the HTTP Requests dataset on August 1, 2023:

{{<table-wrap>}}

Deprecated field name | Notes
----------------------|----------------------------------------------------------------------
`WAFProfile`          | Used in the previous version of WAF managed rules (now deprecated).
`EdgeRateLimitAction` | Used in the previous version of rate limiting rules.
`EdgeRateLimitID`     | Used in the previous version of rate limiting rules.
`SecurityLevel`       | N/A

{{</table-wrap>}}

## Firewall Events dataset changes

The following fields will be added to the [Firewall Events](/logs/reference/log-fields/zone/firewall_events/) dataset:

{{<table-wrap>}}

Field name    | Type   | Description
--------------|--------|--------------------------------------------
`Description` | String | The description of the rule triggered by the request.
`Ref`         | String | The user-defined identifier for the rule triggered by the request.

{{</table-wrap>}}

## Changes to GraphQL datasets

Cloudflare will add the following fields to the `httpRequestsAdaptive `and `httpRequestsAdaptiveGroups `datasets:

{{<table-wrap>}}

Field name       | Type   | Description
-----------------|--------|-------------------------------------------------------------------------
`securityAction` | String | Action of the security rule that triggered a terminating action, if any.
`securitySource` | String | Source of the security rule that triggered a terminating action, if any.

{{</table-wrap>}}

Cloudflare will also add the following field to the `firewallEventsAdaptive`, `firewallEventsAdaptiveGroups`, and `firewallEventsAdaptiveByTimeGroups` datasets:

{{<table-wrap>}}

Field name    | Type   | Description
--------------|--------|-----------------------------
`description` | String | The description of the rule triggered by the request.

{{</table-wrap>}}

These new fields will become gradually available.

For more information on the available datasets, refer to [GraphQL datasets](/analytics/graphql-api/features/data-sets/).

## Update your SIEM systems

You may need to update external filters or reports in your SIEM systems to reflect the renamed, added, or removed log fields.

{{<Aside type="note" header="Additional storage requirements">}}
Cloudflare Logs will have additional fields between the start of Phase 1 and the beginning of Phase 2, due to the field renaming strategy outlined in the overview section (add new fields first, remove old fields later). This means that each log entry will require additional storage space during this period.
{{</Aside>}}
