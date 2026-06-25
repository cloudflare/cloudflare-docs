---
name: docs-triage
description: Triages Cloudflare docs pull requests by product area, readiness, ownership, risk, age, CI, and review blockers. Load when asked to list, rank, classify, shallow-review, approve, auto-merge, unapprove, or replay PR triage workflows for cloudflare/cloudflare-docs.
---

Use this skill for docs PR queue work in `cloudflare/cloudflare-docs`: finding candidates, classifying them, doing shallow docs review, and taking explicit approval or auto-merge actions.

## Principles

- **Progressive discovery:** list broadly, enrich likely candidates, read diffs last.
- **Never approve blind:** inspect metadata, checks, files, and a lightweight diff before recommending approval.
- **Act only on explicit instruction:** approve, request changes, enable auto-merge, update branches, commit, push, or modify PR branches only when the user names PRs or references numbered results they just approved.
- **Prefer low-risk throughput:** prioritize small, clean, product-owner-only PRs with passing checks and no unresolved review concerns.
- **Use subagents for batches:** when 4+ PRs need independent docs review or fixes, review them in parallel and correlate results.

## Prerequisites

Verify GitHub access before querying or acting:

```bash
gh auth status
gh repo view cloudflare/cloudflare-docs --json defaultBranchRef
```

If either command fails, stop and report the blocker.

## Triage Gates

Evaluate each PR in this order:

| Gate         | Ready                                                            | Blocked                                                           |
| ------------ | ---------------------------------------------------------------- | ----------------------------------------------------------------- |
| State        | `OPEN`, not draft                                                | Draft, closed, merged                                             |
| Mergeability | `mergeStateStatus` is not `DIRTY`                                | Merge conflicts, branch out of date when required                 |
| Checks       | All required checks `SUCCESS` or `SKIPPED`                       | Failed checks, pending checks when merge is requested             |
| Reviews      | No `CHANGES_REQUESTED`; product-owner review is the main blocker | Requested changes, unresolved bot comments, other required teams  |
| Scope        | Small or medium docs-only diff                                   | Large rewrites, code changes, generated churn, >500 files         |
| Accuracy     | Claim is obvious or source-backed                                | Needs product/domain owner judgment                               |
| Author       | Maintainer can modify, or no fix needed                          | External branch with needed fixes and `maintainerCanModify=false` |

Use these labels in output: **Approve**, **Approve with nit**, **Minor fix first**, **Needs product review**, **Blocked**, **Do not approve**.

## Size Heuristic

Classify by the larger risk signal from files changed and line delta (`additions + deletions`):

| Size | Heuristic                        |
| ---- | -------------------------------- |
| S    | `<= 25` lines and `<= 2` files   |
| M    | `<= 150` lines and `<= 8` files  |
| L    | `<= 500` lines and `<= 20` files |
| XL   | `> 500` lines or `> 20` files    |

Flag any PR with `> 500` changed files as a likely bad rebase, generated churn, or branch hygiene issue. Do not approve it until the diff is reduced or explained.

## Ownership

Classify author as:

| Type     | Evidence                                                                                                                                                 |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Internal | `authorAssociation` is `MEMBER`, `OWNER`, or `COLLABORATOR`; author appears directly in `.github/CODEOWNERS`; or commit email domain is `cloudflare.com` |
| External | `authorAssociation` is `FIRST_TIME_CONTRIBUTOR`, `CONTRIBUTOR`, or unknown with no Cloudflare evidence                                                   |
| Bot      | Dependabot, GitHub Actions, or Cloudflare automation                                                                                                     |

Do not print private email addresses. Report only the evidence category, such as `internal (member)` or `internal (Cloudflare commit email)`.

## Product Area

Infer product from changed paths, not just title text:

| Path                                             | Product area           |
| ------------------------------------------------ | ---------------------- |
| `src/content/docs/{slug}/`                       | `{slug}`               |
| `src/content/partials/{slug}/`                   | `{slug}`               |
| `src/content/changelog/{slug}/`                  | `{slug}`               |
| `src/assets/images/{slug}/`                      | `{slug}`               |
| `.github/`, `bin/`, `worker/`, `src/components/` | repo/tooling/code area |

For multi-product PRs, list the top 2-3 areas by changed files. If the user asks for `/cloudflare-one/*`, include docs, partials, changelog, and image paths for that slug.

## Quick Commands

| Task                     | Command                                                                                                                                                                                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| List open PRs            | `gh pr list --repo cloudflare/cloudflare-docs --state open --limit 300 --json number,title,url,createdAt,author,additions,deletions,changedFiles,isDraft,reviewDecision,mergeStateStatus,statusCheckRollup,reviewRequests,files,labels,autoMergeRequest`               |
| View one PR              | `gh pr view <N> --repo cloudflare/cloudflare-docs --json number,title,url,author,createdAt,additions,deletions,changedFiles,isDraft,mergeStateStatus,reviewDecision,statusCheckRollup,reviewRequests,latestReviews,files,commits,maintainerCanModify,autoMergeRequest` |
| Read diff                | `gh pr diff <N> --repo cloudflare/cloudflare-docs`                                                                                                                                                                                                                     |
| Check CI                 | `gh pr checks <N> --repo cloudflare/cloudflare-docs --watch=false`                                                                                                                                                                                                     |
| Count exact files        | `gh pr view <N> --repo cloudflare/cloudflare-docs --json changedFiles --jq .changedFiles`                                                                                                                                                                              |
| Check author association | `gh api graphql -f query='query($owner:String!,$repo:String!,$number:Int!){repository(owner:$owner,name:$repo){pullRequest(number:$number){authorAssociation}}}' -f owner=cloudflare -f repo=cloudflare-docs -F number=<N>`                                            |
| Approve                  | `gh pr review <N> --repo cloudflare/cloudflare-docs --approve --body "Approved for docs auto-merge."`                                                                                                                                                                  |
| Enable auto-merge        | `gh pr merge <N> --repo cloudflare/cloudflare-docs --auto --squash`                                                                                                                                                                                                    |
| Disable auto-merge       | `gh pr merge <N> --repo cloudflare/cloudflare-docs --disable-auto`                                                                                                                                                                                                     |
| Unapprove                | `gh pr review <N> --repo cloudflare/cloudflare-docs --request-changes --body "Unapproving per request."`                                                                                                                                                               |
| Verify merged            | `gh pr view <N> --repo cloudflare/cloudflare-docs --json state,mergedAt,mergeStateStatus,autoMergeRequest,reviewDecision`                                                                                                                                              |

