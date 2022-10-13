---
order: 9
pcx-content-type: concept
---

# Known issues

Here are some known bugs and issues that we're aware of with Cloudflare Pages:
- Source code hosting tools besides GitHub—for instance, BitBucket or Gitlab—are not currently supported.
- Pages currently only supports a single project per repository. Monorepos or repositories with multiple codebases/applications currently can't deploy more than one project to Pages at a time.
- Once you've selected a GitHub repository for your Pages application, it can't be changed. Please remove/delete your Pages project and create a new one pointing at a different repository if you need to update it.
- pages.dev subdomains currently can't be changed. If you need to change your pages.dev subdomain, delete your project and create a new one.
- Hugo builds automatically run an old version. To run the latest version of Hugo (for instance, 0.80.0), you'll need to set an environment variable. Set `HUGO_VERSION` to `0.80.0` or the Hugo version of your choice.
- By default, we use Node 10 in the Pages build environment. If you need to use a newer Node version, see our [Build configuration page](https://developers.cloudflare.com/pages/platform/build-configuration) for configuration options.
- For users migrating from Netifly, Cloudflare does not support Netlify's Forms and Serverless Functions features. Cloudflare Pages does not directly support HTTP header customization, but it can be done through Workers. Refer to the ["Add custom HTTP headers"](/how-to/add-custom-http-headers) guide for more information.
- It is currently not possible to add a custom domain with a wildcard, e.g. *.domain.com.
- Cloudflare Pages is not supported with Cloudflare Apps; you may see a 1014 error if you use both in a deployment.

If you have an issue that you do not see listed, let the team know in the Cloudflare Workers Discord. Get your invite at [discord.gg/cloudflaredev](https://discord.gg/cloudflaredev), and share your bug report in the #pages-help channel.