import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Yarn SDK shims are vendored tooling, not our source.
    ".yarn/**",
    // KB useAd 참고 코드 (gitignore, 사이트 소스 아님)
    "useAd/**",
  ]),
]);

export default eslintConfig;
