---
order: 8
---

# Common `cloudflared` Commands

Here are some of the commonly used `cloudflared` commands that you may find useful when building your own Tunnel. You may refer to the full list via `cloudflared --help`

## `cloudflared tunnel run`
Start running a Cloudflare Tunnel with the given UUID or name. If no UUID or name is given, the Tunnel specified in your `config.yml` file will be run. You may specify optional flags in the following format:
```sh
$ cloudflared tunnel [FLAG(s)] run <tunnel UUID or NAME>
```

## `cloudflared update`
Update `cloudflared` to the latest version.

## `cloudflared proxy-dns`
Run a [DNS over HTTPS proxy server](https://developers.cloudflare.com/1.1.1.1/dns-over-https/cloudflared-proxy).

## `cloudflared service install`
If you have already logged in and have a configuration file in `~/.cloudflared/`, this command will [run a Tunnel as a system service](/connections/connect-apps/run-tunnel/run-as-service).

## `cloudflared service uninstall`
Uninstall `cloudflared` as a system service.

## `cloudflared route`
### DNS record 
Create a CNAME DNS record that points `www.yourdomain.com` to the subdomain of a specific Tunnel. This achieves the same result as creating a CNAME record on the dashboard.
```sh
$ cloudflared tunnel route dns <tunnel UUID or NAME> www.yourdomain.com
```
Note: this command requires the `cert.pem` file.

### Load balancers
Add a Tunnel to an existing load balancer pool. The result is the same as creation from the dashboard.

```sh
$ cloudflared tunnel route lb <tunnel UUID or NAME> <load balancer name> <load balancer pool>
```
Note: this command requires the `cert.pem` file.

## `cloudflared tunnel list`
List existing tunnels and their connection status.

## `cloudflared tunnel info <UUID or NAME>`
Obtain more details on the connection information for each Tunnel.

## Some useful flags for `cloudflared tunnel`

<TableWrap>

| Flag | Description |
| ---- | ----------- |
| `--config value` | Path to a config file in YAML format. (default: `~/.cloudflared/config.yml`) |
| `--origincert value` | Path to the certificate generated for your origin when you run `cloudflared login`. (default: `~/.cloudflared/cert.pem`) |
| `--metrics value ` | Listen address for metrics reporting. (default: "localhost:") |
| `--url URL` | Connects to the local webserver at `URL`. (default: `http://localhost:8080`) |
| `--http-host-header value` | Sets the HTTP Host header for the local webserver. |
| `--origin-server-name value` | Hostname on the origin server certificate. |
| `--unix-socket value` | Path to unix socket to use instead of `--url` |
| `--no-tls-verify` | Disables TLS verification of the certificate presented by your origin. It will allow any certificate from the origin to be accepted. Note: The connection from your machine to Cloudflare's Edge is still encrypted. (default: false) |
| `--loglevel value` | Application logging level {`debug`, `info`, `warn`, `error`, `fatal`}. At `debug` level `cloudflared` will log request URL, method, protocol, content length, as well as all request and response headers. This is a useful debugging tool when running a Tunnel: `cloudflared tunnel --loglevel debug run`. However, please note that this can expose sensitive information in your logs. (default: `info`) |
| `--transport-loglevel value` | Transport logging level (previously called protocol logging level) {`debug`, `info`, `warn`, `error`, `fatal`} (default: `info`) |
| `--logfile value` | Saves application log to this file for reporting issues. |
| `--log-directory value` | Saves application log to this directory for reporting issues. |
| `--trace-output value` | Name of trace output file, generated when `cloudflared` stops. |

</TableWrap>
