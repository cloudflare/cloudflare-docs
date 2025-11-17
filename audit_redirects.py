#!/usr/bin/env python3
"""
Script to audit Cloudflare One redirects based on hit counts.
"""

import csv
import subprocess
import re
from datetime import datetime
from pathlib import Path

# File paths
CSV_FILE = "/Users/mphillips/Downloads/CF1 redirect audit - Redirect audit (spreadsheet manually updated)_Use this page_Table (1).csv"
REDIRECTS_FILE = "/Users/mphillips/Work/cloudflare-docs/public/__redirects"

def load_hit_counts():
    """Load hit counts from CSV file."""
    hit_counts = {}
    with open(CSV_FILE, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            path = row['id']
            hits = int(row['hits'])
            hit_counts[path] = hits
    return hit_counts

def get_redirect_age(line_number):
    """Get the age of a redirect using git blame."""
    try:
        result = subprocess.run(
            ['git', 'blame', '-L', f'{line_number},{line_number}', '--porcelain', REDIRECTS_FILE],
            capture_output=True,
            text=True,
            cwd='/Users/mphillips/Work/cloudflare-docs'
        )

        if result.returncode == 0:
            # Parse the porcelain output to get the commit date
            for line in result.stdout.split('\n'):
                if line.startswith('author-time '):
                    timestamp = int(line.split()[1])
                    commit_date = datetime.fromtimestamp(timestamp)
                    return commit_date
    except Exception as e:
        print(f"Error getting age for line {line_number}: {e}")

    return None

def parse_redirects():
    """Parse all redirects from the file."""
    redirects = []
    with open(REDIRECTS_FILE, 'r') as f:
        for line_num, line in enumerate(f, 1):
            line = line.strip()
            if not line or line.startswith('#'):
                continue

            # Parse redirect line: source destination status
            parts = line.split()
            if len(parts) >= 2:
                source = parts[0]
                destination = parts[1]
                status = parts[2] if len(parts) > 2 else '301'

                redirects.append({
                    'line_number': line_num,
                    'source': source,
                    'destination': destination,
                    'status': status,
                    'full_line': line
                })

    return redirects

def find_redirect_chains(redirects):
    """Find redirect chains where A -> B -> C."""
    # Build a map of source -> destination
    redirect_map = {r['source']: r['destination'] for r in redirects}

    chains = []
    for redirect in redirects:
        source = redirect['source']
        dest = redirect['destination']

        # Check if destination is also a source (creating a chain)
        if dest in redirect_map:
            chain = [source, dest]
            next_dest = redirect_map[dest]

            # Follow the chain
            visited = set(chain)
            while next_dest in redirect_map and next_dest not in visited:
                chain.append(next_dest)
                visited.add(next_dest)
                next_dest = redirect_map[next_dest]

            # Add final destination
            chain.append(next_dest)

            if len(chain) > 2:  # Only report actual chains (A -> B -> C)
                chains.append({
                    'chain': chain,
                    'source_redirect': redirect
                })

    return chains

def analyze_cloudflare_one_redirects():
    """Analyze cloudflare-one redirects and categorize them."""
    hit_counts = load_hit_counts()
    redirects = parse_redirects()

    # Filter to only cloudflare-one redirects
    cf1_redirects = [r for r in redirects if r['source'].startswith('/cloudflare-one/')]

    print(f"Total cloudflare-one redirects: {len(cf1_redirects)}")
    print(f"Hit count data available for: {len(hit_counts)} URLs\n")

    # Categorize redirects
    to_remove_low_hits = []
    to_review_moderate_hits = []
    to_keep_high_hits = []
    no_data = []

    for redirect in cf1_redirects:
        source = redirect['source']
        hits = hit_counts.get(source, None)

        if hits is None:
            no_data.append(redirect)
        elif hits <= 10:
            to_remove_low_hits.append((redirect, hits))
        elif hits <= 50:
            to_review_moderate_hits.append((redirect, hits))
        else:
            to_keep_high_hits.append((redirect, hits))

    print("=" * 80)
    print("ANALYSIS RESULTS")
    print("=" * 80)

    print(f"\n1. LOW HITS (0-10) - REMOVE: {len(to_remove_low_hits)} redirects")
    print("-" * 80)
    for redirect, hits in sorted(to_remove_low_hits, key=lambda x: x[1]):
        print(f"  {hits:3d} hits | Line {redirect['line_number']:4d} | {redirect['source']}")

    print(f"\n2. MODERATE HITS (11-50) - REVIEW: {len(to_review_moderate_hits)} redirects")
    print("-" * 80)
    for redirect, hits in sorted(to_review_moderate_hits, key=lambda x: x[1]):
        print(f"  {hits:3d} hits | Line {redirect['line_number']:4d} | {redirect['source']}")

    print(f"\n3. HIGH HITS (50+) - KEEP: {len(to_keep_high_hits)} redirects")
    print("-" * 80)
    for redirect, hits in sorted(to_keep_high_hits, key=lambda x: x[1], reverse=True):
        print(f"  {hits:4d} hits | Line {redirect['line_number']:4d} | {redirect['source']}")

    print(f"\n4. NO DATA AVAILABLE: {len(no_data)} redirects")
    print("-" * 80)
    for redirect in no_data[:20]:  # Show first 20
        print(f"  Line {redirect['line_number']:4d} | {redirect['source']}")
    if len(no_data) > 20:
        print(f"  ... and {len(no_data) - 20} more")

    # Save lists to files for processing
    with open('/Users/mphillips/Work/cloudflare-docs/redirects_to_remove.txt', 'w') as f:
        f.write("# Cloudflare One redirects to remove (0-10 hits)\n")
        f.write(f"# Total: {len(to_remove_low_hits)} redirects\n\n")
        for redirect, hits in sorted(to_remove_low_hits, key=lambda x: x[0]['line_number']):
            f.write(f"{redirect['line_number']}:{redirect['full_line']}\n")

    with open('/Users/mphillips/Work/cloudflare-docs/redirects_to_review.txt', 'w') as f:
        f.write("# Cloudflare One redirects to review (11-50 hits)\n")
        f.write(f"# Total: {len(to_review_moderate_hits)} redirects\n\n")
        for redirect, hits in sorted(to_review_moderate_hits, key=lambda x: x[0]['line_number']):
            f.write(f"{redirect['line_number']}:{hits}:{redirect['full_line']}\n")

    print(f"\n\nResults saved to:")
    print(f"  - redirects_to_remove.txt ({len(to_remove_low_hits)} redirects)")
    print(f"  - redirects_to_review.txt ({len(to_review_moderate_hits)} redirects)")

    return to_remove_low_hits, to_review_moderate_hits

def analyze_redirect_chains():
    """Analyze all redirects for chains."""
    redirects = parse_redirects()
    chains = find_redirect_chains(redirects)

    print("\n" + "=" * 80)
    print("REDIRECT CHAINS ANALYSIS")
    print("=" * 80)
    print(f"\nFound {len(chains)} redirect chains:\n")

    for i, chain_info in enumerate(chains, 1):
        chain = chain_info['chain']
        print(f"{i}. Chain of {len(chain)} redirects:")
        for j, url in enumerate(chain):
            if j < len(chain) - 1:
                print(f"   {url}")
                print(f"   ↓")
            else:
                print(f"   {url} (final)")
        print()

    # Save chains to file
    with open('/Users/mphillips/Work/cloudflare-docs/redirect_chains.txt', 'w') as f:
        f.write("# Redirect chains found in __redirects file\n")
        f.write(f"# Total: {len(chains)} chains\n\n")
        for i, chain_info in enumerate(chains, 1):
            chain = chain_info['chain']
            f.write(f"Chain {i} ({len(chain)} redirects):\n")
            for url in chain:
                f.write(f"  {url}\n")
            f.write(f"\nShould be simplified to:\n")
            f.write(f"  {chain[0]} -> {chain[-1]}\n\n")
            f.write("-" * 80 + "\n\n")

    print(f"Chains saved to: redirect_chains.txt")

    return chains

if __name__ == '__main__':
    print("Cloudflare One Redirects Audit")
    print("=" * 80)
    print()

    # Analyze cloudflare-one redirects by hit count
    to_remove, to_review = analyze_cloudflare_one_redirects()

    # Analyze redirect chains
    chains = analyze_redirect_chains()

    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"Redirects to remove (0-10 hits): {len(to_remove)}")
    print(f"Redirects to review (11-50 hits): {len(to_review)}")
    print(f"Redirect chains found: {len(chains)}")
    print()
