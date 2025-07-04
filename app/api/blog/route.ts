import { NextResponse } from 'next/server';

const BLOG_RSS_URL = 'https://wondering.willow.camp/posts/rss';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const all = url.searchParams.get('all');
    const response = await fetch(BLOG_RSS_URL);
    const xmlText = await response.text();
    
    // Extract all <item> blocks
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    const posts: BlogPost[] = [];
    while ((match = itemRegex.exec(xmlText)) !== null) {
      const itemContent = match[1];
      const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/);
      const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/);
      const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const descriptionMatch = itemContent.match(/<description>([\s\S]*?)<\/description>/);
      if (titleMatch && linkMatch) {
        const title = titleMatch[1].replace(/<[^>]*>/g, '').trim();
        const link = linkMatch[1].trim();
        const pubDate = pubDateMatch ? pubDateMatch[1].trim() : '';
        const description = descriptionMatch ? descriptionMatch[1].trim() : '';
        posts.push({ title, link, pubDate, description });
      }
    }
    if (all === '1') {
      return NextResponse.json(posts);
    }
    // Default: return only the latest
    if (posts.length > 0) {
      return NextResponse.json(posts[0]);
    }
    return NextResponse.json({ error: 'No blog posts found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
} 