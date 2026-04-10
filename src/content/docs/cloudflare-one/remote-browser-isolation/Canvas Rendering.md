# Canvas Rendering
Canvas Rendering is a Browser Isolation capability that optimizes performance for web applications using the HTML5 Canvas API. It sends vector draw commands to the client instead of rasterized bitmaps, reducing bandwidth consumption and improving frame rates for productivity applications.
## How it works
Browser Isolation uses Network Vector Rendering (NVR) to deliver efficient vector commands rather than rendered pixels. However, HTML5 Canvas content previously required server-side rasterization, sending large bitmaps for every frame.
Canvas Rendering extends NVR to Canvas-based applications by:
1. Capturing draw commands made to the HTML5 Canvas element.
2. Converting and sending those commands to the client as NVR instructions.
3. Rendering the Canvas content on the client onto an offscreen texture.
4. Compositing the texture into the final document output.
This approach dramatically improves the framerate for Canvas-intensive applications while reducing average bandwidth use from hundreds of kilobytes per second to tens of kilobytes per second.
## Supported applications
Canvas Rendering improves performance for productivity applications that rely on the HTML5 Canvas API:
| Application | Improvement |
|-------------|-------------|
| Microsoft Word | 10x bandwidth reduction |
| Microsoft Excel | Smooth scrolling and data entry |
| Microsoft PowerPoint | Fluid animations |
| Google Sheets | Consistent 30fps rendering |
| Google Maps | Smooth panning and zooming |
| Web-based terminals and AI notebooks | Fast and responsive text input and display |
## Limitations
Canvas Rendering supports 2D Canvas contexts only. The following are not supported:
- WebGL and WebGPU contexts
- 3D graphics applications
- Advanced Canvas features requiring GPU acceleration
For WebGL-related limitations, refer to WebGL Rendering Error.
## Enable or disable Canvas Rendering

Canvas Rendering is enabled by default for all Browser Isolation customers. No configuration is required.

<img width="320" height="325" alt="canvasrendering_screenshot" src="https://github.com/user-attachments/assets/c7318de0-ac57-4f54-8315-ef2813dd7d19" />

### Disable Canvas Rendering (Current Session)
1. Right-click on the background of the isolated webpage.
2. Select Disable Canvas Rendering from the context menu.
### Re-enable Canvas Rendering
1. Right-click on the background of the isolated webpage.
2. Select Enable Canvas Rendering from the context menu.

## Troubleshooting
### Canvas content renders slowly
If Canvas-based applications appear choppy or consume excessive bandwidth:
1. Verify Canvas Rendering is enabled by right-clicking the page background.
2. Check that the context menu shows Disable Canvas Rendering (indicating it is active).
3. If the issue persists, open a support case and provide the Ray ID from the error page.
### Graphical glitches or missing elements
If Canvas content displays incorrectly after reconnecting from a network interruption:
1. Refresh the isolated page.
2. If the issue persists, disable Canvas Rendering using the right-click menu.
3. Re-enable Canvas Rendering after the page reloads.
