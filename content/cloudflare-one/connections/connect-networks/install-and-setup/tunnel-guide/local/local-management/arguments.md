---
pcx_content_type: reference
title: Cloudflared parameters
weight: 4
---

# Cloudflared parameters

This page lists general-purpose configuration options for a Cloudflare Tunnel. You can add these flags to the `cloudflared tunnel run` command for [remotely-managed](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/remote/remote-management/) and [locally-managed](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/local/local-management/) tunnels. These flags can also be added to the [configuration file](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/local/local-management/configuration-file/) for locally-managed tunnels.

**Example:** The following command runs the `mytunnel` tunnel by proxying traffic to port `8000` and disabling chunked transfer encoding.

```txt
cloudflared tunnel --url localhost:8000 --no-chunked-encoding run mytunnel
```

- [`config`](#config)
- [`edge-ip-version`](#edge-ip-version)
- [`edge-bind-address`](#edge-bind-address)
- [`autoupdate-freq`](#autoupdate-freq)
- [`no-autoupdate`](#no-autoupdate)
- [`origincert`](#origincert)
- [`metrics`](#metrics)
- [`tag`](#tag)
- [`retries`](#retries)
- [`pidfile`](#pidfile)
- [`protocol`](#protocol)
- [`logfile`](#logfile)
- [`loglevel`](#loglevel)
- [`token`](#token)

## `config`

| Syntax         | Default                     |
| -------------- | --------------------------- |
| `config value` | `~/.cloudflared/config.yml` |

Specifies the path to a config file in YAML format.

## `edge-ip-version`

| Syntax                  | Default | Environment Variable     |
| ----------------------- | ------- | ------------------------ |
| `edge-ip-version value` | `auto`  | `TUNNEL_EDGE_IP_VERSION` |

Specifies the IP address version (IPv4 or IPv6) used to establish a connection between `cloudflared` and the Cloudflare global network. Available values are `auto`, `4`, and `6`.

The value `auto` relies on the host operating system to determine which IP version to select. The first IP version returned from the DNS resolution of the region lookup will be used as the primary set. In dual IPv6 and IPv4 network setups, `cloudflared` will separate the IP versions into two address sets that will be used to fallback in connectivity failure scenarios.

## `edge-bind-address`

| Syntax                    | Environment Variable       |
| ------------------------- | -------------------------- |
| `edge-bind-address value` | `TUNNEL_EDGE_BIND_ADDRESS` |

Specifies the outgoing IP address used to establish a connection between `cloudflared` and the Cloudflare global network.

By default, `cloudflared` lets the operating system decide which IP address to use. This option is useful if you have multiple network interfaces available and want to prefer a specific interface.

The IP version of `edge-bind-address` will override [`edge-ip-version`](#edge-ip-version) (if provided). For example, if you enter an IPv6 source address, `cloudflared` will always connect to an IPv6 destination.

## `autoupdate-freq`

| Syntax            | Default |
| ----------------- | ------- |
| `autoupdate-freq` | `24h`   |

Configures autoupdate frequency. See also: [`no-autoupdate`](#no-autoupdate).

## `no-autoupdate`

| Syntax          | Default | Environment Variable |
| --------------- | ------- | -------------------- |
| `no-autoupdate` | `false` | `NO_AUTOUPDATE`      |

Disables periodic check for updates, restarting the server with the new version. See also: [`autoupdate-freq`](#autoupdate-freq). Restarts are performed by spawning a new process that connects to the Cloudflare global network. On successful connection, the old process will gracefully shut down after handling all outstanding requests.

## `origincert`

| Syntax             | Default                   | Environment Variable |
| ------------------ | ------------------------- | -------------------- |
| `origincert value` | `~/.cloudflared/cert.pem` | `TUNNEL_ORIGIN_CERT` |

Specifies the Tunnel certificate for one of your zones, authorizing the client to serve as an origin for that zone. A certificate is required to use Cloudflare Tunnel. You can obtain a certificate by using the login command or by visiting `https://dash.cloudflare.com/argotunnel`.

## `grace-period`

| Syntax         | Default | Environment Variable  |
| -------------- | ------- | --------------------- |
| `grace-period` | `30s`   | `TUNNEL_GRACE_PERIOD` |

When `cloudflared` receives SIGINT/SIGTERM it will stop accepting new requests, wait for in-progress requests to terminate, then shut down. Waiting for in-progress requests will timeout after this grace period, or when a second SIGTERM/SIGINT is received.

## `metrics`

| Syntax          | Default      | Environment Variable |
| --------------- | ------------ | -------------------- |
| `metrics value` | `localhost:` | `TUNNEL_METRICS`     |

Specifies address to query for usage metrics.

## `tag`

| Syntax                 | Environment Variable |
| ---------------------- | -------------------- |
| `tag: {KEY=VALUE,...}` | `TUNNEL_TAG`         |

Specifies custom tags used to identify this tunnel, in format `KEY=VALUE`. Multiple tags may be specified by delimiting them with commas e.g. `KEY1=VALUE1, KEY2=VALUE2`.

## `retries`

| Syntax          | Default | Environment Variable |
| --------------- | ------- | -------------------- |
| `retries value` | `5`     | `TUNNEL_RETRIES`     |

Specifies the maximum number of retries for connection/protocol errors. Retries use exponential backoff (retrying at 1, 2, 4, 8, 16 seconds by default), so it is not recommended that you increase this value significantly.

## `pidfile`

| Syntax          | Environment Variable |
| --------------- | -------------------- |
| `pidfile value` | `TUNNEL_PIDFILE`     |

Writes the application's process identifier (PID) to this file after the first successful connection. Mainly useful for scripting and service integration.

## `protocol`

| Syntax     | Default | Environment Variable        |
| ---------- | ------- | --------------------------- |
| `protocol` | `auto`  | `TUNNEL_TRANSPORT_PROTOCOL` |

Specifies the protocol used to establish a connection between `cloudflared` and the Cloudflare global network. Available values are `auto`, `http2`, and `quic`.

The `auto` value will automatically configure the `quic` protocol. If `cloudflared` is unable to establish UDP connections, it will fallback to using the `http2` protocol.

## `region`

Allows you to choose the regions to which connections are established. Omit or leave empty to connect to the global region. Set `--region=us` to route all connections through us region 1 and us region 2.

## `logfile`

| Syntax          | Environment Variable |
| --------------- | -------------------- |
| `logfile value` | `TUNNEL_LOGFILE`     |

Saves application log to this file. Mainly useful for reporting issues. For more details on what information you need when contacting Cloudflare support, refer to [this guide](/cloudflare-one/faq/cloudflare-tunnels-faq/).

## `loglevel`

| Syntax           | Default | Environment Variable |
| ---------------- | ------- | -------------------- |
| `loglevel value` | `info`  | `TUNNEL_LOGLEVEL`    |

Specifies the verbosity of logging. The default `info` level does not produce much output, but you may wish to use the `warn` level in production. Available levels are: `debug`, `info`, `warn`, `error`, `fatal`.

## `token`

| Syntax        | Environment Variable |
| ------------- | -------------------- |
| `token value` | `TUNNEL_TOKEN`       |

Associates the `cloudflared` instance with a specific tunnel. The tunnel's token is shown in the dashboard when you first [create the tunnel](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/remote/). You can also retrieve the token using the [API](/api/operations/cloudflare-tunnel-get-a-cloudflare-tunnel-token).
