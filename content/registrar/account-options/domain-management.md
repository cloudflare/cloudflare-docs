---
pcx_content_type: how-to
title: Domain management
---

# Domain management

## Domain status

When your domain is registered with Cloudflare, you can review your domain status in the **Overview** pane.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. From **Overview**, scroll down to **Domain Registration** to review the current expiration date. Select **Manage domain** to review the Auto-Renew status for your domain.

## Billing information

Domain registrations will not appear in the **Active Subscriptions** section of the dashboard, as Registrar is not subscription based. To check information related to your domain billing:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Domain Registration** > **Manage Domains**.
3. Find the domain you want to check and select **Manage**.
4. Refer to **Registration** for information regarding your domain fees. From here, you can also opt to [renew or extend](/registrar/account-options/renew-domains/) your domain registration.

## Edit WHOIS records

Cloudflare redacts WHOIS information from your domain by default. However, we do store the authentic WHOIS record for your domain. You may edit the WHOIS contact data for any domain. To do that:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Domain Registration** > **Manage Domains**.
3. Find the domain you want to edit and select **Manage** > **Contacts**.
4. Select **Edit** in any of the contacts you previously set up. This allows you to update the contact information for the selected domain only. It will not update the contact information for other domains within the account.

Refer to [Registrant contact updates](/registrar/account-options/domain-contact-updates/) for more information.

## Edit Default Contact information

The first time you transfer or register a new domain, a Cloudflare Registrar creates a Default Contact with information that can be used for future transfers and registrations. The contact data may be updated at any time in the dashboard. Updating the Default Contact data will not update the contact information for any domains already in the account. This Default Contact data is only used to prepopulate contact information for new registrations and transfers.

It is important that you keep this information accurate and up-to-date. Refer to [Registrant contact updates](/registrar/account-options/domain-contact-updates/) for important information about this topic, and to learn how to update this information.

## Delete a domain registration

Domains using Cloudflare Registrar will be deleted automatically after expiration if they have not been renewed. The exact timing varies, refer to [What happens when a domain expires?](/registrar/faq/#what-happens-when-a-domain-expires) for more details.

{{<Aside type="warning" header="Deletion is irreversible">}}
Deleting a domain registration from Cloudflare Registrar starts an irreversible process. At the end of that process, the domain will be available for anyone to purchase at any domain registrar. This means you should only delete your registration if you are comfortable losing it. If you intend to keep the domain but use another registrar, refer to [Transfer domain from Cloudflare to another registrar](/registrar/account-options/transfer-out-from-cloudflare/).
{{</Aside>}}

There may be instances where users may wish to delete a domain prior to expiration. In most cases a domain may be deleted prior to expiration by following these steps: 

1. Navigate to the {{<button type="primary" href="https://dash.cloudflare.com/?to=/:account/domains" target="_blank">}}Go to <strong>Manage domain</strong>{{</button>}} page in the **Registrar** section of the Cloudflare dashboard and select the domain you wish to delete
2. Under the **configuration** tab on the Manage page you will find a **Delete** button
3. If the domain is deletable the button will be active.  The button will be disabled if your domain cannot be deleted and you should refer to the Registrar [FAQ](/registrar/faq/#why-am-i-unable-to-delete-my-registrar-domain).
4. Once you click the Delete button, you will be presented with a confirmation window. If you proceed, an email will be sent to all users with the Super Admin role in the account. The email contains a deletion authorization token that must be entered into the window which appears to confirm and complete the deletion.

Once all steps are completed, the domain will then be scheduled for deletion. To understand more about the timelines and potential reasons why a domain cannot be deleted, refer to the Registrar [FAQ](/registrar/faq/#domain-deletions).