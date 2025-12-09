export default [
	{
		version: "1.0.7",
		createdAt: 1763446954000,
		fixes: [
			"Fixed alignment issues with unread chat message count, unread polls count, and pending participant stage request count",
			"Resolved issue where action toggles were incorrectly displayed in participant video preview, in settings component",
		],
	},
	{
		version: "1.0.6",
		createdAt: 1761806564000,
		fixes: [
			"Fixed an issue where rtk-debugger displayed audio/video bitrate as 0.",
			"Resolved menu visibility for the last participant when the participants list is long.",
			"Fixed rtk-polls not rendering when props were provided after initial mount.",
			"Improved rtk-participant-tile audio visualizer appearance when muted (no longer shows as a single dot).",
			"Prevented large notifications from overflowing their container.",
			"Fixed a memory leak in the mediaConnectionUpdate event listener.",
			"Corrected rtk-ui-provider prop passing to children during consecutive meetings on the same page.",
		],
	},
	{
		version: "1.0.5",
		createdAt: 1755149549000,
		fixes: [
			"Fixed Safari CSS issues, where Settings component `rtk-settings` was not visible and Audio Playback Modal was not taking proper height",
		],
		enhancements: ["Livestream viewer now has a seeker and DVR functionality"],
	},
	{
		version: "1.0.4",
		createdAt: 1752726160000,
		fixes: ["Fixed Angular integration issues"],
		enhancements: [
			"Added support for multiple meetings on the same page in RealtimeKit",
			"Enhanced `rtk-ui-provider` component to serve as a parent component for sharing common props (meeting, config, iconPack) with all child components",
		],
	},
	{
		version: "1.0.3",
		createdAt: 1751980688000,
		fixes: [
			"Resolved TypeError that occurred for meetings without titles",
			"Implemented minor UI improvements for Chat components",
		],
		features: ["Made Livestream feature available to all BETA users"],
	},
	{
		version: "1.0.2",
		createdAt: 1751468859000,
		perf: [
			"Fixed dependency issues to enhance performance and Angular integration",
		],
	},
	{
		version: "1.0.1",
		createdAt: 1751277887000,
		dep_api: ["Discontinued Vue UI support"],
	},
	{
		version: "1.0.0",
		createdAt: 1748502820000,
		features: [
			"Initial release of Cloudflare RealtimeKit with support for Group Calls, Webinars, Livestreaming, Polls, and Chat",
		],
	},
];
