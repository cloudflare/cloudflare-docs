---
name: turnstile-spin
description: Set up Cloudflare Turnstile end-to-end in a project — scan the codebase, create the widget via the Cloudflare API, embed it on the right forms, wire canonical server-side siteverify in the customer's existing backend, validate, and persist the skill. Load this when a user asks to add Turnstile, set up CAPTCHA, protect a form from bots, or fix a Turnstile integration. Mirrors developers.cloudflare.com/turnstile/spin.
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

2. **CLI check.** Spin's helper scripts use `curl` against `api.cloudflare.com` and `npx wrangler whoami` for account enumeration. Widget creation in Step 8 prefers `wrangler turnstile widget create` when the subcommand is available (Wrangler 4.109+), falling back to the bundled curl script otherwise. No persistent CLI install is required.

3. **Auth + scope probe (FIRST irreversible action).** Run `scripts/auth-probe.sh`. Branch on `status`:
   - `ok`: continue to Step 4. The script already picked the account (single-account token, or one matching `$CLOUDFLARE_ACCOUNT_ID`).
   - `missing_token` or `missing_scope`: ask the user to create a token at https://dash.cloudflare.com/profile/api-tokens → Custom token → permission `Account.Turnstile:Edit` → include the target account in Account Resources. **Do NOT direct them to `wrangler login`** unless wrangler's OAuth scope includes `Account.Turnstile:Edit` (varies by wrangler version). Offer three ways to hand the token over, cleanest first:
     1. **Export + relaunch** (token never enters chat): `export CLOUDFLARE_API_TOKEN=<token>` then restart the agent from that terminal.
     2. **Save to file** (token in file with user-only perms, not in chat): `umask 077 && printf '%s' '<token>' > ~/.cf-turnstile-token`, then read with `TOKEN=$(cat ~/.cf-turnstile-token)`.
     3. **Paste in chat** (fastest, but token lands in conversation log; user should rotate it after if the log is ever shared).
     If the user picks option 3 (paste in chat), you can use the wait to run Steps 5, 6, 7 (Domain, Codebase scan, Insertion plan). Options 1 and 2 will restart your session, so do not pre-fetch state in those cases. When auth is established, re-run `auth-probe.sh`, then continue to Step 8.
   - `multiple_accounts`: the token covers more than one account and `$CLOUDFLARE_ACCOUNT_ID` is unset. Present the numbered `accounts` list. **[wait for user]** Then export `CLOUDFLARE_ACCOUNT_ID=<chosen>` and re-run `auth-probe.sh`.
   - `account_mismatch`: `$CLOUDFLARE_ACCOUNT_ID` is set but isn't one of the token's accounts. Show the `accounts` list and ask the user to either `unset CLOUDFLARE_ACCOUNT_ID` or set it to one of those IDs.

4. **Account selection.** If `auth-probe.sh` returned `ok` after a `multiple_accounts` round-trip, this is already done. Otherwise the script picked the single account silently and you continue to Step 5.

5. **Domain.** Always include `localhost` and `127.0.0.1`. For production, scan `package.json` `homepage`, `wrangler.toml`, `README.md`, `AGENTS.md`, git remote. Confirm: "I'll register for `localhost`, `127.0.0.1`, and `<domain>`. OK?" **[wait for user]** If no production domain is found, ask.

6. **Codebase scan.** Detect three things silently:
   - **Frontend framework** (Next.js, Astro, SvelteKit, Hugo, vanilla, etc.) → drives the widget embed snippet.
   - **Backend handler location** (Express route, Next.js API route, Rails controller, Workers fetch handler, Pages Function, etc.) → drives the siteverify snippet.
   - **Existing CAPTCHA** (reCAPTCHA / hCaptcha) → switches Step 7 to migration mode.

7. **Insertion plan.** Show the candidate list with `[recommended]` / `[skip by default]` markers; ask the user to confirm (numbers, "all", "recommended", or a list). **[wait for user]** If an existing CAPTCHA was detected, present a migration plan instead (see "Migrating from another CAPTCHA").

8. **Widget creation.** Prefer the wrangler CLI when its `turnstile widget` subcommand is available:

   ```sh
   npx wrangler turnstile widget create "<name>" \
     --domain <d1> --domain <d2> ... --mode managed --json
   ```

   Parse `sitekey` and `secret` from stdout JSON. If wrangler is missing, older than the turnstile subcommand (`unknown command`), or otherwise fails, fall back to `scripts/widget-create.sh --account-id <id> --name <name> --domains <list> --mode managed`, which uses `curl` against the Cloudflare API directly. Report the sitekey. Capture the secret into a shell variable `WIDGET_SECRET`; never write it to disk except into the user's own env / secret store in Step 9.

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

