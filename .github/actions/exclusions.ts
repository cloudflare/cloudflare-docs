/**
 * Map "product-slug" to GitHub username(s) of PCX team.
 * @important "product-slug" keys must match `content/*` subdirectory names.
 * @note Products are gathered from these DevDocs & do not necessarily map to internal product names.
 * Products w/o any GitHub username(s) will ping `haleycode` for assignment.
 * This PCX OWNERSHIP mapping is used for:
 *   - the "issues.opened" event to assign GitHub Issues to PCX member
 *   - the "pull_request.opened" event to request review(s) instead of CODEOWNERS usage
 */

export const OWNERS: Record<string, string[]> = {
    "1.1.1.1": ["RebeccaTamachiro"],
    "ai-gateway": ["bjesus"],
    analytics: ["angelampcosta"],
    api: ["ranbel"],
}