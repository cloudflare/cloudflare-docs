---
name: turnstile-spin
description: Set up Cloudflare Turnstile end-to-end in a project: scan the codebase, create the widget via the Cloudflare API, embed it on the right forms, wire canonical server-side siteverify in the customer's existing backend, validate, and persist the skill. Load this when a user asks to add Turnstile, set up CAPTCHA, protect a form from bots, or fix a Turnstile integration. Mirrors developers.cloudflare.com/turnstile/spin.
references:
  - vanilla-html
  - nextjs-app
  - nextjs-pages
  - astro
  - sveltekit
  - hugo
---

# Turnstile Spin skill

Turns the prompt "set up Turnstile" into a working end-to-end integration: a widget, frontend snippets at every chosen insertion point, canonical server-side siteverify in the customer's existing backend, and a real validation pass before reporting success.

You are the agent. Run the wizard below by invoking the scripts under `scripts/` and branching on their JSON output. The scripts hold the deterministic logic (API calls, retry/error handling); your job is orchestration, codebase reading, confirmation, and the frontend + backend edits.

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

1. **Brief acknowledge.** One sentence: "I'll run Turnstile setup end to end. That's: check auth, scan the codebase, create the widget, embed it on the right forms, wire server-side siteverify, validate. Proceed?" **[wait for user]** Do NOT present a plan yet. Auth + scan come first.

2. **CLI check.** Spin's helper scripts use `curl` against `api.cloudflare.com` and `npx wrangler whoami` for account enumeration. No persistent CLI install is required.

3. **Auth + scope probe (FIRST irreversible action).** Run `scripts/auth-probe.sh`. Branch on `status`:
   - `ok`: continue to Step 4. The script already picked the account (single-account token, or one matching `$CLOUDFLARE_ACCOUNT_ID`).
   - `missing_token` or `missing_scope`: ask the user to create a token at https://dash.cloudflare.com/profile/api-tokens → Custom token → permission `Account.Turnstile:Edit` → include the target account in Account Resources. **Do NOT direct them to `wrangler login`** unless wrangler's OAuth scope includes `Account.Turnstile:Edit` (varies by wrangler version). Offer three ways to hand the token over, cleanest first:
     1. **Export + relaunch** (token never enters chat): `export CLOUDFLARE_API_TOKEN=<token>` then restart the agent from that terminal.
     2. **Save to file** (token in file with user-only perms, not in chat): `umask 077 && printf '%s' '<token>' > ~/.cf-turnstile-token`, then read with `TOKEN=$(cat ~/.cf-turnstile-token)`.
     3. **Paste in chat** (fastest, but token lands in conversation log; user should rotate it after if the log is ever shared).
   - `multiple_accounts`: the token covers more than one account and `$CLOUDFLARE_ACCOUNT_ID` is unset. Present the numbered `accounts` list. **[wait for user]** Then export `CLOUDFLARE_ACCOUNT_ID=<chosen>` and re-run `auth-probe.sh`.
   - `account_mismatch`: `$CLOUDFLARE_ACCOUNT_ID` is set but isn't one of the token's accounts. Show the `accounts` list and ask the user to either `unset CLOUDFLARE_ACCOUNT_ID` or set it to one of those IDs.

4. **Account selection.** If `auth-probe.sh` returned `ok` after a `multiple_accounts` round-trip, this is already done. Otherwise the script picked the single account silently and you continue to Step 5.

5. **Domain.** Always include `localhost` and `127.0.0.1`. For production, scan `package.json` `homepage`, `wrangler.toml`, `README.md`, `AGENTS.md`, git remote. Confirm: "I'll register for `localhost`, `127.0.0.1`, and `<domain>`. OK?" **[wait for user]** If no production domain is found, ask.

6. **Codebase scan.** Detect three things silently:
   - **Frontend framework** (Next.js, Astro, SvelteKit, Hugo, vanilla, etc.) → drives the widget embed snippet.
   - **Backend handler location** (Express route, Next.js API route, Rails controller, Workers fetch handler, Pages Function, etc.) → drives the siteverify snippet.
   - **Existing CAPTCHA** (reCAPTCHA / hCaptcha) → switches Step 7 to migration mode.

