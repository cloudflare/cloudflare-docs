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

need_arg() {
  if [ -z "${2-}" ] || [[ "$2" == --* ]]; then
    echo "widget-create: missing value for $1" >&2
    exit 2
  fi
}

MODE="managed"
ACCOUNT_ID=""
NAME=""
DOMAINS=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --account-id) need_arg "$1" "${2-}"; ACCOUNT_ID="$2"; shift 2 ;;
    --name)       need_arg "$1" "${2-}"; NAME="$2"; shift 2 ;;
    --domains)    need_arg "$1" "${2-}"; DOMAINS="$2"; shift 2 ;;
    --mode)       need_arg "$1" "${2-}"; MODE="$2"; shift 2 ;;
    *) echo "widget-create: unknown arg $1" >&2; exit 2 ;;
  esac
done

: "${CLOUDFLARE_API_TOKEN:?CLOUDFLARE_API_TOKEN must be set}"
[ -n "$ACCOUNT_ID" ] || { echo "widget-create: --account-id required" >&2; exit 2; }
[ -n "$NAME" ]       || { echo "widget-create: --name required"       >&2; exit 2; }
[ -n "$DOMAINS" ]    || { echo "widget-create: --domains required"    >&2; exit 2; }

body_json=$(python3 -c '
import json, sys
name, domains_csv, mode = sys.argv[1], sys.argv[2], sys.argv[3]
print(json.dumps({
  "name": name,
  "domains": [d for d in domains_csv.split(",") if d],
  "mode": mode,
}))
' "$NAME" "$DOMAINS" "$MODE")

account_enc=$(python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1], safe=""))' "$ACCOUNT_ID")

tmp=$(mktemp "${TMPDIR:-/tmp}/widget-create.XXXXXX")
trap 'rm -f "$tmp"' EXIT

http_code=$(curl -sS -w "%{http_code}" -o "$tmp" -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$account_enc/challenges/widgets" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data "$body_json" || echo "000")

python3 -c '
import json, sys
http_code = sys.argv[1]
path = sys.argv[2]
try:
    with open(path) as f:
        raw = f.read()
    data = json.loads(raw) if raw else {}
except Exception as exc:
    print(f"widget-create: non-JSON response (HTTP {http_code}): {exc}", file=sys.stderr)
    print(json.dumps({"status": "error", "code": 0, "message": f"non-JSON response (HTTP {http_code})"}))
    sys.exit(1)

errors = data.get("errors") or []
first = errors[0] if errors else {}
code = first.get("code", 0)
message = first.get("message", "unknown")

if not data.get("success"):
    print(f"widget-create: failed (HTTP {http_code}, code={code}): {message}", file=sys.stderr)
    print(json.dumps({"status": "error", "code": code, "message": message}))
    sys.exit(1)

result = data.get("result") or {}
sitekey = result.get("sitekey")
secret = result.get("secret")
if not sitekey or not secret:
    print("widget-create: API returned success but no sitekey/secret in response.", file=sys.stderr)
    print(json.dumps({"status": "error", "code": 0, "message": "missing sitekey/secret in response"}))
    sys.exit(1)

print(json.dumps({"status": "ok", "sitekey": sitekey, "secret": secret}))
' "$http_code" "$tmp"
