---
order: 45
pcx-content-type: how-to
---

# Manage via the Cloudflare UI

Before enabling **Cloudflare Logpush**, make sure that you have already configured a destination in your cloud service.

<Aside type="info" header="Info">

Learn how to set up a destination for:

* [Amazon S3](/get-started/enable-destinations/aws-s3/)
* [S3-compatible endpoints](/get-started/enable-destinations/s3-compatible-endpoints/)
* [Datadog](/get-started/enable-destinations/datadog/)
* [Google Cloud Storage](/get-started/enable-destinations/google-cloud-storage/)
* [Microsoft Azure](/get-started/enable-destinations/azure/)
* [Splunk](/get-started/enable-destinations/splunk/)
* [Sumo Logic](/get-started/enable-destinations/sumo-logic/)

</Aside>

To enable the Cloudflare Logpush service:

1. Log in to the Cloudflare dashboard.

2. Select the Enterprise domain you want to use with Logpush.

3. Go to **Analytics** > **Logs**.

4. Click **Connect a service**. A modal window opens where you will need to complete several steps.

5. Select the data set you want to push to a storage service.

6. Select the data fields to include in your logs. You can add or remove fields later by modifying your settings in **Logs** > **Logpush**.

7. Select your cloud storage service or analytics provider.

8. Complete the steps below based on your provider.

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
       * See *step 2* in [Enable Google Cloud Storage](/get-started/enable-destinations/google-cloud-storage/)

   * For **Microsoft Azure**, enter or select the following:
     * **SAS URL**
       * See [Enable Microsoft Azure](/get-started/enable-destinations/azure/) for instructions on creating this URL
     * **Blob container subpath (optional)**
     * **Daily subfolders**

   * For **Sumo Logic**, enter or select the following:
     * **HTTP Source Address**
       * See [Enable Sumo Logic](/get-started/enable-destinations/sumo-logic/) for instructions on getting this address

9. In the Cloudflare dashboard, click **Validate access**.

10. Enter the **Ownership token** (included in a file or log Cloudflare sends to your provider) and click **Prove ownership**.
    *  Tips for seeing the token:
       *  **Amazon S3**: click the **Open** button in the **Overview** tab of the ownership challenge file
       *  **Microsoft Azure**: use the **Storage Explorer** feature to navigate to and open the file
       *  **Sumo Logic**: use the [Live Tail](https://help.sumologic.com/05Search/Live-Tail/About-Live-Tail) feature to see your log containing the token as soon as it's received

11. Click **Save and Start Pushing** to finish enabling Logpush.

Once connected, Cloudflare lists the provider you configured under **Logs** > **Logpush**. This is where you can make changes or remove the provider.
