---
pcx_content_type: concept
title: RData
weight: 1
---

# RData

Cloudflare Gateway logs DNS query information in [RData](https://datatracker.ietf.org/doc/html/rfc1035#section-4.1.3), a Base64-encoded binary format. The output is a list of objects including:

- Query name
- Query type
- Query class
- Response TTL
- Response data

## Parse RData

To parse RData from Logpush, use the following Python code:

```python
import dnslib
import base64
import json

samples = [
    {<rdata samples>}
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
