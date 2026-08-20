# Cloudflare Developer Documentation

Welcome to the open-source repository for all [Cloudflare's Documentation](https://developers.cloudflare.com/).

To learn how to contribute, visit the [Cloudflare Style Guide](https://developers.cloudflare.com/style-guide/contributions/).

## Build and deployment

The production Worker is configured in `cloudflare.config.ts` and deployed with the `cf` CLI. The build has two stages: Astro writes the static site to `dist`, then the Cloudflare Vite plugin bundles the Worker and assets into `.cloudflare/output/v0`.

```sh
pnpm run build
pnpm exec cf deploy --prebuilt
```

Use `pnpm run dev` for the normal Astro authoring experience. `pnpm run dev:cf` runs the last Astro build through the local Workers runtime.

### Remaining `cf` migration gaps

The repository still uses Wrangler in these narrowly scoped places:

- **Build Output deployment to Workers for Platforms:** `cf` supports Workers for Platforms through its `cf dispatch-namespaces` commands, including namespace scripts and asset uploads. However, `cf deploy` cannot yet deploy a Build Output API project to a named script in a dispatch namespace. Doing so with the lower-level commands would require separately orchestrating the multipart Worker upload and static asset upload session. PR previews therefore continue to use `wrangler deploy` with `wrangler.preview.json` until `cf deploy` can target a dispatch namespace directly.
- **Worker test configuration:** `@cloudflare/vitest-pool-workers` still reads Wrangler-format configuration. `wrangler.test.json` and `wrangler.preview.test.json` exist only for the two Worker test projects in `vitest.config.ts`. Replace them when the pool can consume `cloudflare.config.ts` or the Build Output API.
- **Astro build orchestration:** `cf build` invokes Vite but does not run this repository's Astro static build first. The `pnpm run build` wrapper runs `astro build` before `cf build`; `cf dev` therefore serves the last generated `dist` and does not provide Astro content HMR. Remove the wrapper when `cf` can orchestrate Astro's build and dev server for this setup.
- **Worker type generation:** `cf` does not currently expose a standalone type-generation command. `pnpm run typegen:worker` continues to call `wrangler types` against the test config. Replace it when `cf` provides equivalent generated binding and runtime types.

## License and Legal Notices

Except as otherwise noted, Cloudflare and any contributors grant you a license to the Cloudflare Developer Documentation and other content in this repository under the [Creative Commons Attribution 4.0 International Public License](https://creativecommons.org/licenses/by/4.0/legalcode), see the [LICENSE file](https://github.com/cloudflare/cloudflare-docs/blob/production/LICENSE), and grant you a license to any code in the repository under the [MIT License](https://opensource.org/licenses/MIT), see the [LICENSE-CODE file](https://github.com/cloudflare/cloudflare-docs/blob/production/LICENSE-CODE).

Cloudflare products and services referenced in the documentation may be either trademarks or registered trademarks of Cloudflare in the United States and/or other countries. The licenses for this project do not grant you rights to use any Cloudflare names, logos, or trademarks. Cloudflare's general trademark guidelines can be found at [https://www.cloudflare.com/trademark/](https://www.cloudflare.com/trademark/).
Cloudflare and any contributors reserve all other rights, whether under their respective copyrights, patents, or trademarks, whether by implication, estoppel, or otherwise.

We may use AI tools to help us review technical documentation, pull requests and other issues submitted to our public GitHub page in order to identify and correct mistakes and other inconsistencies in our developer documentation. Please refrain from sharing any personal information in your submissions.
