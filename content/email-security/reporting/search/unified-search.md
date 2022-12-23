---
title: Unified search
pcx_content_type: concept
weight: 1
---

{{<beta>}} Unified Search {{</beta>}}

Unified Search merges [Detection Search](/email-security/reporting/search/detection-search/) and [Mail Trace](/email-security/reporting/search/mailtrace/) into a single, unified experience. Unified Search makes it easier to search for emails that have been processed by Area 1, whether they are marked with a detection disposition or not.

Unified Search has two ways of searching emails:

- **Fielded Search**: Presents you with fields where you can enter search terms.
- **Freeform Search**: Has one search field where you can construct your own search query, like `My products`.

To start using Unified Search:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Select the **Search** bar.
3. The dashboard will display a message about the new search experience. Select **Try new search** to enable Unified Search. The system will default to **Fielded Search**, but you can also enable **Freeform Search**.
4. (Optional) Under **Freeform Search**, select **Switch back to classic search** to revert to the classical search experience.

## Search terms

You can search for any value or combination of values separated by a space. Using spaces with multiple search terms is the equivalent of using the operator `AND`.

Terms less than three characters long and common English words that do not offer significance for search value are ignored. The following words are ignored:
- `the`
- `then`
- `there`
- `where`

For more exact matches, use the named fields on the Fielded Search to denote which field should contain the value. For example, to find only messages sent by `demo@example.com` enter `demo@example.com` in **FROM (EXACT)**. `EXACT` means Area 1 searches for the term as it appears in the message.

## Fielded Search

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).

2. Select the **Search** bar.

3. Fill out one or more of the following fields. Filling multiple fields is the equivalent of adding the `AND` operator between terms:
	- **Terms**: Searches for the terms in all available fields.
	- **From (Exact)**: Searches for the sender’s exact email address.
	- **To (Exact)**: Searches for the recipient’s exact email address.
	- **Subject**: Searches for the terms in the subject field.
	- **Domain**: Searches for messages from a specific domain.
	- **Message ID**: Searches for messages with the stated message ID.
	- **Alert ID**: Searches for messages with the stated alert ID.

4. **Detections only** is enabled by default. This means the system will only search through, and display, emails that Area 1 has marked with a [detection disposition](/email-security/reference/dispositions-and-attributes/). It works similarly to [Detection Search](/email-security/reporting/search/detection-search/). If you prefer to search through and view all emails that have been processed by Area 1, whether they are marked with a detection disposition or not, disable this option.

5. The **All detections** drop-down menu allows you to refine your search by detection disposition. This menu will be disabled if Detections only is not selected.

6. By default, the search results are limited to the previous 30 days. Select the **Last 30 days** drop-down menu to change this setting.

7. (Optional) You can download the results from your search in CSV format. The CSV file is capped at 1,000 rows.

## Freeform Search

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).

2. Select the **Search** bar > **Freeform Search**.

3. Build your search query. You can use the same [parameters for filtering](/email-security/reporting/search/detection-search/available-parameters/) that are available in [Detection Search](/email-security/reporting/search/detection-search/).

4. **Detections only** is enabled by default. This means the system will only search through, and display, emails that Area 1 has marked with a [detection disposition](/email-security/reference/dispositions-and-attributes/). It works similarly to [Detection Search](/email-security/reporting/search/detection-search/). If you prefer to search through and view all emails that have been processed by Area 1, whether they are marked with a detection disposition or not, disable this option.

5. The **All detections** drop-down menu allows you to refine your search by detection disposition. This menu will be disabled if Detections only is not selected.

6. By default, the search results are limited to the previous 30 days. Select the **Last 30 days** drop-down menu to change this setting.

7. (Optional) You can download the results from your search in CSV format. The CSV file is capped at 1,000 rows.