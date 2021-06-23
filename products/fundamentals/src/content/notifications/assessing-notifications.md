---
order: 7
pcx-content: reference
---

# What to do when receiving Notifications

Each Notification carries different types of information about the status of your Cloudflare account, or the type of action you can take. 

If you receive one of these notifications, click below to see what you can do.

<details>
<summary>Origin Error Rate Alert</summary>
<div>

**What should you do?**

1. Use the link in the Notification you received to see which error codes we are seeing from your origin.
1. Refer to our [Troubleshooting Cloudflare 5XX errors](https://support.cloudflare.com/hc/en-us/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors) to learn how to troubleshoot these errors.

</div>
</details>

<details>
<summary>Dedicated SSL Alert</summary>
<div>

**What should you do?**

You only need to take action if notified that you have a certificate that failed. You can find the reasons why a certificate is not being issued in our [Troubleshooting SSL errors](https://support.cloudflare.com/hc/en-us/articles/200170566-Troubleshooting-SSL-errors#h_c1a6e78e-150d-4db6-89ab-eec7cb1ab03f).

</div>
</details>

<details>
<summary>Universal SSL Alert</summary>
<div>

**What should you do?**

You only need to take action if notified that you have a certificate that failed. You can find the reasons why a certificate is not being issued in our [Troubleshooting SSL errors](https://support.cloudflare.com/hc/en-us/articles/200170566-Troubleshooting-SSL-errors#h_c1a6e78e-150d-4db6-89ab-eec7cb1ab03f).

</div>
</details>

<details>
<summary>SSL for SaaS Custom Hostnames Alert</summary>
<div>

**What should you do?**

You only need to take action if notified that you have a certificate that failed. You can find the reasons why a certificate is not being issued in our [Troubleshooting SSL errors](https://support.cloudflare.com/hc/en-us/articles/200170566-Troubleshooting-SSL-errors#h_c1a6e78e-150d-4db6-89ab-eec7cb1ab03f).

</div>
</details>

<details>
<summary>HTTP DDoS Attack Alerter</summary>
<div>

**What should you do?**

No action needed. Refer to [Understanding Cloudflare DDoS alerts](https://support.cloudflare.com/hc/en-us/articles/360053216191-Understanding-Cloudflare-DDoS-alerts) for more information.

</div>
</details>

<details>
<summary>Layer 4 Attack Alerter</summary>
<div>

**What should you do?**

No action needed. Refer to [Understanding Cloudflare DDoS alerts](https://support.cloudflare.com/hc/en-us/articles/360053216191-Understanding-Cloudflare-DDoS-alerts) for more information.

</div>
</details>

<details>
<summary>Flow-based Monitoring: Volumetric Attack</summary>
<div>

**What should you do?**

You need to advertise your IP prefixes to enable Magic Transit. More information in our [Dynamic advertisement page](https://developers.cloudflare.com/byoip/dynamic-advertisement).

</div>
</details>

<details>
<summary>Passive Origin Monitoring</summary>
<div>

**What should you do?**

Refer to our [Troubleshooting Cloudflare 5XX errors](https://support.cloudflare.com/hc/en-us/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors) page to troubleshoot 521 errors.

</div>
</details>

<details>
<summary>Expiring Access Service Token Alert</summary>
<div>

**What should you do?**

Refresh your service token in the [Teams dashboard](https://dash.teams.cloudflare.com/) under **Configuration > Service Auth**.

</div>
</details>

<details>
<summary>Usage Based Billing</summary>
<div>

**What should you do?**

Review your usage of the product and adjust the configuration and/or increase the alerting threshold.

</div>
</details>

<details>
<summary>Script Monitor New Scripts Alert</summary>
<div>

**What should you do?**

Investigate to confirm it's an expected change.

</div>
</details>

<details>
<summary>Script Monitor New Domain Alert</summary>
<div>

**What should you do?**

Investigate to confirm it's an expected change.

</div>
</details>

<details>
<summary>Route Leak Detection Alert</summary>
<div>

**What should you do?**

Confirm your traffic is healthy: reach out to your transit providers to ensure you are behaving as expected and ask them to follow up with any providers accepting the unauthorized routes.

</div>
</details>

<details>
<summary>Secondary DNS all Primaries Failing</summary>
<div>

**What should you do?**

1. Confirm that your primary nameservers are up and running.
1. Confirm that the ACLs on your primary nameservers are configured correctly.
1. Confirm that your primary nameservers are configured correctly in your Cloudflare account (correct IP, port, TSIG).

</div>
</details>

<details>
<summary>Secondary DNS Primaries Failing</summary>
<div>

**What should you do?**

1. Confirm that the primary nameserver that is failing is up and running.
1. Confirm that the ACL on the primary nameserver that is failing is configured correctly. 
1. Confirm that the primary nameserver that is failing is configured correctly in your Cloudflare account (correct IP, port, TSIG).
Secondary DNS Successfully Updated | No action needed. Everything is working correctly.

</div>
</details>

<details>
<summary>Secondary DNS Successfully Updated</summary>
<div>

**What should you do?**

No action needed. Everything is working correctly.

</div>
</details>