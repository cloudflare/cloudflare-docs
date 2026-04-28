---
name: metadata-readonly-planner
description: Analyzes permission state and generates a plan for implementing metadata-readonly roles for a Cloudflare product.
---

# Metadata Read-Only Permission Planner

Analyzes a product's permission state and generates an implementation plan for metadata-readonly access.

**This skill NEVER creates MRs or modifies repos.** It only outputs plans.

**Principle**: When in doubt, `[ASK USER]`. This skill marks ambiguities with `[ASK USER]` tags — always surface these to the product team engineer rather than making assumptions.

## Commands

| Command | Description |
|---------|-------------|
| `/metadata-readonly plan <product>` | Full analysis + implementation plan |
| `/metadata-readonly analyze <product>` | Current state analysis + scoping recommendation |
| `/metadata-readonly bach <product>` | Bach permission/role plan |
| `/metadata-readonly gateway <product>` | Gateway enforcement plan |
| `/metadata-readonly summary <product>` | Post-implementation report |

---

## Core Concepts

### Metadata vs Content

- **Metadata**: List resources, get config, stats, analytics (low sensitivity)
- **Content**: Database rows, stored values, objects, secrets (high sensitivity)

### Gateway Authorization

Permission required = `{ResourceType}.{action}`

To require a different permission, change `ResourceType` in gateway config. The action (`read`, `list`, etc.) stays standard.

**HTTP method to action mapping**:
| HTTP Method | Gateway Action |
|-------------|----------------|
| GET (single resource) | `read` |
| GET (collection) | `list` |
| POST (create) | `create` |
| PUT / PATCH | `update` |
| DELETE | `delete` |

### Scoping Directions

- **Forward Scoping** (`.content` suffix): New resource for content. Use when existing "Read" role grants everything.
- **Backward Scoping** (`.metadata` suffix): New resource for metadata. Harder to implement.
- **Role-Only**: No new resource, just new role excluding content permissions. Use when permissions already separate metadata/content.

---

## Workflow

### Step 1: Discovery (Parallel Subagents)

Run all 4 tasks in parallel using the Task tool. **Initiate all 4 in a single response, then wait for ALL to complete before Step 2.**

#### Subagent 1: OpenAPI Endpoints

```bash
curl -s "https://api.cloudflare.com/schemas.json" | \
  jq '.paths | to_entries[] | select(.key | contains("<keyword>")) | {path: .key, methods: (.value | keys)}'
```

Try keywords from product name. If no results, ask user for correct path pattern.

#### Subagent 2: Bach State

```bash
git clone git@gitlab.cfdata.org:cloudflare/www/bach.git /tmp/bach-repo
```

Search and **read file contents**:
- Resources: `grep "<keyword>" etc/seed/prod/resource.yaml`
- Permissions: `grep "<keyword>" etc/seed/prod/permission.yaml`
- Roles: `ls etc/seed/prod/roles/api_tokens/ | grep -i <keyword>` — **read each matching file** to get full permissions list
- OAuth scopes:
  ```bash
  # Find OAuth scopes containing product permissions
  grep -l "<keyword>" etc/seed/prod/roles/oauth_scope/external/*.yaml
  grep -l "<keyword>" etc/seed/prod/roles/oauth_scope/internal/*.yaml
  ```
  **Read each matching file** to get full permissions list.
  
  **Note**: OAuth file naming is inconsistent (e.g., `workers_kv-write.yaml`, `workers-read.yaml`, `worker_platform_read.yaml`). Also check umbrella scopes like `worker_platform_*`, `workers-*`, `account-*`.
  
  `[ASK USER]` If OAuth scope discovery is incomplete or naming patterns are unclear, ask the product team engineer which OAuth scopes include their product's permissions.

#### Subagent 3: Edge Gateway

```bash
git clone git@gitlab.cfdata.org:cloudflare/api/gateway.git /tmp/edge-gateway
grep -B 5 -A 25 "<keyword>" src/upstream/service_directory.ts
```

Extract: `PathPattern`, `ResourceType`, `PermissionScopes`, `DelegateAuthZToUpstream`

#### Subagent 4: Core Gateway

**REQUIRED**: Always check Core Gateway even if Edge Gateway appears complete. Bulk, export, and batch endpoints often ONLY exist in Core Gateway.

```bash
git clone git@gitlab.cfdata.org:cloudflare/www/api-gateway.git /tmp/api-gateway
grep -r "<keyword>" template/yaml/services/
```

Format differs from edge — look for `resource_type` and `actions` in YAML.

---

### Step 2: Consolidate Results

Build tables comparing:
1. **OpenAPI endpoints** vs **gateway routes** — flag gaps
2. **Permissions** — which are metadata vs content?
3. **Roles** — which grant content access?
4. **Permissions without endpoints** — may be:
   - Internal-only APIs (not in public OpenAPI)
   - Analytics/metrics APIs (separate system)
   - Legacy permissions (deprecated but still seeded)
   
   `[ASK USER]` Flag unmatched permissions for product team verification.

