"""Trusted, paged Git diff reader. Runs only inside the Cloudflare Sandbox.

No checkout, PR code execution, hooks, or credentials. Disk-backed cursors bound
memory and work per invocation; R2 receives every emitted review unit.
"""
import base64
import fcntl
import json
import re
import sqlite3
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path("/workspace/docs-review")
REPO = ROOT / "repo.git"
REMOTE = "https://github.com/cloudflare/cloudflare-docs.git"
BUDGET = 18000
IGNORE = re.compile(r"(^|/)(node_modules|dist|\.wrangler)/|^skills/|(^|/)(pnpm-lock\.yaml|package-lock\.json|yarn\.lock|bun\.lock)$|\.(lock|png|jpe?g|gif|svg|webp|ico|avif|woff2?|ttf|eot|mp4|webm|mov|pdf|zip|gz|tar|wasm|lockb)$", re.I)
STYLE = re.compile(r"^src/content/(docs|partials|changelog)/.+\.mdx$")


def git(*args, **kwargs):
    return subprocess.run(
        ["git", "--git-dir", str(REPO), "-c", "core.hooksPath=/dev/null", *args],
        check=True, stderr=subprocess.PIPE, timeout=240, **kwargs)


def output(*args):
    return git(*args, stdout=subprocess.PIPE).stdout


def nul_fields(path):
    with path.open("rb") as source:
        pending = b""
        while chunk := source.read(65536):
            pending += chunk
            fields = pending.split(b"\0")
            pending = fields.pop()
            yield from fields
        if pending:
            raise ValueError("Incomplete Git inventory")


def inventory(request):
    base, head = request["baseSha"], request["headSha"]
    previous = request.get("previousHead")
    if not all(re.fullmatch(r"[0-9a-f]{40}", sha) for sha in [base, head, *([previous] if previous else [])]):
        raise ValueError("Expected exact Git commit SHAs")
    key = f"{base}-{head}-{previous or 'full'}"
    db = sqlite3.connect(ROOT / f"{key}.sqlite")
    db.execute("CREATE TABLE IF NOT EXISTS state (id INTEGER PRIMARY KEY, data TEXT)")
    db.execute("CREATE TABLE IF NOT EXISTS files (id INTEGER PRIMARY KEY, path TEXT UNIQUE, status TEXT)")
    row = db.execute("SELECT data FROM state WHERE id=1").fetchone()
    if row:
        return db, key, json.loads(row[0])
    if not REPO.exists():
        subprocess.run(["git", "init", "--bare", str(REPO)], check=True, capture_output=True)
    output("config", "remote.origin.url", REMOTE)
    output("config", "remote.origin.promisor", "true")
    output("config", "remote.origin.partialclonefilter", "blob:none")
    output("fetch", "--no-tags", "--filter=blob:none", "origin", base, head)
    merge_base = output("merge-base", base, head).decode().strip()
    diff_base = merge_base
    if previous:
        try:
            output("fetch", "--no-tags", "--filter=blob:none", "origin", previous)
            # Git can diff unrelated trees too: a rebase must not cause a fresh
            # review of unchanged content. Missing old objects alone force full.
            diff_base = previous
        except subprocess.CalledProcessError:
            pass
    names = ROOT / f"{key}.names"
    with names.open("wb") as target:
        git("diff", "--name-status", "-z", "--no-renames", merge_base, head, stdout=target)
    files = sum(1 for _ in nul_fields(names)) // 2
    with names.open("wb") as target:
        git("diff", "--name-status", "-z", "--no-renames", diff_base, head, stdout=target)
    fields = iter(nul_fields(names))
    changed, excluded = 0, 0
    db.execute("DELETE FROM files")
    for status in fields:
        filename = next(fields).decode("utf-8", errors="strict")
        db.execute("INSERT INTO files VALUES (?, ?, ?)", (changed, filename, status.decode()))
        changed += 1
        excluded += int(bool(IGNORE.search(filename)))
    state = {"snapshot": {"files": files, "changedFiles": changed, "units": 0,
                          "excluded": excluded, "mergeBase": merge_base, "diffBase": diff_base,
                          "incrementalFallback": bool(previous and diff_base != previous)},
             "file": 0, "offset": 0, "old": 0, "new": 0, "hunk": False,
             "fragment": 0, "kind": "", "done": False}
    save(db, state)
    return db, key, state


def save(db, state):
    db.execute("INSERT OR REPLACE INTO state VALUES (1, ?)", (json.dumps(state),))
    db.commit()


