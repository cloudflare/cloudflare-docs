---
pcx_content_type: concept
title: RData
weight: 39
---

# RData

RData output provides the full response for a DNS query in a [base64-encoded binary format](https://datatracker.ietf.org/doc/html/rfc1035#section-3.3).

Cloudflare Gateway's [Logpush integration](/logs/reference/log-fields/account/gateway_dns/) outputs Rdata for DNS queries.

## Parse output

The Rdata output contains a number of extra bytes. To parse the output, use the following Python code:

```python
import dnslib
import base64
import json

samples = [
    {"type":"1","data":"<base64 sample>"},
    {"type":"1","data":"<base64 sample>"},
    {"type":"1","data":"<base64 sample>"},
    {"type":"1","data":"<base64 sample>"},
]

for sample in samples:
    decoded = base64.b64decode(sample["data"])
    buffer = dnslib.DNSBuffer(decoded)
    r = dnslib.RR.parse(buffer)
    print("Print the full Resource Record")
    print(r)
    print("Print invidual components of the Resource Record")
    query_name = r.rname
    query_type = r.rtype
    query_class = r.rclass
    response_ttl = r.ttl
    response_data = r.rdata
    print(f"query name: {query_name} | query type: {query_type} | query class: {query_class} | ttl: {response_ttl} | rdata: {response_data}\n")
```
