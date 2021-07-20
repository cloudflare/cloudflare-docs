---
order: 0
pcx-content-type: tutorial
---

# Getting started

--------

## Configure zone with proxy fallback origin
The fallback origin is where the traffic of your Custom Hostnames will be routed to. The fallback record is the value of the DNS record you set up via step 2.

1. Sign up your desired zone at [www.cloudflare.com](https://www.cloudflare.com) and select the Free plan.
1. Click **DNS**.
1. Add a DNS record pointing to the origin IP address (fallback origin) for Cloudflare to send custom hostname traffic. This hostname is not provided to customers. Name the hostname according to your naming convention. For example: `proxy-fallback.saasprovider.com`.
3. Set up an additional DNS CNAME record to serve as the CNAME target for your end customers. CNAME this record to your fallback origin and use a more user-friendly CNAME target for customers. This record can optionally be a wildcard, e.g. `*.customers.saasprovider.com`.
![Add a CNAME record](..//static/ssl-for-saas-dns.png)
4. Upgrade your zone to an Enterprise plan and contact your Customer Success Manager to enable **SSL for SaaS Certificates**.
5. Set the **Fallback Origin** via either the dashboard or API.
    * Via the dashboard: Go to **SSL/TLS** > **Custom Hostnames**, add your fallback origin defined in step 2 above, and click **Add**.
    ![Add a fallback origin on dashboard](..//static/ssl-for-saas-add-fallback.png)

    * Via API: Retrieve your [Global API Key and Zone ID](#api-key-and-zone-id). Then, set the fallback origin via API (change `proxy-fallback.saasprovider.com` to the fallback origin record you configured in Cloudflare DNS):

        ```bash
        $ curl -XPUT \
        "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/custom_hostnames/fallback_origin"\
        -H "X-Auth-Email: {email}" -H "X-Auth-Key: {key}"\
        -H "Content-Type: application/json"\
        -d '{"origin":"proxy-fallback.saasprovider.com"}'
        ```

--------

## Certificate Validation vs Hostname Verification
Each Custom Hostname requires successful Certificate Validation and Hostname Verification.

* [Certificate Validation](../certificate-validation-methods): Upon successful validation, the certificates are deployed to Cloudflare’s edge network.
* [Hostname Verification](../hostname-verification/): Upon successful validation, Cloudflare proxies traffic for this hostname.

[Create Custom Hostnames via the custom_hostnames API endpoint](https://api.cloudflare.com/#custom-hostname-for-a-zone-create-custom-hostname).

--------

## API key and zone ID

Your API key can be found in the Cloudflare dashboard under ‘My Profile → API Tokens → Global API Key’.

![Accessing an account’s Global API Key](..//static/accessing-global-api-key.png)

The zone tag and API key can also be found in the **Overview** tab of the dashboard:

![Obtaining a zone’s ID](..//static/obtaining-zone-id.png)

Additionally, you can retrieve a list of user’s zones and their associated IDs via an API call. List all zones for a user: https://api.cloudflare.com/#zone-list-zones.

--------

## Issuing your first certificate

Once your account has been provisioned, you are ready to issue certificates. The call below will provision a request for certificates to be issued for `app.customer.com`, which represents your end customer.

In this example, HTTP based validation is used ("method":"http") to issue this certificate. This requires HTTP traffic to be proxied through Cloudflare’s edge already, i.e., the CNAME from `app.customer.com` must be [in place for your zone](#setting-cname-at-customer-domain)). If the CNAME is not yet in place, Cloudflare will ask its CA partner to retry until the request can be completed; see the [Validation Backoff Schedule](/ssl-for-saas/validation-backoff-schedule/) for specific timings.

```bash
$ curl -XPOST "https://api.cloudflare.com/client/v4/zones/:zone_id/custom_hostnames"\
       -H "X-Auth-Email: {email}" -H "X-Auth-Key: {key}"\
       -H "Content-Type: application/json"\
       -d '{"hostname":"app.customer.com", "ssl":{"method":"http","type":"dv"}}'
```

Note that it’s possible to serve these HTTP records from your own web servers, in advance of placing the CNAME. The payload returned includes the path where the CA will look for the challenge along with the body that should be returned.

Alternatively, you may also issue certificates to custom hostnames via the dashboard: 
1. Navigate to **SSL/TLS** > **Custom Hostnames** and click **Add Custom Hostname**.
1. Add your customer's hostname `app.customer.com` and set the relevant options, including:
    - Choosing the [Validation method](../certificate-validation-methods).
    - Whether you want to **Enable wildcard**, which adds a `*.<custom-hostname>` SAN to the custom hostname certificate. For more details, see [Hostname priority](/ssl-tls/certificate-and-hostname-priority#hostname-priority).
1. Click **Add Custom Hostname**.
1. You will be brought back to the previous screen, which will show “Pending” before it changes to “Active” within 5 minutes. If you see an error stating “custom hostname does not CNAME to this zone”, you need to [set the DNS record at the customer's domain](#setting-cname-at-customer-domain).

Once domain validation has been completed, the certificates will be issued and distributed to Cloudflare’s edge. With a CNAME in place, the entire process—from validation to issuance to edge deployment—completes in approximately 90 seconds.

--------

## Setting CNAME at customer domain
Your customer needs to set up a CNAME record at their DNS provider, pointing to your CNAME target configured in [a previous step](#configure-zone-with-proxy-fallback-origin). For example:
```txt
app CNAME john.customers.saasprovider.com
```
This routes traffic from `app.customer.com` to your origin.
