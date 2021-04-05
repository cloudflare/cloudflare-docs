---
order: 40
---

# Best practices

## Planned maintenance

When making changes to your applications or adding assets, you may want to roll out those changes one origin at a time to ensure they work properly. However, as the load balancer continues to direct traffic among multiple origins, both versions of your app are served and the user has an inconsistent experience.

To avoid an inconsistent user experience when rolling out application changes, you can temporarily configure load balancing not to direct traffic to each origin as you upgrade them.

### Using the Load Balancing dashboard to temporarily ignore an origin server

To temporarily ignore an origin server:

1. Update the associated monitor so that your origin will fail health checks, which will route traffic away from that origin. This might include setting:
    - The **Response Code** to an HTTP status code you know your server does not return
    - An incorrect value for **Response Body**, such as a specific text string

1. Confirm the origin server is not receiving traffic. Load Balancing will issue a notification email that the origin is down.

1. Upgrade the origin and test that the change is working as you intended.

1. Re-enable load balancing for the upgraded origin server by restoring the values you modified in Step 1 to those expected for a healthy origin.

1. Repeat these steps for the other origins across which you are balancing application traffic.

### Using the Cloudflare API to temporarily set origin status to _disabled_

Automate this process with the [Load Balancing Cloudflare API](https://api.cloudflare.com/#load-balancer-pools-modify-a-pool) by setting the status of an origin server to `disabled`.

To temporarily set origin status to _disabled_, use the Update Load Balancer command to set the `enabled` property for that origin object to `false`, as in the example below:

```js
// PUT https://api.cloudflare.com/client/v4/user/load_balancers/pools/<pool_id>
{
  "description": "Production Datacenter #1 - US West ",
  "created_on": "2016-12-22T16:16:16.206253Z",
  "modified_on": "2017-01-14T00:11:23.656655Z",
  "id": "916167df7265e0ab2284400cee32282f",
  "enabled": true,
  "minimum_origins": 1,
  "monitor": null,
  "name": "Production Datacenter 1",
  "notification_email": "you@example.com",
  "origins": [
    {
      "name": "server-1",
      "address": "0.0.1.1",
      "enabled": false
    },
    {
      "name": "server-2",
      "address": "0.0.2.2",
      "enabled": true
    }
  ]
}
```

---

## Load balancing containerized application deployments

Cloudflare’s Load Balancer distributes global traffic intelligently across Google Kubernetes Engine (GKE) and Amazon Web Services EC2 (AWS). Cloudflare’s native Kubernetes support provides a multi-cloud deployment that is transparent to end users.

![](../static/images/best-practices-2.png)

### Prerequisites

Before you begin, be sure you have the following:

- Access to Google Cloud Platform (GCP)
- Access to AWS
- Docker image
- A domain on Cloudflare (on the Free, Pro, or Business plan) with a Load Balancing subscription, configurable in the Traffic app

### Deploying a containerized web application on Google Kubernetes Engine

We will be using [Google Cloud Shell](https://cloud.google.com/shell/) interface, which comes preinstalled with the gcloud console, docker, and kubectl command-line tools used below. If you use Cloud Shell, you don’t need to install these command-line tools on your workstation.

#### Getting started

Go to the [Kubernetes Engine](https://console.cloud.google.com/kubernetes?_ga=2.151836153.-1932148812.1510627946). Click the **Activate Google Cloud Shell** button at the top of the console window. A Cloud Shell session with a command prompt will open in a new frame at the bottom of the console.

![](../static/images/best-practices-3.png)

Set default configuration values by running the following commands:

- `gcloud config set project PROJECT_ID`
- `gcloud config set compute/zone us-west1-a`

### Deploying a web application

1. Create a container cluster to run the container image. A cluster consists of a pool of Compute Engine VM instances running Kubernetes.

   - Run the following command to create a three-node cluster (our cluster name is _camilia-cluster_): `gcloud container clusters create camilia-cluster --num-nodes=3`

   - It may take several minutes for the cluster to be created. Once the command is complete, run the following command to see the cluster’s three worker VM instances: `gcloud compute instances list`

1. Deploy the application to the cluster. Use the kubectl command-line tool to deploy and manage applications on a Kubernetes Engine cluster.
   You can create a simple nginx docker container, for example, using the following command* (camilia-nginx* is the name for the deployment):
   `kubectl run camilia-nginx --image=nginx --port 80`
