export interface EventSchema {
	event: string;
	type: string;
	description: string;
	source: Record<string, any>;
	payload: Record<string, any>;
	example: Record<string, any>;
}

export type ProductKey =
	| "r2"
	| "superSlurper"
	| "vectorize"
	| "workersAi"
	| "workersBuilds"
	| "kv"
	| "workflows";

export const eventSchemas: Record<ProductKey, EventSchema[]> = {
	r2: [
		{
			event: "bucket.created",
			type: "cf.r2.bucket.created",
			description: "Triggered when a bucket is created.",
			source: {
				type: "r2",
			},
			payload: {
				name: "my-bucket",
				jurisdiction: "default",
				location: "WNAM",
				storageClass: "Standard",
			},
			example: {
				type: "cf.r2.bucket.created",
				source: {
					type: "r2",
				},
				payload: {
					name: "my-bucket",
					jurisdiction: "default",
					location: "WNAM",
					storageClass: "Standard",
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
		{
			event: "bucket.deleted",
			type: "cf.r2.bucket.deleted",
			description: "Triggered when a bucket is deleted.",
			source: {
				type: "r2",
			},
			payload: {
				name: "my-bucket",
				jurisdiction: "default",
			},
			example: {
				type: "cf.r2.bucket.deleted",
				source: {
					type: "r2",
				},
				payload: {
					name: "my-bucket",
					jurisdiction: "default",
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
	],
	superSlurper: [
		{
			event: "job.started",
			type: "cf.superSlurper.job.started",
			description: "Triggered when a migration job starts.",
			source: {
				type: "superSlurper",
			},
			payload: {
				id: "job-12345678-90ab-cdef-1234-567890abcdef",
				createdAt: "2025-05-01T02:48:57.132Z",
				overwrite: true,
				pathPrefix: "migrations/",
				source: {
					provider: "s3",
					bucket: "source-bucket",
					region: "us-east-1",
					endpoint: "s3.amazonaws.com",
				},
				destination: {
					provider: "r2",
					bucket: "destination-bucket",
					jurisdiction: "default",
				},
			},
			example: {
				type: "cf.superSlurper.job.started",
				source: {
					type: "superSlurper",
				},
				payload: {
					id: "job-12345678-90ab-cdef-1234-567890abcdef",
					createdAt: "2025-05-01T02:48:57.132Z",
					overwrite: true,
					pathPrefix: "migrations/",
					source: {
						provider: "s3",
						bucket: "source-bucket",
						region: "us-east-1",
						endpoint: "s3.amazonaws.com",
					},
					destination: {
						provider: "r2",
						bucket: "destination-bucket",
						jurisdiction: "default",
					},
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
		{
			event: "job.paused",
			type: "cf.superSlurper.job.paused",
			description: "Triggered when a migration job pauses.",
			source: {
				type: "superSlurper",
			},
			payload: {
				id: "job-12345678-90ab-cdef-1234-567890abcdef",
			},
			example: {
				type: "cf.superSlurper.job.paused",
				source: {
					type: "superSlurper",
				},
				payload: {
					id: "job-12345678-90ab-cdef-1234-567890abcdef",
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
		{
			event: "job.resumed",
			type: "cf.superSlurper.job.resumed",
			description: "Triggered when a migration job resumes.",
			source: {
				type: "superSlurper",
			},
			payload: {
				id: "job-12345678-90ab-cdef-1234-567890abcdef",
			},
			example: {
				type: "cf.superSlurper.job.resumed",
				source: {
					type: "superSlurper",
				},
				payload: {
					id: "job-12345678-90ab-cdef-1234-567890abcdef",
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
		{
			event: "job.completed",
			type: "cf.superSlurper.job.completed",
			description: "Triggered when a migration job finishes.",
			source: {
				type: "superSlurper",
			},
			payload: {
				id: "job-12345678-90ab-cdef-1234-567890abcdef",
				totalObjectsCount: 1000,
				skippedObjectsCount: 10,
				migratedObjectsCount: 980,
				failedObjectsCount: 10,
			},
			example: {
				type: "cf.superSlurper.job.completed",
				source: {
					type: "superSlurper",
				},
				payload: {
					id: "job-12345678-90ab-cdef-1234-567890abcdef",
					totalObjectsCount: 1000,
					skippedObjectsCount: 10,
					migratedObjectsCount: 980,
					failedObjectsCount: 10,
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
		{
			event: "job.aborted",
			type: "cf.superSlurper.job.aborted",
			description: "Triggered when a migration job is manually aborted.",
			source: {
				type: "superSlurper",
			},
			payload: {
				id: "job-12345678-90ab-cdef-1234-567890abcdef",
				totalObjectsCount: 1000,
				skippedObjectsCount: 100,
				migratedObjectsCount: 500,
				failedObjectsCount: 50,
			},
			example: {
				type: "cf.superSlurper.job.aborted",
				source: {
					type: "superSlurper",
				},
				payload: {
					id: "job-12345678-90ab-cdef-1234-567890abcdef",
					totalObjectsCount: 1000,
					skippedObjectsCount: 100,
					migratedObjectsCount: 500,
					failedObjectsCount: 50,
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
		{
			event: "job.object.migrated",
			type: "cf.superSlurper.job.object.migrated",
			description: "Triggered when an object is migrated.",
			source: {
				type: "superSlurper.job",
				jobId: "job-12345678-90ab-cdef-1234-567890abcdef",
			},
			payload: {
				key: "migrations/file.txt",
			},
			example: {
				type: "cf.superSlurper.job.object.migrated",
				source: {
					type: "superSlurper.job",
					jobId: "job-12345678-90ab-cdef-1234-567890abcdef",
				},
				payload: {
					key: "migrations/file.txt",
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
	],
	vectorize: [
		{
			event: "index.created",
			type: "cf.vectorize.index.created",
			description: "Triggered when an index is created.",
			source: {
				type: "vectorize",
			},
			payload: {
				name: "my-vector-index",
				description: "Index for embeddings",
				createdAt: "2025-05-01T02:48:57.132Z",
				modifiedAt: "2025-05-01T02:48:57.132Z",
				dimensions: 1536,
				metric: "cosine",
			},
			example: {
				type: "cf.vectorize.index.created",
				source: {
					type: "vectorize",
				},
				payload: {
					name: "my-vector-index",
					description: "Index for embeddings",
					createdAt: "2025-05-01T02:48:57.132Z",
					modifiedAt: "2025-05-01T02:48:57.132Z",
					dimensions: 1536,
					metric: "cosine",
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
		{
			event: "index.deleted",
			type: "cf.vectorize.index.deleted",
			description: "Triggered when an index is deleted.",
			source: {
				type: "vectorize",
			},
			payload: {
				name: "my-vector-index",
			},
			example: {
				type: "cf.vectorize.index.deleted",
				source: {
					type: "vectorize",
				},
				payload: {
					name: "my-vector-index",
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
	],
	workersAi: [
		{
			event: "batch.queued",
			type: "cf.workersAi.model.batch.queued",
			description: "Triggered when a batch request is queued.",
			source: {
				type: "workersAi.model",
				modelName: "@cf/baai/bge-base-en-v1.5",
			},
			payload: {
				requestId: "req-12345678-90ab-cdef-1234-567890abcdef",
			},
			example: {
				type: "cf.workersAi.model.batch.queued",
				source: {
					type: "workersAi.model",
					modelName: "@cf/baai/bge-base-en-v1.5",
				},
				payload: {
					requestId: "req-12345678-90ab-cdef-1234-567890abcdef",
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
		{
			event: "batch.succeeded",
			type: "cf.workersAi.model.batch.succeeded",
			description: "Triggered when a batch request has completed.",
			source: {
				type: "workersAi.model",
				modelName: "@cf/baai/bge-base-en-v1.5",
			},
			payload: {
				requestId: "req-12345678-90ab-cdef-1234-567890abcdef",
			},
			example: {
				type: "cf.workersAi.model.batch.succeeded",
				source: {
					type: "workersAi.model",
					modelName: "@cf/baai/bge-base-en-v1.5",
				},
				payload: {
					requestId: "req-12345678-90ab-cdef-1234-567890abcdef",
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
		{
			event: "batch.failed",
			type: "cf.workersAi.model.batch.failed",
			description: "Triggered when a batch request has failed.",
			source: {
				type: "workersAi.model",
				modelName: "@cf/baai/bge-base-en-v1.5",
			},
			payload: {
				requestId: "req-12345678-90ab-cdef-1234-567890abcdef",
				message: "Model execution failed",
				internalCode: 5001,
				httpCode: 500,
			},
			example: {
				type: "cf.workersAi.model.batch.failed",
				source: {
					type: "workersAi.model",
					modelName: "@cf/baai/bge-base-en-v1.5",
				},
				payload: {
					requestId: "req-12345678-90ab-cdef-1234-567890abcdef",
					message: "Model execution failed",
					internalCode: 5001,
					httpCode: 500,
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
	],
	workersBuilds: [
		{
			event: "build.started",
			type: "cf.workersBuilds.worker.build.started",
			description: "Triggered when a build starts.",
			source: {
				type: "workersBuilds.worker",
				workerName: "my-worker",
			},
			payload: {
				buildUuid: "build-12345678-90ab-cdef-1234-567890abcdef",
				status: "running",
				buildOutcome: null,
				createdAt: "2025-05-01T02:48:57.132Z",
				initializingAt: "2025-05-01T02:48:58.132Z",
				runningAt: "2025-05-01T02:48:59.132Z",
				stoppedAt: null,
				buildTriggerMetadata: {
					buildTriggerSource: "push_event",
					branch: "main",
					commitHash: "abc123def456",
					commitMessage: "Fix bug in authentication",
					author: "developer@example.com",
					buildCommand: "npm run build",
					deployCommand: "wrangler deploy",
					rootDirectory: "/",
					repoName: "my-worker-repo",
					providerAccountName: "github-user",
					providerType: "github",
				},
			},
			example: {
				type: "cf.workersBuilds.worker.build.started",
				source: {
					type: "workersBuilds.worker",
					workerName: "my-worker",
				},
				payload: {
					buildUuid: "build-12345678-90ab-cdef-1234-567890abcdef",
					status: "running",
					buildOutcome: null,
					createdAt: "2025-05-01T02:48:57.132Z",
					initializingAt: "2025-05-01T02:48:58.132Z",
					runningAt: "2025-05-01T02:48:59.132Z",
					stoppedAt: null,
					buildTriggerMetadata: {
						buildTriggerSource: "push_event",
						branch: "main",
						commitHash: "abc123def456",
						commitMessage: "Fix bug in authentication",
						author: "developer@example.com",
						buildCommand: "npm run build",
						deployCommand: "wrangler deploy",
						rootDirectory: "/",
						repoName: "my-worker-repo",
						providerAccountName: "github-user",
						providerType: "github",
					},
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
		{
			event: "build.failed",
			type: "cf.workersBuilds.worker.build.failed",
			description: "Triggered when a build fails.",
			source: {
				type: "workersBuilds.worker",
				workerName: "my-worker",
			},
			payload: {
				buildUuid: "build-12345678-90ab-cdef-1234-567890abcdef",
				status: "failed",
				buildOutcome: "failure",
				createdAt: "2025-05-01T02:48:57.132Z",
				initializingAt: "2025-05-01T02:48:58.132Z",
				runningAt: "2025-05-01T02:48:59.132Z",
				stoppedAt: "2025-05-01T02:50:00.132Z",
				buildTriggerMetadata: {
					buildTriggerSource: "push_event",
					branch: "main",
					commitHash: "abc123def456",
					commitMessage: "Fix bug in authentication",
					author: "developer@example.com",
					buildCommand: "npm run build",
					deployCommand: "wrangler deploy",
					rootDirectory: "/",
					repoName: "my-worker-repo",
					providerAccountName: "github-user",
					providerType: "github",
				},
			},
			example: {
				type: "cf.workersBuilds.worker.build.failed",
				source: {
					type: "workersBuilds.worker",
					workerName: "my-worker",
				},
				payload: {
					buildUuid: "build-12345678-90ab-cdef-1234-567890abcdef",
					status: "failed",
					buildOutcome: "failure",
					createdAt: "2025-05-01T02:48:57.132Z",
					initializingAt: "2025-05-01T02:48:58.132Z",
					runningAt: "2025-05-01T02:48:59.132Z",
					stoppedAt: "2025-05-01T02:50:00.132Z",
					buildTriggerMetadata: {
						buildTriggerSource: "push_event",
						branch: "main",
						commitHash: "abc123def456",
						commitMessage: "Fix bug in authentication",
						author: "developer@example.com",
						buildCommand: "npm run build",
						deployCommand: "wrangler deploy",
						rootDirectory: "/",
						repoName: "my-worker-repo",
						providerAccountName: "github-user",
						providerType: "github",
					},
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
		{
			event: "build.canceled",
			type: "cf.workersBuilds.worker.build.canceled",
			description: "Triggered when a build is canceled.",
			source: {
				type: "workersBuilds.worker",
				workerName: "my-worker",
			},
			payload: {
				buildUuid: "build-12345678-90ab-cdef-1234-567890abcdef",
				status: "canceled",
				buildOutcome: "canceled",
				createdAt: "2025-05-01T02:48:57.132Z",
				initializingAt: "2025-05-01T02:48:58.132Z",
				runningAt: "2025-05-01T02:48:59.132Z",
				stoppedAt: "2025-05-01T02:49:30.132Z",
				buildTriggerMetadata: {
					buildTriggerSource: "push_event",
					branch: "main",
					commitHash: "abc123def456",
					commitMessage: "Fix bug in authentication",
					author: "developer@example.com",
					buildCommand: "npm run build",
					deployCommand: "wrangler deploy",
					rootDirectory: "/",
					repoName: "my-worker-repo",
					providerAccountName: "github-user",
					providerType: "github",
				},
			},
			example: {
				type: "cf.workersBuilds.worker.build.canceled",
				source: {
					type: "workersBuilds.worker",
					workerName: "my-worker",
				},
				payload: {
					buildUuid: "build-12345678-90ab-cdef-1234-567890abcdef",
					status: "canceled",
					buildOutcome: "canceled",
					createdAt: "2025-05-01T02:48:57.132Z",
					initializingAt: "2025-05-01T02:48:58.132Z",
					runningAt: "2025-05-01T02:48:59.132Z",
					stoppedAt: "2025-05-01T02:49:30.132Z",
					buildTriggerMetadata: {
						buildTriggerSource: "push_event",
						branch: "main",
						commitHash: "abc123def456",
						commitMessage: "Fix bug in authentication",
						author: "developer@example.com",
						buildCommand: "npm run build",
						deployCommand: "wrangler deploy",
						rootDirectory: "/",
						repoName: "my-worker-repo",
						providerAccountName: "github-user",
						providerType: "github",
					},
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
		{
			event: "build.succeeded",
			type: "cf.workersBuilds.worker.build.succeeded",
			description: "Triggered when a build succeeds.",
			source: {
				type: "workersBuilds.worker",
				workerName: "my-worker",
			},
			payload: {
				buildUuid: "build-12345678-90ab-cdef-1234-567890abcdef",
				status: "success",
				buildOutcome: "success",
				createdAt: "2025-05-01T02:48:57.132Z",
				initializingAt: "2025-05-01T02:48:58.132Z",
				runningAt: "2025-05-01T02:48:59.132Z",
				stoppedAt: "2025-05-01T02:50:15.132Z",
				buildTriggerMetadata: {
					buildTriggerSource: "push_event",
					branch: "main",
					commitHash: "abc123def456",
					commitMessage: "Fix bug in authentication",
					author: "developer@example.com",
					buildCommand: "npm run build",
					deployCommand: "wrangler deploy",
					rootDirectory: "/",
					repoName: "my-worker-repo",
					providerAccountName: "github-user",
					providerType: "github",
				},
			},
			example: {
				type: "cf.workersBuilds.worker.build.succeeded",
				source: {
					type: "workersBuilds.worker",
					workerName: "my-worker",
				},
				payload: {
					buildUuid: "build-12345678-90ab-cdef-1234-567890abcdef",
					status: "success",
					buildOutcome: "success",
					createdAt: "2025-05-01T02:48:57.132Z",
					initializingAt: "2025-05-01T02:48:58.132Z",
					runningAt: "2025-05-01T02:48:59.132Z",
					stoppedAt: "2025-05-01T02:50:15.132Z",
					buildTriggerMetadata: {
						buildTriggerSource: "push_event",
						branch: "main",
						commitHash: "abc123def456",
						commitMessage: "Fix bug in authentication",
						author: "developer@example.com",
						buildCommand: "npm run build",
						deployCommand: "wrangler deploy",
						rootDirectory: "/",
						repoName: "my-worker-repo",
						providerAccountName: "github-user",
						providerType: "github",
					},
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
	],
	kv: [
		{
			event: "namespace.created",
			type: "cf.kv.namespace.created",
			description: "Triggered when a namespace is created.",
			source: {
				type: "kv",
			},
			payload: {
				id: "ns-12345678-90ab-cdef-1234-567890abcdef",
				name: "my-kv-namespace",
			},
			example: {
				type: "cf.kv.namespace.created",
				source: {
					type: "kv",
				},
				payload: {
					id: "ns-12345678-90ab-cdef-1234-567890abcdef",
					name: "my-kv-namespace",
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
		{
			event: "namespace.deleted",
			type: "cf.kv.namespace.deleted",
			description: "Triggered when a namespace is deleted.",
			source: {
				type: "kv",
			},
			payload: {
				id: "ns-12345678-90ab-cdef-1234-567890abcdef",
				name: "my-kv-namespace",
			},
			example: {
				type: "cf.kv.namespace.deleted",
				source: {
					type: "kv",
				},
				payload: {
					id: "ns-12345678-90ab-cdef-1234-567890abcdef",
					name: "my-kv-namespace",
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
	],
	workflows: [
		{
			event: "instance.queued",
			type: "cf.workflows.workflow.instance.queued",
			description:
				"Triggered when an instance was created and is awaiting execution.",
			source: {
				type: "workflows.workflow",
				workflowName: "my-workflow",
			},
			payload: {
				versionId: "v1",
				instanceId: "inst-12345678-90ab-cdef-1234-567890abcdef",
			},
			example: {
				type: "cf.workflows.workflow.instance.queued",
				source: {
					type: "workflows.workflow",
					workflowName: "my-workflow",
				},
				payload: {
					versionId: "v1",
					instanceId: "inst-12345678-90ab-cdef-1234-567890abcdef",
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
		{
			event: "instance.started",
			type: "cf.workflows.workflow.instance.started",
			description: "Triggered when an instance starts or resumes execution.",
			source: {
				type: "workflows.workflow",
				workflowName: "my-workflow",
			},
			payload: {
				versionId: "v1",
				instanceId: "inst-12345678-90ab-cdef-1234-567890abcdef",
			},
			example: {
				type: "cf.workflows.workflow.instance.started",
				source: {
					type: "workflows.workflow",
					workflowName: "my-workflow",
				},
				payload: {
					versionId: "v1",
					instanceId: "inst-12345678-90ab-cdef-1234-567890abcdef",
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
		{
			event: "instance.paused",
			type: "cf.workflows.workflow.instance.paused",
			description: "Triggered when an instance pauses execution.",
			source: {
				type: "workflows.workflow",
				workflowName: "my-workflow",
			},
			payload: {
				versionId: "v1",
				instanceId: "inst-12345678-90ab-cdef-1234-567890abcdef",
			},
			example: {
				type: "cf.workflows.workflow.instance.paused",
				source: {
					type: "workflows.workflow",
					workflowName: "my-workflow",
				},
				payload: {
					versionId: "v1",
					instanceId: "inst-12345678-90ab-cdef-1234-567890abcdef",
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
		{
			event: "instance.errored",
			type: "cf.workflows.workflow.instance.errored",
			description: "Triggered when an instance step throws an error.",
			source: {
				type: "workflows.workflow",
				workflowName: "my-workflow",
			},
			payload: {
				versionId: "v1",
				instanceId: "inst-12345678-90ab-cdef-1234-567890abcdef",
			},
			example: {
				type: "cf.workflows.workflow.instance.errored",
				source: {
					type: "workflows.workflow",
					workflowName: "my-workflow",
				},
				payload: {
					versionId: "v1",
					instanceId: "inst-12345678-90ab-cdef-1234-567890abcdef",
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
		{
			event: "instance.terminated",
			type: "cf.workflows.workflow.instance.terminated",
			description: "Triggered when an instance is manually terminated.",
			source: {
				type: "workflows.workflow",
				workflowName: "my-workflow",
			},
			payload: {
				versionId: "v1",
				instanceId: "inst-12345678-90ab-cdef-1234-567890abcdef",
			},
			example: {
				type: "cf.workflows.workflow.instance.terminated",
				source: {
					type: "workflows.workflow",
					workflowName: "my-workflow",
				},
				payload: {
					versionId: "v1",
					instanceId: "inst-12345678-90ab-cdef-1234-567890abcdef",
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
		{
			event: "instance.completed",
			type: "cf.workflows.workflow.instance.completed",
			description:
				"Triggered when an instance finishes execution successfully.",
			source: {
				type: "workflows.workflow",
				workflowName: "my-workflow",
			},
			payload: {
				versionId: "v1",
				instanceId: "inst-12345678-90ab-cdef-1234-567890abcdef",
			},
			example: {
				type: "cf.workflows.workflow.instance.completed",
				source: {
					type: "workflows.workflow",
					workflowName: "my-workflow",
				},
				payload: {
					versionId: "v1",
					instanceId: "inst-12345678-90ab-cdef-1234-567890abcdef",
				},
				metadata: {
					accountId: "f9f79265f388666de8122cfb508d7776",
					eventSubscriptionId: "1830c4bb612e43c3af7f4cada31fbf3f",
					eventSchemaVersion: 1,
					eventTimestamp: "2025-05-01T02:48:57.132Z",
				},
			},
		},
	],
};
