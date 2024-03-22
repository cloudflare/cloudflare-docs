---
title: Serverless computing
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

Cloudflare Workers allows you to build serverless applications or augment existing ones by writing code that is deployed instantly across the globe. To understand the significance of Workers technology, we begin by understanding the environment in which it was developed.

Workers is a serverless computing platform. [Serverless computing](https://www.cloudflare.com/learning/serverless/what-is-serverless/) refers to a cloud computing model where providers, like Cloudflare, manage servers on behalf of users, allowing developers and businesses to focus entirely on writing and deploying application logic. 

## On-premise infrastructure

[On-premise infrastructure](https://www.cloudflare.com/learning/cloud/what-is-cloud-migration/) refers to a traditional way of managing computer resources where servers are kept within the physical premises of an organization. The on-premise model gives organizations robust control over the security, customization, and configuration of their infrastructure but has significant downsides such as cost of server maintenance and scaling to accomodate business growth. Cloud computing emerged commercially in the early 2000s as an alternative to this paradigm.

## Cloud infrastructure

[Cloud computing](https://www.cloudflare.com/learning/cloud/what-is-the-cloud/) is defined as hosting computing resources (such as virtual machines, storage, databases, and networking services) on third-party servers. Cloud computing service providers include Amazon Web Services, Microsoft Azure, Gooogle Cloud Platform, and Cloudflare. The mains service models of cloud computing are: Infrastructure-as-a-Service (IaaS), Platform-as-a-Service (Paas), and Software-as-a-Service (SaaS).

![IaaS, PaaS and Saas models](/images/learning-paths/workers/saas-paas-iaas-diagram.svg)

Cloudflare Workers is under the [Functions-as-a-Service (FaaS)](https://www.cloudflare.com/learning/serverless/glossary/function-as-a-service-faas/) model, which is a serverless way to execute modular pieces of code on the [edge](https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/).

### Serverless computing

While serverless computing and cloud computing are closely related concepts, there are a few notable differences.

#### Resources management

Cloud computing allows organizations to rent a fixed number of servers or server space. To prepare for seasonal or unplanned spikes in request traffic to their applications, organizations may overpurchase server space to ensure their applications do not go down because of high request volume from end users or customers. In the serverless computing model, organizations and individuals are not required to calculate how much server space or machines they need to rent. Serverless computing providers take care of server management, scaling, and provisioning, allowing developers and organizations to focus on writing and deploying logic.

#### Execution model

Serverless computing differs from traditional cloud computing structures in its cloud architecture. Cloud computing infrastructure includes [virual machines (VM)](https://www.cloudflare.com/learning/cloud/what-is-a-virtual-machine/) and [containers](https://www.cloudflare.com/learning/serverless/serverless-vs-containers/). Serverless computing uses an event-driven model. A serverless application is broken up into functions, and hosted by a serverless computing provider who charges the application developer based on the amount of time each function runs. A function will run when an event (like an HTTP request) occurs. You will learn more about container infrastructure versus Workers infrastructure in the [next part of this module](/learning-paths/workers/concepts/workers-concepts/). 

#### Billing model

Developers and organizations using serverless computing are billed on a [usage model](/workers/pricing/) paradigm. Instead of paying for a fixed amount of computing resources that may be underutilized or exceeded, users pay as much as they use in the serverless model.

#### Scalability

Serverless computing platforms scale automatically to handle surges and low points in request traffic. This removes the need for organizations to provision and manage more servers, spin up virtual machines, or orchestrate containers. The serverless computing provider is responsible for the scalability of your application and will work to match resources to the volume of requests your application is receiving, ensuring your application stays online.

## Summary

By reading this page, you have:

- Been introduced to the serverless computing concept that is behind Cloudflare Workers.
- Reviewed the differences between legacy on-premise and cloud computing infrastructure.
- Analyzed the key differences between the cloud computing and serverless computing paradigms.

In the next section, you will learn about what makes Workers, a serverless computing platform that is part of the larger Cloudflare Developer Platform, unique in its architecture from other serverless computing providers.