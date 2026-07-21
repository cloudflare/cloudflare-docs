#!/usr/bin/env bash
# Retrieves the secret for an existing Turnstile widget via the Cloudflare API.
# Used by the recovery flow so the agent can wire canonical server-side
# siteverify against an existing widget without rotating the sitekey.
#
# Reads:
#   $CLOUDFLARE_API_TOKEN (required)
#
# Args:
#   --account-id <id>   Cloudflare account ID
#   --sitekey <key>     Widget sitekey to look up
#
# Requires: bash, curl, python3.
#
# Outputs JSON. Exit codes:
#   0  success
#   1  API failure or missing prerequisite
#   2  invalid usage (missing/unknown flag or value)
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

if ! command -v python3 >/dev/null 2>&1; then
  echo "fetch-secret: python3 is required but not found in PATH." >&2
  echo '{"status":"error","reason":"python3_not_available"}'
  exit 1
fi

need_arg() {
  if [ -z "${2-}" ] || [[ "$2" == --* ]]; then
    echo "fetch-secret: missing value for $1" >&2
    exit 2
  fi
}

ACCOUNT_ID=""
SITEKEY=""
while [[ $# -gt 0 ]]; do
  case $1 in
    --account-id) need_arg "$1" "${2-}"; ACCOUNT_ID="$2"; shift 2 ;;
    --sitekey)    need_arg "$1" "${2-}"; SITEKEY="$2"; shift 2 ;;
    *) echo "fetch-secret: unknown arg $1" >&2; exit 2 ;;
  esac
done

: "${CLOUDFLARE_API_TOKEN:?CLOUDFLARE_API_TOKEN must be set}"
[ -n "$ACCOUNT_ID" ] || { echo "fetch-secret: --account-id required" >&2; exit 2; }
[ -n "$SITEKEY" ]    || { echo "fetch-secret: --sitekey required"    >&2; exit 2; }

account_enc=$(python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1], safe=""))' "$ACCOUNT_ID")
sitekey_enc=$(python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1], safe=""))' "$SITEKEY")

tmp=$(mktemp "${TMPDIR:-/tmp}/fetch-secret.body.XXXXXX")
auth_headers=$(mktemp "${TMPDIR:-/tmp}/fetch-secret.hdr.XXXXXX")
chmod 600 "$auth_headers"
trap 'rm -f "$tmp" "$auth_headers"' EXIT

printf 'Authorization: Bearer %s\n' "$CLOUDFLARE_API_TOKEN" > "$auth_headers"

http_code=$(curl -sS -w "%{http_code}" -o "$tmp" \
  "https://api.cloudflare.com/client/v4/accounts/$account_enc/challenges/widgets/$sitekey_enc" \
  -H "@$auth_headers" || echo "000")

python3 -c '
import json, sys
http_code = sys.argv[1]
path = sys.argv[2]
try:
    with open(path) as f:
        raw = f.read()
    data = json.loads(raw) if raw else {}
except Exception as exc:
    print(f"fetch-secret: non-JSON response (HTTP {http_code}): {exc}", file=sys.stderr)
    print(json.dumps({"status":"error","reason":"non_json_response","http_code":http_code}))
    sys.exit(1)

if not isinstance(data, dict):
    print(f"fetch-secret: response was not a JSON object (HTTP {http_code}).", file=sys.stderr)
    print(json.dumps({"status":"error","reason":"non_object_response","http_code":http_code}))
    sys.exit(1)

errors = data.get("errors") or []
first = (errors[0] or {}) if errors else {}
if not isinstance(first, dict):
    first = {}
first_code = first.get("code", 0)

if http_code == "200" and data.get("success"):
    result = data.get("result") or {}
    if not isinstance(result, dict):
        result = {}
    secret = result.get("secret")
    clearance = result.get("clearance_level") or "no_clearance"
    domains = result.get("domains") or []
    if not isinstance(domains, list):
        domains = []
    if not secret:
        print("fetch-secret: widget lookup returned success but no secret.", file=sys.stderr)
        print(json.dumps({"status":"error","reason":"no_secret_in_response","http_code":http_code}))
        sys.exit(1)
    print(json.dumps({
        "status": "ok",
        "secret": secret,
        "clearance_level": clearance,
        "domains": domains,
    }))
    sys.exit(0)

if http_code == "403" and first_code == 10000:
    print("fetch-secret: token can edit Turnstile widgets but cannot read the secret for this sitekey.", file=sys.stderr)
    print("fetch-secret: add Account.Turnstile:Read to the token, or fall back to user paste.", file=sys.stderr)
    print(json.dumps({"status":"missing_read_scope","detail":"token lacks Account.Turnstile:Read"}))
    sys.exit(1)

msg = first.get("message", "widget lookup failed") or "widget lookup failed"
print(f"fetch-secret: widget lookup failed (HTTP {http_code}): {msg}", file=sys.stderr)
try:
    code_num = int(http_code)
except ValueError:
    code_num = 0
print(json.dumps({"status":"error","reason":"widget_not_found","http_code":code_num}))
sys.exit(1)
' "$http_code" "$tmp"
