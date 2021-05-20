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
| <em><span style="font-weight: 400;">challenge</span></em> | Challenge Allow | Issue a CAPTCHA challenge |
| <em><span style="font-weight: 400;">jschallenge</span></em> | Challenge Drop | Unused |
| <em><span style="font-weight: 400;">log</span></em> | Log | Take no action other than logging the event |
| <em><span style="font-weight: 400;">connectionClose</span></em> | Unknown | Take  |
| <em><span style="font-weight: 400;">challengeSolved</span></em> | Allow | Bypass all subsequent rules |
| <em><span style="font-weight: 400;">challengeFailed</span></em> | Drop | Block with an HTTP 403 response |
| <em><span style="font-weight: 400;">challengeBypassed</span></em> | Challenge Allow | Issue a CAPTCHA challenge |
| <em><span style="font-weight: 400;">jschallengeSolved</span></em> | Challenge Drop | Unused |
| <em><span style="font-weight: 400;">jschallengeFailed</span></em> | Simulate | Take no action other than logging the event |
| <em><span style="font-weight: 400;">jschallengeBypassed</span></em> | Unknown | Take  |
| <em><span style="font-weight: 400;">bypass</span></em> | Allow | Bypass all subsequent rules |
| <em><span style="font-weight: 400;">managedChallenge</span></em> | Drop | Block with an HTTP 403 response |
| <em><span style="font-weight: 400;">managedChallengeSkipped</span></em> | Challenge Allow | Issue a CAPTCHA challenge |
| <em><span style="font-weight: 400;">managedChallengeNonInteractiveSolved</span></em> | Challenge Drop | Unused |
| <em><span style="font-weight: 400;">managedChallengeInteractiveSolved</span></em> | Simulate | Take no action other than logging the event |
| <em><span style="font-weight: 400;">managedChallengeBypassed</span></em> | Simulate | Take no action other than logging the event |

</TableWrap>

## FirewallMatchesSources

<TableWrap>

| Value | Action | Description |
|---|---|---|
| <em><span style="font-weight: 400;">unknown</span></em> | Unknown | Take no other action |
| <em><span style="font-weight: 400;">asn</span></em> | Allow | Bypass all subsequent WAF rules |
| <em><span style="font-weight: 400;">country</span></em> | Drop | Block with an HTTP 403 response |
| <em><span style="font-weight: 400;">ip</span></em> | Challenge Allow | Issue a CAPTCHA challenge |
| <em><span style="font-weight: 400;">ipRange</span></em> | Challenge Drop | Unused |
| <em><span style="font-weight: 400;">securityLevel</span></em> | Simulate | Take no action other than logging the event |
| <em><span style="font-weight: 400;">zoneLockdown</span></em> | Unknown | Take no other action |
| <em><span style="font-weight: 400;">waf</span></em> | Allow | Bypass all subsequent WAF rules |
| <em><span style="font-weight: 400;">firewallRules</span></em> | Drop | Block with an HTTP 403 response |
| <em><span style="font-weight: 400;">uaBlock</span></em> | Challenge Allow | Issue a CAPTCHA challenge |
| <em><span style="font-weight: 400;">rateLimit</span></em> | Challenge Drop | Unused |
| <em><span style="font-weight: 400;">bic</span></em> | Simulate | Take no action other than logging the event |
| <em><span style="font-weight: 400;">hot</span></em> | Challenge Allow | Issue a CAPTCHA challenge |
| <em><span style="font-weight: 400;">l7ddos</span></em> | Challenge Drop | Unused |
| <em><span style="font-weight: 400;">validation</span></em> | Simulate | Take no action other than logging the event |
| <em><span style="font-weight: 400;">botFight</span></em> | Unknown | Take no other action |
| <em><span style="font-weight: 400;">botManagement</span></em> | Allow | Bypass all subsequent WAF rules |
| <em><span style="font-weight: 400;">dlp</span></em> | Drop | Block with an HTTP 403 response |
| <em><span style="font-weight: 400;">firewallManaged</span></em> | Challenge Allow | Issue a CAPTCHA challenge |
| <em><span style="font-weight: 400;">firewallCustom</span></em> | Challenge Drop | Unused |

</TableWrap>