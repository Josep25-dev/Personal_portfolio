1. For significant changes, always update the version using `pnpm version patch/minor/major`.
2. Adding comments in the source code is prohibited.
3. Use Clerk components and rules for authentication and route protection.
4. Do not delete code unless it is unnecessary for the project's operation.
5. Remove all `console.log` statements before committing.
6. Prioritize React Server Components by default; use `'use client'` only for interactivity.
7. Avoid `any` in TypeScript; define explicit interfaces or types for props and variables.
8. Use the `Image` component from `next/image` instead of `<img>` for automatic optimization.
9. Prefer Server Actions over traditional API routes for data mutations and forms.
10. Follow naming conventions: PascalCase for components, camelCase for functions/variables, and kebab-case for files.