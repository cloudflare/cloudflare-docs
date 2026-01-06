import { useState, useMemo } from "react";
import RTKUIComponent from "../RTKUIComponent/RTKUIComponent";

import rtkAvatar from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-avatar.svg";
import rtkAudioVisualizer from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-audio-visualizer.svg";
import rtkButton from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-button.svg";
import rtkClock from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-clock.svg";
import rtkHeader from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-header.svg";
import rtkLogo from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-logo.svg";
import rtkMeetingTitle from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-meeting-title.svg";
import rtkRecordingIndicator from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-recording-indicator.svg";
import rtkSpinner from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-spinner.svg";
import rtkSwitch from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-switch.svg";
import rtkTooltip from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-tooltip.svg";

import rtkControlbar from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-controlbar.svg";
import rtkControlbarButton from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-controlbar-button.svg";
import rtkDialog from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-dialog.svg";
import rtkEmojiPicker from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-emoji-picker.svg";
import rtkGridPagination from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-grid-pagination.svg";
import rtkMenu from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-menu.svg";
import rtkNameTag from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-name-tag.svg";
import rtkNotification from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-notification.svg";
import rtkParticipantCount from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-participant-count.svg";
import rtkParticipantTile from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-participant-tile.svg";
import rtkPluginMain from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-plugin-main.svg";

import rtkChat from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-chat.svg";
import rtkGrid from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-grid.svg";
import rtkImageViewer from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-image-viewer.svg";
import rtkLeaveMeeting from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-leave-meeting.svg";
import rtkMixedGrid from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-mixed-grid.svg";
import rtkParticipants from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-participants.svg";
import rtkParticipantsAudio from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-participants-audio.svg";
import rtkPlugins from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-plugins.svg";
import rtkPolls from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-polls.svg";
import rtkScreenshareView from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-screenshare-view.svg";
import rtkSettings from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-settings.svg";
import rtkSettingsAudio from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-settings-audio.svg";
import rtkSettingsVideo from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-settings-video.svg";
import rtkSidebar from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-sidebar.svg";
import rtkSimpleGrid from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-simple-grid.svg";
import rtkSpotlightGrid from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-spotlight-grid.svg";

import rtkEndedScreen from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-ended-screen.svg";
import rtkIdleScreen from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-idle-screen.svg";
import rtkMeeting from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-meeting.svg";
import rtkSetupScreen from "../../../assets/images/realtime/realtimekit/web/components-gallery/rtk-setup-screen.svg";

