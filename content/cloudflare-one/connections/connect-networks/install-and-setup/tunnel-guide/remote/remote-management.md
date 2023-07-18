---
pcx_content_type: how-to
title: Configuration
weight: 2
---

# Configure a remote tunnel

If you created a Cloudflare Tunnel from Zero Trust, the tunnel [runs as a service](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/local/as-a-service/) on your OS. You can modify the Cloudflare Tunnel service with one or more [configuration options](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/local/local-management/arguments/).

## Linux

On Linux, Cloudflare Tunnel installs itself as a system service using `systemctl`. By default, the service will be named `cloudflared.service`. To configure your tunnel on Linux:

1. Open `cloudflared.service`.

   ```sh
   $ sudo systemctl edit --full cloudflared.service
   ```

2. Modify the `cloudflared tunnel run` command with the desired configuration flag. The following example changes the tunnel `protocol` to QUIC:

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
   ExecStart=/usr/local/bin/cloudflared --protocol quic tunnel run --token <TOKEN VALUE>
   Restart=on-failure
   RestartSec=5s
   ```

## macOS

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

4. Modify the `ProgramArguments` key with the desired configuration flag. The following example changes the tunnel `protocol` to QUIC:

   ```txt
   ---
   highlight: [8,9]
   ---
   <plist version="1.0">
       <dict>
           <key>Label</key>
           <string>com.cloudflare.cloudflared</string>
           <key>ProgramArguments</key>
           <array>
               <string>/opt/homebrew/bin/cloudflared</string>
               <string>--protocol</string>
               <string>quic</string>
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

## Windows

On Windows, Cloudflare Tunnel installs itself as a system service using the Registry Editor. By default, the service will be named `cloudflared`. To configure your tunnel on Windows:

1. Open the Registry Editor.

2. Go to **HKEY_LOCAL_MACHINE** > **SYSTEM** > **CurrentControlSet** > **Services** > **cloudflared**.

3. Double-click **ImagePath**.

4. Modify **Value data** with the desired configuration flag. The following example changes the tunnel `protocol` to QUIC:

   ```txt
   C:\Program Files (x86)\cloudflared\.\cloudflared.exe --protocol quic tunnel run --token <TOKEN VALUE>
   ```

![Modify cloudflared service in the Registry Editor](/images/cloudflare-one/connections/connect-apps/remote-management-windows.png)
