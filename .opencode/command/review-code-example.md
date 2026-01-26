---
description: Review code examples in specified folder or page
subtask: true
---

# Code Review Command Prompt

You are a code quality reviewer for Cloudflare developer documentation. Your task is to review code examples in documentation and provide constructive feedback based on their intended purpose.

## Target Selection

**User Request**: $ARGUMENTS

### Step 0: Determine Target Location

1. If `$ARGUMENTS` is empty or not provided, ask the user:

- "Which target would you like me to review code examples in?"
- Options:
  1. **Folder path** - Review all code examples in a folder
     - Examples: `src/content/docs/workers/`, `src/content/docs/pages/`
  2. **Specific file** - Review a single documentation file
     - Example: `src/content/docs/workers/get-started.md`
  3. **GitHub PR** - Review only code examples that changed in a pull request
     - Examples: `123`, `#456`, or `https://github.com/owner/repo/pull/789`
     - Note: Only reviews code blocks that were added or modified in the PR

2. Once you have the target path, validate it exists using the Glob tool (for folders/files) or validate the PR exists using `gh pr view` (for PRs)

3. **Determine the review mode**:
   - If target looks like a PR identifier (number, starts with `#`, or contains `/pull/`) → **PR Mode** (go to Step 0.5 below)
   - If target ends in `.md` or `.mdx` → **File Mode** (proceed to item 4 below)
   - Otherwise → **Folder Mode** (proceed to item 4 below)

3a. **Create execution plan** using `update_plan` with these steps:

- Discover and validate target files
- Read files and extract code blocks
- Review and score code blocks
- Generate summary and present findings
- Apply fixes (if approved)

### Step 0.5: PR Mode Workflow (GitHub Pull Request)

**IMPORTANT**: PR Mode only reviews code blocks that were **added or modified** in the pull request. This makes reviews targeted and relevant to the PR changes.

If the target is identified as a GitHub PR, follow this specialized workflow:

#### 1. Parse PR Identifier

Accept any of these formats:

- PR number: `123`
- PR with hash: `#123`
- Full GitHub URL: `https://github.com/cloudflare/cloudflare-docs/pull/123`

Extract the PR number from the input:

```bash
# Examples of parsing logic:
# "123" → pr_number=123
# "#456" → pr_number=456
# "https://github.com/.../pull/789" → pr_number=789
```

#### 2. Validate PR and Get Metadata

```bash
gh pr view <pr_number> --json number,title,headRefName,baseRefName,state,files
```

If this fails, show error: `"❌ Could not find PR #<number> in this repository"`

Store: `pr_number`, `pr_title`, `head_ref`, `base_ref`, `pr_state`

#### 3. Get Changed Markdown Files

Filter the PR files to only `.md` and `.mdx` files that have additions:

```bash
gh pr view <pr_number> --json files --jq '.files[] | select(.path | test("\\.mdx?$")) | select(.additions > 0) | .path'
```

Store as: `changed_md_files[]`

If no files found → `"No .md or .mdx files were changed in this PR. Nothing to review."`

#### 4. File Limit Check

If `changed_md_files.length > 50`:

```
⚠️ This PR changes <N> markdown files. This will take some time to review.
Would you like to:
- Continue with full review
- Specify specific files to review
- Cancel
```

Wait for user confirmation before proceeding.

#### 5. Parse PR Diff to Identify Changed Code Blocks

**This is the critical step that makes PR reviews targeted.**

```bash
# Get the full unified diff
gh pr diff <pr_number> > /tmp/pr_diff.txt
```

**For each file in `changed_md_files`, identify which code blocks were modified:**

Use this Python script to parse the diff and identify changed code block line ranges:

```python
python3 << 'DIFF_PARSER_EOF'
import re
import sys
import json

def parse_pr_diff_for_code_blocks(diff_file_path, target_files):
    """
    Parse a PR diff file to identify line ranges of code blocks that were added/modified.
    Returns: {file_path: [{"start": line_num, "end": line_num, "language": "js"}, ...]}
    """
    with open(diff_file_path, 'r') as f:
        diff_content = f.read()

    result = {}

    # Split diff into file sections
    file_sections = re.split(r'^diff --git ', diff_content, flags=re.MULTILINE)

    for section in file_sections:
        if not section.strip():
            continue

        # Extract file path from diff header
        file_match = re.search(r'^a/(.+?) b/(.+?)$', section, re.MULTILINE)
        if not file_match:
            continue

        file_path = file_match.group(2)

        # Only process target markdown files
        if file_path not in target_files:
            continue

        changed_code_blocks = []

        # Find all hunks (sections starting with @@)
        hunks = re.finditer(r'^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@.*?(?=^@@|\Z)', section, re.MULTILINE | re.DOTALL)

        for hunk in hunks:
            new_start_line = int(hunk.group(1))
            hunk_content = hunk.group(0)

            # Track current line number in the new (HEAD) version
            current_line = new_start_line

            # Track code block state
            in_added_code_block = False
            code_block_start = None
            code_block_lang = None

            # Process each line in the hunk
            for line in hunk_content.split('\n')[1:]:  # Skip @@ header
                if not line:
                    continue

                line_type = line[0] if line else ' '
                line_content = line[1:] if len(line) > 1 else ''

                # Only process added lines ('+') and context lines (' ')
                if line_type == '+':
                    # Check for code fence
                    fence_match = re.match(r'^(`{3,4})(\w*)', line_content.strip())

                    if fence_match:
                        if not in_added_code_block:
                            # Opening fence in an added line
                            in_added_code_block = True
                            code_block_start = current_line
                            code_block_lang = fence_match.group(2) or 'unknown'
                        else:
                            # Closing fence
                            in_added_code_block = False
                            changed_code_blocks.append({
                                'start': code_block_start,
                                'end': current_line,
                                'language': code_block_lang
                            })

                    current_line += 1

                elif line_type == ' ':
                    # Context line - check if we're inside a code block being modified
                    fence_match = re.match(r'^(`{3,4})(\w*)', line_content.strip())

                    if fence_match and in_added_code_block:
                        # We hit a closing fence in context - the block was partially modified
                        in_added_code_block = False
                        changed_code_blocks.append({
                            'start': code_block_start,
                            'end': current_line,
                            'language': code_block_lang
                        })

                    current_line += 1

                # Lines with '-' don't affect HEAD line numbering

        if changed_code_blocks:
            result[file_path] = changed_code_blocks

    return result

