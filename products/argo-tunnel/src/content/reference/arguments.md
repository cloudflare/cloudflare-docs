---
order: 100
---

# Command-line arguments

* [Tunnel command](#tunnel-command)
  * [Login command](#login-command)
* [Service command](#service-command)
* [Update command](#update-command)

<div id="tunnel-command">

### Tunnel command
</div>

All tunnel-related commands are prefixed with 'tunnel'. For example:

```bash
cloudflared tunnel --url localhost:5555 --hostname x.example.com
```


<div id="config">

## config
</div>

Syntax: `--config value`

Default: `~/.cloudflared/config.yml`

Specifies a config file in YAML format.

<div id="url">

## url
</div>

Syntax: `--url URL`

Default: `http://localhost:8080`

Environment variable: `TUNNEL_URL`

Connect to the local webserver at URL.
<div id="hostname">

## hostname
</div>

Syntax: `--hostname value`

Environment variable: `TUNNEL_HOSTNAME`

Set a hostname on a Cloudflare zone to route traffic through this tunnel.

<div id="lb-pool">

## lb-pool
</div>

Syntax : `--lb-pool POOL_NAME`

Add this tunnel to a [Load Balancer pool](/reference/load-balancing/). If it doesn’t already exist a load balancer will be created
for the hostname of your tunnel, and a pool will be created with the pool name you specify. Traffic destined to that
pool will be load balanced across this tunnel and any other tunnels which share its pool name.

<div id="autoupdate-freq">

## autoupdate-freq
</div>

Syntax: `--autoupdate-freq duration`

Default: `24h`

Autoupdate frequency. See also [--no-autoupdate](#no-autoupdate)

<div id="no-autoupdate">

## no-autoupdate
</div>

Syntax: `--no-autoupdate`

Default: `false`

Disable periodic check for updates, restarting the server with the new version. See also [--autoupdate-freq](#autoupdate-freq)

Restarts are performed by spawning a new process that connects to the Cloudflare edge. On successful connection, the old process will gracefully shut down after handling all outstanding requests.

<div id="origincert">

## origincert
</div>

Syntax: `--origincert value`

Default: `~/.cloudflared/cert.pem`

Environment variable: `TUNNEL_ORIGIN_CERT`

Specifies the Tunnel certificate for one of your zones, authorizing the client to serve as an origin for that zone. A certificate is required to use Argo Tunnel. You can obtain a certificate by using the [login command](#login-command) or by visiting https://dash.cloudflare.com/argotunnel.

<div id="no-tls-verify">

## no-tls-verify
</div>

Syntax: `--no-tls-verify`

Default: `false`

Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

<Aside>

The connection from your machine to Cloudflare's Edge is still encrypted and verified using TLS.
</Aside>

<div id="origin-ca-pool">

## origin-ca-pool
</div>

Syntax: `--origin-ca-pool value`

Path to the CA for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

<div id="origin-server-name">

## origin-server-name
</div>

Syntax: `--origin-server-name value`

Environment variable: `TUNNEL_ORIGIN_SERVER_NAME`

Hostname that `cloudflared` should expect from your origin server certificate.

<div id="metrics">

## metrics
</div>

Syntax: `--metrics value`

Default: `localhost:`

Environment variable: `TUNNEL_METRICS`

Address to query for usage metrics.
<div id="metrics-update-freq">

## metrics-update-freq
</div>

Syntax: `--metrics-update-freq duration`

Default: `5s`

Environment variable: `TUNNEL_METRICS_UPDATE_FREQ`

Frequency to update tunnel metrics.

<div id="tag">

## tag
</div>

Syntax: `--tag KEY=VALUE`

Environment variable: `TUNNEL_TAG`

Custom tags used to identify this tunnel, in format `KEY=VALUE`. Multiple tags may be specified by delimiting them with commas e.g. `KEY1=VALUE1,KEY2=VALUE2`.

<div id="loglevel">

## loglevel
</div>

Syntax: `--loglevel (panic|fatal|error|warn|info|debug)`

Default: `info`

Environment variable: `TUNNEL_LOGLEVEL`

Specifies the verbosity of logging. The default "info" is not noisy, but you may
wish to run with "warn" in production.

<div id="proto-loglevel">

## proto-loglevel
</div>

Syntax: `--proto-loglevel (panic|fatal|error|warn|info|debug)`

Default: `warn`

Environment variable: `TUNNEL_PROTO_LOGLEVEL`

Specifies the verbosity of the HTTP/2 protocol logging. Any value below 'warn' is noisy and should only be used
to debug low-level performance issues and protocol quirks.

<div id="retries">

## retries
</div>

Syntax: `--retries value`

Default: `5`

Environment variable: `TUNNEL_RETRIES`

Maximum number of retries for connection/protocol errors. Retries use exponential backoff (retrying at 1, 2, 4, 8, 16 seconds by default) so increasing this value significantly is not recommended.

<div id="no-chunked-encoding">

## no-chunked-encoding
</div>

Syntax: `--no-chunked-encoding`

Default: `false`

Disables chunked transfer encoding; useful if you are running a WSGI server.

<div id="hello-world">

## hello-world
</div>

Syntax: `--hello-world`

Environment variable: `TUNNEL_HELLO_WORLD`

Use the established tunnel to expose a 'Hello world' HTTP server for testing Argo Tunnel. Mutually exclusive with the `--url` argument.

<div id="pidfile">

## pidfile
</div>

Syntax: `--pidfile value`

Environment variable: `TUNNEL_PIDFILE`

Write the application's PID to this file after first successful connection. Mainly useful for scripting and service integration.

<div id="logfile">

## logfile
</div>

Syntax: `--logfile value`

Environment variable: `TUNNEL_LOGFILE`

Save application log to this file. Mainly useful for reporting issues.

<div id="proxy-connect-timeout">

## proxy-connect-timeout
</div>

Syntax: `--proxy-connect-timeout value`

Default: `30s`

Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by [--proxy-tls-timeout]({{< ref "#proxy-tls-timeout" >}}).

<div id="proxy-tls-timeout">

## proxy-tls-timeout
</div>

Syntax: `--proxy-tls-timeout value`

Default: `10s`

Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

<div id="proxy-tcp-keepalive">

## proxy-tcp-keepalive
</div>

Syntax: `--proxy-tcp-keepalive value`

Default: `30s`

The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

<div id="proxy-no-happy-eyeballs">

## proxy-no-happy-eyeballs
</div>

Syntax: `--proxy-no-happy-eyeballs`

Disable the "happy eyeballs" algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

<div id="proxy-keepalive-connections">

## proxy-keepalive-connections
</div>

Syntax: `--proxy-keepalive-connections value`

Default: `100`

Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

<div id="proxy-keepalive-timeout">

## proxy-keepalive-timeout
</div>

Syntax: `--proxy-keepalive-timeout value`

Default: `1m30s`

Timeout after which an idle keepalive connection can be discarded.

<div id="help">

## help
</div>

Syntax: `--help`

Shows help text.

<div id="version">

## version
</div>

Syntax: `--version`

Prints the version number and build date.
<div id="login-command">

#### Login command
</div>

`cloudflared tunnel login`

Opens a special section of the Cloudflare dashboard for obtaining a Tunnel certificate.

It should open your browser automatically and prompt you to log in to your Cloudflare account (unless you previously logged in with 'remember me' selected). If running `cloudflared` on a server, you will be given an URL that you can visit on another machine.

After logging in, a list of your zones will appear. Select the zone you want to use Argo Tunnel with. After confirming your authorization, the certificate should be sent to the Tunnel client and saved to `.cloudflared/cert.pem` in your user folder. If this process fails for any reason, the certificate will instead be downloaded by your browser and you will have to copy the file manually to that location.

You can also obtain a Tunnel certificate independently of this command by visiting https://dash.cloudflare.com/argotunnel.

<div id="service-command">

#### Service command
</div>

`cloudflared service install`
`cloudflared service uninstall`

Install or uninstall cloudflared as a system service. The details of service installation depend on the OS you are using. See [Automatically starting Argo Tunnel]({{< ref "reference/service.md" >}}) for more information.

<div id="update-command">

### Update command
</div>

`cloudflared update`

Looks for a new version on the offical download server. If a new version exists, updates the agent binary and quits. Otherwise, does nothing.

To determine if an update happened in a script, check for error code 64.



<style dangerouslyInsertInnerHTML={{__html: `
h2 {
  text-transform: none !important
}`}}></style>
