---
_build:
  publishResources: false
  render: never
  list: never
---

When a video transitions from a live stream to the live stream's recording, users may encounter one of the following scenarios:

- If a live stream transitions to the live stream's recording while a user is viewing the video, playback is temporarily interrupted. To fix the issue, reload the player and try viewing the video again.
- If a viewer tries to load a video within ~60 seconds of the transition from the live stream to the live stream recording, the viewer may experience issues with playback. To fix the issue, wait at least 60 seconds for the live stream to transition to the record. 

During the transition from live stream to recording, the video may report as `not-found` or `not-started`, and playback for users will be interrupted when the live stream ends.
