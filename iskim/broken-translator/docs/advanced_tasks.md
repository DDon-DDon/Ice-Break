# Advanced Project Enhancements & CI/CD

This document outlines advanced topics to further improve the **Broken Translator** project, focusing on automation, quality assurance, and developer experience.

## 1. Continuous Deployment (CD)
Currently, the CI pipeline only builds and lints.
- **Goal**: Automatically deploy the application when changes are pushed to `main`.
- **Tasks**:
  - [ ] **Vercel/Netlify Integration**: Connect the repository to Vercel or Netlify for zero-config deployments.
  - [ ] **GitHub Pages**: Add a workflow to deploy the `dist` folder to `gh-pages` branch.
  - [ ] **Preview Environments**: Enable deploy previews for Pull Requests (automatic with Vercel/Netlify).

## 2. Advanced Testing Strategy
- **Goal**: Ensure reliability and prevent regressions.
- **Tasks**:
  - [x] **Unit Testing**: Install **Vitest** to test `translationService.js` logic (mocking API calls). *(Completed: Vitest installed, initial tests added)*
  - [x] **Component Testing**: Use **React Testing Library** to verify `TranslationInput` and `TranslationChain` render correctly. *(Completed: Setup done, tests added)*
  - [ ] **E2E Testing**: Set up **Playwright** or **Cypress** to simulate a user typing text and verifying the "broken" result appears.
  - [ ] **Test Coverage**: Add a CI step to fail if code coverage drops below a threshold.

## 3. Code Quality & Git Hooks
- **Goal**: Enforce standards before code reaches the repository.
- **Tasks**:
  - [ ] **Husky & lint-staged**: Run ESLint and Prettier only on changed files before committing (`pre-commit` hook).
  - [ ] **Commitlint**: Enforce [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat: add new language`, `fix: typo in header`) using a `commit-msg` hook.
  - [ ] **Prettier**: Add a `.prettierrc` and ensure consistent formatting across all files.

## 4. Security & Dependency Management
- **Goal**: Keep the application secure and up-to-date.
- **Tasks**:
  - [ ] **Dependabot**: Configure `.github/dependabot.yml` to automatically create PRs for outdated npm packages.
  - [ ] **CodeQL**: Enable GitHub's CodeQL analysis workflow to scan for security vulnerabilities.
  - [ ] **Secret Scanning**: Ensure no API keys are accidentally committed (already a GitHub feature, but good to verify).

## 5. Performance & Monitoring
- **Goal**: Optimize user experience and track issues.
- **Tasks**:
  - [ ] **Lighthouse CI**: Run Google Lighthouse in CI to check performance, accessibility, and SEO scores.
  - [ ] **Bundle Analysis**: Use `rollup-plugin-visualizer` to analyze build size and optimize chunks.
  - [ ] **Sentry**: Integrate Sentry to track runtime errors in the deployed application.

## 6. Developer Experience (DX)
- **Goal**: Make it easier for new developers to contribute.
- **Tasks**:
  - [ ] **Storybook**: Create a UI component explorer to develop components (`Header`, `TranslationInput`) in isolation.
  - [ ] **Plop.js**: Add a CLI generator to easily create new components with standard boilerplate.
  - [ ] **Path Aliases**: Configure `@/components`, `@/services` in `vite.config.js` and `jsconfig.json` for cleaner imports.

## 7. Containerization
- **Goal**: Ensure consistent execution environment.
- **Tasks**:
  - [ ] **Docker**: Create a `Dockerfile` to build the app in a container (Nginx serving static files).
  - [ ] **Docker Compose**: If a backend is added later, use Compose to run both services together.
