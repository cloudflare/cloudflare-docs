---
pcx-content-type: get-started
title: Get started
weight: 1
---

# Get Started

## Built with Cloudflare Workers

Cloudflare Workers provides a serverless [execution environment](https://www.cloudflare.com/en-gb/learning/serverless/what-is-serverless/) that allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure.

Previously, you could only add dynamic functionality to your Pages site by manually deploying a Worker using Wrangler, which meant that your application is written across both Pages and Workers. 

Functions allow you to leverage the Workers platform directly from within a Pages project by utilizing a project's filesystem convention. In addition, Functions enable you to deploy your entire site – static and dynamic content – when you `git push`.

{{<Aside type="note" header="Functions is currently in beta">}}
You can track current issues that the Pages team is fixing in Known issues. Let us know any unreported issues by posting in the Cloudflare Developers Discord.
{{</Aside>}}

## Setup

To get started, create a `/functions` directory at the root of your project. Writing your Functions files in this directory automatically generates a Worker with custom functionality at the predesignated routes.

Now that you have your `/functions` directory setup, get started [writing your first function](/pages/platform/functions/first-function/)

## Demo

To get started with your first Pages project with Functions, refer to the [demo blog post on how to build an image sharing application](http://blog.cloudflare.com/building-full-stack-with-pages). In this demo, you will build a JSON API with Functions (storing data on KV and Durable Objects), integrate with [Cloudflare Images](/images/) and [Cloudflare Access](/cloudflare-one/), and use React for your front end.
