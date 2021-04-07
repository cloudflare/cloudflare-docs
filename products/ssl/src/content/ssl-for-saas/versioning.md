---
title: Deprecation - Version 1
order: 10
---

# Deprecation notice for SSL for SaaS - Version 1

The first version of SSL for SaaS will be deprecated on September 1, 2021.

## Why is SSL for SaaS changing?

In SSL for SaaS v1, traffic for Custom Hostnames is proxied to the origin based on the IP addresses assigned to the zone with SSL for SaaS enabled. This IP-based routing introduces complexities that prevented customers from making changes with zero downtime. 

SSL for SaaS v2 removes IP-based routing and its associated problems. Instead, traffic is proxied to the origin based on the custom hostname of the SaaS zone. This means that Custom Hostnames will now need to pass a **hostname verification** step after Custom Hostname creation and in addition to SSL certificate validation. This adds a layer of security from SSL for SaaS v1 by ensuring that only verified hostnames are proxied to your origin. 

## What action is needed?

To ensure that your service is not disrupted, you need to perform an additional ownership check on every new Custom Hostname. There are three methods to verify ownership: TXT, HTTP, and CNAME. Use TXT and HTTP for pre-validation to validate the Custom Hostname before traffic is proxied by Cloudflare’s edge.

### DNS TXT Record

When creating a Custom Hostname with the TXT method through the [API](https://api.cloudflare.com/#custom-hostname-for-a-zone-create-custom-hostname), a TXT ownership_verification record is provided for your customer to add to their DNS for the ownership validation check. When the TXT record is added, the Custom Hostname will be marked as **Active** in the Cloudflare SSL/TLS app under the Custom Hostnames tab. 

### HTTP Token

When creating a Custom Hostname with the HTTP through the [API](https://api.cloudflare.com/#custom-hostname-for-a-zone-create-custom-hostname), an HTTP ownership_verification token is provided. HTTP verification is used mainly by organizations with a large deployed base of custom domains with HTTPS support. Serving the HTTP token from your origin web server allows hostname verification before proxying domain traffic through Cloudflare.

Cloudflare sends GET requests to the http_url using `User-Agent: Cloudflare Custom Hostname Verification`.

When the HTTP token is verified, the Custom Hostname will be marked as **Active** in the Cloudflare SSL/TLS app under the Custom Hostnames tab. 

### CNAME Validation

Custom Hostnames can also be validated once Cloudflare detects that the Custom Hostname is a CNAME record pointing to the fallback record configured for the SSL for SaaS domain. Though this is the simplest validation method, it increases the risk of errors. Since a CNAME record would also route traffic to Cloudflare’s edge, traffic may reach our edge before the Custom Hostname has completed validation or the SSL certificate has issued.

Once you have tested and added the hostname validation step to your Custom Hostname creation process, please contact your Cloudflare Account Team to schedule a date to migrate your SSL for SaaS v1 zones. Your Cloudflare Account Team will work with you to validate your existing Custom Hostnames without downtime.

## If you are using BYOIP or Apex Proxying: 

Both BYOIP addresses and IP addresses configured for Apex Proxying allow for hostname validation to complete successfully by having either a BYOIP address or an Apex Proxy IP address as the target of a DNS A record for a custom hostname.

## What is available in the new version of SSL for SaaS?

SSL for SaaS v2 is functionally equivalent to SSL for SaaS v1, but removes the requirements to use specific anycast IP addresses at Cloudflare’s edge and Cloudflare’s Universal SSL product with the SSL for SaaS zone.

## What happens during the migration?

Once the migration has been started for your zone(s), Cloudflare will require every Custom Hostname to pass a hostname verification check. Existing Custom Hostnames that are proxying to Cloudflare with a DNS CNAME record will automatically re-validate and migrate to the new version with no downtime. Any Custom Hostnames created after the start of the migration will need to pass the hostname validation check using one of the validation methods mentioned above. 

Your Cloudflare Account Team will work with you to schedule a migration window for each of your SSL for SaaS zones. After the migration has started and has had some time to progress, Cloudflare will generate a list of Custom Hostnames that failed to migrate and ask for your approval to complete the migration. When you give your approval, the migration will be complete, SSL for SaaS v1 will be disabled for the zone, and any Custom Hostname that has not completed hostname validation will no longer function.

The migration timeline depends on the number of Custom Hostnames. For example, if a zone has fewer than 10,000 Custom Hostnames, the list can be generated around an hour after beginning the migration. If a zone has millions of Custom Hostnames, it may take up to 24 hours to identify instances that failed to successfully migrate. 

When your Cloudflare Account Team asks for approval to complete the migration, please respond in a timely manner. You will have **two weeks** to validate any remaining Custom Hostnames before they are systematically deleted.

## When is the migration?

The migration process starts on March 31, 2021 and will continue until final deprecation on September 1, 2021.

If you would like to begin the migration process before March 31, 2021, please contact your Cloudflare Account Team and they will work with you to expedite the process. Otherwise, your Cloudflare Account Team will reach out to you with a time for a migration window so that your zones are migrated before **September 1, 2021** end-of-life date.

## What if I have additional questions?

If you have any questions, please contact your Cloudflare Account Team or [SaaSv2@cloudflare.com](mailto:SaaSv2@cloudflare.com). 
