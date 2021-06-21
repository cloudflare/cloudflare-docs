---
order: 7
pcx-content: reference
---

# What to do when receiving Notifications

Each Notification carries different types of information about the status of your Cloudflare account, or the type of action you can take. 

<TableWrap>

Notification | What should you do?
-------------|--------------------
Origin Error Rate Alert | 1. Use the link in the Notification you received to see which error codes we are seeing from your origin. <br/> 2. Refer to our [Troubleshooting Cloudflare 5XX errors](https://support.cloudflare.com/hc/en-us/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors) to learn how to troubleshoot these errors.
Dedicated SSL Alert | You only need to take action if notified that you have a certificate that failed. You can find the reasons why a certificate is not being issued in our [Troubleshooting SSL errors](https://support.cloudflare.com/hc/en-us/articles/200170566-Troubleshooting-SSL-errors#h_c1a6e78e-150d-4db6-89ab-eec7cb1ab03f).
Universal SSL Alert | You only need to take action if notified that you have a certificate that failed. You can find the reasons why a certificate is not being issued in our [Troubleshooting SSL errors](https://support.cloudflare.com/hc/en-us/articles/200170566-Troubleshooting-SSL-errors#h_c1a6e78e-150d-4db6-89ab-eec7cb1ab03f).
SSL for SaaS Custom Hostnames Alert | You only need to take action if notified that you have a certificate that failed. You can find the reasons why a certificate is not being issued in our [Troubleshooting SSL errors](https://support.cloudflare.com/hc/en-us/articles/200170566-Troubleshooting-SSL-errors#h_c1a6e78e-150d-4db6-89ab-eec7cb1ab03f).
HTTP DDoS Attack Alerter | No action needed. Refer to [Understanding Cloudflare DDoS alerts](https://support.cloudflare.com/hc/en-us/articles/360053216191-Understanding-Cloudflare-DDoS-alerts) for more information.
Layer 4 Attack Alerter | No action needed. Refer to [Understanding Cloudflare DDoS alerts](https://support.cloudflare.com/hc/en-us/articles/360053216191-Understanding-Cloudflare-DDoS-alerts) for more information.
Flow-based Monitoring: Volumetric Attack | You need to advertise your IP prefixes to enable Magic Transit. More information in our [Dynamic advertisement page](https://developers.cloudflare.com/byoip/dynamic-advertisement).
Passive Origin Monitoring | Refer to our [Troubleshooting Cloudflare 5XX errors](https://support.cloudflare.com/hc/en-us/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors) page to troubleshoot 521 errors.
Expiring Access Service Token Alert | Refresh your service token in the [Teams dashboard](https://dash.teams.cloudflare.com/) under **Configuration > Service Auth**.
Usage Based Billing | Review your usage of the product and adjust the configuration and/or increase the alerting threshold.
Script Monitor New Scripts Alert | Investigate to confirm it's an expected change.
Script Monitor New Domain Alert | Investigate to confirm it's an expected change.
Route Leak Detection Alert | Confirm your traffic is healthy: reach out to your transit providers to ensure you are behaving as expected and ask them to follow up with any providers accepting the unauthorized routes.
Secondary DNS all Primaries Failing | 1. Confirm that your primary nameservers are up and running. <br/> 2. Confirm that the ACLs on your primary nameservers are configured correctly. <br/> 3. Confirm that your primary nameservers are configured correctly in your Cloudflare account (correct IP, port, TSIG).
Secondary DNS Primaries Failing | 1. Confirm that the primary nameserver that is failing is up and running. <br/> 2. Confirm that the ACL on the primary nameserver that is failing is configured correctly. <br/> 3. Confirm that the primary nameserver that is failing is configured correctly in your Cloudflare account (correct IP, port, TSIG).
Secondary DNS Successfully Updated | No action needed. Everything is working correctly.

</TableWrap>
