---
order: 110
---

# Exposing Docker Containers

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

<Aside>

Argo Tunnel support for Docker is in Beta.
</Aside>

You can use Argo Tunnel to expose applications running in Docker containers through Cloudflare's
edge, just like any other origin. Since this requires running 2 services in one container (your
origin + cloudflared), you'll have to install [Supervisord](http://supervisord.org), a Unix process
manager which will control the services running in the container. Supervisord uses a config file to
define which processes to run on start, and provides various options to configure each process such
as auto-restarting on crashes.

Running 2 services in one container is generally not the advisable strategy in this situation - in a
perfect world, using `docker-compose` to create a dual container setup is the recommended strategy whenever 2
separate services are involved. However, there are some situations in which having everything in
one container is preferred.

# Getting Started

In this example, we'll create a Docker container which exposes a simple Flask application through Argo Tunnels. We'll start our Dockerfile with the following:

```docker
FROM debian
RUN apt-get -yqq update
COPY . /opt/flaskapp
WORKDIR /opt/flaskapp
```

This will create a Debian image, update the package repo, and copy our files to a working
directory. Now, add the instructions to install Supervisord in your Dockerfile:

```docker
RUN apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
RUN mkdir -p /etc/supervisor/conf.d/
COPY supervisord.conf /etc/supervisord.conf
```

This will also create the appropriate directories for Supervisord, and copy the config file into the correct location. Now, add the following to install `cloudflared` in the Docker image:

```docker
RUN apt-get install -y wget
RUN wget -O- https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-amd64.tgz | tar xz
RUN mkdir -p /etc/cloudflared/
COPY cert.pem /etc/cloudflared/
COPY config.yaml /etc/cloudflared/
```

Note that you will need a `config.yaml` and a `cert.pem` for `cloudflared` in the directory that you are working in. The instructions on how to install cloudflared and generate a certificate can be found [here](/quickstart/). For more info on how to setup a `cloudflared` config, see the [configuration
page](/reference/config/).

Now, we'll install Python and it's dependencies for our example app. This step may be different for
you depending on the application you want to expose securely with Argo Tunnel.

```docker
RUN apt-get -yqq install python3 python3-pip
RUN pip3 install flask
```

And the entrypoint into our container will be starting Supervisord:

```docker
CMD ["/usr/bin/supervisord"]
```

For the purposes of this example, create a Python file `server.py` :

```python
from flask import Flask

app = Flask(__name__)

@app.route('/') def hello_world(): return "Hello, World!"

if __name__ == '__main__': app.run() ```
  app.run()
```

# Configuring Supervisord

Supervisord uses a config file, `supervisord.conf`, to configure options for each service it
manages. Create `supervisord.conf` and add the following:

```
[supervisord]
nodaemon = true

[program: cloudflared]
command=/opt/flaskapp/cloudflared
autostart=true
autorestart=true
startretries=3
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0

[program: flask]
command=/usr/bin/python3.5 /opt/flaskapp/server.py
autostart=true
autorestart=true
startretries=3
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
```

This defines 2 services (`cloudflared` and Flask) and configures some options for them like
autorestarting and logging to `stdout`. And that's it! This is what the full Dockerfile should look
like:

```docker
FROM debian

RUN apt-get -yqq update C
OPY . /opt/flaskapp
WORKDIR /opt/flaskapp

# Supervisord

RUN apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
RUN mkdir -p /etc/supervisor/conf.d/
COPY supervisord.conf /etc/supervisord.conf

# Cloudflared

RUN apt-get install -y wget
RUN wget -O- https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-amd64.tgz | tar xz
RUN mkdir -p /etc/cloudflared/
COPY cert.pem /etc/cloudflared/
COPY config.yaml /etc/cloudflared/

# Python and Flask

RUN apt-get -yqq install python3 python3-pip
RUN pip3 install flask

# Main

CMD ["/usr/bin/supervisord"]
```

You should be able to build and run the container, and have `cloudflared` create a tunnel from inside
your container as defined in the `config.yaml`.
