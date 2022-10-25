module.exports = {
  extends: ["next", "prettier", "next/core-web-vitals"],
  plugins: ["simple-import-sort", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "prettier/prettier": ["error"],
    "no-unused-vars": "error",
    "prefer-const": "error",
    semi: "off",
    "no-empty-function": "error",
    "no-duplicate-imports": "error",
    "newline-after-var": "error",
  },
};
