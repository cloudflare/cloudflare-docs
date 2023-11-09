---
pcx_content_type: concept
title: Redirects
---

# Redirects

As your content changes (and it will change), redirects preserve continuity for your users and (friendly) bots.

The most obvious part of this is the user experience. If you click a link in the dashboard or use a bookmarked URL, you trust that it's taking you to the right place. Not a `404` page or the wrong page, but the right page. Redirects help direct users to the right place.

The same applies to the automated experience. If you move a page without redirects, you are losing the historical search authority that Google and other search engines use to rank your page.

## How we do it

There are [multiple ways](https://developers.google.com/search/docs/crawling-indexing/301-redirects) of performing redirects, including at your server, client-side redirects, and using a CDN.

We use various Cloudflare products for our redirects, due to ease of use and speed[^1].

[^1]: Performing redirects through Cloudflare lets you implement redirects on the Cloudflare global network instead of making requests travel all the way to an origin server.

### Cloudflare Pages (primary)

Our primary method takes advantage of the [Pages platform](/pages/platform/redirects/), defining redirects in a [plain text file](https://github.com/cloudflare/cloudflare-docs/blob/production/content/_redirects) in our GitHub repo.

This setup allows us to use the same workflow for redirects as for any other documentation change. We implement a redirect in the same pull request as the content change and can test these changes in our preview branches.

We also love the flexibility provided by the [Pages syntax](/pages/platform/redirects/#advanced-redirects).

{{<Aside type="note">}}

We also have extensive comments throughout our `_redirects` file, separating out different product areas and explicitly calling out products with dynamic redirects (that are listed at the bottom of the file for formatting reasons).

{{</Aside>}}

### Bulk redirects (secondary)

In certain situations, we also use [Bulk redirects](/rules/url-forwarding/bulk-redirects/).

Normally, bulk redirects only come up when another team is adding a large number of individual redirects to our site, such as when all of our previous `support.cloudflare.com` content was migrated and needed individualized redirects per locale.

We use this method when the contributors are outside of our team and when the total number of redirects is so large that it would clutter our `_redirects` file and count against our [limit for Pages redirects](/pages/platform/redirects/#surpass-_redirects-limits).

---

## Maintenance

There are three parts to redirect maintenance, keeping current links up to date and cleaning up your redirects file.

### Link maintenance

In our main [Compiles check](https://github.com/cloudflare/cloudflare-docs/blob/production/.github/workflows/ci.yml), we call [a script](https://github.com/cloudflare/cloudflare-docs/blob/production/bin/crawl.ts) that makes sure all internal links exist in our current build.

This means that it will error if it encounters any broken links, even those that have redirects set.

We highly recommend this approach because:

- The behavior of each link is much clearer.
- You can troubleshoot issues more easily.
- It simplifies any future migration.

### Redirect maintenance

We prune unused redirects in our `_redirects` file every couple months. This process helps us stay under the [limit for Pages redirects](/pages/platform/redirects/#surpass-_redirects-limits), as well as keeps our file cleaner and more navigable.

1. We check out the `_redirects` file from 6 months ago (which helps us avoid deleting recently added redirects).
2. Using a simple script, we extract all of the target paths from our `_redirects` file into a CSV.
3. Using that CSV, we join together data from a [Logpush job](/logs/about/) that stores a sample of `301` and `404` requests to our docs site.
4. Then, we evaluate redirects:

    - **Static redirects**: Compare to all `301` responses and - if the traffic threshold is low enough - remove that specific line from `_redirects`.
    - **Dynamic redirects**: Using a `contains` operator, review the amount of traffic reaching all subpaths. If the traffic is minimal, remove the dynamic redirect entirely. If the traffic is just going to one or two paths, swap out for a static redirect.

5. Aftewards, we monitor the `404` traffic to our docs site using the same Logpush job. This step helps us identify whether we need to re-add any of the redirects.

---

## Additional considerations

A few additional notes from our team's learned experience:

- At the server level, you can trigger a redirect on a URL path (`/page/`), but not a fragment (`/page/#fragment`). You can redirect a page to a fragment, however (`/page1/` to `/page2/#fragment`).
- Particularly in an open-source environment, use automation to identify changes that might require redirects. We built a [GitHub action](https://github.com/cloudflare/cloudflare-docs/blob/production/.github/workflows/comment-changed-filenames.yml) specifically for this use case.
- If possible, use automation to flag potential infinite redirects (where two redirect rules point to each other). We have a [dedicated script](https://github.com/cloudflare/cloudflare-docs/blob/production/bin/find-infinite-redirects.ts) to check for this situation in our Pages project.