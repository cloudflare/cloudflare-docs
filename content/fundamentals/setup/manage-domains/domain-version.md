---
title: Change your domain version
pcx_content_type: tutorial
---

# Change your domain version

[Version Management](/version-management/) is available for Enterprise customers and allows you to safely test, deploy, and roll back changes to your zone configurations. 

{{<tutorial>}}

{{<tutorial-step title="Enable versioning">}}

{{<render file="_enable-versioning.md" productFolder="version-management">}}
{{</tutorial-step>}}

{{<tutorial-step title="(Optional) Create additional environments">}}

{{<render file="_enable-default-creation.md" productFolder="version-management">}}

These environments each serve a specific purpose and are accessed differently:
{{<render file="_environment-defaults.md" productFolder="version-management">}}

{{<render file="_create-environment-situation.md" productFolder="version-management">}}
<br/>

For more details, refer to [Create environment](/version-management/how-to/environments/#create-environment).
{{</tutorial-step>}}

{{<tutorial-step title="Update configurations">}}

{{<render file="_edit-version.md" productFolder="version-management">}}
{{</tutorial-step>}}

{{<tutorial-step title="Test version">}}
{{<render file="_test-version.md" productFolder="version-management">}}
{{</tutorial-step>}}

{{<tutorial-step title="Promote version">}}

Next, [promote](/version-management/how-to/environments/#change-environment-version) your version through your different environments.

{{<render file="_promote-version.md" productFolder="version-management">}}

After promoting to each environment, test the new version in your new environment.
{{</tutorial-step>}}

{{<tutorial-step title="Repeat">}}
For new changes to your zone, [create a new version](/version-management/how-to/versions/#create-version) and repeat this process.
{{</tutorial-step>}}

{{</tutorial>}}