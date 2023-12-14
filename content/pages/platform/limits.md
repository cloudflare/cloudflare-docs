---
pcx_content_type: concept
title: Limits
---

# Limits

Below are limits observed by the Cloudflare Free plan. For more details on removing these limits, refer to the [Cloudflare plans](https://www.cloudflare.com/plans) page.

{{<render file="_limits_increase.md" productFolder="workers">}}

## Builds

Each time you push new code to your Git repository, Pages will build and deploy your site. You can build up to 500 times per month on the Free plan. Refer to the Pro and Business plans in [Pricing](https://pages.cloudflare.com/#pricing) if you need more builds.

Builds will timeout after 20 minutes.

## Custom domains

Based on your Cloudflare plan type, a Pages project is limited to a specific number of custom domains. This limit is on a per-project basis.

| Free | Pro | Business | Enterprise |
| ---- | --- | -------- | ---------- |
| 100  | 250 | 500      | 500[^1]    |

[^1]: If you need more custom domains, contact your account team.

## Files

Pages uploads each file on your site to Cloudflare's globally distributed network to deliver a low latency experience to every user that visits your site. Cloudflare Pages sites can contain up to 20,000 files.

## File size

The maximum file size for a single Cloudflare Pages site asset is 25 MiB.

## Headers

A `_headers` file can have a maximum of 100 header rules.

An individual header in a `_headers` file can have a maximum of 2,000 characters. For managing larger headers, it is recommended to implement [Pages Functions](/pages/functions/).

## Preview deployments

You can have an unlimited number of [preview deployments](/pages/platform/preview-deployments/) active on your project at a time.

## Redirects

A `_redirects` file can have a maximum of 2,000 static redirects and 100 dynamic redirects, for a combined total of 2,100 redirects. It is recommended to use [Bulk Redirects](/pages/platform/redirects/#surpass-_redirects-limits) when you have a need for more than the `_redirects` file supports.

## Users

Your Pages site can be managed by an unlimited number of users via the Cloudflare dashboard. Note that this does not correlate with your Git project – you can manage both public and private repositories, open issues, and accept pull requests via  without impacting your Pages site.

## Projects

Cloudflare Pages has a soft limit of 100 projects within your account in order to prevent abuse. If you need this limit raised, contact your Cloudflare account team or use the Limit Increase Request Form at the top of this page.

In order to protect against abuse of the service, Cloudflare may temporarily disable your ability to create new Pages projects, if you are deploying a large number of applications in a short amount of time. Contact support if you need this limit increased.
