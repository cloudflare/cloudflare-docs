---
title: DDoS testing guide
pcx_content_type: tutorial
weight: 2
meta:
  title: Magic Network Monitoring DDoS testing guide
updated: 2024-01-08
---

# Magic Network Monitoring DDoS testing guide

This tutorial outlines the recommended process for customers to effectively test Cloudflare’s Magic Network Monitoring (MNM) in a repeatable manner.

At a high level, customers will follow these steps:

1. Select and install a trusted and open source DDoS simulation tool.
2. Conduct a small test DDoS attack against Cloudflare’s 1.1.1.1.
3. Conduct a DDoS attack against their own network.

## Recommended DDoS tools

There are a few tools we can recommend to simulate a DDoS attack:

### MHDDoS
- Recommended for Windows users
- Download the source code: https://github.com/MatrixTM/MHDDoS
- Read the documentation: https://github.com/MatrixTM/MHDDoS/wiki

### Kali Linux & hping3
- Recommended for Linux users. This is an established cyber-security tool with a variety of use cases beyond DDoS attacks.
- Download the Linux distribution: https://www.kali.org/
- Read the Kali Linux documentation: https://www.kali.org/docs/
- Learn more about the hping3 package: https://www.kali.org/tools/hping3/

This tutorial will use the MHDDoS tool.

---

## Prerequisites