7. **Insertion plan.** Show the candidate list with `[recommended]` / `[skip by default]` markers; ask the user to confirm (numbers, "all", "recommended", or a list). **[wait for user]** If an existing CAPTCHA was detected, present a migration plan instead (see "Migrating from another CAPTCHA").

8. **Widget creation.** Run `scripts/widget-create.sh --account-id <id> --name <name> --domains <list> --mode managed`. Report the sitekey. Capture the secret into a shell variable `WIDGET_SECRET`; never write it to disk except into the user's own env / secret store in Step 9.

9. **Wire the integration.** State the contract: "I'll embed the widget on each chosen form and add a canonical siteverify call inside your existing submit handler, gated on `success === true`. The handler logic stays the same. The secret lives in your env as `TURNSTILE_SECRET`." Ask "yes" / "show". **[wait for user]** If "show", print unified diffs and ask again. Do NOT propose alternate behavior (mail delivery, custom backends).

   Canonical server-side siteverify (Node / fetch idiom; adapt to the detected backend):

   ```js
   const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
     method: 'POST',
     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
     body: new URLSearchParams({
       secret: process.env.TURNSTILE_SECRET,
       response: token,         // cf-turnstile-response from the request
       remoteip: clientIp,      // X-Forwarded-For / req.ip / etc.
     }),
   });
   const result = await r.json();
   if (!result.success) {
     return reject(403, 'forbidden');  // platform-appropriate equivalent
   }
   // existing handler logic runs here, unchanged
   ```

   Write the secret into the user's secret store (`.env` for Node/Rails/Python, `wrangler secret put TURNSTILE_SECRET` for Workers, the platform's secret manager for Vercel / Fly / Render / etc.). Never inline.

10. **Validation.** Run `scripts/validate.sh`. Report each check as it passes. If any fails, surface the error and stop. **[wait for user if anything fails]**

11. **Persist skill.** Ask: "Save the Spin skill to `.claude/skills/turnstile-spin/SKILL.md` so I can reuse it on follow-up tasks?" Default yes. **[wait for user]** Then run `scripts/persist-skill.sh --path <agent-specific-path>`.

12. **Final report.** Print the structured summary: what was created, what was validated, what to do next.

### Things you must NOT do

- Do not write the Turnstile secret to disk except as part of the user's own env / secret store.
- Do not skip validation.
- Do not overwrite files without showing a diff.
- Do not call siteverify from the browser. Always: browser → user's backend → siteverify.
- Do not deploy any extra infrastructure (Workers, proxies, sidecars). The customer's existing backend calls siteverify directly.
- Do not use `sudo` or install global packages without asking.

### Hard scope boundary: DO NOT ask the user about

Spin validates the Turnstile token via canonical siteverify before the user's existing form handler runs. Everything else is out of scope:

- **Email / SMS / notification delivery.** Leave the existing submit handler alone (just gate it on `success === true`). Don't propose Resend, Mailchannels, SMTP, mailto.
- **Adding a new backend.** If the form has no backend handler today (pure-static site, mailto-only contact form), say so and exit — Spin requires a server-side place to put siteverify.
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
   - `no_clearance`: standard wire-up (Step 9).
   - anything else: ask whether they want siteverify on top of pre-clearance, or exit per the scope boundary.
4. Continue from Step 9 (Wire the integration). Site key does not change. Once traffic starts flowing, requests carry `data-action="turnstile-spin-v2"` and the widget's stuck-widget banner clears automatically.
5. Never recreate the widget to get a fresh secret. That breaks the existing sitekey everywhere it's deployed.

### The frontend-edit contract

When wiring an existing form (Step 9), the contract is: **gate, don't replace.** The user's existing submit handler keeps doing what it did. Spin only adds a validation step before it.

