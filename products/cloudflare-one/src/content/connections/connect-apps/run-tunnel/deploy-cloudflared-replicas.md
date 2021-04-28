---
order: 10
---

# Deploy `cloudflared` replicas

Cloudflare for Teams allows you to deploy many `cloudflared` instances through the same Tunnel. The same Tunnel can represent multiple, redundant instances of `cloudflared`, giving your team the ability to scale instances dynamically.

To deploy multiple instances in this replica model, you can create and configure an instance of `cloudflared` once and run it as multiple different processes. DNS records and Cloudflare Load Balancers can still point to the Tunnel and its unique ID while that Tunnel sends traffic to the multiple instances of `cloudflared` that run through it.

To deploy multiple `cloudflared` replicas:

1. Run the following command: 

  ```sh
  $ cloudflared tunnel create <NAME>
  ```

 This will generate a unique `connector_id` for `cloudflared`.

1. Next, run your newly created Named Tunnel.

 ```sh
 $ cloudflared tunnel run <NAME>
 ```

 This will generate a unique `connector_id` for `cloudflared`.

1. In a separate window, run the same command to initialize another `cloudflared` instance:

 ```sh
 $ cloudflared tunnel run <NAME>
 ```

 This will also generate a unique `connector_id` for `cloudflared`.

1. Next, run `tunnel info` to show each `cloudflared` running your tunnel:

 ```sh
 $ cloudflared tunnel info <NAME> 
 ```

 This will output your Tunnel UUID as well as your two newly generated connector IDs for each instance of `cloudflared` running through your Tunnel. With this command, you can also see that your Tunnel is now being served by 8 connections, and your setup is complete. 

Now you can run the same Tunnel across various `cloudflared` processes for up to 100 connections per Tunnel. 
