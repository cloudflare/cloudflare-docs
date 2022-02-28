---
updated: 2022-03-01
category: 🔐 Zero Trust
difficulty: Advanced
pcx-content-type: tutorial
title: Zero Trust Network Access over RDP 
---

# Configure Zero Trust Network Access over RDP with Cloudflare Tunnel

You can connect to machines over RDP using Cloudflare's Zero Trust platform.

**🗺️ This walkthrough covers how to:**
* Connect your infrastructure to Cloudflare using Tunnel
* Build a policy in Cloudflare Gateway to secure the machine
* Connect user devices to your network over an RDP connection

## Configure Windows RDP Server

1. Download `cloudflared` on your Windows machine.
1. Next, click on **Start** > **CMD**, then right-click and open **CMD** as administrator.
1. Navigate to the **Downloads** folder and run the install file. This will create a new folder `.cloudflared` under `C:\Users\<userName>`.

    ```bash
    cd C:\Users\<userName>\Downloads
    cloudflared.exe service install
    ```

1. Authenticate to Cloudflare using the following command:

    ```bash
    cloudflared.exe login 
    ```

## Create a tunnel

1. Next, create a tunnel using the following command. This will generate a `<tunnel_ID.json>` credentials file within the `C:\Users\<userName>\.cloudflared` folder.

    ```bash
    cloudflared.exe tunnel create <tunnelName>
    ```

1. Navigate to `C:\Users\<userName>\.cloudflared` folder.

    ```bash
    cd C:\Users\<userName>\.cloudflared\
    ```

1. Configure your tunnel by creating a `config.yml` file.

    ```bash
    notepad config.yml
    ```

1. In the document, add the following content:

    ```yml
    tunnel: <replace_with_tunnel_ID>
    credentials-file: C:\Users\<userName>\.cloudflared\<replace_with_tunnel_ID>.json
    protocol: http2
    warp-routing:
        enabled: true
    ```

1. Next, click on **Start** > **regedit** and select **Registry Editor**.

1. Navigate to the following 
