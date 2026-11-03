# How to Write Style-Guide Review Rules

This file is guidance for maintainers and agents who add style-guide review rules. It is not a runtime rule file.

## How rules load

Every rule file in `always/`, `conditional/`, and `components/` loads for every style review. The directories only group related rules. `lib/agents/review-rules.ts` lists the files and wraps each in a `<style_rules>` section.

Two agents load the same list:

- The style-guide reviewer reports violations of these rules.
- The review judge keeps a style finding only when it breaks one of these rules. A problem no rule covers is dropped, even if the reviewer reports it.

## Rule format

Each rule is an explicit if/then check:

```
- If <condition on added lines> → <what to do>.
```

## Writing a good rule

1. **Be specific.** The condition must be checkable by mechanical pattern matching on added lines. Avoid vague guidance like "consider improving clarity."
2. **Include false-positive exceptions.** If a rule could fire inside code blocks, JSX component props, or application code examples, add an explicit exception.
3. **Do not duplicate CI.** Before adding a rule, verify the repository does not already catch the issue in CI (build, typecheck, lint, link validation, schema validation).
4. **Remember the agent sees added lines by default.** Rules match on the content of added lines with their new-file line numbers. The agent can use `read_repo_file` to read the full file for context, such as whether an added line is inside a fenced code block, but write rules to match on the added lines whenever possible.
5. **Keep examples minimal.** Correct and incorrect examples help the model pattern-match, but every rule file loads into both agents' context.

## Wiring a new rule

1. Create or edit a `.md` file in `always/`, `conditional/`, or `components/`.
2. For a new file, add it to `STYLE_RULE_FILES` in `lib/agents/review-rules.ts`. A unit test fails if a file on disk is missing from the list.
3. Add eval cases to `evals/style-guide-reviewer.eval.ts`: one that triggers the rule and one clean counterexample that does not.
4. Update `.agents/references/style-guide.md` if the rule represents a public docs convention that contributors should follow.

## Evaluating rules

`pnpm run flue:evals` starts a dev server, runs every eval, and stops the server.
