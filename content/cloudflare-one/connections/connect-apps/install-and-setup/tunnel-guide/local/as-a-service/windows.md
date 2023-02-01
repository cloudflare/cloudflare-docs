---
pcx_content_type: how-to
title: Windows
weight: 31
meta:
  title: Run as a service on Windows
---

# Run as a service on Windows

You can install `cloudflared` as a system service on Windows.

## Configure `cloudflared` as a service

By default, Cloudflare Tunnel expects all of the configuration to exist in the `%USERPROFILE%\.cloudflared\config.yml` [configuration file](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#configuration-file). The available options are documented on the [configuration file reference](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/local-management/ingress/), but at a minimum you must specify the following arguments to run as a service:

| Argument           | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `tunnel`           | The UUID of your tunnel                              |
| `credentials-file` | The location of the credentials file for your tunnel |

## Run `cloudflared` as a service

1. [Download](/cloudflare-one/connections/connect-apps/install-and-setup/installation/) the latest `cloudflared` version.

2. Create a new directory:

    ```bash
    C:\Cloudflared\bin
    ```

3. Copy the `.exe` file you downloaded in step 1 to the new directory and rename it to `cloudflared.exe`.

4. Open CMD as an administrator and navigate to `C:\Cloudflared\bin`.

5. Run this command to install `cloudflared`:

    ```bash
    cloudflared.exe service install
    ```

6. Next, run this command to create another directory:

    ```bash
    mkdir C:\Windows\System32\config\systemprofile\.cloudflared
    ```

7. Log in and authenticate `cloudflared`:

    ```bash
    cloudflared.exe login
    ```

8. The login command will generate a `cert.pem` file and save it to your user profile by default. Copy the file to the `.cloudflared` folder created in step 5 using this command:

    ```bash
    copy C:\Users\%USERNAME%\.cloudflared\cert.pem C:\Windows\System32\config\systemprofile\.cloudflared\cert.pem
    ```

9. Next, create a tunnel:

    ```bash
    cloudflared.exe tunnel create <Tunnel Name>
    ```

    This will generate a [credentials file](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#credentials-file) in `.json` format.

10. [Create a configuration file](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/#4-create-a-configuration-file) with the following content:

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

11. Copy the credentials file to the folder created in step 6:

    ```bash
    copy C:\Users\%USERNAME%\.cloudflared\<Tunnel-ID>.json C:\Windows\System32\config\systemprofile\.cloudflared\<Tunnel-ID>.json
    ```

12. Validate the ingress rule entries in your configuration file using the command:

    ```bash
    cloudflared.exe tunnel ingress validate
    ```

13. In the Registry Editor, navigate to `Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Cloudflared`.

14. In the Cloudflared registry entry, modify `ImagePath` to point to the `cloudflared.exe` and `config.yml` files. Make sure that there are no extra spaces or characters while you modify the registry entry, as this could cause problems with starting the service.

    ```bash
    C:\Cloudflared\bin\cloudflared.exe --config=C:\Users\%USERNAME%\.cloudflared\config.yml tunnel run
    ```

15. If the service does not start, run the following command from `C:\Cloudflared\bin`:

    ```bash
    sc start cloudflared
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

## Next steps

You can now [route traffic through your tunnel](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/#5-start-routing-traffic). If you add IP routes or otherwise change the configuration, restart the service to load the new configuration:

```bash
sc stop cloudflared
sc start cloudflared
```
