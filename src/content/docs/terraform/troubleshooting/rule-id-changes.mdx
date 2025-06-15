---
pcx_content_type: troubleshooting
title: Rule IDs change when I modify a ruleset
sidebar:
  label: Rule IDs change when making updates
---

For [`cloudflare_ruleset`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resources, the Cloudflare provider may delete a rule and create a new one when you modify a ruleset in your Terraform configuration. This happens because the API cannot match rules in your new Terraform configuration with existing rules in your Cloudflare configuration. Modifying a ruleset in your Terraform configuration and applying the changes will create new rules with different rule IDs in your Cloudflare account or zone.

This behavior may have an impact on any automation or monitoring systems you may have configured that rely on having immutable rule IDs between rule modifications.

## How to keep the same rule ID between modifications

To keep existing rule IDs when making changes to a ruleset through Terraform, add a `ref` field to each rule.

The `ref` field is a user-defined external identifier that must be unique for each rule in a ruleset. When you provide a `ref` value, the provider will match the rule in your updated Terraform configuration with the existing rule with the same `ref` external identifier, and the rule ID will be preserved.

`ref` values have a string data type with a minimum length of one character. For example, `my_ref`.

Once you set the `ref` field of a rule, changing the `ref` field value will make Terraform create a new rule.

## `cf-terraforming` support for `ref` field values

By default, when you create a rule, its `ref` value will be equal to the rule ID. You can set `ref` values via Cloudflare API.

When you [import your existing Cloudflare configuration to Terraform](/terraform/advanced-topics/import-cloudflare-resources/) using [`cf-terraforming`](https://github.com/cloudflare/cf-terraforming), the generated Terraform configuration will have `ref` values for each rule, with the same value as the rule ID.

If you manually created your Terraform configuration and your rules' configuration does not have a `ref` field, add a `ref` field to each rule so that each ruleset modification does not generate new rule IDs.
