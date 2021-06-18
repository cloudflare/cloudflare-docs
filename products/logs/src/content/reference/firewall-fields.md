---
order: 123
pcx-content-type: reference
---

# Firewall fields

The Firewall fields contain rules to block requests that contain specific types of content.

## FirewallMatchesActions

<TableWrap>

| Value | Action | Description |
|---|---|---|
| <em>unknown</em> | Unknown | Take no other action |
| <em>allow</em> | Allow | Bypass all subsequent rules |
| <em>block</em> | Drop | Block with an HTTP 403 response |
| <em>challenge</em> | Challenge Drop | Issue a CAPTCHA challenge |
| <em>jschallenge</em> | Challenge Drop | Issue a JS challenge |
| <em>log</em> | Log | Take no action other than logging the event |
| <em>connectionClose</em> | Close | Close connection |
| <em>challengeSolved</em> | Allow | Allow once CAPTCHA challenge solved |
| <em>challengeFailed</em> | Drop | Block following invalid CAPTCHA solve attempt |
| <em>challengeBypassed</em> | Allow | CAPTCHA challenge not issued because visitor had previously passed a CAPTCHA challenge|
| <em>jschallengeSolved</em> | Allow | Allow once JS challenge solved |
| <em>jschallengeFailed</em> | Drop | Drop if JS challenge failed |
| <em>jschallengeBypassed</em> | Allow | JS challenge not issued because the visitor had previously passed a JS or CAPTCHA challenge  |
| <em>bypass</em> | Allow | Bypass all subsequent firewall rules |
| <em>managedChallenge</em> | Challenge Drop | Issue managed challenge |
| <em>managedChallengeSkipped</em> | Allow | Skip managed challenge and allow |
| <em>managedChallengeNonInteractiveSolved</em> | Allow | Allow once the managed challenge is solved via non-interactive interstitial page |
| <em>managedChallengeInteractiveSolved</em> | Allow | Allow once the managed challenged is solved via interactive interstitial page |
| <em>managedChallengeBypassed</em> | Allow | Challenge was not presented because visitor had clearance from previous challenge |

</TableWrap>

## FirewallMatchesSources

<TableWrap>

| Value | Description |
|---|---|
| <em>unknown</em> | Used if an event is received from a new source but the logging system has not been updated |
| <em>asn</em> | Allow or block based on autonomous system number |
| <em>country</em> | Allow or block based on country |
| <em>ip</em> | Allow or block based on IP address |
| <em>ipRange</em> | Allow or block based on range of IP addresses |
| <em>securityLevel</em> | Allow or block based on requester's security level |
| <em>zoneLockdown</em> | Restrict all access to a specific zone |
| <em>waf</em> | Allow or block based on the WAF product settings. This is the WAF/managed rules system that is being phased out. |
| <em>firewallRules</em> | Allow or block based on a zone's firewall rules configuration |
| <em>uaBlock</em> | Allow or block based on the Cloudflare User Agent Blocking product settings |
| <em>rateLimit</em> | Allow or block based on a rate limiting rule, whether set by you or by Cloudflare |
| <em>bic</em> | Allow or block based on the Browser Integrity Check product settings |
| <em>hot</em> | Allow or block based on the Hotlink Protection product settings |
| <em>l7ddos</em> | Allow or block based on the L7 DDoS product settings |
| <em>validation</em> | Allow or block based on a request that is invalid (cannot be customized) |
| <em>botFight</em> | Allow or block based on the Bot Fight Mode (classic) product settings |
| <em>botManagement</em> | Allow or block based on the Bot Management product settings |
| <em>dlp</em> | Allow or block based on the Data Loss Prevention product settings |
| <em>firewallManaged</em> | Allow or block based on the Firewall Managed Rules product settings |
| <em>firewallCustom</em> | Allow or block based on a rule configured in the Firewall Custom Rulesets |

</TableWrap>
