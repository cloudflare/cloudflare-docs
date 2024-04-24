---
pcx_content_type: configuration
title: WebGPU
weight: 4
---

# WebGPU

The [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API), allows you to use the GPU directly from JavaScript.

The WebGPU API is only accessible from within [Durable Objects](/durable-objects/). The WebGPU API cannot be used from within Workers.

{{<Aside type="note">}}
The WebGPU API is currently only available in local development. You cannot yet deploy Durable Objects to Cloudflare that rely on the WebGPU API.
{{</Aside>}}

To use the WebGPU API in local development, enable the `experimental` and `webgpu` [compatibility flags](/workers/configuration/compatibility-dates/#compatibility-flags) in the [`wrangler.toml` configuration file](/workers/wrangler/configuration/) of your Durable Object.

```
compatibility_flags = ["experimental", "webgpu"]
```

The following subset of the WebGPU API is available from within Durable Objects:

| API | Supported? | Notes |
|-----|------------|-------|
| [`navigator.gpu`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/gpu) | ✅ | |
| [`GPU.requestAdapter`](https://developer.mozilla.org/en-US/docs/Web/API/GPU/requestAdapter) | ✅ | |
| [`GPUAdapterInfo`](https://developer.mozilla.org/en-US/docs/Web/API/GPUAdapterInfo) | ✅ | |
| [`GPUAdapter`](https://developer.mozilla.org/en-US/docs/Web/API/GPUAdapter) | ✅ | |
| [`GPUBindGroupLayout`](https://developer.mozilla.org/en-US/docs/Web/API/GPUBindGroupLayout) | ✅ | |
| [`GPUBindGroup`](https://developer.mozilla.org/en-US/docs/Web/API/GPUBindGroup) | ✅ | |
| [`GPUBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/GPUBuffer) | ✅ | |
| [`GPUCommandBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/GPUCommandBuffer) | ✅ | |
| [`GPUCommandEncoder`](https://developer.mozilla.org/en-US/docs/Web/API/GPUCommandEncoder) | ✅ | |
| [`GPUComputePassEncoder`](https://developer.mozilla.org/en-US/docs/Web/API/GPUComputePassEncoder) | ✅ | |
| [`GPUComputePipeline`](https://developer.mozilla.org/en-US/docs/Web/API/GPUComputePipeline) | ✅ | |
| [`GPUComputePipelineError`](https://developer.mozilla.org/en-US/docs/Web/API/GPUPipelineError) | ✅ | |
| [`GPUDevice`](https://developer.mozilla.org/en-US/docs/Web/API/GPUDevice) | ✅ | |
| [`GPUOutOfMemoryError`](https://developer.mozilla.org/en-US/docs/Web/API/GPUOutOfMemoryError) | ✅ | |
| [`GPUValidationError`](https://developer.mozilla.org/en-US/docs/Web/API/GPUValidationError) | ✅ | |
| [`GPUInternalError`](https://developer.mozilla.org/en-US/docs/Web/API/GPUInternalError) | ✅ | |
| [`GPUDeviceLostInfo`](https://developer.mozilla.org/en-US/docs/Web/API/GPUDeviceLostInfo) | ✅ | |
| [`GPUPipelineLayout`](https://developer.mozilla.org/en-US/docs/Web/API/GPUPipelineLayout) | ✅ | |
| [`GPUQuerySet`](https://developer.mozilla.org/en-US/docs/Web/API/GPUQuerySet) | ✅ | |
| [`GPUQueue`](https://developer.mozilla.org/en-US/docs/Web/API/GPUQueue) | ✅ | |
| [`GPUSampler`](https://developer.mozilla.org/en-US/docs/Web/API/GPUSampler) | ✅ | |
| [`GPUCompilationMessage`](https://developer.mozilla.org/en-US/docs/Web/API/GPUCompilationMessage) | ✅ | |
| [`GPUShaderModule`](https://developer.mozilla.org/en-US/docs/Web/API/GPUShaderModule) | ✅ | |
| [`GPUSupportedFeatures`](https://developer.mozilla.org/en-US/docs/Web/API/GPUSupportedFeatures) | ✅ | |
| [`GPUSupportedLimits`](https://developer.mozilla.org/en-US/docs/Web/API/GPUSupportedLimits) | ✅ | |
| [`GPUMapMode`](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API#reading_the_results_back_to_javascript) | ✅ | |
| [`GPUShaderStage`](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API#create_a_bind_group_layout) | ✅ | |
| [`GPUUncapturedErrorEvent`](https://developer.mozilla.org/en-US/docs/Web/API/GPUUncapturedErrorEvent) | ✅ | |

The following subset of the WebGPU API is not yet supported:

| API | Supported? | Notes |
|-----|------------|-------|
| [`GPU.getPreferredCanvasFormat`](https://developer.mozilla.org/en-US/docs/Web/API/GPU/getPreferredCanvasFormat) |  | |
| [`GPURenderBundle`](https://developer.mozilla.org/en-US/docs/Web/API/GPURenderBundle) |  | |
| [`GPURenderBundleEncoder`](https://developer.mozilla.org/en-US/docs/Web/API/GPURenderBundleEncoder) |  | |
| [`GPURenderPassEncoder`](https://developer.mozilla.org/en-US/docs/Web/API/GPURenderPassEncoder) |  | |
| [`GPURenderPipeline`](https://developer.mozilla.org/en-US/docs/Web/API/GPURenderPipeline) |  | |
| [`GPUShaderModule`](https://developer.mozilla.org/en-US/docs/Web/API/GPUShaderModule) |  | |
| [`GPUTexture`](https://developer.mozilla.org/en-US/docs/Web/API/GPUTexture) |  | |
| [`GPUTextureView`](https://developer.mozilla.org/en-US/docs/Web/API/GPUTextureView) |  | |
| [`GPUExternalTexture`](https://developer.mozilla.org/en-US/docs/Web/API/GPUExternalTexture) |  | |

## Examples

- [workers-wonnx](https://github.com/cloudflare/workers-wonnx/) — Image classification, running on a GPU via the WebGPU API, using the [wonnx](https://github.com/webonnx/wonnx) model inference runtime.
