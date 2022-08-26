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

Notifications for HTTP DDoS alerts delivered through webhook or PagerDuty will also include the target hostname.

You will not receive duplicate DDoS alerts within the same one-hour time frame.

Cloudflare automatically sends weekly summaries of detected and mitigated DDoS attacks to Magic Transit and Spectrum BYOIP customers. For more information, refer to [DDoS reports](/ddos-protection/reference/reports/).

## Set up a notification for DDoS alerts

To set up a notification:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.

2. Click **Notifications**.

3. Under **Notifications**, click **Add**.

4. Click **Select** next to one of the [available DDoS alerts](#alert-types) (depending on your plan and services):

    * HTTP DDoS Attack Alert
    * Layer 3/4 DDoS Attack Alert
    * Advanced HTTP DDoS Attack Alert
    * Advanced Layer 3/4 DDoS Attack Alert

5. Enter a notification name and (optionally) a description.

6. Configure a delivery method for the notification. The available delivery methods depend on your Cloudflare plan. For more information, refer to [Cloudflare Notifications](/fundamentals/notifications/).

7. If you are creating a notification for one of the advanced DDoS attack alerts, click **Next** and define the parameters that will filter the notifications you will receive.

8. Click **Save**.

## Edit an existing notification

To edit, delete, or disable a notification, go to your [account notifications](https://dash.cloudflare.com/?to=/:account/notifications).

---

## Alert types

Cloudflare can issue notifications for different types of DDoS attack alerts.

### Standard alerts

* **HTTP DDoS Attack Alert**: Alert for HTTP attacks that generate more than 2,000 requests per second.
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
    * The specific IP addresses for which you with to receive notifications.
    * The minimum packets-per-second rate that will trigger the alert (12,000 pps by default).

## Availability

The available alerts depend on your Cloudflare plan and subscribed services:

Alert type                           |     WAF/CDN     |    Spectrum     | Spectrum BYOIP  |  Magic Transit
-------------------------------------|:---------------:|:---------------:|:---------------:|:--------------:
HTTP DDoS Attack Alert               |       Yes       |        –        |        –        |        –
Advanced HTTP DDoS Attack Alert      | Yes<sup>1</sup> |        –        |        –        |        –
Layer 3/4 DDoS Attack Alert          |        –        | Yes<sup>2</sup> |       Yes       |       Yes
Advanced Layer 3/4 DDoS Attack Alert |        –        | Yes<sup>2</sup> | Yes<sup>2</sup> | Yes<sup>2</sup>

<sup>1</sup> _Only available to Enterprise customers with the Advanced DDoS add-on._ <br>
<sup>2</sup> _Only available on an Enterprise plan._

## Example notification

The following image shows an example notification delivered via email:

![Example notification email of a DDoS attack](/ddos-protection/static/ddos-notification-example.png)

To investigate a possibly ongoing attack, click **View Dashboard**.

## Final remarks

* If you configure more than one alert type for the same kind of attack (for example, both an HTTP DDoS Attack Alert and an Advanced HTTP DDoS Attack Alert) you may get more than one notification when an attack occurs. To avoid receiving duplicate notifications, delete one of the configured alerts.

* Events listed under [Firewall Events](/waf/analytics/paid-plans/) with the `Connection Close` mitigation action are not covered by DDoS alerts. Cloudflare only sends notifications when the mitigation action is one of the following: `force-conn-close`, `block`, `ratelimit`, or `captcha`.
