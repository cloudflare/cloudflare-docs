---
order: 0
pcx-content-type: how-to
---

# Issue certificates for custom hostname

Once you have [set up your SSL for SaaS application](/getting-started), you can start issuing new certificates for your customers.

## Via the dashboard


## Via the API
 
1. Navigate to **SSL/TLS** > **Custom Hostnames** and click **Add Custom Hostname**.
1. Add your customer's hostname `app.customer.com` and set the relevant options, including:
    - Choosing the [Validation method](../certificate-validation-methods).
    - Whether you want to **Enable wildcard**, which adds a `*.<custom-hostname>` SAN to the custom hostname certificate. For more details, see [Hostname priority](/ssl-tls/certificate-and-hostname-priority#hostname-priority).
1. Click **Add Custom Hostname**.
1. You will be brought back to the previous screen, which will show “Pending” before it changes to “Active” within 5 minutes. If you see an error stating “custom hostname does not CNAME to this zone”, you need to [set the DNS record at the customer's domain](#setting-cname-at-customer-domain).