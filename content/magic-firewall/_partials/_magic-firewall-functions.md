---
_build:
  publishResources: false
  render: never
  list: never
---

{{<definitions>}}

- <code id="function-bit_slice">{{<name>}}bit_slice{{</name>}}(protocol {{<type>}}String{{</type>}}, offset_start {{<type>}}Number{{</type>}}, offset_end {{<type>}}Number{{</type>}})</code> {{<type>}}Number{{</type>}}

  - This function looks for matches on a given slice of bits.
  - The offset starts on the given protocol header. For example, to match on the first bit of payload for a UDP packet, you must set `offset_start` to `64`.
  - This is primarily intended for use with `ip`, `udp`, and `tcp`.
  - The slice (`offset_end` — `offset_start`) cannot be longer than 32 bits, but multiple calls can be joined together via logical expressions.
  - The `bit_slice` offset cannot exceed 2,040 bits.

{{</definitions>}}
