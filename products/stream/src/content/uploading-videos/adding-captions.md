---
order: 4
---

# Adding captions

Adding captions and subtitles to your video library.

## Add or modify a caption

To create or modify a caption on a video a [Cloudflare API Token](https://www.cloudflare.com/a/account/my-account) is required.

The `$LANGUAGE` must adhere to the [BCP 47 format](http://www.unicode.org/reports/tr35/#Unicode_Language_and_Locale_Identifiers).  For convenience, the most common
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
 -H 'Authorization: Bearer $TOKEN' \
 -F file=@/Users/mickie/Desktop/example_caption.vtt \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/$VIDEOID/captions/$LANGUAGE
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

## List the captions associated with a video

To view captions associated with a video:

```bash
curl -H 'Authorization: Bearer $TOKEN' \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/$VIDEO/captions
```

### Example response to get the captions associated with a video

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

## Delete the captions

To remove a caption associated with your video:

```bash
curl -X DELETE \
 -H 'Authorization: Bearer $TOKEN' \
 https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/$VIDEO/captions/$LANGUAGE
```

If there is an entry in `errors` response field, the caption has not been
deleted.

### Example response to delete the caption

```bash
{
  "result": "",
  "success": true,
  "errors": [],
  "messages": []
}
```

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
- Each caption file is limited to 10 MB in size. Please contact [support](support@cloudflare.com)
  if you need to upload a larger file.

## Most common language codes

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
