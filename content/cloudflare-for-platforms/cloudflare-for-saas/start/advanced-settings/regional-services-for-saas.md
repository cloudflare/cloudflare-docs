---
pcx_content_type: concept
title: Regional Services for SaaS
weight: 2
---

# Regional Services for SaaS

By default, Cloudflare routes customer traffic through the closest data center. This maximizes speed regardless of geographic location. However, this can route traffic through a different country than where the request was made. You may want to maintain regional control over your data because of end-customer agreements. Cloudflare offers Regional Services for SaaS to give you the ability to accommodate regional restrictions while still using Cloudflare’s global edge network.

---

## Prerequisites

Prior to enabling Regional Services for SaaS:

* Ensure you have access to [Cloudflare for SaaS](/cloudflare-for-saas/#availability).

* If you have 10 or more unique origins, ensure your [fallback origin](/cloudflare-for-saas/start/getting-started/#step-1--create-fallback-origin-and-cname-target) is set up.

* Ensure that [Always Use HTTPS](/ssl/edge-certificates/additional-options/always-use-https/) is enabled.

* You must have [access to a custom origin](/cloudflare-for-saas/start/advanced-settings/custom-origin). Using Cloudflare's default fallback origin for Regional Services will lead to an error.

---

## Step 1 - Create a Spectrum application

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and navigate to your account and website.

2. Select **Spectrum**.

3. If this is your first time using Spectrum, the **Create an Application** modal appears. Otherwise, select **Create an Application**.

4. Select *HTTPS* as the application type. Regional Services only works over HTTPS. 

5. Under **Domain**, enter the domain that will use Spectrum. The domain associated here is where all custom hostnames are going to point.

6. Choose the appropriate type of IP addresses for your subdomain.

7. Under **Edge Port**, enter *443*.

8. Under **Origin**, select **Origin IP or DNS record**. Enter your custom origin IP and port. 

{{<Aside type="note">}}
You cannot enable **Edge TLS Termination** or **IP Access Rules** while using HTTPS.
{{</Aside>}}

9. Select **Submit** to finish the application.

---

## Step 2 - Add custom hostnames to Spectrum Application

### For 10 or more unique origins:

1. Navigate to **SSL/TLS** > **Custom Hostnames**.

2. If you are creating a new custom hostname, select **Add Custom Hostname**. Otherwise, select the custom hostname that you want to use and select **Edit**.

3. Point each custom hostname to the Spectrum app by selecting **Custom origin server** and inputting your origin.

4. If you are creating a new custom hostname, select **Add Custom Hostname** and follow the instructions to [verify custom hostname](/cloudflare-for-saas/domain-support/hostname-verification/). Otherwise, select **Save**.

6. Navigate to **DNS**.

7. Select **Add Record** and select *CNAME* from the **Type** dropdown.

8. Under **Name**, enter the custom hostname.

9. Under **Target**, enter your Spectrum app custom origin and select **Save**.

### For less than 10 unique origins:

1. Navigate to **DNS**.

2. Select **Add Record** and select *CNAME* from the **Type** dropdown.

3. Under **Name**, enter your custom hostname.

4. Under **Target**, enter your Spectrum app custom origin and select **Save**.