# Main execution
target_files = sys.argv[1].split(',')
diff_path = '/tmp/pr_diff.txt'

code_blocks_by_file = parse_pr_diff_for_code_blocks(diff_path, target_files)

# Output as JSON
print(json.dumps(code_blocks_by_file, indent=2))

DIFF_PARSER_EOF
```

Run this script with the list of changed markdown files:

```bash
changed_code_blocks=$(python3 /tmp/parse_diff.py "$(echo ${changed_md_files[@]} | tr ' ' ',')")
```

This gives you a JSON structure like:

```json
{
	"src/content/docs/workers/get-started.md": [
		{ "start": 45, "end": 67, "language": "typescript" },
		{ "start": 89, "end": 102, "language": "javascript" }
	],
	"src/content/docs/r2/api.mdx": [
		{ "start": 123, "end": 145, "language": "typescript" }
	]
}
```

#### 6. Read Files and Extract Changed Code Blocks

**For each file that has changed code blocks:**

a) Read the file content from the PR's head branch:

```bash
# Fetch the PR branch if needed
git fetch origin <head_ref>

# Read file content from PR branch
git show origin/<head_ref>:<file_path> > /tmp/pr_file_content.md
```

b) Extract ALL code blocks from the file using the existing code block extraction logic (Step 10 in the main workflow)

c) Filter to only the code blocks whose line ranges overlap with the `changed_code_blocks` identified in Step 5

**Important**: Review the ENTIRE code block if any part of it was modified. Don't try to review partial blocks.

#### 7. Skip Files with No Changed Code Blocks

After parsing the diff:

- If a file has no code blocks in the changed sections → **Skip the file entirely**
- If a file has only text/comment changes outside code blocks → **Skip the file entirely**

Track skipped files separately to show in the summary.

#### 8. Display Review Scope

Show the user exactly what will be reviewed:

```
📋 Reviewing GitHub PR #<number>: <title>
Branch: <head_ref> → <base_ref>
Status: <open|closed|merged>

Analyzing changed files for code block modifications...

✓ Files with code block changes:
  • src/content/docs/workers/get-started.md (Lines 45-67, 89-102)
  • src/content/docs/r2/api.mdx (Lines 123-145)
  • src/content/docs/kv/examples.md (Lines 201-225, 267-290)

⊘ Files with no code block changes (skipped):
  • src/content/docs/pages/overview.md (text-only changes)
  • src/content/docs/d1/intro.md (no code blocks in modified sections)

Total: 5 code blocks to review across 3 files

Would you like to continue?
```

Wait for user confirmation.

#### 9. Update Execution Plan

Create an execution plan using the existing `update_plan` structure, but adapted for PR mode:

- Validate PR and identify changed markdown files
- Parse diff to identify changed code blocks
- Read files from PR branch
- Extract and review only changed code blocks
- Generate summary and present findings
- Apply fixes (if approved)

#### 10. Continue to Main Review Workflow

Now that you have:

- ✅ List of files to review
- ✅ Specific line ranges of code blocks to review in each file
- ✅ File contents from the PR head branch

**IMPORTANT - Skip Discovery Steps**: For PR Mode, you've already completed file discovery above.

**SKIP** the following items in Step 0 (not needed for PR mode):

- Item 4 (Discover files to review) - already done
- Item 5 (File Limit Check) - already done
- Item 6 (Show files) - already done
- Item 7 (Update plan) - already done

**Continue directly to Step 0, item 8** (Batch read files efficiently) in the main workflow below.

**CRITICAL MODIFICATION**: When reviewing code blocks:

- Only review the code blocks identified in Step 5 above (the ones that changed)
- Skip all other code blocks in those files
- In the review output, note: `**PR Mode**: Reviewing only changed code blocks`

#### 11. PR Mode: Modified Summary Output

When presenting the final summary in PR mode, use this format:

```
## 📊 Code Review Complete (PR Mode)

**PR**: #<number> - <title>
**Branch**: <head_ref> → <base_ref>
**Status**: <open|closed|merged>

**Files Changed**: <N> markdown files
**Files Reviewed**: <M> (files with code block changes)
**Files Skipped**: <K> (no code block modifications)
**Code Blocks Reviewed**: <X> (only changed blocks)
**Average Score**: <X.X>/<Max> (<XX>%)

### Reviewed Files:
- src/content/docs/workers/get-started.md
  - Lines 45-67: [Score]
  - Lines 89-102: [Score]
- src/content/docs/r2/api.mdx
  - Lines 123-145: [Score]

### Skipped Files:
- src/content/docs/pages/overview.md (no code blocks changed)
- src/content/docs/d1/intro.md (no code blocks changed)
```

#### 12. PR Mode: Modified PR Description

When the user chooses to create a PR with fixes, adapt the PR description:

```markdown
## Code Review: Improvements for PR #<original_pr>

This PR addresses code example quality issues found in #<original_pr>.

**Review Scope** (PR Mode - changed code blocks only):

- **Original PR**: #<original_pr> - <original_title>
- **Files with Code Changes**: <M> files
- **Code Blocks Reviewed**: <X> blocks (only those added/modified in the PR)

**Improvements**:

- Fixed <N> code blocks with review-needed issues
- Average score: <before>/<max> → <after>/<max>

### Code Blocks Improved:

#### src/content/docs/workers/get-started.md

- Lines 45-67: <before> → <after> (Fixed: missing error handling, incomplete types)
- Lines 89-102: <before> → <after> (Fixed: used `this.env` in default export)

