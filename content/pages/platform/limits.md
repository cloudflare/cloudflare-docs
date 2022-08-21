---
pcx_content_type: concept
title: Limits
---

# Limits

Below are limits observed by the Cloudflare Free plan. For more details on removing these limits, refer to the [Cloudflare plans](https://www.cloudflare.com/plans) page.

{{<Aside type="note">}}

We want to encourage you to build any application you can dream up, and realize that doesn't always fit within our limits.

To increase any of our limits, [please fill out our form!](https://forms.gle/ukpeZVLWLnKeixDu7)

{{</Aside>}}

## Builds

Each time you push new code to your Git repository, Pages will build and deploy your site. You can deploy up to 500 times per month on the Free plan. Refer to the Pro and Business plans in [Pricing](https://pages.cloudflare.com/#pricing) if you need to deploy more frequently.

Builds will timeout after 20 minutes.

## Custom domains

A Cloudflare Pages project can be attached to a maximum of ten (10) custom domains at a time.

## Files

Pages uploads each file on your site to Cloudflare's globally distributed network to deliver a low latency experience to every user that visits your site. Cloudflare Pages sites can contain up to {{<snippet id="cf-pages-limits-file-count">}} files.

## File size

The maximum file size for a single Cloudflare Pages site asset is {{<snippet id="cf-pages-limits-file-size">}}.

## Headers

A `_headers` file can have a maximum of {{<snippet id="cf-pages-limits-headers">}} header rules.

## Preview deployments

You can have an unlimited number of [preview deployments](/pages/platform/preview-deployments/) active on your project at a time.

## Redirects

A `_redirects` file can have a maximum of {{<snippet id="cf-pages-limits-redirects-long">}}. It is recommended to use [Bulk Redirects](/pages/how-to/use-bulk-redirects/) when you have a need for more than the `_redirects` file supports.

## Users

Your Pages site can be managed by an unlimited number of users via the Cloudflare dashboard. Note that this does not correlate with your Git project – you can manage both public and private repositories, open issues, and accept pull requests via  without impacting your Pages site.

## Sites

Cloudflare Pages supports deploying {{<snippet id="cf-pages-limits-projects">}} sites to your account. If you need to raise this limit, contact your Cloudflare account team.

In order to protect against abuse of the service, Cloudflare may temporarily disable your ability to create new Pages projects, if you are deploying a large number of applications in a short amount of time. Email workers-support@cloudflare.com if you need this restriction removed.
