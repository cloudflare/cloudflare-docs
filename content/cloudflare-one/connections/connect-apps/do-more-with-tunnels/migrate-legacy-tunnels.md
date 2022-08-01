---
pcx_content_type: how-to
title: Migrate legacy tunnels
weight: 2
meta:
  title: Migrate legacy tunnels to named tunnels
---

# Migrate legacy tunnels to named tunnels

{{<Aside type="note" header="Before you start">}}

- [Download](/cloudflare-one/connections/connect-apps/install-and-setup/installation/) the latest version of `cloudflared`
- Obtain a new origin certificate by running `cloudflared login`. While named tunnels are scoped to an account, for legacy reasons the login page requires selecting a zone.

{{</Aside>}}

Originally, a Cloudflare Tunnel connection corresponded to a DNS record in your account. Requests to that hostname hit Cloudflare’s network first and our edge sends those requests over the tunnel to your origin. However, fitting an outbound-only connection into a reverse proxy creates some ergonomic and stability hurdles. The original Cloudflare Tunnel architecture attempted to both manage DNS records and create connections. When connections became disrupted, Tunnel would recreate the entire deployment. Additionally, Argo Tunnel connections could not be treated like regular origin servers in Cloudflare’s control plane and had to be managed directly from the server-side software.

Today, Cloudflare Tunnel’s architecture distinguishes between the persistent objects (DNS records, `cloudflared`) and the ephemeral objects (the connections). To do that, it assigns permanent names and UUIDs to tunnels, which makes them more stable and easier to use. Since the name and UUID for a tunnel do not change, your DNS record never needs to be cleaned up or recreated when Cloudflare Tunnel restarts. In the event of a restart, the enrolled instance of `cloudflared` connects back to that UUID address.

To migrate your legacy tunnels to the named tunnels architecture:

1.  [Create a Tunnel](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/#3-create-a-tunnel-and-give-it-a-name).

    ```sh
    $ cloudflared tunnel create <TUNNEL-NAME>
    ```

1.  [Route traffic](/cloudflare-one/connections/connect-apps/routing-to-tunnel/) to your tunnel to create routes that your tunnel will serve.

    - If your legacy tunnel was serving `tunnel.example.com`, run this command to configure your named tunnel to also serve `tunnel.example.com`. For more information, refer to the [DNS Record routing](/cloudflare-one/connections/connect-apps/routing-to-tunnel/dns/) section.

        ```sh
        $ cloudflared tunnel route dns <TUNNEL-NAME> tunnel.example.com
        ```

    - If you used to run your legacy tunnel with the `--lb-pool` flag, run this command to set up your named tunnel as a load balancer origin. For more information, refer to the [Load Balancers routing](/cloudflare-one/connections/connect-apps/routing-to-tunnel/lb/) section.

        ```sh
        $ cloudflared tunnel route lb <TUNNEL-NAME> <LOAD-BALANCER-NAME> <LOAD-BALANCER-POOL>
        ```

1. After configuring DNS/LB records for each zone you want to serve, follow the [Configure a Tunnel](/cloudflare-one/connections/connect-apps/configuration/local-management/configuration-file/) instructions to *create a config file with ingress rules*. The ingress rules describe how to dispatch requests to your origins based on hostname and path. For example, if in the past you used to run `cloudflared tunnel --hostname tunnel.example.com --url https://localhost:3000`, you need have an equivalent ingress rule now:

    ```yml
    ingress:
      - hostname: tunnel.example.com
        service: https://localhost:3000
      - service: http_status:404
    # Note that the last rule is the catch-all rule and is required.
    ```

1.  Next, [run your tunnel](/cloudflare-one/connections/connect-apps/run-tunnel/).

## Make sure everything works

Once your migration is done, validate your new named tunnel by:

1.  Making sure the resource behind the tunnel is accessible
1.  Running `cloudflared tunnel info <NAME-or-UUID>` to confirm that the named tunnel exists
