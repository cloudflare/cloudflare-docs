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
