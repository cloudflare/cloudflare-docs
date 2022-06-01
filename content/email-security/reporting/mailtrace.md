---
title: Mailtrace
pcx-content-type: concept
weight: 2
---

# Mailtrace

**Mailtrace** allows you to search through and view all emails that have been processed by Area 1, whether or not they were marked with a [detection disposition](/email-security/reference/dispositions-and-attributes/).

You would commonly use Mailtrace to review *whether* and *when* an email passed through Area 1, as well as *what* Area 1 communicated to the following mail provider.

{{<Aside type="note">}}
To only review emails marked with a disposition, use [Detection search](/email-security/reporting/detection-search/).
{{</Aside>}}

## Use Mailtrace

To access Mailtrace in the dashboard:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Click the **Search** bar.
3. Click **Detection Search** and then select **Mail Trace**.
4. Fill out one or more of the following variables:
    - **Subject**
    - **Date Range**
    - **Recipient** (email address)
    - **Sender** (email address)
    - **Message ID**

5. Based on your search, you can see all that information, as well as the assigned **Disposition**.
6. For additional details about metadata and Area 1 processing and forwarding, click **View**.