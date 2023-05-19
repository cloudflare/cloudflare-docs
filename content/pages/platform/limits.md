---
pcx_content_type: concept
title: Limits
---

# Limits

Below are limits observed by the Cloudflare Free plan. For more details on removing these limits, refer to the [Cloudflare plans](https://www.cloudflare.com/plans) page.

{{<Aside type="note">}}

You can request adjustments to limits that conflict with your project goals by contacting Cloudflare. To request an increase to a limit, complete the [Limit Increase Request Form](https://forms.gle/ukpeZVLWLnKeixDu7) and we will contact you with next steps.

{{</Aside>}}

## Builds

Each time you push new code to your Git repository, Pages will build and deploy your site. You can build up to 500 times per month on the Free plan. Refer to the Pro and Business plans in [Pricing](https://pages.cloudflare.com/#pricing) if you need more builds.

Builds will timeout after 20 minutes.

## Custom domains

A Cloudflare Pages project can be attached to a certain number of domains per plan.

| Free | Pro | Business | Enterprise |
| ---- | --- | -------- | ---------- |
| 100  | 250 | 500      | 500        |

## Files

Pages uploads each file on your site to Cloudflare's globally distributed network to deliver a low latency experience to every user that visits your site. Cloudflare Pages sites can contain up to 20,000 files.

## File size

The maximum file size for a single Cloudflare Pages site asset is 25 MiB.

## Headers

A `_headers` file can have a maximum of 100 header rules.

## Preview deployments

You can have an unlimited number of [preview deployments](/pages/platform/preview-deployments/) active on your project at a time.

## Redirects

A `_redirects` file can have a maximum of 2,000 static redirects and 100 dynamic redirects, for a combined total of 2,100 redirects. It is recommended to use [Bulk Redirects](/pages/platform/redirects/#surpass-_redirects-limits) when you have a need for more than the `_redirects` file supports.

## Users

Your Pages site can be managed by an unlimited number of users via the Cloudflare dashboard. Note that this does not correlate with your Git project – you can manage both public and private repositories, open issues, and accept pull requests via  without impacting your Pages site.

## Sites

Cloudflare Pages supports deploying 100 sites to your account. If you need to raise this limit, contact your Cloudflare account team.

In order to protect against abuse of the service, Cloudflare may temporarily disable your ability to create new Pages projects, if you are deploying a large number of applications in a short amount of time. Email workers-support@cloudflare.com if you need this restriction removed.
