---
pcx_content_type: concept
title: Billing
---

# Pages Functions GA Billing

## About Pages Functions Billing
One of the key features of Pages Functions is limitless requests. In beta, Pages Functions had a 100,000 requests/day limit. The Pages Functions billing model introduced on November 15th allows your traffic to scale without limitation.

## How it works
Pages Functions billing will be merged with the existing Workers billing structure for Free, Paid, and Enterprise customers. Read below to learn what this means for you as it relates to your Workers subscription plan:

{{<Aside type="note">}}
If you had your Functions limit increased by the Pages team as part of the beta period, please note that this raised limit will no longer apply. If on Workers free, Functions invocations over 100k per day will not be run. If on Workers Paid (or Workers contract) all requests will be billed.
{{</Aside>}}

### Workers Paid
* If you currently have a Workers Paid subscription, billing will automatically occur for all Functions usage after November 15th –- no additional action required. Pages Functions will share the same pool of quotas included in the subscription (for example, requests and duration).
  * For example, you will share the included 10 million Bundled requests between Workers and Pages Functions.
* The pricing will continue to be the same as stated [here](https://developers.cloudflare.com/workers/platform/pricing).

### Free Tier
* If you are currently a free Workers user, you will share the same 100,000 free tier limit pool with your Pages Functions. For example, you could use 50,000 Functions requests and 50,000 Workers requests to use your full 100,000 daily request usage.
* Today, we recommend that anyone currently using over (or near) 100,000 requests on Pages Functions, Workers or both combined should upgrade to Workers Paid.

### Enterprise
* Your Workers contract allocation will now be shared between Workers and Functions.
* If you currently have a Workers contract and need to make an addition to your contract, you can reach out to your Customer Service Manager (CSM) to make this change.
* If you do not have a Workers contract, you can reach out to your Customer Service Manager (CSM) to make this change.

## Have questions?
Let us know! For any questions unanswered on this page, reach out to us on [Discord](https://discord.com/invite/cloudflaredev) in the [#functions channel](https://discord.com/channels/595317990191398933/910978223968518144) in the Pages section or contact your Customer Success Manager if applicable.

## FAQ

### Will requests to assets be charged?
During the beta asset hits would also count as a Function invocation. At the start of September we implemented support for a `_routes.json` file which allows you to exclude routes from running Functions. This allows for you to exclude your static files and not have Function invocations charged. This file is generated automatically if not specified so don't worry about having to create it yourself. You should already see an accurate Function count today which does not include static asset hits. If you're still seeing a value higher than expected please [join the Discord](https://discord.gg/cloudflaredev) and let us know.