5. **Analytics permissions** — Most products have `{product}.analytics.read`. These are typically metadata but may have different sensitivity depending on what metrics are exposed.

   `[ASK USER]` Ask the product team: "Should analytics permissions be included in metadata-readonly, or do they expose sensitive operational data that should be restricted?"

6. **Shared permissions** — Check if any single permission is used by multiple endpoints with different sensitivity levels. For example, a `key.read` permission used by both `/metadata/{key}` (low sensitivity) and `/values/{key}` (high sensitivity).

   If shared permissions are found:
   
   `[ASK USER]` Ask the product team: "These endpoints share the same permission but have different sensitivity levels: [list endpoints]. Do you want to split them using forward scoping (new `.content` resource) or backward scoping (new `.metadata` resource)?"

---

### Step 3: Decide Scoping

```
Has granular permissions (separate list vs read)?
├── YES → Role-Only possible
│         Does gateway enforce separately?
│         ├── YES → Role-Only
│         └── NO → Hybrid (role + gateway change)
└── NO → Forward Scoping (.content resource)
```

**Common problem**: A "metadata" endpoint (like `/metadata/:key`) may share the same permission as a "content" endpoint (like `/values/:key`). If both use the same `ResourceType` + `action`, you need a gateway change to separate them.

`[ASK USER]` **ALWAYS ask user to confirm scoping direction.** Present your recommendation with reasoning, then list all options (Role-Only, Forward Scoping, Backward Scoping, Hybrid) and ask which to proceed with. Do not assume — even if one seems obviously simpler.

---

### Step 4: Classify Endpoints

Classification is binary: **Metadata** or **Content**. This describes *what* the endpoint accesses, not *how* (read vs write).

**Classification Rules** (apply in order of priority):

| Priority | Pattern | Classification | Reason |
|----------|---------|---------------|--------|
| 1 | `**/values/**`, `**/data/**`, `**/content/**` | Content | Actual stored data |
| 2 | `*bulk*`, `*export*`, `*query*`, `*download*` | Content | Batch data access |
| 3 | `**/metadata/**` | Metadata | Resource metadata only |
| 4 | `GET /<resources>` (collection) | Metadata | List operation |
| 5 | `GET /<resource>/:id` (single) | Metadata | Config/settings |
| 6 | `POST /<resources>` (create) | Metadata | Creating config |
| 7 | `PUT/DELETE /<resource>/:id` | Metadata | Modifying config |
| 8 | `GET /<resource>/:id/<sub-resource>` | `[ASK USER]` | Ambiguous - depends on what's returned |

**Ambiguous cases** — Ask user to clarify:
- **List endpoints** — may expose sensitive info if users store secrets in resource names
- **Endpoints with "metadata" in path** — path naming ≠ permission classification; ask what data is actually returned
- **Config endpoints** — may include connection strings or sensitive details

---

### Step 5: Present Classification Table

**REQUIRED CHECKPOINT**: You MUST output this table and get user confirmation BEFORE proceeding to Step 6 or generating any plans.

Build the table with ALL endpoints discovered in Step 1:

| # | Endpoint | Method | Classification | Current Permission | Proposed Permission | Reason |
|---|----------|--------|---------------|-------------------|---------------------|--------|

**Column definitions**:
- **#**: Sequential number for user reference
- **Endpoint**: Full path pattern
- **Method**: HTTP method
- **Classification**: `Metadata` or `Content`
- **Current Permission**: What the gateway enforces today
- **Proposed Permission**: What should be required after implementation:
  - Metadata → keep current permission (no change)
  - Content → new `.content` scoped permission
- **Reason**: Brief justification for classification

**Example** (D1):

| # | Endpoint | Method | Classification | Current Permission | Proposed Permission | Reason |
|---|----------|--------|---------------|-------------------|---------------------|--------|
| 1 | `/d1/database` | GET | Metadata | `d1.database.list` | `d1.database.list` | List operation |
| 2 | `/d1/database/{db_id}` | GET | Metadata | `d1.database.read` | `d1.database.read` | Database config |
| 3 | `/d1/database` | POST | Metadata | `d1.database.create` | `d1.database.create` | Create config |
| 4 | `/d1/database/{db_id}` | DELETE | Metadata | `d1.database.delete` | `d1.database.delete` | Delete config |
| 5 | `/d1/database/{db_id}/query` | POST | Content | `d1.database.update` | `d1.content.update` | Executes SQL on data |
| 6 | `/d1/database/{db_id}/export` | POST | Content | `d1.database.read` | `d1.content.read` | Bulk data export |

**Deriving role membership from the table**:
- **Metadata-readonly role includes**: Rows where Classification = `Metadata` AND Method = `GET`
- **Content permissions to create**: All unique Proposed Permissions containing `.content`