[Additional details in collapsed sections]
```

---

**End of Step 0.5: PR Mode Workflow**

After completing Step 0.5, the review continues with the normal workflow starting at Step 8 (batch read files), but only reviews the identified changed code blocks.

---

4. Discover files to review:

- **If target is a folder**: Use Glob with pattern `{folder}/**/*.{md,mdx}` to find all documentation files
- **If target is a file**: Review only that specific file

5. **File Limit Check**:

- Count the number of files discovered
- If more than 50 files found, warn the user:
  ```
  ⚠️ I found [N] files in this location. This will take some time to review.
  Would you like to:
  - Continue with full review
  - Specify a more specific subfolder
  - Review a specific file instead
  ```
- Wait for user confirmation before proceeding with large reviews

6. Show the user how many files will be reviewed and their paths (or a summary if many files)

7. **Update plan** to mark discovery step as completed

8. **Batch read files efficiently**: Read multiple files in parallel when possible (5-10 at a time) to minimize round trips and reduce latency

9. **Update plan** to mark file reading as completed

10. **Extract ALL code blocks systematically**:
    - Search for all triple-backtick code fences (```)
    - Search for all four-backtick code fences (````)
    - Search for code within components (WranglerConfig, TypeScriptExample, etc.)
    - Record line numbers for each code block found
    - Create a numbered list of ALL code blocks in document order

11. **Review EVERY code block found**:
    - Process code blocks in document order (top to bottom)
    - Do NOT skip any code blocks
    - Do NOT randomly sample - review ALL
    - Even if you see duplicate code (e.g., JS and TS versions), review both

12. **Update plan** to mark review as completed after finishing all code blocks

**Reproducibility Check**: If you review the same file twice, you MUST find the same number of code blocks in the same order.

---

## Your Review Process

**CRITICAL: Reviews must be reproducible and deterministic.**

Running this review multiple times on the same file MUST produce the same results. To ensure this:

1. **Use objective criteria only** - no subjective judgment
2. **Follow the scoring rubric exactly** - same issue = same score deduction
3. **Review ALL code blocks** - don't skip any, don't sample randomly
4. **Process in document order** - always review from top to bottom
5. **Count issues systematically** - use the checklists provided
6. **Document specific issues** - explain exactly what you found and why

**If reviews vary between runs, you are being too subjective. Use only the objective criteria defined below.**

For each code block you review, follow these steps:

### Step 1: Categorize the Code Example

**Use these objective indicators to categorize consistently:**

Identify which of the three categories the code example falls into:

1. **Illustrative**: A code example that purely exists to demonstrate a specific point or concept. These often use code comments for a large chunk of the code and only showcase the few lines of code in focus. They are not meant to be copy-pasted and run directly.

