---
order: 2
pcx-content-type: reference
---

# Command-line options

Command-line options let you configure properties across origins in the same `cloudflared` instance. They are also a quick way to handle configurations if you are connecting a single service through `cloudflared`. If you are connecting multiple services and you need to configure properties or exceptions for specific origins, you can do so by adding arguments to [ingress rules](/connections/connect-apps/configuration/configuration-file/ingress) in your configuration file.

For example, the following command will run the `mytunnel` tunnel by proxying traffic to port 8000 and disabling chunked transfer encoding.

```bash
$ cloudflared tunnel --url localhost:8000 --no-chunked-encoding run mytunnel
```

The following is a list of common command-line options you can use to configure your tunnels. For a complete list of options, run:

```bash
$ cloudflared tunnel help
```

- [`config`](#config)
- [`autoupdate-freq`](#autoupdate-freq)
- [`no-autoupdate`](#no-autoupdate)
- [`origincert`](#origincert)
- [`metrics`](#metrics)
- [`metrics-update-freq`](#metrics-update-freq)
- [`tag`](#tag)
- [`retries`](#retries)
- [`pidfile`](#pidfile)
- [`protocol`](#protocol)
- [`help`](#help)
- [`version`](#version)
- [`logfile`](#logfile)
- [`loglevel`](#loglevel)
- [`transport-loglevel`](#transport-loglevel)

## `config`

| Syntax | Default |
|--|--|
| `config value` | `~/.cloudflared/config.yml` |

Specifies the path to a config file in YAML format.

## `autoupdate-freq`

| Syntax | Default |
|--|--|
| `autoupdate-freq` | `24h` |

Configures autoupdate frequency. See also: [`no-autoupdate`](#no-autoupdate).

## `no-autoupdate`

| Syntax | Default |
|--|--|
| `no-autoupdate` | `false` |

Disables periodic check for updates, restarting the server with the new version. See also: [`autoupdate-freq`](#autoupdate-freq). Restarts are performed by spawning a new process that connects to the Cloudflare edge. On successful connection, the old process will gracefully shut down after handling all outstanding requests.

## `origincert`

| Syntax | Default | Environment Variable |
|--|--|--|
| `origincert value` | `~/.cloudflared/cert.pem` | `TUNNEL_ORIGIN_CERT` |

Specifies the Tunnel certificate for one of your zones, authorizing the client to serve as an origin for that zone. A certificate is required to use Cloudflare Tunnel. You can obtain a certificate by using the login command or by visiting `https://dash.cloudflare.com/argotunnel`.

## `grace-period`

| Syntax | Default |
|--|--|
| `grace-period` | `30s` |

When `cloudflared` receives SIGINT/SIGTERM it will stop accepting new requests, wait for in-progress requests to terminate, then shut down. Waiting for in-progress requests will timeout after this grace period, or when a second SIGTERM/SIGINT is received.

## `metrics`

| Syntax | Default | Environment Variable |
|--|--|--|
| `metrics value` | `localhost:` | `TUNNEL_METRICS` |

Specifies address to query for usage metrics.

## `metrics-update-freq`

| Syntax | Default | Environment Variable |
|--|--|--|
| `metrics-update-freq duration` | `5s` | `TUNNEL_METRICS_UPDATE_FREQ` |

Specifies frequency to update tunnel metrics.

## `tag`

| Syntax | Environment Variable |
|--|--|
| `tag: {KEY=VALUE,...}` | `TUNNEL_TAG` |

Specifies custom tags used to identify this tunnel, in format `KEY=VALUE`. Multiple tags may be specified by delimiting them with commas e.g. `KEY1=VALUE1, KEY2=VALUE2`.

## `retries`

| Syntax | Default | Environment Variable |
|--|--|--|
| `retries value` | `5` | `TUNNEL_RETRIES` |

Specifies the maximum number of retries for connection/protocol errors. Retries use exponential backoff (retrying at 1, 2, 4, 8, 16 seconds by default), so it is not recommended that you increase this value significantly.

## `pidfile`

| Syntax | Environment Variable |
|--|--|
| `pidfile value` | `TUNNEL_PIDFILE` |

Writes the application's process identifier (PID) to this file after the first successful connection. Mainly useful for scripting and service integration.

## `protocol`

| Syntax | Default | Environment Variable |
|--|--|--|
| `protocol` | `auto` | `TUNNEL_TRANSPORT_PROTOCOL` |

Specifies the protocol used to establish a connection between `cloudflared` and the edge. Available values are `auto`, `http2`, `h2mux`, and `quic`. The `auto` value will automatically configure the `http2` protocol.

## `region`

Allows you to choose the regions to which connections are established. Omit or leave empty to connect to the global region. Set `--region=us` to route all connections through us region 1 and us region 2.

## `logfile`

| Syntax | Environment Variable |
|--|--|
| `logfile value` | `TUNNEL_LOGFILE` |

Saves application log to this file. Mainly useful for reporting issues. For more details on what information you need when contacting Cloudflare support, refer to [this guide](/faq/cloudflare-tunnels-faq).

## `loglevel`

| Syntax | Default | Environment Variable |
|--|--|--|
| `loglevel value` | `info` | `TUNNEL_LOGLEVEL` |

Specifies the verbosity of logging. The default `info` level does not produce much output, but you may wish to use the `warn` level in production. Available levels are: `trace`, `debug`, `info`, `warn`, `error`, `fatal`, `panic`.

## `transport-loglevel`

| Syntax | Default | Environment Variable |
|--|--|--|
| `transport-loglevel` | `warn` | `TUNNEL_PROTO_LOGLEVEL` |

Specifies the verbosity of logs for the transport between `cloudflared` and the Cloudflare edge. Available levels are: `trace`, `debug`, `info`, `warn`, `error`, `fatal`, `panic`.
Any value below `warn` produces substantial output and should only be used to debug low-level performance issues and protocol quirks.
