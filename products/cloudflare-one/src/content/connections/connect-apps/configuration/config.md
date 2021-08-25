---
order: 1
pcx-content-type: reference
hidden: true
---

# Configuration file

You can run `cloudflared` with a configuration file, which contains keys and values to configure `cloudflared`'s behavior.
The configuration file format uses [YAML syntax](http://www.yaml.org/start.html).

## Example file

The example file below uses a single Tunnel to send traffic sent to two distinct hostnames to two services that `cloudflared` can address. The configuration file uses [ingress rules](/connections/connect-apps/configuration/ingress) to route traffic that arrives at `cloudflared`.

```yml
tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef
credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json

ingress:
  - hostname: gitlab.widgetcorp.tech
    service: http://localhost:80
  - hostname: gitlab-ssh.widgetcorp.tech
    service: ssh://localhost:22
  - service: http_status:404
```

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
On Windows the default directory is `%USERPROFILE%\.cloudflared`.
On Unix-like systems, the default directories are `~/.cloudflared`, `/etc/cloudflared` and `/usr/local/etc/cloudflared` in that order.
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