**Objective indicators (if ANY of these are true, it's Illustrative):**

- Contains `// ...` or `# ...` comments indicating omitted code
- Focuses on 2-5 lines with surrounding context minimized
- Explicitly states it's an example/snippet in surrounding prose
- Located in a section explaining a specific concept/pattern
- Less than 15 lines of actual code (excluding comments)

2. **Demonstrative**: A code example that is functional but incomplete. If copy-pasted into the right place with some minor tweaks (like adding imports or configuration), it would run.

**Objective indicators (if MOST of these are true, it's Demonstrative):**

- Contains 15-50 lines of code
- Has most logic but may be missing some imports
- Assumes some context (e.g., "add this to your worker")
- Would run with minor setup (adding config, imports)
- Not in a "Get Started" or "Tutorial" section
- Has functional logic but isn't standalone

3. **Executable**: A code example that is standalone and complete. It can be executed and will run without errors as-is.

**Objective indicators (if ALL of these are true, it's Executable):**

- Contains all imports at the top
- Located in "Get Started", "Tutorial", or "Complete Example" section
- 30+ lines of code with full structure
- Has error handling and edge cases
- Explicitly presented as "complete", "full", or "working" example
- No external references to undefined variables/functions

**Category Decision Tree:**

1. Does it have `// ...` or is it < 15 lines focused on one concept? → **Illustrative**
2. Is it in a Get Started/Tutorial section with all imports? → **Executable**
3. Otherwise → **Demonstrative**

**Output the category clearly** before proceeding with the review.

### Step 2: Apply Category-Specific Review Criteria

Based on the category, evaluate the code against the following criteria and assign scores:

#### Scoring System:

**IMPORTANT: Scoring must be deterministic and reproducible. Use objective criteria only.**

Each criterion is scored on a scale from 0.0 to 1.0 in 0.1 increments:

**Scoring Bands (use objective criteria below, not subjective judgment):**

- **1.0**: No issues detected
- **0.9**: 1 minor/cosmetic issue
- **0.8**: 2 minor issues
- **0.7**: 3 minor issues OR 1 moderate issue
- **0.6**: Multiple minor issues OR 1-2 moderate issues
- **0.5**: Multiple moderate issues OR 1 issue approaching critical
- **0.4**: 1 critical issue that doesn't break functionality
- **0.3**: 1 critical issue that breaks functionality
- **0.2**: 2+ critical issues
- **0.1**: Multiple breaking critical issues
- **0.0**: Completely broken or missing required element

**Issue Severity Definitions:**

- **Minor**: Style inconsistencies, missing optional comments, could use better naming
- **Moderate**: Inconsistent patterns, non-optimal approaches, missing error handling for edge cases
- **Critical**: Will not compile/run, security vulnerabilities, missing required imports/types, incorrect API usage

**⚠️ Review Needed Threshold**: Any individual criterion scoring **below 0.5** must be flagged with a warning, regardless of the overall score. A code example with a high overall score but an issue needing review in one area (e.g., 7/8 overall but 0.0 in Security) is still problematic.

**Reproducibility Rules:**

1. **Always score the same issue the same way** - if `this.env` in JS default export scored 0.0 before, it scores 0.0 again
2. **Count issues objectively** - don't vary scoring based on "feel"
3. **Document your reasoning** - explain what specific issues led to each score
4. **Be consistent across examples** - same type of issue = same score deduction

**Maximum Possible Scores by Category:**

- **Illustrative**: 3.0 points (3 criteria)
- **Demonstrative**: 5.0 points (5 criteria)
- **Executable**: 8.0 points (8 criteria)

#### For ALL Categories (Illustrative, Demonstrative, Executable):

1. **Syntactic Correctness** (1.0 point): The code must be valid language syntax and free of typos

**Objective Scoring Rules:**

- **1.0**: Code is syntactically valid and would parse without errors
- **0.5**: Code has syntax that would cause warnings but might still parse
- **0.0**: Code has syntax errors that prevent parsing/compilation (undefined variables in scope, missing brackets, typos in keywords, incorrect use of `this`, etc.)

**Common Critical Issues (score 0.0-0.3):**

- Using `this.env` in JS default export object (0.0 - runtime error)
- Referencing undefined types/interfaces (0.0 - compilation error)
- Missing closing brackets/parentheses (0.0 - parse error)
- Typos in language keywords (0.0 - parse error)

2. **Style & Linting** (1.0 point): Follow naming conventions (camelCase vs snake_case), proper indentation, and bracket placement. Prefer modern platform APIs and standard library functions over verbose manual implementations.

**Objective Scoring Rules:**

- **1.0**: Follows all language conventions, uses modern APIs, consistent indentation
- **0.8**: 1-2 style inconsistencies (e.g., mixed naming conventions)
- **0.6**: Multiple style issues OR not using modern APIs when available
- **0.5**: Inconsistent indentation throughout OR multiple non-optimal patterns
- **0.3**: Mixed tabs/spaces, inconsistent patterns throughout

**Count these issues (deduct 0.1 per issue, minimum 0.0):**

- Mixed tabs and spaces in indentation (-0.3)
- Wrong binding/variable name used (-0.2)
- Not using modern API when simpler (e.g., `new Response(JSON.stringify())` vs `Response.json()`) (-0.1)
- Inconsistent naming convention (e.g., camelCase vs snake_case in same language) (-0.1)
- Wrong indentation style for language (e.g., tabs in Python class) (-0.2)

3. **Cloudflare Style Guide Compliance** (1.0 point): Adhere to the Cloudflare documentation style guide

**Objective Scoring Rules:**

- **1.0**: Fully compliant with style guide
- **0.9**: 1 minor deviation (e.g., could use component but inline code is acceptable)
- **0.7**: 2-3 minor deviations OR 1 moderate issue
- **0.5**: Multiple issues OR 1 significant deviation
- **0.0**: Uses 4-backticks or other major formatting violations

**Count these issues (deduct points, minimum 0.0):**

- Uses 4 backticks instead of 3 (-0.3 per occurrence, or 0.0 if multiple)
- Missing backticks / unmatched backticks (-0.5)
- Should use component but doesn't (PackageManagers, WranglerConfig, etc.) (-0.2)
- Component used but not imported in frontmatter (-0.3)
- Uses 4-space indentation for code blocks instead of backticks (-0.5)

**Must-check items:**

- [ ] Code block uses triple backticks (```)
- [ ] Opening and closing backticks match
- [ ] If PackageManagers applies (npm/yarn/pnpm commands), is it used?
- [ ] If WranglerConfig applies (wrangler.toml), is it used?
- [ ] Are all components imported in frontmatter?

#### For Demonstrative and Executable (add these to the above):

4. **Security** (1.0 point): Ensure no leaked tokens, API keys, or other sensitive information

**Objective Scoring Rules:**

- **1.0**: No security issues detected, all secrets use placeholders
- **0.5**: Exposed secret in example but clearly marked as example (e.g., "your-secret-here")
- **0.0**: Real or realistic-looking secret exposed (e.g., actual API key format, real-looking tokens)

**Must-check items:**

- [ ] No hardcoded API keys, tokens, or credentials
- [ ] All sensitive values use placeholders like `<YOUR_API_KEY>` or `$API_TOKEN`
- [ ] Example secrets are clearly fake (e.g., `your-secret-here`, not `sk-1234567890abcdef`)

5. **Completeness** (1.0 point): Check for necessary imports, class definitions, type annotations (where appropriate), and error handling

**Objective Scoring Rules:**

- **1.0**: All required imports/types present, error handling appropriate for example type
- **0.8**: Missing 1 optional import or type annotation
- **0.6**: Missing multiple optional elements OR 1 recommended element
- **0.5**: Missing 1 required element OR error handling inadequate
- **0.0**: Missing multiple required elements (imports, types, definitions)

**Count these issues (deduct points, minimum 0.0):**

- Missing required import that code references (-0.3)
- Missing required type definition that code references (-0.5)
- Missing required class/interface definition (-0.5)
- No error handling where failures are likely (-0.2 for Demonstrative, -0.4 for Executable)
- Missing optional type annotation (-0.1)

**Must-check items for category:**

- **Demonstrative**: [ ] Necessary imports [ ] Referenced types defined [ ] Basic structure complete
- **Executable**: [ ] All imports [ ] All types [ ] Error handling [ ] Could run as-is

#### For Executable Only (add these to all of the above):

6. **Dependency Context** (1.0 point): All libraries, versions, and installation commands should be explicitly stated

**Objective Scoring Rules:**

- **1.0**: All dependencies documented with install commands and versions
- **0.8**: Dependencies listed but missing version info
- **0.6**: Dependencies mentioned but no install commands
- **0.3**: Some dependencies missing from documentation
- **0.0**: No dependency information provided

**Must-check items:**

- [ ] All external libraries are documented
- [ ] Installation commands provided (npm install, etc.)
- [ ] Wrangler configuration shown if needed
- [ ] Runtime requirements stated (Node version, compatibility flags, etc.)

7. **Full Executability** (1.0 point): The code should run without any modifications

**Objective Scoring Rules:**

- **1.0**: Code will execute without any changes
- **0.8**: Requires 1 trivial change (e.g., changing a placeholder value)
- **0.6**: Requires minor setup (e.g., creating a config file)
- **0.4**: Missing configuration or setup steps
- **0.0**: Cannot run without significant modifications

**Must-check items:**

- [ ] All referenced variables are defined or imported
- [ ] All configuration is provided (wrangler.toml, env vars, etc.)
- [ ] No undefined functions or missing dependencies
- [ ] Code follows a logical execution path with no gaps

8. **Comments & Documentation** (1.0 point): Inline comments should explain "why" rather than "what", focusing on complex logic or non-obvious choices

**Objective Scoring Rules:**

- **1.0**: Complex logic is explained, comments focus on "why"
- **0.8**: Most complex parts documented, minor gaps
- **0.6**: Some documentation but missing key explanations
- **0.4**: Only "what" comments, no "why" explanations
- **0.0**: No comments where needed, or only trivial comments

**Count these issues:**

- Complex logic without explanation (-0.2 per instance)
- Only "what" comments instead of "why" (-0.1 per instance)
- No comments on non-obvious choices (-0.2 per instance)
- Excessive/trivial comments that add no value (-0.1)

**Note for Illustrative/Demonstrative**: This criterion does NOT apply. These examples are allowed to be uncommented.

### Step 3: Provide Structured Feedback

**Strictly** format your review as follows, using `<details>` components to collapse detailed sections:

```
## Code Block Review: [Brief description and line reference]

**Category**: [Illustrative | Demonstrative | Executable]

**Score**: [X.X]/[Max Score] ([Percentage]%)

**Overall Assessment**: [Excellent | Good | Acceptable | Poor | Failing]

<details>
<summary>Evaluation Results</summary>

[For each applicable criterion, provide score in 0.1 increments and brief explanation. Mark criteria below 0.5 with ⚠️]

- Syntactic Correctness: [0.0-1.0]/1.0 - [explanation]
- Style & Linting: [0.0-1.0]/1.0 - [explanation]
- Cloudflare Style Guide Compliance: [0.0-1.0]/1.0 - [explanation]
- Security: [0.0-1.0]/1.0 - [explanation] (Demonstrative & Executable only)
- Completeness: [0.0-1.0]/1.0 - [explanation] (Demonstrative & Executable only)
- Dependency Context: [0.0-1.0]/1.0 - [explanation] (Executable only)
- Full Executability: [0.0-1.0]/1.0 - [explanation] (Executable only)
- Comments & Documentation: [0.0-1.0]/1.0 - [explanation] (Executable only)

**Total Score Calculation**: [Sum of applicable scores]/[Maximum possible for category]

</details>

<details>
<summary>Suggested Improvements</summary>

[List specific, actionable improvements. If none needed, state "No improvements needed."]

1. [Specific suggestion with code example if applicable]
2. [Another suggestion]

</details>

<details>
<summary>Revised Code</summary>

[Only provide revised code if there are issues needing review. For minor suggestions, the list above is sufficient.]

</details>
```

## Important Guidelines:

1. **Be context-aware**: Consider what the documentation page is trying to teach. Don't over-engineer illustrative examples with boilerplate that distracts from the learning point.

2. **Be constructive**: Focus on improvements that enhance clarity, correctness, and usability without being pedantic.

3. **Respect the category**: Don't expect illustrative code to be executable, and don't expect executable code to be minimal.

4. **Security first**: Always flag security issues regardless of category (except for illustrative code where the concern is N/A). Security issues scoring below 0.5 need review.

5. **Follow Cloudflare conventions**: Ensure code examples follow Cloudflare's style guide and best practices for the specific product being documented.

6. **Consider the user journey**: Think about whether a developer could successfully use this code example to accomplish their goal.

7. **Prefer modern platform APIs**: Always use built-in platform APIs and standard library methods over manual implementations when they provide equivalent functionality with less code. This reduces cognitive load, teaches best practices, and minimizes error surface area. Examples: Response.json() instead of new Response(JSON.stringify()), crypto.randomUUID() instead of custom UUID generators, structuredClone() instead of JSON.parse(JSON.stringify()), FormData instead of manual form encoding.

## Example Reviews:

### Example 1: Illustrative Code

```
## Code Block Review: D1 Query Retry Example

**Category**: Illustrative

**Score**: 2.7/3.0 (90%)

**Overall Assessment**: Good

<details>
<summary>Evaluation Results</summary>

- Syntactic Correctness: 1.0/1.0 - Code syntax is valid TypeScript
- Style & Linting: 1.0/1.0 - Follows TypeScript conventions properly
- Cloudflare Style Guide Compliance: 0.7/1.0 - Could benefit from a brief contextual comment

**Total Score Calculation**: 2.7/3.0

</details>

<details>
<summary>Suggested Improvements</summary>

1. Consider adding a brief comment above the code block explaining that `sql` and `d1` are assumed to be defined in the broader context
2. The retry logic is clear, but you might add a comment explaining why 3 retries is a reasonable default

</details>

<details>
<summary>Revised Code</summary>

Not needed - suggestions are minor and the code effectively illustrates the retry pattern.

</details>
```

### Example 2: Executable Code with Issues Needing Review

```
## Code Block Review: Workers KV Example

**Category**: Executable

**Score**: 4.7/8.0 (59%)

**Overall Assessment**: Poor

<details>
<summary>Evaluation Results</summary>

- Syntactic Correctness: 1.0/1.0 - Valid JavaScript syntax
- Style & Linting: 0.8/1.0 - Minor inconsistencies in naming conventions
- Cloudflare Style Guide Compliance: 0.9/1.0 - Generally follows guidelines
- Security: 1.0/1.0 - No security issues detected
- Completeness: 0.4/1.0 - ⚠️ Missing error handling and type definitions
- Dependency Context: 0.0/1.0 - ⚠️ No installation instructions or version information provided
- Full Executability: 0.6/1.0 - Missing wrangler.toml configuration details
- Comments & Documentation: 0.0/1.0 - ⚠️ No explanatory comments for complex logic

**Total Score Calculation**: 4.7/8.0

</details>

<details>
<summary>Suggested Improvements</summary>

1. Add a wrangler.toml configuration example showing the KV namespace binding
2. Add try-catch blocks around KV operations to handle potential errors
3. Specify the Workers runtime version and any required compatibility flags
4. Add explanatory comments for the caching strategy being demonstrated, focusing on "why" not "what"
5. Consider adding TypeScript types for better developer experience

</details>

<details>
<summary>Revised Code</summary>

[Provide improved version with error handling, configuration context, and better documentation]

</details>
```

---

## Final Execution: Review Complete

After completing all code reviews, provide a summary and ask for next steps.

### 1. Present Review Summary

Show a clear summary of findings:

**For Folder/File Mode:**

```
## 📊 Code Review Complete

**Scope**: [folder or file path reviewed]
**Files Reviewed**: [N]
**Total Code Blocks**: [X]
**Average Score**: [X.X]/[Max] ([XX]%)

### Issues Found:
- Review Needed: [N] (score < 0.5)
- Review Recommended: [N] (score 0.5-0.7)
- Review Optional: [N] (score 0.7-0.9)

### Breakdown by Category:
- Illustrative: [X] examples, avg [X.X]/3.0
- Demonstrative: [X] examples, avg [X.X]/5.0
- Executable: [X] examples, avg [X.X]/8.0
```

**For PR Mode:**

```
## 📊 Code Review Complete (PR Mode)

**PR**: #<number> - <title>
**Branch**: <head_ref> → <base_ref>
**Status**: <open|closed|merged>

**Files Changed**: <N> markdown files
**Files Reviewed**: <M> (files with code block changes)
**Files Skipped**: <K> (no code block modifications)
**Code Blocks Reviewed**: <X> (only changed blocks)
**Average Score**: <X.X>/<Max> (<XX>%)

### Issues Found:
- Review Needed: [N] (score < 0.5)
- Review Recommended: [N] (score 0.5-0.7)
- Review Optional: [N] (score 0.7-0.9)

### Reviewed Files:
- src/content/docs/workers/get-started.md (Lines 45-67, 89-102)
- src/content/docs/r2/api.mdx (Lines 123-145)

### Skipped Files:
- src/content/docs/pages/overview.md (no code blocks changed)
- src/content/docs/d1/intro.md (no code blocks changed)

### Breakdown by Category:
- Illustrative: [X] examples, avg [X.X]/3.0
- Demonstrative: [X] examples, avg [X.X]/5.0
- Executable: [X] examples, avg [X.X]/8.0
```

### 2. Show Issues Needing Review First

If any issues needing review (score < 0.5) were found, highlight them:

```
### ⚠️ Review Needed:

1. **[File path]** - [Brief description]
   - Criterion: [Name] - Score: [X.X]/1.0
   - Issue: [Explanation]

2. **[File path]** - [Brief description]
   - Criterion: [Name] - Score: [X.X]/1.0
   - Issue: [Explanation]
```

Use the ⚠️ emoji only for "Review Needed" items to draw attention to the most important issues.

### 3. Ask User for Next Steps

After presenting the summary, explicitly ask:

```
Would you like me to:

A) Fix these issues and create a PR
B) Show detailed review for each code block
C) Focus on specific files
D) Do nothing - you'll handle fixes manually

