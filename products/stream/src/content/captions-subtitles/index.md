# Captions and Subtitles

Adding captions and subtitles to your video library.

## A few things to note

- A video must be uploaded before a caption can be attached to it. In the following
  example URLs, the video's ID is referenced as `media_id`.
- Stream only supports [WebVTT](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API)
  formatted caption files. If you have a differently formatted caption file, please
  use [a tool to convert your file to WebVTT](https://subtitletools.com/convert-to-vtt-online)
  prior to uploading it.
- Videos may include several language captions, but each language must be unique.
  For example, a video may have English, French, and German captions associated
  with it, but it cannot have two French captions.
- Each caption file is limited to 10 MB in size. Please contact [support](support@cloudflare.com)
  if you need to upload a larger file.

## Add or Modify a Caption

To create or modify a caption on a video, you will need your
[Cloudflare API key](https://www.cloudflare.com/a/account/my-account)
and your email address.

The `{language}` must adhere to the [BCP 47 format](http://www.unicode.org/reports/tr35/#Unicode_Language_and_Locale_Identifiers).  For convenience, the most common
language codes are provided [at the bottom of this document](#most-common-language-codes).
If the language you are adding isn't included in the table, you can find the value
through the [The IANA registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry), which maintains a list of language codes.  To find the
value to send, search for the language. Below is an example value from IANA when
we look for the value to send for a Turkish subtitle:

```bash
%%
Type: language
Subtag: tr
Description: Turkish
Added: 2005-10-16
Suppress-Script: Latn
%%
```

The `Subtag` code indicates a value of `tr`. This is the value you should send
as the `language` at the end of the PUT request shown above.

A label is generated from the provided language. The label will be visible for
user selection in the player. For example, if sent `tr`, the label `Türkçe` will
be created; if sent `de`, the label `Deutsch` will be created.

```bash
curl -X PUT \
 -H 'X-Auth-Key:{api-key}' \
 -H 'X-Auth-Email:{email}' \
 -F file=@/Users/mickie/Desktop/example_caption.vtt \
https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/{media_id}/captions/{language}
```

### Example Response to Add or Modify a Caption

```bash
{
  "result": {
    "language": "en",
    "label": "English"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## List the Captions Associated with a Video

To view captions associated with a video:

```bash
curl -H 'X-Auth-Key:{api-key}' -H 'X-Auth-Email:{email}'
https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/{media_id}/captions
```

### Example Response to Get the Captions Associated with a Video

```bash
{
  "result": [
    {
      "language": "en",
      "label": "English"
    },
    {
      "language": "de",
      "label": "Deutsch"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

## Delete the Captions

To remove a caption associated with your video:

```bash
curl -X DELETE \
 -H 'X-Auth-Key:{api-key}' \
 -H 'X-Auth-Email:{email}' \
 https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/{media_id}/captions/{language}
```

If there is an entry in `errors` response field, the caption has not been
deleted.

### Example Response to Delete the Caption

```bash
{
  "result": "",
  "success": true,
  "errors": [],
  "messages": []
}
```

## Most Common Language Codes

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
