---
pcx_content_type: how-to
title: Service tokens
weight: 6
---

# Service tokens

You can provide automated systems with service tokens to authenticate against your Zero Trust policies. Cloudflare Access will generate service tokens that consist of a Client ID and a Client Secret. Automated systems or applications can then use these values to reach an application protected by Access.

This section covers how to create, renew, and revoke a service token.

## Create a service token

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Service Auth** > **Service Tokens**.

2. Select **Create Service Token**.

3. Name the service token. The name allows you to easily identify events related to the token in the logs and to revoke the token individually.

4. Choose a **Service Token Duration**. This sets the expiration date for the token.

5. Select **Generate token**. You will see the generated Client ID and Client Secret for the service token, as well as their respective request headers.

6. Copy the Client Secret.

   {{<Aside type="warning" header="Important">}}This is the **only time** Cloudflare Access will display the Client Secret. If you lose the Client Secret, you must generate a new service token.
   {{</Aside>}}

You can now configure your Access applications and [device enrollment permissions](/cloudflare-one/connections/connect-devices/warp/deployment/device-enrollment/#check-for-service-token) to accept this service token. Make sure to set the policy action to [**Service Auth**](/cloudflare-one/policies/access/#service-auth); otherwise, Access will prompt for an identity provider login.

## Connect your service to Access

### Initial request

To authenticate to an Access application using your service token, add the following to the headers of any HTTP request:

`CF-Access-Client-Id: <CLIENT_ID>`

`CF-Access-Client-Secret: <CLIENT_SECRET>`

For example,

```sh
$ curl -H "CF-Access-Client-Id: <CLIENT_ID>" -H "CF-Access-Client-Secret: <CLIENT_SECRET>" https://app.example.com
```

If the service token is valid, Access generates a JWT scoped to the application in the form of a [`CF_Authorization` cookie](/cloudflare-one/identity/authorization-cookie/). You can use this cookie to authenticate [subsequent requests](#subsequent-requests) to the application.

### Subsequent requests

After you have [authenticated to the application](#initial-request) using the service token, add the resulting `CF_Authorization` cookie to the headers of all subsequent requests:

```sh
$ curl -H "cookie: CF_Authorization=<CF_AUTHORIZATION_COOKIE>" https://app.example.com
```

If you prefer to use a raw header, send the value as `cf-access-token`:

```sh
$ curl -H "cf-access-token=<CF_AUTHORIZATION_COOKIE>" https://app.example.com
```

All requests with this cookie will succeed until the JWT expires.

{{<Aside type="note">}}
If your Access application only has Service Auth policies, you must send the service token on every subsequent request. You can only use the JWT if the application has at least one Allow policy.
{{</Aside>}}

## Renew service tokens

Service tokens expire according to the token duration you selected when you created the token.

To renew the service token:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Service Auth** > **Service Tokens**.
2. Locate the token you want to renew.
3. To extend the token's lifetime by one year, select **Refresh**.
4. To extend the token's lifetime by more than a year:
   1. Select **Edit**.
   2. Choose a new **Service Token Duration**.
   3. Select **Save**. The expiration date will be extended by the selected amount of time.

## Revoke service tokens

If you need to revoke access before the token expires, simply delete the token.

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Service Auth** > **Service Tokens**.
2. **Delete** the token you need to revoke.

Services that rely on a deleted service token can no longer reach your application.

{{<Aside type="note">}}
When editing an Access application, selecting **Revoke existing tokens** revokes existing sessions but does not prevent the user from starting a new session. As long as the Client ID and Client Secret are still valid, they can be exchanged for a new token on the next request. To revoke access, you must delete the service token.
{{</Aside>}}

## Set a token expiration alert

An alert can be configured to notify a week before a service token expires to allow an administrator to invoke a token refresh.

{{<available-notifications product="Cloudflare Access">}}

To configure a service token expiration alert:

1. In the [Cloudflare dashboard](https://dash.cloudflare.com), go to the **Notifications** tab.
2. Select **Add**.
3. Select _Expiring Access Service Token_.
4. Enter a name for your alert and an optional description.
5. (Optional) Add other recipients for the notification email.
6. Select **Save**.

Your alert has been set and is now visible in the **Notifications** tab of the Cloudflare dashboard.
