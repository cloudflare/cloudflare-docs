---
title: Search
pcx_content_type: concept
layout: single
weight: 1
meta:
    description: Search for messages with a detection disposition or that have been processeded by Area 1.
---

# Search

You can search for emails that have been processed by Area 1, whether they are marked with a {{<glossary-tooltip term_id="disposition" link="/email-security/reference/dispositions-and-attributes/">}}detection disposition{{</glossary-tooltip>}} or not.

There are two ways for searching emails:

- **Fielded Search**: Presents you with fields where you can enter search terms.
- **Freeform Search**: Has one search field where you can construct your own search query, like `My great products`.

{{<Aside>}} {{<render file="_timestamp.md">}} {{</Aside>}}

## Search terms

In Freeform Search, you can search for any value or combination of values separated by a space. Using spaces with multiple search terms is the equivalent of using the operator `AND`.

Terms less than three characters long and common English words that do not offer significance for search value like `and`, `the`, `then`, `their` are ignored.

For more exact matches, use the named fields in **Fielded Search** to denote which field should contain the value. For example, to find only messages sent by `demo@example.com`, enter `demo@example.com` in **FROM (EXACT)**. `EXACT` in a field descriptor means the term will match how the value appears in the message.

## Fielded Search

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Select the **Search** bar.
3. Fill out one or more of the following fields. Filling multiple fields is the equivalent of adding the `AND` operator between the following terms:
	- **Terms**: Searches for terms in any of the available fields. If you want to search for a message that matches multiple recipients, use this field. Only one value can be specified in the **From** and **To** fields.
	- **From (Exact)**: Searches for the sender’s exact email address.
	- **To (Exact)**: Searches for the recipient’s exact email address.
	- **Subject**: Searches for the terms in the subject field.
	- **Domain**: Searches for messages from a specific domain.
	- **Message ID**: Searches for messages with the stated message ID.
	- **Alert ID**: Searches for messages with the stated alert ID.

{{<render file="_search.md">}}

## Freeform Search

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Select the **Search bar** > **Freeform Search**.
3. Build your search query — for example, `My great products`. The system will return all the emails that fit the query.

{{<render file="_search.md">}}

## Search tips

### Parameter filtering

To search for specific values in one of the [available parameters](/email-security/reporting/search/available-parameters/), format your search to be:

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