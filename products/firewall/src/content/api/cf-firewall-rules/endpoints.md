---
title: Endpoints
weight: 320
---

To invoke a Cloudflare Firewall Rules API operation, append the endpoint to the Cloudflare API base URL (`https://api.cloudflare.com/client/v4/zones/{zone_id}`). For authentication instructions, consult the standard [Cloudflare API documentation](https://api.cloudflare.com/#getting-started-requests).

The Cloudflare Firewall Rules API endpoints are:

<div dangerouslyInsertInnerHTML={{__html: `

<table style="border: solid 2px darkgrey; width:70%;">
    <thead style="background:#ffeadf;">
        <tr>
            <th style="width:30%;">
                Method + URL stub
            </th>
            <th>
                Description
            </th>
            <th style="width:40%;">
                Notes
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>POST /firewall/rules</td>
            <td>- Create one or more rules
                <br/> - See <a href="/api/cf-firewall-rules/post/">POST example call</a></td>
            <td>- Handled as a single transaction
                <br/> - If one fails, then all fail</td>
        </tr>
        <tr>
            <td>GET /firewall/rules</td>
            <td>- Fetch rules
                <br/> - See <a href="/api/cf-firewall-rules/get/#get-all-rules">GET example call</a></td>
            <td>- Query on (case-insensitive):
                <br/> &nbsp;&nbsp;&nbsp;- Exact match for one or more <em>id</em>
                <br/> &nbsp;&nbsp;&nbsp;- Text in the description value
                <br/> &nbsp;&nbsp;&nbsp;- Exact match on one or more <em>ref</em>
                <br/>
                <br/> - Results paginated (25-item default)<sup>*</sup>
                <br/>
                <br/> - No query returns all active and paused rules</td>
        </tr>
        <tr>
            <td>GET /firewall/rules/{id}</td>
            <td>- Fetch a rule by ID
                <br/> - See <a href="/api/cf-firewall-rules/get/#get-by-rule-id">GET example call</a></td>
            <td></td>
        </tr>
        <tr>
            <td>PUT /firewall/rules</td>
            <td>- Update rules
                <br/> - See <a href="/api/cf-firewall-rules/put/#update-multiple-rules">PUT example call</a></td>
            <td>- Handled as a single transaction
                <br/> - All rules must exist
                <br/> - If one fails, all updates fail</td>
        </tr>
        <tr>
            <td>PUT /firewall/rules/{id}</td>
            <td>- Update a rule by ID
                <br/> - See <a href="/api/cf-firewall-rules/put/#update-a-single-rule">PUT example call</a></td>
            <td></td>
        </tr>
        <tr>
            <td>DELETE /firewall/rules</td>
            <td>- Delete rules
                <br/> - See <a href="/api/cf-firewall-rules/delete/#delete-all-rules">DELETE example calls</a></td>
            <td>- Must be specified with list of identifiers returned by GET
                <br/> - Empty input results in no deletion
                <br/> - Returns <em>200</em> if rule does not exist</td>
        </tr>
        <tr>
            <td>DELETE /firewall/rules/{id}</td>
            <td>- Delete a rule by ID
                <br/> - See <a href="/api/cf-firewall-rules/delete/#delete-a-single-rule">DELETE example call</a></td>
            <td></td>
        </tr>
    </tbody>
</table>`}}></div>


* To learn how to page through results, see *Requests > Pagination* in [Cloudflare API Getting Started](https://api.cloudflare.com/#getting-started-endpoints).
