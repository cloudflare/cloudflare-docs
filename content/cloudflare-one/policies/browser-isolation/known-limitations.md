---
pcx_content_type: reference
title: Known limitations
weight: 9
---

# Known limitations

Below, you will find information regarding the current limitations for Browser Isolation.

## Website compatibility

Our Network Vector Rendering (NVR) technology allows us to deliver a secure remote computing experience without the bandwidth limitations of video streams. While we expect most websites to work perfectly, some browser features and web technologies are unsupported and will be implemented in the future:

- Webcam and microphone support is unavailable.
- Websites that use WebGL may not function.
- Netflix and Spotify Web Player are unavailable.

## Browser compatibility

- Modern Chromium, Google Chrome, Mozilla Firefox, Safari, Edge (Chromium) and Opera are supported.
- Internet Explorer 11 and below is unsupported.

## Isolating SAML applications

When Browser Isolation is [deployed in-line](/cloudflare-one/policies/browser-isolation/setup/) (for example, via WARP, Gateway proxy endpoint or Magic WAN) it is possible to configure a subset of traffic to be isolated. Browser Isolation segregates local and remote browsing contexts. Due to this, cross-domain interactions (such as single sign-on) may not function as expected.

### `POST` request returns `405` error 

This error typically occurs due to SAML HTTP-POST bindings. These are not yet supported between non-isolated Identity Providers (IdP) and isolated Service Providers (SP).

### Workarounds

The following workarounds enable isolating SAML applications with Browser Isolation.

#### Use SAML HTTP-Redirect bindings 

Configure your SAML implementation to use HTTP Redirect Bindings. This avoids the HTTP `405` error by using URL parameters to route SAMLResponse data into the isolated SP.

#### Clientless Web Isolation 

Direct your users to use access the application via [Clientless Web Isolation](/cloudflare-one/policies/browser-isolation/setup/clientless-browser-isolation/). Clientless Web Isolation implicitly isolates all traffic (both IdP and SP) and supports HTTP-POST SAML bindings.

For user convenience, [create a bookmark](/cloudflare-one/applications/bookmarks/) in Cloudflare Access for your application (for example, `https://<authdomain>.cloudflareaccess.com/browser/https://example.com`).

{{<Aside type="note">}}
IdP sessions are not shared between the non-isolated IdP and the Clientless Web Isolation IdP. Users will be prompted to establish an additional session with their IdP.
{{</Aside>}}

#### Isolate both Identity Provider and Service Provider 

The HTTP `405` error does not occur when both the IdP and SP are isolated.

{{<table-wrap>}}

| Order | Selector    | Operator | Value  | Action | 
| ------| ------------| ---------| -------|--------| 
| 1     | Application | In | Your Identity Provider, Your Application  | Isolate |

{{</table-wrap>}}

{{<Aside type="note">}}
SAML HTTP-POST attempts initiated from the remote browser are not forwarded to non-Isolated SPs. All SPs should be isolated to avoid SSO errors.
{{</Aside>}}

#### In-line SSO between Okta and Salesforce

Some applications that use HTTP-POST bindings (for example, Salesforce) complete SSO with an internal HTTP Redirect. Applying a Do Not Isolate policy to the SAML HTTP-POST endpoint enables the SAML flow to complete, and authenticate the user into the application in the remote browser.

{{<table-wrap>}}

<table>
  <tbody>
    <th colspan="1" rowspan="1">
      Order
    </th>
    <th colspan="1" rowspan="1">
      Selector
    </th>
    <th colspan="1" rowspan="1">
      Operator
    </th>
    <th colspan="1" rowspan="1">
      Value
    </th>
    <th colspan="1" rowspan="1">
      Action
    </th>
    <tr>
      <td colspan="1" rowspan="3">
      1
      </td>
      <td colspan="1" rowspan="1">
      Hostname
      </td>
      <td colspan="1" rowspan="1">
      In
      </td>
      <td colspan="1" rowspan="1">
      Your Salesforce Application Domain
      </td>
      <td colspan="1" rowspan="1">
      </td>
      <td colspan="1" rowspan="1">
      </td>
    </tr>
    <tr>
      <td colspan="3" rowspan="1">
      And
      </td>
      <td colspan="1" rowspan="1">
      </td>
      <td colspan="1" rowspan="1">
      </td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1">
      HTTP Method
      </td>
      <td colspan="1" rowspan="1">
      In
      </td>
      <td colspan="1" rowspan="1">
      POST
      </td>
      <td colspan="1" rowspan="1">
      Do Not Isolate
      </td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1">
      2
      </td>
      <td colspan="1" rowspan="1">
      Hostname
      </td>
      <td colspan="1" rowspan="1">
      In
      </td>
      <td colspan="1" rowspan="1">
      Your Salesforce application domain
      </td>
      <td colspan="1" rowspan="1">
      Isolate
      </td>
    </tr>
  </tbody>
</table>

{{</table-wrap>}}