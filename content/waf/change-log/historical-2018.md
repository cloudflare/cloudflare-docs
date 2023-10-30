---
pcx_content_type: changelog
title: Historical (2018)
weight: 10050
meta:
    description: Changes to WAF managed rulesets done in 2018, before the public changelog was available.
layout: list
---

# Historical — 2018

{{<table-wrap>}}
<table style="width: 100%">
  <thead>
    <tr>
      <th>Ruleset</th>
      <th>Rule ID</th>
      <th>Description</th>
      <th>Change date</th>
      <th>Old action</th>
      <th>New action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100016_BETA</td>
      <td>Improved sensitive directories access</td>
      <td>2018-12-11</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035U_BETA</td>
      <td>Improved Baidu bot detection</td>
      <td>2018-12-06</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100026_BETA</td>
      <td>Improved PHP injection detection</td>
      <td>2018-12-06</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100118</td>
      <td>Improved SQLi detection</td>
      <td>2018-11-19</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100116</td>
      <td>
        For
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2018-9206"
          >CVE-2018-9206</a
        >, vulnerable jQuery File Uploader
      </td>
      <td>2018-11-19</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100117</td>
      <td>
        For
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2018-9206"
          >CVE-2018-9206</a
        >, vulnerable jQuery File Uploader
      </td>
      <td>2018-11-19</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100008_BETA</td>
      <td>Improved SQLi detection</td>
      <td>2018-11-12</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100114</td>
      <td>XSS probing detection</td>
      <td>2018-11-12</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100097</td>
      <td>libinjection based SQLi detection rule</td>
      <td>2018-10-29</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100097F</td>
      <td>libinjection based SQLi detection rule</td>
      <td>2018-10-29</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100070</td>
      <td>Block requests with invalid x-forwarded-for headers</td>
      <td>2018-10-22</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100107</td>
      <td>Improved XSS Probing detection</td>
      <td>2018-10-22</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100111</td>
      <td>Detect large numbers of GET parameters in requests</td>
      <td>2018-10-22</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100109</td>
      <td>Detect large numbers of GET parameters in requests</td>
      <td>2018-10-22</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100109B</td>
      <td>Detect large numbers of GET parameters in requests</td>
      <td>2018-10-22</td>
      <td>Log</td>
      <td>Log</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100110</td>
      <td>Detect large numbers of GET parameters in requests</td>
      <td>2018-10-22</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100112</td>
      <td>Block requests with duplicated headers</td>
      <td>2018-10-15</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0020</td>
      <td>WP allowlist</td>
      <td>2018-10-08</td>
      <td>Allow</td>
      <td>Allow</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0004</td>
      <td>WP allowlist</td>
      <td>2018-10-08</td>
      <td>Allow</td>
      <td>Allow</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100088B_BETA</td>
      <td>Improved XXE detection</td>
      <td>2018-10-08</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100030</td>
      <td>Improved XSS Probing detection</td>
      <td>2018-10-08</td>
      <td>Challenge</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021B</td>
      <td>Improved XSS Probing detection</td>
      <td>2018-10-08</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100030_BETA</td>
      <td>Improved XSS Probing detection</td>
      <td>2018-10-08</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100008CW_BETA</td>
      <td>Improved SQLi sleep probing</td>
      <td>2018-10-01</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100106</td>
      <td>Improved SQLi detection</td>
      <td>2018-10-01</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100009J_BETA</td>
      <td>Improved SQLi detection</td>
      <td>2018-10-01</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100009CB</td>
      <td>Improved SQLi detection</td>
      <td>2018-09-24</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100102</td>
      <td>
        Rules to stop file read and deletion vulnerabilities in Ghostscript
      </td>
      <td>2018-09-24</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100103</td>
      <td>
        Rules to stop file read and deletion vulnerabilities in Ghostscript
      </td>
      <td>2018-09-24</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>950907</td>
      <td>Additional OWASP rules can be disabled in UI</td>
      <td>2018-09-24</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>950008</td>
      <td>Additional OWASP rules can be disabled in UI</td>
      <td>2018-09-24</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>950010</td>
      <td>Additional OWASP rules can be disabled in UI</td>
      <td>2018-09-24</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>950011</td>
      <td>Additional OWASP rules can be disabled in UI</td>
      <td>2018-09-24</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>960008</td>
      <td>Additional OWASP rules can be disabled in UI</td>
      <td>2018-09-24</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>960015</td>
      <td>Additional OWASP rules can be disabled in UI</td>
      <td>2018-09-24</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>960009</td>
      <td>Additional OWASP rules can be disabled in UI</td>
      <td>2018-09-24</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100009C_BETA</td>
      <td>Improved SQLi detection</td>
      <td>2018-09-17</td>
      <td>Log</td>
      <td>Deleted</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100101</td>
      <td>Vulnerability in Ghostscript</td>
      <td>Emergency, 2018-09-12</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CE</td>
      <td>Improved XSS Detection</td>
      <td>2018-09-10</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100088B</td>
      <td>Improved XXE Detection</td>
      <td>2018-09-10</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100091B</td>
      <td>Improved XSS Detection</td>
      <td>2018-09-10</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100038</td>
      <td>
        Blocks requests to <code>/server_status</code>, which gives away information on how
        a server works.
      </td>
      <td>2018-09-06</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Plone</td>
      <td>PLONE0002</td>
      <td>Update rule regex</td>
      <td>2018-08-28</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CE_BETA</td>
      <td>Improved XSS Detection</td>
      <td>2018-08-28</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100030SVG_BETA</td>
      <td>Improved XSS Detection</td>
      <td>2018-08-28</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100090</td>
      <td>Improved XSS Detection</td>
      <td>2018-08-28</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100091</td>
      <td>Improved XSS Detection</td>
      <td>2018-08-28</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100092</td>
      <td>Improved XSS Detection</td>
      <td>2018-08-28</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100093</td>
      <td>Improved XSS Detection</td>
      <td>2018-08-28</td>
      <td>Log</td>
      <td>Log</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100063</td>
      <td>Reduction in false positives</td>
      <td>2018-08-13</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035C</td>
      <td>Improved detection of fake google bots</td>
      <td>Emergency, 2018-08-13</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100095</td>
      <td>Rules to block cache poisoning attacks</td>
      <td>Emergency, 2018-08-13</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100095B</td>
      <td>Rules to block cache poisoning attacks</td>
      <td>Emergency, 2018-08-13</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0003</td>
      <td>Disable login</td>
      <td>2018-08-13</td>
      <td>Allow</td>
      <td>Allow</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0025B</td>
      <td>
        Reduce the false positives WP0025B caused in the Gutenberg WordPress
        editor.
      </td>
      <td>2018-08-08</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0025D</td>
      <td>
        Reduce the false positives WP0025B caused in the Gutenberg WordPress
        editor.
      </td>
      <td>2018-08-08</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0006</td>
      <td>
        Attempt to address SA-CORE-2018-005 by matching certain headers.
      </td>
      <td>Emergency, 2018-08-03</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0007</td>
      <td>
        Attempt to address SA-CORE-2018-005 by matching certain headers.
      </td>
      <td>Emergency, 2018-08-03</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0008</td>
      <td>
        Attempt to address SA-CORE-2018-005 by matching certain headers.
      </td>
      <td>Emergency, 2018-08-03</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0009</td>
      <td>
        Attempt to address SA-CORE-2018-005 by matching certain headers.
      </td>
      <td>Emergency, 2018-08-03</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0010</td>
      <td>
        Attempt to address SA-CORE-2018-005 by matching certain headers.
      </td>
      <td>Emergency, 2018-08-03</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0011</td>
      <td>
        Attempt to address SA-CORE-2018-005 by matching certain headers.
      </td>
      <td>Emergency, 2018-08-03</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0012</td>
      <td>
        Attempt to address SA-CORE-2018-005 by matching certain headers.
      </td>
      <td>Emergency, 2018-08-03</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0013</td>
      <td>
        Attempt to address SA-CORE-2018-005 by matching certain headers.
      </td>
      <td>Emergency, 2018-08-03</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0014</td>
      <td>
        Attempt to address SA-CORE-2018-005 by matching certain headers.
      </td>
      <td>Emergency, 2018-08-03</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100089</td>
      <td>Improved SQLi detection</td>
      <td>2018-07-30</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}
