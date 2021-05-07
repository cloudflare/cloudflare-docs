---
order: 1
---

# Arguments

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

## Tunnel commands

All tunnel-related commands are prefixed with `tunnel`. For example:

```sh
$ cloudflared tunnel --origincert ~/cert.pem --config ~/tunnel.yaml run mytunnel
```

Tunnel-related commands include creating, deleting and running tunnels with

```sh
$ cloudflared tunnel create <TUNNELNAME>
$ cloudflared tunnel delete <TUNNELNAME>
$ cloudflared tunnel run    <TUNNELNAME>
```

You can also list all tunnels with

```sh
$ cloudflared tunnel list
```

- [Tunnel commands](#tunnel-commands)
  - [`--config`](#--config)
  - [`--autoupdate-freq`](#--autoupdate-freq)
  - [`--no-autoupdate`](#--no-autoupdate)
  - [`--origincert`](#--origincert)
  - [`--no-tls-verify`](#--no-tls-verify)
  - [`--metrics`](#--metrics)
  - [`--metrics-update-freq`](#--metrics-update-freq)
  - [`--tag`](#--tag)
  - [`--loglevel`](#--loglevel)
  - [`--proto-loglevel`](#--proto-loglevel)
  - [`--retries`](#--retries)
  - [`--pidfile`](#--pidfile)
  - [`--logfile`](#--logfile)
  - [`--help`](#--help)
  - [`--version`](#--version)
- [Login command](#login-command)
- [Service commands](#service-commands)
- [Update command](#update-command)

### `--config`

| Syntax | Default |
|--|--|
| `--config value` | `~/.cloudflared/config.yml` |

Specifies a config file in YAML format.

### `--autoupdate-freq`

| Syntax | Default |
|--|--|
| `--autoupdate-freq` | `24h` |

Autoupdate frequency. See also [`--no-autoupdate`](#no-autoupdate).

### `--no-autoupdate`

| Syntax | Default |
|--|--|
| `--no-autoupdate` | `false` |

Disables periodic check for updates, restarting the server with the new version. See also [`--autoupdate-freq`](#autoupdate-freq). Restarts are performed by spawning a new process that connects to the Cloudflare edge. On successful connection, the old process will gracefully shut down after handling all outstanding requests.

### `--origincert`

| Syntax | Default | Environment Variable |
|--|--|--|
| `--origincert value` | `~/.cloudflared/cert.pem` | `TUNNEL_ORIGIN_CERT` |

Specifies the Tunnel certificate for one of your zones, authorizing the client to serve as an origin for that zone. A certificate is required to use Argo Tunnel. You can obtain a certificate by using the login command or by visiting `https://dash.cloudflare.com/argotunnel`.

### `--no-tls-verify`

| Syntax | Default |
|--|--|
| `--no-tls-verify` | `false` |

Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.
The connection from your machine to Cloudflare's Edge is still encrypted and verified using TLS.

### `--metrics`

| Syntax | Default | Environment Variable |
|--|--|--|
| `--metrics value` | `localhost:` | `TUNNEL_METRICS` |

Address to query for usage metrics.

### `--metrics-update-freq`

| Syntax | Default | Environment Variable |
|--|--|--|
| `--metrics-update-freq duration` | `5s` | `TUNNEL_METRICS_UPDATE_FREQ` |

Frequency to update tunnel metrics.

### `--tag`

| Syntax | Environment Variable |
|--|--|
| `--tag KEY=VALUE` | `TUNNEL_TAG` |

Custom tags used to identify this tunnel, in format `KEY=VALUE`. Multiple tags may be specified by delimiting them with commas e.g. `KEY1=VALUE1`,`KEY2=VALUE2`.

### `--loglevel`

| Syntax | Default | Environment Variable |
|--|--|--|
| `--loglevel value` | `info` | `TUNNEL_LOGLEVEL` |

Specifies the verbosity of logging. The default `info` is not noisy, but you may wish to run with `warn` in production. Available options: `panic` `fatal` `error` `warn` `info` `debug`

### `--proto-loglevel`

| Syntax | Default | Environment Variable |
|--|--|--|
| `--proto-loglevel` | `warn` | `TUNNEL_PROTO_LOGLEVEL` |

Specifies the verbosity of the HTTP/2 protocol logging. Any value below `warn` is noisy and should only be used to debug low-level performance issues and protocol quirks.

### `--retries`

| Syntax | Default | Environment Variable |
|--|--|--|
| `--retries value` | `5` | `TUNNEL_RETRIES` |

Maximum number of retries for connection/protocol errors. Retries use exponential backoff (retrying at 1, 2, 4, 8, 16 seconds by default) so increasing this value significantly is not recommended.

### `--pidfile`

| Syntax | Environment Variable |
|--|--|
| `--pidfile value` | `TUNNEL_PIDFILE` |

Write the application's PID to this file after the first successful connection. Mainly useful for scripting and service integration.

### `--logfile`

| Syntax | Environment Variable |
|--|--|
| `--logfile value` | `TUNNEL_LOGFILE` |

Save application log to this file. Mainly useful for reporting issues.

### `--help`

| Syntax |
|--|
| `--help` |

Shows help text.

### `--version`

| Syntax |
|--|
| `--version` |

Prints the version number and build date.

## Login command

```sh
$ cloudflared tunnel login
```

Opens a special section of the Cloudflare dashboard for obtaining a Tunnel certificate.

It should open your browser automatically and prompt you to log in to your Cloudflare account (unless you previously logged in with 'Remember me' selected). If running cloudflared on a server, you will be given an URL that you can visit on another machine.
After logging in, a list of your zones will appear. Select the zone you want to use Argo Tunnel with. After confirming your authorization, the certificate should be sent to the Tunnel client and saved to `.cloudflared/cert.pem` in your user folder. If this process fails for any reason, the certificate will instead be downloaded by your browser and you will have to copy the file manually to that location.
You can also obtain a Tunnel certificate independently of this command by visiting `https://dash.cloudflare.com/argotunnel`.

## Service commands

```sh
$ cloudflared service install
```

```sh
$ cloudflared service uninstall
```

Install or uninstall cloudflared as a system service. The details of service installation depend on the OS you are using.

## Update command

```sh
$ cloudflared update
```

Looks for a new version on the official download server. If a new version exists, updates the agent binary and quits. Otherwise, it does nothing.
To determine if an update happened in a script, check for error code 64.
