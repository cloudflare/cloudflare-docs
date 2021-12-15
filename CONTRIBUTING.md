# Contributing to Cloudflare's Documentation

## Issues

[Open an issue](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) when something in the content is incorrect, out-of-date, or if the documentation doesn’t match the actual functionality. The items below are covered in our issue template.

* What is the expected behavior?
    * Link to the documentation or explain the expected outcome of following the documentation.
* What is the actual behavior?
    * Explain what actually happens when you follow the documentation.
* Which part of the documentation requires an update?
    * Provide a link to the page that needs an update and be specific about which section requires the update.
* Additional information
    * Any other details or screenshots you think are relevant.
* Issue Labels

## Pull Requests

Before proposing significant changes, open an issue so that we can discuss your approach first. Only members of the Cloudflare organization can open a pull request on the repository, and they should follow the same guidance on opening an issue for significant changes. If you’re not part of the Cloudflare organization but want to contribute, fork the repository and then create a pull request.

### Pull Request Guidelines

* Commits and commit messages
    * Use smaller commits for your work to make it easier to review. In your commit messages, be specific about what you changed in the files.
* Pull request titles 
    * Follow the title structure of  [Product Name]+ work you did + affected file(s)
    * Example: [Access] fix broken link in example_file.md
* Pull request descriptions
    * Use bullet points to summarize the changes in the commits
    * Add any other information you think is helpful or needs addressed. If your PR fixes an open issue, indicate that your PR is addressing the issue and provide a link to the issue.
 
## Package manager

* [Yarn](https://classic.yarnpkg.com/en/docs/install) is the recommended package manager that must be used in installing dependencies. 
* Generated yarn.lock files must be committed to git.


A member of the Product Content Experience team will review the pull request. If the changes are straightforward, the pull request is approved and can be merged. If the pull request is more technical and requires an additional review, the new reviewer will leave any additional feedback.
 If a pull request is not approved, the “won't fix” label is applied and a comment is added to explain why the pull request was closed.
