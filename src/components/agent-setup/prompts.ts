export const SHARED_PROMPTS = [
	// AI applications
	"Build an AI chat agent using the Cloudflare Agents SDK with persistent conversation history stored in D1.",
	"Create a RAG pipeline using Vectorize and Workers AI to answer questions over my documentation.",
	"Set up AI Gateway to route requests across OpenAI and Workers AI with automatic fallback and cost tracking.",
	"Build a serverless AI inference endpoint on Workers AI with streaming responses.",
	// Web apps & serverless backends
	"Deploy a full-stack React app to Cloudflare Pages with a Workers API backend and D1 database.",
	"Add a D1 database to my Worker and create a users table with full CRUD endpoints.",
	"Build an image upload and transformation service using R2 and Cloudflare Images.",
	"Add real-time collaboration to my app using Durable Objects with WebSocket hibernation.",
	"Set up a KV namespace for edge-cached session storage in my Worker.",
	"Add a cron trigger to my Worker that processes a job queue every hour.",
	// APIs & microservices
	"Deploy a globally distributed REST API on Workers with automatic scaling and zero cold starts.",
	"Connect my Worker to an existing Postgres database using Hyperdrive for connection pooling.",
	"Add mTLS authentication and schema validation to protect my API endpoints.",
	"Set up rate limiting and WAF rules to block abuse on my public API.",
	// SaaS & multi-tenant
	"Build a multi-tenant SaaS backend where each customer gets an isolated D1 database.",
	"Set up custom domains with automatic SSL for my SaaS customers using SSL for SaaS.",
	"Use Workers for Platforms to let my customers deploy their own code in isolated environments.",
	// Security
	"Add bot protection and rate limiting to my login and checkout endpoints.",
	"Set up WAF rules to block SQL injection and XSS attacks on my application.",
	"Configure Zero Trust access policies to protect my internal staging environment.",
	// Performance & e-commerce
	"Configure caching rules and cache TTLs to reduce origin load for my e-commerce store.",
	"Set up a Waiting Room to handle flash sale traffic spikes without dropping requests.",
	"Optimize my Worker to serve WebP images with responsive resizing using Cloudflare Images.",
	// Observability & DevOps
	"Check my Workers deployment logs for errors and suggest fixes.",
	"Set up GitHub Actions to deploy this Worker to staging and production on Cloudflare.",
	"Create a Logpush job to stream Workers analytics to my data warehouse.",
];
