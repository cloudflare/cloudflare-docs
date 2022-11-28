---
pcx_content_type: concept
title: Accounts, zones, and profiles
weight: 4
---

# Accounts, zones, and profiles

Within the Cloudflare ecosystem, there are three organizing concepts that control where specific settings live: accounts, zones, and profiles.

<div class="mermaid">
flowchart LR
accTitle: Accounts contain zones and profiles contain user settings
subgraph Account
    subgraph Zone - example.com
        A[WAF]
        B[DNS]
    end
    subgraph Zone - example2.com
        C[DNS]
        D[Waiting Room]
    end
    subgraph Zone - subdomain.example.com
        E[DNS]
        F[Cache rules]
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

## Accounts

An account can contain one or more zones. And a user can be part of one or more accounts.

There are also several account-level products - such as [Workers](/workers/), [Pages](/pages/), [Security Center](/security-center/), [Bulk redirects](/rules/url-forwarding/bulk-redirects/), and more - that can affect some or all zones contained within that account.

Accounts also have their own settings, including [Billing profiles](/fundamentals/account-and-billing/account-setup/create-billing-profile/), [account members](/fundamentals/account-and-billing/account-setup/manage-account-members/), [IP lists](/firewall/cf-firewall-rules/rules-lists/), and more.

### Navigation

When you log into the [Cloudflare dashboard](https://dash.cloudflare.com), there will be a list of all accounts related that your user is a member of.

To access account settings from within a zone, either use the back button near the zone name or the **Account Home** option from the **Profile** dropdown.

![Use the back button near the account name to move from a zone to your account](/fundamentals/static/images/get-started/account-navigation.png)

---

## Zones

Domains (or [subdomains](/dns/zone-setups/subdomain-setup/)) that are added to Cloudflare become zones.

Zone-level services - such as [Load Balancers](/load-balancing/), [Cache rules](/cache/about/cache-rules/), and more - only affect that domain.

### Navigation

When you log into the [Cloudflare dashboard](https://dash.cloudflare.com) and choose an account, there will be a list of all zones within that account.

Once you are within a zone, you can change to another zone by using the forward arrow next to the zone name or by going back to the homepage of your account.

![Use the forward button near the account name to switch between zones in an account](/fundamentals/static/images/get-started/zone-navigation.png)

---

## Profiles

Each user account has a profile that contains several settings related to the specific user, including [Communication preferences](/fundamentals/account-and-billing/account-setup/customize-account/communication-preference/), [Language preferences](/fundamentals/account-and-billing/account-setup/customize-account/language-preference/), and more.

### Navigation

To access your profile, click the user icon and then **My Profile** from any page within the [Cloudflare dashboard](https://dash.cloudflare.com).

![Use the Profile icon to access your profile settings](/fundamentals/static/images/get-started/profile-navigation.png)