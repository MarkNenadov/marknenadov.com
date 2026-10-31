# Wondering Willow

Mark Nenadov's blog, styled to match [marknenadov.com](https://marknenadov.com). Built with Next.js and Tailwind CSS.

## Commands

- `bun run dev` - start the development server
- `bun run build` - production build
- `bun run lint` - lint
- `bun run test` - run the tests
- `bun run typecheck` - check types

Run these from this folder. The blog is a self-contained app, deployed as its own Vercel project with `blog` as the Root Directory.

## Writing a post

Add a Markdown file to `content/posts/` and push to `main`. The filename becomes the address, so `my-new-post.md` is published at `/my-new-post`.

```markdown
---
title: 💡 My Post Title
date: 2026-10-31
tags: [developer-life, career]
summary: One sharp sentence, shown on the home page and in share previews.
---

The post, in plain **Markdown**.

## A section heading

> A quote.

> Lyrics, with a line break\
> on the second line.

![Describe the image](/images/my-image.png)
```

- `title`, `date`, and `summary` are required, and `tags` is optional. A leading emoji in the title is optional too.
- Put images in `public/images/`.
- Posts sort by date, and the home page, tags, feeds, share card, and newer/older links all update themselves.
- A mistake in the frontmatter fails the build with a message naming the file, so nothing broken gets published.
- Preview with `bun run dev`.

## Layout

- `content/posts/*.md` - posts
- `content/posts/*.html`, `content/posts.json` - older posts imported from the willow.camp archive, as HTML with their metadata in one file
- `content/pages/about.html` - the About page
- `lib/site.ts` - site name and domain, both in one place
- `app/globals.css` - color tokens for light and dark mode, and the post typography
- `lib/shareCard.tsx` - the social share card design
- `assets/fonts/` - fonts for the share cards, subset with `pyftsubset --layout-features=kern` because `next/og` can't parse their full substitution tables
