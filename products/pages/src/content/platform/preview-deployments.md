---
order: 3
pcx-content-type: concept
---

# Preview deployments

Preview deployments allow you to preview new versions of your project without deploying it to production.

Every time you open a new pull request on your GitHub repository, Cloudflare Pages will create a unique preview URL, which will stay up-to-date as you continue to push new commits to the branch.

<!-- this is a draft!!!!!!!!! and a terrible one at that. revisions coming>

For example, suppose you have a repo called `user-example` connected to Pages. This will give you a ``example.pages.dev` subdomain. if you assume that `main` is your default branch, then any commits to this main branch will update your example.pages.dev website content, as well as any custom domains attached to the project. 

While developing user-example, you may push new changes to a `developlemnt` branch. In doing so, Pages will automatically kick off a preview deployment making these changes available at `abc12.example.pages.dev` -- where `abc12` is a generated hash. Any further additional changes `dev` branch will continue to update this abc12.example.pages.dev address. Any custom domains will not be affected by preview deployments. 

<!-->

## Customizing preview deployments access

By default, preview deployments are enabled and available publicly. In your project's settings, you can require visitors to authenticate using [Cloudflare Access](https://www.cloudflare.com/teams-access/) to be able to view preview deployment. This allows you to lock down access to these preview deployments to your teammates, organization, or anyone else you specify via [Access policies](https://developers.cloudflare.com/access/setting-up-access/configuring-access-policies/).