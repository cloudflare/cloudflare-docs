---
order: 6
title: Types of Notifications
pcx-content-type: concept
---

import SSLTroubleshoot from "../_partials/_troubleshoot-ssl"
import DDOS from "../_partials/_ddos"
import Errors5xx from "../_partials/_errors"

# What kinds of Notifications are available?

Available Notifications depend on your Cloudflare plan. We offer a variety of Notifications for our products and services, such as Billing, Denial-of-Service protection, Magic Transit, and SSL/TLS.
Depending on your plan, you will also be able to configure webhooks. Webhooks allow you to connect your account with external services such as Slack and Google Chat. Another possibility is to use PagerDuty to receive Cloudflare Notifications.

## What should you do when receiving Notifications?

Each Notification carries different types of information about the status of your Cloudflare account, or the type of action you can take. 

Click below to understand what each Notification does and what to do when receiving one.

<details>
<summary>Origin Error Rate Alert</summary>
<div>

**Who is it for?**

Enterprise customers who want to receive a notification when Cloudflare is unable to access their origin server.

**Included with**

Enterprise plans.

**What should you do if you receive one?**

1. Use the link in the Notification you received to see which error codes Cloudflare is seeing from your origin.
1. <Errors5xx/>

</div>
</details>

<details>
<summary>Dedicated SSL Alert</summary>
<div>

**Who is it for?**

Customers with dedicated certificates who want to receive a notification on validation, issuance, renewal, and expiration of certificates.

**Included with**

Free plan.

**What should you do if you receive one?**

<SSLTroubleshoot/>

</div>
</details>

<details>
<summary>Universal SSL Alert</summary>
<div>

**Who is it for?**

Customers with universal certificates who want to receive a notification on validation, issuance, and renewal of certificates.

**Included with**

Free plan.

**What should you do if you receive one?**

<SSLTroubleshoot/>

</div>
</details>

<details>
<summary>SSL for SaaS Custom Hostnames Alert</summary>
<div>

**Who is it for?**

Customers with custom hostname certificates who want to receive a notification on validation, issuance, renewal, and expiration of certificates.

**Included with**

Purchase of Cloudflare for SaaS.

**What should you do if you receive one?**

<SSLTroubleshoot/>

</div>
</details>

<details>
<summary>HTTP DDoS Attack Alerter</summary>
<div>

**Who is it for?**

WAF/CDN customers who want to receive a notification when Cloudflare has mitigated an attack.

**Included with**

Professional or higher plans.

**What should you do if you receive one?**

<DDOS/>

</div>
</details>

<details>
<summary>Layer 4 Attack Alerter</summary>
<div>

**Who is it for?**

BYOIP customers and Spectrum customers with Network Analytics who want to receive a notification when Cloudflare has mitigated an attack.

**Included with**

Purchase of Magic Transit and/or BYOIP.

**What should you do if you receive one?**

<DDOS/>

</div>
</details>

<details>
<summary>Flow-based Monitoring: Volumetric Attack</summary>
<div>

**Who is it for?**

Magic Transit On Demand customers who are using Flow Based Monitoring to detect attacks when Magic Transit is disabled.

**Included with**

Purchase of Magic Transit.

**What should you do if you receive one?**

