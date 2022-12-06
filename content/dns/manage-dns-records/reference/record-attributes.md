---
pcx_content_type: reference
title: Record attributes
weight: 4
meta: 
    title: DNS record comments and tags
---

# Record attributes

Use DNS record comments and tags to categorize and clarify the purpose of DNS records within Cloudflare.

Comments provide a unique descriptions for specific records, whereas tags group similar records into categories.

These attributes are particularly useful when:

- Multiple teams are managing DNS records within the same zone.
- Your zone contains a large number of DNS records.
- You need to search through your DNS records.

{{<Aside type="note">}}

The information in record attributes will not impact DNS record resolution or propagation timing and is only meant for your reference.

{{</Aside>}}

---

## Availability

Currently, comments and tags are only supported for [full](/dns/zone-setups/full-setup/) and [partial zones](/dns/zone-setups/partial-setup/).

### Record comments

{{<feature-table id="dns.record_comments">}}

### Record tags

{{<feature-table id="dns.record_tags">}}

---

## Add or edit record attributes

Create or edit record attributes just like any other aspect of a [DNS record](/dns/manage-dns-records/how-to/create-dns-records/).

You can also add or edit attributes by [exporting and re-importing](/dns/manage-dns-records/how-to/import-and-export/#dns-record-attributes) your records.

---

## Reference

### Comments

Comments are treated as `strings`, meaning that they are case sensitive and do not have any character limitations. However, comments do not support HTML formatting such as `\n` or `\r`.

### Tags

Tags are treated as an array of `name:value` pairs, meaning that tags are not case sensitive and tag names can only contain letters, numbers, `-`, and `_`.
