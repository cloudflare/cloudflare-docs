---
order: 2
---

# SSL modes

The modes listed below control the scheme (`http://` or `https://`) that Cloudflare uses to connect to your origin, and how SSL certificates presented by your origin will be validated.

--------

## Flexible
Connections to your origin will be made using plaintext `http://` regardless of what was requested by the visitor. This option is not recommended, especially if you have any sensitive information on your website.

Choose this mode as a last resort if your origin does not support SSL/TLS If your origin supports SSL/TLS but does not provide a certificate that is valid for your hostname, chose **Full** mode instead.

--------

## Full
Connections to the origin will be made using the scheme requested by the visitor, i.e., if `http://` was used then Cloudflare will connect to the origin using plaintext HTTP or if `https://` was used the connection will be made using SSL/TLS.

The certificate presented by the origin will **not be validated in any way**. It can be expired, self-signed, or not even have a matching CN/SAN entry for the hostname requested. You should only use this method if you do not have the ability to use a valid, publicly trusted certificate on your origin.

--------

## Strict
Connections to the origin will be made using the scheme requested by the visitor.

The certificate presented by the origin must meet the following criteria:

1. Unexpired, i.e., the certificate notBeforeDate < now() < notAfterDate
2. Issued by a [publicly trusted certificate authority](https://github.com/cloudflare/cfssl_trust) or [Cloudflare’s Origin CA](/origin-configuration/origin-ca)
2. Contains a Common Name (CN) or Subject Alternative Name (SAN) that matches the requested or target hostname

If the certificate does not meet all of the above criteria, the SSL/TLS handshake will be aborted and a [526 error will be returned to your visitors](https://support.cloudflare.com/hc/en-us/articles/200721975-Error-526-Invalid-SSL-certificate).

--------

## Strict (SSL-Only Origin Pull)
*This method is only available for Enterprise zones.*

Connections to the origin will always be made using SSL/TLS, regardless of the scheme requested by the visitor.

The certificate presented by the origin will be validated the same as with Strict mode.

--------

## Off
Not recommended. Disables HTTPS for your website. Any visitor attempting to connect via HTTPS will receive a HTTP 301 redirect to plaintext HTTP.
