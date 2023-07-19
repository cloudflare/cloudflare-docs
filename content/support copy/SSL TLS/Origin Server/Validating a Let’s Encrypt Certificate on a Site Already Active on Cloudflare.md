---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/214820528-Validating-a-Let-s-Encrypt-Certificate-on-a-Site-Already-Active-on-Cloudflare
title: Validating a Let’s Encrypt Certificate on a Site Already Active on Cloudflare
---

# Validating a Let’s Encrypt Certificate on a Site Already Active on Cloudflare



## Overview

This guide describes additional details how to use the Webroot method for verification in the official Let's Encrypt client described in the [documentation](https://certbot.eff.org/docs/using.html#webroot).

As a note, the default method used for ACME authentication by the Let's Encrypt client utilizes the DVSNI method. This will fail for a domain which has Cloudflare enabled as we terminate SSL (TLS) at our edge and the ACME server will never see the certificate the client presents at the origin. Using alternate ACME validation methods, such as DNS or HTTP will complete successfully when Cloudflare is enabled.

___

## HTTP Validation

If you’re configuring Let’s Encrypt for the first time for a site already active on Cloudflare, all that is needed to successfully verify and obtain your certificate and private key pair is to use the webroot method for verification. 

1.  Download the Let’s Encrypt client and change to the download directory:`git clone https://github.com/letsencrypt/letsencrypt` `cd letsencrypt/`
2.  Run the script for automatic installation: `./letsencrypt-auto`
3.  Using the `letsencrypt` client with the `certonly` command and the `--webroot` flag, you’re able to verify and obtain the cert/key pair using HTTP verification. An example command might look like: `/root/.local/share/letsencrypt/bin/letsencrypt certonly --webroot --webroot-path /usr/share/nginx/html/ --renew-by-default --email email@host.tld --text --agree-tos -d example.tld -d www.example.tld` where **\--webroot-path** is the directory on your server where your site is located (nginx used in the example) **\--renew-by-default** selects renewal by default when domains are a superset of a previously attained cert **\--email** is the email used for registration and recovery contact. **\--text** displays text output **\--agree-tos** agrees to Let’s Encrypt’s Subscriber Agreement **\-d** specifies hostnames to add to the SAN.
4.  Successful completion of this verification method will show text similar to the following: type: embedded-entry-inline id: 5UCzsYIB4V0r5bezt04URx
5.  As a note, both the cert and key will be saved to `/etc/letsencrypt/live/example.tld/` . After both have been obtained, you’ll need to manually update your virtual host to use this key/cert pair.

Be sure to check the page rules for the domain in the Cloudflare dashboard and verify that there aren't any which would result in a request to the validation URL to be redirected or only accessible via HTTPS.

___

## Renewal

When it comes time for renewal, using the `letsencrypt renew` [command](https://certbot.eff.org/docs/using.html#renewing-certificates) should allow the cert to be renewed successfully without any Cloudflare configuration changes, provided that:

-   The .conf file the letsencrypt client uses for the renewal has `authenticator = webroot` specified.
-   The validation URL is accessible over HTTP.
-   There are no redirects applied for that URL. 

Alternately, repeating the steps above will also issue a new certificate.

{{<Aside type="note">}}
The official client does not yet support the DNS validation method;
however, third party utilities exist that utilize this method.
{{</Aside>}}
