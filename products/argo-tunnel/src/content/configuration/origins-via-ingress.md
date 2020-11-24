---
order: 10
---

# Configuring Origins via Ingress Rules

`cloudflared` proxies incoming traffic to one or multiple services running locally on your origin. You can configure the
way that `cloudflared` sends requests to these servers by setting a key in your config file. For example, to set a 30
second connection timeout for all origins except one:

```yaml
---
filename: config.yml
---
originRequest: # Root-level configuration
  connectTimeout: 30s
ingress:
  # This service inherits all configuration from the root-level config, i.e.
  # it will use a connectTimeout of 30 seconds.
  - hostname: example.com
    service: localhost:8000
  - hostname: example2.com
    service: localhost:8001
  # This service overrides some root-level config.
  - service: localhost:8002
    originRequest:
      connectTimeout: 10s
      disableChunkedEncoding: true
```

You can [validate](/routing-to-tunnel/ingress#validating-your-configuration) and [test](/routing-to-tunnel/ingress#testing-your-configuration)
your ingress rules using `cloudflared`.

You can use the following YAML keys to configure how cloudflared communicates with each local service:

- [connectTimeout](#connectTimeout)
- [tlsTimeout](#tlsTimeout)
- [tcpKeepAlive](#tcpKeepAlive)
- [noHappyEyeballs](#noHappyEyeballs)
- [keepAliveConnections](#keepAliveConnections)
- [keepAliveTimeout](#keepAliveTimeout)
- [httpHostHeader](#httpHostHeader)
- [originServerName](#originServerName)
- [caPool](#caPool)
- [noTLSVerify](#noTLSVerify)
- [disableChunkedEncoding](#disableChunkedEncoding)
- [proxyAddress](#proxyAddress)
- [proxyPort](#proxyPort)
- [proxyType](#proxyType)

<div id="connectTimeout">

## connectTimeout
</div>

Default: `30s`

Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to
establish TLS, which is controlled by [tlsTimeout]({{< ref "#tlsTimeout" >}}).

<div id="tlsTimeout">

## tlsTimeout
</div>

Default: `10s`

Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

<div id="tcpKeepAlive">

## tcpKeepAlive
</div>

Default: `30s`

The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

<div id="noHappyEyeballs">

## noHappyEyeballs
</div>

Default: `false`

Disable the "happy eyeballs" algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

<div id="keepAliveConnections">

## keepAliveConnections
</div>

Default: `100`

Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

<div id="keepAliveTimeout">

## keepAliveTimeout
</div>

Default: `1m30s`

Timeout after which an idle keepalive connection can be discarded.

<div id="httpHostHeader">

## httpHostHeader
</div>

Default: `""`

Sets the HTTP Host header on requests sent to the local service.

<div id="originServerName">

## originServerName
</div>

Default: `""`

Hostname that `cloudflared` should expect from your origin server certificate.

<div id="caPool">

## caPool
</div>

Default: `""`

Path to the CA for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

<div id="noTLSVerify">

## noTLSVerify
</div>

Default: `false`

Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

<div id="disableChunkedEncoding">

## disableChunkedEncoding
</div>

Default: `false`

Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

<div id="proxyAddress">

## proxyAddress
</div>

Default: `127.0.0.1`

`cloudflared` starts a proxy server to translate HTTP traffic into TCP when proxying e.g. SSH or RDP.
This configures the listen address for that proxy.

<div id="proxyPort">

## proxyPort
</div>

Default: `0`

`cloudflared` starts a proxy server to translate HTTP traffic into TCP when proxying e.g. SSH or RDP.
This configures the listen port for that proxy. If set to zero, an unused port will randomly be chosen.

<div id="proxyType">

## proxyType
</div>

Default: `""`

`cloudflared` starts a proxy server to translate HTTP traffic into TCP when proxying e.g. SSH or RDP.
This configures what type of proxy will be started. Valid options are

 - "" for the regular proxy
 - "socks" for a SOCKS5 proxy. See [kubectl](https://developers.cloudflare.com/access/other-protocols/kubectl) for more.
