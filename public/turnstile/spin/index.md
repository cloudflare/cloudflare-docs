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

Turns the prompt "set up Turnstile" into a working end-to-end integration: a widget, a deployed managed siteverify Worker, frontend snippets at every chosen insertion point, and a real validation pass before reporting success.

You are the agent. Run the wizard below by invoking the scripts under `scripts/` and branching on their JSON output. The scripts hold the deterministic logic (API calls, retry/error handling); your job is orchestration, codebase reading, confirmation, and the frontend edits.

Canonical instructions live at [`developers.cloudflare.com/turnstile/spin`](https://developers.cloudflare.com/turnstile/spin/). If the docs page and this file disagree, trust the docs page.

## When to load this skill

Load when the user's prompt mentions any of:

- "Turnstile", "CAPTCHA", "bot protection"
- "siteverify", "cf-turnstile-response"
- "protect this form", "stop bot signups", "spam signups"
- A specific signup, login, or contact form combined with "Cloudflare" or "bot"

Do not load for unrelated Cloudflare tasks (Workers, Pages, R2, etc.) unless Turnstile is also mentioned.

## Conversation flow

The user pasted the prompt. You are in a multi-step dialog. Detect what you can, ask only when you have to, confirm before every irreversible step. Each numbered moment is one agent message. Items marked **[wait for user]** require a user response.

1. **Brief acknowledge.** One sentence: "I'll run Turnstile setup end to end. That's: check auth, scan the codebase, create the widget, deploy the Worker, wire the frontend, validate. Proceed?" **[wait for user]** Do NOT present a plan yet. Auth + scan come first.

2. **Wrangler check.** `npx wrangler --version`. If missing, ask once: "Install wrangler with `npm install --save-dev wrangler` (Node project) or `npm install -g wrangler` (other)? Proceed?" **[wait for user]** If install is blocked entirely (corporate policy, blocked npm), fall back to driving Steps 4-5 via `curl` against `api.cloudflare.com/client/v4/`.

3. **Auth + scope probe (FIRST irreversible action).** Run `scripts/auth-probe.sh`. Branch on `status`:
   - `ok`: continue to Step 4. The script already picked the account (single-account token, or one matching `$CLOUDFLARE_ACCOUNT_ID`).
   - `missing_token`, `missing_scope`, or `missing_workers_scope`: ask the user to create a token at https://dash.cloudflare.com/profile/api-tokens → Custom token → permissions `Account.Turnstile:Edit` **and** `Account.Workers Scripts:Edit` → include the target account in Account Resources. **Do NOT direct them to `wrangler login`**. Its OAuth scope doesn't include `Account.Turnstile:Edit` or `Account.Workers Scripts:Edit`. Offer three ways to hand the token over, cleanest first:
     1. **Export + relaunch** (token never enters chat): `export CLOUDFLARE_API_TOKEN=<token>` then restart the agent from that terminal.
     2. **Save to file** (token in file with user-only perms, not in chat): `umask 077 && printf '%s' '<token>' > ~/.cf-turnstile-token`, then read with `TOKEN=$(cat ~/.cf-turnstile-token)`.
     3. **Paste in chat** (fastest, but token lands in conversation log; user should rotate it after if the log is ever shared).
        If the user picks option 3 (paste in chat), you can use the wait to run Steps 5, 6, 7 (Domain, Codebase scan, Insertion plan). Options 1 and 2 will restart your session, so do not pre-fetch state in those cases. When auth is established, re-run `auth-probe.sh`, then continue to Step 8.
   - `multiple_accounts`: the token covers more than one account and `$CLOUDFLARE_ACCOUNT_ID` is unset. Present the numbered `accounts` list. **[wait for user]** Then export `CLOUDFLARE_ACCOUNT_ID=<chosen>` and re-run `auth-probe.sh`.
   - `account_mismatch`: `$CLOUDFLARE_ACCOUNT_ID` is set but isn't one of the token's accounts. Show the `accounts` list and ask the user to either `unset CLOUDFLARE_ACCOUNT_ID` or set it to one of those IDs.

4. **Account selection.** If `auth-probe.sh` returned `ok` after a `multiple_accounts` round-trip, this is already done. Otherwise the script picked the single account silently and you continue to Step 5.

5. **Domain.** Always include `localhost` and `127.0.0.1`. For production, scan `package.json` `homepage`, `wrangler.toml`, `README.md`, `AGENTS.md`, git remote. Confirm: "I'll register for `localhost`, `127.0.0.1`, and `<domain>`. OK?" **[wait for user]** If no production domain is found, ask.

6. **Codebase scan.** Detect framework + insertion candidates silently.

7. **Insertion plan.** Show the candidate list with `[recommended]` / `[skip by default]` markers; ask the user to confirm (numbers, "all", "recommended", or a list). **[wait for user]** If an existing CAPTCHA was detected, present a migration plan instead (see "Migrating from another CAPTCHA").

8. **Widget creation.** Run `scripts/widget-create.sh --account-id <id> --name <name> --domains <list> --mode managed`. Report the sitekey. The secret stays in env; never write it to disk.

9. **Worker deploy.** Run `scripts/worker-deploy.sh --name turnstile-siteverify-<project-slug>` with `WIDGET_SECRET` exported. Report the Worker URL on `status: ok`. On `set_secret_failed`, the Worker deployed but `TURNSTILE_SECRET_KEY` is not set on it; surface the error, then retry with `echo "$WIDGET_SECRET" | npx wrangler secret put TURNSTILE_SECRET_KEY --name <returned worker_name>` before running validation.

10. **Frontend edits.** State the contract: "I'll add the widget + gate the existing submit handler on `success === true`. The existing handler logic stays the same." Ask "yes" / "show". **[wait for user]** If "show", print unified diffs and ask again. Do NOT propose alternate behavior (mail delivery, custom backends).

11. **Validation.** Run `scripts/validate.sh`. Report each check as it passes. If any fails, surface the error and stop. **[wait for user if anything fails]**

12. **Persist skill.** Ask: "Save the Spin skill to `.claude/skills/turnstile-spin/SKILL.md` so I can reuse it on follow-up tasks?" Default yes. **[wait for user]** Then run `scripts/persist-skill.sh --path <agent-specific-path>`.

13. **Final report.** Print the structured summary: what was created, what was validated, what to do next.

### Things you must NOT do

- Do not write the Turnstile secret to disk. Only pass it via stdin to `wrangler secret put` (the worker-deploy.sh script handles this).
- Do not skip validation.
- Do not overwrite files without showing a diff.
- Do not deploy a Worker to a different account than the widget was created in.
- Do not call siteverify from the browser. Always: browser → user's Worker → siteverify.
- Do not use `sudo` or install global packages without asking.

### Hard scope boundary: DO NOT ask the user about

Spin validates the Turnstile token via a managed Worker before the user's existing form handler runs. Everything else is out of scope:

- **Email / SMS / notification delivery.** Leave the existing submit handler alone (just gate it on `success === true`). Don't propose Resend, Mailchannels, SMTP, mailto.
- **Custom Worker code.** Deploy the stock Worker template bundled at `templates/worker/`. Don't write a new Worker. Don't add features (rate limiting, custom routing, third-party integrations).
- **Database / payment / OAuth / form persistence.** Out of scope.
- **Frontend framework migration, refactoring, or styling.** Edit only what's needed.
- **reCAPTCHA v3 score thresholds.** Turnstile returns `success: true/false`.
- **Pre-clearance-only setups.** If `clearance_level !== no_clearance`, siteverify is optional and Spin doesn't apply. Redirect the user and exit.

### Recovery flow: respect existing widget configuration

If the user tells you they already have a Turnstile widget set up and want to wire siteverify to it without rotating the sitekey (e.g. "I have a sitekey but siteverify never worked", "set up Spin against my existing widget `<sitekey>`"):

1. Skip Step 8 (widget creation). The sitekey already exists; get it from the user.
2. Fetch the widget metadata via `scripts/fetch-secret.sh --account-id <id> --sitekey <key>`. Branch on `status`:
   - `ok`: read `secret`, `clearance_level`, and `domains` from the response. Confirm `domains` includes the user's production hostname; if not, surface the gap before proceeding.
   - `missing_read_scope`: tell the user to add `Account.Turnstile:Read` to the token, or fall back to asking them to paste the secret. In the paste path, you do not have `clearance_level` or `domains`; ask the user to confirm both.
3. Check `clearance_level` from the response (or the user's answer):
   - `no_clearance`: standard recovery (deploy Worker, wire siteverify).
   - anything else: ask whether they want siteverify on top of pre-clearance, or exit per the scope boundary.
4. Continue from Step 9 (Worker deploy). Site key does not change. Dashboard's `Deployment` column flips from `Manual` to `Spin` on the first request carrying `data-action="turnstile-spin-v1"`.
5. Never recreate the widget to get a fresh secret. That breaks the existing sitekey everywhere it's deployed.

### The frontend-edit contract

When wiring an existing form to the Worker (Step 10), the contract is: **gate, don't replace.** The user's existing submit handler keeps doing what it did. Spin only adds a validation step before it.

```js
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = /* read cf-turnstile-response */;
  const result = await fetch(WORKER_URL, { method: 'POST', body: JSON.stringify({ token }) });
  const data = await result.json();
  if (!data.success) return; // show failure
  // existing handler logic runs here, unchanged
});
```

If the existing handler was a stub, Spin leaves it a stub gated on success. The user can replace the stub later; that's not Spin's job.

## Migrating from another CAPTCHA

During the Step 6 codebase scan, also look for existing reCAPTCHA or hCaptcha. If found, switch Step 7 to a migration plan.

Detection signals:

- reCAPTCHA: `https://www.google.com/recaptcha/api.js`, `class="g-recaptcha"`, `data-sitekey="6L..."`, backend POST to `/recaptcha/api/siteverify`
- hCaptcha: `https://js.hcaptcha.com/1/api.js`, `class="h-captcha"`, backend POST to `https://hcaptcha.com/siteverify`

Substitution:

- Replace script tags with `https://challenges.cloudflare.com/turnstile/v0/api.js` (`async defer`).
- Replace `class="g-recaptcha"` / `class="h-captcha"` divs with `class="cf-turnstile"`, update `data-sitekey` to the new Turnstile sitekey, add `data-action="turnstile-spin-v1"`.
- Token field changes from `g-recaptcha-response` to `cf-turnstile-response`.
- Backend siteverify URL points at the Spin-deployed Worker. Drop `RECAPTCHA_SECRET` / `HCAPTCHA_SECRET` env vars.

Edge cases to surface to the user:

- **reCAPTCHA v3 score thresholds.** Turnstile has no score. Tell the user explicitly that migrated code will reject on `success === false`.
- **reCAPTCHA Enterprise.** Don't auto-migrate. Point at [developers.cloudflare.com/turnstile/migration/recaptcha/](https://developers.cloudflare.com/turnstile/migration/recaptcha/).
- **Custom `action=` values.** Preserve any custom action the user passed to `grecaptcha.execute` as `data-action` on the widget. Use `turnstile-spin-v1` only when no custom action exists.

## Edge cases

| Situation                                      | Action                                                                                                                                                                                                                                                                                  |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wrangler` not installed                       | Install path: `npm install --save-dev wrangler` (Node project) or `npm install -g wrangler` (other)                                                                                                                                                                                     |
| Multiple Cloudflare accounts                   | `scripts/auth-probe.sh` returns all accounts; ask the user to choose, export `CLOUDFLARE_ACCOUNT_ID`                                                                                                                                                                                    |
| Cloudflare Pages project                       | Deploy the managed Worker anyway, OR suggest the [Pages Plugin](https://developers.cloudflare.com/pages/functions/plugins/turnstile/)                                                                                                                                                   |
| `EXPECTED_HOSTNAME` mismatch                   | Update widget domains via PUT, not PATCH (PATCH returns `10405 Method not allowed`): `curl -X PUT .../widgets/$SITEKEY -d '{"name":"...","mode":"managed","domains":[...]}'`                                                                                                            |
| Worker name conflict                           | `worker-deploy.sh` retries automatically with a hash suffix                                                                                                                                                                                                                             |
| Token expired mid-flow                         | Stop, re-run `scripts/auth-probe.sh`, prompt for fresh credentials                                                                                                                                                                                                                      |
| Step 11 returns `missing-input-secret`         | Secret didn't propagate. Re-set: `echo "$WIDGET_SECRET" \| npx wrangler secret put TURNSTILE_SECRET_KEY --name <worker_name from worker-deploy.sh output>`, wait 10s, re-validate. Use the `worker_name` field returned by `worker-deploy.sh`; do not rely on a `$WORKER_NAME` env var. |
| `worker-deploy.sh` returns `set_secret_failed` | Worker is deployed but secret is not set. Re-run only the secret-put using the returned `worker_name`: `echo "$WIDGET_SECRET" \| npx wrangler secret put TURNSTILE_SECRET_KEY --name <worker_name>`. Surface the `detail` field to the user — it carries the wrangler error.            |

## Telemetry marker

Every snippet you write must include `data-action="turnstile-spin-v1"`. Account-level aggregate telemetry, never per-user. Cloudflare uses it to measure activation. If the user removes the attribute, the integration still works; only the analytics segmentation is lost.

## Do not

- Do not write the secret to disk.
- Do not skip validation (Step 11).
- Do not propose features outside the wizard (custom Worker code, custom domains, advanced WAF rules) unless asked.
- Do not call siteverify from the browser.
- Do not deploy the Worker into a different account than the widget.

---

## Helper scripts (bootstrap before the wizard)

The wizard above references deterministic helper scripts. Write these files under `/tmp/turnstile-spin-scripts/` before starting, then `export TURNSTILE_SPIN_SCRIPTS=/tmp/turnstile-spin-scripts` and `chmod +x /tmp/turnstile-spin-scripts/*.sh`.

_If you have the `cloudflare/skills` bundle installed locally, skip this section. The scripts ship alongside the SKILL.md you are reading; this bootstrap is for the ad-hoc paste-into-agent case._

### `/tmp/turnstile-spin-scripts/auth-probe.sh`

```sh
#!/usr/bin/env bash
# Probes Cloudflare API auth state for the Turnstile Spin agent.
#
# Reads:
#   $CLOUDFLARE_API_TOKEN  (required)
#   $CLOUDFLARE_ACCOUNT_ID (optional; if set, must be one of the token's accounts)
#
# Outputs JSON to stdout, always exits 0. The agent reads `status`:
#   "ok"                   ; selected account passed both Turnstile and Workers scope probes
#   "missing_token"        ; no token set, or wrangler whoami failed
#   "missing_scope"        ; token lacks Account.Turnstile:Edit on the selected account
#   "missing_workers_scope"; token has Turnstile scope but lacks Workers Scripts on the selected account
#   "multiple_accounts"    ; token covers >1 accounts and $CLOUDFLARE_ACCOUNT_ID is unset; agent must ask user to pick, set it, and re-run
#   "account_mismatch"     ; $CLOUDFLARE_ACCOUNT_ID is set but is not in the token's accounts list
#
# Human-readable diagnostics go to stderr. The agent surfaces them to the user.

set -uo pipefail

emit() {
  echo "$1"
  exit 0
}

token="${CLOUDFLARE_API_TOKEN:-}"
declared_account="${CLOUDFLARE_ACCOUNT_ID:-}"

if [ -z "$token" ]; then
  echo "auth-probe: \$CLOUDFLARE_API_TOKEN is not set." >&2
  emit '{"status":"missing_token","reason":"no_env_var"}'
fi

whoami_json=$(npx wrangler whoami --json 2>/dev/null || true)
if [ -z "$whoami_json" ] || [ "$(echo "$whoami_json" | head -c 1)" != "{" ]; then
  echo "auth-probe: wrangler whoami returned no JSON. Token may be invalid or expired." >&2
  emit '{"status":"missing_token","reason":"whoami_failed"}'
fi

# Extract the accounts array. Fall back to python3 if jq is missing.
accounts_json=$(echo "$whoami_json" | (jq -c '.accounts' 2>/dev/null || python3 -c "import sys,json; print(json.dumps(json.load(sys.stdin)['accounts']))"))
account_count=$(echo "$accounts_json" | (jq 'length' 2>/dev/null || python3 -c "import sys,json; print(len(json.load(sys.stdin)))"))

if [ -z "$account_count" ] || [ "$account_count" = "0" ] || [ "$account_count" = "null" ]; then
  echo "auth-probe: wrangler whoami succeeded but no accounts found on the token." >&2
  emit '{"status":"missing_token","reason":"no_accounts"}'
fi

# Pick the account to probe:
#   - $CLOUDFLARE_ACCOUNT_ID set: must be in the token's accounts list, else account_mismatch
#   - unset, exactly 1 account: use it silently
#   - unset, >1 accounts: emit multiple_accounts; agent picks and re-runs
if [ -n "$declared_account" ]; then
  in_list=$(echo "$accounts_json" | (jq --arg id "$declared_account" 'map(.id) | index($id) != null' 2>/dev/null || python3 -c "import sys,json; print('true' if any(a['id']==sys.argv[1] for a in json.load(sys.stdin)) else 'false')" "$declared_account"))
  if [ "$in_list" != "true" ]; then
    echo "auth-probe: \$CLOUDFLARE_ACCOUNT_ID ($declared_account) is not one of the token's accounts." >&2
    echo "auth-probe: Either unset \$CLOUDFLARE_ACCOUNT_ID, or set it to an account included in the token's Account Resources." >&2
    emit "{\"status\":\"account_mismatch\",\"declared\":\"$declared_account\",\"accounts\":$accounts_json}"
  fi
  account_id="$declared_account"
elif [ "$account_count" = "1" ]; then
  account_id=$(echo "$accounts_json" | (jq -r '.[0].id' 2>/dev/null || python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])"))
else
  echo "auth-probe: token covers $account_count accounts; ask the user to pick one, then export \$CLOUDFLARE_ACCOUNT_ID and re-run." >&2
  emit "{\"status\":\"multiple_accounts\",\"accounts\":$accounts_json}"
fi

# Probe Turnstile scope on the selected account
tmp=$(mktemp)
http_code=$(curl -sS -w "%{http_code}" -o "$tmp" \
  "https://api.cloudflare.com/client/v4/accounts/$account_id/challenges/widgets" \
  -H "Authorization: Bearer $token" 2>/dev/null || echo "000")
body=$(cat "$tmp"); rm -f "$tmp"
success=$(echo "$body" | (jq -r '.success' 2>/dev/null || echo "false"))

if [ "$success" != "true" ]; then
  echo "auth-probe: token cannot read /challenges/widgets on account $account_id (HTTP $http_code). Missing Account.Turnstile:Edit." >&2
  emit "{\"status\":\"missing_scope\",\"account_id\":\"$account_id\",\"http_code\":$http_code}"
fi

# Probe Workers scope on the selected account. GET /workers/scripts requires
# Account.Workers Scripts:Read, which is a best-effort proxy for Edit. Tokens
# granted Edit-only (without Read) will fail this probe and emit a confusing
# missing_workers_scope; the agent should suggest adding Read alongside Edit.
tmp=$(mktemp)
workers_code=$(curl -sS -w "%{http_code}" -o "$tmp" \
  "https://api.cloudflare.com/client/v4/accounts/$account_id/workers/scripts" \
  -H "Authorization: Bearer $token" 2>/dev/null || echo "000")
workers_body=$(cat "$tmp"); rm -f "$tmp"
workers_success=$(echo "$workers_body" | (jq -r '.success' 2>/dev/null || echo "false"))

if [ "$workers_success" != "true" ]; then
  echo "auth-probe: token cannot read /workers/scripts on account $account_id (HTTP $workers_code). Missing Account.Workers Scripts:Edit." >&2
  emit "{\"status\":\"missing_workers_scope\",\"account_id\":\"$account_id\",\"http_code\":$workers_code}"
fi

emit "{\"status\":\"ok\",\"account_id\":\"$account_id\",\"accounts\":$accounts_json}"
```

### `/tmp/turnstile-spin-scripts/fetch-secret.sh`

```sh
#!/usr/bin/env bash
# Retrieves the secret for an existing Turnstile widget via the Cloudflare API.
# Used by the recovery flow when binding the secret to a freshly deployed Worker.
#
# Reads:
#   $CLOUDFLARE_API_TOKEN (required)
#
# Args:
#   --account-id <id>   Cloudflare account ID
#   --sitekey <key>     Widget sitekey to look up
#
# Outputs JSON. Exit 0 on success, 1 on failure.
#   ok:        {"status":"ok","secret":"<secret>","clearance_level":"<level>","domains":[<list>]}
#   no_scope:  {"status":"missing_read_scope","detail":"token lacks Account.Turnstile:Read"}
#   not_found: {"status":"error","reason":"widget_not_found","http_code":<code>}
#
# The agent uses clearance_level to enforce the pre-clearance scope boundary
# (Spin only applies to widgets where clearance_level == "no_clearance"; for
# other levels siteverify is optional and the recovery flow should exit).
#
# Never propose recreating the widget to get a fresh secret; that breaks
# the existing sitekey everywhere the user has it deployed in their frontend.

set -uo pipefail

while [[ $# -gt 0 ]]; do
  case $1 in
    --account-id) ACCOUNT_ID="$2"; shift 2 ;;
    --sitekey)    SITEKEY="$2"; shift 2 ;;
    *) echo "fetch-secret: unknown arg $1" >&2; exit 2 ;;
  esac
done

: "${CLOUDFLARE_API_TOKEN:?CLOUDFLARE_API_TOKEN must be set}"
: "${ACCOUNT_ID:?--account-id required}"
: "${SITEKEY:?--sitekey required}"

tmp=$(mktemp)
http_code=$(curl -sS -w "%{http_code}" -o "$tmp" \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$SITEKEY" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" 2>/dev/null || echo "000")
body=$(cat "$tmp"); rm -f "$tmp"

if [ "$http_code" = "200" ]; then
  secret=$(echo "$body" | (jq -r '.result.secret' 2>/dev/null || python3 -c "import sys,json; print(json.load(sys.stdin)['result']['secret'])"))
  clearance=$(echo "$body" | (jq -r '.result.clearance_level // "no_clearance"' 2>/dev/null || python3 -c "import sys,json; print(json.load(sys.stdin)['result'].get('clearance_level','no_clearance'))"))
  domains=$(echo "$body" | (jq -c '.result.domains // []' 2>/dev/null || python3 -c "import sys,json; print(json.dumps(json.load(sys.stdin)['result'].get('domains',[])))"))
  if [ -n "$secret" ] && [ "$secret" != "null" ]; then
    echo "{\"status\":\"ok\",\"secret\":\"$secret\",\"clearance_level\":\"$clearance\",\"domains\":$domains}"
    exit 0
  fi
fi

if [ "$http_code" = "403" ]; then
  code=$(echo "$body" | (jq -r '.errors[0].code // 0' 2>/dev/null || echo "0"))
  if [ "$code" = "10000" ]; then
    echo "fetch-secret: token can edit Turnstile widgets but cannot read this one's secret." >&2
    echo "fetch-secret: add Account.Turnstile:Read to the token, or fall back to user paste." >&2
    echo "{\"status\":\"missing_read_scope\",\"detail\":\"token lacks Account.Turnstile:Read\"}"
    exit 1
  fi
fi

echo "fetch-secret: widget lookup failed (HTTP $http_code)." >&2
echo "{\"status\":\"error\",\"reason\":\"widget_not_found\",\"http_code\":$http_code}"
exit 1
```

### `/tmp/turnstile-spin-scripts/persist-skill.sh`

```sh
#!/usr/bin/env bash
# Persists the canonical Spin skill bundle (SKILL.md + scripts/ + references/)
# from cloudflare/skills to the user's repo so the agent can re-load it on
# follow-up tasks without re-pasting the bootstrap prompt.
#
# Args:
#   --path <path>   SKILL.md destination, e.g. .claude/skills/turnstile-spin/SKILL.md.
#                   The bundle is extracted into the parent directory of <path>,
#                   so scripts land at e.g. .claude/skills/turnstile-spin/scripts/.
#
# Outputs JSON. Exit 0 if the bundle was written, 1 on failure.
#   ok:    {"status":"ok","path":"<path>","bundle_root":"<dir>","scripts":[<list>]}
#   fail:  {"status":"error","reason":"<reason>"}

set -uo pipefail

PATH_ARG=""
while [[ $# -gt 0 ]]; do
  case $1 in
    --path) PATH_ARG="$2"; shift 2 ;;
    *) echo "persist-skill: unknown arg $1" >&2; exit 2 ;;
  esac
done

: "${PATH_ARG:?--path required}"

TARGET_DIR=$(dirname "$PATH_ARG")
mkdir -p "$TARGET_DIR"

# Install the canonical bundle from cloudflare/skills via degit. This writes
# SKILL.md, scripts/, references/, templates/, tests/ into $TARGET_DIR.
if ! npx --yes degit cloudflare/skills/skills/turnstile-spin "$TARGET_DIR" >/dev/null 2>&1; then
  echo "persist-skill: degit failed; cannot fetch cloudflare/skills/skills/turnstile-spin." >&2
  echo "persist-skill: ensure your network can reach github.com and try again, or install manually." >&2
  echo "{\"status\":\"error\",\"reason\":\"degit_failed\"}"
  exit 1
fi

if [ ! -f "$TARGET_DIR/SKILL.md" ]; then
  echo "persist-skill: bundle extracted but SKILL.md is missing at $TARGET_DIR/SKILL.md." >&2
  echo "{\"status\":\"error\",\"reason\":\"skill_missing\"}"
  exit 1
fi

# Make scripts executable so the agent can invoke them directly.
if [ -d "$TARGET_DIR/scripts" ]; then
  chmod +x "$TARGET_DIR/scripts"/*.sh 2>/dev/null || true
fi

scripts_list=$(ls "$TARGET_DIR/scripts" 2>/dev/null | sed 's/.*/"&"/' | paste -sd, -)
echo "persist-skill: wrote bundle to $TARGET_DIR" >&2
echo "{\"status\":\"ok\",\"path\":\"$PATH_ARG\",\"bundle_root\":\"$TARGET_DIR\",\"scripts\":[$scripts_list]}"
exit 0
```

### `/tmp/turnstile-spin-scripts/validate.sh`

```sh
#!/usr/bin/env bash
# Validates a deployed Turnstile siteverify Worker end-to-end.
#
# Reads:
#   $CLOUDFLARE_API_TOKEN (required for hostname check)
#
# Args:
#   --worker-url <url>     Deployed Worker URL (from worker-deploy.sh)
#   --account-id <id>      Cloudflare account ID
#   --sitekey <key>        Widget sitekey (from widget-create.sh)
#   --expected-domains <a,b,c>  Comma-separated domains that must appear in the widget's domains array
#
# Outputs JSON. Exit 0 if all three checks pass, 1 otherwise.
#   ok:    {"status":"ok"}
#   fail:  {"status":"error","check":"health|dummy_siteverify|worker_metadata|hostname","detail":"<msg>"}

set -uo pipefail

while [[ $# -gt 0 ]]; do
  case $1 in
    --worker-url)       WORKER_URL="$2"; shift 2 ;;
    --account-id)       ACCOUNT_ID="$2"; shift 2 ;;
    --sitekey)          SITEKEY="$2"; shift 2 ;;
    --expected-domains) EXPECTED_DOMAINS="$2"; shift 2 ;;
    *) echo "validate: unknown arg $1" >&2; exit 2 ;;
  esac
