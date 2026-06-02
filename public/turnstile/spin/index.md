---
name: turnstile-spin
description: Set up Cloudflare Turnstile end-to-end in a project: scan the codebase, create the widget via the Cloudflare API, deploy the managed siteverify Worker, write the frontend snippets, validate, and persist the skill. Load this when a user asks to add Turnstile, set up CAPTCHA, protect a form from bots, or fix a Turnstile integration. Mirrors developers.cloudflare.com/turnstile/spin.
references:
  - vanilla-html
  - nextjs-app
  - nextjs-pages
  - astro
  - sveltekit
  - hugo
---

# Turnstile Spin skill

This skill turns the prompt "set up Turnstile" into a working end-to-end integration: a Turnstile widget, a deployed managed siteverify Worker in the user's Cloudflare account, frontend snippets at every appropriate insertion point, and a real validation pass before reporting success.

The canonical instructions live at [`developers.cloudflare.com/turnstile/spin`](https://developers.cloudflare.com/turnstile/spin/). This file mirrors them. If the docs page and this file disagree, trust the docs page.

## When to load this skill

Load when the user's prompt mentions any of:

- "Turnstile", "CAPTCHA", "bot protection"
- "siteverify", "cf-turnstile-response"
- "protect this form", "stop bot signups", "bot signups", "spam signups"
- A specific signup, login, or contact form combined with "Cloudflare" or "bot"

Do not load for unrelated Cloudflare tasks (Workers, Pages, R2, etc.) unless Turnstile is also mentioned.

## Conversation flow

The user pasted the prompt. You are now in a multi-step dialog with them. Do not run silently. Detect what you can, ask only when you have to, and confirm before every irreversible step.

The script below is the contract. Each numbered moment is one agent message. Items marked **[wait for user]** require a user response before continuing; everything else is informational.

1. **Brief acknowledge.** One sentence: "I'll run Turnstile setup end to end. That's: check auth, scan the codebase, create the widget, deploy the Worker, wire the frontend, validate. Proceed?" **[wait for user]** Do NOT present a plan or ask clarifying questions yet. Auth and scan come first, and questions belong in their own steps below.

2. **Wrangler check.** Run `npx wrangler --version`. If missing:
   - Node project: ask "Install `wrangler` locally with `npm install --save-dev wrangler`?" **[wait for user]**
   - Non-Node project: ask the user to run `npm install -g wrangler` manually and tell you when done **[wait for user]**
   - **Locked-down environment fallback.** If install is blocked (corporate policy, no Node, npm registry unreachable), do not dead-end. Switch to the direct-API path: ask the user for a Cloudflare API token with `Account.Turnstile:Edit` and `Workers Scripts:Edit` permissions, then drive Steps 4 and 5 with `curl` against `api.cloudflare.com/client/v4/` instead of `wrangler`.

3. **Auth check + scope probe (FIRST irreversible action; do this BEFORE the codebase scan, the insertion plan, or any user clarification).** Run the two probes from Wizard Step 1: `wrangler whoami` (token present?) and a GET on `/challenges/widgets` (token has Turnstile scope?). Three outcomes:

   - **Both pass:** continue to Step 4.
   - **Scope MISSING or no token:** the user needs to create a Cloudflare API token. **Do NOT direct them to `wrangler login`**. Its OAuth scope doesn't include Turnstile, so it won't fix the problem. Instead, prompt the user AND immediately start parallel prep work that doesn't need auth:

     > "I need an API token with `Account.Turnstile:Edit` + `Account.Workers Scripts:Edit`. Create one at https://dash.cloudflare.com/profile/api-tokens → Custom token → those two permissions → include your account in Account Resources → copy and paste here.
     >
     > While you do that, I'll run Steps 5-7 in parallel (domain detection, codebase scan, insertion plan) so there's no wait when you're back. I'll present the prepared plan when you paste the token."

     Then continue with Steps 5, 6, 7 (Domain, Codebase scan, Insertion plan) WITHOUT waiting. None of these need auth. When the user pastes the token, re-run the scope probe with the new value, then present the prepared insertion plan and proceed to Step 8 (Widget creation).
   - **Wrangler not installed:** handle that first (Step 2 already covers it), then come back to this step.

4. **Account selection.** If `wrangler whoami` lists multiple accounts, present a numbered list and ask which one. **[wait for user]** If there's only one, use it silently.

5. **Domain.** Always include `localhost` and `127.0.0.1` so local testing works with zero extra setup. For the production domain, scan `package.json` `homepage`, `wrangler.toml`, `wrangler.jsonc`, `README.md`, `AGENTS.md`, and the git remote for a hint. If a clear production domain is found, confirm in one line: "I'll register the widget for `localhost`, `127.0.0.1`, and `<domain>`. OK?" **[wait for user]** If no production domain is found, ask: "I'll include `localhost` and `127.0.0.1` for testing. What production domain(s) should I add?" **[wait for user]**

6. **Codebase scan.** Run framework detection + insertion-point grep silently. Take a few seconds.

7. **Insertion plan.** If exactly one public-facing form was found, name it and ask for one-word confirmation: "I'll add Turnstile to the form in `<file:line>`. OK?" **[wait for user]** If multiple candidates exist, show the numbered list with `[recommended]` / `[skip by default]` markers and ask the user to confirm (numbers, "all", "recommended", or a list). **[wait for user]** This is the most important confirmation in the flow. **If existing CAPTCHA was detected in Step 6**, present a migration plan instead. See the "Migrating from another CAPTCHA" section below.

8. **Widget creation.** Call the Cloudflare API. Report back the sitekey and confirm the secret is stored as a Worker secret. No user input needed.

9. **Worker deploy.** Clone the template, set the secret, run `wrangler deploy`. Report the Worker URL.

10. **Frontend edits.** Tell the user what files you're about to edit AND the contract: "I'll add the Turnstile widget + gate the existing submit handler on `success === true`. The existing handler logic stays the same." Ask "yes" / "show". **[wait for user]** If "show", print unified diffs and ask again. **[wait for user]** Do NOT propose alternate behavior for the form (mail delivery, custom backends, etc.). See the Hard scope boundary above.

11. **Validation.** Run the three checks (`/health`, dummy siteverify, hostname). Report each as it passes. If any fails, stop and explain. **[wait for user if anything fails]**

12. **Persist skill.** Ask: "Save the Spin skill to `.claude/skills/turnstile-spin/SKILL.md` so I can reuse it on follow-up tasks?" Default to yes. **[wait for user]**

13. **Final report.** Print the structured summary: what was created, what was validated, what the user should do next.

### Things you must NOT do

- Do not write the Turnstile secret to disk. Only pass it to `wrangler secret put` via stdin.
- Do not skip the validation step.
- Do not overwrite files without showing a diff.
- Do not deploy a Worker to a different account than the widget was created in.
- Do not call siteverify from the browser.
- Do not use `sudo` or install packages globally without asking the user.

### Hard scope boundary: DO NOT ask the user about

Spin's job is one thing: validate the Turnstile token via a managed Worker before the user's existing form handler runs. Anything beyond that is out of scope. The following are NOT decisions the agent should surface or ask about:

- **Email / SMS / notification delivery.** The form's existing submit handler decides what happens after validation. If it's a no-op stub, leave it a no-op stub (just gated on `success === true`). Don't propose Resend, Mailchannels, SMTP, mailto, etc.
- **Custom Worker code.** Deploy the stock Worker template bundled with this skill at `templates/worker/`. Don't write a new Worker. Don't add features (rate limiting, custom routing, third-party integrations).
- **Database / payment / OAuth / form persistence.** Out of scope. The user already has (or doesn't have) a backend; Spin doesn't touch it.
- **Frontend framework migration, refactoring, or styling changes.** Edit only what's needed for the Turnstile widget + the token-passing submit handler.
- **reCAPTCHA v3 score thresholds.** Turnstile returns `success: true/false`. Don't invent a score equivalent.
- **Pre-clearance-only setups.** Spin's job is server-side siteverify. If the user explicitly wants pre-clearance only (just the `cf_clearance` cookie at the Cloudflare edge, no server-side validation), Spin isn't the right tool. Siteverify isn't needed. Redirect them: "For pre-clearance-only setup, configure the widget's `clearance_level` (interactive / managed / non-interactive) at https://dash.cloudflare.com/?to=/:account/turnstile and embed the widget snippet. No Worker, no siteverify, no token-passing submit handler. Spin doesn't apply." Then exit.

### Recovery flow: respect existing widget configuration

If you're in the recovery flow (existing widget), fetch the widget detail and check its `clearance_level` BEFORE proposing changes:

- If `clearance_level === "no_clearance"`: standard recovery, deploy the Worker and wire siteverify.
- If `clearance_level !== "no_clearance"` (interactive / managed / jschallenge): the widget is configured for pre-clearance. Ask the user: "This widget is configured for pre-clearance (`<level>`). Do you want me to add server-side siteverify on top, or is pre-clearance alone sufficient?" If pre-clearance alone, exit per the bullet above.

If the user explicitly asks for one of these in their initial prompt, complete Spin's narrow scope first and mention the rest as a follow-up they can run separately. Spin does Spin's job; everything else is a different conversation.

### The frontend-edit contract

When wiring the existing form to the Worker (Wizard Step 6), the contract is: **gate, don't replace.** The user's existing submit handler keeps doing what it did. Spin only adds a validation step before it. Pseudocode:

```js
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = /* read cf-turnstile-response */;
  const result = await fetch(WORKER_URL, { method: 'POST', body: JSON.stringify({ token }) });
  const data = await result.json();
  if (!data.success) {
    // show failure, don't proceed
    return;
  }
  // existing handler logic runs here, unchanged
});
```

If the existing handler was a stub (`showStatus("ok", "demo - no server wired yet")`), Spin leaves it a stub gated on success. The user can replace the stub with real submission logic later. That's not Spin's job.

## Migrating from another CAPTCHA

During the Step 6 codebase scan, also look for existing reCAPTCHA or hCaptcha implementations. If found, switch the Step 7 user confirmation from a fresh-insertion plan to a migration plan.

### Detection signals

| Signal | Pattern |
| --- | --- |
| reCAPTCHA v2/v3 frontend | `https://www.google.com/recaptcha/api.js`, `class="g-recaptcha"`, `data-sitekey="6L..."` (sitekey starts with `6L`) |
| reCAPTCHA backend | `https://www.google.com/recaptcha/api/siteverify` |
| hCaptcha frontend | `https://js.hcaptcha.com/1/api.js`, `class="h-captcha"` |
| hCaptcha backend | `https://hcaptcha.com/siteverify` |

### Substitution rules

- Replace `https://www.google.com/recaptcha/api.js` and `https://js.hcaptcha.com/1/api.js` script tags with `https://challenges.cloudflare.com/turnstile/v0/api.js` (`async defer`).
- Replace `class="g-recaptcha"` and `class="h-captcha"` divs with `class="cf-turnstile"`, preserving `data-sitekey` (but updating to the new Turnstile sitekey) and adding `data-action="turnstile-spin-v1"`.
- `grecaptcha.execute(...)` → `turnstile.render(...)` or `turnstile.execute(...)`. The token field name changes from `g-recaptcha-response` to `cf-turnstile-response`.
- Replace `https://www.google.com/recaptcha/api/siteverify` and `https://hcaptcha.com/siteverify` POSTs with the Spin-deployed managed Worker URL.
- Remove `RECAPTCHA_SECRET` / `HCAPTCHA_SECRET` env vars from the app. The Turnstile secret lives only in the managed Worker.

### Edge cases the agent must surface

- **reCAPTCHA v3 score thresholds.** Turnstile has no score field. If the backend rejects on `score < 0.5` or similar, tell the user: "Your reCAPTCHA v3 verifier checks a score threshold. Turnstile returns `success: true/false` only. Migrated code will reject on `success === false`. Adjust downstream logic if needed."
- **reCAPTCHA Enterprise.** Do not auto-migrate. Point the user at https://developers.cloudflare.com/turnstile/migration/recaptcha/ and ask them to handle the Enterprise specifics first.
- **Custom actions.** Preserve any `action=` value the user passed to `grecaptcha.execute` as `data-action` on the Turnstile widget. Only use `data-action="turnstile-spin-v1"` as the default when no custom action exists.

### Reference docs

Fetch one of these when you need the exact replacement pattern for a specific framework binding (e.g. `react-google-recaptcha`, `@hcaptcha/react-hcaptcha`):

- https://developers.cloudflare.com/turnstile/migration/recaptcha/
- https://developers.cloudflare.com/turnstile/migration/hcaptcha/

## Wizard flow

Execute these steps in order. If a step fails, surface the error before continuing.

### Step 1: Auth check

Run two probes: one to confirm there's a token, one to confirm it has the right scope. Fail fast here so the user doesn't get partway through the flow before hitting an auth error.

**Dependency note:** the API responses are JSON. `jq` is the idiomatic parser but isn't installed by default on macOS. Use `python3 -c "import sys,json; ..."` if `jq` is missing (`python3` is on every macOS and Linux).

```sh
# Probe 1: is there a token at all?
npx wrangler whoami

# Probe 2: does the token have Turnstile:Edit scope?
# Resolve ACCOUNT_ID. Prefer jq, fall back to python3.
if command -v jq >/dev/null 2>&1; then
  ACCOUNT_ID=$(npx wrangler whoami --json | (jq -r '.accounts[0].id' 2>/dev/null || python3 -c "import sys, json; print(json.load(sys.stdin)['accounts'][0]['id'])"))
else
  ACCOUNT_ID=$(npx wrangler whoami --json | python3 -c "import sys, json; print(json.load(sys.stdin)['accounts'][0]['id'])")
fi
curl -s "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -o /tmp/.spin-scope-probe.json
python3 -c "import sys, json; sys.exit(0 if json.load(open('/tmp/.spin-scope-probe.json')).get('success') else 1)" \
  && echo "SCOPE: OK" || echo "SCOPE: MISSING (code 10000 → no Turnstile:Edit)"
rm -f /tmp/.spin-scope-probe.json
```

**Account-mismatch warning:** if `CLOUDFLARE_ACCOUNT_ID` is set in env, verify it matches the token's account. The token's account is what `wrangler whoami` reports. If they differ, the Worker deploy in Step 5 will silently target the wrong account. Detect and warn:

```sh
if [ -n "$CLOUDFLARE_ACCOUNT_ID" ] && [ "$CLOUDFLARE_ACCOUNT_ID" != "$ACCOUNT_ID" ]; then
  echo "WARNING: \$CLOUDFLARE_ACCOUNT_ID ($CLOUDFLARE_ACCOUNT_ID) doesn't match the token's account ($ACCOUNT_ID)."
  echo "Wrangler will use \$CLOUDFLARE_ACCOUNT_ID. Unset it (\`unset CLOUDFLARE_ACCOUNT_ID\`) or fix it before continuing."
fi
```

If a mismatch is detected, stop and ask the user to resolve before proceeding.

**Critical:** `wrangler login`'s interactive OAuth flow does NOT include `Account.Turnstile:Edit`. If the user has only OAuth auth (or no token at all), the scope probe will fail. Do not direct them to `wrangler login`. It won't fix the problem.

If Probe 1 fails (no token, expired, revoked, invalid) OR Probe 2 returns MISSING, prompt the user for fresh credentials. **Do not speculate on why the existing token doesn't work**. Don't say "your token is rotated" or "your token is invalid." The user knows. Just ask for what's needed and give the cleanest paths first:

> "I need a Cloudflare API token with `Account.Turnstile:Edit` and `Account.Workers Scripts:Edit`. Create one at https://dash.cloudflare.com/profile/api-tokens → **Create Token** → **Custom token** → add those two permissions → set Account Resources to include the target account.
>
> Three ways to give it to me, cleanest first:
>
> 1. **Export and relaunch** (token never enters this chat):
>    `export CLOUDFLARE_API_TOKEN=<token>` then restart me from that terminal.
>
> 2. **Save to a file I can read** (token in file with user-only perms, not in this chat):
>    `umask 077 && printf '%s' '<token>' > ~/.cf-turnstile-token`
>    Then tell me: "token is at ~/.cf-turnstile-token". I'll `cat` it.
>
> 3. **Paste it here** (fastest, but the token will be in our chat log, so you'd need to rotate it after if this log is ever shared)." **[wait for user]**

For option 1: re-run `wrangler whoami` to confirm the new value is loaded.

For option 2: capture the path and read the token at every API call site:
```sh
TOKEN=$(cat "$TOKEN_PATH")
curl -H "Authorization: Bearer $TOKEN" ...
```

For option 3: inline the pasted value when calling APIs:
```sh
CLOUDFLARE_API_TOKEN="<user-pasted-token>" curl ...
```

Default to options 1 or 2 if the user is on a personal/work machine they care about. Option 3 is fine for throwaway sandbox accounts or one-off setups.

If multiple accounts are listed in `wrangler whoami` after auth is healthy, ask the user which one to target and capture as `$ACCOUNT_ID`.

### Step 2: Codebase scan

Detect framework by marker file:

| Marker file                    | Framework               |
| ------------------------------ | ----------------------- |
| `next.config.{js,mjs,ts}`      | Next.js                 |
| `astro.config.{mjs,ts}`        | Astro                   |
| `svelte.config.{js,ts}`        | SvelteKit               |
| `remix.config.{js,ts}`         | Remix                   |
| `hugo.toml` / `config.toml`    | Hugo                    |
| `wrangler.toml` + `functions/` | Cloudflare Pages        |
| none of the above              | vanilla HTML (fallback) |

For Next.js, distinguish App Router (`app/`) from Pages Router (`pages/`).

Find insertion candidates:

- `<form>` elements in `.html`, `.tsx`, `.jsx`, `.astro`, `.svelte`, `.vue`
- `export POST` in `app/api/**/route.{ts,js}` or `pages/api/**/*.{ts,js}`
- `+server.ts` / `+page.server.ts` in SvelteKit
- `action()` exports in Remix
- Files named `signup.*`, `login.*`, `register.*`, `contact.*`, `subscribe.*`

For each, capture file path, line, surrounding context, and whether the route appears public-facing.

### Step 3: User confirmation

Present a numbered list. Mark public-facing forms as `[recommended]` and admin / authenticated forms as `[skip by default]`. Wait for the user's response (`all` / `recommended` / `1,3,4`) before continuing.

**No forms found.** If the codebase scan turns up zero `<form>` elements or API routes, do NOT proceed silently. Ask: "I didn't find any forms in this project. Where should I add Turnstile? A specific file path, a route to create, or skip frontend wiring entirely (widget + Worker only)?" **[wait for user]** Acceptable answers: a file path the agent can read + edit, a new file path to create, or "skip frontend". If the user picks skip-frontend, still complete Steps 4-5 (create widget + deploy Worker) and report the sitekey + Worker URL. The user can wire the frontend manually later.

### Step 4: Create widget

One widget covers all insertion points. Use the Cloudflare API directly. The `wrangler turnstile` subcommands don't exist on any current wrangler version. Always include `localhost` and `127.0.0.1` so local testing works.

```sh
ACCOUNT_ID=$(npx wrangler whoami --json | (jq -r '.accounts[0].id' 2>/dev/null || python3 -c "import sys, json; print(json.load(sys.stdin)['accounts'][0]['id'])"))
curl -s -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"myproject (Spin)","domains":["localhost","127.0.0.1","example.com"],"mode":"managed"}'
```

If the response is `{"success":false,"errors":[{"code":10000,...}]}`, the token lacks `Account.Turnstile:Edit`. Stop here and walk the user through the token-creation step in Step 1.

If `$CLOUDFLARE_API_TOKEN` is unset, every curl above fails with auth error. Use the auth flow from Step 1 to get the user to set it.

Capture `result.sitekey` (public, goes in frontend) and `result.secret` (private, goes to Worker secret). Never write the secret to disk.

### Step 5: Deploy managed Worker

```sh
# Fetch the Worker template that ships with this skill. degit copies just the
# subdirectory without cloning the whole repo. Once this skill is installed
# locally, the same template lives at <skill-dir>/templates/worker/. Use
# that path directly if your agent runtime exposes a skill-bundle path.
rm -rf /tmp/turnstile-siteverify-deploy
npx --yes degit cloudflare/skills/skills/turnstile-spin/templates/worker \
  /tmp/turnstile-siteverify-deploy
cd /tmp/turnstile-siteverify-deploy

WORKER_NAME=turnstile-siteverify-{project-slug}

# 1. Deploy first. The Worker must exist before `secret put` can target it.
npx wrangler deploy --name "$WORKER_NAME"

# 2. Set the secret. Use `echo` (NOT `printf '%s'`). wrangler secret put
#    expects newline-terminated stdin, and feeding it via `printf` without
#    a trailing newline can land an empty secret in the Worker env even
#    though wrangler prints "Success! Uploaded secret".
echo "$WIDGET_SECRET" | npx wrangler secret put TURNSTILE_SECRET_KEY --name "$WORKER_NAME"

# 3. Brief wait. Secret takes a few seconds to propagate to the Worker
#    runtime. Validating (Step 7) immediately after can return
#    `missing-input-secret` even though the secret is in the dashboard.
sleep 5
```

Capture the deployed URL printed by wrangler as `WORKER_URL`.

If deploy fails with "script name already in use", append a short hash:

```sh
WORKER_NAME=turnstile-siteverify-{project-slug}-$(date +%s | tail -c 5)
npx wrangler deploy --name "$WORKER_NAME"
echo "$WIDGET_SECRET" | npx wrangler secret put TURNSTILE_SECRET_KEY --name "$WORKER_NAME"
sleep 5
```

**If Step 7b validation returns `missing-input-secret`,** the secret didn't propagate. Don't blame the test. The Worker env truly has an empty secret. Recovery: `npx wrangler secret delete TURNSTILE_SECRET_KEY --name "$WORKER_NAME"`, then re-`echo "$WIDGET_SECRET" | npx wrangler secret put ...`, then wait 5-10s before retrying validation.

### Step 6: Write frontend snippets

For each insertion point, write the appropriate snippet from the `references/` files. Every snippet must include:

- `data-action="turnstile-spin-v1"` (telemetry marker, do not omit)
- `data-sitekey="<sitekey from Step 4>"`
- A form `action` or `fetch` target pointing at `WORKER_URL`

Reference files in this skill:

- `references/vanilla-html.md`
- `references/nextjs-app.md`
- `references/nextjs-pages.md`
- `references/astro.md`
- `references/sveltekit.md`
- `references/hugo.md`

Do not overwrite existing files without showing a diff and getting explicit confirmation.

### Step 7: Validate

Three checks against the deployed Worker.

```sh
# 7a. Health (GET / returns {ok:true, version:"x.y.z"})
curl -sf "${WORKER_URL}/"
# Expect: {"ok":true,"version":"<any>"}

# 7b. Dummy siteverify
curl -s -X POST "${WORKER_URL}/" \
  -H "Content-Type: application/json" \
  -d '{"token":"XXXX.DUMMY.TOKEN.XXXX"}'
# Expect HTTP 200 with: success=false, error-codes=[...]
```

Required assertions on the dummy response:

- `success` is `false`
- `error-codes` is a non-empty array

```sh
# 7c. Hostname (use the API; wrangler turnstile subcommands don't exist)
ACCOUNT_ID=$(npx wrangler whoami --json | (jq -r '.accounts[0].id' 2>/dev/null || python3 -c "import sys, json; print(json.load(sys.stdin)['accounts'][0]['id'])"))
curl -s "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/challenges/widgets/${WIDGET_ID}" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" | (jq '.result.domains' 2>/dev/null || python3 -c "import sys, json; print(json.load(sys.stdin)['result']['domains'])")
# Expect: domains array matches what was registered in Step 4
```

### Step 8: Persist the skill

Fetch the canonical skill from the docs site. **Validate the response before writing**. A 404 or unexpected content type means the docs page is unavailable and `curl -sSL -o` will happily write the Astro 404 HTML to disk as if it were the skill, leaving the user with a broken `.claude/skills/turnstile-spin/SKILL.md`.

```sh
PERSIST_PATH=".claude/skills/turnstile-spin/SKILL.md"  # adjust per agent flavor
mkdir -p "$(dirname "$PERSIST_PATH")"

TMP=$(mktemp)
HTTP_CODE=$(curl -sSL -w "%{http_code}" -o "$TMP" \
  https://developers.cloudflare.com/turnstile/spin/index.md)

# Validate: HTTP 200 AND first line is YAML frontmatter `---` (matches the SKILL.md shape)
if [ "$HTTP_CODE" = "200" ] && head -1 "$TMP" | grep -q "^---$"; then
  mv "$TMP" "$PERSIST_PATH"
  echo "Skill persisted to $PERSIST_PATH"
else
  rm -f "$TMP"
  echo "Could not fetch fresh skill (HTTP $HTTP_CODE or wrong content). The inlined skill above is still available in this conversation, so re-paste it next time, or write it to $PERSIST_PATH manually from the prompt above."
  # Do NOT proceed silently. If the user asked for persistence, surface this failure.
fi
```

Other agent paths:

| Agent          | Persist path                                |
| -------------- | ------------------------------------------- |
| Claude Code    | `.claude/skills/turnstile-spin/SKILL.md`    |
| Cursor         | `.cursor/rules/turnstile-spin.md`           |
| Codex          | `.codex/skills/turnstile-spin/SKILL.md`     |
| OpenCode       | `.opencode/skills/turnstile-spin/SKILL.md`  |
| Copilot Chat   | `.github/copilot/skills/turnstile-spin.md`  |
| Windsurf       | `.windsurf/rules/turnstile-spin.md`         |

### Step 9: Report

```
Turnstile Spin: complete.

Created:
  • Widget "<project> (Spin)", sitekey <sitekey>
  • Worker <WORKER_URL>
  • Frontend snippets at: <list of files>
  • Skill saved at <persist path>

Validated:
  ✓ Worker /health returns 200
  ✓ Worker handles a dummy token with a structured error
  ✓ Widget hostname matches <user's domain>

Next:
  • Open one of the protected forms, solve the widget, confirm success.
```

If any step failed, include it as a caveat with the failure mode and remediation step.

## Recovery flow (existing widget)

If the user has an existing widget (URL parameter `widget=<id>` is set, or they ask "spin against my existing widget"):

1. Skip Step 4 (widget creation). The widget already exists.
2. Retrieve the widget secret using the decision tree below. **Don't ask the user to paste the secret if the API path is available**. That's a clipboard leak you can avoid.
3. Continue from Step 5 (Worker deploy). The clarity here matters because every recovery is, by definition, a chance to do this without re-creating the widget (which would invalidate the existing sitekey and break the user's frontend).
4. In Step 6 (Frontend edits), prompt before overwriting any existing widget HTML.

Site key never changes. Dashboard's `Deployment` column updates from `Manual` to `Spin` on the first request carrying `data-action="turnstile-spin-v1"`.

### Secret retrieval: decision tree

Recovery needs the widget's secret to bind to the Worker. The agent has three sources, in preference order:

```
1. Secret already in the prompt
   → If the prompt contains `Secret key: <value>`, use it. Done.

2. API fetch (PREFERRED, zero clipboard exposure, no extra paste step)
   The Spin wizard already required Account.Turnstile:Edit in Step 1, which
   includes read. So if the user is in recovery after running Spin before,
   the token is set and this Just Works.

   ACCOUNT_ID=$(npx wrangler whoami --json | (jq -r '.accounts[0].id' 2>/dev/null || python3 -c "import sys, json; print(json.load(sys.stdin)['accounts'][0]['id'])"))
   SECRET=$(curl -s \
     "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$SITEKEY" \
     -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
     | (jq -r '.result.secret' 2>/dev/null || python3 -c "import sys, json; print(json.load(sys.stdin)['result']['secret'])"))

   If $SECRET is non-empty and not "null", use it. Done.

   If the call returns 403 / code 10000, the token can deploy Workers but
   can't read Turnstile widgets. Tell the user:
     > "Your token can edit Turnstile widgets but can't read this one's
        secret. Either add Account.Turnstile:Read to the token at
        https://dash.cloudflare.com/profile/api-tokens, or paste the
        secret below."

3. User paste (FALLBACK only, when API path doesn't work or the user
   prefers not to use a token):
   → Ask: "Paste the widget secret from
      https://dash.cloudflare.com/?to=/:account/turnstile (click the widget
      → reveal secret → copy)."
   → Wait for paste. Use the pasted value.
```

Default to step 2 (API fetch) whenever a token is available. Step 3 is the courtesy fallback for users who explicitly don't want to use a token, or whose token scope doesn't include reading the secret.

**Never** propose recreating the widget to "get a fresh secret." That breaks the existing sitekey everywhere it's used in the user's frontend. Recovery preserves the sitekey by definition.

## Edge cases

| Situation                              | Action                                                                       |
| -------------------------------------- | ---------------------------------------------------------------------------- |
| `wrangler` not installed               | `npm install -g wrangler` or `npm install --save-dev wrangler` (local)       |
| Multiple Cloudflare accounts           | List them, prompt the user to choose, store `CLOUDFLARE_ACCOUNT_ID`          |
| Project on Cloudflare Pages            | Deploy managed Worker anyway (default). Or suggest the Pages Plugin.         |
| `EXPECTED_HOSTNAME` mismatch in 7c     | Update domains via API (PUT, not PATCH; `PATCH` returns `10405 Method not allowed`). Send the full `{name, mode, domains}` body: `curl -X PUT .../widgets/$SITEKEY -d '{"name":"...","mode":"managed","domains":[...]}'` |
| Worker deploy fails: name taken        | Append a short hash to `--name`                                              |
| API returns 403 on widget create       | Account lacks Turnstile, or token lacks `Account.Turnstile:Edit`. Re-login.  |
| Token expired (5-minute window)        | Tokens are single-use. Reset the widget client-side.                         |

## Telemetry marker

Every snippet you write must include `data-action="turnstile-spin-v1"`. This is account-level aggregate telemetry, never per-user. Cloudflare uses it to measure activation rates. To opt out, the user removes the attribute manually; do not skip writing it unless they explicitly ask.

## Do not

- Do not write the secret to disk. Only pass it to `wrangler secret put` via stdin.
- Do not skip Step 7 (validation). The wizard's value proposition is that the integration is real, not just scaffolded.
- Do not propose features outside the wizard (custom Worker code, custom domains, advanced WAF rules) unless the user asks. Spin is intentionally narrow.
- Do not call siteverify from the browser. Always browser → user's Worker → siteverify.
- Do not deploy the Worker into a different account than the widget was created in.
