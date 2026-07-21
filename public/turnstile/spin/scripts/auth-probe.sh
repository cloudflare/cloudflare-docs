#!/usr/bin/env bash
# Probes Cloudflare API auth state for the Turnstile Spin agent.
#
# Reads:
#   $CLOUDFLARE_API_TOKEN  (required)
#   $CLOUDFLARE_ACCOUNT_ID (optional; if set, must be one of the token's accounts)
#
# Requires: bash, curl, python3. Optional: wrangler (for account enumeration).
#
# Outputs JSON to stdout, always exits 0. The agent reads `status`:
#   "ok"                ; selected account passed the Turnstile Edit-scope probe
#   "missing_token"     ; no token set, python3 unavailable, or account enumeration failed
#   "missing_scope"     ; token lacks Account.Turnstile:Edit on the selected account
#   "multiple_accounts" ; token covers >1 accounts and $CLOUDFLARE_ACCOUNT_ID is unset
#   "account_mismatch"  ; $CLOUDFLARE_ACCOUNT_ID is set but is not in the token's accounts list
#
# Account enumeration prefers `wrangler whoami --json` when wrangler is on PATH;
# otherwise it falls back to $CLOUDFLARE_ACCOUNT_ID (the account must be supplied
# by the caller since we cannot list accounts via a scoped API token).
#
# Human-readable diagnostics go to stderr.

set -uo pipefail

emit() {
  echo "$1"
  exit 0
}

if ! command -v python3 >/dev/null 2>&1; then
  echo "auth-probe: python3 is required but not found in PATH." >&2
  emit '{"status":"missing_token","reason":"python3_not_available"}'
fi

token="${CLOUDFLARE_API_TOKEN:-}"
declared_account="${CLOUDFLARE_ACCOUNT_ID:-}"

if [ -z "$token" ]; then
  echo "auth-probe: \$CLOUDFLARE_API_TOKEN is not set." >&2
  emit '{"status":"missing_token","reason":"no_env_var"}'
fi

# Account enumeration. Try wrangler first (only if the binary is on PATH,
# so we don't hang npx trying to install it in non-interactive shells).
accounts_json=""
account_count=0

