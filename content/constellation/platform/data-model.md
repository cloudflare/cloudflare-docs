---
pcx_content_type: concept
title: Data model
weight: 10
---

# Data model

Our data model is loosely inspired by the [MLflow machine learning lifecycle](https://mlflow.org/docs/latest/concepts.html) and simplified to align with our general Workers' developer experience.

The three fundamental concepts of our model are Projects, Models, and the Catalog.

## Projects

The Project has a name, a machine-learning runtime, and an Id.

The runtime has to be one of our supported engines. Refer to [Constellation Runtimes](/constellation/platform/runtimes/) for the complete list. The ID is what binds the project to the Worker.

The name can only have alphanumeric, minus (-) and underscore (_) characters (```/^[a-zA-Z0-9-_]+$/```) and it helps organize things and is used for certain operations in [Wrangler](/constellation/concepts/wrangler-support/) and the APIs.

You can have as many projects as you want under your account.

## Models

The models are user-uploaded files that are attached to a specific project. The model has a name, a description, and an ID. A model needs to be compatible with the [machine-learning runtime](/constellation/platform/runtimes/) defined in the project it belongs to. For example, you should only upload the `model.onnx` file to a project configured for ONNX runtime.

The name can only have alphanumeric, minus (-) and underscore (_) characters (```/^[a-zA-Z0-9-_]+$/```).

You can have as many models per project as you want.

If you delete a project, you also delete all its associated models.

Currently, during the private beta, we only support models that are smaller than 10 MiB.

## Catalog

Not everyone will want to train models or browse the Internet for models they didn't test yet and upload them. Cloudflare will maintain a list of verified models that are known to work with the Constellation APIs out of the box.

For each machine-learning runtime we support, developers can search for ready-to-use permanent models in our [catalog](/constellation/platform/data-model/#catalog) and use them for some of the most popular tasks without additional configurations or file uploads.

Like user-uploaded models, the models in the catalog have a name, an Id, and a description and are associated with a parent catalog project that defines the runtime.

