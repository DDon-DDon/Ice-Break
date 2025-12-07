# Broken Translator 프로젝트 문서

> **박살난 번역기** - 인프라 구축과 코드 분석이 메인인 React 웹 번역기

---

## 📋 개요

**Broken Translator**는 리액트 기반의 재치 있는 웹 번역기입니다.
한국어를 여러 나라 언어로 번역을 거치면서 얼마나 "박살"날 수 있는지 보여주는 사이트입니다.

- **목적**: 인프라 구축 및 코드 분석 학습
- **프로젝트 경로**: `iskim/broken-translator`

---

## 🛠 기술 스택

| 구분                   | 기술                                    | 버전 |
| ---------------------- | --------------------------------------- | ---- |
| **Frontend Framework** | React                                   | 19   |
| **Build Tool**         | Vite                                    | 7.x  |
| **Styling**            | Tailwind CSS + PostCSS                  | 4.x  |
| **Icons**              | Lucide React, React Icons               | -    |
| **Language**           | JavaScript (ESModules)                  | -    |
| **Package Manager**    | npm                                     | -    |
| **Testing**            | Vitest + React Testing Library          | 4.x  |
| **Code Analysis**      | madge, dependency-cruiser, jscpd, plato | -    |

---

## 🔄 CI/CD 파이프라인

### GitHub Actions CI

프로젝트는 **GitHub Actions**를 사용하여 자동화된 CI/CD 파이프라인을 운영합니다.

#### 워크플로우 파일: `.github/workflows/ci.yml`

```yaml
name: Broken Translator CI/CD

on:
  push:
    branches: [main]
    paths:
      - "iskim/broken-translator/**"
  pull_request:
    branches: [main]
    paths:
      - "iskim/broken-translator/**"
```

#### 트리거 조건

| 이벤트       | 브랜치 | 경로 필터                    |
| ------------ | ------ | ---------------------------- |
| Push         | `main` | `iskim/broken-translator/**` |
| Pull Request | `main` | `iskim/broken-translator/**` |

#### Job 1: `lint-and-build`

```
┌─────────────────────────────────────────────────────────┐
│                    lint-and-build                        │
├─────────────────────────────────────────────────────────┤
│  1. Checkout code                                        │
│  2. Setup Node.js 22                                     │
│  3. npm ci (의존성 설치)                                  │
│  4. npm run lint (ESLint 검사)                           │
│  5. npm run build (Vite 빌드)                            │
│  6. npm test (Vitest 테스트)                             │
└─────────────────────────────────────────────────────────┘
```

**역할**: 코드 품질 검증

- ESLint로 코드 스타일/에러 검사
- Vite로 프로덕션 빌드 성공 여부 확인
- Vitest로 단위 테스트 실행

#### Job 2: `tag-version`

```
┌─────────────────────────────────────────────────────────┐
│                    tag-version                           │
│          (lint-and-build 성공 후 실행)                    │
├─────────────────────────────────────────────────────────┤
│  조건: Push to main && lint-and-build 성공               │
├─────────────────────────────────────────────────────────┤
│  1. package.json에서 버전 읽기                           │
│  2. Git Tag 존재 여부 확인                               │
│  3. 없으면 새 Tag 생성 및 Push (v0.1.0)                  │
└─────────────────────────────────────────────────────────┘
```

**역할**: 자동 버전 태깅

- `package.json`의 `version` 필드를 읽어 Git Tag 생성
- 이미 존재하는 태그는 스킵

### Vercel CD (배포)

**Vercel**을 통한 자동 배포를 설정할 수 있습니다.

#### 설정 방법

