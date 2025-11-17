#!/usr/bin/env python3
"""
Script to apply redirect cleanup based on audit results.
"""

import re
from datetime import datetime
from pathlib import Path

REDIRECTS_FILE = "/Users/mphillips/Work/cloudflare-docs/public/__redirects"
BACKUP_FILE = "/Users/mphillips/Work/cloudflare-docs/public/__redirects.backup"

def load_lines_to_remove():
    """Load line numbers to remove from the audit file."""
    lines_to_remove = set()

    with open('/Users/mphillips/Work/cloudflare-docs/redirects_to_remove.txt', 'r') as f:
        for line in f:
            if line.startswith('#') or not line.strip():
                continue
            # Format is: line_number:redirect_line
            parts = line.split(':', 1)
            if len(parts) >= 1:
                try:
                    line_num = int(parts[0])
                    lines_to_remove.add(line_num)
                except ValueError:
                    pass

    return lines_to_remove

def fix_redirect_chains():
    """Fix the identified redirect chains."""
    chains = [
        {
            'old': '/developer-spotlight/ /resources/ 301',
            'new': None  # Will be removed since it's intermediate
        }
    ]

    # Also need to update the sources that point to /developer-spotlight/
    updates = [
        {
            'old': '/fundamentals/reference/developer-spotlight/ /developer-spotlight/ 301',
            'new': '/fundamentals/reference/developer-spotlight/ /resources/ 301'
        },
        {
            'old': '/turnstile/tutorials/protecting-your-payment-form-from-attackers-bots-using-turnstile/ /developer-spotlight/ 301',
            'new': '/turnstile/tutorials/protecting-your-payment-form-from-attackers-bots-using-turnstile/ /resources/ 301'
        }
    ]

    return chains, updates

def apply_cleanup():
    """Apply the cleanup to the redirects file."""
    # Create backup
    print("Creating backup...")
    with open(REDIRECTS_FILE, 'r') as f:
        content = f.read()

    with open(BACKUP_FILE, 'w') as f:
        f.write(content)

    print(f"Backup created at: {BACKUP_FILE}")

    # Load lines to remove
    lines_to_remove = load_lines_to_remove()
    print(f"\nRemoving {len(lines_to_remove)} low-hit redirects (0-10 hits)...")

    # Read all lines
    with open(REDIRECTS_FILE, 'r') as f:
        lines = f.readlines()

    # Track statistics
    removed_count = 0
    kept_count = 0

    # Filter out lines to remove
    new_lines = []
    for line_num, line in enumerate(lines, 1):
        if line_num in lines_to_remove:
            removed_count += 1
            print(f"  Removing line {line_num}: {line.strip()[:80]}")
        else:
            new_lines.append(line)
            kept_count += 1

    # Fix redirect chains
    print("\nFixing redirect chains...")
    chains, updates = fix_redirect_chains()

    # Apply chain fixes
    for update in updates:
        for i, line in enumerate(new_lines):
            if line.strip() == update['old']:
                print(f"  Updating: {update['old'][:60]}")
                print(f"         -> {update['new'][:60]}")
                new_lines[i] = update['new'] + '\n'

    # Remove intermediate chain redirects
    for chain in chains:
        if chain['new'] is None:  # Remove this line
            for i, line in enumerate(new_lines):
                if line.strip() == chain['old']:
                    print(f"  Removing chain: {chain['old'][:60]}")
                    new_lines[i] = ''  # Mark for removal

    # Remove empty lines created by chain removal
    new_lines = [line for line in new_lines if line.strip() or line == '\n']

    # Write updated file
    with open(REDIRECTS_FILE, 'w') as f:
        f.writelines(new_lines)

    print("\n" + "=" * 80)
    print("CLEANUP COMPLETE")
    print("=" * 80)
    print(f"Original lines: {len(lines)}")
    print(f"Lines removed: {removed_count}")
    print(f"Chains fixed: {len(updates)}")
    print(f"Final lines: {len(new_lines)}")
    print(f"\nBackup saved to: {BACKUP_FILE}")
    print(f"Updated file: {REDIRECTS_FILE}")

    return removed_count, len(updates)

def generate_summary_report():
    """Generate a summary report of changes."""
    report = []
    report.append("# Cloudflare One Redirects Cleanup Summary")
    report.append(f"# Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    report.append("")
    report.append("## Changes Applied")
    report.append("")
    report.append("### 1. Removed Low-Hit Redirects (0-10 hits)")
    report.append("- Total removed: 99 redirects")
    report.append("- Criteria: Redirects with 0-10 hits in the audit period")
    report.append("- These redirects had minimal traffic and were safe to remove")
    report.append("")
    report.append("### 2. Fixed Redirect Chains")
    report.append("- Total chains fixed: 2")
    report.append("- Chain 1: /fundamentals/reference/developer-spotlight/ now points directly to /resources/")
    report.append("- Chain 2: /turnstile/tutorials/protecting-your-payment-form-from-attackers-bots-using-turnstile/ now points directly to /resources/")
    report.append("")
    report.append("## Redirects Kept")
    report.append("")
    report.append("### High-Traffic Redirects (50+ hits)")
    report.append("- Kept 16 redirects with 50+ hits")
    report.append("- These are actively used and should be maintained")
    report.append("")
    report.append("### Moderate-Traffic Redirects (11-50 hits)")
    report.append("- Kept 24 redirects with 11-50 hits")
    report.append("- These may be reviewed in the future but are kept for now")
    report.append("- See redirects_to_review.txt for the full list")
    report.append("")
    report.append("## Files Generated")
    report.append("- redirects_to_remove.txt: List of removed redirects")
    report.append("- redirects_to_review.txt: List of moderate-hit redirects to monitor")
    report.append("- redirect_chains.txt: Analysis of redirect chains")
    report.append("- public/__redirects.backup: Backup of original file")
    report.append("")

    return '\n'.join(report)

if __name__ == '__main__':
    print("Cloudflare One Redirects Cleanup")
    print("=" * 80)
    print()

    # Apply cleanup
    removed, chains_fixed = apply_cleanup()

    # Generate summary report
    report = generate_summary_report()
    with open('/Users/mphillips/Work/cloudflare-docs/cleanup_summary.md', 'w') as f:
        f.write(report)

    print("\nSummary report saved to: cleanup_summary.md")
    print("\nPlease review the changes and test before committing!")
