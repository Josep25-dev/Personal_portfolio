---
name: nextjs-best-practices
description: Enforces Next.js 16 best practices for App Router, React Server Components, caching, routing, TypeScript, and performance. Use when building, reviewing, or refactoring Next.js applications, creating pages/layouts/routes, configuring next.config.ts, handling data fetching, or working with server/client components.
---

# Next.js 16 Best Practices

## Architecture: Server vs Client Components

- Default to Server Components; add `'use client'` only at interactive leaf nodes
- Push `'use client'` as deep in the tree as possible to minimize client JS
- Never fetch data or access server resources in Client Components
- Compose: wrap Client Components with Server Component data-passing, not the reverse

```tsx
// ✅ Server Component fetches, Client Component is interactive leaf
async function ProductPage({ id }: { id: string }) {
  const product = await fetchProduct(id);
  return <AddToCartButton product={product} />;
}

// ✅ Client leaf
'use client';
export function AddToCartButton({ product }: { product: Product }) { ... }
```

## Caching: Opt-In with `"use cache"`

Caching is **opt-in** in Next.js 16 — all code executes dynamically by default.

```ts
// next.config.ts
const nextConfig = { cacheComponents: true };
export default nextConfig;
```

```tsx
// Cache a page, component, or function
'use cache';
import { cacheLife } from 'next/cache';

export async function getProducts() {
  cacheLife('hours');
  return await db.products.findAll();
}
```

### Cache Invalidation APIs

| Scenario | API |
|---|---|
| Static content, eventual consistency | `revalidateTag('tag', 'max')` |
| User action, read-your-writes | `updateTag('tag')` in Server Action |
| Uncached dynamic data refresh | `refresh()` in Server Action |

```ts
'use server';
import { updateTag } from 'next/cache';

export async function saveProfile(userId: string, data: Profile) {
  await db.users.update(userId, data);
  updateTag(`user-${userId}`); // User sees changes immediately
}
```

## Routing & Navigation

### File Conventions

```
app/
├── layout.tsx          # Root layout (required)
├── page.tsx            # Route segment
├── loading.tsx         # Suspense fallback
├── error.tsx           # Error boundary ('use client' required)
├── not-found.tsx       # 404 handler
└── (group)/            # Route group (no URL segment)
    └── page.tsx
```

### Async Params (Breaking Change in v16)

```tsx
// ✅ v16 — params and searchParams are async
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { slug } = await params;
  const { q } = await searchParams;
}
```

### Parallel Routes

All parallel route slots require an explicit `default.tsx`:

```tsx
// app/@modal/default.tsx
export default function Default() { return null; }
```

## Async APIs (Breaking Change in v16)

```ts
// ✅ All must be awaited
import { cookies, headers, draftMode } from 'next/headers';

const cookieStore = await cookies();
const headersList = await headers();
const { isEnabled } = await draftMode();
```

## `proxy.ts` (replaces `middleware.ts`)

```ts
// proxy.ts (root of project)
import { NextRequest, NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
  if (!request.cookies.get('token')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = { matcher: ['/dashboard/:path*'] };
```

> `middleware.ts` is deprecated — rename to `proxy.ts` and rename the export to `proxy`.

## Performance

### Streaming with Suspense

Data must be fetched **inside** the Suspense boundary for streaming to work.
Create an async loader component — never fetch above Suspense and pass data down:

```tsx
// ✅ Async loader fetches INSIDE Suspense — skeleton streams while data loads
async function DataLoader() {
  const items = await getItems()
  return <ItemList items={items} />
}

export default function Page() {
  return (
    <>
      <StaticHeader />
      <Suspense fallback={<Skeleton />}>
        <DataLoader />
      </Suspense>
    </>
  )
}

// ❌ BAD — fetching ABOVE Suspense defeats streaming
export default async function Page() {
  const items = await getItems() // blocks entire page
  return (
    <Suspense fallback={<Skeleton />}>
      <ItemList items={items} /> {/* skeleton never shows */}
    </Suspense>
  )
}
```

