/**
 * 1. Crawl the `/public` directory (HTML files) and assert:
 * - all anchor tags (<a>) do not point to broken links
 * - all images (<img>) do not have broken sources
 * NOTE: Requires `npm run build` first!
 * 2. Crawl the `assets/json` directory (JSON files) and assert:
 * - all `url_path` values do not point to broken links
 * - all anchor tags (<a>) do not point to broken links
 */
import * as http from "http";
import * as https from "https";
import { existsSync } from "fs";
import * as fs from "fs/promises";
import { join, resolve, extname } from "path";
import { parse } from "node-html-parser";

let WARNS = 0;
let ERRORS = 0;
let JSON_WARNS = 0;
let JSON_ERRORS = 0;
let REDIRECT_ERRORS: string[] = [];

const ROOT = resolve(".");
const PUBDIR = join(ROOT, "public");
const LEARNING_PATH_DIR = join(ROOT, "data/learning-paths");
const REDIRECT_FILE = join(ROOT, "content/_redirects");
const VERBOSE = process.argv.includes("--verbose");
const EXTERNALS = process.argv.includes("--externals");
const DEV_DOCS_HOSTNAME = "developers.cloudflare.com";

async function walk(dir: string) {
  let files = await fs.readdir(dir);
  await Promise.all(
    files.map(async (name) => {
      let abs = join(dir, name);
      let supportOtherLangsPath = "/support/other-languages";
      if (process.platform === "win32") {
        supportOtherLangsPath = supportOtherLangsPath.replaceAll("/", "\\");
      }
      if (!abs.includes(supportOtherLangsPath)) {
        if (name.endsWith(".html")) return task(abs);
        let stats = await fs.stat(abs);
        if (stats.isDirectory()) return walk(abs);
      }
    })
  );
}

async function walkJsonFiles(dir: string) {
  let files = await fs.readdir(dir);
  await Promise.all(
    files.map(async (name) => {
      let abs = join(dir, name);
      if (name.endsWith(".json")) return testJSON(abs);
    })
  );
}

let CACHE = new Map<string, boolean>();

function HEAD(url: string): Promise<boolean> {
  let value = CACHE.has(url);
  if (value != null) return Promise.resolve(value);

  let options: https.RequestOptions = {
    method: "HEAD",
    headers: {
      "user-agent": "dev-docs",
    },
  };

  if (url.startsWith("http://")) {
    options.agent = http.globalAgent;
  }

  let req = https.request(url, options);

  return new Promise((r) => {
    req.on("error", (err) => {
      console.log(url, err);
      CACHE.set(url, false);
      return r(false);
    });

    req.on("response", (res) => {
      let bool = res.statusCode > 199 && res.statusCode < 400;
      console.log({ url, bool });
      CACHE.set(url, bool);
      return r(bool);
    });

    req.end();
  });
}

interface Message {
  type: "error" | "warn";
  html?: string;
  value?: string;
  text?: string;
}

async function testJSON(file: string) {
  if (process.platform === "win32") {
    // Local imports must have a `file://` scheme on Windows
    file = `file://${file}`;
  }

  const { default: info } = await import(file, {
    assert: {
      type: "json",
    },
  });

  const jsonString = JSON.stringify(info);
  const urlPathRegex = new RegExp('"url_path":"(.*?)"', "g");
  const hrefRegex = new RegExp("<a href='(.*?)'>", "g");
  const unanchoredRegex = new RegExp("([^#]*)");

  let urlPathMatches = [...jsonString.matchAll(urlPathRegex)];
  let pathUrls = urlPathMatches.map((match) => match[1]);

  let hrefMatches = [...jsonString.matchAll(hrefRegex)];
  let hrefUrls = hrefMatches.map((match) => match[1]);

  let combinedUrls = pathUrls.concat(hrefUrls);

  let messages: Message[] = [];
  combinedUrls.map(async (item) => {
    let exists = false;

    if (item.includes(DEV_DOCS_HOSTNAME)) {
      messages.push({
        type: "warn",
        text: `rewrite in "/absolute/" format: "${item}"`,
      });
    } else if (item.startsWith("/")) {
      let unanchoredItem = item.match(unanchoredRegex);
      let local = join(PUBDIR, unanchoredItem[1]);
      // is this HTML page? eg; "/foo/"
      if (extname(local).length === 0) {
        // TODO? log warning about no trailing slash
        if (!local.endsWith("/")) local += "/";
        local += "index.html";
      }
      exists = existsSync(local);

      if (!exists) {
        messages.push({
          type: "error",
          value: item,
        });
      }
    }
  });
  if (messages.length > 0) {
    let output = file.substring(
      file.indexOf(LEARNING_PATH_DIR) + LEARNING_PATH_DIR.length
    );

    messages.forEach((msg) => {
      if (msg.type === "error") {
        output += "\n  ✘";
        JSON_ERRORS++;
      } else {
        output += "\n  ⚠";
        JSON_WARNS++;
      }
      output += "  " + (msg.text || msg.value);
      if (VERBOSE) output += "\n    ";
    });

    console.log(output + "\n");
  }
}

