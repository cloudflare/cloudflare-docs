---
_build:
  publishResources: false
  render: never
  list: never

name: "Compliant TransformStream constructor"
sort_date: "2022-11-30"
enable_date: "2022-11-30"
enable_flag: "transformstream_enable_standard_constructor"
disable_flag: "transformstream_disable_standard_constructor"
---

Previously, the `new TransformStream()` constructor was not compliant with the Streams API standard. Use the `transformstream_enable_standard_constructor` to opt-in to the backwards-incompatible change to make the constructor compliant. Must be used in combination with the `streams_enable_constructors` flag.
