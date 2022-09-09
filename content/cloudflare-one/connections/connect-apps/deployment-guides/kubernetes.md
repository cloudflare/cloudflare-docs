---
pcx_content_type: how-to
title: Kubernetes
weight: 41
---

# Kubernetes

Kubernetes, or K8s, is a container orchestration and management tool. Kubernetes is declarative, so you define the end state in a .yml file. A Kubernetes cluster has two components, the master, and the workers. The master is the control plane that the user interacts with to manage the containers. Worker nodes are where the containers are deployed and ran. A Kubernetes cluster is connected internally through a private network. Cloudflare Tunnel can be used to expose services running inside the Kubernetes cluster to the public.
![Tunnels in Kubernetes](/cloudflare-one/static/documentation/connections/connect-apps/kubernetes/k8s-layout.png)

## Creating the Kubernetes Cluster
This guide will use a Google managed Kubernetes GKE.
You will need the [gcloud command line tool installed and connected to your account](https://cloud.google.com/sdk/docs/install) and the [kubectl command line tool installed](https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl). In the GCP console create a new Kubernetes cluster.
![Create the cluster](/cloudflare-one/static/documentation/connections/connect-apps/kubernetes/create-cluster.png)
In order to connect to the cluster, in the dropdown form the three dots select connect.
![Create to the cluster](/cloudflare-one/static/documentation/connections/connect-apps/kubernetes/connect-cluster.png)
Copy the command that appears and paste it into your local terminal.
![Connection command](/cloudflare-one/static/documentation/connections/connect-apps/kubernetes/connect-command.png)

## Creating the Pods
A pod is the basic deployable object that Kubernetes creates. It represents an instance of a running process in the cluster. The following .yml file ( httpbin-app.yml) will create a pod that contains the httpbin application. It will create two replicas so as to prevent any downtime. The application will be accessible inside the cluster at web-service:80.
```sh
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
kubectl create -f httpbin-app.yml
```
The pods' status can be seen through the console or using the kubectl get pod command.
```sh
kubectl get pods
```

## Routing with Cloudflare Tunnel
The tunnel can be created through the dashboard using [this guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/remote/). Instead of running the command to install a connector you will select docker as the environment and copy just the token rather than the whole command. Configure the tunnel to route to k8.example.com from the service http://web-service:80. Create the cloudflared-deployement.yml file with the following content.
```sh
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
        - run
        args:
        - --token
        - <token value>
        image: cloudflare/cloudflared:latest
        name: cloudflared
```
This file will be deployed with the following command.
```sh
kubectl create -f cloudflared-deployment.yml
```
The application within the cluster will now be accessible through the domain name you configured.