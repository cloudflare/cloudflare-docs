---
title: Manage via the Cloudflare UI
order: 45
---

# Manage via the Cloudflare UI

Before enabling **Cloudflare Logpush**, make sure that you have already configured a destination in your cloud service.

<Aside type="info" header="Info">

Learn  how to set up a destination for:

* [Amazon S3](/logpush/aws-s3/)
* [Google Cloud Storage](/logpush/google-cloud-storage/)
* [Microsoft Azure](/logpush/azure/)
* [Sumo Logic](/logpush/sumo-logic/)

</Aside>

To enable the Clouflare Logpush service:

1. Log in to the Cloudflare dashboard

2. Ensure the Enterprise domain you want to use with Logpush is selected

3. Select the **Analytics** app in the top menu

4. Select the **Logs** section in the secondary menu

5. Select **Connect a service**. A modal window opens where you will need to complete several steps

6. Under **Select service**, pick your cloud service provider and click **Next**

7. Complete the steps below based on your provider, then continue to *step 8*

   * For **Amazon S3**, enter or select the following:
     * **Bucket path**
     * **Daily subfolders**
     * **Bucket region**
     * **Encryption constraint in bucket policy**
     * For **Grant Cloudflare access to upload files to your bucket**, make sure your bucket has a policy (if you did not add it already):
        * Copy the JSON policy, then go to your bucket in the Amazon S3 console and paste the policy in **Permissions** > **Bucket Policy** and click **Save**

   * For **Google Cloud Storage**, enter or select the following:
     * **Bucket path**
     * **Daily subfolders**
     * For **Grant Cloudflare access to upload files to your bucket**, make sure your bucket has a Cloudflare IAM user (if you did not add it already):
       * See *step 2* in [Enable Google Cloud Storage](/logpush/google-cloud-storage/)

   * For **Microsoft Azure**, enter or select the following:
     * **SAS URL**
       * See [Enable Microsoft Azure](/logpush/azure/) for instructions on creating this URL
     * **Blob container subpath (optional)**
     * **Daily subfolders**

   * For **Sumo Logic**, enter or select the following:
     * **HTTP Source Address**
       * See [Enable Sumo Logic](/logpush/sumo-logic/) for instructions on getting this address

8.  In the Cloudflare dashboard, click **Validate access**

9.  Follow the on-screen instructions to enter the **Ownership token** (included in a file or log Cloudflare sends to your provider), then click **Prove ownership**

<Aside type="note" header="Note">

Tips for seeing the token:

* **Amazon S3**: click the **Open** button in the **Overview** tab of the ownership challenge file
* **Microsoft Azure**: use the **Storage Explorer** feature to navigate to and open the file
* **Sumo Logic**: use the [Live Tail](https://help.sumologic.com/05Search/Live-Tail/About-Live-Tail) feature to see your log containing the token as soon as it's received

</Aside>

10. Next in the **Customize log** screen, select the data set in which you're interested (currently `HTTP requests` or `Spectrum events`). You can keep the default fields to include in your log or make changes. You can add or remove fields at a later time by modifying your settings in **Logs** > **Logpush** (select the wrench icon).

11. To finish enabling Logpush, click **Save and Start Pushing**

Once connected, Cloudflare lists the provider you just configured under **Logs** > **Logpush**. This is where you can make changes or remove the provider.