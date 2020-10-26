---
order: 2
---

# Making requests

## Endpoint

Cloudflare offers a DNS over HTTPS resolver at:

```txt
https://cloudflare-dns.com/dns-query
```

See curl examples for [UDP wireformat](https://developers.cloudflare.com/1.1.1.1/dns-over-https/wireformat/) and [JSON](https://developers.cloudflare.com/1.1.1.1/dns-over-https/json-format/).

## HTTP method

Cloudflare's DOH endpoint supports POST and GET for UDP wireformat, and GET for JSON format.

When making requests using POST, the DNS query is included as the message body of the HTTP request, and the MIME type (application/dns-udpwireformat) is sent in the Content-Type request header. Cloudflare will use the message body of the HTTP request as sent by the client, so the message body should not be encoded.

When making requests using GET, the DNS query is encoded into the URL. An additional URL parameter of 'ct' should indicate the MIME type (see below).

## Wireformat and JSON options

Both [UDP wireformat](https://developers.cloudflare.com/1.1.1.1/dns-over-https/wireformat/) and [JSON](https://developers.cloudflare.com/1.1.1.1/dns-over-https/json-format/) formats are supported.

## Valid MIME types

If you use JSON format, set 'application/dns-json' URL parameter, and if you use DNS wire format, use 'application/dns-message' as either URL parameter of 'ct' or a Content-Type header for POST requests.

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
