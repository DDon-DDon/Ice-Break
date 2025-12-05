# CI/CD Workflow & Versioning Guide

**Date**: 2025-12-05
**Project**: Broken Translator (`iskim/broken-translator`)

This document explains the automated workflows configured for this project and how to manage versioning.

## 1. Workflows Overview

We have integrated the CI and Release processes into a single pipeline located at `.github/workflows/ci.yml`.

### Integrated Pipeline (`ci.yml`)
- **Triggers**:
  - Push to `main` (if files in `iskim/broken-translator` change).
  - Pull Request to `main` (if files in `iskim/broken-translator` change).

- **Jobs**:
  1.  **lint-and-build**:
      - Installs dependencies (`npm ci`).
      - Runs Linting (`npm run lint`).
      - Builds the project (`npm run build`).
      - Runs Tests (`npm test`).
  2.  **release**:
      - **Condition**: Runs ONLY on Push to `main`, ONLY if `lint-and-build` succeeds, and if commit message is not a release commit.
      - **Action**:
          - Calculates next version (standard-version).
          - Updates `package.json` and `CHANGELOG.md`.
          - Creates Git Tag.
          - Pushes changes back to GitHub.

---

## 2. Versioning Strategy

We use **Semantic Versioning** (Major.Minor.Patch) automated by `standard-version`.
The version number is determined by your **Commit Messages**.

### How to Write Commit Messages
You must follow the **Conventional Commits** format:

`type(scope): subject`

| Type | Meaning | Version Bump | Example |
| :--- | :--- | :--- | :--- |
| **feat** | New feature | **Minor** (0.1.0 -> 0.2.0) | `feat: add japanese translation support` |
| **fix** | Bug fix | **Patch** (0.1.0 -> 0.1.1) | `fix: correct api key environment variable` |
| **docs** | Documentation | No bump | `docs: update readme` |
| **style** | Formatting | No bump | `style: fix indentation` |
| **refactor** | Code restructuring | No bump | `refactor: simplify translation logic` |
| **test** | Adding tests | No bump | `test: add unit test for service` |
| **chore** | Maintenance | No bump | `chore: update dependencies` |

> **Breaking Changes**: If you add `BREAKING CHANGE:` in the footer of the commit message, it triggers a **Major** version bump (0.1.0 -> 1.0.0).

---

## 3. Versioned Comments

To help track code history, we use a convention of adding the version number to comments.

### VS Code Snippet
A snippet is configured in `.vscode/broken-translator.code-snippets`.

- **Trigger**: Type `vcom` and press `Tab`.
- **Output**: `// 0.0.0v |`
- **Usage**: Update the version number manually if needed (or we can automate this further in the future) and write your comment.

Example:
```javascript
// 0.1.2v Fixed the API response parsing logic
const data = response.json();
```

---

## 4. Version Bump Examples (Current Version: 0.0.0)

Since the current version is `0.0.0`, here is how the next version will be determined based on your **next commit message**:

### Scenario A: First Feature Release (Minor Bump)
If you want to release the first working version (e.g., `0.1.0`):
1.  Make your changes.
2.  Commit with: `feat: initial release of translation features`
3.  Push to `main`.
4.  **Result**: Version becomes **0.1.0**.

### Scenario B: Bug Fix (Patch Bump)
If you just fixed a small bug:
1.  Make your fix.
2.  Commit with: `fix: resolve crash on empty input`
3.  Push to `main`.
4.  **Result**: Version becomes **0.0.1**.

### Scenario C: Breaking Change (Major Bump)
If you completely changed the API or architecture:
1.  Make your changes.
2.  Commit with:
    ```text
    feat: rewrite translation engine
    
    BREAKING CHANGE: new api structure
    ```
3.  Push to `main`.
4.  **Result**: Version becomes **1.0.0**.

> **Tip**: You don't need to manually change `package.json`. Just write the correct commit message, and the CI will handle the rest!
