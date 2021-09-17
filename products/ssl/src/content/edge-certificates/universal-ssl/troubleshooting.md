# Troubleshooting

## Resolving a timed out state

In the event of a timed out certificate issuance, Cloudflare will display the following messaging based on where in the chain of issuance the time out occurred:
* Timed Out (Initializing)
* Timed Out (Validation)
* Timed Out (Issuance)
* Timed Out (Deployment)
* Timed Out (Deletion)

--------

There are four methods for resolving this:

* Grey Cloud (set to DNS only) the DNS records, then after at least a minute, set them back to Orange clouded (proxied)
  * You can do this either via the dashboard under DNS or the API here: https://api.cloudflare.com/#dns-records-for-a-zone-update-dns-record
* Disable Universal SSL, then after at least a minute, enable Universal SSL.
  * You can do this either via the dashboard under SSL → Edge Certificates or the API here: https://api.cloudflare.com/#universal-ssl-settings-for-a-zone-edit-universal-ssl-settings
* Send a PATCH request to the validation endpoint
  * This can only be done via the API: https://api.cloudflare.com/#ssl-verification-edit-ssl-certificate-pack-validation-method
  * Make sure to PATCH with the same DCV method
* Follow the APEX validation method
  * https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/changing-dcv-method#apex-validation
