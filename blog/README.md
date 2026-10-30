# Wondering Willow

Mark Nenadov's blog, styled to match [marknenadov.com](https://marknenadov.com). Built with Next.js and Tailwind CSS.

## Commands

- `bun run dev` - start the development server
- `bun run build` - production build
- `bun run lint` - lint
- `bun run test` - run the tests
- `bun run typecheck` - check types

Run these from this folder. The blog is a self-contained app, deployed as its own Vercel project with `blog` as the Root Directory.

## Layout

- `content/posts.json` - post metadata, newest first
- `content/posts/*.html`, `content/pages/about.html` - post and page bodies
- `lib/site.ts` - site name and domain, both in one place
- `app/globals.css` - design tokens shared with marknenadov.com and the post typography
