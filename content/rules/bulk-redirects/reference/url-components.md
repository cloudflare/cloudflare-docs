---
title: Supported URL components
type: overview
pcx-content-type: reference
weight: 4
layout: list
meta:
  title: Supported URL components in Bulk Redirects
---

# Supported URL components in Bulk Redirects

The source and target URLs of a URL Redirect support different URL components.

In the reference table below, the provided URL component examples are based on the following URL:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://user:password@www.example.com:443/search?q=term#results</span></div></span></span></span></code></pre>{{</raw>}}

{{<table-wrap>}}

| URL component                                           | Supported in source URL                    | Supported in target URL                               |
| ------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------- |
| **Scheme**<br/>(for example, `https`)                   | Yes, `http` or `https` only<br/>(optional) | Yes                                                   |
| **User information**<br/>(for example, `user:password`) | No                                         | Yes (optional)                                        |
| **Host**<br/>(for example, `www.example.com`)           | Yes                                        | Yes (optional)                                        |
| **Port**<br/>(for example, `443`)                       | No                                         | Yes (optional)                                        |
| **Path**<br/>(for example, `/search`)                   | Yes                                        | Yes                                                   |
| **Query string**<br/>(for example, `q=term`)            | No                                         | Yes, if **Preserve query string** is false (optional) |
| **Fragment**<br/>(for example, `results`)               | No                                         | Yes (optional)                                        |

{{</table-wrap>}}

Bulk Redirects also support target URLs without an authority component, like the following URL:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">magnet:?xt=urn:btih:2bd9d334e8d1e5bd7768755173222db5c6dea13b&amp;dn=archlinux-2021.07.01-x86_64.iso</span></div></span></span></span></code></pre>{{</raw>}}
