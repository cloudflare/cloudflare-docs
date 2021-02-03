---
title: Best practises
order: 4
---

# Best practises

## Bypass sites which use cert pinning
Since Gateway acts like a trusted man-in-the-middle server applications that leverage certificate pinning may have connectivity issues while proxying Internet traffic. These applications can be bypassed by implmenting a "**Bypass**" rule.

See [recommended isolation policies](/usage/isolated-traffic#bypass-common-cert-pinning-sites) for more information

## Isolate identity providers for applications
Existing cookies and sessions from non-isolated browsing are not sent to the remote browser. Websites that implement single sign on using third-party cookies will also need to be isolated.

For example, **example.com** authenticates using Google Workspace you will also need to isolate the [top level Google Workspace](https://support.google.com/a/answer/9012184) URLs.