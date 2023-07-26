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

The supported directives in Page Shield policies are the following:

{{<table-wrap>}}

Directive         | API values | Dashboard values | Monitored
------------------|------------|------------------|----------------------------
`script-src`      | `'none'`<br>`'self'`<br>`'unsafe-inline'`<br>`'unsafe-eval'`<br>URI/Hostname/IP/Scheme | **none**<br>**self**<br>**unsafe inline**<br>**unsafe `eval()`**<br>Detected value<br>Custom value | [Yes](/page-shield/detection/monitor-connections-scripts/)
`connect-src`     | `'none'`<br>`'self'`<br>URI/hostname/IP/scheme | **none**<br>**self**<br>Detected value<br>Custom value | [Yes](/page-shield/detection/monitor-connections-scripts/)
`default-src`     | `'none'`<br>`'self'`<br>URI/hostname/IP/scheme | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>Custom value | No
`style-src`       | `'none'`<br>`'self'`<br>URI/hostname/IP/scheme | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>Custom value | No
`img-src`         | `'none'`<br>`'self'`<br>URI/hostname/IP/scheme | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>Custom value | No
`font-src`        | `'none'`<br>`'self'`<br>URI/hostname/IP/scheme | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>Custom value | No
`object-src`      | `'none'`<br>`'self'`<br>URI/hostname/IP/scheme | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>Custom value | No
`media-src`       | `'none'`<br>`'self'`<br>URI/hostname/IP/scheme | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>Custom value | No
`frame-src`       | `'none'`<br>`'self'`<br>URI/hostname/IP/scheme | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>Custom value | No
`child-src`       | `'none'`<br>`'self'`<br>URI/hostname/IP/scheme | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>Custom value | No
`form-action`     | `'none'`<br>`'self'`<br>URI/hostname/IP/scheme | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>Custom value | No
`frame-ancestors` | `'none'`<br>`'self'`<br>URI/hostname/IP/scheme | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>Custom value | No
`base-uri`        | `'none'`<br>`'self'`<br>URI/hostname/IP/scheme | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>Custom value | No
`worker-src`      | `'none'`<br>`'self'`<br>URI/hostname/IP/scheme | **none**<br>**self**<br>Custom value |
`manifest-src`    | `'none'`<br>`'self'`<br>URI/hostname/IP/scheme | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>Custom value | No
`prefetch-src`    | `'none'`<br>`'self'`<br>URI/hostname/IP/scheme | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>Custom value | No

{{</table-wrap>}}

If needed, you can also enter your own CSP directives and their values in a Page Shield policy.

## More resources

For more information on each CSP directive and their allowed values, refer to the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy).