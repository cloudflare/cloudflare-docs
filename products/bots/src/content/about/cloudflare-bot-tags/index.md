---
order: 5
type: overview
pcx-content-type: reference
---

# Bot Tags

Bot Tags provide more detail about bot-related requests.

Use these tags to learn more about your bot traffic and better inform security settings.

## Potential values

Once you [enable Bot Tags](#enable-bot-tags), you can see more information about bot requests, such as whether a request came from a verified bot (like Bing) or a category of verified bot (like SearchEngine). 

The following values may be present in the `BotTags` log field:
- api
- google
- bing
- googleAds
- googleMedia
- googleImageProxy
- pinterest
- newRelic
- baidu
- apple
- yandex

## Enable bot tags

To enable bot tags, include the `BotTags` log field when using our [Logpush service](https://developers.cloudflare.com/logs/about).

## Current features

Currently, Bot Tags are only available in log fields.

Future work will add more values and extend Bot Tags to other Cloudflare products.
