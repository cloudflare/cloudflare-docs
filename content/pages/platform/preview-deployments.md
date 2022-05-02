---
pcx-content-type: concept
title: Preview deployments
---

# Preview deployments

Preview deployments allow you to preview new versions of your project without deploying it to production. To view preview deployments, navigate from the **Account Home** > **Pages** and select your project.

Every time you open a new pull request on your GitHub repository, Cloudflare Pages will create a unique preview URL, which will stay updated as you continue to push new commits to the branch. This is only true when pull requests originate from the repository itself.

For example, if you have a repository called `user-example` connected to Pages, this will give you a `user-example.pages.dev` subdomain. If `main` is your default branch, then any commits to the `main` branch will update your `user-example.pages.dev` content, as well as any [custom domains](/pages/get-started/#adding-a-custom-domain) attached to the project.

![User-example repository's deployment status and preview](../media/preview-deployment-mergedone.png)

While developing `user-example`, you may push new changes to a `development` branch, for example.

In this example, after you create the new `development` branch, Pages will automatically generate a preview deployment for these changes available at `373f31e2.user-example.pages.dev` - where `373f31e2` is a randomly generated hash.

Each new branch you create will receive a new, randomly-generated hash in front of your `pages.dev` subdomain.

![User-example repository's newly generated preview deployment link and status](../media/preview-deployment-generated.png)

Any additional changes to the `development` branch will continue to update this `373f31e2.user-example.pages.dev` preview address until the `development` branch is merged with the `main` production branch.

Any custom domains, as well as your `user-example.pages.dev` site, will not be affected by preview deployments.

## Customizing preview deployments access

By default, preview deployments are enabled and available publicly. In your project's settings, you can require visitors to authenticate using [Cloudflare Access](https://www.cloudflare.com/teams-access/) to be able to view preview deployment. This allows you to lock down access to these preview deployments to your teammates, organization, or anyone else you specify via [Access policies](/cloudflare-one/policies/).

To protect your preview deployments behind Cloudflare Access:

1. Log in to [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. From Account Home, select **Pages**.
3. Select your Pages project.
4. Go to **Settings** > **General** > and select **Enable access policy**.

Note that this will only protect your preview deployments (for example, `373f31e2.user-example.pages.dev` and every other randomly generated preview link) and not your `*.pages.dev` domain or custom domain.

{{<Aside note="warning">}}

If you want to enable Access for your `*.pages.dev` domain and your custom domain along with your preview deployments, review [Known issues](/pages/platform/known-issues/#enabling-access) for instructions.

{{</Aside>}}

## Preview aliases

When a preview deployment is published, it is given a unique, hash-based address — for example, `<hash>.<project>.pages.dev`. These are atomic and may always be visited in the future. However, Pages also creates an alias for `git` branch's name and updates it so that the alias always maps to the latest commit of that branch. 

For example, if you push changes to a `development` branch (which is not associated with your Production environment), then Pages will deploy to `abc123.<project>.pages.dev` and alias `development.<project>.pages.dev` to it. Later, you may push new work to the `development` branch, which creates the `xyz456.<project>.pages.dev` deployment. At this point, the `development.<project>.pages.dev` alias points to the `xyz456` deployment, but `abc123.<project>.pages.dev` remains accessible directly.

Branch name aliases are lowercased and non-alphanumeric characters are replaced with a hyphen — for example, the `fix/api` branch creates the `fix-api.<project>.pages.dev` alias.

To view branch aliases within your Pages project, select **View build** for any preview deployment. **Deployment details** will display all aliases associated with that deployment.
