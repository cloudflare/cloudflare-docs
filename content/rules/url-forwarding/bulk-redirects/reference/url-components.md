---
title: Supported URL components
type: overview
pcx_content_type: reference
weight: 4
layout: wide
meta:
  title: Supported URL components in Bulk Redirects
---

# Supported URL components in Bulk Redirects

The source and target URLs of a URL redirect support different URL components.

In the reference table below, the provided URL component examples are based on the following URL:

```txt
https://user:password@www.example.com:443/search?q=term#results
```

{{<table-wrap>}}

| URL component                                           | Supported in source URL                    | Supported in target URL                               |
| ------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------- |
| **Scheme**<br/>(for example, `https`)                   | Yes, `http` or `https` only<br/>(optional) | Yes                                                   |
| **User information**<br/>(for example, `user:password`) | No [^1]                                    | Yes (optional)                                        |
| **Host**<br/>(for example, `www.example.com`)           | Yes                                        | Yes (optional)                                        |
| **Port**<br/>(for example, `443`)                       | No [^1]                                    | Yes (optional)                                        |
| **Path**<br/>(for example, `/search`)                   | Yes                                        | Yes                                                   |
| **Query string**<br/>(for example, `q=term`)            | No [^1]                                    | Yes, if **Preserve query string** is false (optional) [^2]: |
| **Fragment**<br/>(for example, `results`)               | No [^1]                                    | Yes (optional)                                        |

{{</table-wrap>}}

Bulk Redirects also support target URLs without an authority component [^3], like the following URL:

```txt
magnet:?xt=urn:btih:2bd9d334e8d1e5bd7768755173222db5c6dea13b&dn=archlinux-2021.07.01-x86_64.iso
```
[^1]: The URL component is not supported as a matching component (so it should not be included in Source URL inserted) but it will be passed to the target URL if the correspondant flag is set to TRUE.

[^2]: The target URL query string can only be added if the original query string was not retained (Preserve query string set to false). If the query string is being retained then this will be passed along where the Source URL matches.

[^3]: The URL authority is the combination of user information, host, and port components.
