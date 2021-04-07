# Preview deployments

Preview deployments allow you to preview new versions of your project without deploying it to production.

Every time you open a new pull request on your GitHub repository, Cloudflare Pages will create a unique preview URL, which will stay up-to-date as you continue to push new commits to the branch.

## Customizing preview deployments access

By default, preview deployments are enabled and available publicly. In your project's settings, you can require visitors to authenticate using [Cloudflare Access](https://www.cloudflare.com/teams-access/) to be able to view preview deployment. This allows you to lock down access to these preview deployments to your teammates, organization, or anyone else you specify via [Access policies](https://developers.cloudflare.com/access/setting-up-access/configuring-access-policies/).