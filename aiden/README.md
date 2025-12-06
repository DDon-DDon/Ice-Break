### 🔥 Cozy Fire

- 불안한 국제 정세, 치솟는 생활 물가 안정을 위한 차세대 난방 시스템!
- 올 겨울 극한의 가성비로 지갑이 가벼워진 서민을 위한 차세대 가정용 난방기 :o


## 📁 프로젝트 개요

### 💻 [Cozy Fire](./cozy-fire/)
**Electron으로 만든 크로스 플랫폼 네이티브 데스크탑 어플리케이션**
> Because why not?, we just think and make it!


## 📦 Download
일렉트론 기반으로 만든 쓸모없지만 은근 재미있는 네이티브 앱!

[![Download](https://img.shields.io/badge/🪟_Windows-Download-blue?logo=windows)](https://github.com/DDon-DDon/Ice-Break/releases/download/v1.0.1-app/firebox.Setup.1.0.1.exe)

[![Download](https://img.shields.io/badge/macOS-Download-black?logo=apple)](https://github.com/DDon-DDon/Ice-Break/releases/download/v1.0.1-app/firebox-1.0.1-arm64.dmg)

[![Download](https://img.shields.io/badge/Linux-Download-orange?logo=linux)](https://github.com/DDon-DDon/Ice-Break/releases/download/v1.0.1-app/firebox-1.0.1.AppImage)

---


**주요 기능:**
- ⚡ Windows, Mac OS, Linux에서 사용 가능한 애플리케이션!!!
- 🧊 자바스크립트 및 표준 HTML/CSS/JS를 지원하여 풍부한 디자인 리소스 및 일관된 인터페이스로 사용자 경험 관리 가능 (Windows / macOS / Linux)
- 🎛️ 각 플랫폼 별 네이티브 애플리케이션 보다 무거울 수 있지만, 배포는 빨랐죠?
- 💥 "난 자바스크립트만 쓴거 같은데" 운영체제 별로 '잘' 돌아 간다? (개발자 밥그릇 주의)

**기술 스택:**
- Electron
- Node.js (with IPC 통신)

<br/>

**확장 가능 기술 스택:**
- React + Vite
- TypeScript
- Tailwind CSS
- Electron Builder
- 기타 웬만한 웹 프레임워크 기술 스텍 접목 가능함
- 운영체제 별로 c/c++ 모듈을 통해 운영체제 특화 기능을 별도 개발할 수도 있음

---

## 🛠 실행 방법

```bash
cd cozy-fire
npm install
npm run start
```

---

## 📦 빌드 방법 (Default)

```bash
cd cozy-fire
npm install
npm run dist
```

> 빌드 결과물은 dist/ 폴더에 생성되며 개발 환경 OS에 맞게 인스톨러가 생성됩니다.

## 📦 OS 맞춤 빌드

- `macOS`

```bash
npm run build:mac
```

- `Windows`
```bash
npm run build:win
```

- `Linux`
```bash
npm run build:linux
```

## 🚀 CI/CD
- CI: GitHub Actions (자동 빌드 & 테스트) (할 예정)
- CD: Electron Builder + GitHub Releases 자동 배포 (할 예정)


## 📝 라이선스
- MIT




