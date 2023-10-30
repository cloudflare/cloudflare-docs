---
pcx_content_type: changelog
title: Historical (2020)
weight: 10048
meta:
    description: Changes to WAF managed rulesets done in 2020.
layout: list
---

# Historical — 2020

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
      <td>Cloudflare Drupal</td>
      <td>D0025</td>
      <td>CVE:CVE-2020-13671</td>
      <td>2020-12-14</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100048</td>
      <td>Improve body anomaly detection</td>
      <td>2020-12-02</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100502</td>
      <td>CVE:CVE-2020-13443</td>
      <td>2020-11-16</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0017</td>
      <td>WordPress - SQLi - CVE:CVE-2015-2213 fix</td>
      <td>2020-11-16</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100501</td>
      <td>
        Oracle WebLogic - Deserialization - CVE:CVE-2020-14882,
        CVE:CVE-2020-14883, CVE:CVE-2020-14750
      </td>
      <td>Emergency, 2020-11-05</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100164</td>
      <td>SaltStack - Command Injection - CVE-2020-16846</td>
      <td>Emergency, 2020-11-04</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100164_JSON</td>
      <td>SaltStack - Command Injection - CVE-2020-16846</td>
      <td>Emergency, 2020-11-04</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100164_YAML</td>
      <td>SaltStack - Command Injection - CVE-2020-16846</td>
      <td>Emergency, 2020-11-04</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100124</td>
      <td>Improve Command Injection detection</td>
      <td>2020-10-19</td>
      <td>Disabled</td>
      <td>Disabled</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100175</td>
      <td>Anomaly:Header:X-Up-Devcap-Post-Charset - Evasion</td>
      <td>2020-10-12</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100500</td>
      <td>October CMS - File Inclusion</td>
      <td>2020-10-12</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100600</td>
      <td>Improve XSS detection</td>
      <td>2020-10-05</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100016</td>
      <td>Improve Information Disclosure detection</td>
      <td>2020-09-28</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>100189</td>
      <td>WordPress - Command Injection</td>
      <td>2020-09-21</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100131</td>
      <td>Improve JSFuck XSS detection. Merges 100131_BETA into 100131.</td>
      <td>2020-09-21</td>
      <td>Disabled</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100131_BETA</td>
      <td>XSS - JSFuck</td>
      <td>2020-09-15</td>
      <td>N/A</td>
      <td>Log</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100173</td>
      <td>Improve XSS detection</td>
      <td>2020-09-07</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100304</td>
      <td>Improve performance</td>
      <td>2020-09-07</td>
      <td>Disabled</td>
      <td>Disabled</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100455</td>
      <td>XSS - Catch Injection</td>
      <td>2020-09-07</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100065</td>
      <td>Anomaly:URL:Query String - Relative Paths</td>
      <td>2020-09-01</td>
      <td>N/A</td>
      <td>Disabled</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100166</td>
      <td>vBulletin - Code Injection - CVE:CVE-2019-16759</td>
      <td>2020-08-24</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0025B</td>
      <td>Improve performance</td>
      <td>2020-08-03</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100045</td>
      <td>Anomaly:URL - Multiple Slashes, Relative Paths, CR, LF or NULL</td>
      <td>2020-08-03</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100315</td>
      <td>
        RCE in BIG-IP Traffic Management User Interface - CVE:CVE-2020-5902
      </td>
      <td>2020-08-03</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Miscellaneous</td>
      <td>100317</td>
      <td>vBulletin - SQLi - CVE:CVE-2020-12720</td>
      <td>2020-07-27</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100139D</td>
      <td>XSS</td>
      <td>2020-07-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100318</td>
      <td>Anomaly:Method - Unknown HTTP Method</td>
      <td>2020-07-20</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100319</td>
      <td>Anomaly:Method - Unusual HTTP Method</td>
      <td>2020-07-20</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100031</td>
      <td>Improve performance</td>
      <td>2020-07-13</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100071</td>
      <td>Improve performance</td>
      <td>2020-07-13</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100315</td>
      <td>
        RCE in BIG-IP Traffic Management User Interface - CVE:CVE-2020-5902
      </td>
      <td>Emergency, 2020-07-07</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100310</td>
      <td>Improve Apache Struts code injection detection</td>
      <td>2020-06-22</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135A</td>
      <td>Improve XSS detection</td>
      <td>2020-06-15</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135B</td>
      <td>Improve XSS detection</td>
      <td>2020-06-15</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135C</td>
      <td>Improve XSS detection</td>
      <td>2020-06-15</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136A</td>
      <td>Improve XSS detection</td>
      <td>2020-06-15</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136B</td>
      <td>Improve XSS detection</td>
      <td>2020-06-15</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136C</td>
      <td>Improve XSS detection</td>
      <td>2020-06-15</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100045</td>
      <td>Improve URL anomaly detection</td>
      <td>2020-06-15</td>
      <td>Challenge</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Misc</td>
      <td>100075</td>
      <td>Block HULK DoS</td>
      <td>2020-06-08</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100307</td>
      <td>Improve XSS detection</td>
      <td>2020-06-08</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100174</td>
      <td>XSS - JS Context Escape</td>
      <td>2020-05-25</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100008C</td>
      <td>Sleep Function</td>
      <td>2020-05-11</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100307</td>
      <td>jQuery URI XSS</td>
      <td>2020-05-11</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100303</td>
      <td>Command Injection - Nslookup</td>
      <td>2020-05-11</td>
      <td>Disabled</td>
      <td>Disabled</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100124</td>
      <td>Command Injection - Nslookup</td>
      <td>2020-05-11</td>
      <td>Disabled</td>
      <td>Disabled</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100303</td>
      <td>Nslookup</td>
      <td>2020-05-04</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100304</td>
      <td>Server-Side Includes</td>
      <td>2020-05-04</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100124</td>
      <td>Sleep</td>
      <td>2020-05-04</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100008</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100008E</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100008CW</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100008D</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100158</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100106</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100106B</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100140</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100089</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100162</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100026</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100018</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100018B</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100232</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100005</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135A</td>
      <td>Improve XSS detection, false positive rate and performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135B</td>
      <td>Improve XSS detection, false positive rate and performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135C</td>
      <td>Improve XSS detection, false positive rate and performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136A</td>
      <td>Improve XSS detection, false positive rate and performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136B</td>
      <td>Improve XSS detection, false positive rate and performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136C</td>
      <td>Improve XSS detection, false positive rate and performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100167</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100168</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100169</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100170</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100171</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100172</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100173</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100174</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100221</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100222</td>
      <td>Improve HTML Injection detection and performance</td>
      <td>2020-04-27</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100156</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100139A</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100139B</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100139C</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100139D</td>
      <td>Improve performance</td>
      <td>2020-04-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Magento</td>
      <td>MG0003B</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0013</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0014</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0001</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare PHP</td>
      <td>PHP100004</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare PHP</td>
      <td>PHP100008</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare PHP</td>
      <td>PHP100009</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare PHP</td>
      <td>PHP100010</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Miscellaneous</td>
      <td>CFMISC0001</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Miscellaneous</td>
      <td>CFMISC0002</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Miscellaneous</td>
      <td>CFMISC0003</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Miscellaneous</td>
      <td>CFMISC0010</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Miscellaneous</td>
      <td>CFMISC0011</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WHMCS</td>
      <td>WHMCS0001</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WHMCS</td>
      <td>WHMCS0002</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WHMCS</td>
      <td>WHMCS0003</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>900044</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>900122</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>900123</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>900124</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>900125</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>900126</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>900127</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>999003</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>100000</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0001</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0005</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0006</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0007</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0015</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0018</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100002</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100002A</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100005A</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100105HEADERS</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100105</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100116</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100109B</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100006</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100007B</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100009C</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100009EP</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100009EP</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100009EF</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100009L</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100010C</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100014B</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100017</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100020</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100032</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100039B</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100046</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100052B</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100056</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100057</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100058</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100060</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100064</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100066</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100067</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100068</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100068B</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100074</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100076</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100077B</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100078</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100078B</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100082</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100086</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100086B</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100088</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100088C</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100095</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100097</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100099</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100100</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100104</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100108ARGS</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100109</td>
      <td>Deprecated</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100310</td>
      <td>Apache Struts code injection</td>
      <td>2020-04-27</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100305</td>
      <td>ASP.NET - Deserialization - CVE:CVE-2019-18935</td>
      <td>2020-04-20</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100306</td>
      <td>Improve SQLi detection</td>
      <td>2020-04-20</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare PHP</td>
      <td>PHP100011ARGS</td>
      <td>Deprecated</td>
      <td>2020-04-20</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare PHP</td>
      <td>PHP100011COOKIE</td>
      <td>Deprecated</td>
      <td>2020-04-20</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135A</td>
      <td>Improve XSS detection. Merge 100135A_BETA into 100135A.</td>
      <td>2020-04-06</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136A</td>
      <td>Improve XSS detection. Merge 100136A_BETA into 100136A.</td>
      <td>2020-04-06</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100301</td>
      <td>SQLi detection improvement on <code>TRUNCATE</code>-like statements</td>
      <td>2020-03-30</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100300</td>
      <td>Improve SQL Operators support to prevent SQL Injection</td>
      <td>2020-03-23</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100302</td>
      <td>SQLi detection improvement on for <code>UNION</code>-like statements</td>
      <td>2020-03-23</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135B</td>
      <td>Improve XSS detection. Merge 100135B_BETA into 100135B.</td>
      <td>2020-03-23</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136B</td>
      <td>Improve XSS detection. Merge 100136B_BETA into 100136B.</td>
      <td>2020-03-23</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>N/A</td>
      <td>N/A</td>
      <td>Logging for rules in the OWASP rule group has been improved by removing duplicate and empty log events.</td>
      <td>2020-03-12</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100162</td>
      <td>SQLi improvement on <code>SELECT FROM TABLE</code> statements</td>
      <td>2020-03-09</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100201</td>
      <td>Improve Fake Google Bot detection</td>
      <td>Emergency release, 2020-03-02</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100005</td>
      <td>Improve File Inclusion detection</td>
      <td>Emergency release, 2020-03-02</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100007NS</td>
      <td>Improve Command Injection detection</td>
      <td>Emergency release, 2020-03-02</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100049A</td>
      <td>
        Improve GraphicsMagick, ImageMagick attack detection. Merge 100049A_BETA
        into 100049A.
      </td>
      <td>2020-02-17</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100220</td>
      <td>Improve XSS detection. Merge 100220_BETA into 100220.</td>
      <td>2020-02-10</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100221</td>
      <td>Improve XSS detection. Merge 100221_BETA into 100221.</td>
      <td>2020-02-10</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100024</td>
      <td>Deprecated</td>
      <td>2020-02-10</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100042</td>
      <td>Deprecated</td>
      <td>2020-02-10</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100112B</td>
      <td>Deprecated</td>
      <td>2020-02-10</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100029</td>
      <td>Deprecated</td>
      <td>2020-01-27</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100043</td>
      <td>Deprecated</td>
      <td>2020-01-27</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100047WP</td>
      <td>Deprecated</td>
      <td>2020-01-27</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100012</td>
      <td>Deprecated</td>
      <td>2020-01-27</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100013</td>
      <td>Superseded by 100220, 100221</td>
      <td>2020-01-27</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100050</td>
      <td>Deprecated</td>
      <td>2020-01-27</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100051</td>
      <td>Deprecated</td>
      <td>2020-01-27</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100034</td>
      <td>Deprecated</td>
      <td>2020-01-27</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100028</td>
      <td>Deprecated</td>
      <td>2020-01-27</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100014</td>
      <td>Deprecated</td>
      <td>2020-01-27</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100186</td>
      <td>Superseded by 100026</td>
      <td>2020-01-27</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100038</td>
      <td>Reduce false positive rate. Merge 100038_BETA into 100038.</td>
      <td>2020-01-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100043A</td>
      <td>Improve performance. Merge 100043A_BETA into 100043A.</td>
      <td>2020-01-27</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100043B</td>
      <td>Improve performance. Merge 100043B_BETA into 100043B.</td>
      <td>2020-01-27</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100243</td>
      <td>Improve Joomla SQLi detection</td>
      <td>2020-01-27</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100244</td>
      <td>Improve Adobe Flash attack detection</td>
      <td>2020-01-27</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100245</td>
      <td>Improve WordPress Broken Access Control Update Script detection</td>
      <td>2020-01-27</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100246</td>
      <td>
        Improve WordPress EWWW Image Optimizer Command Injection detection
      </td>
      <td>2020-01-27</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100247</td>
      <td>Improve WordPress API validation</td>
      <td>2020-01-27</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Flash</td>
      <td>F0001</td>
      <td>Superseded by 100244</td>
      <td>2020-01-27</td>
      <td>Challenge</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Flash</td>
      <td>F0002</td>
      <td>Superseded by 100244</td>
      <td>2020-01-27</td>
      <td>Challenge</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100201</td>
      <td>Block fake Google bots</td>
      <td>2020-01-20</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100202</td>
      <td>Block fake Bing and MSN bots</td>
      <td>2020-01-20</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100203</td>
      <td>Block fake Yandex bots</td>
      <td>2020-01-20</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100204</td>
      <td>Block fake Baidu bots</td>
      <td>2020-01-20</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035D</td>
      <td>Superseded by 100201</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035</td>
      <td>Superseded by 100201</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035C</td>
      <td>Superseded by 100201</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035B</td>
      <td>Superseded by 100202</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035Y</td>
      <td>Superseded by 100203</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035U</td>
      <td>Superseded by 100204</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100037</td>
      <td>Superseded by 100204</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100112</td>
      <td>Deprecated</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>WP0029</td>
      <td>Improve performance. Merge WP0029_BETA into WP0029.</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>WP0011</td>
      <td>Improve performance. Superseded by 100233.</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100233</td>
      <td>Improve performance</td>
      <td>2020-01-20</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100220</td>
      <td>Improve XSS and HTML Injection detection</td>
      <td>2020-01-20</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100221</td>
      <td>Improve XSS and HTML Injection detection in request bodies</td>
      <td>2020-01-20</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100096BASE</td>
      <td>Superseded by 100220</td>
      <td>2020-01-20</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100096HTML</td>
      <td>Superseded by 100220</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100096EVIL</td>
      <td>Superseded by 100220</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100096BBASE</td>
      <td>Superseded by 100220</td>
      <td>2020-01-20</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100096BHTML</td>
      <td>Superseded by 100220</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100096BEVIL</td>
      <td>Superseded by 100220</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100016</td>
      <td>Improve performance. Merge 100016_BETA into 100016.</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100018</td>
      <td>Improve performance. Merge 100018_BETA into 100018.</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100018B</td>
      <td>Improve performance. Merge 100018B_BETA into 100018B.</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100025</td>
      <td>Deprecated</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100089</td>
      <td>Improve performance. Merge 100089_BETA into 100089.</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100112</td>
      <td>Deprecated</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100115</td>
      <td>Deprecated</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100117</td>
      <td>Superseded by 100026</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100120C</td>
      <td>Deprecated</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100121ARGS_GET</td>
      <td>Deprecated</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100121URI</td>
      <td>Deprecated</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100122</td>
      <td>Superseded by 100232</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100122ARGS</td>
      <td>Superseded by 100232</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100122ARGS_GET</td>
      <td>Superseded by 100232</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100132</td>
      <td>Improve performance. Merge 100132_BETA into 100132</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100155</td>
      <td>Improve performance. Merge 100155_BETA into 100155.</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100230</td>
      <td>Improve Drupal Command Injection detection</td>
      <td>2020-01-20</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100198</td>
      <td>Improve Apache Struts Code Injection detection</td>
      <td>2020-01-20</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100199</td>
      <td>Improve Drupal Command Injection detection</td>
      <td>2020-01-20</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100231</td>
      <td>Improve PHP Deserialization detection</td>
      <td>2020-01-20</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100232</td>
      <td>
        Improve Code Injection, Deserialization with Stream Wrapper detection
      </td>
      <td>2020-01-20</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100234</td>
      <td>Improve WordPress Broken Access Control detection</td>
      <td>2020-01-20</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100084</td>
      <td>Superseded by 100170</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100030SVG</td>
      <td>Superseded by 100135A, 100135B, 100135C</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021C</td>
      <td>Superseded by 100135A, 100135B, 100135C</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CE</td>
      <td>Superseded by 100135A, 100135B, 100135C</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CB</td>
      <td>Superseded by 100135A, 100135B, 100135C</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CD</td>
      <td>Superseded by 100135A, 100135B, 100135C</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CD2</td>
      <td>Superseded by 100135A, 100135B, 100135C</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CD3</td>
      <td>Superseded by 100135A, 100135B, 100135C</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021D</td>
      <td>Superseded by 100136A, 100136B, 100136C</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100107</td>
      <td>Superseded by 100136A, 100136B, 100136C</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100107ARGS</td>
      <td>Superseded by 100136A, 100136B, 100136C</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100148</td>
      <td>Deprecated</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100149</td>
      <td>Superseded by 100136A, 100136B, 100136C</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100030</td>
      <td>Superseded by 100173</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100030ARGS_STRICT</td>
      <td>Superseded by 100173</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100030ARGS_LOOSE</td>
      <td>Superseded by 100173</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021</td>
      <td>Superseded by 100173</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021B</td>
      <td>Superseded by 100173</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021E</td>
      <td>Superseded by 100139D</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021E</td>
      <td>Superseded by 100139D</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100090</td>
      <td>Superseded by 100173</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100091</td>
      <td>Superseded by 100173</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100091B</td>
      <td>Superseded by 100173</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100092</td>
      <td>Superseded by 100173</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100093</td>
      <td>Superseded by 100173</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100133</td>
      <td>Superseded by 100173</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100137</td>
      <td>Superseded by 100174</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021H</td>
      <td>Deprecated</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100113</td>
      <td>Deprecated</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100120C</td>
      <td>Deprecated</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100120C</td>
      <td>Deprecated</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100112</td>
      <td>Deprecated</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare PHP</td>
      <td>PHP100002</td>
      <td>Superseded by 100232</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Miscellaneous</td>
      <td>CFMISC0004</td>
      <td>Superseded by 100198</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Miscellaneous</td>
      <td>CFMISC0005</td>
      <td>Deprecated</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Miscellaneous</td>
      <td>CFMISC0011</td>
      <td>Improve performance</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Miscellaneous</td>
      <td>CFMISC0014</td>
      <td>Superseded by 100199</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Miscellaneous</td>
      <td>CFMISC0014B</td>
      <td>Superseded by 100199</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Miscellaneous</td>
      <td>CFMISC0015</td>
      <td>Superseded by 100199</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Miscellaneous</td>
      <td>CFMISC0016</td>
      <td>Superseded by 100199</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Miscellaneous</td>
      <td>CFMISC0016B</td>
      <td>Superseded by 100199</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Miscellaneous</td>
      <td>CFMISC0017</td>
      <td>Superseded by 100199</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0016</td>
      <td>Superseded by 100232</td>
      <td>2020-01-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0004</td>
      <td>Superseded by 100230</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0004B</td>
      <td>Superseded by 100230</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0004C</td>
      <td>Superseded by 100230</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0020</td>
      <td>Superseded by 100231</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Magento</td>
      <td>MG0003A</td>
      <td>Superseded by 100231</td>
      <td>2020-01-20</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>OWASP</td>
      <td>960034</td>
      <td>Deprecated</td>
      <td>2020-01-20</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}
