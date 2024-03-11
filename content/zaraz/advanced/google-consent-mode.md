---
pcx_content_type: how-to
title: Google Consent Mode
weight: 4
---

# Google Consent Mode

## Background

[Google Consent Mode](https://developers.google.com/tag-platform/security/concepts/consent-mode) is used by Google tools to manage consent regarding the usage of private data and Personally Identifiable Information (PII). Zaraz provides automatic support for Consent Mode v2, as well as manual support for Consent Mode v1.

You can also use Google Analytics and Google Ads without cookies by selecting **Permissions** and disabling **Access client key-value store**.

---

## Consent Mode v2

Consent Mode v2 specifies a "default" consent status that is usually set when the session starts, and an "updated" status that is set when the visitor configures their consent preferences. Consent Mode v2 will turn on automatically when the correct event properties are available, meaning there is no need to change any settings in the respective tools or their actions.

### Set the default consent status

Set the default consent status with the reserved `google_consent_default` property:

```js
zaraz.set("google_consent_default",  {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied'
})
```

After the above code is executed, the consent status will be saved to `localStorage` and will be included with every subsequent Zaraz event.

### Update the consent status

After the user has provided their consent preferences you can set the new status using the reserved `google_consent_update` property. If you are using the Zaraz Consent Management Platform, you can use the [Consent Choices Updated event](/zaraz/consent-management/api/#consent-choices-updated) to know when to update the Google Consent status.

```js
zaraz.set("google_consent_update",  {
  'ad_storage': 'granted',
  'ad_user_data': 'denied',
  'ad_personalization': 'granted',
  'analytics_storage': 'denied'
})
```

All subsequent events will include the information about both the default and the updated consent status.

### Verifying

You can verify that Zaraz is processing the Consent Mode settings by enabling the [Zaraz Debugger](/zaraz/web-api/debug-mode/). Server-side requests to Google Analytics and Google Ads should include the `gcd` parameter.

## Consent Mode v1

Consent Mode v1 was deprecated by Google in November 2023, but is still supported. Integration with Zaraz is more complex than Consent Mode v2. You do not need to use Consent Mode v1 if you have implemented Consent Mode v2.

### Setting up

Configuring Consent Mode v1 is done manually for each tool. Go to the tool page and select **Settings**. Select **Add field**, and select **Consent Mode** from the drop-down menu. Then, select **Confirm**.

The value for Consent Mode must adhere to Google's defined format, which is a four-character string starting with `G1`, followed by two characters indicating consent status for Marketing and Analytics. `1` indicates consent, `0` indicates no consent, and `-` indicates no consent was required. For example, setting the value to `G111` means the user has granted consent for both Marketing and Analytics, `G101` means consent for Analytics only, and `G10-` means no consent for Marketing but no required consent for Analytics.

Since the value for Consent Mode may change per user or session, it is recommended to dynamically set this value using `zaraz.set` in your website code. For instance, use `zaraz.set("google_consent_v1", "G100")` on page load, and `zaraz.set("google_consent_v1", "G111")` after the user granted consent for Marketing and Analytics. In the **Consent Mode** field, select the **+** symbol, choose **Event Property**, and type `google_consent_v1` as the property name. Zaraz will then use the latest value of the `google_consent_v1` Event Property as the Consent Mode string.

## Supported Tools
Consent Mode v1 and v2 are both supported by Google Analytics 4 and Google Ads.