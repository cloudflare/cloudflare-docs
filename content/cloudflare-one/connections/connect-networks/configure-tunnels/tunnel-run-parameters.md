---
pcx_content_type: reference
title: Tunnel run parameters
weight: 4
---

# Tunnel run parameters

This page lists general-purpose configuration options for a Cloudflare Tunnel. You can add these flags to the `cloudflared tunnel run` command for [remotely-managed](/cloudflare-one/connections/connect-networks/configure-tunnels/remote-management/) and [locally-managed](/cloudflare-one/connections/connect-networks/configure-tunnels/local-management/) tunnels. These flags can also be added as key/value pairs to your [configuration file](/cloudflare-one/connections/connect-networks/configure-tunnels/local-management/).

## `autoupdate-freq`

| Syntax            | Default |
| ----------------- | ------- |
| `cloudlared tunnel --autoupdate-freq <FREQ> run <UUID or NAME>`  | `24h`   |

Configures autoupdate frequency. See also: [`no-autoupdate`](#no-autoupdate).

## `config`

{{<Aside type="note">}}
For locally-managed tunnels only.
{{</Aside>}}

| Syntax | Default |
| --------| ------ |
| `cloudlared tunnel --config <PATH> run <UUID or NAME>`  | `~/.cloudflared/config.yml` |

Specifies the path to a [configuration file](/cloudflare-one/connections/connect-networks/configure-tunnels/local-management/configuration-file/) in YAML format.

## `edge-bind-address`

| Syntax                    | Environment Variable       |
| ------------------------- | -------------------------- |
| `cloudlared tunnel --edge-bind-address <IP> run <UUID or NAME>` | `TUNNEL_EDGE_BIND_ADDRESS` |

Specifies the outgoing IP address used to establish a connection between `cloudflared` and the Cloudflare global network.

By default, `cloudflared` lets the operating system decide which IP address to use. This option is useful if you have multiple network interfaces available and want to prefer a specific interface.

The IP version of `edge-bind-address` will override [`edge-ip-version`](#edge-ip-version) (if provided). For example, if you enter an IPv6 source address, `cloudflared` will always connect to an IPv6 destination.

## `edge-ip-version`

| Syntax                  | Default | Environment Variable     |
| ----------------------- | ------- | ------------------------ |
| `cloudlared tunnel --edge-ip-version <VERSION> run <UUID or NAME>`  | `auto`  | `TUNNEL_EDGE_IP_VERSION` |

Specifies the IP address version (IPv4 or IPv6) used to establish a connection between `cloudflared` and the Cloudflare global network. Available values are `auto`, `4`, and `6`.

The value `auto` relies on the host operating system to determine which IP version to select. The first IP version returned from the DNS resolution of the region lookup will be used as the primary set. In dual IPv6 and IPv4 network setups, `cloudflared` will separate the IP versions into two address sets that will be used to fallback in connectivity failure scenarios.

## `grace-period`

| Syntax         | Default | Environment Variable  |
| -------------- | ------- | --------------------- |
| `cloudlared tunnel --grace-period <PERIOD> run <UUID or NAME>` | `30s`   | `TUNNEL_GRACE_PERIOD` |

When `cloudflared` receives SIGINT/SIGTERM it will stop accepting new requests, wait for in-progress requests to terminate, then shut down. Waiting for in-progress requests will timeout after this grace period, or when a second SIGTERM/SIGINT is received.

## `logfile`

| Syntax          | Environment Variable |
| --------------- | -------------------- |
| `cloudlared tunnel --logfile <PATH> run <UUID or NAME>` | `TUNNEL_LOGFILE`     |

Saves application log to this file. Mainly useful for reporting issues. For more details on what information you need when contacting Cloudflare support, refer to [this guide](/cloudflare-one/faq/cloudflare-tunnels-faq/).

## `loglevel`

| Syntax           | Default | Environment Variable |
| ---------------- | ------- | -------------------- |
| `cloudlared tunnel --loglevel <VALUE> run <UUID or NAME>`  | `info`  | `TUNNEL_LOGLEVEL`    |

Specifies the verbosity of logging. The default `info` level does not produce much output, but you may wish to use the `warn` level in production. Available values are: `debug`, `info`, `warn`, `error`, `fatal`.

## `metrics`

| Syntax          | Default      | Environment Variable |
| --------------- | ------------ | -------------------- |
| `cloudlared tunnel --metrics <IP:PORT> run <UUID or NAME>`| `localhost:` | `TUNNEL_METRICS`     |

Exposes a Prometheus endpoint on the specified IP address/port, which you can then query for usage metrics. For <IP>, enter the local address of the server running `cloudflared` (for example, `127.0.0.1` or `0.0.0.0`).

## `no-autoupdate`

| Syntax          | Default | Environment Variable |
| --------------- | ------- | -------------------- |
| `cloudlared tunnel --no-autoupdate <BOOLEAN> run <UUID or NAME>`  | `false` | `NO_AUTOUPDATE`      |

When `false`, `cloudflared` will periodically check for updates and restart with the new version. See also: [`autoupdate-freq`](#autoupdate-freq). Restarts are performed by spawning a new process that connects to the Cloudflare global network. On successful connection, the old process will gracefully shut down after handling all outstanding requests.

When `true`, automatic updates are disabled.

## `origincert`

{{<Aside type="note">}}
For locally-managed tunnels only.
{{</Aside>}}

| Syntax             | Default                   | Environment Variable |
| ------------------ | ------------------------- | -------------------- |
|  `cloudlared tunnel --origincert <PATH> run <UUID or NAME>` | `~/.cloudflared/cert.pem` | `TUNNEL_ORIGIN_CERT` |

Specifies the [account certificate](/cloudflare-one/connections/connect-networks/deploy-tunnels/tunnel-permissions/#locally-managed-tunnels) for one of your zones, authorizing the client to serve as an origin for that zone. You can obtain a certificate by using the `cloudflared tunnel login` command or by visiting `https://dash.cloudflare.com/argotunnel`.

## `pidfile`

| Syntax          | Environment Variable |
| --------------- | -------------------- |
| `cloudlared tunnel --pidfile <PATH> run <UUID or NAME>`| `TUNNEL_PIDFILE`     |

Writes the application's process identifier (PID) to this file after the first successful connection. Mainly useful for scripting and service integration.

## `protocol`

| Syntax     | Default | Environment Variable        |
| ---------- | ------- | --------------------------- |
| `cloudlared tunnel --protocol <VALUE> run <UUID or NAME>` | `auto`  | `TUNNEL_TRANSPORT_PROTOCOL` |

Specifies the protocol used to establish a connection between `cloudflared` and the Cloudflare global network. Available values are `auto`, `http2`, `h2mux`, and `quic`.

The `auto` value will automatically configure the `quic` protocol. If `cloudflared` is unable to establish UDP connections, it will fallback to using the `http2` protocol.

## `region`

| Syntax     |Environment Variable        |
| ---------- | --------------------------- |
| `cloudlared tunnel --region <VALUE> run <UUID or NAME>` | `TUNNEL_REGION` |

Allows you to choose the regions to which connections are established. Currently the only available value is `us`, which routes all connections through data centers in the United States. Omit or leave empty to connect to the global region.

## `retries`

| Syntax          | Default | Environment Variable |
| --------------- | ------- | -------------------- |
| `cloudlared tunnel --retries <VALUE> run <UUID or NAME>` | `5`     | `TUNNEL_RETRIES`     |

Specifies the maximum number of retries for connection/protocol errors. Retries use exponential backoff (retrying at 1, 2, 4, 8, 16 seconds by default), so it is not recommended that you increase this value significantly.

## `tag`

| Syntax                 | Environment Variable |
| ---------------------- | -------------------- |
| `cloudlared tunnel --tag <KEY=VAL> run <UUID or NAME>` | `TUNNEL_TAG`         |

Specifies custom tags used to identify this tunnel. Multiple tags may be specified by adding additional `--tag <KEY=VAL>` flags to the command. If entering multiple tags into a configuration file, delimit with commas: `tag: {KEY1=VALUE1, KEY2=VALUE2}`.

## `token`

{{<Aside type="note">}}
For remotely-managed tunnels only.
{{</Aside>}}

| Syntax        | Environment Variable |
| ------------- | -------------------- |
| `cloudlared tunnel run --token <TUNNEL_TOKEN>` | `TUNNEL_TOKEN`       |

Associates the `cloudflared` instance with a specific tunnel. The tunnel's token is shown in the dashboard when you first [create the tunnel](/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/). You can also retrieve the token using the [API](/api/operations/cloudflare-tunnel-get-a-cloudflare-tunnel-token).
