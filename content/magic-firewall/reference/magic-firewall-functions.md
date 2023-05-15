---
title: Magic Firewall functions
pcx_content_type: reference
meta:
  title: Magic Firewall Functions
  description: Review functions available in Cloudflare Magic Firewall.
---

# Magic Firewall Functions

- <code>bit_slice(protocol {{<type>}}String{{</type>}}, offset_start {{<type>}}Number{{</type>}}, offset_end {{<type>}}Number{{</type>}})</code> {{<type>}}Number{{</type>}}

  - This function looks for matches on a given slice of bits.
  - The offset starts on the given protocol header. For example, to match on the first bit of payload for a UDP packet, you must set `offset_start` to `64`.
  - This is primarily intended for use with `ip`, `udp` and `tcp`.
  - The slice (`offset_end` — `offset_start`) can be no longer than 32 bits, but multiple calls can be joined together via logical expressions.
  - The `bit_slice` offset cannot exceed 2040 bits.
