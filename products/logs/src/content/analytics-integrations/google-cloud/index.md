---
title: Google Cloud
order: 100
---

# Google Cloud

## Overview

This tutorial covers how to configure certain Google Cloud Platform (GCP) components so that you can analyze your Cloudflare Logs data.

Before proceeding, you need to enable [Cloudflare Logpush in Google Cloud Storage](/logpush/google-cloud-storage/) to ensure your log data is available for analyzing.

The components we'll use in this tutorial include:

- **Google Cloud Function** to import logs from Google Cloud Storage to Google BigQuery
- **Google BigQuery** to make log data available to the reporting engine, and
- **Google Data Studio** to run interactive reports

The following diagram depicts how data flows from Cloudflare Logs through the different components of the Google Cloud Platform discussed in this tutorial.

![Cloudflare Logs data to Google Cloud Platform](../../static/images/cf-logpush-to-google-cloud-platform.png)

<Aside type="info" header="Info">

Google Cloud is offering a credit towards a new Google Cloud account to help you get started. To learn more, visit [Google Cloud Platform Partner Credit](https://cloud.google.com/partners/partnercredit/?PCN=a0n60000003kp9MAAQ).
</Aside>

## Task 1 - Use Google Cloud Function to import log data into Google BigQuery

After you configured Cloudflare Logpush to send your logs to a Google Cloud Storage bucket, your log data updates every five minutes by default.

Google BigQuery makes data available for both querying using Structured Query Language (SQL) and for configuring as a data source for the Google Data Studio reporting engine. BigQuery is a highly scalable cloud database where SQL queries run quite fast.

Importing data from Google Cloud Storage into Google BigQuery requires creating a function using Google Cloud Function and running it in the Google Cloud Shell. This function triggers every time new Cloudflare log data is uploaded to your Google Cloud Storage bucket.

### Clone and deploy a Google Cloud Function

To a create a cloud function to import data from Google Cloud Storage into Google BigQuery, you will need the following GitHub repository from Cloudflare: https://github.com/cloudflare/GCS-To-Big-Query.

To clone and deploy the cloud function:

1. Run the Google Cloud Platform shell by opening the **Google Cloud Platform** console and clicking the **Google Shell** icon (_Activate Cloud Shell_).

2. Run the following command to download the _master_ zipped archive, uncompress the files to new a directory, and change the command line prompt to the new directory: `curl -LO "https://github.com/cloudflare/cloudflare-gcp/archive/master.zip" && unzip master.zip && cd cloudflare-gcp-master/logpush-to-bigquery`

3. Next, edit the `deploy.sh` file and make sure that:

- **BUCKET_NAME** is set to the bucket you created when you configured Cloudflare Logpush with Google Cloud Platform.

- **DATASET** and **TABLE** are unique names.

  The contents of `deploy.sh` should look similar to this:

  ```bash
  .
  .
  .
  BUCKET_NAME="my_cloudflarelogs_gcp_storage_bucket"
  DATASET="my_cloudflare_logs"
  TABLE="cloudflare_logs"
  .
  .
  .
  ```

4. Then in the **Google Shell**, run the following command to deploy your instance of the cloud function:

    ```bash
    sh ./deploy.sh
    ```

Once you've deployed your new cloud function, verify that it appears in the **Cloud Functions** interface by navigating to **Google Cloud Platform** > **Compute** > **Cloud Functions**.

Also, verify that the data now appears in your table in **BigQuery** by navigating to the appropriate project in **Google Cloud Platform** > **Big Data** > **BigQuery**.

If everything is configured correctly, you can now query any request or visualize data with Google Data Studio or any other analytics tool that supports BigQuery as an input source.

## Task 2 - Analyze log data with Google Data Studio

To analyze and visualize logs, you can use **Google Data Studio** or any other 3rd party services that supports Google BigQuery as an input source.

With Google Data Studio, you can generate graphs and charts from a Google BigQuery table. You can also refresh the data in your reports and get real-time analytics.

### About the Cloudflare Logs Insights Template

Cloudflare has published a [Logs Insights Template](https://datastudio.google.com/u/0/reporting/1ez3m7Yf8AZLfM6aYRjfgF0pPpRvOwhTh/page/mAzI/preview) in the **Google Data Studio Report Gallery**.

![Cloudflare Logs Insights Template on Google Data Studio Gallery](../../static/images/cf-logs-insights-template.png)

The Cloudflare Insights Template features several dashboards, or report pages, to help you analyze your Cloudflare Logs data. You can also use filters within the dashboards to narrow down the analysis by date and time, device type, country, user agent, client IP, hostname, and more. These insights further help with debugging and tracing.

The following dashboards are included in the Insights template:

- **Snapshot**: Gives you an overview of the most important metrics from your Cloudflare logs, including total number of requests, top visitors by geography, IP, user agent, traffic type, total number of threats, and bandwidth usage.

- **Security**: Provides insights on threat identification and mitigations by our **Web Application Firewall**, including **Firewall Rules**, **Rate Limiting**, and **IP Firewall**. Metrics include total threats stopped, threat traffic source, blocked IPs and user agents, top threat requests, Firewall events (SQL injections, XSS, etc.), and rate limiting. Use this data to fine tune the firewall to target obvious threats and avoid false positives.

- **Performance**: Helps you identify and address issues like slow pages and caching misconfigurations. Metrics include total vs. cached bandwidth, cache ratio, top uncached requests, static vs. dynamic content, slowest URIs, and more.

- **Reliability**: Provides insights on the availability of your websites and applications. Metrics include origin response error ratio, origin response status over time, percentage of 3xx/4xx/5xx errors over time, and more.

### Create a report based on the Insights Template

To create a report for your log data based on the Cloudflare template:

1. In Data Studio, open the Cloudflare [template](https://datastudio.google.com/u/0/reporting/1ez3m7Yf8AZLfM6aYRjfgF0pPpRvOwhTh/page/mAzI/preview) and click **Use Template**. A _Create new report_ dialog opens.

2. Under the **New Data Source** dropdown, select **Create New Data Source**. A page opens where you can enter additional configuration details.

3. Under **Google Connectors**, locate the **BigQuery** card and click **Select**.

4. Next under **MY PROJECTS**, select your **Project**, **Dataset**, and **Table**.

5. Click **Connect** in the upper right.

6. In the list of Cloudflare Logs fields, locate _EdgeStartTimestamp_, click the three vertical dots and select **Duplicate**. This creates _Copy of EdgeStartTimestamp_ right below _EdgeStartTimestamp_.

7. Update the **Type** for _Copy of EdgeStartTimestamp_ to set it to _Date & Time_ > _Date Hour (YYYYMMDDHH)_.

8. Next, update the **Type** for each of the following fields as indicated below:

<table style="border: solid 2px darkgrey; width: 100%;">
    <thead style="background: #ffeadf;">
        <tr>
            <th>Cloudflare Log Field</th>
            <th>Type</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>ZoneID</td>
            <td>Text</td>
        </tr>
        <tr>
            <td>EdgeColoID</td>
            <td>Text</td>
        </tr>
        <tr>
            <td>ClientSrcPort</td>
            <td>Text</td>
        </tr>
        <tr>
            <td>EdgeResponseStatus</td>
            <td>Number</td>
        </tr>
        <tr>
            <td>EdgeRateLimitID</td>
            <td>Text&nbsp;</td>
        </tr>
        <tr>
            <td>
                <div>
                    <div>Copy of EdgeStartTimestamp</div>
                </div>
            </td>
            <td>Date &amp; Time &gt; Date Hour (YYYYMMDDHH)</td>
        </tr>
        <tr>
            <td>OriginResponseStatus</td>
            <td>Number</td>
        </tr>
        <tr>
            <td>ClientASN</td>
            <td>Text</td>
        </tr>
        <tr>
            <td>ClientCountry</td>
            <td>Geo &gt; Country</td>
        </tr>
        <tr>
            <td>CacheResponseStatus</td>
            <td>Text</td>
        </tr>
    </tbody>
</table>

9. Next, add a new field to identify and calculate threat. In the top right corner, click **+ ADD A FIELD**, then in the add field UI:
   _ For **Field Name**, type *Threats*.
   _ In the **Formula** text box, paste the following code:

   ```bash
   CASE
   WHEN EdgePathingSrc = "user" AND EdgePathingOp = "ban" AND EdgePathingStatus = "ip" THEN "ip block"
   WHEN EdgePathingSrc = "user" AND EdgePathingOp = "ban" AND EdgePathingStatus = "ctry" THEN "country block"
   WHEN EdgePathingSrc = "user" AND EdgePathingOp = "ban" AND EdgePathingStatus = "zl" THEN "routed by zone lockdown"
    WHEN EdgePathingSrc = "user" AND EdgePathingOp = "ban" AND EdgePathingStatus = "ua" THEN "blocked user agent"
   WHEN EdgePathingSrc = "user" AND EdgePathingOp = "ban" AND EdgePathingStatus = "rateLimit" THEN "rate-limiting rule"
    WHEN EdgePathingSrc = "bic" AND EdgePathingOp = "ban" AND EdgePathingStatus = "unknown" THEN "browser integrity check"
   WHEN EdgePathingSrc = "hot" AND EdgePathingOp = "ban" AND EdgePathingStatus = "unknown" THEN "blocked hotlink"
   WHEN EdgePathingSrc = "macro" AND EdgePathingOp = "chl" AND EdgePathingStatus = "captchaFail" THEN "CAPTCHA challenge failed"
   WHEN EdgePathingSrc = "macro" AND EdgePathingOp = "chl" AND EdgePathingStatus = "jschlFail" THEN "java script challenge failed"
   WHEN EdgePathingSrc = "filterBasedFirewall" AND EdgePathingOp = "ban" AND EdgePathingStatus = "unknown" THEN "blocked by filter based firewall"
   WHEN EdgePathingSrc = "filterBasedFirewall" AND EdgePathingOp = "chl" THEN "challenged by filter based firewall"
   Else "Other"
   END
   ```
   \* Click **Save** in the lower right corner.

10. Finally, add another new field for grouping status error codes. In the top right corner, click **+ ADD A FIELD**, then in the add field UI:
    _ For **Field Name**, type *EdgeResponseStatus_Class*.
    _ In the **Formula** text box, paste the following code:

    ```bash
    CASE
    WHEN EdgeResponseStatus > 199 AND EdgeResponseStatus < 300 THEN "2xx"
    WHEN EdgeResponseStatus > 299 AND EdgeResponseStatus < 400 THEN "3xx"
    WHEN EdgeResponseStatus > 399 AND EdgeResponseStatus < 500 THEN "4xx"
    WHEN EdgeResponseStatus > 499 AND EdgeResponseStatus < 600 THEN "5xx"
    WHEN EdgeResponseStatus = 0 THEN "0 - Served from CF Edge"
    Else "Other"
    END
    ```

- Click **Save** in the lower right corner.

11. To finish, click **Add to Report** in the upper right.

### Refreshing fields and filters manually

After you've added your report, you will notice that not all report components render successfully. To fix this, you need to resolve any errors related to invalid dimensions, metrics, or filters that appear in the affected report components.

#### Fix invalid metric or dimension errors

The following table summarizes which specific components require to be fixed:

<table style="border: solid 2px darkgrey; width: 100%;">
<thead style="background: #ffeadf;">
<tr>
<th>Report page</th>
<th>Components</th>
<th>Field to add</th>
</tr>
</thead>
<tbody>
<tr>
<td rowspan="3">2 Security Cloudflare&nbsp;</td>
<td>
<p><em>Threats </em>(scorecard)</p>
</td>
<td>&nbsp;Threats (Metric)</td>
</tr>
<tr>
<td>
<p><em>Threats - Record Count (table)</em></p>
</td>
<td>&nbsp;Threats (Dimension)</td>
</tr>
<tr>
<td>&nbsp;<em>Threats Over Time&nbsp;</em>(area chart)</td>
<td>&nbsp;Threats (Breadown Dimension)</td>
</tr>
<tr>
<td>3 Reliability Cloudflare</td>
<td><em>Status Codes Last 24 hours&nbsp;</em>(bar chart)</td>
<td><em>Copy of EdgeStartTimeStamp&nbsp;</em>(Dimension)</td>
</tr>
<tr>
<td>5&nbsp;Last 100s Requests Cloudflare</td>
<td><em>Last 100 Requests</em> (table)</td>
<td>&nbsp;<em>Copy of EdgeStartTimeStamp</em></td>
</tr>
</tbody>
</table>

For each of the report components listed above:

1. Select the report component affected.

2. On the menu to the right, under the **Data** tab, locate and click **Invalid Dimension** or **Invalid Metric** (as applicable). The **Field Picker** panel opens.

3. Search or type for the field to add, then click to select it.

4. To finish, click away from the panel to return to the main report.

The component should now render correctly.

#### Update data filters

This fix applies to report page: **3 Reliability Cloudflare**, for the following scorecard components in the report:

- **5xx Errors**
- **4xx Errors**
- **3xx Errors**

To update the filter associated with each scorecard:

1. Select the report component affected.

2. On the menu to the right, under the **Data** tab, locate the **Filters** > **Scorecard Filter** section and click the **pencil** next to the filter name to edit it. The **Edit Filter** panel opens.

3. In the filtering criteria section, click the dropdown and scroll or search for the field _EdgeResponseStatusClass_ and select it.

4. To finish, click **Save** in the lower right corner.

The component should now render correctly.
