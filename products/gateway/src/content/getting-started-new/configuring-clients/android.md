---
title: "Android"
alwaysopen: true
weight: 6
---

## <a name="before-you-start"></a> Before you start

Before you configure Cloudflare Gateway on a mobile device, install the latest version of the 1.1.1.1 app, and take note of your location's unique ID.

#### Download the 1.1.1.1 app
Make sure you have the 1.1.1.1 app installed. If you don't, you can get it from the [App Store](https://itunes.apple.com/us/app/1-1-1-1-faster-internet/id1423538627) for your iOS devices, and on the [Google Play Store](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone) for your Android devices.

If you already have the app installed, make sure it is updated to the latest version.


<Aside>

Note that if you were using 1.1.1.1 for Families in the mobile app, you will at first need to disable 1.1.1.1 for Families. You can disable it by going to `Advanced -> Connection options -> DNS Settings -> 1.1.1.1 for Families -> And select 'None'`.
</Aside>

#### Find your location's unique ID

To install Cloudflare Gateway on any mobile device you will need your location's **unique ID**. Follow these instructions on how to retrieve it:

1. Visit your teams dashboard to fetch the unique id from your location.

![Go to teams dash](../../static/go-to-teams-dashboard.png)

2. Navigate to the **Locations page** to visualize your location.
If you have more than one location set up, you will see a list of all your locations.

![Go to locations page](../../static/go-to-locations-page.png)

3. Expand the **location card** for the location you want to associate your mobile device with.

![Expand location card](../../static/expand-location-card.png)

4. Get the subdomain of the DNS over HTTPS hostname. This is your **unique ID**. In the example below, the ID is: `fix7p31bzg`.

![Get unique subdomain](../../static/unique-gateway-id.png)

5. Take note of the **unique ID**.


## Setting up Gateway

To setup Cloudflare Gateway for your personal Android device, follow the instructions for [Manual Setup](#a-manual).

To deploy Gateway to your fleet of corporate Android devices using your preferred MDM tool, follow the instructions for [MDM Setup](#a-mdm).

### <a name="a-manual"></a> Manual Setup

1. Open the 1.1.1.1 app.

2. Tap the **Menu** button.

3. Open **Settings**.

4. Tap **Advanced**.

![Click on Advanced](../../static/android-click-on-advanced.png)

5. Tap **Connection options**.

![Click on Connection options](../../static/android-click-on-connection-options.png)

6. Tap **DNS Settings**.
This will take you to the screen where you can configure Gateway for your 1.1.1.1 mobile app.

![Click on DNS Settings](../../static/android-click-on-dns-settings.png)

7. Enter the **unique ID** from Gateway.
When you are on this screen on your phone, you will need to enter the unique subdomain of the location you created for your mobile phone.

You are now connected to Cloudflare Gateway.

### <a name="a-mdm"></a> MDM Setup

1. Open the 1.1.1.1 app.

2. Go to **Menu** > **Settings** > **Advanced** > **Connection Options** > **DNS Settings**.

3. Enter your **unique ID**.

![Enter your unique ID](../../static/android-enter-unique-id.png)

4. Modify the configuration file.

Create a file named `app_restrictions.xml` in your app's `res/xml` directory with the contents below:

```xml
<?xml version="1.0" encoding="utf-8"?>
<restrictions xmlns:android="http://schemas.android.com/apk/res/android">

    <restriction
        android:key="gateway_unique_id"
        android:title="@string/gateway_unique_id"
        android:restrictionType="string"
        android:description="@string/gateway_unique_id"
        android:defaultValue="gateway_unique_id_value" />

</restrictions>
```

Open the file in a text editor and search for the id and replace the value `gateway_unique_id_value` with the unique id from the previous section.

You are now connected to Cloudflare Gateway.

Read more about using mdm on Android [here](https://developer.android.com/work/managed-configurations).