1. [vercel.com](https://vercel.com)에서 GitHub 연동
2. 레포지토리 Import
3. 설정:
   - **Root Directory**: `iskim/broken-translator`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### 배포 흐름

```
GitHub Push → Vercel 감지 → 자동 빌드 → 자동 배포
     ↓
Pull Request → Preview 배포 URL 생성
```

| 배포 유형  | 트리거           | URL                          |
| ---------- | ---------------- | ---------------------------- |
| Production | `main` push      | `your-app.vercel.app`        |
| Preview    | PR 생성/업데이트 | `your-app-{hash}.vercel.app` |

---

## 🧪 코드 테스트

### 테스트 프레임워크: Vitest

Vitest는 Vite 기반의 빠른 테스트 러너입니다.

#### 설정 파일: `vite.config.js`

```javascript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json"],
      reportsDirectory: "./docs/analysis/coverage",
    },
  },
});
```

#### 테스트 실행 명령어

```bash
# 테스트 실행 (watch 모드)
npm test

# 테스트 1회 실행
npx vitest run

# 커버리지 포함
npx vitest run --coverage
```

### 테스트 구조

```
src/
├── components/
│   ├── TranslationInput.jsx
│   └── TranslationInput.test.jsx    # 컴포넌트 테스트
└── services/
    ├── translationService.js
    └── translationService.test.js   # 서비스 로직 테스트
```

### 테스트 유형

| 유형             | 도구                  | 대상               |
| ---------------- | --------------------- | ------------------ |
| Unit Test        | Vitest                | 함수, 유틸리티     |
| Component Test   | React Testing Library | UI 컴포넌트        |
| Integration Test | Vitest + RTL          | 컴포넌트 연동      |
| E2E Test         | Playwright (예정)     | 전체 사용자 플로우 |

### 커버리지 리포트

```bash
npx vitest run --coverage
```

결과:

```
----------|---------|----------|---------|---------|
File      | % Stmts | % Branch | % Funcs | % Lines |
----------|---------|----------|---------|---------|
All files |   XX%   |   XX%    |   XX%   |   XX%   |
----------|---------|----------|---------|---------|
```

HTML 리포트: `docs/analysis/coverage/index.html`

---

## 🔍 코드 분석

### 분석 도구 목록

| 도구                 | 용도               | 명령어                                               |
| -------------------- | ------------------ | ---------------------------------------------------- |
| `madge`              | 모듈 의존성 시각화 | `npx madge --image graph.svg src/main.jsx`           |
| `dependency-cruiser` | 아키텍처 규칙 검증 | `npx depcruise src --config .dependency-cruiser.cjs` |
| `jscpd`              | 중복 코드 탐지     | `npx jscpd src`                                      |
| `plato`              | 복잡도 리포트      | `npx plato -r -d report src`                         |
| `eslint`             | 코드 품질 검사     | `npm run lint`                                       |

### 분석 스크립트 실행

```bash
# 전체 분석 실행
npm run analyze

# 개별 실행
npm run analyze:deps      # 의존성 분석
npm run analyze:quality   # 코드 품질
npm run analyze:coverage  # 테스트 커버리지
```

### 분석 결과 파일

```
docs/analysis/
├── dependency-graph.svg      # 의존성 시각화
├── dependency-graph.json     # 의존성 데이터
├── dependency-report.html    # 규칙 검증 리포트
├── circular-deps.txt         # 순환 의존성
├── eslint-report.json        # ESLint 결과
├── npm-dependency-tree.txt   # 패키지 트리
├── duplication/              # 중복 코드
├── plato-report/             # 복잡도 리포트
├── coverage/                 # 테스트 커버리지
└── CODE_ANALYSIS_REPORT.md   # 종합 분석 보고서
```

### 적용된 분석 규칙

#### .dependency-cruiser.cjs

```javascript
forbidden: [
  { name: "no-circular", severity: "error" }, // 순환 의존성 금지
  { name: "no-orphans", severity: "warn" }, // 고아 모듈 경고
  { name: "not-to-test", severity: "error" }, // 테스트→프로덕션 금지
];
```

#### eslint.config.js

```javascript
rules: {
  'complexity': ['warn', { max: 10 }],           // 복잡도 제한
  'max-depth': ['warn', { max: 4 }],             // 중첩 깊이 제한
  'max-lines-per-function': ['warn', { max: 50 }] // 함수 길이 제한
}
```

---

## 📊 현재 분석 결과 요약

| 항목            | 결과            | 상태 |
| --------------- | --------------- | ---- |
| 순환 의존성     | 없음            | ✅   |
| ESLint 에러     | 0개             | ✅   |
| ESLint 경고     | 4개 (함수 길이) | ⚠️   |
| 중복 코드       | 없음            | ✅   |
| 테스트 커버리지 | 0%              | ⚠️   |
| 모듈 수         | 8개             | -    |
| npm 패키지      | 816개           | -    |

---

## 📁 프로젝트 구조

```
broken-translator/
├── .dependency-cruiser.cjs   # 의존성 규칙
├── .jscpd.json               # 중복 탐지 설정
├── package.json              # 프로젝트 설정
├── vite.config.js            # Vite + 테스트 설정
├── eslint.config.js          # ESLint 규칙
├── scripts/
│   ├── analyze.sh            # 분석 스크립트
│   ├── generate-call-graph.js
│   └── generate-file-docs.js
├── src/
│   ├── main.jsx              # 엔트리 포인트
│   ├── App.jsx               # 메인 컴포넌트
│   ├── components/           # UI 컴포넌트
│   └── services/             # 비즈니스 로직
└── docs/
    ├── analysis/             # 분석 결과
    └── *.md                  # 문서
```

---

## 🚀 빠른 시작

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 테스트 실행
npm test

# 4. 코드 분석
npm run analyze

# 5. 프로덕션 빌드
npm run build
```