done

: "${CLOUDFLARE_API_TOKEN:?CLOUDFLARE_API_TOKEN must be set}"
: "${WORKER_URL:?--worker-url required}"
: "${ACCOUNT_ID:?--account-id required}"
: "${SITEKEY:?--sitekey required}"
: "${EXPECTED_DOMAINS:?--expected-domains required}"

# Check 1: health endpoint
health=$(curl -sSf "${WORKER_URL}/health" 2>/dev/null || echo "")
if [ -z "$health" ] || ! echo "$health" | grep -q '"ok":true'; then
  echo "validate: health check failed; $WORKER_URL/health did not return {ok:true,version:...}" >&2
  echo "{\"status\":\"error\",\"check\":\"health\",\"detail\":\"worker /health did not respond ok:true\"}"
  exit 1
fi

# Check 2: dummy siteverify; should return success:false + error-codes array
dummy=$(curl -sS -X POST "${WORKER_URL}/" \
  -H "Content-Type: application/json" \
  -d '{"token":"XXXX.DUMMY.TOKEN.XXXX"}' 2>/dev/null || echo "")

success=$(echo "$dummy" | (jq -r '.success // "missing"' 2>/dev/null || echo "missing"))
errors=$(echo "$dummy" | (jq -r '.["error-codes"] | length // 0' 2>/dev/null || echo "0"))

