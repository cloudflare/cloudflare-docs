---
order: 3
---

# Service tokens

You can provide automated systems with service tokens to authenticate against Cloudflare's Zero Trust policies. Cloudflare for teams will generate service tokens that consist of an ID and Secret. Automated systems or applications can then use these values to reach an application protected by Access. 

This section covers how to create, renew, and revoke a service token.

## Create a service token

1. On the [Teams dashboard](https://dash.teams.cloudflare.com), navigate to **Configuration > Service Auth**.

1. Click **Create Service Token**.

   ![Access Service Token card](../../static/documentation/identity/users/service-token-list.png)

1. Next, name the service token.

  The name allows you to easily identify events related to the token in the logs and to revoke the token individually.

  ![Name Service Token](../../static/documentation/identity/users/service-token-name.png)

1. Click **Generate token**.
  
  The next page will display the generated `Client ID` and `Client Secret` for the service token.

1. In the next page, copy the `Client Secret`.

  ![Access Service Token card](../../static/documentation/identity/users/detail-service-token.png)

<Aside type='warning' header='Important'>

This is the **only time** Cloudflare Access will display the Client Secret. If you lose the Client Secret, you must generate a new service token.

</Aside>

6. Click **Close**.

You can now use the service token when you create [service auth policies](/policies/zero-trust/).

## Connect your service to Access
Access expects both values as headers in any request sent to the applications behind Access. Add the following to the headers of any requests and name them as follows:

`CF-Access-Client-Id: <Client ID>`
`CF-Access-Client-Secret: <Client Secret>`

When a request is made to an application behind our network, the request will submit them both to Access. If the service token is valid, Access generates a JWT scoped to the application. All subsequent requests with that JWT will succeed until the expiration of that JWT.

## Renew service tokens

By default, service tokens expire one year after creation. You can extend a token’s lifecycle by navigating to the **Service Tokens** tab and clicking the **Refresh** button for the token you want to renew.
The `Refresh` operation will extend the token's lifetime by **one year** from the date of the refresh.

![Access Service Token card](../../static/documentation/identity/users/service-token-home.png)

## Revoke service tokens

By default, Access service tokens expire one year after they’re created. If you need to revoke access earlier, simply delete the token.

To revoke a service token immediately:

1. On the [Teams dashboard](https://dash.teams.cloudflare.com), navigate to **Configuration > Service Auth > Service Tokens**.

1. Click **Delete** for the token you need to revoke and delete.

   ![Access Service Token card](../../static/documentation/identity/users/service-token-list.png)

When revoking service tokens, keep in mind:
* Services that rely on a deleted service token can no longer reach your application.
* Clicking **Revoke Existing Tokens** when editing a policy in the **Edit Access Policy** dialog revokes existing sessions but does not revoke access.

As long as the Client ID and Client Secret are still valid, they can be exchanged for a new token on the next request. To revoke access, you must *delete* the service token.

## Set a token expiration alert

Service tokens have a default expiration of 12 months from when they are first created. An alert can be configured to notify a week before a service token expires to allow an administrator to invoke a token refresh.

To configure a service token expiration alert:

1. Navigate to the [Cloudflare dashboard](https://dash.cloudflare.com).

1. Select the **Notifications** tab.

1. Click **Create**.

1. Select the Event Type “Expiring Access Service Token”.

1. Enter a name for your alert, and an optional description.

   ![Expiration notification](../../static/documentation/identity/users/notification-token.png)

1. If you'd like to add other recipients for the notification email, click *+Add email recipient*.

1. Click **Create**.

Your alert has now been set, and is now visible in the **Notifications** tab of the Cloudflare dashboard.


