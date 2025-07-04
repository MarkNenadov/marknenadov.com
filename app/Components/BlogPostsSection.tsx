"use client"
import { useEffect, useState } from 'react';

export const LatestBlogPost = () => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => setPost(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !post) return null;

  return (
    <div className="w-full p-2 border-b border-gray-200">
      <div className="text-xs text-gray-500 mb-1">Latest blog post</div>
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-blue-900 hover:text-blue-700 transition-colors text-base"
      >
        {post.title}
      </a>
      <div className="text-xs text-gray-400 mt-1">{new Date(post.pubDate).toLocaleDateString()}</div>
      {post.description && (
        <div className="text-xs text-gray-700 mt-1 line-clamp-2">{post.description.replace(/<[^>]+>/g, '').slice(0, 100)}...</div>
      )}
    </div>
  );
}; 