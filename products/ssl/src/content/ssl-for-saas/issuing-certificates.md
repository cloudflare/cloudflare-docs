---
order: 2
---

# Issuing certificates

Cloudflare issues two certificates for each Custom Hostname that you request issuance for (and none for those that you provide your own certificate, as described in the Certificate Upload section).

Certificates move through the following stages as they progress to Cloudflare’s edge:

1. Initializing
2. Pending Validation
3. Pending Issuance
4. Pending Deployment
5. Active

The first part of certificate issuance process is domain validation. Once you send the custom hostname (as shown below), Cloudflare will initiate the domain validation process. HTTP-based validation is the easiest method and requires only that your customer has placed a CNAME record from the hostname they wish to use into your domain.

After validation has completed, Cloudflare will issue two certificates for each hostname and bundle these certificates in chains that maximize browser compatibility. The primary certificate uses a P-256 key, is SHA-2/ECDSA signed, and will be presented to browsers that support elliptic curve cryptography (ECC). The secondary or fallback certificate uses an RSA 2048-bit key, is SHA-2/RSA signed, and will be presented to browsers that do not support ECC.

Full API details on the the Custom Hostname (SSL for SaaS) endpoint can be found at: https://api.cloudflare.com/#custom-hostname-for-a-zone-properties.

--------

## Monitoring the certificate’s status

Once a certificate has been ordered or uploaded, you can make API calls to check on the status, or review properties, of the certificate.

```bash
curl -XGET "https://api.cloudflare.com/client/v4/zones/{zone_id}/custom_hostnames/{hostname_id}"\
    -H "X-Auth-Email: {email}" -H "X-Auth-Key: {key}"\
    -H "Content-Type: application/json"\
```

This call will return information about a Custom Hostname, including whether the certificate is ‘active’ or ‘pending validation’.

Alternatively, if you have not stored the hostname identifier, you can look the certificate up by hostname:

```bash
curl -XGET "https://api.cloudflare.com/client/v4/zones/{zone_id}/custom_hostnames?hostname=app.example.com"\
    -H "X-Auth-Email: {email}" -H "X-Auth-Key: {key}"\
    -H "Content-Type: application/json"
```

--------

## Viewing the newly issued certificate

You can view the certificate that was deployed to Cloudflare’s edge using `openssl` or your browser. The command below can be used in advance of your customer pointing the `app.example.com` hostname to the edge ([provided validation was completed](/ssl-for-saas/certificate-validation-methods)).

```sh
$ openssl s_client -servername app.example.com -connect $CNAME_TARGET:443 </dev/null 2>/dev/null | openssl x509 -noout -text | grep app.example.com
```
