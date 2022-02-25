---
order: 10
pcx-content-type: how-to
---

# Deploy `cloudflared` replicas

Cloudflare Zero Trust allows you to deploy many `cloudflared` instances through the same tunnel. The same tunnel can represent multiple, redundant instances of `cloudflared`, giving your team the ability to scale instances dynamically.

To deploy multiple instances in this replica model, you can create and configure an instance of `cloudflared` once and run it as multiple different processes. DNS records and Cloudflare Load Balancers can still point to the Tunnel and its unique ID while that tunnel sends traffic to the multiple instances of `cloudflared` that run through it.

To deploy multiple `cloudflared` replicas:

1.  Run the following command:

```bash
$ cloudflared tunnel create <NAME>
```

1.  Next, run your newly created Named Tunnel.

```bash
$ cloudflared tunnel run <NAME>
```

This will generate a unique `connector_id` for `cloudflared`.

1.  In a separate window, run the same command to initialize another `cloudflared` instance:

```bash
$ cloudflared tunnel run <NAME>
```

This will also generate a unique `connector_id` for `cloudflared`.

1.  Next, run `tunnel info` to show each `cloudflared` running your tunnel:

```bash
$ cloudflared tunnel info <NAME>
```

This will output your tunnel UUID as well as your two newly generated connector IDs for each instance of `cloudflared` running through your tunnel. With this command, you can also see that your tunnel is now being served by eight connections, and your setup is complete. Now you can run the same tunnel across various `cloudflared` processes for up to 100 connections per tunnel. When a request arrives to the Cloudflare edge, it will pick any connection available to the origin. If a connection fails, it retries others available — there is no guarantee about which connection is chosen.
