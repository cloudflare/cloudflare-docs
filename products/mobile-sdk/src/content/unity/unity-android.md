---
title: Getting Started with Unity for Android
---

## Introduction ##

The Neumob Unity plugin implements support for using Neumob, allowing you to accelerate network requests in your Unity-Android builds.

The Neumob Unity plugin requires Unity 5.0 or newer and API 14 and up. You can find the plugin on the `Unity Asset store <http://u3d.as/nYw>`_ or you can checkout the GitHub repository `here <https://github.com/neumob/neumob-unity-android>`_.

## Installation ##

To integrate the Neumob-Android plugin:

### 1. Import plugin ###

Grab the contents of the **Plugins** folder which include the **Android** folder and 2 files **NeumobAndroid.cs** and **NeumobAndroidInit.cs**. Place these files in your **Plugins** directory which should be under the **Assets** directory of your Unity project. If you do not have a **Plugins** directory, just copy **Plugins** directory for Neumob into your **Assets** directory.

1. Create an empty GameObject

---

Create an empty GameObject (*GameObject -> Create Empty*) and add the **NeumobAndroidInit.cs** script as a component of your newly created GameObject (Select *GameObject -> Add Component -> Scripts -> NeumobAndroidInit*).

Select your newly created game object in the **Hierarchy** pane and fill in some additional informations inside the **Inspector** window.

- **Client Key** - the app ID provided by Neumob
  
Initialization is the process of modifying your application in order to communicate with Neumob. If you have created a GameObject with the above instructions then Neumob is now integrated with your Unity iOS application.

In order to turn ``ON`` Neumob for your app version you'll go to the portal's app details page where you received your client key. The **State** for the app version will be ``OFF`` and this can be changed by clicking the settings button under ``Action``, toggling the switch in the upper right corner of the following screen, and then the ``Apply`` button at the bottom.

<dl>
  <dt>.. note :  : </dt>
  <dd>Neumob takes about 2 days to learn, customize, and then accelerate you network calls.</dd>
</dl>
### 3. Verifying Initialization ###

To check that Neumob is initialized and whether an app session is being **accelerated**, you can customize the ``OnInitComplete`` method in ``NeumobAndroidInit.cs``. The method ``OnInitComplete`` is provided but you are free to pass in your own custom ``AndroidJavaRunnable`` to ``NeumobAndroid.Initialize()`` in ``Awake()`` for your GameObject. You should only fetch the initialized and accelerated parameters in runnable parameter as Neumob initialization may be asynchronous.
#### ``initialized`` returns a boolean indicating Neumob is enabled and ready  ####

<dl>
  <dt>to accelerate your network requests.</dt>
  <dd></dd>
</dl>
``accelerated`` returns a boolean indicating whether Neumob is currently accelerating your requests. You may configure whether or not Neumob is accelerated by adjusting the % accelerated slider through the portal (click the **settings** button for the app version on your app details page). If you plan to A / B test accelerated vs unaccelerated Neumob sessions, we recommend using the ``accelerated`` parameter the ``OnInitComplete`` function. Please note that ``accelerated`` is **sticky**- meaning a user who is **accelerated** will remain accelerated until the % accelerated slider value is changed.

<dl>
  <dt>The ``accelerated`` boolean value can be used to populate a property or dimension within your mobile analytics platform.</dt>
  <dd></dd>
</dl>
Here's an example of how you might verify Neumob initialization and check whether a session is accelerated.

<div dangerouslySetInnerHTML={{__html: `<dl>
  <dt>    void OnInitComplete(bool initialized, bool accelerated) </dt>
  <dd>
    <p>void OnInitComplete(bool initialized, bool accelerated)</p>
    <p>{</p>
    <p>if (initialized)</p>
    <p>{</p>
    <p>// Neumob is ON.</p>
    <p>// ex. Analytics.LogCustomDimension(Dimension.ACCELERATION, accelerated);</p>
    <p>// ...</p>
    <p>} else</p>
    <p>{</p>
    <p>// Neumob is OFF. Change log settings for more details.</p>
    <p>// ...</p>
    <p>}</p>
    <p>}</p>
  </dd>
</dl>`}}></div>

### 4. Build & Run! ###

You are now ready to build the Xcode project: Select **File -> Build Settings**... and switch to **Android** in the platform section. In **Build Settings** you'll need to select **Gradle (New)** as the **Build System**.
