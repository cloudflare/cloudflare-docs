---
title: Overview
pcx_content_type: overview
weight: 1
meta:
  title: Network Error Logging
---

# Network Error Logging

Network Error Logging (NEL) is a browser-based reporting system that allows users to report their own failures to an external endpoint. You can use Network Error Logging to gain insight into connectivity issues on the Internet to learn when and where an incident is happening, who is impacted, and how they are being impacted.

## The last mile

The last mile is the path from a user to the first point of ingress to the resource, whether that be a network like Cloudflare or directly to the origin server. The last mile is important because it is in the critical path of the request for a resource: if the last mile has issues, users cannot connect to their resources. When Network Error Logging is enabled, you can receive alerts about issues in the last mile — which are typically difficult to detect — to learn what the problem is and how to fix it.

![The last mile diagram, showing the steps involved in delivering data to a customer](/images/network-error-logging/last-mile.png)

## Privacy

Cloudflare uses geolocation lookups to extract the following information from every client IP in a NEL report:

*   Client ASN
*   Client country
*   Client metro area

Cloudflare uses internal lookups to associate the above data with a customer domain and customer account.

Cloudflare does not store any PII or user-specific data, and any IP data is only kept for the duration of the request as it is processed. After the report is processed through the NEL pipeline, all PII data is purged from the system. For more information, refer to [Understanding Network Error Logging](https://support.cloudflare.com/hc/en-us/articles/360050691831-Understanding-Network-Error-Logging).
