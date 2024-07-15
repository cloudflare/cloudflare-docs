---
title: Migration from Page Rules
pcx_content_type: reference
weight: 9
meta:
  title: Migration from Page Rules
---

# Migration from Page Rules

If you are migrating from Page Rules, there is a behavior change between Page Rules and Cache Rules. 

When you create a new Cache Rule and select **Eligible for cache**, the [Cache Everything](/cache/how-to/edge-browser-cache-ttl/create-page-rules/#cache-everything) feature is enabled by default. With Page Rules, you had to specifically enable the Cache Everything option.

To maintain the same behavior you had with Page Rules (that is, not enabling Cache Everything), you need to create these two specific rules in this order before creating any additional rules.

Multiple matching cache rules can be combined and applied to the same request. After rule 1 matches, Cloudflare will keep evaluating other cache rules checking for matches. For more information, refer to [Order and priority](/cache/how-to/cache-rules/order/).

## Rule 1 

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

1. Enter a rule name, for instance `bypass everything`.
2. In **When incoming requests match**, select **All incoming requests**.
3. Under **Then**, in the **Cache eligibility** section, select [Bypass cache](/cache/how-to/cache-rules/settings/#bypass-cache).

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

![Create rule to bypass cache](/images/cache/first-rule.png)

{{</tab>}}
{{</tabs>}}

## Rule 2

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

1. Enter a rule name, for instance `cache all default cacheable extensions`.
2. In **When incoming requests match**, select **Custom filter expression**. 
3. Define the following rule: 
    - **Field**: `File extension`
    - **Operator**: `is in`
    - **Value**: `7z, avi, avif, apk, bin, bmp, bz2, class, css, csv, doc, docx, dmg, ejs, eot, eps, exe, flac, gif, gz, ico, iso, jar, jpg, jpeg, js, mid, midi, mkv, mp3, mp4, ogg, otf, pdf, pict, pls, png, ppt, pptx, ps, rar, svg, svgz, swf, tar, tif, tiff, ttf, webm, webp, woff, woff2, xls, xlsx, zip, zst`

If you prefer, you can select **Edit expression** and paste the following expression:

```txt
(http.request.uri.path.extension in {"7z" "avi" "avif" "apk" "bin" "bmp" "bz2" "class" "css" "csv" "doc" "docx" "dmg" "ejs" "eot" "eps" "exe" "flac" "gif" "gz" "ico" "iso" "jar" "jpg" "jpeg" "js" "mid" "midi" "mkv" "mp3" "mp4" "ogg" "otf" "pdf" "pict" "pls" "png" "ppt" "pptx" "ps" "rar" "svg" "svgz" "swf" "tar" "tif" "tiff" "ttf" "webm" "webp" "woff" "woff2" "xls" "xlsx" "zip" "zst"})
```

4. Under **Then**, in the **Cache eligibility** section, select [**Eligible for cache**](/cache/how-to/cache-rules/settings/#eligible-for-cache-settings).

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

![Create an eligible for cache rule](/images/cache/second-rule.png)

{{</tab>}}
{{</tabs>}}

{{<Aside type="note" header="Note">}}

Remember to create the rules in the specified order: first, the `bypass everything` rule, and then the `cache all default cacheable file extensions` rule.

![Rules order](/images/cache/rule-order.png)

{{</Aside>}}
