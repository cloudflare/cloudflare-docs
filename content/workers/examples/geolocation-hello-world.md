---
type: example
summary: Get all geolocation data fields and display them in HTML.
tags:
  - Originless
  - Geolocation
pcx_content_type: configuration
title: "Geolocation: Hello World"
weight: 1001
layout: example
---

{{<tabs labels="js/esm | ts/esm">}}
{{<tab label="js/esm" default="true">}}

```js
export default {
  async fetch(request) {
    let html_content = "";
    let html_style =
      "body{padding:6em; font-family: sans-serif;} h1{color:#f6821f;}";

    html_content += "<p> Colo: " + request.cf.colo + "</p>";
    html_content += "<p> Country: " + request.cf.country + "</p>";
    html_content += "<p> City: " + request.cf.city + "</p>";
    html_content += "<p> Continent: " + request.cf.continent + "</p>";
    html_content += "<p> Latitude: " + request.cf.latitude + "</p>";
    html_content += "<p> Longitude: " + request.cf.longitude + "</p>";
    html_content += "<p> PostalCode: " + request.cf.postalCode + "</p>";
    html_content += "<p> MetroCode: " + request.cf.metroCode + "</p>";
    html_content += "<p> Region: " + request.cf.region + "</p>";
    html_content += "<p> RegionCode: " + request.cf.regionCode + "</p>";
    html_content += "<p> Timezone: " + request.cf.timezone + "</p>";

    let html = `<!DOCTYPE html>
      <head>
        <title> Geolocation: Hello World </title>
        <style> ${html_style} </style>
      </head>
      <body>
        <h1>Geolocation: Hello World!</h1>
        <p>You now have access to geolocation data about where your user is visiting from.</p>
        ${html_content}
      </body>`;

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
  },
};
```

{{</tab>}}
{{<tab label="ts/esm">}}

```ts
const handler: ExportedHandler = {
  async fetch(request) {
    let html_content = "";
    let html_style =
      "body{padding:6em; font-family: sans-serif;} h1{color:#f6821f;}";

    html_content += "<p> Colo: " + request.cf.colo + "</p>";
    html_content += "<p> Country: " + request.cf.country + "</p>";
    html_content += "<p> City: " + request.cf.city + "</p>";
    html_content += "<p> Continent: " + request.cf.continent + "</p>";
    html_content += "<p> Latitude: " + request.cf.latitude + "</p>";
    html_content += "<p> Longitude: " + request.cf.longitude + "</p>";
    html_content += "<p> PostalCode: " + request.cf.postalCode + "</p>";
    html_content += "<p> MetroCode: " + request.cf.metroCode + "</p>";
    html_content += "<p> Region: " + request.cf.region + "</p>";
    html_content += "<p> RegionCode: " + request.cf.regionCode + "</p>";
    html_content += "<p> Timezone: " + request.cf.timezone + "</p>";

    let html = `<!DOCTYPE html>
      <head>
        <title> Geolocation: Hello World </title>
        <style> ${html_style} </style>
      </head>
      <body>
        <h1>Geolocation: Hello World!</h1>
        <p>You now have access to geolocation data about where your user is visiting from.</p>
        ${html_content}
      </body>`;

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
  },
};

export default handler;
```

{{</tab>}}
{{</tabs>}}
