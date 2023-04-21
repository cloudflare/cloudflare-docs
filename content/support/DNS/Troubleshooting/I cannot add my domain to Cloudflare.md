---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/205359838-I-cannot-add-my-domain-to-Cloudflare
title: I cannot add my domain to Cloudflare
---

# I cannot add my domain to Cloudflare



## Step 1 - Disable DNSSEC

Cloudflare cannot provide authoritative DNS resolution for a domain — a full setup or "orange-clouded" domain — when **DNSSEC** is enabled at your domain registrar.

If you do not disable **DNSSEC** before changing your nameservers, you might experience the following issues:

-   DNS does not resolve after switching to Cloudflare’s nameservers
-   DNS query response status is _SERVFAIL_
-   The domain remains in a _Pending_ status in the Cloudflare Overview app

If you experience these issues, refer to [Configuring DNSSEC](/dns/additional-options/dnssec) and [Troubleshooting DNSSEC](https://support.cloudflare.com/hc/articles/360021111972-Troubleshooting-DNSSEC).

___

## Step 2 - Register the domain

If the issue is with your registrar, you may receive the following error messages:

-   _exampledomain.com is not a registered domain (Code: 1049)_
-   _We were unable to identify bad.psl-example as a registered domain. Please ensure you are providing the root domain and not any subdomains (e.g., example.com, not subdomain.example.com) (Code: 1099)_
-   _Failed to lookup registrar and hosting information of exampledomain.com at this time. Please contact Cloudflare Support or try again later. (Code: 1110)_

If you receive these error messages, make sure that:

-   You are providing the root domain (`example.com`) and not a subdomain (`www.example.com`)
-   You domain is fully registered and its registration data lists its nameservers
-   Your domain uses a verified [top-level domain (TLD)](https://publicsuffix.org/list/)

___

## Step 3 - Resolve DNS for root domain

Before a domain can be added to Cloudflare, the domain must return _NS records_ for valid, working nameservers. _NS records_ can be checked via third-party online tools such as [https://www.whatsmydns.net](https://www.whatsmydns.net/) or via a command-line terminal using a dig command:

```sh
$ dig +short ns cloudflare.com

ns3.cloudflare.com.
ns4.cloudflare.com.
ns5.cloudflare.com.
ns6.cloudflare.com.
ns7.cloudflare.com.
```

Additionally, the domain must return a valid _SOA record_ when queried. _SOA records_ can be checked via third-party online tools such as [https://www.whatsmydns.net](https://www.whatsmydns.net/) or via a command-line terminal:

```sh
$ dig +short soa cloudflare.com

ns3.cloudflare.com. dns.cloudflare.com. 2029202248 10000 2400 604800 300
```

___

## Step 4 - Check if the domain is restricted at Cloudflare

If Cloudflare has temporary or permanent restrictions on a domain, you will receive the following errors:

-   _**Error 1105**_
    -   **Message**_: Error with Cloudflare request: \[1105\] This zone is temporarily restricted and cannot be added to Cloudflare at this time, please contact Cloudflare Support._
    -   **Cause**: We have seen too many attempts to add a domain to Cloudflare
    -   **Resolution**: Wait 3 hours before attempting to re-add the domain to Cloudflare. Support cannot speed up this process.
-   _**Error 1093 or 1116**_
    -   **Message**: _This zone cannot be added to Cloudflare at this time, please contact Cloudflare Support. (Code: 1093)_
    -   **Cause**: You may have entered a subdomain (`www.example.com`) instead of the root domain (`example.com`).
    -   **Resolution**: Verify that you are entering a root domain. If you are and still experience issues, contact [Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476).
-   _**Error 1097**_
    -   **Message**: _This web property cannot be added to Cloudflare at this time. If you are an Enterprise customer, contact your Customer Success Manager. Otherwise, email abusereply@cloudflare.com with a detailed explanation of your association with this zone. (Code: 1097)_
    -   **Resolution**: Contact abusereply@cloudflare.com with a detailed explanation of your association with this zone.
-   _**Error: Cannot be found**_ **OR** _**<your domain> is not a registered domain (code: 1049**_**)**
    -   This can happen if the domain has not been registered yet. Some domains, like _.gov_ domains, have special requirements that require the domain be added first.
    -   **Resolution:** Please contact [Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476) if you require assistance adding a _.gov_ and/or other domains that require manual registration
