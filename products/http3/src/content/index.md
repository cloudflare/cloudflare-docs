---
title: Overview
order: 0
pcx-content-type: landing-page
---

# Cloudflare HTTP/3

The Hypertext Transfer Protocol (HTTP) is used by clients, such as web browsers, to talk to servers in order to load websites. HTTP performance is an important factor when it comes to loading web pages quickly and efficiently.

HTTP is a well established protocol that has several versions, and each version adds features that improve performance over the older one. HTTP/1.1 and HTTP/2 are widely deployed on the Internet today and rely on TCP and optionally TLS.

[HTTP/3](https://blog.cloudflare.com/http3-the-past-present-and-future/) is the latest version that runs over the new transport protocol [QUIC](https://blog.cloudflare.com/the-road-to-quic/). [QUIC version 1](https://blog.cloudflare.com/quic-version-1-is-live-on-cloudflare/) is published as RFC 9000 and supported by Cloudflare. HTTP/3 connections using this version are identified with the label "h3".

Prior to RFC publication, the [standardization activity](https://blog.cloudflare.com/http-3-from-root-to-tip/) released incremental draft versions of specifications which clients and servers were encouraged to actively experiment with. For example, HTTP/3 draft 29 relies on QUIC draft 29 and is identified using the label "h3-29".

Cloudflare supports HTTP/3. To use HTTP/3 on your website, refer to, [Get started with HTTP/3](/get-started/).
