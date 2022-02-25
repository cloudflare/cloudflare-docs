---
order: 9
pcx-content-type: concept
---

# Known issues

Here are some known bugs and issues with Cloudflare Pages:

*   GitHub and GitLab are currently the only supported Source code hosting tools.
*   Pages currently only supports a single project per repository. Monorepos or repositories with multiple codebases/applications currently cannot deploy more than one project to Pages at a time.
*   Once you have selected a GitHub repository for your Pages application, it cannot be changed. Remove/delete your Pages project and create a new one pointing at a different repository if you need to update it.
*   `*.pages.dev` subdomains currently cannot be changed. If you need to change your `*.pages.dev` subdomain, delete your project and create a new one.
*   Hugo builds automatically run an old version. To run the latest version of Hugo (for example, `0.80.0`), you will need to set an environment variable. Set `HUGO_VERSION` to `0.80.0` or the Hugo version of your choice.
*   By default, Cloudflare uses Node `12.18.0` in the Pages build environment. If you need to use a newer Node version, refer to the [Build configuration page](https://developers.cloudflare.com/pages/platform/build-configuration) for configuration options.
*   For users migrating from Netlify, Cloudflare does not support Netlify's Forms and Serverless Functions features.
*   It is currently not possible to add a custom domain with a wildcard, for example, `*.domain.com`.
*   Cloudflare's Load Balancer does not work with `*.pages.dev` projects; an `Error 1000: DNS points to prohibited IP` will appear.
*   A GitHub or GitLab account cannot be attached to more than one Cloudflare account.
*   [Functions (beta)](/platform/functions) does not currently support adding/removing polyfills, so your bundler (for example, Webpack) may not run.

If you have an issue that you do not see listed, let the team know in the Cloudflare Workers Discord. Get your invite at [discord.gg/cloudflaredev](https://discord.gg/cloudflaredev), and share your bug report in the #pages-general channel.
