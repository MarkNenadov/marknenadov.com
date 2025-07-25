import GenericModal from "../base/GenericModal";
import { useEffect, useState } from "react";

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

import { BaseModalProps } from '../../types/modal';

interface BlogPostsModalProps extends BaseModalProps {
  // No additional props needed
}

function decodeHtmlEntities(str: string) {
  if (!str) return str;
  const txt = typeof window !== 'undefined' ? document.createElement('textarea') : null;
  if (txt) {
    txt.innerHTML = str;
    return txt.value;
  }
  return str;
}

function stripHtmlTags(str: string) {
  if (!str) return str;
  return str.replace(/<[^>]*>/g, '');
}

export default function BlogPostsModal({ onClose }: BlogPostsModalProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog?all=1")
      .then((res) => res.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <GenericModal
      title="Blog Posts from Wondering Willow"
      closeHandler={onClose}
    >
      {loading ? (
        <div className="text-center py-4 text-text-tertiary">Loading blog posts...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-4 text-text-tertiary">No blog posts found.</div>
      ) : (
        <ul className="space-y-4">
          {posts.filter(post => post.title.toLowerCase() !== 'about').map((post, idx) => (
            <li key={idx} className="border-b border-border-primary pb-2 last:border-b-0">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary-700 hover:text-primary-600 transition-colors text-base"
              >
                {post.title}
              </a>
              <div className="text-xs text-text-tertiary mt-1">
                {new Date(post.pubDate).toLocaleDateString()}
              </div>
              {post.description && (
                <div className="text-xs text-text-secondary mt-1">
                  {stripHtmlTags(decodeHtmlEntities(post.description)).slice(0, 120)}...
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </GenericModal>
  );
} 