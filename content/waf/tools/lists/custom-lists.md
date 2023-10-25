---
pcx_content_type: concept
title: Custom lists
weight: 2
---

# Custom lists

A custom list contains one or more items of the same type (for example, IP addresses, hostnames, or ASNs) that you can reference collectively, by name, in rule expressions.

Cloudflare supports the following custom list types:
* Lists with IP addresses (also known as IP lists)
* Lists with hostnames
* Lists with [autonomous system numbers](https://www.cloudflare.com/learning/network-layer/what-is-an-autonomous-system/) (ASNs)

{{<Aside type="note">}}
Currently, lists with hostnames and ASNs are only available to select Enterprise customers. To get access, contact your account team.
{{</Aside>}}

Each type has its own properties and CSV file format. Refer to the following sections for details.

For more information on lists managed by Cloudflare, like Managed IP Lists, refer to [Managed Lists](/waf/tools/lists/managed-lists/).

## Create a custom list

Refer to [Create a list in the dashboard](/waf/tools/lists/create-dashboard/) or to the [Lists API](/waf/tools/lists/lists-api/) page.

## Use a custom list

Use custom lists in rule [expressions](/ruleset-engine/rules-language/expressions/) with the `in` operator and with a field supported by the custom list:

```txt
<FIELD> in $<LIST_NAME>
```

The fields you can use vary according to the list item type:

List item type | Available fields
---------------|-----------------------------------------------------------------------------------------
IP address     | Fields with type `IP address` listed in [Fields](/ruleset-engine/rules-language/fields/)
Hostname       | `http.host`
ASN            | `ip.src.asnum`

For more information and examples, refer to [Use lists in expressions](/waf/tools/lists/use-in-expressions/).

---

## List item format

### Lists with IP addresses (IP lists)

List items in custom lists with IP addresses must be in one of the following formats:

- Individual IPv4 addresses
- IPv4 CIDR ranges with a prefix from `/8` to `/32`
- IPv6 CIDR ranges with a prefix from `/4` to `/64`

You can combine individual addresses and CIDR ranges in the same list.

{{<Aside type="note" header="Note">}}

To specify an IPv6 address, enter it as a CIDR range with a `/64` prefix, the largest supported prefix for IPv6 CIDR ranges.

For example, instead of `2001:db8:6a0b:1a01:d423:43b9:13c5:2e8f`, enter one of the following:

- `2001:db8:6a0b:1a01:0000:0000:0000:0000/64`
- `2001:db8:6a0b:1a01::/64` (using the [double colon notation](https://tools.ietf.org/html/rfc5952#section-4.2))

The IPv6 address topology describes the last 64 bits as the host identifier. Matching on a `/128` prefix would identify a specific IPv6 address, but not the host in general. It would be possible for an attacker to change their specific IPv6 address from a single machine.

{{</Aside>}}

You can use uppercase or lowercase characters for IPv6 addresses in lists. However, when you save the list, uppercase characters are converted to lowercase.

### Lists with hostnames

{{<Aside type="note">}}
Currently available to select Enterprise customers. To get access, contact your account team.
{{</Aside>}}

List items in custom lists with hostnames must be Fully Qualified Domain Names (FQDNs). An item may contain a `*` prefix/subdomain wildcard, which must be followed by a `.` (period). An item cannot include a scheme (for example, `https://`) or a URL path.

For example, the following entries would be valid for a custom list with hostnames:

- `example.com`
- `api.example.com`
- `*.example.com`

However, `example.com/path/subfolder` would not be a valid entry.

You can add any valid hostname (a valid FQDN) to a custom list with hostnames. The hostnames do not need to belong to the current Cloudflare account.

### Lists with ASNs

{{<Aside type="note">}}
Currently available to select Enterprise customers. To get access, contact your account team.
{{</Aside>}}

List items in custom lists with ASNs must be integer values.

For example, the following entries would be valid for a list with ASNs:

- `1`
- `13335`
- `64512`

## CSV file format for bulk import operations

The exact format of CSV file entries varies according to the type of list items you are importing.

### Lists with IP addresses (IP lists)

When uploading items to a custom list with IP addresses via CSV file, use the following file format (enter one item per line):

```txt
<IP_ADDRESS_1>,<DESCRIPTION>
<IP_ADDRESS_2>
```

The `<DESCRIPTION>` field is optional.

### Lists with hostnames

When uploading items to a custom list with hostnames via CSV file, use the following file format:

```txt
<HOSTNAME_1>,<DESCRIPTION>
<HOSTNAME_2>
```

The `<DESCRIPTION>` field is optional.

### Lists with ASNs

When uploading items to a custom list with ASNs via CSV file, use the following file format:

```txt
<ASN_1>,<DESCRIPTION>
<ASN_2>
```

The `<DESCRIPTION>` field is optional.
