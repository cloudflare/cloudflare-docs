---
pcx-content-type: how-to
title: Handle redirects with Bulk Redirects
---

# Handle redirects with Bulk Redirects

In this tutorial, you will learn how to use [Bulk Redirects (beta)](/rules/bulk-redirects/) to handle redirects that surpasses the 1,100 redirect rules limit set by Pages. A [`_redirects`](/pages/platform/limits/#redirects) file has a maximum of 2,000 static redirects and 100 dynamic redirects, for a combined total of 2,100 redirects.

{{<Aside type="Note">}}

The redirects defined in the `_redirects` file of your build folder can work together with your Bulk Redirects. In case of duplicates, Bulk Redirects will run in front of your Pages project, where your other redirects live.

For example, if you have Bulk Redirects set up to direct `abc.com` to `xyz.com` but also have `_redirects` set up to direct `xyz.com` to `foo.com`, a request for `abc.com` will eventually redirect to `foo.com`.

{{</Aside>}}

To use Bulk Redirects, log in to the [Cloudflare dashboard](https://dash.cloudflare.com?to=/:account/:zone/rules) > **Rules** > **Bulk Redirects**.

![Bulk redirects option](../media/bulk_redirects_option.png)

In **Bulk Redirects**, select **Create a new Bulk Redirects list**.

![Create a new Bulk redirects list](../media/create_a_new_bulk_redirect_list.png)

Create a new list, and in the content type, select **Redirect**. You will be prompted to add your redirect **Source URL** and **Target URL**. You can also specify the **Status** code for each redirect.

{{<Aside type="note">}}

You can upload a CSV file of all your redirects. However, your redirects cannot be a relative path.

{{</Aside>}}

If you set the **Source URL** to `https://www.example.dev/examples` and the **Target URL** to `https://www.example.dev/pages/examples` with a status code of `301`, whenever the **Source URL** is requested, it will be permanently redirected to the **Target URL**.

After this, go back to **Bulk Redirects** > **Create Bulk Redirects** > set a **Rule name** > and select the desired list.

![Create a new Bulk redirects](../media/create_new_bulk_redirect.png)

Finally, select **Save and deploy** and wait a few seconds for your rule to propagate.
