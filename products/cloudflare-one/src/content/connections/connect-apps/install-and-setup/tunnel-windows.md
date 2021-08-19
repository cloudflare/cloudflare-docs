---
order: 3
title: Tunnel guide | Windows
pcx-content-type: how-to
---

# Set up your first tunnel on Windows

Follow this step-by-step guide to getting your first tunnel up and running. 

​​<Aside>

Before you start
1. Add a website to Cloudflare
2. Change your domain nameservers to Cloudflare

</Aside>

## 1. Download `cloudflared`.

First, download `cloudflared` on your machine. Visit the [downloads](/connections/connect-apps/install-and-setup/installation) page to find the right package for your OS.

## 2. Install `cloudflared`. 

Rename the executable to `cloudflared.exe`, and then open PowerShell. Change directory to your Downloads folder and run `.\cloudflared.exe --version`. It should output the version of `cloudflared`. Note that `cloudflared.exe` could be `cloudflared-windows-amd64.exe` or `cloudflared-windows-386.exe` if you haven't renamed it.

Replace the path in the example with the specifics of your Downloads directory:

```text
PS C:\Users\Administrator\Downloads\cloudflared-stable-windows-amd64> .\cloudflared.exe --version
```

### Build from source

You can also build the latest version of `cloudflared` from source with the following steps:

```bash
$ git clone https://github.com/cloudflare/cloudflared.git
$ cd cloudflared
$ make cloudflared
$ go install github.com/cloudflare/cloudflared/cmd/cloudflared
```

Depending on where you installed `cloudflared`, you can move it to a known path as well.

```bash
mv /root/cloudflared/cloudflared /usr/bin/cloudflared
```

## 3. Authenticate `cloudflared`. 

```bash
$ cloudflared tunnel login
```

Running this command will:

* Open a browser window and prompt you to log into your Cloudflare account. After logging into your account, select your hostname. 
* Generate a [cert.pem file](/connections/connect-apps/tunnel-useful-terms#cert-pem). The `cert.pem` file contains account-wide credentials.

## 4. Create a tunnel and give it a name.

```bash
$ cloudflared tunnel create <NAME>
```

Running this command will:
* Create a tunnel by establishing a persistent relationship between the [name you provide](/connections/connect-apps/tunnel-useful-terms#tunnel-name) and a [UUID](/connections/connect-apps/tunnel-useful-terms#tunnel-uuid) for your tunnel. At this point, no connection is active within the tunnel yet. 
* Generate a [credentials file](/connections/connect-apps/tunnel-useful-terms#credentials-file). 
* Create a subdomain of `.cfargotunnel.com`.

From the output of the command, take note of the tunnel’s UUID and the path to your tunnel’s credentials file.

## 5. Create a configuration file.

Create a `.yaml` file in your `.cloudflared` directory using any text editor. This file will configure the tunnel to route traffic from a given origin to the hostname of your choice.

Add the following fields to the file:

If you’re connecting an application:

```txt
url: http://localhost:8000
tunnel: <Tunnel-UUID>
credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json
```

If you’re connecting a network:

```txt
tunnel: <Tunnel-UUID>
credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json
```

## 6. Start routing traffic.

Now assign a CNAME record that points traffic to your tunnel subdomain. This record will be easier to remember and share. 

```bash
$ cloudflared tunnel route dns <UUID or NAME> <hostname>
```

You can confirm that the route has been successfully established by running:

```bash
$ cloudflared tunnel route ip show 
```

## 7. Run the tunnel.

Run the tunnel to proxy incoming traffic from the Tunnel to any number of services running locally on your origin. 

```bash
$ cloudflared tunnel --config path/config.yaml run <UUID or NAME>
```

You can also run the tunnel without a configuration file. To do that, append the necessary [flags](/connections/connect-apps/configuration/config#arguments) after the run command and before the name or UUID. Running your tunnel this way will route all traffic to the given URL.

```bash
$ cloudflared tunnel run --url localhost:3000 <NAME or UUID>
```

Cloudflare Tunnel can install itself as a system service on Linux and Windows and as a launch agent on macOS. For more information, see [Run as a service](/connections/connect-apps/run-tunnel/run-as-service).

## 8. Check the tunnel

Your tunnel configuration is complete! Navigate to **Access** > **Tunnels** on the Teams Dashboard to see your tunnel listed as active. If you want to see a list of active tunnels directly from your CLI, you can run:

```bash
$ cloudflared tunnel list
```