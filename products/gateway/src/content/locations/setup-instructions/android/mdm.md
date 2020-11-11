---
order: 2
---

# Android Setup Instructions (MDM)

<Aside>

Note that if you were using 1.1.1.1 for Families in the mobile app, you will at first need to disable 1.1.1.1 for Families.

You can disable it by going to `Advanced -> Connection options -> DNS Settings -> 1.1.1.1 for Families -> And select 'None'`.
</Aside>

You can deploy Gateway to your corporate Android devices in bulk. Use an MDM solution to deploy your Gateway configuration to all corporate devices. If you want to learn how to use Gateway on your personal Android device please use the setup instructions from [this page](../manual/) instead.

## Unique Gateway Id
When you are on this screen on your phone, you will need to enter the unique subdomain of the location you created for your mobile phone.

1. Visit your teams dashboard to fetch the unique id from your location.
![Go to teams dash](../../../static/go-to-teams-dashboard.png)

2. Go to locations page to see the list of locations
![Go to locations page](../../../static/go-to-locations-page.png)

3. Expand the location card for the location you want to associate your mobile device with. If you have only one location, expand that location card.
![Expand location card](../../../static/expand-location-card.png)

4. Get the subdomain of the DNS over HTTPS hostname. This is your unique id. In the example below, this id is: fix7p31bzg.
![Get unique subdomain](../../../static/unique-gateway-id.png)

## Modify configuration file

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

You can read more about using mdm on Android [here](https://developer.android.com/work/managed-configurations).


After you save the file, use your preferred MDM tool to deploy the configuration change to your fleet of corporate mobile devices.

If 1.1.1.1 DNS, WARP or WARP+ was already enabled, the 1.1.1.1 app should be using Gateway now.