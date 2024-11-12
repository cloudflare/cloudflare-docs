---
_build:
  publishResources: false
  render: never
  list: never

name: "`Vectorize` query with metadata optionally returned"
sort_date: "2023-11-08"
enable_date: "2023-11-08"
enable_flag: "vectorize_query_metadata_optional"
disable_flag: "vectorize_query_original"
---

A set value on `vectorize_query_metadata_optional` indicates that the Vectorize query operation should accept newer arguments with `returnValues` and `returnMetadata` specified discretely over the older argument `returnVectors`. This also changes the return format. If the vector values have been indicated for return, the return value is now a flattened vector object with `score` attached where it previously contained a nested vector object.