if command -v wrangler >/dev/null 2>&1; then
  whoami_json=$(wrangler whoami --json 2>/dev/null || true)
  if [ -n "$whoami_json" ] && [ "$(printf '%s' "$whoami_json" | head -c 1)" = "{" ]; then
    accounts_json=$(printf '%s' "$whoami_json" | python3 -c '
import json, sys
try:
    d = json.load(sys.stdin)
    print(json.dumps(d.get("accounts") or []))
except Exception:
    print("[]")
')
    account_count=$(printf '%s' "$accounts_json" | python3 -c '
import json, sys
try:
    print(len(json.load(sys.stdin)))
except Exception:
    print(0)
')
  fi
fi

if [ "$account_count" = "0" ] && [ -n "$declared_account" ]; then
  # No wrangler, but user gave us an account. Trust it and skip enumeration.
  accounts_json="[{\"id\":$(python3 -c 'import json, sys; print(json.dumps(sys.argv[1]))' "$declared_account")}]"
  account_count=1
fi

if [ "$account_count" = "0" ]; then
  echo "auth-probe: could not enumerate accounts. Install wrangler (\`npm i -g wrangler\`) or export \$CLOUDFLARE_ACCOUNT_ID." >&2
  emit '{"status":"missing_token","reason":"no_accounts"}'
fi

if [ -n "$declared_account" ]; then
  in_list=$(printf '%s' "$accounts_json" | python3 -c '
import json, sys
target = sys.argv[1]
try:
    accounts = json.load(sys.stdin)
except Exception:
    print("false"); sys.exit(0)
print("true" if any((a or {}).get("id") == target for a in accounts) else "false")
' "$declared_account")
  if [ "$in_list" != "true" ]; then
    echo "auth-probe: \$CLOUDFLARE_ACCOUNT_ID ($declared_account) is not one of the token's accounts." >&2
    emit "$(python3 -c '
import json, sys
declared, accounts_raw = sys.argv[1], sys.argv[2]
try:
    accounts = json.loads(accounts_raw)
except Exception:
    accounts = []
print(json.dumps({"status":"account_mismatch","declared":declared,"accounts":accounts}))
' "$declared_account" "$accounts_json")"
  fi
  account_id="$declared_account"
elif [ "$account_count" = "1" ]; then
  account_id=$(printf '%s' "$accounts_json" | python3 -c '
import json, sys
try:
    print(json.load(sys.stdin)[0]["id"])
except Exception:
    print("")
')
  if [ -z "$account_id" ]; then
    echo "auth-probe: accounts list had one entry but no id field." >&2
    emit '{"status":"missing_token","reason":"malformed_accounts"}'
  fi
else
  echo "auth-probe: token covers $account_count accounts; ask the user to pick one, then export \$CLOUDFLARE_ACCOUNT_ID and re-run." >&2
  emit "$(python3 -c '
import json, sys
try:
    accounts = json.loads(sys.argv[1])
except Exception:
    accounts = []
print(json.dumps({"status":"multiple_accounts","accounts":accounts}))
' "$accounts_json")"
fi

# Edit-scope probe. A GET /challenges/widgets would authorize a Read-only
# token; to verify Edit specifically, POST with an intentionally invalid
# payload and interpret the response:
#   401 or 403                                  → token lacks Edit
#   200 with success:false, errors[0].code=10000 → token lacks Edit
#   400/422 or 200 with validation error codes  → Edit scope OK
account_enc=$(python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1], safe=""))' "$account_id")

tmp=$(mktemp "${TMPDIR:-/tmp}/auth-probe.body.XXXXXX")
auth_headers=$(mktemp "${TMPDIR:-/tmp}/auth-probe.hdr.XXXXXX")
chmod 600 "$auth_headers"
trap 'rm -f "$tmp" "$auth_headers"' EXIT

printf 'Authorization: Bearer %s\n' "$token" > "$auth_headers"

edit_code=$(curl -sS -w "%{http_code}" -o "$tmp" -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$account_enc/challenges/widgets" \
  -H "@$auth_headers" \
  -H "Content-Type: application/json" \
  --data '{"name":"","domains":[]}' || echo "000")

verdict=$(python3 -c '
import json, sys
http_code = sys.argv[1]
path = sys.argv[2]
try:
    with open(path) as f:
        raw = f.read()
    data = json.loads(raw) if raw else {}
except Exception:
    print("unknown")
    sys.exit(0)
if not isinstance(data, dict):
    print("unknown")
    sys.exit(0)
errors = data.get("errors") or []
first = (errors[0] or {}) if errors else {}
if not isinstance(first, dict):
    first = {}
first_code = first.get("code", 0)
if http_code in ("401", "403"):
    print("missing_scope")
elif http_code == "200" and data.get("success") is False and first_code == 10000:
    print("missing_scope")
elif http_code in ("400", "422"):
    print("scope_ok")
elif http_code == "200":
    # Any 200 that got past auth means scope is fine (whether success or not).
    print("scope_ok")
else:
    print(f"unexpected_{http_code}")
' "$edit_code" "$tmp")

case "$verdict" in
  scope_ok)
    emit "$(python3 -c '
import json, sys
account_id, accounts_raw = sys.argv[1], sys.argv[2]
try:
    accounts = json.loads(accounts_raw)
except Exception:
    accounts = []
print(json.dumps({"status":"ok","account_id":account_id,"accounts":accounts}))
' "$account_id" "$accounts_json")"
    ;;
  missing_scope)
    echo "auth-probe: token cannot write /challenges/widgets on account $account_id (HTTP $edit_code). Missing Account.Turnstile:Edit." >&2
    emit "$(python3 -c '
import json, sys
account_id, http_code = sys.argv[1], sys.argv[2]
try:
    code_num = int(http_code)
except ValueError:
    code_num = 0
print(json.dumps({"status":"missing_scope","account_id":account_id,"http_code":code_num}))
' "$account_id" "$edit_code")"
    ;;
  *)
    echo "auth-probe: unexpected response probing Edit scope on account $account_id (HTTP $edit_code)." >&2
    emit "$(python3 -c '
import json, sys
account_id, http_code = sys.argv[1], sys.argv[2]
try:
    code_num = int(http_code)
except ValueError:
    code_num = 0
print(json.dumps({"status":"missing_scope","account_id":account_id,"http_code":code_num,"reason":"unexpected_response"}))
' "$account_id" "$edit_code")"
    ;;
esac
