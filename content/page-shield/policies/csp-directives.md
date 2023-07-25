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
`script-src`      | **none**<br>**self**<br>**unsafe inline**<br>**unsafe `eval()`**<br>(custom value)
`connect-src`     | **none**<br>**self**<br>(custom value)
`default-src`     | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>(custom value)
`style-src`       | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>(custom value)
`img-src`         | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>(custom value)
`font-src`        | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>(custom value)
`object-src`      | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>(custom value)
`media-src`       | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>(custom value)
`frame-src`       | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>(custom value)
`child-src`       | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>(custom value)
`form-action`     | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>(custom value)
`frame-ancestors` | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>(custom value)
`base-uri`        | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>(custom value)
`worker-src`      | **none**<br>**self**<br>(custom value)
`manifest-src`    | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>(custom value)
`prefetch-src`    | **none**<br>**self**<br><strong>*</strong> (wildcard)<br>(custom value)

{{</table-wrap>}}

If needed, you can also enter your own CSP directives and values in a Page Shield policy.
