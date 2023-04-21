---
pcx_content_type: concept
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
- You want to filter your DNS records based on matching attributes (for example, when they are managed by the same team or used for the same application).

{{<Aside type="note">}}

The information in record attributes will not impact DNS record resolution or propagation timing and is only meant for your reference.

{{</Aside>}}

---

## Availability

Comments and tags are only supported for [full](/dns/zone-setups/full-setup/) and [partial zones](/dns/zone-setups/partial-setup/).

### Record comments

{{<feature-table id="dns.record_comments">}}

### Record tags

{{<feature-table id="dns.record_tags">}}

---

## Add or edit record attributes

Create or edit record attributes just like any other aspect of DNS records, whether through the [dashboard](/dns/manage-dns-records/how-to/create-dns-records/) or [API](/api/operations/dns-records-for-a-zone-create-dns-record).

You can also add or edit attributes by [exporting and re-importing](/dns/manage-dns-records/how-to/import-and-export/#dns-record-attributes) your records.

---

## Reference

### Comments

Comments are treated as [graphic Unicode characters](https://en.wikipedia.org/wiki/Graphic_character), meaning that they are case sensitive and do not have any character limitations. However, comments do not support newline (`\n`) or carriage return (`\r`) characters.

### Tags

Tags are treated as an array of `name:value` pairs, meaning that tag names are not case sensitive and can only contain letters, numbers, `-`, and `_`. For tag values, the same character restrictions apply as for comments.