if [ "$success" != "false" ] || [ "$errors" = "0" ]; then
  echo "validate: dummy siteverify check failed; expected success:false + error-codes; got: $dummy" >&2
  echo "{\"status\":\"error\",\"check\":\"dummy_siteverify\",\"detail\":\"unexpected response shape\"}"
  exit 1
fi

# Check 2b: confirm the Worker is the managed template (not a customer-written
# replacement) by looking for the _worker metadata field. If absent, the user
# deployed a custom Worker; surface it so the agent can alert them.
worker_meta=$(echo "$dummy" | (jq -r '._worker.worker_version // "missing"' 2>/dev/null || echo "missing"))
if [ "$worker_meta" = "missing" ]; then
  echo "validate: _worker metadata missing from response; this is not the managed Spin Worker template." >&2
  echo "{\"status\":\"error\",\"check\":\"worker_metadata\",\"detail\":\"_worker field missing; user may have deployed a custom Worker\"}"
  exit 1
fi

# Check 3: hostname / widget domains registered
widget=$(curl -sS \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$SITEKEY" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" 2>/dev/null)
registered=$(echo "$widget" | (jq -r '.result.domains[]' 2>/dev/null || python3 -c "import sys,json; [print(d) for d in json.load(sys.stdin)['result']['domains']]"))

