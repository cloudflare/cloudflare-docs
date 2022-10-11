---
pcx_content_type: how-to
title: Create import jobs
weight: 2
---

# Create import jobs

You can add many import jobs to import images to Image Resizing, either by selecting an already defined source or by creating a new one. If you select an existing source to create a different import job, you will not need to enter your credentials again.

To add a new import job:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Go to **Images** > **Sourcing Kit**.
3. Select **Import images**.
4. Select the source you want as the base for the new import job, and select **Next**.
5. In **Basic rules** define the Amazon S3 path to import your images from, and the path you want to copy your images to in your Cloudflare Images account. This is optional, and you can leave these fields blank.
6. On the same page, in **Overwrite images**, you need to choose what happens when the files in your source change. The recommended action is to copy the new images and overwrite the old ones on your Cloudflare Images account. You can also choose to skip the import, and keep what you already have on your Cloudflare Images account. 
7. Select **Next**.
8. Review and confirm the information regarding the import job you created. Select **Start importing** to start importing images from your source.