### Query Layer (`lib/queries/`)

Separate read queries into `lib/queries/` — never call the ORM directly in page components:

```ts
// lib/queries/todos.ts
import { prisma } from '@/lib/prisma'
import type { Priority, Todo } from '@/lib/types'

export async function getTodos(priorityFilter?: Priority): Promise<Todo[]> {
  return prisma.todo.findMany({
    where: priorityFilter ? { priority: priorityFilter } : undefined,
    orderBy: { createdAt: 'desc' },
  })
}
```

Pages import from query functions; Server Actions handle mutations in `actions/`.

### Constants-First

Never hardcode enum values — derive from shared constants:

```ts
// ✅ Derive from single source of truth
import { PRIORITY_OPTIONS } from '@/lib/constants/priorities'
const VALID_PRIORITIES = new Set(PRIORITY_OPTIONS.map((o) => o.value))

// ❌ BAD — hardcoded, will drift from schema
const VALID_PRIORITIES = new Set(['LOW', 'MEDIUM', 'HIGH'])
```

### React Compiler (Stable)

Enables automatic memoization — eliminates manual `useMemo`/`useCallback`:

```ts
// next.config.ts
const nextConfig = { reactCompiler: true };
```

```bash
pnpm add babel-plugin-react-compiler@latest
```

### Turbopack (Default)

Turbopack is now the default bundler. Remove conflicting Webpack configs or opt out:

```bash
next dev --webpack   # Opt out of Turbopack
```

Enable filesystem caching for large projects:

```ts
experimental: { turbopackFileSystemCacheForDev: true }
```

## TypeScript

- Target TypeScript 5.1+, Node.js 20.9+
- Define explicit return types on all async functions
- Use `Promise<PageProps>` types for params/searchParams
- Use `next.config.ts` (TypeScript native config)

```ts
// ✅ Typed route handler
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;
  const data = await fetchById(id);
  return Response.json(data);
}
```

## Image Optimization

```tsx
import Image from 'next/image';

// Remote images require remotePatterns (not deprecated domains)
// next.config.ts
images: {
  remotePatterns: [{ protocol: 'https', hostname: 'example.com' }],
}
```

## Server Actions

```ts
'use server';

export async function createPost(formData: FormData): Promise<void> {
  const title = formData.get('title') as string;
  await db.posts.create({ title });
  updateTag('posts');
}
```

- Colocate with the component or in a dedicated `actions/` directory
- Always validate and sanitize inputs
- Use `updateTag` for read-your-writes after mutations

## Environment & Config

```ts
// next.config.ts — use env vars, not deprecated serverRuntimeConfig/publicRuntimeConfig
const nextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.example.com' }],
  },
};

export default nextConfig;
```


FOR SSR BEST PRACTICES LOOK HERE:
/.cursor/skills/nextjs-best-practices/ssr-best-practices


## Breaking Changes Checklist (v15 → v16)

- [ ] `params` / `searchParams` → `await params` / `await searchParams`
- [ ] `cookies()` / `headers()` / `draftMode()` → add `await`
- [ ] `middleware.ts` → rename to `proxy.ts`, export `proxy` function
- [ ] `revalidateTag('tag')` → `revalidateTag('tag', 'max')`
- [ ] `experimental.dynamicIO` → `cacheComponents: true`
- [ ] `experimental.ppr` → removed; use Cache Components
- [ ] `images.domains` → `images.remotePatterns`
- [ ] Parallel routes missing `default.tsx` → add for all slots
- [ ] `serverRuntimeConfig` / `publicRuntimeConfig` → use `.env` files
- [ ] Remove `next lint` from CI → use `eslint` or `biome` directly

## Additional Resources

- [Next.js 16 Release Notes](https://nextjs.org/blog/next-16)
- [Upgrade Guide v16](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Cache Components Docs](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents)
- [proxy.ts Docs](https://nextjs.org/docs/app/getting-started/proxy)
- [DevTools MCP](https://nextjs.org/docs/app/guides/mcp)