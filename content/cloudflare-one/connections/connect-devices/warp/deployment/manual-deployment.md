---
pcx_content_type: how-to
title: Manual deployment
weight: 2
---

# Manual deployment

If you plan to direct your users to manually download and configure the WARP client, users will need to connect the client to your organization's Cloudflare Zero Trust instance.

## Prerequisites

- [Set device enrollment permissions](/cloudflare-one/connections/connect-devices/warp/deployment/device-enrollment/) to specify which users can connect.

## Windows, macOS, and Linux

### Enroll via the GUI

{{<render file="warp/_enroll-desktop.md">}}

The device is now protected by your organization's Zero Trust policies.

### Enroll via the CLI

To enroll your device using the terminal:

1. [Download](https://pkg.cloudflareclient.com/) and install the WARP package.
2. Open a terminal window. Ensure that you are logged into the terminal as the current user and not as root.
3. Enroll into Cloudflare Zero Trust using your organization's {{<glossary-tooltip term_id="team name">}}team name{{</glossary-tooltip>}}:

    ```sh
    $ warp-cli teams-enroll <your-team-name>
    ```

4. In the browser window that opens, complete the authentication steps required by your organization.

    Once authenticated, you will see a Success page and a dialog prompting you to open a link.

5. Select **Open Link**.

6. Verify the registration in the terminal:

    ```sh
    $ warp-cli account
    ```

{{<details header="Troubleshoot missing registration">}}

The registration process may take a few minutes to complete. If the registration continues to be missing, then manually copy the authentication token from the browser to the WARP client:

1. On the Success page, right-click and select **View Page Source**.
2. Find the HTML metadata tag that contains the token. For example, `<meta http-equiv="refresh" content"=0;url=com.cloudflare.warp://acmecorp.cloudflareaccess.com/auth?token=yeooilknmasdlfnlnsadfojDSFJndf_kjnasdf..." />`
3. Copy the URL field: `com.cloudflare.warp://<your-team-name>.cloudflareaccess.com/auth?token=<your-token>`
4. In the terminal, run the following command using the URL obtained in the previous step.

    ```sh
    $ warp-cli teams-enroll-token com.cloudflare.warp://<your-team-name>.cloudflareaccess.com/auth?token=<your-token>
    ```

If you get an API error, then the token has expired. Generate a new one by refreshing the web page and quickly grab the new token from the page source.

{{</details>}}

7. If you did not configure WARP to [auto-connect](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#auto-connect), manually turn on WARP:

    ```sh
    $ warp-cli connect
    ```

The device is now protected by your organization's Zero Trust policies. For more information on all available commands, run `warp-cli --help`.

## iOS, Android, and ChromeOS

{{<render file="warp/_enroll-ios-android.md">}}

The device is now protected by your organization's Zero Trust policies.

## Virtual machines

By default, virtual machines (VMs) are subject to the WARP client settings of the host. If you want to deploy a separate instance of WARP in a VM, you must configure the VM to operate in bridged networking mode.
