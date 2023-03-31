---
title: Magic Firewall functions
pcx_content_type: reference
meta:
  title: Magic Firewall Functions
  description: Review functions available in Cloudflare Magic Firewall.
---

# Magic Firewall Functions

- <code>bit\_slice({{<type>}}String{{</type>}}, {{<type>}}Number{{</type>}}, {{<type>}}Number{{</type>}})</code> {{<type>}}Number{{</type>}}

  - Select a slice of contiguous bits from a string field. This is primarily intended for use with <code class="InlineCode">ip</code> and <code class="InlineCode">tcp</code>.
  - The slice can be no longer than 31 bits, but multiple calls can be joined together via a logical expression.
  - Use of structure fields is preferred over this mechanism.
