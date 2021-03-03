# Known issues

**Cloudflare Pages is currently in open beta.** Here are some known bugs and issues that we're aware of:

- Deleting a project with a custom URL may show the old build at that URL. You'll need to delete the Cloudflare DNS record for that custom domain to remove that old build.
- Zone configurations are not working (such as running a Workers script in front of your Pages application, using Pages Rules, and enabling "Always HTTPS").
- No direct support for running routes or redirects in Pages (however, if your project contains a 404.html file, that's served first. If not, then your /index.html file is served)
- No Access integration yet to protect preview URLs.
- Hugo builds automatically run an old version. To run the latest version of Hugo (for instance, 0.80.0), you'll need to set an environment variable. Set `HUGO_VERSION` to `0.80.0` or the Hugo version of your choice.
- Source code hosting tools besides GitHub—for instance, BitBucket or Gitlab—are not currently supported.

Having an issue that you don't see listed above? Let us know in the Cloudflare Workers Discord! Get your invite at [discord.gg/cloudflaredev](https://discord.gg/cloudflaredev), and share your bug report in the #pages channel.