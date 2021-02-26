---
order: 2
---

# Global rules

Cloudflare for Teams applies a set of **global rules** to all accounts.

<TableWrap>

| Criteria | Value | Action | Description |
| -------- | ------ | ----------- | ------ |
| Hostname | `*.cloudflareclient.com` | bypass | `engage.cloudflareclient.com` is used by client for registration |
| Hostname | `*.assets.browser.run` | bypass | Do not inspect `assets.browser.run` or `*.assets.browser.run` |
| Hostname | `*.cloudflare-gateway.com` | bypass | Ensure we bypass requests to `cloudflare-gateway.com` DNS endpoint |
| Hostname | `*.cloudflarestatus.com` | bypass | Bypass `cloudflarestatus.com` so customers can reach the page in case of Gateway outage |
| Hostname | `*.net.cloudflare.com` | bypass | Bypass `*.nel.cloudflarestatus.com` for Cloudflare's network error logging feature |
| Hostname | `client.wns.windows.com` | bypass | Temp cert pinning global bypass |
| Hostname | `api.apple-cloudkit.com` | bypass | Temp cert pinning global bypass |
| Hostname | `gateway.icloud.com` | bypass | Temp cert pinning global bypass |
| Hostname | `*.edge.browser.run` | isolate | Anything bound for `*.edge.browser.run` needs to go the isolation browser |
| Hostname | `help.teams.cloudflare.com` | allow | Teams client will use this to check if Gateway is on by inspecting cert. Also will check if certificate is properly installed on client machine  | 
| Request Header | `Accept: text/html` | noisolate | Browsers issue an `Accept:` header that begins with `text/html`. Do not isolate if we don't see such a header because this is not a browser |

</TableWrap>


## Hostnames incompatible with decryption

<TableWrap>

