---
pcx_content_type: how-to
title: Kubernetes
weight: 6
---

# Kubernetes

[Kubernetes](https://kubernetes.io/) is a container orchestration and management tool. Kubernetes is declarative, so you define the end state in a .yml file. A Kubernetes cluster has two components, the master, and the workers. The master is the control plane that the user interacts with to manage the containers. Worker nodes are where the containers are deployed and run. A Kubernetes cluster is connected internally through a private network. Cloudflare Tunnel can be used to expose services running inside the Kubernetes cluster to the public.

## Creating the Kubernetes Cluster
This guide will use a Google managed Kubernetes GKE.
To get started, perform the following steps:

- Install the [gcloud CLI](https://cloud.google.com/sdk/docs/install) and [kubectl CLI](https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl).
- In the GCP console create a new Kubernetes cluster.
- In order to connect to the cluster, select the three dots and then connect from the drop down. 
- Copy the command that appears and paste it into your local terminal.

## Creating the Pods
A pod is the basic deployable object that Kubernetes creates. It represents an instance of a running process in the cluster. The following .yml file ( httpbin-app.yml) will create a pod that contains the httpbin application. It will create two replicas so as to prevent any downtime. The application will be accessible inside the cluster at web-service:80.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: httpbin-deployment
spec:
  selector:
    matchLabels:
      app: httpbin
  replicas: 2
  template:
    metadata:
      labels:
        app: httpbin
    spec:
      containers:
      - name: httpbin
        image: kennethreitz/httpbin:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  selector:
    app: httpbin
  ports:
    - protocol: TCP
      port: 80
```
Using the following command the application will begin to run inside the cluster.
```sh
$ kubectl create -f httpbin-app.yml
```
The pods' status can be seen through the console or using the kubectl get pod command.
```sh
$ kubectl get pods
```

## Routing with Cloudflare Tunnel
The tunnel can be created through the dashboard using [this guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/remote/). Instead of running the command to install a connector you will select docker as the environment and copy just the token rather than the whole command. Configure the tunnel to route to k8.example.com from the service http://web-service:80. Create the cloudflared-deployment.yml file with the following content.
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: cloudflared
  name: cloudflared-deployment
  namespace: default
spec:
  replicas: 2
  selector:
    matchLabels:
      pod: cloudflared
  template:
    metadata:
      creationTimestamp: null
      labels:
        pod: cloudflared
    spec:
      containers:
      - command:
        - cloudflared
        - tunnel
        # In a k8s environment, the metrics server needs to listen outside the pod it runs on. 
        # The address 0.0.0.0:2000 allows any pod in the namespace.
        - --metrics
        - 0.0.0.0:2000
        - run
        args:
        - --token
        - <token value>
        image: cloudflare/cloudflared:latest
        name: cloudflared
        livenessProbe:
          httpGet:
          # Cloudflared has a /ready endpoint which returns 200 if and only if
          # it has an active connection to the edge.
            path: /ready
            port: 2000
          failureThreshold: 1
          initialDelaySeconds: 10
          periodSeconds: 10
```
This file will be deployed with the following command.
```sh
$ kubectl create -f cloudflared-deployment.yml
```
The application within the cluster will now be accessible through the domain name as configured.
