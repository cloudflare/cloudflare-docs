---
title: CSV file format
pcx-content-type: reference
weight: 6
meta:
  title: CSV file format to create Bulk Redirects
---

# CSV file format to create Bulk Redirects

You can use a CSV file to create Bulk Redirects [using the Cloudflare dashboard](/rules/bulk-redirects/create-dashboard/). Each line in the CSV file must follow this format:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&ltSOURCE_URL&gt,&ltTARGET_URL&gt[,&ltSTATUS_CODE&gt,&ltPRESERVE_QUERY_STRING&gt,&ltINCLUDE_SUBDOMAINS&gt,&ltSUBPATH_MATCHING&gt,&ltPRESERVE_PATH_SUFFIX&gt]</span></div></span></span></span></code></pre>{{</raw>}}

Only the `<SOURCE_URL>` and `<TARGET_URL>` values are mandatory. The default value of `<STATUS_CODE>` is `301` and the default value for all the boolean parameters is `FALSE`.

To enable one of the URL Redirect parameters, use one of the following values: `TRUE`, `true`, or `1`. To keep an option disabled, use one of `FALSE`, `false`, or `0`, or enter a comma (delimiter) without entering any value.

## Example CSV file

All the lines in this example are valid lines that you can import in the dashboard:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/contacts,https://example.net/contact-us,301,,,,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/about,https://example.net/about-us,,FALSE,TRUE,,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&quot;example.com/search?q=bar,baz&quot;,https://example.net/search,,TRUE</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/docs,https://example.com/draft-docs,302,,TRUE</span></div></span></span></span></code></pre>{{</raw>}}

## Important remarks

- The CSV file must not include a header row with column names.
- A source/target URL must be enclosed in quotes (`"`) when it includes a comma (`,`). You can always URL values in quotes, but it is not required.
- You can skip an optional value by immediately entering a comma (the delimiter) without entering any value.
- You do not need to include trailing commas.
