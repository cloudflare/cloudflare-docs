---
title: Policies
pcx_content_type: concept
weight: 5
layout: single
meta:
  title: Policies
  description: Use Page Shield policies to define the resources (scripts) allowed on your applications.
---

# Policies

{{<Aside type="note">}}
Only available to Enterprise customers with a paid add-on.
{{</Aside>}}

Policies define the resources allowed on your applications through Content Security Policy (CSP) directives. Policies can log violations and also enforce an allowlist of resources, effectively blocking resources not included in the policies.

Create [allow policies](#policy-actions) to define a positive security model, also known as positive blocking. According to this model, you define what is allowed and reject everything else. Such an approach helps you reduce the attack surface for unwanted third-party scripts in your application.

## Policy actions

A policy can perform one of the following actions:

* **Log**: Page Shield will log any resources not covered by the policy, without blocking any resources. Use this action to validate a new policy before deploying it. Resources not covered by the policy will be reported as [policy violations](/page-shield/policies/violations/).
* **Allow**: Page Shield will block any resources not explicitly allowed by the policy. Switch to the _Allow_ action after validating a new policy with the _Log_ action, so that your policy does not block essential application resources, which would affect your application's end users. Policies with the _Allow_ action will log [policy violations](/page-shield/policies/violations/) for any blocked resources.

For details on the CSP directives Page Shield creates for each type of policy action, refer to [How Page Shield works](/page-shield/how-it-works/#positive-security-model-using-policies). For more information on the format of CSP headers Page Shield adds to responses, refer to [CSP HTTP header format](/page-shield/reference/csp-header/).

## Next steps

Refer to the following pages for instructions on creating a policy in Page Shield:

* [Create a policy in the dashboard](/page-shield/policies/create-dashboard/)
* [Page Shield API: Create a policy](/page-shield/reference/page-shield-api/#create-a-policy)
