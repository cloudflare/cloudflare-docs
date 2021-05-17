---
title: Query parameters and cached responses
order: 10
---

# Query parameters and cached responses

Query parameters often signal the presence of dynamic content. As a result, if there are query parameters in the URL, APO bypasses the cache and attempts to get a new version of the page from the origin by default. Because query parameters are also often used for marketing attribution, like UTMs, quick loading times are especially important for users. 

To add a query parameter to our allowlist, [create a post in the community](https://community.cloudflare.com/) for consideration.

APO serves cached content as long as the query parameters in the URL are one of the following: 

- `ref`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `utm_expid`
- `fbclid`
- `fb_action_ids`
- `fb_action_types`
- `fb_source`
- `mc_cid`
- `mc_eid`
- `gclid`
- `dclid`
- `_ga`
- `campaigni`
- `adgroupi`
- `_ke`
- `cn-reloaded`
- `age-verified`
- `ao_noptimize`
- `usqp`
- `mkt_tok`
- `epik`
- `ck_subscriber_id`

## Cookies prefixes that always bypass cache

- `wp-`
- `wordpress`
- `comment_`
- `woocommerce_`
- `xf_`
- `edd_`
- `jetpack`
- `yith_wcwl_session_`
- `yith_wrvp_`
- `wpsc_`
- `ecwid`
- `ec_`
- `bookly_`
- `bookly`