MHDDoS requires Python 3, Python 3 libraries, and Git. If you already have these tools installed, follow the [MHDDoS automatic installation guide](https://github.com/MatrixTM/MHDDoS/wiki/installation).

If you are an Enterprise customer, you also need to [open a support ticket with Cloudflare](/ddos-protection/reference/simulate-ddos-attack/) when simulating DDoS attacks against your own Internet properties.

---

## Install the tools

### 1. Install Python 3

1. Go to the [Python download page](https://www.python.org/downloads/), and download the latest version of Python.
2. Follow the recommended installation settings, and make sure to select the option **Add python.exe to PATH** to add Python to your file path.
3. Open your command prompt, and run the following command to confirm Python has been installed and added to your computer’s program path:

```bash
C:\> python --version
```

You should receive a message with the current version of Python.

### 2. Install Git

1. Go to the [Git download page](https://git-scm.com/download/win), and download the latest version of Git.
2. Follow the recommended installation settings.
3. Open a command prompt, and run the following command to confirm Git has been installed:

```bash
C:\> git --version
```

You should receive a message with the current version of Git.

### 3. Install MHDDoS

1. Go to the [installation guide](https://github.com/MatrixTM/MHDDoS/wiki/installation) for MHDDoS in the project’s GitHub repository wiki.
2. Follow the steps for either **Automatic Installation**, **DockerFile**, or **Manual Installation** depending on your preference.

{{<Aside type="note">}}The steps for **Automatic Installation** are a good default to follow unless you already have Docker set up and are familiar with it.{{</Aside>}}

### 4. Check if MHDDoS is working

The last step is to check if the MHDDoS tool is working. For that, we will simulate a small DDoS attack against 1.1.1.1.

To review all the attack options relevant in testing Magic Network Monitoring, visit the [MHDDoS README](https://github.com/MatrixTM/MHDDoS#readme), and scroll down to **Features And Method > Layer 4**. To learn how to structure the commands for starting a test attack, read the [MHDDoS Usage of Script](https://github.com/MatrixTM/MHDDoS/wiki/Usage-of-script) wiki article.

1. Open the command prompt, and navigate to the folder `MHDDoS-main`.
2. Run the following command:

```bash
C:\MHDDoS-main> python start.py udp 1.1.1.1:53 1 10 true
```

This command will simulate an UDP attack against `1.1.1.1` on port `53`. The attack will use one Python thread to generate the UDP packets, and will run for 10 seconds. The `true` statement at the end of the command will run the attack in debug mode.

The command line output should look similar to the screenshot below:

![The command line will display the results of simulating a DDoS attack on 1.1.1.1](/images/magic-network-monitoring/cmd-output.png)

Looking at the debug output, we can learn the following UDP DDoS attack statistics:
- The attack generated between 146 thousand and 164 thousand packets per second (PPS).
- The attack bandwidth ranged between 149 and 168 megabits per second (Mbps).

## Simulate a DDoS attack on your network

### 1. Enable MNM alerts

Start by [creating](/magic-network-monitoring/notifications/) a Magic Network Monitoring (MNM) Volumetric alert. This is crucial to receive MNM notifications during a DDoS attack.

### 2. Identify an IP prefix for testing

Cloudflare recommends that you simulate a DDoS attack against an IP prefix on your network that receives relatively little traffic. This way it will be easy to spot traffic from a small simulated DDoS attack.

For this tutorial, we will take into account the fictional `Example` Cloudflare account, with the `192.168.1.0/24` IP range. To identify an IP suitable for testing, you can use the MNM analytics view:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account.
2. Go to **Analytics & Logs** > **Magic Monitoring**.
3. Select **Add filter**.
4. In **New filter**, create the following rule:

  ```txt
  Source IP | equals | 192.168.1.1
  ```

This should give you an idea of the amount of traffic the IP address you chose really has. If it is suitable, create an MNM rule with that IP.

### 3. Create MNM rule for testing

Continuing from the example above, the next step is to create a rule for the prefix `192.168.1.0/24` with a low threshold. You should create one MNM rule for each `/24` prefix that you have identified as suitable for your network.

Refer to [Recommended rule configuration](/magic-network-monitoring/rules/recommended-rule-configuration/) for more information on this topic.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Go to  **Analytics & Logs** > **Magic Monitoring**.
3. Select **Configure Magic Network Monitoring**.
4. Select **Add new rule**.
5. Give it a name that is easy to find. For example, `example_192.168.1.1`.
6. In **Rule threshold type**, select **Bits per second (BPS)**.
7. In **Rule threshold**, select a number that is small enough relative to the traffic of the prefix you chose that it will be easy to find. For example, `20,000` (20 MB/s).
8. Select **Save**.

Refer to the [Rules](/magic-network-monitoring/rules/) page for more information on how to set up and edit rules.

### 4. Identify the traffic protocol, IP address, and port for testing

The next step involves analyzing data received over a few weeks. This is needed so we can have a better sense of the type of traffic received and what port we need for testing.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Go to  **Analytics & Logs** > **Magic Monitoring**.
3. Select **Add filter**.
4. In **New filter**, create the following two rules:

  ```txt
  Monitoring Rule | equals | example_192.168.1.1
  ```

  ```txt
  Protocol | equals | UDP
  ```

In our example, the fictional data for `example_192.168.1.1` over 21 days (the rule we created in [step 3](#3-create-mnm-rule-for-testing)) shows that the destination IP address `192.168.1.1` has received UDP traffic on **Destination Port** `137`. You can use this destination port for testing.

### 5. Simulate a DDoS attack to test MNM

1. Open a command prompt, and go to the folder `MHDDoS-main`.
2. Run the following command. Adapt the destination IP address to the one you found that works for your particular case:

```bash
C:\MHDDoS-main> python start.py udp 192.168.1.1:137 2 120 true
```

This command will simulate a UDP DDoS attack on `192.168.1.1:137`. The UDP attack will use two Python threads, and run for 120 seconds. Debug mode is set to `true`, which lets us observe the attack's live progress. This command should generate anywhere from 25 to 75 Mbps of attack traffic.

### 6. MNM volumetric attack alert

After performing the attack simulation, you should receive an email alert stating that MNM detected an attack.

You can also navigate to MNM analytics to observe the attack traffic:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account.
2. Go to **Analytics & Logs** > **Magic Monitoring**.
3. Select **Add filter**.
4. In **New filter**, create the following rule:

  ```txt
  Monitoring Rule | equals | example_192_168_1_1
  ```

For the filter above, you should select the name of the rule you have created in [step 3](#3-create-mnm-rule-for-testing).