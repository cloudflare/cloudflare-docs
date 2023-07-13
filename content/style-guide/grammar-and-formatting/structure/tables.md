---
pcx_content_type: concept
title: Tables
---

# Tables

Using tables to simplify content and data provides a comprehensive way to arrange design, structure, outlines, pattern, or order. It is a great tool for comparisons, breakdowns, lists, functions, and descriptions.

Here are some tips when creating tables:

+ Label column headers.
+ Label row headers if appropriate.
+ Avoid merged cells. When cells are merged, it impacts how a screen reader navigates the page.
+ Avoid too much text.
+ Aim for parallelism within the column.
+ Keep tables as simple and as small as possible.

## When to use tables

Tables display pieces of information that have some sort of relationship.

Example:

+ Dates and descriptions, like a changelog
+ A list of products with attributes

## When not to use tables

Do not use tables to format a page.

## Markdown examples

**Add a table**

To add a table, use three or more hyphens (---) to create each column’s header, and use pipes (|) to separate each column. For compatibility, you should also add a pipe on either end of the row.

```
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
```

The rendered output looks like this:

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

 Tip: Creating tables with hyphens and pipes can be tedious. To speed up the process, try using the [Markdown Tables Generator](https://www.tablesgenerator.com/markdown_tables).

## Alignment

You can align text in the columns to the left, right, or center by adding a colon (:) to the left, right, or on both side of the hyphens within the header row.

```
| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here is this  |
| Paragraph   | Text        | And more      |
```

The rendered output looks like this:

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here is this  |
| Paragraph   | Text        | And more      |

## Formatting text in tables

You can format the text within tables. For example, you can add links, code, and emphasis.

You can’t add headings, blockquotes, lists, horizontal rules, images, or HTML tags.

## Escaping pipe characters in tables

You can display a pipe (|) character in a table by using its HTML character code ("&#124;").

## HTML examples

For complex tables, consider using HTML. The following example is created with HTML:

<table>
  <thead>
    <tr>
      <th style="width:50%">Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
   <tr>
      <td valign="top"><code>http.cookie</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the entire cookie as a string.</p>
         <p>Example value:
         <br /><code>session=8521F670545D7865F79C3D7BEDC29CCE;-background=light</code>
         </p>
      </td>
   </tr>
   <tr>
      <td valign="top"><code>http.host</code><br />{{<type>}}String{{</type>}}</td>
      <td>
         <p>Represents the hostname used in the full request URI.
         </p>
         <p>Example value:
         <br /><code>www.example.org</code>
         </p>
      </td>
   </tr>
  </tbody>
</table>