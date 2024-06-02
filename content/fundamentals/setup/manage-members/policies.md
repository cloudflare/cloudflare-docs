---
pcx_content_type: reference
title: Policies
weight: 3
meta:
    title: Policies
---

# Policies

Policies define what access a given user has to your account or domains, and are constructed out of 3 parts:
1) An actor (your user)
2) A ResourceGroup (a scope)
3) A PermissionGroup (roles)

An account member can have 1 or many of these policies in order to represent the most appropriate access.

In order to increase the usability and flexibility of our role system, changes to the API have been made to make all of these underlying data principals more visible, and interactable for users.

# Examples of Multiple Policies

Having made policies more available, a real life example of a scenario you may want to assign multiple policies is the following
You want to use scopes to control access to an account is where you have a single account with both Production and Staging Domains, and a user that should be able see the whole account, purge the production domains, but have the ability to configure the staging domains.

# ResourceGroups

A resourceGroup is a unique identifier for the scope for which a policy applies.

# PermissionGroups

A permissionGroup is a unique identifier for the set of roles that are assigned to a given policy.

# How to manage policies

A set of standard API endpoints is on every account that allow access to your members, which has recently been enhanced by a list of resourceGroups and PermissionGroups
The API documentation can be found here
