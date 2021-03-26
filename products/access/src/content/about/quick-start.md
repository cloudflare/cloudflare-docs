---
order: 1
hidden: true
---

# Quick start

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Cloudflare Access is one-half of Cloudflare for Teams, a security platform that runs on Cloudflare’s network and focuses on keeping users, devices, and data safe without compromising experience or performance. Cloudflare Access can secure web apps, SSH connections, as well as remote desktops.

![Access Generic](../static/summary/network-diagram.png)

## 1) Enable Cloudflare Access
* In the Cloudflare dashboard, navigate to the “Access” tab and click “Enable Access”.
* You will be prompted to select a seat count. For the time being, input “5 Seats” as part of the “Premium” plan to start using free seats immediately and begin configuring your account. You will not be charged for this selection.
* Don’t have a Cloudflare account? Please follow [these instructions](https://support.cloudflare.com/hc/en-us/articles/201720164-Step-2-Create-a-Cloudflare-account-and-add-a-website) to create a free one. You will need to add one website to your account first.
* As part of setting up Cloudflare Access, please add a site to Cloudflare. This site does not need to be the same one used by your internal DNS or used for a public audience. Once that hostname is on Cloudflare, you can deploy applications, machines, and remote desktops as subdomains that are secured with Cloudflare Access.

## 2) Configure your identity provider
* Cloudflare Access integrates with your organization’s identity provider to determine a user’s identity which is used to validate their permission to reach your application.
Access supports providers that are maintained by your team, like Okta, G Suite, and AzureAD, in addition to publicly available providers like LinkedIN and GitHub.
* Access [supports multiple providers](https://blog.cloudflare.com/multi-sso-and-cloudflare-access-adding-linkedin-and-github-teams/) simultaneously, including providers of the same type.
* When users connect to an application protected by Access, they will be prompted to login with the identity provider configured.
* As part of enabling Access in Step 1, you can begin configuring your identity provider right away. [Follow these instructions](/configuring-identity-providers/) to begin integrating your team’s login method.

## 3. Build your first Access policy
* [Cloudflare Access policies](/setting-up-access/configuring-access-policies/) allow you to protect an entire website or a particular URI (the application resource). You can use policies to define users or groups who can or cannot access the application resource.
* You can configure an access policy for an apex domain, a particular subdomain, or all subdomains using a wildcard policy. Similarly, you can apply an access policy to an entire website or protect a specific path.

![Access Generic](../static/apps/build-rule.png)

## 4. Connect your application or infrastructure to Cloudflare
* Regardless of whether applications run on-premise or hosted in a cloud provider, you can connect your infrastructure to Cloudflare with [Cloudflare Argo Tunnel](https://developers.cloudflare.com/argo-tunnel/quickstart/).
* Argo Tunnel runs a lightweight daemon on your origin server or machine that establishes an outbound-only connection between that resource and the Cloudflare network.
* Argo Tunnel will also register DNS records for your application. For example, if you build a policy in `Step 3` that secures `jira.internal.com`, Argo Tunnel can create the DNS record that will proxy requests to that application through Cloudflare.

## 5. Enable the Access App Launch for your organization
* Cloudflare Access includes a feature, the [Access App Launch](https://blog.cloudflare.com/announcing-the-cloudflare-access-app-launch/), that serves as a single dashboard for your end users to view and launch the applications they can reach.
* The Access App Launch reduces end user friction when migrating to a new system; they only need one URL and they can begin connecting to the tools they need.
You can enable this for your organization now with these [instructions](/setting-up-access/app-launch/).

![App launch](../static/app-launch/app-launch.gif)

## Other materials
You can learn more about Cloudflare for Teams:

* [Learn how](https://www.cloudflare.com/case-studies/udaan-access/) Udaan uses Cloudflare Access for secure auth for thousands of employees and partners.
* Integrate SSO with your [Atlassian suite](https://blog.cloudflare.com/cloudflare-access-sharing-our-single-sign-on-plugin-for-atlassian/), [Sentry](https://blog.cloudflare.com/open-sourcing-our-sentry-sso-plugin/), and Cloudflare Access.
* [Find out how](https://blog.cloudflare.com/how-replicated-secured-our-remote-dev-environment-with-cloudflare-access/) Replicated uses Cloudflare Access to secure a fully distributed development model.
* [Read about](https://blog.cloudflare.com/how-cloudflare-keeps-employees-productive-from-any-location/) Cloudflare’s approach to productivity with Cloudflare Access.
