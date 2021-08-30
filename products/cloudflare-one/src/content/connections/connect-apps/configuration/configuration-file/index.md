---
order: 1
pcx-content-type: reference
---

# Configuration file

<Aside type="note">

If you are running [quick tunnels](/connections/connect-apps/install-and-setup/tunnel-useful-terms#quick-tunnels), you do not need a configuration file.

</Aside>

The [configuration file](/connections/connect-apps/install-and-setup/tunnel-useful-terms#configuration-file) is a `.yaml` file that functions as the operating manual for `cloudflared`. By creating a configuration file, you can have fine-grained control over how an instance of `cloudflared` will operate.

In the absence of a configuration file, `cloudflared` will proxy outbound traffic through port 8080.  

## File structure

The structure of the configuration file will be different depending on the type of resource you want to expose to the Internet. The configuration file uses YAML syntax, and it contains pairs of keys and values that configure `cloudflared`'s behavior. 

### Keys and values

Whether you are exposing an application or a network on the Internet, it is common to list these keys as the first ones in your configuration file:

| Key | Value |
| --- | ----- |
| `tunnel:` | The tunnel UUID |
| `credentials-file:` | The path to your tunnel’s credentials file |

<Aside type='note'>

Adding these keys to the configuration file is equivalent to running the `cloudflared tunnel --config /config/file/path/config.yaml run <NAME>` command. Leave these keys out if you plan on having more than one tunnel referencing the same configuration file.

</Aside>

If you’re [exposing a private network](/connections/connect-apps/configuration/private-networks), you need to add the `warp-routing` key:

| Key | Value |
| --- | ----- |
| `tunnel:` | The tunnel UUID |
| `credentials-file:` | The path to your tunnel’s credentials file |
| `warp-routing:` | `enabled:true` |

### Ingress rules

By configuring ingress rules in the configuration file, you can specify which local services a request should be proxied to. Refer to the [ingress rules page](/connections/connect-apps/configuration/configuration-file/ingress) for more information on writing ingress rules and how they work.

## Creating a configuration file

Before you run a tunnel, ensure you have created a configuration file for `cloudflared` to know what configuration to follow when routing traffic through the tunnel. When running a tunnel, you can either reference an existing configuration file, or create a new one in your `.cloudflared` directory using any text editor.

For example, to create a configuration file in the [default directory](#storing-a-configuration-file) with vim:

1. `cd` into your system's default directory for `cloudflared`.
1. Open vim and type in the necessary [keys and values](#keys-and-values).
1. Name and save your file by typing `:wq file-name.yaml` and exit vim.

Your file has now been created in your default directory. Confirm that the configuration file has been successfully created by running:

```sh
$ cat config.yml 
```

## Storing a configuration file

It is important to note that `cloudflared` will automatically look for the configuration file in default directories. 

* On Windows the default directory is `%USERPROFILE%\.cloudflared`.
* On Unix-like systems, the default directories are `~/.cloudflared`, `/etc/cloudflared`, and `/usr/local/etc/cloudflared`, in that order.

If needed, you can use `--config` to point to a non-standard YAML file location:

```sh
$ cloudflared tunnel --config tunnels/config.yml run
```
