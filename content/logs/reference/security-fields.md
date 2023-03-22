---
pcx_content_type: reference
title: Security fields
weight: 124
---

# Security fields

The Security fields contain rules to block requests that contain specific types of content.

## SecurityActions

{{<table-wrap>}}

| Value                                  | Action         | Description                                                                                                                                                 |
| -------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `unknown`                              | Unknown        | Take no other action.                                                                                                                                       |
| `allow`                                | Allow          | Bypass all subsequent rules.                                                                                                                                |
| `block`                                | Drop           | Block with an HTTP 403 response.                                                                                                                            |
| `challenge`                            | Challenge Drop | Issue an interactive challenge.                                                                                                                              |
| `jschallenge`                          | Challenge Drop | Issue a JS challenge.                                                                                                                                       |
| `log`                                  | Log            | Take no action other than logging the event.                                                                                                                |
| `connectionClose`                      | Close          | Close connection.                                                                                                                                           |
| `challengeSolved`                      | Allow          | Allow once interactive challenge solved.                                                                                                                    |
| `challengeFailed`                      | Drop           | Block following invalid interactive challenge solve attempt.                                                                                                |
| `challengeBypassed`                    | Allow          | Interactive challenge is not issued again because the visitor had previously passed an interactive challenge and a valid `cf_clearance` cookie is present.  |
| `jschallengeSolved`                    | Allow          | Allow once JS challenge solved.                                                                                                                             |
| `jschallengeFailed`                    | Drop           | Drop if JS challenge failed.                                                                                                                                |
| `jschallengeBypassed`                  | Allow          | JS challenge not issued because the visitor had previously passed a JS or interactive challenge.                                                            |
| `bypass`                               | Allow          | Bypass all subsequent firewall rules.                                                                                                                       |
| `managedChallenge`                     | Challenge Drop | Issue managed challenge.                                                                                                                                    |
| `managedChallengeNonInteractiveSolved` | Allow          | Allow once the managed challenge is solved via non-interactive interstitial page.                                                                           |
| `managedChallengeInteractiveSolved`    | Allow          | Allow once the managed challenged is solved via interactive interstitial page.                                                                              |
| `managedChallengeBypassed`             | Allow          | Challenge was not presented because visitor had clearance from previous challenge.                                                                          |

{{</table-wrap>}}

## SecuritySources

{{<table-wrap>}}

| Value             | Description                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| `unknown`         | Used if an event is received from a new source but the logging system has not been updated.                      |
| `asn`             | Allow or block based on autonomous system number.                                                                |
| `country`         | Allow or block based on country.                                                                                 |
| `ip`              | Allow or block based on IP address.                                                                              |
| `ipRange`         | Allow or block based on range of IP addresses.                                                                   |
| `securityLevel`   | Allow or block based on requester's security level.                                                              |
| `zoneLockdown`    | Restrict all access to a specific zone.                                                                          |
| `waf`             | Allow or block based on the WAF product settings. This is the WAF/managed rules system that is being phased out. |
| `firewallRules`   | Allow or block based on a zone's firewall rules configuration.                                                   |
| `uaBlock`         | Allow or block based on the Cloudflare User Agent Blocking product settings.                                     |
| `rateLimit`       | Allow or block based on a rate limiting rule, whether set by you or by Cloudflare.                               |
| `bic`             | Allow or block based on the Browser Integrity Check product settings.                                            |
| `hot`             | Allow or block based on the Hotlink Protection product settings.                                                 |
| `l7ddos`          | Allow or block based on the L7 DDoS product settings.                                                            |
| `validation`      | Allow or block based on a request that is invalid (cannot be customized.)                                        |
| `botFight`        | Allow or block based on the Bot Fight Mode (classic) product settings.                                           |
| `botManagement`   | Allow or block based on the Bot Management product settings.                                                     |
| `dlp`             | Allow or block based on the Data Loss Prevention product settings.                                               |
| `firewallManaged` | Allow or block based on the Firewall Managed Rules product settings.                                             |
| `firewallCustom`  | Allow or block based on a rule configured in the Firewall Custom Rulesets.                                       |

{{</table-wrap>}}
