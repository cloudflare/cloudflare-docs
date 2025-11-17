#!/usr/bin/env python3
"""
Analyze static redirects to find opportunities for dynamic redirects.
"""

from collections import defaultdict
import re

REDIRECTS_FILE = "/Users/mphillips/Work/cloudflare-docs/public/__redirects"

def analyze_section(start_line, end_line, section_name):
    """Analyze a section of redirects for patterns."""

    redirects = []
    with open(REDIRECTS_FILE, 'r') as f:
        lines = f.readlines()
        for i in range(start_line - 1, min(end_line, len(lines))):
            line = lines[i].strip()
            if not line or line.startswith('#'):
                continue

            parts = line.split()
            if len(parts) >= 2:
                source = parts[0]
                dest = parts[1]
                redirects.append((source, dest))

    # Group by pattern
    patterns = defaultdict(list)

    for source, dest in redirects:
        # Extract the base paths
        source_parts = source.split('/')
        dest_parts = dest.split('/')

        # Find common patterns
        if len(source_parts) > 2 and len(dest_parts) > 2:
            # Check for path transformations
            source_base = '/'.join(source_parts[:4])  # First 3 segments
            dest_base = '/'.join(dest_parts[:4])

            pattern_key = f"{source_base} -> {dest_base}"
            patterns[pattern_key].append((source, dest))

    print(f"\n{'=' * 80}")
    print(f"{section_name}")
    print(f"{'=' * 80}\n")
    print(f"Total redirects: {len(redirects)}\n")

    # Find patterns with multiple redirects
    for pattern, matches in sorted(patterns.items(), key=lambda x: len(x[1]), reverse=True):
        if len(matches) >= 3:  # Only show patterns with 3+ matches
            print(f"\nPattern: {pattern}")
            print(f"Count: {len(matches)} redirects")
            print("Examples:")
            for source, dest in matches[:5]:
                print(f"  {source}")
                print(f"  -> {dest}")
            if len(matches) > 5:
                print(f"  ... and {len(matches) - 5} more")

    # Analyze specific transformation patterns
    print(f"\n{'-' * 80}")
    print("SPECIFIC PATTERN ANALYSIS")
    print(f"{'-' * 80}\n")

    # Pattern 1: Simple path segment replacement
    segment_replacements = defaultdict(list)
    for source, dest in redirects:
        source_parts = source.split('/')
        dest_parts = dest.split('/')

        if len(source_parts) == len(dest_parts):
            # Find which segments differ
            diffs = []
            for i, (s, d) in enumerate(zip(source_parts, dest_parts)):
                if s != d:
                    diffs.append((i, s, d))

            if len(diffs) == 1:  # Only one segment differs
                idx, old_seg, new_seg = diffs[0]
                key = f"Position {idx}: '{old_seg}' -> '{new_seg}'"
                segment_replacements[key].append((source, dest))

    print("Single Segment Replacements:")
    for pattern, matches in sorted(segment_replacements.items(), key=lambda x: len(x[1]), reverse=True):
        if len(matches) >= 3:
            print(f"\n  {pattern} ({len(matches)} redirects)")
            for source, dest in matches[:3]:
                print(f"    {source} -> {dest}")
            if len(matches) > 3:
                print(f"    ... and {len(matches) - 3} more")

    # Pattern 2: Path prefix changes
    prefix_changes = defaultdict(list)
    for source, dest in redirects:
        # Check if it's a simple prefix replacement
        source_parts = source.split('/')
        dest_parts = dest.split('/')

        # Find common suffix
        common_suffix_len = 0
        for s, d in zip(reversed(source_parts), reversed(dest_parts)):
            if s == d:
                common_suffix_len += 1
            else:
                break

        if common_suffix_len > 0:
            source_prefix = '/'.join(source_parts[:-common_suffix_len]) if common_suffix_len < len(source_parts) else source
            dest_prefix = '/'.join(dest_parts[:-common_suffix_len]) if common_suffix_len < len(dest_parts) else dest
            suffix = '/'.join(source_parts[-common_suffix_len:])

            if source_prefix and dest_prefix and source_prefix != dest_prefix:
                key = f"{source_prefix}/* -> {dest_prefix}/:splat"
                prefix_changes[key].append((source, dest, suffix))

    print("\n\nPrefix Replacement Patterns:")
    for pattern, matches in sorted(prefix_changes.items(), key=lambda x: len(x[1]), reverse=True):
        if len(matches) >= 3:
            print(f"\n  {pattern} ({len(matches)} redirects)")
            print(f"    Could replace:")
            for source, dest, suffix in matches[:3]:
                print(f"      {source}")
            if len(matches) > 3:
                print(f"    ... and {len(matches) - 3} more")

    return redirects, patterns, prefix_changes

