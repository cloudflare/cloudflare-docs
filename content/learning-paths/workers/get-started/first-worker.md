---
title: Deploy your first Worker
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

You will now create your first Worker.

## Create your first Worker in the dashboard

{{<render file="_get-started-dash.md" productFolder="/workers/">}}

{{<render file="_prereqs.md" productFolder="/workers/">}}

## Create a new Worker project with C3

{{<render file="_c3-description.md" productFolder="/workers/" >}}
<br/><br/>
Open a terminal window and run C3 to create your Worker project:

{{<render file="_c3-run-command.md" productFolder="/workers/" >}}

{{<render file="_c3-output.md" productFolder="/workers/" >}}

{{<render file="_c3-basic-worker.md" productFolder="/workers/" >}}

{{<render file="_js-ts-note.md" productFolder="/workers/" >}}

{{<render file="_c3-deployment-options.md" productFolder="/workers/" >}}

{{<render file="_c3-output-files.md" productFolder="/workers/" >}}

## Deploy your Worker

If you did not choose to deploy your Worker when running the C3 setup wizard, deploy now by running [`wrangler deploy`]():



Your project will be deployedIf you have not configured any subdomain or domain, Wrangler will prompt you during the publish process to set one up.

## Summary

By reading this page, you have learned:

- 

### Related resources

* Explore [Examples](/workers/examples/) to experiment with ready-made Worker code.