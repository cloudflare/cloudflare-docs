---
title: Health Checks notifications
pcx_content_type: how-to
weight: 9
---

# Evaluate your Health Check or server

You can [configure notification emails](/health-checks/how-to/health-checks-notifications/#configure-notifications) to be alerted when the Health Check detects that there is a change in the status of your origin server. Cloudflare will send you an email within seconds so you can take the necessary action before customers are impacted.

The email provides information to determine what caused the health status change. You can evaluate when the change happened, the status of the origin server, if and why it is unhealthy, the expected response code, and the received response code.
	
## Configure notifications 

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. Navigate to **Traffic** > **Health Checks**.
3. Select **Configure an alert**.
4. Fill out the **Notification name** and **Description**. 
5. Add a Notification email.
6. Select **Next**.
7. Add health checks to include in your alerts.
8. Choose the **Notification trigger**, which determines when you receive alerts.
9. Select **Create**.

See [common error codes](/health-checks/health-checks-analytics/#common-error-codes) for more information regarding the cause of any changes to your Health Check.

Cloudflare encourages you to view your [Health Checks Analytics](/health-checks/health-checks-analytics/#common-error-codes) to get more context about the health of your servers over time. 

