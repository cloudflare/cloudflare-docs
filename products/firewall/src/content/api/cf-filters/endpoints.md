---
title: Endpoints
weight: 360
---
To invoke a Cloudflare Filters API operation, append the endpoint to the Cloudflare API base URL (`https://api.cloudflare.com/client/v4/zones/{zone_id}`). For authentication instructions, consult the standard Cloudflare API documentation.

The Cloudflare Filters API endpoints are:

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
            <td>POST /filters</td>
            <td>- Create one or more filters
                <br/> - See <a href="/api/cf-filters/post/">POST example call</a></td>
            <td>- Handled as a single transaction
                <br/> - If one fails, then all fail</td>
        </tr>
        <tr>
            <td>GET /filters</td>
            <td>- Fetch filters
                <br/> - See <a href="/api/cf-filters/get/#get-all-filters">GET example call</a></td>
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
            <td>GET /filters/{id}</td>
            <td>- Fetch a filter by ID
                <br/> - See <a href="/api/cf-filters/get/#get-by-filter-id">GET example call</a></td>
            <td></td>
        </tr>
        <tr>
            <td>PUT /filters</td>
            <td>- Update filters
                <br/> - See <a href="/api/cf-filters/put/#update-multiple-filters">PUT example call</a></td>
            <td>- All filters must exist
                <br/> - Handled as a single transaction
                <br/> - If one fails, all updates fail</td>
        </tr>
        <tr>
            <td>PUT /filters/{id}</td>
            <td>- Update a rule by ID
                <br/> - See <a href="/api/cf-filters/put/#update-a-single-filter">PUT example call</a></td>
            <td></td>
        </tr>
        <tr>
            <td>DELETE /filters</td>
            <td>- Delete filters
                <br/> - See <a href="/api/cf-filters/get/#delete-all-filters">DELETE example calls</a></td>
            <td>- Must be specified with list of identifiers returned by GET
                <br/> - Empty input results in no deletion
                <br/> - Returns <em>200</em> if rule does not exist</td>
        </tr>
        <tr>
            <td>DELETE /filters/{id}</td>
            <td>- Delete a filter by ID
                <br/> - See <a href="/api/cf-filters/get/#delete-a-single-filter">DELETE example call</a></td>
            <td></td>
        </tr>
    </tbody>
</table>`}}></div>


* To learn how to page through results, see *Requests > Pagination* in [Cloudflare API Getting Started](https://api.cloudflare.com/#getting-started-endpoints).
