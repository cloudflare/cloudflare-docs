---
order: 80
---

# Kubernetes Ingress Controller

<Aside>

Cloudflare will end support for our Kubernetes Ingress Controller at the end of 2019.
The project is open source and we will continue to make it available in our GitHub repository. More information can be found <a href="https://github.com/cloudflare/cloudflare-ingress-controller/issues/172#issuecomment-541230988">here</a>.

We still believe that using Argo Tunnel and k8s together is a strong combination, but have
learned that running `cloudflared` as a sidecar is generally a more reliable and faster
approach. You can find more information about running Argo tunnel in a sidecar model [here](/argo-tunnel[/reference/sidecar/).

</Aside>

Playing around with the Argo Tunnel Ingress Controller is easy, and can be done on any Kubernetes
cluster ([Google GKE][k8s-google-gke], [Amazon EKS][k8s-amazon-eks], [Microsoft AKS][k8s-microsoft-aks]).
If you don't have one, you can create a local Kubernetes cluster with [Minikube][k8s-minikube].

For use-cases that require more than a single controller replica, you will need to purchase
[Cloudflare Load Balancing][cflare-load-balancing] to use Argo Tunnel Ingress Controller.
In the future, Cloudflare Load Balancing will be a configuration option, and the Ingress
Controller will be usable without Load Balancing.

In this example, we're going to expose a private version of the `echoserver` through Argo Tunnel.
This example assumes you have a Kubernetes cluster running on one of the platforms mentioned above.

## Step One: Download `cloudflared` & Generate a Certificate
Download and install `cloudflared` [here][cflare-tunnel-daemon].

Then, run `cloudflared login` and select a domain to generate and download a certificate. Make sure the certificate is placed into `~/.cloudflared/cert.pem`

## Step Two: Install the Ingress Controller with Helm
[Helm][help] is a package manager for kubernetes which defines an application as a set of templates. This makes it easy to install and update applications in a kubernetes cluster.

Add the repository that holds the Helm chart:

```sh
$ helm repo add cloudflare https://cloudflare.github.io/helm-charts
$ helm repo update
```

The Helm chart that describes all the components is found [here][cflare-github-helm].

Install the Controller with Helm:

```sh
$ helm install --name anydomain --namespace default \
    --set rbac.create=true \
    --set controller.ingressClass=argo-tunnel \
    --set controller.logLevel=6 \
    cloudflare/argo-tunnel
```
> **Note**: the controller watches all namespaces.

## Step Three: Deploy a Service into a Kubernetes Cluster
The `echoserver` image starts a http listener that simply mimics the request as its response.

Create a manifest called echo.yaml:

```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    app: echo
  name: echo
spec:
  ports:
  - name: http
    port: 80
    protocol: TCP
    targetPort: 8080
  selector:
    app: echo
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app: echo
  name: echo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: echo
  template:
    metadata:
      labels:
        app: echo
    spec:
      containers:
      - name: echo
        image: k8s.gcr.io/echoserver:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 8080
        resources:
          limits:
            cpu: 10m
            memory: 20Mi
          requests:
            cpu: 10m
            memory: 20Mi
      terminationGracePeriodSeconds: 60
```

Deploy `echoserver` into your Kubernetes cluster:

```sh
$ kubectl apply -f echo.yaml`
```
> **Tip**: `-n` sets the namespace for deployment.

## Step Four: Create a Tunnel Secret
Convert the domain certificate into a tunnel secret:

```sh
$ kubectl create secret generic mydomain.com --from-file="$HOME/.cloudflared/cert.pem"
```
> **Tip**: `-n` sets the namespace for deployment.

## Step Five: Create an Ingress Definition
The Kubernetes Ingress is a spec for external connectivity to a Kubernetes service. Typically,
an ingress will contain an annotation, `kubernetes.io/ingress.class`, to identify the controller
that should handle the ingress.

The ingress manifest contains:

- an annotation `kubernetes.io/ingress.class: argo-tunnel`, matching the controller.
- mappings between `host` and service name, port, path that should be exposed.
- mappings between `host` and tunnel secret

Create an ingress definition called `echo-tunnel.yaml`:
```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: argo-tunnel
  labels:
    ingress: argo-tunnel
  name: echo
spec:
  tls:
  - hosts:
    - echo.mydomain.com
    secretName: mydomain.com
  rules:
  - host: echo.mydomain.com
    http:
      paths:
      - backend:
          serviceName: echo
          servicePort: http
```
**Note:**

- the Ingress must be deployed in the **same namespace** as the Service
- the Ingress must be deployed in the **same namespace** as the Secret
- the `host` must belong the domain certificate (tunnel secret)

Deploy the Ingress:
```sh
$ kubectl apply -f echo-tunnel.yaml
```
> **Tip**: `-n` sets the namespace for deployment.

The ingress controller opens a tunnel between the Cloudflare edge and the Kubernetes virtual service IP.

## Step Six: Use the Tunnel
The ingress controller opens a tunnel between the Cloudflare edge and the Kubernetes virtual service IP.

Curl the tunnel:
```sh
$ curl http://echo.mydomain.com
```

Questions? Feedback? [We're listening
here][community-feedback].

[cflare-helm]: https://cloudflare.github.io/helm-charts/
[cflare-github-ingress]: https://github.com/cloudflare/cloudflare-ingress-controller
[cflare-github-helm]: https://github.com/cloudflare/helm-charts/tree/master/charts/argo-tunnel
[cflare-ingress-release]: https://github.com/cloudflare/cloudflare-ingress-controller/releases/tag/0.5.3
[cflare-load-balancing]: https://www.cloudflare.com/load-balancing/
[cflare-tunnel-daemon]: https://developers.cloudflare.com/argo-tunnel/downloads/
[community-feedback]: https://community.cloudflare.com/t/cloudflare-ingress-controller-beta-feedback/9377
[helm]: http://helm.sh/
[k8s-amazon-eks]: https://aws.amazon.com/eks/
[k8s-google-gke]: https://cloud.google.com/kubernetes-engine/
[k8s-microsoft-aks]: https://azure.microsoft.com/en-gb/services/container-service/
[k8s-minikube]: https://kubernetes.io/docs/getting-started-guides/minikube/
