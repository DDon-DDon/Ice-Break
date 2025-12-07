module.exports = {
    forbidden: [
        {
            name: 'no-circular',
            severity: 'error',
            comment: '순환 의존성을 금지합니다',
            from: {},
            to: { circular: true }
        },
        {
            name: 'no-orphans',
            severity: 'warn',
            comment: '고아 모듈(아무에게도 import되지 않는 모듈)을 경고합니다',
            from: { orphan: true },
            to: {}
        },
        {
            name: 'not-to-test',
            severity: 'error',
            comment: '테스트 파일을 프로덕션 코드에서 import하지 않습니다',
            from: { pathNot: '\\.test\\.jsx?$' },
            to: { path: '\\.test\\.jsx?$' }
        }
    ],
    options: {
        doNotFollow: {
            path: 'node_modules'
        },
        tsPreCompilationDeps: false,
        enhancedResolveOptions: {
            exportsFields: ['exports'],
            conditionNames: ['import', 'require', 'node', 'default']
        },
        reporterOptions: {
            dot: {
                collapsePattern: 'node_modules/[^/]+'
            }
        }
    }
};
