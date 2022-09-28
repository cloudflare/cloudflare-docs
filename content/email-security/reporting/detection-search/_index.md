---
title: Detection search
pcx_content_type: concept
weight: 1
---

# Detection search

**Detection search** allows you to search through and view all emails that Area 1 has marked with a [detection disposition](/email-security/reference/dispositions-and-attributes/). All messages include the raw message with its headers, as well as any associated Area 1 dispositions and processing information.

You would commonly use detection search to get visibility into *why* and *when* Area 1 marked a message with a specific disposition. 

{{<Aside type="note">}}
To review all emails — not just those marked with a disposition — use [Mail Trace](/email-security/reporting/mailtrace/).
{{</Aside>}}

## Use detection search

To access Detection search in the dashboard:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Select the **Search** bar.
3. Enter anything related to a specific detection (for more guidance, refer to [search tips](#search-tips)).
4. Review the results.
5. To view the information contained in an email, including a protected preview and the raw SMTP headers, select **Details**. You can also **Download** a message.

## Search tips

### Parameter filtering

To search for specific values in one of the [available parameters](/email-security/reporting/detection-search/available-parameters/), format your search to be:

```txt
<<FIELD_NAME>>:<<VALUE>>
```

For example, you might search for `final_disposition:MALICIOUS`. Refer to our reference material for a full list of [dispositions](/email-security/reference/dispositions-and-attributes/).

### `message_id`

For normal queries, spaces split search terms into different values. For example, `billing statement` would look for all messages that contain both `billing` and `statement`.

However, spaces, quotations, and other characters are sometimes part of the `message_id` parameter. To ensure these values are included as part of filtering on the message ID, you should prefix the `message_id` value with `message_id`.

For example, the following query would find all messages that contain the terms `billing` and `statement` and have a `message_id` equal to `<Amazon aws Support@email.amazonses.com>`.

```txt
billing statement message_id:<Amazon aws Support@email.amazonses.com>
```

## Additional notes

When searching for phrases, some terms — such as words less than three characters and certain escape words like `and`, `the`, `then`, `their` — are not tokenized. Our search will automatically ignore these terms, both in your search query and in the proposed results.