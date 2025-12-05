#!/bin/bash

# Manual Release Script
# Usage: ./manual_release.sh [release-type]
# release-type: patch (default), minor, major

RELEASE_TYPE=${1:-patch}

echo "🚀 Starting manual release process ($RELEASE_TYPE)..."

# 0. Check Git Configuration
if [ -z "$(git config user.name)" ]; then
    echo "⚠️  Git user.name is not set."
    read -p "Enter your name: " GIT_NAME
    git config user.name "$GIT_NAME"
fi

if [ -z "$(git config user.email)" ]; then
    echo "⚠️  Git user.email is not set."
    read -p "Enter your email: " GIT_EMAIL
    git config user.email "$GIT_EMAIL"
fi

# 1. Ensure we are in the correct directory (Robustly)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_DIR="$SCRIPT_DIR/broken-translator"

if [ ! -d "$PROJECT_DIR" ]; then
    echo "❌ Error: Project directory not found at $PROJECT_DIR"
    exit 1
fi

cd "$PROJECT_DIR" || exit

# Check if node_modules exists, install if not
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.bin/standard-version" ]; then
    echo "📦 Installing dependencies (standard-version missing)..."
    npm install
fi

# 2. Run standard-version
echo "📦 Bumping version..."
# Try running with npx if npm run fails, or ensure path is correct
npm run release -- --release-as $RELEASE_TYPE || { 
    echo "❌ standard-version failed. Trying with npx..."
    npx standard-version --release-as $RELEASE_TYPE || { echo "❌ Release failed"; exit 1; }
}

# 3. Push changes
echo "⬆️ Pushing changes and tags to origin..."
git push --follow-tags origin main || { echo "❌ git push failed"; exit 1; }

echo "✅ Release complete!"
