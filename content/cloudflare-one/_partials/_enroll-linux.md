---
_build:
  publishResources: false
  render: never
  list: never
---

1. [Download](https://pkg.cloudflareclient.com/) and install the WARP package.
2. Open a terminal window. Ensure that you are logged into the terminal as the current user and not as root.
3. Enroll into Cloudflare Zero Trust using your organization's [team name](/cloudflare-one/glossary/#team-name):

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

<details>
<summary>Troubleshoot missing registration</summary>
<div>

The registration process may take a few minutes to complete. If the registration continues to be missing, then manually copy the authentication token from the browser to the WARP client:

1. On the Success page, right-click and select **View Page Source**.
2. Find the HTML metadata tag that contains the token. For example, `<meta http-equiv="refresh" content"=0;url=com.cloudflare.warp://acmecorp.cloudflareaccess.com/auth?token=yeooilknmasdlfnlnsadfojDSFJndf_kjnasdf..." />`
3. Copy the URL field: `com.cloudflare.warp://<your-team-name>.cloudflareaccess.com/auth?token=<your-token>`
4. In the terminal, run the following command using the URL obtained in the previous step.
    ```sh
    $ warp-cli teams-enroll-token com.cloudflare.warp://<your-team-name>.cloudflareaccess.com/auth?token=<your-token>
    ```
If you get an API error, then the token has expired. Generate a new one by refreshing the web page and quickly grab the new token from the page source.

</div>
</details>

7. If you did not configure WARP to [auto-connect](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#auto-connect), manually turn on WARP:

    ```sh
    $ warp-cli connect
    ```
