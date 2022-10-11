---
pcx_content_type: how-to
title: Enable Sourcing kit
weight: 1
---

# Enable Sourcing Kit

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Go to **Images** > **Sourcing Kit**.
3. Select **Import images** to create your first import job.
4. Name your source, and configure your Amazon S3 credentials here. This is required for Cloudflare Images to be able to connect to your source and import your images. Refer to [Amazon S3 credentials](/images/cloudflare-images/sourcing-kit/amazon-credentials) to learn more about how to set up credentials. Select **Next** when you are finished.
5. Create the rules for this job, such as the path to import your images from, and the path to copy your images to in your Cloudflare Images account. This is optional, and you can leave these fields blank.
6. On the same page, you need to choose what happens when the files in your source change. The recommended action is to copy the new images and overwrite the old ones on your Cloudflare Images account. You can also choose to skip the import, and keep what you already have on your Cloudflare Images account. Select **Next**.
7. Review all the information regarding the import job you created. Select **Start importing** to start importing images from your source.

Your import job is now created. You can review the job status on the Sourcing Kit main page. It will show you information such as how many objects it found, how many images were imported and any errors that might have occurred.

{{<Aside type="note">}}
Sourcing Kit will warn you when you are about to reach the limit for your plan space quota. When you exhaust the space available in your plan, the importing jobs will be aborted. If you see this warning on Sourcing Kit’s main page, select **View plan** to change your plan’s limits.
{{</Aside>}}

## Next steps

You can create another import job from the main page of Cloudflare Images Sourcing Kit by selecting **Import images**. From here, you can select a source you have already configured or **Define a new source** to import images from a new source.