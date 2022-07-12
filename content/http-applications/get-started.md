---
title: Get started
pcx-content-type: get-started
weight: 3
---

# Get started

Follow this tutorial to start testing and deploying edge configuration changes with HTTP Applications.

## Step 1 - Create an application

{{<render file="_create-application.md">}}

## Step 2 - Edit your version settings

{{<render file="_edit-version.md">}}

## Step 3 - Create a routing rule for staging

You next want to create a routing rule that sends traffic to your **Staging** environment using the new version of your application.

{{<render file="_create-routing-rule.md">}}

## Step 4 - Test your version

To test your version, you need to [send traffic to your staging environment](/http-applications/how-to/test-version-staging/).

## Step 5 - Create a routing rule for production

Assuming you did not encounter any issues when testing your version in staging, you would want to [create a new routing rule](/http-applications/how-to/manage-routing-rules/#create-routing-rules) to apply your version to **Production** traffic.