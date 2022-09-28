---
pcx_content_type: reference
title: Machine Learning models
weight: 0
---

# Machine Learning Models

## Enable Auto-updates to the Machine Learning Models

Cloudflare allows Enterprise customers to enable Auto-updates to its Machine Learning models for the newest bot detection models as they are released. 

To enable Auto-updates:

1. Log in to the Cloudflare dashboard and select your account and domain.
2. Go to **Security** > **Bots**.
3. Select **Configure Bot Management**.
4. Enable the Auto-update Machine Learning Model.

{{<Aside type="note" header="Note">}}

If you enable Auto-updates for the Machine Learning model, you will be upgraded to the latest version immediately. You can toggle the button off within 24 hours to revert to the previous version. After 24 hours, you will remain on the current Machine Learning model version and will need to contact support for any changes.

{{</Aside>}}

### What will change

If you are on an older Machine Learning model, you will see a score change to requests scored by the **Machine Learning** source instantly. If you are already on the latest model, you will see changes only after a new Machine Learning model becomes the global default. 

Customers will be notified via email and dashboard prior to a new Machine Learning model becoming the global default. 

### Risks of not updating

By not updating to the latest version, you will be using a Machine Learning model no longer maintained or monitored by our engineering team. As internet traffic changes and new trends evolve, scoring accuracy by older versions may degrade.

| Version | Release Notes | Launch Date |
| ---- | ---- | ---- |
| v1 | First Machine Learning Model released.| Q1 2019 |
| v2 | Introduced dynamic inter-request features to leverage the Cloudflare network to detect new bots more accurately. <br><br>Feedback other Bot Management detection mechanisms to the machine learning model to more accurately detect bots. | Q1 2020 |
| v3 | Fixed accuracy issues under some conditions in the previous version. | Q2 2020 |
| v4 | Improved scoring for iOS devices. <br><br>Fixed scoring inaccuracy in Firefox builds.| Q1 2021 |
| v5 | Recalibrated model for the [removal of `_cfduid` cookie](https://blog.cloudflare.com/deprecating-cfduid-cookie/). <br><br> Introduced new signals to reduce false negatives. | Q2 2021 |
| v6 | Significantly improved scoring for native Android application traffic. <br><br>Improved scoring on the newest versions of Chromium browsers.| Q1 2022 |