## Progressive Discovery Workflow

Use this checklist for broad queue triage:

```txt
- [ ] Capture the user's filters: product paths, count, ready state, age, internal/external, product-owner blocker, CI state.
- [ ] Query open PR metadata without diffs.
- [ ] Filter by product path and required readiness gates.
- [ ] Classify size, age, ownership, product area, and blockers.
- [ ] Enrich only likely candidates with exact file list, checks, reviews, and diff.
- [ ] Shallow-review candidates for docs correctness and style-guide risk.
- [ ] Rank by approvability or complexity.
- [ ] Ask for explicit confirmation before taking approval, merge, branch update, commit, or push actions unless the user already gave that instruction.
- [ ] Report actions taken and PRs still blocked.
```

## Replayable Workflows

### Product Queue

Use when the user asks for PRs touching a product path, such as `/cloudflare-one/*`, `/r2/*`, or `/artifacts/*`.

1. Fetch open PRs with file paths.
2. Match product paths across docs, partials, changelog, and images.
3. Exclude drafts unless the user asks for all PRs.
4. Classify by size, age, author type, CI, and review blocker.
5. Read the diff for the top candidates only.
6. Return a numbered list so the user can reply with item numbers.

### Product-Owners Approval Queue

Use when the user asks for PRs blocked on `cloudflare/product-owners`.

1. Search for open PRs with `team-review-requested:cloudflare/product-owners`.
2. Exclude drafts, dirty branches, `CHANGES_REQUESTED`, failed checks, and large unclear diffs.
3. Prefer S and M docs-only changes with clean bot reviews.
4. Shallow-review each diff against `.agents/references/style-guide.md` and product accuracy risk.
5. Rank least to most complex, or most to least approvable, matching the user's wording.

### Approval And Auto-Merge

Use only after the user explicitly says `approve`, `auto-merge`, `merge`, or maps numbered results to those actions.

1. Re-check each PR's state immediately before acting.
2. Skip drafts, dirty branches, failed checks, pending required checks, and PRs with requested changes unless the user explicitly accepts the risk.
3. Approve with a short body: `Approved for docs auto-merge.` or `Approved after minor docs fix.`
4. Enable auto-merge with squash.
5. Re-read the PR state and report which PRs merged, have auto-merge enabled, or remain blocked.

### Minor Fix First

Use when the PR is otherwise approvable but needs a trivial docs fix.

1. Confirm the branch can be modified.
2. Use an isolated worktree or subagent for fixes to avoid contaminating the current workspace.
3. Keep fixes narrow: broken links, dates, formatting, typo, obvious style-guide issue, small build failure.
4. Run targeted validation first; run `pnpm run check` for MDX/content changes when practical.
5. Commit and push only when the user explicitly requested it.
6. Re-check CI, approve, and enable auto-merge only if requested.

### Unapprove Or Block

Use when the user asks to unapprove or block a PR.

1. If GitHub will not dismiss the approval directly, submit a `CHANGES_REQUESTED` review.
2. Disable auto-merge.
3. Verify `reviewDecision`, `autoMergeRequest`, and merge state.
4. Report that the PR is blocked and how to re-approve later.

## Shallow Review Checklist

Before saying a PR is approval-ready, check:

- Diff matches the title and PR description.
- Changed links are root-relative, valid-looking, and have trailing slashes where appropriate.
- MDX prose has no obvious unescaped `{`, `}`, `<`, or `>`.
- Components used in MDX are imported from `~/components`.
- Code examples are syntactically plausible and focus on the problem.
- Changelog entries use valid frontmatter, product folder, date, and docs links.
- Frontmatter descriptions are concise and content type is valid for docs pages.
- Large restructures include redirects when pages move or are deleted.
- Product claims are source-backed or low-risk enough for product-owner approval.

If the PR touches Workers code examples or Cloudflare API usage, load `code-review`. If reviewing docs content deeply or posting suggestions, load `docs-review`.

## Output Formats

For list/rank requests, use a table:

| Rank | PR  | Area | Size | Age | Author | CI  | Blocker | Recommendation |
| ---- | --- | ---- | ---- | --- | ------ | --- | ------- | -------------- |

Use raw links, not parenthesized links, when the user asks for links that can be copied easily.

For action requests, report only what happened:

| PR  | Action | Result | Remaining blocker |
| --- | ------ | ------ | ----------------- |

Keep summaries short. Do not list every changed file unless file paths are the user's requested filter or explain a blocker.
