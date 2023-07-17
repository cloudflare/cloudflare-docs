---
pcx_content_type: reference
title: Configuration file
weight: 2
---

# Configuration file

{{<Aside type="note">}}

If you are running [quick tunnels](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-useful-terms/#quick-tunnels), you do not need a configuration file.

{{</Aside>}}

Configuring tunnels through a YAML file (what we refer to as a [configuration file](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-useful-terms/#configuration-file)) allows you to have fine-grained control over how an instance of `cloudflared` will operate. In your configuration file you can specify top-level properties for your `cloudflared` instance, as well as configure origin-specific properties by writing [ingress rules](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/local/local-management/ingress/) and adding parameters to them.

In the absence of a configuration file, `cloudflared` will proxy outbound traffic through port 8080.

## File structure

The structure of a configuration file will be different depending on the type of resource you want to expose to the Internet.

### Top-level configurations

When creating a configuration file, it is best practice to list `tunnel` and `credentials-file` as your first key/value pairs. Whether you are exposing an application or a network on the Internet, it is common to list these keys as the first ones in your configuration file:

```txt
tunnel: The tunnel UUID
credentials-file: /path/your-tunnels-credentials-file.json
```

If you’re [exposing a private network](/cloudflare-one/connections/connect-networks/private-net/), you need to add the `warp-routing` key and set it to `true`:

```txt
tunnel: The tunnel UUID
credentials-file: /path/your-tunnels-credentials-file.json
warp-routing:
    enabled: true
```

### Ingress rules

Once your top-level configuration is complete, you can begin addressing origin-specific configurations. By writing ingress rules in the configuration file, you can specify which local services a request should be proxied to.
Refer to the [ingress rules page](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/local/local-management/ingress/) for more information on writing ingress rules and how they work.

## Creating a configuration file

You can create your configuration file using any text editor. For example, to create a configuration file in the [default `cloudflared` directory](#naming-and-storing-a-configuration-file) with vim:

1.  `cd` into your system's default directory for `cloudflared`.
1.  Open vim and type in the necessary [keys and values](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/local/local-management/ingress/#origin-configuration).
1.  Name and save your file by typing `:wq config.yaml` and exit vim.

Confirm that the configuration file has been successfully created by running:

```sh
$ cat config.yaml 
```

## Naming and storing a configuration file

`cloudflared` will automatically look for a `config.yaml` or `config.yml` file in the [default `cloudflared` directory](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-useful-terms/#default-cloudflared-directory).

You can give your configuration file a custom name and store it in any directory. However, when running tunnel, make sure to add the `--config` flag and specify the new path.  

```sh
$ cloudflared tunnel --config /path/your-config-file.yaml run tunnel-name
```

## Editing a configuration file

When making changes to the configuration file for a given tunnel, we suggest relying on [`cloudflared` replicas](/cloudflare-one/connections/connect-networks/install-and-setup/deploy-cloudflared-replicas/) to propagate the new configuration with minimal downtime.

1.  Have a `cloudflared` instance running with the original version of the configuration file.
1.  Start a `cloudflared` replica running with the updated version of the configuration file.
1.  Wait for the replica to be fully running and usable.
1.  Stop the first instance of `cloudflared`.

Your `cloudflared` will now be running with the updated version of your configuration file.

{{<Aside type="note" header="Traffic handling">}}

When the first instance of <code>cloudflared</code> is stopped, long-lived HTTP requests (for example, Websocket) and TCP connections (for example, SSH) will be dropped. UDP flows will also be dropped, as they are modeled based on timeouts. When the new replica connects, it will handle all new traffic, including new HTTP requests, TCP connections, and UDP flows.

{{</Aside>}}
