---
title: Notifications
pcx-content-type: reference
weight: 4
meta:
  title: DDoS notifications
---

# DDoS notifications

Configure notifications to receive real-time alerts (within ~1 minute) on L3/4 and L7 DDoS attacks on your Internet properties, depending on your plan and services. You can choose from different delivery methods.

Each notification email includes the following information:

* Description
* Detection and mitigation time of attack
* Attack type
* Maximum rate of attack
* Attack target

HTTP DDoS notifications delivered through webhook or PagerDuty will also include the target hostname.

Cloudflare automatically sends weekly summaries of detected and mitigated DDoS attacks to Magic Transit and Spectrum BYOIP customers. For more information, refer to [DDoS reports](/ddos-protection/reference/reports/).

## Set up a DDoS notification

To set up a notification:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.

2. Navigate to **Account Home** > **Notifications**.

3. Under **Notifications**, click **Add**.

4. Click **Select** next to one of the [available DDoS notifications](#notification-types) (depending on your plan and services):

    * HTTP DDoS Attack Alerter
    * Layer 4 Attack Alerter

5. Enter a notification name and (optionally) a description.

6. Configure a delivery method for the notification. The available delivery methods depend on your Cloudflare plan. For more information, refer to [Cloudflare Notifications](/fundamentals/notifications/).

7. Click **Save**.

## Edit an existing notification

To edit, delete, or disable a notification, go to your [account notifications](https://dash.cloudflare.com/?to=/:account/notifications).

---

## Notification types

Cloudflare can issue two kinds of DDoS notifications:

* **HTTP DDoS attack**: For HTTP attacks with a duration over 2 minutes that generate more than 2,000 requests per second.
* **L3/L4 (network/transport layer) DDoS attack**: For Layer 3/4 attacks with a duration over 2 minutes that generate more than 20,000 packets per second.

The available notifications depend on your Cloudflare plan and services:

Notification type     | WAF/CDN | Spectrum | Spectrum BYOIP | Magic Transit
----------------------|:-------:|:--------:|:--------------:|:------------:
HTTP DDoS attack      | Yes     | –        | –              | –
Layer 3/4 DDoS attack | –       | Yes\*    | Yes            | Yes

\* Only available on an Enterprise plan.

## Example notification

The following image shows an example notification delivered via email:

![Example notification email of a DDoS attack](/ddos-protection/static/ddos-notification-example.png)

## Final remarks

Events listed under Firewall Events with the `Connection Close` mitigation action are not covered by DDoS notifications. Cloudflare only sends DDoS notifications when the mitigation action is one of the following: `force-conn-close`, `block`, `ratelimit`, or `captcha`.
