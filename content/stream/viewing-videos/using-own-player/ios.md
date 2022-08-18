---
title: iOS
weight: 2
---

# iOS

Cloudflare Stream can be used with Apple’s built-in [AVPlayer](https://developer.apple.com/documentation/avfoundation/avplayer), which is integrated into iOS and provides a variety of features by default, including but not limited to:

- Picture-in-picture
- Lock screen controls
- Gestures
- Theming
- Accessibility
- Foreground/background tasks
- Concurrency management with other device sensors and system notifications
- SwiftUI compatibility

{{<render file="_prereqs.md">}}

## Examples 

Refer to the [iOS example](/stream/examples/ios/) to view a working example of Cloudflare Stream and AVPlayer.

## Use AVPlayer and HLS

Refer to the code example below for a basic implementation of AVPlayer using Cloudflare Stream's Manifest URL.

```swift
import SwiftUI
import AVKit

struct MyView: View {
    // Set the url value to the Cloudflare Stream HLS Manifest URL:
    private let player = AVPlayer(url: URL(string: "https://customer-9cbb9x7nxdw5hb57.cloudflarestream.com/8f92fe7d2c1c0983767649e065e691fc/manifest/video.m3u8")!)

    var body: some View {
        VideoPlayer(player: player)
            .onAppear() {
                player.play()
            }
    }
}

struct MyView_Previews: PreviewProvider {
    static var previews: some View {
        MyView()
    }
}
```