---
title: Make API requests to 1.1.1.1
order: 1
pcx-content-type: reference
---

# Make API requests to 1.1.1.1 over DoH

Cloudflare offers a DNS over HTTPS resolver at:

```txt
https://cloudflare-dns.com/dns-query
```

## HTTP method

Cloudflare's DNS-over-HTTPS (DOH) endpoint supports `POST` and `GET` for UDP wireformat, and `GET` for JSON format.

When making requests using `POST`, the DNS query is included as the message body of the HTTP request, and the MIME type (`application/dns-udpwireformat`) is sent in the `Content-Type` request header. Cloudflare will use the message body of the HTTP request as sent by the client, so the message body should not be encoded.

When making requests using `GET`, the DNS query is encoded into the URL. An additional URL parameter of `ct` should indicate the MIME type (see below).

## Valid MIME types

If you use JSON format, set `application/dns-json` URL parameter, and if you use DNS wireformat, use `application/dns-message` as either the URL parameter of `ct` or a `Content-Type` header for `POST` requests.

See also curl examples for [UDP wireformat](/encrypted-dns/dns-over-https/make-api-requests/dns-wireformat) and [JSON](/encrypted-dns/dns-over-https/make-api-requests/dns-json).

## Send multiple questions in a query

Sending more than one question when making requests depends on the HTTP version used, as each DNS query maps to exactly one HTTP request. HTTP/2 and HTTP/3 have multiplexing and you can start multiple requests concurrently. HTTP/2 is, in fact, the minimum recommended version of HTTP for use with DNS over HTTPS (DoH). This is not specific to 1.1.1.1, but rather how DoH works. 

You can learn more about how DoH works in RFC8484, more specifically [the HTTP layer requirements](https://datatracker.ietf.org/doc/html/rfc8484#section-5.2).

Example request:

```sh
$ curl --http2 -H 'accept: application/dns-json' https://1.1.1.1/dns-query?name=cloudflare.com --next --http2 -H 'accept: application/dns-json' https://1.1.1.1/dns-query?name=example.com
```

## Authentication

No authentication is required to send requests to this API.

## Supported TLS versions

Cloudflare's DNS over HTTPS resolver supports TLS 1.2 and TLS 1.3.

## Return codes

<TableWrap>

HTTP Status | Meaning
------------|-----------
400         | DNS query not specified or too small.
413         | DNS query is larger than maximum allowed DNS message size.
415         | Unsupported content type.
504         | Resolver timeout while waiting for the query response.

</TableWrap>