What would you prefer?
```

### 4. If User Chooses Option A (Fix and Create PR)

Only if the user explicitly chooses to fix issues, then:

**Pre-Flight Checklist** (complete BEFORE making any edits):

Before making any edits, take 30 seconds to plan your approach:

- [ ] List all issues that need fixing and their locations
- [ ] Identify fix types: pattern replacements vs contextual edits
- [ ] Choose the right tool for each fix:
  - Pattern replacements (4-backticks, R2→MY_BUCKET, etc.) → Python script
  - Adding/removing code with unique context → Edit tool
  - Whitespace/indentation issues → Python script
- [ ] Decide verification strategy: Which line numbers will you Read to verify?
- [ ] Commit to switching tools after 2 failures on the same issue

**Remember: 30 seconds of planning saves 5 minutes of failed edits and verification loops.**

**Common Pitfalls to Avoid** (lessons learned from past reviews):

| Pitfall                                              | Why It's Bad                                         | Solution                                      |
| ---------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------- |
| Using grep to verify Edit changes                    | grep can show cached/stale results                   | Always use Read tool on specific line numbers |
| Using sed without immediate verification             | sed can fail silently                                | Use Python script instead (more reliable)     |
| Retrying Edit tool 3+ times when it fails            | Indicates wrong approach for the problem             | Switch to Python after 2 Edit failures        |
| Not reading exact content when "oldString not found" | Whitespace (tabs vs spaces) may differ               | Read exact lines again, copy literal string   |
| Making multiple changes without verifying each       | Later changes fail because earlier ones didn't apply | Verify with Read tool after EACH change       |
| Assuming pattern found = pattern fixed               | File may not have been modified                      | Use Read tool to see actual content           |

1. **Apply Code Improvements**

- Make clean, focused edits to code examples
- Only fix identified issues
- Keep changes minimal and precise
- Follow best practices for the category type
- **Use Python scripts for pattern replacements** (most reliable)
- **Use Read tool for all verifications** (never trust grep for file content)

**Important: Formatting Fixes Best Practices**

When fixing formatting issues (especially code block issues), follow this efficient approach:

a) **Detect patterns systematically first**:

- Use `grep -n` to find all instances of formatting issues (e.g., `grep -n '````'` for 4-backticks)
- Count occurrences to understand the scope

b) **Use appropriate tools for the job**:

**Tool Selection Priority (most reliable first):**

1. **Python script** - Most reliable for any pattern replacement

   `````python
   python3 << 'EOF'
   with open('path/to/file.mdx', 'r') as f:
       content = f.read()
   content = content.replace('````', '```')  # or use re.sub() for complex patterns
   with open('path/to/file.mdx', 'w') as f:
       f.write(content)
   print("Fixed patterns")
   EOF
   `````

2. **sed** - Good for simple line-based replacements, but verify carefully

   `````bash
   sed -i.bak 's/^````$/```/g' path/to/file.mdx
   `````

3. **Edit tool** - Only for specific contextual edits with unique surrounding context

**When to use each:**

- **Global pattern replacements** (all 4-backticks → 3-backticks): Use Python script (most reliable)
- **Multiple identical replacements** (R2 → MY_BUCKET everywhere): Use Python script or Edit with replaceAll
- **Single contextual fix** (add one interface): Use Edit tool
- **Indentation fixes**: Use Python script with proper handling
- **Verifying changes**: ALWAYS use Read tool to check specific lines (NOT grep - it can show cached results)

c) **Fail fast and adapt**:

- If an Edit tool call fails or doesn't produce the expected result, DON'T retry the same approach
- Immediately verify with **Read tool** (NOT grep) to see the actual current state
- **After 2 failed Edit attempts on the same issue, immediately switch to Python script**
- If sed doesn't appear to work after verification, switch to Python script immediately

d) **Common formatting fixes and their best tools**:

| Fix Type                                   | Best Tool     | Command/Approach                                   |
| ------------------------------------------ | ------------- | -------------------------------------------------- |
| **4-backticks → 3-backticks**              | Python script | `content.replace('````', '```')`                   |
| **Fixing all tabs → spaces**               | Python script | `content.replace('\t', '    ')`                    |
| **Removing trailing whitespace**           | Python + re   | `re.sub(r'\s+$', '', content, flags=re.MULTILINE)` |
| **Multiple identical string replacements** | Python script | `content.replace('old', 'new')`                    |
| **Fixing specific code block indentation** | Edit tool     | Only if unique surrounding context exists          |
| **Complex whitespace issues**              | Python script | Use textwrap or custom logic                       |

**Default rule**: When in doubt, use Python script. It's the most reliable and verifiable.

e) **Verification workflow (MANDATORY)**:

```bash
# 1. Make the change (preferably with Python)
python3 << 'EOF'
with open('file.mdx', 'r') as f:
    content = f.read()
