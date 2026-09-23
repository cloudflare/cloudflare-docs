Report concrete problems introduced or touched by changed code:

- Logic errors: off-by-one mistakes, wrong operators or variables, inverted conditions, and broken control flow.
- Missing or incorrect error handling: unhandled rejections, swallowed errors, unsafe external input, and missing null or undefined checks. Do not assume throwing an error is a bug; check the caller's error contract.
- Security issues: injection, unsafe command, HTML, or SQL interpolation, leaked secrets, missing authorization, and unsafe deserialization.
- Resource and concurrency issues: leaks, unawaited promises, races, and unbounded loops.
- Broken code examples in any file type, including fenced MDX examples: commands, API arguments, and configuration that will not work.

This covers source code, configuration, scripts, and the code blocks and code components in MDX files. In MDX files, surrounding prose is context, not a target.

A defect must be confirmed by the diff, files at the PR head, or repository search. Language semantics visible in the code, such as an unawaited promise or an undefined variable, count as confirmed. Do not rely on recalled behavior of APIs, libraries, tools, or services that none of those sources show. This repository contains Cloudflare's product documentation, which can confirm the behavior of Cloudflare APIs, bindings, and tools.

Do not report:

- Whether documentation prose is technically accurate, such as product behavior, limits, pricing, or claims about other systems. The source of truth usually lives outside this repository, and a changed claim may be an intended product change.
- Prose style, tone, grammar, wording, capitalization, formatting, or documentation-style rules.
- Pre-existing issues, CI-covered problems, pure maintainability nits, optional refactors, or stylistic preferences.
