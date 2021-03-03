---
order: 5
---

# Run a Tunnel

| Before you start |
|---|
| 1. [Create a Tunnel](/connections/connect-networks/private-net/create-tunnel) |
| 2. [Configure IPs in WARP](/connections/connect-devices/warp/exclude-traffic) |

Once configured, you can run `cloudflared` to connect to Cloudflare's network.

To begin, run the Tunnel with the following command. The command will connect `cloudflared` to Cloudflare's edge, using the configuration supplied. Traffic will route to the Tunnel based on the DNS or Load Balancer settings.

`cloudflared tunnel --config path/config.yaml run <NAME>`

You can also use the UUID of the Tunnel instead of the Name value.

`cloudflared tunnel --config path/config.yaml run <UUID>`

You can also specify the Tunnel name or UUID inside of the configuration file, in which case the command below will invoke the `run` command for that Tunnel.

`cloudflared tunnel --config path/config.yaml run`

If you do not specify a configuration file location, `cloudflared` will attempt to read a configuration file in `~/.cloudflared/config.yml`.

You can also:
* [Run a tunnel as a service](/connections/connect-networks/private-net/run-tunnel/run-as-service)
