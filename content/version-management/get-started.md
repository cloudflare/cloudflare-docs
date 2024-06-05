---
title: Get started
pcx_content_type: tutorial
weight: 3
---

# Get started

Follow this tutorial to start testing and deploying zone configuration changes with Version Management.

{{<tutorial>}}

{{<tutorial-step title="Enable versioning">}}

{{<render file="_enable-versioning.md">}}
{{</tutorial-step>}}

{{<tutorial-step title="(Optional) Create additional environments">}}

{{<render file="_enable-default-creation.md">}}

These environments each serve a specific purpose and are accessed differently:
{{<render file="_environment-defaults.md">}}

{{<render file="_create-environment-situation.md">}}
<br/>

For more details, refer to [Create environment](/version-management/how-to/environments/#create-environment).
{{</tutorial-step>}}

{{<tutorial-step title="Update configurations">}}
{{<render file="_edit-version.md">}}
{{</tutorial-step>}}

{{<tutorial-step title="Test version">}}
{{<render file="_test-version.md">}}
{{</tutorial-step>}}

{{<tutorial-step title="Promote version">}}

Next, [promote](/version-management/how-to/environments/#change-environment-version) your version through your different environments.

{{<render file="_promote-version.md">}}

After promoting to each environment, test the new version in your new environment.
{{</tutorial-step>}}

{{<tutorial-step title="Repeat">}}
For new changes to your zone, [create a new version](/version-management/how-to/versions/#create-version) and repeat this process.
{{</tutorial-step>}}

{{</tutorial>}}