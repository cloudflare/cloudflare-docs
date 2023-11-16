---
title: HTTP Traffic Alerts
pcx_content_type: reference
type: overview
layout: single
title: HTTP Traffic Alerts
---

# HTTP Traffic Alerts

## Error Rate

**Origin Error Rate** alerts allow you to monitor your zones at the origin and be alerted when Cloudflare detects elevated levels of 5XX error responses. You can select which zones to be alerted on and the sensitivity of the alerts. 

**Advanced Error Rate** alerts allow you to monitor either your origin or edge status code. You can select which zones and specific status codes to be alerted on and the sensitivity of the alert. Optionally, you can also filter out certain IP addresses and choose whether to group your alerts by status code.

Once you have set up an alert, Cloudflare checks to see which zones should be monitored for the error rate. The [Clickhouse ABR database](https://blog.cloudflare.com/explaining-cloudflares-abr-analytics/) is polled for origin HTTP response codes for those zones. The [service-level objective (SLO)](https://sre.google/workbook/alerting-on-slos/) that is set in the alert is used to determine whether the rate of 5XX response codes to total responses is acceptable. 

Instead of using thresholds to calculate error rates, Cloudflare uses burn rates. When you select your SLO, the “error budget” for a set period of time is calculated to determine the burn rate. The burn rate is how quickly the error budget is used for that time period. For example, a burn rate of 1 means that the entirety of the error budget will be used up within the set time period. 

For Error Rate alerts, Cloudflare uses the multi-window, multi-burn rate approach. We look at a short time period (five minutes) and a long time period (one hour) and only alert you if the error rate exceeds the burn rate for those time periods. This ensures that you are quickly alerted when an outage is detected within a short window, while simultaneously preventing too many false positives since the long window must also be triggered. 

{{<Aside type="note">}}
This approach does not work as well for low traffic zones. If there are not many requests, any single error might cause the burn rate to be exceeded. 
{{</Aside>}}

### Service-level objective recommendations

SLOs determine the sensitivity of an alert.  For example, if you want to be alerted on all spikes in 5XX errors, you should select high sensitivity. If you want to be alerted on only large spikes, you should select a lower sensitivity. 

Your traffic levels impact the accuracy of high sensitivity alerts. High sensitivity alerts are not recommended for zones with low traffic since the Error Rate alert will likely alert on every 5XX error. However, If you have a zone that has very high traffic (hundreds of millions of requests per day), High Sensitivity SLOs are recommended.

___

## Traffic Anomalies

Traffic Anomalies alerts must have a z-score of more than 3.5 or less than -3.5, and a total of more than 200 requests. A z-score is the number of standard deviations the current value is to the mean. The mean and standard deviation is calculated by comparing the current five minutes to the past four hours. This is measured every five minutes.

You can filter the alerts by domain, whether or not to include traffic already mitigated by the WAF and DoS, and specific status codes. You can also choose if you want to be alerted on drops and/or spikes in your traffic.