missing=""
IFS=',' read -ra DOMS <<< "$EXPECTED_DOMAINS"
for d in "${DOMS[@]}"; do
  if ! echo "$registered" | grep -qFx "$d"; then
    missing="${missing}${d} "
  fi
done

if [ -n "$missing" ]; then
  echo "validate: hostname check failed; domains not on widget: $missing" >&2
  echo "{\"status\":\"error\",\"check\":\"hostname\",\"detail\":\"missing domains: ${missing% }\"}"
  exit 1
fi

echo '{"status":"ok"}'
```

### `/tmp/turnstile-spin-scripts/widget-create.sh`

```sh
#!/usr/bin/env bash
# Creates a Turnstile widget via the Cloudflare API.
#
# Reads:
#   $CLOUDFLARE_API_TOKEN (required)
#
# Args:
#   --account-id <id>        Cloudflare account ID
#   --name <name>            Widget name (e.g. "myproject (Spin)")
#   --domains <a,b,c>        Comma-separated domain list (include localhost,127.0.0.1)
#   --mode <managed|invisible|non-interactive>  Default: managed
#
# Outputs JSON to stdout. Exit 0 on success, 1 on failure. Diagnostics on stderr.
#   ok:    {"status":"ok","sitekey":"<key>","secret":"<secret>"}
#   error: {"status":"error","code":<code>,"message":"<msg>"}
#     code 10000 → token lacks Account.Turnstile:Edit