Frontend (embeds the widget; submits to the user's existing endpoint):

```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

<form action="/signup" method="POST">
  <!-- existing inputs unchanged -->
  <div class="cf-turnstile" data-sitekey="<SITEKEY>" data-action="turnstile-spin-v2"></div>
  <button type="submit">Sign up</button>
</form>
```

Backend (inside the existing handler; reads the token from the request and gates):

```js
// In the existing POST /signup handler
const token = req.body['cf-turnstile-response'];
const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET,
    response: token,
    remoteip: req.ip,
  }),
});
const { success } = await r.json();
if (!success) return res.status(403).end();
// existing handler logic runs here, unchanged
```

If the existing handler was a stub, Spin leaves it a stub gated on success. The user can replace the stub later; that's not Spin's job.

## Migrating from another CAPTCHA

During the Step 6 codebase scan, also look for existing reCAPTCHA or hCaptcha. If found, switch Step 7 to a migration plan.

Detection signals:

- reCAPTCHA: `https://www.google.com/recaptcha/api.js`, `class="g-recaptcha"`, `data-sitekey="6L..."`, backend POST to `/recaptcha/api/siteverify`
- hCaptcha: `https://js.hcaptcha.com/1/api.js`, `class="h-captcha"`, backend POST to `https://hcaptcha.com/siteverify`

Substitution:

- Replace script tags with `https://challenges.cloudflare.com/turnstile/v0/api.js` (`async defer`).
- Replace `class="g-recaptcha"` / `class="h-captcha"` divs with `class="cf-turnstile"`, update `data-sitekey` to the new Turnstile sitekey, add `data-action="turnstile-spin-v2"`.
- Token field changes from `g-recaptcha-response` to `cf-turnstile-response`.
- Backend siteverify URL points at `https://challenges.cloudflare.com/turnstile/v0/siteverify`. Drop `RECAPTCHA_SECRET` / `HCAPTCHA_SECRET` env vars; add `TURNSTILE_SECRET`.

Edge cases to surface to the user:

- **reCAPTCHA v3 score thresholds.** Turnstile has no score. Tell the user explicitly that migrated code will reject on `success === false`.
- **reCAPTCHA Enterprise.** Don't auto-migrate. Point at [developers.cloudflare.com/turnstile/migration/recaptcha/](https://developers.cloudflare.com/turnstile/migration/recaptcha/).
- **Custom `action=` values.** Preserve any custom action the user passed to `grecaptcha.execute` as `data-action` on the widget. Use `turnstile-spin-v2` only when no custom action exists.

## Edge cases

| Situation                                      | Action                                                                                                                                                                                                                                |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npx wrangler whoami` fails                  | The auth probe needs wrangler to enumerate accounts. Install path: `npm install --save-dev wrangler` (Node project) or `npm install -g wrangler` (other). If install is blocked, fall back to `curl https://api.cloudflare.com/client/v4/accounts -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"` and pass the chosen ID via `$CLOUDFLARE_ACCOUNT_ID`. |
| Multiple Cloudflare accounts                   | `scripts/auth-probe.sh` returns all accounts; ask the user to choose, export `CLOUDFLARE_ACCOUNT_ID`                                                                                                                              |
| Cloudflare Pages project                       | Wire siteverify inside a Pages Function (or the equivalent for your framework). The Pages Plugin at [developers.cloudflare.com/pages/functions/plugins/turnstile](https://developers.cloudflare.com/pages/functions/plugins/turnstile/) is a shortcut. |
| Cloudflare Workers backend                     | Use the canonical fetch idiom from Step 9 inside the Worker's request handler. `fetch` to `challenges.cloudflare.com` works the same way it does in Node.                                                                         |
| `EXPECTED_HOSTNAME` mismatch                 | Update widget domains via PUT, not PATCH (PATCH returns `10405 Method not allowed`): `curl -X PUT .../widgets/$SITEKEY -d '{"name":"...","mode":"managed","domains":[...]}'`                                                       |
| Token expired mid-flow                         | Stop, re-run `scripts/auth-probe.sh`, prompt for fresh credentials                                                                                                                                                                  |
| Validation returns `invalid-input-secret`    | The secret didn't reach the backend. Re-check `TURNSTILE_SECRET` in the customer's env / secret manager. If it's a Workers backend, run `wrangler secret list` to confirm the secret is bound to the right script.                |
| Validation returns `invalid-input-response`  | Expected for a dummy probe token; that means the secret IS valid. validate.sh treats this as success.                                                                                                                                 |

## Telemetry marker

Every `cf-turnstile` div you write must include `data-action="turnstile-spin-v2"`. Account-level aggregate telemetry, never per-user. Cloudflare uses it to measure activation. If the user removes the attribute, the integration still works; only the analytics segmentation is lost.

## Do not

- Do not write the secret to disk (other than the user's own env store).
- Do not skip validation (Step 10).
- Do not propose features outside the wizard (custom Workers, custom domains, advanced WAF rules) unless asked.
- Do not call siteverify from the browser.
- Do not deploy any extra infrastructure on the user's behalf.

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
#   "ok"                ; selected account passed the Turnstile scope probe
#   "missing_token"     ; no token set, or wrangler whoami failed
#   "missing_scope"     ; token lacks Account.Turnstile:Edit on the selected account
#   "multiple_accounts" ; token covers >1 accounts and $CLOUDFLARE_ACCOUNT_ID is unset
#   "account_mismatch"  ; $CLOUDFLARE_ACCOUNT_ID is set but is not in the token's accounts list
#
# Human-readable diagnostics go to stderr.

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

accounts_json=$(echo "$whoami_json" | (jq -c '.accounts' 2>/dev/null || python3 -c "import sys,json; print(json.dumps(json.load(sys.stdin)['accounts']))"))
account_count=$(echo "$accounts_json" | (jq 'length' 2>/dev/null || python3 -c "import sys,json; print(len(json.load(sys.stdin)))"))

if [ -z "$account_count" ] || [ "$account_count" = "0" ] || [ "$account_count" = "null" ]; then
  echo "auth-probe: wrangler whoami succeeded but no accounts found on the token." >&2
  emit '{"status":"missing_token","reason":"no_accounts"}'
fi

if [ -n "$declared_account" ]; then
  in_list=$(echo "$accounts_json" | (jq --arg id "$declared_account" 'map(.id) | index($id) != null' 2>/dev/null || python3 -c "import sys,json; print('true' if any(a['id']==sys.argv[1] for a in json.load(sys.stdin)) else 'false')" "$declared_account"))
  if [ "$in_list" != "true" ]; then
    echo "auth-probe: \$CLOUDFLARE_ACCOUNT_ID ($declared_account) is not one of the token's accounts." >&2
    emit "{\\"status\\":\\"account_mismatch\\",\\"declared\\":\\"$declared_account\\",\\"accounts\\":$accounts_json}"
  fi
  account_id="$declared_account"
elif [ "$account_count" = "1" ]; then
  account_id=$(echo "$accounts_json" | (jq -r '.[0].id' 2>/dev/null || python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])"))
else
  echo "auth-probe: token covers $account_count accounts; ask the user to pick one, then export \$CLOUDFLARE_ACCOUNT_ID and re-run." >&2
  emit "{\\"status\\":\\"multiple_accounts\\",\\"accounts\\":$accounts_json}"
fi

# Probe Turnstile scope on the selected account.
tmp=$(mktemp)
http_code=$(curl -sS -w "%{http_code}" -o "$tmp" \\
  "https://api.cloudflare.com/client/v4/accounts/$account_id/challenges/widgets" \\
  -H "Authorization: Bearer $token" 2>/dev/null || echo "000")
body=$(cat "$tmp"); rm -f "$tmp"
success=$(echo "$body" | (jq -r '.success' 2>/dev/null || echo "false"))

if [ "$success" != "true" ]; then
  echo "auth-probe: token cannot read /challenges/widgets on account $account_id (HTTP $http_code). Missing Account.Turnstile:Edit." >&2
  emit "{\\"status\\":\\"missing_scope\\",\\"account_id\\":\\"$account_id\\",\\"http_code\\":$http_code}"
fi

emit "{\\"status\\":\\"ok\\",\\"account_id\\":\\"$account_id\\",\\"accounts\\":$accounts_json}"
```

### `/tmp/turnstile-spin-scripts/fetch-secret.sh`

```sh
#!/usr/bin/env bash
# Retrieves the secret for an existing Turnstile widget via the Cloudflare API.
# Used by the recovery flow when the agent is wiring siteverify against a
# pre-existing widget the user already has.
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
http_code=$(curl -sS -w "%{http_code}" -o "$tmp" \\
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$SITEKEY" \\
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" 2>/dev/null || echo "000")
body=$(cat "$tmp"); rm -f "$tmp"

if [ "$http_code" = "200" ]; then
  secret=$(echo "$body" | (jq -r '.result.secret' 2>/dev/null || python3 -c "import sys,json; print(json.load(sys.stdin)['result']['secret'])"))
  clearance=$(echo "$body" | (jq -r '.result.clearance_level // "no_clearance"' 2>/dev/null || python3 -c "import sys,json; print(json.load(sys.stdin)['result'].get('clearance_level','no_clearance'))"))
  domains=$(echo "$body" | (jq -c '.result.domains // []' 2>/dev/null || python3 -c "import sys,json; print(json.dumps(json.load(sys.stdin)['result'].get('domains',[])))"))
  if [ -n "$secret" ] && [ "$secret" != "null" ]; then
    echo "{\\"status\\":\\"ok\\",\\"secret\\":\\"$secret\\",\\"clearance_level\\":\\"$clearance\\",\\"domains\\":$domains}"
    exit 0
  fi
fi

if [ "$http_code" = "403" ]; then
  code=$(echo "$body" | (jq -r '.errors[0].code // 0' 2>/dev/null || echo "0"))
  if [ "$code" = "10000" ]; then
    echo "fetch-secret: token can edit Turnstile widgets but cannot read this one's secret." >&2
    echo "fetch-secret: add Account.Turnstile:Read to the token, or fall back to user paste." >&2
    echo "{\\"status\\":\\"missing_read_scope\\",\\"detail\\":\\"token lacks Account.Turnstile:Read\\"}"
    exit 1
  fi
fi

echo "fetch-secret: widget lookup failed (HTTP $http_code)." >&2
echo "{\\"status\\":\\"error\\",\\"reason\\":\\"widget_not_found\\",\\"http_code\\":$http_code}"
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
#
# Outputs JSON. Exit 0 if the bundle was written, 1 on failure.

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

if ! npx --yes degit cloudflare/skills/skills/turnstile-spin "$TARGET_DIR" >/dev/null 2>&1; then
  echo "persist-skill: degit failed; cannot fetch cloudflare/skills/skills/turnstile-spin." >&2
  echo "{\\"status\\":\\"error\\",\\"reason\\":\\"degit_failed\\"}"
  exit 1
fi

if [ ! -f "$TARGET_DIR/SKILL.md" ]; then
  echo "persist-skill: bundle extracted but SKILL.md is missing at $TARGET_DIR/SKILL.md." >&2
  echo "{\\"status\\":\\"error\\",\\"reason\\":\\"skill_missing\\"}"
  exit 1
fi

if [ -d "$TARGET_DIR/scripts" ]; then
  chmod +x "$TARGET_DIR/scripts"/*.sh 2>/dev/null || true
fi

scripts_list=$(ls "$TARGET_DIR/scripts" 2>/dev/null | sed 's/.*/"&"/' | paste -sd, -)
echo "persist-skill: wrote bundle to $TARGET_DIR" >&2
echo "{\\"status\\":\\"ok\\",\\"path\\":\\"$PATH_ARG\\",\\"bundle_root\\":\\"$TARGET_DIR\\",\\"scripts\\":[$scripts_list]}"
exit 0
```

### `/tmp/turnstile-spin-scripts/validate.sh`

```sh
#!/usr/bin/env bash
# Validates a Turnstile siteverify integration end-to-end.
#
# Reads:
#   $TURNSTILE_SECRET      (required for the dummy-token check)
#   $CLOUDFLARE_API_TOKEN  (optional — when set, also runs the widget-domains
#                           sanity check; when unset, that check is skipped
#                           so the post-dashboard flow can validate without
#                           a manually-created token)
#
# Args:
#   --account-id <id>             Cloudflare account ID (only used when CLOUDFLARE_API_TOKEN is set)
#   --sitekey <key>               Widget sitekey
#   --expected-domains <a,b,c>    Comma-separated domains that must appear in the widget's domains array
#
# Outputs JSON. Exit 0 if all checks pass, 1 otherwise.
#   ok:    {"status":"ok","hostname_check":"ran"|"skipped"}
#   fail:  {"status":"error","check":"dummy_siteverify|hostname","detail":"<msg>"}

set -uo pipefail

ACCOUNT_ID=""
SITEKEY=""
EXPECTED_DOMAINS=""
while [[ $# -gt 0 ]]; do
  case $1 in
    --account-id)       ACCOUNT_ID="$2"; shift 2 ;;
    --sitekey)          SITEKEY="$2"; shift 2 ;;
    --expected-domains) EXPECTED_DOMAINS="$2"; shift 2 ;;
    *) echo "validate: unknown arg $1" >&2; exit 2 ;;
  esac
done

: "${TURNSTILE_SECRET:?TURNSTILE_SECRET must be set (the secret captured in Step 8)}"
: "${SITEKEY:?--sitekey required}"

# Check 1: dummy-token siteverify against challenges.cloudflare.com.
# A valid secret + dummy token returns success:false with
# error-codes:["invalid-input-response"]. That confirms the secret is
# correctly bound to the widget; anything else is a real misconfiguration.
dummy=$(curl -sS -X POST "https://challenges.cloudflare.com/turnstile/v0/siteverify" \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  --data-urlencode "secret=${TURNSTILE_SECRET}" \\
  --data-urlencode "response=XXXX.DUMMY.TOKEN.XXXX" 2>/dev/null || echo "")

success=$(echo "$dummy" | (jq -r '.success // "missing"' 2>/dev/null || echo "missing"))
codes=$(echo "$dummy" | (jq -r '.["error-codes"] // [] | join(",")' 2>/dev/null || echo ""))

if [ "$success" != "false" ]; then
  echo "validate: siteverify returned unexpected shape for a dummy token: $dummy" >&2
  echo "{\\"status\\":\\"error\\",\\"check\\":\\"dummy_siteverify\\",\\"detail\\":\\"expected success:false on a dummy token\\"}"
  exit 1
fi

case ",$codes," in
  *,invalid-input-secret,*)
    echo "validate: siteverify rejected the secret. TURNSTILE_SECRET does not match the widget's secret." >&2
    echo "{\\"status\\":\\"error\\",\\"check\\":\\"dummy_siteverify\\",\\"detail\\":\\"invalid-input-secret\\"}"
    exit 1
    ;;
  *,invalid-input-response,*)
    : # Expected. Continue.
    ;;
  *)
    echo "validate: unexpected error codes from siteverify: $codes" >&2
    echo "{\\"status\\":\\"error\\",\\"check\\":\\"dummy_siteverify\\",\\"detail\\":\\"unexpected codes: $codes\\"}"
    exit 1
    ;;
