---
order: 
pcx-content-type: reference
---

# Configuration options

Spectrum is a global TCP and UDP proxy running on Cloudflare's edge nodes. It does not terminate the connection. Instead it passes through the packets to the backend server.

<Aside>

Some of these features require an Enterprise plan. If you would like to upgrade, contact your account team.

</Aside>

## IP addresses

When a Spectrum application is created, it is assigned a unique IPv4 and IPv6 address, or you can provision the application to be IPv6 only. The addresses are not static, and they may change over time. The best way to look up the current addresses is by using DNS. The DNS name of the Spectrum application will always return the IPs currently dedicated to the application.

The addresses are Anycasted from all Cloudflare data centers, with the exception of data centers in China.

## SMTP

Spectrum can act as a TCP load balancer in front of an SMTP server but will not act as an intermediary mail server. Instead, Spectrum passes data through to your origin. The client IP shown on mail will be the Cloudflare edge IP. If the mail server requires knowing the true client IP, it should use Proxy Protocol to get the source IP from Cloudflare. Cloudflare recommends enabling Proxy Protocol on applications configured to proxy SMTP.

SMTP servers may perform a series of checks on servers attempting to send messages through it. These checks are intended to filter requests from illegitimate servers. 

Messages may be rejected if:

* A reverse DNS lookup on the IP address of the connecting server returns a negative response.
* The reverse DNS lookup produces a different hostname than what was sent in the SMTP `HELO`/`EHLO` message.
* The reverse DNS lookup produces a different hostname than what is advertised in your SMTP server's banner.
* The result of a reverse DNS lookup does not match a corresponding forward DNS lookup.

Spectrum applications do not have reverse DNS entries.

Additionally, SMTP servers may perform a DNS lookup to find the MX records for a domain. Messages from your server may be rejected if an MX record for your domain is associated with a Spectrum application, as the IP address of server will not match the Spectrum IP address.

## Ports

Cloudflare supports all TCP ports.


## Port ranges

Spectrum applications can be configured to proxy traffic on ranges of ports.

For direct origins:

```json
{
  "protocol": "tcp/1000-2000",
  "dns": {
    "type": "CNAME",
    "name": "range.example.com"
  },
  "origin_direct": ["tcp://192.0.2.1:3000-4000"]
}
```

For DNS origins:

```json
{
  "protocol": "tcp/1000-2000",
  "dns": {
    "type": "CNAME",
    "name": "range.example.com"
  },
  "origin_dns": {
    "name": "origin.example.com",
    "ttl": 1200
  },
  "origin_port": "3000-4000"
}
```

The number of ports in an origin port range must match the number of ports specified in the `protocol` field.
Connections to a port within a port range at the edge will be proxied to the equivalent port offset in the origin range.
For example, in the configurations above, a connection to `range.example.com:1005` would be proxied to port 3005 on the origin.


## IP Access Rules

If IP Access Rules is enabled for a Spectrum application, Cloudflare will respect the IP Access Rules created under **Firewall** > **Tools** for that domain. Cloudflare only respects rules created for specific IP addresses, IP blocks, countries, or ASNs for Spectrum applications. Spectrum will also only respect rules created with the actions `allow` or `block`.


## Edge TLS Termination

If you enable **Edge TLS Termination** for a Spectrum application, Cloudflare will encrypt traffic for the application at the Edge. The Edge TLS Termination toggle applies only to TCP applications.

TLS versions supported by Spectrum include TLS 1.1, TLS 1.2, and TLS 1.3.

## Origin TLS Termination

Below are the cipher suites Cloudflare presents to origins during an SSL/TLS handshake. For cipher suites supported at our edge or presented to browsers and other user agents, refer to [Cipher suites](https://developers.cloudflare.com/ssl/ssl-tls/cipher-suites/).

The cipher suites below are ordered based on how they appear in the ClientHello, communicating our preference to the origin.

## Supported Cipher suites by protocol

<TableWrap>

OpenSSL Name | TLS 1.1 | TLS 1.2 | TLS 1.3
------|---------------|---------------|---------------
AEAD-AES128-GCM-SHA256 [^1]|❌|❌|✅
AEAD-AES256-GCM-SHA384 [^1]|❌|❌|✅
AEAD-CHACHA20-POLY1305-SHA256 [^1]|❌|❌|✅
ECDHE-ECDSA-AES128-GCM-SHA256|❌|✅|❌
ECDHE-RSA-AES128-GCM-SHA256|❌|✅|❌
ECDHE-RSA-AES128-SHA|✅|✅|❌
AES128-GCM-SHA256|❌|✅|❌
AES128-SHA|✅|✅|❌
AES256-SHA|✅|✅|❌

</TableWrap>

[^1]: *Although TLS 1.3 uses the same cipher suite space as previous versions of TLS, TLS 1.3 cipher suites are defined differently, only specifying the symmetric ciphers, and cannot be used for TLS 1.2. Similarly, TLS 1.2 and lower cipher suites cannot be used with TLS 1.3 (IETF TLS 1.3 draft 21). BoringSSL also hard-codes cipher preferences in this order for TLS 1.3.*
