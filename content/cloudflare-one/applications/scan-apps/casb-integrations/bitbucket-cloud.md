---
pcx_content_type: reference
title: Bitbucket Cloud
rss: file
---

# Bitbucket Cloud

{{<render file="casb/_integration-description.md" withParameters="Bitbucket Cloud;;Bitbucket Cloud account">}}

{{<Aside type="note">}}
This CASB integration does not currently support Bitbucket Data Center accounts.
{{</Aside>}}

## Integration prerequisites

- A Bitbucket Cloud plan (Free, Standard, Premium, Enterprise)

- Access to a Bitbucket Cloud account with Site admin and/or Organization admin permissions

## Integration permissions

For the Bitbucket Cloud integration to function, Cloudflare CASB requires the following permissions via an OAuth 2.0 app:

- `read:confluence-space.summary`
- `read:confluence-props`
- `read:confluence-content.all`
- `read:confluence-content.summary`
- `read:confluence-content.permission`
- `read:confluence-user`
- `read:confluence-groups`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [Bitbucket Cloud scopes documentation](https://developer.atlassian.com/cloud/bitbucket/rest/intro/#oauth-2-0).

## Security findings

{{<render file="casb/_security-findings.md" withParameters="Bitbucket Cloud;;bitbucket-cloud">}}

### Repository security

Flag user and third-party app access issues, including account misuse, sharing security, and users not following best practices.

| Finding                                                                                  | Finding Type ID                      | Severity |
| ---------------------------------------------------------------------------------------- | ------------------------------------ | -------- |
| Repository is publicly accessible                                                        | be273f0a-678e-49af-b9f8-8f3913acef97 | Critical |
| Repository Default Branch Protection does not have PR Review Required                    | 6ad95c13-0d13-4595-bc76-bd86f4eba4b9 | High     |
| Repository Default Branch Protection does not disable direct pushes for all users/groups | c60a7b00-1592-429a-8a32-d58101e4551f | Medium   |
| Repository not updated in 12+ months                                                     | a1bd3076-a68d-492e-9947-a01e15a4d1b3 | Medium   |
| Repository Default Branch Protection does not have Stale PR Approvals Disabled           | 738c9839-5e1e-4048-85a3-7935ec4c647a | Medium   |
| Repository Default Branch Protection does not have Force Pushes Disabled                 | 4c52f441-0c24-4dbd-8f5e-0e5b829ee8e2 | Medium   |
| Repository has no Default Branch Protection                                              | 324f2014-4d4b-4aa6-89a8-72a6c7da09d7 | Medium   |
| Repository Default Branch Protection does not require passing builds to merge            | afe4a27e-ee01-4ebe-914c-d480ac49a5c2 | Low      |
| Repository Default Branch Protection allows branch deletion                              | 86411562-4b85-4677-b048-7887cc5b1567 | Low      |
| Repository Default Branch Protection does not enforce merge checks                       | 64440d40-91de-4d13-9280-d5afa418ccf0 | Low      |
| Key is older than 180 days                                                               | 0a135600-a109-434f-877c-1a6594dcd76d | Low      |
