---
pcx_content_type: how-to
title: Maintenance
weight: 2
meta:
    title: Redirects | Maintenance
---

# Maintenance

There are two parts to redirect maintenance, keeping current links up to date and cleaning up your redirects file.

## Link maintenance

In our main [Compiles check](https://github.com/cloudflare/cloudflare-docs/blob/production/.github/workflows/ci.yml), we call [a script](https://github.com/cloudflare/cloudflare-docs/blob/production/bin/crawl.ts) that makes sure all internal links exist in our current build.

This means that the check will error if it encounters any broken links, even those that have redirects set.

We highly recommend this approach because:

- The behavior of each link is much clearer.
- You can troubleshoot issues more easily.
- It simplifies any future migration.

## Redirect maintenance

We prune unused redirects in our `_redirects` file every couple months. This process helps us stay under the [limit for Pages redirects](/pages/configuration/redirects/#surpass-_redirects-limits), as well as keeps our file cleaner and more navigable.

1. We check out the `_redirects` file from 6 months ago, which helps us avoid deleting recently added redirects.
2. Using a script, we extract all of the target paths from our `_redirects` file into a CSV.
3. Using that CSV, we join together data from a [Logpush job](/logs/about/) that stores a sample of `301` and `404` requests to our docs site.
4. Then, we evaluate redirects:

    - **Static redirects**: Compare to all `301` responses and - if the traffic threshold is low enough - remove that specific line from `_redirects`.
    - **Dynamic redirects**: Using a `contains` operator, review the amount of traffic reaching all subpaths. If the traffic is minimal, remove the dynamic redirect entirely. If the traffic is just going to one or two paths, swap out for a static redirect.

5. Afterwards, we monitor the `404` traffic to our docs site using the same Logpush job. This step helps us identify whether we need to re-add any of the redirects.