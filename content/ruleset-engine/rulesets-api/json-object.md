---
title: JSON object
pcx-content-type: reference
weight: 2
---

# JSON object

## Ruleset object

A fully populated ruleset object has the following JSON structure.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-json" language="json"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;id&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;ruleset-id&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;name&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;Example Ruleset&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;description&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;Description of Example Ruleset&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;kind&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;custom&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;version&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;2&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;phase&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;http_request_firewall_custom&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;rules&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      </span><span class="CodeBlock--token-property">&quot;id&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;rule-id&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      </span><span class="CodeBlock--token-property">&quot;version&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;2&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      </span><span class="CodeBlock--token-property">&quot;action&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;block&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      </span><span class="CodeBlock--token-property">&quot;expression&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;cf.zone.name eq \&quot;example.com\&quot; &quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      </span><span class="CodeBlock--token-property">&quot;last_updated&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;2020-07-20T10:44:29.124515Z&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-punctuation">}</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;last_updated&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;2020-07-20T10:44:29.124515Z&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### Properties

The table lists the properties of a ruleset object.

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
      <th>Value</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody style="vertical-align:top">
    <tr>
      <td>
        <code>id</code>
      </td>
      <td>
        Represents the unique Cloudflare-generated identifier for a given version of a ruleset.
      </td>
      <td>32-character UUIDv4 string</td>
      <td>Unique, read-only</td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>A human-readable name for the ruleset.</td>
      <td>String</td>
      <td>The name is immutable. You cannot change the name over the lifetime of the ruleset.</td>
    </tr>
    <tr>
      <td>
        <code>description</code>
      </td>
      <td>Optional description for the ruleset.</td>
      <td>String</td>
      <td>You can change the description over the lifetime of the ruleset.</td>
    </tr>
    <tr>
      <td>
        <code>kind</code>
      </td>
      <td>The kind of ruleset the JSON object represents.</td>
      <td>
        <p>
          There are four kinds of rulesets:
          <ul>
            <li>
              <em>root</em>
            </li>
            <li>
              <em>zone</em>
            </li>
            <li>
              <em>managed</em>
            </li>
            <li>
              <em>custom</em>
            </li>
          </ul>
        </p>
      </td>
      <td>
        <code>kind</code> is immutable.
      </td>
    </tr>
    <tr>
      <td>
        <code>version</code>
      </td>
      <td>The version of the ruleset.</td>
      <td>
        Integer value starting at <code>1</code> and incremented by <code>1</code> each time the
        ruleset is modified
      </td>
      <td>Read-only</td>
    </tr>
    <tr>
      <td>
        <code>phase</code>
      </td>
      <td>The phase to which the ruleset belongs.</td>
      <td>String</td>
      <td>
        <code>phase</code> is immutable.
      </td>
    </tr>
    <tr>
      <td>
        <code>rules</code>
      </td>
      <td>A list of rules to include in the ruleset.</td>
      <td>
        Array of JSON objects (refer to <a href="#rule-object-structure-and-properties">rule JSON object</a>)
      </td>
      <td></td>
    </tr>
    <tr>
      <td>
        <code>last_updated</code>
      </td>
      <td>The time (UTC) when the ruleset was last updated.</td>
      <td>ISO 8601 timestamp in the format YYYY-MM-DDThh:mm:ss.TZD</td>
      <td>Read-only</td>
    </tr>
  </tbody>
</table>

## Rule object structure and properties

A fully populated rule JSON object has the following structure:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-json" language="json"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;id&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;rule-id&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;version&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;2&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;action&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;block&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;categories&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-string">&quot;wordpress&quot;</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;expression&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;cf.zone.name eq \&quot;example.com\&quot;&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;last_updated&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;2020-07-20T10:44:29.124515Z&quot;</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-property">&quot;enabled&quot;</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">true</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

The JSON object properties for a rule are defined as follows:

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
      <th>Value</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody style="vertical-align:top">
    <tr>
      <td>
        <code>id</code>
      </td>
      <td>Represents the unique Cloudflare-generated identifier for a given version of a rule.</td>
      <td>32-character UUIDv4 string</td>
      <td>Unique, read-only</td>
    </tr>
    <tr>
      <td>
        <code>version</code>
      </td>
      <td>The version of the rule.</td>
      <td>
        Integer value starting at <code>1</code> and incremented by <code>1</code> each time the
        ruleset is modified
      </td>
      <td>Read-only. Changing the order of a rule in a ruleset does not change its version.</td>
    </tr>
    <tr>
      <td>
        <code>action</code>
      </td>
      <td>Defines what happens when there’s a match for the rule expression.</td>
      <td>String</td>
      <td>The available actions depend on the phase where the rule's ruleset is executed.</td>
    </tr>
    <tr>
      <td>
        <code>categories</code>
      </td>
      <td>
        Tags associated with the current rule. You can define overrides that affect rules with a
        given tag.
      </td>
      <td>Array of strings</td>
      <td>Read-only. Only available in rules of Managed Rulesets.</td>
    </tr>
    <tr>
      <td>
        <code>expression</code>
      </td>
      <td>Criteria defining when there is a match for the current rule.</td>
      <td>String</td>
      <td>
        The fields and functions you can use in a rule expression depend on the phase where the
        rule's ruleset is executed.
      </td>
    </tr>
    <tr>
      <td>
        <code>last_updated</code>
      </td>
      <td>The time (UTC) when the rule was last updated.</td>
      <td>ISO 8601 timestamp in the format YYYY-MM-DDThh:mm:ss.TZD</td>
      <td>Read-only</td>
    </tr>
    <tr>
      <td>
        <code>enabled</code>
      </td>
      <td>
        When set to <code>true</code>, the current rule is enabled.
      </td>
      <td>Boolean</td>
      <td></td>
    </tr>
  </tbody>
</table>
