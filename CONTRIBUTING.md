# Contributing to Cloudflare's documentation

Before contributing code to Cloudflare's documentation, please read the following guidelines carefully.

## Have feedback for our documentation? Open an issue

[Open an issue](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) when something in our documentation is incorrect, out-of-date, or if the documentation doesn’t match the actual functionality.

## Before submitting a PR, open an issue

Before proposing significant changes, such as adding a new page, [open an issue](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) so that we can discuss your approach first. Only members of the Cloudflare organization can open a pull request on the repository, and they should follow the same guidance on opening an issue for significant changes. If you’re not part of the Cloudflare organization but want to contribute, fork the repository and then create a pull request.

A member of the Product Content Experience team will review the pull request. If the changes are straightforward, the pull request is approved and can be merged. If the pull request is more technical and requires an additional review, the new reviewer will leave any additional feedback.

If a pull request is not approved, the “won't fix” label is applied and a comment is added to explain why the pull request was closed.

If we require more information to address your pull request, the `more-information-needed` label will be applied to the pull request. If more information has not been provided within fourteen days, the pull request will automatically close.

### Pull Request Guidelines

- Commits and commit messages
  - Use smaller commits for your work to make it easier to review. In your commit messages, be specific about what you changed in the files.
  - If you are proposing a new page, review our [content type guidelines](https://developers.cloudflare.com/style-guide/documentation-content-strategy/content-types/) for options and templates.
- Pull request titles
  - Follow the title structure of [Product Name] + work you did + affected file(s)
  - Example: [Access] fix broken link in example_file.md
- Pull request descriptions
  - Use bullet points to summarize the changes in the commits
  - Add any other information you think is helpful or needs to be addressed. If your PR fixes an open issue, indicate that your PR is addressing the issue and provide a link to the issue.

## Package manager

- [npm](https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager#introduction-to-npm) is the recommended package manager that must be used in installing dependencies.
- The generated `package-lock.json` file must be committed to git.

## Wrangler config

If you are adding a code snippet to the docs that represents a Wrangler config file (`wrangler.toml`, `wrangler.json`, or `wrangler.jsonc`) make sure you wrap it with the `<WranglerConfig>` component, which ensures it is rendered as both JSON and TOML. For example:

````

import { WranglerConfig } from "~/components";

<WranglerConfig>

```toml
# Top-level configuration
name = "my-worker"
main = "src/index.js"
compatibility_date = "2022-07-12"

workers_dev = false
route = { pattern = "example.org/*", zone_name = "example.org" }

kv_namespaces = [
  { binding = "<MY_NAMESPACE>", id = "<KV_ID>" }
]

[env.staging]
name = "my-worker-staging"
route = { pattern = "staging.example.org/*", zone_name = "example.org" }

kv_namespaces = [
  { binding = "<MY_NAMESPACE>", id = "<STAGING_KV_ID>" }
]
```

</WranglerConfig>

````

## Workers Playground

If you are adding a code snippet to the docs that is:

1. A fully contained, valid Worker (i.e. it does not require external dependencies or specific bindings)
2. Only JavaScript

you can add `playground: true` to the code block metadata to render a button to let users open the Worker in the [Playground](https://workers.new). For example:

````
```js
---
playground: true
---
export default {
  async fetch(request) {
    /**
     * Replace `remote` with the host you wish to send requests to
     */
    const remote = "https://example.com";

    return await fetch(remote, request);
  },
};
```
````

would render as

<img width="870" alt="Screenshot 2024-02-20 at 14 29 22" src="https://github.com/cloudflare/cloudflare-docs/assets/28503158/56aa8016-b3b6-4d64-8213-b1a26f16534a">

## GraphQL API Explorer

If you are adding a code snippet to the documentation that is an executable GraphQL query, you can add `graphql-api-explorer` right after `graphql` in the code block metadata (both must be present). This will render a button that allows users to open the query in the [GraphQL API Explorer](https://graphql.cloudflare.com/explorer). For example:

````
```graphql graphql-api-explorer title="A GraphQL query"
query GraphqlExample($zoneTag: string, $start: Time, $end: Time) {
	viewer {
		zones(filter: { zoneTag: $zoneTag }) {
			firewallEventsAdaptive(
				filter: { datetime_gt: $start, datetime_lt: $end }
				limit: 2
				orderBy: [datetime_DESC]
			) {
				action
				datetime
				host: clientRequestHTTPHost
			}
		}
	}
}
```
````

When a user selects the `Run in GraphQL API Explorer` button, the following variables will be pre-populated in the GraphQL API Explorer along with the query.

:::note
The user must be logged in or have an API token saved to see the query and variables pre-populated.
:::

```
{"zoneTag":"ZONE_ID", "start":"2025-05-07T14:54:36Z", "end":"2025-05-07T20:54:36Z"}
```

### Conventions to auto populate `Variables` section in the GraphQL API Explorer

By default, the `Variables` section will be automatically populated based on the variables used in the GraphQL query.

- Any variable name that includes `start` and has a type of `Time` --> start: "2025-05-09T14:58:06Z" (6 hours from the current time)
  - e.g. `datetimeStart` also has `start` keyword, so it will be recognized for a start time (or date)
- Any variable name that includes `end` and has a type of `Time` --> end: "2025-05-09T20:58:06Z" (current time)
- Any variable name that includes `start` and has a type of `Date` --> start: "2025-05-07" (24 hours from the current date)
- Any variable name that includes `end` and has a type of `Date` --> end: "2025-05-08" (current date)
- `zoneTag` and has a type of `string` --> zoneTag: "ZONE_ID"
- `accountTag` and has a type of `string` --> accountTag: "ACCOUNT_ID"
- Any variable name that includes `id` and has a type of `string` --> id: "REPLACE_WITH_ID"
- Any variable name and has a type of string --> anyString: "REPLACE_WITH_STRING"
- `limit` with type `*int*` --> limit: 100

In addition to the variables that are automatically populated, you can add custom variables by setting their values as a JSON string in the `graphql-api-explorer` metadata.

````
```graphql graphql-api-explorer='{"uID": "something"}' title="A GraphQL query"
query GraphqlExample($zoneTag: string, $start: Time, $end: Time) {
	viewer {
		zones(filter: { zoneTag: $zoneTag }) {
			...
		}
	}
}
````

The variables added via the metadata value will be merged with the automatically populated variables.

```
{"zoneTag":"ZONE_ID", "start":"2025-05-07T14:54:36Z", "end":"2025-05-07T20:54:36Z", "uId": "something"}
```
