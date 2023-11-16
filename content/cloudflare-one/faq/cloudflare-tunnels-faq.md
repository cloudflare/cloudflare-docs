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

```bash
[ip-address] 80 (http) open
```

If your server is correctly locked down, you will see:

```bash
[ip-address] 443 (https): Connection refused
```

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="What records are created for routing to a Named Tunnel's hostname?" >}}

{{<faq-answer>}}

Named Tunnels can be routed via DNS records, in which case we use CNAME records to point to the `<UUID>.cfargotunnel.com`; Or as Load Balancer origins, which also point to `<UUID>.cfargotunnel.com`.

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

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Is it possible to restore a deleted tunnel?">}}

{{<faq-answer>}}

No. You cannot undo a tunnel deletion. If the tunnel was locally-managed, its [`config.yaml` file](/cloudflare-one/connections/connect-networks/get-started/tunnel-useful-terms/#configuration-file) will still be present and you can create a new tunnel with the same configuration. If the tunnel was remotely-managed, both the tunnel and its configuration are permanently deleted.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="How can I troubleshoot a Tunnel that was configured from Zero Trust?" >}}

{{<faq-answer>}}

### Ensure that only one instance of `cloudflared` is installed as a service

If you are unable to create a Tunnel using the installation script ("cloudflared service is already installed"), ensure that no other `cloudflared` instances are running as a service on this machine. Only a single instance of `cloudflared` may run as a service on any given machine. Instead, we recommend adding additional routes to your existing Tunnel. Alternatively, you can run `sudo cloudflared service uninstall` to uninstall `cloudflared`.

### Check your DNS records

If you are unable to save your Tunnel's public hostname ("An A, AAAA, or CNAME record with that host already exists"), choose a different hostname or delete the existing DNS record. [Check the DNS records](/dns/manage-dns-records/how-to/create-dns-records/) for your domain from the [Cloudflare dashboard](https://dash.cloudflare.com).

### View debug logs

Refer to [Tunnel logs](/cloudflare-one/connections/connect-networks/monitor-tunnels/logs/) for information about obtaining `cloudflared` logs.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="How can I troubleshoot a Tunnel that was configured through the CLI?" >}}

{{<faq-answer>}}

### View debug logs

Refer to [Tunnel logs](/cloudflare-one/connections/connect-networks/monitor-tunnels/logs/) for information about obtaining `cloudflared` logs.

### Check SSL/TLS encryption mode

1.  On the Cloudflare dashboard for your zone, go to **SSL/TLS** > **Overview**.
1.  If your SSL/TLS encryption mode is **Off (not secure)**, make sure that it is set to **Flexible**, **Full** or **Full (strict)**.

When the encryption mode is set to **Off (not secure)**, you may encounter connection issues when running a Tunnel.

### Check location of credentials file

If you encounter the following error when running a Tunnel, double check your `config.yml` file and ensure that the `credentials-file` points to the correct location. You may need to change `/root/` to your home directory.

```sh
$ cloudflared tunnel run
2021-06-04T06:21:16Z INF Starting tunnel tunnelID=928655cc-7f95-43f2-8539-2aba6cf3592d
Tunnel credentials file '/root/.cloudflared/928655cc-7f95-43f2-8539-2aba6cf3592d.json' doesn't exist or is not a file
```

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="How do I contact support?" >}}

{{<faq-answer>}}

### I am having an issue with a locally-managed tunnel.

Before contacting the Cloudflare support team:

- Take note of any specific error messages and/or problematic behaviors.

- Take note of any options you specified, either on the command line or in your configuration file, when starting your tunnel.

