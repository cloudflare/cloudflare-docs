---
order: 3
pcx-content-type: tutorial
---

# Azure Managed HSM

This tutorial uses [Microsoft Azure’s Managed HSM](https://azure.microsoft.com/en-us/updates/akv-managed-hsm-public-preview/) — a FIPS 140-2 Level 3 certified implementation — to deploy a VM with the Keyless SSL daemon.

---

## Before you start

Make sure you have:
- Followed Microsoft's [tutorial](https://docs.microsoft.com/en-us/azure/key-vault/managed-hsm/quick-create-cli) for provisioning and activating the managed HSM
- Set up a VM for your key server

---

## 1. Create a VM

Create a VM where you will deploy the keyless daemon.

---

## 2. Deploy the keyless server

Follow [these instructions](../../configuration#key-server) to deploy your keyless server.

---

## 3. Set up the Azure CLI

Set up the Azure CLI (used to access the private key).

For example, if you were using MacOS:
```
brew install azure-cli
```

---

## 4. Set up the Managed HSM

1. Log in through the Azure CLI and create a resource group for the Managed HSM in one of the supported regions:
    ```
    $ az login
    $ az group create --name HSMgroup --location southcentralus
    ```
    <Aside type="note" header="Note:">
    
    For a list of supported regions, see the <a href="https://azure.microsoft.com/en-us/global-infrastructure/services/?products=key-vault">Microsoft documentation</a>.
    
    </Aside>

1. [Create, provision, and activate](https://docs.microsoft.com/en-us/azure/key-vault/managed-hsm/quick-create-cli) the HSM.
1. Add your private key to the `keyvault`, which returns the URI you need for **Step 4**:
    ```
    $ az keyvault key import --hsm-name "KeylessHSM" --name "hsm-pub-keyless" --pem-file server.key
    ```

1. If the key server is running in an Azure VM in the same account, use **Managed services** for authorization:
    1. Enable managed services on the VM in the UI.
    1. Give your service user (associated with your VM) HSM sign permissions
    ```
    $ az keyvault role assignment create  --hsm-name KeylessHSM --assignee $(az vm identity show --name "hsmtestvm" --resource-group "HSMgroup" --query principalId -o tsv) --scope / --role "Managed HSM Crypto User"
    ```
1. In the `gokeyless` YAML file, add the URI from **Step 2** under `private_key_stores`. See our [README](https://github.com/cloudflare/gokeyless/blob/master/README.md) for an example.

## 5. Restart gokeyless

Once you save the config file, restart `gokeyless` and verify that it started successfully:
```
$ sudo systemctl restart gokeyless.service
$ sudo systemctl status gokeyless.service -l
```