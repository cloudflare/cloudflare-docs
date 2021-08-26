---
order: 6
pcx-content-type: reference
---

# Useful commands

## Manage tunnels

| Command | Description |
| ------- | ----------- |
| `cloudflared tunnel login` | Prompts a browser window where you can log in to your Cloudflare account. | 
| `cloudflared tunnel list` | Lists tunnels along with information such as their name, UUID, creation date, and connections. |
| `cloudflared tunnel create <NAME or UUID>` | Creates a tunnel and assigns it a name and UUID. The command requires the `cert.pem` file. |
| `cloudflared tunnel route` | Routes traffic through a tunnel. |
| `cloudflared tunnel route lb <NAME or UUID> <load balancer name> <load balancer pool>` | Adds Cloudflare Tunnel to an existing Load Balancer pool directly from `cloudflared`. The command requires the `cert.pem` file. |
| `cloudflared tunnel route ip add <IP/CIDR> <NAME or UUID>` | Creates a route that maps a tunnel to a IP/CIDR you specify. | 
| `cloudflared tunnel route ip show` (or `list`) | Shows the routes enrolled. |
| `cloudflared tunnel route ip delete` | Deletes a route. |
| `cloudflared tunnel route ip get <IP/CIDR>` | Tests the routing configuration. |
| `cloudflared tunnel route dns` | Creates a DNS records from `cloudflared` that will provision a CNAME record pointing to the subdomain of a specific Tunnel. The command requires the `cert.pem` file. |
| `cloudflared tunnel run--config path/config.yaml run <NAME or UUID>` | Establishes a connection between your resources and the Cloudflare edge, following the configurations in your `config.yaml` file. |
| `cloudflared tunnel info <NAME or UUID>` | Shows each `cloudflared` process running a specific tunnel. |
| `cloudflared tunnel cleanup <NAME or UUID>` | Deletes connections for tunnels with the given UUIDs or names. This is useful if you get an error trying to delete or run a tunnel after `cloudflared` is not shut down gracefully (for example, if a `kill` command is issued). |
| `cloudflared tunnel delete <NAME or UUID>` | Deletes a tunnel. The command requires the `cert.pem` file. |

## Manage `cloudflared`

| Command | Description |
| ------- | ----------- |
| `cloudflared update` | Launches an update for `cloudflared`. This command only works if `cloudflared` was installed from GitHub binaries or from source. If you installed `cloudflared` with a package manager, you must update it using the same method. |
| `cloudflared version` | Prints the `cloudflared` version number and build date. |
| `cloudflared help` | Shows help text. |

## Manage Access

* `cloudflared access tcp`
* `cloudflared access rdp`
* `cloudflared access ssh`
* `cloudflared access smb`
* `cloudflared access login`
* `cloudflared access curl`
* `cloudflared access token`
* `cloudflared ssh-config`
* `cloudflared ssh-gen`
