---
pcx_content_type: how-to
title: Update cloudflared
weight: 5
---

# Update cloudflared

Updates will cause `cloudflared` to restart which will impact traffic currently being served. You can perform zero-downtime upgrades by using Cloudflare's [Load Balancer product](/cloudflare-one/connections/connect-networks/downloads/update-cloudflared/#update-with-cloudflare-load-balancer) or by using [multiple `cloudflared` instances](/cloudflare-one/connections/connect-networks/downloads/update-cloudflared/#update-with-multiple-cloudflared-instances).

## Remotely-managed tunnels

To update `cloudflared` for a tunnel [created through the dashboard](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/remote/):

{{<tabs labels="Windows | macOS | Debian | Red Hat | Docker">}}
{{<tab label="windows" no-code="true">}}

Run the following command:

```bash
PS C:\> cloudflared update
```

This updates `cloudflared` and automatically restarts the service.

{{</tab>}}
{{<tab label="macos" no-code="true">}}

1. Update the `cloudflared` package:
  ```sh
  $ brew upgrade cloudflared
  ```
2. Restart the service:
  ```sh
  $ sudo launchctl stop com.cloudflare.cloudflared
  $ sudo launchctl unload /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
  $ sudo launchctl load /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
  $ sudo launchctl start com.cloudflare.cloudflared
  ```

{{</tab>}}
{{<tab label="debian" no-code="true">}}

1. Update the `cloudflared` package:

```sh
$ curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && sudo dpkg -i cloudflared.deb
```

2. Restart the service:

```sh
$ sudo systemctl restart cloudflared.service
```

{{</tab>}}
{{<tab label="red hat" no-code="true">}}

1. Update the `cloudflared` package:

```sh
$ sudo yum update cloudflared
```

2. Restart the service:

```sh
$ sudo systemctl restart cloudflared.service
```

{{</tab>}}
{{<tab label="docker" no-code="true">}}

1. In Zero Trust, go to **Access** > **Tunnels**.
2. Select your tunnel and select **Configure**.
3. Select **Docker** and copy the installation command shown in the dashboard.
4. Paste this command into a terminal window.

This creates a new container from the latest `cloudflared` image. You can now delete the old container.

{{</tab>}}
{{</tabs>}}

## Locally-managed tunnels

If you installed `cloudflared` from GitHub binaries or from source, run the following command:

```sh
$ cloudflared update
```

If you installed `cloudflared` with a package manager, you must update it using the same package manager. On Linux, you can check if `cloudflared` is owned by a package manager by running `ls -la /usr/local/etc/cloudflared/` and looking for `.installedFromPackageManager` in the output.

## Update with Cloudflare Load Balancer

You can update `cloudflared` without downtime by using Cloudflare's Load Balancer product with your Cloudflare Tunnel deployment.

1. Install a new instance of `cloudflared` and [create](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/) a new Tunnel.
2. Configure the instance to point traffic to the same locally-available service as your current, active instance of `cloudflared`.
3. [Add the address](/cloudflare-one/connections/connect-networks/routing-to-tunnel/lb/) of the new instance of `cloudflared` into your Load Balancer pool as priority 2.
4. Swap the priority such that the new instance is now priority 1 and monitor to confirm traffic is being served.
5. Once confirmed, you can remove the older version from the Load Balancer pool.

## Update with multiple `cloudflared` instances

If you are not using Cloudflare's Load Balancer, you can use multiple instances of `cloudflared` to update without the risk of downtime.

1. Install a new instance of `cloudflared` and [create](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/) a new Tunnel.
2. Configure the instance to point traffic to the same locally-available service as your current, active instance of `cloudflared`.
3. In the Cloudflare DNS dashboard, [replace](/cloudflare-one/connections/connect-networks/routing-to-tunnel/dns/) the address of the current instance of `cloudflared` with the address of the new instance. Save the record.
4. Remove the now-inactive instance of `cloudflared`.

### Run multiple instances in Windows

Windows systems require services to have a unique name and display name. You can run multiple instances of `cloudflared` by creating `cloudflared` services with unique names.

1. Install and configure `cloudflared`. 
2. Next, create a service with a unique name and point to the `cloudflared` executable and configuration file.

  ```bash
  sc.exe create <unique-name> binPath='<path-to-exe>' --config '<path-to-config>' displayname="Unique Name"
  ```

3. Proceed to create additional services with unique names.

4. You can now start each unique service.

  ```bash
  sc.exe start <unique-name>
  ```
