export default [
  {
    "version": "1.2.1",
    "createdAt": 1763446954000,
    "fixes": [
      "Resolved an issue preventing default media device selection",
      "Fixed SDK bundle to include `browser.js` instead of incorrectly shipping `index.iife.js` in 1.2.0"
    ],
    "enhancements": [
      "External media devices are now prioritized over internal devices when no preferred device is set"
    ]
  },
  {
    "version": "1.2.0",
    "createdAt": 1761806564000,
    "features": [
      "Added support for configuring simulcast via: ```initMeeting({ overrides: { simulcastConfig: { disable: false, encodings: [{ scaleResolutionDownBy: 2 }] } }) }```"
    ],
    "fixes": [
      "Resolved an issue where remote participants' video feeds were not visible during grid pagination in certain edge cases.",
      "Fixed a bug preventing participants from switching microphones if the first listed microphone was non-functional."
    ],
    "breaking-changes": [
      "Legacy media engine support has been removed. If your organization was created before March 1, 2025 and you are upgrading to this SDK version or later, you may experience recording issues. Please contact support to migrate to the new Cloudflare SFU media engine to ensure continued recording functionality."
    ]
  },
  {
    "version": "1.1.7",
    "createdAt": 1756203032000,
    "fixes": [
      "Prevents speaker change events from being emitted when the active speaker does not change.",
      "Addressed a behavioral change in microphone switching on recent versions of Google Chrome.",
      "Added `deviceInfo` logs to improve debugging capabilities for React Native.",
      "Fixed an issue that queued multiple media consumers for the same peer, optimizing resource usage."
    ]
  },
  {
    "version": "1.1.6",
    "createdAt": 1755149549000,
    "enhancements": [
      "Internal changes to make debugging, of media consumption issues, easier and faster"
    ]
  },
  {
    "version": "1.1.5",
    "createdAt": 1754285720000,
    "fixes": [
      "Improved React Native support for AudioActivityReporter with proper audio sampling",
      "Resolved issue preventing users from creating polls",
      "Fixed issue where leaving a meeting took more than 20 seconds"
    ]
  },
  {
    "version": "1.1.4", 
    "createdAt": 1752726160000,
    "fixes": [
      "Livestream feature is now available to all BETA users",
      "Fixed livestream stage functionality where hosts were not consuming peer videos upon participant's stage join",
      "Resolved issues with viewer joins and leaves in livestream stage"
    ]
  },
  {
    "version": "1.1.3",
    "createdAt": 1751980688000,
    "fixes": [
      "Fixed issue where users could not enable video mid-meeting if they joined without video initially"
    ]
  },
  {
    "version": "1.1.2",
    "createdAt": 1751468859000,
    "fixes": [
      "Fixed edge case in large meetings where existing participants could not hear or see newly joined users"
    ]
  },
  {
    "version": "1.1.0-1.1.1",
    "createdAt": 1751276191000,
    "features": [
      "Added methods to toggle self tile visibility",
      "Introduced broadcast functionality across connected meetings (breakout rooms)"
    ],
    "new_api": [
      "Broadcast messages across meetings: ```meeting.participants.broadcastMessage('<message_type>', { message: 'Hi' }, { meetingIds: ['<connected_meeting_id>'] });```"
    ],
    "enhancements": [
      "Reduced time to display videos of newly joined participants when joining in bulk",
      "Added support for multiple meetings on the same page in RealtimeKit Core SDK"
    ]
  },
  {
    "version": "1.0.2",
    "createdAt": 1750149131000,
    "fixes": [
      "Enhanced error handling for media operations",
      "Fixed issue where active participants with audio/video were not appearing in the active participant list"
    ]
  },
  {
    "version": "1.0.1",
    "createdAt": 1748503604000,
    "fixes": [
      "Resolved initial setup issues with Cloudflare RealtimeKit integration",
      "Fixed meeting join and media connectivity issues",
      "Enhanced media track handling"
    ]
  },
  {
    "version": "1.0.0",
    "createdAt": 1748502820000,
    "features": [
      "Initial release of Cloudflare RealtimeKit with support for Group Calls, Webinars, Livestreaming, Polls, and Chat"
    ]
  }
]