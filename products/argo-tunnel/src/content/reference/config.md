---
order: 90
---

# Configuration File Format

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

The configuration file format uses [YAML syntax](http://www.yaml.org/start.html). Every command-line argument of `cloudflared` can be expressed in YAML.

For example, the `--hostname [hostname]` argument is written in the config file as:

```yaml
hostname: [hostname]
```

You can use `--config` to point to a non-standard YAML file location:

```sh
$ cloudflared tunnel --config tunnels/config.yml
```

Without specifying `--config`, `cloudflared` will default to reading `~/.cloudflared/config.yml`.

An example `config.yml` for the above command could look like:

```yaml
hostname: tunnel.yourdomain.com
url: https://localhost:8000
logfile: /var/log/cloudflared.log
```

Flags that don't expect any value (such as `--hello-world`) should be specified as boolean `true` in the YAML:
```yaml
hello-world: true
```

See the [full set of command-line arguments](/reference/arguments)
