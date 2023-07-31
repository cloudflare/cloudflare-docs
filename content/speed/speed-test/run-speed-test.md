---
pcx_content_type: reference
title: Run test
layout: list
weight: 2
---

# Run test

{{<content-column>}}

## Run Synthetic test

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.

2. Go to **Speed** > **Observatory**.

3. Enter the URL you want to test. The URL must belong to the zone you are testing from.

4. Select the **Region** the automated browser will use.

5. Then, you can select, depending on your plan, **Run test once**, **Run daily test** or **Run weekly test**. Refer to the [Quotas](/speed/speed-test/run-speed-test/#quotas) section for information on the test frequency available for your plan.

6. After the test finishes running, you will get a Lighthouse score and you will have access to the list of the tests run. The test result page will give you details regarding the performance of your website, both for the desktop and mobile versions. Refer to [Understand test results](/speed/speed-test/test-results/) for more information.

{{<Aside type="note">}}

Cloudflare Observatory tests are generated with the following user agents:

- Mozilla/5.0 (Linux; Android 11; Moto G Power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Mobile Safari/537.36
- Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36

Cloudflare Observatory tests originate from ASN 15169.

{{</Aside>}}

### Recommendations

Observatory shows you a **Recommendations** tab, depending on the results from testing your website. The **Recommendations** section shows you the opportunities to improve your website that were identified based on the Lighthouse audits and recommends Cloudflare features or products that will help you improve those metrics. We also show you the potential savings you will get by enabling the recommended features or products.

### Trend and History report

In the Tested URLs table, in the last column, you can select the three dots > **View history report**, and you will have access to the **Trend** table that will show your website’s performance metrics over time and a **History report** of all the tests you run on your website.

## Enable real user monitoring (RUM)

Once a test has been run, you can enable RUM data in the test results page:

1. In **Real user measurements**, select **Enable Rum for free**. You can always manage your website preferences in the **Web Analytics** section in the dashboard which also uses RUM data.

2. Once RUM data is running on your site, you can access **Real user measurements** on your test results page. Usually it takes less than five minutes to see the data coming in, but it will depend on traffic.

Refer to [Understand test results](/speed/speed-test/test-results/) for more information about the results provided by real user data.

### Information collected

RUM uses a lightweight JavaScript beacon to collect the information Observatory uses. It does not use any client-side state, such as cookies or `localStorage`, to collect usage metrics.

## Quotas

Quota limits for the number of tests you can run per month are currently the following:

{{</content-column>}}

{{<table-wrap style="font-size: 87%">}}

<table>
  <tr>
    <th>Plan</th>
    <th>Number of one-off tests</th>
    <th>Number of recurring tests</th>
    <th>Frequency of recurring tests</th>
    <th>Regions</th>
  </tr>
  <tr>
    <td>Free</td>
    <td>5</td>
    <td>1</td>
    <td>Weekly</td>
    <td>Iowa, USA</td>
  </tr>
  <tr>
    <td>Pro</td>
    <td>10</td>
    <td>5</td>
    <td>Daily</td>
    <td rowspan="3">Everything in Free and <br> - South Carolina, USA <br> - North Virginia, USA <br> - Dallas, USA <br> - Oregon, USA <br> - Hamina, Finland <br> - Madrid, Spain <br> - St. Ghislain, Belgium <br> - Eemshaven, Netherlands <br> - Milan, Italy <br> - Paris, France <br> - Changhua County, Taiwan <br> - Tokyo, Japan <br> - Osaka, Japan <br> - Tel Aviv, Israel <br> - London, England <br> - Jurong West, Singapore <br> - Sydney, Australia <br> - Frankfurt, Germany <br> - Mumbai, India <br> - São Paulo, Brazil</td>
  </tr>
  <tr>
    <td>Business</td>
    <td>20</td>
    <td>10</td>
    <td>Daily</td>
  </tr>
  <tr>
    <td>Enterprise</td>
    <td>50</td>
    <td>15</td>
    <td>Daily</td>
  </tr>
</table>

{{</table-wrap>}}