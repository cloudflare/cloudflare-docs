---
pcx_content_type: reference
title: Outages
weight: 7
---

# Outages

[Cloudflare Radar Outage Center (CROC)](https://radar.cloudflare.com/outage-center) provides data on outages occurring around the world.

Refer the [blog post](https://blog.cloudflare.com/announcing-cloudflare-radar-outage-center/) for more information but, in short, Radar provides the following information:

- **Location**: Where was the outage?
- **ASN**: What autonomous system experienced a disruption in connectivity?
- **Type**: How broad was the outage? Did connectivity fail nationwide, or at a sub-national level? Did just a single network provider have an outage?
- **Scope**: If it was a sub-national/regional outage, what state or city was impacted? If it was a network-level outage, which one was it?
- **Cause**: Insight into the likely cause of the outage, based on publicly available information. Historically, some outages have been government directed shutdowns, while others are caused by severe weather or natural disasters, or by infrastructure issues such as cable cuts, power outages, or filtering/blocking.
- **Start time**: When did the outage start?
- **End time**: When did the outage end?

## List of endpoints

### Outages

#### Example: Get outages in the last 7 days

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/annotations/outages?limit=5&offset=0&dateRange=7d&format=json" \
     -H "Authorization: Bearer <API_TOKEN>"
```

```json
"result": {
  "annotations": [{
    "dataSource": "ALL",
    "description": null,
    "scope": "Multiple regions/cities",
    "startDate": "2022-10-25T00:00:00Z",
    "endDate": null,
    "locations": ["UA"],
    "asns": [],
    "eventType": "OUTAGE",
    "linkedUrl": "https://www.npr.org/2022/10/22/1130742768/ukraine-power-grid-outages-record-damage",
    "outage": {
      "outageCause": "POWER_OUTAGE",
      "outageType": "REGIONAL"
    }
  }, {
    "dataSource": "ALL",
    "description": null,
    "scope": "Multiple cities in Florida",
    "startDate": "2022-09-28T19:00:00Z",
    "endDate": "2022-11-02T00:00:00Z",
    "locations": ["US"],
    "asns": [],
    "eventType": "OUTAGE",
    "linkedUrl": "https://twitter.com/CloudflareRadar/status/1575229448353349632",
    "outage": {
      "outageCause": "WEATHER",
      "outageType": "REGIONAL"
    }
  }]
}
```

Refer to the [API reference](/api/operations/radar_get_AnnotationsOutages) for more information regarding this endpoint.

Having data on a given outage allows you to examine its impact through both [Netflows](/radar/investigate/netflows/) (like in the [Tonga outage](/radar/get-started/making-comparisons/#use-specific-timestamps) and [others](https://blog.cloudflare.com/q3-2022-internet-disruption-summary/)) and [HTTP](/radar/investigate/http-requests/) data (for example, did the outage affect more mobile than desktop traffic?).
