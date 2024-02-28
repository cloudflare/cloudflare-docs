---
title: Cloudflare Images
pcx_content_type: how-to
weight: 2
---

# Cloudflare Images

Images hosted in Cloudflare Images can be migrated to an R2 bucket by using the [list images operation](/api/operations/cloudflare-images-list-images-v2) and the [base image operation](https://developers.cloudflare.com/api/operations/cloudflare-images-base-image).

## Migrating to R2 via a Worker

To use the example, an API token is needed with read permissions for images. [Read how to create an API token.](/fundamentals/api/get-started/create-token/)

Below is an example Worker that exports all images from Cloudflare Images to an R2 bucket.

Add your account identifier and API token to your environment variables when running the example worker. [Read how to add secrets.](/workers/configuration/secrets/#add-secrets-to-your-project)

```ts
export interface Env {
	MY_BUCKET: R2Bucket;
	IMAGES_ACCOUNT_ID: string;
	IMAGES_API_TOKEN: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const uploadedImages = await exportImagesBatch(env, null);

		return new Response(`${uploadedImages} images was uploaded.`);
	},
};

async function exportImagesBatch(env: Env, continuationToken: string | null, imagesCount: number = 0): Promise<number> {
	const imagesList = await getImagesList(env, continuationToken);

	if(!imagesList.result.images.length) {
		console.debug("Reached the end of the image list.");

		return imagesCount;
	}

	await Promise.all(imagesList.result.images.map(async (image) => {
		const imageResponse = await getImageResponse(env, image.id);

		console.debug(`Uploading image ${image.id} to bucket.`);

		await env.MY_BUCKET.put(image.id, await imageResponse.arrayBuffer(), {
			customMetadata: image.meta,
			httpMetadata: imageResponse.headers
		});
	}));

	return await exportImagesBatch(env, imagesList.result.continuation_token, imagesCount + imagesList.result.images.length);
}

type ListImagesResult = {
	result: {
		images: {
			id: string;
			filename: string;
			meta: Record<string, string>;
			requireSignedURLs: boolean;
			uploaded: string;
			variants: string[];
		}[];
		continuation_token: string;
	}
};

async function getImagesList(env: Env, continuationToken: string | null = null) {
	const url = new URL(`https://api.cloudflare.com/client/v4/accounts/${env.IMAGES_ACCOUNT_ID}/images/v2`);

	if(continuationToken) {
		url.searchParams.set("continuation_token", continuationToken);
	}

	url.searchParams.set("per_page", "10");

	const response = await fetch(url, {
		headers: {
			"Authorization": `Bearer ${env.IMAGES_API_TOKEN}`,
		}
	});

	if(!response.ok) {
		throw new Error("List images response was unsuccessful.");
	}

	return await response.json<ListImagesResult>();
}

async function getImageResponse(env: Env, imageId: string) {
  // Replace with your custom domain to work around rate limits
	const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.IMAGES_ACCOUNT_ID}/images/v1/${imageId}/blob`, {
		headers: {
			"Authorization": `Bearer ${env.IMAGES_API_TOKEN}`
		}
	});

	if(!response.ok) {
		throw new Error("Image response was unsuccessful.");
	}

	return response;
}
```