const RTKUIComponentGrid = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const basicComponents = [
		{
			id: "rtk-avatar",
			name: "Avatar",
			imagePath: rtkAvatar.src,
			componentName: "rtk-avatar",
			tags: ["participant", "tile", "grid"],
		},
		{
			id: "rtk-audio-visualizer",
			name: "Audio Visualizer",
			imagePath: rtkAudioVisualizer.src,
			componentName: "rtk-audio-visualizer",
			tags: ["participant", "audio", "visualizer", "grid"],
		},
		{
			id: "rtk-button",
			name: "Button",
			imagePath: rtkButton.src,
			componentName: "rtk-button",
			tags: ["button", "controlbar", "controlbar-button"],
		},
		{
			id: "rtk-clock",
			name: "Clock",
			imagePath: rtkClock.src,
			componentName: "rtk-clock",
			tags: ["clock", "header", "sidebar"],
		},
		{
			id: "rtk-header",
			name: "Header",
			imagePath: rtkHeader.src,
			componentName: "rtk-header",
			tags: ["header", "sidebar"],
		},
		{
			id: "rtk-logo",
			name: "Logo",
			imagePath: rtkLogo.src,
			componentName: "rtk-logo",
			tags: ["logo", "header", "sidebar"],
		},
		{
			id: "rtk-meeting-title",
			name: "Meeting Title",
			imagePath: rtkMeetingTitle.src,
			componentName: "rtk-meeting-title",
			tags: ["meeting-title", "header", "sidebar"],
		},
		{
			id: "rtk-recording-indicator",
			name: "Recording Indicator",
			imagePath: rtkRecordingIndicator.src,
			componentName: "rtk-recording-indicator",
			tags: ["recording", "indicator", "header", "sidebar", "controlbar"],
		},
		{
			id: "rtk-spinner",
			name: "Spinner",
			imagePath: rtkSpinner.src,
			componentName: "rtk-spinner",
			tags: ["spinner", "controlbar", "controlbar-button"],
		},
		{
			id: "rtk-switch",
			name: "Switch",
			imagePath: rtkSwitch.src,
			componentName: "rtk-switch",
			tags: ["switch", "controlbar", "button"],
		},
		{
			id: "rtk-tooltip",
			name: "Tooltip",
			imagePath: rtkTooltip.src,
			componentName: "rtk-tooltip",
			tags: ["tooltip", "controlbar", "button"],
		},
	];
	const uiComponents = [
		{
			id: "rtk-controlbar",
			name: "Control Bar",
			imagePath: rtkControlbar.src,
			componentName: "rtk-controlbar",
			tags: ["controlbar", "button"],
		},
		{
			id: "rtk-controlbar-button",
			name: "Control Bar Button",
			imagePath: rtkControlbarButton.src,
			componentName: "rtk-controlbar-button",
			tags: ["controlbar", "button"],
		},
		{
			id: "rtk-dialog",
			name: "Dialog",
			imagePath: rtkDialog.src,
			componentName: "rtk-dialog",
			tags: ["dialog", "modal", "popup"],
		},
		{
			id: "rtk-emoji-picker",
			name: "Emoji Picker",
			imagePath: rtkEmojiPicker.src,
			componentName: "rtk-emoji-picker",
			tags: ["emoji-picker", "sidebar", "chat", "message"],
		},
		{
			id: "rtk-grid-pagination",
			name: "Grid Pagination",
			imagePath: rtkGridPagination.src,
			componentName: "rtk-grid-pagination",
			tags: ["pagination", "grid", "participant", "tile", "header"],
		},
		{
			id: "rtk-menu",
			name: "Menu",
			imagePath: rtkMenu.src,
			componentName: "rtk-menu",
			tags: ["menu", "sidebar", "controlbar", "button"],
		},
		{
			id: "rtk-name-tag",
			name: "Name Tag",
			imagePath: rtkNameTag.src,
			componentName: "rtk-name-tag",
			tags: ["name-tag", "participant", "tile", "grid"],
		},
		{
			id: "rtk-notification",
			name: "Notification",
			imagePath: rtkNotification.src,
			componentName: "rtk-notification",
			tags: ["notification", "sidebar", "popup", "chat"],
		},
		{
			id: "rtk-participant-count",
			name: "Participant Count",
			imagePath: rtkParticipantCount.src,
			componentName: "rtk-participant-count",
			tags: ["participant-count", "header", "sidebar"],
		},
		{
			id: "rtk-participant-tile",
			name: "Participant Tile",
			imagePath: rtkParticipantTile.src,
			componentName: "rtk-participant-tile",
			tags: ["participant-tile", "participant", "tile", "grid"],
		},
		{
			id: "rtk-plugin-main",
			name: "Plugin Main View",
			imagePath: rtkPluginMain.src,
			componentName: "rtk-plugin-main",
			tags: ["plugin-main", "plugin", "sidebar", "controlbar", "button"],
		},
	];
	const compositeComponents = [
		{
			id: "rtk-chat",
			name: "Chat",
			imagePath: rtkChat.src,
			componentName: "rtk-chat",
			tags: ["chat", "message", "sidebar"],
		},
		{
			id: "rtk-grid",
			name: "Grid",
			imagePath: rtkGrid.src,
			componentName: "rtk-grid",
			tags: ["grid", "participant", "tile", "layout"],
		},
		{
			id: "rtk-image-viewer",
			name: "Image Viewer",
			imagePath: rtkImageViewer.src,
			componentName: "rtk-image-viewer",
			tags: ["image-viewer", "media", "chat", "sidebar"],
		},
		{
			id: "rtk-leave-meeting",
			name: "Leave Meeting",
			imagePath: rtkLeaveMeeting.src,
			componentName: "rtk-leave-meeting",
			tags: ["leave", "dialog", "modal", "controlbar", "button", "end"],
		},
		{
			id: "rtk-mixed-grid",
			name: "Mixed Grid",
			imagePath: rtkMixedGrid.src,
			componentName: "rtk-mixed-grid",
			tags: ["mixed", "grid", "participant", "tile", "layout"],
		},
		{
			id: "rtk-participants",
			name: "Participants",
			imagePath: rtkParticipants.src,
			componentName: "rtk-participants",
			tags: ["participants", "sidebar", "list", "participant", "tile"],
		},
		{
			id: "rtk-participants-audio",
			name: "Participants Audio",
			imagePath: rtkParticipantsAudio.src,
			componentName: "rtk-participants-audio",
			tags: ["participants-audio", "audio", "sidebar", "participant", "list"],
		},
		{
			id: "rtk-plugins",
			name: "Plugins",
			imagePath: rtkPlugins.src,
			componentName: "rtk-plugins",
			tags: ["plugins", "sidebar", "list", "plugin"],
		},
		{
			id: "rtk-polls",
			name: "Polls",
			imagePath: rtkPolls.src,
			componentName: "rtk-polls",
			tags: ["polls", "sidebar", "voting", "interactive"],
		},
		{
			id: "rtk-screenshare-view",
			name: "Screenshare View",
			imagePath: rtkScreenshareView.src,
			componentName: "rtk-screenshare-view",
			tags: ["screenshare-view", "screenshare", "media", "grid"],
		},
		{
			id: "rtk-settings",
			name: "Settings",
			imagePath: rtkSettings.src,
			componentName: "rtk-settings",
			tags: [
				"settings",
				"sidebar",
				"configuration",
				"preferences",
				"dialog",
				"modal",
			],
		},
		{
			id: "rtk-settings-audio",
			name: "Settings Audio",
			imagePath: rtkSettingsAudio.src,
			componentName: "rtk-settings-audio",
			tags: [
				"settings-audio",
				"audio",
				"settings",
				"sidebar",
				"configuration",
				"dialog",
				"modal",
			],
		},
		{
			id: "rtk-settings-video",
			name: "Settings Video",
			imagePath: rtkSettingsVideo.src,
			componentName: "rtk-settings-video",
			tags: [
				"settings-video",
				"video",
				"settings",
				"sidebar",
				"configuration",
				"dialog",
				"modal",
			],
		},
		{
			id: "rtk-sidebar",
			name: "Sidebar",
			imagePath: rtkSidebar.src,
			componentName: "rtk-sidebar",
			tags: ["sidebar", "layout", "navigation", "panel"],
		},
		{
			id: "rtk-simple-grid",
			name: "Simple Grid",
			imagePath: rtkSimpleGrid.src,
			componentName: "rtk-simple-grid",
			tags: ["simple", "grid", "participant", "tile", "layout", "basic"],
		},
		{
			id: "rtk-spotlight-grid",
			name: "Spotlight Grid",
			imagePath: rtkSpotlightGrid.src,
			componentName: "rtk-spotlight-grid",
			tags: ["spotlight", "grid", "participant", "tile", "layout", "pinned"],
		},
	];
	const screenComponents = [
		{
			id: "rtk-ended-screen",
			name: "Ended Screen",
			imagePath: rtkEndedScreen.src,
			componentName: "rtk-ended-screen",
			tags: ["ended", "screen", "meeting", "end", "leave"],
		},
		{
			id: "rtk-idle-screen",
			name: "Idle Screen",
			imagePath: rtkIdleScreen.src,
			componentName: "rtk-idle-screen",
			tags: ["idle", "screen", "waiting", "lobby", "standby"],
		},
		{
			id: "rtk-meeting",
			name: "Meeting Screen",
			imagePath: rtkMeeting.src,
			componentName: "rtk-meeting",
			tags: ["meeting", "screen", "main", "active"],
		},
		{
			id: "rtk-setup-screen",
			name: "Setup Screen",
			imagePath: rtkSetupScreen.src,
			componentName: "rtk-setup-screen",
			tags: ["setup", "screen", "configuration", "preview"],
		},
	];

	// Filter function to search through components
	const filterComponents = (components: typeof basicComponents) => {
		if (!searchTerm.trim()) return components;

		const lowercaseSearch = searchTerm.toLowerCase();
		return components.filter((component) => {
			// Search in name
			if (component.name.toLowerCase().includes(lowercaseSearch)) return true;
			// Search in component name
			if (component.componentName.toLowerCase().includes(lowercaseSearch))
				return true;
			// Search in tags
			if (
				component.tags.some((tag) =>
					tag.toLowerCase().includes(lowercaseSearch),
				)
			)
				return true;
			return false;
		});
	};

	// Filtered component arrays
	const filteredBasicComponents = useMemo(
		() => filterComponents(basicComponents),
		[searchTerm],
	);
	const filteredUiComponents = useMemo(
		() => filterComponents(uiComponents),
		[searchTerm],
	);
	const filteredCompositeComponents = useMemo(
		() => filterComponents(compositeComponents),
		[searchTerm],
	);
	const filteredScreenComponents = useMemo(
		() => filterComponents(screenComponents),
		[searchTerm],
	);

	return (
		<div>
			<h2 className="mb-2 text-2xl font-bold">Component Gallery</h2>
			<p className="mb-4">
				Search through the comoponent gallery for the component you need.
			</p>
			<input
				className="mb-2 w-full rounded-md border bg-neutral-50 p-1 px-2 dark:border-neutral-600 dark:bg-neutral-800"
				placeholder="Search for 'Chat'"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			{/* Show no results message if search term exists but no components found */}
			{searchTerm.trim() &&
				filteredBasicComponents.length === 0 &&
				filteredUiComponents.length === 0 &&
				filteredCompositeComponents.length === 0 &&
				filteredScreenComponents.length === 0 && (
					<div className="py-8 text-center">
						<p className="text-gray-500">
							No components found for "{searchTerm}"
						</p>
						<p className="mt-2 text-sm text-gray-400">
							Try searching for terms like "grid", "chat", "button", or
							"settings"
						</p>
					</div>
				)}

			{/* Basic Components */}
			{filteredBasicComponents.length > 0 && (
				<>
					<h2 className="mb-2 text-2xl font-bold">Basic Components</h2>
					<p className="mb-4">Small, reusable building blocks for your UI.</p>
					<div className="flex flex-wrap items-start gap-4">
						{filteredBasicComponents.map((component) => (
							<RTKUIComponent
								key={component.id}
								id={component.id}
								name={component.name}
								imagePath={component.imagePath}
								componentName={component.componentName}
							/>
						))}
					</div>
				</>
			)}

			{/* UI Components */}
			{filteredUiComponents.length > 0 && (
				<>
					<h2 className="mb-2 text-2xl font-bold">UI Components</h2>
					<p className="mb-4">Interactive controls and interface elements.</p>
					<div className="flex flex-wrap items-start gap-4">
						{filteredUiComponents.map((component) => (
							<RTKUIComponent
								key={component.id}
								id={component.id}
								name={component.name}
								imagePath={component.imagePath}
								componentName={component.componentName}
							/>
						))}
					</div>
				</>
			)}

			{/* Composite Components */}
			{filteredCompositeComponents.length > 0 && (
				<>
					<h2 className="mb-2 text-2xl font-bold">Composite Components</h2>
					<p className="mb-4">
						Complete, feature-rich components combining multiple elements.
					</p>
					<div className="flex flex-wrap items-start gap-4">
						{filteredCompositeComponents.map((component) => (
							<RTKUIComponent
								key={component.id}
								id={component.id}
								name={component.name}
								imagePath={component.imagePath}
								componentName={component.componentName}
							/>
						))}
					</div>
				</>
			)}

			{/* Screen Components */}
			{filteredScreenComponents.length > 0 && (
				<>
					<h2 className="mb-2 text-2xl font-bold">Screen Components</h2>
					<p className="mb-4">
						Full-screen views for different meeting states.
					</p>
					<div className="flex flex-wrap items-start gap-4">
						{filteredScreenComponents.map((component) => (
							<RTKUIComponent
								key={component.id}
								id={component.id}
								name={component.name}
								imagePath={component.imagePath}
								componentName={component.componentName}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default RTKUIComponentGrid;
