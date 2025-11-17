# Cloudflare One Redirects Audit - Final Summary

**Date:** November 17, 2025
**Auditor:** Cascade AI Assistant

---

## Overview

Comprehensive audit and cleanup of Cloudflare One redirects based on traffic data from the audit period.

---

## Changes Applied

### 1. Removed Low-Traffic Redirects (0-10 hits)

- **Total removed:** 99 static redirects
- **Criteria:** Redirects with 0-10 hits during the audit period
- **Rationale:** Minimal traffic indicates these redirects are no longer actively used

### 2. Fixed Redirect Chains

- **Chains fixed:** 2
- **Before:** Multi-hop redirects (A → B → C)
- **After:** Direct redirects (A → C)

**Chain 1:**

- `/fundamentals/reference/developer-spotlight/` → `/resources/` (direct)

**Chain 2:**

- `/turnstile/tutorials/protecting-your-payment-form-from-attackers-bots-using-turnstile/` → `/resources/` (direct)

### 3. Consolidated Static Redirects into Dynamic Redirects

- **Total consolidated:** 9 static redirects → 2 dynamic redirects
- **Net reduction:** 7 lines

#### Dynamic Redirect 1: MCP Servers Path

**Location:** Cloudflare One nav revamp (dynamics) section
**Pattern:** `/cloudflare-one/applications/configure-apps/mcp-servers/* /cloudflare-one/access-controls/ai-controls/:splat 301`
**Replaces 3 static redirects:**

- `/cloudflare-one/applications/configure-apps/mcp-servers/linked-apps/`
- `/cloudflare-one/applications/configure-apps/mcp-servers/mcp-portals/`
- `/cloudflare-one/applications/configure-apps/mcp-servers/saas-mcp/`

#### Dynamic Redirect 2: Email Security Detection Settings

**Location:** Email Security new revamp (dynamics) section
**Pattern:** `/cloudflare-one/email-security/detection-settings/* /cloudflare-one/email-security/settings/detection-settings/:splat 301`
**Replaces 6 static redirects:**

- `/cloudflare-one/email-security/detection-settings/additional-detections/`
- `/cloudflare-one/email-security/detection-settings/allow-policies/`
- `/cloudflare-one/email-security/detection-settings/blocked-senders/`
- `/cloudflare-one/email-security/detection-settings/configure-link-actions/`
- `/cloudflare-one/email-security/detection-settings/configure-text-add-ons/`
- `/cloudflare-one/email-security/detection-settings/trusted-domains/`

---

## Final Statistics

### File Size Reduction

- **Original file:** 2,515 lines
- **Final file:** 2,408 lines
- **Total reduction:** 107 lines (4.3% reduction)

### Cloudflare One Redirects

- **Before audit:** 286 redirects
- **After audit:** 180 redirects
- **Total reduction:** 106 redirects (37% reduction)

### Breakdown of Remaining Redirects

- **High-traffic (50+ hits):** 16 redirects - KEPT
- **Moderate-traffic (11-50 hits):** 24 redirects - KEPT (flagged for future review)
- **No traffic data:** 147 redirects - KEPT (includes system redirects like changelog RSS feeds)

---

## Files Generated

1. **`public/__redirects.backup`** - Backup of original file before changes
2. **`cleanup_summary.md`** - Initial cleanup summary
3. **`redirects_to_remove.txt`** - List of 99 removed low-hit redirects
4. **`redirects_to_review.txt`** - List of 24 moderate-hit redirects for future monitoring
5. **`redirect_chains.txt`** - Analysis of redirect chains
6. **`dynamic_redirect_recommendations.txt`** - Analysis of dynamic redirect opportunities
7. **`final_audit_summary.md`** - This comprehensive summary

---

## Recommendations for Future Maintenance

### Monitor Moderate-Traffic Redirects

Review the 24 redirects in `redirects_to_review.txt` in 6-12 months to determine if they can be removed based on updated traffic data.

### Pattern Analysis Not Implemented

The following patterns were identified but NOT implemented due to conflicts:

**Identity Path Conflicts:**

- `/cloudflare-one/identity/authorization-cookie/*` → goes to `access-controls/applications/http-apps/`
- `/cloudflare-one/identity/users/*` → goes to `team-and-resources/`

These have different destinations and cannot be combined into a single dynamic redirect. Keep as static redirects.

### Testing Recommendations

1. Test a sample of the removed redirects to confirm they're no longer needed
2. Verify the two new dynamic redirects work correctly
3. Monitor 404 errors for any unexpected traffic to removed paths

---

## Impact Assessment

### Positive Impacts

✅ Cleaner, more maintainable redirects file
✅ Reduced file size improves parsing performance
✅ Dynamic redirects are more flexible and easier to maintain
✅ Removed outdated redirects reduce confusion

### Risk Mitigation

- Backup file created before any changes
- Only removed redirects with 0-10 hits (minimal traffic)
- High-traffic redirects (50+) were preserved
- Moderate-traffic redirects (11-50) were kept for safety

---

## Conclusion

The audit successfully reduced the Cloudflare One redirects by 37% while maintaining all high-traffic and moderate-traffic redirects. The consolidation of static redirects into dynamic patterns improves maintainability and reduces the likelihood of redirect chains forming in the future.

**Status:** ✅ Complete and ready for review/commit
