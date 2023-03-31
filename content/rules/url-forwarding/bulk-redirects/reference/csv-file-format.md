---
title: CSV file format
pcx_content_type: reference
weight: 6
meta:
  title: CSV file format to import URL redirects
---

# CSV file format to import URL redirects

You can use a CSV file to import URL redirects into a Bulk Redirect List [using the Cloudflare dashboard](/rules/url-forwarding/bulk-redirects/create-dashboard/#1-create-a-bulk-redirect-list). Each line in the CSV file must follow this format:

```txt
<SOURCE_URL>,<TARGET_URL>[,<STATUS_CODE>,<PRESERVE_QUERY_STRING>,<INCLUDE_SUBDOMAINS>,<SUBPATH_MATCHING>,<PRESERVE_PATH_SUFFIX>]
```

Only the `<SOURCE_URL>` and `<TARGET_URL>` values are mandatory. The default value of `<STATUS_CODE>` is `301` and the default value for all the boolean parameters is `FALSE`.

To enable one of the URL redirect parameters, use one of the following values: `TRUE` or `true`. To keep an option disabled, use one of `FALSE` or `false`, or enter a comma (delimiter) without entering any value.

## Example CSV file

All the lines in this example are valid lines that you can import in the dashboard:

```txt
example.com/contacts,https://example.net/contact-us,301,,,,
example.com/about,https://example.net/about-us,,FALSE,TRUE,,
"example.com/search?q=bar,baz",https://example.net/search,,TRUE
example.com/docs,https://example.com/draft-docs,302,,TRUE
```

## Important remarks

- The CSV file must not include a header row with column names.
- A source/target URL must be enclosed in quotes (`"`) when it includes a comma (`,`). You can always enclose URL values in quotes, but it is not required.
- You can skip an optional value by immediately entering a comma (the delimiter) without entering any value.
- You do not need to include trailing commas.
