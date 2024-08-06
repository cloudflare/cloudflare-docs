---
title: Fields
pcx_content_type: reference
weight: 6
meta:
  title: Fields reference
---

# Fields reference

The Cloudflare Rules language supports a range of field types:

- [Standard fields](#standard-fields) represent common, typically static properties of an HTTP request.
- [Dynamic fields](#dynamic-fields) represent computed or derived values, typically related to Cloudflare threat intelligence about the request.
- [URI argument and value fields](#uri-argument-and-value-fields) are extracted from the request.
- [HTTP request header fields](#http-request-header-fields) represent the names and values associated with HTTP request headers.
- [HTTP request body fields](#http-request-body-fields) represent the properties of an HTTP request body, including forms, for example.
- [HTTP response fields](#http-response-fields) represent the names and values of HTTP headers and the status code of the HTTP response.

## Standard fields

Most standard fields use the same naming conventions as [Wireshark display fields](https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html). However, there are some subtle differences between Cloudflare and Wireshark:

- Wireshark supports [CIDR (Classless Inter-Domain Routing) notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) for expressing IP address ranges in equality comparisons (`ip.src == 1.2.3.0/24`, for example). Cloudflare does not.

  To evaluate a range of addresses using CIDR notation, use the `in` [comparison operator](/ruleset-engine/rules-language/operators/#comparison-operators) as in this example: `ip.src in {1.2.3.0/24 4.5.6.0/24}`.

- In Wireshark, `ssl` is a protocol field containing hundreds of other fields of various types that are available for comparison in multiple ways. However, in the Rules language `ssl` is a single Boolean field that indicates whether the connection from the client to Cloudflare is encrypted.

- The Cloudflare Rules language does not support the `slice` operator.

{{<Aside type="note" header="Availability notes">}}

- Geolocation information is provided and maintained by MaxMind. Access to `ip.src.is_in_european_union`, `ip.src.subdivision_1_iso_code`, and `ip.src.subdivision_2_iso_code` fields requires a Cloudflare Business or Enterprise plan.

- Access to `http.request.cookies` field requires a Cloudflare Pro, Business, or Enterprise plan.

{{</Aside>}}

The Cloudflare Rules language supports these standard fields:

<table>
  <thead>
    <tr>
      <th style="width:50%">Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
   <tr id="field-http-cookie">
      <td valign="top"><code>http.cookie</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the entire cookie as a string.</p>
         <p>Example value:
         <br /><code class="InlineCode">session=8521F670545D7865F79C3D7BEDC29CCE;-background=light</code>
         </p>
      </td>
   </tr>
   <tr id="field-http-host">
      <td valign="top"><code>http.host</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the hostname used in the full request URI.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">www.example.org</code>
         </p>
      </td>
   </tr>
   <tr id="field-http-referer">
      <td valign="top"><code>http.referer</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the HTTP Referer request header, which contains the address of the web page that linked to the currently requested page.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">Referer: htt&shy;ps://developer.example.org/en-US/docs/Web/JavaScript</code>
         </p>
      </td>
   </tr>
   <tr id="field-http-request-full-uri">
      <td valign="top"><code>http.request.full_uri</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the full URI as received by the web server (does not include <code class="InlineCode">#fragment</code>, which is not sent to web servers).
         </p>
         <p>Example value:
         <br /><code class="InlineCode">htt­ps://www.example.org/articles/index?section=539061&expand=comments</code>
         </p>
      </td>
   </tr>
   <tr id="field-http-request-method">
      <td valign="top"><code>http.request.method</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the HTTP method, returned as a string of uppercase characters.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">GET</code>
         </p>
      </td>
   </tr>
   <tr id="field-http-request-cookies">
      <td valign="top"><code>http.request.cookies</code><br />{{<type>}}Map&lt;Array&lt;String&gt;&gt;{{</type>}}</td>
      <td>
         <p>Represents the <code class="InlineCode">Cookie</code> HTTP header associated with a request as a Map (associative array).
         </p>
         <p>The cookie values are not pre-processed and retain the original case used in the request.</p>
         <p><em>Decoding:</em> The cookie names are URL decoded. If two cookies have the same name after decoding, their value arrays are merged.
         </p>
         <p>Example:
         <br /><code class="InlineCode">any(http.request.cookies["app"][*] == "test")</code>
         </p>
         <p>Example value:
         <br /><code class="InlineCode">{"app": ["test"]}</code>
         </p>
      </td>
   </tr>
   <tr id="field-http-request-timestamp-sec">
      <td valign="top"><code>http.request.timestamp.sec</code><br />{{<type>}}Integer{{</type>}}</td>
      <td>
         <p>Represents the timestamp when Cloudflare received the request, expressed as Unix time in seconds. This value is 10 digits long.
         </p>
         <p>To obtain the timestamp milliseconds, use the <code class="InlineCode">http.request.timestamp.msec</code> field.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">1484063137</code>
         </p>
         <p>When validating HMAC tokens in an expression, pass this field as the <em>currentTimestamp</em> argument to the <code class="InlineCode">is_timed_hmac_valid_v0()</code> <a href="/ruleset-engine/rules-language/functions/#hmac-validation">validation function</a>.
         </p>
      </td>
   </tr>
   <tr id="field-http-request-timestamp-msec">
      <td valign="top"><code>http.request.timestamp.msec</code><br />{{<type>}}Integer{{</type>}}</td>
      <td>
         <p>Represents the millisecond when Cloudflare received the request, between 0 and 999.
         </p>
         <p>To obtain the complete timestamp, use both <code class="InlineCode">http.request.timestamp.sec</code> and <code class="InlineCode">http.request.timestamp.msec</code> fields.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">857</code>
         </p>
      </td>
    </tr>
    <tr id="field-http-request-uri">
      <td valign="top"><code>http.request.uri</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the URI path and query string of the request.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">/articles/index?section=539061&expand=comments</code>
         </p>
      </td>
   </tr>
   <tr id="field-http-request-uri-path">
      <td valign="top"><code>http.request.uri.path</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the URI path of the request.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">/articles/index</code>
         </p>
      </td>
   </tr>
   <tr id="field-http-request-uri-path-extension">
      <td valign="top"><code>http.request.uri.path.extension</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>The lowercased file extension in the URI path without the dot (<code>.</code>) character. Corresponds to the string after the last dot in the URI path, without considering the query string.<br/>
         If the first character of the last path segment is a dot and the segment does not contain other dot characters, the field value will be an empty string (<code>""</code>). Having a dot as the first character does not represent a file extension and is commonly used in Unix-like systems to represent a hidden file or directory.
         </p>
         <details>
         <summary>Example values</summary>
         <div class="NoPadding">
          <table>
            <tr>
              <th>URI path</th>
              <th>Field value</th>
            </tr>
            <tr>
              <td><code>/foo</code></td>
              <td><code>""</code></td>
            </tr>
            <tr>
              <td><code>/foo.mp3</code></td>
              <td><code>"mp3"</code></td>
            </tr>
            <tr>
              <td><code>/.mp3</code></td>
              <td><code>""</code></td>
            </tr>
            <tr>
              <td><code>/.foo.mp3</code></td>
              <td><code>"mp3"</code></td>
            </tr>
            <tr>
              <td><code>/foo.tar.bz2</code></td>
              <td><code>"bz2"</code></td>
            </tr>
            <tr>
              <td><code>/foo.</code></td>
              <td><code>""</code></td>
            </tr>
            <tr>
              <td><code>/foo.MP3</code></td>
              <td><code>"mp3"</code></td>
            </tr>
          </table>
         </div>
         </details>
      </td>
   </tr>
   <tr id="field-http-request-uri-query">
      <td valign="top"><code class>http.request.uri.query</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the entire query string, without the <code class="InlineCode">?</code> delimiter.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">section=539061&expand=comments</code>
         </p>
      </td>
   </tr>
   <tr id="field-http-user-agent">
      <td valign="top"><code>http.user_agent</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the HTTP user agent, a request header that contains a characteristic string to allow identification of the client operating system and web browser.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36</code>
         </p>
      </td>
   </tr>
   <tr id="field-http-request-version">
      <td valign="top"><code>http.request.version</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the version of the HTTP protocol used. Use this field when you require different checks for different versions.
         </p>
         <p>Example Values:
            <ul>
               <li><code class="InlineCode">HTTP/1.1</code></li>
               <li><code class="InlineCode">HTTP/3</code></li>
            </ul>
         </p>
      </td>
   </tr>
   <tr id="field-http-x-forwarded-for">
      <td valign="top"><code>http.x_forwarded_for</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the full <code class="InlineCode">X-Forwarded-For</code> HTTP header.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">203.0.113.195, 70.41.3.18</code>
         </p>
      </td>
   </tr>
   <tr id="field-ip-src">
      <td valign="top"><code>ip.src</code><br />{{<type>}}IP&nbsp;address{{</type>}}</td>
      <td>
         <p> Represents the client TCP IP address, which may be adjusted to reflect the actual address of the client by using, for example, HTTP headers such as
         <code class="InlineCode">X-Forwarded-For</code> or <code class="InlineCode">X-Real-IP</code>.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">93.184.216.34</code>
         </p>
      </td>
   </tr>
   <tr id="field-ip-src-lat">
      <td valign="top"><code>ip.src.lat</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the latitude associated with the client IP address.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">37.78044</code>
         </p>
      </td>
   </tr>
   <tr id="field-ip-src-lon">
      <td valign="top"><code>ip.src.lon</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the longitude associated with the client IP address.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">-122.39055</code>
         </p>
      </td>
   </tr>
   <tr id="field-ip-src-city">
      <td valign="top"><code>ip.src.city</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the city associated with the client IP address.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">San Francisco</code>
         </p>
      </td>
   </tr>
   <tr id="field-ip-src-postal_code">
      <td valign="top"><code>ip.src.postal_code</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the postal code associated with the incoming request.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">78701</code>
         </p>
      </td>
   </tr>
   <tr id="field-ip-src-metro_code">
      <td valign="top"><code>ip.src.metro_code</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the metro code or Designated Market Area (DMA) code associated with the incoming request.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">635</code>
         </p>
      </td>
   </tr>
   <tr id="field-ip-src-region">
      <td valign="top"><code>ip.src.region</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the region name associated with the incoming request.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">Texas</code>
         </p>
      </td>
   </tr>
   <tr id="field-ip-src-region_code">
      <td valign="top"><code>ip.src.region_code</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the region code associated with the incoming request.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">TX</code>
         </p>
      </td>
   </tr>
   <tr id="field-ip-src-timezone-name">
      <td valign="top"><code>ip.src.timezone.name</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the name of the timezone associated with the incoming request.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">America/Chicago</code>
         </p>
         <p>This field is only available in rewrite expressions of <a href="/rules/transform/">Transform Rules</a>.</p>
      </td>
   </tr>
   <tr id="field-ip-src-asnum">
      <td valign="top"><code>ip.src.asnum</code><br />{{<type>}}Number{{</type>}}</td>
      <td>
         <p>Represents the 16- or 32-bit integer representing the Autonomous System (AS) number associated with client IP address.
         </p>
         <p><strong>Note:</strong> This field has the same value as the <code>ip.geoip.asnum</code> field, which is deprecated. The <code>ip.geoip.asnum</code> field is still available for new and existing rules, but you should use the <code>ip.src.asnum</code> field instead.</p>
      </td>
   </tr>
   <tr id="field-ip-src-continent">
      <td valign="top"><code>ip.src.continent</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the continent code associated with client IP address:
          <ul>
              <li>AF &#8211; Africa</li>
              <li>AN &#8211; Antarctica</li>
              <li>AS &#8211; Asia</li>
              <li>EU &#8211; Europe</li>
              <li>NA &#8211; North America</li>
              <li>OC &#8211; Oceania</li>
              <li>SA &#8211; South America</li>
              <li>T1 &#8211; Tor network</li>
          </ul>
        </p>
        <p><strong>Note:</strong> This field has the same value as the <code>ip.geoip.continent</code> field, which is deprecated. The <code>ip.geoip.continent</code> field is still available for new and existing rules, but you should use the <code>ip.src.continent</code> field instead.</p>
      </td>
   </tr>
   <tr id="field-ip-src-country">
      <td valign="top"><code>ip.src.country</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the 2-letter country code in <a href="https://www.iso.org/obp/ui/#search/code/">ISO 3166-1 Alpha 2</a> format.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">GB</code>
         </p>
         <p>For more information on the ISO 3166-1 Alpha 2 format, refer to <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 Alpha 2</a> on Wikipedia.</p>
         <p><strong>Note:</strong> This field has the same value as the <code>ip.geoip.country</code> field, which is deprecated. The <code>ip.geoip.country</code> field is still available for new and existing rules, but you should use the <code>ip.src.country</code> field instead.</p>
      </td>
   </tr>
   <tr id="field-ip-src-subdivision-1-iso-code">
      <td valign="top"><code>ip.src.subdivision_1_iso_code</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the ISO 3166-2 code for the first level region associated with the IP address. When the actual value is not available, this field contains an empty string.</p>
         <p>Example value:
         <br />
         <code class="InlineCode">GB-ENG</code></p>
         <p>For more information on the ISO 3166-2 standard and the available regions, refer to <a href="https://en.wikipedia.org/wiki/ISO_3166-2">ISO 3166-2</a> on Wikipedia.</p>
         <p><strong>Note:</strong> This field has the same value as the <code>ip.geoip.subdivision_1_iso_code</code> field, which is deprecated. The <code>ip.geoip.subdivision_1_iso_code</code> field is still available for new and existing rules, but you should use the <code>ip.src.subdivision_1_iso_code</code> field instead.</p>
      </td>
   </tr>
   <tr id="field-ip-src-subdivision-2-iso-code">
      <td valign="top"><code>ip.src.subdivision_2_iso_code</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the ISO 3166-2 code for the second level region associated with the IP address. When the actual value is not available, this field contains an empty string.
         </p>
         <p>Example value:
         <br />
         <code class="InlineCode">GB-SWK</code>
         </p>
         <p>For more information on the ISO 3166-2 standard and the available regions, refer to <a href="https://en.wikipedia.org/wiki/ISO_3166-2">ISO 3166-2</a> on Wikipedia.</p>
         <p><strong>Note:</strong> This field has the same value as the <code>ip.geoip.subdivision_2_iso_code</code> field, which is deprecated. The <code>ip.geoip.subdivision_2_iso_code</code> field is still available for new and existing rules, but you should use the <code>ip.src.subdivision_2_iso_code</code> field instead.</p>
      </td>
   </tr>
   <tr id="field-ip-src-is-in-european-union">
      <td valign="top"><code>ip.src.is_in_european_union</code><br />{{<type>}}Boolean{{</type>}}</td>
      <td>
         <p>Returns <code class="InlineCode">true</code> when the request originates from a country in the European Union (EU).</p>
         <details>
         <summary>Countries in EU (from geolocation data)</summary>
         <div>
          <table class="Small">
            <tr>
              <th>Country code</th>
              <th>Country name</th>
            </tr>
            <tr>
              <td><code>AT</code></td>
              <td>Austria</td>
            </tr>
            <tr>
              <td><code>AX</code></td>
              <td>Åland Islands</td>
            </tr>
            <tr>
              <td><code>BE</code></td>
              <td>Belgium</td>
            </tr>
            <tr>
              <td><code>BG</code></td>
              <td>Bulgaria</td>
            </tr>
            <tr>
              <td><code>CY</code></td>
              <td>Cyprus</td>
            </tr>
            <tr>
              <td><code>CZ</code></td>
              <td>Czechia</td>
            </tr>
            <tr>
              <td><code>DE</code></td>
              <td>Germany</td>
            </tr>
            <tr>
              <td><code>DK</code></td>
              <td>Denmark</td>
            </tr>
            <tr>
              <td><code>EE</code></td>
              <td>Estonia</td>
            </tr>
            <tr>
              <td><code>ES</code></td>
              <td>Spain</td>
            </tr>
            <tr>
              <td><code>FI</code></td>
              <td>Finland</td>
            </tr>
            <tr>
              <td><code>FR</code></td>
              <td>France</td>
            </tr>
            <tr>
              <td><code>GF</code></td>
              <td>French Guiana</td>
            </tr>
            <tr>
              <td><code>GP</code></td>
              <td>Guadeloupe</td>
            </tr>
            <tr>
              <td><code>GR</code></td>
              <td>Greece</td>
            </tr>
            <tr>
              <td><code>HR</code></td>
              <td>Croatia</td>
            </tr>
            <tr>
              <td><code>HU</code></td>
              <td>Hungary</td>
            </tr>
            <tr>
              <td><code>IE</code></td>
              <td>Ireland</td>
            </tr>
            <tr>
              <td><code>IT</code></td>
              <td>Italy</td>
            </tr>
            <tr>
              <td><code>LT</code></td>
              <td>Lithuania</td>
            </tr>
            <tr>
              <td><code>LU</code></td>
              <td>Luxembourg</td>
            </tr>
            <tr>
              <td><code>LV</code></td>
              <td>Latvia</td>
            </tr>
            <tr>
              <td><code>MF</code></td>
              <td>Saint Martin</td>
            </tr>
            <tr>
              <td><code>MQ</code></td>
              <td>Martinique</td>
            </tr>
            <tr>
              <td><code>MT</code></td>
              <td>Malta</td>
            </tr>
            <tr>
              <td><code>NL</code></td>
              <td>The Netherlands</td>
            </tr>
            <tr>
              <td><code>PL</code></td>
              <td>Poland</td>
            </tr>
            <tr>
              <td><code>PT</code></td>
              <td>Portugal</td>
            </tr>
            <tr>
              <td><code>RE</code></td>
              <td>Réunion</td>
            </tr>
            <tr>
              <td><code>RO</code></td>
              <td>Romania</td>
            </tr>
            <tr>
              <td><code>SE</code></td>
              <td>Sweden</td>
            </tr>
            <tr>
              <td><code>SI</code></td>
              <td>Slovenia</td>
            </tr>
            <tr>
              <td><code>SK</code></td>
              <td>Slovakia</td>
            </tr>
            <tr>
              <td><code>YT</code></td>
              <td>Mayotte</td>
            </tr>
          </table>
          <p>{{<markdown>}}The EU country list was obtained from MaxMind's GeoIP2 database on 2023-12-05. For details on obtaining up-to-date country information, refer to the [MaxMind website](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data).{{</markdown>}}</p>
         </div>
         </details>
         <p><strong>Note:</strong> This field has the same value as the <code>ip.geoip.is_in_european_union</code> field, which is deprecated. The <code>ip.geoip.is_in_european_union</code> field is still available for new and existing rules, but you should use the <code>ip.src.is_in_european_union</code> field instead.</p>
      </td>
  </tr>
  <tr id="field-raw-http-request-full-uri">
    <td valign="top"><code>raw.http.request.full_uri</code><br />{{<type>}}String{{</type>}}</td>
    <td>
      <p>Similar to the <a href="#field-http-request-full-uri"><code>http.request.full_uri</code></a> non-raw field. Represents the full URI as received by the web server without the URI fragment (if any) and without any transformation.
      </p>
      <p>Note: This raw field may include some basic normalization done by Cloudflare's HTTP server. However, this can change in the future.
      </p>
  </td>
  </tr>
  <tr id="field-raw-http-request-uri">
    <td valign="top"><code>raw.http.request.uri</code><br />{{<type>}}String{{</type>}}</td>
    <td>
      <p>Similar to the <a href="#field-http-request-uri"><code>http.request.uri</code></a> non-raw field. Represents the URI path and query string of the request without any transformation.
      </p>
      <p>Note: This raw field may include some basic normalization done by Cloudflare's HTTP server. However, this can change in the future.
      </p>
    </td>
  </tr>
  <tr id="field-raw-http-request-uri-path">
    <td valign="top"><code>raw.http.request.uri.path</code><br />{{<type>}}String{{</type>}}</td>
    <td>
      <p>Similar to the <a href="#field-http-request-uri-path"><code>http.request.uri.path</code></a> non-raw field. Represents the URI path of the request without any transformation.
      </p>
      <p>Note: This raw field may include some basic normalization done by Cloudflare's HTTP server. However, this can change in the future.
      </p>
    </td>
  </tr>
  <tr id="field-raw-http-request-uri-path-extension">
      <td valign="top"><code>raw.http.request.uri.path.extension</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Similar to the <a href="#field-http-request-uri-path-extension"><code>http.request.uri.path.extension</code></a> non-raw field. Represents the file extension in the request URI path without any transformation.
         </p>
      </td>
   </tr>
  <tr id="field-raw-http-request-uri-query">
    <td valign="top"><code>raw.http.request.uri.query</code><br />{{<type>}}String{{</type>}}</td>
    <td>
      <p>Similar to the <a href="#field-http-request-uri-query"><code>http.request.uri.query</code></a> non-raw field. Represents the entire query string without the <code class="InlineCode">?</code> delimiter and without any transformation.
      </p>
      <p>Note: This raw field may include some basic normalization done by Cloudflare's HTTP server. However, this can change in the future.
      </p>
    </td>
  </tr>
  <tr id="field-ssl">
      <td valign="top"><code>ssl</code><br />{{<type>}}Boolean{{</type>}}</td>
      <td>
         <p>Returns<code class="InlineCode">true</code> when the HTTP connection to the client is encrypted.
         </p>
      </td>
   </tr>
  </tbody>
</table>

## Dynamic fields

Dynamic fields represent computed or derived values, typically related to threat intelligence about an HTTP request.

{{<Aside type="note" header="Notes">}}

* Access to `cf.bot_management.*` fields requires a Cloudflare Enterprise plan with [Bot Management](/bots/plans/bm-subscription/) enabled.

* Access to `cf.waf.content_scan.*` fields requires a Cloudflare Enterprise plan with [WAF content scanning](/waf/about/content-scanning/) enabled.

* The `cf.tls_client_auth.*` string fields are only filled in if the request includes a client certificate for [mTLS authentication](/ssl/client-certificates/enable-mtls/).

{{</Aside>}}

The Cloudflare Rules language supports these dynamic fields:

<table>
  <thead>
   <tr>
      <th style="width: 51%;">Field Name</th>
      <th>Description</th>
   </tr>
  </thead>
  <tbody style='vertical-align:top'>
    <tr id="field-cf-bot_management-verified_bot">
        <td><p><code>cf.bot_management.verified_bot</code><br />{{<type>}}Boolean{{</type>}}</p>
        </td>
        <td>
          <p>When <code class="InlineCode">true</code>, this field indicates the request originated from a known good bot or crawler. Provides the same information as <code class="InlineCode">cf.client.bot</code>.
          </p>
        </td>
    </tr>
    <tr id="field-cf-bot_management-verified_bot_categories">
        <td><p><code>cf.verified_bot_category</code><br />{{<type>}}String{{</type>}}</p>
        </td>
        <td>
          <p>Provides the type and purpose of a verified bot.</p>
          <p>For more details, refer to <a href="/bots/reference/verified-bot-categories/">Verified Bot Categories</a>.
          </p>
        </td>
    </tr>
    <tr id="field-cf-bot_management-score">
        <td><p><code>cf.bot_management.score</code><br />{{<type>}}Number{{</type>}}</p>
        </td>
        <td>
          <p>Represents the likelihood that a request originates from a bot using a score from 1&#8211;99.
          </p>
          <p>A low score indicates that the request comes from a bot or an automated agent. A high score indicates that a human issued the request.
          </p>
        </td>
    </tr>
     <tr id="field-cf-bot_management-static_resource">
        <td><p><code>cf.bot_management.static_resource</code><br />{{<type>}}Boolean{{</type>}}</p>
        </td>
        <td>
          <p>Indicates whether static resources should be included when you create a rule using <code>cf.bot_management.score</code>.
          </p>
          <p>For more details, refer to <a href="/bots/reference/static-resources/">Static resource protection</a>.
          </p>
        </td>
    </tr>
    <tr id="field-cf-bot_management-ja3_hash">
        <td><p><code>cf.bot_management.ja3_hash</code><br />{{<type>}}String{{</type>}}</p>
        </td>
        <td>
          <p>Provides an SSL/TLS fingerprint to help you identify potential bot requests.
          </p>
          <p>For more details, refer to <a href="/bots/concepts/ja3-ja4-fingerprint/">JA3/JA4 Fingerprint</a>.
          </p>
        </td>
    </tr>
    <tr id="field-cf-bot_management-ja4">
        <td><p><code>cf.bot_management.ja4</code><br />{{<type>}}String{{</type>}}</p>
        </td>
        <td>
          <p>Provides an SSL/TLS fingerprint to help you identify potential bot requests.
          </p>
          <p>For more details, refer to <a href="/bots/concepts/ja3-ja4-fingerprint/">JA3/JA4 Fingerprint</a>.
          </p>
        </td>
    </tr>
    <tr id="field-cf-bot_management-js_detection-passed">
        <td><p><code>cf.bot_management.js_detection.passed</code><br />{{<type>}}Boolean{{</type>}}</p>
        </td>
        <td>
          <p>Indicates whether the visitor has previous passed a JS Detection.
          </p>
          <p>For more details, refer to <a href="/bots/reference/javascript-detections/">JavaScript detections</a>.
          </p>
        </td>
    </tr>
   <tr id="field-cf-bot_management-detection_ids">
        <td><p><code>cf.bot_management.detection_ids</code><br />{{<type>}}Array&lt;Number>{{</type>}}</p>
        </td>
        <td>
          <p>List of IDs that correlate to the Bot Management heuristic detections made on a request (you can have multiple heuristic detections on the same request). Use this field to explicitly match a specific heuristic or to exclude a heuristic in a rule.
          </p>
          <p>Example:
          <br />
          <code class="InlineCode">any(cf.bot_management.detection_ids[*] eq 33554817)</code>
          </p>
        </td>
    </tr>
    <tr id="field-cf-client-bot">
        <td><code>cf.client.bot</code><br />{{<type>}}Boolean{{</type>}}</td>
        <td>
          <p>When <code class="InlineCode">true</code>, this field indicates the request originated from a known good bot or crawler. Provides the same information as <code class="InlineCode">cf.bot_management.verified_bot</code>.</p>
        </td>
    </tr>
    <tr id="field-cf-edge-server_ip">
        <td><code>cf.edge.server_ip</code><br />{{<type>}}IP Address{{</type>}}</td>
        <td>
          <p>Represents the global network's IP address to which the HTTP request has resolved to.
          </p>
          <p>This field is only meaningful for <a href="/byoip/">BYOIP customers</a>.
          </p>
        </td>
    </tr>
    <tr id="field-cf-edge-server_port">
        <td><code>cf.edge.server_port</code><br />{{<type>}}Number{{</type>}}</td>
        <td>
          <p>Represents the port number at which the Cloudflare global network received the request.
          </p>
          <p>Use this field to filter traffic on a specific port. The value is a port number in the range 1–65535.</p>
        </td>
    </tr>
    <tr id="field-cf-hostname-metadata">
        <td><code>cf.hostname.metadata</code><br />{{<type>}}String{{</type>}}</td>
        <td>
          <p>Returns the string representation of the per-hostname <a href="/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/">custom metadata</a> JSON object set by SSL for SaaS customers.
          </p>
        </td>
    </tr>
    <tr id="field-cf-random_seed">
        <td><code>cf.random_seed</code><br />{{<type>}}Bytes{{</type>}}</td>
        <td>
          <p>Returns per-request random bytes that you can use in the <a href="/ruleset-engine/rules-language/functions/#function-uuidv4"><code>uuidv4()</code></a> function.
          </p>
        </td>
    </tr>
    <tr id="field-cf-ray_id">
      <td><code>cf.ray_id</code><br />{{<type>}}String{{</type>}}</td>
      <td>
        <p>The Ray ID of the current request. A <a href="/fundamentals/reference/cloudflare-ray-id/">Ray ID</a> is an identifier given to every request that goes through Cloudflare.
        </p>
      </td>
    </tr>
    <tr id="field-cf-threat_score">
        <td><code>cf.threat_score</code><br />{{<type>}}Number{{</type>}}</td>
        <td>
          <p>Represents a Cloudflare threat score from 0&#8211;100, where 0 indicates low risk. Values above 10 may represent spammers or bots, and values above 40 identify bad actors on the Internet.
          </p>
          <p>It is rare to see values above 60. A common recommendation is to challenge requests with a score above 10 and to block those above 50.
          </p>
        </td>
    </tr>
    <tr id="field-cf-tls_cipher">
      <td><code>cf.tls_cipher</code><br />{{<type>}}String{{</type>}}</td>
      <td>
        <p>
          The cipher for the connection to Cloudflare.
        </p>
        <p>Example:<br/>
        <code>"AES128-SHA256"</code>
        </p>
      </td>
    </tr>
    <tr id="field-cf-tls_client_auth-cert_revoked">
      <td><code>cf.tls_client_auth.cert_revoked</code><br />{{<type>}}Boolean{{</type>}}</td>
      <td>
      <p>
      Returns <code class="InlineCode">true</code> when a request presents a valid but revoked client certificate.
      </p>
      <p>When <code class="InlineCode">true</code>, the <code class="InlineCode">cf.tls_client_auth.cert_verified</code> field is also <code class="InlineCode">true</code>.
      </p>
      </td>
    </tr>
    <tr id="field-cf-tls_client_auth-cert_verified">
      <td><code>cf.tls_client_auth.cert_verified</code><br />{{<type>}}Boolean{{</type>}}</td>
      <td>
      <p>Returns <code class="InlineCode">true</code> when a request presents a valid client certificate.
      </p>
      <p> Also returns <code class="InlineCode">true</code> when a request includes a valid certificate that was revoked (see <code>cf.tls_client_auth.cert_revoked</code>).
      </p></td>
    </tr>
    <tr id="field-cf-tls_client_auth-cert_presented">
      <td><code>cf.tls_client_auth.cert_presented</code><br />{{<type>}}Boolean{{</type>}}</td>
      <td>
      <p>
      Returns <code class="InlineCode">true</code> when a request presents a certificate (valid or not).
      </p>
      </td>
    </tr>
    <tr id="field-cf-tls_client_auth-cert_issuer_dn">
      <td><code>cf.tls_client_auth.cert_issuer_dn</code><br />{{<type>}}String{{</type>}}</td>
      <td>
      <p>The Distinguished Name (DN) of the Certificate Authority (CA) that issued the certificate included in the request.
      </p>
      <p>Example:<br/>
      <code>"CN=Access Testing CA,OU=TX,O=Access Testing,L=Austin,ST=Texas,C=US"</code>
      </p></td>
    </tr>
    <tr id="field-cf-tls_client_auth-cert_subject_dn">
      <td><code>cf.tls_client_auth.cert_subject_dn</code><br />{{<type>}}String{{</type>}}</td>
      <td>
      <p>The Distinguished Name (DN) of the owner (or requester) of the certificate included in the request.
      </p>
      <p>Example:<br/>
      <code>"CN=James Royal,OU=Access Admins,O=Access,L=Austin,ST=Texas,C=US"</code>
      </p></td>
    </tr>
    <tr id="field-cf-tls_client_auth-cert_issuer_dn_rfc2253">
      <td><code>cf.tls_client_auth.cert_issuer_dn_rfc2253</code><br />{{<type>}}String{{</type>}}</td>
      <td>
      <p>The Distinguished Name (DN) of the Certificate Authority (CA) that issued the certificate in the request in <a href="https://datatracker.ietf.org/doc/html/rfc2253">RFC 2253</a> format.
      </p>
      <p>Example:<br/>
      <code>"CN=Access Testing CA,OU=TX,O=Access Testing,L=Austin,ST=Texas,C=US"</code>
      </p></td>
    </tr>
    <tr id="field-cf-tls_client_auth-cert_subject_dn_rfc2253">
      <td><code>cf.tls_client_auth.cert_subject_dn_rfc2253</code><br />{{<type>}}String{{</type>}}</td>
      <td>
      <p>The Distinguished Name (DN) of the owner (or requester) of the certificate in the request in <a href="https://datatracker.ietf.org/doc/html/rfc2253">RFC 2253</a> format.
      </p>
      <p>Example:<br/>
      <code>"CN=James Royal,OU=Access Admins,O=Access,L=Austin,ST=Texas,C=US"</code>
      </p></td>
    </tr>
    <tr id="field-cf-tls_client_auth-cert_issuer_dn_legacy">
      <td><code>cf.tls_client_auth.cert_issuer_dn_legacy</code><br />{{<type>}}String{{</type>}}</td>
      <td>
      <p>The Distinguished Name (DN) of the Certificate Authority (CA) that issued the certificate in the request in a legacy format.
      </p>
      <p>Example:<br/>
      <code>"/C=US/ST=Texas/L=Austin/O=Access Testing/OU=TX/CN=Access Testing CA"</code>
      </p></td>
    </tr>
    <tr id="field-cf-tls_client_auth-cert_subject_dn_legacy">
      <td><code>cf.tls_client_auth.cert_subject_dn_legacy</code><br />{{<type>}}String{{</type>}}</td>
      <td>
      <p>The Distinguished Name (DN) of the owner (or requester) of the certificate in the request in a legacy format.
      </p>
      <p>Example:<br/>
      <code>"/C=US/ST=Texas/L=Austin/O=Access/OU=Access Admins/CN=James Royal"</code>
      </p></td>
    </tr>
    <tr id="field-cf-tls_client_auth-cert_serial">
      <td><code>cf.tls_client_auth.cert_serial</code><br />{{<type>}}String{{</type>}}</td>
      <td>
      <p>Serial number of the certificate in the request.
      </p>
      <p>Example:<br/>
      <code>"527E0F20A20EA2A4146C78390F34CE7AF0878CA4"</code>
      </p></td>
    </tr>
    <tr id="field-cf-tls_client_auth-cert_issuer_serial">
      <td><code>cf.tls_client_auth.cert_issuer_serial</code><br />{{<type>}}String{{</type>}}</td>
      <td>
      <p>Serial number of the direct issuer of the certificate in the request.
      </p>
      <p>Example:<br/>
      <code>"2688201DBA77402EA87118876F2E1B24CF8B0395"</code>
      </p></td>
    </tr>
    <tr id="field-cf-tls_client_auth-cert_fingerprint_sha256">
      <td><code>cf.tls_client_auth.cert_fingerprint_sha256</code><br />{{<type>}}String{{</type>}}</td>
      <td>
      <p>The SHA-256 fingerprint of the certificate in the request.
      </p>
      <p>Example:<br/>
      <code>"af363dc85bc942a892d3cee9796190fdb36d89cd588a4f1cb17c74a943439714"</code>
      </p></td>
    </tr>
    <tr id="field-cf-tls_client_auth-cert_fingerprint_sha1">
      <td><code>cf.tls_client_auth.cert_fingerprint_sha1</code><br />{{<type>}}String{{</type>}}</td>
      <td>
      <p>The SHA-1 fingerprint of the certificate in the request.
      </p>
      <p>Example:<br/>
      <code>"933ad5282c560ae3f482a43ecd73bc9de878a190"</code>
      </p></td>
    </tr>
    <tr id="field-cf-tls_client_auth-cert_not_before">
      <td><code>cf.tls_client_auth.cert_not_before</code><br />{{<type>}}String{{</type>}}</td>
      <td>
      <p>The certificate in the request is not valid before this date.
      </p>
      <p>Example:<br/>
      <code>"Mar 21 13:35:00 2022 GMT"</code>
      </p></td>
    </tr>
    <tr id="field-cf-tls_client_auth-cert_not_after">
      <td><code>cf.tls_client_auth.cert_not_after</code><br />{{<type>}}String{{</type>}}</td>
      <td>
      <p>The certificate in the request is not valid after this date.
      </p>
      <p>Example:<br/>
      <code>"Mar 21 13:35:00 2023 GMT"</code>
      </p></td>
    </tr>
    <tr id="field-cf-tls_client_auth-cert_ski">
      <td><code>cf.tls_client_auth.cert_ski</code><br />{{<type>}}String{{</type>}}</td>
      <td>
      <p>The Subject Key Identifier (SKI) of the certificate in the request.
      </p>
      <p>Example:<br/>
      <code>"27846FAE6EAC4A8DAD9101B519CF1EB460242831"</code>
      </p></td>
    </tr>
    <tr id="field-cf-tls_client_auth-cert_issuer_ski">
      <td><code>cf.tls_client_auth.cert_issuer_ski</code><br />{{<type>}}String{{</type>}}</td>
      <td>
      <p>The Subject Key Identifier (SKI) of the direct issuer of the certificate in the request.
      </p>
      <p>Example:<br/>
      <code>"8204924CF49D471E855862706D889F58F6B784D3"</code>
      </p></td>
    </tr>
    <tr id="field-cf-tls_client_extensions_sha1">
      <td><code>cf.tls_client_extensions_sha1</code><br />{{<type>}}String{{</type>}}</td>
      <td>
      <p>The SHA-1 fingerprint of TLS client extensions, encoded in Base64.
      </p>
      <p>Example:<br/>
      <code>"OWFiM2I5ZDc0YWI0YWYzZmFkMGU0ZjhlYjhiYmVkMjgxNTU5YTU2Mg=="</code>
      </p></td>
    </tr>
    <tr id="field-cf-tls_client_hello_length">
      <td><code>cf.tls_client_hello_length</code><br />{{<type>}}Number{{</type>}}</td>
      <td>
      <p>The length of the client hello message sent in a <a href="https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/">TLS handshake</a>. Specifically, the length of the bytestring of the client hello.
      </p>
      <p>Example:<br/>
      <code>508</code>
      </p>
      </td>
    </tr>
    <tr id="field-cf-tls_client_random">
      <td><code>cf.tls_client_random</code><br />{{<type>}}String{{</type>}}</td>
      <td>
      <p>The value of the 32-byte random value provided by the client in a <a href="https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/">TLS handshake</a>, encoded in Base64. Refer to <a href="https://datatracker.ietf.org/doc/html/rfc8446#section-4.1.2">RFC 8446</a> for more details.
      </p>
      <p>Example:<br/>
      <code>"YWJjZA=="</code>
      </p></td>
    </tr>
    <tr id="field-cf-tls_version">
      <td><code>cf.tls_version</code><br />{{<type>}}String{{</type>}}</td>
      <td>
        <p>The TLS version of the connection to Cloudflare.
        </p>
        <p>Example:<br/>
        <code>"TLSv1.2"</code>
        </p>
      </td>
    </tr>
    <tr id="field-cf-waf-content_scan-has_obj">
        <td><code>cf.waf.content_scan.has_obj</code><br />{{<type>}}Boolean{{</type>}}</td>
        <td>
          <p>When true, the request contains at least one {{<markdown>}}{{<glossary-tooltip term_id="content object">}}content object{{</glossary-tooltip>}}{{</markdown>}}.
          </p>
          <p>For more details, refer to <a href="/waf/about/content-scanning/">Uploaded content scanning</a>.</p>
        </td>
    </tr>
    <tr id="field-cf-waf-content_scan-has_malicious_obj">
        <td><code>cf.waf.content_scan.has_malicious_obj</code><br />{{<type>}}Boolean{{</type>}}</td>
        <td>
          <p>When true, the request contains at least one malicious content object.
          </p>
          <p>For more details, refer to <a href="/waf/about/content-scanning/">Uploaded content scanning</a>.</p>
        </td>
    </tr>
    <tr id="field-cf-waf-content_scan-num_malicious_obj">
        <td><code>cf.waf.content_scan.num_malicious_obj</code><br />{{<type>}}Integer{{</type>}}</td>
        <td>
          <p>The number of malicious content objects detected in the request (zero or greater).
          </p>
          <p>For more details, refer to <a href="/waf/about/content-scanning/">Uploaded content scanning</a>.</p>
        </td>
    </tr>
    <tr id="field-cf-waf-content_scan-has_failed">
      <td><code>cf.waf.content_scan.has_failed</code><br />{{<type>}}Boolean{{</type>}}</td>
      <td>
        <p>When true, the file scanner was unable to scan all the content objects detected in the request.
        </p>
        <p>For more details, refer to <a href="/waf/about/content-scanning/">Uploaded content scanning</a>.</p>
        </td>
    </tr>
    <tr id="field-cf-waf-content_scan-num_obj">
      <td><code>cf.waf.content_scan.num_obj</code><br />{{<type>}}Integer{{</type>}}</td>
      <td>
        <p>The number of content objects detected in the request (zero or greater).
        </p>
        <p>For more details, refer to <a href="/waf/about/content-scanning/">Uploaded content scanning</a>.</p>
        </td>
    </tr>
    <tr id="field-cf-waf-content_scan-obj_sizes">
      <td><code>cf.waf.content_scan.obj_sizes</code><br />{{<type>}}Array&lt;Integer&gt;{{</type>}}</td>
      <td>
        <p>An array of file sizes in bytes, in the order the content objects were detected in the request.
        </p>
        <p>For more details, refer to <a href="/waf/about/content-scanning/">Uploaded content scanning</a>.</p>
        </td>
    </tr>
    <tr id="field-cf-waf-content_scan-obj_types">
      <td><code>cf.waf.content_scan.obj_types</code><br />{{<type>}}Array&lt;String&gt;{{</type>}}</td>
      <td>
        <p>An array of file types in the order the content objects were detected in the request.
        </p>
        <p>If Cloudflare cannot determine the file type of a content object, the corresponding value in the <code>obj_types</code>array will be <code>application/octet-stream</code>.
        </p>
        <p>For more details, refer to <a href="/waf/about/content-scanning/">Uploaded content scanning</a>.</p>
        </td>
    </tr>
    <tr id="field-cf-waf-content_scan-obj_results">
      <td><code>cf.waf.content_scan.obj_results</code><br />{{<type>}}Array&lt;String&gt;{{</type>}}</td>
      <td>
        <p>An array of scan results in the order the content objects were detected in the request.
        </p>
        <p>The possible values are: <code>clean</code>, <code>suspicious</code>, <code>infected</code>, and <code>not scanned</code>.
        </p>
        <p>For more details, refer to <a href="/waf/about/content-scanning/">Uploaded content scanning</a>.
        </p>
      </td>
    </tr>
    <tr id="field-cf-waf-score">
        <td><code>cf.waf.score</code><br />{{<type>}}Number{{</type>}}</td>
        <td>
          <p>A global score from 1 to 99 that combines the score of each WAF attack vector into a single score.<br/>
      This is the standard <a href="/waf/about/waf-attack-score/">WAF attack score</a> to detect variants of attack patterns.
          </p>
        </td>
    </tr>
    <tr id="field-cf-waf-score-sqli">
        <td><code>cf.waf.score.sqli</code><br />{{<type>}}Number{{</type>}}</td>
        <td>
          <p>An attack score from 1 to 99 classifying the SQL injection (SQLi) attack vector.
          </p>
        </td>
    </tr>
    <tr id="field-cf-waf-score-xss">
        <td><code>cf.waf.score.xss</code><br />{{<type>}}Number{{</type>}}</td>
        <td>
          <p>An attack score from 1 to 99 classifying the cross-site scripting (XSS) attack vector.
          </p>
        </td>
    </tr>
    <tr id="field-cf-waf-score-rce">
        <td><code>cf.waf.score.rce</code><br />{{<type>}}Number{{</type>}}</td>
        <td>
          <p>An attack score from 1 to 99 classifying the command injection or Remote Code Execution (RCE) attack vector.
          </p>
        </td>
    </tr>
    <tr id="field-cf-waf-score-class">
        <td><code>cf.waf.score.class</code><br />{{<type>}}String{{</type>}}</td>
        <td>
          <p>The attack score class of the current request, based on the WAF attack score.<br/>Can have one of the following values: <code>attack</code>, <code>likely_attack</code>, <code>likely_clean</code>, <code>clean</code>.
          </p>
        </td>
    </tr>
    <tr id="field-cf-worker-upstream_zone">
      <td><code>cf.worker.upstream_zone</code> <br />{{<type>}}String{{</type>}}</td>
      <td>
        <p>Identifies whether a request comes from a worker or not.</p>
        <p>When a request comes from a worker, this field will hold the name of the zone for that worker. Otherwise <code class="InlineCode">cf.worker.upstream_zone</code> is empty.</p>
      </td>
    </tr>
  </tbody>
</table>

### Corporate Proxy

{{<render file="_corporate_proxy.md" productFolder="/bots/">}}

## Magic Firewall fields

{{<Aside type="note">}}Some Magic Firewall fields are available only to customers who purchased Magic Firewall's advanced features. Refer to [Magic Firewall plans](/magic-firewall/plans/) for more information.{{</Aside>}}

<table>
  <thead>
   <tr>
      <th style="width: 50%;">Field Name</th>
      <th>Description</th>
   </tr>
  </thead>
  <tbody style='vertical-align:top'>
    <tr id="field-cf-colo-name">
        <td><p><code>cf.colo.name</code><br />{{<type>}}String{{</type>}}</p>
        </td>
        <td>
        The data center that is handling this traffic.  <br />
        Example value: <code class="InlineCode"> sfo06 </code>
        </td>
    </tr>
    <tr id="field-cf-colo-region">
        <td><p><code>cf.colo.region</code><br />{{<type>}}String{{</type>}}</p>
        </td>
        <td>
        Region of the data center that is handling this traffic.<br />
        Example value: <code class="InlineCode"> WNAM </code>
        </td>
    </tr>
    <tr id="field-icmp">
        <td><p><code>icmp</code><br />{{<type>}}String{{</type>}}</p>
        </td>
        <td>
        The raw ICMP packet as a list of bytes. It should be used in conjunction with the bit_slice function when other structured fields are lacking.
        </td>
    </tr>
    <tr id="field-icmp-type">
        <td><p><code>icmp.type</code><br />{{<type>}}Number{{</type>}}</p>
        </td>
        <td>
         The <a href="https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol#header_type">ICMP type</a>. Only applies to ICMP packets.<br />
         Example value:
         <code class="InlineCode">8</code>
        </td>
    </tr>
    <tr id="field-icmp-code">
        <td><p><code>icmp.code</code><br />{{<type>}}Number{{</type>}}</p>
        </td>
        <td>
         The <a href="https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol#header_code">ICMP code</a>. Only applies to ICMP packets.<br />
         Example value:
         <code class="InlineCode">2</code>
        </td>
    </tr>
    <tr id="field-ip">
        <td><p><code>ip</code><br />{{<type>}}String{{</type>}}</p>
        </td>
        <td>
        The raw IP packet as a list of bytes. It should be used in conjunction with the bit_slice function when other structured fields are lacking.
        </td>
    </tr>
    <tr id="field-ip-dst">
        <td><p><code>ip.dst</code><br />{{<type>}}IP Address{{</type>}}</p>
        </td>
        <td>
         The destination address as specified in the IP packet.<br />
         Example value:
         <code class="InlineCode">192.0.2.2</code>
        </td>
    </tr>
    <tr id="field-ip-dst-country">
        <td><p><code>ip.dst.country</code><br />{{<type>}}String{{</type>}}</p>
        </td>
        <td>
         Represents the 2-letter country code associated with the server IP address in <a href="https://www.iso.org/obp/ui/#search/code/">ISO 3166-1 Alpha 2</a> format.<br />
         Example value:
         <code class="InlineCode">GB</code>
         <p>For more information on the ISO 3166-1 Alpha 2 format, refer to <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 Alpha 2</a> on Wikipedia.</p>
        </td>
    </tr>
    <tr id="field-ip-src-country">
        <td><p><code>ip.src.country</code><br />{{<type>}}String{{</type>}}</p>
        </td>
        <td>
         <p>Represents the 2-letter country code associated with the client IP address in <a href="https://www.iso.org/obp/ui/#search/code/">ISO 3166-1 Alpha 2</a> format.<br />
            Example value:<br />
            <code>GB</code>
         </p>
         <p>For more information on the ISO 3166-1 Alpha 2 format, refer to <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 Alpha 2</a> on Wikipedia.</p>
         <p>For Magic Firewall, the <code>ip.geoip.country</code> field (which is deprecated) will match on either source or destination address. The <code>ip.geoip.country</code> field is still available for new and existing rules, but you should use the <code>ip.src.country</code> and/or <code>ip.dst.country</code> fields instead.</p>
        </td>
    </tr>
    <tr id="field-ip-hdr_len">
        <td><p><code>ip.hdr_len</code><br />{{<type>}}Number{{</type>}}</p>
        </td>
        <td>
         The length of the IPv4 header in bytes.<br />
         Example value:
         <code class="InlineCode">5</code>
        </td>
    </tr>
    <tr id="field-ip-len">
        <td><p><code>ip.len</code><br />{{<type>}}Number{{</type>}}</p>
        </td>
        <td>
         The length of the packet including the header.<br />
         Example value:
         <code class="InlineCode">60</code>
        </td>
    </tr>
    <tr id="field-ip-opt-type">
        <td><p><code>ip.opt.type</code><br />{{<type>}}Number{{</type>}}</p>
        </td>
        <td>
         The first byte of <a href="https://en.wikipedia.org/wiki/IPv4#Options">IP options field</a>, if the options field is set.<br />
         Example value:
         <code class="InlineCode">25</code>
        </td>
    </tr>
    <tr id="field-ip-proto">
        <td><p><code>ip.proto</code><br />{{<type>}}String{{</type>}}</p>
        </td>
        <td>
        The transport layer for the packet, if it can be determined.<br />
        Example values: <code class="InlineCode">icmp</code>, <code class="InlineCode">tcp</code>
        </td>
    </tr>
    <tr id="field-ip-src">
        <td><p><code>ip.src</code><br />{{<type>}}IP Address{{</type>}}</p>
        </td>
        <td>
        The source address of the IP Packet.
        </td>
    </tr>
    <tr id="field-ip-src-country">
        <td><p><code>ip.src.country</code><br />{{<type>}}String{{</type>}}</p>
        </td>
        <td>
         Represents the 2-letter country code associated with the client IP address in <a href="https://www.iso.org/obp/ui/#search/code/">ISO 3166-1 Alpha 2</a> format.<br />
         Example value:
         <code class="InlineCode">GB</code>
         <p>For more information on the ISO 3166-1 Alpha 2 format, refer to <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 Alpha 2</a> on Wikipedia.</p>
        </td>
    </tr>
    <tr id="field-ip-ttl">
        <td><p><code>ip.ttl</code><br />{{<type>}}Number{{</type>}}</p>
        </td>
        <td>
        The time-to-live of the IP Packet.<br />
        Example values: <code class="InlineCode">54</code>
        </td>
    </tr>
    <tr id="field-sip">
        <td><p><code>sip</code><br />{{<type>}}Boolean{{</type>}}</p>
        </td>
        <td>
       Determines if packets are valid L7 protocol <a href="https://datatracker.ietf.org/doc/html/rfc2543">SIP</a>. Requires UDP packets to operate. <br />
       Use a guard clause as shown below to ensure the packet is UDP (wirefilter):<br />
       <code class="InlineCode">ip.proto == "udp"</code>
        </td>
    </tr>
    <tr id="field-tcp">
        <td><p><code>tcp</code><br />{{<type>}}String{{</type>}}</p>
        </td>
        <td>
        The raw TCP packet as a list of bytes. It should be used in conjunction with the bit_slice function when other structured fields are lacking.
        </td>
    </tr>
    <tr id="field-tcp-flags">
        <td><p><code>tcp.flags</code><br />{{<type>}}Number{{</type>}}</p>
        </td>
        <td>
        The numeric value of the TCP flags byte.
        </td>
    </tr>
    <tr id="field-tcp-flags-ack">
        <td><p><code>tcp.flags.ack</code><br />{{<type>}}Boolean{{</type>}}</p>
        </td>
        <td>
        TCP acknowledgment flag.
        </td>
    </tr>
    <tr id="field-tcp-flags-cwr">
        <td><p><code>tcp.flags.cwr</code><br />{{<type>}}Boolean{{</type>}}</p>
        </td>
        <td>
        TCP congestion window reduced flag.
        </td>
    </tr>
    <tr id="field-tcp-flags-ecn">
        <td><p><code>tcp.flags.ecn</code><br />{{<type>}}Boolean{{</type>}}</p>
        </td>
        <td>
        TCP ECN-Echo flag.
        </td>
    </tr>
    <tr id="field-tcp-flags-fin">
        <td><p><code>tcp.flags.fin</code><br />{{<type>}}Boolean{{</type>}}</p>
        </td>
        <td>
        TCP flag indicating this is the last packet from sender.
        </td>
    </tr>
    <tr id="field-tcp-flags-push">
        <td><p><code>tcp.flags.push</code><br />{{<type>}}Boolean{{</type>}}</p>
        </td>
        <td>
        TCP push flag.
        </td>
    </tr>
    <tr id="field-tcp-flags-reset">
        <td><p><code>tcp.flags.reset</code><br />{{<type>}}Boolean{{</type>}}</p>
        </td>
        <td>
        TCP reset flag.
        </td>
    </tr>
    <tr id="field-tcp-flags-syn">
        <td><p><code>tcp.flags.syn</code><br />{{<type>}}Boolean{{</type>}}</p>
        </td>
        <td>
        TCP synchronize flag.
        </td>
    </tr>
    <tr id="field-tcp-flags-urg">
        <td><p><code>tcp.flags.urg</code><br />{{<type>}}Boolean{{</type>}}</p>
        </td>
        <td>
        TCP urgent flag.
        </td>
    </tr>
    <tr id="field-tcp-srcport">
        <td><p><code>tcp.srcport</code><br />{{<type>}}Number{{</type>}}</p>
        </td>
        <td>
        Source port number of the IP packet. Only applies to TCP packets.
        </td>
    </tr>
    <tr id="field-tcp-dstport">
        <td><p><code>tcp.dstport</code><br />{{<type>}}Number{{</type>}}</p>
        </td>
        <td>
        Destination port number of the IP packet. Only applies to TCP packets.
        </td>
    </tr>
    <tr id="field-udp">
        <td><p><code>udp</code><br />{{<type>}}String{{</type>}}</p>
        </td>
        <td>
        The raw UDP packet as a list of bytes. It should be used in conjunction with the bit_slice function when other structured fields are lacking.
        </td>
    </tr>
    <tr id="field-udp-dstport">
        <td><p><code>udp.dstport</code><br />{{<type>}}Number{{</type>}}</p>
        </td>
        <td>
        Destination port number of the IP packet. Only applies to UDP packets.
        </td>
    </tr>
    <tr id="field-udp-srcport">
        <td><p><code>udp.srcport</code><br />{{<type>}}Number{{</type>}}</p>
        </td>
        <td>
        Source port number of the IP packet. Only applies to UDP packets.
        </td>
    </tr>
  </tbody>
</table>

## URI argument and value fields

The Cloudflare Rules language includes URI argument and value fields associated with HTTP requests. Many of these fields return [arrays](/ruleset-engine/rules-language/values/#arrays) containing the respective values.

The Cloudflare Rules language supports these URI argument and value fields:

<table>
  <thead>
    <tr>
      <th style="width: 50%;">Field Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr id="field-http-request-uri-args">
      <td valign="top"><code>http.request.uri.args</code><br />{{<type>}}Map&lt;Array&lt;String&gt;&gt;{{</type>}}</td>
       <td>
        <p>Represents the HTTP URI arguments associated with a request as a Map (associative array).
        </p>
        <p>When an argument repeats, then the array contains multiple items in the order they appear in the request.
        </p>
        <p>The values are not pre-processed and retain the original case used in the request.</p>
        <p><em>Decoding:</em> no decoding performed
        <br /><em>Non-ASCII:</em> preserved
        </p>
        <p>Example:
        <br /><code class="InlineCode">any(http.request.uri.args["search"][*] == "red+apples")</code>
        </p>
        <p>Example value:
        <br /><code class="InlineCode">{"search": ["red+apples"]}</code>
        </p>
      </td>
    </tr>
    <tr id="field-http-request-uri-args-names">
      <td valign="top"><code>http.request.uri.args.names</code><br />{{<type>}}Array&lt;String>{{</type>}}</td>
      <td>
        <p>Represents the names of the arguments in the HTTP URI query string. The names are not pre-processed and retain the original case used in the request.
        </p>
        <p>When a name repeats, the array contains multiple items in the order that they appear in the request.
        </p>
        <p><em>Decoding:</em> no decoding performed
        <br /><em>Non-ASCII:</em> preserved
        </p>
        <p>Example:
        <br /><code class="InlineCode">any(http.request.uri.args.names[*] == "search")</code>
        </p>
        <p>Example value:
        <br /><code class="InlineCode">["search"]</code>
        </p>
      </td>
    </tr>
    <tr id="field-http-request-uri-args-values">
      <td valign="top"><code>http.request.uri.args.values</code><br />{{<type>}}Array&lt;String>{{</type>}}</td>
      <td>
        <p>Represents the values of arguments in the HTTP URI query string. The values are not pre-processed and retain the original case used in the request. They are in the same order as in the request.
        </p>
        <p>Duplicated values are listed multiple times.
        </p>
        <p><em>Decoding:</em> no decoding performed
        <br /><em>Non-ASCII:</em> preserved
        </p>
        <p>Example:
        <br /><code class="InlineCode">any(http.request.uri.args.values[*] == "red+apples")</code>
        </p>
        <p>Example value:
        <br /><code class="InlineCode">["red+apples"]</code>
        </p>
      </td>
    </tr>
    <tr id="field-raw-http-request-uri-args">
      <td valign="top"><code>raw.http.request.uri.args</code><br />{{<type>}}Map&lt;Array&lt;String&gt;&gt;{{</type>}}</td>
       <td>
        <p>Contains the same field values as <a href="#field-http-request-uri-args"><code>http.request.uri.args</code></a>.
        </p>
      </td>
    </tr>
    <tr id="field-raw-http-request-uri-args-names">
      <td valign="top"><code>raw.http.request.uri.args.names</code><br />{{<type>}}Array&lt;String>{{</type>}}</td>
      <td>
        <p>Contains the same field values as <a href="#field-http-request-uri-args-names"><code>http.request.uri.args.names</code></a>.
        </p>
      </td>
    </tr>
    <tr id="field-raw-http-request-uri-args-values">
      <td valign="top"><code>raw.http.request.uri.args.values</code><br />{{<type>}}Array&lt;String>{{</type>}}</td>
      <td>
        <p>Contains the same field values as <a href="#field-http-request-uri-args-names"><code>http.request.uri.args.values</code></a>.
        </p>
      </td>
    </tr>
  </tbody>
</table>

## HTTP request header fields

The Rules language includes fields that represent properties of HTTP request headers. Many of these return [arrays](/ruleset-engine/rules-language/values/#arrays) containing the respective values.

The Cloudflare Rules language supports these HTTP header fields:

<table>
  <thead>
   <tr>
      <th>Field Name</th>
      <th style="width: 50%;">Description</th>
    </tr>
  </thead>
  <tbody>
   <tr id="field-http-request-headers">
      <td valign="top"><code>http.request.headers</code><br />{{<type>}}Map&lt;Array&lt;String&gt;&gt;{{</type>}}</td>
      <td>
         <p>Represents HTTP request headers as a Map (or associative array).</p>
         <p>The keys of the associative array are the names of HTTP request headers <strong>converted to lowercase</strong>.</p>
         <p>When there are repeating headers, the array includes them in the order they appear in the request.</p>
         <p>The request header values are not pre-processed and retain the original case used in the request.</p>
         <p><em><em>Decoding:</em></em> no decoding performed
         <br /><em>Whitespace:</em> preserved
         <br /><em>Non-ASCII:</em> preserved
         </p>
         <p>Example:
         <br /><code class="InlineCode">any(http.request.headers["content-type"][*] == "application/json")</code>
         </p>
         <p>Example value:
         <br /><code class="InlineCode">{"content-type": ["application/json"]}</code>
         </p>
      </td>
   </tr>
   <tr id="field-http-request-headers-names">
      <td valign="top"><code>http.request.headers.names</code><br />{{<type>}}Array&lt;String>{{</type>}}</td>
      <td>
         <p>Represents the names of the headers in the HTTP request.</p>
         <p>The names are not pre-processed and retain the original case used in the request.</p>
         <p><strong>Note:</strong> In HTTP/2 the names of HTTP headers are always in lowercase. Recent versions of the <code class="InlineCode">curl</code> tool <a href="https://curl.se/docs/http2.html#curl-tool">enable HTTP/2 by default</a> for HTTPS connections.
         </p>
         <p>The order of header names is not guaranteed but will match <code class="InlineCode">http.request.headers.values</code>.
         </p>
         <p>Duplicate headers are listed multiple times.
         </p>
         <p><em>Decoding:</em> no decoding performed
         <br /><em>Whitespace:</em> preserved
         <br /><em>Non-ASCII:</em> preserved
         </p>
         <p>Example:
         <br /><code class="InlineCode">any(http.request.headers.names[*] == "content-type")</code>
         </p>
         <p>Example value:
         <code class="InlineCode">["content-type"]</code>
         </p>
      </td>
   </tr>
   <tr id="field-http-request-headers-values">
      <td valign="top"><code>http.request.headers.values</code><br />{{<type>}}Array&lt;String>{{</type>}}</td>
      <td>
         <p>Represents the values of the headers in the HTTP request.</p>
         <p>The values are not pre-processed and retain the original case used in the request.</p>
         <p>The order of header values is not guaranteed but will match <code class="InlineCode">http.request.headers.names</code>.
         </p>
         <p>Duplicate headers are listed multiple times.
         </p>
         <p><em>Decoding:</em> no decoding performed
         <br /><em>Whitespace:</em> preserved
         <br /><em>Non-ASCII:</em> preserved
         </p>
         <p>Example 1:
         <br />
         <code class="InlineCode">any(http.request.headers.values[*] == "application/json")</code>
         </p>
         <p>Example value 1:
         <br />
         <code class="InlineCode">["application/json"]</code>
         </p>
         <p>Additionally used to match requests according to the specified operator and the length/size entered for the header value.
         </p>
         <p>Example 2:
         <br />
         <code class="InlineCode">any(len(http.request.headers.values[*])[*] gt 10)</code>
         </p>
         <p>Example value 2:
         <br />
         <code class="InlineCode">["This header value is longer than 10 bytes"]</code>
         </p>
      </td>
   </tr>
   <tr id="field-http-request-headers-truncated">
      <td valign="top"><code>http.request.headers.truncated</code><br />{{<type>}}Boolean{{</type>}}</td>
      <td>
         <p>Returns <code class="InlineCode">true</code> when the HTTP request contains too many headers; otherwise, returns <code class="InlineCode">false</code>.
         </p>
         <p>When <code class="InlineCode">true,</code> <code class="InlineCode">http.request.headers</code>, <code class="InlineCode">http.request.headers.names</code>, and <code class="InlineCode">http.request.headers.values</code> may not contain all of the headers sent in the HTTP request.
         </p>
      </td>
   </tr>
   <tr id="field-http-request-accepted_languages">
      <td valign="top"><code>http.request.accepted_languages</code><br />{{<type>}}Array&lt;String&gt;{{</type>}}</td>
      <td>
         <p>Represents the list of language tags provided in the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language"><code>Accept-Language</code></a> HTTP request header, sorted by weight (<code class="InlineCode">;q=&lt;weight&gt;</code>, with a default weight of <code class="InlineCode">1</code>) in descending order.</p>
         <p>If the HTTP header is not present in the request or is empty, <code class="InlineCode">http.request.accepted_languages[0]</code> will return a "<a href="/ruleset-engine/rules-language/values/#array-notes">missing value</a>", which the <code class="InlineCode">concat()</code> function will handle as an empty string.</p>
         <p>If the HTTP header includes the language tag <code class="InlineCode">*</code> it will not be stored in the array.</p>
         <p>Example 1:<br/>
         Request with header <code class="InlineCode">Accept-Language: fr-CH, fr;q=0.8, en;q=0.9, de;q=0.7, *;q=0.5</code>. In this case:<br/>
         <code class="InlineCode">http.request.accepted_languages[0] == "fr-CH"</code><br/>
         <code class="InlineCode">http.request.accepted_languages == ["fr-CH", "en", "fr", "de"]</code>
         </p>
         <p>Example 2:<br/>
         Request without an <code class="InlineCode">Accept-Language</code> HTTP header and a URI of <code class="InlineCode">https://www.example.com/my-path</code>. In this case:<br/>
         <code class="InlineCode">concat("/", http.request.accepted_languages[0], http.request.uri.path) == "//my-path"</code>.</p>
         <p><strong>Note:</strong> This field is only available in <a href="/rules/transform/">Transform Rules</a>.</p>
      </td>
   </tr>
  </tbody>
</table>

## HTTP request body fields

{{<Aside type="note">}}

Access to HTTP request body fields requires a Cloudflare Enterprise plan with a paid add-on, except for the `http.request.body.mime` field.

{{</Aside>}}

The Rules language includes fields that represent properties of an HTTP request body. Many of these return [arrays](/ruleset-engine/rules-language/values/#arrays) containing the respective values.

{{<Aside type="warning">}}

All `http.request.body.*` fields (except `http.request.body.size`) handle a maximum body size of 128 KB, which means that you cannot define expressions that rely on request body data beyond the first 128 KB. If the request body is larger, the body fields will contain a truncated value and the `http.request.body.truncated` field will be set to `true`. The `http.request.body.size` field will contain the full size of the request without any truncation.

The maximum body size of 128 KB applies only to the values of HTTP body fields — the origin server will still receive the complete request body.

{{</Aside>}}

The Cloudflare Rules language supports these HTTP body fields:

<table>
  <thead>
    <tr>
      <th style="width: 50%;">Field Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr id="field-http-request-body-raw">
      <td valign="top"><code>http.request.body.raw</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the unaltered HTTP request body.
         </p>
         <p>When the value of <code class="InlineCode">http.request.body.truncated</code> is <code class="InlineCode">true</code>, the return value may be truncated.
         </p>
         <p><em>Decoding:</em> no decoding performed
         <br /><em>Whitespace:</em> preserved
         <br /><em>Non-ASCII:</em> preserved
         </p>
      </td>
    </tr>
    <tr id="field-http-request-body-truncated">
      <td valign="top"><code>http.request.body.truncated</code><br />{{<type>}}Boolean{{</type>}}</td>
      <td>
         <p>Indicates whether the HTTP request body is truncated.
         </p>
         <p>When true, <code class="InlineCode">http.request.body</code> fields may not contain all of the HTTP request body.
         </p>
      </td>
    </tr>
    <tr id="field-http-request-body-size">
      <td valign="top"><code>http.request.body.size</code><br />{{<type>}}Number{{</type>}}</td>
      <td>
         <p>The total size of the HTTP request body (in bytes).
         </p>
         <p>Note: This field may have a value larger than the one returned by <code>len(http.request.body.raw)</code>, since the <code>http.request.body.raw</code> field only considers the first 128 KB of the request.
         </p>
      </td>
    </tr>
    <tr id="field-http-request-body-form">
      <td valign="top"><code>http.request.body.form</code><br />{{<type>}}Map&lt;Array&lt;String&gt;&gt;{{</type>}}</td>
      <td>
         <p>Represents the HTTP request body of a form as a Map (or associative array). Populated when the <code class="InlineCode">Content-Type</code> header is <code class="InlineCode">application/x-www-form-urlencoded</code>.
         </p>
         <p>The values are not pre-processed and retain the original case used in the request.</p>
         <p> When a field repeats, then the array contains multiple items in the order they are in the request.
         </p>
         <p>The return value may be truncated if <code class="InlineCode">http.request.body.truncated</code> is <code class="InlineCode">true</code>.
         </p>
         <p><em>Decoding:</em> no decoding performed
         <br /><em>Whitespace:</em> preserved
         <br /><em>Non-ASCII:</em> preserved
         </p>
         <p>Example:
         <br /><code class="InlineCode">any(http.request.body.form["username"][*] == "admin")</code>
         </p>
         <p>Example value:
         <br /><code class="InlineCode">{username": ["admin"]}</code>
         </p>
      </td>
    </tr>
    <tr id="field-http-request-body-form-names">
      <td valign="top"><code>http.request.body.form.names</code><br />{{<type>}}Array&lt;String>{{</type>}}</td>
      <td>
         <p>Represents the names of the form fields in an HTTP request where the content type is <code class="InlineCode">application/x-www-form-urlencoded</code>.
         </p>
         <p>The names are not pre-processed and retain the original case used in the request. They are listed in the same order as in the request.
         </p>
         <p>Duplicate names are listed multiple times.
         </p>
         <p>The return value may be truncated if <code class="InlineCode">http.request.body.truncated</code> is <code class="InlineCode">true</code>.
         </p>
         <p><em>Decoding:</em> no decoding performed
         <br /><em>Whitespace:</em> preserved
         <br /><em>Non-ASCII:</em> preserved
         </p>
         <p>Example:
         <br /><code class="InlineCode">any(http.request.body.form.names[*] == "username")</code>
         </p>
         <p>Example value:
         <br /><code class="InlineCode">["username"]</code>
         </p>
      </td>
    </tr>
    <tr id="field-http-request-body-form-values">
      <td valign="top"><code>http.request.body.form.values</code><br />{{<type>}}Array&lt;String>{{</type>}}</td>
      <td>
         <p>Represents the values of the form fields in an HTTP request where the content type is <code class="InlineCode">application/x-www-form-urlencoded</code>.
         </p>
         <p>The values are not pre-processed and retain the original case used in the request. They are listed in the same order as in the request.
         </p>
         <p>Duplicated values are listed multiple times.
         </p>
         <p>The return value may be truncated if  <code class="InlineCode">http.request.body.truncated</code> is <code class="InlineCode">true</code>.
         </p>
         <p><em>Decoding:</em> no decoding performed
         <br /><em>Whitespace:</em> preserved
         <br /><em>Non-ASCII:</em> preserved
         </p>
         <p>Example:
         <br /><code class="InlineCode">any(http.request.body.form.values[*] == "admin")</code>
         </p>
         <p>Example value:
         <br /><code class="InlineCode">["admin"]</code>
         </p>
      </td>
    </tr>
    <tr id="field-http-request-body-mime">
      <td valign="top"><code>http.request.body.mime</code><br />{{<type>}}String{{</type>}}</td>
      <td>
        <p>The MIME type of the request detected from the request body.
        </p>
        <p>Supports the most common MIME types of the following general categories: video, audio, image, application, text.
        </p>
        <p>Example:
        <br /><code class="InlineCode">image/jpeg</code>
        </p>
        <p>This field is available on all Cloudflare plans.
        </p>
      </td>
    </tr>
  </tbody>
</table>

## HTTP response fields

The Rules language includes fields that represent properties of HTTP response returned by the origin or by a Worker script.

{{<Aside type="note">}}

You can only use HTTP response fields in:

* [HTTP Response Header Modification Rules](/rules/transform/response-header-modification/)
* [Compression Rules](/rules/compression-rules/)
* [Custom error responses](/rules/custom-error-responses/)
* [Rate limiting rules](/waf/rate-limiting-rules/)
* Filter expressions of the [Cloudflare Sensitive Data Detection](/waf/managed-rules/reference/sensitive-data-detection/) ruleset

Specific fields may have additional limitations.

{{</Aside>}}

The Cloudflare Rules language supports these HTTP response fields:

<table>
  <thead>
   <tr>
      <th>Field Name</th>
      <th style="width: 50%;">Description</th>
   </tr>
  </thead>
  <tbody>
   <tr id="field-http-response-code">
      <td valign="top"><code>http.response.code</code><br />{{<type>}}Integer{{</type>}}</td>
      <td>
         <p>Represents the HTTP status code returned to the client, either set by a Cloudflare product or returned by the origin server.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">403</code>
         </p>
      </td>
   </tr>
   <tr id="field-http-response-headers">
      <td valign="top"><code>http.response.headers</code><br />{{<type>}}Map&lt;Array&lt;String&gt;&gt;{{</type>}}</td>
      <td>
         <p>Represents HTTP response headers as a Map (or associative array).
         </p>
         <p>When there are repeating headers, the array includes them in the order they appear in the response. The keys convert to lowercase.</p>
         <p><em><em>Decoding:</em></em> no decoding performed
         <br /><em>Whitespace:</em> preserved
         <br /><em>Non-ASCII:</em> preserved
         </p>
         <p>Example:
         <br /><code class="InlineCode">any(http.response.headers["server"][*] == "nginx")</code>
         </p>
         <p>Example value:
         <br /><code class="InlineCode">{"server": ["nginx"]}</code>
         </p>
      </td>
   </tr>
   <tr id="field-http-response-headers-names">
      <td valign="top"><code>http.response.headers.names</code><br />{{<type>}}Array&lt;String>{{</type>}}</td>
      <td>
         <p>Represents the names of the headers in the HTTP response. The names are not pre-processed and retain the original case used in the response.
         </p>
         <p>The order of header names is not guaranteed but will match <code class="InlineCode">http.response.headers.values</code>.
         </p>
         <p>Duplicate headers are listed multiple times.
         </p>
         <p><em>Decoding:</em> no decoding performed
         <br /><em>Whitespace:</em> preserved
         <br /><em>Non-ASCII:</em> preserved
         </p>
         <p>Example:
         <br /><code class="InlineCode">any(http.response.headers.names[*] == "content-type")</code>
         </p>
         <p>Example value:
         <code class="InlineCode">["content-type"]</code>
         </p>
      </td>
   </tr>
   <tr id="field-http-response-headers-values">
      <td valign="top"><code>http.response.headers.values</code><br />{{<type>}}Array&lt;String>{{</type>}}</td>
      <td>
         <p>Represents the values of the headers in the HTTP response.</p>
         <p>The values are not pre-processed and retain the original case used in the response.</p>
         <p>The order of header values is not guaranteed but will match <code class="InlineCode">http.response.headers.names</code>.
         </p>
         <p>Duplicate headers are listed multiple times.
         </p>
         <p><em>Decoding:</em> no decoding performed
         <br /><em>Whitespace:</em> preserved
         <br /><em>Non-ASCII:</em> preserved
         </p>
         <p>Example 1:
         <br />
         <code class="InlineCode">any(http.response.headers.values[*] == "application/json")</code>
         </p>
         <p>Example value 1:
         <br />
         <code class="InlineCode">["application/json"]</code>
         </p>
         <p>Additionally used to match responses according to the specified operator and the length/size entered for the header value.
         </p>
         <p>Example 2:
         <br />
         <code class="InlineCode">any(len(http.response.headers.values[*])[*] gt 10)</code>
         </p>
         <p>Example value 2:
         <br />
         <code class="InlineCode">["This header value is longer than 10 bytes"]</code>
         </p>
      </td>
   </tr>
   <tr id="field-http-response-content_type-media_type">
      <td valign="top"><code>http.response.content_type.media_type</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>The lowercased content type (including subtype and suffix) without any parameters such as <code>charset</code>, based on the response's <code>Content-Type</code> header.
         </p>
         <details>
         <summary>Example values</summary>
         <div class="NoPadding">
          <table class="Small">
            <tr>
              <th><code>Content-Type</code> header</th>
              <th>Field value</th>
            </tr>
            <tr>
              <td><code>text/html</code></td>
              <td><code>"text/html"</code></td>
            </tr>
            <tr>
              <td><code>text/html; charset=utf-8</code></td>
              <td><code>"text/html"</code></td>
            </tr>
            <tr>
              <td><code>text/html+extra</code></td>
              <td><code>"text/html+extra"</code></td>
            </tr>
            <tr>
              <td><code>text/html+extra; charset=utf-8</code></td>
              <td><code>"text/html+extra"</code></td>
            </tr>
            <tr>
              <td><code>text/HTML</code></td>
              <td><code>"text/html"</code></td>
            </tr>
            <tr>
              <td><code>text/html; charset=utf-8; other=value</code></td>
              <td><code>"text/html"</code></td>
            </tr>
          </table>
         </div>
         </details>
      </td>
   </tr>
   <tr id="field-cf-response-1xxx_code">
      <td valign="top"><code>cf.response.1xxx_code</code><br />{{<type>}}Integer{{</type>}}</td>
      <td>
         <p>Contains the specific code for 1xxx Cloudflare errors. Use this field to differentiate between 1xxx errors associated with the same HTTP status code. The default value is <code>0</code>. For a list of 1xxx errors, refer to <a href="/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-1xxx-errors/">Troubleshooting Cloudflare 1XXX errors</a>.
         </p>
         <p>Example value:
         <br /><code class="InlineCode">1020</code>
         </p>
         <p><strong>Note:</strong> This field is only available in <a href="/rules/transform/response-header-modification/">HTTP response header modifications</a> and <a href="/rules/custom-error-responses/">custom error responses</a>.</p>
      </td>
   </tr>
   <tr id="field-cf-response-error_type">
      <td valign="top"><code>cf.response.error_type</code><br />{{<type>}}String{{</type>}}</td>
      <td>
        <p>Contains a string with the type of error in the response being returned. The default value is an empty string (<code>""</code>).
        </p>
        <p>The available values are the following:</p>
        <ul>
          <li><code>managed_challenge</code></li>
          <li><code>iuam</code></li>
          <li><code>legacy_challenge</code></li>
          <li><code>ip_ban</code></li>
          <li><code>waf</code></li>
          <li><code>5xx</code></li>
          <li><code>1xxx</code></li>
          <li><code>always_online</code></li>
          <li><code>country_challenge</code></li>
          <li><code>ratelimit</code></li>
        </ul>
        <p>You can use this field to customize the response for a specific type of error (for example, all 1xxx errors or all WAF block actions).</p>
        <p><strong>Note:</strong> This field is only available in <a href="/rules/transform/response-header-modification/">HTTP response header modifications</a> and <a href="/rules/custom-error-responses/">custom error responses</a>.</p>
      </td>
   </tr>
  </tbody>
</table>

---

_GeoIP is the registered trademark of MaxMind, Inc._
