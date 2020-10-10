---
title: Arguments
weight: 1
---

* [Tunnel commands](#tunnel-commands)
* [Login command](#login-command)
* [Service commands](#service-commands)
* [Update command](#update-command)

## <a name="tunnel-commands"></a>Tunnel commands

All tunnel-related commands are prefixed with `tunnel`. For example:

`cloudflared tunnel --url localhost:5555 --hostname x.example.com`

* [--config](#config)
* [--url](#url)
* [--hostname](#hostname)
* [--lb-pool](#lb-pool)
* [--autoupdate-freq](#autoupdate-freq)
* [--no-autoupdate](#no-autoupdate)
* [--origincert](#origincert)
* [--no-tls-verify](#no-tls-verify)
* [--origin-ca-pool](#origin-ca-pool)
* [--origin-server-name](#origin-server-name)
* [--metrics](#metrics)
* [--metrics-update-freq](#metrics-update-freq)
* [--tag](#tag)
* [--loglevel](#loglevel)
* [--proto-loglevel](#proto-loglevel)
* [--retries](#retries)
* [--no-chunked-encoding](#no-chunked-encoding)
* [--hello-world](#hello-world)
* [--pidfile](#pidfile)
* [--logfile](#logfile)
* [--proxy-connect-timeout](#proxy-connect-timeout)
* [--proxy-tls-timeout](#proxy-tls-timeout)
* [--proxy-tcp-keepalive](#proxy-tcp-keepalive)
* [--proxy-no-happy-eyeballs](#proxy-no-happy-eyeballs)
* [--proxy-keepalive-connections](#proxy-keepalive-connections)
* [--proxy-keepalive-timeout](#proxy-keepalive-timeout)
* [--help, -h](#help)
* [--version, -v](#version)


### <a name="config"></a>`--config`

| Syntax | Default |
|--|--|
| `--config value` | `~/.cloudflared/config.yml` |

Specifies a config file in YAML format.

### <a name="url"></a>`--url`

| Syntax | Default | Environment Variable |
|--|--|--|
| `--url URL` | `http://localhost:8080` | `TUNNEL_URL` |

Connects to the local webserver at `URL`.

### <a name="hostname"></a>`--hostname`

| Syntax | Environment Variable |
|--|--|
| `--hostname value` | `TUNNEL_HOSTNAME` |

Sets a hostname on a Cloudflare zone to route traffic through this tunnel.

### <a name="lb-pool"></a>`--lb-pool`

| Syntax |
|--|
| `--lb-pool POOL_NAME` |

Add this tunnel to a Load Balancer pool. If it doesn’t already exist a load balancer will be created for the hostname of your tunnel, and a pool will be created with the pool name you specify. Traffic destined to that pool will be load balanced across this tunnel and any other tunnels which share its pool name.

### <a name="autoupdate-freq"></a> `--autoupdate-freq`

| Syntax | Default |
|--|--|
| `--autoupdate-freq` | `24h` |

Autoupdate frequency. See also [`--no-autoupdate`](#no-autoupdate).

### <a name="no-autoupdate"></a> `--no-autoupdate`

| Syntax | Default |
|--|--|
| `--no-autoupdate` | false |

Disables periodic check for updates, restarting the server with the new version. See also [`--autoupdate-freq`](#autoupdate-freq). Restarts are performed by spawning a new process that connects to the Cloudflare edge. On successful connection, the old process will gracefully shut down after handling all outstanding requests.

### <a name="origincert"></a>`--origincert`

| Syntax | Default | Environment Variable |
|--|--|--|
| `--origincert value` | `~/.cloudflared/cert.pem` | `TUNNEL_ORIGIN_CERT` |

Specifies the Tunnel certificate for one of your zones, authorizing the client to serve as an origin for that zone. A certificate is required to use Argo Tunnel. You can obtain a certificate by using the login command or by visiting `https://dash.cloudflare.com/argotunnel`.

### <a name="no-tls-verify"></a>`--no-tls-verify`

| Syntax | Default |
|--|--|
| `--no-tls-verify` | false |

Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.
The connection from your machine to Cloudflare's Edge is still encrypted and verified using TLS.

### <a name="origin-ca-pool"></a>`--origin-ca-pool`

| Syntax |
|--|
| `--origin-ca-pool value` |

Path to the CA for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.


### <a name="origin-server-name"></a>`--origin-server-name`

| Syntax | Environment Variable |
|--|--|
| `--origin-server-name value` | `TUNNEL_ORIGIN_SERVER_NAME` |


### <a name="metrics"></a>`--metrics`

| Syntax | Default | Environment Variable |
|--|--|--|
| `--metrics value` | `localhost:` | `TUNNEL_METRICS` |

Address to query for usage metrics.


### <a name="metrics-update-freq"></a>`--metrics-update-freq`

| Syntax | Default | Environment Variable |
|--|--|--|
| `--metrics-update-freq duration` | `5s` | `TUNNEL_METRICS_UPDATE_FREQ` |

Frequency to update tunnel metrics.

### <a name="tag"></a>`--tag`

| Syntax | Environment Variable |
|--|--|
| `--tag KEY=VALUE` | `TUNNEL_TAG` |

Custom tags used to identify this tunnel, in format `KEY=VALUE`. Multiple tags may be specified by delimiting them with commas e.g. `KEY1=VALUE1`,`KEY2=VALUE2`.

### <a name="loglevel"></a>`--loglevel`

**Syntax**: `--loglevel (panic|fatal|error|warn|info|debug)`   
**Default**: `info`  
**Environment Variable**: `TUNNEL_LOGLEVEL`  

Specifies the verbosity of logging. The default `info` is not noisy, but you may wish to run with `warn` in production.


### <a name="proto-loglevel"></a>`--proto-loglevel`

| Syntax | Default | Environment Variable |
|--|--|--|
| `--proto-loglevel` | `warn` | `TUNNEL_PROTO_LOGLEVEL` |

Specifies the verbosity of the HTTP/2 protocol logging. Any value below `warn` is noisy and should only be used to debug low-level performance issues and protocol quirks.

### <a name="retries"></a>`--retries`

| Syntax | Default | Environment Variable |
|--|--|--|
| `--retries value` | `5` | `TUNNEL_RETRIES` |

Maximum number of retries for connection/protocol errors. Retries use exponential backoff (retrying at 1, 2, 4, 8, 16 seconds by default) so increasing this value significantly is not recommended.


### <a name="no-chunked-encoding"></a>`--no-chunked-encoding`

| Syntax | Default |
|--|--|
| `--no-chunked-encoding` | false |

Disables chunked transfer encoding; useful if you are running a WSGI server.

### <a name="hello-world"></a>`--hello-world`

| Syntax | Environment Variable |
|--|--|
| `--hello-world` | `TUNNEL_HELLO_WORLD` |

Use the established tunnel to expose a `Hello world` HTTP server for testing Argo Tunnel. Mutually exclusive with the `--url argument`.

### <a name="pidfile"></a>`--pidfile`

| Syntax | Environment Variable |
|--|--|
| `--pidfile value` | `TUNNEL_PIDFILE` |

Write the application's PID to this file after the first successful connection. Mainly useful for scripting and service integration.

### <a name="logfile"></a>`--logfile`

| Syntax | Environment Variable |
|--|--|
| `--logfile value` | `TUNNEL_LOGFILE` |

Save application log to this file. Mainly useful for reporting issues.

### <a name="proxy-connect-timeout"></a>`--proxy-connect-timeout`

| Syntax | Default |
|--|--|
| `--proxy-connect-timeout value` | `30s` |

Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by [--proxy-tls-timeout](#proxy-tls-timeout).

### <a name="proxy-tls-timeout"></a> `--proxy-tls-timeout`

| Syntax | Default |
|--|--|
| `--proxy-tls-timeout value` | `10s` |

Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

### <a name="proxy-tcp-keepalive"></a>`--proxy-tcp-keepalive`

| Syntax | Default |
|--|--|
| `--proxy-tcp-keepalive value` | `30s` |

The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

### <a name="proxy-no-happy-eyeballs"></a>`--proxy-no-happy-eyeballs`

| Syntax |
|--|
| `--proxy-no-happy-eyeballs` |

Disable the "happy eyeballs" algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

### <a name="proxy-keepalive-connections"></a>`--proxy-keepalive-connections`

| Syntax | Default |
|--|--|
| `--proxy-keepalive-connections value` | `100` |

Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

### <a name="proxy-keepalive-timeout"></a>`--proxy-keepalive-timeout`

| Syntax | Default |
|--|--|
| `--proxy-keepalive-timeout value` | `1m30s` |

Timeout after which an idle keepalive connection can be discarded.

### <a name="help"></a>`--help`

| Syntax |
|--|
| `--help` |

Shows help text.

### <a name="version"></a>`--version`

| Syntax |
|--|
| `--version` |

Prints the version number and build date.

## <a name="login-command"></a>Login command

`cloudflared tunnel login`

Opens a special section of the Cloudflare dashboard for obtaining a Tunnel certificate.

It should open your browser automatically and prompt you to log in to your Cloudflare account (unless you previously logged in with 'Remember me' selected). If running cloudflared on a server, you will be given an URL that you can visit on another machine.
After logging in, a list of your zones will appear. Select the zone you want to use Argo Tunnel with. After confirming your authorization, the certificate should be sent to the Tunnel client and saved to `.cloudflared/cert.pem` in your user folder. If this process fails for any reason, the certificate will instead be downloaded by your browser and you will have to copy the file manually to that location.
You can also obtain a Tunnel certificate independently of this command by visiting `https://dash.cloudflare.com/argotunnel`.

## <a name="service-commands"></a>Service commands

`cloudflared service install`  
`cloudflared service uninstall`

Install or uninstall cloudflared as a system service. The details of service installation depend on the OS you are using.


## <a name="update-command"></a>Update command

`cloudflared update`

Looks for a new version on the official download server. If a new version exists, updates the agent binary and quits. Otherwise, it does nothing.
To determine if an update happened in a script, check for error code 64.

