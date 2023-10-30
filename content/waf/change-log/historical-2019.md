---
pcx_content_type: changelog
title: Historical (2019)
weight: 10049
meta:
    description: Changes to WAF managed rulesets done in 2019.
layout: list
---

# Historical - 2019

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
      <td>100242</td>
      <td>
        Block Citrix Netscaler ADC -
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2019-19781"
          >CVE-2019-19781</a
        >
      </td>
      <td>Emergency, 2019-12-16</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100009CB</td>
      <td>
        Improvement in Equation-like SQLi. Merge 100009CB_BETA into 100009CB.
      </td>
      <td>2019-12-16</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100191</td>
      <td>
        Improvement CVE-2019-11043 detection. Merge 100191_BETA into 100191.
      </td>
      <td>2019-12-16</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9802140</td>
      <td>Minor change to reduce Gutenberg false positives</td>
      <td>Emergency, 2019-11-25</td>
      <td>Scoring based</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9802140_JSON</td>
      <td>Minor change to reduce Gutenberg false positives</td>
      <td>Emergency, 2019-11-25</td>
      <td>Scoring based</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9802141</td>
      <td>Minor change to reduce Gutenberg false positives</td>
      <td>Emergency, 2019-11-25</td>
      <td>Scoring based</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9802141_JSON</td>
      <td>Minor change to reduce Gutenberg false positives</td>
      <td>Emergency, 2019-11-25</td>
      <td>Scoring based</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>960034</td>
      <td>Reduce false positives for requests made with HTTP 2 and 3</td>
      <td>Emergency, 2019-11-25</td>
      <td>Scoring based</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100148</td>
      <td>Disable outdated XSS rule by default</td>
      <td>2019-11-12</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035C</td>
      <td>Update valid Googlebot IP ranges</td>
      <td>Emergency, 2019-11-07</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035D</td>
      <td>Update valid Googlebot IP ranges</td>
      <td>Emergency, 2019-11-07</td>
      <td>Disabled</td>
      <td>Disabled</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100139A</td>
      <td>Improve XSS detection. Merge 100139A_BETA into 100139A.</td>
      <td>2019-11-04</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100139B</td>
      <td>Improve XSS detection. Merge 100139B_BETA into 100139B.</td>
      <td>2019-11-04</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100139C</td>
      <td>Improve XSS detection. Merge 100139C_BETA into 100139C.</td>
      <td>2019-11-04</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100139D</td>
      <td>Improve XSS detection</td>
      <td>2019-11-04</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100173</td>
      <td>Improve XSS detection</td>
      <td>2019-11-04</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100030SVG</td>
      <td>Disable outdated XSS rule by default</td>
      <td>2019-11-04</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021C</td>
      <td>Disable outdated XSS rule by default</td>
      <td>2019-11-04</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CE</td>
      <td>Disable outdated XSS rule by default</td>
      <td>2019-11-04</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CB</td>
      <td>Disable outdated XSS rule by default</td>
      <td>2019-11-04</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021D</td>
      <td>Disable outdated XSS rule by default</td>
      <td>2019-11-04</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100107</td>
      <td>Disable outdated XSS rule by default</td>
      <td>2019-11-04</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100030</td>
      <td>Disable outdated XSS rule by default</td>
      <td>2019-11-04</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100030ARGS_STRICT</td>
      <td>Disable outdated XSS rule by default</td>
      <td>2019-11-04</td>
      <td>Challenge</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021</td>
      <td>Disable outdated XSS rule by default</td>
      <td>2019-11-04</td>
      <td>Challenge</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021B</td>
      <td>Disable outdated XSS rule by default</td>
      <td>2019-11-04</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021E</td>
      <td>Disable outdated XSS rule by default</td>
      <td>2019-11-04</td>
      <td>Challenge</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100090</td>
      <td>Disable outdated XSS rule by default</td>
      <td>2019-11-04</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100091</td>
      <td>Disable outdated XSS rule by default</td>
      <td>2019-11-04</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100091B</td>
      <td>Disable outdated XSS rule by default</td>
      <td>2019-11-04</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100092</td>
      <td>Disable outdated XSS rule by default</td>
      <td>2019-11-04</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100170</td>
      <td>Improve XSS detection. Merge 100170_BETA into 100170.</td>
      <td>2019-11-04</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021H</td>
      <td>Disable outdated XSS rule by default</td>
      <td>2019-11-04</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100044</td>
      <td>Disabled obsolete rule by default. Merge 100044_BETA into 100044.</td>
      <td>2019-11-04</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100174</td>
      <td>Improve XSS detection</td>
      <td>2019-11-04</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135B</td>
      <td>Reduced false positive rate. Merge 100135B_BETA into 100135B.</td>
      <td>2019-11-04</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100191</td>
      <td>Block CVE-2019-11043</td>
      <td>Emergency, 2019-10-27</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035C</td>
      <td>
        Improve Fake Google Bot detection. Merge 100035C_BETA into 100035C.
      </td>
      <td>Emergency, 2019-10-23</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100009CB</td>
      <td>
        Improve Comparison-like SQL Injection detection. Merge 100009CB_BETA
        into 100009CB.
      </td>
      <td>2019-10-21</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100026</td>
      <td>Improve PHP Code Injection and File Upload detection</td>
      <td>2019-10-21</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100186</td>
      <td>Block vBulletin vulnerability CVE-2019-17132</td>
      <td>2019-10-21</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100187</td>
      <td>Block vBulletin vulnerability CVE-2019-17132</td>
      <td>2019-10-21</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035D</td>
      <td>
        Improve Fake Google Bot detection. Merge 100035D_BETA into 100035D.
        Change originally scheduled for 2019-10-21.
      </td>
      <td>Emergency, 2019-10-17</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035</td>
      <td>
        Improve Fake Google Bot detection. Merge 100035_BETA into 100035. Change
        originally scheduled for 2019-10-21.
      </td>
      <td>Emergency, 2019-10-17</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035C</td>
      <td>
        Improve Fake Google Bot detection. Merge 100035C_BETA into 100035C.
        Change originally scheduled for 2019-10-21.
      </td>
      <td>Emergency, 2019-10-17</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035B</td>
      <td>
        Improve Fake Bing Bot detection. Merge 100035B_BETA into 100035B. Change
        originally scheduled for 2019-10-21.
      </td>
      <td>Emergency, 2019-10-17</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035Y</td>
      <td>
        Improve Fake Yandex Bot detection. Merge 100035Y_BETA into 100035Y.
        Change originally scheduled for 2019-10-21.
      </td>
      <td>Emergency, 2019-10-17</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035U</td>
      <td>
        Improve Fake Baidu Bot detection. Merge 100035U_BETA into 100035U.
        Change originally scheduled for 2019-10-21.
      </td>
      <td>Emergency, 2019-10-17</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135A</td>
      <td>Improve XSS detection. Merge 100135A_UBETA into 100135A.</td>
      <td>2019-10-14</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135B</td>
      <td>Improve XSS detection. Merge 100135B_UBETA into 100135B.</td>
      <td>2019-10-14</td>
      <td>Disable</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135C</td>
      <td>Improve XSS detection. Merge 100135C_UBETA into 100135C.</td>
      <td>2019-10-14</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136A</td>
      <td>Improve XSS detection. Merge 100136A_UBETA into 100136A.</td>
      <td>2019-10-14</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136B</td>
      <td>Improve XSS detection. Merge 100136B_UBETA into 100136B.</td>
      <td>2019-10-14</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136C</td>
      <td>Improve XSS detection. Merge 100136C_UBETA into 100136C.</td>
      <td>2019-10-14</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100167</td>
      <td>Improve XSS and HTML Injection detection</td>
      <td>2019-10-14</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100168</td>
      <td>Improve XSS and HTML Injection detection</td>
      <td>2019-10-14</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100169</td>
      <td>Improve XSS and HTML Injection detection</td>
      <td>2019-10-14</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100170</td>
      <td>Improve XSS and HTML Injection detection</td>
      <td>2019-10-14</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100171</td>
      <td>Improve XSS and HTML Injection detection</td>
      <td>2019-10-14</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100172</td>
      <td>Improve XSS and HTML Injection detection</td>
      <td>2019-10-14</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0015</td>
      <td>
        Disables outdated WordPress rule by default. If this rule's action is set to
        anything other than the default, this change will have no effect.
      </td>
      <td>2019-10-07</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100008E</td>
      <td>Improve SQLi protection</td>
      <td>2019-09-30</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100008E</td>
      <td>SQLi improvement</td>
      <td>2019-09-30</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100166</td>
      <td>
        Block vBulletin
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2019-16759"
          >CVE-2019-16759</a
        >
      </td>
      <td>Emergency, 2019-09-26</td>
      <td>None</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002140</td>
      <td>OWASP WordPress improvement</td>
      <td>2019-09-23</td>
      <td>Scoring based</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002140_JSON</td>
      <td>OWASP WordPress improvement</td>
      <td>2019-09-23</td>
      <td>Scoring based</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002141</td>
      <td>OWASP WordPress improvement</td>
      <td>2019-09-23</td>
      <td>Scoring based</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002141_JSON</td>
      <td>OWASP WordPress improvement</td>
      <td>2019-09-23</td>
      <td>Scoring based</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100162</td>
      <td>SQLi improvement on <code>SELECT FROM TABLE</code> statements</td>
      <td>2019-09-23</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100160</td>
      <td>JBoss protection improvement</td>
      <td>2019-09-16</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002140</td>
      <td>Small improvement to Gutenberg exception rules</td>
      <td>2019-09-09</td>
      <td>N/A</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002140_JSON</td>
      <td>Small improvement to Gutenberg exception rules</td>
      <td>2019-09-09</td>
      <td>N/A</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002141</td>
      <td>Small improvement to Gutenberg exception rules</td>
      <td>2019-09-09</td>
      <td>N/A</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002141_JSON</td>
      <td>Small improvement to Gutenberg exception rules</td>
      <td>2019-09-09</td>
      <td>N/A</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100158</td>
      <td>SQL Injection - Obfuscated <code>SELECT</code> expressions</td>
      <td>2019-09-09</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>URI-973326</td>
      <td>Small improvement in OWASP rule</td>
      <td>2019-09-09</td>
      <td>Scoring based</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>973326</td>
      <td>Small improvement in OWASP rule</td>
      <td>2019-09-09</td>
      <td>Scoring based</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>URI-950901</td>
      <td>Remove OWASP rule</td>
      <td>2019-09-02</td>
      <td>Scoring based</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>959151</td>
      <td>Small improvement in OWASP rule</td>
      <td>2019-09-02</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>950901</td>
      <td>Remove OWASP rule</td>
      <td>2019-09-02</td>
      <td>Scoring based</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0003B</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Block</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100005A</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100007N</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100009DBETA</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100009I</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100009L</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100010B</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CD</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100030_BETA</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100030ARGS_LOOSE</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035B2</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100035D</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100042</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100056_BETA</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100057</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100059</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100061</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100062</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100062_BETA</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100064</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100066</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100067</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100068</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100075</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100077</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100078B</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100083</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100084</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100085</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100086</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100088C</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100093</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100096BEVIL</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100096BHTML</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100096EVIL</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100096HTML</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100098</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100105</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100106B</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100107ARGS</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100108</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100108ARGS</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100109</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100109B</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100111</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100115</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100119</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100122</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100123B</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100126</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100131</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100133</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135B</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100137</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100139A</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100140</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100146</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100146B</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100149</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100158</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Miscellaneous</td>
      <td>CFMISC0004</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Miscellaneous</td>
      <td>CFMISC0004B</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Miscellaneous</td>
      <td>CFMISC0016B</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0005</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0016</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare PHP</td>
      <td>PHP100008</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare PHP</td>
      <td>PHP100009</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare PHP</td>
      <td>PHP100010</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare PHP</td>
      <td>PHP100011ARGS</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare PHP</td>
      <td>PHP100011COOKIE</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0012</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0025C</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0028</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0030</td>
      <td>Disable rule by default</td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136A</td>
      <td>Improve XSS JavaScript URI detection and reduce false positives</td>
      <td>2019-07-29</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136B</td>
      <td>Improve XSS JavaScript URI detection and reduce false positives</td>
      <td>2019-07-29</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136C</td>
      <td>Improve XSS JavaScript URI detection and reduce false positives</td>
      <td>2019-07-29</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135A</td>
      <td>
        Improve XSS JavaScript Events detection and reduce false positives
      </td>
      <td>2019-07-29</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135B</td>
      <td>
        Improve XSS JavaScript Events detection and reduce false positives
      </td>
      <td>2019-07-29</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135C</td>
      <td>
        Improve XSS JavaScript Events detection and reduce false positives
      </td>
      <td>2019-07-29</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002140</td>
      <td>Reduce WAF false positives for the Gutenberg WordPress editor</td>
      <td>2019-07-24</td>
      <td>N/A</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002140_JSON</td>
      <td>Reduce WAF false positives for the Gutenberg WordPress editor</td>
      <td>2019-07-24</td>
      <td>N/A</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002141</td>
      <td>Reduce WAF false positives for the Gutenberg WordPress editor</td>
      <td>2019-07-24</td>
      <td>N/A</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002141_JSON</td>
      <td>Reduce WAF false positives for the Gutenberg WordPress editor</td>
      <td>2019-07-24</td>
      <td>N/A</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100030</td>
      <td>Improve XSS HTML Script Tag detection</td>
      <td>2019-07-22</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100153</td>
      <td>
        Block Oracle WebLogic - Command Injection -
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2019-2729"
          >CVE-2019-2729</a
        >
      </td>
      <td>2019-06-27</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002140A</td>
      <td>Improve 9002140A</td>
      <td>2019-06-19</td>
      <td>Scoring based</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002140B</td>
      <td>Improve 9002140B</td>
      <td>2019-06-19</td>
      <td>Scoring based</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002140A</td>
      <td>Improve 9002140A</td>
      <td>2019-06-17</td>
      <td>Scoring based</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002140A</td>
      <td>Improve 9002140B</td>
      <td>2019-06-17</td>
      <td>Scoring based</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0033</td>
      <td>Easy WP SMTP - Deserialization</td>
      <td>2019-06-17</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100156</td>
      <td>XSS, HTML Injection - Malicious HTML Encoding</td>
      <td>2019-06-17</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002140B_BETA</td>
      <td>Improve 9002140B</td>
      <td>2019-06-10</td>
      <td>Scoring based</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100005</td>
      <td>Improved shell variable normalization</td>
      <td>2019-06-10</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100007NS</td>
      <td>Improved shell variable normalization</td>
      <td>2019-06-10</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100155</td>
      <td>
        PHPCMS - Dangerous File Upload -
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2018-14399"
          >CVE-2018-14399</a
        >
      </td>
      <td>2019-06-10</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100096BHTML</td>
      <td>XSS, HTML Injection - Body</td>
      <td>2019-06-03</td>
      <td>N/A</td>
      <td>Log</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100096BEVIL</td>
      <td>XSS, HTML Injection - Body</td>
      <td>2019-06-03</td>
      <td>N/A</td>
      <td>Log</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002140A</td>
      <td>
        New OWASP rules to allow requests from the WordPress's Gutenberg editor
      </td>
      <td>2019-06-03</td>
      <td>N/A</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002140B</td>
      <td>
        New OWASP rules to allow requests from the WordPress's Gutenberg editor
      </td>
      <td>2019-06-03</td>
      <td>N/A</td>
      <td>Scoring based</td>
    </tr>
    <tr>
      <td>All</td>
      <td>All</td>
      <td>Improve Rule Descriptions</td>
      <td>2019-05-28</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100157</td>
      <td>
        Microsoft SharePoint Deserialization -
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2019-0604"
          >CVE-2019-0604</a
        >
        (Strict)
      </td>
      <td>2019-05-28</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100053</td>
      <td>Potential FI or Alias/Rewrite Bypass - Double Slash in URL</td>
      <td>2019-05-20</td>
      <td>Disable</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100122ARGS</td>
      <td>Dangerous stream wrappers</td>
      <td>2019-05-20</td>
      <td>Block</td>
      <td>Deprecated</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100122ARGS_GET</td>
      <td>Dangerous stream wrappers</td>
      <td>2019-05-20</td>
      <td>Block</td>
      <td>Deprecated</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100122</td>
      <td>Dangerous stream wrappers</td>
      <td>2019-05-20</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100157</td>
      <td>
        Microsoft SharePoint Deserialization -
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2019-0604"
          >CVE-2019-0604</a
        >
      </td>
      <td>2019-05-13</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100154</td>
      <td>
        WordPress Social Warfare RCE/XSS (<a
          href="https://nvd.nist.gov/vuln/detail/CVE-2019-9978"
          >CVE-2019-9978</a
        >)
      </td>
      <td>2019-05-13</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare OWASP</td>
      <td>9002140</td>
      <td>Reduce OWASP false positives</td>
      <td>2019-05-13</td>
      <td>Log</td>
      <td>Allow</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100008</td>
      <td>Improve SQLi detection</td>
      <td>2019-05-13</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135A</td>
      <td>Improve XSS detection and reduce false positives</td>
      <td>2019-05-07</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135B</td>
      <td>Improve XSS detection and reduce false positives</td>
      <td>2019-05-07</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135C</td>
      <td>Improve XSS detection and reduce false positives</td>
      <td>2019-05-07</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136A</td>
      <td>Improve XSS detection and reduce false positives</td>
      <td>2019-05-07</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136B</td>
      <td>Improve XSS detection and reduce false positives</td>
      <td>2019-05-07</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100153</td>
      <td>
        Block Oracle WebLogic
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2019-2725"
          >CVE-2019-2725</a
        >,
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2017-10271"
          >CVE-2017-10271</a
        >,
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2017-3506"
          >CVE-2017-3506</a
        >
      </td>
      <td>2019-05-07</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100148</td>
      <td>Improve inline XSS detection</td>
      <td>2019-05-07</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100105HEADERS</td>
      <td>PHP serialization in headers, excluding Cookies</td>
      <td>2019-05-07</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100146C</td>
      <td>Potential SSRF attack</td>
      <td>2019-05-07</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100106</td>
      <td>PostgreSQL COPY Injection</td>
      <td>2019-05-07</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100139A</td>
      <td>HTML Injection, XSS or Code Injection via data URI</td>
      <td>2019-05-07</td>
      <td>N/A</td>
      <td>Log</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100139B</td>
      <td>HTML Injection, XSS or Code Injection via data URI</td>
      <td>2019-05-07</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100139C</td>
      <td>HTML Injection, XSS or Code Injection via data URI</td>
      <td>2019-05-07</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100105REFERER</td>
      <td>PHP serialization in Referer header</td>
      <td>2019-04-29</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100152</td>
      <td>
        Joomla
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2019-10945"
          >CVE-2019-10945</a
        >
      </td>
      <td>2019-04-29</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100144</td>
      <td>NoSQL Injection attack (Expression vector)</td>
      <td>2019-04-29</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100143</td>
      <td>NoSQL Injection attack (comparison vector)</td>
      <td>2019-04-29</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100148</td>
      <td>Improve XSS inline detection</td>
      <td>2019-04-29</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135A</td>
      <td>Improve XSS detection</td>
      <td>2019-04-22</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135B</td>
      <td>Improve XSS detection</td>
      <td>2019-04-22</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136A</td>
      <td>Improve XSS detection</td>
      <td>2019-04-22</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136B</td>
      <td>Improve XSS detection</td>
      <td>2019-04-22</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100097G</td>
      <td>Improve SQLi blocking</td>
      <td>2019-04-22</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0034</td>
      <td>WordPress zero day XSS</td>
      <td>2019-04-22</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100010A</td>
      <td>Improve SQLi detection</td>
      <td>2019-04-22</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare PHP</td>
      <td>PHP100013</td>
      <td>Blocks PHP CGI attack by default</td>
      <td>2019-04-22</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100150</td>
      <td>
        Block
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2019-10842"
          >CVE-2019-10842</a
        >
      </td>
      <td>2019-04-22</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100142</td>
      <td>NoSQL Injection attack (array vector)</td>
      <td>2019-04-15</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135A</td>
      <td>Improve XSS event detection</td>
      <td>2019-04-08</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135B</td>
      <td>Improve XSS event detection</td>
      <td>2019-04-08</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135C</td>
      <td>Improve XSS event detection</td>
      <td>2019-04-08</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100030SVG</td>
      <td>Improve XSS event detection</td>
      <td>2019-04-08</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021C</td>
      <td>Improve XSS event detection</td>
      <td>2019-04-08</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CE</td>
      <td>Improve XSS event detection</td>
      <td>2019-04-08</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CB</td>
      <td>Improve XSS event detection</td>
      <td>2019-04-08</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CD</td>
      <td>Improve XSS event detection</td>
      <td>2019-04-08</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CD2</td>
      <td>Improve XSS event detection</td>
      <td>2019-04-08</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CD3</td>
      <td>Improve XSS event detection</td>
      <td>2019-04-08</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0020BETA</td>
      <td>Improve blocking of SA-CORE-2019-003</td>
      <td>2019-04-08</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0017</td>
      <td>Improve blocking of SA-CORE-2019-003</td>
      <td>2019-04-08</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0017</td>
      <td>Improve blocking of SA-CORE-2019-003</td>
      <td>2019-04-08</td>
      <td>Log</td>
      <td>Deleted</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0018</td>
      <td>Improve blocking of SA-CORE-2019-003</td>
      <td>2019-04-08</td>
      <td>Log</td>
      <td>Deleted</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0019</td>
      <td>Improve blocking of SA-CORE-2019-003</td>
      <td>2019-04-08</td>
      <td>Log</td>
      <td>Deleted</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0021</td>
      <td>Improve blocking of SA-CORE-2019-003</td>
      <td>2019-04-08</td>
      <td>Log</td>
      <td>Deleted</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100127</td>
      <td>Improve blocking of SA-CORE-2019-003</td>
      <td>2019-04-08</td>
      <td>Log</td>
      <td>Deleted</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100128</td>
      <td>Improve blocking of SA-CORE-2019-003</td>
      <td>2019-04-08</td>
      <td>Log</td>
      <td>Deleted</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135A</td>
      <td>Improve XSS detection using JavaScript URI</td>
      <td>2019-04-08</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135B</td>
      <td>Improve XSS detection using JavaScript URI</td>
      <td>2019-04-08</td>
      <td>N/A</td>
      <td>Log</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100135C</td>
      <td>Improve XSS detection using JavaScript URI</td>
      <td>2019-04-08</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100123A</td>
      <td>Improve invalid UTF-8 detection</td>
      <td>2019-04-08</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100123B</td>
      <td>Improve invalid UTF-8 detection</td>
      <td>2019-04-08</td>
      <td>N/A</td>
      <td>Log</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100130</td>
      <td>Executable file upload attempt</td>
      <td>2019-04-08</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136A</td>
      <td>Improve XSS detection using JavaScript events</td>
      <td>2019-04-01</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136B</td>
      <td>Improve XSS detection using JavaScript events</td>
      <td>2019-04-01</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100136C</td>
      <td>Improve XSS detection using JavaScript events</td>
      <td>2019-04-01</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100120BETA2</td>
      <td>Reduce 100120's false positives</td>
      <td>2019-04-01</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0032BETA</td>
      <td>Reduce false positives for WP0032</td>
      <td>2019-04-01</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100122ARGS</td>
      <td>Block use of stream wrappers in all arguments</td>
      <td>2019-04-01</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100132</td>
      <td>
        Protection for Apache Tika Command Injection
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2018-1335"
          >CVE-2018-1335</a
        >
      </td>
      <td>2019-04-01</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare PHP</td>
      <td>PHP100006</td>
      <td>Improve PHP webshell attempt detection.</td>
      <td>2019-04-01</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100005</td>
      <td>
        Merge LFI 100005_BETA into 100005. Mitigates
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2018-9126"
          >CVE-2018-9126</a
        >,
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2011-1892"
          >CVE-2011-1892</a
        >.
      </td>
      <td>2019-04-01</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100005U</td>
      <td>Superseded by 100005</td>
      <td>2019-04-01</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100005UR</td>
      <td>Superseded by 100005</td>
      <td>2019-04-01</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100134</td>
      <td>
        Ruby on Rails File Disclosure
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2019-5418"
          >CVE-2019-5418</a
        >
      </td>
      <td>2019-04-01</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100120BETA</td>
      <td>Improve 100120's coverage of SQLi</td>
      <td>2019-03-25</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100130B</td>
      <td>Executable file with fake extension upload attempt</td>
      <td>2019-03-25</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CB</td>
      <td>
        Improves XSS event detection using alternate syntax \`, brackets, and
        parentheses.
      </td>
      <td>2019-03-18</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021A</td>
      <td>Improve XSS detection in Referer Header</td>
      <td>2019-03-18</td>
      <td>Challenge</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100030SVG</td>
      <td>Improve XSS event detection</td>
      <td>2019-03-18</td>
      <td>Challenge</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021C</td>
      <td>Improve XSS event detection</td>
      <td>2019-03-18</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CE</td>
      <td>Improve XSS event detection</td>
      <td>2019-03-18</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CB</td>
      <td>Improve XSS event detection</td>
      <td>2019-03-18</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100122ARGS_GET</td>
      <td>Block use of stream wrappers in GET arguments (RFI/RCE)</td>
      <td>2019-03-18</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100125</td>
      <td>Block AngularJS Sandbox attacks</td>
      <td>2019-03-18</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021D</td>
      <td>Improve XSS detection</td>
      <td>2019-03-18</td>
      <td>Challenge</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare WordPress</td>
      <td>WP0031</td>
      <td>
        WordPress RCE -
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2019-8942"
          >CVE-2019-8942</a
        >,
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2019-8943"
          >CVE-2019-8943</a
        >
      </td>
      <td>2019-03-11</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CB</td>
      <td>Improve XSS event detection</td>
      <td>2019-03-11</td>
      <td>Challenge</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021C</td>
      <td>Improve XSS event detection</td>
      <td>2019-03-11</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100008E</td>
      <td>Improve SQLi probing</td>
      <td>2019-03-04</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100123</td>
      <td>UTF-8 Invalid Characters detection (URL)</td>
      <td>2019-03-04</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100008E</td>
      <td>Improve SQLi probe detection</td>
      <td>2019-02-18</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100063_BETA</td>
      <td>Reduce false positives for 100063</td>
      <td>2019-02-18</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021H</td>
      <td>Improve XSS</td>
      <td>2019-02-18</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021G</td>
      <td>Delete XSS rule</td>
      <td>2019-02-18</td>
      <td>Block</td>
      <td>Deleted</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100124A</td>
      <td>UTF-8 Invalid Characters detection</td>
      <td>2019-02-11</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100124B</td>
      <td>UTF-8 Invalid Characters detection</td>
      <td>2019-02-11</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100008</td>
      <td>Moved rule out of BETA</td>
      <td>2019-02-08</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100011</td>
      <td>Block requests with null bytes</td>
      <td>2019-02-04</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100020</td>
      <td>Blocked SQLi with mysql comments</td>
      <td>2019-02-04</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100120B</td>
      <td>Blocked SQLi with mysql comments</td>
      <td>2019-02-04</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100120C</td>
      <td>Blocked SQLi with mysql comments</td>
      <td>2019-02-04</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100054</td>
      <td>
        Block
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2017-5638"
          >CVE-2017-5638</a
        >
        RCE attempts
      </td>
      <td>2019-02-04</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100009C</td>
      <td>Reduce 100009C false positives</td>
      <td>2019-01-28</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100007</td>
      <td>Improved RCE detection</td>
      <td>2019-01-28</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare PHP</td>
      <td>PHP100012</td>
      <td>
        Detect
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2017-9841"
          >CVE-2017-9841</a
        >
      </td>
      <td>2019-01-28</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100112B</td>
      <td>Block requests with duplicated User-Agent headers</td>
      <td>2019-01-21</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100009J</td>
      <td>Reduce 100009J false positives</td>
      <td>2019-01-21</td>
      <td>Block</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100114</td>
      <td>Improved XSS probing detection</td>
      <td>2019-01-21</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100005</td>
      <td>Improved LFI detection</td>
      <td>2019-01-21</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0015</td>
      <td>Drupal SA-CORE-2019-002 vulnerability</td>
      <td>Emergency, 2019-01-17</td>
      <td>N/A</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Drupal</td>
      <td>D0016</td>
      <td>Drupal SA-CORE-2019-002 vulnerability</td>
      <td>Emergency, 2019-01-17</td>
      <td>N/A</td>
      <td>Log</td>
    </tr>
    <tr>
      <td>Cloudflare PHP</td>
      <td>PHP100011</td>
      <td>Improved PHP code injection detection in URI and headers</td>
      <td>2019-01-14</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100121ARGS_GET</td>
      <td>Use of multiple percent-encoding level in URI arguments</td>
      <td>2019-01-07</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100121URI</td>
      <td>Use of multiple percent-encoding level in URI</td>
      <td>2019-01-07</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021CD3</td>
      <td>XSS reflection with JavaScript events</td>
      <td>2019-01-02</td>
      <td>N/A</td>
      <td>Disable</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100068B</td>
      <td>Improve SQLi detection</td>
      <td>2019-01-02</td>
      <td>Log</td>
      <td>Block</td>
    </tr>
    <tr>
      <td>Cloudflare Specials</td>
      <td>100021_BETA</td>
      <td>Improve XSS detection</td>
      <td>2019-01-02</td>
      <td>Log</td>
      <td>Challenge</td>
    </tr>
  </tbody>
</table>
{{</table-wrap>}}
