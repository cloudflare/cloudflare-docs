---
title: "Order Of Operations When Applying A Policy"
alwaysopen: true
weight: 6
---

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