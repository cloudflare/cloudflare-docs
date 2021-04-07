---
order: 1
---

# Deployment Parameters

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

## Parameters

Each client supports the following set of parameters as part of their deployment, regardless of the deployment mechanism.

<TableWrap>
  <table>
    <thead>
      <tr>
        <th>Field</th>
        <th>Required</th>
        <th>Value Type</th>
        <th>Example</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>organization</td>
        <td>yes</td>
        <td>string</td>
        <td>mycompanyname</td>
        <td>The organization name (auth domain) you set when originally creating your Cloudflare for Teams account. If your auth domain is https://example.cloudflareaccess.com you would enter <Code>example</Code>.</td>
      </tr>
      <tr>
        <td>gateway_unique_id</td>
        <td>no</td>
        <td>string</td>
        <td>fix7p31bzg</td>
        <td>Your Gateway DoH subdomain. <a href="https://developers.cloudflare.com/gateway/connecting-to-gateway/with-client">Get this value</a>
        </td>
      </tr>
      <tr>
        <td>enable</td>
        <td>no</td>
        <td>boolean</td>
        <td>true</td>
        <td>Boolean true or false if the end user is allowed to turn off the client. If set to True, the client is always enabled and the user is unable to disconnect. If set to false, the client can disable the WARP Client at anytime.</td>
      </tr>
      <tr>
        <td>service_mode</td>
        <td>no</td>
        <td>string</td>
        <td>warp</td>
        <td>Allows you to choose between Gateway only more or Gateway w/WARP+<br /><br />
        Accepted values:<br />
        <i>1dot1</i> = Gateway ONLY DNS/URL filtering<br />
        <i>warp</i> = Gateway w/ WARP+<br />
        </td>
      </tr>
      <tr>
        <td>support_url</td>
        <td>no</td>
        <td>string</td>
        <td>https://support.example.com</td>
        <td>Provide a web url or mailto that will change in-app feedback mechanism to point at your IT department for support.<br /><br />
        Examples:<br />
        https://support.example.com<br />
        mailto:example@example.com<br /><br />
        <b>Note:</b> If this value is not supplied the in-app feedback mechanism will be disabled.
        </td>
      </tr>
    </tbody>
  </table>
</TableWrap>

## Frequently Asked Questions

### What happens if I don't supply a Gateway DoH subdomain?
A DoH subdomain value is only required if you configure DNS Filtering.

### How do I obtain logs in the event of an issue with client?
The macOS and Windows clients installations each contain an application in their installed folders called warp-diag that can be used to obtain logs.
