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

5. Select **Open Link**. The registration may take a few minutes to complete.

6. Verify the registration in the terminal:

    ```sh
    $ warp-cli account
    ```

7. If you did not configure WARP to [auto-connect](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#auto-connect), manually turn on WARP:

    ```sh
    $ warp-cli connect
    ```
