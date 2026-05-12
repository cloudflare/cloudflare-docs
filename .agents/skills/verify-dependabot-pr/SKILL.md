---
name: verify-dependabot-pr
description: Analyzes a Dependabot PR to determine what actually changed in each bumped package and whether those changes affect this repo. Reports changed APIs/methods, which doc pages use them, and the realistic probability of any visible impact on the docs site.
---

Load this skill when asked to review, analyze, assess, or verify a Dependabot PR.

## Goal

Give the reviewer a clear answer to: **does this version bump require any action beyond merging?**

## Process

### 1. Identify the packages being bumped

```bash
gh pr view <PR_NUMBER> --repo cloudflare/cloudflare-docs --json title,body
```

Parse the PR body to extract package name(s) and version range (old → new). Dependabot PRs always include this in structured form.

For grouped PRs, there will be multiple packages. Process each one.

### 2. Fetch the changelog / release notes for each package

Check in this order — stop at the first that works:

1. **GitHub releases** — `gh release list --repo <upstream-repo>` then `gh release view <tag>`
2. **CHANGELOG.md in the repo** — `gh api repos/<upstream>/contents/CHANGELOG.md` (decode base64)
3. **npm changelog** — `npm view <package>@<new-version> changelog` or the registry page
4. **Commit diff** — if no changelog exists, diff the tag range:
   ```bash
   gh api repos/<upstream>/compare/<old-tag>...<new-tag> --jq '.commits[].commit.message'
   ```

Focus only on the commits/entries between old and new version. Ignore unrelated history.

### 3. Extract what changed

From the changelog/diff, identify:

- **Breaking changes** — removed or renamed exports, changed function signatures, dropped Node/browser support
- **Behavior changes** — anything that alters output, side effects, or defaults
- **New APIs** — new exports, methods, or options (usually irrelevant unless we start using them)
- **Bug fixes** — especially if they fix incorrect output we might depend on
- **Security fixes** — note the CVE/GHSA ID and what it affects

Ignore: internal refactors, CI changes, test changes, type-only changes that don't affect emitted JS.

### 4. Determine how this repo uses the package

Run these searches against the local codebase. **Do not skip this step.**

```bash
# Direct import anywhere in source
grep -r "from ['\"]<package>['\"]" src/ worker/ bin/ --include="*.ts" --include="*.tsx" --include="*.mjs" --include="*.js" --include="*.astro" -l

# require() usage
grep -r "require(['\"]<package>['\"]" src/ worker/ bin/ -l

# Is it a direct or transitive dependency?
grep '"<package>"' package.json

# If transitive, who pulls it in?
node -e "const lock = require('./pnpm-lock.yaml'); ..." 
# or just:
grep -A2 '"<package>"' pnpm-lock.yaml | grep -v "^--$" | head -20
```

If the package is **not directly imported** anywhere, it is transitive. Identify which direct dependency pulls it in by checking `pnpm-lock.yaml`.

### 5. Map usage to doc pages

If the package is directly imported, find which source files use the specific APIs that changed:

```bash
# For each changed method/export, search for callsites
grep -r "<method_name>\|<export_name>" src/ worker/ bin/ --include="*.ts" --include="*.tsx" --include="*.astro" -l
```

For Astro/MDX source files under `src/content/docs/`, map them to their route:
- `src/content/docs/workers/get-started/index.mdx` → `/workers/get-started/`
- `src/content/docs/pages/platform/limits.mdx` → `/pages/platform/limits/`

If more than ~5 files use the changed API, list a representative sample (pick the most prominent product areas).

### 6. Assess impact

Rate the probability that this bump causes a **visible change to the docs site**:

| Rating | Meaning |
|--------|---------|
| **None** | Package not used directly; transitive only; or only internal/type changes |
| **Very Low** | Direct dependency, but changed APIs are not called in this repo |
| **Low** | Changed APIs are called, but only in build tooling (not runtime or content rendering) |
| **Medium** | Changed APIs affect content rendering (Astro components, MDX processing, syntax highlighting) |
| **High** | Changed APIs affect output seen by users — rendered HTML, search index, Worker behavior |

For **security fixes**: note what the vulnerability affects and whether our usage is in the vulnerable code path.

## Output format

```
## <package-name>: <old-version> → <new-version>

**Type of update:** [security fix | bug fix | feature | breaking change]
**Dependency type:** [direct | transitive (pulled in by <package>)]

### What changed
- <bullet: specific API/behavior change>
- <bullet: ...>

### Usage in this repo
<"Not used directly — transitive only" OR list of files/callsites>

### Affected doc pages (sample)
- `/product/section/page/` — uses `<method>`
- (none)

### Impact rating: <None | Very Low | Low | Medium | High>
<1–2 sentence explanation of the rating>
```

If the PR bumps multiple packages, repeat the block for each. End with a one-line recommendation:

- **Merge** — no action needed
- **Merge + verify** — merge, then spot-check the listed pages
- **Investigate before merging** — high-impact change, needs manual testing

## Special cases

### Security PRs opened outside the schedule

Dependabot opens security PRs immediately, regardless of `dependabot.yml` schedule. This is expected. The `schedule.day` setting only applies to version updates.

Security PRs are also not grouped with other packages — each gets its own PR. This is also expected GitHub behavior.

### Grouped PRs

For grouped PRs (non-major group), the PR body lists each package separately. Process each package independently through steps 2–6, then give a combined recommendation.

### Packages with no public changelog

If a package has no changelog and the upstream repo is private or unavailable:
1. Check npm for version diff: `npm diff <package>@<old> <package>@<new>`
2. If that also fails, note it explicitly and rate impact conservatively based on usage alone.
