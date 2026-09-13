"""Offline regression cases for the trusted snapshot program (no Cloudflare/AI).

Run: python3 -m unittest discover -s bin -p '*_test.py'
"""
import json
import subprocess
import tempfile
import unittest
from pathlib import Path

import snapshot


class SnapshotTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        root = Path(self.temp.name)
        self.remote = root / "source"
        self.remote.mkdir()
        self.git("init", "--initial-branch=production")
        self.git("config", "user.name", "Snapshot Test")
        self.git("config", "user.email", "snapshot@example.invalid")
        self.write("README.md", "Base\n")
        self.base = self.commit("base")
        snapshot.ROOT = root / "sandbox"
        snapshot.REPO = snapshot.ROOT / "repo.git"
        snapshot.REMOTE = str(self.remote)
        snapshot.ROOT.mkdir()

    def git(self, *args):
        return subprocess.run(["git", "-C", str(self.remote), *args], check=True,
                              stdout=subprocess.PIPE, stderr=subprocess.PIPE).stdout.decode().strip()

    def write(self, path, content):
        target = self.remote / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content)

    def commit(self, message):
        self.git("add", ".")
        self.git("commit", "-m", message)
        return self.git("rev-parse", "HEAD")

    def pages(self, head, previous=None):
        request = {"baseSha": self.base, "headSha": head, "previousHead": previous}
        db, key, state = snapshot.inventory(request)
        self.addCleanup(db.close)
        units = []
        for page in range(1000):
            result = snapshot.prepare(db, key, state, {**request, "start": page})
            self.assertLessEqual(len(result["units"]), 12)
            units.extend(result["units"])
            cached = json.loads(db.execute("SELECT data FROM responses WHERE id=?", (page,)).fetchone()[0])
            self.assertEqual(result, cached, "Lost responses must replay identical units")
            if result["done"]:
                return units, result["snapshot"]
        self.fail("Snapshot did not finish")

    def test_more_than_twenty_files(self):
        for index in range(135):
            self.write(f"src/file-{index}.ts", "export const answer = 42;\n")
        units, summary = self.pages(self.commit("many files"))
        self.assertEqual(summary["files"], 135)
        self.assertEqual(len({unit["filename"] for unit in units}), 135)
        self.assertEqual([unit["index"] for unit in units], list(range(135)))

    def test_large_single_line_has_no_silent_tail_loss(self):
        text = "x" * 200000 + "TAIL_SENTINEL\n"
        self.write("large.ts", text)
        units, _ = self.pages(self.commit("large line"))
        self.assertGreater(len(units), 10)
        self.assertTrue(all(len(unit["patch"]) <= snapshot.BUDGET for unit in units))
        self.assertIn("TAIL_SENTINEL", units[-1]["patch"])
        self.assertTrue(all(unit["headLines"] == [1] for unit in units))

    def test_large_unicode_lines_preserve_code_points(self):
        self.write("unicode.ts", "🙂" * 12000 + "TAIL\n")
        units, _ = self.pages(self.commit("unicode"))
        self.assertFalse(any("\ufffd" in unit["patch"] for unit in units))
        self.assertIn("TAIL", units[-1]["patch"])

    def test_incremental_review_excludes_unchanged_files(self):
        self.write("first.ts", "first\n")
        previous = self.commit("first")
        self.write("second.ts", "second\n")
        units, summary = self.pages(self.commit("second"), previous)
        self.assertEqual(summary["files"], 2)
        self.assertEqual(summary["changedFiles"], 1)
        self.assertEqual([unit["filename"] for unit in units], ["second.ts"])

    def test_unrelated_history_still_compares_previous_tree(self):
        self.write("first.ts", "same content\n")
        previous = self.commit("old history")
        self.git("checkout", "-b", "replacement", self.base)
        self.write("first.ts", "same content\n")
        self.write("second.ts", "new content\n")
        units, _ = self.pages(self.commit("replacement history"), previous)
        self.assertEqual([unit["filename"] for unit in units], ["second.ts"])

    def test_deletion_and_unusual_paths(self):
        path = "src/space and\ttab\nnewline.ts"
        self.write(path, "remove me\n")
        previous = self.commit("add")
        (self.remote / path).unlink()
        units, _ = self.pages(self.commit("delete"), previous)
        self.assertEqual(units[0]["filename"], path)
        self.assertEqual(units[0]["baseLines"], [1])
        self.assertEqual(units[0]["headLines"], [])

    def test_generated_and_binary_files_are_explicitly_counted(self):
        self.write("pnpm-lock.yaml", "generated\n")
        (self.remote / "image.png").write_bytes(b"\x00\x01")
        units, summary = self.pages(self.commit("excluded"))
        self.assertEqual(units, [])
        self.assertEqual(summary["excluded"], 2)

    def test_identical_heads_do_not_review_everything_again(self):
        self.write("first.ts", "first\n")
        previous = self.commit("first")
        units, summary = self.pages(previous, previous)
        self.assertEqual(units, [])
        self.assertEqual(summary["changedFiles"], 0)


if __name__ == "__main__":
    unittest.main()
