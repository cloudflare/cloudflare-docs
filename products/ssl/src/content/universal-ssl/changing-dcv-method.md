---
order: 1
---

# Changing DCV method

--------

## What is Domain Control Validation (DCV)?

Before a publicly trusted Certificate Authority will issue a certificate for a hostname, the requester must prove they have control over that hostname.
*(Domain and hostname are used interchangeably in this context)*

There are several methods that are used to complete this process, the primary ones that Cloudflare works with are:

* HTTP Token
* CNAME DNS Record
* TXT DNS Record

--------

## Completing DCV for a domain using Cloudflare

When signing up with Cloudflare by updating your registrar to use Cloudflare nameservers, Cloudflare is able to automatically handle DCV on your behalf.

For domains using a CNAME setup, this process is not as straightforward.

**Changing DCV Methods for a Certificate Order is primarily a topic for CNAME setup zones.**

With Universal SSL under a CNAME setup, by default, Cloudflare will place an HTTP token to complete DCV.  This token is available for the Certificate Authority as soon as:

* Hostname has a CNAME to Cloudflare from the domain’s authoritative DNS.
* Hostname is Orange-Clouded in Cloudflare’s DNS settings.

This means that by default the above items must be complete for a given hostname before certificates are issued.

The process of certificates being issued once DNS is changed is reported to be very fast, however you may require firm reassurance that your certificates are ready prior to making the switch to avoid any potential downtime.

Using the Client API, we can change the validation method used to allow the certificates to be issued before cutting over live traffic.

--------

## Apex validation

Even though the proxy service isn’t expected to be provided for this hostname unless switching to a Full DNS configuration with Cloudflare, completing the process above for the apex of a domain will allow us to complete DCV for all subdomains.

As a matter of best practice, it’s best to validate against the apex, even if you don’t intend on proxying traffic for the apex in your CNAME setup.

Otherwise, each subdomain needs to be validated manually.

### 1. Check validation method

To begin, find the `cert_pack_uuid` of the order that you would like to change validation method for.

```bash
curl -sX GET \
"https://api.cloudflare.com/client/v4/zones/:zone_id/ssl/verification/" \
-H 'X-Auth-Email: YOUR_EMAIL' \
-H 'X-Auth-Key: API_KEY'

{
    "result": [
        {
            "certificate_status": "pending_validation",
            "cert_pack_uuid": "4228d4df-b9c7-47bb-8903-ff76452458b1",
            "validation_method": "http",
            "validation_type": "dv",
            "verification_info": {
                "http_url": "http://example.com/.well-known/pki-validation/ca3-15cd5a33b4fd469784851d8c021e3ee3.txt",
                "http_body": "ca3-d4db80cdcb40496ab71a66a0ab985306"
            },
            "hostname": "example.com"
        },
    ],
    "success": true,
    "errors": [],
    "messages": []
}

```

This shows us the pending order created, and the HTTP DCV information required to complete validation is in the `verification_info` element.

From here you can change the validation method to CNAME or TXT records.

Let’s continue by changing the DCV method to CNAME.

### 2. Change validation method
This endpoint will modify the validation method of a selected certificate order. Note the `validation_method` value set in the request body.

```bash
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/:zone_id/ssl/verification/<cert_pack_uuid>" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: API_KEY" \
     -H "Content-Type: application/json" \
     --data '{"validation_method":"cname"}'

{
    "result": {
        "certificate_status": "pending_validation",
        "cert_pack_uuid": "4228d4df-b9c7-47bb-8903-ff76452458b1",
        "validation_method": "cname",
        "validation_type": "dv",
        "verification_info": {
            "cname": "_ca3-e82a555f7fe04fb394d2b14c7eb24946.example.com",
            "cname_target": "dcv.digicert.com"
        },
        "status": "pending_validation",
        "hostname": "example.com"
    },
    "success": true,
    "errors": [],
    "messages": []
}
```

You can then take and set the values from `verification_info` for a CNAME record in your authoritative DNS. This can be validated by performing this type of manual DNS lookup using `dig`.

```bash
$ dig _ca3-e82a555f7fe04fb394d2b14c7eb24946.example.com cname +short
dcv.digicert.com.
```

### 3. Verify status is now active
Once that is validated by the Certificate Authority, the “Get Validation Method” endpoint will show the order as

```bash
curl -sX GET \
"https://api.cloudflare.com/client/v4/zones/:zone_id/ssl/verification/" \
-H 'X-Auth-Email: YOUR_EMAIL' \
-H 'X-Auth-Key: API_KEY'

{
    "result": [
        {
            "certificate_status": "active",
            "cert_pack_uuid": "4228d4df-b9c7-47bb-8903-ff76452458b1",
            "validation_method": "http",
            "validation_type": "dv",
            "hostname": "example.com"
        }
    ],
    "success": true,
    "errors": [],
    "messages": []
}
```

The status: `active` means that the certificate has been deployed to Cloudflare’s edge network, and will be served as soon as HTTP traffic is proxied to Cloudflare.

--------

## API documentation

For more detail, see the Cloudflare API documentation on these operations:

* [Get SSL Verification Details](https://api.cloudflare.com/#ssl-verification-ssl-verification-details)
* [Edit SSL Certificate Pack Validation Method](https://api.cloudflare.com/#ssl-verification-edit-ssl-certificate-pack-validation-method)