def prepare(db, key, state, request):
    emitted = []
    deadline = time.monotonic() + 20
    snapshot = state["snapshot"]
    while state["file"] < snapshot["changedFiles"] and len(emitted) < 12 and time.monotonic() < deadline:
        filename, status = db.execute("SELECT path, status FROM files WHERE id=?", (state["file"],)).fetchone()
        if request.get("metadataOnly") or IGNORE.search(filename):
            state["file"] += 1
            continue
        patch_file = ROOT / f"{key}-{state['file']}.patch"
        if not patch_file.exists():
            staging = patch_file.with_suffix(".partial")
            with staging.open("wb") as target:
                git("diff", "--no-ext-diff", "--no-textconv", "--no-renames", "--unified=12",
                    snapshot["diffBase"], request["headSha"], "--", filename, stdout=target)
            staging.replace(patch_file)
        patch, head_lines, base_lines, size = [], [], [], 0
        eof = False
        with patch_file.open("rb") as source:
            source.seek(state["offset"])
            while size < BUDGET - 6500:
                # Bounded even for files consisting of one enormous line.
                raw = source.readline(6000)
                if not raw:
                    eof = True
                    break
                # Do not split a UTF-8 code point at the byte-budget boundary.
                if not raw.endswith(b"\n"):
                    for _ in range(3):
                        try:
                            raw.decode("utf-8")
                            break
                        except UnicodeDecodeError as error:
                            if error.reason != "unexpected end of data":
                                break
                            extra = source.read(1)
                            if not extra:
                                break
                            raw += extra
                state["offset"] = source.tell()
                line = raw.decode("utf-8", errors="replace")
                if state["fragment"] == 0:
                    match = re.match(r"@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@", line)
                    if match:
                        state["old"], state["new"] = map(int, match.groups())
                        state["hunk"] = True
                        continue
                    if not state["hunk"]:
                        if line.startswith("Binary files "):
                            snapshot["excluded"] += 1
                        continue
                    if line.startswith("\\"):
                        continue
                    state["kind"] = line[:1]
                    line = line[1:]
                kind = state["kind"]
                if kind not in ("+", "-", " "):
                    raise ValueError("Unexpected diff record")
                prefix = f"{kind} base:{state['old'] if kind != '+' else '-'} head:{state['new'] if kind != '-' else '-'} "
                fragment = prefix + (f"[byte offset {state['fragment']}] " if state["fragment"] else "") + line
                if not fragment.endswith("\n"):
                    fragment += "\n"
                patch.append(fragment)
                size += len(fragment)
                if kind == "+":
                    head_lines.append(state["new"])
                elif kind == "-":
                    base_lines.append(state["old"])
                if raw.endswith(b"\n"):
                    if kind != "+":
                        state["old"] += 1
                    if kind != "-":
                        state["new"] += 1
                    state["fragment"] = 0
                else:
                    state["fragment"] += len(raw)
            if head_lines or base_lines:
                emitted.append({"index": snapshot["units"], "filename": filename, "status": status,
                                "style": bool(STYLE.match(filename)), "patch": "".join(patch),
                                "headLines": sorted(set(head_lines)), "baseLines": sorted(set(base_lines))})
                snapshot["units"] += 1
        if eof:
            state.update(file=state["file"] + 1, offset=0, old=0, new=0, hunk=False, fragment=0, kind="")
    state["done"] = state["file"] >= snapshot["changedFiles"]
    # Cache each response BEFORE advancing the cursor. A lost RPC response must
    # replay the same units, not silently skip them.
    result = {"snapshot": snapshot, "units": emitted, "done": state["done"]}
    db.execute("CREATE TABLE IF NOT EXISTS responses (id INTEGER PRIMARY KEY, data TEXT)")
    db.execute("INSERT INTO responses VALUES (?, ?)", (request["start"], json.dumps(result)))
    save(db, state)
    return result


def main():
    request = json.loads(base64.b64decode(sys.argv[1]))
    ROOT.mkdir(parents=True, exist_ok=True)
    with (ROOT / "lock").open("w") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        db, key, state = inventory(request)
        action = request.get("action", "prepare")
        if action == "prepare":
            db.execute("CREATE TABLE IF NOT EXISTS responses (id INTEGER PRIMARY KEY, data TEXT)")
            cached = db.execute("SELECT data FROM responses WHERE id=?", (request["start"],)).fetchone()
            result = json.loads(cached[0]) if cached else prepare(db, key, state, request)
        elif action == "files":
            result = [{"filename": path, "status": {"A": "added", "D": "removed", "M": "modified", "T": "changed"}.get(status, status)}
                      for path, status in db.execute("SELECT path, status FROM files WHERE id>=? ORDER BY id LIMIT ?",
                                                     (int(request.get("start", 0)), min(100, int(request.get("limit", 100)))))]
        elif action == "changed":
            result = [path for path in request.get("paths", [])
                      if db.execute("SELECT 1 FROM files WHERE path=?", (path,)).fetchone()]
        else:
            raise ValueError("Unknown snapshot action")
        print(json.dumps(result, ensure_ascii=True))


if __name__ == "__main__":
    main()
