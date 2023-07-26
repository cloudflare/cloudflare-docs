---
_build:
  publishResources: false
  render: never
  list: never
---

Cloudflare Tunnel can also route applications through a public hostname, which allows users to connect to the application without the WARP client. This method requires having `cloudflared` installed on both the server machine and on the client machine, as well as an active zone on Cloudflare. The traffic is proxied over this connection, and the user logs in to the server with their Cloudflare Access credentials.

The public hostname method can be implemented in conjunction with [routing over WARP](/cloudflare-one/connections/connect-networks/use-cases/ssh/#connect-to-ssh-server-with-warp-to-tunnel) so that there are multiple ways to connect to the server. You can reuse the same tunnel for both the private network and public hostname routes.
