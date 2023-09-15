---
_build:
  publishResources: false
  render: never
  list: never
---

To set up a notification:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.

2. Select **Notifications**.

3. Under **Notifications**, select **Add**.

4. Select one of the [available DDoS alerts](/ddos-protection/reference/alerts/#alert-types) (depending on your plan and services):

    * HTTP DDoS Attack Alert
    * Layer 3/4 DDoS Attack Alert
    * Advanced HTTP DDoS Attack Alert
    * Advanced Layer 3/4 DDoS Attack Alert

5. Enter a notification name and (optionally) a description.

6. Configure a delivery method for the notification. The available delivery methods depend on your Cloudflare plan. For more information, refer to [Cloudflare Notifications](/notifications/).

7. If you are creating a notification for one of the advanced DDoS attack alerts, select **Next** and define the parameters that will filter the notifications you will receive.

8. Select **Save**.