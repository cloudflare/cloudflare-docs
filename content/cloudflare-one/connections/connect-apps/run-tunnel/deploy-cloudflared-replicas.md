---
pcx-content-type: how-to
title: Deploy  replicas
weight: 11
---

# Deploy `cloudflared` replicas

Cloudflare Zero Trust allows you to deploy many `cloudflared` instances through the same tunnel. The same tunnel can represent multiple, redundant instances of `cloudflared`, giving your team the ability to scale instances dynamically.

To deploy multiple instances in this replica model, you can create and configure an instance of `cloudflared` once and run it as multiple different processes. DNS records and Cloudflare Load Balancers can still point to the Tunnel and its unique ID while that tunnel sends traffic to the multiple instances of `cloudflared` that run through it.

To deploy multiple `cloudflared` replicas:

1.  Run the following command:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ cloudflared tunnel create </span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">NAME</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1.  Next, run your newly created Named Tunnel.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ cloudflared tunnel run </span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">NAME</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

    This will generate a unique `connector_id` for `cloudflared`.

1.  In a separate window, run the same command to initialize another `cloudflared` instance:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ cloudflared tunnel run </span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">NAME</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

    This will also generate a unique `connector_id` for `cloudflared`.

1.  Next, run `tunnel info` to show each `cloudflared` running your tunnel:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ cloudflared tunnel info </span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-plain">NAME</span><span class="CodeBlock--token-operator">&gt</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

This will output your tunnel UUID as well as your two newly generated connector IDs for each instance of `cloudflared` running through your tunnel. With this command, you can also see that your tunnel is now being served by eight connections, and your setup is complete. Now you can run the same tunnel across various `cloudflared` processes for up to 100 connections per tunnel. When a request arrives to the Cloudflare edge, it will pick any connection available to the origin. If a connection fails, it retries others available — there is no guarantee about which connection is chosen.
