---
pcx-content-type: reference
title: API commands
weight: 5
---

# API commands

Use the following API commands to manage advanced certificates. If you are using our API for the first time, review our [API Quickstart](/api).

<table>
  <thead>
    <tr>
      <th style="width:25%">Command</th>
      <th style="width:10%">Method</th>
      <th style="width:40%">Endpoint</th>
      <th style="width:25%">Additional notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href= "https://api.cloudflare.com/#certificate-packs-order-advanced-certificate-manager-certificate-pack">Order Advanced Certificate</a></td>
      <td><Code>POST</Code></td>
      <td><Code>zones/:zone/ssl/certificate_packs/order</Code></td>
      <td></td>
    </tr>
    <tr>
      <td><a href= "https://api.cloudflare.com/#certificate-packs-restart-validation-for-advanced-certificate-manager-certificate-pack">Restart validation for an Advanced Certificate Manager certificate pack</a></td>
      <td><Code>PATCH</Code></td>
      <td><Code>zones/:zone/ssl/certificate_packs/:certificate_pack</Code></td>
      <td></td>
    </tr>
    <tr>
      <td><a href= "https://api.cloudflare.com/#certificate-packs-delete-advanced-certificate-manager-certificate-pack">Delete Advanced Certificate Manager certificate pack</a></td>
      <td><Code>DELETE</Code></td>
      <td><Code>zones/:zone/ssl/certificate_packs/:certificate_pack</Code></td>
      <td></td>
    </tr>
    <tr>
      <td><a href= "https://api.cloudflare.com/#certificate-packs-list-certificate-packs">List all Advanced Certificate Manager certificate packs</a></td>
      <td><Code>GET</Code></td>
      <td><Code>zones/:zone/ssl/certificate_packs?status=all</Code></td>
      <td>This API call returns all certificate packs for a domain (Universal, Custom, and Advanced).</td>
    </tr>
    <tr>
      <td><a href= "https://api.cloudflare.com/#zone-settings-get-ciphers-setting">List Cipher Suite settings</a></td>
      <td><Code>GET</Code></td>
      <td><Code>zones/:zone/settings/ciphers</Code></td>
      <td></td>
    </tr>
    <tr>
      <td><a href= "https://api.cloudflare.com/#zone-settings-change-ciphers-setting">Change Cipher Suite settings</a></td>
      <td><Code>PATCH</Code></td>
      <td><Code>zones/:zone/settings/ciphers</Code></td>
      <td>To restore default settings, send a blank array in the <code>value</code> parameter.</td>
      <td></td>
    </tr>
  </tbody>
</table>