When the user has Cloudflare dashboard access, the in-dashboard **Fix with Spin** banner is a one-click recovery path: it shows a curated agent prompt for the existing widget. This skill's recovery flow below is the equivalent when the user is driving from their editor.

If the user tells you they already have a Turnstile widget set up and want to wire siteverify to it without rotating the sitekey (e.g. "I have a sitekey but siteverify never worked", "set up Spin against my existing widget `<sitekey>`"):

1. Skip Step 8 (widget creation). The sitekey already exists; get it from the user.
2. Fetch the widget metadata via `scripts/fetch-secret.sh --account-id <id> --sitekey <key>`. Branch on `status`:
   - `ok`: read `secret`, `clearance_level`, and `domains` from the response. Confirm `domains` includes the user's production hostname; if not, surface the gap before proceeding.
   - `missing_read_scope`: tell the user to add `Account.Turnstile:Read` to the token, or fall back to asking them to paste the secret. In the paste path, you do not have `clearance_level` or `domains`; ask the user to confirm both.
3. Check `clearance_level` from the response (or the user's answer):
   - `no_clearance`: standard wire-up (Step 9).
   - anything else: ask whether they want siteverify on top of pre-clearance, or exit per the scope boundary.
4. Continue from Step 9 (Wire the integration). Site key does not change. Dashboard's `Deployment` column flips from `Manual` to `Spin` on the first request carrying `data-action="turnstile-spin-v2"`.
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
| `npx wrangler whoami` fails                    | The auth probe needs wrangler to enumerate accounts. Install path: `npm install --save-dev wrangler` (Node project) or `npm install -g wrangler` (other). If install is blocked, fall back to `curl https://api.cloudflare.com/client/v4/accounts -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"` and pass the chosen ID via `$CLOUDFLARE_ACCOUNT_ID`. |
| Multiple Cloudflare accounts                   | `scripts/auth-probe.sh` returns all accounts; ask the user to choose, export `CLOUDFLARE_ACCOUNT_ID`                                                                                                                                  |
| Cloudflare Pages project                       | Wire siteverify inside a Pages Function (or the equivalent for your framework). The Pages Plugin at [developers.cloudflare.com/pages/functions/plugins/turnstile](https://developers.cloudflare.com/pages/functions/plugins/turnstile/) is a shortcut. |
| Cloudflare Workers backend                     | Use the canonical fetch idiom from Step 9 inside the Worker's request handler. `fetch` to `challenges.cloudflare.com` works the same way it does in Node.                                                                             |
| `EXPECTED_HOSTNAME` mismatch                   | Update widget domains via PUT, not PATCH (PATCH returns `10405 Method not allowed`): `curl -X PUT .../widgets/$SITEKEY -d '{"name":"...","mode":"managed","domains":[...]}'`                                                          |
| Token expired mid-flow                         | Stop, re-run `scripts/auth-probe.sh`, prompt for fresh credentials                                                                                                                                                                    |
| Validation returns `invalid-input-secret`      | The secret didn't reach the backend. Re-check `TURNSTILE_SECRET` in the customer's env / secret manager. If it's a Workers backend, run `wrangler secret list` to confirm the secret is bound to the right script.                    |
| Validation returns `invalid-input-response`    | Expected for a dummy probe token; that means the secret IS valid. validate.sh treats this as success.                                                                                                                                 |

## Telemetry marker

Every `cf-turnstile` div this skill writes must include `data-action="turnstile-spin-v2"`. Account-level aggregate telemetry, never per-user. Cloudflare uses it to measure activation. If the user removes the attribute, the integration still works; only the analytics segmentation is lost.

Older widgets stamped `turnstile-spin-v1` (from the V1 agent flow that deployed a managed Worker) still exist in production accounts; preserve that marker if you encounter it on an existing widget you are modifying. Do not retag.

## Do not

- Do not write the secret to disk (other than the user's own env store).
- Do not skip validation (Step 10).
- Do not propose features outside the wizard (custom Workers, custom domains, advanced WAF rules) unless asked.
- Do not call siteverify from the browser.
- Do not deploy any extra infrastructure on the user's behalf.
