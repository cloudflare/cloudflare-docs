---
pcx_content_type: reference
title: Run Speed test
weight: 2
---

# Run Speed test

## Run Synthetic test

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.

2. Go to **Speed** > **Speed Test**, and enter the URL, subdomain or path you want to test. Then, select **Run test**. 

3. After the test finishes running, you will get a Lighthouse score and you will have access to the list of the tests run. The test result page will give you details regarding the performance of your website, both for the desktop and mobile versions. Refer to [Understand test results](/fundamentals/speed/speed-test/test-results/) for more information.

4. (Optional) Cloudflare Speed might show you a **Recommendation** section, depending on the results from testing your website. **Recommendation** gives you information on Cloudflare features or products that will help you improve the performance of your website.

## Enable real user monitoring (RUM)

Once a speed test has been run, you can enable RUM data in the test results page:

1. In **Real user measurements**, select **Enable Rum for free**. You can always manage your website preferences in the **Web Analytics** section in the dashboard which also uses RUM data.

2. Once RUM data is running on your site, you can access **Real user measurements** on your test results page. Usually it takes less than five minutes to see the data coming in, but it will depend on traffic.

Refer to [Understand test results](/fundamentals/speed/speed-test/test-results/) for more information about the results provided by real user data.

## Quotas

Quota limits for the number of tests you can run per month are currently the following:

Plan | Number of tests
---- | ----
Free | 5
Pro  | 10
Business | 20
Enterprise | 50