set -uo pipefail

MODE="managed"
while [[ $# -gt 0 ]]; do
  case $1 in
    --account-id) ACCOUNT_ID="$2"; shift 2 ;;
    --name)       NAME="$2"; shift 2 ;;
    --domains)    DOMAINS="$2"; shift 2 ;;
    --mode)       MODE="$2"; shift 2 ;;
    *) echo "widget-create: unknown arg $1" >&2; exit 2 ;;
  esac
done

: "${CLOUDFLARE_API_TOKEN:?CLOUDFLARE_API_TOKEN must be set}"
: "${ACCOUNT_ID:?--account-id required}"
: "${NAME:?--name required}"
: "${DOMAINS:?--domains required}"

domains_json=$(python3 -c "import sys; print(__import__('json').dumps(sys.argv[1].split(',')))" "$DOMAINS")

body=$(curl -sS -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$NAME\",\"domains\":$domains_json,\"mode\":\"$MODE\"}" 2>/dev/null)

success=$(echo "$body" | (jq -r '.success' 2>/dev/null || python3 -c "import sys,json; print(str(json.load(sys.stdin).get('success',False)).lower())"))

if [ "$success" = "true" ]; then
  sitekey=$(echo "$body" | (jq -r '.result.sitekey' 2>/dev/null || python3 -c "import sys,json; print(json.load(sys.stdin)['result']['sitekey'])"))
  secret=$(echo "$body" | (jq -r '.result.secret' 2>/dev/null || python3 -c "import sys,json; print(json.load(sys.stdin)['result']['secret'])"))
  echo "{\"status\":\"ok\",\"sitekey\":\"$sitekey\",\"secret\":\"$secret\"}"
  exit 0
