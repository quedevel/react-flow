## Folder structure

```scss
/src (워크스페이스/프로젝트)
  │── assets/               # 이미지, 아이콘, 폰트 등 정적 리소스
  │── components/           # 공통 UI 컴포넌트
  ├── features/             # 도메인별 구성
  │   ├── editor/           # 예: editor 도메인
  │   │   ├── components/   # editor 전용 컴포넌트
  │   │   └── hooks/        # editor 관련 훅
  │   │── executions/       # 예: executions 도메인
  │   │   ├── components/   # executions 전용 컴포넌트
  │   │   └── hooks/        # executions 관련 훅
  ├── pages/                # 라우트 단위 페이지
  │── hooks/                # 공통 커스텀 훅
  │── context/              # 상태 관리 (React Context, Recoil, Zustand 등)
  ├── services/             # API 통신 관련 함수 모음 (axios 인스턴스 등)
  │── utils/                # 유틸리티 함수
  │── types/                # TypeScript 타입 정의
  │── App.tsx
  │── index.tsx             # 엔트리포인트
```

## Naming Convention

* kebab-case

```scss
// basic-flow.tsx
function BasicFlow(){ ... }
export default BasicFlow;

// use-flow.ts
function UseFlow(){ ... }
export default UseFlow;
```

## VSCode Coding Formatter

1. File > Preferences > Settings
2. Search settings 'default formatter' > [Prettier - Code formatter]
3. Search settings 'format on' > Check [Format On Paste], [Format On Save]

## Commit message convention

* 타입

| type     | description                 |
|----------|-----------------------------|
| feat     | 새로운 기능 추가                   |
| fix      | 버그수정                        |
| docs     | 문서 관련 변경                    |
| style    | 코드 포맷팅, 세미콜론 누락 등 스타일 관련 변경 |
| refactor | 코드 리팩토링                     |
| test     | 테스트 관련 코드 추가 또는 수정          |
| chore    | 빌드, 배포 패키지 관리 등의 기타 변경      |