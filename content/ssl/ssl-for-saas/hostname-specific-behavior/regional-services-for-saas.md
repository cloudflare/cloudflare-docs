---
pcx-content-type: concept
title: Regional Services for SaaS
weight: 2
---

# Regional Services for SaaS

By default, Cloudflare routes customer traffic through the closest data center. This maximizes speed regardless of geographic location. However, this can route traffic through a different country than where the request was made. You may want to maintain regional control over your data because of end-customer agreements. Cloudflare offers Regional Services for SaaS to give you the ability to accommodate regional restrictions while still using Cloudflare’s global edge network.

---

## Prerequisites

Prior to enabling Regional Services for SaaS:

* Ensure you have access to [SSL for SaaS](/ssl/ssl-for-saas/#availability).

* If you have 10 or more unique origins, ensure your [fallback origin](/ssl/ssl-for-saas/getting-started/#step-1--create-fallback-origin-and-cname-target).

* [Ensure that **Always Use HTTPS** is enabled](/ssl/edge-certificates/additional-options/always-use-https/).

---

## Step 1 - Create a Spectrum application

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and navigate to your account and website.

2. Select **Spectrum**.

3. If this is your first time using Spectrum, the **Create an Application** modal appears. Otherwise, select **Create an Application**.

4. Select *HTTPS* as the application type. Regional Services only works over HTTPS. 

5. Under **Domain**, enter the domain that will use Spectrum. The domain associated here is where all custom hostnames are going to point.

6. Choose the appropriate [type of IP addresses for your subdomain](https://www.cloudflare.com/learning/dns/glossary/what-is-my-ip-address/).

7. Under **Edge Port**, input *443*.

8. Under **Origin**, select **Origin IP or DNS record**. Input your origin IP and port. You must use a [custom origin](/ssl/ssl-for-saas/hostname-specific-behavior/custom-origin/) when using Regional Services for SaaS. It is not compatible with the fallback origin.

{{<Aside type="note">}}
You cannot enable  **Edge TLS Termination** or **IP Access Rules** while using HTTPS.
{{</Aside>}}

9. Select **Submit** to finish the application.

## Step 2 - Add custom hostnames to Spectrum Application

### For 10 or more unique origins:

1. Navigate to **SSL/TLS** > **Custom hostnames**.

2. If you are creating a new custom hostname, select **Add Custom Hostname**. Otherwise, select the custom hostname that you want to use and select **Edit**.

3. Point each custom hostname to the Spectrum app by selecting **Custom origin server** and inputting the origin.

4. If you are creating a new custom hostname, select **Add Custom Hostname** and follow the instructions to [verify custom hostname](/ssl/ssl-for-saas/common-tasks/hostname-verification/). Otherwise, select **Save**.

6. Navigate to **DNS** in the left sidebar.

7. Select **Add Record** and select *CNAME* from the **Type** dropdown.

8. Input the custom hostname under **Name**.

9. Input your Spectrum app custom origin under **Target** and select **Save**.

### For less than 10 unique origins:

1. Navigate to **DNS** in the left sidebar.

2. Select **Add Record** and select *CNAME* from the **Type** dropdown.

3. Input the custom hostname under **Name**.

4.  Input your Spectrum app custom origin under **Target** and select **Save**.
