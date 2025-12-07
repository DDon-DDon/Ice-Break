/**
 * 파일별 분석 문서 생성 스크립트
 * 각 소스 파일의 구조와 역할을 분석하여 Markdown 문서로 출력합니다.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.join(projectRoot, 'src');
const outputFile = path.join(projectRoot, 'docs/analysis/file-analysis.md');

/**
 * 파일 분석
 */
function analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const relativePath = path.relative(projectRoot, filePath);

    // Import 문 추출
    const imports = lines
        .filter(l => l.trim().startsWith('import'))
        .map(l => l.trim());

    // Export 문 추출
    const exports = lines
        .filter(l => l.includes('export'))
        .map(l => l.trim().substring(0, 60) + (l.length > 60 ? '...' : ''));

    // 함수/컴포넌트 추출
    const functionMatches = content.match(/function\s+(\w+)|const\s+(\w+)\s*=\s*\(|const\s+(\w+)\s*=\s*async/g) || [];
    const functions = functionMatches.map(f => {
        const match = f.match(/function\s+(\w+)|const\s+(\w+)/);
        return match ? (match[1] || match[2]) : f;
    });

    // React 컴포넌트 확인
    const isReactComponent = content.includes('import React') ||
        content.includes('from \'react\'') ||
        content.includes('from "react"') ||
        content.includes('useState') ||
        content.includes('useEffect');

    // JSX 사용 여부
    const hasJSX = content.includes('<') && content.includes('/>') ||
        content.includes('</');

    return {
        path: relativePath,
        lineCount: lines.length,
        imports,
        exports,
        functions,
        isReactComponent,
        hasJSX,
        size: content.length
    };
}

/**
 * 디렉토리 재귀 탐색
 */
function walkDir(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.startsWith('.')) {
                walkDir(filePath, fileList);
            }
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            if (!file.includes('.test.')) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

/**
 * 메인 실행
 */
function generateDocs() {
    console.log('📄 파일별 분석 문서 생성 시작...');

    const files = walkDir(srcDir);
    const analyses = files.map(analyzeFile);

    let md = `# 파일별 분석 문서\n\n`;
    md += `> 생성일: ${new Date().toLocaleString('ko-KR')}\n\n`;

    // 요약 통계
    md += `## 📊 프로젝트 요약\n\n`;
    md += `| 항목 | 값 |\n`;
    md += `|------|----|\n`;
    md += `| 총 파일 수 | ${analyses.length} |\n`;
    md += `| 총 라인 수 | ${analyses.reduce((sum, a) => sum + a.lineCount, 0).toLocaleString()} |\n`;
    md += `| React 컴포넌트 | ${analyses.filter(a => a.isReactComponent).length} |\n`;
    md += `| 서비스 모듈 | ${analyses.filter(a => a.path.includes('services')).length} |\n`;

    md += `\n---\n\n`;

    // 디렉토리별 그룹화
    const groups = {
        'src (루트)': [],
        'components': [],
        'services': [],
        'assets': [],
        'other': []
    };

    analyses.forEach(a => {
        if (a.path.includes('components')) {
            groups['components'].push(a);
        } else if (a.path.includes('services')) {
            groups['services'].push(a);
        } else if (a.path.includes('assets')) {
            groups['assets'].push(a);
        } else if (a.path.startsWith('src/')) {
            groups['src (루트)'].push(a);
        } else {
            groups['other'].push(a);
        }
    });

    // 각 그룹별 문서화
    Object.entries(groups).forEach(([groupName, files]) => {
        if (files.length === 0) return;

        md += `## 📁 ${groupName}\n\n`;

        files.forEach(file => {
            md += `### \`${path.basename(file.path)}\`\n\n`;
            md += `**경로**: \`${file.path}\`\n\n`;

            // 파일 타입 뱃지
            const badges = [];
            if (file.isReactComponent) badges.push('⚛️ React');
            if (file.hasJSX) badges.push('📦 JSX');
            if (file.path.includes('test')) badges.push('🧪 테스트');
            if (badges.length > 0) {
                md += `**타입**: ${badges.join(' | ')}\n\n`;
            }

            md += `**통계**:\n`;
            md += `- 라인 수: ${file.lineCount}\n`;
            md += `- 크기: ${(file.size / 1024).toFixed(2)} KB\n`;
            md += `- 함수/컴포넌트: ${file.functions.length}개\n\n`;

            if (file.imports.length > 0) {
                md += `**Import** (${file.imports.length}개):\n`;
                md += `\`\`\`javascript\n`;
                file.imports.slice(0, 10).forEach(imp => {
                    md += `${imp}\n`;
                });
                if (file.imports.length > 10) {
                    md += `// ... ${file.imports.length - 10}개 더\n`;
                }
                md += `\`\`\`\n\n`;
            }

            if (file.functions.length > 0) {
                md += `**주요 함수/컴포넌트**:\n`;
                file.functions.forEach(fn => {
                    md += `- \`${fn}\`\n`;
                });
                md += `\n`;
            }

            md += `---\n\n`;
        });
    });

    // 파일 저장
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, md, 'utf8');
    console.log(`✅ 파일별 분석 완료: ${outputFile}`);
}

generateDocs();
