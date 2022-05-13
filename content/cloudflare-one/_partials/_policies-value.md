---
_build:
  publishResources: false
  render: never
  list: never
---

You can input a single value or use regular expressions to specify a range of values. 

Gateway uses Rust to evaluate regular expressions. The Rust implementation is slightly different than regex libraries used elsewhere. For more information, refer to our guide for [Using wildcards in subdomains and paths](/cloudflare-one/policies/access/app-paths/#using-wildcards-in-subdomains-and-paths).

For example, if you want to match multiple domains, you could use the pipe symbol (`|`) as an OR operator. In Gateway, you do not need to use an escape character (`\`) before the pipe symbol. The following configuration blocks requests to two hosts if either appears in a request header:

| Selector | Operator      | Value                                   | Action |
| -------- | ------------- | ----------------------------------------| ----- |
| Host     | Matches regex | `.\*whispersystems.org \|.\*signal.org` | Block |

To evaluate if your regex matches, you can use [Rustexp](https://rustexp.lpil.uk/).