| appName | hostnames |
| ------- | --------- | 
| **Cloudflare Services** | `apt-access.cfdata.org` |
| | `git.cfdata.org` |
| | `login.argotunnel.com` |
| **Apple** | `mzstatic.com` |
| | `icloud.com` |
| | `idmsa.apple.com` |
| | `ls.apple.com` |
| | `api.music.apple.com` |
| | `smp-device.apple.com` |
| | `courier.push.apple.com` |
| | `courier.sandbox.push.apple.com` |
| | `itunes.apple.com` |
| | `gc.apple.com` |
| | `ess.apple.com` |
| | `gsa.apple.com` |
| | `gsas.apple.com` |
| | `apps.apple.com` |
| | `gs-loc.apple.com` |
| | `securemetrics.apple.com` |
| | `swscan.apple.com` |
| | `xp.apple.com` |
| | `ppq.apple.com` |
| | `mail.me.com` |
| | `apple.com.akadns.net` |
| | `icloud.com.akadns.net` |
| **Android** | `gvt1.com` |
| | `gvt2.com` |
| | `googleapis.com` |
| | `googleusercontent.com` |
| | `ggpht.com` |
| | `android.clients.google.com` |
| | `play.googlezip.net` |
| | `connectivitycheck.gstatic.com` |
| **Signal** | `whispersystems.org` |
| | `signal.org` |
| **Zoom** | `zoom.us` |
| | `zoomgov.com` |
| **Wells Fargo** | `wellsfargo.com` |
| **USAA** | `usaa.com` |
| **Google Drive**| `clients.google.com` |
| | `googleapis.com` |
| | `accounts.gstatic.com` |
| | `accounts.google.com` |
| | `accounts.youtube.com` |
| | `client3.google.com` |
| | `clients1.google.com` |
| | `clients2.google.com` |
| | `clients3.google.com` |
| | `clients4.google.com` |
| | `clients5.google.com` |
| | `clients6.google.com` |
| | `connectivitycheck.gstatic.com` |
| | `cros-omahaproxy.appspot.com` |
| | `omahaproxy.appspot.com` |
| | `dl-ssl.google.com` |
| | `dl.google.com` |
| | `m.google.com` |
| | `safebrowsing-cache.google.com` |
| | `safebrowsing.google.com` |
| | `ssl.gstatic.com` |
| | `tools.google.com` |
| | `pack.google.com` |
| | `www.gstatic.com` |
| **Google Play Store** | `gvt1.com` |
| | `gvt2.com ` |
| | `vzw.com` |
| | `ggpht.com` |
| | `play.googleapis.com` |
| | `googleapis.com` |
| | `googleusercontent.com` |
| | `google-analytics.com` |
| | `googlesyndication.com` |
| | `doubleclick.net` |
| | `connectivitycheck.gstatic.com` |
| **Snap Chat** | `app.snapchat.com` |
| | `api.snapchat.com` |
| | `snapchat.com` |
| | `chat.snapchat.com` |
| | `cf-st.sc-cdn.net` |
| **Microsoft** | `eus-streaming-video-msn-com.akamaized.net` |
| | `wns.windows.com` |
| | `live.com` |
| | `clientconfig.passport.net` |
| | `wustat.windows.com` |
| | `windowsupdate.com` |
| | `msftncsi.com` |
| | `microsoft.com` |
| | `oaspapps.com.akadns.net` |
| **Python Pip** | `pythonhosted.org` |
| | `pypi.org` |
| **Debian apt** | `deb.debian.org` |
| **WhatsApp** | `whatsapp.net` |
| | `whatsapp.com` |
| **GoTo Meeting** | `gotomeeting.com` |
| | `live.citrixonline.com` |
| | `las.citrixonline.com` |
| | `sjc.citrixonline.com` |
| | `ord.citrixonline.com` |
| | `iad.citrixonline.com` |
| | `authentication.citrixonline.com` |
| | `osdimg.com` |
| | `ams.citrixonline.com` |
| | `g2m.egw.citrixonline.com` |
| | `servers.citrixonline.com` |
| | `g2ac.egw.citrixonline.com` |
| | `fra.citrixonline.com` |
| | `atl.citrixonline.com` |
| | `las2b.citrixonline.com` |
| | `launch.gotowebinar.com` |
| **Mozilla** | `mozilla.org` |
| **LogMeIn** | `logmein.com` |
| | `secure.logmeinrescue.com` |
| **UbuntuOne** | `one.ubuntu.com` |
| **AWS** | `portal.aws.amazon.com` |
| | `connectivity.amazonworkspaces.com` |
| | `console.aws.amazon.com` |
| **Bitdefender** | `bitdefender.com` |
| | `bitdefender.net` |
| **Vagrant Cloud** | `vagrantcloud.com` |
| **Silent Circle** | `silentcircle.com` |
| | `silentcircle.net` |
| **Adobe EchoSign** | `ecure.echosign.com` |
| **Cryptocat** | `crypto.cat` |
| **Periscope** | `periscope.tv` |
| **Tesla Car App** | `owner-api.teslamotors.com` |
| **DocHub** | `dochub.com` |
| **Webroot** | `webrootcloudav.com` |
| | `cloud.webroot.com` |
| **Discord** | `discordapp.com` |
| **Wire** | `wire.com` |
| | `xhoot.com` |
| **SurveyMonkey** | `mobile.surveymonkey.com` |
| | `logentries.com` |
| **Amazon Alexa**| `latinum.amazon.com` |
| **Amazon Echo** | `pindorama.amazon.com` |
| **Nest** | `home.nest.com` |
| | `production.nest.com` |
| **Sonos** | `sonos.com` |
| | `ws.sonos.com` |
| **Samsung** | `samsungcloudsolution.com` |
| **PayPal** | `api-m.paypal.com` |
| **Keybase** | `keybase.io` |
| **Verizon Wireless** | `vzw.com` |
| **Webex** | `wbx2.com` |
| | `ciscospark.com` |
| | `webex.com` |
| | `cisco.com` |
| | `webexcontent.com` |
| | `accompany.com` |
| | `afebrowsing.googleapis.com` |
| | `speech-services-manager-a.wbx2.com` |
| | `texttospeech.googleapis.com` |
| | `speech.googleapis.com` |

</TableWrap>