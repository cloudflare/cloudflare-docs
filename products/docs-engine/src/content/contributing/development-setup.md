---
order: 0
---

# Development setup

<Aside>

__Note for Cloudflare employees__

Follow the [Migrate a Product](/how-to-guides/migrate-a-product) how-to guide instead.

The content below is here for completeness, and describes the theoretical way to set up the Docs Engine with _any_ project. At Cloudflare we’ve decided to follow the monorepo approach for our docs content, putting all of our docs content inside [@cloudflare/cloudflare-docs](http://github.com/cloudflare/cloudflare-docs) rather than a per-product repo. As such, the how-to guide listed above includes the specific instructions for setting up a development environment with our monorepo.

</Aside>

The basic steps for setting up a development are as follows.

1. Clone [@cloudflare/cloudflare-docs-engine](http://github.com/cloudflare/cloudflare-docs-engine) and your repo (`@example-username/my-docs-content` below):

  ```sh
  ~/ $ git clone git@github.com:cloudflare/cloudflare-docs-engine.git
  ~/ $ git clone git@github.com:example-username/my-docs-content.git
  ```

2. `cd` into `cloudflare-docs-engine`, run `npm link`, then return to the parent directory.

  ```sh
  ~/ $ cd cloudflare-docs-engine
  ~/cloudflare-docs-engine $ npm link
  ~/cloudflare-docs-engine $ cd ..
  ```

3. `cd` into `my-docs-content`:

  ```sh
  ~/ $ cd my-docs-content
  ```

5. Inside your project’s folder, link the engine:

  ```sh
  ~/my-docs-content $ npm link cloudfare-docs-engine
  ```

6. Run the engine’s [`bootstrap` command](https://github.com/cloudflare/cloudflare-docs-engine/blob/765bc30127b0e80b570aade7044036925928c3ea/bin/commands.sh#L19-L39):

  ```sh
  ~/my-docs-content $ npm run bootstrap
  ```

7. Run the local development server:

  ```sh
  ~/my-docs-content $ npm run develop
  ```

8. Open up `localhost:8000` in your browser to see your docs site.

At this point, you can make changes to the Markdown files inside the contect directory (e.g. `my-docs-content/src/content`) to improve your docs site.

<Aside>

__Note:__ Unfortunately, for now you’ll need to stop and restart `npm run develop` every time you make changes. This is something we’re urgently looking to fix and can be tracked [in this GitHub issue](https://github.com/cloudflare/cloudflare-docs-engine/issues/279), which also includes a workaround which may help in the interim.

</Aside>
