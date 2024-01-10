import * as fs from "fs/promises";
import { join, resolve } from "path";
import matter from "gray-matter";

const ROOT = resolve("./content");

const isMD = /\.md$/;

let errors = 0;

async function walk(dir: string): Promise<void> {
  let files = await fs.readdir(dir);

  await Promise.all(
    files.map((fname) => {
      let absolute = join(dir, fname);

      if (
        fname === "node_modules" ||
        fname === "public" ||
        fname.includes("_partials")
      )
        return;

      if (isMD.test(fname)) return markdown(absolute);

      return fs.stat(absolute).then((stats) => {
        if (stats.isDirectory()) return walk(absolute);
      });
    })
  );
}

const rules = {
  pcx_content_type(frontmatter: Record<string, unknown>) {
    return [
      "changelog",
      "concept",
      "configuration",
      "faq",
      "get-started",
      "glossary",
      "how-to",
      "integration-guide",
      "learning-path",
      "learning-unit",
      "migration",
      "navigation",
      "overview",
      "reference",
      "reference-architecture",
      "troubleshooting",
      "tutorial",
    ].includes(frontmatter.pcx_content_type as string);
  },
};
async function markdown(file: string): Promise<void> {
  const frontmatter = matter(await fs.readFile(file, "utf8"));

  const failingLintRules = Object.entries(rules).filter(
    ([name, rule]) => !rule(frontmatter.data)
  );

  if (failingLintRules.length) {
    errors += 1;
    console.log(`FAIL: ${file} (${failingLintRules.map((r) => r[0])})`);
  }
}

await walk(ROOT);

if (errors) {
  console.error(`\nFinished with ${errors} error(s)\n`);
  process.exitCode = 1;
}
