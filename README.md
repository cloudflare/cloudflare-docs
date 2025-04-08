# Cloudflare Docs

**[View the docs →](https://developers.cloudflare.com/)**

## Why Cloudflare Docs is open source

Our documentation is open source so that we can stay connected with our community and quickly implement feedback. Whether you have opened an issue to provide feedback or contributed your own content, we thank you for helping us maintain quality documentation.

If you have any feedback for our documentation or are interested in contributing, please refer to our [contribution guidelines.](https://github.com/cloudflare/cloudflare-docs/blob/production/CONTRIBUTING.md)

## Setup

You must have a recent version of Node.js (22+) installed. You may use [Volta](https://github.com/volta-cli/volta), a Node version manager, to install the latest version of Node and `npm`, which is a package manager that is included with `node`'s installation.

```sh
$ curl https://get.volta.sh | bash
$ volta install node@22
```

Install the Node.js dependencies for this project using npm or another package manager:

```sh
$ npm install
```

## Development

When making changes to the site, including any content changes, you may run a local development server by running the following command:

```sh
$ npm run dev
```

This spawns a server that will be accessible via `http://localhost:1111` in your browser. Additionally, any changes made within the project – including `content/**` changes – will automatically reload your browser tab(s), allowing you to instantly preview your changes.

## Deployment

Our docs are deployed using [Cloudflare Pages](https://pages.cloudflare.com). Every commit pushed to production will automatically deploy to [developers.cloudflare.com](https://developers.cloudflare.com), and any pull requests opened will have a corresponding staging URL available in the pull request comments.

## For Cloudflare employees

To get write access to this repo, please reach out to the **Developer Docs** room in chat.

## License and Legal Notices

Except as otherwise noted, Cloudflare and any contributors grant you a license to the Cloudflare Developer Documentation and other content in this repository under the [Creative Commons Attribution 4.0 International Public License](https://creativecommons.org/licenses/by/4.0/legalcode), see the [LICENSE file](https://github.com/cloudflare/cloudflare-docs/blob/production/LICENSE), and grant you a license to any code in the repository under the [MIT License](https://opensource.org/licenses/MIT), see the [LICENSE-CODE file](https://github.com/cloudflare/cloudflare-docs/blob/production/LICENSE-CODE).

Cloudflare products and services referenced in the documentation may be either trademarks or registered trademarks of Cloudflare in the United States and/or other countries. The licenses for this project do not grant you rights to use any Cloudflare names, logos, or trademarks. Cloudflare's general trademark guidelines can be found at [https://www.cloudflare.com/trademark/](https://www.cloudflare.com/trademark/).
Cloudflare and any contributors reserve all other rights, whether under their respective copyrights, patents, or trademarks, whether by implication, estoppel, or otherwise.

Please note that we may use AI tools to help us review technical documentation, pull requests and other issues submitted to our public GitHub page in order to identify and correct mistakes and other inconsistencies in our developer documentation. Please refrain from sharing any personal information in your submissions.


## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                      |
|:--------------------------|:--------------------------------------------|
| `npm install`             | Installs dependencies                       |
| `npm run dev`             | Starts local dev server at `localhost:1111` |
| `npx astro build`         | Build your production site to `./dist/`     |
| `npm run astro -- --help` | Get help using the Astro CLI                |

## 👀 Want to learn more?

Check out [Starlight’s docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).