fi

code=$(echo "$body" | (jq -r '.errors[0].code // 0' 2>/dev/null || echo "0"))
message=$(echo "$body" | (jq -r '.errors[0].message // "unknown"' 2>/dev/null || echo "unknown") | tr -d '"')
echo "widget-create: failed (code=$code): $message" >&2
echo "{\"status\":\"error\",\"code\":$code,\"message\":\"$message\"}"
exit 1
```

### `/tmp/turnstile-spin-scripts/worker-deploy.sh`

```sh
#!/usr/bin/env bash
# Deploys the managed siteverify Worker template to the user's account
# and sets TURNSTILE_SECRET_KEY as a Worker secret.
#
# Reads:
#   $CLOUDFLARE_API_TOKEN (required)
#   $WIDGET_SECRET        (required; secret captured from widget-create.sh)
#
# Args:
#   --name <worker-name>   Base name; appends a hash suffix if taken
#   --deploy-dir <path>    Where to extract the template. Default: /tmp/turnstile-siteverify-deploy
#
# Outputs JSON. Exit 0 on success, non-zero on failure.
#   ok:            {"status":"ok","worker_url":"<url>","worker_name":"<name>"}
#   conflict:      {"status":"error","reason":"name_conflict_after_retry"}
#   deploy_failed: {"status":"error","reason":"deploy_failed"}
#   set_secret:    {"status":"error","reason":"set_secret_failed","worker_name":"<name>"}
#   url_parse:     {"status":"error","reason":"url_parse_failed","worker_name":"<name>"}

