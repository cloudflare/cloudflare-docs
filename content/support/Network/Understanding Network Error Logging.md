---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360050691831-Understanding-Network-Error-Logging
title: Understanding Network Error Logging
---

# Understanding Network Error Logging



## Overview

Cloudflare Network Error Logging (NEL) is available in all Cloudflare data centers.  NEL is a browser-based technology used to quickly identify problems with site visitors connecting to Cloudflare.  NEL is a public component built into browsers.   

Network Error Logging can be used to help triage end-user connectivity issues that our customers’ end users experience.  Some incidents on the Internet can be scoped to specific Internet Service Providers (ISPs) in certain locations due to physical activity on the network (maintenance, fiber cuts, sporting events, etc.).  Having the location/ASN data allows engineers to root cause external provider issues and rule out Cloudflare as a root cause.

Connectivity loss can also result from end users changing IP addresses. For example, an end user may connect to a site from a home Wi-Fi and then leave their house.  The change from the home Wi-Fi network to a mobile network changes the end user’s IP address, interrupts any current connections, and could be reported as TCP.abort or TCP.timed\_out failures.  By comparing the last known good client IP with the client IP that reported the failure, Cloudflare determines whether the failures were due to a roaming end user.  The diagram below shows how NEL captures connectivity losses resulting from end user IP changes:

![Diagram showing how Network Error Logging captures connectivity losses resulting from end user IP changes. For more details, continue reading.](/images/support/pasted_image_0__1_.png)

**NEL process**:

1.  User moves from Wi-Fi to mobile.
2.  Customer connects via mobile IP.
3.  All connections made to Cloudflare over Wi-Fi are timed out due to src-dest mismatch.
4.  Connections are re-established over mobile connections and the user reports failures over their mobile connection to the Cloudflare NEL endpoint.

The Report-To header is present in all requests to Cloudflare zones that have NEL enabled:  

```txt
report-to: {"group":"cf-nel","max_age":31536000,"endpoints":[{"url":"`[`https://a.nel.cloudflare.com/report?lkg-colo=lhr&lkg-time=1600338181`](https://gcp.nel.cloudflare.com/report?lkg-colo=lhr&lkg-time=1600338181&lkg-ip=1.1.1.1)`"}]}
```

A sample Network Error Report payload appears as follows:


```json
{
  "age": 20,
  "type": "network-error",
  "url": "https://example.com/previous-page",
  "body": {
    "elapsed_time": 18,
    "method": "POST",
    "phase": "dns",
    "protocol": "http/1.1",
    "referrer": "https://example.com/previous-page",
    "sampling_fraction": 1,
    "server_ip": "",
    "status_code": 0,
    "type": "dns.name_not_resolved",
    "url": "https://example-host.com/"
  }
}
```

Cloudflare NEL uses end-user IP address to determine the following:

-   an estimate of the client's location (country, city),
-   the client's Autonomous System Number (ASN), and
-   whether the client changed IP addresses before they experienced a failure.

The client IP address is only stored in volatile memory for the lifetime of the request to Cloudflare’s NEL endpoint (order of milliseconds) and is dropped immediately after the request completes. Cloudflare does not log the client IP address anywhere in the Network Error Logging pipeline. Customers can opt out of having their end users consume the NEL headers by emailing Cloudflare support.

___

## Related resources

-   [Developer documentation](/network-error-logging/)
-   [Error references](/network-error-logging/reference/)
-   [Logpush dataset](/logs/reference/log-fields/zone/nel_reports/)
-   [W3C specification](https://www.w3.org/TR/network-error-logging/)[](https://developers.google.com/web/updates/2018/09/reportingapi)
-   [Google Chrome integration](https://developers.google.com/web/updates/2018/09/reportingapi)
