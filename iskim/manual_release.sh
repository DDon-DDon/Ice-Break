#!/bin/bash

# Manual Release Script
# Usage: ./manual_release.sh [release-type]
# release-type: patch (default), minor, major

RELEASE_TYPE=${1:-patch}

echo "🚀 Starting manual release process ($RELEASE_TYPE)..."

# 1. Ensure we are in the correct directory
cd broken-translator || exit

# 2. Run standard-version to bump version, update changelog, and tag
# --release-as allows forcing a specific release type
echo "📦 Bumping version..."
npm run release -- --release-as $RELEASE_TYPE

# 3. Push changes and tags to remote
echo "⬆️ Pushing changes and tags to origin..."
git push --follow-tags origin main

echo "✅ Release complete!"