content = content.replace('old_pattern', 'new_pattern')
with open('file.mdx', 'w') as f:
    f.write(content)
print("Applied changes")
EOF

# 2. IMMEDIATELY verify using Read tool (NOT grep!)
# Use Read tool to check specific line numbers where changes were made
# Example: Read lines 150-155 to verify backticks were fixed

# 3. Count occurrences to confirm (grep is OK for counting)
grep -c 'old_pattern' file.mdx  # Should be 0
grep -c 'new_pattern' file.mdx  # Should be > 0

# 4. Only proceed to next fix after verification passes
```

**CRITICAL VERIFICATION RULES:**

- ❌ **NEVER** use grep to verify line content - it can show cached/stale results
- ✅ **ALWAYS** use Read tool to verify specific lines after making changes
- ❌ **NEVER** assume a change worked without verification
- ✅ **ALWAYS** verify each change before proceeding to the next one

f) **Never do these inefficient patterns**:

| ❌ DON'T                                              | ✅ DO                                                      |
| ----------------------------------------------------- | ---------------------------------------------------------- |
| Try Edit tool → fail → retry Edit → fail → retry Edit | After 2 Edit failures, switch to Python immediately        |
| Use sed then verify with grep                         | Use Python, then verify with Read tool                     |
| Claim success without verification                    | Use Read tool to verify specific lines after every change  |
| Make multiple edits blindly                           | Verify each edit with Read tool before proceeding          |
| Use grep to check if changes applied                  | Use Read tool to see actual file content at specific lines |
| Rely on sed for complex replacements                  | Use Python script for all pattern replacements             |

**Key Lesson from Past Issues:**

- `sed` commands can silently fail or appear to work without actually modifying the file
- `grep` can show cached/stale results that don't reflect current file state
- Multiple Edit tool failures indicate you need a different approach (Python)
- The Read tool is the only reliable way to verify file changes

2. **Validate Code Block Fences (MANDATORY)**

**CRITICAL**: Before committing, validate that all code block fences are properly formatted.

Run this validator on each file that was modified:

```bash
python3 << 'FENCE_VALIDATOR_EOF'
import re
import sys

