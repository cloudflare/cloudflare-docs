---
order: 10
---

# Troubleshooting

--------

## Dealing with validation exceptions

### High-risk domain

Occasionally, a domain will be flagged as “high risk” by Cloudflare’s CA partners. Typically this is done only for i) domains with an Alexa ranking of 1-1,000 and ii) domains that have been flagged for phishing or malware by Google’s Safe Browsing service.

If a domain is flagged by the CA, it will require a support ticket before issuance can proceed. The API call will return indicating the failure, along with a link to where the ticket can be filed.

### Certificate Authority Authorization (CAA) records

CAA is a [new DNS resource record type defined in RFC 6844](https://tools.ietf.org/html/rfc6844) that allows a domain owner to indicate which CAs are allowed to issue certificates for them. If your customer has CAA records set on their domain, they will either need to add the following (or remove CAA entirely):

```txt
example.com. IN CAA 0 issue "digicert.com"
example.com. IN CAA 0 issue "letsencrypt.org"
```

Note that it’s possible for CAA records to be set on the subdomain they wish to use with your service, but it’s unlikely. If there’s a CAA record at, e.g., `app.example.com`, you’ll need that removed or updated.

--------

## Working with rate limits

By default, you may issue up to 15 certificates per minute. Only successful submissions, i.e., POSTs that return 200, are counted towards your limit. If you exceed your limit, you will be prevented from issuing new certificates for 30 seconds.

If you require a higher rate limit, please speak with your Customer Success Manager.

--------

## Resolving a timed out state

In the event of a timed out certificate issuance, Cloudflare will display the following messaging based on where in the chain of issuance the time out occurred:

* Timed Out (Initializing)
* Timed Out (Validation)
* Timed Out (Issuance)
* Timed Out (Deployment)
* Timed Out (Deletion)

The path to remediating any certificates stuck in a Timed Out state is to send a PATCH request through the API, or the Cloudflare dashboard by clicking the ”refresh” toggle for the specific custom hostname.

--------

## Requesting an immediate validation check

You can send a `PATCH` request to request an immediate validation check on any certificate. Note that your PATCH data must only include the “ssl” section from the original request.

```bash
$ curl -sXPATCH https://api.cloudflare.com/client/v4/zones/{zone_id}/custom_hostnames/7f09bb24-9ee0-49b3-98bb-11cccd664edb\
    -H "X-Auth-Email: {email}" -H "X-Auth-Key: {key}"\
    -H 'Content-Type: application/json' -d '{"ssl":{"method":"cname", "type":"dv"}}' 

{
  "result": {
    "id": "7f09bb24-9ee0-49b3-98bb-11cccd664edb",
    "hostname": "app.example.com",
    "ssl": {
      "id": "1fb186b3-60ca-47d5-a926-8e9b1a21fb50",
      "type": "dv",
      "method": "cname",
      "status": "pending_deployment"
    }
  },
  "success": true
}
```

--------

## Purging cache

Granularly remove one or more files from Cloudflare’s cache either by specifying the host.

```bash
$ curl -sXDELETE "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache"\
     -H "X-Auth-Email: {email}" -H "X-Auth-Key: {key}"\
     -H "Content-Type: application/json"\
     -d '{"hosts":["www.customer.com", "www.customer2.com"]}'
```

--------

## Resolution error 1016 (Origin DNS error) when accessing the custom hostname

Cloudflare returns a 1016 error when the custom hostname cannot be routed or proxied.
There are two main causes of error 1016:

1. Custom Hostname ownership verification is not complete.
To check, run an API call to [search for a certificate by hostname](https://developers.cloudflare.com/ssl/ssl-for-saas/api-calls/) and check the verification error field: `"verification_errors": ["custom hostname does not CNAME to this zone."],`
2. Fallback Origin is not correctly set.
[Check via API if the fallback Origin is correctly set](https://developers.cloudflare.com/ssl/ssl-for-saas/api-calls/) 
Check that the fallback origin DNS record exists in the DNS ([see step 2 of Getting Started](https://developers.cloudflare.com/ssl/ssl-for-saas/getting-started/)).

--------

## Custom hostname in Moved status

To move a custom hostname back to an Active status, send a PATCH (see [Requesting an immediate validation check](#requesting-an-immediate-validation-check) section above) to restart the hostname verification.  A Custom Hostname in a Moved status is deleted after 7 days.
