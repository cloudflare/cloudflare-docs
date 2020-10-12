---
order: 1
---

# Config File

You can run `cloudflared` with:
* [Arguments](https://developers.cloudflare.com/argo-tunnel/configuration/arguments) from the command line
* The configuration file.

The configuration file format uses [YAML syntax](http://www.yaml.org/start.html). Every command-line argument of cloudflared can be expressed in YAML.

For example, the `--hostname [hostname]` argument is written in the config file as:

```yml
hostname: [hostname]
```

You can use `--config` to point to a non-standard YAML file location:

```bash
$ cloudflared tunnel --config tunnels/config.yml
```

Without specifying `--config`, `cloudflared` will default to reading `~/.cloudflared/config.yml`.
An example `config.yml` for the above command could look like:

```yml
hostname: tunnel.yourdomain.com
url: https://localhost:8000
logfile: /var/log/cloudflared.log
```

Flags that don't expect any value (such as `--hello-world`) should be specified as boolean `true` in the YAML:

```yml
hello-world: true
```

See the full set of [command-line arguments](https://developers.cloudflare.com/argo-tunnel/configuration/arguments).