def generate_recommendations(section_name, prefix_changes):
    """Generate specific recommendations for dynamic redirects."""
    print(f"\n{'=' * 80}")
    print(f"RECOMMENDATIONS FOR {section_name}")
    print(f"{'=' * 80}\n")

    recommendations = []
    for pattern, matches in sorted(prefix_changes.items(), key=lambda x: len(x[1]), reverse=True):
        if len(matches) >= 3:
            recommendations.append({
                'pattern': pattern,
                'count': len(matches),
                'matches': matches
            })

    if recommendations:
        print("Suggested dynamic redirects:\n")
        for i, rec in enumerate(recommendations, 1):
            print(f"{i}. {rec['pattern']}")
            print(f"   Replaces {rec['count']} static redirects")
            print(f"   Lines to remove:")
            for source, dest, suffix in rec['matches'][:5]:
                print(f"     {source} {dest} 301")
            if rec['count'] > 5:
                print(f"     ... and {rec['count'] - 5} more")
            print()
    else:
        print("No clear patterns found with 3+ redirects.")

    return recommendations

if __name__ == '__main__':
    # Cloudflare One nav revamp section: lines 2196-2226
    cf1_redirects, cf1_patterns, cf1_prefix = analyze_section(2196, 2226, "CLOUDFLARE ONE NAV REVAMP")
    cf1_recs = generate_recommendations("CLOUDFLARE ONE NAV REVAMP", cf1_prefix)

    # Email Security section: lines 2228-2239
    email_redirects, email_patterns, email_prefix = analyze_section(2228, 2239, "EMAIL SECURITY NEW REVAMP")
    email_recs = generate_recommendations("EMAIL SECURITY NEW REVAMP", email_prefix)

    # Save recommendations
    with open('/Users/mphillips/Work/cloudflare-docs/dynamic_redirect_recommendations.txt', 'w') as f:
        f.write("# Dynamic Redirect Recommendations\n\n")

        f.write("## Cloudflare One Nav Revamp\n\n")
        if cf1_recs:
            for i, rec in enumerate(cf1_recs, 1):
                f.write(f"### Recommendation {i}\n")
                f.write(f"Dynamic redirect: {rec['pattern']}\n")
                f.write(f"Replaces: {rec['count']} static redirects\n\n")
                f.write("Static redirects to remove:\n")
                for source, dest, suffix in rec['matches']:
                    f.write(f"  {source} {dest} 301\n")
                f.write("\n")
        else:
            f.write("No patterns found with 3+ redirects.\n\n")

        f.write("## Email Security New Revamp\n\n")
        if email_recs:
            for i, rec in enumerate(email_recs, 1):
                f.write(f"### Recommendation {i}\n")
                f.write(f"Dynamic redirect: {rec['pattern']}\n")
                f.write(f"Replaces: {rec['count']} static redirects\n\n")
                f.write("Static redirects to remove:\n")
                for source, dest, suffix in rec['matches']:
                    f.write(f"  {source} {dest} 301\n")
                f.write("\n")
        else:
            f.write("No patterns found with 3+ redirects.\n\n")

    print("\nRecommendations saved to: dynamic_redirect_recommendations.txt")
