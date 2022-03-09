---
pcx-content-type: how to
title: Adding captions
weight: 5
---

# Adding captions

Adding captions and subtitles to your video library.

## Add or modify a caption

To create or modify a caption on a video a [Cloudflare API Token](https://www.cloudflare.com/a/account/my-account) is required.

The `$LANGUAGE` must adhere to the [BCP 47 format](http://www.unicode.org/reports/tr35/#Unicode_Language_and_Locale_Identifiers). For convenience, the most common
language codes are provided [at the bottom of this document](#most-common-language-codes).
If the language you are adding isn't included in the table, you can find the value
through the [The IANA registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry), which maintains a list of language codes. To find the
value to send, search for the language. Below is an example value from IANA when
we look for the value to send for a Turkish subtitle:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">%%</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Type: language</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Subtag: </span><span class="CodeBlock--token-function">tr</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Description: Turkish</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Added: </span><span class="CodeBlock--token-number">2005</span><span class="CodeBlock--token-plain">-10-16</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Suppress-Script: Latn</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">%%</span></div></span></span></span></code></pre>{{</raw>}}

The `Subtag` code indicates a value of `tr`. This is the value you should send
as the `language` at the end of the PUT request shown above.

A label is generated from the provided language. The label will be visible for
user selection in the player. For example, if sent `tr`, the label `Türkçe` will
be created; if sent `de`, the label `Deutsch` will be created.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -X PUT </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> -H </span><span class="CodeBlock--token-string">'Authorization: Bearer $TOKEN'</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> -F </span><span class="CodeBlock--token-assign-left CodeBlock--token-variable">file</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain">@/Users/mickie/Desktop/example_caption.vtt </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://api.cloudflare.com/client/v4/accounts/</span><span class="CodeBlock--token-variable">$ACCOUNT</span><span class="CodeBlock--token-plain">/stream/</span><span class="CodeBlock--token-variable">$VIDEOID</span><span class="CodeBlock--token-plain">/captions/</span><span class="CodeBlock--token-environment CodeBlock--token-constant">$LANGUAGE</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### Example Response to Add or Modify a Caption
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-string">&quot;result&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-string">&quot;language&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;en&quot;</span><span class="CodeBlock--token-plain">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-string">&quot;label&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;English&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-string">&quot;success&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> true,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-string">&quot;errors&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-string">&quot;messages&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

## List the captions associated with a video

To view captions associated with a video:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -H </span><span class="CodeBlock--token-string">'Authorization: Bearer $TOKEN'</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://api.cloudflare.com/client/v4/accounts/</span><span class="CodeBlock--token-variable">$ACCOUNT</span><span class="CodeBlock--token-plain">/stream/</span><span class="CodeBlock--token-variable">$VIDEO</span><span class="CodeBlock--token-plain">/captions</span></div></span></span></span></code></pre>{{</raw>}}

### Example response to get the captions associated with a video
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-string">&quot;result&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      </span><span class="CodeBlock--token-string">&quot;language&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;en&quot;</span><span class="CodeBlock--token-plain">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      </span><span class="CodeBlock--token-string">&quot;label&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;English&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      </span><span class="CodeBlock--token-string">&quot;language&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;de&quot;</span><span class="CodeBlock--token-plain">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">      </span><span class="CodeBlock--token-string">&quot;label&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;Deutsch&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-punctuation">}</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-string">&quot;success&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> true,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-string">&quot;errors&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-string">&quot;messages&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

## Directly access captions

To directly access the captions for your video, use the following URI and add in your video's `videoID` and `languageTag`.

`videodelivery.net/<videoID>/caption/<languageTag>`

## Delete the captions

To remove a caption associated with your video:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -X DELETE </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> -H </span><span class="CodeBlock--token-string">'Authorization: Bearer $TOKEN'</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> https://api.cloudflare.com/client/v4/accounts/</span><span class="CodeBlock--token-variable">$ACCOUNT</span><span class="CodeBlock--token-plain">/stream/</span><span class="CodeBlock--token-variable">$VIDEO</span><span class="CodeBlock--token-plain">/captions/</span><span class="CodeBlock--token-environment CodeBlock--token-constant">$LANGUAGE</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

If there is an entry in `errors` response field, the caption has not been
deleted.

### Example response to delete the caption
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-string">&quot;result&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;&quot;</span><span class="CodeBlock--token-plain">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-string">&quot;success&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> true,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-string">&quot;errors&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-string">&quot;messages&quot;</span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

## Limitations

- A video must be uploaded before a caption can be attached to it. In the following
  example URLs, the video's ID is referenced as `media_id`.
- Stream only supports [WebVTT](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)
  formatted caption files. If you have a differently formatted caption file, please
  use [a tool to convert your file to WebVTT](https://subtitletools.com/convert-to-vtt-online)
  prior to uploading it.
- Videos may include several language captions, but each language must be unique.
  For example, a video may have English, French, and German captions associated
  with it, but it cannot have two French captions.
- Each caption file is limited to 10 MB in size. Please [contact support](https://support.cloudflare.com/hc/articles/200172476)
  if you need to upload a larger file.

## Most common language codes

| Language Code | Language         |
| ------------- | ---------------- |
| zh            | Mandarin Chinese |
| hi            | Hindi            |
| es            | Spanish          |
| en            | English          |
| ar            | Arabic           |
| pt            | Portuguese       |
| bn            | Bengali          |
| ru            | Russian          |
| ja            | Japanese         |
| de            | German           |
| pa            | Panjabi          |
| jv            | Javanese         |
| ko            | Korean           |
| vi            | Vietnamese       |
| fr            | French           |
| ur            | Urdu             |
| it            | Italian          |
| tr            | Turkish          |
| fa            | Persian          |
| pl            | Polish           |
| uk            | Ukrainian        |
| my            | Burmese          |
| th            | Thai             |
