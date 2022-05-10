---
_build:
  publishResources: false
  render: never
  list: never
---

## Complete tunnel configuration

1.  Make a directory for your configuration file.

    ```sh
    mkdir /etc/cloudflared
    ```

    ```sh
    cd /etc/cloudflared
    ```

1.  Build a configuration file. Before moving forward and entering vim, copy your Tunnel ID and credentials path to a notepad.

    ```sh
    vim config.yml
    ```

1. Type `i` to begin editing the file and copy-paste the following settings in it.

    ```text
    tunnel: <Tunnel ID/name>
    credentials-file: /root/.cloudflared/<Tunnel ID>.json
    protocol: quic
    warp-routing:
       enabled: true
    logfile: /var/log/cloudflared.log
    #cloudflared to the origin debug
    loglevel: debug
    #cloudflared to cloudflare debug
    transport-loglevel: info
    ```

1. Press `space` and then type `:x` to save and exit.

1. Run `cloudflared` as a service.

```sh
cloudflared service install
```

```sh
systemctl start cloudflared
```

```sh
systemctl status cloudflared
```

Next, visit the Zero Trust dashboard and ensure your new tunnel shows as **active**. Optionally, begin creating [Access policies](/cloudflare-one/policies/access/) to secure your private resources.
