---
_build:
  publishResources: false
  render: never
  list: never
---

* `"before": "<RULE_ID>"` — Places the rule before rule `<RULE_ID>`. Use this argument with an empty rule ID value (`""`) to set the rule as the first rule in the ruleset.

* `"after": "<RULE_ID>"` — Places the rule after rule `<RULE_ID>`. Use this argument with an empty rule ID value (`""`) to set the rule as the last rule in the ruleset.

* `"index": <POSITION_NUMBER>` — Places the rule in the exact position specified by the integer number `<POSITION_NUMBER>`. Position numbers start with `1`. Existing rules in the ruleset from the specified position number onward are shifted one position (no rule is overwritten). For example, when you place a rule in position <var>n</var> using `index`, existing rules with index <var>n</var>, <var>n</var>+1, <var>n</var>+2, and so on, are shifted one position — their new position will be <var>n</var>+1, <var>n</var>+2, <var>n</var>+3, and so forth. If the index is out of range, the method returns 400 HTTP Status Code.

{{<Aside type="warning" header="Important">}}
You can only use one of the `before`, `after`, and `index` fields at a time.
{{</Aside>}}
