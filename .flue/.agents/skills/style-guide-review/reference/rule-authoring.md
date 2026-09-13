# How to Write Style-Guide Review Rules

This file is guidance for maintainers and agents who add new rules to the style-guide review skill. It is not a runtime review file and is not listed in `manifest.json`.

## Rule categories

| Category     | Directory                  | Load condition                                           |
| ------------ | -------------------------- | -------------------------------------------------------- |
| `always`     | `reference/always/`        | Loaded for every reviewed MDX file with added content.   |
| `conditional`| `reference/conditional/`   | Loaded when the patch matches a trigger described in the manifest `when` field and the SKILL.md reference selection. |
| `component`  | `reference/components/`    | Loaded when the patch contains a specific component tag or imports a component name. The manifest `componentNames` field lists which names trigger the load. |

## Rule format

Each rule is an explicit if/then check with a severity:

```
- If <condition on added lines> → **<severity>**: <what to do>.
```

Severities:
- `warning` — clear rule violation, correctness issue, or convention breach.
- `suggestion` — improvement covered by a rule but not strictly required.

## Writing a good rule

1. **Be specific.** The condition must be checkable by mechanical pattern matching on added lines. Avoid vague guidance like "consider improving clarity."
2. **Include false-positive exceptions.** If a rule could fire inside code blocks, JSX component props, or application code examples, add an explicit exception.
3. **Do not duplicate CI.** Before adding a rule, verify the repository does not already catch the issue in CI (build, typecheck, lint, link validation, schema validation).
4. **Remember the agent sees added lines by default.** Rules match on the content of added/changed lines with their new-file line numbers. The agent can optionally use `read_repo_file` to read the full current file for surrounding context (e.g. to check whether an added line is inside a fenced code block), but rules should be written to match on the added lines themselves whenever possible.
5. **Consider providing examples.** Correct and incorrect examples help the model pattern-match accurately, but keep them minimal — rule files share context window space, so conciseness matters.

## Wiring a new rule

1. Create or edit the reference `.md` file in the appropriate `reference/` subdirectory.
2. Add an entry to `reference/manifest.json` with `id`, `file`, `load`, and `when` (plus `componentNames` for component rules).
3. Update the SKILL.md reference selection section with a new load condition line for conditional rules.
4. Add at least two eval cases: one that triggers the rule and one clean counterexample that does not.
5. Update `.agents/references/style-guide.md` if the rule represents a public docs convention that contributors should follow.

## Evaluating rules

Run the style-guide evals against a live Flue dev server:

```bash
pnpm run flue:dev          # terminal 1
pnpm --dir .flue run evals # terminal 2
```

Each new rule should have:
- A **violation eval** — added lines that should trigger the rule. Assert the finding exists with the expected severity, path, and line.
- A **clean counterexample eval** — added lines that are similar but correct. Assert no warnings are produced.