async function testREDIRECTS(file: string) {
  const textPlaceholder = await fs.readFile(file, "utf-8");
  const destinationURLRegex = new RegExp(/\/.*\/*? (\/.*\/)/);

  for (const line of textPlaceholder.split(/[\r\n]+/)) {
    let exists = false;
    if (!line.startsWith("#")) {
      const result = line.match(destinationURLRegex);
      if (result !== null) {
        const match = result[1];
        if (match.startsWith('/api/')) {
          return;
        } else {
          let local = join(PUBDIR, match);
          exists = existsSync(local);

          if (!exists) {
            REDIRECT_ERRORS.push(`\n  ✘ ${result[0]}`);
          }
        }
      }
    }
  }
}

async function task(file: string) {
  let html = await fs.readFile(file, "utf8");

  let document = parse(html, {
    comment: false,
    blockTextElements: {
      script: false,
      noscript: false,
      style: false,
      pre: false,
    },
  });

  let placeholder = "http://foo.io";
  // build this file's URL; without "index.html" at end
  let self = file
    .substring(PUBDIR.length, file.length - 10)
    .replace(/\\+/g, "/");
  let url = new URL(self, placeholder);

  let messages: Message[] = [];
  let items = document.querySelectorAll("a[href],img[src]");

  await Promise.all(
    items.map(async (item) => {
      let content = item.outerHTML;
      let target = item.getAttribute("src") || item.getAttribute("href");

      if (!target && item.rawTagName === "a") {
        // parsing error; this is actually `<a ... href=/>
        if (/logo-link/.test(item.classNames)) return;
        return messages.push({
          type: "warn",
          html: content,
          text: `Missing "href" value`,
        });
      }

      if (target && target.includes("/support/other-languages")) {
        return;
      } else if (target && (target.startsWith("/api/") || target === "/api")) {
        return;
      }

      let exists: boolean;
      let external = false;
      let resolved = new URL(target, url);

      if (!/https?/.test(resolved.protocol)) return;

      if ((external = resolved.origin !== placeholder)) {
        // only fetch external URLs with `--externals` flag
        exists = EXTERNALS ? await HEAD(target) : true;
      }

      if (!external) {
        let local = join(PUBDIR, resolved.pathname);

        // is this HTML page? eg; "/foo/"
        if (extname(local).length === 0) {
          // TODO? log warning about no trailing slash
          if (!local.endsWith("/")) local += "/";
          local += "index.html";
        }

        exists = existsSync(local);
      }

      if (!exists) {
        messages.push({
          type: "error",
          html: content,
          value: target,
        });
      }
    })
  );

  if (messages.length > 0) {
    let output = file.substring(PUBDIR.length);

    messages.forEach((msg) => {
      if (msg.type === "error") {
        output += "\n  ✘";
        ERRORS++;
      } else {
        output += "\n  ⚠";
        WARNS++;
      }
      output += "  " + (msg.text || msg.value);
      if (VERBOSE) output += "\n    " + msg.html;
    });

    console.log(output + "\n");
  }
}

try {
  await walk(PUBDIR);

  if (!ERRORS && !WARNS) {
    console.log("\n~> Regular files DONE~!\n\n");
  } else {
    let msg = "\n~> Regular files DONE with:";
    if (ERRORS > 0) {
      process.exitCode = 1;
      msg += "\n    - " + ERRORS.toLocaleString() + " error(s)";
    }
    if (WARNS > 0) {
      msg += "\n    - " + WARNS.toLocaleString() + " warning(s)";
    }
    console.log(msg + "\n\n");
  }
} catch (err) {
  console.error(err.stack || err);
  process.exit(1);
}

try {
  await walkJsonFiles(LEARNING_PATH_DIR);
  if (!JSON_ERRORS && !JSON_WARNS) {
    console.log("\n~> /data/learning-paths/ files DONE~!\n\n");
  } else {
    let msg = "\n~> /data/learning-paths/ files DONE with:";
    if (JSON_ERRORS > 0) {
      process.exitCode = 1;
      msg += "\n    - " + JSON_ERRORS.toLocaleString() + " error(s)";
    }
    if (JSON_WARNS > 0) {
      msg += "\n    - " + JSON_WARNS.toLocaleString() + " warning(s)";
    }
    console.log(msg + "\n\n");
  }
} catch (err) {
  console.error(err.stack || err);
  process.exit(1);
}

try {
  await testREDIRECTS(REDIRECT_FILE);
  if (REDIRECT_ERRORS.length == 0) {
    console.log("\n~> /content/_redirects file DONE~!\n\n");
  } else {
    let msg = "\n~> /content/_redirects file DONE with:";
    process.exitCode = 1;
    msg +=
      "\n    - " +
      REDIRECT_ERRORS.length.toLocaleString() +
      " error(s)" +
      " (due to bad destination URLs)" +
      "\n\n";
    for (let i = 0; i < REDIRECT_ERRORS.length; i++) {
      msg += REDIRECT_ERRORS[i];
    }
    console.log(msg + "\n\n");
  }
} catch (err) {
  console.error(err.stack || err);
  process.exit(1);
}
