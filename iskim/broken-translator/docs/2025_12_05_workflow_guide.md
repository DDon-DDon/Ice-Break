# CI/CD Workflow & Versioning Guide

**Date**: 2025-12-05
**Project**: Broken Translator (`iskim/broken-translator`)

This document explains the automated workflows configured for this project and how to manage versioning.

## 1. Workflows Overview

We have a single pipeline located at `.github/workflows/ci.yml`.

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
  2.  **tag-version**:
      - **Condition**: Runs ONLY on Push to `main` AND if `lint-and-build` succeeds.
      - **Action**:
          - Reads the `version` from `package.json`.
          - Checks if a Git Tag for that version already exists (e.g., `v0.1.0`).
          - If the tag does **NOT** exist, it creates the tag and pushes it.

---

## 2. Versioning Strategy (Manual)

We use **Manual Versioning**. You control the version number directly in `package.json`.

### How to Release a New Version
1.  Open `package.json`.
2.  Update the `"version"` field (e.g., `0.0.1` -> `0.1.0`).
3.  Commit and Push to `main`.
    ```bash
    git add package.json
    git commit -m "chore: bump version to 0.1.0"
    git push origin main
    ```
4.  **Result**: GitHub Actions will detect the new version number and automatically create a `v0.1.0` tag.

---

## 3. Versioned Comments

To help track code history, we use a convention of adding the version number to comments.

### VS Code Snippet
A snippet is configured in `.vscode/broken-translator.code-snippets`.

- **Trigger**: Type `vcom` and press `Tab`.
- **Output**: `// 0.0.0v |`
- **Usage**: Update the version number manually if needed and write your comment.

Example:
```javascript
// 0.1.2v Fixed the API response parsing logic
const data = response.json();
```
