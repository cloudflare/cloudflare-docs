---
pcx_content_type: reference
title: Ingress rules
weight: 3
---

# Ingress rules

Each incoming request received by `cloudflared` causes `cloudflared` to send a request to a local service.

To specify which local services a request should be proxied to, you can define ingress rules in your [configuration file](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/local/local-management/configuration-file/).

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

{{<Aside type="note">}}

You can use wildcards to match traffic to multiple subdomains or paths. For example, if you set the `hostname` key to `*.example.com`, both `test.example.com` and `try.example.com` will route traffic to your origin.

{{</Aside>}}

When `cloudflared` receives an incoming request, it evaluates each ingress rule from top to bottom to find which rule matches the request. Rules can match either the hostname or path of an incoming request, or both.

If a rule does not specify a hostname, all hostnames will be matched. If a rule does not specify a path, all paths will be matched.

The last rule you list in the configuration file must be a catch-all rule that matches all traffic.

This is an example configuration file that specifies several rules:

```yml
tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef
credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json

ingress:
  # Rules map traffic from a hostname to a local service:
  - hostname: example.com
    service: https://localhost:8000
  # Rules can match the request's path to a regular expression:
  - hostname: static.example.com
    path: \.(jpg|png|css|js)$
    service: https://localhost:8001
  # Rules can match the request's hostname to a wildcard character:
  - hostname: "*.example.com"
    service: https://localhost:8002
  # An example of a catch-all rule:
  - service: https://localhost:8003
```

## Supported protocols

In addition to HTTP, `cloudflared` supports protocols like SSH, RDP, arbitrary TCP services, and Unix sockets. See a [list of supported protocols](/cloudflare-one/applications/non-http/).

You can also route traffic to the built-in _Hello World_ test server. This is useful when you need to test your Cloudflare Tunnel protocol.

```yml
tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef
credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json

ingress:
  # Example of a request over TCP:
  - hostname: example.com
    service: tcp://localhost:8000
  # Example of an HTTP request over a Unix socket:
  - hostname: staging.example.com
    service: unix:/home/production/echo.sock
  # Example of a request mapping to the Hello World test server:
  - hostname: test.example.com
    service: hello_world
  # Example of a rule responding to traffic with an HTTP status:
  - service: http_status:404
```

With the catch-all rule, you can set `cloudflared` to respond to traffic with an HTTP status.

| Service                | Description                                                                                                               | Example `service` value               |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| HTTP/S                 | Incoming HTTP requests are proxied directly to your local service.                                                        | `https://localhost:8000`              |
| HTTP over Unix socket  | Just like HTTP, but using a Unix socket instead.                                                                          | `unix:/home/production/echo.sock`     |
| HTTPS over Unix socket | Just like HTTPS, but using a Unix socket instead.                                                                         | `unix+tls:/home/production/echo.sock` |
| TCP                    | TCP connections are proxied to your local service.                                                                        | `tcp://localhost:2222`                |
| SSH                    | SSH connections are proxied to your local service. [Learn more](/cloudflare-one/connections/connect-networks/use-cases/ssh/). | `ssh://localhost:22`                  |
| RDP                    | RDP connections are proxied to your local service. [Learn more](/cloudflare-one/connections/connect-networks/use-cases/rdp/). | `rdp://localhost:3389`                |
| kubectl bastion mode   | `cloudflared` will act like a jumphost, allowing access to any local address.                                             | `bastion`                             |
| Hello World            | Test server for validating your Cloudflare Tunnel setup.                                                                  | `hello_world`                         |
| HTTP status            | Responds to all requests with the given HTTP status.                                                                      | `http_status:404`                     |

## Origin configuration

If you need to proxy traffic to multiple origins within one instance of `cloudflared`, you can define the way `cloudflared` sends requests to each service by specifying configuration options as part of your ingress rules.

In the following example, the top-level configuration `connectTimeout: 30s` sets a 30-second connection timeout for all services within that instance of `cloudflared`. The ingress rule for `service: localhost:8002` then configures an exception to the top-level configuration by setting `connectTimeout` for that service at `10s`. The 30-second connection timeout still applies to all other services.

```yml
tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef
credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json
originRequest: # Top-level configuration
  connectTimeout: 30s

ingress:
  # The localhost:8000 service inherits all root-level configuration.
  # In other words, it will use a connectTimeout of 30 seconds.
  - hostname: example.com
    service: localhost:8000
  - hostname: example2.com
    service: localhost:8001
  # The localhost:8002 service overrides some root-level config.
  - service: localhost:8002
    originRequest:
      connectTimeout: 10s
      disableChunkedEncoding: true
  # Some built-in services such as `http_status` do not use any configuration.
  # The service below will simply respond with HTTP 404.
  - service: http_status:404
```

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

### access

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

### connectTimeout

Default: `30s`

Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to
establish TLS, which is controlled by tlsTimeout.

### noTLSVerify

Default: `false`

Disables TLS verification of the certificate presented by your origin. This will allow any certificate from the origin to be accepted.

### tlsTimeout

Default: `10s`

Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

### http2Origin

Default: `false`

When enabled, `cloudflared` will attempt to connect to your origin server using HTTP/2.0 instead of HTTP/1.1. HTTP/2.0 is a faster protocol for high traffic origins but requires you to deploy an SSL certificate on the origin. We recommend using this setting in conjunction with [noTLSVerify](#notlsverify) so that you can use a self-signed certificate.

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

### disableChunkedEncoding

Default: `false`

Disables chunked transfer encoding. Useful if you are running a Web Server Gateway Interface (WSGI) server.

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