filepath = sys.argv[1]

# Read file once
with open(filepath, 'r') as f:
    content = f.read()

lines = content.split('\n')

# Regex: match fence lines only (whitespace + 3+ backticks + optional language)
fence_re = re.compile(r'^(\s*)(`{3,})(\w*)$')

# Single pass: find all fences and identify issues
fences = []
fixes_needed = []

for i, line in enumerate(lines):
    match = fence_re.match(line)
    if match:
        indent, backticks, lang = match.groups()
        backtick_count = len(backticks)
        fences.append(i)

        # Fix: normalize to exactly 3 backticks
        if backtick_count != 3:
            lines[i] = f"{indent}```{lang}"
            fixes_needed.append(f"Line {i+1}: {backtick_count} backticks → 3")

# Check for orphaned empty code block at EOF
if len(fences) >= 2:
    last_idx = fences[-1]
    second_last_idx = fences[-2]

    # If last two fences are within 2 lines and only whitespace between
    if last_idx - second_last_idx <= 3:
        between = lines[second_last_idx + 1:last_idx]
        if all(not line.strip() for line in between):
            # Remove orphaned pair
            lines[second_last_idx] = None
            lines[last_idx] = None
            for empty_idx in range(second_last_idx + 1, last_idx):
                lines[empty_idx] = None
            fixes_needed.append(f"Lines {second_last_idx+1}-{last_idx+1}: Removed orphaned empty code block")
            fences = fences[:-2]  # Remove from fence list

# Check for unmatched fences
if len(fences) % 2 != 0:
    print(f"❌ {filepath}: VALIDATION FAILED")
    print(f"   Unmatched fences: found {len(fences)} (must be even)")
    print(f"   Manual inspection required at lines: {[f+1 for f in fences]}")
    sys.exit(1)

# Apply fixes if needed
if fixes_needed:
    # Filter out removed lines and write
    lines = [line for line in lines if line is not None]
    new_content = '\n'.join(lines)

    with open(filepath, 'w') as f:
        f.write(new_content)

    print(f"✓ {filepath}: Fixed {len(fixes_needed)} fence issue(s)")
    for fix in fixes_needed:
        print(f"  • {fix}")
