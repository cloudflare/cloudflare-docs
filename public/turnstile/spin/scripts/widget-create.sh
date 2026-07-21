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