set -uo pipefail

NAME="${WORKER_NAME:-turnstile-siteverify}"
DEPLOY_DIR="/tmp/turnstile-siteverify-deploy"
while [[ $# -gt 0 ]]; do
  case $1 in
    --name)       NAME="$2"; shift 2 ;;
    --deploy-dir) DEPLOY_DIR="$2"; shift 2 ;;
    *) echo "worker-deploy: unknown arg $1" >&2; exit 2 ;;
  esac
done

: "${CLOUDFLARE_API_TOKEN:?CLOUDFLARE_API_TOKEN must be set}"
: "${WIDGET_SECRET:?WIDGET_SECRET must be set}"

deploy_log=$(mktemp)

deploy() {
  local target_name="$1"
  rm -rf "$DEPLOY_DIR"
  npx --yes degit cloudflare/skills/skills/turnstile-spin/templates/worker "$DEPLOY_DIR" >/dev/null 2>&1
  # Capture both streams. Wrangler prints the success URL and version ID on
  # stdout; progress indicators on stderr. Capturing only stderr loses the URL.
  (cd "$DEPLOY_DIR" && npx wrangler deploy --name "$target_name") >"$deploy_log" 2>&1
}

if ! deploy "$NAME"; then
  if grep -q "script name already in use" "$deploy_log"; then
    NAME="${NAME}-$(openssl rand -hex 3 2>/dev/null || date +%s | tail -c 5)"
    echo "worker-deploy: name conflict; retrying as $NAME" >&2
    if ! deploy "$NAME"; then
      echo "worker-deploy: deploy failed even with new name" >&2
      cat "$deploy_log" >&2
      rm -f "$deploy_log"
      echo "{\"status\":\"error\",\"reason\":\"name_conflict_after_retry\"}"
      exit 1
    fi
  else
    cat "$deploy_log" >&2
    rm -f "$deploy_log"
    echo "{\"status\":\"error\",\"reason\":\"deploy_failed\"}"
    exit 1
  fi
