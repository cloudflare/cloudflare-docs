# Cloudflare Workers AI Skill

A comprehensive OpenCode skill for working with Cloudflare Workers AI.

## What This Skill Covers

This skill focuses **exclusively on Cloudflare Workers AI** - the serverless AI inference platform. It does NOT cover the broader Cloudflare platform (Workers, Pages, CDN, etc.) unless directly related to Workers AI usage.

### Topics Included

- **Core Concepts**: Bindings, model invocation patterns, naming conventions
- **Task-Specific Implementations**: Text generation, embeddings, image generation, speech recognition, translation, etc.
- **REST API Usage**: Authentication, endpoints, OpenAI compatibility
- **Wrangler Integration**: Setup, configuration, deployment
- **Pricing & Limits**: Neurons, rate limits, cost optimization
- **Common Patterns**: RAG, streaming, batch processing, error handling
- **AI Gateway**: Caching, rate limiting, analytics integration
- **Function Calling**: Both traditional and embedded approaches
- **Model Selection**: Guidelines for choosing the right model
- **TypeScript Support**: Types, interfaces, best practices

## How to Use This Skill

### Installation

1. Place `README.md` in your OpenCode skills directory
2. Load the skill when working on Workers AI projects

### When to Load This Skill

Load this skill when:
- Implementing AI inference in Cloudflare Workers
- Building RAG systems with Workers AI + Vectorize
- Optimizing Workers AI costs or performance
- Debugging Workers AI integration issues
- Setting up AI Gateway with Workers AI
- Implementing function calling with LLMs

### Example Usage

```bash
# In OpenCode CLI
load-skill cloudflare-workers-ai

# Then ask questions like:
"How do I implement streaming with Workers AI?"
"What's the best embedding model for semantic search?"
"Show me how to do RAG with Vectorize"
"How do I handle rate limits?"
```

## Skill Structure

The skill is organized into these sections:

1. **Overview** - What Workers AI is and when to use this skill
2. **Core Concepts** - Bindings, invocation patterns, model naming
3. **Task-Specific Patterns** - Code examples for each AI task type
4. **REST API** - Using Workers AI via HTTP endpoints
5. **Wrangler CLI** - Setup, config, deployment
6. **Pricing & Neurons** - Cost model and optimization
7. **Rate Limits** - Per-task and per-model limits
8. **RAG Pattern** - Complete retrieval-augmented generation example
9. **AI Gateway** - Integration patterns
10. **Common Patterns** - Error handling, streaming, batching, etc.
11. **Model Selection** - Choosing the right model
12. **Debugging** - Monitoring and troubleshooting
13. **Common Issues** - Known problems and solutions
14. **Pages Integration** - Using Workers AI in Pages Functions
15. **Advanced Topics** - LoRA adapters
16. **Architecture Patterns** - System design approaches

## Key Features

- ✅ **Complete Code Examples**: Every pattern has working code
- ✅ **TypeScript First**: Proper typing for all examples
- ✅ **Real-World Patterns**: RAG, streaming, batch processing
- ✅ **Cost Optimization**: Pricing info and model selection guidance
- ✅ **Troubleshooting**: Common issues and solutions
- ✅ **Best Practices**: Error handling, type safety, monitoring

## What's NOT Covered

This skill does NOT cover:
- General Cloudflare Workers programming (use Workers skill)
- Cloudflare Pages (unless specifically Workers AI integration)
- Cloudflare CDN, DNS, security features
- Vectorize (unless in context of Workers AI RAG)
- D1, KV, R2, Durable Objects (unless AI-specific usage)

## Maintenance

To keep this skill up to date:
- Check official docs: https://developers.cloudflare.com/workers-ai/
- Monitor model catalog: https://developers.cloudflare.com/workers-ai/models/
- Track pricing changes: https://developers.cloudflare.com/workers-ai/platform/pricing/

## Contributing

Found an issue or want to improve this skill?
1. Test changes against official Cloudflare Workers AI docs
2. Verify code examples work with latest Wrangler
3. Update pricing/limits if changed
4. Add new model examples as they're released

## Version History

- **v1.0** (2026-01-11): Initial comprehensive skill
  - Full coverage of Workers AI API
  - Code patterns for all task types
  - Pricing, limits, troubleshooting
  - RAG, streaming, function calling examples

## License

This skill documentation is provided as-is for use with OpenCode.
