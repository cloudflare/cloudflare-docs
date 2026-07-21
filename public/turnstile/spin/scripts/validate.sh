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

need_arg() {
  if [ -z "${2-}" ] || [[ "$2" == --* ]]; then
    echo "validate: missing value for $1" >&2
    exit 2
  fi
}

ACCOUNT_ID=""
SITEKEY=""
EXPECTED_DOMAINS=""
while [[ $# -gt 0 ]]; do
  case $1 in
    --account-id)       need_arg "$1" "${2-}"; ACCOUNT_ID="$2"; shift 2 ;;
    --sitekey)          need_arg "$1" "${2-}"; SITEKEY="$2"; shift 2 ;;
    --expected-domains) need_arg "$1" "${2-}"; EXPECTED_DOMAINS="$2"; shift 2 ;;
    *) echo "validate: unknown arg $1" >&2; exit 2 ;;
  esac
done

: "${TURNSTILE_SECRET:?TURNSTILE_SECRET must be set (the secret captured in Step 8)}"
[ -n "$SITEKEY" ] || { echo "validate: --sitekey required" >&2; exit 2; }

# Check 1: dummy-token siteverify against challenges.cloudflare.com.
# A valid secret + dummy token returns success:false with
# error-codes:["invalid-input-response"]. That confirms the secret is
# correctly bound to the widget; anything else is a real misconfiguration.
dummy=$(curl -sS -X POST "https://challenges.cloudflare.com/turnstile/v0/siteverify" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "secret=${TURNSTILE_SECRET}" \
  --data-urlencode "response=XXXX.DUMMY.TOKEN.XXXX" || echo "")

verdict=$(python3 -c '
import json, sys
raw = sys.stdin.read()
if not raw:
    print("error:dummy_siteverify:network_failure")
    sys.exit(0)
try:
    d = json.loads(raw)
except Exception:
    print(f"error:dummy_siteverify:non_json:{raw[:120]}")
    sys.exit(0)
success = d.get("success")
codes = d.get("error-codes") or []
if success is None:
    print(f"error:dummy_siteverify:missing_success:{raw[:120]}")
    sys.exit(0)
if success is True:
    print("error:dummy_siteverify:unexpected_true")
    sys.exit(0)
if "invalid-input-secret" in codes:
    print("error:dummy_siteverify:invalid-input-secret")
    sys.exit(0)
if "invalid-input-response" in codes:
    print("ok")
    sys.exit(0)
joined = ",".join(codes)
print(f"error:dummy_siteverify:unexpected_codes:{joined}")
' <<< "$dummy")

case "$verdict" in
  ok)
    ;;
  error:dummy_siteverify:invalid-input-secret)
    echo "validate: siteverify rejected the secret. TURNSTILE_SECRET does not match the widget's secret." >&2
    echo '{"status":"error","check":"dummy_siteverify","detail":"invalid-input-secret"}'
    exit 1
    ;;
  error:dummy_siteverify:*)
    detail=${verdict#error:dummy_siteverify:}
    echo "validate: siteverify returned unexpected result: $detail" >&2
    python3 -c 'import json, sys; print(json.dumps({"status":"error","check":"dummy_siteverify","detail":sys.argv[1]}))' "$detail"
    exit 1
    ;;
  *)
    echo "validate: unexpected verdict from siteverify parse: $verdict" >&2
    echo '{"status":"error","check":"dummy_siteverify","detail":"parse_failure"}'
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

account_enc=$(python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1], safe=""))' "$ACCOUNT_ID")
sitekey_enc=$(python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1], safe=""))' "$SITEKEY")

tmp=$(mktemp "${TMPDIR:-/tmp}/validate.XXXXXX")
trap 'rm -f "$tmp"' EXIT

http_code=$(curl -sS -w "%{http_code}" -o "$tmp" \
  "https://api.cloudflare.com/client/v4/accounts/$account_enc/challenges/widgets/$sitekey_enc" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" || echo "000")

python3 -c '
import json, sys
http_code = sys.argv[1]
path = sys.argv[2]
expected_csv = sys.argv[3]
expected = [d for d in expected_csv.split(",") if d]

try:
    with open(path) as f:
        raw = f.read()
    data = json.loads(raw) if raw else {}
except Exception as exc:
    print(f"validate: widget lookup returned non-JSON (HTTP {http_code}): {exc}", file=sys.stderr)
    print(json.dumps({"status":"error","check":"hostname","detail":f"non-JSON response (HTTP {http_code})"}))
    sys.exit(1)

if http_code != "200" or not data.get("success"):
    errors = data.get("errors") or []
    msg = errors[0].get("message", "unknown") if errors else "unknown"
    print(f"validate: widget lookup failed (HTTP {http_code}): {msg}", file=sys.stderr)
    print(json.dumps({"status":"error","check":"hostname","detail":f"HTTP {http_code}: {msg}"}))
    sys.exit(1)

registered = (data.get("result") or {}).get("domains") or []
missing = [d for d in expected if d not in registered]
if missing:
    missing_str = " ".join(missing)
    print(f"validate: hostname check failed; domains not on widget: {missing_str}", file=sys.stderr)
    print(json.dumps({"status":"error","check":"hostname","detail":f"missing domains: {missing_str}"}))
    sys.exit(1)

print(json.dumps({"status":"ok","hostname_check":"ran"}))
' "$http_code" "$tmp" "$EXPECTED_DOMAINS"
