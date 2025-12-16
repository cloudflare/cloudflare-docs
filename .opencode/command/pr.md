---
description: Create a pull request for current branch changes
agent: build
subtask: true
---

Create a GitHub pull request for the current branch's changes against the default branch.

## User Context

$ARGUMENTS

## Instructions

1. **Gather context**: Run these commands to understand the changes:
   - `git log --oneline production..HEAD` to see commits on this branch
   - `git diff production...HEAD --stat` to see files changed
   - `git diff production...HEAD` to see the actual changes

2. **Identify the product**: Determine which Cloudflare product(s) the changes relate to. Common products include:
   - Workers, KV, R2, D1, Queues, Durable Objects (DO), Hyperdrive, Containers, Pipelines
   - Pages, Images, Stream, Calls
   - WAF, DDoS, Bot Management, API Shield, Page Shield
   - Zero Trust (ZT), Access, Gateway, WARP, Tunnel, CASB, DLP, DEX
   - DNS, Registrar, SSL/TLS, Load Balancing, Spectrum
   - Analytics, Logs, Notifications
   
   Use short product names where common (DO, KV, ZT, etc.).

3. **Create the PR title**: Use format `{Product}: {short description}`
   - Keep description under 50 characters
   - Use imperative mood (add, fix, update, remove)
   - Examples: `Workers: add streaming response docs`, `KV: fix metadata example`, `ZT: update Gateway policies`

4. **Write the PR body**:
   - Start with 1-2 sentences explaining WHY this PR exists (the motivation/context)
   - Follow with a short bulleted list of major changes (< 6-7 words per line)
   - Do NOT include headers like "## Summary" or "## Changes"
   - Do NOT include a line-by-line play-by-play of every file changed
   - Do NOT include verbose explanations or implementation details
   - Keep the entire body under 10 lines

5. **Create the PR**: Use `gh pr create` with the title and body:
   ```
   gh pr create --title "Product: short description" --body "body content"
   ```

## Example PR Body

```
Adds documentation for the new streaming response API that enables real-time data processing in Workers.

- Add streaming response guide
- Update fetch handler examples  
- Add SSE configuration options
- Fix broken link in overview
```

## Output

Show the PR URL when complete.
