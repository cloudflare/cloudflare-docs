---
pcx-content-type: how-to
title: Register a new domain
weight: 4
---

# Register a new domain

Cloudflare Registrar is only available for customers that use Cloudflare as their authoritative DNS provider (also known as a [full setup](/dns/zone-setups)).

{{<render file="_email-verification.md">}}

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account. Go to **Registrar** > **Register**.

2.  In the search box, enter the domain name you wish to register. You may also enter one or more keywords. The search results will contain a list of suggested domains. If the domain you entered does not appear in the list, this means it is not available for registration.

If you are registering a `.us` domain, refer to the [Additional requirements for .US domains](/registrar/faq/#additional-requirements-for-us-domains) before proceeding.

1.  Click **Purchase** on the domain you wish to register. In rare instances, a domain that is not available for registration may appear in the search results. After clicking **Purchase**, a definitive availability check will be performed to confirm that the domain is actually available for registration.

  {{<Aside type="note">}}

Currently, Cloudflare cannot register premium domains (domains that have non-standard pricing) and Internationalized Domain Names (IDNs).

  {{</Aside>}}

1.  Select the term (number of years) you wish to register the domain for and click **Continue**. Most top-level domains (TLDs) can be registered for a maximum of ten years. Some TLDs may have different term limits and these will be reflected in the drop-down options.\
    The expiration date and price will update automatically based on the term selected. The **Renew On** date is the date that the system will attempt to auto-renew the domain.  All registrations have Auto-renew turned on by default; however, you may disable this option at any time.

2.  Enter the contact details for the domain. These details will be used to create all of the required contacts (Registrant, Admin, Technical, and Billing), and may be updated after registration is completed. Refer to the table below to learn the specific requirements for each contact field:

  <details>
  <summary>Contact requirements</summary>
  <div>

  {{<Aside type="note">}}

At this time, you can only use ASCII characters for contact data. If the default contact has non-ASCII characters, you will need to update the domain contact details before proceeding. Cloudflare recommends that you update your default contact information to include ASCII characters only.

  {{</Aside>}}

  {{<table-wrap>}}

| Field | Required? | Restrictions |
| ------|-----------|------------- |
| First Name | Yes | Minimum of two letters. |
| Last Name | Yes | Minimum of two letters. |
| Email | Yes | Must be a properly formatted email address. |
| Organization | No | Optional for most TLDs. In some cases, the Organization field may be populated by default with data from First and Last names. |
| Phone number | Yes | Must select a valid country code from the drop-down options. Only numbers will be accepted in the phone number field. |
| Ext | No | Only numbers may be entered. |
| Address 1 | Yes | May not be all numeric. |
| Address 2 | No | - |
| City | Yes | - |
| State | Yes | - |
| Country | Yes | You must select one from the drop-down options. |
| Postal Code | Yes | Must be a properly formatted postal code. |

  {{</table-wrap>}}

  </div>
  </details>

After entering the contact information click **Continue**. If any of the contact information is missing or not properly validated, an error message will appear and you will need to correct the data before proceeding.

  {{<Aside type="note">}}

If you have previously registered or transferred a domain name, the form will be filled in advance with the information from your default contact. If not, you will need to fill out the form.

It is important that you provide complete and accurate contact information. If you do not follow this recommendation, the domain registration may be suspended and/or canceled.

  {{</Aside>}}

1.  The billing information will use the billing profile you have with Cloudflare, if one already exists. If there is no billing profile, you will need to enter your payment information.

2.  Review the terms and conditions, including the Domain Registration Agreement, Self-serve Subscription Agreement, and the Privacy Policy. By clicking **Submit**, you acknowledge that you are accepting the terms of the agreements.

The registration process may take up to 30 seconds to complete. Once the registration is complete, the browser will navigate to the domain management page where you may update the contacts, change the auto-renew settings, and add additional years to the term. You will also receive a confirmation email regarding your new domain registration.

## Next steps

To improve the security of your domain, enable [Domain Name System Security Extensions](/registrar/account-options/enable-dnssec/) to create a secure layer with a cryptographic signature.
