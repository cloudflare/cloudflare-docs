---
title: Mail Trace
pcx_content_type: concept
weight: 2
---

# Mail Trace

**Mail Trace** allows you to search through and view all emails that have been processed by Area 1, whether or not they were marked with a [detection disposition](/email-security/reference/dispositions-and-attributes/).

You would commonly use Mail Trace to review *whether* and *when* an email passed through Area 1, as well as *what* Area 1 communicated to the following mail provider.

{{<Aside type="note">}}
To only review emails marked with a disposition, use [Detection search](/email-security/reporting/detection-search/).
{{</Aside>}}

## Use Mail Trace

To access Mail Trace in the dashboard:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Select the **Search** bar.
3. Select **Detection Search** and then select **Mail Trace**.
4. Fill out one or more of the following variables:
    - **Subject**
    - **Date Range**
    - **Recipient** (email address)
    - **Sender** (email address)
    - **Message ID**

5. Based on your search, you can review the requested information, as well as the assigned **Disposition**.
6. For additional details about metadata and Area 1 processing and forwarding, select **View**.