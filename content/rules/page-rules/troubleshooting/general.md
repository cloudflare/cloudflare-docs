---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/218411427-What-do-the-custom-caching-options-mean-in-Page-Rules-#summary-of-page-rules-settings
title: General
meta:
    title: General Troubleshooting | Page Rules
weight: 6
---

# General Troubleshooting

## Why is a Page Rule not working?

The most common reason that a Page Rule is not working - such as URL forwarding - is that the Page Rule you created is on a record that is not proxied by Cloudflare in your [DNS settings](/dns/manage-dns-records/how-to/create-dns-records/).

As an example, You have a Page Rule that redirects a subdomain (`subdomain.yoursitename.com`) back to your apex domain (`yoursitename.com`). If you do not have that record proxied in your DNS settings for the subdomain record, Cloudflare's proxy is not running over the record and a Page Rule will not work because it is going direct to your server.

---

## Error 500 (Internal server error)

### Root cause

This may be due to a configuration issue on a Page Rule. When creating a Page Rule that uses two wildcards, like a _Forwarding URL_ rule, it is possible to create a rule that mentions the second wildcard with the `$2` placeholder. Refer to the example below:

![Example Page Rule configuration with two wildcards. The forwarding URL contains a $2 placeholder, which will be replaced with the content matched by the second ](/images/support/page-rule-create.png)

When updating the same rule, you can remove one of the wildcard in the **If the URL matches** field and save it. Refer to the example below:

![Incorrect Page Rule configuration with a single wildcard, but still using the $2 placeholder in the forwarding URL. This configuration causes ](/images/support/page-rule-update.png)

If you do so, the `$2` placeholder reference a wildcard that does not exist anymore, and as such, an `Error 500 (Internal server error)` is thrown when a URL triggers the page rule.

### Resolution

Update the Page Rule and remove the reference `$2` to the second wildcard. If there is only one wildcard, then only `$1` can be used.
