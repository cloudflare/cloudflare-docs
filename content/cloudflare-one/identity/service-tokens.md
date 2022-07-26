---
pcx-content-type: how-to
title: Service tokens
weight: 6
---

# Service tokens

You can provide automated systems with service tokens to authenticate against your Zero Trust policies. Cloudflare Access will generate service tokens that consist of a Client ID and a Client Secret. Automated systems or applications can then use these values to reach an application protected by Access.

This section covers how to create, renew, and revoke a service token.

## Create a service token

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Access** > **Service Auth** > **Service Tokens**.

2. Click **Create Service Token**.

3. Name the service token. The name allows you to easily identify events related to the token in the logs and to revoke the token individually.

4. Select a **Service Token Duration**. This sets the expiration date for the token.

5. Click **Generate token**. You will see the generated `Client ID` and `Client Secret` for the service token.

6. Copy the `Client Secret`.

    ![Obtaining the Client ID and Secret for a new service token](/cloudflare-one/static/documentation/identity/users/detail-service-token.png)

    {{<Aside type="warning" header="Important">}}This is the **only time** Cloudflare Access will display the Client Secret. If you lose the Client Secret, you must generate a new service token.
    {{</Aside>}}

7. Click **Close**.

You can now use the service token in your [Access policies](/cloudflare-one/policies/access/) and [device enrollment rules](/cloudflare-one/connections/connect-devices/warp/warp-settings/#device-enrollment-permissions). When creating these policies, select the `Service Auth` action to ensure that the identity provider login screen is not required for end users.

## Connect your service to Access

Access expects both values as headers in any request sent to the applications behind Access. Add the following to the headers of any requests and name them as follows:

`CF-Access-Client-Id: <Client ID>`

`CF-Access-Client-Secret: <Client Secret>`

When a request is made to an application behind our network, the request will submit them both to Access. If the service token is valid, Access generates a JWT scoped to the application. All subsequent requests with that JWT will succeed until the expiration of that JWT.

## Renew service tokens

Service tokens expire according to the token duration you selected when you created the token.

To renew the service token,

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Access** > **Service Auth** > **Service Tokens**.
2. Locate the token you want to renew.
3. To extend the token's lifetime by one year, click **Refresh**.
4. To extend the token's lifetime by more than a year,
    1. Click **Edit**.
    2. Select a new **Service Token Duration**.
    3. Click **Save**. The expiration date will be extended by the selected amount of time.

## Revoke service tokens

If you need to revoke access before the token expires, simply delete the token.

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Access** > **Service Auth** > **Service Tokens**.

2. Click **Delete** for the token you need to revoke.

Services that rely on a deleted service token can no longer reach your application.

{{<Aside type="note">}}
When editing an Access application, clicking **Revoke existing tokens** revokes existing sessions but does not prevent the user from starting a new session. As long as the Client ID and Client Secret are still valid, they can be exchanged for a new token on the next request. To revoke access, you must delete the service token.
{{</Aside>}}

## Set a token expiration alert

An alert can be configured to notify a week before a service token expires to allow an administrator to invoke a token refresh.

To configure a service token expiration alert:

1. In the [Cloudflare dashboard](https://dash.cloudflare.com), navigate to the **Notifications** tab.
2. Click **Add**.
3. Select _Expiring Access Service Token_.
4. Enter a name for your alert and an optional description.
5. (Optional) Add other recipients for the notification email.
6. Click **Save**.

Your alert has been set and is now visible in the **Notifications** tab of the Cloudflare dashboard.
