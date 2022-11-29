---
pcx_content_type: concept
title: Accounts, zones, and profiles
weight: 4
---

# Accounts, zones, and profiles

Within the Cloudflare ecosystem, there are three organizing concepts that control where specific settings live: user profiles, organization accounts, and zones.

<div class="mermaid">
flowchart LR
accTitle: Organization accounts contain zones and user profiles contain user settings
subgraph Organization account
    subgraph Zone - example.com
        A[WAF]
        B[DNS]
    end
    subgraph Zone - example2.com
        C[Cache rules]
        D[Waiting Room]
    end
    Workers
    K[Account members]
end
subgraph User profile
    G[Email address]
    H[Language]
    I[Communication preferences]
end
</div>

---

## User profiles

Each user account has a profile that contains several settings related to the specific user, including [Communication preferences](/fundamentals/account-and-billing/account-setup/customize-account/communication-preference/), [Language preferences](/fundamentals/account-and-billing/account-setup/customize-account/language-preference/), and more.

### Navigation

To access your profile, click the user icon and then **My Profile** from any page within the [Cloudflare dashboard](https://dash.cloudflare.com).

![Use the Profile icon to access your profile settings](/fundamentals/static/images/get-started/profile-navigation.png)

---

## Organization accounts

An organization account can contain one or more zones. A user account can be part of one or more organization accounts.

There are also several account-level products - such as [Workers](/workers/), [Pages](/pages/), [Security Center](/security-center/), [Bulk redirects](/rules/url-forwarding/bulk-redirects/), and more - that can affect some or all zones contained within that account.

After you [log in](https://dash.cloudflare.com) and select an account - but before you select a zone - the sidebar will list account-level products.

Accounts also have their own settings, including [account billing profiles](/fundamentals/account-and-billing/account-setup/create-billing-profile/), [account members](/fundamentals/account-and-billing/account-setup/manage-account-members/), [IP lists](/firewall/cf-firewall-rules/rules-lists/), and more.

### Navigation

When you log into the [Cloudflare dashboard](https://dash.cloudflare.com), you can access all organization accounts where your user account is a member.

To access organization account settings and account-level products from within a zone, use the **Account Home** option from the **Profile** dropdown.

![Use the Account Home option in the Profile dropdown to access account settings and products](/fundamentals/static/images/get-started/account-navigation-profile.png)

You can also use the back button near the zone name.

![Use the back button near the account name to move from a zone to your account](/fundamentals/static/images/get-started/account-navigation.png)

---

## Zones

Domains (or [subdomains](/dns/zone-setups/subdomain-setup/)) that are added to Cloudflare become zones.

Zone-level services - such as [Load Balancers](/load-balancing/), [Cache rules](/cache/about/cache-rules/), and more - only affect that domain.

### Navigation

When you log into the [Cloudflare dashboard](https://dash.cloudflare.com) and choose an organization account, there will be a list of all zones within that account.

Once you are within a zone, items within the sidebar will be zone-related products.

If you need to change to another zone, use the forward arrow next to the zone name or by go back to the homepage of your organization account.

![Use the forward button near the account name to switch between zones in an account](/fundamentals/static/images/get-started/zone-navigation.png)