---
pcx-content-type: reference
title: Configuration examples
weight: 0
---

# Configuration examples

## Anycast GRE or IPsec tunnel configuration example

<table>
  <thead>
    <tr>
      <th style='min-width:70px'>Anycast GRE or IPsec tunnel</th>
      <th style='min-width:125px'>Customer edge IP</th>
      <th style='min-width:100px'>Anycast IP</th>
      <th style='min-width:130px'>Private subnet</th>
      <th style='min-width:115px'>Customer private IP</th>
      <th style='min-width:100px'>Cloudflare private IP</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GRE_1_IAD</td>
      <td>104.18.112.75</td>
      <td>Anycast IP 1</td>
      <td>10.10.10.100/31</td>
      <td>10.10.10.100</td>
      <td>10.10.10.101</td>
    </tr>
    <tr>
      <td>GRE_2_IAD</td>
      <td>104.18.112.75</td>
      <td>Anycast IP 2</td>
      <td>10.10.10.102/31</td>
      <td>10.10.10.102</td>
      <td>10.10.10.103</td>
    </tr>
    <tr>
      <td>GRE_3_ATL</td>
      <td>104.40.112.125</td>
      <td>Anycast IP 1</td>
      <td>10.10.10.104/31</td>
      <td>10.10.10.104</td>
      <td>10.10.10.105</td>
    </tr>
    <tr>
      <td>GRE_4_ATL</td>
      <td>104.40.112.125</td>
      <td>Anycast IP 2</td>
      <td>10.10.10.106/31</td>
      <td>10.10.10.106</td>
      <td>10.10.10.107</td>
    </tr>
  </tbody>
</table>

## Scoping configuration data example

The table below lists Anycast GRE or IPsec tunnel and their associated Cloudflare region codes.

<table>
 <thead>
  <tr>
   <th>Anycast GRE or IPsec tunnel</th>
   <th>Region code</th>
   </tr>
  </thead>
  <tbody>
  <tr>
     <td>GRE_1_IAD</td>
     <td>AFR</td>
  </tr>
  <tr>
    <td>GRE_2_IAD</td>
    <td>EEUR</td>
  </tr>
  <tr>
    <td>GRE_3_ATL</td>
    <td>ENAM</td>
  </tr>
  <tr>
    <td>GRE_4_ATL</td>
    <td>ME</td>
    </tr>
</tbody>
</table>

## Regions and Region Codes

Cloudflare has nine geographic regions across the world. This table lists region codes and their associated regions.

<table>
  <thead>
    <tr>
      <th>Region code</th>
      <th>Region</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>AFR</td>
    <td>Africa
    </td>
    </tr>
    <tr>
    <td>APAC</td>
    <td>Asia Pacific
    </td>
    </tr>
    <tr>
    <td>EEUR</td>
    <td>Eastern Europe
    </td>
    </tr>
    <tr>
    <td>ENAM</td>
    <td>Eastern North America
    </td>
    </tr>
    <tr>
    <td>ME</td>
    <td>Middle East
    </td>
    </tr>
    <tr>
    <td>OC</td>
    <td>Oceania
    </td>
    </tr>
    <tr>
    <td>SAM</td>
    <td>South America
    </td>
    </tr>
    <tr>
    <td>WEUR</td>
    <td>Western Europe
    </td>
    </tr>
    <tr>
    <td>WNAM</td>
    <td>Western North America
    </td>
    </tr>
  </tbody>
</table>
