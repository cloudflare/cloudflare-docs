---
pcx_content_type: concept
title: Accounts, zones, and profiles
weight: 4
---

# Accounts, zones, and profiles

Within the Cloudflare ecosystem, there are three organizing concepts that control where specific settings live: user profiles, accounts, and zones.

```mermaid
flowchart LR
accTitle: Accounts contain zones and user profiles contain user settings
subgraph Account
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
```

---

## User profiles

Each user has a profile that contains several settings, such as [Communication preferences](/fundamentals/account-and-billing/account-setup/customize-account/communication-preference/) and [Language preferences](/fundamentals/account-and-billing/account-setup/customize-account/language-preference/).

### Navigation

To access your profile, select the user icon and then **My Profile** from any page within the [Cloudflare dashboard](https://dash.cloudflare.com).

![Use the Profile icon to access your profile settings](/fundamentals/static/images/get-started/profile-navigation.png)

---

## Accounts

An account refers to an organization account. Accounts contain one or more users and can contain one or more zones. A user can be part of one or more accounts.

There are also several account-level products - such as [Workers](/workers/), [Pages](/pages/), [Security Center](/security-center/), and [Bulk redirects](/rules/url-forwarding/bulk-redirects/) - that can affect some or all zones contained within that account.

After you [log in](https://dash.cloudflare.com) and select an account - but before you select a zone - the sidebar will list account-level products.

Accounts also have their own settings, including [account billing profiles](/fundamentals/account-and-billing/account-setup/create-billing-profile/), [account members](/fundamentals/account-and-billing/members/), [lists](/fundamentals/global-configurations/lists/), and more.

### Navigation

When you log into the [Cloudflare dashboard](https://dash.cloudflare.com), you can access all accounts where your user is a member.

To access account settings and account-level products from within a zone, use the **Account Home** option from the **Profile** dropdown.

![Use the Account Home option in the Profile dropdown to access account settings and products](/fundamentals/static/images/get-started/account-navigation-profile.png)

You can also use the back button near the zone name.

![Use the back button near the account name to move from a zone to your account](/fundamentals/static/images/get-started/account-navigation.png)

---

## Zones

Domains (or [subdomains](/dns/zone-setups/subdomain-setup/)) that are added to Cloudflare become zones.

Zone-level services - such as [Load Balancers](/load-balancing/) and [Cache rules](/cache/about/cache-rules/) - only affect that zone and not other zones, even if they are contained within the same account.

### Navigation

When you log into the [Cloudflare dashboard](https://dash.cloudflare.com) and choose an account, there will be a list of all zones within that account.

Once you are within a zone, items within the sidebar will be zone-related products.

If you need to change to another zone, use the forward arrow next to the zone name or by go back to the homepage of your account.

![Use the forward button near the account name to switch between zones in an account](/fundamentals/static/images/get-started/zone-navigation.png)