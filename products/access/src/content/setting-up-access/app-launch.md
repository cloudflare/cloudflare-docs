---
order: 9
hidden: true
---

# Access app launch

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

The Access App Launch portal provides end users with a single dashboard from which they can open applications secured by Access.

The Access App Launch portal is available at an authentication domain that is unique to your Cloudflare Access account. The domain will resemble `mycompany.cloudflareaccess.com` where `mycompany` is the organization name you created for Cloudflare Access.

Users log in using one of the identity providers configured for the account. Once Access authenticates the user, the App Launch portal displays applications they are authorized to use, represented by tiles. Clicking on a tile launches the application’s hostname, sending the user to that tool as part of their single sign-on flow.

![App launch create](../static/app-launch/app-launch-tiles.png)

Tiles have a one-to-one relationship to the policies you create in Access. If you create one policy for general access to your Jira deployment and a separate policy that restricts requests to a particular Jira path, a user authorized for both will see separate tiles for each. The tile names displayed in the Access App Launch portal correspond to the application names list in the **Access Policies** card.

![App launch](../static/app-launch/app-launch.gif)

## Enable the App Launch Portal

By default, the Access App Launch portal is disabled. To enable it, an administrator must configure a policy that defines which users can access the portal.

The App Launch policy defines which users can access the portal. It does not impact or change any rules about the applications secured behind Access. In many cases, teams build the App Launch policy to include everyone authorized to use an application in the team’s account.

To enable the Access App Launch, follow the instructions below.

1. Navigate to the **Authentication** row in the **Access** section of the Cloudflare for Teams sidebar. Select the **App Launch** tab.

![App launch create](../static/app-launch/setup-app-launch.png)

2. In the **Edit Access App Launch** dialog, select a rule type from the **Include** drop-down list and then configure the rule on the right.

![App launch edit](../static/app-launch/configure-app-launch.png)

3. Click **Save**.

Once you save the policy, users can access the App Launch portal at the URL listed on the **Access App Launch** card. You can return to this page to edit the App Launch.

![App launch create](../static/app-launch/app-launch-enabled.png)

## Access App Launch portal

When a user visits the Access App Launch portal, they are prompted to log in via an identity provider you have configured for their account. Once the user has successfully authenticated, Access generates a JWT (JSON Web Token) scoped to their identity and to the Access account. The JWT is identical to the token created when users authenticate directly to an application.

The portal evaluates the JWT against all policies configured in the account. The portal displays an app tile for each application that user is authorized to access. When a user clicks on one of the tiles, Access redirects them to the hostname for that application.

Application tiles have a one-to-one relationship with the application policies you create. For example, if you have a generic policy for Jira deployment, and a separate policy for requests to a particular Jira path, a user allowed to access both will see them as two distinct tiles in the portal.

## Known limitations

### Non-identity rules

The portal only displays applications a user is authorized to access. Access enforces any additional rules, such as mTLS or IP range requirements, when the user attempts to connect to the application.

### Tile icons and names

The tile names displayed in the Access App Launch portal correspond to the application names list in the **Access Policies** card.

The icon set is global and cannot be modified or customized today.

## Common questions

**Q:** What is the session duration for a login to the App Launch?

**A:** The session is set to 24 hours.
