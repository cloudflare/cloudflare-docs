---
pcx_content_type: reference
title: ServiceNow
rss: file
---

# ServiceNow

{{<render file="casb/_integration-description.md" withParameters="ServiceNow;;ServiceNow instance">}}

## Integration prerequisites

- `admin` access to a ServiceNow instance
- Ability to [create an OAuth API endpoint for external clients](https://docs.servicenow.com/csh?topicname=t_CreateEndpointforExternalClients)

## Integration permissions

For the ServiceNow integration to function, Cloudflare CASB requires the following permissions:

- `Global` application scope

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [ServiceNow Application scope documentation](https://docs.servicenow.com/bundle/utah-application-development/page/build/applications/concept/c_GlobalScope.html).

## Security findings

{{<render file="casb/_security-findings.md" withParameters="ServiceNow;;servicenow">}}

### Instance security

Identify security risks related to the ServiceNow instance itself.

| Finding                                                               | Severity |
| --------------------------------------------------------------------- | -------- |
| ServiceNow Production Instance with exposed admin credentials         | Critical |
| ServiceNow Production Instance with exposed database user credentials | High     |
| ServiceNow Instance with exposed admin credentials                    | High     |
| ServiceNow Instance with exposed database user credentials            | Medium   |

### User security

Flag user-related security risks and misconfigurations.

| Finding                                       | Severity |
| --------------------------------------------- | -------- |
| ServiceNow user with pending password reset   | High     |
| ServiceNow user with 3+ failed login attempts | Medium   |
| ServiceNow user with locked account           | Low      |
| ServiceNow user without MFA enabled           | Low      |
| ServiceNow user with no assigned roles        | Low      |
| ServiceNow user inactive                      | Low      |
| ServiceNow user without recent activity       | Low      |

### Incident management

Identify issues related to ServiceNow incidents.

| Finding                                                     | Severity |
| ----------------------------------------------------------- | -------- |
| ServiceNow incident with no assigned user and High Priority | High     |
| ServiceNow incident with no assigned user                   | Medium   |

### Knowledge management

Highlight potential misconfigurations in ServiceNow knowledge articles.

| Finding                                              | Severity |
| ---------------------------------------------------- | -------- |
| ServiceNow knowledge article without expiration date | Low      |
| ServiceNow knowledge article without any roles       | Low      |
| ServiceNow knowledge article with flagged status     | Low      |

### Integration and access

Detect issues related to ServiceNow integrations and access controls.

| Finding                                 | Severity |
| --------------------------------------- | -------- |
| ServiceNow Internal Integration user    | Low      |
| ServiceNow Web Service Access only user | Low      |
