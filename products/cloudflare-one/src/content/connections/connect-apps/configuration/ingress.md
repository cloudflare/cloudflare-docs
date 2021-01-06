---
order: 20
---

# Ingress rules

You can configure ingress rules to proxy traffic from multiple hostnames to multiple services using a single instance of `cloudflared` and a single Argo Tunnel.

Each incoming request received by `cloudflared` causes `cloudflared` to send a request to a local service.
By configuring **ingress rules** in the [configuration file](/connections/connect-apps/configuration/config), you can specify which local services a request should be proxied to.

You can define ingress rules inside of the configuration file.

## Requirements

Configuration files that contain ingress rules must always include a catch-all rule that concludes the ingress file.

In the following example, `- service: http_status:404` serves as the catch-all rule for the file.

The file also includes the Tunnel UUID, path to the credentials file, and two ingress rules. The Tunnel UUID or name can alternatively be specified in the `tunnel run` command and the path to the credentials file can be excluded if it is located at the default filepath.

```yml
tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef
credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json

ingress:
  - hostname: gitlab.widgetcorp.tech
    service: http://localhost:80
  - hostname: gitlab-ssh.widgetcorp.tech
    service: ssh://localhost:22
  - service: http_status:404
```

## Matching traffic

When `cloudflared` gets an incoming request, it evaluates each ingress rule from top to bottom to find which rule matches the request. Rules can match either the hostname or path of an incoming request, or both.

If a rule doesn't specify a hostname, all hostnames will be matched. If a rule doesn't specify a path, all paths will be matched.

The last rule you list in the config file must be a catch-all rule that matches all traffic.

This is an example config file that specifies several different rules:

```yml
tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef
credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json

ingress:
  # Rules map traffic from a hostname to a local service:
  - hostname: example.com
    service: https://localhost:8000
  # Rules can match the request's path to a regular expression:
  - hostname: static.example.com
    path: /*.(jpg|png|css|js)
    service: https://localhost:8001
  # Rules can match the request's hostname to a wildcard character:
  - hostname: "*.example.com"
    service: https://localhost:8002
  # An example of a catch-all rule:
  - service: https://localhost:8003
```

## Supported protocols

In addition to HTTP, `cloudflared` supports protocols like SSH, RDP, arbitrary TCP services, and unix sockets. See a [list of supported protocols](https://developers.cloudflare.com/access/protocols-and-connections).

You can also route traffic to the built-in *Hello World* test server. This is useful when you need to test your Argo Tunnel protocol.

```yml
tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef
credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json

ingress:
  # Example of a request over TCP:
  - hostname: example.com
    service: tcp://localhost:8000
  # Example of a request over a Unix socket:
  - hostname: staging.example.com
    service: unix:/home/production/echo.sock
  # Example of a request mapping to the Hello World test server:
  - hostname: test.example.com
    service: hello_world
  # Example of a rule responding to traffic with an HTTP status:
  - service: http_status:404
```

With the catch-all rule, you can set `cloudflared` to respond to traffic with an HTTP status.

| Service | Description | Example `service` value |
|--|--|--|--|
| HTTP/S | Incoming HTTP requests are proxied directly to your local service | `https://localhost:8000` |
| HTTP/S over unix socket | Just like HTTP/S, but using a unix socket instead | `unix:/home/production/echo.sock` |
| TCP, RDP, SSH, SMB, kubectl to a single address | TCP requests are proxied to your local service. [Learn more](/applications/non-HTTP). | `ssh://localhost:2222` |
| TCP, RDP, SSH, SMB, kubectl bastion mode | `cloudflared` will act like a jumphost, allowing access to any local address. | `bastion` |
| Hello World | Test server for validating your Argo Tunnel setup | `hello_world` |
| HTTP status | Responds to all requests with the given HTTP status | `http_status:404` |

## Single-service configuration

If you need to proxy traffic to only one local service, you can do so using the config file. As an alternative, you can set up single-service configurations using command line flags.

This is an example of a single service configured on the command line:

```bash
cloudflared tunnel --url localhost:8000 --no-chunked-encoding run mytunnel
```

## Validating your configuration

To validate the ingress rules in your configuration file, run:

```bash
$ cloudflared tunnel ingress validate
```

This will ensure that the set of ingress rules specified in your config file is **valid**.

## Testing your configuration

To verify that `cloudflared` will proxy the right traffic to the right local service, use `cloudflared tunnel ingress rule`. This checks a URL against every rule, from first to last, and shows the first rule that matches. For example:

```bash
$ cloudflared tunnel ingress rule https://foo.example.com
Using rules from /usr/local/etc/cloudflared/config.yml
Matched rule #3
	hostname: *.example.com
	service: https://localhost:8000
```

## Origin configurations

You can define the way that `cloudflare` sends requests to each service by specifying additional configuration options. The following example sets a 30-second connection timeout for all services except for one.

```yml
tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef
credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json
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
  # Some built-in services (like `http_status`) don't use any config. So, this
  # rule will inherit all the config, but won't actually use it (because it just
  # responds with HTTP 404).
  - service: http_status:404
```

You can use the following configuration options inside of an ingress rule.

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

Disables chunked transfer encoding. Useful if you are running a WSGI server.

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
