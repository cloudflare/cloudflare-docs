---
title: WAF fields
alwaysopen: true
weight: 123
---

The Web Application Firewall (WAF) contains rules managed by Cloudflare to block requests that contain malicious content.  

### WAFAction

<table style="border: solid 2px darkgrey; width: 100%;">
<thead style="background: #ffeadf;">
<tr>
<td><strong>Value</strong></td>
<td><strong>Action</strong></td>
</tr>
</thead>
<tbody>
<tr>
<td><em><span style="font-weight: 400;">0</span></em></td>
<td>Unknown</td>
</tr>
<tr>
<td><em><span style="font-weight: 400;">1</span></em></td>
<td>Allow</td>
</tr>
<tr>
<td><em><span style="font-weight: 400;">2</span></em></td>
<td>Drop</td>
</tr>
<tr>
<td><em><span style="font-weight: 400;">3</span></em></td>
<td>Challenge Allow</td>
</tr>
<tr>
<td><em><span style="font-weight: 400;">4</span></em></td>
<td>Challenge Drop</td>
</tr>
<tr>
<td><em><span style="font-weight: 400;">5</span></em></td>
<td>Simulate</td>
</tr>
<tr>
<td><em><span style="font-weight: 400;">6</span></em></td>
<td>Log</td>
</tr>
</tbody>
</table>

### Deprecated fields for internal Cloudflare use 

The values of these fields are subject to change by Cloudflare at any time and are irrelevant for customer data analysis:

- WAFFlags 
- WAFMatchedVar 

---

