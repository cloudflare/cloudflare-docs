---
pcx_content_type: changelog
title: Historical (2022)
weight: 10046
meta:
  description: Changes to WAF managed rulesets done in 2022.
layout: wide
---

# Historical - 2022

{{<table-wrap>}}
<table style="width: 100%">
  <thead>
    <tr>
      <th>Ruleset</th>
      <th>Rule ID</th>
      <th>Legacy Rule ID</th>
      <th>Description</th>
      <th>Change Date</th>
      <th>Old Action</th>
      <th>New Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...2aede3db</td>
      <td>100554</td>
      <td>Openam - Remote Code Execution - CVE:CVE-2021-35464</td>
      <td>2022-12-12</td>
      <td>N/A</td>
      <td>Disabled</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...2ab75038</td>
      <td>100556</td>
      <td>Apache JXPath Library - Code Injection - CVE:CVE-2022-41852</td>
      <td>2022-12-12</td>
      <td>N/A</td>
      <td>Disabled</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...b8ef67d7</td>
      <td>N/A</td>
      <td>SQLi - Equation</td>
      <td>2022-11-29</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...128f1556</td>
      <td>N/A</td>
      <td>SQLi - Generic</td>
      <td>2022-11-14</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...b9cfd82d</td>
      <td>100552</td>
      <td>JXPath RCE - CVE:CVE-2022-41852</td>
      <td>2022-10-31</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...66edb651</td>
      <td>100555</td>
      <td>Apache Commons Text - Code Injection - CVE:CVE-2022-42889</td>
      <td>Emergency, 2022-10-18</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...1bc977d1</td>
      <td>100005</td>
      <td>
        <p>DotNetNuke - File Inclusion - CVE:CVE-2018-9126, CVE:CVE-2011-1892, CVE:CVE-2022-31474</p>
        This detection was announced as ...845e3ec7 on new WAF.
      </td>
      <td>2022-10-17</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Sensitive Data Disclosure (SDD)</td>
      <td>...eebf3863</td>
      <td>N/A</td>
      <td>
        <p>California Driver's License</p>
        This detection is part of Sensitive Data Disclosure (SDD).
      </td>
      <td>2022-10-17</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Sensitive Data Disclosure (SDD)</td>
      <td>...5b82d61c</td>
      <td>N/A</td>
      <td>
        <p>Florida Driver's License</p>
        This detection is part of Sensitive Data Disclosure (SDD).
      </td>
      <td>2022-10-17</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Sensitive Data Disclosure (SDD)</td>
      <td>...d47285a0</td>
      <td>N/A</td>
      <td>
        <p>Illinois Driver's License</p>
        This detection is part of Sensitive Data Disclosure (SDD).
      </td>
      <td>2022-10-17</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Sensitive Data Disclosure (SDD)</td>
      <td>...9f7200b4</td>
      <td>N/A</td>
      <td>
        <p>New York Driver's License</p>
        This detection is part of Sensitive Data Disclosure (SDD).
      </td>
      <td>2022-10-17</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Sensitive Data Disclosure (SDD)</td>
      <td>...440ec8b9</td>
      <td>N/A</td>
      <td>
        <p>UK Driver's License</p>
        This detection is part of Sensitive Data Disclosure (SDD).
      </td>
      <td>2022-10-17</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Sensitive Data Disclosure (SDD)</td>
      <td>...c78cf1e1</td>
      <td>N/A</td>
      <td>
        <p>UK National Insurance Number</p>
        This detection is part of Sensitive Data Disclosure (SDD).
      </td>
      <td>2022-10-17</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Sensitive Data Disclosure (SDD)</td>
      <td>...0f8f2657</td>
      <td>N/A</td>
      <td>
        <p>UK Passport</p>
        This detection is part of Sensitive Data Disclosure (SDD).
      </td>
      <td>2022-10-17</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Sensitive Data Disclosure (SDD)</td>
      <td>...5fe4101e</td>
      <td>N/A</td>
      <td>
        <p>US Passport</p>
        This detection is part of Sensitive Data Disclosure (SDD).
      </td>
      <td>2022-10-17</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Sensitive Data Disclosure (SDD)</td>
      <td>...0a290153</td>
      <td>N/A</td>
      <td>
        <p>Wisconsin Driver's License</p>
        This detection is part of Sensitive Data Disclosure (SDD).
      </td>
      <td>2022-10-17</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...e0de97a2</td>
      <td>100553</td>
      <td>FortiOS - Authentication Bypass - CVE:CVE-2022-40684</td>
      <td>Emergency, 2022-10-14</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...ee9bb2f5</td>
      <td>100549</td>
      <td>Atlassian Bitbucket - Code Injection - CVE:CVE-2022-36804</td>
      <td>2022-10-10</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...1d870399</td>
      <td>100546</td>
      <td>XSS - HTML Encoding</td>
      <td>2022-10-03</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...e09c1a1e</td>
      <td>100551</td>
      <td>Microsoft Exchange SSRF and RCE vulnerability - CVE:CVE-2022-41040, CVE:CVE-2022-41082</td>
      <td>Emergency, 2022-10-03</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td> ...ee9bb2f5</td>
      <td>100549</td>
      <td>Atlassian Bitbucket - Code Injection - CVE:CVE-2022-36804</td>
      <td>Emergency, 2022-09-20</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...cfd0fac1</td>
      <td>100135A</td>
      <td>
        <p>XSS - JavaScript Events</p>
        This detection was announced in BETA with ID ...92c2ad9f on new WAF and ID 100135A_BETA on legacy WAF.
      </td>
      <td>2022-09-12</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...e09c1a1e</td>
      <td>100542</td>
      <td>
        <p>Broken Authentication - VMware - CVE:CVE-2022-31656, CVE:CVE-2022-22972</p>
        This detection was announced in BETA with ID ...df7d4d7b on new WAF and ID 100542_BETA on legacy WAF.
      </td>
      <td>2022-09-12</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...36fe4cbb</td>
      <td>100547</td>
      <td>Sophos Firewall Auth Bypass Vulnerability - CVE:CVE-2022-1040</td>
      <td>2022-09-12</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...4529da66</td>
      <td>100504</td>
      <td>Atlassian - CVE:CVE-2021-26086</td>
      <td>2022-09-12</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...b090ba9a</td>
      <td>100303</td>
      <td><p>Command Injection - Nslookup</p>This detection was announced in BETA with ID ...d5488862 on new WAF and ID 100303_BETA on legacy WAF.</td>
      <td>2022-09-05</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...3a9dc737</td>
      <td>100532B</td>
      <td>Vulnerability scanner activity 2</td>
      <td>2022-08-30</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...9b16ea5e</td>
      <td>N/A</td>
      <td>CVE-2020-13443</td>
      <td>2022-08-30</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...fd9eb416</td>
      <td>100541</td>
      <td>Code Injection - WordPress Weblizar Backdoor - CVE:CVE-2022-1609</td>
      <td>2022-08-22</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...e09c1a1e</td>
      <td>100542</td>
      <td>Broken Authentication - VMware - CVE:CVE-2022-31656</td>
      <td>2022-08-22</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...9ff2129f</td>
      <td>100544</td>
      <td>Zimbra - Command Injection - CVE:CVE-2022-27925, CVE:CVE-2022-30333</td>
      <td>2022-08-22</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...94700cae</td>
      <td>N/A</td>
      <td>Drupal, Magento, PHP - Deserialization - CVE:CVE-2019-6340, CVE:CVE-2016-4010 - 2</td>
      <td>2022-08-22</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...1bc977d1</td>
      <td>100005</td>
      <td>DotNetNuke - File Inclusion - CVE:CVE-2018-9126, CVE:CVE-2011-1892</td>
      <td>2022-08-22</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...8e2e15a5</td>
      <td>N/A</td>
      <td>SQLi - Strict</td>
      <td>2022-08-15</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...25ba9d7c</td>
      <td>N/A</td>
      <td>SSRF - Cloud</td>
      <td>2022-08-15</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...8242627b</td>
      <td>N/A</td>
      <td>SSRF - Local</td>
      <td>2022-08-15</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...74a51804</td>
      <td>N/A</td>
      <td>SSRF - Host</td>
      <td>2022-08-15</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...d77be6e7</td>
      <td>100540</td>
      <td>XSS, Code Injection - Elementor - CVE:CVE-2022-29455</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...b21a6d17</td>
      <td>100539</td>
      <td>Alibaba Fastjson Remote Code Execution - CVE:CVE-2022-25845</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...49e6b538</td>
      <td>100534</td>
      <td>Webshell Activity</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...8d667511</td>
      <td>N/A</td>
      <td>NoSQL, MongoDB - SQLi - Comparison</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...6418cd0a</td>
      <td>N/A</td>
      <td>NoSQL, MongoDB - SQLi - Expression</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...0d64e8c3</td>
      <td>N/A</td>
      <td>PostgreSQL - SQLi - COPY</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...fe93af88</td>
      <td>N/A</td>
      <td>SQLi - AND/OR Digit Operator Digit</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...5dfbd021</td>
      <td>N/A</td>
      <td>SQLi - AND/OR Digit Operator Digit - 2</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...95cb1c78</td>
      <td>N/A</td>
      <td>SQLi - AND/OR MAKE_SET/ELT</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...33a94329</td>
      <td>N/A</td>
      <td>SQLi - Benchmark Function</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...a0ac8609</td>
      <td>N/A</td>
      <td>SQLi - Equation</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...e3f62041</td>
      <td>N/A</td>
      <td>SQLi - ORD and ASCII</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...5dcf99b7</td>
      <td>N/A</td>
      <td>SQLi - <code>SELECT</code> Expression</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...2514d20d</td>
      <td>N/A</td>
      <td>SQLi - Sleep Function</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...cf1914a0</td>
      <td>N/A</td>
      <td>SQLi - String Concatenation</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...484037ce</td>
      <td>N/A</td>
      <td>SQLi - String Function</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...42123a6c</td>
      <td>N/A</td>
      <td>SQLi - Sub Query</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...d7aa0008</td>
      <td>N/A</td>
      <td>SQLi - <code>UNION</code> in MSSQL</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...3306fcc2</td>
      <td>N/A</td>
      <td>SQLi - WaitFor Function</td>
      <td>2022-08-01</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...1651d0c8</td>
      <td>100536</td>
      <td>GraphQL Injection</td>
      <td>2022-07-25</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...6a648210</td>
      <td>100537</td>
      <td>Oracle ADF Remote Code Execution - CVE:CVE-2022-21445</td>
      <td>2022-07-25</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...2753531e</td>
      <td>100533</td>
      <td>NoSQL - Injection</td>
      <td>2022-07-18</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...49e6b538</td>
      <td>100534</td>
      <td>Web Shell Activity</td>
      <td>2022-07-18</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...851d2f71</td>
      <td>100007C</td>
      <td>Command Injection - Common Attack Commands</td>
      <td>2022-07-18</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...aa290ad9</td>
      <td>100135D</td>
      <td>XSS - JS On Events</td>
      <td>2022-07-18</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>N/A</td>
      <td>100045B</td>
      <td>Anomaly:Header, Directory Traversal - Multiple Slashes, Relative Paths,
  CR, LF or NULL</td>
      <td>2022-07-06</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...34780914</td>
      <td>100532</td>
      <td>Vulnerability scanner activity</td>
      <td>2022-07-05</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...d503ded0</td>
      <td>N/A</td>
      <td>XSS, HTML Injection</td>
      <td>2022-06-20</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...fd09a0e6</td>
      <td>N/A</td>
      <td>XSS - JavaScript Events</td>
      <td>2022-06-20</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td> ...f4b0220e</td>
      <td>100703</td>
      <td>Validate Headers</td>
      <td>Emergency, 2022-06-10</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td> ...408cff2b</td>
      <td>100531</td>
      <td>Atlassian Confluence - Code Injection - CVE:CVE-2022-26134 (rule improvement)</td>
      <td>Emergency, 2022-06-07</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...0c99546a</td>
      <td>100702</td>
      <td>Command Injection - CVE:CVE-2022-24108</td>
      <td>2022-06-06</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...e184d050</td>
      <td>100701</td>
      <td>Command Injection - CVE:CVE-2022-30525</td>
      <td>2022-06-06</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...56c390a1</td>
      <td>N/A</td>
      <td>DotNetNuke - File Inclusion - CVE:CVE-2018-9126, CVE:CVE-2011-1892 2</td>
      <td>2022-06-06</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...3456f611</td>
      <td>N/A</td>
      <td>XXE - System Function</td>
      <td>2022-06-06</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...ae5baf61</td>
      <td>100005</td>
      <td>DotNetNuke - File Inclusion - CVE:CVE-2018-9126, CVE:CVE-2011-1892</td>
      <td>2022-06-06</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td> ...bb44c04a</td>
      <td>100531B</td>
      <td>Atlassian Confluence - Code Injection - Extended - CVE:CVE-2022-26134</td>
      <td>Emergency, 2022-06-04</td>
      <td>N/A</td>
      <td>Disabled</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td> ...408cff2b</td>
      <td>100531</td>
      <td>Atlassian Confluence - Code Injection - CVE:CVE-2022-26134 (rule improvement)</td>
      <td>Emergency, 2022-06-04</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td> ...408cff2b</td>
      <td>100531</td>
      <td>Atlassian Confluence - Code Injection - CVE:CVE-2022-26134</td>
      <td>Emergency, 2022-06-03</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td> ...408cff2b</td>
      <td>100531</td>
      <td>Atlassian Confluence - Code Injection - CVE:CVE-2022-26134 (rule improvement)</td>
      <td>Emergency, 2022-06-03</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td> ...408cff2b</td>
      <td>100531</td>
      <td>Atlassian Confluence - Code Injection - CVE:CVE-2022-26134 (rule improvement)</td>
      <td>Emergency, 2022-06-03</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...0d20ddd9</td>
      <td>100054</td>
      <td>Improve Apache Struts detection. Merge 100054_BETA into 100054 and ...f0c856b4 into ...0d20ddd9.
      Apache Struts - Command Injection - CVE:CVE-2017-5638.</td>
      <td>2022-05-30</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...e1787c92</td>
      <td>N/A</td>
      <td>Microsoft Exchange - Code Injection</td>
      <td>2022-05-16</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Specials</td>
      <td> ...d6e3073f</td>
      <td>100530</td>
      <td>Command Injection - RCE in BIG-IP - CVE:CVE-2022-1388</td>
      <td>Emergency, 2022-05-10</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...02a9ee96</td>
      <td>100528</td>
      <td>Code Injection - CVE:CVE-2022-29078</td>
      <td>2022-05-09</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...422313d0</td>
      <td>100529</td>
      <td>VMware vCenter - CVE:CVE-2021-22054</td>
      <td>2022-05-09</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...370dc796</td>
      <td>N/A</td>
      <td>PostgreSQL - SQLi, Command Injection - CVE:CVE-2019-9193</td>
      <td>2022-05-09</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...61337861</td>
      <td>100056_BETA</td>
      <td>Apache Struts - Code Injection - CVE:CVE-2017-9791 - Beta</td>
      <td>2022-04-25</td>
      <td>Disable</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...bb70a463</td>
      <td>100527</td>
      <td>Apache Struts - CVE:CVE-2021-31805</td>
      <td>2022-04-25</td>
      <td>Disable</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...a24f08b7</td>
      <td>100526</td>
      <td>VMware vCenter - CVE:CVE-2022-22954</td>
      <td>2022-04-25</td>
      <td>Disable</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...4343ef6b</td>
      <td>N/A</td>
      <td>Anomaly:Header:X-Forwarded-Host</td>
      <td>2022-04-20</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...ad8ba4bc</td>
      <td>N/A</td>
      <td>Anomaly:Header:Content-Length - Missing in POST</td>
      <td>2022-04-20</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...cc74ff69</td>
      <td>N/A</td>
      <td>Anomaly:Header:Accept - Missing or Empty</td>
      <td>2022-04-20</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...041699fb</td>
      <td>N/A</td>
      <td>Practico CMS - SQLi</td>
      <td>2022-04-20</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...4751ef80</td>
      <td>N/A</td>
      <td>Joomla - Anomaly:Header:User-Agent</td>
      <td>2022-04-20</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...f2cc4e84</td>
      <td>100524</td>
      <td>Spring - Code Injection</td>
      <td>2022-04-11</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...4e742bb6</td>
      <td>N/A</td>
      <td>Drupal - Header Injection - CVE:CVE-2018-14774</td>
      <td>2022-04-11</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...e46c6d76</td>
      <td>N/A</td>
      <td>Drupal - XSS - CVE:CVE-2018-9861</td>
      <td>2022-04-11</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Specials</td>
      <td> ...f2cc4e84</td>
      <td>100524</td>
      <td>Spring - Code Injection</td>
      <td>Emergency, 2022-04-04</td>
      <td>Simulate</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Specials</td>
      <td>...fbe6c869</td>
      <td>100522</td>
      <td>Spring - CVE:CVE-2022-22947</td>
      <td>Emergency, 2022-04-04</td>
      <td>Simulate</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Specials</td>
      <td> ...f2cc4e84</td>
      <td>100524</td>
      <td>Spring - Code Injection</td>
      <td>Emergency, 2022-03-31</td>
      <td>N/A</td>
      <td>Simulate</td>
    </tr>
    <tr>
      <td>Specials</td>
      <td>...fbe6c869</td>
      <td>100522</td>
      <td>Spring - CVE:CVE-2022-22947</td>
      <td>Emergency, 2022-03-29</td>
      <td>N/A</td>
      <td>Simulate</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...e7c9a2c4</td>
      <td>100519B</td>
      <td>Magento - CVE:CVE-2022-24086</td>
      <td>2022-03-14</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...a37c3733</td>
      <td>100520</td>
      <td>Apache - CVE:CVE-2022-24112</td>
      <td>2022-03-14</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...664ed6fe</td>
      <td>100015</td>
      <td>Anomaly:Port - Non Standard Port (not 80 or 443)</td>
      <td>2022-03-14</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...5723bcc9</td>
      <td>100022</td>
      <td>Anomaly:Method - Not <code>GET</code> or <code>POST</code></td>
      <td>2022-03-14</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...3fccf643</td>
      <td>100519</td>
      <td>Magento - CVE:CVE-2022-24086</td>
      <td>2022-03-07</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...5ea3d579</td>
      <td>100518</td>
      <td>SAP - Code Injection - CVE:CVE-2022-22532</td>
      <td>2022-02-28</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...69e0b97a</td>
      <td>100400</td>
      <td>
        Atlassian Confluence - Code Injection - CVE:CVE-2021-26084 - Improve
        Rule Coverage
      </td>
      <td>2022-02-21</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>N/A</td>
      <td>PHP100001</td>
      <td>
        PHP - Command Injection - CVE:CVE-2012-2336, CVE:CVE-2012-2311,
        CVE:CVE-2012-1823
      </td>
      <td>2022-02-14</td>
      <td>Challenge</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...dc29b753</td>
      <td>100515B</td>
      <td>Log4j Body Obfuscation</td>
      <td>2022-02-14</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>...69fe1e0d</td>
      <td>100700</td>
      <td>Apache SSRF vulnerability CVE-2021-40438</td>
      <td>2022-01-24</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}
