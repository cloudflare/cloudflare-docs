---
_build:
  publishResources: false
  render: never
  list: never
---

3. From the **Tunnels** tab, click **Create**.
4. On the **Add tunnels** page, choose either a **GRE tunnel** or **IPsec tunnel**.
<details>
<summary>GRE tunnel</summary>
<div class="special-class" markdown="1">

1. On the **Add GRE tunnels** page, fill out the information for your GRE tunnel. 
2. _(Optional)_ We recommend you test your tunnel before officially adding it. To test the tunnel, click **Test tunnels.**
3. To add multiple tunnels, click **Add GRE tunnel** for each new tunnel.
4. After adding your tunnel information, click **Add tunnels** to save your changes.

</div>
</details>

<details>
<summary>IPsec tunnel</summary>
<div class="special-class" markdown="1">

1. On the **Add IPsec tunnels** page, fill out the information for your IPsec tunnel. 
2. _(Optional)_ We recommend you test your tunnel before officially adding it. To test the tunnel, click **Test tunnels.**

{{<Aside type="note" header="Note:">}}

Tunnels are only functional when a PSK is added. If you choose to have Cloudflare generate a PSK for you, all existing sessions will be terminated until the key is generated. 

{{</Aside>}}

3. To add multiple tunnels, click **Add IPsec tunnel** for each new tunnel.
4. After adding your tunnel information, click **Add tunnels** to save your changes.

</div>
</details>

### Edit tunnels

1. From **Tunnels**, locate the tunnel you want to modify and click **Edit**. To edit multiple tunnels, select the checkboxes for each tunnel and then click **Edit selected tunnels**.
2. On the **Edit tunnels** page, fill out the fields you want to modify.
3. _(Optional)_ We recommend you test your tunnel before officially adding it. To test the tunnel, click **Test tunnels**.
4. After adding your information, click **Edit tunnels** to save your changes.

Note that you cannot edit the Cloudflare endpoint associated with your tunnel.

### Delete tunnels

1.  From **Tunnels**, locate the tunnel you want to modify and click **Delete**.
2.  Confirm the action by selecting the checkbox and clicking **Delete**.

