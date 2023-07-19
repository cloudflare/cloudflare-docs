---
title: Certificate signing requests (CSRs)
pcx_content_type: tutorial
weight: 7
meta:
  title: Certificate signing requests (CSRs) — Cloudflare for SaaS
---

# Certificate signing requests (CSRs) — Cloudflare for SaaS

{{<render file="_csr-definition.md" productFolder="ssl" >}} 

Once the CSR has been generated, provide it to your customer. Your customer will then pass it along to their preferred CA to obtain a certificate and return it to you. After you receive the certificate, you should upload it to Cloudflare and reference the unique CSR ID that was provided to you during CSR creation.

{{<render file="_ssl-for-saas-plan-limitation.md">}}

---

## Generate the private key and CSR

### Step 1 — Build the CSR payload

All fields except for organizational_unit and key_type are required. If you do not specify a `key_type`, the default of `rsa2048` (RSA 2048 bit) will be used; the other option is `p256v1` (NIST P-256).

Common names are restricted to 64 characters and subject alternative names (SANs) are limited to 255 characters, [per RFC 5280](https://tools.ietf.org/html/rfc5280). You must specify at least one SAN, and the list of SANs should include the common name.

```bash
$ request_body=$(< <(cat <<EOF
{
  "country": "US",
  "state": "MA",
  "locality": "Boston",
  "organization": "City of Boston",
  "organizational_unit": "Championship Parade Detail",
  "common_name": "app.example.com",
  "sans": [
    "app.example.com",
    "www.example.com",
    "blog.example.com",
    "example.com"
  ],
  "key_type" : "p256v1"
}
EOF
))
```

### Step 2 — Generate a CSR

Now, you want to generate a CSR that you can provide to your customer.

```bash
$ curl -sXPOST https://api.cloudflare.com/client/v4/zones/{zone_id}/custom_csrs \
    -H "X-Auth-Email: {email}" -H "X-Auth-Key: {key}"\
    -H 'Content-Type: application/json' -d "$request_body"

{
  "result": {
    "id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
    "country": "US",
    "state": "MA",
    "locality": "Boston",
    "organization": "City of Boston",
    "organizational_unit": "Championship Parade Detail",
    "common_name": "app.example.com",
    "sans": [
      "app.example.com",
      "www.example.com",
      "blog.example.com",
      "example.com",
    ],
    "key_type": "p256v1",
    "csr": "-----BEGIN CERTIFICATE REQUEST-----\nMIIBSzCB8gIBADBiMQswaQYDVQQGEwJVUzELMAkGA1UECBMCTUExDzANBgNVBAcT\nBkJvc3RvbjEaMBgGA1UEChMRQ2l0eSBvZiBDaGFtcGlvbnMxGTAXBgNVBAMTEGNz\nci1wcm9kLnRscy5mdW4wWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAaTKf70NYlwr\n20P6P8xj8/4mTN5q28dbZR/gM3u4m/RPs24+PxAfMZCNvkVKAPVWYfUAadZI4Ha/\ndxLh5Q6X5bhIoC4wLAYJKoZIhvcNAQkOMR8wHTAbBqNVHREEFDASghBjc3ItcHJv\nZC50bHMuZnVuMAoGCCqGSM49BAMCA0gAMEUCIQDgtFUZav466SbT2FGBsIBlahDI\nVkg4y+u+V/K5DlY1+gIgQ9xLfUSKnSnJYbM9TwWr4Z964+lBtB9af4O5pp7/PSA=\n-----END CERTIFICATE REQUEST-----\n"
  },
  "success": true,
}
```

Replace the ‘\n’ strings with actual newline before passing to your customer. This can be accomplished by piping the output of the prior call to a tool like jq and perl, such as:

```bash
$ curl -sXPOST https://api.cloudflare.com/client/v4/zones/{zone_id}/custom_csrs \
    -H "X-Auth-Email: {email}" -H "X-Auth-Key: {key}"\
    -H 'Content-Type: application/json' -d "$request_body" | jq .result.csr |\
    perl -npe s'/\\n/\n/g; s/"//g' > csr.txt
```

### Step 3 — Customer obtains certificate

Your customer will take the provided CSR and work with their CA to obtain a signed, publicly trusted certificate.

### Step 4 — Upload the certificate

Upload the certificate and reference the ID that was provided when you generated the CSR.

You should replace newlines in the certificate with literal ‘\n’ characters, as illustrated above in the custom certificate upload example. After doing so, build the request body and provide the ID that was returned in a previous step.

Cloudflare only accepts publicly trusted certificates. If you attempt to upload a self-signed certificate, it will be rejected.

```txt
$ MYCERT="$(cat app_example_com.pem|perl -pe 's/\r?\n/\\n/'|sed -e 's/..$//')"
$ request_body=$(< <(cat <<EOF
{
  "hostname": "app.example.com",
  "ssl": {
    "custom_csr_id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
    "custom_certificate": "$MYCERT"
  }
}
EOF
))
```

With the request body built, [create the custom hostname](/api/operations/custom-hostname-for-a-zone-create-custom-hostname) with the supplied custom certificate. If you intend to use the certificate with multiple hostnames, make multiple API calls replacing the `hostname` field.

---

## Other actions

### List all CSRs

You can request the (paginated) collection of all previously generated custom CSRs by making a `GET` request to `https://api.cloudflare.com/client/v4/zones/{zone_id}/custom_csrs`.

### Delete a CSR

Delete one or more of the CSRs to delete the underlying private key by making a `DELETE` request to `https://api.cloudflare.com/client/v4/zones/{zone_id}/custom_csrs/{csr_id}`.

You may delete a CSR provided there are no custom certificates using the private key that was generated for the CSR. If you attempt to delete a CSR whose private key is still in use, you will receive an error.
