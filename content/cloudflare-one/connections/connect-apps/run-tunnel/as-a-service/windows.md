---
pcx-content-type: how-to
title: Windows
weight: 31
meta:
  title: Run as a service on Windows
---

# Run as a service on Windows

You can install `cloudflared` as a system service on Windows.

## Configuring `cloudflared` as a service

By default, Cloudflare Tunnel expects all of the configuration to exist in the `%USERPROFILE%\.cloudflared\config.yml` [configuration file](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#configuration-file). The available options are documented on the [configuration file reference](/cloudflare-one/connections/connect-apps/configuration/configuration-file/ingress/), but at a minimum you must specify the following arguments to run as a service:

| Argument | Description |
|---|---|
|`tunnel`|The UUID of your Tunnel
|`credentials-file`|The location of the credentials file for your Tunnel|

## Running `cloudflared` as a service

1.  [Download the latest `cloudflared` version](/cloudflare-one/connections/connect-apps/install-and-setup/installation/).

2.  Create a new directory:

    ```bash
    C:\Cloudflared\bin
    ```

3.  Copy the `.exe` file you downloaded in step 1 to the new directory and rename it to `cloudflared.exe`.

4.  Open the CMD as an administrator and navigate to `C:\Cloudflared\bin`.

5.  Run this command to install `cloudflared`:

    ```bash
    cloudflared.exe service install
    ```

6.  Next, run this command to create another directory:

    ```bash
    mkdir C:\Windows\System32\config\systemprofile\.cloudflared
    ```

7.  Now log in and authenticate `cloudflared`:

    ```bash
    cloudflared.exe login
    ```

8.  The login command will generate a `cert.pem` file and save it to your user profile by default. Copy the file to the `.cloudflared` folder created in step 5 using this command:

    ```bash
    copy C:\Users\%USERNAME%\.cloudflared\cert.pem C:\Windows\System32\config\systemprofile\.cloudflared
    ```

9.  Next, create a tunnel:

    ```bash
    cloudflared.exe tunnel create <Tunnel Name>
    ```

    This will generate a [credentials file](/cloudflare-one/connections/connect-apps/tunnel-useful-terms/#credentials-file) in `.json` format.

10. [Create a configuration file](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/#4-create-a-configuration-file) with the following content:

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

11. Copy the credentials file and the configuration file to the folder created in step 6:

    ```bash
    C:\Windows\System32\config\systemprofile\.cloudflared
    ```

     <Aside type='Note'>

    If you haven't created a config.yml file, follow [these instructions](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/#4-create-a-configuration-file).

     </Aside>

12. Validate the ingress rule entries in your configuration file using the command:

    ```bash
    cloudflared.exe tunnel ingress validate
    ```

13. Edit the registry to run `cloudflared` as a service and point the `cloudflared.exe` file, the config.yml file and the command to run the tunnel as explained below:

    Move the registry entry under `Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Cloudflared`.

14. Locate `imagepath` and modify it as shown below. Make sure that there are no extra spaces or characters while you modify the registry entry, as this could cause problems with starting the service.

        C:\Cloudflared\bin\cloudflared.exe --config=C:\Windows\System32\config\systemprofile\.cloudflared\config.yml  tunnel run

15. If the service does not start, run the following command from `C:\Cloudflared\bin`:

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
