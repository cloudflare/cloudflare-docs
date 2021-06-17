---
order: 123
pcx-content-type: reference
---

# Firewall fields

The Firewall fields contain rules managed by Cloudflare to block requests that contain malicious content.

## FirewallMatchesActions

<TableWrap>

| Value | Action | Description |
|---|---|---|
| <em><span style="font-weight: 400;">unknown</span></em> | Unknown | Take no other action |
| <em><span style="font-weight: 400;">allow</span></em> | Allow | Bypass all subsequent rules |
| <em><span style="font-weight: 400;">block</span></em> | Drop | Block with an HTTP 403 response |
| <em><span style="font-weight: 400;">challenge</span></em> | Challenge Drop | Issue a CAPTCHA challenge |
| <em><span style="font-weight: 400;">jschallenge</span></em> | Challenge Drop | Unused |
| <em><span style="font-weight: 400;">log</span></em> | Log | Take no action other than logging the event |
| <em><span style="font-weight: 400;">connectionClose</span></em> | Close | Close connection |
| <em><span style="font-weight: 400;">challengeSolved</span></em> | Allow | Allow once CAPTCHA challenge solved |
| <em><span style="font-weight: 400;">challengeFailed</span></em> | Drop | Block following invalid CAPTCHA solve attempt |
| <em><span style="font-weight: 400;">challengeBypassed</span></em> | Allow | CAPTCHA challenge not issued, allow (see challenge status for reason)|
| <em><span style="font-weight: 400;">jschallengeSolved</span></em> | Allow | Allow once JS challenge solved |
| <em><span style="font-weight: 400;">jschallengeFailed</span></em> | Drop | Drop if JS challenge failed |
| <em><span style="font-weight: 400;">jschallengeBypassed</span></em> | Allow | Allow if JS challenge bypassed (see challenge status for reason)  |
| <em><span style="font-weight: 400;">bypass</span></em> | Allow | Bypass all subsequent firewall rules |
| <em><span style="font-weight: 400;">managedChallenge</span></em> | Challenge Drop | Issue managed challenge |
| <em><span style="font-weight: 400;">managedChallengeSkipped</span></em> | Allow | Skip managed challenge and allow |
| <em><span style="font-weight: 400;">managedChallengeNonInteractiveSolved</span></em> | Allow | Allow once managed challenge solved via non-interactive interstitial page |
| <em><span style="font-weight: 400;">managedChallengeInteractiveSolved</span></em> | Allow | Allow once managed challenged solved via interactive interstitial page |
| <em><span style="font-weight: 400;">managedChallengeBypassed</span></em> | Allow | Allow if managed challenge bypassed or not issued because visitor had clearance |

</TableWrap>

## FirewallMatchesSources

<TableWrap>

| Value | Description |
|---|---|
| <em><span style="font-weight: 400;">unknown</span></em> | Used if an event is received from a new source but the logging system has not been updated |
| <em><span style="font-weight: 400;">asn</span></em> | Allow or block based on autonomous system number |
| <em><span style="font-weight: 400;">country</span></em> | Allow or block based on country |
| <em><span style="font-weight: 400;">ip</span></em> | Allow or block based on IP address |
| <em><span style="font-weight: 400;">ipRange</span></em> | Allow or block based on range of IP addresses |
| <em><span style="font-weight: 400;">securityLevel</span></em> | Allow or block based on requester's security level |
| <em><span style="font-weight: 400;">zoneLockdown</span></em> | Restrict all access to a specific zone |
| <em><span style="font-weight: 400;">waf</span></em> | Allow or block based on the WAF product settings. This is the old WAF/managed rules system that is being phased out. |
| <em><span style="font-weight: 400;">firewallRules</span></em> | Allow or block based on a zone's firewall rules configuration |
| <em><span style="font-weight: 400;">uaBlock</span></em> | Allow or block based on the Cloudflare User Agent Blocking product settings |
| <em><span style="font-weight: 400;">rateLimit</span></em> | Allow or block based on a rate limiting rule, whether set by you or by Cloudflare |
| <em><span style="font-weight: 400;">bic</span></em> | Allow or block based on the Browser Integrity Check product settings |
| <em><span style="font-weight: 400;">hot</span></em> | Allow or block based on the Hotlinking Protection product settings |
| <em><span style="font-weight: 400;">l7ddos</span></em> | Allow or block based on the L7 DdoS product settings |
| <em><span style="font-weight: 400;">validation</span></em> | Allow or block based on a request that is invalid (cannot be customized) |
| <em><span style="font-weight: 400;">botFight</span></em> | Allow or block based on the Bot Fight Mode (classic) product settings |
| <em><span style="font-weight: 400;">botManagement</span></em> | Allow or block based on the Bot Management product settings |
| <em><span style="font-weight: 400;">dlp</span></em> | Allow or block based on the Data Loss Prevention product settings |
| <em><span style="font-weight: 400;">firewallManaged</span></em> | Allow or block based on the Cloudflare managed rules product settings |
| <em><span style="font-weight: 400;">firewallCustom</span></em> | Allow or block based on a rule configured in the Firewall Custom Rulesets |

</TableWrap>