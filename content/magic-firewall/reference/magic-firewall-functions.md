---
title: Magic Firewall functions
pcx-content-type: reference
---

# Magic Firewall Functions

- <code>bit_slice(<Type>String</Type>, <Type>Number</Type>, <Type>Number</Type>)</code> <Type>Number</Type>

  - Select a slice of contiguous bits from a string field. This is primarily intended for use with <code class="InlineCode">ip</code> and <code class="InlineCode">tcp</code>.
  - The slice can be no longer than 31 bits, but multiple calls can be joined together via a logical expression.
  - Use of structure fields is preferred over this mechanism.
