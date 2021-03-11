---
order: 3
---

# Device enrollment

## Build enrollment rule

<Aside>

Revoking a user's permission to manage devices will not prevent that user from authenticating to applications. If you wish to revoke access to that user, you can do so by [revoking their user session](/identity/users/session-management#revoke-user-sessions). 

</Aside>

Cloudflare for Teams allows you to establish which users in your organization can enroll new devices or revoke access to connected devices. To do that, you can create a **device enrollment rule** on the Teams dashboard.

1. On the [Teams dashboard](https://dash.teams.cloudflare.com), navigate to **Devices**.

![Device List](../../../static/secure-web-gateway/secure-dns-devices/device-page.png)

2. Click **Device Settings** on the top-right corner.

3. In the rule builder, configure a rule to define who can enroll or revoke devices. 
 In this example, only users with `cloudflare.com` email addresses who successfully authenticate during device enrollment through the WARP client will be able to enroll in the organization. This rule prevents outsider users from sending traffic through your account and will give your organization the ability to capture user profile logs and apply profile-specific rules.

![Enroll Rule](../../../static/secure-web-gateway/secure-dns-devices/enroll-rule.png)

4. Click **Save**.

## Enroll devices

End users can now download WARP (or have it made available via MDM) and enroll their device.

Once installed, click the gear icon.

![WARP](../../../static/secure-web-gateway/secure-dns-devices/warp.png)

Under the `Account` tab, click `Login with Cloudflare for Teams`.

![Account View](../../../static/secure-web-gateway/secure-dns-devices/account-view.png)

The user must input your Cloudflare for Teams org name. You can find your team's name under the `Authentication` tab in the `Access` section of the sidebar.

![Org Name](../../../static/secure-web-gateway/secure-dns-devices/org-name.png)

The user will be prompted to login with the identity provider configured in Cloudflare Access. Once authenticated, the client will update to `Teams` mode. You can click the gear to toggle between DNS filtering or full proxy.

![Confirm WARP](../../../static/secure-web-gateway/block-uploads/with-warp.png)