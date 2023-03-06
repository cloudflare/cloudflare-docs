---
title: Policies
pcx_content_type: concept
weight: 5
meta:
  title: Policies
---

# Policies

Policies define the resources allowed on your applications. Policies can log violations or they can enforce an allowlist of resources, effectively blocking resources not including in the policies. Create policies to define a positive security model.

{{<Aside type="note">}}
Only available to Enterprise customers with a paid add-on.
{{</Aside>}}

Policies can be one of the following:

* **Log policy**: Defines allowed resources in log mode, without blocking any resources not covered by the policy. Analyze any policy violations to validate a new policy.
* **Allow policy**: Defines allowed resources in enforce mode, blocking any resources not covered by the policy. Enable allow mode when you are sure your policy is correct and that it will not block essential application resources, which would affect your application's end users.

With allow policies you can create a positive security model, also known as positive blocking. According to this model, you define what is allowed and reject everything else. Such an approach helps you reduce the attack surface for unwanted third-party scripts in your application.

## Next steps

Refer to the following pages for instructions on creating a policy in Page Shield:

* [Create a policy in the dashboard](/page-shield/policies/create-dashboard/)
* [Page Shield API: Create a policy](/page-shield/reference/page-shield-api/#create-a-policy)
