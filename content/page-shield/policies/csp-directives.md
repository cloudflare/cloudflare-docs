---
title: Supported CSP directives
pcx_content_type: reference
weight: 6
meta:
  description: CSP directives supported by policies
---

# CSP directives supported by policies

Page Shield monitors scripts loaded on your website and the connections they make. Monitored resources are displayed in the [**Monitors** dashboard](/page-shield/detection/monitor-connections-scripts/).

Page Shield policies support most {{<glossary-tooltip term_id="content security policy (CSP)">}}Content Security Policy (CSP){{</glossary-tooltip>}} directives, covering both monitored and unmonitored resources. You can use a policy to control other types of resources besides scripts and their connections, even though Page Shield is not monitoring these resources.

Each CSP directive can contain multiple values, including schemes, hostnames, URIs, and special keywords between single quotes (such as `'none'`). Hostname and URI values support a `*` wildcard for the leftmost subdomain.

The following table lists the supported CSP directives and keywords you can use in Page Shield policies:

{{<table-wrap>}}

Directive         | Name in the dashboard | Supported keywords | Monitored
------------------|-----------------------|--------------------|----------
`script-src`      | Scripts         | `'none'`<br>`'self'`<br>`'unsafe-inline'`<br>`'unsafe-eval'` | [Yes](/page-shield/detection/monitor-connections-scripts/)
`connect-src`     | Connections     | `'none'`<br>`'self'`<br>`'unsafe-inline'`<br>`'unsafe-eval'` | [Yes](/page-shield/detection/monitor-connections-scripts/)
`default-src`     | Default         | `'none'`<br>`'self'`<br>`'unsafe-inline'`<br>`'unsafe-eval'` | No
`img-src`         | Images          | `'none'`<br>`'self'`<br>`'unsafe-inline'`<br>`'unsafe-eval'` | No
`style-src`       | Styles          | `'none'`<br>`'self'`<br>`'unsafe-inline'`<br>`'unsafe-eval'` | No
`font-src`        | Fonts           | `'none'`<br>`'self'`<br>`'unsafe-inline'`<br>`'unsafe-eval'` | No
`object-src`      | Objects         | `'none'`<br>`'self'`<br>`'unsafe-inline'`<br>`'unsafe-eval'` | No
`media-src`       | Media           | `'none'`<br>`'self'`<br>`'unsafe-inline'`<br>`'unsafe-eval'` | No
`child-src`       | Child           | `'none'`<br>`'self'`<br>`'unsafe-inline'`<br>`'unsafe-eval'` | No
`form-action`     | Form actions    | `'none'`<br>`'self'`<br>`'unsafe-inline'`<br>`'unsafe-eval'` | No
`worker-src`      | Workers         | `'none'`<br>`'self'`<br>`'unsafe-inline'`<br>`'unsafe-eval'` | No
`base-uri`        | Base URI        | `'none'`<br>`'self'`<br>`'unsafe-inline'`<br>`'unsafe-eval'` | No
`manifest-src`    | Manifests       | `'none'`<br>`'self'`<br>`'unsafe-inline'`<br>`'unsafe-eval'` | No
`frame-src`       | Frames          | `'none'`<br>`'self'`<br>`'unsafe-inline'`<br>`'unsafe-eval'` | No
`frame-ancestors` | Frame ancestors | `'none'`<br>`'self'`     | No
`upgrade-insecure-requests` | Upgrade insecure requests | N/A  | No

{{</table-wrap>}}

## More resources

For more information on CSP directives and their values, refer to the following resources in the MDN documentation:
* [Content-Security-Policy response header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)
* [CSP source values](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/Sources)
