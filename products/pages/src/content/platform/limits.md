---
order: 8
pcx-content-type: concept
---

# Limits

Below are limits observed by the Cloudflare Pages free plan. For more details on removing these limits, refer to our [Cloudflare plans](https://www.cloudflare.com/plans) page.

## Builds

Each time you push new code to your GitHub repository, Pages will build and deploy your site. You can deploy up to 500 times per month on the free plan. Refer to the Pro and Business plans on the Pages [pricing page](https://pages.cloudflare.com/#pricing) if you need to deploy more frequently. 

Builds will timeout after 20 minutes.

## Custom domains

A Cloudflare Pages project can be attached to a maximum of ten (10) custom domains at a time. 

## Files

Pages uploads each file on your site to Cloudflare's globally distributed network to deliver a low latency exprience to every user that visits your site. Cloudflare Pages sites can contain up to 20,000 files.

## File size

The maximum file size for a single Cloudflare Pages site asset is 25MB.

## Preview deployments

You can have an unlimited number of [preview deployments](/platform/preview-deployments) active on your project at a time.

## Users

Your Pages site can be managed by an unlimited number of users via the Cloudflare dashboard. Note that this does not correlate with your GitHub project--you can manage both public and private repos, open issues, and accept pull requests via GitHub without impacting your Pages site.

## Sites

Cloudflare Pages supports deploying unlimited sites to your account. In order to protect against abuse of the service, Cloudflare may temporarily disable your ability to create new Pages projects, if you are deploying a large number of applications in a short amount of time. Please email workers-support@cloudflare.com if you need this restriction removed.