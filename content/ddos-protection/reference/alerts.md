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
* Attack target
* Rule that matched the attack (ID and description)
* Rule override, if any

Notifications for HTTP DDoS alerts delivered through webhook or PagerDuty will also include the target hostname.

You will not receive duplicate DDoS alerts within the same one-hour time frame.

Cloudflare automatically sends weekly summaries of detected and mitigated DDoS attacks to Magic Transit and Spectrum BYOIP customers. For more information, refer to [DDoS reports](/ddos-protection/reference/reports/).

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

* **HTTP DDoS Attack Alert**: Alert for HTTP attacks that generate more than 100 requests per second.
* **Layer 3/4 DDoS Attack Alert**: Alert for Layer 3/4 attacks that generate more than 20,000 packets per second.

### Advanced alerts

{{<Aside type="note">}}
The availability of advanced DDoS attack alerts depends on your Cloudflare plan and subscribed services. Refer to [Availability](#availability) for details.
{{</Aside>}}

Advanced DDoS attack alerts support additional configuration, allowing you to filter the notifications you wish to receive.

* **Advanced HTTP DDoS Attack Alert**: Customizable alert for HTTP attacks that generate more than the configured number of requests per second (100 rps by default). Supports the following configuration parameters:

    * The zones in your account for which you wish to receive notifications.
    * The specific hostnames for which you wish to receive notifications.
    * The minimum requests-per-second rate that will trigger the alert (100 rps by default).

* **Advanced Layer 3/4 DDoS Attack Alert**: Customizable alert for Layer 3/4 attacks that generate more than the configured number of packets per second (12,000 pps by default). Supports the following configuration parameters:

    * The IP prefixes for which you wish to receive notifications.
    * The specific IP addresses for which you wish to receive notifications.
    * The minimum packets-per-second rate that will trigger the alert (12,000 pps by default).
    * The minimum megabits-per-second rate that will trigger the alert.
    * The protocols for which you wish to receive notifications (all protocols by default).

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

* DDoS alerts are currently only available for DDoS attacks detected and mitigated by the [DDoS managed rulesets](/ddos-protection/managed-rulesets/). Alerts are not yet available for DDoS attacks detected and mitigated by the [Advanced TCP Protection](/ddos-protection/tcp-protection/) system.

* If you configure more than one alert type for the same kind of attack (for example, both an HTTP DDoS Attack Alert and an Advanced HTTP DDoS Attack Alert) you may get more than one notification when an attack occurs. To avoid receiving duplicate notifications, delete one of the configured alerts.

* Events listed under [Security Events](/waf/security-events/paid-plans/) with the `Connection Close` mitigation action are not covered by DDoS alerts. Cloudflare only sends notifications when the mitigation action is one of the following: `force-conn-close`, `block`, `ratelimit`, or `captcha`.
