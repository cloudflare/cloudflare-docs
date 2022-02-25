---
pcx-content-type: how-to
title: Lists
weight: 11
---

# Lists

{{<Aside>}}
Your lists can include up to 5,000 entries for Enterprise subscriptions and 1,000 for Standard subscriptions. A CSV file containing a list of URLs or hostnames must be smaller than 2 MB. 
{{</Aside>}}

With Cloudflare Zero Trust, you can create lists of URLs or hostnames to reference when creating [Secure Web Gateway policies](/cloudflare-one/policies/filtering/). This allows you to quickly create rules that match and take actions against several items at once.

You can create a list by:

*   [Uploading a list of entries](#creating-a-list-from-a-csv-file)
*   [Manually creating a list of entries](#creating-a-manual-list)

## Creating a list from a CSV file

If you'd like to test how this feature works, here is a [sample CSV file](/cloudflare-one/static/documentation/list-test.csv/). You can upload it to the Zero Trust dashboard following the instructions below:

1.  On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Gateway > Lists**.
2.  Click **Upload CSV**.

![Upload CSV](/cloudflare-one/static/documentation/policies/upload-csv.png)

1.  Next, specify a **List name**, enter an optional description, and choose URLs as the **List type**.
2.  Drag and drop a file into the CSV File window, or click **Select a file**.
3.  Click **Create**.

Your list will now appear in the Lists page.

## Creating a manual list

1.  On the Zero Trust dashboard, navigate to **Gateway > Lists**.
2.  Click **Create manual list**.

![Manual list](/cloudflare-one/static/documentation/policies/upload-csv.png)

1.  Next, specify a **List name**, enter an optional description, and choose URLs as the **List type**.
2.  Enter your elements manually in the *Add entries* field.
3.  Click **Save**.

## Editing a list

1.  In the Lists page, locate the list you want to edit.

2.  Click **Edit**. This will allow you to:
    *   Edit your list details (name and description) by clicking on the three-dots menu to the right of your list's name.
    *   Delete the list by clicking on the three-dots menu to the right of your list's name.
    *   Delete individual entries.
    *   Manually add entries to your list.

3.  Once you’ve edited your list, click **Save**.
