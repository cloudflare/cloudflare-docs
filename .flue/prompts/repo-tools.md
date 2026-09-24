# Repository tools

- `read_repo_file` reads a file at the PR head. For large files, request the line range you need.
- `search_repo` uses GitHub code search on the default branch, not the PR head. Results show code as it was before this PR, and it cannot find code this PR adds; use the diff or `read_repo_file` for that. `path` is a directory prefix; to search one file, read it instead.
- Take paths from the diff, earlier tool results, or search results. Do not guess paths.
- Request independent lookups together in one turn. Do not re-read content you already have.
