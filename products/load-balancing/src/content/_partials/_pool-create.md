You can create a pool within the [load balancer workflow](/how-to/create-load-balancer) or in the **Origin Pools** section of the dashboard:

1. Go to **Traffic** > **Load Balancing**.
1. Click **Manage Pools**.
1. Click **Create**.
1. For your pool, enter the following information:
    - A name (must be unique)
    - A description to provide more detail on the name
    - A choice for [**Origin Steering**](/understand-basics/traffic-steering/origin-level-steering), which affects how your pool routes traffic to each origin
1. For each origin, enter the following information:
    - A name (must be unique)
    - The origin server address or associated hostname
    - A [**Weight**](/understand-basics/traffic-steering/origin-level-steering#weights)
    - (Optional) A [hostname](/additional-options/override-http-host-headers) by clicking **Add host header**
1. Repeat this process for additional origins in the pool.
1. (Optional) Set up coordinates for [Proximity Steering](/understand-basics/traffic-steering/pool-level-steering#proximity-steering) on the pool.
1. On the origin pool, update the following information:
    - **Health Threshold**: Number of healthy origins for the pool as a whole to be considered *Healthy* and receive traffic based on pool order in a load balancer
    - **Monitor**: Attach a [monitor](/how-to/create-monitor)
    - **Health Check Regions**: Choose whether to check pool health from [multiple locations](/understand-basics/monitors#health-check-regions), which increases accuracy but can lead to probe traffic to your origin
    - **Notifications**: If you do or do not want to receive notifications when the pool's status changes

1. When finished, click **Save**.