---
order: 6
pcx-content-type: reference
---

# Useful commands

## Manage tunnels

* `cloudflared tunnel login`
* `cloudflared tunnel list`
* `cloudflared tunnel create <NAME or UUID>`
* `cloudflared tunnel route`
    * `cloudflared tunnel route lb`
    * `cloudflared tunnel route ip`
        * `cloudflared tunnel route ip add`
        * `cloudflared tunnel route ip show` (or `list`)
        * `cloudflared tunnel route ip delete`
        * `cloudflared tunnel route ip get`
    * `cloudflared tunnel route dns`
        * `cloudflared tunnel route overwrite-dns`
* `cloudflared tunnel run`
    *  `cloudflared tunnel run--config path/config.yaml run <NAME / UUID>`
* `cloudflared tunnel info`
* `cloudflared tunnel cleanup`
* `cloudflared tunnel delete`

## Manage `cloudflared`

<TableWrap>

| Command | Description |
| ------- | ----------- |
| `cloudflared update` | Launches an update for `cloudflared`. This command only works if `cloudflared` was installed from GitHub binaries or from source. If you installed `cloudflared` with a package manager, you must update it using the same method. |
| `cloudflared version` | Prints the `cloudflared` version number and build date. |
| `cloudflared help` | Shows help text. |

</TableWrap>

## Manage Access

* `cloudflared access tcp`
* `cloudflared access rdp`
* `cloudflared access ssh`
* `cloudflared access smb`
* `cloudflared access login`
* `cloudflared access curl`
* `cloudflared access token`
* `cloudflared ssh-config`
* `cloudflared ssh-gen`
