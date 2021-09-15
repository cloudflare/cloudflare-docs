---
order: 6
pcx-content-type: reference
---

# Useful commands

## Manage tunnels

| Command | Description |
| ------- | ----------- |
| `cloudflared tunnel login` | Prompts a browser window where you can authenticate your tunnel to your Cloudflare account. | 
| `cloudflared tunnel list` | Will display all active tunnels, their created time, and associated connections. Use the `-d` flag to include deleted tunnels.  |
| `cloudflared tunnel create <NAME or UUID>` | Creates a tunnel, registers it with the Cloudflare edge and generates a credential file users to run this tunnel.  |
| `cloudflared tunnel route` | Routes traffic through a tunnel. |
| `cloudflared tunnel route lb <NAME or UUID> <load balancer name> <load balancer pool>` | Creates a Load Balancer with an origin pool that points to the tunnel. |
| `cloudflared tunnel route ip add <IP/CIDR> <NAME or UUID>` | Adds any network route space (represented as a CIDR) to your routing table. That network space becomes reachable for requests egressings from a user’s machine as long as it is using Cloudflare WARP and is enrolled in the same account that is running the tunnel chosen here. Further, those requests will be proxied to the specified tunnel, and reach an IP in the given CIDR, as long as that IP is reachable from the tunnel. | 
| `cloudflared tunnel route ip show` (or `list`) | Shows your organization’s private routing table. You can use additional flags to filter the results. |
| `cloudflared tunnel route ip delete` | Deletes the row for a given CIDR from your routing table. That portion of your network will no longer be reachable by the WARP client. |
| `cloudflared tunnel route ip get <IP/CIDR>` | Checks which row of the routing table will be used to proxy a given IP. This helps check and validation your configuration. |
| `cloudflared tunnel route dns` | Creates a DNS CNAME record hostname that points to the tunnel. |
| `cloudflared tunnel run --config path/config.yaml run <NAME or UUID>` | Runs a tunnel, creating highly available connections between your server and the Cloudflare edge. You can provide name or UUID of the tunnel to run either as the last command line argument or in the configuration file using `tunnel: <NAME>`.  |
| `cloudflared tunnel info <NAME or UUID>` | Displays details about the active connectors for a given tunnel identified by name of UUID. |
| `cloudflared tunnel cleanup <NAME or UUID>` | Deletes connections for tunnels with the given UUIDs or names. This is useful if you get an error trying to delete or run a tunnel after `cloudflared` is not shut down gracefully (for example, if a `kill` command is issued). |
| `cloudflared tunnel delete <NAME or UUID>` | Deletes tunnels with the given name or UUID. A tunnel cannot be deleted if it has active connections. To delete the tunnel unconditionally, use the `-f` flag. |

## Manage `cloudflared`

| Command | Description |
| ------- | ----------- |
| `cloudflared update` | Looks for a new version on the official download server. If a new version exists, it updates the agent binary and quits. Otherwise, no action is performed. This command only works if `cloudflared` was installed from GitHub binaries or from source. If you installed `cloudflared` with a package manager, you must update it using the same method. |
| `cloudflared version` | Prints the `cloudflared` version number and build date. |
| `cloudflared help` | Shows a list of commands or help for `cloudflared`. |
