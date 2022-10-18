---
_build:
  publishResources: false
  render: never
  list: never

name: "`FormData` parsing supports `File`"
sort_date: "2021-11-03"
enable_date: "2021-11-03"
enable_flag: "formdata_parser_supports_files"
disable_flag: "formdata_parser_converts_files_to_strings"
---

[The `FormData` API](https://developer.mozilla.org/en-US/docs/Web/API/FormData) is used to parse data (especially HTTP request bodies) in `multipart/form-data` format.

Originally, the Workers runtime's implementation of the `FormData` API incorrectly converted uploaded files to strings. Therefore, `formData.get("filename")` would return a string containing the file contents instead of a `File` object. This change fixes the problem, causing files to be represented using `File` as specified in the standard.
