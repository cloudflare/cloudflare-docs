---
_build:
  publishResources: false
  render: never
  list: never
---

If your project is a [Direct Upload](/pages/get-started/direct-upload/) project, you will not have the option to configure production branch controls. To update your production branch, you will need to manually call the [Update Project](/api/operations/pages-project-update-project) endpoint in the API.

```bash
curl --request PATCH \
"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data "{\"production_branch\": \"main\"}"
```