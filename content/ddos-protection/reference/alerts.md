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

2. Select **Notifications**.

3. Under **Notifications**, select **Add**.

4. Select one of the [available DDoS alerts](#alert-types) (depending on your plan and services):

    * HTTP DDoS Attack Alerter
    * Layer 4 Attack Alerter

5. Enter a notification name and (optionally) a description.

6. Configure a delivery method for the notification. The available delivery methods depend on your Cloudflare plan. For more information, refer to [Cloudflare Notifications](/fundamentals/notifications/).

7. Select **Save**.

## Edit an existing notification

To edit, delete, or disable a notification, go to your [account notifications](https://dash.cloudflare.com/?to=/:account/notifications).

---

## Alert types

Cloudflare can issue notifications for two kinds of DDoS alerts:

* **HTTP DDoS attack**: For HTTP attacks with a duration over two minutes that generate more than 2,000 requests per second.
* **L3/L4 (network/transport layer) DDoS attack**: For Layer 3/4 attacks with a duration over two minutes that generate more than 20,000 packets per second.

The available notifications depend on your Cloudflare plan and services:

Notification type     | WAF/CDN | Spectrum | Spectrum BYOIP | Magic Transit
----------------------|:-------:|:--------:|:--------------:|:------------:
HTTP DDoS attack      | Yes     | –        | –              | –
Layer 3/4 DDoS attack | –       | Yes\*    | Yes            | Yes

\* _Only available on an Enterprise plan._

## Example notification

The following image shows an example notification delivered via email:

![Example notification email of a DDoS attack](/ddos-protection/static/ddos-notification-example.png)

To investigate a possibly ongoing attack, select **View Dashboard**.

## Final remarks

Events listed under [Firewall Events](/waf/analytics/paid-plans/) with the `Connection Close` mitigation action are not covered by DDoS alerts. Cloudflare only sends notifications when the mitigation action is one of the following: `force-conn-close`, `block`, `ratelimit`, or `captcha`.