You need to advertise your IP prefixes to enable Magic Transit. For more information, see [Dynamic advertisement](https://developers.cloudflare.com/byoip/dynamic-advertisement).

</div>
</details>

<details>
<summary>Security Events Alert</summary>
<div>

**Who is it for?**

Business and Enterprise customers who want to receive alerts about spikes across all services that generate log entries in firewall events.

For more information, refer to [WAF alerts](https://developers.cloudflare.com/waf/alerts).

**Included with**

Business and Enterprise plans.

**What should you do if you receive one?**

Review the information in [Firewall Analytics](https://developers.cloudflare.com/waf/analytics/paid-plans) to identify any possible attack or misconfiguration.

</div>
</details>

<details>
<summary>Advanced Security Events Alert</summary>
<div>

**Who is it for?**

Enterprise customers who want to receive alerts about spikes in specific services that generate log entries in firewall events.

For more information, refer to [WAF alerts](https://developers.cloudflare.com/waf/alerts).

**Included with**

Enterprise plans.

**What should you do if you receive one?**

Review the information in [Firewall Analytics](https://developers.cloudflare.com/waf/analytics/paid-plans) to identify any possible attack or misconfiguration.

</div>
</details>

<details>
<summary>Passive Origin Monitoring</summary>
<div>

**Who is it for?**

Any customer who wants to receive a notification when Cloudflare is unable to access their origin.

**Included with**

Free plans.

**What should you do if you receive one?**

<Errors5xx/>

</div>
</details>

<details>
<summary>Expiring Access Service Token Alert</summary>
<div>

**Who is it for?**

Access customers who want to receive a notification when their service token is about to expire.

**Included with**

Purchase of Access.

**What should you do if you receive one?**

Refresh your service token in the [Teams dashboard](https://dash.teams.cloudflare.com/) under **Configuration** > **Service Auth**.


</div>
</details>

<details>
<summary>Usage Based Billing</summary>
<div>

**Who is it for?**

Customers who want to receive a notification when usage of a product goes above a set level.

**Included with**

Professional plans or higher.

**What should you do if you receive one?**

Review your usage of the product and adjust the configuration and/or increase the alerting threshold.

</div>
</details>

<details>
<summary>Script Monitor New Scripts Alert</summary>
<div>

**Who is it for?**

Page Shield customers who want to receive a notification when new JavaScript dependencies appear in their zone.

**Included with**

Business plans or higher.

**What should you do if you receive one?**

Investigate to confirm it is an expected change.

</div>
</details>

<details>
<summary>Script Monitor New Domain Alert</summary>
<div>

**Who is it for?**

Page Shield customers who want to receive a notification when JavaScript dependencies from new host domains appear in their zone.

**Included with**

Business plans or higher.

**What should you do if you receive one?**

Investigate to confirm it is an expected change.


</div>
</details>

<details>
<summary>Route Leak Detection Alert</summary>
<div>

**Who is it for?**

BYOIP customers who want to receive a notification when their prefixes are advertised in places they should not be.

**Included with**

Purchase of BYOIP.

**What should you do if you receive one?**

Confirm your traffic is healthy: reach out to your transit providers to ensure you are behaving as expected and ask them to follow up with any providers accepting the unauthorized routes.

</div>
</details>

<details>
<summary>Secondary DNS all Primaries Failing</summary>
<div>

**Who is it for?**

Enterprise customers who have at least one secondary zone in their account and want to receive a notification if all of their primary nameservers are failing.

**Included with**

Purchase of Secondary DNS.

**What should you do if you receive one?**

1. Confirm that your primary nameservers are up and running.
1. Confirm that the ACLs on your primary nameservers are configured correctly.
1. Confirm that your primary nameservers are configured correctly in your Cloudflare account (correct IP, port, TSIG).

</div>
</details>

<details>
<summary>Secondary DNS Primaries Failing</summary>
<div>

**Who is it for?**

Enterprise customers who have at least one secondary zone and want to receive a notification if at least one of their primary nameservers is failing.

**Included with**

Purchase of Secondary DNS.

**What should you do if you receive one?**

1. Confirm that the primary nameserver that is failing is up and running.
1. Confirm that the ACL on the primary nameserver that is failing is configured correctly. 
1. Confirm that the primary nameserver that is failing is configured correctly in your Cloudflare account (correct IP, port, TSIG).

</div>
</details>

<details>
<summary>Secondary DNS Successfully Updated</summary>
<div>

**Who is it for?**

Enterprise customers who have at least one secondary zone in their account and want to receive a notification on successful zone transfers.

**Included with**

Purchase of Secondary DNS.

**What should you do if you receive one?**

No action needed. Everything is working correctly.

</div>
</details>