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
# Requires: bash, python3, npx (for degit).
#
# Outputs JSON. Exit codes:
#   0  bundle written
#   1  fetch or write failure or missing prerequisite
#   2  invalid usage (missing/unknown flag or value)
#   ok:    {"status":"ok","path":"<path>","bundle_root":"<dir>","scripts":[<list>]}
#   fail:  {"status":"error","reason":"<reason>"}

set -uo pipefail

if ! command -v python3 >/dev/null 2>&1; then
  echo "persist-skill: python3 is required but not found in PATH." >&2
  echo '{"status":"error","reason":"python3_not_available"}'
  exit 1
fi

if ! command -v npx >/dev/null 2>&1; then
  echo "persist-skill: npx is required but not found in PATH (needed for degit)." >&2
  echo '{"status":"error","reason":"npx_not_available"}'
  exit 1
fi

need_arg() {
  if [ -z "${2-}" ] || [[ "$2" == --* ]]; then
    echo "persist-skill: missing value for $1" >&2
    exit 2
  fi
}

PATH_ARG=""
while [[ $# -gt 0 ]]; do
  case $1 in
    --path) need_arg "$1" "${2-}"; PATH_ARG="$2"; shift 2 ;;
    *) echo "persist-skill: unknown arg $1" >&2; exit 2 ;;
  esac
done

[ -n "$PATH_ARG" ] || { echo "persist-skill: --path required" >&2; exit 2; }

TARGET_DIR=$(dirname "$PATH_ARG")
mkdir -p "$TARGET_DIR"

# Install the canonical bundle from cloudflare/skills via degit. This writes
# SKILL.md, scripts/, references/, templates/, tests/ into $TARGET_DIR.
if ! npx --yes degit cloudflare/skills/skills/turnstile-spin "$TARGET_DIR" >/dev/null 2>&1; then
  echo "persist-skill: degit failed; cannot fetch cloudflare/skills/skills/turnstile-spin." >&2
  echo "persist-skill: ensure your network can reach github.com and try again, or install manually." >&2
  echo '{"status":"error","reason":"degit_failed"}'
  exit 1
fi

if [ ! -f "$TARGET_DIR/SKILL.md" ]; then
  echo "persist-skill: bundle extracted but SKILL.md is missing at $TARGET_DIR/SKILL.md." >&2
  echo '{"status":"error","reason":"skill_missing"}'
  exit 1
fi

# Make scripts executable so the agent can invoke them directly.
if [ -d "$TARGET_DIR/scripts" ]; then
  chmod +x "$TARGET_DIR/scripts"/*.sh 2>/dev/null || true
fi

echo "persist-skill: wrote bundle to $TARGET_DIR" >&2
python3 -c '
import json, os, sys
path_arg, bundle_root = sys.argv[1], sys.argv[2]
scripts_dir = os.path.join(bundle_root, "scripts")
try:
    scripts = sorted(f for f in os.listdir(scripts_dir))
except OSError:
    scripts = []
print(json.dumps({
    "status": "ok",
    "path": path_arg,
    "bundle_root": bundle_root,
    "scripts": scripts,
}))
' "$PATH_ARG" "$TARGET_DIR"
