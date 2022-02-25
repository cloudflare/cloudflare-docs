---
order: 6
pcx-content-type: concept
---

# WARP sessions for Gateway policies

Cloudflare Zero Trust allows you to enforce sessions on Gateway Network and HTTP policies. Once a session expires, a user will be prompted to re-authenticate with the identity provider they used to enroll in the WARP client.

You can configure a WARP session for any Allow policy. To configure a session:

1. Navigate to either **Gateway > Policies > Network** or **Gateway > Policies > HTTP**.
1. Create a policy and select the *Allow* action. Alternatively, choose any existing *Allow* policy.
1. Under **Step 4 - Configure policy settings**, select a session expiration time.
1. Save the policy.

<Aside type='Warning'>

For WARP sessions to function correctly with Gateway policies, end users must have the latest beta version of the WARP client installed on their devices. Gateway policies with WARP sessions configured will automatically block users who do not have the latest beta version of the client installed.

</Aside>
