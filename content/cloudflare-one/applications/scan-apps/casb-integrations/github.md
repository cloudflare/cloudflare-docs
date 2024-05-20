---
pcx_content_type: reference
title: GitHub
rss: file
meta:
    title: GitHub - CASB
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

| Finding                                                | Finding type ID                        | Severity | Description                                                               |
| ------------------------------------------------------ | -------------------------------------- | -------- | ------------------------------------------------------------------------- |
| GitHub: Repository publicly accessible                 | `ec4bc7e1-aad9-465d-b7f3-980c5c10d6ac` | Critical | A repository has its visibility set to _Public_.                          |
| GitHub: Repository with outside collaborator           | `9512c087-e952-4fb2-85d3-af20ad7284e5` | Medium   | A user outside of the organization has access to a repository.            |
| GitHub: Public repository without security policy      | `11f7ed9c-40a8-4e0a-9689-19df73307917` | Medium   | A publicly-accessible repository does not have a security policy enabled. |
| GitHub: Repository with deploy key older than 180 days | `cac9da2a-1dc5-4994-988b-628e167fb041` | Low      | A repository deploy key has not been rotated in 180 days or more.         |

### Branches and merges

| Finding                                                                | Finding type ID | Severity | Description                                                                                                              |
| ---------------------------------------------------------------------- | --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| Repository Default Branch does not have Branch Protection rules        |                 | High     | A repository's default branch does not have any branch protection rules enabled.                                         |
| Default Branch Protection does not have PR Review required             |                 | High     | A repository's default branch does not have a **Require pull request reviews before merging** rule.                      |
| Default Branch Protection does not have forced pushes disabled         |                 | Medium   | A repository's default branch has enabled **Allow force pushes**.                                                        |
| Default Branch Protection does not have stale PR approvals disabled    |                 | Medium   | A repository's default branch does not have a **Dismiss stale pull request approvals when new commits are pushed** rule. |
| Default Branch Protection does not have admin restrictions             |                 | Low      | A repository's default branch does not have a **Do not allow bypassing the above settings** rule for administrators.     |
| Default Branch Protection does not have deletions disabled             |                 | Low      | A repository's default branch has enabled **Allow deletions**.                                                           |
| Default Branch Protection does not have status check failures disabled |                 | Low      | A repository's default branch does not have a **Require status checks to pass before merging** rule.                     |

| Default branch without branch protection rules                                                 | `180b0e4c-2cc9-4fe8-86fd-8357c0ebe15e` | High     |
| GitHub: Repository Default Branch Protection does not have PR Review Required                  | `edd3f193-af01-421d-9a50-cb1d147bf3a6` | Medium   |
| GitHub: Repository Default Branch Protection does not have Force Pushes Disabled               | `efc3e582-ef39-4316-b1f3-d4717ef30867` | Medium   |
| GitHub: Repository Default Branch Protection does not have Stale PR Approvals Disabled         | `7dc170d7-b1ef-4138-95fb-403d16e7ed43` | Medium   |
| Default branch protection rule without admin restrictions                                      | `5b0995b5-0d2d-4526-a6e1-b2f91341e650` | Low      |
| GitHub: Repository Default Branch Protection does not have Admin Restrictions                  | `4e4aec5b-e763-41ac-9099-af874606959b` | Medium   |
| Default branch protection rule allowing forced pushes                                          | `c571f9fa-147d-4753-abc8-577eab7c40fc` | Medium   |
| Default branch protection rule allows status check failure                                     | `8112fa9b-9dee-4ec2-bed5-ef9cd7a457a7` | Low      |
| Default branch protection rule allows stale pull request approvals                             | `7d436500-a7fb-4ef1-8769-425fab8052a0` | Medium   |
| GitHub: Repository has no Default Branch Protection                                            | `5a0428fa-5c13-44b8-a028-9351c1d10a91` | Medium   |
| Default branch protection rule allowing deletions                                              | `1fb3d234-3e4f-446b-b2f0-94cb26128db0` | Low      |
| GitHub: Repository Default Branch Protection does not have Status Checks                       | `1eba1aeb-9827-4a03-9c47-8290bd3a83d5` | Medium   |
| Default branch protection rule without PR review requirement                                   | `05b7b467-0169-42e8-9ea2-2b097989494b` | High     |

Learn more about [GitHub branch protection rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule).

### Dependencies

| Finding                                                         | Finding type ID                        | Severity | Description                                                              |
| --------------------------------------------------------------- | -------------------------------------- | -------- | ------------------------------------------------------------------------ |
| GitHub: Critical Vulnerabilities found in Repository dependency | `3137895f-494e-4d72-a588-9df33d95acd8` | Critical | A dependency used in a repository has a critical severity vulnerability. |
| GitHub: High Vulnerabilities Found in Repository Dependency     | `2915f8ed-5947-4c5b-a5f9-61221ec97208` | High     | A dependency used in a repository has a high severity vulnerability.     |
| GitHub: Moderate Vulnerabilities Found in Repository Dependency | `c369d498-0c97-45ad-8e77-8d2d20cc858c` | Medium   | A dependency used in a repository has a medium severity vulnerability.   |
| GitHub: Low Vulnerabilities Found in Repository Dependency      | `971a773a-ddca-446f-a19b-2262ada4be04` | Low      | A dependency used in a repository has a low severity vulnerability.      |

Learn more about [GitHub Dependabot alerts](https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts).

### User accounts

| Finding                         | Finding type ID | Severity | Description                                                                                              |
| ------------------------------- | --------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| Organization 2FA disabled       |                 | Critical | An organization does not have its organization-wide two-factor authentication (2FA) requirement enabled. |
| Organization Member without 2FA |                 | Medium   | A member of the organization does not have two-factor authentication (2FA) enabled.                      |

| Two factor authentication disabled for GitHub Organization                                     | `e582ce95-1364-43bc-92c1-bec6372ac166` | Critical |
| GitHub: Organization two-factor authentication disabled                                        | `47d01030-0ed8-496d-9484-f77899b21d59` | High     |
| GitHub: Organization user two-factor authentication disabled                                   | `dfed92b2-a45e-46ed-a86b-8c7e3db01f3c` | High     |
| Github User does not have Two Factor Authentication enabled                                    | `84d1f78e-7abe-449d-ae8d-218f4cc281df` | Medium   |

| Finding Type                                                                                   | Finding Type ID                        | Severity |
| ---------------------------------------------------------------------------------------------- | -------------------------------------- | -------- |
| GitHub: Organization repository has default WRITE permission                                   | `fc074da0-1e1c-4982-8673-0852d70bf80c` | Medium   |
| GitHub: Repository not updated in 12+ months                                                   | `68b6ef6d-7e00-4761-b3f1-fcf323dc9c26` | Medium   |
