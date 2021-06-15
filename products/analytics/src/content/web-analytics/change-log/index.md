---
title: Change log
order: 40
pcx-content-type: reference
---

# Change log for beacon.min.js

Cloudflare occasionally updates the `beacon.min.js` file to improve Web Analytics functionality. The table below includes a log of what changed in the `beacon.min.js` file and when.

<table style="width:100%">
   <thead>
        <tr>
            <th>Date of change</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>2021-05-28</td>
            <td>startsWith function replaced with indexOf function, which prevents rendering if multiple beacon scripts are loaded.</td>
        </tr>
        <tr>
            <td>2021-05-12</td>
            <td>Reporting endpoint changed from /cdn-cgi/beacon/performance to /cdn-cgi/rum (for Browser Insights only).</td>
        </tr>
   </tbody>
</table>