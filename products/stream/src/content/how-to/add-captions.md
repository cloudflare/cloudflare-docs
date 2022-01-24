---
pcx-content-type: how-to
---

# Add captions

Creating or modifying captions for a video requires a Cloudflare API Token..

The `$LANGUAGE` must adhere to the [BCP 47 format](http://www.unicode.org/reports/tr35/#Unicode_Language_and_Locale_Identifiers). For your convenience, the most common language codes are provided below under [Common language codes](#common-language-codes). If the language you are adding is not included in the table, you can find the value through the [The IANA registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry), which maintains a list of language codes you can search through. 

Below is an example value from IANA for Turkish.

```bash
%%
Type: language
Subtag: tr
Description: Turkish
Added: 2005-10-16
Suppress-Script: Latn
%%
```

The `Subtag` code indicates a value of `tr`, which is the value you should send as the `language` at the end of the PUT request shown below.

A label is generated from the provided language, and the label will be visible for user selection in the player. For example, if `tr` is sent, the `Türkçe` label is created. If `de` is sent, the `Deutsch` label is created.

## Manage  captions

Refer to the API information below to manage captions.

<TableWrap>

<table>
  <thead>
  <tr>
   <th><strong>Command</strong>
   </th>
   <th><strong>Method</strong>
   </th>
   <th><strong>Endpoint</strong>
   </th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td><a href="https://api.cloudflare.com/#stream-subtitles/captions-upload-a-caption/subtitle">Add captions</a>
   </td>
   <td><Code>PUT</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/:video_identifier/captions/:language</Code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#stream-subtitles/captions-delete-a-caption/subtitle">Delete captions</a>
   </td>
   <td><Code>DELETE</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/:video_identifier/captions/:language</Code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#stream-live-inputs-list-outputs-associated-with-a-live-input">List captions</a>
   </td>
   <td><Code>GET</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/:video_identifier/captions</Code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>


## Limitations

- A video must be uploaded before a caption can be attached to it. The video's ID is referenced as `media_id`.
- Stream only supports [WebVTT](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API) formatted caption files. If you have a differently formatted caption file, please use [a tool to convert your file to WebVTT](https://subtitletools.com/convert-to-vtt-online) prior to uploading it.
- Videos may include several language captions, but each language must be unique. For example, a video may have English, French, and German captions associated with it, but it cannot have two French captions.
- Each caption file is limited to 10 MB in size. [Contact support](https://support.cloudflare.com/hc/articles/200172476) if you need to upload a larger file.

## Common language codes

<details>
<summary>
  Common language codes
</summary>
<div>

| Language Code |     Language     |
|---------------|------------------|
|       zh      | Mandarin Chinese |
|       hi      |       Hindi      |
|       es      |      Spanish     |
|       en      |      English     |
|       ar      |      Arabic      |
|       pt      |    Portuguese    |
|       bn      |      Bengali     |
|       ru      |      Russian     |
|       ja      |      Japanese    |
|       de      |      German      |
|       pa      |      Panjabi     |
|       jv      |     Javanese     |
|       ko      |      Korean      |
|       vi      |    Vietnamese    |
|       fr      |      French      |
|       ur      |       Urdu       |
|       it      |      Italian     |
|       tr      |      Turkish     |
|       fa      |      Persian     |
|       pl      |       Polish     |
|       uk      |     Ukrainian    |
|       my      |      Burmese     |
|       th      |       Thai       |
</div>
</details>