---
title: Alerts
pcx_content_type: reference
weight: 4
meta:
  title: DDoS alerts
---

# DDoS alerts

Configure notifications to receive real-time alerts (within ~1 minute) about L3/4 and L7 DDoS attacks on your Internet properties, depending on your plan and services. You can choose from different delivery methods.

Each notification email includes the following information:

* Description
* Detection and mitigation time of attack
* Attack type
* Maximum rate of attack
* Attack target (zone, host, or IP address)
* Rule that matched the attack (ID and description)
* Rule override, if any

Cloudflare automatically sends weekly summaries of detected and mitigated DDoS attacks to Magic Transit and Spectrum BYOIP customers. Monthly application security reports are available for WAF/CDN customers. For more information, refer to [DDoS reports](/ddos-protection/reference/reports/).

{{<Aside type="note">}}
{{<render file="_alerts-and-reports-independent.md">}}
{{</Aside>}}

## Set up a notification for DDoS alerts

{{<render file="_create-notification.md">}}

## Edit an existing notification

To edit, delete, or disable a notification, go to your [account notifications](https://dash.cloudflare.com/?to=/:account/notifications).

---

## Alert types

Cloudflare can issue notifications for different types of DDoS attack alerts.

### Standard alerts

{{<available-notifications product="DDoS Protection" notificationName="HTTP DDoS Attack Alert">}}

{{<available-notifications product="DDoS Protection" notificationName="Layer 3/4 DDoS Attack Alert">}}

### Advanced alerts

{{<Aside type="note">}}
The availability of advanced DDoS attack alerts depends on your Cloudflare plan and subscribed services. Refer to [Availability](#availability) for details.
{{</Aside>}}

Advanced DDoS attack alerts support additional configuration, allowing you to filter the notifications you wish to receive.

{{<available-notifications product="DDoS Protection" notificationName="Advanced HTTP DDoS Attack Alert">}}
{{<available-notifications product="DDoS Protection" notificationName="Advanced Layer 3/4 DDoS Attack Alert">}}

You will also receive alerts for rules with a _Log_ action, containing information on what triggered the alert.

## Availability

The available alerts depend on your Cloudflare plan and subscribed services:

Alert type                           |     WAF/CDN     |      Spectrum      | Spectrum BYOIP  |  Magic Transit
-------------------------------------|:---------------:|:------------------:|:---------------:|:--------------:
HTTP DDoS Attack Alert               |       Yes       |         –          |        –        |        –
Advanced HTTP DDoS Attack Alert      | Yes<sup>1</sup> |         –          |        –        |        –
Layer 3/4 DDoS Attack Alert          |        –        | Yes<sup>2, 3</sup> |       Yes       | Yes<sup>3</sup>
Advanced Layer 3/4 DDoS Attack Alert |        –        |         –          | Yes<sup>2</sup> | Yes<sup>2</sup>

<sup>1</sup> _Only available to Enterprise customers with the Advanced DDoS Protection subscription._ <br>
<sup>2</sup> _Only available on an Enterprise plan._ <br>
<sup>3</sup> _Refer to [Final remarks](#final-remarks) for additional notes._

## Example notification

The following image shows an example notification delivered via email:

![Example notification email of a DDoS attack](/images/ddos-protection/ddos-notification-example.png)

To investigate a possibly ongoing attack, select **View Dashboard**. To go to the rule details in the Cloudflare dashboard, select **View Rule**.

## Final remarks

* Spectrum and Magic Transit customers using [assigned Cloudflare IP addresses](/magic-transit/cloudflare-ips/) will receive layer 3/4 DDoS attack alerts where the attacked target is the Cloudflare IP or prefix. If you have [brought your own IP (BYOIP)](/byoip/) to Cloudflare Spectrum or Magic Transit, you will see your own IP addresses or prefixes as the attacked target.

* In some cases, HTTP DDoS attack alerts will reference the attacked zone name instead of the attacked hostname. This occurs when the attack signature does not include information on the attacked hostname because it is not a strong indicator for identifying attack requests. For more information on attack signatures, refer to [How DDoS protection works](/ddos-protection/about/how-ddos-protection-works/).

* DDoS alerts are currently only available for DDoS attacks detected and mitigated by the [DDoS managed rulesets](/ddos-protection/managed-rulesets/). Alerts are not yet available for DDoS attacks detected and mitigated by the [Advanced TCP Protection](/ddos-protection/tcp-protection/) and the [Advanced DNS Protection](/ddos-protection/dns-protection/) system.

* You will not receive duplicate DDoS alerts within the same one-hour time frame.

* If you configure more than one alert type for the same kind of attack (for example, both an HTTP DDoS Attack Alert and an Advanced HTTP DDoS Attack Alert) you may get more than one notification when an attack occurs. To avoid receiving duplicate notifications, delete one of the configured alerts.
