---
pcx_content_type: how-to
title: Debugging Pages
---

# Debugging Pages

When setting up your Pages project, you may encounter various errors that prevent you from successfully deploying your site. This guide gives an overview of some common errors and solutions.

## Check your build log

You can review build errors in your Pages build log. To access your build log:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. In **Account Home**, go to **Workers & Pages**.
3. In **Overview**, select your Pages project > **View build**.

![After logging in to the Cloudflare dashboard, access the build log by following the instructions above](/images/pages/platform/pages-build-log.png)

Possible errors in your build log are included in the following sections.

### Initializing build environment

Possible errors in this step could be caused by improper installation during Git integration.

To fix this in GitHub:
1. Log in to your GitHub account.
2. Go to **Settings**  from your user icon > find **Applications** under Integrations.
3. Find **Cloudflare Pages** > **Configure** > scroll down and select **Uninstall**.
4. Re-authorize your GitHub user/organisation on the Cloudflare dashboard.

To fix this in GitLab:
1. Log in to your GitLab account.
2. Go to **Preferences** from your user icon > **Applications**.
3. Find **Cloudflare Pages** > scroll down and select **Revoke**.

Be aware that you need a role of **Maintainer** or above to successfully link your repository, otherwise the build will fail.

### Cloning git repository

Possible errors in this step could be caused by lack of Git Large File Storage (LFS). Check your LFS usage by referring to the [GitHub](https://docs.github.com/en/billing/managing-billing-for-git-large-file-storage/viewing-your-git-large-file-storage-usage) and [GitLab](https://docs.gitlab.com/ee/topics/git/lfs/) documentation.

Make sure to also review your submodule configuration by going to the `.gitmodules` file in your root directory. This file needs to contain both a `path` and a `url` property.

Example of a valid configuration:

```js
[submodule "example"]
	path = example/path
	url = git://github.com/example/repo.git
```

Example of an invalid configuration:

```js
[submodule "example"]
	path = example/path
```
or
```js
[submodule "example"]
        url = git://github.com/example/repo.git
```

### Building application

Possible errors in this step could be caused by faulty setup in your Pages project. Review your build command, output folder and environment variables for any incorrect configuration.

### Deploying to Cloudflare's global network

Possible errors in this step could be caused by incorrect Pages Functions configuration. Refer to the [Functions](/pages/functions/) documentation for more information on Functions setup.

If you are not using Functions or have reviewed that your Functions configuration does not contain any errors, review the [Cloudflare Status site](https://www.cloudflarestatus.com/) for Cloudflare network issues that could be causing the build failure.

## Differences between `pages.dev` and custom domains

If your custom domain is proxied (orange-clouded) through Cloudflare, your zone's settings, like caching, will apply.

If you are experiencing issues with a framework, like Nuxt.js, only on the custom domain, review if Auto Minify (deprecated) is enabled (log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) > **Speed** > **Optimization** > **Content Optimization** > **Auto Minify**) for HTML and disable it.

If you are experiencing issues with new content not being shown, go to **Rules** > **Page Rules** in the Cloudflare dashboard and check for a Page Rule (deprecated) with **Cache Everything** enabled. If present, remove this rule as Pages handles its own cache.

If you are experiencing errors on your custom domain but not on your `pages.dev` domain, go to **DNS** > **Records** in the Cloudflare dashboard and set the DNS record for your project to be **DNS Only** (grey cloud). If the error persists, review your zone's configuration.

## Domain stuck in verification

If your [custom domain](/pages/configuration/custom-domains/) has not moved from the **Verifying** stage in the Cloudflare dashboard, refer to the following debugging steps.

### Blocked HTTP validation

Pages uses HTTP validation and needs to hit an HTTP endpoint during validation. If another Cloudflare product is in the way (such as [Access](/cloudflare-one/policies/access/), [a redirect](/rules/url-forwarding/), [a Worker](/workers/), etc.), validation cannot be completed.

To check this, run a `curl` command against your domain hitting `/.well-known/acme-challenge/randomstring`. For example:
```sh
$ curl -I https://example.com/.well-known/acme-challenge/randomstring

HTTP/2 302
date: Mon, 03 Apr 2023 08:37:39 GMT
location: https://example.cloudflareaccess.com/cdn-cgi/access/login/example.com?kid=...&redirect_url=%2F.well-known%2Facme-challenge%2F...
access-control-allow-credentials: true
cache-control: private, max-age=0, no-store, no-cache, must-revalidate, post-check=0, pre-check=0
server: cloudflare
cf-ray: 7b1ffdaa8ad60693-MAN
```

In the example above, you are redirecting to Cloudflare Access (as shown by the `Location` header). In this case, you need to disable Access over the domain until the domain is verified. After the domain is verified, Access can be re-enabled.

You will need to do the same kind of thing for Redirect Rules or a Worker example too.

### Missing CAA records

If nothing is blocking the HTTP validation, then you may be missing Certification Authority Authorization (CAA) records. This is likely if you have disabled [Universal SSL](/ssl/edge-certificates/universal-ssl/) or use an external provider.

To check this, run a `dig` on the custom domain's apex (or zone, if this is a [subdomain zone](/dns/zone-setups/subdomain-setup/)). For example:

```sh
$ dig CAA example.com

; <<>> DiG 9.10.6 <<>> CAA example.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 59018
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;example.com.		IN	CAA

;; ANSWER SECTION:
example.com.	300	IN	CAA	0 issue "amazon.com"

;; Query time: 92 msec
;; SERVER: 127.0.2.2#53(127.0.2.2)
;; WHEN: Mon Apr 03 10:15:51 BST 2023
;; MSG SIZE  rcvd: 76
```

In the above example, there is only a single CAA record which is allowing Amazon to issue ceritficates.

To resolve this, you will need to add the following CAA records which allows all of the Certificate Authorities (CAs) Cloudflare uses to issue certificates:
```
example.com.            300     IN      CAA     0 issue "comodoca.com"
example.com.            300     IN      CAA     0 issue "digicert.com; cansignhttpexchanges=yes"
example.com.            300     IN      CAA     0 issue "letsencrypt.org"
example.com.            300     IN      CAA     0 issue "pki.goog; cansignhttpexchanges=yes"
example.com.            300     IN      CAA     0 issuewild "comodoca.com"
example.com.            300     IN      CAA     0 issuewild "digicert.com; cansignhttpexchanges=yes"
example.com.            300     IN      CAA     0 issuewild "letsencrypt.org"
example.com.            300     IN      CAA     0 issuewild "pki.goog; cansignhttpexchanges=yes"
```

### Zone holds

A [zone hold](/fundamentals/setup/account/account-security/zone-holds/) will prevent Pages from adding a custom domain for a hostname under a zone hold.

To add a custom domain for a hostname with a zone hold, temporarily [release the zone hold](/fundamentals/setup/account/account-security/zone-holds/#release-zone-holds) during the custom domain setup process.

Once the custom domain has been successfully completed, you may [reinstate the zone hold](/fundamentals/setup/account/account-security/zone-holds/#enable-zone-holds).

{{<Aside type="warning" header="Still having issues">}}

If you have done the steps above and your domain is still verifying after 15 minutes, join our [Discord](https://discord.cloudflare.com) for support or contact our support team through the [Support Portal](https://dash.cloudflare.com/?to=/:account/support).

{{</Aside>}}

## Resources

If you need additional guidance on build errors, contact your Cloudflare account team (Enterprise) or refer to the [Support Center](/support/contacting-cloudflare-support/) for guidance on contacting Cloudflare Support.

You can also ask questions in the Pages section of the [Cloudflare Developers Discord](https://discord.com/invite/cloudflaredev).
