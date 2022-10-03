# Changelog

## 12th September 2022
* Increased domain limits
  * Before all plans had a maximum of 10 custom domains per project
  * New limits:
    * Free - 100 custom domains
    * Pro - 250 custom domains
    * Business/Enterprise - 500 custom domains

## 8th September 2022
* Support _routes.json
  * Documentation WIP

## 25th August 2022
* Logs expiration time increased from 2 weeks to 1 year

## 8th August 2022
* R2 and D1 bindings are now supported

## 5th July 2022
* Added support for .dev.vars in `wrangler pages`
  * This allows to use env vars during your local dev without chaining `--env`s
  * Wrangler v2.0.16

## 13th June 2022
* Added deltas to `wrangler pages publish`
  * We now keep track of the files that make up each deployment and intelligently only upload the files that we haven't seen. This means that similar subsequent deployments should only need to upload a minority of files and this will hopefully make uploads even faster.
  * Wrangler v2.0.11

## 8th June 2022
* Added branch alias in PR comments
![Branch alias in PR comment](/pages/platform/media/branch_alias_pr_comment.png)