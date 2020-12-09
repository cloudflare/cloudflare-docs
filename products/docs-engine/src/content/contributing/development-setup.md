---
order: 0
---

# Development setup

The basic steps for setting up a development are as follows.

1. Ensure you’re running node version `>=12.0.0`, as [specified by Docs Engine](https://github.com/cloudflare/cloudflare-docs-engine/blob/765bc30127b0e80b570aade7044036925928c3ea/package.json#L50).

2. Clone the docs site repo (`@username/my-docs-site` below):

  <Aside header="Note for Cloudflare employees">

  This would be `git@github.com:cloudflare/cloudflare-docs`.

  </Aside>

  ```sh
  ~/ $ git clone git@github.com:username/my-docs-site.git
  ```

3. `cd` into `my-docs-site` and run `npm install`:

  <Aside header="Note for Cloudflare employees">

  When contributing to [@cloudflare/cloudflare-docs](http://github.com/cloudflare/cloudflare-docs) specifically, you’ll need to `cd` into the sub-folder for your product (`products/[productName]` inside the repo).

  </Aside>

  ```sh
  ~/ $ cd my-docs-site
  ~/my-docs-site $ npm install
  ```

4. Run the engine’s [`bootstrap` command](https://github.com/cloudflare/cloudflare-docs-engine/blob/765bc30127b0e80b570aade7044036925928c3ea/bin/commands.sh#L19-L39):

  ```sh
  ~/my-docs-site $ npm run bootstrap
  ```

7. Run the local development server:

  ```sh
  ~/my-docs-site $ npm run develop
  ```

8. Open up `localhost:8000` in your browser to see your docs site.

At this point, you can make changes to the Markdown files inside the content directory (e.g. `my-docs-site/src/content`) to build or improve your docs site.

<Aside header="Note">

Unfortunately, for now you’ll need to stop and restart `npm run develop` every time you make changes if you make them in `src/content`.

This is an issue we’re working on and can be tracked [in this GitHub issue](https://github.com/cloudflare/cloudflare-docs-engine/issues/279).

As noted in the issue there are workarounds. The current recommended approach is to make your changes inside `.docs/src/content` instead. When you’re ready to commit your work, run `npm run savechanges` (inside the project directory) and that will copy the contents of `.docs/src/content` into `src/content` so you can see your changes.

</Aside>
