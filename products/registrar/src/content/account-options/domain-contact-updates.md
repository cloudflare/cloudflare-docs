---
pcx-content-type: how-to
---

# Registrant contact updates

It is important that you keep your contact details accurate and up-to-date. [ICAAN rules state](https://www.icann.org/resources/pages/registrant-contact-information-wdrp-2017-08-31-en) that if you do not have updated contact information, your domain name registration may be suspended or even cancelled.

To update your registrant contacts: 

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
1. Click **Registrar**.
1. Find the domain where you want to update your contact information, and click **Manage**.
1. Click the **Contacts** tab, and edit the contact information.

If you change any of the following fields, Cloudflare Registrar will require a Change of Registrant approval before the changes are finalized:

* First name
* Last name
* Organization
* Email address

If you update any of the fields mentioned above, Cloudflare Registrar will send an approval email to the current registrant email address. The approval email contains a link to a web page where the requested change may be viewed and approved or rejected. If the pending change is not approved or rejected within seven days, the request will automatically be canceled.

If you do not have to update these fields, your contact information is updated immediately and no further action is required.

<Aside type='warning' header='Important'>

After clicking the link in the approval email Cloudflare sends you, you have the option to accept or reject the contact changes. If you click the **Accept** button, your domain will be transfer-locked for 60 days.  
If you do not want this transfer lock, be sure to click the **Do not apply 60 day transfer lock** checkbox _before_ clicking the **Accept** button.

</Aside>

## Changing email contact

If the registrant contact update also includes a change to the email address, Cloudflare sends a second approval email to the new (requested) email address. Both the old (original) email address and the new one have to approve the change for the change to be successfully completed. 

Only the current registrant may opt out of the transfer lock, however. The approval page for the new registrant will not include the option to opt out.

## 60-day transfer lock

After the changes for the registrant contact are approved, the domain will be placed on a transfer lock for 60 days. This is happens when you approve changes to the registrant contacts without checking the box to prevent the transfer lock. 

This transfer lock prevent the transfer of the domain to another registrar, and the transfer to another Cloudflare account. It does not prevent additional updates to the domain name.  

If the registrant contact is updated again while the domain is in the 60 day lock period, the lock expiration will be further extended to 60 days from the most recent update.