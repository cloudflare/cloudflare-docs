---
pcx_content_type: concept
title: Known issues
---

# Known issues

Here are some known bugs and issues with Cloudflare Pages:

## Builds and deployment 

- GitHub and GitLab are currently the only supported platforms for automatic CI/CD builds. [Direct uploads](/pages/platform/direct-upload/) allow you to integrate your own build platform or upload from your local computer.

- Monorepos or repositories with multiple codebases/applications currently cannot use the automatic GitHub/GitLab integration to build multiple sites from the same repository. However, [Direct Uploads](/pages/platform/direct-upload/) can be used to upload a monorepo as separate Pages projects from your own computer.

- Incremental builds are currently not supported in Cloudflare Pages.

- A Direct Upload of a `/functions` directory does not work (refer to [Using Functions in Direct Upload](/pages/platform/direct-upload/#using-functions)).

## Git configuration 

- After you have selected a GitHub/GitLab repository for your Pages application, it cannot be changed. Remove/delete your Pages project and create a new one pointing at a different repository if you need to update it.

## Build configuration

- `*.pages.dev` subdomains currently cannot be changed. If you need to change your `*.pages.dev` subdomain, delete your project and create a new one.
- Hugo builds automatically run an old version. To run the latest version of Hugo (for example, `0.101.0`), you will need to set an environment variable. Set `HUGO_VERSION` to `0.101.0` or the Hugo version of your choice.

- By default, Cloudflare uses Node `12.18.0` in the Pages build environment. If you need to use a newer Node version, refer to the [Build configuration page](/pages/platform/build-configuration/) for configuration options.

- For users migrating from Netlify, Cloudflare does not support Netlify's Forms feature. An [equivalent](/pages/platform/functions/) to Netlify's Serverless Functions is currently in beta.

## Custom Domains
- It is currently not possible to add a custom domain with a wildcard, for example, `*.domain.com`.

- It is currently not possible to add a custom domain with a Worker already routed on that domain.

- It is currently not possible to add a custom domain with a Cloudflare Access policy already enabled on that domain.

- Cloudflare's Load Balancer does not work with `*.pages.dev` projects; an `Error 1000: DNS points to prohibited IP` will appear.

- When adding a custom domain, the domain may get stuck verifying due to being unable to validate a request for an SSL on that hostname. In order for the SSL to validate, ensure Cloudflare Access or a Cloudflare Worker is allowing requests to the validation path: `http://{domain_name}/.well-known/pki-validation/*`.


## Pages Functions

- [Functions (beta)](/pages/platform/functions/) does not currently support adding/removing polyfills, so your bundler (for example, Webpack) may not run.

- Currently, Durable Objects are not supported in local development mode. To use Durable Objects in your Pages application, deploy a Worker containing a Durable Object. Then add it as a binding to your Pages project as shown in the section above.  Support for using Durable Objects in local development is actively being worked on and will be available soon.

## Enabling Access on your `*.pages.dev` domain

If you would like to enable [Cloudflare Access](https://www.cloudflare.com/teams-access/)] for your preview deployments and your `*.pages.dev` domain, you must:

1. Log in to [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. From Account Home, select **Pages**.
3. Select your Pages project.
4. Go to **Settings** > **Enable access policy**.
5. Select **Edit** on the Acccess policy created for your preview deployments.
6. In Edit, go to **Overview**.
7. In the **Subdomain** field, delete the wildcard (`*`) and select **Save application**. You may need to change the **Application name** at this step to avoid an error.

At this step, your `*.pages.dev` domain has been secured behind Access. To resecure your preview deployments:

8. Go back to your Pages project > **Settings** > **General** > and reselect **Enable access policy**.
9. Review that two Access policies, one for your `*.pages.dev` domain and one for your preview deployments (`*.<YOUR_SITE>.pages.dev`), have been created.

If you have a custom domain and protected your `*.pages.dev` domain behind Access, you must:

10. Select **Add an application** > **Self hosted** in the Cloudflare Zero Trust dashboard.
11. Input an **Application name** and select your custom domain from the *Domain* dropdown menu.
12. Select **Next** and configure your access rules to define who can reach the Access authentication page.
13. Select **Add application**.

{{<Aside type="warning">}}

If you do not configure an Access policy for your custom domain, an Access authentication will render but not work for your custom domain visitors. If your Pages project has a custom domain, make sure to add an Access policy as described above in steps 10 through 13 to avoid any authentication issues.

{{</Aside>}}

If you have an issue that you do not see listed, let the team know in the Cloudflare Workers Discord. Get your invite at [discord.gg/cloudflaredev](https://discord.gg/cloudflaredev), and share your bug report in the #pages-general channel.
