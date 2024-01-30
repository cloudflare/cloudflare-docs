---
pcx_content_type: how-to
title: Lists
weight: 13
---

# Lists

With Cloudflare Zero Trust, you can create lists of URLs, hostnames, or other entries to reference when creating [Gateway policies](/cloudflare-one/policies/gateway/) or [Access policies](/cloudflare-one/policies/access/). This allows you to quickly create rules that match and take actions against several items at once.

Before creating a list, make note of the [limitations](#limitations).

{{<render file="gateway/_lists.md">}}

## Edit a list

1. In the **Lists** page, locate the list you want to edit.

2. Select **Edit**. This will allow you to:

   - Edit list name and description by selecting on the three-dots menu to the right of your list's name.
   - Delete the list by selecting the three-dots menu to the right of your list's name.
   - Delete individual entries.
   - Manually add entries to your list.

3. Once you have edited your list, select **Save**.

## Limitations

### List size

Your lists can include up to 1,000 entries for Standard plans and 5,000 for Enterprise plans. An uploaded CSV file must be smaller than 2 MB.

### Duplicate entries

Lists cannot have duplicate entries. Because hostnames are converted to [Punycode](https://www.rfc-editor.org/rfc/rfc3492.txt), multiple list entries that convert to the same string will count as duplicates. For example, `éxàmple.com` converts to `xn—xmple-rqa5d.com`, so including both `éxàmple.com` and `xn—xmple-rqa5d.com` in a list will result in an error.

### URL slashes

{{<render file="gateway/_url-slash.md">}}

### Extended email addresses

{{<render file="gateway/_extended-email.md">}}
