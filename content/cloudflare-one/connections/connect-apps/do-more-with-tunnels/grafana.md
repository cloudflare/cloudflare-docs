---
pcx_content_type: how-to
title: Grafana Dashboard for Tunnels
weight: 7
---
# Grafana Dashboard for Tunnels
When running a personal tunnel a metrics server is created. This metrics server can be routed to Prometheus and Grafana in order to convert the metrics into usefull analytics.
The port that metrics are sent to can be manually set.
```sh
cloudflared tunnel --metrics <service-URL>:<service-port>
```
This server is accessed through <service-URL>:<service-port>/metrics. If no port is set a random one will be chosen when the tunnel is run.
![Default Metrics Port](/cloudflare-one/static/documentation/connections/grafana/metrics-port.png)
The port is highlighted in the above image.

## Setting Up Prometheus
If Prometheus it is not already [downloaded](https://prometheus.io/download/), do so.
In the folder created when Prometheus was downloaded there is a config file "prometheus.yml". Make the following additions to the end of the config file.
```sh
# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).
 
# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093
 
# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"
 
# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'
 
    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.
 
    static_configs:
      - targets: ['localhost:9090'] ## Port that prometheus will go to
 
  ## ADD HERE
  - job_name: '<job name>' ##NAME FOR JOB
    static_configs:
      - targets: ['<service-URL>:<service-port>']  ##PORT THAT TUNNEL SENDS METRICS TOO
```
From within the Prometheus folder, start it using: 
```sh
./prometheus --config.file="prometheus.yml"
```
This can be configured to run as a service so that it does not need to be manually started if the machine reboots.
Heading to http://localhost:9090/ will show the Prometheus dashboard for this tunnel. To have the Prometheus dashboard on a different url change the replace 9090 with the desired port in the config file.

## Setting Up Grafana
If Grafana is not already [downloaded](https://grafana.com/grafana/download?edition=oss&pg=get&plcmt=selfmanaged-box1-cta1), do so.
Grafana can be started with the following command.
```sh
/usr/local/opt/grafana/bin/grafana-server --config /usr/local/etc/grafana/grafana.ini --homepath /usr/local/opt/grafana/share/grafana --packaging=brew cfg:default.paths.logs=/usr/local/var/log/grafana cfg:default.paths.data=/usr/local/var/lib/grafana cfg:default.paths.plugins=/usr/local/var/lib/grafana/plugins
```
When Grafana is installed one of the printed lines displays how to call it.
Grafana will automatically start running on http://localhost:3000. A different port can be selected by editting the server section of the grafana.ini config file. Like with Prometheus, Grafana can be configured to run as a service so that it does not need to be manually restarted if the machine reboots.

## Connecting Prometheus to Grafana
Go to the site that Grafana is listing on. In the bottom left corner of the page click on the gear and then Data Sources.
Click "Add data source" and select Prometheus from the options. Enter the url that leads to the site that shows the Prometheus dashboard.
A dashboard can now be created within Grafana to monitor tunnel metrics. Select the new data source and enter the Prometheus queries to monitor. Some simple queries to start with are "cloudflared_tunnel_request_errors" and "cloudflared_tunnel_requests". Create a new dashboard and then in the upper right corner of the page click the "Add panel" button, and "Add a new panel". Select the above metric names in the metrics drop down to populate a graph with them. 
![Grafana query](/cloudflare-one/static/documentation/connections/grafana/grafana-ops.png)
Operations can be added to the queries to modify what is displayed. For example, showing all tunnel requests to showing all tunnel requests over a recent period of time, such as a day rather than all tunnel requests since it started running.

## Other Resources
[Prometheus Querying Language](https://prometheus.io/docs/prometheus/latest/querying/basics/) - Prometheus' own page about using it querying language
[Grafana Docs](https://grafana.com/docs/)
[Grafana Tutorials](https://grafana.com/tutorials/)