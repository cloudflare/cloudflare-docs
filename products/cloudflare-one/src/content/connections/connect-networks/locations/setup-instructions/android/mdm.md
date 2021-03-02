---
order: 2
---

# Android (MDM)

<Aside>

Note that if you were using 1.1.1.1 for Families in the mobile app, you will at first need to disable 1.1.1.1 for Families.

You can disable it by going to `Advanced -> Connection options -> DNS Settings -> 1.1.1.1 for Families -> 'None'` in your 1.1.1.1 app.
</Aside>

You can deploy Gateway to your corporate Android devices in bulk. Use an MDM solution to deploy your Gateway configuration to all corporate devices. If you want to learn how to use Gateway on your personal Android device please use the setup instructions from [this page](../manual/) instead.

1. Create a file named `app_restrictions.xml` in your app's `res/xml` directory with the contents below:

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

1. Open the file in a text editor and search for the id and replace the value `gateway_unique_id_value` with the unique id from the previous section.

 You can read more about using mdm on Android [here](https://developer.android.com/work/managed-configurations).

1. Save the file.
1. Use your preferred MDM tool to deploy the configuration change to your fleet of corporate mobile devices.

If 1.1.1.1 DNS, WARP or WARP+ was already enabled, the 1.1.1.1 app should be using Gateway now.