---
type: example
summary: Fetch weather data from an API using the user's geolocation data.
tags:
  - Originless
  - Geolocation
pcx_content_type: configuration
title: "Geolocation: Weather application"
weight: 1001
layout: example
---

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    let endpoint = "https://api.waqi.info/feed/geo:";
    const token = ""; //Use a token from https://aqicn.org/api/
    let html_style = `body{padding:6em; font-family: sans-serif;} h1{color:#f6821f}`;

    let html_content = "<h1>Weather 🌦</h1>";

    const latitude = request.cf.latitude;
    const longitude = request.cf.longitude;
    endpoint += `${latitude};${longitude}/?token=${token}`;
    const init = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    };

    const response = await fetch(endpoint, init);
    const content = await response.json();

    html_content += `<p>This is a demo using Workers geolocation data. </p>`;
    html_content += `You are located at: ${latitude},${longitude}.</p>`;
    html_content += `<p>Based off sensor data from <a href="${content.data.city.url}">${content.data.city.name}</a>:</p>`;
    html_content += `<p>The AQI level is: ${content.data.aqi}.</p>`;
    html_content += `<p>The N02 level is: ${content.data.iaqi.no2?.v}.</p>`;
    html_content += `<p>The O3 level is: ${content.data.iaqi.o3?.v}.</p>`;
    html_content += `<p>The temperature is: ${content.data.iaqi.t?.v}°C.</p>`;

    let html = `
      <!DOCTYPE html>
      <head>
        <title>Geolocation: Weather</title>
      </head>
      <body>
        <style>${html_style}</style>
        <div id="container">
        ${html_content}
        </div>
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
{{<tab label="ts">}}

```ts
const handler: ExportedHandler = {
  async fetch(request) {
    let endpoint = "https://api.waqi.info/feed/geo:";
    const token = ""; //Use a token from https://aqicn.org/api/
    let html_style = `body{padding:6em; font-family: sans-serif;} h1{color:#f6821f}`;

    let html_content = "<h1>Weather 🌦</h1>";

    const latitude = request.cf.latitude;
    const longitude = request.cf.longitude;
    endpoint += `${latitude};${longitude}/?token=${token}`;
    const init = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    };

    const response = await fetch(endpoint, init);
    const content = await response.json();

    html_content += `<p>This is a demo using Workers geolocation data. </p>`;
    html_content += `You are located at: ${latitude},${longitude}.</p>`;
    html_content += `<p>Based off sensor data from <a href="${content.data.city.url}">${content.data.city.name}</a>:</p>`;
    html_content += `<p>The AQI level is: ${content.data.aqi}.</p>`;
    html_content += `<p>The N02 level is: ${content.data.iaqi.no2?.v}.</p>`;
    html_content += `<p>The O3 level is: ${content.data.iaqi.o3?.v}.</p>`;
    html_content += `<p>The temperature is: ${content.data.iaqi.t?.v}°C.</p>`;

    let html = `
      <!DOCTYPE html>
      <head>
        <title>Geolocation: Weather</title>
      </head>
      <body>
        <style>${html_style}</style>
        <div id="container">
        ${html_content}
        </div>
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
