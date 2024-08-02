---
pcx_content_type: concept
title: Tags
---

# Tags

To help you manage your customers’ Workers, use tags to better perform create, read, update, delete (CRUD) operations at scale. Tag user Worker scripts based on user ID, account ID, project ID, and environment. After you tag user Workers, when a user deletes their project, you will be able to delete all Workers associated with that project simultaneously.

```bash
curl --request PUT \
"https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/dispatch/namespaces/{namespace_name}/scripts/{script_name}/tags" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/javascript" \
--data "['TAG1', 'TAG2', 'TAG3']"
```

{{<Aside type="note">}}

You can set a maximum of eight tags per script. Avoid special characters like `,` and `&` when naming your tag.

{{</Aside>}}

You can include script tags and bindings on multipart script uploads in the metadata blob.

```bash
curl --request PUT \
"https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/dispatch/namespaces/{namespace_name}/scripts/{script_name}" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: multipart/form-data" \
--form 'metadata="{\"main_module\": \"worker.js\", \"bindings\": [{\"name\": \"KV\", \"type\": \"kv_namespace\", \"namespace_id\": \"<KV_NAMESPACE_ID>\"}], \"tags\": [\"customer-123\", \"staging\", \"free-user\"]}"' \
--form 'worker.js=@"/path/to/worker.js";type=application/javascript+module'
```

### Tags API reference

Method and endpoint | Description
--------------------|------------
`GET https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/dispatch/namespaces/{namespace_name}/scripts/{script_name}/tags` | Lists tags through a response body of a list of tag strings.
`GET https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/dispatch/namespaces/{namespace_name}/scripts/{script_name}/tags?tags={filter}` | Returns true or false where `filter` is a comma separated pairs of tag names to a yes or no value (for example, `my-tag-value:yes`).
`GET https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/dispatch/namespaces/{namespace_name}/scripts?tags={filter}` |  Gets all Worker scripts that have tags that match the filter specified. The filter must be comma separated pairs of tag names to a yes or no value depending if the tag should act as an allowlist or blocklist.
`PUT https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/dispatch/namespaces/{namespace_name}/scripts/{script_name}/tags` |  Sets the tags associated with the worker to match the tags specified in the body. If there are tags already associated with the Worker script that are not in the request, they will be removed.
`PUT https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/dispatch/namespaces/{namespace_name}/scripts/{script_name}/tags/{tag}` | Adds the single specified tag to the list of tags associated with the Worker script.
`DELETE https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/dispatch/namespaces/{namespace_name}/scripts/{script_name}/tags/{tag}` | Deletes the single specified tag from the list of tags associated with the Worker script.
`DELETE https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/dispatch/namespaces/{namespace_name}/scripts?tags={filter}` |  Deletes all Worker scripts matching the filter. For example, `tags=testing:yes` would delete all scripts tagged with `testing`.
