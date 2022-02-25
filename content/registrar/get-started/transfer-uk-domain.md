---
pcx-content-type: how-to
title: Transfer a .UK domain to Cloudflare
weight: 6
---

# Transfer a .UK domain to Cloudflare

## Prerequisites for transferring a .UK domain:

*   The domain must not be locked or suspended.
*   There must be an active zone for the domain in your Cloudflare account.
*   The domain must have Cloudflare nameservers.
*   The domain must not be expiring within the next 10 days.

***

## How to transfer a .UK domain to Cloudflare

Cloudflare currently supports the transfer of `.uk`, `co.uk`, `org.uk`, and `me.uk` domains. To transfer a `.uk` domain to Cloudflare from another registrar follow these steps:

1.  Log in go the [Cloudflare dashboard](https://dash.cloudflare.com/), select your account and click the **Registrar** tab.
2.  Select **Transfer**. Cloudflare will show you a list of domains that are eligible for transfer (see below for restrictions).
3.  Select the domains you wish to transfer.
4.  Proceed to checkout. Note that there is no fee to transfer a `.uk` domain and an additional year is NOT added during the transfer process.
5.  After checkout, request your current registrar to update the IPS tag to `CLOUDFLARE`. The tag must be updated within seven days of completing the checkout process or the transfer will fail.
6.  Cloudflare will receive a notice once your registrar updates the IPS tag. After that, we will finish transferring your domain.

  <Aside type="warning" header="Warning">

If you request your current registrar to update the IPS tag before completing the checkout process, the transfer request will be automatically rejected. You must complete the checkout process before requesting the IPS tag update.

  </Aside>

## Possible reasons a transfer may fail or be rejected

*   The domain is locked or suspended.
*   The nameservers were updated after the checkout process.
*   The IPS tag update was made more than seven days after the checkout process.

## Transferring a .UK domain to another Registrar

To transfer a `.uk` domain to another registrar, follow these steps:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2.  Go to **Registrar**.
3.  Select the domain you wish to transfer.
4.  Click **Manage** and navigate to the **Configuration** tab.
5.  Under **Transfer Out**, click **Unlock**.
6.  Enter the IPS tag of the registrar you wish to transfer to.
7.  Your new registrar is responsible for accepting the transfer. Cloudflare has no visibility into why a transfer might not be accepted by the new registrar.

<Aside type="note">

If you do not know the IPS tag, contact your new registrar for instructions. Your new registrar may require you to follow some additional steps before starting the transfer process.

</Aside>
