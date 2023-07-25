---
title: Supported CSP directives
pcx_content_type: reference
weight: 6
meta:
  description: CSP directives supported by policies
---

# CSP directives supported by policies

Page Shield continuously monitors scripts and their connections on your website. Monitored resources are displayed in the [**Monitors** dashboard](/page-shield/detection/monitor-connections-scripts/), and they are controlled by the following Content Security Policy (CSP) directives:

* `script-src`
* `connection-src`

Page Shield policies support most CSP directives, covering both monitored and unmonitored resources. This means that you can control other types of resources loaded on your website even if Page Shield is not monitoring them.

The directives directly supported on the Cloudflare dashboard when working with policies are the following:

{{<table-wrap>}}

Directive         | Dashboard values
------------------|-----------------------------------------------
`default-src`     | None<br>Self<br>* (wildcard)<br>(custom value)
`style-src`       | None<br>Self<br>* (wildcard)<br>(custom value)
`img-src`         | None<br>Self<br>* (wildcard)<br>(custom value)
`font-src`        | None<br>Self<br>* (wildcard)<br>(custom value)
`object-src`      | None<br>Self<br>* (wildcard)<br>(custom value)
`media-src`       | None<br>Self<br>* (wildcard)<br>(custom value)
`frame-src`       | None<br>Self<br>* (wildcard)<br>(custom value)
`child-src`       | None<br>Self<br>* (wildcard)<br>(custom value)
`form-action`     | None<br>Self<br>* (wildcard)<br>(custom value)
`frame-ancestors` | None<br>Self<br>* (wildcard)<br>(custom value)
`base-uri`        | None<br>Self<br>* (wildcard)<br>(custom value)
`worker-src`      | None<br>Self<br>(custom value)
`manifest-src`    | None<br>Self<br>* (wildcard)<br>(custom value)
`prefetch-src`    | None<br>Self<br>* (wildcard)<br>(custom value)

{{</table-wrap>}}

If needed, you can also enter your own CSP directives and values in a Page Shield policy.
