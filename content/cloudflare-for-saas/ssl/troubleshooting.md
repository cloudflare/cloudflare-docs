---
title: Troubleshooting
pcx_content_type: reference
weight: 12
meta:
  title: Troubleshooting Cloudflare for SaaS
---

# Troubleshooting Cloudflare for SaaS

---

## Validation exceptions

### High-risk domains

Occasionally, a domain will be flagged as “high risk” by Cloudflare’s CA partners. Typically this is done only for domains with an Alexa ranking of 1-1,000 and domains that have been flagged for phishing or malware by Google’s Safe Browsing service.

If a domain is flagged by the CA, you need to contact Support before validation can finish. The API call will return indicating the failure, along with a link to where the ticket can be filed.

### Certificate Authority Authorization (CAA) records

CAA is a new DNS resource record type defined in [RFC 6844](https://datatracker.ietf.org/doc/html/rfc6844) that allows a domain owner to indicate which CAs are allowed to issue certificates for them. If your customer has CAA records set on their domain, they will either need to add the following (or remove CAA entirely):

```txt
example.com. IN CAA 0 issue "digicert.com"
example.com. IN CAA 0 issue "letsencrypt.org"
```

While it’s possible for CAA records to be set on the subdomain they wish to use with your service, it is unlikely. You would also have to remove this CAA record.

---

## Rate limits

By default, you may issue up to 15 certificates per minute. Only successful submissions (POSTs that return 200) are counted towards your limit. If you exceed your limit, you will be prevented from issuing new certificates for 30 seconds.

If you require a higher rate limit, contact your Customer Success Manager.

---

## Time outs

If a certificate issuance times out, the error message will indicate where the timeout occurred:

- Timed Out (Initializing)
- Timed Out (Validation)
- Timed Out (Issuance)
- Timed Out (Deployment)
- Timed Out (Deletion)

To fix this error, send a [PATCH request](https://api.cloudflare.com/#custom-hostname-for-a-zone-edit-custom-hostname) through the API or click the **refresh toggle** for the specific custom hostname in the dashboard.

---

## Immediate validation checks

You can send a [PATCH request](https://api.cloudflare.com/#custom-hostname-for-a-zone-edit-custom-hostname) to request an immediate validation check on any certificate. The PATCH data only needs include the same `ssl` object as the original request.

---

## Purge cache

To remove specific files from Cloudflare’s cache, [purge the cache](/cache/how-to/purge-cache/#purge-by-single-file-by-url) while specifying one or more hosts.

---

## Resolution error 1016 (Origin DNS error) when accessing the custom hostname

Cloudflare returns a 1016 error when the custom hostname cannot be routed or proxied.

There are two main causes of error 1016:

1.  Custom Hostname ownership verification is not complete. To check verification status, run an API call to [search for a certificate by hostname](/cloudflare-for-saas/start/common-api-calls/) and check the verification error field: `"verification_errors": ["custom hostname does not CNAME to this zone."]`.
2.  Fallback Origin is not [correctly set](/cloudflare-for-saas/start/getting-started/#step-1--create-fallback-origin-and-cname-target). Confirm that you have created a DNS record for the fallback origin and also set the fallback origin.

{{<Aside type="note">}}

If you encounter other 1XXX errors, refer to [Troubleshooting Cloudflare 1XXX Errors](https://support.cloudflare.com/hc/en-us/articles/360029779472-Troubleshooting-Cloudflare-1XXX-errors).

{{</Aside>}}

---

## Custom hostname in Moved status

To move a custom hostname back to an Active status, send a [PATCH request](https://api.cloudflare.com/#custom-hostname-for-a-zone-edit-custom-hostname) to restart the hostname verification. A Custom Hostname in a Moved status is deleted after 7 days.