esac

# Check 2: hostname / widget domains registered. Optional — requires a
# Cloudflare API token. When the token isn't available (e.g. post-dashboard
# success-card flow), skip this check and report `hostname_check: skipped`.
if [ -z "${CLOUDFLARE_API_TOKEN:-}" ] || [ -z "$ACCOUNT_ID" ] || [ -z "$EXPECTED_DOMAINS" ]; then
  echo "validate: skipping hostname check (CLOUDFLARE_API_TOKEN, --account-id, or --expected-domains not provided)" >&2
  echo '{"status":"ok","hostname_check":"skipped"}'
  exit 0
fi

widget=$(curl -sS \\
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$SITEKEY" \\
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
  echo "{\\"status\\":\\"error\\",\\"check\\":\\"hostname\\",\\"detail\\":\\"missing domains: ${missing% }\\"}"
  exit 1
fi

echo '{"status":"ok","hostname_check":"ran"}'
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

body=$(curl -sS -X POST \\
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets" \\
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d "{\\"name\\":\\"$NAME\\",\\"domains\\":$domains_json,\\"mode\\":\\"$MODE\\"}" 2>/dev/null)

success=$(echo "$body" | (jq -r '.success' 2>/dev/null || python3 -c "import sys,json; print(str(json.load(sys.stdin).get('success',False)).lower())"))

if [ "$success" = "true" ]; then
  sitekey=$(echo "$body" | (jq -r '.result.sitekey' 2>/dev/null || python3 -c "import sys,json; print(json.load(sys.stdin)['result']['sitekey'])"))
  secret=$(echo "$body" | (jq -r '.result.secret' 2>/dev/null || python3 -c "import sys,json; print(json.load(sys.stdin)['result']['secret'])"))
  echo "{\\"status\\":\\"ok\\",\\"sitekey\\":\\"$sitekey\\",\\"secret\\":\\"$secret\\"}"
  exit 0
fi

code=$(echo "$body" | (jq -r '.errors[0].code // 0' 2>/dev/null || echo "0"))
message=$(echo "$body" | (jq -r '.errors[0].message // "unknown"' 2>/dev/null || echo "unknown") | tr -d '"')
echo "widget-create: failed (code=$code): $message" >&2
echo "{\\"status\\":\\"error\\",\\"code\\":$code,\\"message\\":\\"$message\\"}"
exit 1
```
