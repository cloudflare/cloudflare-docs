---
order: 1
---

# Configuration file

You can run `cloudflared` with [Arguments](/connections/connect-apps/configuration/arguments) from the command line or a configuration file.

The configuration file format uses [YAML syntax](http://www.yaml.org/start.html). Every command-line argument of cloudflared can be expressed in YAML.

For example, the `--hostname [hostname]` argument is written in the config file as:

```yml
hostname: [hostname]
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

Without specifying `--config`, `cloudflared` will default to reading `~/.cloudflared/config.yml`.
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

See the full set of [command-line arguments](/connections/connect-apps/configuration/arguments).