- Set [`log-level`](/cloudflare-one/connections/connect-networks/configure-tunnels/tunnel-run-parameters/#loglevel) to `debug`, so the Cloudflare support team can get more info from the `cloudflared.log` file.

- Include your Cloudflare Tunnel logs file (`cloudflared.log`). If you did not specify a log file when starting your tunnel, you can do so using the [`logfile` option](/cloudflare-one/connections/connect-networks/configure-tunnels/tunnel-run-parameters/#logfile) either on the command line or in your configuration file.

- Include your full `config.yml` file for the affected tunnel.

- Make sure that the `cloudflared daemon` is updated to the [latest version](https://github.com/cloudflare/cloudflared).

- Gather any relevant error/access logs from your server.

{{</faq-answer>}}
{{<faq-answer>}}

### I am having an issue with a remote-managed/dashboard tunnel.

Before contacting the Cloudflare support team:

- Take note of any specific error messages and/or problematic behaviors.

- Make sure that the `cloudflared daemon` is updated to the [latest version](https://github.com/cloudflare/cloudflared).

- Gather any relevant error/access logs from your server.

- Include your Cloudflare Tunnel logs file (`cloudflared.log`). 

If you did not specify a log file when starting your tunnel, you can do so using the [`logfile` option](/cloudflare-one/connections/connect-networks/configure-tunnels/tunnel-run-parameters/#logfile) in your service configuration, additionally set [`log-level`](/cloudflare-one/connections/connect-networks/configure-tunnels/tunnel-run-parameters/#loglevel) to `debug`, so the Cloudflare support team can get more info from the `cloudflared.log` file.

The details below provide guidance regarding configuration of logging on the service by adding the parameters `--loglevel debug --logfile <PATH>` to the configuration: 

{{<tabs labels="Linux | macOS | Windows">}}
{{<tab label="linux" no-code="true">}}

On Linux, Cloudflare Tunnel installs itself as a system service using `systemctl`. By default, the service will be named `cloudflared.service`. To configure your tunnel on Linux:

1. Open `cloudflared.service`.

   ```sh
   $ sudo systemctl edit --full cloudflared.service
   ```

2. Modify the `cloudflared tunnel run` command with the desired configuration flag.

   ```txt
   ---
   highlight: [8]
   ---
   [Unit]
   Description=Cloudflare Tunnel
   After=network.target

   [Service]
   TimeoutStartSec=0
   Type=notify
   ExecStart=/usr/local/bin/cloudflared tunnel --loglevel debug --logfile <PATH>  run --token <TOKEN VALUE>
   Restart=on-failure
   RestartSec=5s
   ```

{{</tab>}}
{{<tab label="macos" no-code="true">}}

On macOS, Cloudflare Tunnel installs itself as a launch agent using `launchctl`. By default, the agent will be called `com.cloudflare.cloudflared`. To configure your tunnel on macOS:

1. Stop the `cloudflared` service.

   ```sh
   $ sudo launchctl stop com.cloudflare.cloudflared
   ```

2. Unload the configuration file.

   ```sh
   $ sudo launchctl unload /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
   ```

3. Open `/Library/LaunchDaemons/com.cloudflare.cloudflared.plist` in a text editor.

4. Modify the `ProgramArguments` key with the desired configuration flag:

   ```txt
   ---
   highlight: [8-11]
   ---
   <plist version="1.0">
       <dict>
           <key>Label</key>
           <string>com.cloudflare.cloudflared</string>
           <key>ProgramArguments</key>
           <array>
               <string>/opt/homebrew/bin/cloudflared</string>
               <string>--logfile</string>
               <string></PATH></string>
               <string>--loglevel</string>
               <string>debug</string>
               <string>tunnel</string>
               <string>run</string>
               <string>--token</string>
               <string>TOKEN VALUE </string>
           </array>
   ```

5. Load the updated configuration file.

   ```sh
   $ sudo launchctl load /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
   ```

6. Start the `cloudflared` service.

   ```sh
   $ sudo launchctl start com.cloudflare.cloudflared
   ```

{{</tab>}}
{{<tab label="windows" no-code="true">}}

On Windows, Cloudflare Tunnel installs itself as a system service using the Registry Editor. By default, the service will be named `cloudflared`. To configure your tunnel on Windows:

1. Open the Registry Editor.

2. Go to **HKEY_LOCAL_MACHINE** > **SYSTEM** > **CurrentControlSet** > **Services** > **cloudflared**.

3. Double-click **ImagePath**.

4. Modify **Value data** with the desired configuration flag. Adding `--loglevel debug --logfile <PATH>` in this case:

   ```txt
   C:\Program Files (x86)\cloudflared\.\cloudflared.exe --loglevel debug --logfile <PATH>  tunnel run --token <TOKEN VALUE>
   ```


{{</tab>}}
{{</tabs>}}



{{</faq-answer>}}
{{</faq-item>}}
