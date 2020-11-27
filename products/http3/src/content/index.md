---
title: Welcome
order: 0
---

# Cloudflare HTTP/3 docs

The Hypertext Transfer Protocol (HTTP) is used by clients such as web browsers to talk to servers in order to load websites. The performance of HTTP is an important factor when it comes to loading web pages quickly and efficiently.

HTTP is a well established protocol that has several versions, with each adding features that improve performance over the older one. HTTP/1.1 and HTTP/2 are widely deployed on the Internet today and rely on TCP and optionally TLS. HTTP/3 is a new version that runs over the new transport protocol [QUIC](https://blog.cloudflare.com/the-road-to-quic/). It is in the final stages of standardization in the Internet Engineering Task Force (IETF) QUIC Working Group.

The [standardization activity](https://blog.cloudflare.com/http-3-from-root-to-tip/) releases incremental draft versions of specifications which clients and servers are encouraged to actively experiment with. For example, [HTTP/3](https://blog.cloudflare.com/http3-the-past-present-and-future/) draft 29 is identified using the label "h3-29".

Cloudflare currently offers support for HTTP/3 and will follow drafts as they come out. If you would like to try out HTTP/3 on your website, you will need to do two things:

- Enable HTTP/3 on your Cloudflare zone.
- Use a client (browser) that supports it.

## Enabling HTTP/3 on a Cloudflare zone

HTTP/3 can easily be turned on for a zone on the dashboard. On the Network tab, turn on the toggle labeled __HTTP/3 (with QUIC)__:

![Enable HTTP/3 on the dashboard](./images/enable-dashboard.png)

Enabling the toggle allows compatible clients to connect to it using HTTP/3. It does not affect existing clients that connect using HTTP/1.1 or HTTP/2.

## Supported clients

The following clients support HTTP/3 through feature flags:

- [Google Chrome](https://www.google.com/chrome/canary/) - [Instructions](/chrome)
- [Microsoft Edge Insider](https://www.microsoftedgeinsider.com/en-us/) - [Instructions](/edge)
- [Mozilla Firefox Nightly](https://www.mozilla.org/firefox/channel/desktop/#nightly) - [Instructions](/firefox)
- [cURL](https://curl.haxx.se) + quiche - [Instructions](/curl-brew)
- [Cloudflare http3-client](https://github.com/cloudflare/quiche) - [Instructions](/quiche-http3-client)

<Aside>

__Note:__ The HTTP/3 specification has not been finalized yet. In order to successfully use a client, make sure the client supports a draft version as mentioned in the [release notes](/release).

</Aside>
