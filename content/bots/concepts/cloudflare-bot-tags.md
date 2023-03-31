---
type: overview
pcx_content_type: reference
title: Bot Tags
weight: 3
layout: list
---

# Bot Tags

{{<render file="_bot-tags.md">}}
<br/>

Use these tags to learn more about your bot traffic and better inform security settings.

{{<Aside type="note" header="Note">}}

Bot tags are only available to Enterprise customers who have purchased Bot Management.

{{</Aside>}}

## Potential values

Once you [enable Bot Tags](#enable-bot-tags), you can see more information about bot requests, such as whether a request came from a verified bot (like Bing) or a category of verified bot (like SearchEngine).

{{<render file="_bot-tags-values.md">}}

## Enable bot tags

To enable bot tags, include the `BotTags` log field when using our [Logpush service](/logs/about/).

## Limitations

Currently, Bot Tags are only available in log fields.

Future work will add more values and extend Bot Tags to other Cloudflare products.
