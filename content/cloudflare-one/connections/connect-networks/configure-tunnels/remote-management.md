---
pcx_content_type: how-to
title: Remotely-managed tunnel
weight: 1
---

# Configure a remotely-managed tunnel

If you created a Cloudflare Tunnel [from the dashboard](/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/), the tunnel runs as a service on your OS.

## Add tunnel run parameters

You can modify the Cloudflare Tunnel service with one or more [general-purpose tunnel parameters](/cloudflare-one/connections/connect-networks/configure-tunnels/tunnel-run-parameters/).

{{<tabs labels="Linux | macOS | Windows">}}
{{<tab label="linux" no-code="true">}}

On Linux, Cloudflare Tunnel installs itself as a system service using `systemctl`. By default, the service will be named `cloudflared.service`. To configure your tunnel on Linux:

1. Open `cloudflared.service`.

   ```sh
   $ sudo systemctl edit --full cloudflared.service
   ```

2. Modify the `cloudflared tunnel run` command with the desired configuration flag. For example,

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
   ExecStart=/usr/local/bin/cloudflared tunnel --loglevel debug --logfile <PATH> run --token <TOKEN VALUE>
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

4. Modify the `ProgramArguments` key with the desired configuration flag. For example,

   ```txt
   <plist version="1.0">
       <dict>
           <key>Label</key>
           <string>com.cloudflare.cloudflared</string>
           <key>ProgramArguments</key>
           <array>
               <string>/opt/homebrew/bin/cloudflared</string>
               <string>tunnel</string>
               <string>--logfile</string>
               <string><PATH></string>
               <string>--loglevel</string>
               <string>debug</string>
               <string>run</string>
               <string>--token</string>
               <string><TOKEN VALUE> </string>
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

4. Modify **Value data** with the desired configuration flag. For example,

   ```txt
   C:\Program Files (x86)\cloudflared\.\cloudflared.exe tunnel --loglevel debug --logfile <PATH> run --token <TOKEN VALUE>
   ```

![Modify cloudflared service in the Registry Editor](/images/cloudflare-one/connections/connect-apps/remote-management-windows.png)

{{</tab>}}
{{</tabs>}}

## Update origin configuration

To configure how `cloudflared` sends requests to your [public hostname](/cloudflare-one/connections/connect-networks/routing-to-tunnel/) services:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Networks** > **Tunnels**.
2. Choose a tunnel and select **Configure**.
3. Select the **Public Hostname** tab.
4. Choose a route and select **Edit**.
5. Under **Additional application settings**, modify one or more [origin configuration parameters](/cloudflare-one/connections/connect-networks/configure-tunnels/origin-configuration/).
6. Select **Save hostname**.

## Tunnel permissions

A remotely-managed tunnel only requires the tunnel token to run. Anyone with access to the token will be able to run the tunnel. You can get a tunnel's token from the dashboard or via the [API](/api/operations/cloudflare-tunnel-get-a-cloudflare-tunnel-token).

Account members with Cloudflare Access and DNS [permissions](/cloudflare-one/roles-permissions/) will be able to create, delete, and configure all tunnels for the account.