`[ASK USER]` "Review the classification table above. Reference by number to request changes (e.g., '#3 should be content'). Confirm when ready to proceed."

**Do not proceed until user confirms.**

---

### Step 6: Stratus UI Changes

**Timing**: Do AFTER Bach is merged. Permissions are visible once seeded but gated in UI.

**Repo**: https://gitlab.cfdata.org/cloudflare/fe/stratus

1. **Gate the role** — Add `{product}_metadata_read` to `GATED_PERMISSION_LABELS` in `src/apps/dash/react/pages/accounts/utils/permissionTypes.ts`
2. **Localization** — Add translation strings for the role name

Gate `metadata-authz-enabled` controls visibility. DevTools users can see permissions via API (acceptable).

---

## Plan Output

### `/metadata-readonly bach <product>`

```markdown
## Bach Changes

### 1. Resource Changes
- [ ] Add resource `<key>` with parent `<parent>` — OR "None needed"

### 2. Permission Changes
- [ ] Add permission `<key>` on resource `<resource>` — OR "None needed"

### 3. New Role: <Product> Metadata Read
- [ ] File: `etc/seed/prod/roles/api_tokens/<product>_metadata_read.yaml`
- [ ] Include: (metadata permissions)
- [ ] Exclude: (content permissions)

### 4. Backfill Existing Roles (CRITICAL)
- [ ] Add new permission to existing Read/Write roles
- [ ] Check for wildcard permissions (e.g., `resource.*`) — wildcards do NOT cover child resources, so roles with `key.*` need explicit `key.content.*` added
**Why**: Without backfill, existing roles lose access. #1 regression cause.

### 5. OAuth Scopes
`[ASK USER]` Ask the product team: "Should we create a new OAuth scope (e.g., `{product}:metadata_read`) or only backfill existing scopes with the new permissions?"
- [ ] Create new scope (if requested) and/or backfill existing scopes

### 6. Stratus Gate
Gate: https://gates.cloudflare.com/apps/e26855ea0b434298b52277be32213e0b/gates/metadata-authz-enabled

**Timing**: Enable AFTER Bach and Gateway MRs are merged.
**Rollback**: Disable gate FIRST if issues arise, then revert MRs.

### 7. Stratus UI (AFTER Bach merge)
- [ ] Add `{product}_metadata_read` to `GATED_PERMISSION_LABELS` in Stratus
- [ ] Add localization for role name
```

### `/metadata-readonly gateway <product>`

```markdown
## Gateway Changes

| Endpoint | Gateway | Current ResourceType | New ResourceType |
|----------|---------|---------------------|------------------|

**Edge**: Update `ResourceType` in `Authz` block in `src/upstream/service_directory.ts`
**Core**: Update `resource_type` in `template/yaml/services/<service>/prod.yaml`

Action stays the same — only ResourceType changes.
```

### `/metadata-readonly summary <product>`

Run after implementation. Compare before/after state in Bach and gateway.

---

## Rollout

1. **Bach MR first** — creates permissions and roles
2. **Gateway MRs** — enforces new ResourceTypes
3. **Stratus MR** — UI gating and localization (after Bach)
4. **Enable gate** — makes role visible to users

### Test Plan

- Metadata-only token on metadata endpoints → **200**
- Metadata-only token on content endpoints → **403**
- Existing Read/Write tokens → **200** (no regression)

### Rollback

Revert **gateway first**, then bach. Wrong order causes outage.

---

## Critical Pitfalls

1. **Backfill regression**: Always add new permissions to existing roles.
2. **Wrong rollback order**: Gateway first, then bach.
3. **Forgetting OAuth scopes**: Both roles and scopes need updating.
4. **Missing gateway**: Check BOTH edge and core gateways — bulk endpoints often only exist in core.
5. **Shared permissions**: If a metadata endpoint shares a permission with a content endpoint, you need a new resource type and gateway change to separate them.

---

## Reference: D1 Implementation

Canonical example MRs:

| Component | MR |
|-----------|-----|
| Bach | [!4199](https://gitlab.cfdata.org/cloudflare/www/bach/-/merge_requests/4199) |
| Edge Gateway | [!690](https://gitlab.cfdata.org/cloudflare/api/gateway/-/merge_requests/690) |
| Core Gateway | [!5200](https://gitlab.cfdata.org/cloudflare/www/api-gateway/-/merge_requests/5200) |
| Stratus | [!34746](https://gitlab.cfdata.org/cloudflare/fe/stratus/-/merge_requests/34746) |

**Patterns**: Forward scoping with `d1.content` resource; created both `.read` and `.update` permissions; backfilled ALL_PRIVILEGES, admin, worker_platform roles, API token roles, and OAuth scopes; gated via `GATED_PERMISSION_LABELS` set in Stratus.
