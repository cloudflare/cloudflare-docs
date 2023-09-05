---
pcx_content_type: concept
title: Durable Objects migrations
---

# Durable Objects migrations

A migration is a mapping process from a class name to a runtime state.

You must initiate a migration process when you:

* Create a new Durable Object class.
* Rename a Durable Object class.
* Delete a Durable Object class.
* Transfer an existing Durable Objects class.

This process informs the Workers runtime of the changes and provides it with instructions on how to deal with those changes.

{{<Aside type="note">}}

Updating code for an existing Durable Object class does not require a migration. To update code for an existing Durable Object class, run [`npx wrangler deploy`](/workers/wrangler/commands/#deploy). This is true even for changes to how code interacts with persistent storage. Because of [global uniqueness](/durable-objects/platform/known-issues/#global-uniqueness), you do not have to be concerned about old and new code interacting with the same storage simultaneously. However, it is your responsibility to ensure that new code is backwards compatible with existing stored data.

{{</Aside>}}

The most common migration performed is a new class migration, which informs the runtime that a new Durable Object class is being uploaded.

Migrations can also be used for transferring stored data between two Durable Object classes:

* Rename migrations are used to transfer stored Durable Objects between two Durable Object classes in the same Worker code file. 
* Transfer migrations are used to transfer stored Durable Objects between two Durable Object classes in different Worker code files.

The destination class (the class that stored Durable Objects are being transferred to) for a rename or transfer migration must be exported by the deployed Worker.

{{<Aside type="warning" header="Important">}}

After a rename or transfer migration, requests to the destination Durable Object class will have access to the source Durable Object's stored data.

After a migration, any existing bindings to the original Durable Object class (for example, from other Workers) will automatically forward to the updated destination class. However, any Workers bound to the updated Durable Object class must update their Durable Object binding configuration in the `wrangler.toml` file for their next deployment.

{{</Aside>}}

Migrations can also be used to delete a Durable Object class and its stored Durable Objects.

{{<Aside type="warning" header="Delete migrations">}}

Running a delete migration will delete all Durable Object instances associated with the deleted class, including all of their stored data. Do not run a delete migration on a class without first ensuring that you are not relying on the Durable Objects within that class anymore. Copy any important data to some other location before deleting.

{{</Aside>}}

### Durable Object migrations in `wrangler.toml`

Migrations are performed through the `[[migrations]]` configurations key in your `wrangler.toml` file. 

Migrations require a migration tag, which is defined by the `tag` property in each migration entry. 

Migration tags are treated like unique names and are used to determine which migrations have already been applied. Once a given Worker code has a migration tag set on it, all future Worker code deployments must include a migration tag.

The migration list is an ordered array of tables, specified as a top-level key in your `wrangler.toml` file. The migration list is inherited by all environments and cannot be overridden by a specific environment.

All migrations are applied at deployment. Each migration can only be applied once per [environment](/durable-objects/platform/environments/).

To illustrate an example migrations workflow, the `DurableObjectExample` class can be initially defined with:

```toml
---
filename: wrangler.toml
---
[[migrations]]
tag = "v1" # Should be unique for each entry
new_classes = ["DurableObjectExample"] # Array of new classes
```

Each migration in the list can have multiple directives, and multiple migrations can be specified as your project grows in complexity. For example, you may want to rename the `DurableObjectExample` class to `UpdatedName` and delete an outdated `DeprecatedClass` entirely.

```toml
---
filename: wrangler.toml
---
[[migrations]]
tag = "v1" # Should be unique for each entry
new_classes = ["DurableObjectExample"] # Array of new classes

[[migrations]]
tag = "v2"
renamed_classes = [{from = "DurableObjectExample", to = "UpdatedName" }] # Array of rename directives
deleted_classes = ["DeprecatedClass"] # Array of deleted class names
```

{{<Aside type="note">}}

Note that `.toml` files do not allow line breaks in inline tables (the `{key = "value"}` syntax), but line breaks in the surrounding inline array are acceptable.

{{</Aside>}}

### Durable Object migrations through Wrangler CLI

It is possible to define a migration through extra arguments to the [`npx wrangler deploy`](/workers/wrangler/commands/#deploy) command. When taking this route, any migrations listed in the [`wrangler.toml`](/workers/wrangler/configuration/#migrations) configuration file are ignored.

You should provide an `--old-tag` value whenever possible. This value should be the name of the migration tag that you believe to be most recently active. Your `npx wrangler deploy` command will throw an error if your `--old-tag` expectation does not align with Cloudflare's value.

The list of CLI migration arguments that can be added to `npx wrangler deploy` is as follows:

```bash
--old-tag <tag name> # Optional if your Worker code does not have a migration tag set yet.
--new-tag <tag name> # new-tag and old-tag are optional if you only use CLI migrations.

# Each of the migration directives can be specified multiple times if you are
# creating/deleting/renaming/transferring multiple classes at once.
--new-class <class name>
--delete-class <class name>
--rename-class <from class> <to class>
--transfer-class <from script> <from class> <to class>
```