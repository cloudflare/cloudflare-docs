---
order: 3
hidden: true
---

# Kubernetes Sidecar model

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

<Aside>

Running Argo Tunnel in a sidecar model is meant as an
alternative to the Argo Tunnel Ingress Controller. The two should not be used
simultaneously.
</Aside>

## Sidecar model background
A Kubernetes [pod](https://kubernetes.io/docs/concepts/workloads/pods/pod/) consists of
one or more containers that share storage and network. Pods are defined by a
configuration file that determines the deployment of the containers, typically
in a YAML file.

Containers within a pod share an IP address space and can address each other over
localhost. Argo Tunnel can be run as a sidecar in a pod - a separate container
that performs its own function distinct from the application container.

In this model, the Argo Tunnel daemon, `cloudflared`, runs in its own container
and connects to the Cloudflare network to proxy requests for an associated
hostname. The `cloudflared` container will then send those requests to port
8080 on the application container over the common localhost in the Pod using the
shared IP address space.

## `cloudflared` Docker image
Cloudflare publishes an official Docker image of `cloudflared` available on [DockerHub](https://hub.docker.com/r/cloudflare/cloudflared).

Alternatively, you can build your own image.`cloudflared` is written in Go and can be built
in a Docker container by generating a Dockerfile that defines the Go
version, the working directory, and the steps to run and install the application.

Once built, the image will need to be pushed to a container registry that the
Kubernetes cluster can reach (whether a private registry or a public one like Docker Hub or Google Container Registry).

## Secret generation
Even though Kubernetes will grab the `cloudflared` image from a container
registry, the sidecar model still needs a mechanism for authentication.
Argo Tunnel authenticates machines to a hostname using a certificate
downloaded on the origin when the user logs in to their Cloudflare
account.

Before deploying to a cluster, that certificate must be converted into a
Kubernetes secret. A Kubernetes secret is an object that Kubernetes can securely use to
configure the pod while reducing the risk of exposure of sensitive data.

In a development environment, download `cloudflared` and follow the steps
to authenticate the tool with the corresponding Cloudflare account.
Identify the path where the certificate was downloaded and convert it
into a Kubernetes secret with the following command:

```sh
$ kubectl create secret generic example.com --from-file="$HOME/.cloudflared/cert.pem"
```

Ensure the secret was generated successfully with the following command:

```sh
$ kubectl get secret
```

The output will list the secret and its details in the following format

```txt
NAME                TYPE         DATA AGE
----                ----         ---- ---
example.com         opaque       3    42s
```

## Pod configuration
Kubernetes can use YAML files to configure the settings for the
deployment of a Pod to a given cluster. In the sidecar model,
`cloudflared` must be defined as a "kind: Deployment" section. The
configuration file must include the arguments used to start Argo Tunnel,
as well as the reference to the generated secret.

Additionally, you will need to use the flag `--no-auto-update` to ensure that the
`cloudflared` update process does not cause the container to crash on launch. In
some cases, the auto-update flow can cause the container to launch a new process
as PID 1, which causes the container to crash.

```yaml
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: hello
  name: hello
spec:
  ports:
  - name: http
    port: 8080
    protocol: TCP
    targetPort:
// targetPort defaults to the port configured above if left blank.
  selector:
    app: hello
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app: hello
  name: hello
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hello
  template:
    metadata:
      labels:
        app: hello
    spec:
      containers:
      - name: hello
        image: gcr.io/google-samples/gb-frontend:v4
        imagePullPolicy: Always
        env:
        - name: NODE_NAME
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        ports:
        - containerPort: 8080
        resources:
          limits:
            cpu: 100m
            memory: 40Mi
          requests:
            cpu: 20m
            memory: 40Mi
      - name: tunnel
        image: docker.io/cloudflare/cloudflared:2020.7.1
        imagePullPolicy: Always
        command: ["cloudflared", "tunnel"]
        args:
        - --url=http://127.0.0.1:8080
        - --hostname=hello.example.com
        - --origincert=/etc/cloudflared/cert.pem
        - --no-autoupdate
        env:
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        resources:
          limits:
            cpu: 10m
            memory: 20Mi
          requests:
            cpu: 10m
            memory: 20Mi
        volumeMounts:
        - mountPath: /etc/cloudflared
          name: tunnel-secret
          readOnly: true
      terminationGracePeriodSeconds: 60
      volumes:
      - name: tunnel-secret
        secret:
          secretName: example.com
---
```

The example file above defines the deployment of "hello" as both a
container and a service that will serve requests on port 8080. Below those
definitions, the file sets arguments for `cloudflared`
`--url` specifies the destination of proxied requests
`--hostname` specifies the DNS hostname exposed to the public internet

## Troubleshooting

### Did `cloudflared` run?

```sh
$ kubectl logs -lapp=hello -c tunnel
```

Returns logs from the cluster in the container, tunnel, where `cloudflared` is running as a sidecar.

### Did the cluster's deployment fail?

```sh
$ kubectl describe po -lapp=hello
```

Returns information about the pod running the containers.
Errors related to the failure to start the `cloudflared` process can be
gathered with this command.
