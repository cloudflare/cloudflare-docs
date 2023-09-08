---
title: Peering portal setup
pcx_content_type: tutorial
updated: 2023-04-04
---

# Peering portal setup

You can use a peering portal, such as PeeringDB, to view and maintain your database of peering locations. 

Before you begin using PeeringDB, you must create an account and affiliate with Cloudflare.

## Log in to the PeeringDB portal

{{<Aside type="note">}}

You must first [create PeeringDB portal account](https://www.peeringdb.com/register) before you can log in.

{{</Aside>}}

1. [Log in](https://www.peeringdb.com/account/login/?next=/register) to your account.
2. Ensure your email address is affiliated with the ASN you want to request access for.
Select the **OIDC PeeringDB** and follow the log in process.

If you receive a message stating your account has not been affiliated with an organization, you will need to request affiliation.

![Error message about missing organization affiliation](/images/network-interconnect/peeringdb-request-affiliation.png)

When your affiliation is approved, **Cloudflare, Inc.** appears under **Existing affiliations** on your profile.

![List of existing affiliations](/images/network-interconnect/peeringdb-affiliation-approved.png)

## Request peer sessions

Before you can request a peering session for an ASN, you must be an admin for that ASN. 

1. On the **ASN** page on [PeeringDB](https://www.peeringdb.com/), select **Users**. Confirm your email address in the **Admin** group.
2. From the **Peering Portal**, locate **Peering Locations**.
3. From the **Sessions** toggle, select **Potential**.

The **Peer** button under **Peering Request** only appears active to admins. 

![Admin view of peering locations list](/images/network-interconnect/peeringdb-admin-view.png)

Non-admin users will be unable to select **Peer** and hovering over the button will display a message about the need for admin access.

![Non-admin view of peering locations list](/images/network-interconnect/peeringdb-nonadmin-view.png)
