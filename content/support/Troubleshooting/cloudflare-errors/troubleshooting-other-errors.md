---
pcx_content_type: troubleshooting
title: Troubleshooting other errors
source:
---

# Troubleshooting other type of errors

Some other type of errors might be returned to visitors for proxied requests depending on the origin configuration.

{{<Aside type="warning">}}

As the root cause of these errors is not Cloudflare, this document is only designed to provide investigation avenues to help troubelshooting.

{{</Aside>}}

{{<Aside type="note">}}

Cloudflare Support only assists the domain owner to resolve issues. If you are a site visitor, report the problem to the site owner.

{{</Aside>}}

## ERR_HTTP2_PROTOCOL_ERROR

Requests proxied by Cloudflare may result with an error for the visitors with `ERR_HTTP2_PROTOCOL_ERROR` visible in the Developer Tools Console.
These errors are usually due to an issue on the origin web server configuration, but might only materialize when requests are proxied by Cloudflare depending on the client browser's behavior.

- A malformed HTTP response header on the origin web server.

**Resolution**: Make a request directly to your origin server and take a look at the HTTP response headers and see if you can see anything that looks abnormal.
Make sure that the field values are respecting the following requirements: [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html#section-5.5), [RFC 9113](https://www.rfc-editor.org/rfc/rfc9113.html#section-8.2.1) and [RFC 5234](https://www.rfc-editor.org/rfc/rfc5234#appendix-B.1).  

- A compression issue, for example the origin server is serving gzip encoded compressed content but is not updating the `content-length` header, or the origin is serving broken gzip compressed content.
  
**Resolution**: In this case you can try to disable compression at your origin and rely on Cloudflare to [compress content](https://developers.cloudflare.com/speed/optimization/content/brotli/content-compression/)
You can also investigate the configuration of your origin server to make sure the compression is working as expected.
