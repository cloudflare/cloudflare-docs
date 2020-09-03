---
title: "Policies"
alwaysopen: true
weight: 2
---

## What is a Policy?

A policy is a set of rules you can set up for one specific location or for multiple locations. Through Cloudflare Gateway's policy engine, you can filter domains by categories, manually block domains by specifying them in a list, and override domains to allow them even if those domains are getting blocked by a category. 

When setting up a policy, you can also enable features such as SafeSearch or YouTube Restricted Mode. 

### Blocking a Subdomain
When you manually block a domain, you automatically block all of its subdomains. For example, if you are blocking `example.com`, our policy engine will also block `a.example.com`, `a.b.example.com`. 

If you only want to block a subdomain `a.example.com`, then instead of adding `example.com` to the list, you will add `a.example.com`. Note that once you add `a.example.com` to the block list, Cloudflare Gateway will also block all subdomains of `a.example.com`.

## Order Of Operations When Applying A Policy

When Gateway receives a DNS query and the query matches with a policy, the policy follows the order outlined below:

| Step |          Check If           |                           If Matches                      |     Else    |
|:----:|:---------------------------:|:---------------------------------------------------------:|:-----------:|
|  1   |  Domain is in CSAM category | Block domain, return REFUSED                              |Go to step 2 |
|  2   |    Domain in Allow list     | Allow domain, return NOERROR with IP address of the domain|Go to step 3 |
|  3   |    Domain in Block list     | Block domain, return REFUSED                              |Go to step 4 |
|  4   |    Domain in SafeSearch     | Override domain, return NOERROR with safe CNAME           |Go to step 5 |
|  5   | Domain blocked by category  | Block domain, return REFUSED                              |Go to step 6 |
|  6   |            N/A              | Allow domain, return NOERROR with IP address of the domain|     N/A     |
In each step, Gateway checks if the domain matches with the rule stated in the `Check If` column. If it matches with the rule, Gateway triggers the action in the `If Matches` column. If it does not match the check moves to the next step outlined in the `Else` column.

