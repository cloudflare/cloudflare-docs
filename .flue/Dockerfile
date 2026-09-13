FROM docker.io/cloudflare/sandbox:0.12.9
RUN apt-get update && apt-get install -y --no-install-recommends python3 && apt-get clean
# Only the trusted Git reader uses a shell; no interpreter pools are needed.
ENV JAVASCRIPT_POOL_MIN_SIZE=0 TYPESCRIPT_POOL_MIN_SIZE=0

# Only this trusted program is executed. Pull request files are never run.
COPY bin/snapshot.py /opt/docs-review/snapshot.py
