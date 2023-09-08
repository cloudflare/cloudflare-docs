---
pcx_content_type: reference
title: GitHub
rss: file
---

# GitHub

{{<render file="casb/_integration-description.md" withParameters="GitHub;;GitHub Organization">}}

## Integration prerequisites

- A GitHub account with a Free, Pro, or Enterprise plan
- Membership to a GitHub Organization with Owner or GitHub App manager permissions

## Integration permissions

For the GitHub integration to function, Cloudflare CASB requires the following GitHub API permissions:

| Permission                  | Access      | Description                                                                                             |
| --------------------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| Administration              | `Read-only` | View basic administrative information from the account.                                                 |
| Members                     | `Read-only` | View metadata on organization members                                                                   |
| Metadata                    | `Read-only` | View metadata surrounding an organization's assets, excluding sensitive private repository information. |
| Organization administration | `Read-only` | View information on organization settings                                                               |

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [GitHub App permissions reference](https://docs.github.com/en/rest/overview/permissions-required-for-github-apps).

## Security findings

{{<render file="casb/_security-findings.md" withParameters="GitHub;;github">}}

### Repository access

| Finding                                        | Severity | Description                                                               |
| ---------------------------------------------- | -------- | ------------------------------------------------------------------------- |
| Repository publicly accessible                 | Critical | A repository has its visibility set to `Public`.                          |
| Repository with outside collaborator           | Medium   | A user outside of the organization has access to a repository.            |
| Public repository without security policy      | Medium   | A publicly-accessible repository does not have a security policy enabled. |
| Repository with deploy key older than 180 days | Low      | A repository deploy key has not been rotated in 180 days or more.         |

### Branches and merges

| Finding                                                                | Severity | Description                                                                                                              |
| ---------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| Repository Default Branch does not have Branch Protection rules        | High     | A repository's default branch does not have any branch protection rules enabled.                                         |
| Default Branch Protection does not have PR Review required             | High     | A repository's default branch does not have a **Require pull request reviews before merging** rule.                      |
| Default Branch Protection does not have forced pushes disabled         | Medium   | A repository's default branch has enabled **Allow force pushes**.                                                        |
| Default Branch Protection does not have stale PR approvals disabled    | Medium   | A repository's default branch does not have a **Dismiss stale pull request approvals when new commits are pushed** rule. |
| Default Branch Protection does not have admin restrictions             | Low      | A repository's default branch does not have a **Do not allow bypassing the above settings** rule for administrators.     |
| Default Branch Protection does not have deletions disabled             | Low      | A repository's default branch has enabled **Allow deletions**.                                                           |
| Default Branch Protection does not have status check failures disabled | Low      | A repository's default branch does not have a **Require status checks to pass before merging** rule.                     |

Learn more about [GitHub branch protection rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule).

### Dependencies

| Finding                                           | Severity | Description                                                              |
| ------------------------------------------------- | -------- | ------------------------------------------------------------------------ |
| Repository Dependency with Critical vulnerability | Critical | A dependency used in a repository has a critical severity vulnerability. |
| Repository Dependency with High vulnerability     | High     | A dependency used in a repository has a high severity vulnerability.     |
| Repository Dependency with Medium vulnerability   | Medium   | A dependency used in a repository has a medium severity vulnerability.   |
| Repository Dependency with Low vulnerability      | Low      | A dependency used in a repository has a low severity vulnerability.      |

Learn more about [GitHub Dependabot alerts](https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts).

### User accounts

| Finding                         | Severity | Description                                                                                              |
| ------------------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| Organization 2FA disabled       | Critical | An organization does not have its organization-wide two-factor authentication (2FA) requirement enabled. |
| Organization Member without 2FA | Medium   | A member of the organization does not have two-factor authentication (2FA) enabled.                      |
