---
title: Infrastructure
pcx_content_type: reference
weight: 3
---

# Infrastructure

## China data centers

As of March 2022, there are more than 40 data centers operated by JD Cloud spanning over 35 cities across mainland China.

For up-to-date information, refer to the [Cloudflare China Network](https://www.cloudflare.com/china-network/) page.

### Network IP addresses

Cloudflare publishes a list of IP addresses for JD Cloud data centers, used by Cloudflare when connecting to the origin networks of customers to retrieve assets. These addresses are not the same IP addresses returned to website visitors as part of DNS resolution.

You can obtain the list of JD Cloud data center IP addresses via Cloudflare API. Use the [JD Cloud IP Details](/api/operations/cloudflare-i-ps-cloudflare-ip-details-jdcloud) operation with the `networks=jdcloud` query string parameter:

```sh
---
header: Example request
---
$ curl https://api.cloudflare.com/client/v4/ips?networks=jdcloud
```

IP addresses of JD Cloud data centers will be returned in the `jdcloud_cidrs` array:

```json
---
header: Example response
highlight: [9,10,11]
---
{
  "result": {
    "ipv4_cidrs": [
      // (...)
    ],
    "ipv6_cidrs": [
      // (...)
    ],
    "jdcloud_cidrs": [
      // (...)
    ],
    "etag": "<ETAG>"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

Cloudflare will add new IP addresses to this list 30 days in advance before connecting from those IP addresses to an origin server. If you are using the China Network on JD Cloud, you should update your firewalls to reflect any IP address changes at least once every 30 days.

## Certifications

JD Cloud's infrastructure has the following certifications:

* ISO/IEC 27001 Audit and Certification
* ISO/IEC 27018 Audit and Certification
* CSA C-STAR (Security, Trust & Assurance Registry) Certificate
* Certificate of PCI DSS Compliance

