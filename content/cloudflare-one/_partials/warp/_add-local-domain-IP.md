---
_build:
  publishResources: false
  render: never
  list: never
---

In **DNS Servers**, enter the IP address of the DNS server that should resolve that domain name.

   - WARP tries all servers and always uses the fastest response, even if that response is `no records found`.
   - We recommend specifying at least one DNS server for each domain. If a value is not specified, the WARP client will try to identify the DNS server (or servers) used on the device before it started, and use that server for each domain in the Local Domain Fallback list.