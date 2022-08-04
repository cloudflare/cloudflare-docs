---
type: overview
pcx_content_type: reference
title: Bot Tags
weight: 3
layout: list
---

# Bot Tags

Bot Tags provide more detail about _why_ Cloudflare assigned a [bot score](/bots/concepts/bot-score/) to a request.

Use these tags to learn more about your bot traffic and better inform security settings.

{{<Aside type="note" header="Note">}}

Bot tags are only available to Enterprise customers who have purchased Bot Management.

{{</Aside>}}

## Potential values

Once you [enable Bot Tags](#enable-bot-tags), you can see more information about bot requests, such as whether a request came from a verified bot (like Bing) or a category of verified bot (like SearchEngine).

The following values are **examples** of what may be present in the `BotTags` log field, but not an exhaustive list:

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

To enable bot tags, include the `BotTags` log field when using our [Logpush service](/logs/about/).

## Limitations

Currently, Bot Tags are only available in log fields.

Future work will add more values and extend Bot Tags to other Cloudflare products.
