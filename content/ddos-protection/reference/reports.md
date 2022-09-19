---
title: Reports
pcx_content_type: reference
weight: 3
meta:
  title: DDoS reports
---

# DDoS reports

To download an ad-hoc DDoS report, generate a PDF report file by selecting **Print report** in your [analytics dashboard](/ddos-protection/reference/analytics/). WAF/CDN customers can download a weekly report by navigating to Account Home > **Security Center**, selecting **Security Reports**, and downloading the desired weekly report.

Additionally, if you are a Magic Transit or Spectrum BYOIP customer, you will receive weekly DDoS reports by email with a snapshot of the DDoS attacks that Cloudflare detected and mitigated in the previous week.

## Weekly DDoS reports

Cloudflare sends DDoS reports via email from `no-reply@notify.cloudflare.com` to users with the Super Administrator role on accounts with prefixes advertised by Cloudflare.

Reports contain the following information:

* Total number of DDoS attacks
* Largest DDoS attack in packets per second (pps) and bits per second (bps)
* Changes in DDoS attacks compared to the previous report
* Top attack vectors
* Top targeted IP addresses
* Top targeted destination ports
* Total potential downtime prevented (a sum of the duration of all attacks in that week)
* Total bytes mitigated (a sum of all the mitigated attack traffic)

Cloudflare issues DDoS reports via email each Tuesday. Reports summarize the attacks that occurred from Monday of the previous week to Sunday of the current week. For example, a report issued Tuesday, November 10th, 2020 summarizes activity from Monday the 2nd to Sunday the 8th.

To receive real-time attack alerts, configure [DDoS alerts](/ddos-protection/reference/alerts/).

### Example report

The following image shows an example DDoS report:

![Example email sent with a weekly DDoS report](/ddos-protection/static/ddos-report-email.png)

When Cloudflare does not detect any L3/4 DDoS attacks in the prior week, Cloudflare sends a confirmation report:

![Example report email sent when Cloudflare does not detect any DDoS attack in the previous week](/ddos-protection/static/ddos-report-no-attacks.png)

### Manage reporting subscriptions

Magic Transit and Spectrum BYOIP customers will receive the weekly DDoS report automatically.

To stop receiving DDoS reports, select the unsubscribe link at the bottom of the report email. To resubscribe after opting out, contact Cloudflare support.
