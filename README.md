# Cloudflare Docs

**[View the docs →](https://developers.cloudflare.com/)**

[Contribute to the docs](https://github.com/cloudflare/cloudflare-docs/blob/production/CONTRIBUTING.md)

## Setup

You must have [Hugo](https://gohugo.io) installed on your system and available in your `$PATH` as a global binary. Most operating systems are supported – follow the relevant [installation instructions](https://gohugo.io/installation/) for your operating system to get started.

> **Important:** This project is built with version `0.125.6+extended` and is the minimum required version. You may (probably) use a newer version of Hugo, but will be subject to any Hugo changes.

You must also have a recent version of Node.js (20+) installed. You may use [Volta](https://github.com/volta-cli/volta), a Node version manager, to install the latest version of Node and `npm`, which is a package manager that is included with `node`'s installation.

```sh
$ curl https://get.volta.sh | bash
$ volta install node
```

Finally, install the Node.js dependencies for this project using npm or another package manager:

```sh
$ npm install
```

## Development

When making changes to the site, including any content changes, you may run a local development server by running the following command:

```sh
$ npm run dev
```

This spawns a server that will be accessible via `http://localhost:5173` in your browser. Additionally, any changes made within the project – including `content/**` changes – will automatically reload your browser tab(s), allowing you to instantly preview your changes.

Additionally, this project includes a CI step for ensuring consistent code style. This applies to all files within the project, including markdown (`*.md`) files, but will not affect the content itself or the content's output display. To see the style error(s), you may run:

```sh
$ npm run lint
```

### Recommendations

Part of our application accesses the GitHub API (to populate the [Wrangler changelog](https://github.com/cloudflare/cloudflare-docs/blob/production/layouts/partials/wrangler-changelog.html)).

Since GitHub gives a higher request limit to authenticated requests, you may want to add a [classic token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#personal-access-tokens-classic) with permissions for `repos:public_repo` to `/assets/secrets/github_token.txt`. The token value should be the only thing in your file.

## Deployment

Our docs are deployed using [Cloudflare Pages](https://pages.cloudflare.com). Every commit pushed to production will automatically deploy to [developers.cloudflare.com](https://developers.cloudflare.com), and any pull requests opened will have a corresponding staging URL available in the pull request comments.

## Available Visual Studio Code snippets

Refer to [Visual Studio Code snippets](./SNIPPETS.md) for more information.

## For Cloudflare employees

To get write access to this repo, please reach out to the **Developer Docs** room in chat.

## License and Legal Notices

Except as otherwise noted, Cloudflare and any contributors grant you a license to the Cloudflare Developer Documentation and other content in this repository under the [Creative Commons Attribution 4.0 International Public License](https://creativecommons.org/licenses/by/4.0/legalcode), see the [LICENSE file](https://github.com/cloudflare/cloudflare-docs/blob/production/LICENSE), and grant you a license to any code in the repository under the [MIT License](https://opensource.org/licenses/MIT), see the [LICENSE-CODE file](https://github.com/cloudflare/cloudflare-docs/blob/production/LICENSE-CODE).

Cloudflare products and services referenced in the documentation may be either trademarks or registered trademarks of Cloudflare in the United States and/or other countries. The licenses for this project do not grant you rights to use any Cloudflare names, logos, or trademarks. Cloudflare's general trademark guidelines can be found at [https://www.cloudflare.com/trademark/](https://www.cloudflare.com/trademark/).
Cloudflare and any contributors reserve all other rights, whether under their respective copyrights, patents, or trademarks, whether by implication, estoppel, or otherwise.

Please note that we may use AI tools to help us review technical documentation, pull requests and other issues submitted to our public GitHub page in order to identify and correct mistakes and other inconsistencies in our developer documentation. Please refrain from sharing any personal information in your submissions.
