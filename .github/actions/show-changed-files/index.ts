import * as core from "@actions/core";
import * as github from "@actions/github";

// Hugo configuration options
// ==========================
// removePathAccents: Default is false. Docs: https://gohugo.io/getting-started/configuration/#removepathaccents
const REMOVE_PATH_ACCENTS: boolean = false;
// disablePathToLower: Default is false. Docs: https://gohugo.io/getting-started/configuration/#disablepathtolower
const DISABLE_PATH_TO_LOWER: boolean = false;

function UnicodeSanitize(filePath: string): string {
  // Adapted from Go source:
  // https://github.com/gohugoio/hugo/blob/16da1ade7040a401fb704e9fae858a51ff517468/helpers/path.go#L92

  if (REMOVE_PATH_ACCENTS) {
    //Go version was: return transform.Chain(norm.NFD, runes.Remove(runes.In(unicode.Mn)), norm.NFC)
    filePath = filePath
      .normalize("NFD")
      .replace(/\p{Mn}/gu, "")
      .normalize("NFC");
  }

  let result: string = "";
  let wasHyphen = false;
  let prependHyphen = false;

  for (let i = 0; i < filePath.length; i++) {
    const currChar = filePath[i];
    let isAllowed: boolean = false;

    isAllowed =
      currChar == "." ||
      currChar == "/" ||
      currChar == "\\" ||
      currChar == "_" ||
      currChar == "#" ||
      currChar == "+" ||
      currChar == "~" ||
      currChar == "-" ||
      currChar == "@";

    isAllowed =
      isAllowed ||
      currChar.match(/\p{L}/u) != null ||
      currChar.match(/\p{Nd}/u) != null ||
      currChar.match(/\p{M}/u) != null;
    isAllowed =
      isAllowed ||
      (currChar == "%" &&
        i + 2 < filePath.length &&
        filePath.substring(i + 1, i + 3).match(/[0-9A-Fa-f]{2}/) != null);

    if (isAllowed) {
      // track explicit hyphen in input; no need to add a new hyphen if
      // we just saw one.
      wasHyphen = currChar == "-";

      if (prependHyphen) {
        // if currently have a hyphen, don't prepend an extra one
        if (!wasHyphen) {
          result = result + "-";
        }
        prependHyphen = false;
      }
      result = result + currChar;
    } else if (result.length > 0 && !wasHyphen && IsSpace(currChar)) {
      prependHyphen = true;
    }
  }

  return DISABLE_PATH_TO_LOWER ? result : result.toLowerCase();
}

function IsSpace(ch: string): boolean {
  // For Latin1 characters
  if (ch.charCodeAt(0) <= 255) {
    // In Go version: case '\t', '\n', '\v', '\f', '\r', ' ', 0x85, 0xA0:
    if (ch.match(/\t|\n|\v|\f|\r| |\u0085|\u00a0/) != null) {
      return true;
    }
    return false;
  }
  // for non-Latin1 characters
  return (
    ch.match(/\p{Pattern_White_Space}/u) != null || ch.match(/\p{Z}/u) != null
  );
}

async function run(): Promise<void> {
  try {
    const ctx = github.context;
    const token = core.getInput("GITHUB_TOKEN", { required: true });
    const octokit = github.getOctokit(token);
    const issue = ctx.payload.issue;
    const issueNumber = issue.number;

    const files = await octokit.paginate(octokit.rest.pulls.listFiles, {
      ...ctx.repo,
      pull_number: issueNumber,
      per_page: 100,
    });

    const { data: comments } = await octokit.rest.issues.listComments({
      owner: ctx.repo.owner,
      repo: ctx.repo.repo,
      issue_number: issueNumber,
      per_page: 100,
    });

    const existingComment = comments.find(
      (comment) =>
        comment.user.id === 41898282 &&
        comment.body.includes("| Original Link | Updated Link |")
    );

    const pagesComment = comments.find(
      (comment) =>
        comment.user.id === 73139402 &&
        comment.body.includes("Deploy successful!")
    );

    let previewBaseURL = "https://www.example.com";

    if (pagesComment) {
      const regex = /(https:\/\/.*?\.cloudflare-docs-7ou\.pages\.dev)/gm;
      const urlMatches = pagesComment.body.match(regex);
      previewBaseURL = urlMatches[3];
    }

    const changedFiles = files
      .filter(
        (file) =>
          file.filename.endsWith(".md") &&
          !file.filename.includes("_partials") &&
          file.filename.startsWith("content/")
      )
      .map((file) => ({
        file,
        changes: file.changes,
      }))
      .sort((a, b) => b.changes - a.changes)
      .slice(0, 15) // Limit to 15 entries
      .map((file) => {
        const filePathToUriPath = (link: string): string => {
          let path = link
            .replace(/^content/, "")
            .replace(/_index\.md$/, "")
            .replace(/index\.md$/, "")
            .replace(/\.md$/, "/");
          if (path.includes(" ") || path.startsWith("/support/")) {
            return UnicodeSanitize(path);
          } else {
            return DISABLE_PATH_TO_LOWER ? path : path.toLowerCase();
          }
        };

        const originalLink = `https://developers.cloudflare.com${filePathToUriPath(
          file.file.filename
        )}`;
        const updatedLink = previewBaseURL.concat(
          filePathToUriPath(file.file.filename)
        );

        return { originalLink, updatedLink };
      });

    if (changedFiles.length === 0) {
      return;
    }

    const commentBody = `**Files with changes (up to 15)**\n\n| Original Link | Updated Link |\n| --- | --- |\n${changedFiles
      .map(
        (file) =>
          `| [${file.originalLink}](${file.originalLink}) | [${file.updatedLink}](${file.updatedLink}) |`
      )
      .join("\n")}`;

    if (existingComment) {
      await octokit.rest.issues.updateComment({
        owner: ctx.repo.owner,
        repo: ctx.repo.repo,
        comment_id: existingComment.id,
        body: commentBody,
      });
    } else {
      await octokit.rest.issues.createComment({
        owner: ctx.repo.owner,
        repo: ctx.repo.repo,
        issue_number: issueNumber,
        body: commentBody,
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
