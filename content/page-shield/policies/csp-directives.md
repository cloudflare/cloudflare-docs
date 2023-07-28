---
title: Supported CSP directives
pcx_content_type: reference
weight: 6
meta:
  description: CSP directives supported by policies
---

# CSP directives supported by policies

Page Shield monitors scripts loaded on your website and the connections they make. Monitored resources are displayed in the [**Monitors** dashboard](/page-shield/detection/monitor-connections-scripts/).

Page Shield policies support most Content Security Policy (CSP) directives, covering both monitored and unmonitored resources. You can use a policy to control other types of resources besides scripts and their connections, even though Page Shield is not monitoring these resources.

Each CSP directive can contain multiple values, including schemes, hostnames, URIs, and special keywords between single quotes (such as `'none'`). Hostname and URI values support a `*` wildcard for the leftmost subdomain.

The following table lists the supported CSP directives and keywords you can use in Page Shield policies:

{{<table-wrap>}}

Directive         | Supported keywords | Monitored
------------------|------------|------------------|----------------------------
`script-src`      | `'none'`<br>`'self'`<br>`'unsafe-inline'`<br>`'unsafe-eval'` | [Yes](/page-shield/detection/monitor-connections-scripts/)
`connect-src`     | `'none'`<br>`'self'` | [Yes](/page-shield/detection/monitor-connections-scripts/)
`default-src`     | `'none'`<br>`'self'` | No
`img-src`         | `'none'`<br>`'self'` | No
`style-src`       | `'none'`<br>`'self'` | No
`font-src`        | `'none'`<br>`'self'` | No
`object-src`      | `'none'`<br>`'self'` | No
`media-src`       | `'none'`<br>`'self'` | No
`child-src`       | `'none'`<br>`'self'` | No
`form-action`     | `'none'`<br>`'self'` | No
`worker-src`      | `'none'`<br>`'self'` | No
`base-uri`        | `'none'`<br>`'self'` | No
`manifest-src`    | `'none'`<br>`'self'` | No
`frame-ancestors` | `'none'`<br>`'self'` | No

{{</table-wrap>}}

## More resources

For more information on CSP directives and their values, refer to the following resources in the MDN documentation:
* [Content-Security-Policy response header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)
* [CSP source values](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/Sources)
