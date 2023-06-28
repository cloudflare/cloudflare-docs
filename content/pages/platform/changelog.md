---
pcx_content_type: changelog
title: Changelog
rss: file
---

# Changelog

## 2023-02-14

* Added support for [Analytics Engine](/analytics/analytics-engine/) in Functions.

## 2023-01-05

* Added support for [Queues](/queues/) producer in Functions.

## 2022-12-15

* Updated all API messaging to be more helpful.

## 2022-12-01

* Aliased deployments can now be deleted.
  * If using the API, you will need to add the query parameter `force=true`.

## 2022-11-19

* You can now deep-link to a Pages deployment in the dashboard with `:pages-deployment`.
  * Example: `https://dash.cloudflare.com?to=/:account/pages/view/:pages-project/:pages-deployment`.

## 2022-11-17

* Functions GA
  * Blog post: https://blog.cloudflare.com/pages-function-goes-ga/
* Functions metrics are now available in the dashboard.
  * You can [view them here](https://dash.cloudflare.com?to=/:account/pages/view/:pages-project/analytics/production).
* Functions billing is now available.
  * You can [view details here](/pages/platform/functions/pricing).
* The [Unbound usage model](/workers/platform/limits/#unbound-usage-model) is now available for Functions.
* [Secrets](/pages/platform/functions/bindings/#secrets) are now available.
* Functions tailing is now available.
  * You can tail within the dash here: https://dash.cloudflare.com?to=/:account/pages/view/:pages-project/:pages-deployment/functions.
  * Or with Wrangler - `wrangler pages deployment tail`.

## 2022-11-15

* Service bindings are now available in Functions.
  * [Documentation available here](/pages/platform/functions/bindings/#service-bindings).

## 2022-11-03

* Build log now supports ansi color codes.

## 2022-10-05

* You can now deep-link to a Pages project in the dashboard with `:pages-project`.
  * Example: `https://dash.cloudflare.com?to=/:account/pages/view/:pages-project`.

## 2022-09-12

* Increased domain limits.
  * Before increase, all plans had a maximum of 10 custom domains per project.
  * New limits:
    * Free - 100 custom domains
    * Pro - 250 custom domains
    * Business/Enterprise - 500 custom domains

## 2022-09-08

* Support `_routes.json`.
  * Documentation [available here](/pages/platform/functions/routing/#functions-invocation-routes).

## 2022-08-25

* Build log expiration time increased from 2 weeks to 1 year.

## 2022-08-08

* R2 and D1 bindings are now supported.

## 2022-07-05

* Added support for `.dev.vars` in `wrangler pages`.
  * This allows you to use environmental variables during your local development without chaining `--env`s.
  * Requires Wrangler v2.0.16 or higher.

## 2022-06-13

* Added deltas to `wrangler pages publish`.
  * We now keep track of the files that make up each deployment and intelligently only upload the files that we have not seen. This means that similar subsequent deployments should only need to upload a minority of files and this will hopefully make uploads even faster.
  * Requires Wrangler v2.0.11 or higher.

## 2022-06-08

* Added branch alias in PR comments.
![Branch alias in PR comment](/images/pages/platform/branch_alias_pr_comment.png)
