---
order: 11
---

# Legacy: Configuring Origins via CLI

`cloudflared` proxies traffic to local services running on your origin. You can configure the exact properties of each
origin by adding stanzas to the [Ingress Rules](/configuration/origins-via-ingress). However, if you only want to proxy
traffic to a single local service, you can use CLI flags instead of YAML to configure that service.

- [`--url`](#--url)
- [`--hostname`](#--hostname)
- [`--lb-pool`](#--lb-pool)
- [`--origin-ca-pool`](#--origin-ca-pool)
- [`--origin-server-name`](#--origin-server-name)
- [`--no-chunked-encoding`](#--no-chunked-encoding)
- [`--hello-world`](#--hello-world)
- [`--proxy-connect-timeout`](#--proxy-connect-timeout)
- [`--proxy-tls-timeout`](#--proxy-tls-timeout)
- [`--proxy-tcp-keepalive`](#--proxy-tcp-keepalive)
- [`--proxy-no-happy-eyeballs`](#--proxy-no-happy-eyeballs)
- [`--proxy-keepalive-connections`](#--proxy-keepalive-connections)
- [`--proxy-keepalive-timeout`](#--proxy-keepalive-timeout)
- [`--socks5`](#--socks5)

### `--url`

| Syntax | Default | Environment Variable |
|--|--|--|
| `--url URL` | `http://localhost:8080` | `TUNNEL_URL` |

Connects to the local webserver at `URL`.


### `--hostname`

| Syntax | Environment Variable |
|--|--|
| `--hostname value` | `TUNNEL_HOSTNAME` |

Sets a hostname on a Cloudflare zone to route traffic through this tunnel.

### `--lb-pool`

| Syntax |
|--|
| `--lb-pool POOL_NAME` |

Add this tunnel to a Load Balancer pool. If it doesn’t already exist a load balancer will be created for the hostname of your tunnel, and a pool will be created with the pool name you specify. Traffic destined to that pool will be load balanced across this tunnel and any other tunnels which share its pool name.

### `--origin-ca-pool`

| Syntax |
|--|
| `--origin-ca-pool value` |

Path to the CA for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.


### `--origin-server-name`

| Syntax | Environment Variable |
|--|--|
| `--origin-server-name value` | `TUNNEL_ORIGIN_SERVER_NAME` |



### `--no-chunked-encoding`

| Syntax | Default |
|--|--|
| `--no-chunked-encoding` | `false` |

Disables chunked transfer encoding; useful if you are running a WSGI server.

### `--hello-world`

| Syntax | Environment Variable |
|--|--|
| `--hello-world` | `TUNNEL_HELLO_WORLD` |

Use the established tunnel to expose a `Hello world` HTTP server for testing Argo Tunnel. Mutually exclusive with the `--url argument`.

### `--proxy-connect-timeout`

| Syntax | Default |
|--|--|
| `--proxy-connect-timeout value` | `30s` |

Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by [--proxy-tls-timeout](#proxy-tls-timeout).

### `--proxy-tls-timeout`

| Syntax | Default |
|--|--|
| `--proxy-tls-timeout value` | `10s` |

Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

### `--proxy-tcp-keepalive`

| Syntax | Default |
|--|--|
| `--proxy-tcp-keepalive value` | `30s` |

The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

### `--proxy-no-happy-eyeballs`

| Syntax |
|--|
| `--proxy-no-happy-eyeballs` |

Disable the "happy eyeballs" algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

### `--proxy-keepalive-connections`

| Syntax | Default |
|--|--|
| `--proxy-keepalive-connections value` | `100` |

Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

### `--proxy-keepalive-timeout`

| Syntax | Default |
|--|--|
| `--proxy-keepalive-timeout value` | `1m30s` |

Timeout after which an idle keepalive connection can be discarded.

### `--socks5`

| Syntax | Default |
|--|--|
| `--socks5=value` | `true` |

See [kubectl](https://developers.cloudflare.com/access/other-protocols/kubectl) for example usage.