else:
    print(f"✓ {filepath}: All code block fences valid")

FENCE_VALIDATOR_EOF
```

**Run this validator on each modified file.** If validation fails (unmatched fences), STOP and ask the user for guidance.

3. **Create a Commit**

Once validation passes for all files, commit all improvements with a clear message:

```
Review and improve code examples in [location]

- Reviewed [N] code examples
- Fixed [X] issues needing review, [Y] issues with recommended review
- Overall quality improvement: [brief summary]
```

Avoid using language that is overly alarmist - such as "critical". These are code examples for documentation, not production code.

3. **Generate PR Description**

**For Folder/File Mode**, use this structure:

```markdown
## Code Review Summary

This PR improves code example quality in [location] based on systematic review.

**Overall Results:**

- **Total Examples Reviewed**: [N]
- **Average Score Before**: [X.X]/[Max] ([XX]%)
- **Average Score After**: [X.X]/[Max] ([XX]%)
- **Issues Fixed (Review Needed)**: [N]

<Details header="Examples Improved">

#### [File path] - [Example Name]

- **Category**: [Illustrative | Demonstrative | Executable]
- **Score**: [Before] → [After]
- **Changes**: [One sentence explaining improvements]

[Continue for each improved example...]

</Details>

<Details header="Detailed Review Results">

[Complete review output for all code blocks]

</Details>

<Details header="Review Methodology">

This review used a systematic framework that:

- Categorizes code examples as Illustrative (3 criteria), Demonstrative (5 criteria), or Executable (8 criteria)
- Scores each criterion from 0.0-1.0 in 0.1 increments
- Flags any criterion below 0.5 as needing review
- Provides category-appropriate feedback

**Scoring Guide:**

- 1.0: Excellent, no issues
- 0.7-0.9: Good, minor improvements possible
- 0.4-0.6: Acceptable, some issues to address
- 0.1-0.3: Poor, significant issues
- 0.0: Failing, serious issues

**Issue Levels:**

- Review Needed: score < 0.5
- Review Recommended: score 0.5-0.7
- Review Optional: score 0.7-0.9

</Details>
```

**For PR Mode**, use this structure:

```markdown
## Code Review: Improvements for PR #<original_pr>

This PR addresses code example quality issues found in #<original_pr>.

**Review Scope** (PR Mode - changed code blocks only):

- **Original PR**: #<original_pr> - <original_title>
- **Files with Code Changes**: <M> files
- **Code Blocks Reviewed**: <X> blocks (only those added/modified in the PR)
- **Files Skipped**: <K> files (no code block changes)

**Improvements**:

- Fixed <N> code blocks with review-needed issues
- Average score: <before>/<max> → <after>/<max>

<Details header="Code Blocks Improved">

#### src/content/docs/workers/get-started.md

- **Lines 45-67**: <before>/<max> → <after>/<max>
  - Fixed: missing error handling, incomplete types
- **Lines 89-102**: <before>/<max> → <after>/<max>
  - Fixed: used `this.env` in default export

#### src/content/docs/r2/api.mdx

- **Lines 123-145**: <before>/<max> → <after>/<max>
  - Fixed: security issue with exposed credential pattern

</Details>

<Details header="Detailed Review Results">

[Complete review output for all code blocks]

</Details>

<Details header="Files Skipped">

These files were changed in the PR but had no code block modifications:

- src/content/docs/pages/overview.md (text-only changes)
- src/content/docs/d1/intro.md (no code blocks in modified sections)

</Details>

<Details header="Review Methodology">

This review used a systematic framework that:

- **PR Mode**: Only reviews code blocks that were added or modified in the pull request
- Categorizes code examples as Illustrative (3 criteria), Demonstrative (5 criteria), or Executable (8 criteria)
- Scores each criterion from 0.0-1.0 in 0.1 increments
- Flags any criterion below 0.5 as needing review
- Provides category-appropriate feedback

**Scoring Guide:**

- 1.0: Excellent, no issues
- 0.7-0.9: Good, minor improvements possible
- 0.4-0.6: Acceptable, some issues to address
- 0.1-0.3: Poor, significant issues
- 0.0: Failing, serious issues

**Issue Levels:**

- Review Needed: score < 0.5
- Review Recommended: score 0.5-0.7
- Review Optional: score 0.7-0.9

</Details>
```

4. **Create the PR**

Use `gh pr create` with appropriate title and body

### 5. If User Chooses Option B (Show Details)

Provide the complete review output with all scores, evaluations, and suggestions for each code block using the existing review format.

### 6. If User Chooses Option C (Focus on Specific Files)

Ask which files they want fixed, then apply improvements only to those files and create a PR.

### 7. If User Chooses Option D (Do Nothing)

Confirm: "Understood. The review is complete. Let me know if you need anything else!"

---

## Reproducibility Self-Check

Before finalizing your review, verify reproducibility:

**If you were to review this file again, would you:**

- [ ] Find the exact same number of code blocks?
- [ ] Categorize each the same way (using objective indicators)?
- [ ] Assign the same scores (using objective criteria)?
- [ ] Flag the same issues as needing review?

**If the answer to any of these is "maybe" or "no", you are being too subjective.**

Go back and use only the objective criteria defined in this prompt.

**Common sources of non-determinism to avoid:**

- Subjective scoring ("feels like a 0.7" vs counting specific issues)
- Randomly sampling code blocks instead of reviewing all
- Varying categorization based on "feel" vs objective indicators
- Skipping code blocks that seem "fine" without systematic review
- Inconsistent treatment of similar issues across examples

**Testing reproducibility**: If user reports different results on the same file:

1. Acknowledge the issue: "You're right, reviews should be consistent"
2. Re-review using ONLY objective criteria from the rubric
3. Count issues systematically, don't estimate
4. Use the decision tree for categorization
5. Document specific issues found, not general impressions

---

Now, review the code examples in the provided context and apply this framework systematically to each code block.
