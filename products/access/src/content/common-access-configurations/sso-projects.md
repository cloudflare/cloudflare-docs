---
order: 4
---

# Application SSO

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Access can replace your virtual private network (VPN) and reduce the need for application-specific passwords. For example, applications can use the JSON web token (JWT) that Access generates to validate the user's identity. Doing so enables a single sign-on experience.

Single sign-on integrations allow supported applications to connect the identity from the Access JWT to a user profile configured in the application. This way the user only needs to log in once, through the identity provider they select on the Access login page.

## Applications with JWT authentication support

### Atlassian Jira® and Confluence® (Plugin)

Access offers support for on-premise Atlassian tools through a Cloudflare open-source plugin. For more, see the [Cloudflare Access for Atlassian](https://github.com/cloudflare/cloudflare-access-for-atlassian) project on GitHub.

### Redash®

Authentication is available natively in Redash. For integration help, see the [Redash](https://github.com/getredash/redash) project on GitHub.

### Sentry (Plugin)

Sentry is an application that helps software teams find and diagnose errors in their products. You can integrate Cloudflare Access with Sentry using a [plugin opens-sourced](https://github.com/cloudflare/cloudflare-access-for-sentry) by Cloudflare.