---
_build:
  publishResources: false
  render: never
  list: never

name: "`HTMLRewriter` handling of `<esi:include>`"
sort_date: "2021-11-02"
experimental: true
enable_flag: "html_rewriter_treats_esi_include_as_void_tag"
---

The HTML5 standard defines a fixed set of elements as void elements, meaning they do not use an end tag: `<area>`, `<base>`, `<br>`, `<col>`, `<command>`, `<embed>`, `<hr>`, `<img>`, `<input>`, `<keygen>`, `<link>`, `<meta>`, `<param>`, `<source>`, `<track>`, and `<wbr>`.

HTML5 does not recognize XML self-closing tag syntax. For example, `<script src="foo.js" />` does not specify a script element with no body. A `</script>` ending tag is still required. The `/>` syntax simply is not recognized by HTML5 at all and it is treated the same as `>`. However, many developers still like to use this syntax, as a holdover from XHTML, a standard which failed to gain traction in the early 2000's.

`<esi:include>` and `<esi:comment>` are two tags that are not part of the HTML5 standard, but are instead used as part of [Edge Side Includes](https://en.wikipedia.org/wiki/Edge_Side_Includes), a technology for server-side HTML modification. These tags are not expected to contain any body and are commonly written with XML self-closing syntax.

`HTMLRewriter` was designed to parse standard HTML5, not ESI. However, it would be useful to be able to implement some parts of ESI using `HTMLRewriter`. To that end, this compatibility flag causes `HTMLRewriter` to treat `<esi:include>` and `<esi:comment>` as void tags, so that they can be parsed and handled properly.
