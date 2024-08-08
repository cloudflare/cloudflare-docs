---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: selector;;selectorName
---

In the **Value** field, you can input either a single value or use regular expressions to specify a range of values.

Gateway uses Rust to evaluate regular expressions. The Rust implementation is slightly different than regex libraries used elsewhere. For more information, refer to our guide for [Wildcards](/cloudflare-one/policies/access/app-paths/#wildcards). To evaluate if your regex matches, you can use [Rustexp](https://rustexp.lpil.uk/).

If you want to match multiple values, you can use the pipe symbol (`|`) as an OR operator. In Gateway, you do not need to use an escape character (`\`) before the pipe symbol. For example, the following policy blocks requests to two $1 if either appears in a request header:

| Selector | Operator      | Value                                  | Action |
| -------- | ------------- | -------------------------------------- | ------ |
| $2       | matches regex | `.\*whispersystems.org\|.\*signal.org` | Block  |

In addition to regular expressions, you can use [logical operators](#logical-operators) to match multiple values.
