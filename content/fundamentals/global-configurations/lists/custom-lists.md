---
pcx_content_type: concept
title: Custom lists
weight: 4
---

# Custom lists

A custom list contains one or more items of the same type (for example, a list of hostnames) that you can reference collectively, by name, in rule expressions.

## Create a custom list

Refer to [Create a list in the dashboard](/fundamentals/global-configurations/lists/create-dashboard/) or to the [Lists API](/fundamentals/global-configurations/lists/lists-api/) page.

## Use a custom list

Use custom lists in rule [expressions](/ruleset-engine/rules-language/expressions/) with the `in` operator and with a field supported by the custom list:

```txt
<FIELD> in $<LIST_NAME>
```

For custom lists with hostnames, use the `http.host` field.

---

## List item format

List items in custom lists with hostnames must be Fully Qualified Domain Names (FQDNs). An item may contain a `*` prefix/subdomain wildcard, which must be followed by a `.` (period). An item cannot include a scheme (for example, `https://`) or a URL path.

For example, the following entries would be valid for a custom list with hostnames:

- `example.com`
- `api.example.com`
- `*.example.com`

However, `example.com/path/subfolder` would not be a valid entry.

You can add any valid hostname (a valid FQDN) to a custom list with hostnames. The hostnames do not need to belong to the current Cloudflare account.

## CSV file format for bulk import operations

When uploading items to a custom list with hostnames via CSV file, use the following file format:

```txt
<HOSTNAME_1>
<HOSTNAME_2>
```
