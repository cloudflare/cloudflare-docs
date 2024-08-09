---
title: Available parameters
pcx_content_type: reference
weight: 2
---

# Available parameters

You can pull information for a message in [search detections](/email-security/reporting/search/) using the following parameters:

- From (`envelope_from`)
- From Name
- To (any) (`envelope_to`)
- To Name (any)
- Cc (any)
- ReplyTo
- Subject (any)
- Sent DateTime (formatted as `YYYY-MM-DDTHH:MM:SS`)
- Received DateTime (formatted as `YYYY-MM-DDTHH:MM:SS`)
- final_disposition
- alert_id
- sha256 (attachments)
- ssdeep (attachments)
- name (attachments)
- md5 (attachments)
- Message-ID
- smtp_helo_server_ip
- smtp_previous_hop_ip
- x_originating_ip
- Reason(s) for Detection

## Search terms

In addition to the message parameters above, you can use these additional detection search strings:

- phish_submission
- phish_submission_response
- user_submission
- team_submission
- auto-retraction
- browser_isolation_rewrite

For {{<glossary-tooltip term_id="disposition">}}disposition{{</glossary-tooltip>}}-specific submission searches, refer to [Service Addresses](https://horizon.area1security.com/support/service-addresses) in the Email Security dashboard. 

## Data retention

For Email Security Horizon Enterprise customers, detections search would index for a period of 12 months and rotate over to a rolling 12-month period.

For Email Security Horizon Advantage customers, detections search would index for three months and rotate over to a rolling 3-month period.
