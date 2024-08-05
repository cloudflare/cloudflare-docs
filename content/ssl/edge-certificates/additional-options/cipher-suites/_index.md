---
title: Cipher suites
pcx_content_type: concept
weight: 1
meta:
    description: Consider information about supported cipher suites, how to meet your security requirements, and how to troubleshoot compatibility and other issues.
---

# Cipher suites

{{<render file="_cipher-suites-definition.md">}}<br />

This section covers cipher suites used in connections between clients -- such as your visitor's browser -- and the Cloudflare network. For information about cipher suites used between Cloudflare and your origin server, refer to [Origin server > Cipher suites](/ssl/origin-configuration/cipher-suites/).

{{<Aside type="note">}}
Cloudflare maintains a [public repository of our SSL/TLS configurations](https://github.com/cloudflare/sslconfig) on GitHub, where you can find changes in the commit history.

[RC4 cipher suites](https://blog.cloudflare.com/end-of-the-road-for-rc4/) or [SSLv3](https://blog.cloudflare.com/sslv3-support-disabled-by-default-due-to-vulnerability/) are no longer supported.
{{</Aside>}}

## Cipher suites and edge certificates

While the cipher suites used by default for all Cloudflare domains/zones are meant to balance security and compatibility, some of them might be considered weak by third-party testing tools, such as the Qualys SSL Labs test.

If the default option ([Legacy](/ssl/edge-certificates/additional-options/cipher-suites/recommendations/)) does not meet your business requirements, you can [purchase the Advanced Certificate Manager add-on](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/acm/) to be able to [specify more secure cipher suites](/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/).

Custom cipher suites is a hostname-level setting. Once specified, the configuration is applicable to all edge certificates used to connect to the hostname(s), regardless of [certificate type](/ssl/edge-certificates/) (universal, advanced, or custom).

## Related SSL/TLS settings

Although configured independently, cipher suites interact with other SSL/TLS settings.

### Minimum TLS Version

You can specify a [minimum TLS version](/ssl/edge-certificates/additional-options/minimum-tls/) that is required for a client to connect to your website or application.

For example, if TLS 1.1 is selected as the minimum, visitors attempting to connect using TLS 1.0 will be rejected while visitors attempting to connect using TLS 1.1, 1.2, or 1.3 (if enabled) will be allowed.

Each cipher suite relates to a specific minimum protocol that it supports. This means that if you use a [higher security level](/ssl/edge-certificates/additional-options/cipher-suites/recommendations/) for your cipher suites and stop supporting TLS 1.0, you should also adjust your minimum TLS version accordingly.

[Compliance standards](/ssl/edge-certificates/additional-options/cipher-suites/compliance-status/) can also require you to up the minimum TLS version accepted in connections to your website or application.

### TLS 1.3

{{<render file="_tls-1.3-cipher-limitations.md">}}

## Resources

{{<directory-listing>}}

## Limitations

It is not possible to configure cipher suites for [Cloudflare Pages](/pages/) hostnames.