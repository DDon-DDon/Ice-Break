/**
 * Call Stack 분석 문서 생성 스크립트
 * madge를 사용하여 모듈 의존성을 분석하고 Markdown 문서로 출력합니다.
 */

import madge from 'madge';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const outputFile = path.join(projectRoot, 'docs/analysis/call-stack.md');

async function generateCallGraph() {
    console.log('🔍 Call Stack 분석 시작...');

    try {
        const res = await madge(path.join(projectRoot, 'src/main.jsx'), {
            baseDir: projectRoot,
            fileExtensions: ['js', 'jsx']
        });

        const deps = res.obj();
        const circular = res.circular();

        let md = `# Call Stack 분석 (${new Date().toLocaleString('ko-KR')})\n\n`;

        // 순환 의존성 경고
        if (circular.length > 0) {
            md += `## ⚠️ 순환 의존성 발견\n\n`;
            md += `\`\`\`\n`;
            circular.forEach(cycle => {
                md += cycle.join(' → ') + ' → ' + cycle[0] + '\n';
            });
            md += `\`\`\`\n\n`;
        } else {
            md += `## ✅ 순환 의존성 없음\n\n`;
        }

        // 엔트리 포인트부터 의존성 트리
        md += `## 모듈 의존성 트리\n\n`;
        md += `\`\`\`\n`;
        md += `Entry Point: src/main.jsx\n`;

        // 재귀적으로 트리 생성
        const visited = new Set();
        function buildTree(file, indent = 0) {
            const prefix = '  '.repeat(indent) + (indent > 0 ? '└── ' : '');
            let result = prefix + file + '\n';

            if (visited.has(file)) {
                return result.replace('\n', ' (이미 표시됨)\n');
            }
            visited.add(file);

            const children = deps[file] || [];
            children.forEach((child, i) => {
                result += buildTree(child, indent + 1);
            });

            return result;
        }

        // main.jsx부터 시작
        Object.keys(deps).forEach(file => {
            if (file.includes('main.jsx')) {
                md += buildTree(file);
            }
        });

        md += `\`\`\`\n\n`;

        // 모듈 상세 목록
        md += `## 모듈 상세 목록\n\n`;
        md += `| 모듈 | 가져오는 모듈 수 | 의존 모듈 |\n`;
        md += `|------|-----------------|----------|\n`;

        Object.entries(deps).forEach(([file, imports]) => {
            const importList = imports.length > 0 ? imports.join(', ') : '-';
            md += `| \`${file}\` | ${imports.length} | ${importList} |\n`;
        });

        md += `\n## 통계\n\n`;
        md += `- **총 모듈 수**: ${Object.keys(deps).length}\n`;
        md += `- **순환 의존성**: ${circular.length}개\n`;

        // 파일 저장
        fs.mkdirSync(path.dirname(outputFile), { recursive: true });
        fs.writeFileSync(outputFile, md, 'utf8');
        console.log(`✅ Call Stack 분석 완료: ${outputFile}`);

    } catch (error) {
        console.error('❌ Call Stack 분석 실패:', error.message);

        // 기본 문서 생성
        const fallbackMd = `# Call Stack 분석\n\n분석 중 오류가 발생했습니다: ${error.message}\n\nmadge 설치를 확인해주세요:\n\`\`\`bash\nnpm install\n\`\`\`\n`;
        fs.mkdirSync(path.dirname(outputFile), { recursive: true });
        fs.writeFileSync(outputFile, fallbackMd, 'utf8');
    }
}

generateCallGraph();
