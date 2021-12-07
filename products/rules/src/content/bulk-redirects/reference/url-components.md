---
order: 3
type: overview
pcx-content-type: reference
---

# Supported URL components

The source and target URLs support different URL components.

In the following reference table, the provided URL component examples are based on the following URL:

```txt
https://user:password@www.example.com:443/search?q=term#results
```
<TableWrap>

URL component | Supported in source URL | Supported in target URL
---|---|---
**Scheme**<br/>(for example, `https`) | Yes (`http` or `https` only) | Yes
**User information**<br/>(for example, `user:password`) | No | Yes (optional)
**Host**<br/>(for example, `www.example.com`) | Yes | Yes (optional)
**Port**<br/>(for example, `443`) | No | Yes (optional)
**Path**<br/>(for example, `/search`) | Yes | Yes
**Query string**<br/>(for example, `q=term`) | No | Yes, if **Preserve query string** is false (optional)
**Fragment**<br/>(for example, `results`) | No | Yes (optional)

</TableWrap>

Bulk Redirects also support target URLs without an authority component, like the following URL:

```txt
magnet:?xt=urn:btih:2bd9d334e8d1e5bd7768755173222db5c6dea13b&dn=archlinux-2021.07.01-x86_64.iso
```
