You can create a pool within the [load balancer workflow](/how-to/create-load-balancer) or in the **Origin Pools** section of the dashboard:

1. Go to **Traffic** > **Load Balancing**.
1. Click **Manage Pools**.
1. Click **Create**.
1. Enter the following information for each origin:
    - A name (must be unique)
    - The origin server address or associated hostname
    - A [**Weight**](/understand-basics/weighted-load-balancing)
    - (Optional) A [hostname](/additional-options/override-http-host-headers) by clicking **Add host header**
1. Repeat this process for additional origins in the pool.
1. (Optional) Set up coordinates for [Proximity Steering](/understand-basics/traffic-steering#proximity-steering) on the pool.
1. On the origin pool, update the following information:
    - **Health Threshold**: Number of healthy origins for the pool as a whole to be considered *Healthy* and receive traffic based on pool order in a load balancer
    - **Monitor**: Attach a [monitor](/how-to/create-monitor)
    - **Notifications**: If you do or do not want to receive notifications when the pool's status changes

1. When finished, click **Save**.