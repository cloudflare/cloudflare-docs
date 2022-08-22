---
pcx_content_type: how-to
title: Delete your Cloudflare account
weight: 2
---

# Delete your Cloudflare account

These steps do not apply to accounts under contract. Contact your Customer Success manager if you would like to delete a contract account.

---

## Who can delete their account

If your account uses [Single-Sign On (SSO)](/cloudflare-one/applications/configure-apps/dash-sso-apps/), your super administrator may need to delete your account on your behalf.

If your account does not use SSO, you can delete your account on your own.

## Prerequisites

Before Cloudflare can cancel your account and delete your personal information, you will need to follow the process below for each domain associated with your Cloudflare account:

* [Cancel your subscriptions or add-on services](/fundamentals/account-and-billing/account-maintenance/cancel-subscription/)

* [Remove your domain from Cloudflare](https://support.cloudflare.com/hc/articles/360033554252)

* [Remove Cloudflare nameservers at your domain registrar](/dns/zone-setups/full-setup/setup/)

* [Disable auto-renew for your Registrar domain(s)](/registrar/account-options/renew-domains#set-up-automatic-renewals)

* If you are using a Cloudflare [CNAME setup](/dns/zone-setups/partial-setup/), [update your DNS records](/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records) at your DNS provider to point to your website IPs or hostnames instead of Cloudflare.

* [Delete payment information](/fundamentals/account-and-billing/account-maintenance/updating-billing-info/#delete-your-current-payment-method)

* (*Optional*) [Download a copy of your invoices](/fundamentals/account-and-billing/account-maintenance/understand-invoices/#download-invoice). Once deleted, the invoices will no longer be accessible and cannot be re-sent to you.

## Delete your Cloudflare account

Deleting your account is permanent. Any accounts where you are the primary owner will also be deleted and any other users on those accounts will be removed. All domains, subscriptions, and billing information on your account will be removed from Cloudflare.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).

2. Select **My Profile**.

3. Select **Delete this user**

    ![To delete your account, select Delete this user on your profile page.](/fundamentals/static/images/get-started/delete-account.png)

3. Select **Continue to delete user**.

4. Follow the prompts to finish deleting your account.

{{<Aside type="note">}}

Cloudflare will purge your personal information within a year of a deletion request unless required to retain it for legal obligations (such as ongoing abuse investigations or pending litigation). Refer to the [Cloudflare Data Processing Addendum](https://www.cloudflare.com/cloudflare-customer-dpa/) for further information about the deletion of personal information following the cancellation of your account.

{{</Aside>}}