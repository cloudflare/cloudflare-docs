---
title: API Tokens Permissions
weight: 10
---

Below is a list of all the Token Permissions that are available to use. The current list can be [fetched via the API](https://api.cloudflare.com/#permission-groups-list-permission-groups) at any time.

**User Permissions**

|Name|ID|Description|Applicable Scope|
|---|---|---|---|
|API Tokens Read|0cc3a61731504c89b99ec1be78b77aa0|Grants read access to user's API Tokens|com.cloudflare.api.user|
|API Tokens Write|686d18d5ac6c441c867cbf6771e58a0a|Grants write access to user's API Tokens|com.cloudflare.api.user|
|Memberships Read|3518d0f75557482e952c6762d3e64903|Grants read access to a user's account memberships,|com.cloudflare.api.user|
|Memberships Write|9201bc6f42d440968aaab0c6f17ebb1d|Grants write access to a user's account memberships|com.cloudflare.api.user|
|User Details Read|8acbe5bb0d54464ab867149d7f7cf8ac|Grants read access to user details|com.cloudflare.api.user|
|User Details Write|55a5e17cc99e4a3fa1f3432d262f2e55|Grants write access to user details|com.cloudflare.api.user|

**Account Permissions**

|Name|ID|Description|Applicable Scope|
|---|---|---|---|
|Access: Apps and Policies Read|7ea222f6d5064cfa89ea366d7c1fee89|Grants read access to Cloudflare Access zone resources|com.cloudflare.api.account.zone|
|Access: Apps and Policies Write|1e13c5124ca64b72b1969a67e8829049|Grants write access to Cloudflare Access zone resources|com.cloudflare.api.account.zone|
|Access: Organizations, Identity Providers, and Groups Read|26bc23f853634eb4bff59983b9064fde|Grants read access to Cloudflare Access account resources|com.cloudflare.api.account|
|Access: Organizations, Identity Providers, and Groups Write|bfe0d8686a584fa680f4c53b5eb0de6d|Grants write access to Cloudflare Access account resources|com.cloudflare.api.account|
|Account Firewall Access Rules Read|de7a688cc47d43bd9ea700b467a09c96|Grants read access to account firewall access rules|com.cloudflare.api.account|
|Account Firewall Access Rules Write|a416acf9ef5a4af19fb11ed3b96b1fe6|Grants write access to account firewall access rules|com.cloudflare.api.account|
|Account Settings Read|c1fde68c7bcc44588cbb6ddbc16d6480|Grants read access to Account resources, account membership, and account level features|com.cloudflare.api.account|
|Account Settings Write|1af1fa2adc104452b74a9a3364202f20|Grants write access to Account resources, account membership, and account level features|com.cloudflare.api.account|
|Analytics Read|9c88f9c5bce24ce7af9a958ba9c504db|Grants read access to analytics|com.cloudflare.api.account.zone|
|Apps Write|094547ab6e77498c8c4dfa87fadd5c51|Grants full access to Cloudflare Apps|com.cloudflare.api.account.zone|
|Billing Read|7cf72faf220841aabcfdfab81c43c4f6|Grants read access to billing profile, subscriptions, and access to fetch invoices and entitlements|com.cloudflare.api.account|
|Billing Write|6c80e02421494afc9ae14414ed442632|Grants write access to billing profile, subscriptions, and access to fetch invoices and entitlements|com.cloudflare.api.account|
|Cache Purge|e17beae8b8cb423a99b1730f21238bed|Grants access to purge cache|com.cloudflare.api.account.zone|
|DNS Firewall Read|5f48a472240a4b489a21d43bd19a06e1|Grants read access to DNS Firewall|com.cloudflare.api.account|
|DNS Firewall Write|da6d2d6f2ec8442eaadda60d13f42bca|Grants write access to DNS Firewall|com.cloudflare.api.account|
|DNS Read|82e64a83756745bbbb1c9c2701bf816b|Grants read access to DNS|com.cloudflare.api.account.zone|
|DNS Write|4755a26eedb94da69e1066d98aa820be|Grants write access to DNS|com.cloudflare.api.account.zone|
|Firewall Services Read|4ec32dfcb35641c5bb32d5ef1ab963b4|Grants read access to Firewall resources|com.cloudflare.api.account.zone|
|Firewall Services Write|43137f8d07884d3198dc0ee77ca6e79b|Grants write access to Firewall resources|com.cloudflare.api.account.zone|
|IP Prefixes: BGP On Demand Read|e763fae6ee95443b8f56f19213c5f2a5|Grants access to read ip prefix bgp configuration|com.cloudflare.api.account|
|IP Prefixes: BGP On Demand Write|2ae23e4939d54074b7d252d27ce75a77|Grants access to read and change ip prefix bgp configuration|com.cloudflare.api.account|
|Load Balancers Read|e9a975f628014f1d85b723993116f7d5|Grants read access to load balancers and associated resources|com.cloudflare.api.account.zone|
|Load Balancers Write|6d7f2f5f5b1d4a0e9081fdc98d432fd1|Grants write access to load balancers and associated resources|com.cloudflare.api.account.zone|
|Load Balancing: Monitors and Pools Read|9d24387c6e8544e2bc4024a03991339f|Grants read access to account level load balancer resources|com.cloudflare.api.account|
|Load Balancing: Monitors and Pools Write|d2a1802cc9a34e30852f8b33869b2f3c|Grants write access to account level load balancer resources|com.cloudflare.api.account|
|Logs Read|c4a30cd58c5d42619c86a3c36c441e2d|Grants read access to logs and logpush jobs|com.cloudflare.api.account.zone|
|Logs Write|3e0b5820118e47f3922f7c989e673882|Grants write access to logpush jobs|com.cloudflare.api.account.zone|
|Page Rules Read|b415b70a4fd1412886f164451f20405c|Grants read access to Page Rules|com.cloudflare.api.account.zone|
|Page Rules Write|ed07f6c337da4195b4e72a1fb2c6bcae|Grants write access to Page Rules|com.cloudflare.api.account.zone|
|SSL and Certificates Read|7b7216b327b04b8fbc8f524e1f9b7531|Grants read access to SSL configuration and cert management|com.cloudflare.api.account.zone|
|SSL and Certificates Write|c03055bc037c4ea9afb9a9f104b7b721|Grants write access to SSL configuration and cert management|com.cloudflare.api.account.zone|
|Stream Read|de21485a24744b76a004aa153898f7fe|Grants read access to Cloudflare Stream|com.cloudflare.api.account|
|Stream Write|714f9c13a5684c2885a793f5edb36f59|Grants write access to Cloudflare Stream|com.cloudflare.api.account|
|Teams Read|3f376c8e6f764a938b848bd01c8995c4|Grants read access to teams|com.cloudflare.api.account|
|Teams Report|efb81b5cd37d49f3be1da9363a6d7a19|Grants reporting access to teams|com.cloudflare.api.account|
|Teams Write|b33f02c6f7284e05a6f20741c0bb0567|Grants write access to teams|com.cloudflare.api.account|
|Workers KV Storage Read|8b47d2786a534c08a1f94ee8f9f599ef|Grants read access to Cloudflare Workers KV Storage|com.cloudflare.api.account|
|Workers KV Storage Write|f7f0eda5697f475c90846e879bab8666|Grants write access to Cloudflare Workers KV Storage|com.cloudflare.api.account|
|Workers Routes Read|2072033d694d415a936eaeb94e6405b8|Grants read access to Cloudflare Workers and Workers KV Storage|com.cloudflare.api.account.zone|
|Workers Routes Write|28f4b596e7d643029c524985477ae49a|Grants write access to Cloudflare Workers and Workers KV Storage|com.cloudflare.api.account.zone|
|Workers Scripts Read|1a71c399035b4950a1bd1466bbe4f420|Grants read access to Cloudflare Workers scripts|com.cloudflare.api.account|
|Workers Scripts Write|e086da7e2179491d91ee5f35b3ca210a|Grants write access to Cloudflare Workers scripts|com.cloudflare.api.account|
|Zone Read|c8fed203ed3043cba015a93ad1616f1f|Grants read access to zone management|com.cloudflare.api.account.zone|
|Zone Settings Read|517b21aee92c4d89936c976ba6e4be55|Grants read access to zone settings|com.cloudflare.api.account.zone|
|Zone Settings Write|3030687196b94b638145a3953da2b699|Grants write access to zone settings|com.cloudflare.api.account.zone|
|Zone Write|e6d2666161e84845a636613608cee8d5|Grants write access to zone management|com.cloudflare.api.account.zone|

**Zone Permissions**

|Name|ID|Description|Applicable Scope|
|---|---|---|---|
|Access: Apps and Policies Read|7ea222f6d5064cfa89ea366d7c1fee89|Grants read access to Cloudflare Access zone resources|com.cloudflare.api.account.zone|
|Access: Apps and Policies Write|1e13c5124ca64b72b1969a67e8829049|Grants write access to Cloudflare Access zone resources|com.cloudflare.api.account.zone|
|Analytics Read|9c88f9c5bce24ce7af9a958ba9c504db|Grants read access to analytics|com.cloudflare.api.account.zone|
|Apps Write|094547ab6e77498c8c4dfa87fadd5c51|Grants full access to Cloudflare Apps|com.cloudflare.api.account.zone|
|Cache Purge|e17beae8b8cb423a99b1730f21238bed|Grants access to purge cache|com.cloudflare.api.account.zone|
|DNS Read|82e64a83756745bbbb1c9c2701bf816b|Grants read access to DNS|com.cloudflare.api.account.zone|
|DNS Write|4755a26eedb94da69e1066d98aa820be|Grants write access to DNS|com.cloudflare.api.account.zone|
|Firewall Services Read|4ec32dfcb35641c5bb32d5ef1ab963b4|Grants read access to Firewall resources|com.cloudflare.api.account.zone|
|Firewall Services Write|43137f8d07884d3198dc0ee77ca6e79b|Grants write access to Firewall resources|com.cloudflare.api.account.zone|
|Load Balancers Read|e9a975f628014f1d85b723993116f7d5|Grants read access to load balancers and associated resources|com.cloudflare.api.account.zone|
|Load Balancers Write|6d7f2f5f5b1d4a0e9081fdc98d432fd1|Grants write access to load balancers and associated resources|com.cloudflare.api.account.zone|
|Logs Read|c4a30cd58c5d42619c86a3c36c441e2d|Grants read access to logs and logpush jobs|com.cloudflare.api.account.zone|
|Logs Write|3e0b5820118e47f3922f7c989e673882|Grants write access to logpush jobs|com.cloudflare.api.account.zone|
|Page Rules Read|b415b70a4fd1412886f164451f20405c|Grants read access to Page Rules|com.cloudflare.api.account.zone|
|Page Rules Write|ed07f6c337da4195b4e72a1fb2c6bcae|Grants write access to Page Rules|com.cloudflare.api.account.zone|
|SSL and Certificates Read|7b7216b327b04b8fbc8f524e1f9b7531|Grants read access to SSL configuration and cert management|com.cloudflare.api.account.zone|
|SSL and Certificates Write|c03055bc037c4ea9afb9a9f104b7b721|Grants write access to SSL configuration and cert management|com.cloudflare.api.account.zone|
|Workers Routes Read|2072033d694d415a936eaeb94e6405b8|Grants read access to Cloudflare Workers and Workers KV Storage|com.cloudflare.api.account.zone|
|Workers Routes Write|28f4b596e7d643029c524985477ae49a|Grants write access to Cloudflare Workers and Workers KV Storage|com.cloudflare.api.account.zone|
|Zone Read|c8fed203ed3043cba015a93ad1616f1f|Grants read access to zone management|com.cloudflare.api.account.zone|
|Zone Settings Read|517b21aee92c4d89936c976ba6e4be55|Grants read access to zone settings|com.cloudflare.api.account.zone|
|Zone Settings Write|3030687196b94b638145a3953da2b699|Grants write access to zone settings|com.cloudflare.api.account.zone|
|Zone Write|e6d2666161e84845a636613608cee8d5|Grants write access to zone management|com.cloudflare.api.account.zone|
