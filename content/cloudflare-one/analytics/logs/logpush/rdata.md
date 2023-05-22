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


samples = [
   {"type":"1","data":"BnJlZGRpdANjb20AAAEAAQAAALwABJdlwYw="},
   {"type":"5","data":"BnNlY3VyZQV3bHhycwNjb20AAAUAAQAADggAIgZzZWN1cmUEYmFzZQV3bHhycwNjb20GYWthZG5zA25ldAA="},
   {"type":"28","data":"Bmdvb2dsZQNjb20AABwAAQAAAGkAECYH+LBAIxAJAAAAAAAAAGU="}]


# Parse the Logpush RData.data field into Resource Records
# See section "4.1.3. Resource record format" of https://www.ietf.org/rfc/rfc1035.txt
# Includes Query Name, Query Type, Query Class, Response TTL, Response Data
for sample in samples:
   decoded = base64.b64decode(sample["data"])
   buffer = dnslib.DNSBuffer(decoded)
   r = dnslib.RR.parse(buffer)
   print("== Print the full Resource Record ==")
   print(r)
   print("== Print invidual components of the Resource Record ==")
   query_name = r.rname
   query_type = r.rtype
   query_class = r.rclass
   response_ttl = r.ttl
   response_data = r.rdata
   print(f"query name: {query_name} | query type: {query_type} | query class: {query_class} | ttl: {response_ttl} | rdata: {response_data}\n")
```

Example output:

```txt
== Print the full Resource Record ==
reddit.com.             188     IN      A       151.101.193.140
== Print invidual components of the Resource Record ==
query name: reddit.com. | query type: 1 | query class: 1 | ttl: 188 | rdata: 151.101.193.140

== Print the full Resource Record ==
secure.wlxrs.com.       3592    IN      CNAME   secure.base.wlxrs.com.akadns.net.
== Print invidual components of the Resource Record ==
query name: secure.wlxrs.com. | query type: 5 | query class: 1 | ttl: 3592 | rdata: secure.base.wlxrs.com.akadns.net.

== Print the full Resource Record ==
google.com.             105     IN      AAAA    2607:f8b0:4023:1009::65
== Print invidual components of the Resource Record ==
query name: google.com. | query type: 28 | query class: 1 | ttl: 105 | rdata: 2607:f8b0:4023:1009::65
```
