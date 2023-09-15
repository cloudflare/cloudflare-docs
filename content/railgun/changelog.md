---
pcx_content_type: reference
title: Changelog
weight: 8
---

# Changelog

{{<render file="_railgun-deprecation-notice.md">}}

```txt
* Apr 23 2018 Cloudflare Inc <help@cloudflare.com> - 5.3.3
- Uses go 1.10.1

* Mar 12 2018 Cloudflare Inc <help@cloudflare.com> - 5.3.2
- Passthrough URIs with invalid percent encoding

* Nov 28 2017 Cloudflare Inc <help@cloudflare.com> - 5.3.1
- Fix IPv6 connections sometimes going to the wrong port

* Nov 8 2016 CloudFlare Inc <help@cloudflare.com> - 5.3.0
- Improve rg-listener.conf format and help text
- Standardise error codes for origin failures
- Return HTTP 527 for communication errors between sender and listener
- Set railgun user agent if none is specified by client
- Add Memcached as package dependency

* Dec 16 2015 CloudFlare Inc <help@cloudflare.com> - 5.2.0
- Refactor listener's response/error event flow code
- Retry transient HTTP errors once

* Sep 21 2015 CloudFlare Inc <help@cloudflare.com> - 5.1.0
- Better handling of origin request failures

* Jul 13 2015 CloudFlare Inc <help@cloudflare.com> - 5.0.2
- Switch to new GPG key for CloudFlare packages

* Jan 10 2015 CloudFlare Inc <help@cloudflare.com> - 5.0.0
- Performance and stability improvements
- Better handling of HTTP keepalives
- Reduced needed size for memcache
- Misc bugfixes

* Jul 15 2013 CloudFlare Inc <help@cloudflare.com> - 4.0.0
- Optimize compression method
- Remove libz and libcrypto dependencies
- Add clearer error messages
- Misc bugfixes

* Feb 25 2013 CloudFlare Inc <help@cloudflare.com> - 3.3.0
- Depend on libssl for speedier crypto routines than current Go
- Add more options for debugging and memcache control
- Improved diagnostic tools
- Misc bugfixes

* Nov 20 2012 CloudFlare Inc <help@cloudflare.com> - 2.7.0
- Memcached fixes and timeout adjustments
- Direct HTTP request failover improvements
- Misc bugfixes

* Sep 14 2012 CloudFlare Inc <help@cloudflare.com> - 2.6.0
- Implement Memcached backend
- Add activation and SSL systems
- Misc bugfixes

* Fri Sep 14 2012 CloudFlare Inc <help@cloudflare.com> - 2.0.0
- Cache backend revamp
- Performance improvements
- Misc bufixes

* Wed Jun 28 2012 CloudFlare Inc <help@cloudflare.com> - 1.0.0
- Initial release.
```
