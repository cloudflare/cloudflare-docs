---
pcx-content-type: interim
order: 6
---

# Alerting and reporting

## DDoS Alerts

Configure a [DDoS Alert](https://support.cloudflare.com/hc/articles/360053216191) notification policy to receive real-time notifications on L3/4 and L7 DDoS attacks, depending on your plan and service. Choose from different delivery methods like email, Webhook integration, and PagerDuty, depending on your Cloudflare plan.

## DDoS Reports

To download ad-hoc DDoS reports, [export a report from the Firewall Analytics dashboard](https://developers.cloudflare.com/waf/analytics/paid-plans#print-or-download-pdf-report).

Additionally, if you are a Magic Transit customer, you will receive [weekly DDoS reports](https://support.cloudflare.com/hc/articles/360053233231) by email. These reports include the DDoS activity summary, insights, and trends over time.

## DDoS Logs

Retrieve HTTP events using [Cloudflare Logs](https://developers.cloudflare.com/logs/) to integrate them into your SIEM systems.

Additionally, if you are a Magic Transit or a Spectrum customer on an Enterprise plan, you can also export L3/4 traffic and DDoS attack logs using the GraphQL API and feed this information into your SIEM systems. For more information, refer to the [Export GraphQL data to CSV tutorial](https://developers.cloudflare.com/analytics/graphql-api/tutorials/export-graphql-to-csv).
