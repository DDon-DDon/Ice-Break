# Broken Translator Architecture Documentation

## 1. Overview
**Broken Translator** is a React-based web application designed to humorously degrade translation quality by passing text through a chain of multiple languages before translating it back to the original language (or Korean). The goal is to create funny, nonsensical results ("Ice Break" tool).

## 2. Tech Stack
- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (v4) with PostCSS
- **Icons**: Lucide React, React Icons
- **Language**: JavaScript (ESModules)
- **Package Manager**: npm

## 3. Project Structure
The project follows a standard Vite + React structure:

```
broken-translator/
├── .github/              # GitHub Actions workflows
│   └── workflows/
│       └── ci.yml        # CI pipeline (Lint & Build)
├── public/               # Static assets
├── src/                  # Source code
│   ├── assets/           # Images and other assets
│   ├── components/       # React components
│   │   ├── Header.jsx
│   │   ├── TranslationInput.jsx
│   │   ├── TranslationChain.jsx
│   │   └── ComparisonResult.jsx
│   ├── services/         # Business logic & API services
│   │   └── translationService.js
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles (Tailwind imports)
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
└── vite.config.js        # Vite configuration
```

## 4. Key Components

### `App.jsx`
The root component that manages the global state:
- `isLoading`: Tracks translation progress.
- `translationData`: Stores the results of the translation chain.
- `error`: Captures and displays errors.
- **Functions**: `handleTranslate` orchestrates the translation process by calling `runTranslationChain`.

### `components/`
- **Header**: Displays the application title and branding.
- **TranslationInput**: A form for users to input text. Handles submission and loading states.
- **TranslationChain**: Visualizes the intermediate steps of the translation (e.g., Korean -> English -> Japanese -> Korean).
- **ComparisonResult**: Shows the side-by-side comparison of the original text and the final "broken" result.

## 5. Services

### `services/translationService.js`
Contains the core logic for the translation chain.
- **`runTranslationChain(text)`**:
  - Takes the input text.
  - Sequentially calls a translation API (or mock function) through a predefined list of languages.
  - Returns an object containing the full history of translations (`results`) and metadata (`usedMockData`).

## 6. CI/CD Pipeline
The project uses GitHub Actions for Continuous Integration.
- **Workflow**: `.github/workflows/ci.yml`
- **Triggers**: Push and Pull Request to `main` branch.
- **Jobs**:
  - `lint-and-build`:
    - Checks out code.
    - Sets up Node.js 22.
    - Installs dependencies (`npm ci`).
    - Runs ESLint (`npm run lint`).
    - Builds the project (`npm run build`).

## 7. Data Flow
1. User enters text in `TranslationInput`.
2. `App` calls `translationService.runTranslationChain`.
3. Service performs multiple API calls (or mock logic).
4. Results are returned to `App`.
5. `App` updates state, causing `TranslationChain` and `ComparisonResult` to render the funny output.
