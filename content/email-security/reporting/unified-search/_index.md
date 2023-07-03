---
title: Unified Search
pcx_content_type: concept
weight: 1
meta:
    description: Search for messages with a detection disposition or that have been processeded by Area 1.
---

# Unified Search

Unified Search merges [Detection Search](/email-security/reporting/search/detection-search/) and [Mail Trace](/email-security/reporting/search/mailtrace/) into a single, unified experience. Unified Search makes it easier to search for emails that have been processed by Area 1, whether they are marked with a [detection disposition](/email-security/reference/dispositions-and-attributes/) or not.

Unified Search has two ways for searching emails:

- **Fielded Search**: Presents you with fields where you can enter search terms.
- **Freeform Search**: Has one search field where you can construct your own search query, like `My great products`.

To start using Unified Search:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).

2. Select the **Search** bar.

3. Select **Try new search** to enable Unified Search. The system will default to **Fielded Search**, but you can also enable **Freeform Search**.

	![Select Try new search to enable Unified Search](/images/email-security/unified-search/try-new-search.png)

4. (Optional) Under **Freeform Search**, select **Switch back to classic search** to revert to the previous search experience.

	![Select witch back to classic search to revert to the classical search experience](/images/email-security/unified-search/revert-search.png)

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
4. **Detections only** is enabled by default. This means that the system will only search through and display emails that Area 1 has marked with a [detection disposition](/email-security/reference/dispositions-and-attributes/). It works similarly to [Detection Search](/email-security/reporting/search/detection-search/). If you prefer to search through and view all emails that have been processed by Area 1, whether they are marked with a detection disposition or not, disable this option.
5. The **All detections** drop-down menu allows you to refine your search by detection disposition. This menu will be disabled if **Detections only** is not selected.
6. By default, the search results are limited to the previous 30 days. Select **Last 30 days** to change this setting.
7. (Optional) You can download the results from your search in CSV format. The CSV file is capped at 1,000 rows.

## Freeform Search

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Select the **Search bar** > **Freeform Search**.
3. Build your search query. For example, `My great products`.
4. **Detections only** is enabled by default. This means that the system will only search through and display emails that Area 1 has marked with a [detection disposition](/email-security/reference/dispositions-and-attributes/). It works similarly to [Detection Search](/email-security/reporting/search/detection-search/). If you prefer to search through and view all emails that have been processed by Area 1, whether they are marked with a detection disposition or not, disable this option.
5. The **All detections** drop-down menu allows you to refine your search by detection disposition. This menu will be disabled if **Detections only** is not selected.
6. By default, the search results are limited to the previous 30 days. Select **Last 30 days** to change this setting.
7. (Optional) You can download the results from your search in CSV format. The CSV file is capped at 1,000 rows.

## Search tips

### Parameter filtering

To search for specific values in one of the [available parameters](/email-security/reporting/search/detection-search/available-parameters/), format your search to be:

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