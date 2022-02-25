---
order: 1
pcx-content-type: reference
---

# Ingress rules

Each incoming request received by `cloudflared` causes `cloudflared` to send a request to a local service.
By configuring ingress rules in the [configuration file](/connections/connect-apps/configuration/configuration-file), you can specify which local services a request should be proxied to.

You can define ingress rules in the configuration file.

## Requirements

Configuration files that contain ingress rules must always include a catch-all rule that concludes the file.

In the following example, `- service: http_status:404` serves as the catch-all rule for the file. The file also includes the Tunnel UUID, the path to the credentials file, and two ingress rules. Alternatively, the Tunnel UUID or name can be specified in the `tunnel run` command.

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

<Aside type='note'>

You can use wildcards to match traffic to multiple subdomains or paths. For example, if you set the `hostname` key to `*.example.com`, both `test.example.com` and `try.example.com` will route traffic to your origin.

</Aside>

When `cloudflared` receives an incoming request, it evaluates each ingress rule from top to bottom to find which rule matches the request. Rules can match either the hostname or path of an incoming request, or both.

If a rule does not specify a hostname, all hostnames will be matched. If a rule does not specify a path, all paths will be matched.

The last rule you list in the config file must be a catch-all rule that matches all traffic.

This is an example config file that specifies several rules:

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

In addition to HTTP, `cloudflared` supports protocols like SSH, RDP, arbitrary TCP services, and Unix sockets. See a [list of supported protocols](/applications/non-http).

You can also route traffic to the built-in *Hello World* test server. This is useful when you need to test your Cloudflare Tunnel protocol.

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
| HTTP/S | Incoming HTTP requests are proxied directly to your local service. | `https://localhost:8000` |
| HTTP/S over Unix socket | Just like HTTP/S, but using a Unix socket instead. | `unix:/home/production/echo.sock` |
| TCP | TCP connections are proxied to your local service. | `tcp://localhost:2222` |
| SSH | SSH connections are proxied to your local service. [Learn more](/tutorials/ssh). | `ssh://localhost:22` |
| RDP | RDP connections are proxied to your local service. [Learn more](/tutorials/rdp). | `rdp://localhost:3389` |
| kubectl bastion mode | `cloudflared` will act like a jumphost, allowing access to any local address. | `bastion` |
| Hello World | Test server for validating your Cloudflare Tunnel setup. | `hello_world` |
| HTTP status | Responds to all requests with the given HTTP status. | `http_status:404` |

## Origin configuration

If you need to proxy traffic to multiple origins within one instance of `cloudflared`, you can define the way `cloudflared` sends requests to each service by specifying configuration options as part of your ingress rules.

In the following example, the top-level configuration `connectTimeout: 30s` sets a 30-second connection timeout for all services within that instance of `cloudflared`. The ingress rule for `service: localhost:8002` then configures an exception to the top-level configuration by setting `connectTimeout` for that service at `10s`. The 30-second connection timeout still applies to all other services.

```yml
tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef
credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json
originRequest: # Top-level configuration
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

To set both top-level configurations and origin-specific configurations, you can use the following properties within  `originRequest` rules:

*   [connectTimeout](#connecttimeout)
*   [tlsTimeout](#tlstimeout)
*   [tcpKeepAlive](#tcpkeepalive)
*   [noHappyEyeballs](#nohappyeyeballs)
*   [keepAliveConnections](#keepaliveconnections)
*   [keepAliveTimeout](#keepalivetimeout)
*   [httpHostHeader](#httphostheader)
*   [originServerName](#originservername)
*   [caPool](#capool)
*   [noTLSVerify](#notlsverify)
*   [disableChunkedEncoding](#disablechunkedencoding)
*   [proxyAddress](#proxyaddress)
*   [proxyPort](#proxyport)
*   [proxyType](#proxyyype)

### connectTimeout

Default: `30s`

Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to
establish TLS, which is controlled by [tlsTimeout](#tlstimeout).

### tlsTimeout

Default: `10s`

Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

### tcpKeepAlive

Default: `30s`

The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

### noHappyEyeballs

Default: `false`

Disable the "happy eyeballs" algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

### keepAliveConnections

Default: `100`

Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

### keepAliveTimeout

Default: `1m30s`

Timeout after which an idle keepalive connection can be discarded.

### httpHostHeader

Default: `""`

Sets the HTTP `Host` header on requests sent to the local service.

### originServerName

Default: `""`

Hostname that `cloudflared` should expect from your origin server certificate.

### caPool

Default: `""`

Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

### noTLSVerify

Default: `false`

Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

### disableChunkedEncoding

Default: `false`

Disables chunked transfer encoding. Useful if you are running a WSGI server.

### proxyAddress

Default: `127.0.0.1`

`cloudflared` starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP.
This configures the listen address for that proxy.

### proxyPort

Default: `0`

`cloudflared` starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP.
This configures the listen port for that proxy. If set to zero, an unused port will randomly be chosen.

### proxyType

Default: `""`

`cloudflared` starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP.
This configures what type of proxy will be started. Valid options are:

*   `""` for the regular proxy
*   `"socks"` for a SOCKS5 proxy. Refer to the [tutorial on connecting through Cloudflare Access using kubectl](/tutorials/kubectl) for more information.

## Validating your configuration

To validate the ingress rules in your configuration file, run:

```bash
$ cloudflared tunnel ingress validate
```

This will ensure that the set of ingress rules specified in your config file is valid.

## Testing your configuration

To verify that `cloudflared` will proxy the right traffic to the right local service, use `cloudflared tunnel ingress rule`. This checks a URL against every rule, from first to last, and shows the first rule that matches. For example:

```bash
$ cloudflared tunnel ingress rule https://foo.example.com
Using rules from /usr/local/etc/cloudflared/config.yml
Matched rule #3
	hostname: *.example.com
	service: https://localhost:8000
```
