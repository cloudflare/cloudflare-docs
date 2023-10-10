---
pcx_content_type: reference
title: Railgun execution
weight: 3
---

# Railgun execution

{{<render file="_railgun-deprecation-notice.md">}}

Railgun consists of two programs: `rg-listener` and `rg-sender`. `rg-listener` is to be installed at a hosting provider or end-user environment and listens for WAN connections. `rg-sender` is to be installed at Cloudflare locations and establishes connections across the WAN.

`rg-sender` acts as an HTTP proxy and accepts HTTP requests (with the `CF-ORIGIN-IP` and `CF-WAN-ID` headers) and sends them across the WAN to the `rg-listener` which then contacts the real web server.

Both ends use Memcached for page caching for the delta compression. If Memcached is not working then both ends still operate without delta compression.

Both programs write a log file containing detailed information about operation. `rg-listener` reads a configuration file named `rg.config` which is assumed to be in the same directory as the program. The location of the configuration file can be set on the command line with the `-config` option.

## Runtime Options

Option              | Description                                          
------------------- | -----------------------------------------------------
`-config[=\| ]PATH` | The path to the `rg.config` configuration file to use
`-version`          | Output version information and exit


## Configuration Parameters

{{<table-wrap>}}

Parameter | Description
--- | --- 
`wan.ip` | The IP on which to listen for WAN connections. Default to an empty string meaning all interfaces.
`wan.port` | The port on which to listen for WAN connections. Defaults to `2408`.
`stderr.file` | Name of log file to write `stderr` messages to. Useful for debugging crashes.
`log.level` | The maximum level of log message to output. `0` = errors only; `1` = informational messages; `5` = debugging. The default is `0`.
`syslog.addr` | The network address (`hostname:port`) of the `syslog` server to connect to using UDP, or a path for a connection using a Unix domain socket. Defaults to the empty string which means that the system configured `syslog` will be used via a Unix domain socket.
`lan.timeout` | The number of seconds to wait while trying to connect to a web server or for a read from the server. Defaults to `30`.
`wan.tls` | Whether to use TLS for the WAN connection. Defaults to `1` and should only be set to `0` for testing. If no certificate files are provided, but `wan.tls=1` and `activate.server` is non-empty, `rg-listener` will attempt to acquire a certificate from the activation server.
`memcached.servers` | Space separated list of Memcached servers in `host:port` format that will be used for caching. There is not default and this must be set.
`memcached.timeout` | The maximum amount of time (in ms) to wait for retrieval of a cached page from Memcached. The default is `100`.
`memcached.expiration` | The expiration time of individual Memcached items in seconds. The default is 600 seconds (10 minutes). If set to `0` then the expiration time is infinite.
`memcached.connect` | The `host:port` for the Memcached server. Defaults to `127.0.0.1:11211`.
`memcached.limit` | The maximum size (in bytes) of pages that will be stored in Memcached. Defaults to `100,000`.
`stats.enabled` | Determines whether statistics are gathered or not. Defaults to `0` (set to `1` for statistics output).
`stats.url` | Sets the URL (for example `http://stats.example.com:9090/`) to periodically `POST` stats to. Defaults to empty for disabled.
`stats.log` | Determines whether stats are periodically written to `syslog`. Defaults to `0` (set to `1` for logged statistics).
`stats.interval` | How often (in minutes) stats are generated (and logged and POSTed to the `stats.url`). Default is `1` indicating every minute.
`stats.listen` | `host:port` on which to listen and create a simple HTTP JSON API through which stats can be read via a `GET /`. Defaults to empty for disabled.
`pid.file` | The name of a file into which the PID will be written. Defaults to an empty string which means that no PID file is created.
`cert.file` | Name of file containing the certificate presented by this server to connections. No default.
`key.file` | Name of file containing the private key for the `cert.file`. No default.
`validate.cert` | Whether to validate the certificate presented when making a TLS connection. Defaults to `1` (meaning perform the validation).
`map.file` | Name of a file containing `domain=ip` pairs that is used to override DNS and the `CF-ORIGIN-IP` setting. Defaults to no file.
`activation.railgun_host` | The public facing, resolvable, hostname through which the Cloudflare CDN can connect to this `rg-listener`. DNS lookups are done at request-time. Use in place of `activation.public_ip`.
`activation.public_ip` | The external IP (or a hostname which resolves to the IP) of your Railgun instance used for activation and automatic DNS record updates. No default.
`activation.token` | 32 character hash used for activation (Refer to [Configuration and activation](/railgun/user-guide/set-up/configuration-activation/)). No default.
`activation.heartbeat_interval` | Interval, in seconds, between heartbeats to activation server. Defaults to `0`/`off`.
`memprofile.file` | Name of the file to which the heap profile will be written when `SIGUSR1` is received. There is no default value which means that the memory profile will not be created and memory profiling will be disabled.
`cpuprofile.file` | Name of the file to which the CPU profile will be written when `SIGUSR1` is received. There is no default value which means that the CPU profile will not be created. Note that the `SIGUSR1` signal toggles profiling on and off and the file will be written on every transition to off.
`cpuprofile.intial` | Whether to begin profiling immediately on startup. It is only valid when `cpuprofile.file` is set and valid. It is `0` by default, requiring an explicit signal to begin profiling.
`memstats.file` | Name of the file to which information about current memory use will be written when `SIGUSR2` is received. This is intended for internal use.
`ca.bundle` | Name of a file containing PEM-encoded CA root certificates that will be used for verifying connections to origin servers using TLS. Defaults to empty string which means use the system roots.
`origin.idleconns` | Sets the number of idle TCP connections that will be kept open to the origin server for connection pooling. Defaults to `1`.
`insecure.origin` | If this is set to `1` (to indicate true) then connections to the origin web server will be made insecurely at all times (for example, proxied HTTPS connections will use HTTP). This is only safe if the network topology between Railgun and the origin server cannot be eavesdropped upon. Defaults to `0` (false).
`origin.cf-railgun` | If set to `1` then a `Cf-Railgun` header will be sent to the origin web server when the request goes through railgun. Defaults to `0`. The `Cf-Railgun` will not have a compression ratio in it, instead it has the word `origin`.
`compress.data` | Whether LZ4 compression is to be enabled or not. The default is `0` (disabled). Set to `1` to enable.
`cpu.oversubscribe` | Tuning feature used to set a multiplier on the number of cores available to oversubscribe. Default is `1`.
`stream.size` | If the HTTP response body is greater than this number of bytes it will not be delta compressed and the body will be streamed across the WAN as it is read from the HTTP server. Defaults to `250000`.

{{</table-wrap>}}

## Running

1.  Create a `rg.config` file containing the parameters above.
2.  Start Memcached and then run `rg-listener` with the `-config` option set to the path of the `rg.config` file. Errors on start will output to `stderr`.

## Signal Handling

Railgun handles some signals for easier daemon control.

### SIGHUP

Reload configuration file. Certain configuration options cannot be dynamically changed and require a full restart. The following parameters can be changed at runtime: 

- `compress.data`
- `lan.timeout`
- `log.level`
- `map.file`
- `memcached.expiration`
- `memcached.limit`
- `memcached.servers`
- `memcached.timeout`
- `stats.url`
- `syslog.addr`
- `validate.cert`

### SIGQUIT

Perform a graceful shutdown without dropping active connections. Upon successful shutdown, deactivate the Railgun matching the `activation.token` via the Cloudflare API until the instance is restarted.

### SIGUSR2

Perform a binary upgrade by spawning a new child, and then terminating the previously running parent process. This signal is automatically sent during the post-install for binary yum/apt package upgrades.
