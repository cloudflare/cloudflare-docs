---
pcx_content_type: reference
title: Origin configuration
weight: 3
---

# Origin configuration

To set both top-level configurations and origin-specific configurations, you can use the following properties within `originRequest` rules:

- [access](#access)
- [connectTimeout](#connecttimeout)
- [noTLSVerify](#notlsverify)
- [tlsTimeout](#tlstimeout)
- [http2Origin](#http2origin)
- [tcpKeepAlive](#tcpkeepalive)
- [noHappyEyeballs](#nohappyeyeballs)
- [keepAliveConnections](#keepaliveconnections)
- [keepAliveTimeout](#keepalivetimeout)
- [httpHostHeader](#httphostheader)
- [originServerName](#originservername)
- [caPool](#capool)

- [disableChunkedEncoding](#disablechunkedencoding)
- [proxyAddress](#proxyaddress)
- [proxyPort](#proxyport)
- [proxyType](#proxytype)

## access

Default: `""`

Requires `cloudflared` to validate the [Cloudflare Access JWT](/cloudflare-one/identity/authorization-cookie/validating-json/) prior to proxying traffic to your origin. You can enforce this check on public hostname routes that are protected by an Access application. For all L7 requests to these hostnames, Access will send the JWT to `cloudflared` as a `Cf-Access-Jwt-Assertion` request header.

To enable this security control, [get the AUD tag](/cloudflare-one/identity/authorization-cookie/validating-json/#get-your-aud-tag) for your Access application and add the following rule to `originRequest`:

```yml
access:
  required: true
  teamName: <your-team-name>
  audTag:
    - aud1 <Access-application-audience-tag>
    - aud2 <Optional-additional-tags>
```

## connectTimeout

Default: `30s`

Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to
establish TLS, which is controlled by tlsTimeout.

## noTLSVerify

Default: `false`

Disables TLS verification of the certificate presented by your origin. This will allow any certificate from the origin to be accepted.

## tlsTimeout

Default: `10s`

Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

## http2Origin

Default: `false`

When enabled, `cloudflared` will attempt to connect to your origin server using HTTP/2.0 instead of HTTP/1.1. HTTP/2.0 is a faster protocol for high traffic origins but requires you to deploy an SSL certificate on the origin. We recommend using this setting in conjunction with [noTLSVerify](#notlsverify) so that you can use a self-signed certificate.

## tcpKeepAlive

Default: `30s`

The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

## noHappyEyeballs

Default: `false`

Disable the "happy eyeballs" algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

## keepAliveConnections

Default: `100`

Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

## keepAliveTimeout

Default: `1m30s`

Timeout after which an idle keepalive connection can be discarded.

## httpHostHeader

Default: `""`

Sets the HTTP `Host` header on requests sent to the local service.

## originServerName

Default: `""`

Hostname that `cloudflared` should expect from your origin server certificate.

## caPool

Default: `""`

Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

## disableChunkedEncoding

Default: `false`

Disables chunked transfer encoding. Useful if you are running a Web Server Gateway Interface (WSGI) server.

## proxyAddress

Default: `127.0.0.1`

`cloudflared` starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP.
This configures the listen address for that proxy.

## proxyPort

Default: `0`

`cloudflared` starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP.
This configures the listen port for that proxy. If set to zero, an unused port will randomly be chosen.

## proxyType

Default: `""`

`cloudflared` starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP.
This configures what type of proxy will be started. Valid options are:

- `""` for the regular proxy
- `"socks"` for a SOCKS5 proxy. Refer to the [tutorial on connecting through Cloudflare Access using kubectl](/cloudflare-one/tutorials/kubectl/) for more information.

## Validating your configuration

To validate the ingress rules in your configuration file, run:

```sh
$ cloudflared tunnel ingress validate
```

This will ensure that the set of ingress rules specified in your config file is valid.

## Testing your configuration

To verify that `cloudflared` will proxy the right traffic to the right local service, use `cloudflared tunnel ingress rule`. This checks a URL against every rule, from first to last, and shows the first rule that matches. For example:

```sh
$ cloudflared tunnel ingress rule https://foo.example.com
Using rules from /usr/local/etc/cloudflared/config.yml
Matched rule #3
	hostname: *.example.com
	service: https://localhost:8000
```
