---
pcx_content_type: changelog
title: Changelog
rss: file
---

# Changelog

## 5th January 2023
* Added support for [Queues](/queues/) producer to Functions

## 15th December 2022
* Updated all API messaging to be more helpful

## 1st December 2022
* Aliased deployments can now be deleted
  * If using the API, you will need to add the query parameter `force=true`

## 19th November 2022
* You can now deep-link to a Pages deployment in the dashboard with `:pages-deployment`
  * Example: `https://dash.cloudflare.com?to=/:account/pages/view/:pages-project/:pages-deployment`

## 17th November 2022
* Functions GA
  * Blog post: https://blog.cloudflare.com/pages-function-goes-ga/
* Functions metrics are now available in the dashboard
  * You can [view them here](https://dash.cloudflare.com?to=/:account/pages/view/:pages-project/analytics/production)
* Functions billing is now available
  * You can [view details here](/pages/platform/functions/pricing)
* The [Unbound usage model](/workers/platform/limits/#unbound-usage-model) is now available for Functions
* [Secrets](/pages/platform/functions/bindings/#secrets) are now avaible
* Functions tailing is now available
  * You can tail within the dash here: https://dash.cloudflare.com?to=/:account/pages/view/:pages-project/:pages-deployment/functions
  * Or with Wrangler - `wrangler pages deployment tail`

## 15th November 2022
* Service bindings are now available in Functions
  * [Documentation available here](/pages/platform/functions/bindings/#service-bindings)

## 3rd November 2022
* Build log now supports ansi color codes

## 12th September 2022
* Increased domain limits
  * Before all plans had a maximum of 10 custom domains per project
  * New limits:
    * Free - 100 custom domains
    * Pro - 250 custom domains
    * Business/Enterprise - 500 custom domains

## 8th September 2022
* Support _routes.json
  * Documentation [available here](/pages/platform/functions/routing/#function-invocation-routes)

## 5th October 2022
* You can now deep-link to a Pages project in the dashboard with `:pages-project`
  * Example: `https://dash.cloudflare.com?to=/:account/pages/view/:pages-project`

## 25th August 2022
* Build log expiration time increased from 2 weeks to 1 year

## 8th August 2022
* R2 and D1 bindings are now supported

## 5th July 2022
* Added support for .dev.vars in `wrangler pages`
  * This allows to use env vars during your local dev without chaining `--env`s
  * Requires Wrangler v2.0.16 or higher

## 13th June 2022
* Added deltas to `wrangler pages publish`
  * We now keep track of the files that make up each deployment and intelligently only upload the files that we haven't seen. This means that similar subsequent deployments should only need to upload a minority of files and this will hopefully make uploads even faster.
  * Requires Wrangler v2.0.11 or higher

## 8th June 2022
* Added branch alias in PR comments
![Branch alias in PR comment](/pages/platform/media/branch_alias_pr_comment.png)