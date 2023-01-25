---
pcx_content_type: concept
title: Custom lists
weight: 4
---

# Custom lists

A custom list contains one or more strings of the same type (for example, a list of hostnames) that you can reference collectively, by name, in rule expressions.

## Create a custom list

Refer to [Create a list in the dashboard](/fundamentals/global-configurations/lists/create-dashboard/) or to the [Lists API](/fundamentals/global-configurations/lists/lists-api/) page.

## Use a custom list

Use custom lists in rule [expressions](/ruleset-engine/rules-language/expressions/) with the `in` operator and with a field supported by the custom list:

```txt
<FIELD> in $<LIST_NAME>
```

The fields you can use with custom lists depend on the exact type of the list items. For custom lists with hostnames, use one of the following fields:
* `http.host`
* TODO

---

## List item format

The allowed formats of list items depend on the type of elements in the custom list.

### Hostnames

List items in custom lists with hostnames must be Fully Qualified Domain Names (FQDNs). An item may contain a `*` prefix/subdomain wildcard, which must be followed by a `.` (period). An item cannot include a scheme (for example, `https://`) or a URL path.

For example, the following entries would be valid for a custom list with hostnames:

- `example.com`
- `api.example.com`
- `*.example.com`

However, `example.com/path/subfolder` would not be a valid entry.

You can add any valid hostname (a valid FQDN) to a custom list with hostnames. The hostnames do not need to belong to the current Cloudflare account.

## CSV file format for bulk import operations

When uploading items to a custom list via CSV file, use one of the following file formats according to the list item type. Use the following format for custom lists with hostnames:

```txt
<HOSTNAME_1>
<HOSTNAME_2>
```
