---
_build:
  publishResources: false
  render: never
  list: never
---

Cloudflare adds CAA records automatically in two situations:

- When you have [Universal SSL](/ssl/edge-certificates/universal-ssl/) or [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/) and add any CAA records to your zone.
- When you have [Universal SSL](/ssl/edge-certificates/universal-ssl/) enabled and enable [AMP Real URL](/speed/optimization/other/amp-real-url/) or [SXG Signed Exchanges](/speed/optimization/other/signed-exchanges/).

These records make sure Cloudflare can still issue Universal certificates on your behalf.

If Cloudflare has automatically added CAA records on your behalf, these records will not appear in the Cloudflare dashboard. However, if you run a command line query using `dig`, you can see any existing CAA records, including those added by Cloudflare (replacing `example.com` with your own domain on Cloudflare):

```bash
➜  ~ dig example.com caa +short
# CAA records added by DigiCert
0 issue "digicert.com; cansignhttpexchanges=yes"
0 issuewild "digicert.com; cansignhttpexchanges=yes"

# CAA records added by Sectigo
0 issue "sectigo.com"
0 issuewild "sectigo.com"

# CAA records added by Let's Encrypt
0 issue "letsencrypt.org"
0 issuewild "letsencrypt.org"

# CAA records added by Google Trust Services
0 issue "pki.goog; cansignhttpexchanges=yes"
0 issuewild "pki.goog; cansignhttpexchanges=yes"
```