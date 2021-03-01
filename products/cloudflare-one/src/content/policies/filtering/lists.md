---
order: 10
hidden: true
---

# Lists

With Teams, you can create lists of URLs to reference when creating [Secure Web Gateway policies](/policies/filtering). This allows you to quickly create rules that match and take actions against several items. 

You can create a list by:
* [Bulk uploading](#creating-a-bulk-upload-list) many entries
* [Manually entering](#creating-a-manual-list) each item in a list

Your lists can include up to 5,000 entries for Enterprise subscriptions and 1,000 for Standard subscriptions.

## Creating a bulk upload list

1. On the Teams dashboard, navigate to **Gateway > Lists**.
1. Click **Upload CSV**.

  ![Upload CSV](../../static/documentation/policies/upload-csv.png)

1. Next, specify a **List name**, enter an optional description, and choose URLs as the **List type**.
1. Drag and drop a file into the CSV File window, or click **Select a file**.

 <Aside>
 Keep in mind that the file must be a CSV and smaller than 2 MB.
 </Aside>

1. Click **Create**. 

Your list will now appear in the Lists page.

## Creating a manual list

1. On the Teams dashboard, navigate to **Gateway > Lists**.
1. Click **Create manual list**.

  ![Manual list](../../static/documentation/policies/upload-csv.png)

1. Next, specify a **List name**, enter an optional description, and choose URLs as the **List type**.
1. Enter your elements manually in the *Add entries* field.
1. Click **Save**.

## Editing a manual list

1. In the Lists page, locate the list you want to edit.
1. Click **Edit**. You will be able to:
  * Edit your list info (name and description).
  * If you have entries in your list, you can delete these entries.
  * Delete the list.
1. Once you’ve edited your list, click **Save**.