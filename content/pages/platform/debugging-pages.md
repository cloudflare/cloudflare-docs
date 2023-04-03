---
pcx_content_type: how-to
title: Debugging Pages
---

# Debugging Pages

When setting up your Pages project, you may encounter various errors that prevent you from successfully deploying your site. This guide gives an overview of some common errors and solutions.

## Check your build log

You can review build errors in your Pages build log. To access your build log:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. In **Account Home**, go to **Pages**.
3. Select your Pages project > **View build**.

![After logging in to the Cloudflare dashboard, access the build log by following the instructions above](../media/pages-build-log.png)

Possible errors in your build log are included in the following sections.

### Initializing build environment

Possible errors in this step could be caused by improper installation during git integration.

To fix this in GitHub:
1. Log in to your Github account.
2. Go to **Settings**  from your user icon > find **Applications** under Integrations.
3. Find **Cloudflare Pages** > **Configure** > scroll down and select **Uninstall**.
4. Re-authorize your Github user/organisation on the Cloudflare dashboard.

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

Possible errors in this step could be caused by incorrect Pages Functions configuration. Refer to the [Functions](/pages/platform/functions/) documentation for more information on Functions setup.

If you are not using Functions or have reviewed that your Functions configuration does not contain any errors, review the [Cloudflare Status site](https://www.cloudflarestatus.com/) for Cloudflare network issues that could be causing the build failure.

## Differences between `pages.dev` and custom domains

If your custom domain is proxied (orange-clouded) through Cloudflare, your zone's settings such as Auto Minify and caching will apply.

If you are experiencing issues with a framework, like Nuxt.js, only on the custom domain, review if Auto Minify is enabled (log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) > **Speed** > **Optimization** > **Auto Minify**) for HTML and disable it.

If you are experiencing issues with new content not being shown, go to **Rules** > **Page Rules** in the Cloudflare dashboard and check for a Page Rule with **Cache Everything** enabled. If present, remove this rule as Pages handles its own cache.

If you are experiencing errors on your custom domain but not on your `pages.dev` domain, go to **DNS** > **Records** in the Cloudflare dashboard and set the DNS record for your project to be **DNS Only** (grey cloud). If the error persists, review your zone's configuration.

## Domain stuck Verifying

If your [Custom Domain](/pages/platform/custom-domains/) is stuck saying "Verifying" in the Cloudflare dashboard then there are a few debugging steps which can be done to find the issue.

### Things blocking HTTP validation

Pages uses HTTP validation which means we need to hit a HTTP endpoint, if something is in the way (such as Access, a redirect, a Worker, etc.) then it means the validation cannot be completed.

To check this, simply run a curl against your domain hitting `/.well-known/acme-challenge/randomstring`, example:
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

As we can see in the example above, we're redirecting to Cloudflare Access (as shown by the `Location` header). In this case, we will need to disable Access over the domain until it's verified. Once it's verified, Access can be re-applied above.

You will need to do the same kind of thing for Redirect Rules or a Worker example too.

### Missing CAA records

If nothing is blocking the HTTP validation, then you may be missing CAA records. If you have disabled [Universal SSL](/ssl/edge-certificates/universal-ssl/) or use an external provider then this is likely.

To check, we can do a `dig` on the custom domain's apex (or zone if this is a liberated zone). For example:

```
$ dig example.com

dig CAA example.com

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

As we can see in this example, there's only a single CAA record which is allowing Amazon to issue ceritficates.

To resolve this, you will need to add the following CAA records which allows all of the CAs we use to issue ceritificates:
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

### Still having trouble?

If you've done the steps above and your domain is still stuck pending after 15 minutes, please contact support through the [Support Portal](https://dash.cloudflare.com/?to=/:account/support).

## Resources

If you need additional guidance on build errors, contact your Cloudflare account team (Enterprise) or refer to the [Support Center](https://support.cloudflare.com/hc/en-us/articles/200172476-Contacting-Cloudflare-Support) for guidance on contacting Cloudflare Support.

You can also ask questions in the Pages section of the [Cloudflare Developers Discord](https://discord.com/invite/cloudflaredev).

