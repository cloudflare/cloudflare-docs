---
order: 20
---

# Wi-Fi

Wi-Fi is radio signal transmitted over the air that your phone can intercept and encode because it contains a network interface card that specializes in doing this translation. The network interface card also helps identify the device to the router because it establishes and contains the MAC address. In some systems (like in gogo inflight wifi), MAC addresses are used as sources of truth to identify a device, but MAC addresses are just a configuration value and easy to spoof, so newer systems do not use that for identity.

The radio transmission signal comes from your router.

![radio-signal](../static/radio.jpg)

The reason why some parts of your home have better wifi signal than others is that wifi signal doesn’t travel well through walls. There are two radio bands that are allocated for wifi: 2.4 GHz and 5 GHz.
If you have both at home, you may have noticed that the 5 GHz band provides slightly faster connection. There are 4 reasons for this:

  * First, 5 GHz is literally a faster (higher) frequency. And because of the frequency, 5 GHz is better at going through walls.
  * Second, because 5 GHz is newer, fewer routers support it and there is less congestion in a crowded place like an apartment building.
  * Third, before the 2.4 GHz band was allocated to wifi, many appliances such as microwaves used that band, so if you have an older microwave at home, you may have noticed you cannot use the wifi and the microwave at the same time.
  * Finally, the 2.4 GHz band has 14 channels and the 5 GHz band has more, which helps with congestion.

The set of protocols that determine how messages are encoded in radio frequencies are called 802.11. When your device reaches a location where there are available wifi networks, it needs to decide if it can connect to any of those networks. The networks (via the routers) broadcast beacons that advertise their existence. A network has 2 identifiers that it always broadcasts: its human readable name (called the ssid) and its MAC address (called the bssid). The device recognizes the name of SSIDs that it has previously connected to and tries to reconnect with them using the same username and password (if there is one) it used last time. That’s why your phone keeps trying to connect to Boingo Hotspots. Your device may also be broadcasting probes that share all the networks it has previously connected to. An attacker listening to these probes may adopt the ssid of a network you have previously connected to which will cause your device to try to connect.

If the phone does not recognize any of the networks, you can still ask it to connect to a specific network. Once you select which network you would like to connect to, your device usually asks you whether the network is WEP, WPA or WPA2. This is because the device needs to know what authentication method to use. WPA2 is generally more secure than the others but all of these standards are susceptible to brute force attacks on the wifi password where attackers guess every possible combination of letters and characters. The solution will be WPA3, which protects that with a fancy handshake called simultaneous authentication of equals which uses key exchange alongside a password to create a shared secret that cannot easily be brute forced.
