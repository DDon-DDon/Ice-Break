#!/bin/bash
# ============================================
# 코드 분석 시스템 - 메인 실행 스크립트
# ============================================
# 사용법: ./scripts/analyze.sh [옵션]
# 옵션:
#   all      - 모든 분석 실행 (기본값)
#   deps     - 의존성 분석만
#   quality  - 코드 품질 분석만
#   coverage - 테스트 커버리지만
#   docs     - 문서 생성만
# ============================================

set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 프로젝트 루트 디렉토리
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
ANALYSIS_DIR="$PROJECT_ROOT/docs/analysis"

# 유틸리티 함수
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 분석 디렉토리 생성
setup_directories() {
    log_info "분석 결과 디렉토리 생성 중..."
    mkdir -p "$ANALYSIS_DIR"
    mkdir -p "$ANALYSIS_DIR/duplication"
    mkdir -p "$ANALYSIS_DIR/plato-report"
    mkdir -p "$ANALYSIS_DIR/coverage"
    log_success "디렉토리 생성 완료"
}

# ============================================
# Phase 1: 의존성 분석
# ============================================
run_dependency_analysis() {
    log_info "=== Phase 1: 의존성 분석 시작 ==="
    
    # 1.1 npm ls
    log_info "npm 패키지 의존성 트리 생성..."
    npm ls --all > "$ANALYSIS_DIR/npm-dependency-tree.txt" 2>&1 || true
    log_success "npm-dependency-tree.txt 생성됨"
    
    # 1.2 madge - 모듈 의존성 그래프
    log_info "madge: 모듈 의존성 그래프 생성..."
    if npx madge --image "$ANALYSIS_DIR/dependency-graph.svg" src/main.jsx 2>/dev/null; then
        log_success "dependency-graph.svg 생성됨"
    else
        log_warn "madge SVG 생성 실패 (graphviz 필요할 수 있음)"
    fi
    
    # madge JSON 출력
    npx madge --json src/main.jsx > "$ANALYSIS_DIR/dependency-graph.json" 2>/dev/null || true
    log_success "dependency-graph.json 생성됨"
    
    # 순환 의존성 탐지
    log_info "madge: 순환 의존성 탐지..."
    npx madge --circular src/ > "$ANALYSIS_DIR/circular-deps.txt" 2>&1 || true
    log_success "circular-deps.txt 생성됨"
    
    # 1.3 dependency-cruiser
    log_info "dependency-cruiser: 의존성 규칙 검증..."
    npx depcruise src --config .dependency-cruiser.cjs --output-type html > "$ANALYSIS_DIR/dependency-report.html" 2>/dev/null || true
    log_success "dependency-report.html 생성됨"
    
    # dependency-cruiser JSON
    npx depcruise src --config .dependency-cruiser.cjs --output-type json > "$ANALYSIS_DIR/dependency-cruiser.json" 2>/dev/null || true
    log_success "dependency-cruiser.json 생성됨"
    
    log_success "=== Phase 1: 의존성 분석 완료 ==="
}

# ============================================
# Phase 2: 코드 품질 분석
# ============================================
run_quality_analysis() {
    log_info "=== Phase 2: 코드 품질 분석 시작 ==="
    
    # 2.1 jscpd - 중복 코드 탐지
    log_info "jscpd: 중복 코드 탐지..."
    npx jscpd src --reporters html,console --output "$ANALYSIS_DIR/duplication" 2>/dev/null || true
    log_success "중복 코드 리포트 생성됨"
    
    # 2.2 plato - 복잡도 리포트
    log_info "plato: 복잡도 분석..."
    npx plato -r -d "$ANALYSIS_DIR/plato-report" src 2>/dev/null || true
    log_success "plato-report 생성됨"
    
    # 2.3 ESLint 복잡도 검사 (결과를 파일로 저장)
    log_info "eslint: 코드 린트 검사..."
    npx eslint src --format json > "$ANALYSIS_DIR/eslint-report.json" 2>/dev/null || true
    log_success "eslint-report.json 생성됨"
    
    log_success "=== Phase 2: 코드 품질 분석 완료 ==="
}

# ============================================
# Phase 3: 테스트 커버리지
# ============================================
run_coverage_analysis() {
    log_info "=== Phase 3: 테스트 커버리지 분석 시작 ==="
    
    # vitest 커버리지 실행
    log_info "vitest: 테스트 커버리지 측정..."
    npx vitest run --coverage --reporter=json --outputFile="$ANALYSIS_DIR/test-results.json" 2>/dev/null || true
    log_success "테스트 커버리지 완료"
    
    log_success "=== Phase 3: 테스트 커버리지 완료 ==="
}

# ============================================
# Phase 4: 문서 생성
# ============================================
run_documentation() {
    log_info "=== Phase 4: 문서 생성 시작 ==="
    
    # Call Stack 분석
    log_info "Call Stack 분석 문서 생성..."
    node "$SCRIPT_DIR/generate-call-graph.js" 2>/dev/null || true
    
    # 파일별 분석 문서
    log_info "파일별 분석 문서 생성..."
    node "$SCRIPT_DIR/generate-file-docs.js" 2>/dev/null || true
    
    log_success "=== Phase 4: 문서 생성 완료 ==="
}

# ============================================
# 결과 요약 출력
# ============================================
print_summary() {
    echo ""
    echo "============================================"
    echo -e "${GREEN}분석 완료!${NC}"
    echo "============================================"
    echo ""
    echo "생성된 리포트:"
    echo "  📁 $ANALYSIS_DIR/"
    echo ""
    
    if [ -f "$ANALYSIS_DIR/dependency-graph.svg" ]; then
        echo "  ✅ dependency-graph.svg (의존성 시각화)"
    fi
    if [ -f "$ANALYSIS_DIR/dependency-report.html" ]; then
        echo "  ✅ dependency-report.html (의존성 검증)"
    fi
    if [ -f "$ANALYSIS_DIR/circular-deps.txt" ]; then
        echo "  ✅ circular-deps.txt (순환 의존성)"
    fi
    if [ -d "$ANALYSIS_DIR/duplication" ]; then
        echo "  ✅ duplication/ (중복 코드)"
    fi
    if [ -d "$ANALYSIS_DIR/plato-report" ]; then
        echo "  ✅ plato-report/ (복잡도 분석)"
    fi
    if [ -f "$ANALYSIS_DIR/call-stack.md" ]; then
        echo "  ✅ call-stack.md (Call Stack)"
    fi
    if [ -f "$ANALYSIS_DIR/file-analysis.md" ]; then
        echo "  ✅ file-analysis.md (파일별 분석)"
    fi
    
    echo ""
    echo "HTML 리포트를 브라우저에서 확인하세요!"
    echo "============================================"
}

# ============================================
# 메인 실행
# ============================================
main() {
    cd "$PROJECT_ROOT"
    
    local mode="${1:-all}"
    
    echo ""
    echo "============================================"
    echo -e "${BLUE}🔍 코드 분석 시스템${NC}"
    echo "    모드: $mode"
    echo "============================================"
    echo ""
    
    setup_directories
    
    case "$mode" in
        deps)
            run_dependency_analysis
            ;;
        quality)
            run_quality_analysis
            ;;
        coverage)
            run_coverage_analysis
            ;;
        docs)
            run_documentation
            ;;
        all|*)
            run_dependency_analysis
            run_quality_analysis
            run_coverage_analysis
            run_documentation
            ;;
    esac
    
    print_summary
}

main "$@"
