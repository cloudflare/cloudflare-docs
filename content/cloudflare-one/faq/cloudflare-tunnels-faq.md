---
pcx_content_type: faq
title: Tunnels
weight: 4
meta:
  description: Review frequently asked questions about tunnels in Cloudflare Zero Trust.
structured_data: true
---

[❮ Back to FAQ](/cloudflare-one/faq/)

# Tunnels

{{<faq-item>}}
{{<faq-question level=2 text="​Can I create a Tunnel for an apex domain?" >}}

{{<faq-answer>}}

Yes. With [Named Tunnels](https://blog.cloudflare.com/argo-tunnels-that-live-forever/) you can create a CNAME at the apex that points to the named tunnel.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="​Does Cloudflare Tunnel support Websockets?" >}}

{{<faq-answer>}}

Yes. Cloudflare Tunnel has full support for Websockets.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="​Does Cloudflare Tunnel support gRPC?" >}}

{{<faq-answer>}}

Yes. Cloudflare Tunnel supports gRPC for services within a [private network](/cloudflare-one/connections/connect-networks/private-net/). Public hostname deployments are not supported at this time.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="How can Tunnel be used with Partial DNS (CNAME Setup)?" >}}

{{<faq-answer>}}

Cloudflare offers two modes of setup: [Full Setup](/dns/zone-setups/full-setup/), in which the domain uses Cloudflare DNS nameservers, and [Partial Setup](/dns/zone-setups/partial-setup/) (also known as CNAME setup) in which the domain uses non-Cloudflare DNS servers.

The best experience with Cloudflare Tunnel is using Full Setup because Cloudflare manages DNS for the domain and can automatically configure DNS records for newly started Tunnels.

You can still use Tunnel with Partial Setup. You will need to create a new DNS record with your current DNS provider for each new hostname connected through Cloudflare Tunnel. The DNS record should be of type CNAME or ALIAS if it is on the root of the domain. The name of the record should be the subdomain it corresponds to (e.g. `example.com` or `tunnel.example.com`) and the value of the record should be `subdomain.domain.tld.cdn.cloudflare.net`. (e.g. `example.com.cdn.cloudflare.net` or `tunnel.example.com.cdn.cloudflare.net`)

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="How can origin servers be secured when using Tunnel?" >}}

{{<faq-answer>}}

Tunnel can expose web applications to the Internet that sit behind a NAT or firewall. Thus, you can keep your web server otherwise completely locked down. To double check that your origin web server is not responding to requests outside Cloudflare while Tunnel is running you can run netcat in the command line:

```sh
$ netcat -zv [your-server’s-ip-address] 80
$ netcat -zv [your-server’s-ip-address] 443
```

If your server is still responding on those ports, you will see:

```txt
[ip-address] 80 (http) open
```

If your server is correctly locked down, you will see:

```txt
[ip-address] 443 (https): Connection refused
```

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="What records are created for routing to a Named Tunnel's hostname?" >}}

{{<faq-answer>}}

Named Tunnels can be routed via DNS records, in which case we use CNAME records to point to the `<UUID>.cfargotunnel.com`; Or as Load Balancing endpoints, which also point to `<UUID>.cfargotunnel.com`.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Does Cloudflare Tunnel send visitor IPs to my origin?" >}}

{{<faq-answer>}}

No. When using Cloudflare Tunnel, all requests to the origin are made internally between `cloudflared` and the origin.

To log external visitor IPs, you will need to [configure an alternative method](/support/troubleshooting/restoring-visitor-ips/restoring-original-visitor-ips/).

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Why does the name 'warp' and 'argo' appear in some legacy materials?" >}}

{{<faq-answer>}}

Cloudflare Tunnel was previously named Warp during the beta phase. As Warp was added to the Argo product family, we changed the name to Argo Tunnel to match. Once we no longer required users to purchase Argo to create Tunnels, we renamed Argo Tunnel to Cloudflare Tunnel.

For more information about migrating from Argo Tunnel, refer to [Migrate legacy tunnels](/cloudflare-one/connections/connect-networks/do-more-with-tunnels/migrate-legacy-tunnels/).

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Is it possible to restore a deleted tunnel?">}}

{{<faq-answer>}}

No. You cannot undo a tunnel deletion. If the tunnel was locally-managed, its [`config.yaml` file](/cloudflare-one/connections/connect-networks/get-started/tunnel-useful-terms/#configuration-file) will still be present and you can create a new tunnel with the same configuration. If the tunnel was remotely-managed, both the tunnel and its configuration are permanently deleted.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="How do I contact support?" >}}

{{<faq-answer>}}

### I am having an issue with a locally-managed tunnel.

Before contacting the Cloudflare support team:

- Take note of any specific error messages and/or problematic behaviors.

- Take note of any options you specified, either on the command line or in your configuration file, when starting your tunnel.

- Make sure that `cloudflared` is updated to the [latest version](https://github.com/cloudflare/cloudflared).

- Gather any relevant error/access logs from your server.

Set [`loglevel`](/cloudflare-one/connections/connect-networks/configure-tunnels/tunnel-run-parameters/#loglevel) to `debug`, so the Cloudflare support team can get more info from the `cloudflared.log` file.

- Include your Cloudflare Tunnel logs file (`cloudflared.log`). If you did not specify a log file when starting your tunnel, you can do so using the [`logfile` option](/cloudflare-one/connections/connect-networks/configure-tunnels/tunnel-run-parameters/#logfile) either on the command line or in your configuration file.

- Include your full `config.yml` file for the affected tunnel.

### I am having an issue with a remotely-managed/dashboard tunnel.

Before contacting the Cloudflare support team:

- Take note of any specific error messages and/or problematic behaviors.

- Make sure that `cloudflared` is updated to the [latest version](https://github.com/cloudflare/cloudflared).

- Gather any relevant error/access logs from your server.

- Include your Cloudflare Tunnel logs file (`cloudflared.log`). If you did not specify a log file when starting your tunnel, add [`--logfile <PATH>`](/cloudflare-one/connections/connect-networks/configure-tunnels/tunnel-run-parameters/#logfile) and [`--loglevel debug`](/cloudflare-one/connections/connect-networks/configure-tunnels/tunnel-run-parameters/#loglevel) to your system service configuration. To modify the system service, refer to [Configure a remotely-managed tunnel](/cloudflare-one/connections/connect-networks/configure-tunnels/remote-management/).

{{</faq-answer>}}
{{</faq-item>}}
