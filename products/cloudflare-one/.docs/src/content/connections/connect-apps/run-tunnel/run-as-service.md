---
order: 30
pcx-content-type: how-to
---

# Run as a service

| Before you start |
|---|
| Follow the [Tunnel guide](/connect-apps/install-and-setup/tunnel-guide) to create a tunnel, route traffic to a tunnel, and run it. |

Cloudflare Tunnel can install itself as a system service on Linux and Windows and as a launch agent on macOS.

By default, Cloudflare Tunnel expects all of the configuration to exist in the `.cloudflared/config.yml` configuration file. The available options are documented on the [configuration file reference](/connections/connect-apps/configuration/configuration-file/), but at a minimum you must specify the following arguments to run as a service:

|Argument|Description|
|---|---|
|`url`|The destination for proxied traffic in your environment if your origin is not listening on localhost:8080|
|`tunnel`|The UUID of your Tunnel
|`credentials-file`|The location of the credentials file for your Tunnel|

You must [create the Tunnel](/connections/connect-apps/create-tunnel), and its credentials file, prior to installing it as a service. Creating the Tunnel in advance will generate the `credentials` file.

If you do not want to create the tunnel in advance, you must install `cloudflared` with the `--legacy` flag.

## Linux

Run the following command:

```sh
$ sudo cloudflared service install
```

If you have already logged in and have a configuration file in `~/.cloudflared/`, these will be copied to `/etc/cloudflared/`.

If you do not have a configuration file, you will need to create a config.yml file with fields listed above. You can pass a custom file by running `cloudflared --config CONFIG-FILE service install`.

<Aside>

The above arguments are required for pre-configured Cloudflare Tunnel deployments. If you are using legacy Tunnels, without names, you can append the `--legacy` flag when running `cloudflared` tunnel install command.

</Aside>

Then, start the system service with the following command:
```sh
$ sudo systemctl start cloudflared
``` 

Or start on boot with:
```sh
$ sudo systemctl enable cloudflared
```

## macOS

### Run at login

Open a Terminal and run the following command:

```sh
$ cloudflared service install
```

Cloudflare Tunnel will be installed as a launch agent, and start whenever you log in, using your local user configuration found in `~/.cloudflared/`.

#### Manually start the service

Run the following command:

```sh
$ launchctl start com.cloudflare.cloudflared
```

Output will be logged to `~/Library/Logs/com.cloudflare.cloudflared.err.log` and `~/Library/Logs/com.cloudflare.cloudflared.out.log`.

### Run at boot

Run the following command:

```sh
$ sudo cloudflared service install
```

Cloudflare Tunnel will be installed as a launch daemon, and start whenever your system boots, using your configuration found in `/etc/cloudflared`.

#### Manually start the service

Run the following command:

```sh
$ sudo launchctl start com.cloudflare.cloudflared
```

Output will be logged to `/Library/Logs/com.cloudflare.cloudflared.err.log` and `/Library/Logs/com.cloudflare.cloudflared.out.log`.

## Windows

1. [Download the latest `cloudflared` version](/connections/connect-apps/install-and-setup/installation).

1. Create a new directory:
    
    ```bash
    C:\Cloudflared\bin
    ```

1. Copy the `.exe` file you downloaded in step 1 to the new directory and rename it to `cloudflared.exe`.

1. Open the CMD as an administrator and navigate to `C:\Cloudflared\bin`.

1. Run this command to install `cloudflared`:

    ```bash
    cloudflared.exe service install
    ```
1. Next, run this command to create another directory:

    ```bash
    mkdir C:\Windows\System32\config\systemprofile\.cloudflared
    ```

1. Now log in and authenticate `cloudflared`:

    ```bash
    cloudflared.exe login
    ```

1. The login command will generate a `cert.pem` file and save it to your user profile by default. Copy the file to the `.cloudflared` folder created in step 5 using this command: 

    ```bash
    copy C:\Users\%USERNAME%\.cloudflared\cert.pem C:\Windows\System32\config\systemprofile\.cloudflared
    ```

1. Next, create a tunnel:
    
    ```bash
    cloudflared.exe tunnel create <Tunnel Name>
    ```
    
    This will generate a [credentials file](/connections/connect-apps/tunnel-useful-terms#credentials-file) in `.json` format.

1. [Create a configuration file](/connections/connect-apps/install-and-setup/tunnel-guide#4-create-a-configuration-file) with the following content:

    ```text
    tunnel: <Tunnel ID>
    credentials-file: C:\Windows\System32\config\systemprofile\.cloudflared\<Tunnel-ID>.json
    # Uncomment the following two lines if you are using self-signed certificates in your origin server
    # originRequest:
    #   noTLSVerify: true
    ingress:
    - hostname: app.mydomain.com
        service: https://internal.mydomain.com
    - service: http_status:404
    logfile:  C:\Cloudflared\cloudflared.log
    ```

1. Copy the credentials file and the configuration file to the folder created in step 6: 

    ```bash
    C:\Windows\System32\config\systemprofile\.cloudflared
    ```

    <Aside type='Note'>

    If you haven't created a config.yml file, follow [these instructions](/connections/connect-apps/install-and-setup/tunnel-guide#4-create-a-configuration-file).

    </Aside>

1. Validate the ingress rule entries in your configuration file using the command:

    ```bash
    cloudflared.exe tunnel ingress validate
    ```

1. Edit the registry to run `cloudflared` as a service and point the `cloudflared.exe` file, the config.yml file and the command to run the tunnel as explained below:

    Move the registry entry under `Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Cloudflared`.

1. Locate `imagepath` and modify it as shown below. Make sure that there are no extra spaces or characters while you modify the registry entry, as this could cause problems with starting the service.

    ```
    C:\Cloudflared\bin\cloudflared.exe --config=C:\Windows\System32\config\systemprofile\.cloudflared\config.yml  tunnel run
    ```

1. If the service does not start, run the following command from `C:\Cloudflared\bin`:

    ```bash
    sc start cloudflared tunnel run
    ```

You will see the output below:

```txt
SERVICE_NAME: cloudflared
        TYPE               : 10  WIN32_OWN_PROCESS
        STATE              : 2  START_PENDING
                                (NOT_STOPPABLE, NOT_PAUSABLE, IGNORES_SHUTDOWN)
        WIN32_EXIT_CODE    : 0  (0x0)
        SERVICE_EXIT_CODE  : 0  (0x0)
        CHECKPOINT         : 0x0
        WAIT_HINT          : 0x7d0
        PID                : 3548
        FLAGS              :
```
