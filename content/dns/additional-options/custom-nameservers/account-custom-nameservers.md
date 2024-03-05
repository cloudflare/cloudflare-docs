---
pcx_content_type: how-to
title: Account level
weight: 4
meta:
  title: Account custom nameservers
  description: With account-level custom nameservers, you can use the same custom nameservers for different zones in the account. The domain or domains that provide the nameservers names do not have to exist as zones in Cloudflare.
---

# Account custom nameservers

{{<render file="_acns-tcns-intro.md" withParameters="Account;;A;;account;;zones;;account " >}}

## Configuration conditions

For this configuration to be possible, a few conditions apply:

{{<render file="_acns-tcns-conditions.md" withParameters="account;;you;;You" >}}

{{<render file="_acns-tcns-byoip.md" withParameters="Account;;account" >}}

## Use account custom nameservers

### 1. Set up ACNS names and sets

1. Create ACNS names and sets:
{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

Content.....

{{</tab>}}
{{<tab label="api" no-code="true">}}

Use the [Add account custom nameserver endpoint](/api/operations/account-level-custom-nameservers-add-account-custom-nameserver) to create account custom nameservers. Follow the [conditions](#configuration-conditions) for `ns_name` and `ns_set`.

{{<render file="_ns-set-omission-callout.md">}}

Cloudflare will assign an IPv4 and an IPv6 address to each ACNS name.

{{</tab>}}
{{</tabs>}}

2. Update the registrar of the domain (or domains) that provide the ACNS names. This step depends on whether you are using [Cloudflare Registrar](/registrar/):

    * If you are using Cloudflare Registrar for the domain that provides the ACNS names, [contact Cloudflare Support](/support/contacting-cloudflare-support/) to add glue records to your ACNS and update your nameservers.

    * If you are not using Cloudflare Registrar for the domain that provides the ACNS names, add the account custom nameservers and IP addresses to your domain's registrar as [glue (A and AAAA) records](https://www.ietf.org/rfc/rfc1912.txt). If you do not add these records, DNS lookups for your domain will fail.

### 2. Enable ACNS on existing zones

1. Choose an ACNS set as custom nameservers for a zone:
{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

Content.....

{{</tab>}}
{{<tab label="api" no-code="true">}}

Use the [Set ACNS Related Zone Metadata endpoint](/api/operations/account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata) for each zone.

{{</tab>}}
{{</tabs>}}

2. Make sure the nameservers are updated:

  * If your domain uses [Cloudflare Registrar](/registrar/), the respective `A` and `AAAA` records are automatically created.
  * If your domain uses a different registrar, also update the nameservers at your registrar to use the account custom nameservers.
  * If your zone is delegated from a parent zone, update the corresponding `NS` record at the parent zone.

### 3. (Optional) Make ACNS default for new zones

To make a ACNS set the default nameservers for all new zones added to your account from now on:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

Content.....

{{</tab>}}
{{<tab label="api" no-code="true">}}

Use the [Update Account endpoint](/api/operations/accounts-update-account) and set the value of `default_nameservers` to `custom.account`.

{{</tab>}}
{{</tabs>}}

## Disable account custom nameservers

### 1. Remove ACNS assignment from zones

To remove ACNS and their associated DNS records from a zone:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

Content.....

{{</tab>}}
{{<tab label="api" no-code="true">}}

  * If you are using [Cloudflare Registrar](/registrar/), [contact Cloudflare Support](/support/contacting-cloudflare-support/) to set your nameservers back to the regular Cloudflare branded nameservers and then use the [Set ACNS Related Zone Metadata endpoint](/api/operations/account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata) to change the `enabled` parameter to `false`.
  * If you are not using [Cloudflare Registrar](/registrar/), modify the domain's registrar to use your regular Cloudflare branded nameservers and then use the [Set ACNS Related Zone Metadata endpoint](/api/operations/account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata) to set the `enabled` parameter to `false`.

{{</tab>}}
{{</tabs>}}

### 2. Delete ACNS names or sets

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

Content.....

{{</tab>}}
{{<tab label="api" no-code="true">}}

Use the [Delete account custom nameserver endpoint](/api/operations/account-level-custom-nameservers-delete-account-custom-nameserver) to delete a specific ACNS.

{{</tab>}}
{{</tabs>}}