fi

# Set the secret. Use `echo` (not `printf '%s'`); wrangler secret put expects
# newline-terminated stdin; printf without a trailing newline lands an empty
# secret in the runtime even though wrangler reports success.
secret_log=$(mktemp)
set_secret() {
  echo "$WIDGET_SECRET" | (cd "$DEPLOY_DIR" && npx wrangler secret put TURNSTILE_SECRET_KEY --name "$NAME") >"$secret_log" 2>&1
}

if ! set_secret; then
  echo "worker-deploy: failed to set TURNSTILE_SECRET_KEY on $NAME" >&2
  cat "$secret_log" >&2
  detail=$(tail -3 "$secret_log" | tr '\n' ' ' | sed 's/"/\\"/g' | head -c 200)
  rm -f "$deploy_log" "$secret_log"
  echo "{\"status\":\"error\",\"reason\":\"set_secret_failed\",\"worker_name\":\"$NAME\",\"detail\":\"$detail\"}"
  exit 1
fi
rm -f "$secret_log"
sleep 5

# Extract the deployed URL. Try workers.dev first, then any https URL in the
# log that is not the well-known cloudflare.com host (custom domain deploys
# and Workers for Platforms don't always land at a workers.dev hostname).
worker_url=$(grep -oE 'https://[a-zA-Z0-9._-]+\.workers\.dev' "$deploy_log" | head -1)
if [ -z "$worker_url" ]; then
  worker_url=$(grep -oE 'https://[a-zA-Z0-9.-]+(/[^[:space:]]*)?' "$deploy_log" \
    | grep -v -E 'cloudflare\.com|workers-sdk|github\.com' \
    | head -1)
fi
rm -f "$deploy_log"

if [ -z "$worker_url" ]; then
  echo "worker-deploy: deployed but could not parse Worker URL from wrangler output" >&2
  echo "worker-deploy: ask the user for the URL printed by wrangler deploy and pass it to validate.sh manually" >&2
  echo "{\"status\":\"error\",\"reason\":\"url_parse_failed\",\"worker_name\":\"$NAME\"}"
  exit 1
fi

echo "{\"status\":\"ok\",\"worker_url\":\"$worker_url\",\"worker_name\":\"$NAME\"}"
```
