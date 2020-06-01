## 진행 순서

1. master - 앱 개발
2. 1_why-ts - 왜 타입스크립트를 쓰면 좋은가?

   - 유지 보수를 위한 문서화와 JSDoc
     - `$` 함수에 JSDoc 하면서 좋아지는 VSCode 인텔리센스 확인 및 소개
     - `handleListClick`의 `event`인자의 변수 타이핑 후 좋아지는점 소개
     - `@typedef`를 이용하여 `setDeathList` 함수, `setTotalDeathsByCountry`의 인자 타이핑 하는 방법 소개
     - `@typedef`를 이용한 API 함수의 타이핑 방법 소개
   - `@ts-check` 적용

     - 이전 작업으로 인해 타입 오류 나는 부분 확인 및 설명
     - 아래 코드 추가 후 설명

     ```js
     // @ts-check
     let a = 10;
     a = 'hi';
     ```

   - `TSLint` 플러그인 등

3. 2_ts-setup - 타입스크립트 환경 설정

   - NPM 초기화
   - Typescript 설치
   - 타입스크립트 설정 파일 생성 후 아래 내용 추가. [참고](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)

   ```json
   {
     "compilerOptions": {
       "outDir": "./built",
       "allowJs": true,
       "target": "es5",
       "moduleResolution": "node"
     },
     "include": ["./src/**/*"]
   }
   ```

   - js 파일을 `src` 폴더로 이동 후 ts 파일로 변환
   - `package.json` 파일에 아래 빌드 명령어 추가 후 빌드

   ```json
   "scripts": {
      "build": "tsc"
   }
   ```

   - 빌드 명령어 실행 후 결과물 확인. 콘솔에 오류는 뜨나 빌드는 완료됨
     - 현재 나오는 오류는 `axios`, `Chart` 관련 라이브러리 오류이므로 해결하는 방법은 강의 후반부의 "ts에 외부 라이브러리 사용하는 방법(타입 선언 파일)"에서 다루는 것으로 안내

4. 3_explicit-any - 명시적인 타입 선언하기. any라도 좋다..!

   - 타입스크립트 설정 파일에 아래 내용을 추가

   ```json
   {
     "compilerOptions": {
       // ...
       "noImplicitAny": true
     }
   }
   ```

   - 위 내용 추가 후 빌드 했을 때 이전 빌드에서 나오지 않았던 타입 에러들을 안내 후 몇 개 같이 살펴보기
   - 타입스크립트 빌드 명령어를 쳤을 때 에러를 확인하는 것보다 파일을 열었을 때 코드에서 바로 에러를 확인할 수 있게 ESLint with Typescript 환경 설정

     - ESLint 라이브러리와 린트 규칙 추가 설정

     ```bash
     npm i -D @babel/core @babel/preset-env @babel/preset-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint prettier eslint-plugin-prettier
     ```

     - ESLint 설정 파일 추가

     ```js
     // .eslintrc.js
     module.exports = {
       root: true,
       env: {
         browser: true,
         node: true,
       },
       extends: [
         'eslint:recommended',
         'plugin:@typescript-eslint/eslint-recommended',
         'plugin:@typescript-eslint/recommended',
       ],
       plugins: ['prettier', '@typescript-eslint'],
       rules: {
         'prettier/prettier': [
           'error',
           {
             singleQuote: true,
             semi: true,
             useTabs: false,
             tabWidth: 2,
             printWidth: 80,
             bracketSpacing: true,
             arrowParens: 'avoid',
           },
         ],
         '@typescript-eslint/no-explicit-any': 'off',
       },
       parserOptions: {
         parser: '@typescript-eslint/parser',
       },
     };
     ```

     - ESLint 이그노어 파일 추가

     ```
     // .eslintignore
     node_modules
     ```

     - VSCode의 Settings.json 파일에 아래 내용 추가

     ```json
     "eslint.workingDirectories": [{"mode": "auto"}],
     ```

     - ESLint 오류 제거 (여기서 포인트는 바로 모르겠으면 다 any 아니면 string 등 최대한 단순한 타입으로 정리)

       - ESLint 적용 후 함수 반환 타입에 명시적으로 `any` 선언 및 함수 선언 순서 정리 위주로 정리
       - 함수 파라미터 타입 정의 ex) string, any, number 등
       - axios 라이브러리 설치 및 `@types` 라이브러리 설명 및 안내. 아래 내용은 axios 라이브러리 인식을 위해 필요

       ```json
       "compilerOptions": {
          "moduleResolution": "node",
        }
       ```

       - Chart 라이브러리는 index.d.ts에 한번 직접 정의해보자~

         - 일단 chart.js를 NPM으로 설치해야함 `npm i chart.js`
         - `tsconfig`에 아래 추가

         ```json
         "compilerOptions": {
           "typeRoots": [ "./types", "./node_modules/@types"]
         },
         "exclude": ["node_modules", "types"]
         ```

         - 루트 폴더에 `types/chart.js` 만든 후 `index.d.ts`에 아래 내용 추가

         ```js
         declare module 'chart.js';
         ```

       - `app.ts`에 `import Chart from 'chart.js'` 구문 추가
       - Promise, DOM 관련 빌드 에러 확인 후 에러 내용 순차적으로 추가

       ```json
       "compilerOptions": {
         "lib": ["es2015", "dom", "dom.iterable"]
       }
       ```

       - 빌드 확인
