# Versioning & Release Workflow

## 1. Automated Release
We use **GitHub Actions** and **standard-version** to automate versioning and tagging.

### How it works
1.  **Develop**: Make changes and commit them.
    - **Important**: Use [Conventional Commits](https://www.conventionalcommits.org/) messages.
        - `feat: ...` -> Minor version bump (0.1.0 -> 0.2.0)
        - `fix: ...` -> Patch version bump (0.1.0 -> 0.1.1)
        - `BREAKING CHANGE: ...` -> Major version bump (0.1.0 -> 1.0.0)
2.  **Push**: Push your changes to the `main` branch.
3.  **Action**: The `.github/workflows/release.yml` workflow triggers.
    - It runs `npm run release` (standard-version).
    - It updates `package.json` and `CHANGELOG.md`.
    - It creates a new Git Tag.
    - It pushes the changes and tag back to the repository.

## 2. Versioned Comments
To easily add comments with the current version (e.g., `// 0.0.1v ...`), use the VS Code snippet.

### Usage
1.  Open a JavaScript/TypeScript file.
2.  Type `vcom` and press `Tab`.
3.  The snippet expands to: `// 0.0.0v |`.
4.  Type your comment.

> **Note**: The snippet defaults to `0.0.0v`. You may need to manually update the version number in the snippet if you want it to match `package.json` exactly, or just overwrite it when typing.
