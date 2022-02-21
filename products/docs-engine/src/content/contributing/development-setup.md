---
order: 0
pcx-content-type: how-to
---

# Development setup

The basic steps for setting up a development are as follows.

1. Ensure you’re running node version `>=12.0.0`, as [specified by Docs Engine](https://github.com/cloudflare/cloudflare-docs-engine/blob/765bc30127b0e80b570aade7044036925928c3ea/package.json#L50).

1. Clone the docs site repo (`@username/my-docs-site` below):

  <Aside header="Note for Cloudflare employees">

  This would be `git@github.com:cloudflare/cloudflare-docs`.

  </Aside>

  ```sh
  ~/ $ git clone git@github.com:username/my-docs-site.git
  ```

1. `cd` into `my-docs-site` and run `yarn install`:

  <Aside header="Note for Cloudflare employees">

  When contributing to [@cloudflare/cloudflare-docs](https://github.com/cloudflare/cloudflare-docs) specifically, you’ll need to `cd` into the sub-folder for your product (`products/[productName]` inside the repo).

  </Aside>

  ```sh
  ~/ $ cd my-docs-site
  ~/my-docs-site $ yarn install
  ```

1. Run the engine’s [`bootstrap` command](https://github.com/cloudflare/cloudflare-docs-engine/blob/765bc30127b0e80b570aade7044036925928c3ea/bin/commands.sh#L19-L39):

  ```sh
  ~/my-docs-site $ yarn bootstrap
  ```

1. Run the local development server:

  ```sh
  ~/my-docs-site $ yarn develop
  ```

1. Open `localhost:8000` in your browser to see your docs site.

At this point, you can make changes to the Markdown files inside the content directory (e.g. `my-docs-site/src/content`) to build or improve your docs site.

## Watch files for changes

<Aside type="note">

Applies only to Cloudflare Developers documentation.

</Aside>

If you are contributing to [@cloudflare/cloudflare-docs](https://github.com/cloudflare/cloudflare-docs), you can use a command that starts the local development server and watches files for changes, updating the development server files automatically. To use this command:

1. Go to the local repo's root directory and run `yarn install`:

  ```sh
  ~/cloudflare-docs/products/docs-engine $ cd ../..
  ~/cloudflare-docs $ yarn install
  ```

1. Run the `develop` command passing the product folder name (the name of a `products/` sub-folder) as an argument — for example, `docs-engine`:

  ```sh
  ~/cloudflare-docs $ yarn develop -- docs-engine
  ```

1. Open `localhost:8000` in your browser to see your docs site. In this example, when you update any files under `cloudflare-docs/products/docs-engine`, the development server automatically updates the rendered docs site.

Currently, this script is only available in the [Cloudflare Developers documentation repository](https://github.com/cloudflare/cloudflare-docs/blob/production/develop.js). If you are using the Docs Engine with a different documentation repository, you need to stop and restart `yarn develop` every time you make changes to files under `src/content`.
