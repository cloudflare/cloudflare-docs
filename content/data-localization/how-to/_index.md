---
title: Configuration guides
pcx_content_type: navigation
weight: 7
---

# Configuration guides

Learn how to use Cloudflare products with the Data Localization Suite.

{{<directory-listing>}}

## Verify Regional Services behavior

In order to verify that Regional Services is working, customers can confirm the behavior by executing one of the following `curl` commands on a regionalized hostname:

```bash
curl -X GET -I https://<HOSTNAME>/ 2>&1 | grep cf-ray
```

```bash
curl -s https://<HOSTNAME>/cdn-cgi/trace | grep "colo="
```

The first command will return a three-letter IATA code in the [CF-Ray](/fundamentals/reference/http-request-headers/#cf-ray) header, indicating the Cloudflare data center location of processing and/or TLS termination. The second command will directly return the three-letter IATA code.

For example, when a hostname is configured to use the region European Union (EU), the three-letter IATA code will always return a data center inside of the EU.