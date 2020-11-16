---
order: 5
---

# IBM cloud HSM

<Aside type='note' header='Note'>

The example below was tested using <a href="https://console.bluemix.net/docs/infrastructure/hardware-security-modules/about.html#about-ibm-cloud-hsm">IBM Cloud HSM 7.0</a>, a FIPS 140-2 Level 3 certified implementation based on the Gemalto SafeNet Luna a750. It is assumed that you have already <a href="https://console.bluemix.net/docs/infrastructure/hardware-security-modules/initialize_hsm.html#initializing-the-ibm-cloud-hsm">initialized your device</a> and installed the SafeNet client software.
</Aside>

--------

## 1. Create, assign, and initialize a new partition

The first step we’ll take is creating an HSM partition, which can be thought of as an independent logical HSM within your IBM Cloud HSM device.

```txt
vm$ ssh admin@hsm

[cloudflare-hsm.softlayer.com] lunash:>partition create -partition KeylessSSL


          Type 'proceed' to create the partition, or
          'quit' to quit now.
          > proceed
'partition create' successful.


Command Result : 0 (Success)
```

Next, the partition needs to be assigned to the client, i.e., your key server.

```bash
[cloudflare-hsm.softlayer.com] lunash:>client assignpartition -client cloudflare-vm.softlayer.com -partition KeylessSSL


'client assignPartition' successful.


Command Result : 0 (Success)
```

After the partition has been assigned, run `lunacm` from your virtual server and initialize the partition.

```txt
vm$ lunacm
LunaCM v7.1.0-379. Copyright (c) 2006-2017 SafeNet.

    Available HSMs:

    Slot Id ->              0
    Label ->
    Serial Number ->        XXXXXXXXXXXXX  
    Model ->                LunaSA 7.0.0  
    Firmware Version ->     7.0.1
    Configuration ->        Luna User Partition With SO (PW) Signing With Cloning Mode
    Slot Description ->     Net Token Slot


    Current Slot Id: 0

lunacm:>partition init -label KeylessSSL -domain cloudflare

  Enter password for Partition SO: ********

  Re-enter password for Partition SO: ********

  You are about to initialize the partition.
  All contents of the partition will be destroyed.

  Are you sure you wish to continue?

  Type 'proceed' to continue, or 'quit' to quit now ->proceed

Command Result : No Error
```

--------

## 2. Generate RSA and ECDSA key pairs and certificate signing requests (CSRs)

Before running the commands below, check with your information security and/or cryptography team to confirm the approved key creation procedures for your organization.

```txt
vm$ cmu generatekeypair -keyType=RSA -modulusBits=2048 -publicExponent=65537 -sign=1 -verify=1 -labelpublic=myrsakey -labelprivate=myrsakey -keygenmech=1
Please enter password for token in slot 0 : ********

# cmu generatekeypair -keyType=ECDSA -curvetype=3 -sign=1 -verify=1 -labelpublic=myecdsakey -labelprivate=myecdsakey
Please enter password for token in slot 0 : ********

# cmu list
Please enter password for token in slot 0 : ********
handle=61   label=myecdsakey
handle=60   label=myecdsakey
handle=48   label=myrsakey
handle=45   label=myrsakey
```

Using the keys created in the previous step, generate CSRs that can be sent to a publicly trusted Certificate Authority (CA) for signing.

```txt
# cmu requestCertificate -c="US" -o="Example, Inc." -cn="ibm-cloudhsm.example.com" -s="California" -l="San Francisco" -publichandle=45 -privatehandle=48 -outputfile="rsa.csr" -sha256withrsa
Please enter password for token in slot 0 : ********
Using "CKM_SHA256_RSA_PKCS" Mechanism

# cmu requestCertificate -c="US" -o="Example, Inc." -cn="ibm-cloudhsm.example.com" -s="California" -l="San Francisco" -publichandle=60 -privatehandle=61 -outputfile="ecdsa.csr" -sha256withecdsa
Please enter password for token in slot 0 : ********
Using "CKM_ECDSA_SHA256" Mechanism
```

--------

## 3. Obtain and upload signed certificates from your Certificate Authority (CA)

Provide the CSRs created in the previous step to your organization’s preferred CA, demonstrate control of your domain as requested, and then download the signed SSL certificates. Follow the instructions provided in [Uploading “Keyless” SSL Certificates](/keyless-ssl/configuration/#uploading-keyless-ssl-certificates).

--------

## 4. Modify your gokeyless config file and restart the service

Lastly, we need to modify the configuration file that the key server will read on startup. Be sure to change the `object=mykey` and `pin-value=username:password` values to match the key label you provided and CU user you created.

Open  `/etc/keyless/gokeyless.yaml` and immediately after:

```yaml
private_key_stores:
- dir: /etc/keyless/keys
```

add:

```yaml
- uri: pkcs11:token=KeylessSSL;object=myrsakey?module-path=/usr/safenet/lunaclient/lib/libCryptoki2_64.so&pin-value=password&max-sessions=1
- uri: pkcs11:token=KeylessSSL;object=myecdsakey?module-path=/usr/safenet/lunaclient/lib/libCryptoki2_64.so&pin-value=password&max-sessions=1
```

With the config file saved, restart `gokeyless` and verify it started successfully.

```bash
$ sudo systemctl restart gokeyless.service
$ sudo systemctl status gokeyless.service -l
```