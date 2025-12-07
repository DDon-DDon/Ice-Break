# 코드 분석 시스템 가이드

## 📦 설치

WSL 터미널에서 다음 명령 실행:

```bash
cd /mnt/c/Users/isakq/OneDrive/Desktop/my_github/Ice-Break/iskim/broken-translator

# 분석 도구 설치
npm install
```

## 🚀 실행

### 전체 분석 실행
```bash
npm run analyze
# 또는
./scripts/analyze.sh all
```

### 개별 분석
```bash
# 의존성만
npm run analyze:deps

# 코드 품질만
npm run analyze:quality

# 커버리지만
npm run analyze:coverage

# 문서만
npm run analyze:docs
```

## 📊 결과 확인

분석 결과는 `docs/analysis/` 디렉토리에 생성됩니다:

| 파일 | 설명 |
|------|------|
| `dependency-graph.svg` | 모듈 의존성 시각화 |
| `dependency-report.html` | 의존성 검증 리포트 |
| `circular-deps.txt` | 순환 의존성 목록 |
| `duplication/` | 중복 코드 리포트 |
| `plato-report/` | 복잡도 분석 |
| `coverage/` | 테스트 커버리지 |
| `call-stack.md` | Call Stack 분석 |
| `file-analysis.md` | 파일별 상세 분석 |

## 🛠 도구 목록

1. **madge** - 모듈 의존성 그래프
2. **dependency-cruiser** - 아키텍처 규칙 검증
3. **jscpd** - 중복 코드 탐지
4. **plato** - 복잡도/유지보수성 리포트
5. **vitest coverage (c8)** - 테스트 커버리지
6. **eslint complexity** - Cyclomatic Complexity

## ⚠️ 참고사항

- Graphviz 설치 시 SVG 생성 가능: `sudo apt install graphviz`
- WSL 환경에서 실행 권장
