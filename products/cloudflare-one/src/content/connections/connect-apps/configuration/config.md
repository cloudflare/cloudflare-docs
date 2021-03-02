---
order: 1
---

# Configuration file

You can run `cloudflared` with a configuration file, which contains keys and values to configure `cloudflared`'s behavior. The configuration file format uses [YAML syntax](http://www.yaml.org/start.html). Most keys have an equivalent CLI argument;
however, some (e.g. `ingress` and `originRequest`) do not, as CLIs aren't the most appropriate tool to express trees of configuration. To learn more about the CLI, just run `cloudflared --help` or `cloudflared tunnel --help`.

## Default behavior

You can specify a particular Tunnel in the config file by name or ID. When the following stanza is present in the file, the command `cloudflared tunnel run` will be treated as if `cloudflared tunnel run NAME-OR-ID` was run.

```yml
tunnel: NAME-OR-ID
```

## File location

You can use `--config` to point to a non-standard YAML file location:

```sh
$ cloudflared tunnel --config tunnels/config.yml run
```

Without specifying `--config`, `cloudflared` will examine default directories for config files.
* On Windows the default directory is `~/.cloudflared`.
* On Unix-like systems, the default directories are `~/.cloudflared`, `/etc/cloudflared` and `/usr/local/etc/cloudflared` in that order.

An example `config.yml` for the above command could look like:

```yml
hostname: tunnel.yourdomain.com
url: http://localhost:8000
logfile: /var/log/cloudflared.log
```

Flags that don't expect any value (such as `--hello-world`) should be specified as boolean `true` in the YAML:

```yml
hello-world: true
```

## Arguments

- [`config`](#config)
- [`ingress`](#ingress)
- [`originRequest`](#originRequest)
- [`autoupdate-freq`](#autoupdate-freq)
- [`no-autoupdate`](#no-autoupdate)
- [`origincert`](#origincert)
- [`no-tls-verify`](#no-tls-verify)
- [`metrics`](#metrics)
- [`metrics-update-freq`](#metrics-update-freq)
- [`tag`](#tag)
- [`loglevel`](#loglevel)
- [`transport-loglevel`](#transport-loglevel)
- [`retries`](#retries)
- [`pidfile`](#pidfile)
- [`logfile`](#logfile)
- [`help`](#help)
- [`version`](#version)

### `config`

| Syntax | Default |
|--|--|
| `config value` | `~/.cloudflared/config.yml` |

Specifies a config file in YAML format.

### `ingress`

This property configures which local services `cloudflared` will proxy incoming requests to.
See the [Ingress Rules docs](/connections/connect-apps/configuration/ingress) for details.

### `originRequest`

This property configures how `cloudflared` will send requests to your local services.
See the [Origin Configuration docs](/connections/connect-apps/configuration/ingress#origin-configurations) for details.

### `autoupdate-freq`

| Syntax | Default |
|--|--|
| `autoupdate-freq` | `24h` |

Autoupdate frequency. See also [`no-autoupdate`](#no-autoupdate).

### `no-autoupdate`

| Syntax | Default |
|--|--|
| `no-autoupdate` | `false` |

Disables periodic check for updates, restarting the server with the new version. See also [`autoupdate-freq`](#autoupdate-freq). Restarts are performed by spawning a new process that connects to the Cloudflare edge. On successful connection, the old process will gracefully shut down after handling all outstanding requests.

### `origincert`

| Syntax | Default | Environment Variable |
|--|--|--|
| `origincert value` | `~/.cloudflared/cert.pem` | `TUNNEL_ORIGIN_CERT` |

Specifies the Tunnel certificate for one of your zones, authorizing the client to serve as an origin for that zone. A certificate is required to use Argo Tunnel. You can obtain a certificate by using the login command or by visiting `https://dash.cloudflare.com/argotunnel`.

### `no-tls-verify`

| Syntax | Default |
|--|--|
| `no-tls-verify` | `false` |

Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.
The connection from your machine to Cloudflare's Edge is still encrypted and verified using TLS.

### `metrics`

| Syntax | Default | Environment Variable |
|--|--|--|
| `metrics value` | `localhost:` | `TUNNEL_METRICS` |

Address to query for usage metrics.

### `metrics-update-freq`

| Syntax | Default | Environment Variable |
|--|--|--|
| `metrics-update-freq duration` | `5s` | `TUNNEL_METRICS_UPDATE_FREQ` |

Frequency to update tunnel metrics.

### `tag`

| Syntax | Environment Variable |
|--|--|
| `tag: {KEY=VALUE,...}` | `TUNNEL_TAG` |

Custom tags used to identify this tunnel, in format `KEY=VALUE`. Multiple tags may be specified by delimiting them with commas e.g. `KEY1=VALUE1`,`KEY2=VALUE2`.

### `loglevel`

| Syntax | Default | Environment Variable |
|--|--|--|
| `loglevel value` | `info` | `TUNNEL_LOGLEVEL` |

Specifies the verbosity of logging. The default `info` is not noisy, but you may wish to run with `warn` in production. Available options: `panic` `fatal` `error` `warn` `info` `debug`

### `transport-loglevel`

| Syntax | Default | Environment Variable |
|--|--|--|
| `transport-loglevel` | `warn` | `TUNNEL_PROTO_LOGLEVEL` |

Specifies the verbosity of logs for the transport between `cloudflared` and the Cloudflare edge.
Any value below `warn` is noisy and should only be used to debug low-level performance issues and protocol quirks.

### `retries`

| Syntax | Default | Environment Variable |
|--|--|--|
| `retries value` | `5` | `TUNNEL_RETRIES` |

Maximum number of retries for connection/protocol errors. Retries use exponential backoff (retrying at 1, 2, 4, 8, 16 seconds by default) so increasing this value significantly is not recommended.

### `pidfile`

| Syntax | Environment Variable |
|--|--|
| `pidfile value` | `TUNNEL_PIDFILE` |

Write the application's PID to this file after the first successful connection. Mainly useful for scripting and service integration.

### `logfile`

| Syntax | Environment Variable |
|--|--|
| `logfile value` | `TUNNEL_LOGFILE` |

Save application log to this file. Mainly useful for reporting issues.

### `help`

| Syntax |
|--|
| `help` |

Shows help text.

### `version`

| Syntax |
|--|
| `version` |

Prints the version number and build date.
